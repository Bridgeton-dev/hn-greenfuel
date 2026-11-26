"use client";
import { useEffect, useRef } from "react";
import { gsap, prefersReduced } from "../lib/gsap";
import { scrollState } from "../lib/lenis";
import { MATERIALS } from "../lib/data";

/* two rows that drift in opposite directions; scroll velocity speeds them
   up and flips direction with scroll direction. Off-screen = no work. */
export default function Marquee() {
  const ref = useRef(null);
  useEffect(() => {
    const rows = [...ref.current.querySelectorAll(".mq-track")];
    if (prefersReduced()) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(ref.current);
    const st = rows.map((el, i) => ({ el, x: 0, dir: i ? 1 : -1, w: 0, set: gsap.quickSetter(el, "x", "px") }));
    const measure = () => st.forEach((s) => (s.w = s.el.scrollWidth / 2));
    measure();
    window.addEventListener("resize", measure);
    let sign = 1;
    const tick = (t, dms) => {
      if (!visible || scrollState.hidden) return;
      const dt = Math.min(0.05, dms / 1000);
      if (Math.abs(scrollState.v) > 30) sign = Math.sign(scrollState.v);
      const speed = 60 + Math.min(900, Math.abs(scrollState.v) * 0.6);
      st.forEach((s) => {
        s.x += s.dir * sign * speed * dt;
        if (s.w) s.x = gsap.utils.wrap(-s.w, 0, s.x);
        s.set(s.x);
      });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const row = (alt) =>
    [...MATERIALS, ...MATERIALS].map((m, i) => (
      <span key={i} className={`mq-item${(i + (alt ? 1 : 0)) % 2 ? " out" : ""}`}>
        {m}
        <svg viewBox="0 0 40 56" width="22" height="30" aria-hidden="true">
          <path d="M21 2c2 10 14 15 14 30a15 15 0 0 1-30 0c0-7 3-12 7-15 0 6 2 9 6 10-2-9 0-17 3-25z" fill="currentColor" />
        </svg>
      </span>
    ));
  return (
    <section className="marquee" ref={ref} aria-label="Raw materials: rice husk, sawdust, groundnut shell, mustard stalk, cotton stalk, bagasse">
      <div className="mq-row" aria-hidden="true"><div className="mq-track">{row(false)}</div></div>
      <div className="mq-row alt" aria-hidden="true"><div className="mq-track">{row(true)}</div></div>
    </section>
  );
}
