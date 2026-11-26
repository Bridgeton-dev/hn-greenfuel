import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ProductDetailClient from "../../../components/ProductDetailClient";
import { Arrow } from "../../../components/Hero";
import { BRAND } from "../../../lib/brand";
import { PRODUCTS } from "../../../lib/data";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = PRODUCTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.name} (${p.sizes.join(", ")})`,
    description: `${p.description} Sizes: ${p.sizes.join(", ")}. Moisture below 10%.`,
    keywords: [p.name, "biomass briquettes", "white coal", "biomass pellets", BRAND.region, ...p.sizes],
    alternates: { canonical: `/products/${p.slug}` },
  };
}

export default function ProductDetailPage({ params }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const others = PRODUCTS.filter((p) => p.id !== product.id);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${BRAND.siteUrl}${product.imgLg}`,
    brand: { "@type": "Brand", name: BRAND.name },
    manufacturer: { "@type": "Organization", name: BRAND.legalName },
  };

  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero pd-hero">
          <div className="wrap">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/products">Products</Link>
              <span aria-hidden="true">/</span>
              <span>{product.name}</span>
            </nav>

            <div className="two-col pd-grid">
              <div className="pd-info">
                <p className="eyebrow">Biomass fuel specification</p>
                <h1 className="h2">{product.name}</h1>
                <p className="sec-lede" style={{ maxWidth: "54ch" }}>{product.description}</p>
                <ProductDetailClient product={product} />
              </div>

              <div className="media-frame">
                <img
                  src={product.imgLg}
                  alt={product.alt}
                  loading="eager"
                  decoding="async"
                  width="1600"
                  height="900"
                />
                <span className="img-badge">Representative product photo</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap two-col">
            <div className="card-box" data-reveal>
              <p className="eyebrow">Technical details</p>
              <h2>Typical fuel specifications</h2>
              <ul className="spec-list">
                {product.specs.map(([k, val]) => (
                  <li key={k}><span>{k}</span><b>{val}</b></li>
                ))}
                <li><span>Primary feedstock</span><b>{product.rawMaterial}</b></li>
              </ul>
              <p className="note">Typical values shown; batch properties depend on feedstock mix and should be verified upon trial.</p>
            </div>

            <div className="pd-right-col">
              <div className="card-box" data-reveal>
                <p className="eyebrow">Applications</p>
                <h3>Common industrial uses</h3>
                <ul className="check-list">
                  {product.uses.map((u) => <li key={u}>{u}</li>)}
                </ul>
              </div>
              <div className="card-box" data-reveal>
                <p className="eyebrow">Packing &amp; dispatch</p>
                <h3>Supply options</h3>
                <p className="body-p">{product.packing}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow" data-reveal>More grades</p>
                <h2 className="sub-h" data-reveal>Other biomass fuels we make.</h2>
              </div>
              <Link href="/products" className="btn btn-ghost">All products <Arrow /></Link>
            </div>
            <div className="three-grid">
              {others.map((o) => (
                <article className="pc" key={o.id} data-reveal>
                  <div className="pc-in">
                    <div className="pc-media">
                      <img src={o.img} alt={o.alt} loading="lazy" decoding="async" width="800" height="600" />
                    </div>
                    <div className="pc-body">
                      <h3>{o.name}</h3>
                      <p>{o.blurb}</p>
                      <Link href={`/products/${o.slug}`} className="btn btn-ghost btn-block">
                        View {o.shortName} <Arrow />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </>
  );
}
