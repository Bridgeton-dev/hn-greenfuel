"use client";
import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [openMap, setOpenMap] = useState({ 0: true });

  const toggle = (i) => {
    setOpenMap((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="acc">
      {items.map((f, i) => {
        const on = !!openMap[i];
        return (
          <div className={`acc-i${on ? " on" : ""}`} key={i} data-reveal>
            <h3>
              <button
                type="button"
                id={`p-fq-${i}`}
                aria-expanded={on}
                aria-controls={`p-fa-${i}`}
                onClick={() => toggle(i)}
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
