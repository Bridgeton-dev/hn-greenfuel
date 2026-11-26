import { Archivo, Inter } from "next/font/google";
import { BRAND } from "../lib/brand";
import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import FloatingButtons from "../components/FloatingButtons";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

const defaultTitle = `${BRAND.name} — Biomass Briquettes & Pellets Manufacturer | ${BRAND.tagline}`;

export const metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    "biomass briquettes",
    "white coal",
    "biomass pellets",
    "sawdust briquettes",
    "rice husk briquettes",
    "agro-mix briquettes",
    "boiler fuel",
    "coal replacement",
    BRAND.name,
    BRAND.region,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: defaultTitle,
    description: BRAND.description,
    url: "/",
    siteName: BRAND.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/img/stack.webp", width: 1600, height: 900, alt: `${BRAND.name} — Biomass Briquettes (${BRAND.tagline})` }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: BRAND.description,
    images: ["/img/stack.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#0f0d0b", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.legalName,
    alternateName: BRAND.name,
    url: BRAND.siteUrl,
    description: BRAND.description,
    slogan: BRAND.tagline,
    areaServed: "IN",
  };

  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        <Cursor />
        {children}
        <FloatingButtons />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </body>
    </html>
  );
}
