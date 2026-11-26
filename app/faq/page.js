import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Split from "../../components/Split";
import { Arrow } from "../../components/Hero";
import { BRAND } from "../../lib/brand";
import { FAQ } from "../../lib/data";
import FaqAccordion from "./FaqAccordion";

export const metadata = {
  title: "FAQ — Biomass Briquettes & Pellets Questions",
  description:
    "Answers to common questions about switching coal boilers to biomass briquettes, calorific values, 60/70/90 mm diameters, pricing, storage and trials.",
  keywords: ["biomass briquettes FAQ", "white coal questions", "boiler conversion briquettes", BRAND.region],
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow" data-reveal>Frequently asked questions</p>
            <Split as="h1" className="h2" text="Straight answers for plant buyers." />
            <p className="sec-lede" data-reveal>
              Everything boiler engineers, procurement leads and agro-suppliers typically ask before ordering a trial load or signing a monthly contract.
            </p>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap faq-grid">
            <div>
              <p className="eyebrow" data-reveal>{FAQ.length} practical topics</p>
              <h2 className="sub-h" data-reveal>Still unsure about your boiler or burner?</h2>
              <p className="sec-lede" data-reveal>
                Share your furnace model, hourly steam requirement and delivery city — we&apos;ll help you pick the right size.
              </p>
              <div style={{ marginTop: "2rem" }} data-reveal>
                <Link href="/contact" className="btn btn-ember" data-magnetic>
                  Ask our team <Arrow />
                </Link>
              </div>
            </div>
            <FaqAccordion items={FAQ} />
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
