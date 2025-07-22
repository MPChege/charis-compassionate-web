import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PartnershipRequest {
  organization_name: string;
  contact_person: string;
  email: string;
  phone?: string;
  organization_type?: string;
  website?: string;
  description?: string;
  proposed_collaboration?: string;
  resources_offered?: string;
  partnership_types: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      organization_name, 
      contact_person, 
      email, 
      phone, 
      organization_type, 
      website, 
      description, 
      proposed_collaboration, 
      resources_offered, 
      partnership_types 
    }: PartnershipRequest = await req.json();

    console.log("Sending partnership inquiry email:", { organization_name, contact_person, email });

    const typeLabels = {
      "strategic": "Strategic Partnership",
      "event": "Event Co-sponsorship",
      "resource": "Resource Sharing",
      "funding": "Funding Partnership",
      "advocacy": "Advocacy Alliance",
      "research": "Research Collaboration"
    };

    const selectedTypesText = partnership_types.map(type => 
      typeLabels[type as keyof typeof typeLabels] || type
    ).join(", ");

    // Send email to Charis Eagle Springs
    const emailResponse = await resend.emails.send({
      from: "Partnership Inquiry <info@chariseaglesprings.org>",
      to: ["info@chariseaglesprings.org"],
      subject: `New Partnership Inquiry - ${organization_name}`,
      html: `
        <h2>New Partnership Inquiry</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5530; margin-top: 0;">Organization Information</h3>
          <p><strong>Organization:</strong> ${organization_name}</p>
          <p><strong>Contact Person:</strong> ${contact_person}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${organization_type ? `<p><strong>Type:</strong> ${organization_type}</p>` : ''}
          ${website ? `<p><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></p>` : ''}
        </div>
        
        <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e3a8a; margin-top: 0;">Partnership Details</h3>
          <p><strong>Partnership Types:</strong> ${selectedTypesText}</p>
        </div>
        
        ${description ? `
          <div style="background-color: #f0f9f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0;">Organization Description</h3>
            <p style="font-style: italic;">${description}</p>
          </div>
        ` : ''}
        
        ${proposed_collaboration ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Partnership Goals</h3>
            <p style="font-style: italic;">${proposed_collaboration}</p>
          </div>
        ` : ''}
        
        ${resources_offered ? `
          <div style="background-color: #ede9fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7c3aed; margin-top: 0;">Resources Offered</h3>
            <p style="font-style: italic;">${resources_offered}</p>
          </div>
        ` : ''}
        
        <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #1d4ed8;"><strong>Action Required:</strong> Please review this partnership inquiry and contact the organization to discuss collaboration opportunities.</p>
        </div>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Charis Eagle Springs partnership inquiry form.
        </p>
      `,
    });

    console.log("Partnership inquiry email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-partnership-email function:", error);
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