"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";

const N = 28; // side strips

/* a CSS-3D hollow briquette log: strips around a cylinder + two end caps
   with the centre hole. Spins on its axis, tilts toward the pointer, and
   rolls a little with scroll. Transforms only. */
export default function Briquette3D() {
  const wrap = useRef(null);
  const spin = useRef(null);
  const tilt = useRef(null);
  useEffect(() => {
    const reduced = prefersReduced();
    if (reduced) return;
    const sp = gsap.to(spin.current, { rotateY: 360, duration: 16, ease: "none", repeat: -1 });
    const st = ScrollTrigger.create({
      trigger: wrap.current, start: "top bottom", end: "bottom top",
      onToggle: (s) => (s.isActive ? sp.play() : sp.pause()),
    });
    const roll = gsap.to(wrap.current, { yPercent: 18, rotate: -8, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top top+=10%", end: "bottom top", scrub: true } });
    let qx, qy;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      qx = gsap.quickTo(tilt.current, "rotateX", { duration: 1, ease: "power3.out" });
      qy = gsap.quickTo(tilt.current, "rotateZ", { duration: 1, ease: "power3.out" });
    }
    const onMove = (e) => {
      if (!qx) return;
      const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
      qx(-ny * 18); qy(nx * 14);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      sp.kill(); st.kill(); roll.scrollTrigger?.kill(); roll.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return (
    <div className="bq-wrap" ref={wrap} aria-hidden="true">
      <div className="bq-glow" />
      <div className="bq-scene">
        <div className="bq-tilt" ref={tilt}>
          <div className="bq-pose">
            <div className="bq-spin" ref={spin}>
              {Array.from({ length: N }, (_, i) => (
                <span key={i} className={`bq-strip s${i % 4}`} style={{ "--i": i, "--n": N }} />
              ))}
              <span className="bq-cap top" />
              <span className="bq-cap bot" />
            </div>
          </div>
        </div>
      </div>
      <div className="bq-shade" />
      <div className="bq-floor" />
    </div>
  );
}
