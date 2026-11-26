"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReduced } from "../lib/gsap";
import { STEPS } from "../lib/data";
import Icon from "./Icons";
import { Arrow } from "./Hero";

/* Pinned horizontal scroll on fine-pointer desktops; vertical 5-step timeline
   with compact thumbnails on mobile/coarse pointers so no card is cut off. */
export default function Process() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const dots = [...el.querySelectorAll(".pr-dot")];
    const line = el.querySelector(".pr-line i");
    const track = el.querySelector(".pr-track");
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 1);

    if (
      prefersReduced() ||
      window.innerWidth <= 900 ||
      window.matchMedia("(pointer: coarse)").matches ||
      dist() < 80
    ) {
      el.classList.add("is-static");
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el.querySelector(".pr-pin"),
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (s) => {
            const k = Math.min(STEPS.length - 1, Math.floor(s.progress * STEPS.length * 0.999 + 0.12));
            dots.forEach((d, i) => d.classList.toggle("on", i <= k));
          },
        },
      });
      tl.to(track, { x: () => -dist(), ease: "none" }, 0).fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      gsap.utils.toArray(".pr-card img", el).forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.querySelector(".pr-pin"),
              start: "top top",
              end: () => "+=" + dist(),
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="process" ref={ref}>
      <div className="pr-pin">
        <div className="pr-top wrap">
          <div>
            <p className="eyebrow">The process</p>
            <h2 className="h2 pr-h">From field waste to <span className="ember-t">white coal</span>.</h2>
          </div>
          <div className="pr-top-right">
            <div className="pr-steps" aria-hidden="true">
              {STEPS.map((s) => <span key={s.n} className="pr-dot"><b>{s.n}</b>{s.t}</span>)}
            </div>
            <Link href="/manufacturing" className="pr-link">
              Full 7-stage process <Arrow />
            </Link>
          </div>
        </div>
        <div className="pr-line" aria-hidden="true"><i /></div>
        <div className="pr-view">
          <ol className="pr-track">
            {STEPS.map((s, i) => (
              <li className={`pr-card${s.img ? " has-img" : ""}`} key={s.n}>
                <div className="pr-num">{s.n}</div>
                <div className="pr-body">
                  <span className="pr-ico"><Icon name={s.icon} size={30} /></span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
                {s.img ? (
                  <div className="pr-media">
                    <img src={s.img} alt={s.alt || s.t} loading="lazy" decoding="async" width="800" height="440" />
                    {s.illustrative && <span className="img-badge">Illustrative</span>}
                  </div>
                ) : (
                  <div className="pr-media pr-art" aria-hidden="true"><span className={`art art-${s.icon}`}><i /><i /><i /></span></div>
                )}
                {i < STEPS.length - 1 && <span className="pr-arrow" aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
