import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Split from "../../components/Split";
import CoalComparison from "../../components/CoalComparison";
import ProductCard from "../../components/ProductCard";
import { BRAND } from "../../lib/brand";
import { PRODUCTS } from "../../lib/data";

export const metadata = {
  title: "Products — Biomass Briquettes & Pellets",
  description:
    "Explore sawdust briquettes, rice husk briquettes, agro-mix briquettes (60/70/90 mm) and biomass pellets (6/8 mm) manufactured by HN Greenfuel.",
  keywords: ["biomass briquettes", "white coal", "sawdust briquettes", "rice husk briquettes", "agro-mix briquettes", "biomass pellets", BRAND.region].filter(Boolean),
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero has-banner">
          <div className="hero-banner-bg" aria-hidden="true">
            <img src="/img/sizes.webp" alt="" loading="eager" decoding="async" />
          </div>
          <div className="wrap">
            <p className="eyebrow" data-reveal>Products</p>
            <Split as="h1" className="h2" text="Four grades. Engineered for boilers." />
            <p className="sec-lede" data-reveal>
              White-coal briquettes in 60, 70 and 90 mm logs plus 6 and 8 mm free-flowing pellets. All grades maintain moisture below 10% with zero chemical binders.
            </p>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap prod-wrap">
            <div className="pgrid-compact">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.id} p={p} headingAs="h2" />
              ))}
            </div>
          </div>
        </section>

        <CoalComparison />
      </main>
      <Footer />
    </>
  );
}
