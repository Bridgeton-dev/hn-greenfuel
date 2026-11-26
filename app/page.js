import Preloader from "../components/Preloader";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Why from "../components/Why";
import Process from "../components/Process";
import Products from "../components/Products";
import Industries from "../components/Industries";
import Sustain from "../components/Sustain";
import GalleryPreview from "../components/GalleryPreview";
import Pricing from "../components/Pricing";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata = {
  title: "HN Greenfuel — Biomass Briquettes & Pellets Manufacturer | Clean fuel. Real fire.",
  description:
    "HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED manufactures 60/70/90 mm biomass briquettes (white coal) and 6/8 mm pellets with <10% moisture for industrial boilers and kilns.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Why />
        <Process />
        <Products />
        <Industries />
        <Sustain />
        <GalleryPreview />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
