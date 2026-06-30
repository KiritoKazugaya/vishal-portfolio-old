<div align="center">

# Vishal Naveen Akkala — Portfolio

**A premium, dark-mode-first cinematic portfolio for an AI/ML Engineer.**

Restraint-driven motion, an interactive 3D hero, a skills constellation, animated project case studies, a scroll-driven timeline, and a ⌘K command palette.

[**🌐 Live Demo →**](https://portfolio-khaki-kappa-0tg8cqe2ie.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## Overview

A modern single-page portfolio built to feel like a product, not a template — Apple-level restraint, Vercel-level polish, Awwwards-level interaction quality. It showcases AI/ML and data work through animated, interactive sections while staying fast and accessible (heavy 3D is lazy-loaded and every animation respects `prefers-reduced-motion`).

## ✨ Features

- **Cinematic 3D hero** — a bloom-lit, mouse-reactive energy core (distorted shader mesh + counter-rotating wireframe shell + tilted orbital ring + particles), lazy-loaded with a graceful CSS fallback.
- **Animated text reveals** — GSAP SplitText headline + Motion section reveals.
- **Interactive skills constellation** — a connected-node graph where hovering any skill shows where it was actually used (desktop) / a tappable grouped list (mobile).
- **Project bento grid** — 8 case studies with 3D-tilt cards, hover glow, and a smooth expand-to-case-study modal (problem → goal → architecture → process → result → metrics).
- **Scroll-driven timeline** — experience & education with a progress-fill rail and alternating reveals.
- **⌘K command palette** — keyboard-navigable quick-jump to any section or action.
- **Smooth scrolling** — Lenis, synced to GSAP ScrollTrigger.
- **Fully responsive** and **dark-mode-first**, with an animated preloader and magnetic CTAs.

## 🛠 Tech Stack

| Area | Tools |
|------|-------|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui (on `@base-ui/react`) |
| Animation | Motion, GSAP (ScrollTrigger + SplitText), Lenis |
| 3D | Three.js · React Three Fiber · drei · postprocessing (Bloom) |
| Extras | Rive (drop-in), Recharts, lucide-react |
| Hosting | Vercel |

## 🚀 Getting Started

```bash
# 1. Clone
git clone https://github.com/KiritoKazugaya/vishal-portfolio.git
cd vishal-portfolio

# 2. Install
npm install

# 3. Run the dev server
npm run dev          # → http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run lint         # lint
```

## 📝 Editing Content

**All content lives in one file — [`lib/data.ts`](lib/data.ts).** Nothing is hard-coded inside components, so editing the data updates every section:

- `profile` — name, role, identity statement, summary, headline stats
- `contact` / `socials` — email, phone/WhatsApp, Instagram, GitHub, LinkedIn
- `skillGroups` — the 5 categories powering the skills constellation (each skill has a `usedIn` note)
- `projects` — the 8 case studies (problem, goal, process, architecture, challenges, result, metrics, "what I learned")
- `experience` — work + education timeline

**Assets**

- Profile photo → `public/vishal.jpg`
- Résumé PDF → `public/resume/Vishal-Naveen-Akkala-Resume.pdf`
- Optional Rive animation → drop a `.riv` into `public/rive/` (auto-detected; falls back to a Motion-SVG otherwise)

Each project has a `repo` field — set it to a real URL to enable the "View repository" button, or leave it `null` to render a non-clickable "Private repository" state (no broken links).

## 📁 Project Structure

```
app/                  layout (fonts, metadata, providers) + page (section composition) + globals.css
components/
  anim/               reveal · split-text · magnetic · tilt-card · count-up · rive-asset
  providers/          smooth-scroll (Lenis) · command-palette (⌘K)
  three/              hero-canvas (lazy wrapper) · hero-scene (R3F + bloom)
  sections/           preloader · nav · hero · about · skills · projects · project-modal
                      · timeline · resume · contact · footer
  ui/                 section / heading primitives · button · brand-icons
lib/                  data.ts (content) · types.ts · gsap.ts · utils.ts
public/               vishal.jpg · resume/ · rive/
```

## 🌐 Deployment

Deployed on **Vercel**. To ship changes:

```bash
npx vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard for automatic deploys on every push.

## ♿ Accessibility & Performance

- Respects `prefers-reduced-motion` everywhere (3D, Lenis, GSAP, and reveals all fall back to static states).
- Heavy 3D is limited to the hero and lazy-loaded (`next/dynamic`, `ssr: false`).
- `next/image` for imagery, semantic HTML, and a keyboard-navigable command palette.

---

<div align="center">

Built with Next.js, Three.js, GSAP & Motion · Designed for **Vishal Naveen Akkala**

</div>
