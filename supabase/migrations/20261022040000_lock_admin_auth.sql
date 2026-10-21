-- =====================================================================
-- Lock down admin authentication
--
-- 1. The admin auth helper functions were SECURITY DEFINER and callable by
--    anyone with the public key, e.g. change_admin_password(email, new) could
--    reset any verified admin's password. Only the admin-auth edge function
--    (service role) needs them.
-- 2. change_admin_password now requires an email code verified in the last
--    15 minutes, and the code can only be used once.
-- 3. admin_start_session also reports whether the admin still has to replace
--    the initial password.
-- 4. admin_change_own_password lets a signed-in admin change their password
--    after confirming the current one.
-- =====================================================================

-- 1. Revoke public access to the edge-function-only helpers
DO $$
DECLARE
  fn record;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname IN (
        'authenticate_admin', 'change_admin_password', 'create_admin_verification',
        'verify_admin_email', 'generate_verification_token', 'create_admin_otp',
        'verify_admin_otp', 'generate_otp'
      )
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon, authenticated', fn.sig);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', fn.sig);
  END LOOP;
END $$;

-- 2. Password changes need a fresh, single-use email code
CREATE OR REPLACE FUNCTION public.change_admin_password(admin_email text, new_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_id uuid;
BEGIN
  SELECT au.id INTO v_id
  FROM public.admin_users au
  WHERE lower(au.email) = lower(change_admin_password.admin_email)
    AND au.otp_verified = TRUE
    AND au.verified_at > now() - interval '15 minutes';

  IF v_id IS NULL THEN
    RETURN FALSE;
  END IF;

  UPDATE public.admin_users
  SET password_hash = crypt(new_password, gen_salt('bf')),
      password_changed = TRUE,
      first_login_complete = TRUE,
      otp_verified = FALSE
  WHERE id = v_id;

  -- Sign out every existing session for this admin
  DELETE FROM public.admin_sessions s WHERE s.admin_email = lower(change_admin_password.admin_email);

  RETURN TRUE;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.change_admin_password(text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.change_admin_password(text, text) TO service_role;

-- 3. Session start now also says whether the initial password must be replaced
DROP FUNCTION IF EXISTS public.admin_start_session(text, text);
CREATE FUNCTION public.admin_start_session(p_email text, p_password text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_hash text;
  v_changed boolean;
  v_token text;
BEGIN
  SELECT replace(au.password_hash, '$2b$', '$2a$'), coalesce(au.password_changed, false)
  INTO v_hash, v_changed
  FROM public.admin_users au
  WHERE lower(au.email) = lower(trim(p_email))
    AND coalesce(au.is_active, true)
    AND au.password_hash IS NOT NULL;

  IF v_hash IS NULL OR crypt(p_password, v_hash) <> v_hash THEN
    RAISE EXCEPTION 'Invalid admin credentials' USING ERRCODE = '28000';
  END IF;

  -- Accounts still on the initial password get no session until it is replaced
  IF NOT v_changed THEN
    RETURN jsonb_build_object('token', NULL, 'must_change_password', true);
  END IF;

  DELETE FROM public.admin_sessions WHERE expires_at < now();

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.admin_sessions (token, admin_email, expires_at)
  VALUES (v_token, lower(trim(p_email)), now() + interval '30 days');

  RETURN jsonb_build_object('token', v_token, 'must_change_password', false);
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_start_session(text, text) TO anon, authenticated;

-- 4. Signed-in admins can change their own password (current password required)
CREATE OR REPLACE FUNCTION public.admin_change_own_password(p_current_password text, p_new_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_token text;
  v_email text;
  v_hash text;
BEGIN
  BEGIN
    v_token := current_setting('request.headers', true)::json ->> 'x-admin-session';
  EXCEPTION WHEN others THEN
    v_token := NULL;
  END;

  SELECT s.admin_email INTO v_email
  FROM public.admin_sessions s
  WHERE s.token = v_token AND s.expires_at > now();

  IF v_email IS NULL THEN
    RAISE EXCEPTION 'Not signed in' USING ERRCODE = '28000';
  END IF;

  SELECT replace(au.password_hash, '$2b$', '$2a$') INTO v_hash
  FROM public.admin_users au WHERE lower(au.email) = v_email;

  IF v_hash IS NULL OR crypt(p_current_password, v_hash) <> v_hash THEN
    RAISE EXCEPTION 'Current password is incorrect' USING ERRCODE = '28000';
  END IF;

  IF length(p_new_password) < 12
     OR p_new_password !~ '[A-Z]' OR p_new_password !~ '[a-z]'
     OR p_new_password !~ '[0-9]' OR p_new_password !~ '[^A-Za-z0-9]' THEN
    RAISE EXCEPTION 'Password must be at least 12 characters with upper and lower case letters, a number and a symbol';
  END IF;

  UPDATE public.admin_users
  SET password_hash = crypt(p_new_password, gen_salt('bf')),
      password_changed = TRUE,
      first_login_complete = TRUE
  WHERE lower(email) = v_email;

  -- Keep this session, sign out any others
  DELETE FROM public.admin_sessions WHERE admin_email = v_email AND token <> v_token;

  RETURN TRUE;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_change_own_password(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_change_own_password(text, text) TO anon, authenticated;
