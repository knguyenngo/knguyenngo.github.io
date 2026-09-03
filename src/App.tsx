import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { ThinkingOrb } from 'thinking-orbs';
import { useScramble } from './hooks/useScramble';
import borderFrame from './assets/border.webp';
import './styles/globals.css';

const NAME = 'Khương Nguyễn-Ngô';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { display, scramble } = useScramble(NAME, 700);
  const [time, setTime] = useState(new Date());
  const [ip, setIp] = useState('···');
  const [location, setLocation] = useState('LOCATING···');

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    scramble();
    const timer = window.setInterval(scramble, 6500);
    return () => window.clearInterval(timer);
  }, [scramble]);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => {
        if (data.ip) {
          setIp(data.ip);
          setLocation([data.city, data.region_code, data.country_code].filter(Boolean).join(', '));
        }
      })
      .catch(() => {
        fetch('https://ipwho.is/')
          .then((response) => response.json())
          .then((data) => {
            if (data.success && data.ip) {
              setIp(data.ip);
              setLocation([data.city, data.region_code, data.country_code].filter(Boolean).join(', '));
            }
          })
          .catch(() => {
            setIp('unavailable');
            setLocation('unavailable');
          });
      });
  }, []);

  const dateTime = time
    .toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(',', '')
    .toUpperCase();

  return (
    <main className="portfolio-shell">
      <img
        className="page-static"
        src="/icegif-285-426582966.gif"
        alt=""
        aria-hidden="true"
      />
      <header className="site-header">
        <nav aria-label="Contact links">
          <a href="https://github.com/knguyenngo" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github aria-hidden="true" />
          </a>
          <a href="https://linkedin.com/in/knguyenngo" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin aria-hidden="true" />
          </a>
          <a href="mailto:knguyenngo@proton.me" aria-label="Email">
            <Mail aria-hidden="true" />
          </a>
          <a
            className="discord-link"
            href="https://discord.com/users/1210662121159786529"
            target="_blank"
            rel="noreferrer"
            aria-label="Discord profile for dz_khu0ng"
            title="Discord: dz_khu0ng"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.3 5.34A16.3 16.3 0 0 0 15.2 4l-.5 1.02a15.1 15.1 0 0 0-5.4 0L8.8 4a16.5 16.5 0 0 0-4.1 1.35C2.1 9.2 1.4 12.96 1.75 16.66a16.6 16.6 0 0 0 5.04 2.55l1.22-1.67a10.3 10.3 0 0 1-1.92-.92l.47-.37c3.7 1.72 7.72 1.72 11.38 0l.48.37c-.62.37-1.27.68-1.93.92l1.22 1.67a16.5 16.5 0 0 0 5.04-2.55c.42-4.3-.72-8.02-3.45-11.32ZM8.9 14.4c-1.11 0-2.02-1.03-2.02-2.3s.89-2.3 2.02-2.3c1.14 0 2.04 1.04 2.02 2.3 0 1.27-.89 2.3-2.02 2.3Zm6.2 0c-1.11 0-2.02-1.03-2.02-2.3s.89-2.3 2.02-2.3c1.14 0 2.04 1.04 2.02 2.3 0 1.27-.88 2.3-2.02 2.3Z" />
            </svg>
          </a>
        </nav>
      </header>

      <section id="home" className="portrait-stage">
        <div className="side-column side-column--left">
          <div className="identity">
            <button
              type="button"
              className="name-signal"
              data-text={display}
              onMouseEnter={scramble}
              onFocus={scramble}
              onClick={scramble}
            >
              {display}
            </button>
            <span>Software engineer</span>
          </div>
        </div>

        <div className="portrait-column">
          <figure className="portrait-frame">
            <img
              className="portrait-image"
              src="/mr_nguyen.png"
              alt="Portrait of Khương Nguyễn-Ngô"
              width={860}
              height={860}
              fetchPriority="high"
            />
            <img
              className="profile-frame-overlay"
              src={borderFrame}
              alt=""
              aria-hidden="true"
              width={224}
              height={224}
              decoding="async"
            />
          </figure>
        </div>

        <div className="side-column side-column--right">
          <div className="intro">
            <h1>I make stuff.</h1>
            <a
              className="work-link"
              href="https://virginmedtransportation.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span>2026</span>
              <span>VMT Site ↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-meta">
          <p>
            <span className="footer-label">IP</span> {ip}
            <span className="footer-separator">·</span>
            <span>{location}</span>
          </p>
          <span className="mobile-meta-separator" aria-hidden="true">·</span>
          <time dateTime={time.toISOString()}>{dateTime}</time>
        </div>
      </footer>
      {loading && (
        <div className="loading-screen">
          <div className="loading-status" role="status" aria-label="Loading portfolio">
            <ThinkingOrb state="solving" size={64} theme="dark" aria-hidden="true" />
            <span>FREE GAZA</span>
          </div>
        </div>
      )}
    </main>
  );
}
