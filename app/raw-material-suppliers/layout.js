import { BRAND } from "../../lib/brand";

export const metadata = {
  title: "Raw Material Suppliers — Sell Agro Residue & Sawdust",
  description:
    "Farmers, FPOs, rice mills and sawmills: sell rice husk, sawdust, groundnut shell, mustard stalk, cotton stalk and bagasse to HN Greenfuel.",
  keywords: ["sell rice husk", "sell sawdust", "biomass supplier enquiry", "crop residue buyers", BRAND.region],
  alternates: { canonical: "/raw-material-suppliers" },
};

export default function RawMaterialLayout({ children }) {
  return children;
}
