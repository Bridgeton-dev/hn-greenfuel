"use client";
import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "../lib/data";
import { enquire } from "../lib/lenis";
import Split from "./Split";
import { Arrow } from "./Hero";

export default function Products() {
  return (
    <section id="products" className="sec products-sec">
      <div className="wrap prod-wrap">
        <div className="sec-head prod-head">
          <div>
            <p className="eyebrow" data-reveal>Our products</p>
            <Split className="h2 prod-h2" text="Four grades. Ready to fire." />
          </div>
          <Link href="/products" className="btn btn-sm btn-ghost" data-reveal>
            All specifications <Arrow />
          </Link>
        </div>

        <div className="pgrid-compact">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }) {
  const [sel, setSel] = useState(0);
  const gcv = p.specs[0][1].replace(" kcal/kg", "");
  const ash = p.specs[2][1];

  return (
    <article className="pc-c" data-reveal>
      <Link href={`/products/${p.slug}`} className="pc-c-media" aria-label={`View ${p.name} details`}>
        <img src={p.img} alt={p.alt} loading="lazy" decoding="async" width="600" height="450" />
      </Link>
      <div className="pc-c-body">
        <h3 className="pc-c-title">
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
        </h3>
        <p className="pc-c-desc">{p.blurb}</p>
        <div className="pc-c-spec">
          <span>{gcv} kcal/kg</span>
          <span>Ash {ash}</span>
        </div>
        <div className="pc-c-sizes" role="group" aria-label={`Select size for ${p.name}`}>
          {p.sizes.map((s, i) => (
            <button
              key={s}
              type="button"
              className={i === sel ? "on" : ""}
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
            onClick={() => enquire(p.name, p.sizes[sel])}
          >
            Enquire
          </button>
        </div>
      </div>
    </article>
  );
}
