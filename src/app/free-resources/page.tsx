import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit, ChevronRight, ReceiptText, Wallet } from "lucide-react";
import MailerLiteInlineForm from "@/components/forms/MailerLiteInlineForm";
import Container from "@/components/ui/Container";
import { getResourceGuides } from "@/lib/content";
import { withPageSeo } from "@/lib/seo";

const resourceGuides = getResourceGuides();

const resourceIconMap = {
  receipt: ReceiptText,
  brain: BrainCircuit,
  wallet: Wallet,
} as const;

export const metadata: Metadata = withPageSeo("/free-resources", {
  title: "Free Resources",
  description: "Download practical mental health resources on superbills, therapy types, and affordability.",
});

export default function FreeResourcesPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container size="xl">
        <div className="surface-panel p-8 sm:p-10">
          <p className="eyebrow">Free resources</p>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="font-serif text-5xl leading-none text-foreground sm:text-6xl">Support for the next step in your care search</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                Access a small library of practical guides designed to make therapy easier to navigate, understand, and afford.
              </p>
            </div>
            <Link href="/#contact" className="button-secondary">
              Need a consultation instead?
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {resourceGuides.map((guide) => {
            const Icon = resourceIconMap[guide.icon];

            return (
              <article key={guide.slug} className="surface-card flex h-full flex-col p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-soft text-sage-deep">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-foreground">{guide.title}</h2>
                <p className="mt-4 text-base leading-8 text-muted">{guide.description}</p>
                <div className="mt-8 border-t border-line/70 pt-6">
                  <MailerLiteInlineForm
                    action={guide.formAction}
                    buttonLabel={guide.buttonLabel}
                    successTitle={guide.successTitle}
                    successDescription={guide.successDescription}
                    downloadHref={guide.downloadHref}
                    downloadLabel={guide.downloadLabel}
                    placeholder="Enter your email to unlock the guide"
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 surface-card flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sage">Looking for a therapist match?</p>
            <p className="mt-2 max-w-2xl text-base leading-8 text-muted">
              If the guides are useful but you still want a curated recommendation, the consultation flow on the homepage is the best next step.
            </p>
          </div>
          <Link href="/#contact" className="button-primary">
            Go to consultation <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
