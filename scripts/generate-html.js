const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const content = yaml.load(
  fs.readFileSync(path.join(__dirname, "../content.yaml"), "utf8")
);
const indexPath = path.join(__dirname, "../index.html");
let html = fs.readFileSync(indexPath, "utf8");

function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeText(value).replace(/"/g, "&quot;");
}

function indentBlock(block, indent) {
  return block
    .trim()
    .split("\n")
    .map((line) => `${indent}${line}`)
    .join("\n");
}

function replaceBlock(source, name, block) {
  const startMarker = `<!-- content:${name}:start -->`;
  const endMarker = `<!-- content:${name}:end -->`;
  const startIndex = source.indexOf(startMarker);
  const endIndex = source.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`Missing content markers for "${name}"`);
  }

  const lineStart = source.lastIndexOf("\n", startIndex) + 1;
  const lineEnd = source.indexOf("\n", endIndex);
  const blockEnd = lineEnd === -1 ? source.length : lineEnd;
  const indent = source.slice(lineStart, startIndex);
  const replacement = [
    `${indent}${startMarker}`,
    indentBlock(block, indent),
    `${indent}${endMarker}`,
  ].join("\n");

  return `${source.slice(0, lineStart)}${replacement}${source.slice(blockEnd)}`;
}

function renderHeaderBrand(data) {
  return `
<h1>${escapeText(data.header.title)}</h1>
<p class="subtitle">${escapeText(data.header.subtitle)}</p>
`;
}

function renderHeaderNav(data) {
  const items = data.header.navigation
    .map((item) => {
      const className = item.is_cta ? ' class="cta-button"' : "";
      return `  <li><a href="${escapeAttribute(item.href)}"${className}>${escapeText(item.text)}</a></li>`;
    })
    .join("\n");

  return `
<ul>
${items}
</ul>
`;
}

function renderHeroText(data) {
  return `
<h2>${escapeText(data.hero.title)}</h2>
<p>${escapeText(data.hero.description)}</p>
<div class="featured-quote">
  <p>${escapeText(data.hero.featured_quote.text)}</p>
  <cite>— ${escapeText(data.hero.featured_quote.author)}</cite>
</div>
<a href="${escapeAttribute(data.hero.cta_button.href)}" class="cta-button">${escapeText(data.hero.cta_button.text)}</a>
`;
}

function renderHeroImage(data) {
  return `
<img
  src="${escapeAttribute(data.hero.image.src)}"
  alt="${escapeAttribute(data.hero.image.alt)}"
  class="headshot"
>
`;
}

function renderAbout(data) {
  const paragraphs = data.about.content
    .map((paragraph) => `<p>${escapeText(paragraph)}</p>`)
    .join("\n");
  const credentials = data.about.credentials.items
    .map(
      (item) => [
        '<div class="credential">',
        `  <i class="fas fa-${escapeAttribute(item.icon)} feature-icon"></i>`,
        `  <h4>${escapeText(item.title)}</h4>`,
        `  <p>${escapeText(item.description)}</p>`,
        "</div>",
      ].join("\n")
    )
    .join("\n");
  const badges = data.about.credentials.trust_badges
    .map(
      (badge) =>
        [
          "<a",
          `  href="${escapeAttribute(badge.link)}"`,
          '  target="_blank"',
          '  rel="noopener noreferrer"',
          '  class="badge-link"',
          ">",
          '  <div class="badge-icon">',
          `    <i class="fas fa-${escapeAttribute(badge.icon)}"></i>`,
          '    <i class="fas fa-check badge-check"></i>',
          "  </div>",
          `  <span>${escapeText(badge.text)}</span>`,
          "</a>",
        ].join("\n")
    )
    .join("\n");

  return `
<h2>${escapeText(data.about.title)}</h2>
${paragraphs}
<div class="credentials-section">
  <h3>${escapeText(data.about.credentials.title)}</h3>
  <div class="credentials-grid">
${credentials}
  </div>
  <div class="trust-badges">
${badges}
  </div>
</div>
`;
}

function renderService(data) {
  const features = data.service.features
    .map(
      (feature) =>
        [
          '<div class="feature">',
          `  <i class="fas fa-${escapeAttribute(feature.icon)} feature-icon"></i>`,
          `  <h3>${escapeText(feature.title)}</h3>`,
          `  <p>${escapeText(feature.description)}</p>`,
          "</div>",
        ].join("\n")
    )
    .join("\n");

  return `
<h2>${escapeText(data.service.title)}</h2>
<p>${escapeText(data.service.description)}</p>
<div class="service-features">
${features}
</div>
`;
}

function renderTestimonials(data) {
  const items = data.testimonials.items
    .map(
      (testimonial) =>
        [
          '<div class="testimonial">',
          '  <i class="fas fa-quote-left quote-icon"></i>',
          `  <p>${escapeText(testimonial.quote)}</p>`,
          `  <cite>— ${escapeText(testimonial.author)}</cite>`,
          "</div>",
        ].join("\n")
    )
    .join("\n");

  return `
<h2>${escapeText(data.testimonials.title)}</h2>
<div class="testimonials-grid">
${items}
</div>
`;
}

function renderContact(data) {
  const links = data.contact.social_links
    .map(
      (link) =>
        [
          "<a",
          `  href="${escapeAttribute(link.url)}"`,
          '  target="_blank"',
          '  rel="noopener noreferrer"',
          '  class="social-link"',
          ">",
          `  <i class="fab fa-${escapeAttribute(link.icon)}"></i>`,
          `  <span>${escapeText(link.text)}</span>`,
          "</a>",
        ].join("\n")
    )
    .join("\n");

  return `
<h2>${escapeText(data.contact.title)}</h2>
<p>${escapeText(data.contact.description)}</p>
<div class="contact-info">
  <p>
    <i class="fas fa-envelope"></i>
    Email: <a href="mailto:${escapeAttribute(data.contact.info.email)}">${escapeText(
    data.contact.info.email
  )}</a>
  </p>
  <p>
    <i class="fas fa-globe"></i> ${escapeText(data.contact.info.availability)}
  </p>
  <div class="social-links">
${links}
  </div>
</div>
`;
}

function renderNewsletterCopy(data) {
  return `
<h2>${escapeText(data.newsletter.title)}</h2>
<p>${escapeText(data.newsletter.description)}</p>
`;
}

function renderFooterCopy(data) {
  return `
<p>${escapeText(data.footer.copyright)}</p>
`;
}

html = replaceBlock(html, "header-brand", renderHeaderBrand(content));
html = replaceBlock(html, "header-nav", renderHeaderNav(content));
html = replaceBlock(html, "hero-text", renderHeroText(content));
html = replaceBlock(html, "hero-image", renderHeroImage(content));
html = replaceBlock(html, "about", renderAbout(content));
html = replaceBlock(html, "service", renderService(content));
html = replaceBlock(html, "testimonials", renderTestimonials(content));
html = replaceBlock(html, "contact", renderContact(content));
html = replaceBlock(html, "newsletter-copy", renderNewsletterCopy(content));
html = replaceBlock(html, "footer-copy", renderFooterCopy(content));

fs.writeFileSync(indexPath, html, "utf8");

console.log("HTML file has been updated successfully!");
