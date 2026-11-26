import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Icon from "../../components/Icons";
import Split from "../../components/Split";
import { Arrow } from "../../components/Hero";
import MachineAnimation from "../../components/MachineAnimation";
import { BRAND } from "../../lib/brand";
import { MFG_STEPS } from "../../lib/data";

export const metadata = {
  title: "Manufacturing Process — 7 Stages of Briquetting",
  description:
    "How HN Greenfuel makes white-coal briquettes and pellets: collection, drying, crushing, pressing, cooling, packing and truckload delivery.",
  keywords: ["briquette manufacturing process", "biomass pressing", "rotary biomass dryer", "white coal production", BRAND.region],
  alternates: { canonical: "/manufacturing" },
};

export default function ManufacturingPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero has-banner">
          <div className="hero-banner-bg" aria-hidden="true">
            <img src="/img/press.webp" alt="" loading="eager" decoding="async" />
          </div>
          <div className="wrap">
            <p className="eyebrow" data-reveal>Manufacturing</p>
            <Split as="h1" className="h2" text="Seven stages from farm waste to fuel." />
            <p className="sec-lede" data-reveal>
              Every log and pellet relies on moisture control, uniform grinding and mechanical pressure — using natural plant lignin with zero chemical binders.
            </p>
          </div>
        </section>

        <MachineAnimation />

        <section className="sec alt-sec">
          <div className="wrap mfg-list">
            {MFG_STEPS.map((step) => (
              <article className="mfg-item" key={step.n} data-reveal>
                <div className="mfg-head">
                  <span className="mfg-num">{step.n}</span>
                  <span className="pr-ico"><Icon name={step.icon} size={28} /></span>
                </div>
                <div className="mfg-body">
                  <h3>{step.t}</h3>
                  <p className="body-p">{step.d}</p>
                  <p className="note" style={{ marginTop: "0.75rem" }}>{step.detail}</p>
                </div>
                {step.img && (
                  <div className="mfg-media">
                    <img src={step.img} alt={step.alt || step.t} loading="lazy" decoding="async" width="1200" height="675" />
                    {step.illustrative && <span className="img-badge">Illustrative visual</span>}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <div className="price-card" data-reveal>
              <div>
                <p className="eyebrow">Next step</p>
                <h2 className="h2 price-h">Check quality &amp; trials.</h2>
                <p className="sec-lede">See how we monitor moisture, ash and calorific value, or book a sample batch for your plant boiler.</p>
              </div>
              <div className="btn-row">
                <Link href="/quality" className="btn btn-ember" data-magnetic>Quality assurance <Arrow /></Link>
                <Link href="/contact" className="btn btn-ghost" data-magnetic>Request quote</Link>
              </div>
            </div>
            <p className="note">Process photographs marked &ldquo;Illustrative visual&rdquo; depict representative Indian briquetting and logistics setups and should not be read as actual site photographs of {BRAND.name}.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
