"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { gsap, prefersReduced } from "../lib/gsap";
import { BRAND, waLink } from "../lib/brand";
import { DESKTOP_MORE, DESKTOP_PRIMARY, NAV } from "../lib/data";
import { lockScroll, unlockScroll, scrollToTarget } from "../lib/lenis";
import Logo from "./Logo";

export default function Header() {
  const hdr = useRef(null);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const moreRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isRouteActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const moreActive = DESKTOP_MORE.some(([, h]) => isRouteActive(h));

  /* Solidify on scroll, hide on scroll-down, show on scroll-up */
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const h = hdr.current;
      if (!h) return;
      h.classList.toggle("is-solid", y > 40 || pathname !== "/");
      h.classList.toggle("is-hidden", y > 300 && y > last && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, pathname]);

  /* Close desktop "More" dropdown on outside click or Escape */
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  /* Mobile / tablet menu open/close, scroll lock, stagger, and focus trap */
  useEffect(() => {
    const m = menuRef.current;
    document.documentElement.classList.toggle("menu-open", open);
    if (!m) return;
    if (!open) return;

    lockScroll();

    if (!prefersReduced()) {
      gsap.fromTo(
        m.querySelectorAll(".mm-link"),
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.025, ease: "power2.out", clearProps: "transform,opacity" }
      );
    }

    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 30);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = [...m.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [open]);

  /* Close menus on route change */
  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const go = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    setMoreOpen(false);
    if (href.startsWith("#")) {
      setTimeout(() => scrollToTarget(href), 60);
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <header className={`hdr${pathname !== "/" ? " is-solid" : ""}`} ref={hdr}>
        <div className="hdr-in">
          <Link href="/" className="hdr-logo" aria-label={`${BRAND.name} — home`}>
            <Logo />
          </Link>

          <nav className="hdr-nav" aria-label="Primary">
            {DESKTOP_PRIMARY.map(([l, h]) => (
              <Link key={h} href={h} className={isRouteActive(h) ? "active" : undefined}>
                {l}
              </Link>
            ))}

            <div className="hdr-more" ref={moreRef}>
              <button
                type="button"
                className={`hdr-more-btn${moreActive ? " active" : ""}`}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                onClick={() => setMoreOpen((v) => !v)}
              >
                More <span className="hdr-caret" aria-hidden="true">▾</span>
              </button>
              {moreOpen && (
                <div className="hdr-drop" role="menu">
                  {DESKTOP_MORE.map(([l, h]) => (
                    <Link
                      key={h}
                      href={h}
                      role="menuitem"
                      className={isRouteActive(h) ? "active" : undefined}
                      onClick={() => setMoreOpen(false)}
                    >
                      {l}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <Link href="/contact" className="btn btn-ember btn-sm hdr-cta" data-magnetic>
            Get a Quote
          </Link>

          <button
            ref={burgerRef}
            type="button"
            className={`burger${open ? " x" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mmenu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mmenu"
        className={`mmenu${open ? " open" : ""}`}
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        inert={open ? undefined : ""}
      >
        <div className="mm-top">
          <Link href="/" className="hdr-logo" onClick={(e) => go(e, "/")} aria-label={`${BRAND.name} — home`}>
            <Logo />
          </Link>
          <button
            ref={closeBtnRef}
            type="button"
            className="mm-close"
            aria-label="Close menu"
            onClick={() => {
              setOpen(false);
              burgerRef.current?.focus();
            }}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <nav className="mm-scroll" aria-label="Mobile navigation" data-lenis-prevent>
          <ul className="mm-list">
            {NAV.map(([l, h], i) => {
              const active = isRouteActive(h);
              return (
                <li key={h}>
                  <Link
                    href={h}
                    className={`mm-link${active ? " is-active" : ""}`}
                    onClick={(e) => go(e, h)}
                  >
                    <span className="mm-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mm-txt">{l}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mm-actions">
          <Link href="/contact" className="btn btn-ember btn-sm mm-act-quote" onClick={(e) => go(e, "/contact")}>
            Get a Quote
          </Link>
          <div className="mm-act-row">
            {BRAND.phoneHref ? (
              <a href={BRAND.phoneHref} className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
                Call
              </a>
            ) : (
              <Link href="/contact" className="btn btn-ghost btn-sm" onClick={(e) => go(e, "/contact")}>
                Call
              </Link>
            )}
            <a
              href={waLink(`Hello ${BRAND.name}, I'd like to enquire about biomass briquettes & pellets.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-sm"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
