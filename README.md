# Dr. Sarah Coe-Odess - Therapist Matching Service Website

This repo is now mid-transition from the original static HTML/CSS/JS site to a Next.js + Tailwind + TypeScript marketing site.

## Current Status

- The new app lives in `src/` and is the primary path forward.
- `content.yaml` still serves as the canonical content source for the homepage and shared site copy.
- `content-data/` now stores editable page data for resources and book club content.
- The old static files (`index.html`, `css/`, `js/`, `bookclub/`, `free-resources/`) are still in the repo as legacy fallback/reference during the migration.

## New App Structure

```text
.
├── content.yaml
├── content-data/
│   ├── bookclub.yaml
│   └── resources.yaml
├── public/
│   ├── favicon.ico
│   ├── images/
│   └── resources/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
└── scripts/
```

## Content Management

Sarah can keep editing `content.yaml` in GitHub. The new Next app reads that file server-side, so committed YAML changes continue to drive the homepage content without needing the old browser-side DOM patching approach.

For the other public pages, editable content now lives in:

- `content-data/resources.yaml`
- `content-data/bookclub.yaml`

The YAML file currently defines:

- `header`
- `hero`
- `about`
- `service`
- `testimonials`
- `contact`
- `accessibility_newsletter`
- `newsletter`
- `footer`

The additional YAML files define:

- free resource cards, form labels, and download links
- featured book club discussions, thumbnails, and YouTube links

## Local Development

Use the new app by default:

```bash
yarn dev
```

Other useful commands:

```bash
yarn lint
yarn type-check
yarn build
```

## Legacy Scripts

The old static workflow is still available while the migration is in progress:

```bash
yarn legacy:start
yarn legacy:generate
```

Use those only if you need to inspect or refresh the legacy HTML output.

## Notes

- `yarn build` uses `next build --webpack` for now because it is more stable than Turbopack in this environment during the migration.
- `NEXT_PUBLIC_SITE_INDEXING_ENABLED=true` should be set when you want the Next version to emit indexable robots metadata.

## License

© 2025 Dr. Sarah Coe-Odess. All rights reserved.
