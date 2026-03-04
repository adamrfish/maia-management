"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ActionResult = { success: true } | { success: false; error: string };

export async function submitContactForm(
  formData: FormData
): Promise<ActionResult> {
  const firstName = formData.get("firstName")?.toString().trim();
  const lastName = formData.get("lastName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const reason = formData.get("reason")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!firstName || !lastName || !email || !reason || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    await resend.emails.send({
      from: "Maia Website <onboarding@resend.dev>",
      to: "info@maiamgmt.com",
      replyTo: email,
      subject: `Contact Form — ${reason}`,
      html: `
        <table cellpadding="8" cellspacing="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="font-weight:600;color:#555">Name</td><td>${firstName} ${lastName}</td></tr>
          <tr><td style="font-weight:600;color:#555">Email</td><td>${email}</td></tr>
          <tr><td style="font-weight:600;color:#555">Phone</td><td>${phone || "—"}</td></tr>
          <tr><td style="font-weight:600;color:#555">Reason</td><td>${reason}</td></tr>
          <tr><td style="font-weight:600;color:#555">Message</td><td>${message}</td></tr>
        </table>
      `,
    });
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}

export async function submitInquiryForm(
  formData: FormData
): Promise<ActionResult> {
  const firstName = formData.get("firstName")?.toString().trim();
  const lastName = formData.get("lastName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const propertyAddress = formData.get("propertyAddress")?.toString().trim();
  const propertyType = formData.get("propertyType")?.toString().trim();
  const numberOfUnits = formData.get("numberOfUnits")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!firstName || !lastName || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    await resend.emails.send({
      from: "Maia Website <onboarding@resend.dev>",
      to: "info@maiamgmt.com",
      replyTo: email,
      subject: `Management Inquiry — ${propertyAddress || "New Property"}`,
      html: `
        <table cellpadding="8" cellspacing="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="font-weight:600;color:#555">Name</td><td>${firstName} ${lastName}</td></tr>
          <tr><td style="font-weight:600;color:#555">Email</td><td>${email}</td></tr>
          <tr><td style="font-weight:600;color:#555">Phone</td><td>${phone || "—"}</td></tr>
          <tr><td style="font-weight:600;color:#555">Property Address</td><td>${propertyAddress || "—"}</td></tr>
          <tr><td style="font-weight:600;color:#555">Property Type</td><td>${propertyType || "—"}</td></tr>
          <tr><td style="font-weight:600;color:#555">Number of Units</td><td>${numberOfUnits || "—"}</td></tr>
          <tr><td style="font-weight:600;color:#555">Message</td><td>${message}</td></tr>
        </table>
      `,
    });
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
