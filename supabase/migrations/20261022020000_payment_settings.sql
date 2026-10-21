-- Donation payment details (bank + M-Pesa) shown on the website's Get Involved
-- page and donation popup. Edited from the admin app's "Payment Details" page.
-- Requires public.is_admin_request() from 20261022010000_secure_admin_access.sql.
CREATE TABLE IF NOT EXISTS public.payment_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  show_bank boolean NOT NULL DEFAULT true,
  bank_account_name text,
  bank_name text,
  bank_account_number text,
  bank_swift_code text,
  bank_code text,
  bank_branch_code text,
  show_mpesa boolean NOT NULL DEFAULT false,
  mpesa_type text NOT NULL DEFAULT 'paybill' CHECK (mpesa_type IN ('paybill', 'till', 'send_money')),
  mpesa_number text,
  mpesa_account_reference text,
  mpesa_account_name text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.payment_settings (
  id, show_bank, bank_account_name, bank_name, bank_account_number,
  bank_swift_code, bank_code, bank_branch_code
) VALUES (
  1, true, 'Charis Eagle Springs', 'Co-operative Bank of Kenya', '01101942579001',
  'KCOOKENA', '11000', '11002'
) ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read payment settings" ON public.payment_settings;
DROP POLICY IF EXISTS "Admins can update payment settings" ON public.payment_settings;
DROP POLICY IF EXISTS "Admins can insert payment settings" ON public.payment_settings;

CREATE POLICY "Public can read payment settings"
  ON public.payment_settings FOR SELECT USING (true);

CREATE POLICY "Admins can update payment settings"
  ON public.payment_settings FOR UPDATE TO anon, authenticated
  USING (public.is_admin_request()) WITH CHECK (public.is_admin_request());

CREATE POLICY "Admins can insert payment settings"
  ON public.payment_settings FOR INSERT TO anon, authenticated
  WITH CHECK (public.is_admin_request());

-- Website updates the moment an admin saves
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'payment_settings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.payment_settings;
  END IF;
END $$;
