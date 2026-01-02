import { useEffect, useState } from "react";
import "./index.css";

const LINKS = {
  github: "https://github.com/knguyenngo",
  linkedin: "https://linkedin.com/in/knguyenngo",
  email: "khuongnguyenngo@gmail.com",
};

const projects = [
  { name: "IoT Fridge Monitoring", repo: "https://github.com/knguyenngo/iot-fridge" },
  { name: "Reddit Trends Dashboard", repo: "https://github.com/knguyenngo/reddit-nlp-dashboard" },
  { name: "Multilingual Pokémon Reference App", repo: "https://github.com/knguyenngo/pokemon-multilingual" },
  { name: "Esports Stats Platform", repo: "https://github.com/knguyenngo/esports-stats" },
];

const greetings = [
  { key: "en", text: "Hey", dir: "ltr" },
  { key: "ar", text: "مرحبا", dir: "rtl" },
  { key: "vi", text: "Xin Chào", dir: "ltr" },
];

export default function App() {
  const [avatarOk, setAvatarOk] = useState(true);
  const [greetIndex, setGreetIndex] = useState(0);

  useEffect(() => {
    document.title = "Khuong Nguyen";
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) return;

    const id = setInterval(() => {
      setGreetIndex((i) => (i + 1) % greetings.length);
    }, 2400);

    return () => clearInterval(id);
  }, []);

  const current = greetings[greetIndex];

  return (
    <>
      <div className="bg" aria-hidden="true" />
      <main className="wrap">
        <header className="top">
          <div className="brand">
            <div className="logo" aria-hidden="true">KN</div>
            <nav className="nav">
              <a href="#projects">Projects</a>
              <a href="#contact" className="pill">Contact</a>
            </nav>
          </div>
        </header>

        <section className="hero" id="top">
          <div className="heroCard">
            <div className="heroGrid">
              <div className="heroLeft">
                <div className="eyebrow">Full Stack Developer</div>

                <h1 className="title">
                  <span
                    className={`helloSwap lang-${current.key}`}
                    dir={current.dir}
                    lang={current.key}
                    role="button"
                    tabIndex={0}
                    title="Click to switch language"
                    onClick={() =>
                      setGreetIndex((i) => (i + 1) % greetings.length)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setGreetIndex((i) => (i + 1) % greetings.length);
                      }
                    }}
                  >
                    <span key={current.key} className="helloWord">
                      {current.text}
                    </span>
                  </span>
                  <span className="dash"> — </span>
                  I’m <span className="accent">Khuong</span>.
                </h1>

                <p className="lead">
                  I like building calm, practical software: web apps, dashboards,
                  and tools that help people understand what’s going on (without the chaos).
                </p>

                <div className="ctaRow">
                  <a className="btn primary" href="#projects">See projects</a>
                  <a className="btn" href={`mailto:${LINKS.email}`}>Email me</a>
                </div>

                <div className="metaRow" id="contact">
                  <a className="link" href={`mailto:${LINKS.email}`}>
                    {LINKS.email}
                  </a>
                  <span className="dotSep">•</span>
                  <a className="link" href={LINKS.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  <span className="dotSep">•</span>
                  <a className="link" href={LINKS.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="heroRight">
                <div className="avatarCard">
                  {avatarOk ? (
                    <img
                      className="avatar"
                      src="/headshot.jpg"
                      alt="Khuong Nguyen"
                      onError={() => setAvatarOk(false)}
                    />
                  ) : (
                    <div className="avatarFallback">
                      <span>KN</span>
                    </div>
                  )}
                </div>

                <div className="miniCard">
                  <div className="miniTitle">What I’m into</div>
                  <ul className="miniList">
                    <li>Simple UI that feels good to use</li>
                    <li>Solid backend + clean data</li>
                    <li>Shipping small wins consistently</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="sectionHead">
            <h2>Projects</h2>
            <p>Just the highlights — click through for repos.</p>
          </div>

          <div className="projectList">
            {projects.map((p) => (
              <a
                key={p.name}
                className="projectRow"
                href={p.repo}
                target="_blank"
                rel="noreferrer"
              >
                <span className="projectName">{p.name}</span>
                <span className="projectArrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Khuong Nguyen</span>
          <span className="footerSep">•</span>
          <span className="muted">Pastel • Minimal • Responsive</span>
        </footer>
      </main>
    </>
  );
}

