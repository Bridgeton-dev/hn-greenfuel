"use client";
import { Fragment, useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";

/* Split heading lines into word spans so they can slide up one line
   at a time on scroll (or when the preloader says go). */
export default function Split({ as: Tag = "span", className = "", text = "", lines = null, delay = 0, onReady = false, ...rest }) {
  const ref = useRef(null);
  const rows = Array.isArray(lines) ? lines : [text];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      el.classList.add("split-done");
      return;
    }
    const inner = [...el.querySelectorAll(".sw-i")];
    const groups = [];
    let last = null;
    inner.forEach((w) => {
      const top = Math.round(w.parentElement.offsetTop);
      if (last === null || Math.abs(top - last) > 4) {
        groups.push([]);
        last = top;
      }
      groups[groups.length - 1].push(w);
    });
    gsap.set(inner, { yPercent: 118, rotate: 5 });
    const play = () =>
      groups.forEach((ws, i) =>
        gsap.to(ws, {
          yPercent: 0,
          rotate: 0,
          duration: 1.15,
          delay: delay + i * 0.13,
          ease: "power4.out",
          overwrite: true,
          onComplete: () => el.classList.add("split-done"),
        })
      );
    if (onReady) {
      if (document.documentElement.classList.contains("is-ready") || window.__hnPreloaded) play();
      else window.addEventListener("hn:ready", play, { once: true });
      return () => {
        window.removeEventListener("hn:ready", play);
        gsap.killTweensOf(inner);
      };
    }
    const st = ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: play });
    return () => {
      st.kill();
      gsap.killTweensOf(inner);
    };
  }, [onReady, delay, text]);

  return (
    <Tag ref={ref} className={`split ${className}`} {...rest}>
      {rows.map((row, ri) => {
        const words = row.split(" ");
        return (
          <span key={ri} className="split-row">
            {words.map((w, wi) => (
              <Fragment key={wi}>
                <span className="sw">
                  <span className="sw-i">{w}</span>
                </span>
                {wi < words.length - 1 ? " " : ""}
              </Fragment>
            ))}
            {ri < rows.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
