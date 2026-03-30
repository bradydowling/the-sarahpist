# Dr. Sarah Coe-Odess - Therapist Matching Service Website

This repo is now mid-transition from the original static HTML/CSS/JS site to a Next.js + Tailwind + TypeScript marketing site.

## Current Status

- The new app lives in `src/` and is the primary path forward.
- `content.yaml` still serves as the canonical content source for the homepage and shared site copy.
- The old static files (`index.html`, `css/`, `js/`, `bookclub/`, `free-resources/`) are still in the repo as legacy fallback/reference during the migration.

## New App Structure

```text
.
├── content.yaml
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
