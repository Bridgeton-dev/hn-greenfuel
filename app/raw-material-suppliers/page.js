"use client";
import { useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Split from "../../components/Split";
import Icon from "../../components/Icons";
import { Arrow } from "../../components/Hero";
import { BRAND, isValidEmail, mailtoLink, waLink } from "../../lib/brand";
import { SUPPLIER_MATERIALS } from "../../lib/data";

const EMPTY = { name: "", company: "", phone: "", email: "", material: "", qty: "", city: "", msg: "" };

const normalizePhone = (raw) =>
  String(raw || "")
    .replace(/[\s\-()+]/g, "")
    .replace(/^91(?=\d{10}$)/, "")
    .replace(/^0(?=\d{10}$)/, "");

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = "Name is required.";
  else if (v.name.trim().split(/\s+/).length < 2) e.name = "Please enter your full name.";
  const digits = normalizePhone(v.phone);
  if (!v.phone.trim()) e.phone = "Mobile number is required.";
  else if (!/^[6-9]\d{9}$/.test(digits)) e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (v.email && !isValidEmail(v.email)) e.email = "Enter a valid email address.";
  if (!v.material) e.material = "Select the biomass material you supply.";
  if (!v.city.trim()) e.city = "Village, town or district is required.";
  if (v.qty && (!Number.isFinite(Number(v.qty)) || Number(v.qty) <= 0)) e.qty = "Enter a valid positive quantity.";
  return e;
};

export default function RawMaterialSuppliersPage() {
  const [v, setV] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);

  const set = (k) => (e) => {
    const val = e.target.value;
    setV((o) => ({ ...o, [k]: val }));
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
    setTouched({ name: 1, phone: 1, email: 1, material: 1, city: 1, qty: 1 });
    if (Object.keys(es).length) {
      setStatus({ type: "error", message: "Please fix the highlighted fields." });
      const firstKey = Object.keys(es)[0];
      formRef.current?.querySelector(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    setStatus(null);
    const summary =
      `Hello ${BRAND.name}, Raw Material Supply Enquiry:\n` +
      `Supplier Name: ${v.name}\n` +
      `Farm / Mill Name: ${v.company || "-"}\n` +
      `Mobile: ${v.phone}\n` +
      `Email: ${v.email || "-"}\n` +
      `Material: ${v.material}\n` +
      `Approx Monthly Qty: ${v.qty ? v.qty + " tonnes" : "-"}\n` +
      `Village / City: ${v.city}\n` +
      `Notes: ${v.msg || "-"}`;

    const emailHref = mailtoLink(`Raw Material Supply — ${v.material} (${v.city})`, summary);
    const waHref = waLink(summary);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, product: v.material, kind: "supplier" }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus({ type: "error", message: data.error || "Unable to validate your submission." });
        return;
      }
      setStatus({
        type: "success",
        name: v.name.trim().split(" ")[0],
        message: data.message,
        emailHref,
        waHref,
      });
      setV(EMPTY);
      setTouched({});
    } catch {
      setStatus({
        type: "error",
        message: "Network issue submitting online. Use Email or WhatsApp below to send directly.",
        emailHref,
        waHref,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const F = (k) => ({
    name: k,
    id: `rm-${k}`,
    value: v[k],
    onChange: set(k),
    onBlur: blur(k),
    "aria-invalid": !!(touched[k] && err[k]),
    "aria-describedby": err[k] ? `rm-e-${k}` : undefined,
  });
  const E = (k) => (touched[k] && err[k] ? <span className="f-err" id={`rm-e-${k}`}>{err[k]}</span> : null);

  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero">
          <div className="wrap two-col">
            <div>
              <p className="eyebrow leaf-t" data-reveal>For farmers, aggregators &amp; mills</p>
              <Split as="h1" className="h2" text="Sell your crop residue & sawdust to us." />
              <p className="sec-lede" data-reveal>
                {BRAND.legalName} procures clean, dry rice husk, wood sawdust, groundnut shell, mustard stalk, cotton stalk and bagasse year-round.
              </p>
            </div>
            <div className="media-frame" data-reveal>
              <img
                src="/img/raw.webp"
                alt="Dry agricultural residues and sawdust ready for briquette manufacturing"
                loading="eager"
                decoding="async"
                width="1600"
                height="900"
              />
              <span className="img-badge">Accepted biomass feedstocks</span>
            </div>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap four-grid">
            <div className="card-box" data-reveal>
              <span className="pr-ico"><Icon name="rice" size={28} /></span>
              <h3>Steady buyers</h3>
              <p className="body-p">Ongoing requirement for dry husks, stalks, shells and timber mill sawdust.</p>
            </div>
            <div className="card-box" data-reveal>
              <span className="pr-ico"><Icon name="truck" size={28} /></span>
              <h3>Pickup options</h3>
              <p className="body-p">Plant-gate delivery or coordinated bulk pickup depending on distance and volume.</p>
            </div>
            <div className="card-box" data-reveal>
              <span className="pr-ico"><Icon name="press" size={28} /></span>
              <h3>Weighbridge clarity</h3>
              <p className="body-p">Every incoming trolley or truck is weighed and checked fairly for moisture and grit.</p>
            </div>
            <div className="card-box" data-reveal>
              <span className="pr-ico"><Icon name="leaf" size={28} /></span>
              <h3>Zero burning</h3>
              <p className="body-p">Earn value from harvest residue while keeping your fields clear without open fire.</p>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap ct-grid">
            <div className="ct-info" data-reveal>
              <p className="eyebrow leaf-t">Supplier registration</p>
              <h2 className="sub-h">Tell us what biomass you have available.</h2>
              <p className="sec-lede">
                Share the residue type, approximate tonnage, moisture condition and your village or mill location. Our procurement desk will follow up with rates and logistics options.
              </p>
              <ul className="check-list" style={{ marginTop: "1.8rem" }}>
                {SUPPLIER_MATERIALS.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>

            <form className="form" ref={formRef} onSubmit={submit} noValidate data-reveal>
              <div className="f-row">
                <label className="f"><span>Full Name *</span><input {...F("name")} placeholder="Your full name" />{E("name")}</label>
                <label className="f"><span>Farm / Rice Mill / Sawmill</span><input {...F("company")} placeholder="Mill or FPO name (optional)" /></label>
              </div>
              <div className="f-row">
                <label className="f"><span>Mobile *</span><input {...F("phone")} type="tel" inputMode="tel" placeholder="10-digit Indian mobile" />{E("phone")}</label>
                <label className="f"><span>Email</span><input {...F("email")} type="email" inputMode="email" placeholder="Optional email" />{E("email")}</label>
              </div>
              <div className="f-row">
                <label className="f"><span>Raw Material Type *</span>
                  <select {...F("material")}>
                    <option value="">Select residue type</option>
                    {SUPPLIER_MATERIALS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>{E("material")}
                </label>
                <label className="f"><span>Est. Monthly Tonnage</span><input {...F("qty")} type="number" step="1" min="1" placeholder="e.g. 30" />{E("qty")}</label>
              </div>
              <label className="f"><span>Village / Town / District *</span><input {...F("city")} placeholder="Where material is located" />{E("city")}</label>
              <label className="f"><span>Condition &amp; Notes</span><textarea {...F("msg")} rows={4} placeholder="Dryness, baled or loose, loading access" /></label>

              {status && (
                <div className={`form-alert ${status.type === "error" ? "is-err" : "is-ok"}`} role="alert">
                  <b>{status.type === "error" ? "Please check inputs" : `Thank you, ${status.name}`}</b>
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
                {submitting ? "Submitting..." : "Submit supplier enquiry"}<Arrow />
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
