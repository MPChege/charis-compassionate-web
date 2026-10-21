-- verify_admin_otp failed with "column reference email is ambiguous" because its
-- RETURNS TABLE output column `email` shadows admin_users.email. Same behaviour,
-- columns now qualified; still callable only by the admin-auth edge function.
CREATE OR REPLACE FUNCTION public.verify_admin_otp(admin_email text, otp text)
RETURNS TABLE(admin_id uuid, email text, success boolean, requires_password_change boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_email text;
  v_changed boolean;
BEGIN
  SELECT au.id, au.email, coalesce(au.password_changed, false)
  INTO v_id, v_email, v_changed
  FROM public.admin_users au
  WHERE lower(au.email) = lower(verify_admin_otp.admin_email)
    AND au.otp_code = verify_admin_otp.otp
    AND au.otp_sent_at > now() - interval '15 minutes';

  IF v_id IS NULL THEN
    RETURN QUERY SELECT NULL::uuid, NULL::text, FALSE, FALSE;
    RETURN;
  END IF;

  UPDATE public.admin_users au
  SET otp_verified = TRUE,
      otp_code = NULL,
      email_verified = TRUE,
      verified_at = now()
  WHERE au.id = v_id;

  RETURN QUERY SELECT v_id, v_email, TRUE, NOT v_changed;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.verify_admin_otp(text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_admin_otp(text, text) TO service_role;
