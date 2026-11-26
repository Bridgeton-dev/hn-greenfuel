"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReduced } from "../lib/gsap";
import { BRAND } from "../lib/brand";
import Split from "./Split";
import EmberField from "./EmberField";
import Briquette3D from "./Briquette3D";

export default function Hero() {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    const q = gsap.utils.selector(el);
    gsap.set(q(".hero-fade"), { y: 24, autoAlpha: 0 });
    gsap.set(q(".bq-wrap"), { scale: 0.7, autoAlpha: 0 });
    const play = () => {
      gsap.to(q(".hero-fade"), { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, delay: 0.4, ease: "power3.out" });
      gsap.to(q(".bq-wrap"), { scale: 1, autoAlpha: 1, duration: 1.5, delay: 0.15, ease: "expo.out" });
    };
    if (document.documentElement.classList.contains("is-ready") || window.__hnPreloaded) play();
    else window.addEventListener("hn:ready", play, { once: true });
    const par = gsap.to(q(".hero-copy"), {
      yPercent: -12,
      autoAlpha: 0.2,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
    return () => {
      window.removeEventListener("hn:ready", play);
      par.scrollTrigger?.kill();
      par.kill();
    };
  }, []);

  return (
    <section className="hero" ref={ref} aria-label="Introduction">
      <div className="hero-bg" aria-hidden="true" />
      <EmberField />
      <Briquette3D />
      <div className="hero-copy wrap">
        <p className="eyebrow hero-fade"><span className="dot" />Biomass briquettes & pellets · {BRAND.region}</p>
        <Split as="h1" className="hero-h" lines={BRAND.heroLines} onReady delay={0.1} />
        <p className="hero-sub hero-fade">
          White-coal briquettes and pellets pressed from sawdust, rice husk and farm residue — a cleaner, renewable replacement for coal in your boiler, kiln or furnace.
        </p>
        <div className="hero-ctas hero-fade">
          <a href="#contact" className="btn btn-ember" data-magnetic>
            Get a quote<Arrow />
          </a>
          <Link href="/products" className="btn btn-ghost" data-magnetic>
            Explore products
          </Link>
        </div>
      </div>
      <div className="hero-foot wrap hero-fade">
        <span>Typical 3,800–4,400 kcal/kg</span>
        <span className="hide-sm">60·70·90 mm logs & 6–8 mm pellets</span>
        <span className="scroll-cue"><i />Scroll</span>
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
