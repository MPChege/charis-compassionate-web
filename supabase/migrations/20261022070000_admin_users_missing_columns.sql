-- The live admin_users table predates the OTP migration, so columns the
-- password functions update were missing ("first_login_complete does not exist").
ALTER TABLE public.admin_users
  ADD COLUMN IF NOT EXISTS first_login_complete boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS password_changed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS otp_code text,
  ADD COLUMN IF NOT EXISTS otp_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS otp_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS verified_at timestamptz;
