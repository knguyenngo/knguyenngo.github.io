// src/components/HeroCard.tsx
import { useState, useEffect } from 'react';
import ContactBox from './ContactBox';

const greetings = [
  { text: "Hello", dir: "ltr" },
  { text: "مرحبا", dir: "rtl" },
  { text: "Xin Chào", dir: "ltr" },
];

export default function HeroCard() {
  const [greetIndex, setGreetIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setGreetIndex((i) => (i + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="heroCard">
      <div className="heroGrid">
        {/* Profile */}
        <div className="heroLeft">
          <div className="profileFrame">
            <img 
              className="avatar" 
              src="/headshot.jpg" 
              alt="Khuong Nguyen" 
            />
          </div>
          <div className="statusBadge">Somewhere.</div>
        </div>

        {/* Info */}
        <div className="heroRight">
          <div className="headerTop">
            <h1 className="title">Khương Nguyễn</h1>
          </div>
          <div className="flagsRow">
            <span className="flag">🇻🇳</span>
            <span className="flag">🇵🇸</span>
          </div>
          <div className="subHeader">
            Full Stack Software Developer
          </div>
          <div className="bioBox">
            I make stuff. Mainly web apps that turn data into accessible tools people can rely on. Looking to grow in the Machine Learning space, specifically NLP for extracting insights from technical datasets.
          </div>
        </div>

        {/* Contact */}
        <div className="heroSidebar">
          <ContactBox />
        </div>
      </div>
    </section>
  );
}
