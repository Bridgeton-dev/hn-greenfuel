import { BRAND } from "../../lib/brand";

export const metadata = {
  title: "Gallery — Briquettes, Pellets & Process Visuals",
  description:
    "View photos and illustrative industrial visuals of HN Greenfuel biomass briquettes, pellets, presses, dryers, lab testing and field feedstock sourcing.",
  keywords: ["biomass briquettes photos", "white coal gallery", "biomass pellets images", BRAND.region],
  alternates: { canonical: "/gallery" },
};

export default function GalleryLayout({ children }) {
  return children;
}
