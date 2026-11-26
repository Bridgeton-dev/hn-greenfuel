"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "../lib/data";
import Split from "./Split";
import { Arrow } from "./Hero";

export default function Products() {
  return (
    <section id="products" className="sec products">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="eyebrow" data-reveal>Our products</p>
            <Split className="h2" text="Four grades. One promise." />
          </div>
          <p className="sec-lede" data-reveal>Every briquette and pellet is pressed from renewable crop and wood residue, with no chemical binders.</p>
        </div>
        <div className="pgrid">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "clamp(2rem, 4vw, 3rem)" }}>
          <Link href="/products" className="btn btn-ghost" data-magnetic>View all products <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }) {
  const [sel, setSel] = useState(0);
  return (
    <div className="pc" data-reveal>
      <div className="pc-in">
        <div className="pc-media">
          <img src={p.img} alt={p.name} loading="lazy" decoding="async" width="600" height="480" />
          <div className="pc-glare" aria-hidden="true" />
          <dl className="pc-specs">
            <div className="pc-specs-h">Specifications</div>
            {p.specs.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="pc-body">
          <h3>{p.name}</h3>
          <p>{p.blurb}</p>
          <div className="pc-sizes">
            {p.sizes.map((s, i) => (
              <button key={s} className={i === sel ? "on" : ""} onClick={() => setSel(i)}>{s}</button>
            ))}
          </div>
          <Link href={`/products/${p.slug}`} className="btn btn-ember btn-block">
            View details <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
