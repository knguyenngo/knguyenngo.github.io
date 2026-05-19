import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroCard from './components/HeroCard';
import BootLog from './components/BootLog';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import LoadingScreen from './components/LoadingScreen';
import './styles/globals.css';
import bgImage from './assets/bg.gif';

export default function App() {
  const [termOpen, setTermOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          <div className="bg-overlay" aria-hidden="true" style={{ backgroundImage: `url(${bgImage})` }} />
          <div className="scanline" aria-hidden="true" />
          <Header onTermOpen={() => setTermOpen(true)} />
          <main className="pt-[68px] px-4 max-w-6xl mx-auto flex flex-col gap-4 pb-4">
            <div className="launch-hero"><HeroCard /></div>
            <div className="launch-bootlog"><BootLog /></div>
            <div className="launch-projects"><ProjectsSection /></div>
          </main>
          <div className="launch-footer"><Footer /></div>
          {termOpen && <Terminal onClose={() => setTermOpen(false)} />}
        </>
      )}
    </>
  );
}
