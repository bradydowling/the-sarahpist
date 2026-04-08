"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToHash } from "@/lib/hash-navigation";

export default function HashScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    scrollToHash(window.location.hash, { updateHistory: false });
  }, [pathname]);

  useEffect(() => {
    function handleHashChange() {
      if (!window.location.hash) {
        return;
      }

      scrollToHash(window.location.hash, { updateHistory: false });
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return null;
}
