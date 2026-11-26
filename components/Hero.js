"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReduced } from "../lib/gsap";
import { BRAND, waLink } from "../lib/brand";
import Split from "./Split";
import EmberField from "./EmberField";
import Briquette3D from "./Briquette3D";

const HERO_SPECS = [
  ["3,800–4,400", "kcal/kg calorific value"],
  ["Below 10%", "Moisture all grades"],
  ["60 / 70 / 90 mm", "Briquette logs"],
  ["6 / 8 mm", "Biomass pellets"],
];

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    gsap.set(q(".hero-fade"), { y: 18, autoAlpha: 0 });
    gsap.set(q(".bq-wrap"), { scale: 0.85, autoAlpha: 0 });

    const play = () => {
      gsap.to(q(".hero-fade"), { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.08, delay: 0.25, ease: "power3.out" });
      gsap.to(q(".bq-wrap"), { scale: 1, autoAlpha: 1, duration: 1.2, delay: 0.1, ease: "expo.out" });
    };

    if (document.documentElement.classList.contains("is-ready") || window.__hnPreloaded) play();
    else window.addEventListener("hn:ready", play, { once: true });

    return () => {
      window.removeEventListener("hn:ready", play);
    };
  }, []);

  return (
    <section className="hero" ref={ref} aria-label="Introduction">
      <div className="hero-bg" aria-hidden="true">
        <img
          src="/img/flame.webp"
          alt=""
          className="hero-photo"
          loading="eager"
          decoding="async"
          width="1600"
          height="900"
        />
        <div className="hero-scrim" />
      </div>
      <EmberField />
      <Briquette3D />

      <div className="hero-copy wrap">
        <p className="eyebrow hero-fade">
          <span className="dot" />
          {BRAND.name} · Biomass Briquettes &amp; Pellets
        </p>
        <Split as="h1" className="hero-h" lines={BRAND.heroLines} onReady delay={0.05} />
        <p className="hero-sub hero-fade">
          Biomass briquettes and pellets made from crop and wood residue for industrial boilers, kilns and furnaces.
        </p>
        <div className="hero-ctas hero-fade">
          <a href="#contact" className="btn btn-ember" data-magnetic>
            Get a quote<Arrow />
          </a>
          <Link href="/products" className="btn btn-ghost" data-magnetic>
            View products
          </Link>
          <a
            href={waLink(`Hello ${BRAND.name}, I'd like a quote for biomass briquettes.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-wa-link"
          >
            WhatsApp us ↗
          </a>
        </div>
      </div>

      <div className="hero-specs wrap hero-fade" aria-label="Key fuel specifications">
        {HERO_SPECS.map(([val, lbl]) => (
          <div className="hs-item" key={val}>
            <b>{val}</b>
            <span>{lbl}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg className="arr" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
