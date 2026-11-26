import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Icon from "../../components/Icons";
import Split from "../../components/Split";
import Contact from "../../components/Contact";
import { BRAND } from "../../lib/brand";
import { QUALITY_CHECKS } from "../../lib/data";

export const metadata = {
  title: "Quality Assurance & Sample Trial Request",
  description:
    "Moisture (<10%), ash content (4–8%), and calorific value (3,800–4,400 kcal/kg typical) checks at HN Greenfuel. Request a boiler trial batch.",
  keywords: ["briquette quality testing", "biomass moisture ash calorific value", "boiler fuel trial", BRAND.region],
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <section className="page-hero">
          <div className="wrap two-col">
            <div>
              <p className="eyebrow" data-reveal>Quality control</p>
              <Split as="h1" className="h2" text="Checked before it reaches your boiler." />
              <p className="sec-lede" data-reveal>
                Steady thermal output starts with dry raw material, clean screening and regular checks on moisture, ash behaviour and compaction density.
              </p>
            </div>
            <div className="media-frame" data-reveal>
              <img
                src="/img/lab.jpg"
                alt="Illustrative biomass testing laboratory bench with bomb calorimeter, moisture analyzer and analytical scale"
                loading="eager"
                decoding="async"
                width="1600"
                height="900"
              />
              <span className="img-badge">Illustrative lab setup</span>
            </div>
          </div>
        </section>

        <section className="sec alt-sec">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow" data-reveal>Core checks</p>
                <h2 className="sub-h" data-reveal>What we verify on every grade.</h2>
              </div>
              <p className="sec-lede" data-reveal>
                Values listed are typical working ranges by raw material. Independent third-party or buyer-site testing is welcome on sample trial lots.
              </p>
            </div>

            <div className="mv-grid">
              {QUALITY_CHECKS.map((qc) => (
                <article className="card-box" key={qc.param} data-reveal>
                  <div className="qc-top">
                    <span className="pr-ico" style={{ marginBottom: 0 }}><Icon name={qc.icon} size={28} /></span>
                    <span className="qc-target">{qc.target}</span>
                  </div>
                  <h3 style={{ marginTop: "1rem" }}>{qc.param}</h3>
                  <p className="body-p">{qc.method}</p>
                  <p className="note" style={{ marginTop: "0.75rem" }}>Why it matters: {qc.why}</p>
                </article>
              ))}
            </div>
            <p className="note">Note: {BRAND.name} reports typical feedstock ranges rather than claimed certificates or unverified laboratory test reports. Buyers can request a trial load to verify parameters on their own boiler.</p>
          </div>
        </section>

        <Contact
          defaultKind="trial"
          eyebrow="Sample trial request"
          heading="Book a sample trial load."
        />
      </main>
      <Footer />
    </>
  );
}
