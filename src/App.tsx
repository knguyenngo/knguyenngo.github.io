// src/App.tsx
import { useState } from 'react';
import Header from './components/Header';
import HeroCard from './components/HeroCard';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import './styles/globals.css';
import bgImage from './assets/bg.gif';

export default function App() {
  const [backgroundImage] = useState(bgImage);

  return (
    <>
      <div 
        className="bg" 
        aria-hidden="true"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
        }}
      />
      <main className="wrap">
        <Header />
        <HeroCard />
        <ProjectsSection />
        <Footer />
      </main>
    </>
  );
}
