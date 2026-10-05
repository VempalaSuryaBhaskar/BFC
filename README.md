# BFC Website

Marketing website for **BFC**: construction industry consulting, connections and conversations.
Two verticals: **BFC Consulting** (problem-solving and expert connect) and **BFC Talks** (podcast and interviews).

Built with React 19, Vite, React Router and CSS Modules. No UI or animation libraries.

## Getting started

```bash
npm install
npm run dev       # local dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Project structure

```
public/                 favicon, OG share image, robots.txt, SPA redirects
src/
  App.jsx               routes (pages are lazy-loaded, Home is eager)
  main.jsx              entry point
  data/                 ALL site content: edit these files to update the site
  pages/                one file per route (+ CSS module)
  components/
    layout/             Navbar, Footer, Layout, ScrollManager
    ui/                 Button, Icon, Logo, Section, SectionHeading, Modal, FilterBar, Reveal
    cards/              ServiceCard, PodcastCard, GuestCard, TeamCard, InsightCard, NetworkCard, TestimonialCard
    sections/           HeroSection, HeroVisual, PageArt, ProcessTimeline, NetworkMap, StatsSection, CTASection, …
    forms/              ConsultingForm, ContactForm, shared fields
    media/              generated thumbnails, covers, placeholder portraits, YouTube player
  hooks/                useInView, useDocumentMeta, useForm, useLockBodyScroll, …
  lib/                  forms.js (submission service), format.js (helpers)
  styles/               tokens.css (palette, type, spacing), base.css (themes), utilities.css
```

### Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/consulting` | BFC Consulting + inquiry form (`#inquiry`) |
| `/talks`, `/talks/:slug` | BFC Talks listing and episode pages |
| `/about` | About, values, founders (`#team`) |
| `/network` | The BFC Network |
| `/insights`, `/insights/:slug` | Articles with search and filters |
| `/contact` | Contact options + form (`#contact-form`, accepts `?type=talks-guest`, `network`, `general` …) |
| `/privacy`, `/terms` | Legal placeholders |
| `*` | 404 |

## Replacing placeholder content

Everything shown in `[square brackets]` is a placeholder. Nothing about clients, results, testimonials,
guests or credentials has been invented. Update these files:

| What | Where |
| --- | --- |
| Contact email, phone, location, social links, live domain | `src/data/site.js` |
| Founders / team (names, roles, photos, LinkedIn) | `src/data/team.js` |
| Podcast episodes (titles, dates, YouTube links/IDs, thumbnails) | `src/data/episodes.js` |
| Podcast guests (names, roles, bios, photos) | `src/data/guests.js` |
| Articles (title, author, body) | `src/data/insights.js` |
| Testimonials (only with written client permission) | `src/data/testimonials.js` |
| Consulting services, FAQ answers, form options | `src/data/consulting.js` |
| About page stats and values | `src/data/about.js` |
| Network disciplines | `src/data/network.js` |
| Logo | `src/components/ui/Logo.jsx` + `public/favicon.svg` |
| Privacy Policy / Terms text (have counsel review) | `src/pages/Legal.jsx` |

Placeholders are detected automatically: an email or phone still in brackets renders as plain text and only
becomes a `mailto:`/`tel:` link once replaced. LinkedIn buttons appear once a URL is filled in.

**Episodes:** set `youtubeUrl` for the "Watch on YouTube" buttons. Setting `youtubeId` also enables a
click-to-load embedded player on the episode page (privacy-enhanced `youtube-nocookie.com`). Add a
`thumbnail` image path to replace the generated branded thumbnail.

**Images:** put photos in `public/images/…` and reference them as `/images/…`. Portraits accept
`src`, `srcSet` and `sizes` and are lazy-loaded.

**Articles:** add a `body` array to an article (`{ type: 'p' | 'h2' | 'quote', text }` or
`{ type: 'list', items: [] }`). Without one, the article page shows a structured placeholder.

## Forms

Both forms validate in the browser and show a success state, but **they are not connected to a backend
yet**. The success screen says so explicitly ("Demo mode … no information was sent").

To go live, edit `src/lib/forms.js`: set `FORMS_LIVE = true` and add your endpoints (your own API,
Formspree, Netlify Forms, a CRM webhook, etc.). Forms POST JSON. A hidden honeypot field filters simple bots.

## SEO

- Each page sets its own title, description, Open Graph and Twitter tags (`useDocumentMeta`).
- Set `SITE.url` in `src/data/site.js` once the domain is live to emit canonical URLs and `og:url`.
- In `index.html`, change `og:image` / `twitter:image` to the absolute URL (e.g. `https://www.yourdomain.com/og-image.png`).
- Add a sitemap and uncomment the line in `public/robots.txt`.
- This is a client-rendered SPA. Google renders it, but some social crawlers only read `index.html`.
  If per-page link previews matter, add prerendering (for example `vite-plugin-ssg` or a host's prerender option).

## Deployment

Any static host works. The SPA fallback (all routes → `index.html`) is preconfigured for
Netlify (`public/_redirects`) and Vercel (`vercel.json`). On other hosts, configure the equivalent rewrite.

## Design system

- Colors, type scale, spacing and motion live in `src/styles/tokens.css`.
- Sections choose a tone (`white`, `paper`, `dark`, `black`) through `<Section tone="…">`. Components read
  semantic variables (`--fg`, `--surface`, `--line`, `--accent`) so the same card works on light and dark backgrounds.
- Orange (`--c-orange-500`) is an accent only. For orange text on light backgrounds use `--accent-text`
  (`#b3470a`), which meets WCAG AA contrast.
- Fonts: Archivo (headings), Inter (body), JetBrains Mono (labels), loaded from Google Fonts.
- Animations respect `prefers-reduced-motion`.

## Extending the site

To add a section such as case studies, events or an expert directory:

1. Add a data file in `src/data/` (follow the shape of `insights.js`).
2. Add a page in `src/pages/` composed from existing sections and cards.
3. Register the route in `src/App.jsx` and, if needed, the link in `NAV_LINKS` / `FOOTER_LINKS` (`src/data/site.js`).
