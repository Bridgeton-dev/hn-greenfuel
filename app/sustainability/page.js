import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Split from "../../components/Split";
import CoalComparison from "../../components/CoalComparison";
import { Arrow } from "../../components/Hero";
import { BRAND } from "../../lib/brand";
import { IMPACT } from "../../lib/data";

export const metadata = {
  title: "Sustainability — Stubble Burning & Waste-to-Energy",
  description:
    "How biomass briquettes curb open stubble burning, transform farm waste into clean industrial energy, and create extra income for farmers and mills.",
  keywords: ["stubble burning solution", "waste to energy biomass", "farmer biomass income", "white coal sustainability", BRAND.region].filter(Boolean),
  alternates: { canonical: "/sustainability" },
};

export default function SustainabilityPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero has-banner">
          <div className="hero-banner-bg" aria-hidden="true">
            <img src="/img/field.webp" alt="" loading="eager" decoding="async" />
          </div>
          <div className="wrap">
            <p className="eyebrow leaf-t" data-reveal>Sustainability</p>
            <Split as="h1" className="h2" text="Clearer skies over farms. Cleaner fuel inside plants." />
            <p className="sec-lede" data-reveal>
              Converting crop stalks, paddy husk and timber shavings into high-density biofuel solves two problems together: open-field smoke and fossil coal reliance.
            </p>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap two-col">
            <div data-reveal>
              <p className="eyebrow leaf-t">Stopping stubble burning</p>
              <h2 className="sub-h">Giving harvest residue a commercial destination.</h2>
              <p className="body-p">
                Farmers often burn paddy straw and mustard or cotton stalks simply because clearing fields quickly before the next sowing window is expensive and no buyer collects the residue.
              </p>
              <p className="body-p">
                By creating reliable industrial offtake for dry crop residue, briquetting gives growers and aggregators a reason to bale and transport stalks instead of setting fields alight.
              </p>
            </div>
            <div className="media-frame" data-reveal>
              <img
                src="/img/farmers.jpg"
                alt="Illustrative photo of Indian farmers bundling crop straw into a tractor trolley at sunset"
                loading="lazy"
                decoding="async"
                width="1600"
                height="900"
              />
              <span className="img-badge">Illustrative agricultural visual</span>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap two-col">
            <div className="media-frame" data-reveal>
              <img
                src="/img/field.webp"
                alt="Green paddy fields in agricultural sourcing region"
                loading="lazy"
                decoding="async"
                width="1600"
                height="893"
              />
              <span className="img-badge">Representative landscape</span>
            </div>
            <div data-reveal>
              <p className="eyebrow leaf-t">Waste-to-energy &amp; farmer benefits</p>
              <h2 className="sub-h">A circular rural-industrial loop.</h2>
              <ul className="check-list">
                <li><strong>Added farmer &amp; mill revenue:</strong> Rice husk, sawdust, shells and stalks earn direct payment instead of incurring disposal cost.</li>
                <li><strong>Cleaner soil &amp; local air:</strong> Keeping fire off farmland protects soil microbes and prevents seasonal particulate smoke.</li>
                <li><strong>Biogenic carbon fuel:</strong> Displacing mined coal lowers fossil emissions and cuts boiler ash waste by multiples.</li>
                <li><strong>Zero synthetic chemicals:</strong> Only mechanical heat and pressure bind the lignin already present in plant fibres.</li>
              </ul>
              <div className="btn-row" style={{ marginTop: "2rem" }}>
                <Link href="/raw-material-suppliers" className="btn btn-ember" data-magnetic>
                  Supply raw biomass to us <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap">
            <p className="eyebrow leaf-t" data-reveal>Illustrative impact</p>
            <h2 className="sub-h" data-reveal>What one mid-size boiler switch looks like.</h2>
            <div className="impact">
              {IMPACT.map((x, i) => (
                <div className="imp" key={i} data-reveal>
                  <div className="imp-n">
                    <span>{x.v.toLocaleString("en-IN")}</span>
                    <small>{x.unit}</small>
                  </div>
                  <p>{x.label}</p>
                </div>
              ))}
            </div>
            <p className="note">Illustrative example for a hypothetical ~1,000 tonne/year plant switching from coal to biomass briquettes — not a measured plant claim.</p>
          </div>
        </section>

        <CoalComparison />
      </main>
      <Footer />
    </>
  );
}
