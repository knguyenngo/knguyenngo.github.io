import { useEffect, useState } from 'react';

const BOOT_LINES = [
  '> LOADING MODULES...',
  '> ESTABLISHING CONNECTION...',
  '> MOUNTING /HOME/KN...',
  '> READY.',
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const DURATION = 1400;
    const start = Date.now();

    const tick = setInterval(() => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      setProgress(p);
      setLineCount(Math.floor(p * BOOT_LINES.length) + (p > 0 ? 1 : 0));

      if (p >= 1) {
        clearInterval(tick);
        setTimeout(() => setFading(true), 200);
        setTimeout(onDone, 650);
      }
    }, 16);

    return () => clearInterval(tick);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-surface flex flex-col items-center justify-center"
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.45s ease-out' }}
    >
      <div className="font-mono w-72">
        <div className="text-primary text-[10px] uppercase tracking-widest mb-6 terminal-glow">
          BOOT_SEQUENCE_INIT // KN.SH
        </div>

        <div className="flex flex-col gap-1.5 mb-8" style={{ minHeight: '80px' }}>
          <div className="text-on-surface-variant text-[11px]">
            <span className="text-secondary">$</span> kn_portfolio --start
          </div>
          {BOOT_LINES.slice(0, lineCount).map((line, i) => (
            <div
              key={i}
              className={`text-[11px] ${i === lineCount - 1 && progress < 1 ? 'text-on-surface' : 'text-on-surface-variant'}`}
            >
              {line}
              {i === lineCount - 1 && progress < 1 && (
                <span className="ml-1 animate-pulse text-primary">█</span>
              )}
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-outline-variant mb-1.5">
          <div
            className="h-full bg-primary"
            style={{ width: `${progress * 100}%`, transition: 'width 80ms linear' }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-on-surface-variant tabular-nums">
          <span>STATUS: {progress >= 1 ? 'OK' : 'LOADING'}</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
