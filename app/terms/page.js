import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LegalDoc from "../../components/LegalDoc";
import { BRAND } from "../../lib/brand";

export const metadata = {
  title: "Terms of Service",
  description: `Terms of Service for website use and biomass fuel enquiries with ${BRAND.legalName}.`,
  alternates: { canonical: "/terms" },
};

const TERMS_SECTIONS = [
  {
    num: "01",
    id: "acceptance",
    title: "Acceptance",
    paragraphs: ["Using this website means you accept these terms."],
  },
  {
    num: "02",
    id: "website-use",
    title: "Website use",
    paragraphs: [
      "Use this website lawfully. Do not disrupt it, misuse forms or attempt unauthorised access.",
    ],
  },
  {
    num: "03",
    id: "product-information",
    title: "Product information",
    paragraphs: [
      "Images and specifications are indicative and may vary by raw material and batch.",
    ],
  },
  {
    num: "04",
    id: "enquiries-quotations",
    title: "Enquiries and quotations",
    paragraphs: [
      "An enquiry is not an order. Orders are binding only after written confirmation.",
    ],
  },
  {
    num: "05",
    id: "price-taxes",
    title: "Price and taxes",
    paragraphs: [
      "Price, taxes and freight are stated in the quotation.",
    ],
  },
  {
    num: "06",
    id: "payment",
    title: "Payment",
    paragraphs: [
      "Payment follows the agreed written terms.",
    ],
  },
  {
    num: "07",
    id: "delivery",
    title: "Delivery",
    paragraphs: [
      "Dates are estimates unless agreed in writing and may be affected by events beyond reasonable control.",
    ],
  },
  {
    num: "08",
    id: "quality-claims",
    title: "Quality claims",
    paragraphs: [
      "Inspection and claims follow the written order terms.",
    ],
  },
  {
    num: "09",
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "Website content belongs to the company or its licensors and may not be reused without permission.",
    ],
  },
  {
    num: "10",
    id: "submitted-information",
    title: "Information you submit",
    paragraphs: [
      "You confirm it is accurate and that you may share it.",
    ],
  },
  {
    num: "11",
    id: "external-links",
    title: "External links",
    paragraphs: [
      "We are not responsible for third-party websites.",
    ],
  },
  {
    num: "12",
    id: "liability",
    title: "Liability",
    paragraphs: [
      "To the extent allowed by law, we are not liable for indirect losses from use of this website.",
    ],
  },
  {
    num: "13",
    id: "changes",
    title: "Changes",
    paragraphs: [
      "We may update these terms on this page.",
    ],
  },
  {
    num: "14",
    id: "governing-law",
    title: "Governing law",
    paragraphs: [
      BRAND.courtCity
        ? `Laws of India; courts at ${BRAND.courtCity} have jurisdiction.`
        : "Laws of India; competent courts in India have jurisdiction.",
    ],
  },
  {
    num: "15",
    id: "contact",
    title: "Contact",
    paragraphs: [
      `For questions regarding these terms, please contact ${BRAND.legalName} using the details below.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <LegalDoc title="Terms of Service" sections={TERMS_SECTIONS} />
      </main>
      <Footer />
    </>
  );
}
