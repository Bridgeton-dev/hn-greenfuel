import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import Split from "../../components/Split";
import { BRAND } from "../../lib/brand";

export const metadata = {
  title: "Contact Us — Get a Briquette Quote or Trial Load",
  description:
    "Contact HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED for biomass briquettes and pellets pricing, boiler sample trials, phone, WhatsApp, email and plant location map.",
  keywords: ["contact HN Greenfuel", "buy biomass briquettes", "white coal price quote", BRAND.region],
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.legalName,
    url: `${BRAND.siteUrl}/contact`,
    description: BRAND.description,
    openingHours: BRAND.hours,
    hasMap: BRAND.mapUrl,
  };

  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero has-banner">
          <div className="hero-banner-bg" aria-hidden="true">
            <img src="/img/truck.jpg" alt="" loading="eager" decoding="async" />
          </div>
          <div className="wrap">
            <p className="eyebrow" data-reveal>Contact &amp; enquiries</p>
            <Split as="h1" className="h2" text="Request pricing, specs or a trial load." />
            <p className="sec-lede" data-reveal>
              Reach {BRAND.legalName} by enquiry form, email or WhatsApp. Looking to sell crop residue or sawdust? Visit our{" "}
              <a href="/raw-material-suppliers" style={{ color: "var(--ember-2)", textDecoration: "underline" }}>
                Raw Material Suppliers
              </a>{" "}
              page.
            </p>
          </div>
        </section>

        <Contact />

        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow" data-reveal>Location map</p>
                <h2 className="sub-h" data-reveal>Find us on Google Maps.</h2>
              </div>
              <a href={BRAND.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Open map link ↗
              </a>
            </div>
            <div className="map-box" data-reveal>
              <iframe
                title={`${BRAND.name} location map`}
                src={BRAND.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="note">Map pin opened from the supplied location link (Pipra Khem, Bihar 845412). Update address text in site configuration if plant address differs.</p>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
    </>
  );
}
