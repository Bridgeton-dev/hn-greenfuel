/* Every name, line and contact detail lives here — update placeholders below
   with real company details before deploying to production. */
const envSiteUrl =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://hngreenfuel.in";

export const BRAND = {
  name: "HN Greenfuel",
  legalName: "HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED",
  wordmark: "HN",
  sub: "Greenfuel",
  tagline: "Clean fuel. Real fire.",
  heroLines: ["Clean fuel.", "Real fire."],
  description:
    "HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED manufactures biomass briquettes and pellets (white coal) from sawdust, rice husk and agro-residue — a cleaner coal replacement for boilers, kilns and industry.",
  // Note: siteUrl falls back to a valid URL so Next.js metadataBase never throws;
  // set NEXT_PUBLIC_SITE_URL in your environment once Domain is confirmed.
  siteUrl: /^https?:\/\/[^[\]\s]+$/.test(envSiteUrl) ? envSiteUrl : "https://hngreenfuel.in",
  domainPlaceholder: "[__]",
  region: "[City, State]",
  currency: "INR",
  // ---- placeholders: replace with real details ----
  phone: "[000000000]",
  phoneHref: "", // e.g. "tel:+919999999999" once real digits are provided
  whatsapp: "[00000000]", // digits only (with country code, e.g. "919999999999") once confirmed
  email: "[__]",
  address: "[__]",
  gst: "[__]",
  cin: "[__]",
  capacity: "[__]",
  hours: "Mon–Sat, 9:00 AM – 6:00 PM IST",
  mapUrl: "https://maps.app.goo.gl/hTzp1nmVRYsA6rpz8",
  mapEmbed: "https://maps.google.com/maps?q=9X8Q%2BW2F,+Pipra+Khem,+Bihar+845412&z=14&output=embed",
  formConnected: false, // becomes true when SMTP / email webhook env vars are configured
  year: 2026,
};

export const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || "").trim());

export const waLink = (text = "") => {
  const digits = /^\d{10,15}$/.test(BRAND.whatsapp) ? BRAND.whatsapp : "";
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
};

export const mailtoLink = (subject = "", body = "") => {
  const to = isValidEmail(BRAND.email) ? BRAND.email : "";
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${to}${qs ? `?${qs}` : ""}`;
};
