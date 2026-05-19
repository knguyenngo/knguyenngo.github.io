import { useEffect } from 'react';
import ContactBox from './ContactBox';
import borderFrame from '../assets/border.png';
import { useScramble } from '../hooks/useScramble';

export default function HeroCard() {
  const { display, scramble, reset } = useScramble('Khương Nguyễn');

  useEffect(() => {
    const id = setTimeout(scramble, 350);
    return () => clearTimeout(id);
  }, [scramble]);

  return (
    <section id="bio" className="border-2 border-outline bg-surface-container">
      {/* Section header bar */}
      <div className="bg-surface-bright flex items-center justify-between px-3 py-1 border-b-2 border-outline">
        <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
          ~/HOME/KN/BIO.SH
        </span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-outline" />
          <div className="w-3 h-3 bg-outline" />
          <div className="w-3 h-3 bg-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 grid md:grid-cols-[auto_1fr] gap-8 items-start">
        {/* Avatar */}
        <div className="relative w-40 h-40 bg-surface-container-lowest shrink-0 mx-auto md:mx-0">
          <img
            src="/headshot.jpg"
            alt="Khương Nguyễn"
            className="w-full h-full object-cover avatar-filter"
          />
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              inset: '-12%',
              backgroundImage: `url(${borderFrame})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div className="font-mono">
            <div className="text-xs text-on-surface-variant text-center md:text-left">
              <span className="text-secondary">$</span>{' '}
              <span className="text-on-surface">whoami</span>
            </div>
            <h1
              className="text-3xl font-bold text-primary mt-3 terminal-glow leading-tight cursor-default select-none text-center md:text-left"
              onMouseEnter={scramble}
              onMouseLeave={reset}
            >
              {display}
              <span className="ml-2 text-xl not-italic">🇻🇳 🇵🇸</span>
            </h1>
            <div className="font-mono text-[11px] text-on-surface-variant mt-1 uppercase tracking-widest text-center md:text-left">
              FULL_STACK_ENGINEER
            </div>
            <div className="mt-4 max-w-2xl flex flex-col gap-1 text-center md:text-left">
              <span className="text-primary font-bold text-base">I make stuff.</span>
              <p className="text-on-surface text-base leading-relaxed">
                Full-stack engineer who ships systems that think, moves fast, and builds for the people who actually need it.
              </p>
            </div>
          </div>

          <ContactBox />
        </div>
      </div>
    </section>
  );
}
