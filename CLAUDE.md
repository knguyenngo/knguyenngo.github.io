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
│   ├── bg-static.mp4  # Animated analog-static page background
│   └── border.webp    # Animated portrait overlay frame (30 frames)
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
├── gojo-loader.mp4
└── mr_nguyen.png
```

## Assets

Total payload is ~1.3 MB and should stay there. Assets are pre-processed so the
browser does as little per-frame work as possible:

- **Gallery GIFs** are 144x108, ≤12fps, grayscale, with the strip's old CSS filter
  (`grayscale(1) contrast(1.15) brightness(.56)`) **baked into the pixels**. That is why
  `.broadcast-item img` has no filter. Re-encode new GIFs the same way, otherwise they
  will look washed out next to the others:

  ```bash
  ffmpeg -i in.gif -vf "crop='min(iw,ih*4/3)':'min(ih,iw*3/4)',scale=144:108:flags=lanczos,fps=12,\
  format=gray,lutyuv=y='clip(0.644*val-10.71,0,255)',split[s0][s1];\
  [s0]palettegen=max_colors=48:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=4" \
    -loop 0 src/assets/gallery/out.gif
  ```

- **`border.webp` and `bg-static.mp4` are both animated.** They were originally a 30-frame
  APNG and a 12-frame GIF. Analog static and soft alpha glows are high-entropy, so LZW/PNG
  compress them terribly — moving them to WebP/h264 cut them 3.7x and 5.5x with the frames
  intact. **Before "optimizing" either one, check the frame count** — ImageMagick reports an
  APNG as a single frame, which is exactly how the animation got flattened once already:

  ```bash
  python3 -c "d=open('src/assets/border.webp','rb').read(); print(d.count(b'ANMF'),'frames')"
  ffprobe -v error -select_streams v -count_frames -show_entries stream=nb_read_frames \
    -of csv=p=0 src/assets/bg-static.mp4
  ```
- **`mr_nguyen.png`** is a 4-colour PNG, not a JPEG — the portrait is a 2-tone image, so
  JPEG spent bytes on ringing around hard edges.
- The portrait and loader video are also stored grayscale/low-bitrate because CSS
  desaturates and dims them anyway.

## Implementation notes

- Add GIFs to `src/assets/gallery/`; `import.meta.glob` discovers them at build time.
- The filmstrip renders only enough tiles to span the viewport (`copiesFor` in `App.tsx`),
  and pauses via `IntersectionObserver` when scrolled away or the tab is hidden. If you
  change `.broadcast-item`'s width in CSS, update `itemWidth` to match.
- Media is deliberately **not** gated behind `LoadingScreen`; it mounts underneath so it
  downloads during the ~6s intro instead of after it.
- `LoadingScreen` has a `MAX_LOADER_MS` safety cap — without it a stalled video means
  `onEnded`/`onError` never fire and the site stays hidden forever.
- The desktop composition is fixed to the viewport. The footer filmstrip is visually overlaid so it does not move the centered hero.
- Mobile uses a stacked layout and a separate metadata bar beneath the GIF strip.
- Visitor IP/location is resolved through `ipapi.co`, with `ipwho.is` as fallback.
- The name uses `useScramble` plus layered CSS signal effects.
- The portrait combines a VHS treatment, rotating outline, and `border.png` overlay.
- Respect `prefers-reduced-motion` for all animations.
