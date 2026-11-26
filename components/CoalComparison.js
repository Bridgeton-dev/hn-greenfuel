"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";
import { COAL_COMPARISON, COMPARISON_BARS, COMPARISON_BENEFITS } from "../lib/data";
import Icon from "./Icons";
import Split from "./Split";

export default function CoalComparison({ embedded = false }) {
  const [fuel, setFuel] = useState("bri"); // mobile tab: "bri" | "pel"
  const barsRef = useRef(null);

  useEffect(() => {
    const el = barsRef.current;
    if (!el || prefersReduced()) return;
    const bars = [...el.querySelectorAll(".cmp-bar i")];
    gsap.set(bars, { scaleX: 0 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 86%",
      once: true,
      onEnter: () =>
        bars.forEach((b, i) =>
          gsap.to(b, {
            scaleX: Number(b.dataset.v) / 100,
            duration: 1.2,
            delay: 0.08 + i * 0.08,
            ease: "expo.out",
          })
        ),
    });
    return () => st.kill();
  }, []);

  return (
    <div className={`cmp-wrap${embedded ? "" : " sec alt-sec"}`}>
      <div className={embedded ? "" : "wrap"}>
        <div className="cmp-intro">
          <p className="eyebrow" data-reveal>Fuel comparison</p>
          {embedded ? (
            <h3 className="sub-h" data-reveal>Biomass Fuels vs. Fossil Coal Comparison</h3>
          ) : (
            <Split className="h2" text="Biomass Fuels vs. Fossil Coal Comparison" />
          )}
          <p className="sec-lede" data-reveal>
            See how briquettes and pellets compare with typical Indian thermal coal.
          </p>
        </div>

        {/* Mobile fuel switcher */}
        <div className="cmp-tabs" role="tablist" aria-label="Select biomass fuel for comparison">
          <button
            type="button"
            role="tab"
            aria-selected={fuel === "bri"}
            className={`cmp-tab${fuel === "bri" ? " on" : ""}`}
            onClick={() => setFuel("bri")}
          >
            Briquettes
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={fuel === "pel"}
            className={`cmp-tab${fuel === "pel" ? " on" : ""}`}
            onClick={() => setFuel("pel")}
          >
            Pellets
          </button>
        </div>

        {/* Desktop 4-col table */}
        <div className="cmp-table-desk" data-reveal>
          <table className="cmp-tbl">
            <thead>
              <tr>
                <th>Parameter</th>
                <th className="col-bio">Biomass Briquettes</th>
                <th className="col-bio">Biomass Pellets</th>
                <th className="col-coal">Indian Thermal Coal</th>
              </tr>
            </thead>
            <tbody>
              {COAL_COMPARISON.map((row) => (
                <tr key={row.p}>
                  <td>{row.p}</td>
                  <td className="col-bio">{row.bri}</td>
                  <td className="col-bio">{row.pel}</td>
                  <td className="col-coal">{row.coal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile 3-col table (no horizontal scroll) */}
        <div className="cmp-table-mob">
          <table className="cmp-tbl">
            <thead>
              <tr>
                <th>Parameter</th>
                <th className="col-bio">{fuel === "bri" ? "Briquettes" : "Pellets"}</th>
                <th className="col-coal">Coal</th>
              </tr>
            </thead>
            <tbody>
              {COAL_COMPARISON.map((row) => (
                <tr key={row.p}>
                  <td>{row.p}</td>
                  <td className="col-bio">{fuel === "bri" ? row.bri : row.pel}</td>
                  <td className="col-coal">{row.coal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Small animated bars for Ash & Calorific value */}
        <div className="cmp-bars-box" ref={barsRef} data-reveal>
          <div className="cmp-bars-head">
            <span>Quick visual: Ash &amp; Calorific Value</span>
            <div className="cmp-key">
              <span className="k coal">Indian Thermal Coal</span>
              <span className="k bri">Biomass Briquettes / Pellets</span>
            </div>
          </div>
          {COMPARISON_BARS.map((c) => (
            <div className="cmp-row" key={c.k}>
              <div className="cmp-k">{c.k}</div>
              <div className="cmp-bars">
                <div className="cmp-bar coal"><i data-v={c.coal[0]} /><span>{c.coal[1]}</span></div>
                <div className="cmp-bar bri"><i data-v={c.bri[0]} /><span>{c.bri[1]}</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* 3 short benefit cards */}
        <div className="three-grid cmp-benefits">
          {COMPARISON_BENEFITS.map((b) => (
            <div className="card-box cmp-ben-card" key={b.t} data-reveal>
              <span className="pr-ico" style={{ marginBottom: "0.4rem" }}><Icon name={b.icon} size={24} /></span>
              <h4>{b.t}</h4>
              <p className="body-p" style={{ margin: 0 }}>{b.d}</p>
            </div>
          ))}
        </div>

        <p className="note">
          Indicative values. Actual results depend on raw material, coal grade, batch and boiler. Ask for a lab report.
        </p>
      </div>
    </div>
  );
}
