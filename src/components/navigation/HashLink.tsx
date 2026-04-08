"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { scrollToHash, splitHashHref } from "@/lib/hash-navigation";
import { isExternalHref } from "@/lib/utils";

type HashLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export default function HashLink({ href, onClick, scroll, ...props }: HashLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { pathname: hrefPathname, hash } = splitHashHref(href);
  const isHashLink = !isExternalHref(href) && Boolean(hash);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented || !isHashLink || isModifiedClick(event)) {
      return;
    }

    event.preventDefault();

    const targetPathname = hrefPathname || pathname;
    if (targetPathname === pathname) {
      scrollToHash(hash, { updateHistory: true });
      return;
    }

    router.push(`${targetPathname}${hash}`, { scroll: false });
  }

  return <Link href={href} scroll={scroll ?? !isHashLink} onClick={handleClick} {...props} />;
}
