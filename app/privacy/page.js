import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BRAND } from "../../lib/brand";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${BRAND.legalName} (${BRAND.name}).`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow">Legal</p>
            <h1 className="h2">Privacy Policy</h1>
            <p className="sec-lede">Effective year: {BRAND.year}</p>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap legal-content">
            <h2>1. Information We Collect</h2>
            <p>
              When you submit an enquiry, trial request or raw-material supplier registration on {BRAND.name} ({BRAND.legalName}), we collect the business contact details you enter: name, company or mill name, mobile number, email address, product interest, monthly tonnage estimate, delivery city and message notes.
            </p>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To respond to quotation requests, sample trial bookings and feedstock supply proposals.</li>
              <li>To advise on suitable biomass briquette or pellet grades and dispatch logistics.</li>
              <li>To communicate via phone, email or WhatsApp when you initiate contact.</li>
            </ul>

            <h2>3. Data Sharing &amp; Storage</h2>
            <p>
              We do not sell, rent or trade your contact details to third-party marketers. Information is used strictly for commercial communication and operational logistics with {BRAND.legalName}.
            </p>

            <h2>4. External Services</h2>
            <p>
              Choosing &ldquo;Send on WhatsApp&rdquo; or &ldquo;Open Google Maps&rdquo; opens third-party platforms governed by their respective privacy policies.
            </p>

            <h2>5. Contact &amp; Updates</h2>
            <p>
              To update or delete enquiry details you previously shared, please reach out to {BRAND.legalName} via our{" "}
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
