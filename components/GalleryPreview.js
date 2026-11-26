import Link from "next/link";
import { GALLERY } from "../lib/data";
import Split from "./Split";
import { Arrow } from "./Hero";

const PREVIEW = GALLERY.slice(0, 6);

export default function GalleryPreview() {
  return (
    <section id="gallery" className="sec gallery-prev">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="eyebrow" data-reveal>Gallery</p>
            <Split className="h2" text="Fuel, machinery & dispatch." />
          </div>
          <p className="sec-lede" data-reveal>
            Browse briquette grades, pellets, processing machinery and feedstock sourcing. Illustrative visuals are clearly marked until actual site photos are uploaded.
          </p>
        </div>
        <div className="gp-grid">
          {PREVIEW.map((item) => (
            <Link href="/gallery" className="gp-card" key={item.src} data-reveal>
              <div className="gp-media">
                <img src={item.thumb} alt={item.alt} loading="lazy" decoding="async" width="800" height="450" />
              </div>
              <div className="gp-cap">
                <span className="gp-cat">{item.cat}</span>
                <b>{item.title}</b>
                <small>{item.note}</small>
              </div>
            </Link>
          ))}
        </div>
        <div className="sec-cta-row" data-reveal>
          <Link href="/gallery" className="btn btn-ghost" data-magnetic>
            Open full gallery & viewer <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
