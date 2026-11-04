// Hand-built page background: a low-poly 3D mesh — a triangulated grid lifted by a ridged, faceted height
// map into sharp creases and flat planes, coloured from a lavender and indigo palette, with target reticles
// and a few stars as accents.
// The dot-matrix screen texture over the whole page lives in CSS (.portfolio-shell::after).
// The mesh and the accents are two static <svg> layers drifting against each other on the compositor, so
// nothing repaints per frame.

const VIEW = '0 0 1600 1000';

// Deterministic hash for lattice corners, so the warp is the same every visit.
function hash(x: number, y: number, seed: number) {
  const h = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return h - Math.floor(h);
}

// Faceted value noise in [-1, 1]: lattice values blended linearly, so the surface is made of flat planes
// that meet at hard edges instead of rolling smoothly.
function noise(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = x - xi;
  const fy = y - yi;
  const top = hash(xi, yi, seed) + (hash(xi + 1, yi, seed) - hash(xi, yi, seed)) * fx;
  const bottom = hash(xi, yi + 1, seed) + (hash(xi + 1, yi + 1, seed) - hash(xi, yi + 1, seed)) * fx;
  return (top + (bottom - top) * fy) * 2 - 1;
}

// Ridged: folding the noise at zero turns every crossing into a knife-edge crease.
function height(x: number, y: number) {
  const ridge = (n: number) => 1 - Math.abs(n);
  return ridge(noise(x, y, 3)) * 0.7 + ridge(noise(x * 2.3 + 4.1, y * 2.3 + 7.7, 9)) * 0.3;
}

// Low-poly surface: a coarse grid of nodes lifted by the height map and seen at a slight oblique angle,
// joined by straight edges into triangles. Even spacing keeps it reading as a 3D mesh, not a scribble.
const GAP = 30;
const LIFT = 170;
const LEAN = 0.2;
const SCALE = 1 / 190;
const MARGIN = 120;

const cols = Math.ceil((1600 + 2 * MARGIN) / GAP);
const rows = Math.ceil((1000 + 2 * MARGIN) / GAP);

const NODES = Array.from({ length: rows + 1 }, (_, r) =>
  Array.from({ length: cols + 1 }, (_, c) => {
    const x = -MARGIN + c * GAP;
    const y = -MARGIN + r * GAP;
    const h = height(x * SCALE, y * SCALE) * LIFT;
    return `${Math.round(x + h * LEAN)} ${Math.round(y - h)}`;
  }),
);

const ROW_LINES = NODES.map((row) => `M${row.join('L')}`).join('');
const COLUMN_LINES = NODES[0].map((_, c) => `M${NODES.map((row) => row[c]).join('L')}`).join('');
// One diagonal per cell, alternating direction, splits each quad into the triangles of a low-poly mesh.
const DIAGONALS = NODES.slice(0, -1)
  .flatMap((row, r) =>
    row
      .slice(0, -1)
      .map((node, c) => ((r + c) % 2 ? `M${node}L${NODES[r + 1][c + 1]}` : `M${row[c + 1]}L${NODES[r + 1][c]}`)),
  )
  .join('');

// Copy zones (viewBox units): where stars and reticles may not sit. Measured from the rendered page at the
// 1786×1024 and 390×844 design windows, padded for the accent drift and the marks' own size. Re-measure if the
// layout moves.
const COPY_ZONES = [
  // Desktop: name, intro, icons, portrait, footer left and right.
  [120, 440, 480, 580],
  [1150, 455, 1410, 565],
  [1280, 60, 1520, 165],
  [560, 285, 1015, 735],
  [60, 860, 640, 945],
  [1100, 860, 1520, 945],
  // Phone (centre strip): icons, name, intro, footer.
  [560, 40, 1010, 155],
  [595, 245, 975, 390],
  [650, 650, 920, 760],
  [560, 855, 1010, 990],
];
const inCopy = (x: number, y: number) =>
  COPY_ZONES.some(([x0, y0, x1, y1]) => x >= x0 && x <= x1 && y >= y0 && y <= y1);

// Big stars only where they read as stars: inside the page edges, below the header, clear of the portrait.
const bigAllowed = (x: number, y: number) =>
  x > 110 && x < 1490 && y > 150 && y < 880 && !(x > 540 && x < 1060 && y > 220 && y < 780);

type Star = { x: number; y: number; r: number };

