"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";
import { lenisRef, scrollState, scrollToTarget } from "../lib/lenis";

/* Global Lenis smooth scrolling + magnetic buttons + per-route [data-reveal] */
export default function SmoothScroll() {
  const pathname = usePathname();

  /* Core Lenis + ticker + anchor clicks + magnetic hover */
  useEffect(() => {
    const reduced = prefersReduced();
    let lenis = null;
    if (!reduced) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.2 });
      lenisRef.current = lenis;
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }
    let prevY = window.scrollY;
    const tick = (time, deltaMs) => {
      if (lenis) lenis.raf(time * 1000);
      const dt = Math.max(0.008, Math.min(0.05, (deltaMs || 16.7) / 1000));
      const y = lenis ? lenis.animatedScroll : window.scrollY;
      const raw = (y - prevY) / dt;
      prevY = y;
      scrollState.y = y;
      scrollState.v += (raw - scrollState.v) * Math.min(1, dt * 12);
      if (Math.abs(scrollState.v) < 0.5) scrollState.v = 0;
    };
    gsap.ticker.add(tick);
    const onVis = () => {
      scrollState.hidden = document.hidden;
      if (document.hidden) scrollState.v = 0;
    };
    document.addEventListener("visibilitychange", onVis);

    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id.length < 2 || !document.querySelector(id)) return;
      e.preventDefault();
      scrollToTarget(id === "#top" ? 0 : id);
    };
    document.addEventListener("click", onClick);

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let mag = null;
    const release = (el) => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)", overwrite: "auto" });
    const onMove = (e) => {
      const el = e.target.closest?.("[data-magnetic]");
      if (mag && mag.el !== el) {
        release(mag.el);
        mag = null;
      }
      if (!el) return;
      if (!mag) {
        const r = el.getBoundingClientRect();
        const ox = Number(gsap.getProperty(el, "x")) || 0;
        const oy = Number(gsap.getProperty(el, "y")) || 0;
        mag = {
          el,
          cx: r.left - ox + r.width / 2,
          cy: r.top - oy + r.height / 2,
          qx: gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" }),
          qy: gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" }),
        };
      }
      mag.qx(gsap.utils.clamp(-16, 16, (e.clientX - mag.cx) * 0.3));
      mag.qy(gsap.utils.clamp(-12, 12, (e.clientY - mag.cy) * 0.4));
    };
    const drop = () => mag && (release(mag.el), (mag = null));
    if (fine && !reduced) {
      document.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", drop, { passive: true });
      document.addEventListener("pointerleave", drop);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", drop);
      document.removeEventListener("pointerleave", drop);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Per-route scroll reset & [data-reveal] initialization */
  useEffect(() => {
    if (pathname !== "/") {
      document.documentElement.classList.add("is-ready");
      window.__hnPreloaded = true;
    }
    if (!window.location.hash) {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }

    if (prefersReduced()) return;

    let batch = [];
    const timer = setTimeout(() => {
      const els = gsap.utils.toArray("[data-reveal]");
      if (!els.length) return;
      const vh = window.innerHeight || 900;
      const below = els.filter((el) => el.getBoundingClientRect().top > vh * 0.95);
      const above = els.filter((el) => el.getBoundingClientRect().top <= vh * 0.95);
      gsap.set(above, { y: 0, autoAlpha: 1 });
      if (below.length) {
        gsap.set(below, { y: 32, autoAlpha: 0 });
        batch = ScrollTrigger.batch(below, {
          start: "top 92%",
          once: true,
          onEnter: (b) => gsap.to(b, { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.06, ease: "power3.out", overwrite: true }),
        });
      }
      ScrollTrigger.refresh();
    }, 60);

    const t2 = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      clearTimeout(timer);
      clearTimeout(t2);
      batch.forEach((s) => s.kill());
    };
  }, [pathname]);

  return null;
}
