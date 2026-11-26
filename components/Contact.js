"use client";
import { useEffect, useRef, useState } from "react";
import { BRAND, isValidEmail, mailtoLink, waLink } from "../lib/brand";
import { PRODUCTS } from "../lib/data";
import Split from "./Split";
import { Arrow } from "./Hero";

const OPTIONS = PRODUCTS.flatMap((p) => p.sizes.map((s) => `${p.name} · ${s}`)).concat(["Not sure yet — advise me"]);
const EMPTY = { name: "", company: "", phone: "", email: "", product: "", qty: "", city: "", msg: "" };
const MIN_QTY = 0.5;

const normalizePhone = (raw) =>
  String(raw || "")
    .replace(/[\s\-()+]/g, "")
    .replace(/^91(?=\d{10}$)/, "")
    .replace(/^0(?=\d{10}$)/, "");

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = "Name is required.";
  else if (v.name.trim().split(/\s+/).length < 2) e.name = "Please enter your full name (first and last).";
  const digits = normalizePhone(v.phone);
  if (!v.phone.trim()) e.phone = "Mobile number is required.";
  else if (!/^[6-9]\d{9}$/.test(digits)) e.phone = "Enter a valid 10-digit Indian mobile (starts with 6–9).";
  if (v.email && !isValidEmail(v.email)) e.email = "Enter a valid email address.";
  if (!v.product) e.product = "Select a product grade & size.";
  else if (!OPTIONS.includes(v.product)) e.product = "Select a product from the list.";
  if (v.qty) {
    const q = Number(v.qty);
    if (!Number.isFinite(q) || q < MIN_QTY) e.qty = `Minimum ${MIN_QTY} tonne per month.`;
  }
  if (!v.city.trim()) e.city = "Delivery city or district is required.";
  return e;
};

const formatSummary = (x, kind = "quote") =>
  `Hello ${BRAND.name}, I'd like a ${kind === "trial" ? "sample trial load" : "quote"}.\n` +
  `Name: ${x.name}\n` +
  `Company: ${x.company || "-"}\n` +
  `Mobile: ${x.phone}\n` +
  `Email: ${x.email || "-"}\n` +
  `Product: ${x.product}\n` +
  `Monthly tonnage: ${x.qty ? x.qty + " t/month" : "-"}\n` +
  `Delivery city: ${x.city || "-"}\n` +
  `Message: ${x.msg || "-"}`;