// Even scatter (blue noise): candidates are thrown one by one and kept only if they sit at least GAP from
// every star already kept, so there are no clumps and no holes. The phone strip gets the same density.
const STAR_GAP = 105;
const stars: Star[] = [];
const bigs: Star[] = [];

for (let i = 0; i < 6000; i++) {
  const x = hash(i, 2, 71) * 1600;
  const y = hash(i, 3, 71) * 1000;
  if (inCopy(x, y) || stars.some((t) => (t.x - x) ** 2 + (t.y - y) ** 2 < STAR_GAP * STAR_GAP)) continue;
  // Steep curve: mostly tiny, a few large.
  let r = 1.5 + hash(i, 4, 71) ** 3.2 * 21;
  if (r > 17 && (!bigAllowed(x, y) || bigs.some((b) => Math.hypot(b.x - x, b.y - y) < 260))) r = 6 + hash(i, 5, 71) * 5;
  const star = { x, y, r };
  stars.push(star);
  if (r > 17) bigs.push(star);
}

const pt = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;

const circle = (x: number, y: number, r: number) =>
  `M${pt(x - r, y)}a${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${(r * 2).toFixed(1)} 0a${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${(-r * 2).toFixed(1)} 0`;

// Target reticles: a centre dot inside one or two rings, with thin crosshairs. Three variants keep them from
// all matching: full targets with long crosshairs, single rings with short ticks across them, and plain rings.
type Drawn = { dot: string; ring: string; hair: string };

const cross = (x: number, y: number, from: number, to: number) =>
  [0, 1, 2, 3]
    .map((k) => {
      const [dx, dy] = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ][k];
      return `M${pt(x + dx * from, y + dy * from)}L${pt(x + dx * to, y + dy * to)}`;
    })
    .join('');

function drawTarget(x: number, y: number, r: number, n: number): Drawn {
  if (r < 4) return { dot: circle(x, y, r * 0.6), ring: '', hair: '' };
  const dot = circle(x, y, Math.max(1.2, r * 0.1));
  const kind = hash(n, 7, 61);
  if (kind < 0.5)
    return {
      dot,
      ring: circle(x, y, r * 0.35) + circle(x, y, r * 0.8),
      hair: cross(x, y, r * 0.45, r * (1.6 + hash(n, 8, 61) * 0.8)),
    };
  if (kind < 0.8) return { dot, ring: circle(x, y, r * 0.7), hair: cross(x, y, r * 0.5, r * 1.05) };
  return { dot, ring: circle(x, y, r * 0.6), hair: '' };
}

// Reticles stay small: their sizes are squeezed into roughly 4–10 so they read as fine detail, not targets.
const DRAWN = stars.map(({ x, y, r }, n) => drawTarget(x, y, r < 4 ? r : 4 + (r - 4) * 0.33, n));
const TARGET_DOTS = DRAWN.map((d) => d.dot).join('');
const TARGET_RINGS = DRAWN.map((d) => d.ring).join('');
const TARGET_HAIRS = DRAWN.map((d) => d.hair).join('');

// Concave four-point sparkle, `turn` radians off upright.
function sparkle(x: number, y: number, r: number, turn: number) {
  const points = Array.from({ length: 8 }, (_, k) => {
    const a = turn + (k * Math.PI) / 4 - Math.PI / 2;
    const d = k % 2 ? r * 0.16 : r;
    return pt(x + Math.cos(a) * d, y + Math.sin(a) * d);
  });
  return `M${points.join('L')}Z`;
}

// Crossed blades: two thin pointed leaves crossing on the diagonals, like an X.
function blades(x: number, y: number, r: number) {
  return [Math.PI / 4, -Math.PI / 4]
    .map((a) => {
      const ux = Math.cos(a);
      const uy = Math.sin(a);
      const w = r * 0.22;
      return `M${pt(x - ux * r, y - uy * r)}Q${pt(x - uy * w, y + ux * w)} ${pt(x + ux * r, y + uy * r)}Q${pt(x + uy * w, y - ux * w)} ${pt(x - ux * r, y - uy * r)}Z`;
    })
    .join('');
}

