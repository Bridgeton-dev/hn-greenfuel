import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Split from "../../components/Split";
import { Arrow } from "../../components/Hero";
import MachineAnimation from "../../components/MachineAnimation";
import ProcessTimeline from "../../components/ProcessTimeline";
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

        <ProcessTimeline
          id="stages"
          steps={MFG_STEPS}
          eyebrow="7-stage workflow"
          heading={
            <>
              From field waste to <span className="ember-t">white coal</span>.
            </>
          }
          showCta={false}
        />

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
