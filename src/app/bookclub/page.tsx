import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import MailerLiteInlineForm from "@/components/forms/MailerLiteInlineForm";
import Container from "@/components/ui/Container";
import { getBookClubDiscussions, getSiteContent } from "@/lib/content";
import { withPageSeo } from "@/lib/seo";

const content = getSiteContent();
const bookClubDiscussions = getBookClubDiscussions();

export const metadata: Metadata = withPageSeo("/bookclub", {
  title: "Well-Being Book Club",
  description: content.newsletter.description,
});

export default function BookClubPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container size="xl">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="surface-panel p-8 sm:p-10">
            <p className="eyebrow">Well-Being Book Club</p>
            <h1 className="font-serif text-5xl leading-none text-foreground sm:text-6xl">Join the conversation</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{content.newsletter.description}</p>
            <div className="mt-8 rounded-[1.75rem] border border-line/70 bg-white p-6">
              <MailerLiteInlineForm
                action="https://assets.mailerlite.com/jsonp/26519/forms/153207660460639323/subscribe"
                buttonLabel="Subscribe"
                successTitle="You have been added to the book club list."
                successDescription="Check the new tab opened by MailerLite for confirmation details, then come back here for the latest conversations."
                placeholder="Enter your email to get started"
              />
            </div>
          </section>

          <section className="surface-panel overflow-hidden p-4 sm:p-6">
            <div className="grid h-full gap-4 sm:grid-cols-3">
              {bookClubDiscussions.map((discussion) => (
                <article key={discussion.youtubeUrl} className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line/70 bg-white">
                  <a href={discussion.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group relative block aspect-video overflow-hidden bg-sand">
                    <Image
                      src={discussion.thumbnailUrl}
                      alt={discussion.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 640px) 30vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-sage-deep shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
                        <PlayCircle className="h-7 w-7" />
                      </span>
                    </div>
                  </a>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sage">{discussion.monthLabel}</p>
                    <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground">{discussion.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted">{discussion.description}</p>
                    <a
                      href={discussion.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sage transition hover:text-sage-deep"
                    >
                      Watch on YouTube <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 surface-card flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sage">More discussions</p>
            <p className="mt-2 max-w-2xl text-base leading-8 text-muted">
              The full archive lives on YouTube, where Sarah hosts conversations with authors and experts across therapy, relationships, and well-being.
            </p>
          </div>
          <a
            href="https://www.youtube.com/@thesarahpist"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            Visit YouTube channel
          </a>
        </section>
      </Container>
    </div>
  );
}