// Outline sparkle: a four-point star with deep concave sides, drawn as a thin outline like a quick pen sketch.
function outlineSparkle(x: number, y: number, r: number, n: number, pinch = 0.2) {
  // Near-even arms and a slight tilt, so it reads as a star rather than an upright cross.
  const tilt = (hash(n, 15, 61) - 0.5) * 0.7;
  const arms = [1.05, 0.85 + hash(n, 16, 61) * 0.15, 1.05 + hash(n, 12, 61) * 0.15, 0.85 + hash(n, 17, 61) * 0.15];
  const tips: [number, number][] = arms.map((len, k) => {
    const a = tilt - Math.PI / 2 + (k * Math.PI) / 2;
    return [x + Math.cos(a) * r * len, y + Math.sin(a) * r * len];
  });
  const pull = (t: [number, number]): string => pt(x + (t[0] - x) * pinch, y + (t[1] - y) * pinch);
  return (
    `M${pt(...tips[0])}` +
    tips.map((t, k) => `C${pull(t)} ${pull(tips[(k + 1) % 4])} ${pt(...tips[(k + 1) % 4])}`).join('') +
    'Z'
  );
}

// Eight-point compass star: long points on the axes, short ones on the diagonals.
function compass(x: number, y: number, r: number) {
  const points = Array.from({ length: 16 }, (_, k) => {
    const a = (k * Math.PI) / 8 - Math.PI / 2;
    const d = k % 2 ? r * 0.13 : k % 4 ? r * 0.5 : r;
    return pt(x + Math.cos(a) * d, y + Math.sin(a) * d);
  });
  return `M${points.join('L')}Z`;
}

// Curved four-point star: concave sides with a little body, tilted onto the diagonals.
function curved(x: number, y: number, r: number) {
  const at = (a: number, d: number) => pt(x + Math.cos(a) * d, y + Math.sin(a) * d);
  const tip = (k: number) => Math.PI / 4 + (k * Math.PI) / 2;
  return (
    `M${at(tip(0), r)}` +
    [0, 1, 2, 3].map((k) => `C${at(tip(k), r * 0.22)} ${at(tip(k + 1), r * 0.22)} ${at(tip(k + 1), r)}`).join('') +
    'Z'
  );
}

// Several star design languages, picked per star, so the sky never reads as a field of crosses.
type StarDrawn = { fill: string; line: string };

function drawStar(x: number, y: number, r: number, n: number): StarDrawn {
  if (r < 4) return { fill: circle(x, y, r * 0.7), line: '' };
  const kind = hash(n, 7, 61);
  if (kind < 0.28) return { fill: '', line: outlineSparkle(x, y, r, n) };
  if (kind < 0.48)
    return {
      fill: sparkle(x, y, r, hash(n, 13, 61) > 0.7 ? Math.PI / 4 : 0) + circle(x, y, Math.max(1.3, r * 0.13)),
      line: '',
    };
  if (kind < 0.62) return { fill: compass(x, y, r * 1.1), line: '' };
  if (kind < 0.74) return { fill: curved(x, y, r * 0.9), line: '' };
  if (kind < 0.84) {
    const side = hash(n, 14, 61) > 0.5 ? 1 : -1;
    return {
      fill: sparkle(x + side * r * 1.2, y - r * 0.9, r * 0.38, 0),
      line: outlineSparkle(x, y, r * 0.85, n),
    };
  }
  if (kind < 0.93)
    return {
      fill: circle(x, y, Math.max(1.4, r * 0.18)),
      line: circle(x, y, r * 0.55),
    };
  return { fill: blades(x, y, r * 0.9), line: '' };
}

// A sparse second layer of stars between the reticles: far wider spacing, clear of the copy and of every
// reticle, so they read as the odd glint rather than a field.
const SPARSE_GAP = 230;
const sparse: Star[] = [];
for (let i = 0; i < 3000; i++) {
  const x = hash(i, 2, 83) * 1600;
  const y = hash(i, 3, 83) * 1000;
  if (inCopy(x, y)) continue;
  if (sparse.some((t) => Math.hypot(t.x - x, t.y - y) < SPARSE_GAP)) continue;
  if (stars.some((t) => Math.hypot(t.x - x, t.y - y) < 70)) continue;
  sparse.push({ x, y, r: 5 + hash(i, 4, 83) ** 1.5 * 10 });
}

const SPARSE_DRAWN = sparse.map(({ x, y, r }, n) => drawStar(x, y, r, n + 500));
const STAR_FILL = SPARSE_DRAWN.map((d) => d.fill).join('');
const STAR_OUTLINE = SPARSE_DRAWN.map((d) => d.line).join('');

