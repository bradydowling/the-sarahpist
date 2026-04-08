const HASH_TARGET_HIGHLIGHT_CLASS = "hash-target-highlight";
const HASH_SCROLL_RETRY_COUNT = 12;
const HASH_SCROLL_RETRY_DELAY_MS = 120;
const HASH_SCROLL_FOCUS_DELAY_MS = 260;

function decodeHash(hash: string) {
  const normalizedHash = hash.startsWith("#") ? hash.slice(1) : hash;

  try {
    return decodeURIComponent(normalizedHash);
  } catch {
    return normalizedHash;
  }
}

function getHashTarget(hash: string) {
  const targetId = decodeHash(hash);
  return targetId ? document.getElementById(targetId) : null;
}

function animateHashTarget(target: HTMLElement) {
  const existingTimeout = target.dataset.hashHighlightTimeout;
  if (existingTimeout) {
    window.clearTimeout(Number(existingTimeout));
  }

  target.classList.remove(HASH_TARGET_HIGHLIGHT_CLASS);
  void target.offsetWidth;
  target.classList.add(HASH_TARGET_HIGHLIGHT_CLASS);

  const timeoutId = window.setTimeout(() => {
    target.classList.remove(HASH_TARGET_HIGHLIGHT_CLASS);
    delete target.dataset.hashHighlightTimeout;
  }, 1200);

  target.dataset.hashHighlightTimeout = String(timeoutId);
}

function focusHashTarget(target: HTMLElement) {
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }

  target.focus({ preventScroll: true });
}

function updateLocationHash(hash: string) {
  const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;

  if (window.location.hash === hash) {
    window.history.replaceState(window.history.state, "", nextUrl);
    return;
  }

  window.history.pushState(window.history.state, "", nextUrl);
}

export function splitHashHref(href: string) {
  const hashIndex = href.indexOf("#");

  if (hashIndex === -1) {
    return {
      pathname: href,
      hash: "",
    };
  }

  return {
    pathname: href.slice(0, hashIndex),
    hash: href.slice(hashIndex),
  };
}

export function scrollToHash(
  hash: string,
  options: {
    updateHistory?: boolean;
    attempt?: number;
  } = {},
): boolean {
  const { updateHistory = false, attempt = 0 } = options;

  if (typeof window === "undefined" || !hash) {
    return false;
  }

  const target = getHashTarget(hash);
  if (!target) {
    if (attempt >= HASH_SCROLL_RETRY_COUNT) {
      return false;
    }

    window.setTimeout(() => {
      scrollToHash(hash, {
        updateHistory,
        attempt: attempt + 1,
      });
    }, HASH_SCROLL_RETRY_DELAY_MS);

    return false;
  }

  if (updateHistory) {
    updateLocationHash(hash);
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
    inline: "nearest",
  });

  window.setTimeout(() => {
    focusHashTarget(target);
    animateHashTarget(target);
  }, prefersReducedMotion ? 0 : HASH_SCROLL_FOCUS_DELAY_MS);

  return true;
}
