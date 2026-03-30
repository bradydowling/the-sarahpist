"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import type { NavigationItem } from "@/types/content";
import { cn, isExternalHref } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle: string;
  navigation: NavigationItem[];
}

export default function Header({ title, subtitle, navigation }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <Container size="xl">
        <div className="flex min-h-20 items-center justify-between gap-6 py-4">
          <div className="max-w-[22rem]">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sage/20 bg-sand text-xs font-semibold uppercase tracking-[0.22em] text-sage-deep">
                SC
              </div>
              <div>
                <p className="font-serif text-2xl leading-none text-foreground">{title}</p>
                <p className="mt-1 hidden text-xs leading-relaxed text-muted sm:block">{subtitle}</p>
              </div>
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-foreground shadow-[0_12px_24px_rgba(31,42,38,0.08)] md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav
            className={cn(
              "absolute inset-x-4 top-[calc(100%-0.25rem)] rounded-[1.75rem] border border-line bg-white p-4 shadow-[0_24px_60px_rgba(31,42,38,0.14)] md:static md:block md:border-0 md:bg-transparent md:p-0 md:shadow-none",
              mobileMenuOpen ? "block" : "hidden md:block",
            )}
          >
            <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
              {navigation.map((item) => {
                const href = item.href;
                const external = isExternalHref(href);
                const isActive = !external && href !== "/#contact" && (href === "/" ? pathname === "/" : pathname.startsWith(href));

                return (
                  <li key={`${item.text}-${href}`}>
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition md:w-auto",
                        item.is_cta
                          ? "bg-sage text-white shadow-[0_16px_36px_rgba(48,68,55,0.22)] hover:bg-sage-deep"
                          : isActive
                            ? "bg-sage-soft text-sage-deep"
                            : "text-foreground hover:bg-sand/80",
                      )}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {item.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
