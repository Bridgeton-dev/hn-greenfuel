import Link from "next/link";
import { INDUSTRIES } from "../lib/data";
import Split from "./Split";
import Icon from "./Icons";
import { Arrow } from "./Hero";

export default function Industries() {
  return (
    <section id="industries" className="sec industries">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="eyebrow" data-reveal>Industries served</p>
            <Split className="h2" text="Wherever there's heat to make." />
          </div>
          <p className="sec-lede" data-reveal>
            Biomass briquettes and pellets for suitable boilers, kilns and furnaces.
          </p>
        </div>
        <ul className="igrid-v2">
          {INDUSTRIES.map((x, i) => (
            <li className="icard" key={x.slug} data-reveal>
              <Link href={`/industries#${x.slug}`} className="icard-in">
                <span className="icard-top">
                  <span className="icard-ico"><Icon name={x.icon} size={28} /></span>
                  <span className="icard-num">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <h3 className="icard-title">{x.t}</h3>
                <p className="icard-line">{x.short}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="sec-cta-row" data-reveal>
          <Link href="/industries" className="btn btn-ghost" data-magnetic>
            Explore industry compatibility <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
