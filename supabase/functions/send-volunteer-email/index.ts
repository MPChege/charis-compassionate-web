import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VolunteerRequest {
  name: string;
  email: string;
  phone?: string;
  availability?: string;
  experience?: string;
  motivation?: string;
  volunteer_areas: string[];
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
      availability, 
      experience, 
      motivation, 
      volunteer_areas 
    }: VolunteerRequest = await req.json();

    console.log("Sending volunteer application email:", { name, email, volunteer_areas });

    const areaLabels = {
      "workshops": "Theatre Workshops",
      "events": "Community Events", 
      "admin": "Administrative Support",
      "outreach": "Community Outreach",
      "fundraising": "Fundraising",
      "marketing": "Marketing & Communications"
    };

    const selectedAreasText = volunteer_areas.map(area => 
      areaLabels[area as keyof typeof areaLabels] || area
    ).join(", ");

    // Send email to Charis Eagle Springs
    const emailResponse = await resend.emails.send({
      from: "Volunteer Application <noreply@chariseaglesprings.org>",
      to: ["info@chariseaglesprings.org"],
      subject: `New Volunteer Application - ${name}`,
      html: `
        <h2>New Volunteer Application</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5530; margin-top: 0;">Volunteer Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${availability ? `<p><strong>Availability:</strong> ${availability}</p>` : ''}
        </div>
        
        <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e3a8a; margin-top: 0;">Volunteer Areas</h3>
          <p><strong>Selected Areas:</strong> ${selectedAreasText}</p>
        </div>
        
        ${experience ? `
          <div style="background-color: #f0f9f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0;">Experience</h3>
            <p style="font-style: italic;">${experience}</p>
          </div>
        ` : ''}
        
        ${motivation ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Motivation</h3>
            <p style="font-style: italic;">${motivation}</p>
          </div>
        ` : ''}
        
        <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #1d4ed8;"><strong>Action Required:</strong> Please contact the volunteer to discuss next steps and scheduling.</p>
        </div>
        
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Charis Eagle Springs volunteer application form.
        </p>
      `,
    });

    console.log("Volunteer application email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-volunteer-email function:", error);
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