export default function Contact({ product, size, defaultKind = "quote", heading = "Let's light up your plant.", eyebrow = "Get a quote" }) {
  const [v, setV] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [toast, setToast] = useState(null);
  const formRef = useRef(null);
  const tRef = useRef(null);

  const details = [
    BRAND.phone && ["Phone", BRAND.phoneHref ? <a href={BRAND.phoneHref}>{BRAND.phone}</a> : <b>{BRAND.phone}</b>],
    BRAND.whatsapp && ["WhatsApp", <b>{BRAND.whatsapp}</b>],
    BRAND.email && ["Email", isValidEmail(BRAND.email) ? <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> : <b>{BRAND.email}</b>],
    BRAND.address && ["Works", <b>{BRAND.address}</b>],
    BRAND.gst && ["GSTIN", <b>{BRAND.gst}</b>],
    BRAND.cin && ["CIN", <b>{BRAND.cin}</b>],
    BRAND.capacity && ["Capacity", <b>{BRAND.capacity}</b>],
    BRAND.hours && ["Hours", <b>{BRAND.hours}</b>],
  ].filter(Boolean);

  const applyPrefill = (prodName, sz, isTrial) => {
    const match =
      OPTIONS.find((o) => o === `${prodName} · ${sz}`) ||
      OPTIONS.find((o) => prodName && o.toLowerCase().startsWith(prodName.toLowerCase()));
    setV((o) => ({
      ...o,
      product: match || o.product,
      msg: o.msg || (isTrial ? `Requesting a sample boiler trial${match ? ` for ${match}` : ""}.` : match ? `Interested in ${match}.` : ""),
    }));
    formRef.current?.classList.add("flash");
    setTimeout(() => formRef.current?.classList.remove("flash"), 1600);
  };

  useEffect(() => {
    if (product) applyPrefill(product, size, defaultKind === "trial");
  }, [product, size, defaultKind]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const p = params.get("product");
    const s = params.get("size");
    const tr = params.get("trial") === "1";
    const ind = params.get("industry");
    const fl = params.get("fuel");
    if (p || tr) applyPrefill(p || "", s || "", tr);
    else if (ind || fl) {
      const lower = (fl || "").toLowerCase();
      const guess = lower.includes("pellet")
        ? "Biomass pellets · 6 mm"
        : lower.includes("rice husk")
          ? "Rice husk briquettes · 70 mm"
          : lower.includes("agro")
            ? "Agro-mix briquettes · 70 mm"
            : "Sawdust briquettes · 70 mm";
      setV((o) => ({
        ...o,
        product: OPTIONS.includes(guess) ? guess : o.product,
        msg: o.msg || `Industry: ${ind || "Industrial"}${fl ? ` (Suggested fuel: ${fl})` : ""}.`,
      }));
    }

    const onEnquire = (ev) => {
      const { product: ep, size: es } = ev.detail || {};
      if (ep) applyPrefill(ep, es || "", false);
    };
    window.addEventListener("hn:enquire", onEnquire);
    return () => window.removeEventListener("hn:enquire", onEnquire);
  }, []);

  const set = (k) => (e) => {
    const value = e.target.value;
    setV((o) => ({ ...o, [k]: value }));
    setErr((o) => ({ ...o, [k]: undefined }));
    if (status?.type === "error") setStatus(null);
  };

  const blur = (k) => () => {
    setTouched((o) => ({ ...o, [k]: 1 }));
    setErr(validate(v));
  };

  const submit = async (e) => {
    e.preventDefault();
    const es = validate(v);
    setErr(es);
    setTouched({ name: 1, phone: 1, email: 1, product: 1, qty: 1, city: 1 });
    if (Object.keys(es).length) {
      setStatus({ type: "error", message: "Please fix the highlighted fields before sending." });
      const firstKey = Object.keys(es)[0];
      formRef.current?.querySelector(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    setStatus(null);
    const summaryText = formatSummary(v, defaultKind);
    const emailHref = mailtoLink(`${defaultKind === "trial" ? "Sample Trial" : "Fuel Quote"} Enquiry — ${v.name}`, summaryText);
    const waHref = waLink(summaryText);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, kind: defaultKind }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus({ type: "error", message: data.error || "Could not submit your enquiry. Please check your details." });
        return;
      }

      clearTimeout(tRef.current);
      const payload = {
        name: v.name.trim().split(" ")[0],
        delivered: Boolean(data.delivered),
        message: data.message,
        emailHref,
        waHref,
      };
      setStatus({ type: "success", ...payload });
      setToast(payload);
      tRef.current = setTimeout(() => setToast(null), 12000);
      setV(EMPTY);
      setTouched({});
    } catch {
      setStatus({
        type: "error",
        message: "Network issue submitting online. You can still send your enquiry directly via Email or WhatsApp below.",
        emailHref,
        waHref,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const F = (k) => ({
    name: k,
    id: `f-${k}`,
    value: v[k],
    onChange: set(k),
    onBlur: blur(k),
    "aria-invalid": !!(touched[k] && err[k]),
    "aria-describedby": err[k] ? `e-${k}` : undefined,
  });
  const E = (k) => (touched[k] && err[k] ? <span className="f-err" id={`e-${k}`}>{err[k]}</span> : null);

  return (
    <section id="contact" className="sec contact">
      <div className="wrap ct-grid">
        <div className="ct-info">
          <p className="eyebrow" data-reveal>{eyebrow}</p>
          <Split className="h2" text={heading} />
          <p className="sec-lede" data-reveal>
            Tell us your boiler or kiln, monthly tonnage and delivery city. We&apos;ll recommend the right grade, diameter and a per-tonne rate.
          </p>
          {details.length > 0 && (
            <ul className="ct-list" data-reveal>
              {details.map(([label, node]) => (
                <li key={label}><span>{label}</span>{node}</li>
              ))}
            </ul>
          )}
          <div className="ct-actions" data-reveal>
            <a className="btn btn-wa" href={waLink(`Hello ${BRAND.name}, I'd like a quote for biomass briquettes.`)} target="_blank" rel="noopener noreferrer" data-magnetic>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.1.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2c-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.3.1-.4l.4-.5c.1-.1.2-.2.3-.4s.1-.3 0-.4c-.1-.1-.5-1.2-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.3c.1.2 1.7 2.6 4.1 3.6.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.2-.3-.2-.5-.3Z" /></svg>
              Chat on WhatsApp
            </a>
            {BRAND.mapUrl && (
              <a className="btn btn-ghost" href={BRAND.mapUrl} target="_blank" rel="noopener noreferrer">
                View location map
              </a>
            )}
          </div>
        </div>

        <form className="form" ref={formRef} onSubmit={submit} noValidate data-reveal>
          <div className="f-row">
            <label className="f"><span>Name *</span><input {...F("name")} autoComplete="name" placeholder="Your full name" />{E("name")}</label>
            <label className="f"><span>Company</span><input {...F("company")} autoComplete="organization" placeholder="Plant / business name" /></label>
          </div>
          <div className="f-row">
            <label className="f"><span>Mobile *</span><input {...F("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit Indian mobile" />{E("phone")}</label>
            <label className="f"><span>Email</span><input {...F("email")} type="email" inputMode="email" autoComplete="email" placeholder="you@company.in" />{E("email")}</label>
          </div>
          <div className="f-row">
            <label className="f"><span>Product *</span>
              <select {...F("product")}>
                <option value="">Select grade & size</option>
                {OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>{E("product")}
            </label>
            <label className="f"><span>Monthly tonnage (t/month)</span><input {...F("qty")} type="number" step="0.5" min="0.5" inputMode="decimal" placeholder="e.g. 50" />{E("qty")}</label>
          </div>
          <label className="f"><span>Delivery city *</span><input {...F("city")} autoComplete="address-level2" placeholder="City / industrial area" />{E("city")}</label>
          <label className="f"><span>Message</span><textarea {...F("msg")} rows={4} placeholder="Boiler / kiln type, current fuel, packing preference (bags or loose)" />{E("msg")}</label>

          {status && (
            <div className={`form-alert ${status.type === "error" ? "is-err" : "is-ok"}`} role="alert">
              <b>{status.type === "error" ? "Action needed" : `Thank you, ${status.name}`}</b>
              <p>{status.message}</p>
              {(status.emailHref || status.waHref) && (
                <div className="form-alert-links">
                  {status.emailHref && <a href={status.emailHref} className="btn btn-sm btn-ghost">Send via Email</a>}
                  {status.waHref && <a href={status.waHref} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-wa" style={{ marginTop: 0 }}>Send on WhatsApp</a>}
                </div>
              )}
            </div>
          )}

          <button className="btn btn-ember btn-block" type="submit" disabled={submitting}>
            {submitting ? "Validating..." : "Send enquiry"}<Arrow />
          </button>
        </form>
      </div>

      <div className={`toast${toast ? " on" : ""}`} role="status" aria-live="polite">
        {toast && (
          <>
            <span className="toast-ic" aria-hidden="true">✓</span>
            <div>
              <b>Thanks, {toast.name} — enquiry ready.</b>
              <p>{toast.message}</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href={toast.emailHref}>Send via Email →</a>
                <a href={toast.waHref} target="_blank" rel="noopener noreferrer">Send on WhatsApp →</a>
              </div>
            </div>
            <button type="button" className="toast-x" aria-label="Dismiss" onClick={() => setToast(null)}>×</button>
          </>
        )}
      </div>
    </section>
  );
}
