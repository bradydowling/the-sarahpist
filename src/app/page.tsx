import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BrainCircuit,
  GraduationCap,
  Handshake,
  Heart,
  Mail,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Youtube,
  Instagram,
  Globe,
} from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import HashLink from "@/components/navigation/HashLink";
import { getSiteContent, normalizeHref } from "@/lib/content";
import { withPageSeo } from "@/lib/seo";

const content = getSiteContent();
const consultationEmailHref = `mailto:${content.contact.info.email}?subject=${encodeURIComponent("Consultation inquiry")}`;
const consultationSteps = [
  {
    step: "Step 1",
    title: "Jump to booking",
    description: "Use any Book a Consultation button on the page to land here and see the next step.",
  },
  {
    step: "Step 2",
    title: "Send a quick email",
    description: "Press the email button below to open your email app and tell Sarah what kind of support you need.",
  },
] as const;

const iconMap = {
  certificate: ShieldCheck,
  "user-md": Stethoscope,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  brain: BrainCircuit,
  heart: Heart,
  youtube: Youtube,
  instagram: Instagram,
} as const;

function IconFor({ icon, className }: { icon: string; className?: string }) {
  const Component = iconMap[icon as keyof typeof iconMap] ?? Sparkles;
  return <Component className={className} />;
}

export const metadata: Metadata = withPageSeo("/", {
  title: "Therapist Matching Service",
  description: content.hero.description,
});

export default function HomePage() {
  return (
    <>
      <section className="pb-12 pt-10 sm:pb-16 sm:pt-16">
        <Container size="xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="space-y-8">
              <div>
                <p className="eyebrow">Therapist matching made clearer</p>
                <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
                  {content.hero.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                  {content.hero.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <HashLink href={normalizeHref(content.hero.cta_button.href)} className="button-primary">
                  {content.hero.cta_button.text}
                </HashLink>
                <Link href="/bookclub" className="button-secondary">
                  Explore the Book Club
                </Link>
              </div>

              <p className="flex items-start gap-3 text-sm leading-7 text-muted">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-sage-deep" />
                Booking starts by email. After you tap a consultation button, use the email button in the Get Started section to open a message to Sarah.
              </p>

              <div className="surface-card p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sage">Client perspective</p>
                <p className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                  “{content.hero.featured_quote.text}”
                </p>
                <p className="mt-4 text-sm font-medium text-muted">{content.hero.featured_quote.author}</p>
              </div>
            </div>

            <div className="surface-panel relative overflow-hidden p-4 sm:p-6">
              <div className="absolute inset-x-8 top-0 h-24 rounded-b-full bg-sage-soft/50 blur-3xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sand">
                <Image
                  src="/images/coe_odess_sarah_headshot.jpg"
                  alt={content.hero.image.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
              <div className="relative mt-5 flex flex-wrap gap-3">
                <div className="rounded-full border border-line bg-white/85 px-4 py-2 text-sm text-foreground shadow-[0_10px_24px_rgba(31,42,38,0.08)]">
                  1,500+ successful matches
                </div>
                <div className="rounded-full border border-line bg-white/85 px-4 py-2 text-sm text-foreground shadow-[0_10px_24px_rgba(31,42,38,0.08)]">
                  Virtual consultations worldwide
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section id="about" eyebrow="About Sarah" title={content.about.title}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 text-lg leading-8 text-muted">
            {content.about.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="surface-panel p-8">
            <p className="eyebrow">Credentials</p>
            <h3 className="font-serif text-4xl leading-none text-foreground">{content.about.credentials.title}</h3>
            <div className="mt-8 space-y-5">
              {content.about.credentials.items.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-line/70 bg-white p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sage-soft text-sage-deep">
                      <IconFor icon={item.icon} className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {content.about.credentials.trust_badges.map((badge) => (
                <a
                  key={badge.text}
                  href={badge.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage-soft/60 px-4 py-2 text-sm font-medium text-sage-deep"
                >
                  <IconFor icon={badge.icon} className="h-4 w-4" />
                  <span>{badge.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="service" eyebrow="What you get" title={content.service.title} description={content.service.description}>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-5 md:grid-cols-3">
            {content.service.features.map((feature) => (
              <article key={feature.title} className="surface-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-soft text-sage-deep">
                  <IconFor icon={feature.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{feature.description}</p>
              </article>
            ))}
          </div>

          <aside className="surface-panel p-8">
            <p className="eyebrow">Accessibility</p>
            <h3 className="font-serif text-4xl leading-none text-foreground">{content.accessibility_newsletter.title}</h3>
            <p className="mt-4 text-base leading-8 text-muted">
              Sarah also shares guidance on increasing access to therapy and making care more affordable.
            </p>
            <a
              href={content.accessibility_newsletter.form_url}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary mt-8"
            >
              Open accessibility form
            </a>
          </aside>
        </div>
      </Section>

      <Section id="testimonials" eyebrow="Client experiences" title={content.testimonials.title}>
        <div className="grid gap-5 lg:grid-cols-3">
          {content.testimonials.items.map((item) => (
            <article key={item.author} className="surface-card flex h-full flex-col p-7">
              <p className="font-serif text-3xl leading-tight text-foreground">“{item.quote}”</p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-muted">{item.author}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="contact" tabIndex={-1} eyebrow="Get started" title={content.contact.title} description={content.contact.description}>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-panel p-8">
            <div className="consultation-guide-card rounded-[1.75rem] border border-sage/20 bg-linear-to-br from-sage-soft/65 via-white to-sand/45 p-6 shadow-[0_18px_44px_rgba(49,69,56,0.08)] sm:p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-white/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sage-deep shadow-[0_10px_24px_rgba(49,69,56,0.08)]">
                <span className="h-2 w-2 rounded-full bg-sage" />
                Start here
              </div>
              <p className="eyebrow mt-5">Consultation flow</p>
              <h3 className="font-serif text-4xl leading-none text-foreground">Start with a quick email</h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
                After you click Book a Consultation, press the email button below to open your email app and send Sarah a short note about what you&apos;re looking for.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={consultationEmailHref} className="consultation-guide-button button-primary inline-flex w-full gap-2 sm:w-auto">
                  <Mail className="h-4 w-4" />
                  Email Sarah to start consultation
                </a>
                <p className="text-sm leading-7 text-muted">This opens your email app.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {consultationSteps.map((item) => (
                <div key={item.step} className="rounded-[1.5rem] border border-line/70 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage">{item.step}</p>
                  <h4 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-7 text-muted">
              If you prefer to type it yourself, email{" "}
              <a
                href={`mailto:${content.contact.info.email}`}
                className="font-semibold text-foreground underline decoration-sage/40 underline-offset-4 transition hover:text-sage"
              >
                {content.contact.info.email}
              </a>
              .
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-base text-muted">
              <Globe className="h-4 w-4" />
              {content.contact.info.availability}
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-line/70 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Follow along</p>
              <div className="mt-4 flex flex-col gap-3">
                {content.contact.social_links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-full border border-line px-4 py-3 text-sm font-medium text-foreground transition hover:border-sage/30 hover:bg-sand/70"
                  >
                    <span className="inline-flex items-center gap-3">
                      <IconFor icon={link.icon} className="h-4 w-4 text-sage-deep" />
                      {link.text}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="surface-panel p-8">
            <p className="eyebrow">Stay connected</p>
            <h3 className="font-serif text-4xl leading-none text-foreground">{content.newsletter.title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{content.newsletter.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/bookclub" className="button-secondary">
                Visit the book club page
              </Link>
              <Link href="/free-resources" className="button-ghost">
                Browse free resources
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
