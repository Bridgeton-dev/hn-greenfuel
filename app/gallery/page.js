"use client";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Split from "../../components/Split";
import { GALLERY, GALLERY_CATS } from "../../lib/data";
import { lockScroll, unlockScroll } from "../../lib/lenis";

export default function GalleryPage() {
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState(-1);
  const touchStartX = useRef(0);

  const items = cat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === cat);
  const activeItem = idx >= 0 && idx < items.length ? items[idx] : null;

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX || 0;
  };
  const onTouchEnd = (e) => {
    const dx = (e.changedTouches[0]?.clientX || 0) - touchStartX.current;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) setIdx((i) => (i + 1) % items.length);
    else setIdx((i) => (i - 1 + items.length) % items.length);
  };

  useEffect(() => {
    setIdx(-1);
  }, [cat]);

  useEffect(() => {
    if (!activeItem) return;
    lockScroll();
    const onKey = (e) => {
      if (e.key === "Escape") setIdx(-1);
      else if (e.key === "ArrowRight") setIdx((i) => (i + 1) % items.length);
      else if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [activeItem, items.length]);

  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero has-banner">
          <div className="hero-banner-bg" aria-hidden="true">
            <img src="/img/pellets.webp" alt="" loading="eager" decoding="async" />
          </div>
          <div className="wrap">
            <p className="eyebrow" data-reveal>Gallery</p>
            <Split as="h1" className="h2" text="Briquettes, machinery & feedstocks." />
            <p className="sec-lede" data-reveal>
              Click any photo to open the full-screen viewer. Illustrative industrial visuals are clearly labelled and are not presented as actual plant photography.
            </p>
            <div className="gal-filters" role="tablist" aria-label="Filter gallery by category">
              {GALLERY_CATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={cat === c}
                  className={`gal-tab${cat === c ? " on" : ""}`}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap">
            <div className="gal-grid">
              {items.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  className="gal-card"
                  onClick={() => setIdx(i)}
                  aria-label={`View ${item.title} full screen`}
                >
                  <div className="gal-media">
                    <img
                      src={item.thumb}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="450"
                    />
                  </div>
                  <div className="gal-meta">
                    <span className="gp-cat">{item.cat}</span>
                    <b>{item.title}</b>
                    <small>{item.note}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

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
              onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
            >
              ‹
            </button>
            <figure className="lb-fig">
              <img src={activeItem.src} alt={activeItem.alt} />
              <figcaption>
                <span>{activeItem.cat} · {idx + 1} / {items.length}</span>
                <b>{activeItem.title}</b>
                <small>{activeItem.note}</small>
              </figcaption>
            </figure>
            <button
              type="button"
              className="lb-nav lb-next"
              aria-label="Next photo"
              onClick={() => setIdx((i) => (i + 1) % items.length)}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
