"use client";
import { useState } from "react";
import Link from "next/link";
import { FAQ } from "../lib/data";
import Split from "./Split";
import { Arrow } from "./Hero";

const TOP_FAQ = FAQ.slice(0, 6);

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="sec faq">
      <div className="wrap faq-grid">
        <div>
          <p className="eyebrow" data-reveal>FAQ</p>
          <Split className="h2" text="Questions, answered." />
          <p className="sec-lede" data-reveal>
            Key answers on boiler compatibility, calorific value, sizing and truckload delivery.
          </p>
          <div style={{ marginTop: "2rem" }} data-reveal>
            <Link href="/faq" className="btn btn-ghost" data-magnetic>
              View all {FAQ.length} FAQs <Arrow />
            </Link>
          </div>
        </div>
        <div className="acc">
          {TOP_FAQ.map((f, i) => {
            const on = open === i;
            return (
              <div className={`acc-i${on ? " on" : ""}`} key={i} data-reveal>
                <h3>
                  <button type="button" id={`fq-${i}`} aria-expanded={on} aria-controls={`fa-${i}`} onClick={() => setOpen(on ? -1 : i)}>
                    <span>{f.q}</span>
                    <span className="acc-x" aria-hidden="true" />
                  </button>
                </h3>
                <div className="acc-p" id={`fa-${i}`} role="region" aria-labelledby={`fq-${i}`}>
                  <div><p className="acc-pp">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
