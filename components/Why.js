"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";
import { COMPARE, STATS } from "../lib/data";
import Split from "./Split";

const fmt = (n, f) => (f ? Math.round(n).toLocaleString("en-IN") : String(Math.round(n)));

export default function Why() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (prefersReduced()) return;
    const bars = [...el.querySelectorAll(".cmp-bar i")];
    const nums = [...el.querySelectorAll("[data-count]")];
    const sts = [];
    nums.forEach((n) => {
      const s = STATS[Number(n.dataset.count)];
      const o = { v: s.from };
      n.textContent = fmt(s.from, s.fmt);
      sts.push(ScrollTrigger.create({
        trigger: n, start: "top 90%", once: true,
        onEnter: () => gsap.to(o, { v: s.to, duration: 2, ease: "power3.out", onUpdate: () => (n.textContent = fmt(o.v, s.fmt)) }),
      }));
    });
    gsap.set(bars, { scaleX: 0 });
    sts.push(ScrollTrigger.create({
      trigger: el.querySelector(".cmp"), start: "top 80%", once: true,
      onEnter: () => bars.forEach((b, i) => gsap.to(b, { scaleX: Number(b.dataset.v) / 100, duration: 1.4, delay: 0.1 + i * 0.08, ease: "expo.out" })),
    }));
    return () => sts.forEach((s) => s.kill());
  }, []);
  return (
    <section id="why" className="sec why" ref={ref}>
      <div className="wrap">
        <p className="eyebrow" data-reveal>Why briquettes</p>
        <Split className="h2" text="Same fire as coal. A fraction of the ash." />
        <div className="stats">
          {STATS.map((s, i) => (
            <div className="stat" key={i} data-reveal>
              <div className="stat-n">
                <span className="stat-pre">{s.prefix}</span>
                <span data-count={i}>{fmt(s.to, s.fmt)}</span>
                <span>{s.suffix}</span>
              </div>
              {s.unit && <div className="stat-u">{s.unit}</div>}
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="cmp" data-reveal>
          <div className="cmp-head">
            <h3>Coal vs. biomass briquettes</h3>
            <div className="cmp-key"><span className="k coal">Typical Indian thermal coal</span><span className="k bri">Biomass briquettes</span></div>
          </div>
          {COMPARE.map((c) => (
            <div className="cmp-row" key={c.k}>
              <div className="cmp-k">{c.k}</div>
              <div className="cmp-bars">
                <div className="cmp-bar coal"><i data-v={c.coal[0]} /><span>{c.coal[1]}</span></div>
                <div className="cmp-bar bri"><i data-v={c.bri[0]} /><span>{c.bri[1]}</span></div>
              </div>
            </div>
          ))}
          <p className="note">Indicative comparison. Coal varies widely by grade and source; briquette values are typical ranges that depend on raw material and batch. Ask us for test data on your lot.</p>
        </div>
      </div>
    </section>
  );
}
