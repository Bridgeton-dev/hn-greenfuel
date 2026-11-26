"use client";
import { useState } from "react";
import Link from "next/link";
import { Arrow } from "./Hero";

export default function ProductDetailClient({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const query = `?product=${encodeURIComponent(product.name)}&size=${encodeURIComponent(selectedSize)}`;

  return (
    <div className="pd-actions-block">
      <div className="pd-size-pick">
        <span className="pd-label">Select diameter / size for enquiry</span>
        <div className="pc-sizes">
          {product.sizes.map((sz) => (
            <button
              key={sz}
              type="button"
              className={selectedSize === sz ? "on" : ""}
              onClick={() => setSelectedSize(sz)}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-row">
        <Link href={`/contact${query}`} className="btn btn-ember" data-magnetic>
          Enquire for {selectedSize} <Arrow />
        </Link>
        <Link href={`/contact${query}&trial=1`} className="btn btn-ghost" data-magnetic>
          Request trial load
        </Link>
      </div>
    </div>
  );
}
