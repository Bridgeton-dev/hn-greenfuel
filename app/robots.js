import { BRAND } from "../lib/brand";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${BRAND.siteUrl}/sitemap.xml`,
  };
}
