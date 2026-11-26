import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Icon from "../../components/Icons";
import Split from "../../components/Split";
import { Arrow } from "../../components/Hero";
import { BRAND } from "../../lib/brand";
import { INDUSTRIES } from "../../lib/data";

export const metadata = {
  title: "Industries Served — Boilers, Kilns, Mills & Hospitality",
  description:
    "Biomass briquettes and pellets for industrial boilers, brick kilns, textile dyeing, food processing, rice mills, dairies, hotels and hospitals.",
  keywords: ["industrial boiler fuel", "brick kiln briquettes", "rice mill fuel", "textile boiler biomass", BRAND.region],
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero has-banner">
          <div className="hero-banner-bg" aria-hidden="true">
            <img src="/img/flame.webp" alt="" loading="eager" decoding="async" />
          </div>
          <div className="wrap">
            <p className="eyebrow" data-reveal>Industries served</p>
            <Split as="h1" className="h2" text="Built for every industrial furnace." />
            <p className="sec-lede" data-reveal>
              Solid biomass briquettes and pellets replace thermal coal, firewood and expensive liquid fuels across manufacturing, agro-processing and institutional utilities.
            </p>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap mv-grid">
            {INDUSTRIES.map((ind, idx) => (
              <article className="card-box ind-detail-card" key={ind.t} data-reveal>
                <div className="qc-top">
                  <span className="pr-ico" style={{ marginBottom: 0 }}><Icon name={ind.icon} size={30} /></span>
                  <span className="it-n">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="ind-h">{ind.t}</h2>
                <p className="body-p">{ind.detail}</p>
                <div className="ind-rec">
                  <span>Suggested grade:</span>
                  <b>{ind.recommended}</b>
                </div>
                <Link href="/contact" className="tbl-link" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                  Request boiler recommendation →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <div className="price-card" data-reveal>
              <div>
                <p className="eyebrow">Boiler compatibility</p>
                <h2 className="h2 price-h">Switch without downtime.</h2>
                <p className="sec-lede">Share your boiler capacity (TPH or kcal/hr) and grate type — we will suggest the best diameter and schedule a trial load.</p>
              </div>
              <Link href="/contact" className="btn btn-ember" data-magnetic>Talk to our team <Arrow /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
