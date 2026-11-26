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
            <Split className="h2" text="Wherever there's a furnace." />
          </div>
          <p className="sec-lede" data-reveal>Briquettes and pellets replace coal, firewood and furnace oil in most solid-fuel thermal plants.</p>
        </div>
        <ul className="igrid">
          {INDUSTRIES.map((x, i) => (
            <li className="itile" key={x.t} data-reveal tabIndex={0}>
              <span className="it-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="it-ico"><Icon name={x.icon} size={40} /></span>
              <h3>{x.t}</h3>
              <div className="it-rev"><p>{x.d}</p></div>
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
