"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";
import Icon from "./Icons";
import { Arrow } from "./Hero";

/* Vertical process timeline:
   - Mobile (<768px): 16:9 image on top, then icon, title, description, small tag
   - Tablet (768–1023px): image left, text right
   - Desktop (1024px+): alternating image/text left & right around a centre ember line
   Content remains visible if JS fails or prefers-reduced-motion is enabled. */
export default function ProcessTimeline({
  steps,
  eyebrow = "The process",
  heading = (
    <>
      From field waste to <span className="ember-t">white coal</span>.
    </>
  ),
  showCta = false,
  id = "process",
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReduced()) return;

    const ctx = gsap.context(() => {
      const fill = el.querySelector(".ptl-fill");
      const list = el.querySelector(".ptl-list");
      const items = gsap.utils.toArray(".ptl-item", el);

      if (fill && list) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 75%",
              end: "bottom 75%",
              scrub: 0.4,
            },
          }
        );
      }

      items.forEach((item) => {
        const card = item.querySelector(".ptl-card");
        const img = item.querySelector(".ptl-media img");

        if (card) {
          gsap.from(card, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: item,
              start: "top 84%",
              once: true,
            },
          });
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 0.85,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: item,
                start: "top 84%",
                once: true,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: item,
          start: "top 68%",
          end: "bottom 32%",
          onEnter: () => item.classList.add("is-active"),
          onEnterBack: () => item.classList.add("is-active"),
          onLeave: () => item.classList.remove("is-active"),
          onLeaveBack: () => item.classList.remove("is-active"),
        });
      });
    }, el);

    return () => ctx.revert();
  }, [steps]);

  return (
    <section id={id} className="sec ptl-sec" ref={rootRef}>
      <div className="wrap">
        <div className="sec-head ptl-head">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="h2 ptl-h">{heading}</h2>
          </div>
        </div>

        <ol className="ptl-list">
          <div className="ptl-rail" aria-hidden="true">
            <span className="ptl-fill" />
          </div>

          {steps.map((s, idx) => (
            <li
              key={s.n}
              className={`ptl-item${idx % 2 === 1 ? " is-even" : ""}`}
            >
              <div className="ptl-node" aria-hidden="true">
                <span>{s.n}</span>
              </div>

              <article className="ptl-card">
                <div className="ptl-media">
                  <img
                    src={s.img}
                    alt={s.alt || s.t}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                  />
                  {s.illustrative && (
                    <span className="ptl-cap">Illustrative image</span>
                  )}
                </div>

                <div className="ptl-body">
                  <div className="ptl-meta">
                    <span className={`ptl-ico ptl-ico-${s.icon}`} aria-hidden="true">
                      <Icon name={s.icon} size={24} />
                    </span>
                    {s.tag && <span className="ptl-tag">{s.tag}</span>}
                  </div>
                  <h3>{s.t}</h3>
                  <p className="ptl-desc">{s.d}</p>
                  {s.detail && <p className="ptl-detail">{s.detail}</p>}
                </div>
              </article>
            </li>
          ))}
        </ol>

        {showCta && (
          <div className="sec-cta-row">
            <Link href="/manufacturing" className="btn btn-ember" data-magnetic>
              Full 7-stage process <Arrow />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
