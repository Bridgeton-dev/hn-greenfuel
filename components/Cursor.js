"use client";
import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/* dot + trailing ring; ring grows over interactive things (fine pointers only) */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3.out" });
    let hot = false;
    const move = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      root.classList.add("cursor-on");
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const h = !!e.target.closest?.("a, button, input, select, textarea, label, [data-cursor]");
      if (h !== hot) {
        hot = h;
        ring.current.classList.toggle("hot", h);
      }
    };
    const leave = () => root.classList.remove("cursor-on");
    const down = () => ring.current.classList.add("down");
    const up = () => ring.current.classList.remove("down");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      root.classList.remove("has-cursor", "cursor-on");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);
  return (
    <>
      <div className="c-dot" ref={dot} aria-hidden="true" />
      <div className="c-ring" ref={ring} aria-hidden="true" />
    </>
  );
}
