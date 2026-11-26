import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Split from "../../components/Split";
import { Arrow } from "../../components/Hero";
import { BRAND } from "../../lib/brand";
import { PRODUCTS } from "../../lib/data";

export const metadata = {
  title: "Products — Biomass Briquettes & Pellets",
  description:
    "Explore sawdust briquettes, rice husk briquettes, agro-mix briquettes (60/70/90 mm) and biomass pellets (6/8 mm) manufactured by HN Greenfuel.",
  keywords: ["biomass briquettes", "white coal", "sawdust briquettes", "rice husk briquettes", "agro-mix briquettes", "biomass pellets", BRAND.region],
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero">
          <div className="wrap">
            <p className="eyebrow" data-reveal>Products</p>
            <Split as="h1" className="h2" text="Four grades. Engineered for boilers." />
            <p className="sec-lede" data-reveal>
              White-coal briquettes in 60, 70 and 90 mm logs plus 6 and 8 mm free-flowing pellets. All grades maintain moisture below 10% with zero chemical binders.
            </p>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap">
            <div className="pgrid">
              {PRODUCTS.map((p) => (
                <article className="pc" key={p.id} data-reveal>
                  <div className="pc-in">
                    <div className="pc-media">
                      <img src={p.img} alt={p.alt} loading="lazy" decoding="async" width="800" height="600" />
                    </div>
                    <div className="pc-body">
                      <h3>{p.name}</h3>
                      <p>{p.blurb}</p>
                      <div className="badge-row">
                        {p.sizes.map((s) => (
                          <span key={s} className="size-tag">{s}</span>
                        ))}
                      </div>
                      <ul className="mini-specs">
                        {p.specs.slice(0, 3).map(([k, val]) => (
                          <li key={k}><span>{k}</span><b>{val}</b></li>
                        ))}
                      </ul>
                      <div className="pc-actions">
                        <Link href={`/products/${p.slug}`} className="btn btn-ember btn-block">
                          Specifications &amp; details <Arrow />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow" data-reveal>Specification guide</p>
                <h2 className="sub-h" data-reveal>Compare fuel grades side by side.</h2>
              </div>
              <p className="sec-lede" data-reveal>Typical working values across our four lines — contact us to arrange a trial batch for your exact boiler test.</p>
            </div>
            <div className="tbl-wrap" data-reveal>
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Product grade</th>
                    <th>Diameter / sizes</th>
                    <th>Calorific value (typical)</th>
                    <th>Ash content</th>
                    <th>Moisture</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p) => (
                    <tr key={p.id}>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.sizes.join(" / ")}</td>
                      <td>{p.specs[0][1]}</td>
                      <td>{p.specs[2][1]}</td>
                      <td>{p.specs[1][1]}</td>
                      <td><Link href={`/products/${p.slug}`} className="tbl-link">View grade →</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note">Note: Values shown are typical industry ranges by feedstock; actual parameters depend on seasonal raw material and batch verification.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
