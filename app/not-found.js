import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Arrow } from "../components/Hero";

export const metadata = {
  title: "Page Not Found (404)",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="page-main nf-main">
        <div className="wrap nf-wrap">
          <p className="eyebrow">404 error</p>
          <div className="nf-code" aria-hidden="true">404</div>
          <h1 className="h2">This page didn&apos;t catch fire.</h1>
          <p className="sec-lede" style={{ marginInline: "auto" }}>
            The link may have moved or been mistyped. Explore our biomass briquette grades or jump straight to a quote request.
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link href="/" className="btn btn-ember">
              Back to Home <Arrow />
            </Link>
            <Link href="/products" className="btn btn-ghost">
              Browse Products
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
