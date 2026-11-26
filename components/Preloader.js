"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "../lib/gsap";
import { BRAND } from "../lib/brand";
import { lockScroll, unlockScroll } from "../lib/lenis";

const PARTICLES = [
  { x: -130, y: -90, r: -35, c: "#8fc65a" },
  { x: 135, y: -80, r: 42, c: "#ffc46b" },
  { x: -145, y: 15, r: 24, c: "#d8b979" },
  { x: 145, y: 20, r: -28, c: "#8fc65a" },
  { x: -110, y: 95, r: 50, c: "#ffc46b" },
  { x: 115, y: 90, r: -46, c: "#d8b979" },
  { x: -40, y: -120, r: 18, c: "#8fc65a" },
  { x: 45, y: 115, r: -20, c: "#ffc46b" },
];

const LETTERS = "HN GREENFUEL".split("");

/* Biomass-to-fire story preloader (~2.4s) on initial entry, with skip button,
   session-once guard, reduced-motion fallback, and 4s hard safety timeout. */
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

    // Hard maximum 4 seconds
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

      // Progress bar & 0-100% counter (0.0 -> 2.0s)
      tl.to(
        c,
        {
          v: 100,
          duration: 2.0,
          ease: "power2.inOut",
          onUpdate: () => {
            if (num.current) num.current.textContent = String(Math.round(c.v)).padStart(2, "0");
          },
        },
        0
      )
        .fromTo(".pl-bar i", { scaleX: 0 }, { scaleX: 1, duration: 2.0, ease: "power2.inOut" }, 0);

      // 0.0 - 0.7s: husk/sawdust/straw particles fly in from edges to center
      PARTICLES.forEach((p, idx) => {
        tl.fromTo(
          `.pl-pt-${idx}`,
          { x: p.x, y: p.y, rotation: p.r, opacity: 0, scale: 1.2 },
          { x: 0, y: 0, rotation: 0, opacity: 1, scale: 0.7, duration: 0.65, ease: "power3.in" },
          idx * 0.02
        );
      });
      tl.to(".pl-particles", { opacity: 0, scale: 0.3, duration: 0.18, ease: "power2.in" }, 0.62);

      // 0.7 - 1.3s: compress into hollow briquette shape with "thud" effect
      tl.fromTo(
        ".pl-briq",
        { scale: 1.55, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "power4.out" },
        0.7
      )
        .to(".pl-stage", { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1, ease: "power2.inOut" }, 1.0)
        .fromTo(".pl-ring", { scale: 0.5, opacity: 0.8 }, { scale: 1.9, opacity: 0, duration: 0.45, ease: "power2.out" }, 1.0);

      // 1.3 - 1.8s: center glows, flame rises, embers float
      tl.fromTo(".pl-glow", { scale: 0.3, opacity: 0 }, { scale: 1.35, opacity: 1, duration: 0.45, ease: "power2.out" }, 1.25)
        .fromTo(".pl-flame", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)" }, 1.3)
        .fromTo(
          ".pl-spark",
          { y: 0, opacity: 0, scale: 0.6 },
          { y: -44, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power1.out" },
          1.35
        )
        .to(".pl-spark", { opacity: 0, duration: 0.25 }, 1.75);

      // 1.6 - 2.0s: "HN GREENFUEL" letter-by-letter + legal sub + tagline
      tl.fromTo(
        ".pl-letter",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, stagger: 0.025, ease: "power3.out" },
        1.58
      )
        .fromTo(".pl-legal", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, 1.78)
        .fromTo(".pl-tag", { opacity: 0 }, { opacity: 1, duration: 0.25 }, 1.82);

      // 2.0 - 2.4s: upward curtain reveal, hero begins
      tl.add(() => {
        window.__hnPreloaded = true;
        ready();
      }, 2.0)
        .to(el, { yPercent: -100, duration: 0.45, ease: "power4.inOut" }, 2.0);
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
        <button
          type="button"
          className="pl-skip"
          onClick={() => finishRef.current && finishRef.current()}
        >
          Skip
        </button>

        <div className="pl-center">
          <div className="pl-stage" aria-hidden="true">
            <span className="pl-glow" />
            <span className="pl-ring" />

            {/* Incoming husk / sawdust / straw particles */}
            <div className="pl-particles">
              {PARTICLES.map((p, idx) => (
                <span
                  key={idx}
                  className={`pl-pt pl-pt-${idx}`}
                  style={{ background: p.c }}
                />
              ))}
            </div>

            {/* Hollow cylindrical briquette */}
            <svg className="pl-briq" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="24" fill="#c98842" stroke="#ffc46b" strokeWidth="2.5" />
              <circle cx="40" cy="40" r="8" fill="#0f0d0b" stroke="#ff6a1a" strokeWidth="2" />
            </svg>

            {/* Flame rising */}
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

            {/* Floating embers */}
            <span className="pl-spark pl-s1" />
            <span className="pl-spark pl-s2" />
            <span className="pl-spark pl-s3" />
          </div>

          <div className="pl-brand">
            <div className="pl-word" aria-label="HN GREENFUEL">
              {LETTERS.map((ch, i) => (
                <span key={i} className="pl-letter">
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </div>
            <div className="pl-legal">ARGO INDUSTRIES PRIVATE LIMITED</div>
          </div>

          <div className="pl-bar"><i /></div>
        </div>

        <div className="pl-num"><span ref={num}>00</span>%</div>
        <div className="pl-tag">{BRAND.tagline}</div>
      </div>
    </>
  );
}
