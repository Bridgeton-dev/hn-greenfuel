import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Icon from "../../components/Icons";
import Split from "../../components/Split";
import { Arrow } from "../../components/Hero";
import { BRAND } from "../../lib/brand";
import { PRODUCTS } from "../../lib/data";

export const metadata = {
  title: "About HN Greenfuel — Biomass Fuel Manufacturer",
  description:
    "HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED: turning farm and wood residue into practical biomass briquettes and pellets for industrial boilers, kilns and furnaces.",
  keywords: [
    "HN Greenfuel",
    "HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED",
    "biomass briquettes manufacturer",
    "biomass pellets",
    "white coal",
  ],
  alternates: { canonical: "/about" },
};

const ABOUT_VALUES = [
  { t: "Consistency", d: "We pay attention to material, size and moisture.", icon: "press" },
  { t: "Honesty", d: "We share clear specifications and commercial terms.", icon: "lab" },
  { t: "Reliability", d: "We plan supply around confirmed requirements.", icon: "truck" },
  { t: "Responsibility", d: "We encourage better use of biomass residue.", icon: "leaf" },
  { t: "Partnership", d: "We value long-term relationships with buyers and suppliers.", icon: "collect" },
];

const WORK_STEPS = [
  "Share your boiler type and monthly requirement.",
  "We suggest a suitable fuel and size.",
  "Test a trial quantity, subject to availability.",
  "Confirm price, quality and delivery terms.",
  "Receive supply and share your feedback.",
];

