import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import Container from "@/components/ui/Container";
import type { NavigationItem, SocialLink } from "@/types/content";
import { isExternalHref } from "@/lib/utils";

interface FooterProps {
  title: string;
  subtitle: string;
  copyright: string;
  email: string;
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
}

function SocialIcon({ platform }: { platform: string }) {
  if (platform.toLowerCase() === "youtube") {
    return <Youtube className="h-4 w-4" />;
  }

  return <Instagram className="h-4 w-4" />;
}

export default function Footer({ title, subtitle, copyright, email, navigation, socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-line/70 bg-white/90 py-10">
      <Container size="xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="max-w-lg">
            <p className="font-serif text-3xl text-foreground">{title}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{subtitle}</p>
            <a className="mt-5 inline-flex text-sm font-semibold text-sage transition hover:text-sage-deep" href={`mailto:${email}`}>
              {email}
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Explore</p>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              {navigation.map((item) => {
                const external = isExternalHref(item.href);
                return (
                  <li key={`${item.text}-${item.href}`}>
                    <Link href={item.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="transition hover:text-sage">
                      {item.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">Connect</p>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              {socialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition hover:text-sage"
                  >
                    <SocialIcon platform={link.platform} />
                    <span>{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line/70 pt-6 text-sm text-muted">
          <p>{copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
