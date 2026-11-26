import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BRAND } from "../../lib/brand";

export const metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions of website use and supply enquiries for ${BRAND.legalName}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">Legal</p>
            <h1 className="h2">Terms &amp; Conditions</h1>
            <p className="sec-lede">Applicable to {BRAND.legalName}</p>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap legal-content">
            <h2>1. Product Specifications</h2>
            <p>
              Calorific values, ash percentages and moisture figures displayed on this website represent typical working ranges for sawdust, rice husk, agro-mix briquettes and biomass pellets. Actual properties vary by feedstock batch and seasonal harvest conditions. Buyers are encouraged to evaluate trial loads prior to bulk supply agreements.
            </p>

            <h2>2. Pricing &amp; Quotations</h2>
            <p>
              All prices are quoted in Indian Rupees (INR) per metric tonne on request and depend on grade, diameter, packing format, monthly volume and transport distance. Written quotations remain valid only for the period specified on the offer.
            </p>

            <h2>3. Dispatch &amp; Weighing</h2>
            <p>
              Truckload dispatches, weighbridge tolerances, unloading schedules and payment terms are governed by confirmed purchase orders or supply agreements signed between the buyer and {BRAND.legalName}.
            </p>

            <h2>4. Illustrative Visuals &amp; Impact Figures</h2>
            <p>
              Hypothetical emission-displacement examples and visuals marked as illustrative on this website are provided solely for educational context and do not constitute guaranteed performance or certified environmental audits.
            </p>

            <h2>5. Contact</h2>
            <p>
              Questions regarding these terms may be directed to {BRAND.legalName} via our{" "}
              <a href="/contact" style={{ color: "var(--ember-2)", textDecoration: "underline" }}>Contact page</a>
              {BRAND.email ? ` or at ${BRAND.email}` : ""}.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
