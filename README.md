# Brew and Bean Cafe — Website Redesign (Demo)

A demo redesign of the Brew and Bean Cafe e-commerce website, built to address trust, presentation, and SEO issues identified in an initial research & SEO audit.

> **Note on source material and project intent:** The initial plan was to build a website redesign directly based on the Frozen Bottle research documents (Research & SEO Audit, Design Concept, Technical Stack proposal) — a vegetarian dessert/milkshake franchise brand. That plan evolved: Frozen Bottle's own site was found to already be a good, well-maintained website, so rather than continuing a literal redesign of it, the decision was made to build **this site to compete with Frozen Bottle** — an independent demo (Brew and Bean Cafe) built to test our own limits and ability to design and build a website that matches or surpasses that standard. As a result, the actual demo build (see Section 3) is an independent coffee-brand concept with its own content and tech stack, rather than a direct implementation of the original Frozen Bottle documents. Where this README describes the live demo, it's based directly on the attached screen recording of the running site and the project's actual `package.json`/source files — not assumed.

---

## 1. Repository

**GitHub:** https://github.com/ahammedfahim4456/profolio-cafe-demo

This repo has (at least) two branches:

| Branch | Contents |
|---|---|
| `main` | Primary project branch |
| `hafiz-branch` | Contains the specific demo build walked through in this README (see Section 3) — **check out this branch to see this version of the site** |

```bash
git clone https://github.com/ahammedfahim4456/profolio-cafe-demo.git
cd profolio-cafe-demo
git checkout hafiz-branch
```

## 2. Tech Stack

Confirmed directly from `package.json` on `hafiz-branch`:

- **Build tool:** Vite
- **Framework:** React
- **React plugin:** `@vitejs/plugin-react`
- **Smooth scrolling:** [Lenis](https://github.com/darkroomengineering/lenis) (`lenis`) — this is what powers the smooth, eased scroll behavior seen throughout the demo
- **Package manager:** npm
- **Dev server port:** `5173` (Vite default)
- **Styling:** Not Tailwind CSS — no CSS framework appears in the dependencies, so styling is plain CSS / CSS Modules rather than a utility framework
- **Animation:** Not Framer Motion — it isn't a dependency. The scroll-linked motion visible in the demo is driven by Lenis plus native CSS/JS transitions in the source, not a dedicated animation library

> **Correction from the original Technical Stack proposal:** That document recommended Next.js, Tailwind CSS, Framer Motion, ReactBits, and Aceternity UI. None of those appear in the actual `package.json`. The real build is a lean Vite + React + Lenis stack — simpler than what was originally proposed. This README reflects the real dependency list, not the earlier proposal.

## 2a. Project Structure

Confirmed directly from the `src/` folder on `hafiz-branch`:

```
src/
  App.jsx      # Main application component
  main.jsx     # Vite/React entry point, mounts App to the DOM
  style.css    # Global stylesheet (plain CSS, no framework)
```

This is a flat, single-component structure — the different sections seen in the demo (Hero, Shortlist/menu, Field Notes, Enterprise, Contact) are most likely all defined inside `App.jsx` rather than split into separate component files. If the project grows, splitting these into a `components/` folder would be a natural next step, but that isn't how the code is currently organized.

## 3. Demo Walkthrough (what's on `hafiz-branch`)

Based on a recorded run-through of the site at `localhost:5173`:

- **Hero:** Full-bleed cafe photography with the headline *"The Precision of Extraction"*, a scroll-to-continue prompt, and "EST. 2018 / BENGALURU" in the footer corner.
- **Nav menu:** About · Favourites · Enterprise · Contact (opens as a full-screen orange overlay menu).
- **Coffee gallery strip:** A three-panel image band (density / flow / temperature themed captions) showcasing drink photography.
- **"The Shortlist" (menu section):** A pricing/menu table styled as a numbered list, e.g.:

  | # | Name | Style / Origin | Temp | Price |
  |---|---|---|---|---|
  | 01 | Kakonde | Ethiopia | 93°C | ₹260 |
  | 02 | Slow Burn | Filter / Colombia | 89°C | ₹310 |
  | 03 | Black Tide | Nitro / Rwanda | 03°C | ₹380 |
  | 04 | Daybreak | Milk / Brazil | 64°C | ₹320 |

- **"The Field Notes":** An editorial/photo-essay style section with process imagery (pouring, beans, plants) and a statement line: *"We document the things that make a cup feel inevitable... because the best work deserves better coffee."*
- **Enterprise / Coffee-as-a-Service (CaaS) section:** A dark-themed section pitching a B2B subscription offering, including:
  - "Telemetry & Calibration" — water density, extraction pressure, and temperature monitoring for consistent output
  - "The Subscription (CaaS)" — automated cold-chain logistics, single-origin bean replenishment, nitro keg swapping, and preventative machine maintenance
- **Contact section:** A mad-lib style enquiry form — *"Hello, my name is [Name] and I represent [Company]. I want to talk about [Subject]. Here's my email [Email]."* — with a "Send the Brief" call-to-action button.
- **Footer:** Social links (FB, X, IG, WhatsApp), tagline *"Not a coffee break. A better workday."*, and "© 2026 / Bengaluru."

## 4. How to Run This Repo Locally

```bash
# 1. Clone the repository
git clone https://github.com/ahammedfahim4456/profolio-cafe-demo.git

# 2. Move into the project folder
cd profolio-cafe-demo

# 3. Switch to the branch containing this demo
git checkout hafiz-branch

# 4. Install dependencies
npm install

# 5. Start the dev server
npm run dev

# 6. Open the site
# Vite will print a local URL in the terminal — typically:
# http://localhost:5173
```

If port `5173` is already in use, Vite will automatically pick the next available port (e.g. `5174`) and print it in the terminal — use whatever URL it shows.

Available scripts (from `package.json`):

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server with hot reload |
| `npm run build` | Builds the production bundle |
| `npm run preview` | Serves the production build locally for a final check |

No `.env` file, backend service, or database is implied by the dependency list — this is a static frontend build.

## 5. Background: From Redesign Plan to Competing Website

This project began as a plan to redesign the Frozen Bottle website based on three planning documents:

- **Research & SEO Audit** — identified issues on the reference site: broken pricing display, missing founder images, zero product reviews, missing image alt text, unnatural page titles, and unverified Core Web Vitals data.
- **Design Concept** — proposed fixes: a Trust Bar, curated merchandising instead of a flat product grid, a brand-story section, founder credibility section, and concrete newsletter incentives.
- **Technical Stack proposal** — recommended Next.js, Tailwind CSS, Framer Motion, ReactBits, Aceternity UI, headless Shopify, and next-seo.

Partway through, the plan changed direction: Frozen Bottle's own live site turned out to already be a good, well-maintained website, rather than one clearly needing a redesign. Instead of continuing that specific redesign, the goal shifted to building **a competing website** — an independent demo built to match or surpass that same visual and interaction standard, as a way of testing our own limits and ability to build at that level.

That's why the live demo on `hafiz-branch` looks and works the way it does: it carries over the general spirit of the earlier design thinking (strong visual identity, curated menu/product presentation, clear brand storytelling, a dedicated enquiry/contact flow) but is otherwise an independent build — a coffee/cafe brand concept with a B2B "Coffee-as-a-Service" section, built on a different, simpler tech stack (Vite + React + Lenis, plain CSS) than what the original Technical Stack document proposed.

---
