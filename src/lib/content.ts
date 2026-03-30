import { readFileSync } from "fs";
import { join } from "path";
import { load } from "js-yaml";
import type {
  BookClubDiscussionContent,
  NavigationItem,
  ResourceGuideContent,
  SiteContent,
} from "@/types/content";

const contentPath = join(process.cwd(), "content.yaml");
const resourcesPath = join(process.cwd(), "content-data", "resources.yaml");
const bookClubPath = join(process.cwd(), "content-data", "bookclub.yaml");

let cachedContent: SiteContent | null = null;
let cachedResources: ResourceGuideContent | null = null;
let cachedBookClub: BookClubDiscussionContent | null = null;

export function normalizeHref(href: string): string {
  if (href === "index.html") {
    return "/";
  }

  if (href.startsWith("#")) {
    return `/${href}`;
  }

  return href;
}

export function getSiteContent(): SiteContent {
  if (cachedContent) {
    return cachedContent;
  }

  const raw = readFileSync(contentPath, "utf8");
  cachedContent = load(raw) as SiteContent;
  return cachedContent;
}

export function getPrimaryNavigation(): NavigationItem[] {
  return getSiteContent().header.navigation.map((item) => ({
    ...item,
    href: normalizeHref(item.href),
  }));
}

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sarahpist.com",
  title: "The Sarahpist | Therapist Matching Specialist",
  description: getSiteContent().hero.description,
  image: "/images/coe_odess_sarah_headshot.jpg",
};

export function getResourceGuides() {
  if (cachedResources) {
    return cachedResources.guides;
  }

  const raw = readFileSync(resourcesPath, "utf8");
  cachedResources = load(raw) as ResourceGuideContent;
  return cachedResources.guides;
}

export function getBookClubDiscussions() {
  if (cachedBookClub) {
    return cachedBookClub.discussions;
  }

  const raw = readFileSync(bookClubPath, "utf8");
  cachedBookClub = load(raw) as BookClubDiscussionContent;
  return cachedBookClub.discussions;
}