export default function AboutPage() {
  const companyRows = [
    ["Company Name", BRAND.legalName],
    ["CIN", BRAND.cin],
    ["GSTIN", BRAND.gst],
    ["Registered Office", BRAND.registeredOffice],
    ["Factory Address", BRAND.address],
    ["Phone", BRAND.phone],
    ["Email", BRAND.email],
    ["Working Hours", BRAND.hours],
  ].filter(([, val]) => Boolean(val));

  return (
    <>
      <Header />
      <main className="page-main">
        {/* 1. Banner */}
        <section className="page-hero has-banner">
          <div className="hero-banner-bg" aria-hidden="true">
            <img src="/img/stack.webp" alt="" loading="eager" decoding="async" />
          </div>
          <div className="wrap">
            <p className="eyebrow" data-reveal>About us</p>
            <Split as="h1" className="h2" text="About HN Greenfuel" />
            <p className="sec-lede" data-reveal>
              Turning farm and wood residue into practical fuel for industry.
            </p>
          </div>
        </section>

        {/* 2. Introduction: Who we are & Why we do this */}
        <section className="sec alt-sec">
          <div className="wrap two-col">
            <div className="ab-intro" data-reveal>
              <div>
                <p className="eyebrow">Who we are</p>
                <h2 className="sub-h">Practical solid fuel for industrial heating.</h2>
                <p className="body-p">
                  HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED is a biomass fuel company focused on briquettes and pellets. We convert agricultural and wood residue into compact solid fuel for industrial heating, as an alternative to coal in suitable boilers, kilns and furnaces.
                </p>
              </div>
              <div style={{ marginTop: "2rem" }}>
                <p className="eyebrow leaf-t">Why we do this</p>
                <p className="body-p">
                  Large amounts of crop and wood residue have limited use, and some is burnt in the open. At the same time, industries need dependable heat. Our work connects these two needs by turning residue into usable fuel.
                </p>
              </div>
            </div>

            <div className="media-frame" data-reveal>
              <img
                src="/img/stack.webp"
                alt="Stacked cylindrical hollow biomass briquettes"
                loading="lazy"
                decoding="async"
                width="1600"
                height="900"
              />
              <span className="img-badge">Representative product photo</span>
            </div>
          </div>
        </section>

        {/* 3. Mission & Vision cards */}
        <section className="sec">
          <div className="wrap mv-grid">
            <article className="card-box" data-reveal>
              <p className="eyebrow">Mission</p>
              <h3>Practical, consistent biomass fuel</h3>
              <p className="body-p">
                To supply practical, consistent biomass fuel and help industries reduce their dependence on fossil coal.
              </p>
            </article>
            <article className="card-box" data-reveal>
              <p className="eyebrow leaf-t">Vision</p>
              <h3>Value from local farm residue</h3>
              <p className="body-p">
                A cleaner industrial future where local farm residue becomes a valued energy resource.
              </p>
            </article>
          </div>
        </section>

        {/* 4. Values grid */}
        <section className="sec alt-sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow" data-reveal>Our values</p>
                <h2 className="sub-h" data-reveal>How we work every day.</h2>
              </div>
            </div>
            <div className="ab-val-grid">
              {ABOUT_VALUES.map((v) => (
                <article className="card-box" key={v.t} data-reveal>
                  <span className="pr-ico"><Icon name={v.icon} size={28} /></span>
                  <h3>{v.t}</h3>
                  <p className="body-p">{v.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. What we make (product cards) */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow" data-reveal>What we make</p>
                <h2 className="sub-h" data-reveal>Biomass briquettes &amp; pellets.</h2>
              </div>
              <Link href="/products" className="btn btn-ghost" data-magnetic>
                View all products <Arrow />
              </Link>
            </div>
            <div className="four-grid">
              {PRODUCTS.map((p) => (
                <article className="card-box ab-prod-card" key={p.id} data-reveal>
                  <div className="ab-prod-media">
                    <img src={p.img} alt={p.alt || p.name} loading="lazy" decoding="async" width="400" height="300" />
                  </div>
                  <h3>{p.name}</h3>
                  <p className="body-p">{p.blurb}</p>
                  <div className="pc-actions">
                    <Link href={`/products/${p.slug}`} className="tbl-link">
                      View specifications →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. How we work with you */}
        <section className="sec alt-sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow" data-reveal>Working together</p>
                <h2 className="sub-h" data-reveal>How we work with you.</h2>
              </div>
            </div>
            <ol className="ab-steps-grid">
              {WORK_STEPS.map((step, i) => (
                <li className="card-box ab-step-card" key={i} data-reveal>
                  <span className="mfg-num">0{i + 1}</span>
                  <p className="body-p">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7. Quality, Sustainability & Company Details */}
        <section className="sec">
          <div className="wrap mv-grid" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            <article className="card-box" data-reveal>
              <p className="eyebrow">Our quality approach</p>
              <h3>Material, moisture, size &amp; handling</h3>
              <p className="body-p">
                We focus on raw material selection, moisture, size and handling. Actual specifications are confirmed for each order.
              </p>
              <div className="pc-actions">
                <Link href="/quality" className="tbl-link">
                  Quality &amp; testing →
                </Link>
              </div>
            </article>
            <article className="card-box" data-reveal>
              <p className="eyebrow leaf-t">Sustainability</p>
              <h3>Renewable residue fuel</h3>
              <p className="body-p">
                Biomass is a renewable resource. Using residue as fuel can lower fossil coal use and give waste material a productive purpose. Results depend on sourcing, transport and combustion.
              </p>
              <div className="pc-actions">
                <Link href="/sustainability" className="tbl-link">
                  Sustainability overview →
                </Link>
              </div>
            </article>
          </div>

          <div className="wrap">
            <div className="card-box" data-reveal>
              <p className="eyebrow">Company details</p>
              <h3>Registration &amp; contact information</h3>
              <div className="tbl-wrap" style={{ marginTop: "0.5rem" }}>
                <table className="spec-table ab-details-tbl">
                  <tbody>
                    {companyRows.map(([label, val]) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        <td>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Closing enquiry banner */}
        <section className="sec alt-sec">
          <div className="wrap">
            <div className="price-card" data-reveal>
              <div>
                <p className="eyebrow">Enquiry</p>
                <h2 className="h2 price-h">Looking for biomass fuel? Tell us your requirement.</h2>
              </div>
              <div className="btn-row">
                <Link href="/contact" className="btn btn-ember" data-magnetic>
                  Get a Quote <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
