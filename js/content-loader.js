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

// Function to render content into the HTML
function renderContent(content) {
  if (!content) return;

  // Header
  setText(".header-left h1", content.header.title);
  setText(".header-left .subtitle", content.header.subtitle);

  // Navigation
  const navList = document.querySelector("nav ul");
  navList.innerHTML = content.header.navigation
    .map((item) => {
      const className = item.is_cta ? 'class="cta-button"' : "";
      return `<li><a href="${item.href}" ${className}>${item.text}</a></li>`;
    })
    .join("");

  // Hero section
  setText("#hero h2", content.hero.title);
  setText("#hero .hero-text > p", content.hero.description);
  setText(".featured-quote p", content.hero.featured_quote.text);
  setText(".featured-quote cite", `— ${content.hero.featured_quote.author}`);
  setText("#hero .hero-text .cta-button", content.hero.cta_button.text);
  setAttribute("#hero .hero-text .cta-button", "href", content.hero.cta_button.href);
  setAttribute(".hero-image img", "src", content.hero.image.src);
  setAttribute(".hero-image img", "alt", content.hero.image.alt);

  // About section
  setText("#about h2", content.about.title);
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

  // Service section
  setText("#service h2", content.service.title);
  setText("#service > p", content.service.description);
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
  setText("#contact h2", content.contact.title);
  setText("#contact > p", content.contact.description);
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
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link">
                    <i class="fab fa-${link.icon}"></i>
                    <span>${link.text}</span>
                </a>
            `
              )
              .join("")}
        </div>
    `;

  // Newsletter section
  setText("#newsletter h2", content.newsletter.title);
  setText("#newsletter > p", content.newsletter.description);

  // Footer
  setText("footer p", content.footer.copyright);
}

// Initialize the content loading
document.addEventListener("DOMContentLoaded", async () => {
  const content = await loadContent();
  renderContent(content);
});
