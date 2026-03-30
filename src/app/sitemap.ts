import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: canonicalUrl("/"),
    },
    {
      url: canonicalUrl("/free-resources"),
    },
    {
      url: canonicalUrl("/bookclub"),
    },
  ];
}
