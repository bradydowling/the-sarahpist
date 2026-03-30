import type { Metadata, Viewport } from "next";
import SiteShell from "@/components/layout/SiteShell";
import { getSiteContent, siteConfig } from "@/lib/content";
import { SITE_METADATA_BASE, SITE_ROBOTS, canonicalUrl } from "@/lib/seo";
import "./globals.css";

const content = getSiteContent();
const personName = "Dr. Sarah Coe-Odess";

export const metadata: Metadata = {
  metadataBase: SITE_METADATA_BASE,
  title: {
    default: siteConfig.title,
    template: `%s | ${content.header.title}`,
  },
  description: content.hero.description,
  alternates: {
    canonical: canonicalUrl("/"),
  },
  robots: SITE_ROBOTS,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonicalUrl("/"),
    title: siteConfig.title,
    description: content.hero.description,
    siteName: content.header.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: content.hero.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personName,
  jobTitle: "Clinical Psychologist and Therapist Matching Specialist",
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.image}`,
  email: content.contact.info.email,
  worksFor: [
    {
      "@type": "Organization",
      name: "Massachusetts General Hospital",
    },
    {
      "@type": "Organization",
      name: "Harvard Medical School",
    },
  ],
  sameAs: content.contact.social_links.map((link) => link.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
