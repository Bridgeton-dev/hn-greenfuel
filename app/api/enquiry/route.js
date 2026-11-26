import { NextResponse } from "next/server";
import { BRAND, isValidEmail } from "../../../lib/brand";

function normalizeIndianPhone(raw) {
  return String(raw || "")
    .replace(/[\s\-()+]/g, "")
    .replace(/^91(?=\d{10}$)/, "")
    .replace(/^0(?=\d{10}$)/, "");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const kind = body.kind === "supplier" ? "supplier" : body.kind === "trial" ? "trial" : "quote";
    const name = String(body.name || "").trim();
    const phoneDigits = normalizeIndianPhone(body.phone);
    const email = String(body.email || "").trim();

    if (!name || name.split(/\s+/).length < 2) {
      return NextResponse.json({ ok: false, error: "Please enter your full name." }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid 10-digit Indian mobile number." }, { status: 400 });
    }
    if (email && !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const payload = {
      kind,
      name,
      company: String(body.company || "").trim(),
      phone: phoneDigits,
      email,
      product: String(body.product || "").trim(),
      qty: String(body.qty || "").trim(),
      city: String(body.city || "").trim(),
      msg: String(body.msg || "").trim(),
      submittedAt: new Date().toISOString(),
    };

    let delivered = false;
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      const r = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (r.ok) delivered = true;
    }

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.ENQUIRY_TO_EMAIL || (isValidEmail(BRAND.email) ? BRAND.email : "");
    if (!delivered && resendKey && toEmail) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "enquiries@hngreenfuel.in",
          to: [toEmail],
          reply_to: email || undefined,
          subject: `[${BRAND.name}] ${kind === "supplier" ? "Raw Material Supply" : kind === "trial" ? "Sample Trial" : "Fuel Quote"} — ${name}`,
          text: Object.entries(payload)
            .map(([k, v]) => `${k}: ${v || "-"}`)
            .join("\n"),
        }),
      });
      if (r.ok) delivered = true;
    }

    return NextResponse.json({
      ok: true,
      delivered,
      mode: delivered ? "email" : "direct",
      message: delivered
        ? "Enquiry emailed to our sales desk. You can also send a quick copy on WhatsApp."
        : "Details validated and ready to send via your email app or WhatsApp.",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to process enquiry right now. Please try Email or WhatsApp." }, { status: 500 });
  }
}
