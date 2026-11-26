"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enquire } from "../lib/lenis";

export default function ProductCard({ p, headingAs = "h3" }) {
  const [sel, setSel] = useState(0);
  const router = useRouter();
  const Heading = headingAs;
  const gcv = p.specs[0][1];
  const ash = p.specs[2][1];
  const colsClass = p.sizes.length === 2 ? "cols-2" : "cols-3";

  const handleEnquire = () => {
    const size = p.sizes[sel];
    if (typeof document !== "undefined" && document.querySelector("#contact")) {
      enquire(p.name, size);
    } else {
      router.push(
        `/contact?product=${encodeURIComponent(p.name)}&size=${encodeURIComponent(size)}`
      );
    }
  };

  return (
    <article className="pc-c" data-reveal>
      <Link
        href={`/products/${p.slug}`}
        className="pc-c-media"
        aria-label={`View ${p.name} details`}
      >
        <img
          src={p.img}
          alt={p.alt}
          loading="lazy"
          decoding="async"
          width="600"
          height="450"
        />
      </Link>

      <div className="pc-c-body">
        <Heading className="pc-c-title">
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
        </Heading>

        <p className="pc-c-desc">{p.blurb}</p>

        <div className="pc-c-spec">
          <div className="pc-c-spec-row">
            <span className="pc-c-spec-lbl">Calorific value:</span>{" "}
            <span className="pc-c-spec-val">{gcv}</span>
          </div>
          <div className="pc-c-spec-row">
            <span className="pc-c-spec-lbl">Ash:</span>{" "}
            <span className="pc-c-spec-val">{ash}</span>
          </div>
        </div>

        <div
          className={`pc-c-sizes ${colsClass}`}
          role="group"
          aria-label={`Select size for ${p.name}`}
        >
          {p.sizes.map((s, i) => (
            <button
              key={s}
              type="button"
              className={i === sel ? "on" : ""}
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
            >
              {s.replace(" mm", "mm")}
            </button>
          ))}
        </div>

        <div className="pc-c-foot">
          <button
            type="button"
            className="btn btn-ember btn-block pc-c-btn"
            onClick={handleEnquire}
          >
            Enquire
          </button>
        </div>
      </div>
    </article>
  );
}
