"use client";
import { useEffect, useRef } from "react";
import { prefersReduced } from "../lib/gsap";
import { scrollState } from "../lib/lenis";

/* rising embers + sparks on a canvas; pointer pushes them, scroll speed
   fans them up. Paused off-screen and in hidden tabs. */
export default function EmberField() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    const reduced = prefersReduced();
    let w = 0, h = 0, dpr = 1, parts = [], raf = 0, visible = true, last = performance.now();
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const spawn = (p, init) => {
      p.x = Math.random() * w;
      p.y = init ? Math.random() * h : h + 10 + Math.random() * 40;
      p.r = Math.random() < 0.12 ? 1.6 + Math.random() * 2.2 : 0.5 + Math.random() * 1.3;
      p.vy = -(18 + Math.random() * 46) * (p.r > 1.6 ? 0.6 : 1);
      p.vx = (Math.random() - 0.5) * 12;
      p.life = 0;
      p.max = 4 + Math.random() * 7;
      p.hue = 18 + Math.random() * 26;
      p.ph = Math.random() * 6.28;
      return p;
    };
    const resize = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(160, Math.max(50, (w * h) / 9000)));
      parts = Array.from({ length: n }, () => spawn({}, true));
    };
    const draw = (dt) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ptr.x += (ptr.tx - ptr.x) * 0.15; ptr.y += (ptr.ty - ptr.y) * 0.15;
      const boost = 1 + Math.min(3, Math.abs(scrollState.v) / 900);
      for (const p of parts) {
        p.life += dt;
        p.ph += dt * 2;
        const dx = p.x - ptr.x, dy = p.y - ptr.y, d2 = dx * dx + dy * dy;
        if (d2 < 22000) {
          const f = (1 - d2 / 22000) * 260 * dt;
          const d = Math.sqrt(d2) || 1;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        }
        p.vx *= 0.985;
        p.x += (p.vx + Math.sin(p.ph) * 8) * dt;
        p.y += p.vy * dt * boost;
        const t = p.life / p.max;
        if (t >= 1 || p.y < -20 || p.x < -30 || p.x > w + 30) { spawn(p, false); continue; }
        const a = Math.sin(Math.PI * t) * (p.r > 1.6 ? 0.9 : 0.75);
        const rad = p.r * (p.r > 1.6 ? 4 : 3);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
        g.addColorStop(0, `hsla(${p.hue + 20}, 100%, 75%, ${a})`);
        g.addColorStop(0.35, `hsla(${p.hue}, 100%, 55%, ${a * 0.55})`);
        g.addColorStop(1, `hsla(${p.hue}, 100%, 45%, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(p.x - rad, p.y - rad, rad * 2, rad * 2);
      }
      ctx.globalCompositeOperation = "source-over";
    };
    const loop = (now) => {
      raf = 0;
      if (!visible || scrollState.hidden) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !reduced) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    resize();
    if (reduced) draw(0); else start();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0 });
    io.observe(cv);
    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      ptr.tx = e.clientX - r.left; ptr.ty = e.clientY - r.top;
    };
    const onLeave = () => { ptr.tx = ptr.ty = -9999; };
    const onVis = () => !document.hidden && start();
    let rt;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { resize(); if (reduced) draw(0); }, 150); };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return <canvas className="embers" ref={ref} aria-hidden="true" />;
}
