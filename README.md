# Monalisa Burma — Portfolio

A premium, single-page portfolio for **Monalisa Burma**, Data Scientist · ML & GenAI Engineer.
Built with React 19, Vite, Tailwind CSS v4, Framer Motion, and AOS.

## Theme

Deep-space "AI/ML" identity — near-black (`#08070d`) with an electric **violet → cyan**
accent, tuned to complement the neural-network hero visuals.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** — preloader, parallax, animated process line
- **AOS** — scroll-reveal animations
- **EmailJS** — contact form (with graceful `mailto` fallback)

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing Content

**All content lives in one file:** [`src/data/portfolioData.js`](src/data/portfolioData.js).
Update personal info, links, skills, projects, experience, and certifications there —
no need to touch the components.

## Sections

Preloader → Navbar → Hero (video) → About → Impact Stats → Technical Skills →
My Approach → GenAI Expertise → Projects → Experience → Internships →
Education & Certifications → Soft Skills → Contact → Footer

## Assets

- `src/assets/hero video/monalisa-hero.mp4` — hero background reel
- `src/assets/about/monalisa-avatar.jpeg` — About photo
- `public/Monalisa_Burma_CV.pdf` — downloadable CV

## Contact Form (optional EmailJS)

Copy `.env.example` to `.env` and fill in your EmailJS credentials.
Without them, the form opens the visitor's mail client with a prefilled message.
