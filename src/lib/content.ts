import { readFileSync } from "fs";
import { join } from "path";
import { load } from "js-yaml";
import type { BookClubDiscussion, NavigationItem, ResourceGuide, SiteContent } from "@/types/content";

const contentPath = join(process.cwd(), "content.yaml");

let cachedContent: SiteContent | null = null;

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

export const resourceGuides: ResourceGuide[] = [
  {
    slug: "superbill-guide",
    title: "Superbill Guide",
    description:
      "Get reimbursed for out-of-network therapy with a simple step-by-step guide to submitting superbills to your insurance.",
    icon: "receipt",
    formAction: "https://assets.mailerlite.com/jsonp/26519/forms/153856317496231161/subscribe",
    buttonLabel: "Get My Guide",
    successTitle: "Thank you for requesting the Superbill Guide.",
    successDescription:
      "Use the direct download below if you are returning from the MailerLite confirmation tab.",
    downloadHref: "/resources/superbill-guide.pdf",
    downloadLabel: "Download Superbill Guide",
  },
  {
    slug: "therapy-types-guide",
    title: "Types of Therapy Guide",
    description:
      "Explore CBT, psychodynamic, humanistic, and other common therapy types in clear language so you can better understand what might fit.",
    icon: "brain",
    formAction: "https://assets.mailerlite.com/jsonp/26519/forms/153207660460639323/subscribe",
    buttonLabel: "Get Therapy Guide",
    successTitle: "Your Therapy Types Guide is ready.",
    successDescription:
      "Use the link below after submitting your email to access the PDF directly.",
    downloadHref: "/resources/therapy-types-guide.pdf",
    downloadLabel: "Download Therapy Types Guide",
  },
  {
    slug: "affordable-therapy-guide",
    title: "Options to Make Therapy More Affordable",
    description:
      "Discover strategies for lower-cost care, including sliding scales, insurance reimbursement, and community-based options.",
    icon: "wallet",
    formAction: "https://assets.mailerlite.com/jsonp/26519/forms/153207660460639323/subscribe",
    buttonLabel: "Get Affordability Guide",
    successTitle: "Your affordability guide is ready.",
    successDescription:
      "This resource covers practical ways to make quality mental health care more financially accessible.",
    downloadHref: "/resources/affordable-therapy-guide.pdf",
    downloadLabel: "Download Affordability Guide",
  },
];

export const bookClubDiscussions: BookClubDiscussion[] = [
  {
    title: "Liberated Love live discussion with Mark Groves",
    description:
      "March 2025 well-being book club: a conversation on breakups, attachment styles, relationship differences, and finding authentic connection in modern relationships.",
    youtubeUrl: "https://www.youtube.com/watch?v=Eg4ky_4sPMU",
    thumbnailUrl: "https://i.ytimg.com/vi/Eg4ky_4sPMU/hqdefault.jpg",
    monthLabel: "March 2025",
  },
  {
    title: "Maybe You Should Talk to Someone with Lori Gottlieb",
    description:
      "August 2024 well-being book club: a discussion on compassion in therapy, common misconceptions about the therapeutic process, and Lori's experience as both therapist and patient.",
    youtubeUrl: "https://www.youtube.com/watch?v=C5a5E6xlWGc",
    thumbnailUrl: "https://i.ytimg.com/vi/C5a5E6xlWGc/hqdefault.jpg",
    monthLabel: "August 2024",
  },
  {
    title: "Book of Boundaries with Melissa Urban",
    description:
      "October 2024 well-being book club: a practical conversation about the three levels of boundaries and how honoring them can support healthier relationships.",
    youtubeUrl: "https://www.youtube.com/watch?v=umh5jGFGpQQ",
    thumbnailUrl: "https://i.ytimg.com/vi/umh5jGFGpQQ/hqdefault.jpg",
    monthLabel: "October 2024",
  },
];
