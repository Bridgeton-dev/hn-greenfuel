"use client";
import Link from "next/link";
import { PRODUCTS } from "../lib/data";
import ProductCard from "./ProductCard";
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
            <ProductCard key={p.id} p={p} headingAs="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}
