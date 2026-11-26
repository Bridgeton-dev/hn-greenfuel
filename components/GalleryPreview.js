"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GALLERY } from "../lib/data";
import { lockScroll, unlockScroll } from "../lib/lenis";
import Split from "./Split";
import { Arrow } from "./Hero";

const PREVIEW = GALLERY.slice(0, 6);

export default function GalleryPreview() {
  const [idx, setIdx] = useState(-1);
  const touchStartX = useRef(0);
  const activeItem = idx >= 0 && idx < PREVIEW.length ? PREVIEW[idx] : null;

  useEffect(() => {
    if (!activeItem) return;
    lockScroll();
    const onKey = (e) => {
      if (e.key === "Escape") setIdx(-1);
      else if (e.key === "ArrowRight") setIdx((i) => (i + 1) % PREVIEW.length);
      else if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + PREVIEW.length) % PREVIEW.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [activeItem]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX || 0;
  };
  const onTouchEnd = (e) => {
    const dx = (e.changedTouches[0]?.clientX || 0) - touchStartX.current;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) setIdx((i) => (i + 1) % PREVIEW.length);
    else setIdx((i) => (i - 1 + PREVIEW.length) % PREVIEW.length);
  };

  return (
    <section id="gallery" className="sec gallery-prev">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="eyebrow" data-reveal>Gallery</p>
            <Split className="h2" text="Fuel, machinery & dispatch." />
          </div>
          <p className="sec-lede" data-reveal>
            Tap any image to open the full-screen viewer. Illustrative visuals are clearly marked.
          </p>
        </div>

        <div className="gp-grid">
          {PREVIEW.map((item, i) => (
            <button
              type="button"
              className="gp-card"
              key={item.src}
              data-reveal
              onClick={() => setIdx(i)}
              aria-label={`Open ${item.title} in full-screen viewer`}
            >
              <div className="gp-media">
                <img src={item.thumb} alt={item.alt} loading="lazy" decoding="async" width="800" height="450" />
              </div>
              <div className="gp-cap">
                <span className="gp-cat">{item.cat}</span>
                <b>{item.title}</b>
                <small>{item.note}</small>
              </div>
            </button>
          ))}
        </div>

        <div className="sec-cta-row" data-reveal>
          <Link href="/gallery" className="btn btn-ghost" data-magnetic>
            Open full gallery <Arrow />
          </Link>
        </div>
      </div>

      {activeItem && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setIdx(-1)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lb-close" aria-label="Close viewer" onClick={() => setIdx(-1)}>
              ×
            </button>
            <button
              type="button"
              className="lb-nav lb-prev"
              aria-label="Previous photo"
              onClick={() => setIdx((i) => (i - 1 + PREVIEW.length) % PREVIEW.length)}
            >
              ‹
            </button>
            <figure className="lb-fig">
              <img src={activeItem.src} alt={activeItem.alt} />
              <figcaption>
                <span>{activeItem.cat} · {idx + 1} / {PREVIEW.length}</span>
                <b>{activeItem.title}</b>
                <small>{activeItem.note}</small>
              </figcaption>
            </figure>
            <button
              type="button"
              className="lb-nav lb-next"
              aria-label="Next photo"
              onClick={() => setIdx((i) => (i + 1) % PREVIEW.length)}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
