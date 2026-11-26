import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Icon from "../../components/Icons";
import Split from "../../components/Split";
import { Arrow } from "../../components/Hero";
import { BRAND } from "../../lib/brand";
import { VALUES } from "../../lib/data";

export const metadata = {
  title: "About Us — Biomass Fuel Manufacturer",
  description:
    "Learn about HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED: our story, mission, vision, values, quality commitment and company details.",
  keywords: ["HN Greenfuel", "HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED", "biomass briquettes manufacturer", "white coal", BRAND.region],
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero has-banner">
          <div className="hero-banner-bg" aria-hidden="true">
            <img src="/img/stack.webp" alt="" loading="eager" decoding="async" />
          </div>
          <div className="wrap">
            <p className="eyebrow" data-reveal>About us</p>
            <Split as="h1" className="h2" text="Built to turn crop waste into steady heat." />
            <p className="sec-lede" data-reveal>
              {BRAND.legalName} ({BRAND.name}) manufactures solid biomass fuel briquettes and pellets — giving factories, boilers and kilns a cleaner alternative to fossil coal.
            </p>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap two-col">
            <div data-reveal>
              <p className="eyebrow">Company story</p>
              <h2 className="sub-h">Practical clean fuel for working boilers.</h2>
              <p className="body-p">
                Across India&apos;s farming and milling belts, thousands of tonnes of sawdust, paddy husk and crop stalks are left behind every season — often under-used or burnt in open fields. Meanwhile, local boilers, brick kilns and process plants depend on high-ash fossil coal.
              </p>
              <p className="body-p">
                {BRAND.legalName} bridges both sides: aggregating dry wood and agro-residues and compressing them mechanically into uniform 60, 70 and 90 mm briquettes and 6–8 mm pellets with no chemical binders.
              </p>
            </div>
            <div className="media-frame" data-reveal>
              <img
                src="/img/stack.webp"
                alt="Stacked cylindrical hollow biomass briquettes"
                loading="lazy"
                decoding="async"
                width="1600"
                height="900"
              />
              <span className="img-badge">Representative product photo</span>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap mv-grid">
            <article className="card-box" data-reveal>
              <p className="eyebrow">Our mission</p>
              <h3>Clean thermal energy from local residue</h3>
              <p className="body-p">
                To supply consistent, low-moisture biomass briquettes and pellets that drop cleanly into existing industrial boilers while turning agricultural and mill waste into dependable value for farmers and processors.
              </p>
            </article>
            <article className="card-box" data-reveal>
              <p className="eyebrow leaf-t">Our vision</p>
              <h3>Replacing coal across everyday industry</h3>
              <p className="body-p">
                To help everyday industrial heat users — from rice mills and dairies to brick kilns and textile units — transition smoothly from coal to traceable, renewable biomass fuel.
              </p>
            </article>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow" data-reveal>Our values</p>
                <h2 className="sub-h" data-reveal>How we run every shift.</h2>
              </div>
            </div>
            <div className="four-grid">
              {VALUES.map((v) => (
                <div className="card-box" key={v.t} data-reveal>
                  <span className="pr-ico"><Icon name={v.icon} size={28} /></span>
                  <h3>{v.t}</h3>
                  <p className="body-p">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap two-col">
            <div data-reveal>
              <p className="eyebrow">Quality commitment</p>
              <h2 className="sub-h">Moisture under 10%. Zero binders.</h2>
              <p className="body-p">
                Boiler performance depends on dry, dense fuel. Every lot is checked for moisture, raw-material cleanliness and uniform compaction before loading. We share realistic typical ranges — not inflated numbers — and encourage sample boiler trials before bulk orders.
              </p>
              <div className="btn-row">
                <Link href="/quality" className="btn btn-ember" data-magnetic>
                  Quality checks & trial request <Arrow />
                </Link>
                <Link href="/manufacturing" className="btn btn-ghost" data-magnetic>
                  Manufacturing process
                </Link>
              </div>
            </div>

            <div className="card-box" data-reveal>
              <p className="eyebrow">Company details</p>
              <h3>Registration &amp; plant info</h3>
              <ul className="spec-list">
                <li><span>Legal Name</span><b>{BRAND.legalName}</b></li>
                <li><span>Brand / Short Name</span><b>{BRAND.name}</b></li>
                <li><span>Business</span><b>Manufacturer of biomass briquettes &amp; pellets</b></li>
                {BRAND.region && <li><span>Region</span><b>{BRAND.region}</b></li>}
                {BRAND.capacity && <li><span>Monthly Capacity</span><b>{BRAND.capacity}</b></li>}
                {BRAND.address && <li><span>Works Address</span><b>{BRAND.address}</b></li>}
                {BRAND.gst && <li><span>GSTIN</span><b>{BRAND.gst}</b></li>}
                {BRAND.cin && <li><span>CIN</span><b>{BRAND.cin}</b></li>}
                {BRAND.phone && <li><span>Phone</span><b>{BRAND.phone}</b></li>}
                {BRAND.email && <li><span>Email</span><b>{BRAND.email}</b></li>}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
