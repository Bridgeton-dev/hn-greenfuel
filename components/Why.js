"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";
import { STATS } from "../lib/data";
import Split from "./Split";
import CoalComparison from "./CoalComparison";

const fmt = (n, f) => (f ? Math.round(n).toLocaleString("en-IN") : String(Math.round(n)));

export default function Why() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const nums = [...el.querySelectorAll("[data-count]")];
    const sts = [];
    nums.forEach((n) => {
      const s = STATS[Number(n.dataset.count)];
      const o = { v: s.from };
      n.textContent = fmt(s.from, s.fmt);
      sts.push(
        ScrollTrigger.create({
          trigger: n,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(o, {
              v: s.to,
              duration: 1.8,
              ease: "power3.out",
              onUpdate: () => (n.textContent = fmt(o.v, s.fmt)),
            }),
        })
      );
    });
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

        <CoalComparison embedded />
      </div>
    </section>
  );
}
