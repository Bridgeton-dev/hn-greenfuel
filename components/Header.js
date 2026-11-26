"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { gsap, prefersReduced } from "../lib/gsap";
import { BRAND } from "../lib/brand";
import { DESKTOP_NAV, NAV } from "../lib/data";
import { lockScroll, unlockScroll, scrollToTarget } from "../lib/lenis";
import Logo from "./Logo";

export default function Header() {
  const hdr = useRef(null);
  const nav = useRef(null);
  const ink = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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

  /* Ink underline for desktop nav */
  useEffect(() => {
    const n = nav.current;
    const k = ink.current;
    if (!n || !k) return;
    const links = [...n.querySelectorAll("a")];
    const show = (a) => {
      const nr = n.getBoundingClientRect();
      const r = a.getBoundingClientRect();
      gsap.to(k, { x: r.left - nr.left, width: r.width, opacity: 1, duration: 0.35, ease: "power3.out", overwrite: true });
    };
    const hide = () => gsap.to(k, { opacity: 0, duration: 0.25, overwrite: true });
    const handlers = links.map((a) => {
      const onEnter = () => show(a);
      a.addEventListener("mouseenter", onEnter);
      a.addEventListener("mouseleave", hide);
      return [a, onEnter];
    });
    return () => {
      handlers.forEach(([a, onEnter]) => {
        a.removeEventListener("mouseenter", onEnter);
        a.removeEventListener("mouseleave", hide);
      });
    };
  }, []);

  /* Mobile menu open/close */
  useEffect(() => {
    const m = menuRef.current;
    document.documentElement.classList.toggle("menu-open", open);
    if (!m) return;
    if (open) {
      lockScroll();
      if (!prefersReduced())
        gsap.fromTo(m.querySelectorAll(".mm-i"), { yPercent: 110 }, { yPercent: 0, duration: 0.75, stagger: 0.045, ease: "power4.out", delay: 0.1 });
      const esc = (e) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", esc);
      return () => {
        window.removeEventListener("keydown", esc);
        unlockScroll();
      };
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const go = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
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
          <Link href="/" className="hdr-logo" aria-label={`${BRAND.name} — home`}><Logo /></Link>
          <nav className="hdr-nav" ref={nav} aria-label="Primary">
            {DESKTOP_NAV.map(([l, h]) => {
              const isActive = h === "/" ? pathname === "/" : pathname === h || pathname.startsWith(`${h}/`);
              return <Link key={h} href={h} className={isActive ? "active" : ""}>{l}</Link>;
            })}
            <span className="hdr-ink" ref={ink} aria-hidden="true" />
          </nav>
          <Link href="/contact" className="btn btn-ember btn-sm hdr-cta" data-magnetic>Get a quote</Link>
          <button type="button" className={`burger${open ? " x" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mmenu" onClick={() => setOpen((o) => !o)}>
            <span /><span />
          </button>
        </div>
      </header>
      <div id="mmenu" className={`mmenu${open ? " open" : ""}`} ref={menuRef} aria-hidden={!open} inert={open ? undefined : ""}>
        <nav aria-label="Mobile">
          {[...NAV, ["Raw Material Suppliers", "/raw-material-suppliers"]].map(([l, h], i) => (
            <Link key={h} href={h} onClick={(e) => go(e, h)}>
              <span className="mm-mask"><span className="mm-i"><em>{String(i + 1).padStart(2, "0")}</em>{l}</span></span>
            </Link>
          ))}
        </nav>
        <div className="mm-foot">
          <span>Phone: {BRAND.phone}</span>
          <span>Email: {BRAND.email}</span>
        </div>
      </div>
    </>
  );
}
