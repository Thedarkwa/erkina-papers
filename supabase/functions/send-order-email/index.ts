import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  quantity: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderRequest = await req.json();
    
    console.log("Received order:", orderData);

    // Send email to company
    const companyEmailResponse = await resend.emails.send({
      from: "Erkina Papers Orders <onboarding@resend.dev>",
      to: ["erkinapapers@gmail.com"], 
      subject: `New Order from ${orderData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">
            New Order Received
          </h1>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Customer Information</h2>
            <p><strong>Name:</strong> ${orderData.name}</p>
            <p><strong>Email:</strong> ${orderData.email}</p>
            <p><strong>Phone:</strong> ${orderData.phone}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Order Details</h2>
            <p><strong>Quantity:</strong> ${orderData.quantity} rolls</p>
            <p><strong>Delivery Address:</strong> ${orderData.address}, ${orderData.city}</p>
            ${orderData.notes ? `<p><strong>Notes:</strong> ${orderData.notes}</p>` : ''}
          </div>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            This order was submitted through the Erkina Papers website.
          </p>
        </div>
      `,
    });

    console.log("Company email sent:", companyEmailResponse);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Erkina Papers <onboarding@resend.dev>",
      to: [orderData.email],
      subject: "Order Confirmation - Erkina Papers",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">
            Thank You for Your Order!
          </h1>
          
          <p>Dear ${orderData.name},</p>
          
          <p>Thank you for choosing Erkina Papers. We have received your order and will process it shortly.</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #374151; margin-top: 0;">Your Order Summary</h2>
            <p><strong>Quantity:</strong> ${orderData.quantity} rolls</p>
            <p><strong>Delivery Address:</strong> ${orderData.address}, ${orderData.city}</p>
            ${orderData.notes ? `<p><strong>Notes:</strong> ${orderData.notes}</p>` : ''}
          </div>

          <p>One of our team members will contact you within 24 hours to confirm your order and provide pricing details.</p>

          <p style="margin-top: 30px;">
            <strong>Contact Us:</strong><br/>
            Email: erkinapapers@gmail.com<br/>
            Phone: +233 559890111
          </p>

          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Follow us on social media @ErkinaPapers
          </p>

          <p style="margin-top: 30px;">
            Best regards,<br/>
            <strong>The Erkina Papers Team</strong>
          </p>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        companyEmail: companyEmailResponse,
        customerEmail: customerEmailResponse 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
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
