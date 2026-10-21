import { useEffect, useState } from "react";
import { Landmark, Smartphone, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type PaymentSettings = Database["public"]["Tables"]["payment_settings"]["Row"];

// Shown until the admin-managed settings load (or if they can't be reached)
const FALLBACK: PaymentSettings = {
  id: 1,
  show_bank: true,
  bank_account_name: "Charis Eagle Springs",
  bank_name: "Co-operative Bank of Kenya",
  bank_account_number: "01101942579001",
  bank_swift_code: "KCOOKENA",
  bank_code: "11000",
  bank_branch_code: "11002",
  show_mpesa: false,
  mpesa_type: "paybill",
  mpesa_number: null,
  mpesa_account_reference: null,
  mpesa_account_name: null,
  updated_at: "",
};

const MPESA_NUMBER_LABEL: Record<string, string> = {
  paybill: "Paybill Number",
  till: "Till Number",
  send_money: "Phone Number",
};

const MPESA_STEPS: Record<string, string> = {
  paybill: "M-PESA → Lipa na M-PESA → Pay Bill",
  till: "M-PESA → Lipa na M-PESA → Buy Goods and Services",
  send_money: "M-PESA → Send Money",
};

interface PaymentDetailsProps {
  compact?: boolean;
  show?: "all" | "bank" | "mpesa";
}

const PaymentDetails = ({ compact = false, show = "all" }: PaymentDetailsProps) => {
  const [settings, setSettings] = useState<PaymentSettings>(FALLBACK);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("payment_settings").select("*").eq("id", 1).maybeSingle();
      if (!error && data) setSettings(data);
    };
    load();

    // Admin edits show up straight away
    const channel = supabase
      .channel("payment_settings_live")
      .on("postgres_changes", { event: "*", schema: "public", table: "payment_settings" }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard unavailable; the value is still visible to copy manually
    }
  };

  const bankRows = [
    { label: "Account Name", value: settings.bank_account_name },
    { label: "Bank", value: settings.bank_name },
    { label: "Account Number", value: settings.bank_account_number, copy: true },
    { label: "SWIFT Code", value: settings.bank_swift_code, copy: true },
    { label: "Bank Code", value: settings.bank_code },
    { label: "Branch Code", value: settings.bank_branch_code },
  ].filter((row) => row.value);

  const mpesaRows = [
    { label: MPESA_NUMBER_LABEL[settings.mpesa_type] ?? "Number", value: settings.mpesa_number, copy: true },
    { label: "Account Number", value: settings.mpesa_type === "paybill" ? settings.mpesa_account_reference : null, copy: true },
    { label: "Name", value: settings.mpesa_account_name },
  ].filter((row) => row.value);

  const showBank = show !== "mpesa" && settings.show_bank && bankRows.length > 0;
  const showMpesa = show !== "bank" && settings.show_mpesa && mpesaRows.length > 0;

  if (!showBank && !showMpesa) return null;

  const renderRows = (prefix: string, rows: { label: string; value: string | null; copy?: boolean }[]) => (
    <dl className="divide-y divide-gray-100">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4 py-3">
          <dt className="text-sm text-gray-500">{row.label}</dt>
          <dd className="flex items-center gap-2">
            <span className="font-mono text-sm md:text-base font-semibold text-black tracking-wide">{row.value}</span>
            {row.copy && row.value && (
              <button
                type="button"
                onClick={() => handleCopy(`${prefix}-${row.label}`, row.value as string)}
                className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition-colors duration-200"
                aria-label={`Copy ${row.label}`}
              >
                {copied === `${prefix}-${row.label}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );

  const cardClass = `rounded-2xl border border-gray-200 bg-white ${compact ? "p-5" : "p-8 shadow-sm"}`;
  const header = (Icon: typeof Landmark, title: string, subtitle: string) => (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-11 w-11 rounded-xl bg-black flex items-center justify-center">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className={`font-semibold text-black ${compact ? "text-base" : "text-xl"}`}>{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className={`grid gap-6 ${showBank && showMpesa && !compact ? "md:grid-cols-2" : ""}`}>
        {showMpesa && (
          <div className={cardClass}>
            {header(Smartphone, "M-Pesa", MPESA_STEPS[settings.mpesa_type] ?? "Pay with M-Pesa")}
            {renderRows("mpesa", mpesaRows)}
          </div>
        )}
        {showBank && (
          <div className={cardClass}>
            {header(Landmark, "Bank Transfer", "Donate directly to our account")}
            {renderRows("bank", bankRows)}
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">
        Please use your name as the payment reference, and email{" "}
        <a href="mailto:info@chariseaglesprings.org" className="text-charis-blue-dark font-medium hover:underline">
          info@chariseaglesprings.org
        </a>{" "}
        once you've sent your gift so we can thank you.
      </p>
    </div>
  );
};

export default PaymentDetails;
