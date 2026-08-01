import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import { useScramble } from './hooks/useScramble';
import borderFrame from './assets/border.webp';
import bgStatic from './assets/bg-static.mp4';
import './styles/globals.css';

const NAME = 'Khương Nguyễn-Ngô';
const GALLERY_GIFS = Object.values(
  import.meta.glob('/src/assets/gallery/*.gif', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
) as string[];

// Gallery GIFs are encoded at 144x108 with the strip's grayscale/contrast/brightness
// treatment already baked in, so no per-image CSS filter is needed.
const GIF_INTRINSIC = { width: 144, height: 108 };

// Mirrors `.broadcast-item` width in base.css. The track only has to be as wide as
// the viewport for the -50% scroll to loop seamlessly; rendering more items than
// that is pure decode/compositing cost, which is what hurt on phones.
const itemWidth = (viewport: number) =>
  viewport <= 650 ? 58 : Math.min(92, Math.max(72, viewport * 0.06));

const copiesFor = (viewport: number) =>
  Math.max(1, Math.ceil(viewport / (GALLERY_GIFS.length * itemWidth(viewport))));

export default function App() {
  const { display, scramble } = useScramble(NAME, 700);
  const [time, setTime] = useState(new Date());
  const [ip, setIp] = useState('···');
  const [location, setLocation] = useState('LOCATING···');
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  const [copies, setCopies] = useState(() => copiesFor(window.innerWidth));
  const [stripLive, setStripLive] = useState(true);
  const stripRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);

  // The backdrop is a <video>, so the global prefers-reduced-motion rule in CSS
  // can't reach it — hold it on a single frame instead.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const video = bgRef.current;
      if (!video) return;
      if (query.matches) video.pause();
      else void video.play().catch(() => {});
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  const broadcastGifs = useMemo(() => {
    const base = Array.from({ length: copies }, () => GALLERY_GIFS).flat();
    return { base: base.length, items: [...base, ...base] };
  }, [copies]);

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => setCopies(copiesFor(window.innerWidth)));
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  // Stop the marquee whenever it can't be seen — scrolled away on mobile, or a
  // backgrounded tab. Both otherwise keep every GIF decoding for nothing.
  useEffect(() => {
    const node = stripRef.current;
    if (!node) return;
    const onVisibility = () => setStripLive(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    if (typeof IntersectionObserver === 'undefined') {
      return () => document.removeEventListener('visibilitychange', onVisibility);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setStripLive(entry.isIntersecting && !document.hidden),
      { rootMargin: '120px' },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
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
      <video
        className="page-static"
        ref={bgRef}
        src={bgStatic}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
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
        <div
          className="broadcast-strip broadcast-strip--footer"
          aria-label="Animated visual gallery"
          ref={stripRef}
        >
          <div
            className={`broadcast-track${stripLive ? '' : ' broadcast-track--idle'}`}
            style={{ animationDuration: `${broadcastGifs.base * 1.8}s` }}
          >
            {broadcastGifs.items.map((source, index) => (
              <div
                className="broadcast-item"
                key={`${source}-${index}`}
                aria-hidden={index >= broadcastGifs.base}
              >
                <img
                  src={source}
                  alt=""
                  {...GIF_INTRINSIC}
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
            ))}
          </div>
          <div className="broadcast-meta">
            <p>
              <span className="footer-label">IP</span> {ip}
              <span className="footer-separator">·</span>
              <span>{location}</span>
            </p>
            <time dateTime={time.toISOString()}>
              <span className="desktop-time">{dateTime}</span>
              <span className="mobile-time">
                {time.toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </time>
          </div>
        </div>
      </footer>
      {loading && <LoadingScreen onDone={finishLoading} />}
    </main>
  );
}
