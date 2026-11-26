import Link from "next/link";
import { BRAND } from "../lib/brand";
import { NAV, PRODUCTS } from "../lib/data";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div className="ftr-brand">
            <Logo />
            <p>{BRAND.description}</p>
            <p className="ftr-legal">{BRAND.legalName}</p>
          </div>
          <div className="ftr-cols">
            <div className="ftr-nav" aria-label="Company navigation">
              <span className="ftr-col-h">Company</span>
              {NAV.slice(0, 5).map(([l, h]) => (
                <Link key={h} href={h}>{l}</Link>
              ))}
            </div>
            <div className="ftr-nav" aria-label="Solutions navigation">
              <span className="ftr-col-h">Explore</span>
              {NAV.slice(5).map(([l, h]) => (
                <Link key={h} href={h}>{l}</Link>
              ))}
              <Link href="/raw-material-suppliers">Raw Material Suppliers</Link>
            </div>
            <div className="ftr-nav" aria-label="Products navigation">
              <span className="ftr-col-h">Fuel Grades</span>
              {PRODUCTS.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`}>{p.name}</Link>
              ))}
            </div>
          </div>
          <div className="ftr-c">
            <span className="ftr-col-h">Contact & Registration</span>
            <span><b>Phone:</b> {BRAND.phone}</span>
            <span><b>WhatsApp:</b> {BRAND.whatsapp}</span>
            <span><b>Email:</b> {BRAND.email}</span>
            <span><b>Works:</b> {BRAND.address}</span>
            <span><b>GSTIN:</b> {BRAND.gst}</span>
            <span><b>CIN:</b> {BRAND.cin}</span>
            <span><b>Hours:</b> {BRAND.hours}</span>
          </div>
        </div>
        <div className="ftr-word" aria-hidden="true">HN GREENFUEL</div>
        <div className="ftr-bot">
          <span>© {BRAND.year} {BRAND.legalName}. All rights reserved.</span>
          <span className="ftr-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
