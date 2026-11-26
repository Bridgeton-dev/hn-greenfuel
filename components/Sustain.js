"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";
import { IMPACT } from "../lib/data";
import Split from "./Split";
import Icon from "./Icons";
import { Arrow } from "./Hero";

export default function Sustain() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".su-img img", { yPercent: -12, scale: 1.15 }, { yPercent: 12, scale: 1.15, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".su-leaf", { y: 60, rotate: -20 }, { y: -80, rotate: 25, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      el.querySelectorAll("[data-impact]").forEach((n) => {
        const to = Number(n.dataset.impact), o = { v: 0 };
        n.textContent = "0";
        ScrollTrigger.create({ trigger: n, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: to, duration: 2.2, ease: "power3.out", onUpdate: () => (n.textContent = Math.round(o.v).toLocaleString("en-IN")) }) });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sustainability" className="sustain" ref={ref}>
      <div className="su-img" aria-hidden="true">
        <img src="/img/field.webp" srcSet="/img/field-sm.webp 800w, /img/field.webp 1600w" sizes="100vw" alt="" loading="lazy" decoding="async" width="1600" height="893" />
      </div>
      <div className="su-shade" aria-hidden="true" />
      <span className="su-leaf a" aria-hidden="true"><Icon name="leaf" size={90} /></span>
      <span className="su-leaf b" aria-hidden="true"><Icon name="leaf" size={56} /></span>
      <div className="wrap su-in">
        <p className="eyebrow leaf-t" data-reveal>Sustainability</p>
        <Split className="h2" text="Less smoke over the fields. Less coal in the boiler." />
        <p className="sec-lede" data-reveal>
          Every tonne we press is crop and wood residue kept from open burning, turning farm waste into industrial fuel and farmer income.
        </p>
        <div className="impact">
          {IMPACT.map((x, i) => (
            <div className="imp" key={i} data-reveal>
              <div className="imp-n"><span data-impact={x.v}>{x.v.toLocaleString("en-IN")}</span><small>{x.unit}</small></div>
              <p>{x.label}</p>
            </div>
          ))}
        </div>
        <p className="note">Illustrative figures for a hypothetical plant using ~1,000 t of briquettes a year in place of coal. Not measured results; actual impact depends on fuel replaced, raw material and plant efficiency.</p>
        <div style={{ marginTop: "2rem" }} data-reveal>
          <Link href="/sustainability" className="btn btn-ghost" data-magnetic>
            Read our sustainability approach <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
