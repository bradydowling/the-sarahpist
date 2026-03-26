const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { JSDOM } = require("jsdom");

// Read the YAML content
const yamlContent = yaml.load(
  fs.readFileSync(path.join(__dirname, "../content.yaml"), "utf8")
);

// Read the HTML template
const htmlTemplate = fs.readFileSync(
  path.join(__dirname, "../index.html"),
  "utf8"
);

// Create a DOM from the HTML template
const dom = new JSDOM(htmlTemplate);
const document = dom.window.document;

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function setAttribute(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

// Update header content
setText(".header-left h1", yamlContent.header.title);
setText(".header-left .subtitle", yamlContent.header.subtitle);

// Update navigation
const navList = document.querySelector("nav ul");
navList.innerHTML = yamlContent.header.navigation
  .map((item) => {
    const className = item.is_cta ? ' class="cta-button"' : "";
    return `<li><a href="${item.href}"${className}>${item.text}</a></li>`;
  })
  .join("");

// Update hero section
setText("#hero h2", yamlContent.hero.title);
setText("#hero .hero-text > p", yamlContent.hero.description);
setText(".featured-quote p", yamlContent.hero.featured_quote.text);
setText(".featured-quote cite", `— ${yamlContent.hero.featured_quote.author}`);
setText("#hero .hero-text .cta-button", yamlContent.hero.cta_button.text);
setAttribute("#hero .hero-text .cta-button", "href", yamlContent.hero.cta_button.href);
setAttribute(".hero-image img", "src", yamlContent.hero.image.src);
setAttribute(".hero-image img", "alt", yamlContent.hero.image.alt);

// Update about section
setText("#about h2", yamlContent.about.title);
const aboutContent = document.querySelector("#about");
aboutContent.innerHTML = `
  <h2>${yamlContent.about.title}</h2>
  ${yamlContent.about.content.map((p) => `<p>${p}</p>`).join("")}
  <div class="credentials-section">
    <h3>${yamlContent.about.credentials.title}</h3>
    <div class="credentials-grid">
      ${yamlContent.about.credentials.items
        .map(
          (item) => `
        <div class="credential">
          <i class="fas fa-${item.icon} feature-icon"></i>
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `
        )
        .join("")}
    </div>
    <div class="trust-badges">
      ${yamlContent.about.credentials.trust_badges
        .map(
          (badge) => `
        <a href="${badge.link}" target="_blank" rel="noopener noreferrer" class="badge-link">
          <div class="badge-icon">
            <i class="fas fa-${badge.icon}"></i>
            <i class="fas fa-check badge-check"></i>
          </div>
          <span>${badge.text}</span>
        </a>
      `
        )
        .join("")}
    </div>
  </div>
`;

// Update service section
setText("#service h2", yamlContent.service.title);
setText("#service > p", yamlContent.service.description);
const serviceFeatures = document.querySelector(".service-features");
serviceFeatures.innerHTML = yamlContent.service.features
  .map(
    (feature) => `
  <div class="feature">
    <i class="fas fa-${feature.icon} feature-icon"></i>
    <h3>${feature.title}</h3>
    <p>${feature.description}</p>
  </div>
`
  )
  .join("");

// Update testimonials section
setText("#testimonials h2", yamlContent.testimonials.title);
const testimonialsGrid = document.querySelector(".testimonials-grid");
testimonialsGrid.innerHTML = yamlContent.testimonials.items
  .map(
    (testimonial) => `
  <div class="testimonial">
    <i class="fas fa-quote-left quote-icon"></i>
    <p>${testimonial.quote}</p>
    <cite>— ${testimonial.author}</cite>
  </div>
`
  )
  .join("");

// Update contact section
setText("#contact h2", yamlContent.contact.title);
setText("#contact > p", yamlContent.contact.description);
const contactInfo = document.querySelector(".contact-info");
contactInfo.innerHTML = `
  <p>
    <i class="fas fa-envelope"></i>
    Email: <a href="mailto:${yamlContent.contact.info.email}">${
  yamlContent.contact.info.email
}</a>
  </p>
  <p>
    <i class="fas fa-globe"></i> ${yamlContent.contact.info.availability}
  </p>
  <div class="social-links">
    ${yamlContent.contact.social_links
      .map(
        (link) => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link">
        <i class="fab fa-${link.icon}"></i>
        <span>${link.text}</span>
      </a>
    `
      )
      .join("")}
  </div>
`;

// Update newsletter section
setText("#newsletter h2", yamlContent.newsletter.title);
setText("#newsletter > p", yamlContent.newsletter.description);

// Update footer
setText("footer p", yamlContent.footer.copyright);

// Write the updated HTML to file
fs.writeFileSync(
  path.join(__dirname, "../index.html"),
  dom.serialize(),
  "utf8"
);

console.log("HTML file has been updated successfully!");
