/* Central brand & contact configuration.
   Empty strings are hidden in the UI automatically — never render placeholders like "XXXXX" or "__". */
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
    "HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED manufactures biomass briquettes and pellets made from crop and wood residue for industrial boilers, kilns and furnaces.",
  siteUrl: /^https?:\/\/[^[\]\s]+$/.test(envSiteUrl) ? envSiteUrl : "https://hngreenfuel.in",
  region: "",
  currency: "INR",
  // ---- Fill in when ready; empty values are hidden automatically ----
  phone: "",
  phoneHref: "",
  whatsapp: "", // digits only with country code, e.g. "919876543210"
  email: "",
  address: "",
  gst: "",
  cin: "",
  capacity: "",
  hours: "",
  mapUrl: "https://maps.app.goo.gl/hTzp1nmVRYsA6rpz8",
  mapEmbed: "https://maps.google.com/maps?q=9X8Q%2BW2F,+Pipra+Khem,+Bihar+845412&z=14&output=embed",
  formConnected: false,
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
