"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND } from "../lib/brand";

export default function LegalDoc({ title, sections, contactExtra = [] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id || "");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const jumpTo = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
    setTocOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactRows = [
    ["Company", BRAND.legalName],
    ["Email", BRAND.email],
    ["Phone", BRAND.phone],
    ["Address", BRAND.address],
    ...contactExtra,
  ].filter(([, val]) => Boolean(val));

  return (
    <>
      <section className="page-hero legal-hero">
        <div className="wrap">
          <p className="eyebrow">Legal</p>
          <h1 className="h2">{title}</h1>
          <p className="sec-lede">
            Last updated: {BRAND.legalUpdated || BRAND.year}
          </p>
        </div>
      </section>

      <section className="sec alt-sec">
        <div className="wrap legal-layout">
          {/* Mobile collapsible "On this page" */}
          <div className="legal-mob-toc">
            <button
              type="button"
              className="legal-toc-toggle"
              aria-expanded={tocOpen}
              onClick={() => setTocOpen((o) => !o)}
            >
              <span>On this page</span>
              <span aria-hidden="true">{tocOpen ? "−" : "+"}</span>
            </button>
            {tocOpen && (
              <nav aria-label="On this page" className="legal-toc-list">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={activeId === s.id ? "is-active" : undefined}
                    onClick={(e) => jumpTo(e, s.id)}
                  >
                    <span>{s.num}.</span> {s.title}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Desktop sticky TOC */}
          <aside className="legal-aside" aria-label="Table of contents">
            <div className="legal-toc-box">
              <p className="legal-toc-title">On this page</p>
              <nav className="legal-toc-list">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={activeId === s.id ? "is-active" : undefined}
                    onClick={(e) => jumpTo(e, s.id)}
                  >
                    <span>{s.num}.</span> {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Numbered section cards */}
          <div className="legal-main">
            {sections.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className={`legal-card${activeId === s.id ? " is-active" : ""}`}
              >
                <div className="legal-card-head">
                  <span className="legal-num">{s.num}</span>
                  <h2>{s.title}</h2>
                </div>
                {s.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}

            {/* Contact box at end */}
            <div className="legal-contact-box">
              <p className="eyebrow">Contact details</p>
              <h3>Questions or requests</h3>
              <ul className="spec-list">
                {contactRows.map(([k, v]) => (
                  <li key={k}>
                    <span>{k}</span>
                    <b>{v}</b>
                  </li>
                ))}
              </ul>
              <div className="btn-row" style={{ marginTop: "1.2rem" }}>
                <Link href="/contact" className="btn btn-ember btn-sm">
                  Go to Contact page
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm legal-top-btn"
                  onClick={scrollToTop}
                >
                  Back to top ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
