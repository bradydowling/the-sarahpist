document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!header || !toggle || !nav) {
    return;
  }

  const label = toggle.querySelector(".nav-toggle-label");
  const desktopQuery = window.matchMedia("(min-width: 769px)");

  function setOpen(isOpen) {
    header.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));

    if (label) {
      label.textContent = isOpen ? "Close" : "Menu";
    }
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link && !desktopQuery.matches) {
      setOpen(false);
    }
  });

  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });
});
