/**
 * Contact form handler — Cloudflare Worker (edge function).
 * Receives fleet booking form POST, validates, sends SMS via Twilio.
 * No JS required on the frontend — standard HTML form POST.
 */
import type { APIRoute } from "astro";

export const prerender = false; // SSR — runs as Cloudflare Worker

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  // Honeypot check — bots fill the hidden _gotcha field
  const honeypot = formData.get("_gotcha");
  if (honeypot) {
    // Silently redirect bots — don't reveal the trap
    return Response.redirect("/contact?sent=1", 303);
  }

  const name = formData.get("name")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const company = formData.get("company")?.toString().trim() ?? "";
  const fleetSize = formData.get("fleet_size")?.toString() ?? "";
  const vehicleType = formData.get("vehicle_type")?.toString().trim() ?? "";
  const location = formData.get("location")?.toString().trim() ?? "";
  const preferredDate = formData.get("preferred_date")?.toString() ?? "";
  const notes = formData.get("notes")?.toString().trim() ?? "";
  const region = formData.get("region")?.toString() ?? "";

  // Basic validation
  if (!name || !phone || !location) {
    return Response.redirect("/contact?error=missing-fields", 303);
  }

  // Build SMS message for Bryan
  const smsBody = [
    `NEW FLEET BOOKING — NorCal CARB Mobile`,
    `Name: ${name}`,
    company ? `Company: ${company}` : null,
    `Phone: ${phone}`,
    `Fleet size: ${fleetSize}`,
    vehicleType ? `Vehicles: ${vehicleType}` : null,
    `Location: ${location}`,
    preferredDate ? `Date: ${preferredDate}` : null,
    notes ? `Notes: ${notes}` : null,
    `Region: ${region}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Send SMS via Twilio (environment variables set in Cloudflare Pages settings)
  // TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, TWILIO_TO
  try {
    const twilioSid = (process.env.TWILIO_ACCOUNT_SID as string) ?? "";
    const twilioAuth = (process.env.TWILIO_AUTH_TOKEN as string) ?? "";
    const twilioFrom = (process.env.TWILIO_FROM as string) ?? "";
    const twilioTo = (process.env.TWILIO_TO as string) ?? "";

    if (twilioSid && twilioAuth && twilioFrom && twilioTo) {
      const credentials = btoa(`${twilioSid}:${twilioAuth}`);
      await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${credentials}`,
          },
          body: new URLSearchParams({
            From: twilioFrom,
            To: twilioTo,
            Body: smsBody,
          }),
        }
      );
    }
  } catch (err) {
    // Log but don't fail — form submission should succeed even if SMS fails
    console.error("Twilio SMS failed:", err);
  }

  return Response.redirect("/contact?sent=1", 303);
};
