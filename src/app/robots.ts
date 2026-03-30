import type { MetadataRoute } from "next";
import { canonicalUrl, SITE_INDEXING_ENABLED } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const rules = SITE_INDEXING_ENABLED
    ? {
        userAgent: "*",
        allow: "/",
      }
    : {
        userAgent: "*",
        disallow: "/",
      };

  return {
    rules,
    sitemap: canonicalUrl("/sitemap.xml"),
  };
}
