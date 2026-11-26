import { Arrow } from "./Hero";

export default function Pricing() {
  return (
    <section className="sec pricing" aria-labelledby="price-h">
      <div className="wrap">
        <div className="price-card" data-reveal>
          <div>
            <p className="eyebrow">Pricing</p>
            <h2 id="price-h" className="h2 price-h">Price on request.</h2>
            <p className="sec-lede">Bulk and tonnage based, quoted in INR (₹) per tonne. Your rate depends on grade, size, monthly volume, packing (bags or loose) and delivery distance — contracts get the best rates.</p>
          </div>
          <ul className="price-list">
            <li><b>Trial load</b><span>Test in your boiler before you commit</span></li>
            <li><b>Monthly contract</b><span>Fixed schedule, priority dispatch</span></li>
            <li><b>Spot orders</b><span>Truckload quantities, subject to stock</span></li>
          </ul>
          <a href="/contact" className="btn btn-ember" data-magnetic>Request a quote <Arrow /></a>
        </div>
      </div>
    </section>
  );
}
