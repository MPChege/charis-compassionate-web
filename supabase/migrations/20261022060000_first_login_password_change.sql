-- =====================================================================
-- First sign-in without email codes
--
-- Admins still on the initial password can sign in with it, but they get a
-- restricted session: it cannot read or change any data (is_admin_request()
-- ignores it). The only thing it can do is admin_change_own_password, which
-- sets their own password and upgrades the session to a full one.
-- =====================================================================

ALTER TABLE public.admin_sessions
  ADD COLUMN IF NOT EXISTS must_change boolean NOT NULL DEFAULT false;

-- Sign in: full session normally, restricted session on the initial password
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

  DELETE FROM public.admin_sessions WHERE expires_at < now();

  v_token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.admin_sessions (token, admin_email, expires_at, must_change)
  VALUES (
    v_token,
    lower(trim(p_email)),
    -- Restricted sessions only live long enough to choose a password
    CASE WHEN v_changed THEN now() + interval '30 days' ELSE now() + interval '30 minutes' END,
    NOT v_changed
  );

  RETURN jsonb_build_object('token', v_token, 'must_change_password', NOT v_changed);
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_start_session(text, text) TO anon, authenticated;

-- Only full (not restricted) sessions count as admin
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
  BEGIN
    v_token := current_setting('request.headers', true)::json ->> 'x-admin-session';
  EXCEPTION WHEN others THEN
    v_token := NULL;
  END;

  IF v_token IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.admin_sessions s
    WHERE s.token = v_token AND s.expires_at > now() AND NOT s.must_change
  ) THEN
    RETURN true;
  END IF;

  IF auth.uid() IS NOT NULL THEN
    RETURN coalesce(public.is_admin(auth.uid()), false);
  END IF;

  RETURN false;
END;
$$;

-- Change own password: works from a restricted session too, then upgrades it
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
    RAISE EXCEPTION 'Your session has expired. Please sign in again.' USING ERRCODE = '28000';
  END IF;

  SELECT replace(au.password_hash, '$2b$', '$2a$') INTO v_hash
  FROM public.admin_users au WHERE lower(au.email) = v_email;

  IF v_hash IS NULL OR crypt(p_current_password, v_hash) <> v_hash THEN
    RAISE EXCEPTION 'Current password is incorrect' USING ERRCODE = '28000';
  END IF;

  IF p_new_password = p_current_password THEN
    RAISE EXCEPTION 'Choose a password that is different from your current one';
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

  -- Upgrade this session to a full one; sign out every other session
  UPDATE public.admin_sessions
  SET must_change = false, expires_at = now() + interval '30 days'
  WHERE token = v_token;
  DELETE FROM public.admin_sessions WHERE admin_email = v_email AND token <> v_token;

  RETURN TRUE;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_change_own_password(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_change_own_password(text, text) TO anon, authenticated;
