# Portfolio

Minimal personal portfolio for Khương Nguyễn-Ngô, deployed to GitHub Pages at `https://knguyenngo.github.io`.

## Stack

- React 19 + TypeScript
- Vite 7
- Plain CSS
- Lucide React icons
- Excon (Fontshare), weights 300 and 400; IBM Plex Mono 400 (Google Fonts) for the footer data
- `thinking-orbs` for the loading-screen orb
- `gh-pages` deployment

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
npm run deploy
```

## Active structure

```text
src/
├── assets/
│   ├── border-stars.webp  # Animated portrait frame (56 frames), corners fitted to the photo
│   └── grain.png          # 128px noise tile over the background
├── components/
│   └── SignalBackground.tsx  # Generated SVG background: mesh layer + accent layer (reticles, stars)
├── hooks/
│   └── useScramble.ts
├── styles/
│   ├── base.css
│   └── globals.css
├── App.tsx
└── main.tsx
public/
└── profilepic.webp   # 400×400 pink glitch portrait (source: design/source/newpfp.jpg)
design/               # Local only, not committed or shipped: design rounds, references, locked copies, archived assets
```

`src/assets/` still holds old tracked files (`bg-static.mp4`, `border.webp`, `gallery/`, `extra_borders/`)
that nothing imports, so Vite does not ship them. Anything in `public/` always ships, so keep it to what
the page uses.

## Design

The locked design and every rejected round are in `design/canvas/2026-11-03-purple/index.html`, with the
locked component and stylesheet saved as `*.LOCKED-2026-11-03.*.txt`. Check the "Rejected, do not bring
back" notes there before proposing a look.

- **Background (`SignalBackground.tsx`):** a low-poly mesh lifted by a ridged, faceted height map. The mesh
  lines are an SVG mask over static colour fields (vintage lavender `#A167A5` base, lavender veil `#E8D7F1`
  centre, thistle `#D3BCCC` lower left, indigo velvet `#4A306D` right), with a blurred copy for glow. Small
  target reticles and a sparse scatter of mixed-style stars sit on a second SVG layer that drifts against the
  mesh, kept out of `COPY_ZONES`, which are measured from the rendered page at both design windows. Re-measure
  them if the layout moves. Everything is generated once at load; layers drift with `transform` only, so
  nothing repaints per frame. Keep it that way. The ruby/grey/snow version is saved in the canvas as
  `SignalBackground.r70.tsx.txt`.
- **Colours:** two text colours, `--text` and `--text-muted` on `:root`.
- **Type:** two sizes. Display `2rem` (1.75rem on phone) for the name, "I make stuff →" and project titles;
  labels `0.75rem` at weight 400 with `.12em` tracking. Footer data (IP, location, clock) is IBM Plex Mono.
- **Arrows:** "I make stuff →" and the work view's ← share one style: muted at rest, then they brighten and
  slide `0.375rem` the way they point on hover or focus.
- **Zoom-proof sizing:** every CSS size is `rem`, and `html { font-size }` is a fixed share of the window,
  exactly 16px at the 1786×1024 and 390×844 design windows. Browser zoom does not change the layout.
  Desktop vs phone is chosen by `orientation`, not width. Do not add `px` sizes or width breakpoints.
- **Portrait frame:** `.profile-frame-overlay` is sized from `--frame-pad` so the frame image's corner
  brackets land on the photo's corners. Retune the 5/214 and 224/214 numbers if the frame image changes.
- **Text above the dot texture:** `.portfolio-shell::after` is the dot-matrix screen at `z-index: 40`; copy
  sits at 41. Never put a `transform` on `.portrait-stage` — it makes a stacking context and traps the copy
  under the texture.

## Work view

"I make stuff →" links to `#work`. The home copy fades out (opacity, visibility, `inert`) and the project
list fades in centred. Esc, the ← link and the browser back button close it; opening `#work` directly and
closing returns to the home page instead of leaving the site. Projects are the `PROJECTS` array in
`App.tsx`, numbered automatically.

## Implementation notes

- Visitor IP/location is resolved through `ipapi.co`, with `ipwho.is` as fallback.
- The name uses `useScramble` plus layered CSS signal effects.
- Respect `prefers-reduced-motion` for all animations.
