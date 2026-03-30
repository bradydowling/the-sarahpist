export interface NavigationItem {
  text: string;
  href: string;
  is_cta?: boolean;
}

export interface HeaderContent {
  title: string;
  subtitle: string;
  navigation: NavigationItem[];
}

export interface FeaturedQuote {
  text: string;
  author: string;
}

export interface CtaLink {
  text: string;
  href: string;
}

export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroContent {
  title: string;
  description: string;
  featured_quote: FeaturedQuote;
  cta_button: CtaLink;
  image: HeroImage;
}

export interface Badge {
  text: string;
  icon: string;
  link?: string;
}

export interface IconCard {
  icon: string;
  title: string;
  description: string;
}

export interface AboutContent {
  title: string;
  content: string[];
  credentials: {
    title: string;
    items: IconCard[];
    trust_badges: Badge[];
  };
}

export interface ServiceContent {
  title: string;
  description: string;
  features: IconCard[];
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface TestimonialsContent {
  title: string;
  items: Testimonial[];
}

export interface SocialLink {
  platform: string;
  icon: string;
  url: string;
  text: string;
}

export interface ContactContent {
  title: string;
  description: string;
  info: {
    email: string;
    availability: string;
  };
  social_links: SocialLink[];
}

export interface AccessibilityNewsletter {
  title: string;
  form_url: string;
}

export interface NewsletterContent {
  title: string;
  description: string;
}

export interface FooterContent {
  copyright: string;
}

export interface SiteContent {
  header: HeaderContent;
  hero: HeroContent;
  about: AboutContent;
  service: ServiceContent;
  testimonials: TestimonialsContent;
  contact: ContactContent;
  accessibility_newsletter: AccessibilityNewsletter;
  newsletter: NewsletterContent;
  footer: FooterContent;
}

export interface ResourceGuide {
  slug: string;
  title: string;
  description: string;
  icon: "receipt" | "brain" | "wallet";
  formAction: string;
  buttonLabel: string;
  successTitle: string;
  successDescription: string;
  downloadHref: string;
  downloadLabel: string;
}

export interface BookClubDiscussion {
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  monthLabel: string;
}
