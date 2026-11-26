"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "../lib/gsap";
import { BRAND } from "../lib/brand";
import { lockScroll, unlockScroll } from "../lib/lenis";

const PARTICLES = [
  { x: -120, y: -80, r: -35, c: "#8fc65a" },
  { x: 125, y: -70, r: 42, c: "#ffc46b" },
  { x: -135, y: 15, r: 24, c: "#d8b979" },
  { x: 135, y: 20, r: -28, c: "#8fc65a" },
  { x: -100, y: 85, r: 50, c: "#ffc46b" },
  { x: 105, y: 80, r: -46, c: "#d8b979" },
  { x: -35, y: -110, r: 18, c: "#8fc65a" },
  { x: 40, y: 105, r: -20, c: "#ffc46b" },
];

const LETTERS = "HN GREENFUEL".split("");

/* Centred biomass-to-fire preloader (~2.4s). Progress bar and % beside it.
   Skip button at bottom centre. Session-once, 4s hard max, reduced-motion fallback. */
export default function Preloader() {
  const [gone, setGone] = useState(false);
  const root = useRef(null);
  const num = useRef(null);
  const finishRef = useRef(null);

  useEffect(() => {
    const ready = () => {
      document.documentElement.classList.add("is-ready");
      window.dispatchEvent(new CustomEvent("hn:ready"));
    };

    if (window.__hnPreloaded) {
      ready();
      setGone(true);
      return;
    }

    const el = root.current;
    if (!el) return;

    let done = false;
    let tl;
    lockScroll();

    const finish = () => {
      if (done) return;
      done = true;
      if (tl) tl.kill();
      window.__hnPreloaded = true;
      unlockScroll();
      ready();
      setGone(true);
    };
    finishRef.current = finish;

    const hard = setTimeout(finish, 4000);

    if (prefersReduced()) {
      if (num.current) num.current.textContent = "100";
      const t = setTimeout(() => {
        el.style.transition = "opacity 0.25s ease";
        el.style.opacity = "0";
        setTimeout(finish, 240);
      }, 200);
      return () => {
        clearTimeout(t);
        clearTimeout(hard);
        if (!done) unlockScroll();
      };
    }

    const c = { v: 0 };
    const ctx = gsap.context(() => {
      tl = gsap.timeline({ onComplete: finish });

      /* Progress bar & counter: 0 → 100 over 2.0s */
      tl.to(
        c,
        {
          v: 100,
          duration: 2.0,
          ease: "power2.inOut",
          onUpdate: () => {
            if (num.current) num.current.textContent = String(Math.round(c.v));
          },
        },
        0
      ).fromTo(".pl-bar i", { scaleX: 0 }, { scaleX: 1, duration: 2.0, ease: "power2.inOut" }, 0);

      /* 0.0–0.6s: biomass particles gather to centre */
      PARTICLES.forEach((p, idx) => {
        tl.fromTo(
          `.pl-pt-${idx}`,
          { x: p.x, y: p.y, rotation: p.r, opacity: 0, scale: 1.2 },
          { x: 0, y: 0, rotation: 0, opacity: 1, scale: 0.7, duration: 0.55, ease: "power3.in" },
          idx * 0.015
        );
      });
      tl.to(".pl-particles", { opacity: 0, scale: 0.3, duration: 0.14, ease: "power2.in" }, 0.52);

      /* 0.5–1.1s: compress into briquette with gentle press thud */
      tl.fromTo(
        ".pl-briq",
        { scale: 1.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power4.out" },
        0.55
      )
        .to(".pl-stage", { scale: 0.95, duration: 0.07, yoyo: true, repeat: 1, ease: "power2.inOut" }, 0.85)
        .fromTo(".pl-ring", { scale: 0.5, opacity: 0.7 }, { scale: 1.8, opacity: 0, duration: 0.4, ease: "power2.out" }, 0.85);

      /* 1.0–1.5s: flame grows, ember glow, a few embers rise */
      tl.fromTo(".pl-glow", { scale: 0.3, opacity: 0 }, { scale: 1.3, opacity: 1, duration: 0.4, ease: "power2.out" }, 1.0)
        .fromTo(".pl-flame", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, 1.05)
        .fromTo(
          ".pl-spark",
          { y: 0, opacity: 0, scale: 0.6 },
          { y: -38, opacity: 1, scale: 1, duration: 0.45, stagger: 0.07, ease: "power1.out" },
          1.1
        )
        .to(".pl-spark", { opacity: 0, duration: 0.22 }, 1.5);

      /* 1.2–1.8s: HN GREENFUEL letter-by-letter, company line, tagline fade up */
      tl.fromTo(
        ".pl-letter",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, stagger: 0.022, ease: "power3.out" },
        1.25
      )
        .fromTo(".pl-legal", { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" }, 1.5)
        .fromTo(".pl-tagline", { opacity: 0 }, { opacity: 1, duration: 0.22 }, 1.55);

      /* 2.0–2.4s: content fades and screen lifts into hero */
      tl.to(".pl-center", { opacity: 0, duration: 0.2, ease: "power2.in" }, 1.95)
        .add(() => {
          window.__hnPreloaded = true;
          ready();
        }, 2.0)
        .to(el, { yPercent: -100, duration: 0.42, ease: "power4.inOut" }, 2.0);
    }, el);

    return () => {
      clearTimeout(hard);
      ctx.revert();
      if (!done) unlockScroll();
    };
  }, []);

  if (gone) return null;

  return (
    <>
      <noscript>
        <style>{`.preloader{display:none!important}`}</style>
      </noscript>
      <div className="preloader" ref={root} role="status" aria-label="Loading HN Greenfuel">
        <div className="pl-center">
          {/* Animated stage: briquette + flame */}
          <div className="pl-stage" aria-hidden="true">
            <span className="pl-glow" />
            <span className="pl-ring" />

            <div className="pl-particles">
              {PARTICLES.map((p, idx) => (
                <span key={idx} className={`pl-pt pl-pt-${idx}`} style={{ background: p.c }} />
              ))}
            </div>

            <svg className="pl-briq" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="24" fill="#c98842" stroke="#ffc46b" strokeWidth="2.5" />
              <circle cx="40" cy="40" r="8" fill="#0f0d0b" stroke="#ff6a1a" strokeWidth="2" />
            </svg>

            <svg className="pl-flame" viewBox="0 0 40 56">
              <path
                d="M21 2c2 10 14 15 14 30a15 15 0 0 1-30 0c0-7 3-12 7-15 0 6 2 9 6 10-2-9 0-17 3-25z"
                fill="url(#plg)"
              />
              <defs>
                <linearGradient id="plg" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#ff6a1a" />
                  <stop offset="1" stopColor="#ffd27a" />
                </linearGradient>
              </defs>
            </svg>

            <span className="pl-spark pl-s1" />
            <span className="pl-spark pl-s2" />
            <span className="pl-spark pl-s3" />
          </div>

          {/* Brand text */}
          <div className="pl-brand">
            <div className="pl-word" aria-label="HN GREENFUEL">
              {LETTERS.map((ch, i) => (
                <span key={i} className="pl-letter">
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </div>
            <div className="pl-legal">ARGO INDUSTRIES PRIVATE LIMITED</div>
            <div className="pl-tagline">{BRAND.tagline}</div>
          </div>

          {/* Progress bar with % beside it */}
          <div className="pl-progress">
            <div className="pl-bar"><i /></div>
            <span className="pl-num"><span ref={num}>0</span>%</span>
          </div>
        </div>

        {/* Skip at bottom centre */}
        <button
          type="button"
          className="pl-skip"
          onClick={() => finishRef.current && finishRef.current()}
        >
          Skip
        </button>
      </div>
    </>
  );
}
