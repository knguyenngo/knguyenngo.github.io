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
      <div className="bg-surface-bright flex items-center justify-between px-3 py-1 border-b-2 border-outline">
        <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
          ~/HOME/KN/BOOT_LOG
        </span>
        <span className="font-mono text-[10px] text-on-surface-variant">JOURNALCTL -XE</span>
      </div>

      <div className="p-6 flex flex-col divide-y divide-outline-variant">
        {experience.map((entry, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-4 py-5 first:pt-0 last:pb-0">

            {/* Logo — centered on mobile, left-aligned on desktop */}
            <div className="w-11 h-11 mx-auto md:mx-0 md:shrink-0 border border-outline-variant bg-surface-container-lowest flex items-center justify-center overflow-hidden">
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

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1 min-w-0 font-mono">

              {/* Badges — bottom on mobile (order-3), top on desktop (order-1) */}
              <div className="order-3 md:order-1 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold border px-1.5 py-px shrink-0 ${STATUS_BADGE[entry.colorVariant ?? entry.status]}`}>
                    {entry.status}
                  </span>
                  {entry.url && (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[10px] font-bold px-2 py-px border border-secondary bg-secondary-container text-secondary hover:bg-secondary hover:text-on-secondary transition-colors duration-150 uppercase tracking-widest"
                    >
                      ↗ VISIT
                    </a>
                  )}
                </div>
                <span className="text-[10px] font-bold text-secondary border border-secondary-container bg-secondary-container px-2 py-px shrink-0 tabular-nums uppercase tracking-wider">
                  {entry.period}
                </span>
              </div>

              {/* Role — top on mobile (order-1), second on desktop (order-2) */}
              <span className={`order-1 md:order-2 text-sm font-bold tracking-tight leading-snug text-center md:text-left ${STATUS_STYLE[entry.colorVariant ?? entry.status]}`}>
                {entry.roleLabel ? (
                  <>
                    <span className="md:hidden">{entry.roleLabel}</span>
                    <span className="hidden md:inline">{entry.role}<span className="text-outline mx-1.5">@</span>{entry.company}</span>
                  </>
                ) : (
                  <>{entry.role}<span className="text-outline mx-1.5">@</span>{entry.company}</>
                )}
              </span>

              {/* Summary — middle on mobile (order-2), third on desktop (order-3) */}
              <p className="order-2 md:order-3 text-[11px] text-on-surface leading-relaxed border-l-2 border-outline-variant pl-3 not-italic">
                {entry.summary}
              </p>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
