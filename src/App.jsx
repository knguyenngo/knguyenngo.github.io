import { useEffect, useState } from "react";
import "./index.css";

const LINKS = {
  github: "https://github.com/knguyenngo",
  linkedin: "https://linkedin.com/in/knguyenngo",
  email: "khuongnguyenngo@gmail.com",
};

const projects = [
  { 
    name: "IoT Fridge Monitoring", 
    repo: "https://github.com/knguyenngo/iot-fridge",
    description: "Real-time temperature monitoring system with email alerts and data visualization for food safety compliance.",
    tech: ["Python", "FastAPI", "React", "MongoDB", "IoT"],
    image: "/project-iot.jpg"
  },
  { 
    name: "Reddit Trends Dashboard", 
    repo: "https://github.com/knguyenngo/reddit-nlp-dashboard",
    description: "NLP-powered analytics dashboard tracking trending topics and sentiment analysis across subreddits.",
    tech: ["Python", "NLP", "Dash", "PostgreSQL"],
    image: "/project-reddit.jpg"
  },
  { 
    name: "Multilingual Pokémon Reference", 
    repo: "https://github.com/knguyenngo/pokemon-multilingual",
    description: "Interactive reference app with translations in multiple languages, powered by PokéAPI.",
    tech: ["React", "TypeScript", "Tailwind", "REST API"],
    image: "/project-pokemon.jpg"
  },
  { 
    name: "Esports Stats Platform", 
    repo: "https://github.com/knguyenngo/esports-stats",
    description: "Comprehensive statistics and analytics platform for competitive gaming with live match tracking.",
    tech: ["Node.js", "Express", "React", "Chart.js"],
    image: "/project-esports.jpg"
  },
];

const greetings = [
  { key: "en", text: "Hey", dir: "ltr" },
  { key: "ar", text: "مرحبا", dir: "rtl" },
  { key: "vi", text: "Xin Chào", dir: "ltr" },
];

export default function App() {
  const [avatarOk, setAvatarOk] = useState(true);
  const [greetIndex, setGreetIndex] = useState(0);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  useEffect(() => {
    document.title = "Khuong Nguyen";
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) return;

    const id = setInterval(() => {
      setGreetIndex((i) => (i + 1) % greetings.length);
    }, 2400);

    return () => clearInterval(id);
  }, []);

  const current = greetings[greetIndex];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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
              <button
                className="themeToggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
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
                  <span className="dash"> </span>
                  I'm <span className="accent">Khương</span>.
                </h1>

                <p className="lead">
                  I'm a Full Stack Developer who turns complex data into clear, actionable stories. I focus on bridging the gap between technical systems and the people who use them to find genuine insight.
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
                  <div className="miniTitle">What I'm into</div>
                  <ul className="miniList">
                    <li>Human-Centered Design: Building tools that feel like a helping hand rather than a puzzle.</li>
                    <li>Meaningful Craft: Doing the quiet, behind-the-scenes work to keep things running smoothly.</li>
                    <li>Finding the Signal: Using a bit of ML and automation to cut through the noise.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="sectionHead">
            <h2>Projects</h2>
            <p>Hover to see details, click to view code.</p>
          </div>

          <div className="projectGrid">
            {projects.map((p) => (
              <a
                key={p.name}
                className="projectCard"
                href={p.repo}
                target="_blank"
                rel="noreferrer"
              >
                <div className="projectImage">
                  <img 
                    src={p.image} 
                    alt={`${p.name} screenshot`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'grid';
                    }}
                  />
                  <div className="projectImageFallback">
                    <span className="projectIcon">🖥️</span>
                  </div>
                </div>
                <div className="projectContent">
                  <h3 className="projectTitle">{p.name}</h3>
                  <p className="projectDesc">{p.description}</p>
                  <div className="techStack">
                    {p.tech.map((t) => (
                      <span key={t} className="techBadge">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="projectHover">
                  <span className="projectCTA">View on GitHub →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Khuong Nguyen</span>
          <span className="footerSep">•</span>
          <span className="muted">Open for Work</span>
        </footer>
      </main>
    </>
  );
}
