import { useState, useEffect } from 'react';

const TICKER_ITEMS = [
  'OPEN TO OPPORTUNITIES — FULL STACK / DATA ENGINEER ROLES',
  'لماذا تترجم هذا؟ اذهب للعمل واتركنى بسلام',
  'CURRENTLY BUILDING – hitting 10x milestones on an eco round budget',
  '10X MAXXXING – deprecating legacy habits and high-ping energy',
];

interface GeoInfo {
  ip: string;
  city: string;
  region: string;
  country_code: string;
}

export default function Header({ onTermOpen }: { onTermOpen?: () => void }) {
  const [time, setTime] = useState(new Date());
  const [geo, setGeo] = useState<GeoInfo | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch('https://ipwho.is/')
      .then((r) => r.json())
      .then((d) => {
        if (!d.success) return;
        setGeo({
          ip: d.ip,
          city: d.city ?? '???',
          region: d.region_code ?? d.region ?? '??',
          country_code: d.country_code ?? '??',
        });
      })
      .catch(() => {});
  }, []);

  const hms  = time.toLocaleTimeString('en-US', { hour12: false });
  const date = time
    .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    .toUpperCase()
    .replace(/,/g, '');

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex flex-col">

      {/* Row 1 — stat modules (scrollable on mobile) */}
      <div className="bg-surface-container/80 backdrop-blur-sm border-b border-outline/50 h-8 flex items-center px-4 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-0 font-mono text-[10px] divide-x divide-outline/40 shrink-0">

          {onTermOpen && (
            <button
              onClick={onTermOpen}
              className="flex items-center gap-1.5 font-semibold text-primary tracking-widest terminal-glow select-none pr-3 whitespace-nowrap hover:text-primary/70 transition-colors cursor-pointer"
              title="Open terminal (` key)"
            >
              <span className="text-outline text-[10px]">$</span>
              <span className="text-[11px]">~</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-3 whitespace-nowrap">
            <span className="text-primary text-[8px] animate-pulse">⬤</span>
            <span className="text-on-surface-variant uppercase tracking-widest">VISITOR_CONNECTED</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 whitespace-nowrap">
            <span className="text-outline">◈</span>
            <span className="text-secondary">{geo ? geo.ip : '···'}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 whitespace-nowrap">
            <span className="text-outline">▸</span>
            <span className="text-primary uppercase">
              {geo ? `${geo.city}, ${geo.region} ${geo.country_code}` : 'LOC_RESOLVING'}
            </span>
          </div>

          <div className="flex items-center gap-3 pl-3 whitespace-nowrap">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="text-outline">◷</span>
              <span>{date}</span>
            </div>
            <span className="text-primary tabular-nums">{hms}</span>
          </div>

        </div>
      </div>

      {/* Row 2 — ticker */}
      <div className="bg-surface-container-lowest border-b border-outline/30 h-5 flex items-center overflow-hidden">
        <div className="shrink-0 flex items-center gap-1.5 px-2 border-r border-outline/40 h-full bg-primary/10">
          <span className="text-primary text-[8px] animate-pulse">⬤</span>
          <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-widest">FEED</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => {
              const isOpportunity = item === 'OPEN TO OPPORTUNITIES — FULL STACK / DATA ENGINEER ROLES';
              return (
                <span key={i} className={`font-mono text-[9px] uppercase tracking-wider px-6 whitespace-nowrap ${isOpportunity ? 'text-primary animate-pulse' : 'text-on-surface-variant'}`}>
                  <span className="text-outline mr-2">◆</span>{item}
                </span>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
