import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LegalDoc from "../../components/LegalDoc";
import { BRAND } from "../../lib/brand";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${BRAND.legalName} (${BRAND.name}).`,
  alternates: { canonical: "/privacy" },
};

const PRIVACY_SECTIONS = [
  {
    num: "01",
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      `This policy explains how ${BRAND.legalName} handles information received through this website.`,
    ],
  },
  {
    num: "02",
    id: "information-collected",
    title: "Information we collect",
    paragraphs: [
      "We collect details you submit directly and basic technical information when you visit the website:",
    ],
    bullets: [
      "Name, company or mill name, phone number and email address.",
      "Location, product or tonnage requirement and enquiry messages.",
      "Basic technical data such as browser and device details.",
    ],
  },
  {
    num: "03",
    id: "how-we-use",
    title: "How we use it",
    paragraphs: ["We use the information received to:"],
    bullets: [
      "Answer enquiries and prepare quotations.",
      "Process orders and coordinate dispatch logistics.",
      "Improve the website, prevent misuse and meet legal duties.",
    ],
  },
  {
    num: "04",
    id: "consent",
    title: "Consent",
    paragraphs: [
      "By submitting a form, you agree to be contacted about your enquiry. You may withdraw consent by writing to us.",
    ],
  },
  {
    num: "05",
    id: "cookies",
    title: "Cookies",
    paragraphs: [
      "The website may use cookies or similar tools for essential functions and, where used, analytics.",
    ],
  },
  {
    num: "06",
    id: "sharing",
    title: "Sharing",
    paragraphs: [
      "We do not sell personal information. We may share it with service providers, transport partners or authorities when needed.",
    ],
  },
  {
    num: "07",
    id: "third-party",
    title: "Third-party services",
    paragraphs: [
      "WhatsApp, maps and other external services follow their own policies.",
    ],
  },
  {
    num: "08",
    id: "retention",
    title: "Retention",
    paragraphs: [
      "We keep information only as long as needed for these purposes or required by law.",
    ],
  },
  {
    num: "09",
    id: "security",
    title: "Security",
    paragraphs: [
      "We use reasonable safeguards, but no online system is completely secure.",
    ],
  },
  {
    num: "10",
    id: "your-choices",
    title: "Your choices",
    paragraphs: [
      "You may ask to access, correct or delete your information, subject to law.",
    ],
  },
  {
    num: "11",
    id: "children",
    title: "Children",
    paragraphs: [
      "This website is intended for business users and not for children.",
    ],
  },
  {
    num: "12",
    id: "changes",
    title: "Changes",
    paragraphs: [
      "Updates will appear on this page with a new date.",
    ],
  },
  {
    num: "13",
    id: "contact",
    title: "Contact",
    paragraphs: [
      `For privacy questions or requests, please reach out to ${BRAND.legalName} using the contact details below or via our Contact page.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <LegalDoc
          title="Privacy Policy"
          sections={PRIVACY_SECTIONS}
          contactExtra={
            BRAND.grievanceContact
              ? [["Grievance Contact", BRAND.grievanceContact]]
              : []
          }
        />
      </main>
      <Footer />
    </>
  );
}
