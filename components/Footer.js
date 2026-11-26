import Link from "next/link";
import { BRAND } from "../lib/brand";
import { NAV } from "../lib/data";
import Logo from "./Logo";

export default function Footer() {
  const contactItems = [
    BRAND.phone && ["Phone", BRAND.phone],
    BRAND.whatsapp && ["WhatsApp", BRAND.whatsapp],
    BRAND.email && ["Email", BRAND.email],
    BRAND.address && ["Works", BRAND.address],
    BRAND.gst && ["GSTIN", BRAND.gst],
    BRAND.cin && ["CIN", BRAND.cin],
    BRAND.hours && ["Hours", BRAND.hours],
  ].filter(Boolean);

  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div className="ftr-brand">
            <Logo />
            <p>{BRAND.description}</p>
            <p className="ftr-legal">{BRAND.legalName}</p>
          </div>

          <div className="ftr-cols ftr-two-cols">
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
          </div>

          {contactItems.length > 0 && (
            <div className="ftr-c">
              <span className="ftr-col-h">Contact</span>
              {contactItems.map(([label, val]) => (
                <span key={label}><b>{label}:</b> {val}</span>
              ))}
            </div>
          )}
        </div>

        <div className="ftr-word" aria-hidden="true">HN GREENFUEL</div>

        <div className="ftr-bot">
          <span>© {BRAND.year} {BRAND.legalName}. All rights reserved.</span>
          <span className="ftr-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
