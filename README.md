# Dr. Sarah Coe-Odess - Therapist Matching Service Website

This is the website for Dr. Sarah Coe-Odess's therapist matching service. The site is built with HTML, CSS, and JavaScript, using a content management system that makes it easy to update content without technical knowledge.

## Project Structure

```
.
├── index.html          # Main HTML file
├── content.yaml        # Content management file
├── css/
│   └── styles.css      # Stylesheets
├── js/
│   └── content-loader.js # Content loading and rendering logic
└── images/            # Image assets
```

## Content Management

The website uses a YAML-based content management system that makes it easy to update content without touching any code. All editable content is stored in `content.yaml`.

### How to Update Content

1. Open `content.yaml` in any text editor
2. Find the section you want to update
3. Edit the text, links, or other content as needed
4. Save the file
5. Refresh the website to see your changes

### Content Structure

The `content.yaml` file is organized into sections:

- `header`: Website title, subtitle, and navigation menu
- `hero`: Main banner section with title, description, and featured quote
- `about`: About section with credentials and expertise
- `service`: Service description and features
- `testimonials`: Client testimonials
- `contact`: Contact information and social links
- `newsletter`: Newsletter signup section
- `footer`: Copyright information

Example of updating content:

```yaml
hero:
  title: "Find Your Perfect Therapist Match"
  description: "Expert guidance from a Harvard-affiliated clinical psychologist..."
```

## Running the Website

### Local Development

1. Clone this repository
2. Open `index.html` in a web browser
   - Note: Due to browser security restrictions, you may need to use a local server to view the site properly
3. Any changes to `content.yaml` will be reflected when you refresh the page

### Using a Local Server

You can use any of these methods to run a local server:

1. Python 3:

   ```bash
   python -m http.server 8000
   ```

2. Node.js (with `http-server` installed):

   ```bash
   npx http-server
   ```

3. VS Code Live Server extension:
   - Right-click on `index.html`
   - Select "Open with Live Server"

## Technical Details

- The website uses vanilla JavaScript for content management
- YAML parsing is handled by the js-yaml library
- Font Awesome icons are used for visual elements
- The site is responsive and works on all devices

## Contributing

1. Make your changes to `content.yaml`
2. Test the changes locally
3. Submit a pull request with your changes

## License

© 2024 Dr. Sarah Coe-Odess. All rights reserved.
