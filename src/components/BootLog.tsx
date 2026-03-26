import { experience } from '../data/experience';

const STATUS_STYLE: Record<string, string> = {
  RUNNING:   'text-secondary',
  SUCCESS:   'text-primary',
  INIT:      'text-on-surface-variant',
  primary:   'text-primary',
  secondary: 'text-secondary',
};

const STATUS_BADGE: Record<string, string> = {
  RUNNING:   'border-secondary text-secondary bg-secondary-container',
  SUCCESS:   'border-primary   text-primary   bg-primary-container',
  INIT:      'border-outline-variant text-on-surface-variant bg-surface-container-highest',
  primary:   'border-primary   text-primary   bg-primary-container',
  secondary: 'border-secondary text-secondary bg-secondary-container',
};

export default function BootLog() {
  return (
    <section className="border-2 border-outline bg-surface-container">
      {/* Section header bar */}
      <div className="bg-surface-bright flex items-center justify-between px-3 py-1 border-b-2 border-outline">
        <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
          ~/HOME/KN/BOOT_LOG
        </span>
        <span className="font-mono text-[10px] text-on-surface-variant">JOURNALCTL -XE</span>
      </div>

      {/* Entries */}
      <div className="p-6 flex flex-col divide-y divide-outline-variant">
        {experience.map((entry, idx) => (
          <div key={idx} className="flex gap-4 py-5 first:pt-0 last:pb-0">

            {/* Logo — left */}
            <div className="w-11 h-11 shrink-0 border border-outline-variant bg-surface-container-lowest flex items-center justify-center overflow-hidden">
              {entry.logo ? (
                <img
                  src={`/logos/${entry.logo}`}
                  alt={entry.company}
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).replaceWith(
                      Object.assign(document.createElement('span'), {
                        className: 'text-outline text-xs font-mono',
                        textContent: '◈',
                      })
                    );
                  }}
                />
              ) : (
                <span className="text-outline text-xs font-mono">◈</span>
              )}
            </div>

            {/* Content — right */}
            <div className="flex flex-col gap-2 flex-1 min-w-0 font-mono">
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                {/* ROLE @ COMPANY */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-bold border px-1.5 py-px shrink-0 ${STATUS_BADGE[entry.colorVariant ?? entry.status]}`}>
                    {entry.status}
                  </span>
                  <span className={`text-sm font-bold tracking-tight ${STATUS_STYLE[entry.colorVariant ?? entry.status]}`}>
                    {entry.role}
                    <span className="text-outline mx-1.5">@</span>
                    {entry.company}
                  </span>
                </div>
                {/* Duration — highlighted */}
                <span className="text-[10px] font-bold text-secondary border border-secondary-container bg-secondary-container px-2 py-px shrink-0 tabular-nums uppercase tracking-wider">
                  {entry.period}
                </span>
              </div>

              {/* Summary */}
              <p className="text-[11px] text-on-surface-variant leading-relaxed border-l-2 border-outline-variant pl-3 not-italic">
                {entry.summary}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
