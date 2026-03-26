import { useState, useEffect, useRef, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import ActivityFeed from './ActivityFeed';
import { projects } from '../data/projects';

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [animKey, setAnimKey] = useState(0);
  const hovered = useRef(false);

  const navigate = useCallback((dir: 'left' | 'right') => {
    setDirection(dir);
    setCurrent((prev) =>
      dir === 'right'
        ? (prev + 1) % projects.length
        : (prev - 1 + projects.length) % projects.length
    );
    setAnimKey((k) => k + 1);
  }, []);

  // Auto-advance every 5s, paused while hovering
  useEffect(() => {
    const id = setInterval(() => {
      if (!hovered.current) navigate('right');
    }, 5000);
    return () => clearInterval(id);
  }, [navigate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="projects" className="border-2 border-outline bg-surface-container">
      {/* Section header bar */}
      <div className="bg-surface-bright flex items-center justify-between px-3 py-1 border-b-2 border-outline">
        <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
          ~/HOME/KN/ACTIVE_PROCESSES
        </span>

        {/* Navigation controls */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <button
            onClick={() => navigate('left')}
            className="text-outline hover:text-primary hover:bg-surface-container-highest px-1.5 py-0.5 transition-colors duration-150 border border-transparent hover:border-outline-variant"
            aria-label="Previous project"
          >
            ◂
          </button>
          <span className="text-on-surface-variant tabular-nums">
            PROJ_{pad(current + 1)} / {pad(projects.length)}
          </span>
          <button
            onClick={() => navigate('right')}
            className="text-outline hover:text-primary hover:bg-surface-container-highest px-1.5 py-0.5 transition-colors duration-150 border border-transparent hover:border-outline-variant"
            aria-label="Next project"
          >
            ▸
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 grid gap-6 lg:grid-cols-[1fr,280px] items-start">

        {/* Carousel */}
        <div
          className="flex flex-col gap-4"
          onMouseEnter={() => { hovered.current = true; }}
          onMouseLeave={() => { hovered.current = false; }}
        >
          {/* Animated card */}
          <div
            key={animKey}
            className={direction === 'right' ? 'proj-slide-right' : 'proj-slide-left'}
          >
            <ProjectCard project={projects[current]} index={current} />
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 justify-center pt-1">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > current ? 'right' : 'left');
                  setCurrent(idx);
                  setAnimKey((k) => k + 1);
                }}
                className={`transition-all duration-150 font-mono text-[8px] ${
                  idx === current
                    ? 'text-primary'
                    : 'text-outline hover:text-on-surface-variant'
                }`}
                aria-label={`Go to project ${idx + 1}`}
              >
                {idx === current ? '◆' : '◇'}
              </button>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <ActivityFeed />
      </div>
    </section>
  );
}
