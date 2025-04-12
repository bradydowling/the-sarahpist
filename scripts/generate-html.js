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

// Update header content
document.querySelector(".header-left h1").textContent =
  yamlContent.header.title;
document.querySelector(".header-left .subtitle").textContent =
  yamlContent.header.subtitle;

// Update navigation
const navList = document.querySelector("nav ul");
navList.innerHTML = yamlContent.header.navigation
  .map((item) => `<li><a href="${item.href}">${item.text}</a></li>`)
  .join("");

// Update hero section
document.querySelector("#hero h2").textContent = yamlContent.hero.title;
document.querySelector("#hero p").textContent = yamlContent.hero.description;
document.querySelector(".featured-quote p").textContent =
  yamlContent.hero.featured_quote.text;
document.querySelector(
  ".featured-quote cite"
).textContent = `— ${yamlContent.hero.featured_quote.author}`;
document.querySelector(".cta-button").textContent =
  yamlContent.hero.cta_button.text;
document.querySelector(".cta-button").href = yamlContent.hero.cta_button.href;
document.querySelector(".hero-image img").src = yamlContent.hero.image.src;
document.querySelector(".hero-image img").alt = yamlContent.hero.image.alt;

// Update about section
document.querySelector("#about h2").textContent = yamlContent.about.title;
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
        <a href="${badge.link}" target="_blank" class="badge-link">
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
document.querySelector("#service h2").textContent = yamlContent.service.title;
document.querySelector("#service p").textContent =
  yamlContent.service.description;
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
document.querySelector("#testimonials h2").textContent =
  yamlContent.testimonials.title;
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
document.querySelector("#contact h2").textContent = yamlContent.contact.title;
document.querySelector("#contact p").textContent =
  yamlContent.contact.description;
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
      <a href="${link.url}" target="_blank" class="social-link">
        <i class="fab fa-${link.icon}"></i>
        <span>${link.text}</span>
      </a>
    `
      )
      .join("")}
  </div>
`;

// Update newsletter section
document.querySelector("#newsletter h2").textContent =
  yamlContent.newsletter.title;
document.querySelector("#newsletter p").textContent =
  yamlContent.newsletter.description;
document.querySelector(".google-form").src = yamlContent.newsletter.form_url;

// Update footer
document.querySelector("footer p").textContent = yamlContent.footer.copyright;

// Write the updated HTML to file
fs.writeFileSync(
  path.join(__dirname, "../index.html"),
  dom.serialize(),
  "utf8"
);

console.log("HTML file has been updated successfully!");
