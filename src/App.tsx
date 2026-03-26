import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroCard from './components/HeroCard';
import BootLog from './components/BootLog';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import './styles/globals.css';
import bgImage from './assets/bg.gif';

export default function App() {
  const [termOpen, setTermOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        setTermOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <div className="bg-overlay" aria-hidden="true" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="scanline" aria-hidden="true" />
      <Header onTermOpen={() => setTermOpen(true)} />
      <main className="pt-[52px] px-4 max-w-6xl mx-auto flex flex-col gap-4 pb-4">
        <HeroCard />
        <BootLog />
        <ProjectsSection />
      </main>
      <Footer />
      {termOpen && <Terminal onClose={() => setTermOpen(false)} />}
    </>
  );
}
