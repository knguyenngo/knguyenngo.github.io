# Portfolio

Minimal personal portfolio for Khương Nguyễn-Ngô, deployed to GitHub Pages at `https://knguyenngo.github.io`.

## Stack

- React 19 + TypeScript
- Vite 7
- Plain CSS
- Lucide React icons
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
│   ├── gallery/       # GIFs automatically included in the footer filmstrip
│   ├── bg.gif         # Animated page background
│   └── border.png     # Portrait overlay frame
├── components/
│   └── LoadingScreen.tsx
├── hooks/
│   └── useScramble.ts
├── styles/
│   ├── base.css
│   └── globals.css
├── App.tsx
└── main.tsx
public/
└── mr_nguyen.jpg
```

## Implementation notes

- Add GIFs to `src/assets/gallery/`; `import.meta.glob` discovers them at build time.
- The desktop composition is fixed to the viewport. The footer filmstrip is visually overlaid so it does not move the centered hero.
- Mobile uses a stacked layout and a separate metadata bar beneath the GIF strip.
- Visitor IP/location is resolved through `ipapi.co`, with `ipwho.is` as fallback.
- The name uses `useScramble` plus layered CSS signal effects.
- The portrait combines a VHS treatment, rotating outline, and `border.png` overlay.
- Respect `prefers-reduced-motion` for all animations.