// Colour fields for the mesh, from the palette Lavender Veil #E8D7F1, Thistle #D3BCCC, Vintage Lavender
// #A167A5, Indigo Velvet #4A306D: a vintage lavender base, veil through the middle (so the phone's centre
// strip gets colour), thistle lower left, and indigo deepening the right.
const MESH_FIELDS = [
  { id: 'mesh-veil', colour: '#E8D7F1', x: 800, y: 380, r: 560 },
  { id: 'mesh-thistle', colour: '#D3BCCC', x: 180, y: 820, r: 600 },
  { id: 'mesh-indigo-top', colour: '#4A306D', x: 1520, y: 120, r: 620 },
  { id: 'mesh-indigo-low', colour: '#4A306D', x: 1450, y: 980, r: 520 },
];

export function SignalBackground() {
  return (
    <div className="signal-bg" aria-hidden="true">
      <svg className="signal-layer signal-layer--web" viewBox={VIEW} preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Neon glow: a blurred copy of the mesh under the crisp one. Static, so the blur is rasterised once. */}
          <filter id="mesh-glow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          {/* Colour for the mesh: the palette fields below, spread across the page. The mesh lines are a stencil
              over this layer, so the colour shifts along each line. */}
          {MESH_FIELDS.map(({ id, colour, x, y, r }) => (
            <radialGradient key={id} id={id} gradientUnits="userSpaceOnUse" cx={x} cy={y} r={r}>
              <stop offset="0" stopColor={colour} />
              <stop offset="1" stopColor={colour} stopOpacity="0" />
            </radialGradient>
          ))}
          <g id="mesh-colour">
            <rect x="-200" y="-200" width="2000" height="1400" fill="#A167A5" />
            {MESH_FIELDS.map(({ id }) => (
              <rect key={id} x="-200" y="-200" width="2000" height="1400" fill={`url(#${id})`} />
            ))}
          </g>
          <mask id="mesh-glow-mask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2000" height="1400">
            <g fill="none" stroke="#fff" strokeWidth="3" filter="url(#mesh-glow)" opacity=".62">
              <path d={ROW_LINES} />
              <path d={COLUMN_LINES} />
            </g>
          </mask>
          <mask id="mesh-line-mask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2000" height="1400">
            <g fill="none" stroke="#fff" strokeWidth="1" vectorEffect="non-scaling-stroke">
              <path d={ROW_LINES} opacity=".8" />
              <path d={COLUMN_LINES} opacity=".68" />
              <path d={DIAGONALS} opacity=".3" />
            </g>
          </mask>
        </defs>
        <use href="#mesh-colour" mask="url(#mesh-glow-mask)" />
        <use href="#mesh-colour" mask="url(#mesh-line-mask)" />
      </svg>

      {/* Stars and reticles drift on their own layer, against the mesh, so the two read at different depths. */}
      <svg className="signal-layer signal-layer--accents" viewBox={VIEW} preserveAspectRatio="xMidYMid slice">
        <g filter="url(#mesh-glow)" opacity=".35">
          <path d={TARGET_DOTS} fill="#A167A5" stroke="#A167A5" strokeWidth="3" />
          <path d={TARGET_RINGS} fill="none" stroke="#A167A5" strokeWidth="4" />
        </g>
        <g fill="none" stroke="#E8D7F1" vectorEffect="non-scaling-stroke">
          <path d={TARGET_HAIRS} strokeWidth=".8" opacity=".4" />
          <path d={TARGET_RINGS} strokeWidth="1.2" opacity=".75" />
        </g>
        <path d={TARGET_DOTS} fill="#E8D7F1" opacity=".8" />
        <g filter="url(#mesh-glow)" opacity=".35">
          <path d={STAR_FILL} fill="#A167A5" stroke="#A167A5" strokeWidth="3" />
          <path d={STAR_OUTLINE} fill="none" stroke="#A167A5" strokeWidth="4" />
        </g>
        <path d={STAR_FILL} fill="#E8D7F1" opacity=".75" />
        <path
          d={STAR_OUTLINE}
          fill="none"
          stroke="#E8D7F1"
          strokeWidth="1.3"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity=".75"
        />
      </svg>

      <div className="signal-grain" />
    </div>
  );
}
