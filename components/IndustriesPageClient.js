"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Icon from "./Icons";
import Split from "./Split";
import { Arrow } from "./Hero";
import { BRAND } from "../lib/brand";
import { INDUSTRIES } from "../lib/data";

export default function IndustriesPageClient() {
  const [filter, setFilter] = useState("all");
  const [openIdx, setOpenIdx] = useState(-1);

  const FILTERS = [
    { k: "all", label: "All" },
    { k: "steam", label: "Steam" },
    { k: "direct", label: "Direct Firing" },
    { k: "hotwater", label: "Hot Water" },
  ];

  const filtered =
    filter === "all"
      ? INDUSTRIES
      : INDUSTRIES.filter((x) => x.filter === filter);

  const SHARE_STEPS = [
    "Share details",
    "Fuel suggestion",
    "Trial load",
    "Regular supply",
  ];

  return (
    <>
      <Header />
      <main className="page-main">
        {/* Banner */}
        <section className="page-hero has-banner">
          <div className="hero-banner-bg" aria-hidden="true">
            <img src="/img/flame.webp" alt="" loading="eager" decoding="async" />
          </div>
          <div className="wrap">
            <p className="eyebrow" data-reveal>Industries we supply</p>
            <Split as="h1" className="h2" text="Fuel for industries that run on heat." />
            <p className="sec-lede" data-reveal>
              We supply biomass briquettes and pellets for suitable boilers, furnaces and kilns. You run the process; we help you plan the fuel.
            </p>
            <div className="btn-row" data-reveal>
              <Link href="/contact" className="btn btn-ember" data-magnetic>
                Get a Quote <Arrow />
              </Link>
              <Link href="#what-to-share" className="btn btn-ghost" data-magnetic>
                Check Boiler Fit
              </Link>
            </div>
          </div>
        </section>

        {/* Animated flow strip */}
        <section className="ind-flow" aria-label="How our fuel works for you">
          <div className="wrap">
            <p className="eyebrow">How our fuel works for you</p>
            <div className="ind-flow-strip">
              <span className="ind-flow-node">HN Fuel</span>
              <span className="ind-flow-line"><i /></span>
              <span className="ind-flow-node">Boiler or Kiln</span>
              <span className="ind-flow-line"><i /></span>
              <span className="ind-flow-node">Steam or Heat</span>
              <span className="ind-flow-line"><i /></span>
              <span className="ind-flow-node">Your Process</span>
            </div>
          </div>
        </section>

        {/* Filter + Cards */}
        <section className="sec alt-sec">
          <div className="wrap">
            <div className="ind-filters" role="group" aria-label="Filter by application">
              {FILTERS.map((f) => (
                <button
                  key={f.k}
                  type="button"
                  className={`gal-tab${filter === f.k ? " on" : ""}`}
                  onClick={() => setFilter(f.k)}
                  aria-pressed={filter === f.k}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="ind-cards">
              {filtered.map((ind, idx) => {
                const globalIdx = INDUSTRIES.indexOf(ind);
                const isOpen = openIdx === globalIdx;
                return (
                  <article
                    className="ind-card"
                    key={ind.slug}
                    id={ind.slug}
                    data-reveal
                  >
                    <div className="ind-card-media">
                      <img src={ind.img} alt={ind.t} loading="lazy" decoding="async" width="640" height="360" />
                      <span className="ind-card-icon">
                        <Icon name={ind.icon} size={22} />
                      </span>
                      <span className="ind-card-num">
                        {String(globalIdx + 1).padStart(2, "0")}
                      </span>
                      {ind.illustrative && <span className="img-badge">Illustrative</span>}
                    </div>
                    <div className="ind-card-top">
                      <h2 className="ind-card-title">{ind.t}</h2>
                      <p className="ind-card-desc">{ind.d}</p>

                      <div className="ind-card-tags">
                        {ind.tags.map((tag) => (
                          <span key={tag} className="ind-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="ind-fuel-box">
                        <span className="ind-fuel-label">Suggested fuel</span>
                        <span className="ind-fuel-value">{ind.fuel}</span>
                      </div>
                    </div>

                    {/* Check first accordion */}
                    <div className="ind-card-bottom">
                      <button
                        type="button"
                        className={`ind-check-toggle${isOpen ? " is-open" : ""}`}
                        aria-expanded={isOpen}
                        onClick={() => setOpenIdx(isOpen ? -1 : globalIdx)}
                      >
                        <span>Check first</span>
                        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="ind-check-body">
                          <p>{ind.check}</p>
                          <p className="note" style={{ margin: 0, fontSize: "0.8125rem" }}>
                            Suitability depends on boiler type, feeding system and local rules.
                          </p>
                        </div>
                      )}
                      <Link
                        href={`/contact?industry=${encodeURIComponent(ind.t)}&fuel=${encodeURIComponent(ind.fuel)}`}
                        className="btn btn-ember btn-sm ind-card-btn"
                      >
                        Ask about this industry
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* What to share */}
        <section className="sec" id="what-to-share">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow" data-reveal>What to share with us</p>
                <h2 className="h2" data-reveal>
                  Help us suggest the right fuel.
                </h2>
              </div>
            </div>

            <div className="ind-share-grid">
              <div className="card-box" data-reveal>
                <h3>Details we need</h3>
                <ul className="check-list">
                  <li>Boiler type and make</li>
                  <li>Capacity (TPH or kcal/hr)</li>
                  <li>Current fuel being used</li>
                  <li>Monthly fuel requirement</li>
                  <li>Plant location</li>
                </ul>
              </div>

              <ol className="ind-share-steps">
                {SHARE_STEPS.map((s, i) => (
                  <li className="card-box ind-share-step" key={i} data-reveal>
                    <span className="mfg-num">0{i + 1}</span>
                    <p className="body-p">{s}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="sec alt-sec">
          <div className="wrap">
            <div className="price-card" data-reveal>
              <div>
                <p className="eyebrow">Boiler compatibility</p>
                <h2 className="h2 price-h">Plan your switch with a trial load.</h2>
                <p className="sec-lede">
                  Share your boiler capacity and grate type — we will suggest the best diameter and schedule a trial load.
                </p>
              </div>
              <Link href="/contact" className="btn btn-ember" data-magnetic>
                Talk to Our Team <Arrow />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
