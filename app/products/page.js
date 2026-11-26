import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Split from "../../components/Split";
import CoalComparison from "../../components/CoalComparison";
import { Arrow } from "../../components/Hero";
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
                <article className="pc-c" key={p.id} data-reveal>
                  <Link href={`/products/${p.slug}`} className="pc-c-media">
                    <img src={p.img} alt={p.alt} loading="lazy" decoding="async" width="800" height="600" />
                  </Link>
                  <div className="pc-c-body">
                    <h2 className="pc-c-title"><Link href={`/products/${p.slug}`}>{p.name}</Link></h2>
                    <p className="pc-c-desc">{p.blurb}</p>
                    <div className="pc-c-spec">
                      <span>{p.specs[0][1].replace(" kcal/kg", "")} kcal/kg</span>
                      <span>Ash {p.specs[2][1]}</span>
                    </div>
                    <div className="pc-c-sizes">
                      {p.sizes.map((s) => (
                        <span key={s} className="size-tag">{s.replace(" mm", "mm")}</span>
                      ))}
                    </div>
                    <div className="pc-c-foot">
                      <Link href={`/products/${p.slug}`} className="btn btn-ember btn-block pc-c-btn">
                        Specs &amp; details <Arrow />
                      </Link>
                    </div>
                  </div>
                </article>
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
