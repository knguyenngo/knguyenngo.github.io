# Portfolio — CLAUDE.md

## Project Overview

Personal portfolio website for Khương Nguyễn (knguyenngo), a Full Stack Software Developer with NLP/ML interests. Deployed to GitHub Pages at `https://knguyenngo.github.io`.

**Current goal: Revamp and modernize the site** — improve visual design, UX, and code quality.

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite 7
- **Styling:** Tailwind CSS v4 + custom CSS (component-scoped files)
- **Icons:** lucide-react
- **Deployment:** gh-pages → GitHub Pages

---

## Commands

```bash
npm run dev        # Start dev server (localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint
npm run deploy     # Build + push to GitHub Pages (gh-pages -d dist)
```

---

## Project Structure

```
src/
├── components/       # One file per component (.tsx + matching .css in styles/components/)
├── styles/
│   ├── variables.css # Design tokens (colors, spacing)
│   ├── globals.css   # Imports all CSS files
│   ├── base.css
│   ├── layout.css
│   └── components/   # Per-component stylesheets
├── data/
│   └── projects.ts   # Project list (title, description, tech, image, repo URL)
├── assets/           # bg.gif (animated background), border.png
├── App.tsx           # Root: imports all sections, sets bg
└── main.tsx          # React entry point
public/               # Static assets (images: headshot.jpg, project previews)
```

---

## Architecture Conventions

- **One component per file** — `Header.tsx`, `HeroCard.tsx`, `ProjectsSection.tsx`, `ProjectCard.tsx`, `ContactBox.tsx`, `ActivityFeed.tsx`, `Footer.tsx`
- **Styles co-located** — each component has a matching CSS file in `src/styles/components/`; all imported via `globals.css`
- **Data separated** — project data lives in `src/data/projects.ts`, not hardcoded in components
- **No state management library** — React local state only

---

## Design System

Dark theme inspired by Everforest. All tokens live in `src/styles/variables.css`.

| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#1a1f26` | Page background |
| `--bg-card` | `#252b35` | Card surfaces |
| `--bg-elevated` | `#2d3541` | Elevated cards |
| `--text-primary` | `#d3c6aa` | Body text (warm beige) |
| `--accent` | `#a7c080` | Links, CTAs (sage green) |
| `--accent-secondary` | `#dbbc7f` | Secondary highlights (gold) |
| `--highlight` | `#e67e80` | Emphasis (rust red) |
| `--link` | `#7fbbb3` | Link color (teal) |

Visual style: glassmorphism cards (`backdrop-filter: blur`), hover lift animations, scanline overlay on bg, thin accent borders.

Fonts loaded via Google Fonts in `index.html`: Inter, IBM Plex Sans Arabic, Be Vietnam Pro.

---

## Key Implementation Details

- **ActivityFeed** fetches live from `https://api.github.com/users/knguyenngo/events/public` — shows last 5 public events
- **HeroCard** rotates greeting text across English, Arabic, Vietnamese
- **Vite base path** is `/` for GitHub Pages root deployment
- `src/assets/extra_borders/` is git-ignored

---

## Modernization Goals

When revamping, prioritize:
1. **Visual refresh** — cleaner layout, stronger typography hierarchy, more intentional use of Tailwind v4 utilities alongside/instead of custom CSS
2. **Responsiveness** — current breakpoint is 900px; improve mobile experience
3. **Performance** — lazy load images, optimize bg.gif or replace with CSS animation
4. **Accessibility** — semantic HTML, ARIA labels, focus states
5. **Code cleanup** — consolidate CSS, reduce duplication between custom CSS and Tailwind
