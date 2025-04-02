// Function to load and parse YAML content
async function loadContent() {
  try {
    const response = await fetch("/content.yaml");
    const yamlText = await response.text();
    // Using js-yaml library to parse YAML
    const content = jsyaml.load(yamlText);
    return content;
  } catch (error) {
    console.error("Error loading content:", error);
    return null;
  }
}

// Function to render content into the HTML
function renderContent(content) {
  if (!content) return;

  // Header
  document.querySelector(".header-left h1").textContent = content.header.title;
  document.querySelector(".header-left .subtitle").textContent =
    content.header.subtitle;

  // Navigation
  const navList = document.querySelector("nav ul");
  navList.innerHTML = content.header.navigation
    .map((item) => `<li><a href="${item.href}">${item.text}</a></li>`)
    .join("");

  // Hero section
  document.querySelector("#hero h2").textContent = content.hero.title;
  document.querySelector("#hero p").textContent = content.hero.description;
  document.querySelector(".featured-quote p").textContent =
    content.hero.featured_quote.text;
  document.querySelector(
    ".featured-quote cite"
  ).textContent = `— ${content.hero.featured_quote.author}`;
  document.querySelector(".cta-button").textContent =
    content.hero.cta_button.text;
  document.querySelector(".cta-button").href = content.hero.cta_button.href;
  document.querySelector(".hero-image img").src = content.hero.image.src;
  document.querySelector(".hero-image img").alt = content.hero.image.alt;

  // About section
  document.querySelector("#about h2").textContent = content.about.title;
  const aboutContent = document.querySelector("#about");
  aboutContent.innerHTML = `
        <h2>${content.about.title}</h2>
        ${content.about.content.map((p) => `<p>${p}</p>`).join("")}
        <div class="credentials-section">
            <h3>${content.about.credentials.title}</h3>
            <div class="credentials-grid">
                ${content.about.credentials.items
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
                ${content.about.credentials.trust_badges
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

  // Service section
  document.querySelector("#service h2").textContent = content.service.title;
  document.querySelector("#service p").textContent =
    content.service.description;
  const serviceFeatures = document.querySelector(".service-features");
  serviceFeatures.innerHTML = content.service.features
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

  // Testimonials section
  document.querySelector("#testimonials h2").textContent =
    content.testimonials.title;
  const testimonialsGrid = document.querySelector(".testimonials-grid");
  testimonialsGrid.innerHTML = content.testimonials.items
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

  // Contact section
  document.querySelector("#contact h2").textContent = content.contact.title;
  document.querySelector("#contact p").textContent =
    content.contact.description;
  const contactInfo = document.querySelector(".contact-info");
  contactInfo.innerHTML = `
        <p>
            <i class="fas fa-envelope"></i>
            Email: <a href="mailto:${content.contact.info.email}">${
    content.contact.info.email
  }</a>
        </p>
        <p>
            <i class="fas fa-globe"></i> ${content.contact.info.availability}
        </p>
        <div class="social-links">
            ${content.contact.social_links
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

  // Newsletter section
  document.querySelector("#newsletter h2").textContent =
    content.newsletter.title;
  document.querySelector("#newsletter p").textContent =
    content.newsletter.description;
  document.querySelector(".google-form").src = content.newsletter.form_url;

  // Footer
  document.querySelector("footer p").textContent = content.footer.copyright;
}

// Initialize the content loading
document.addEventListener("DOMContentLoaded", async () => {
  const content = await loadContent();
  renderContent(content);
});
