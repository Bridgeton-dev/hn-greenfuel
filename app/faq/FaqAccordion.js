"use client";
import { useState } from "react";

/* Single-open accordion for clear readability */
export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="acc">
      {items.map((f, i) => {
        const on = openIndex === i;
        return (
          <div className={`acc-i${on ? " on" : ""}`} key={i} data-reveal>
            <h3>
              <button
                type="button"
                id={`p-fq-${i}`}
                aria-expanded={on}
                aria-controls={`p-fa-${i}`}
                onClick={() => setOpenIndex(on ? -1 : i)}
              >
                <span>{f.q}</span>
                <span className="acc-x" aria-hidden="true" />
              </button>
            </h3>
            <div className="acc-p" id={`p-fa-${i}`} role="region" aria-labelledby={`p-fq-${i}`}>
              <div>
                <p className="acc-pp">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
