"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "../lib/gsap";
import { BRAND } from "../lib/brand";
import { lockScroll, unlockScroll } from "../lib/lenis";

/* Count up 0–100 on initial site entry, ember grows, flame appears and loader
   slides away. Skips automatically on subsequent client-side returns to Home. */
export default function Preloader() {
  const [gone, setGone] = useState(false);
  const root = useRef(null);
  const num = useRef(null);

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
    lockScroll();
    const finish = () => {
      if (done) return;
      done = true;
      window.__hnPreloaded = true;
      unlockScroll();
      ready();
      setGone(true);
    };
    const hard = setTimeout(finish, 3600);
    if (prefersReduced()) {
      if (num.current) num.current.textContent = "100";
      const t = setTimeout(() => {
        el.style.opacity = "0";
        setTimeout(finish, 220);
      }, 250);
      return () => {
        clearTimeout(t);
        clearTimeout(hard);
        if (!done) unlockScroll();
      };
    }
    const c = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(c, { v: 100, duration: 1.5, ease: "power2.inOut", onUpdate: () => num.current && (num.current.textContent = String(Math.round(c.v)).padStart(2, "0")) }, 0)
      .fromTo(".pl-bar i", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
      .fromTo(".pl-ember", { scale: 0.25, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 1.25, ease: "power2.in" }, 0.15)
      .fromTo(".pl-flame", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, 1.25)
      .to(".pl-glow", { scale: 9, opacity: 0, duration: 0.85, ease: "power2.out" }, 1.55)
      .add(() => {
        window.__hnPreloaded = true;
        ready();
      }, 1.75)
      .to(el, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, 1.8);
    return () => {
      clearTimeout(hard);
      tl.kill();
      if (!done) unlockScroll();
    };
  }, []);

  if (gone) return null;
  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pl-center">
        <div className="pl-fire">
          <span className="pl-glow" />
          <svg className="pl-flame" viewBox="0 0 40 56">
            <path d="M21 2c2 10 14 15 14 30a15 15 0 0 1-30 0c0-7 3-12 7-15 0 6 2 9 6 10-2-9 0-17 3-25z" fill="url(#plg)" />
            <defs>
              <linearGradient id="plg" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#ff6a1a" />
                <stop offset="1" stopColor="#ffd27a" />
              </linearGradient>
            </defs>
          </svg>
          <span className="pl-ember" />
        </div>
        <div className="pl-word">{BRAND.wordmark}</div>
        <div className="pl-bar"><i /></div>
      </div>
      <div className="pl-num"><span ref={num}>00</span>%</div>
      <div className="pl-tag">{BRAND.tagline}</div>
    </div>
  );
}
