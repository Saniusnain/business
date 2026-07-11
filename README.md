# CraveLab

Marketing site for CraveLab — a harm reduction and edible innovation company developing science-backed alternatives for harmful non-food cravings.

Built with [Next.js](https://nextjs.org) (App Router), React 19, and Tailwind CSS v4. All UI components are client components; the page is fully static.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## Structure

- `src/app/` — root layout (fonts, SEO metadata, JSON-LD), page, `sitemap.ts`, `robots.ts`, `manifest.ts`
- `src/components/` — one client component per page section, plus shared `Reveal` (scroll-reveal) and `Eyebrow`
- `src/lib/site.ts` — site-wide constants (name, URL, contact info, nav links)
- `logo.png` — original 2000×2000 brand logo (source asset); optimized copies live in `public/` and `src/app/`

## SEO

Set the production domain via the `NEXT_PUBLIC_SITE_URL` environment variable (defaults to `https://cravelab.com`). It drives canonical URLs, Open Graph tags, the sitemap, robots.txt, and JSON-LD structured data.
