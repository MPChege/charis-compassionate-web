
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DonationRequest {
  name: string;
  email: string;
  phone?: string;
  amount: string;
  frequency: string;
  donationType: string;
  paymentMethod: string;
  message?: string;
  anonymous: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      name, 
      email, 
      phone, 
      amount, 
      frequency, 
      donationType, 
      paymentMethod, 
      message, 
      anonymous 
    }: DonationRequest = await req.json();

    console.log("Sending donation request email:", { name, email, amount, donationType });
    console.log("RESEND_API_KEY exists:", !!Deno.env.get("RESEND_API_KEY"));

    if (!Deno.env.get("RESEND_API_KEY")) {
      console.error("RESEND_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to Charis Eagle Springs
    const emailResponse = await resend.emails.send({
      from: "Donation Request <noreply@chariseaglesprings.org>",
      to: ["info@chariseaglesprings.org"],
      subject: `New Donation Request - KSH ${Number(amount).toLocaleString()}`,
      html: `
        <h2>New Donation Request</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5530; margin-top: 0;">Donor Information</h3>
          <p><strong>Name:</strong> ${anonymous ? 'Anonymous Donor' : name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Anonymous:</strong> ${anonymous ? 'Yes' : 'No'}</p>
        </div>
        
        <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e3a8a; margin-top: 0;">Donation Details</h3>
          <p><strong>Amount:</strong> KSH ${Number(amount).toLocaleString()}</p>
          <p><strong>Frequency:</strong> ${frequency === 'one-time' ? 'One-time' : 'Monthly'}</p>
          <p><strong>Type:</strong> ${donationType}</p>
          <p><strong>Preferred Payment Method:</strong> ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</p>
        </div>
        
        ${message ? `
          <div style="background-color: #f0f9f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0;">Additional Message</h3>
            <p style="font-style: italic;">${message}</p>
          </div>
        ` : ''}
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;"><strong>Action Required:</strong> Please contact the donor with payment details for their preferred payment method.</p>
        </div>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Charis Eagle Springs donation request form.
        </p>
      `,
    });

    console.log("Donation request email sent successfully:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: emailResponse.error }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-donation-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
