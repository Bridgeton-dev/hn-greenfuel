import { BRAND } from "../lib/brand";
import { PRODUCTS } from "../lib/data";

export default function sitemap() {
  const base = BRAND.siteUrl;
  const now = new Date();

  const staticRoutes = [
    ["/", 1.0, "weekly"],
    ["/about", 0.8, "monthly"],
    ["/products", 0.9, "weekly"],
    ["/manufacturing", 0.8, "monthly"],
    ["/quality", 0.8, "monthly"],
    ["/industries", 0.8, "monthly"],
    ["/sustainability", 0.8, "monthly"],
    ["/gallery", 0.7, "monthly"],
    ["/faq", 0.8, "monthly"],
    ["/contact", 0.9, "monthly"],
    ["/raw-material-suppliers", 0.8, "monthly"],
    ["/privacy", 0.3, "yearly"],
    ["/terms", 0.3, "yearly"],
  ].map(([path, priority, changeFrequency]) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
