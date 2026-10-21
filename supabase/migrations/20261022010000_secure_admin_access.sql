-- =====================================================================
-- Secure admin access
--
-- Problem: the admin app (charis-admin-compass) signs in through the
-- admin-auth edge function but then reads and writes with the public anon
-- key, so the database had to allow *anyone* holding that key to read form
-- submissions (names, emails, phones) and edit website content.
--
-- Fix: a successful admin sign-in now creates a server-side session token.
-- The admin app sends it on every request in the `x-admin-session` header,
-- and row level security only allows admin operations when that token is
-- valid (or when a Supabase-auth admin from the main website is signed in).
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- 1. Server-side admin sessions (no policies: unreadable through the API)
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  token text PRIMARY KEY,
  admin_email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- 2. Start a session: verifies the admin's password, returns a random token
-- (replaced by a richer version in 20261022040000_lock_admin_auth.sql)
DROP FUNCTION IF EXISTS public.admin_start_session(text, text);
CREATE FUNCTION public.admin_start_session(p_email text, p_password text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_hash text;
  v_token text;
BEGIN
  SELECT replace(au.password_hash, '$2b$', '$2a$') INTO v_hash
  FROM public.admin_users au
  WHERE lower(au.email) = lower(trim(p_email))
    AND coalesce(au.is_active, true)
    AND au.password_hash IS NOT NULL;

  IF v_hash IS NULL OR crypt(p_password, v_hash) <> v_hash THEN
    RAISE EXCEPTION 'Invalid admin credentials' USING ERRCODE = '28000';
  END IF;

  DELETE FROM public.admin_sessions WHERE expires_at < now();

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.admin_sessions (token, admin_email, expires_at)
  VALUES (v_token, lower(trim(p_email)), now() + interval '30 days');

  RETURN v_token;
END;
$$;

-- 3. End a session (sign out)
CREATE OR REPLACE FUNCTION public.admin_end_session(p_token text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.admin_sessions WHERE token = p_token;
$$;

-- 4. Is the current request from a signed-in admin?
CREATE OR REPLACE FUNCTION public.is_admin_request()
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_token text;
BEGIN
  -- Admin app: session token header
  BEGIN
    v_token := current_setting('request.headers', true)::json ->> 'x-admin-session';
  EXCEPTION WHEN others THEN
    v_token := NULL;
  END;

  IF v_token IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.admin_sessions s WHERE s.token = v_token AND s.expires_at > now()
  ) THEN
    RETURN true;
  END IF;

  -- Main website admin page: Supabase auth user with an admin role
  IF auth.uid() IS NOT NULL THEN
    RETURN coalesce(public.is_admin(auth.uid()), false);
  END IF;

  RETURN false;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_end_session(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_start_session(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_end_session(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_request() TO anon, authenticated;

-- 5. Replace every existing policy on the protected tables with a clean set
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname, tablename FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN (
        'articles', 'events', 'resources', 'facebook_posts',
        'contact_submissions', 'volunteer_applications', 'donations',
        'partnership_inquiries', 'general_inquiries', 'email_logs', 'admin_users'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- Website content: everyone can read, only admins can change
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['articles', 'events', 'resources', 'facebook_posts'] LOOP
    IF to_regclass('public.' || t) IS NULL THEN CONTINUE; END IF;
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "Public can read" ON public.%I FOR SELECT USING (true)', t);
    EXECUTE format('CREATE POLICY "Admins can insert" ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (public.is_admin_request())', t);
    EXECUTE format('CREATE POLICY "Admins can update" ON public.%I FOR UPDATE TO anon, authenticated USING (public.is_admin_request()) WITH CHECK (public.is_admin_request())', t);
    EXECUTE format('CREATE POLICY "Admins can delete" ON public.%I FOR DELETE TO anon, authenticated USING (public.is_admin_request())', t);
  END LOOP;
END $$;

-- Form submissions: the public website can submit, only admins can see or manage them
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['contact_submissions', 'volunteer_applications', 'donations', 'partnership_inquiries', 'general_inquiries'] LOOP
    IF to_regclass('public.' || t) IS NULL THEN CONTINUE; END IF;
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "Anyone can submit" ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (true)', t);
    EXECUTE format('CREATE POLICY "Admins can read" ON public.%I FOR SELECT TO anon, authenticated USING (public.is_admin_request())', t);
    EXECUTE format('CREATE POLICY "Admins can update" ON public.%I FOR UPDATE TO anon, authenticated USING (public.is_admin_request()) WITH CHECK (public.is_admin_request())', t);
    EXECUTE format('CREATE POLICY "Admins can delete" ON public.%I FOR DELETE TO anon, authenticated USING (public.is_admin_request())', t);
  END LOOP;
END $$;

-- Email logs: admins only
DO $$
BEGIN
  IF to_regclass('public.email_logs') IS NOT NULL THEN
    ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Admins manage email logs" ON public.email_logs FOR ALL TO anon, authenticated
      USING (public.is_admin_request()) WITH CHECK (public.is_admin_request());
  END IF;
END $$;

-- Admin accounts (password hashes): never reachable through the public API.
-- The admin-auth edge function uses the service role key, which bypasses RLS.
DO $$
BEGIN
  IF to_regclass('public.admin_users') IS NOT NULL THEN
    ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- 6. Close the RLS bypass: insert_article was SECURITY DEFINER and callable by anyone
DO $$
BEGIN
  EXECUTE (
    SELECT string_agg(format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon, authenticated', p.oid::regprocedure), '; ')
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'insert_article'
  );
EXCEPTION WHEN others THEN
  NULL; -- function not present
END $$;
