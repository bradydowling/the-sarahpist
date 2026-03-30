"use client";

import { startTransition, useId, useState } from "react";
import Button from "@/components/ui/Button";

interface MailerLiteInlineFormProps {
  action: string;
  buttonLabel: string;
  successTitle: string;
  successDescription: string;
  downloadHref?: string;
  downloadLabel?: string;
  placeholder?: string;
  submitNote?: string;
}

export default function MailerLiteInlineForm({
  action,
  buttonLabel,
  successTitle,
  successDescription,
  downloadHref,
  downloadLabel,
  placeholder = "Enter your email address",
  submitNote = "No spam. Unsubscribe anytime.",
}: MailerLiteInlineFormProps) {
  const emailId = useId();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-[1.5rem] border border-sage/20 bg-sage-soft/70 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sage">Submitted</p>
        <h3 className="mt-3 font-serif text-3xl text-foreground">{successTitle}</h3>
        <p className="mt-3 text-base leading-7 text-muted">{successDescription}</p>
        {downloadHref && downloadLabel ? (
          <a
            href={downloadHref}
            download
            className="button-primary mt-6 inline-flex"
          >
            {downloadLabel}
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form
      action={action}
      method="post"
      target="_blank"
      className="space-y-4"
      onSubmit={() => {
        startTransition(() => {
          setSubmitted(true);
        });
      }}
    >
      <div>
        <label htmlFor={emailId} className="mb-2 block text-sm font-medium text-foreground">
          Email address
        </label>
        <input
          id={emailId}
          aria-required="true"
          type="email"
          name="fields[email]"
          autoComplete="email"
          placeholder={placeholder}
          required
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-foreground shadow-[0_10px_24px_rgba(31,42,38,0.06)] outline-none transition placeholder:text-muted focus:border-sage/40"
        />
      </div>

      <input type="hidden" name="ml-submit" value="1" />
      <input type="hidden" name="anticsrf" value="true" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit">{buttonLabel}</Button>
        <p className="text-sm text-muted">{submitNote}</p>
      </div>
    </form>
  );
}
