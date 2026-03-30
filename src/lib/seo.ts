import type { Metadata } from "next";
import { siteConfig } from "@/lib/content";

export const SITE_INDEXING_ENABLED = process.env.NEXT_PUBLIC_SITE_INDEXING_ENABLED === "true";
export const SITE_METADATA_BASE = new URL(siteConfig.url);

export const NO_INDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    "max-image-preview": "none",
    "max-snippet": 0,
    "max-video-preview": 0,
  },
};

export const SITE_ROBOTS: Metadata["robots"] = SITE_INDEXING_ENABLED
  ? {
      index: true,
      follow: true,
    }
  : NO_INDEX_ROBOTS;

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  return `/${path.replace(/^\/+/, "")}`;
}

export function canonicalUrl(path: string): string {
  return new URL(normalizePath(path), SITE_METADATA_BASE).toString();
}

export function withPageSeo(
  routePath: string,
  metadata: Metadata,
  options?: {
    canonicalPath?: string;
    forceNoIndex?: boolean;
  },
): Metadata {
  const canonical = canonicalUrl(options?.canonicalPath ?? routePath);

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical,
    },
    robots:
      options?.forceNoIndex || !SITE_INDEXING_ENABLED
        ? NO_INDEX_ROBOTS
        : (metadata.robots ?? SITE_ROBOTS),
    openGraph: metadata.openGraph
      ? {
          ...metadata.openGraph,
          url: canonical,
        }
      : metadata.openGraph,
  };
}
