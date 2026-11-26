import { BRAND } from "../../lib/brand";
import IndustriesPageClient from "../../components/IndustriesPageClient";

export const metadata = {
  title: "Industries We Supply — Boilers, Kilns, Mills & Hospitality",
  description:
    "Biomass briquettes and pellets for industrial boilers, brick kilns, textile dyeing, food processing, rice mills, dairies, hotels and hospitals.",
  keywords: [
    "industrial boiler fuel",
    "brick kiln briquettes",
    "rice mill fuel",
    "textile boiler biomass",
    BRAND.region,
  ],
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return <IndustriesPageClient />;
}
