import { useEffect, useState } from "react";
import "./index.css";

const LINKS = {
  github: "https://github.com/knguyenngo",
  linkedin: "https://linkedin.com/in/knguyenngo",
  email: "khuongnguyenngo@gmail.com",
  phone: "804-497-9108",
};

const projects = [
  { 
    name: "IoT Fridge Monitoring System", 
    repo: "https://github.com/knguyenngo/iot-fridge",
    description: "Design of a Raspberry Pi-based telemetry system for 14 community fridges. Ingests 100+ daily data points into AWS Timestream via Lambda.",
    tech: ["Python", "AWS Lambda", "Raspberry Pi"]
  },
  { 
    name: "Reddit Trending Topics Dashboard", 
    repo: "https://github.com/knguyenngo/reddit-nlp-dashboard",
    description: "Python ETL pipeline using Reddit API and Hugging Face NLP to cluster 3,000+ posts into interactive themes.",
    tech: ["Python", "NLP", "Airflow"]
  },
  { 
    name: "Esports Tournament Analytics", 
    repo: "https://github.com/knguyenngo/esports-stats",
    description: "Consolidated Apex Legends data from Liquipedia into a MySQL schema with a React/PHP frontend visualization.",
    tech: ["PHP", "MySQL", "BeautifulSoup"]
  },  
  { 
    name: "Esports Tournament Analytics", 
    repo: "https://github.com/knguyenngo/esports-stats",
    description: "Consolidated Apex Legends data from Liquipedia into a MySQL schema with a React/PHP frontend visualization.",
    tech: ["PHP", "MySQL", "BeautifulSoup"]
  }
];

const greetings = [
  { key: "en", text: "Hello!", dir: "ltr" },
  { key: "ar", text: "مرحبا", dir: "rtl" },
  { key: "vi", text: "Xin Chào", dir: "ltr" },
];

export default function App() {
  const [greetIndex, setGreetIndex] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const id = setInterval(() => {
      setGreetIndex((i) => (i + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const current = greetings[greetIndex];

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
        <header className="brand">
          <div className="logo">KN</div>
          <nav className="nav">
            <a href="#projects">Showcase</a>
            <button className="themeToggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </nav>
        </header>

        <section className="heroCard">
          <div className="heroGrid">
            <div className="heroLeft">
              <div className="profileFrame">
                <img className="avatar" src="/headshot.jpg" alt="Khuong Nguyen" />
                <div className={`heroGreeting lang-${current.key}`} dir={current.dir}>
                  {current.text}
                </div>
              </div>
              <div className="statusBadge">Online</div>
            </div>

            <div className="heroRight">
              <div className="headerTop">
                <h1 className="title">Khuong Nguyen</h1>
                <div className="levelBadge">
                  <span>Level</span>
                  <span className="levelCircle">99</span>
                </div>
              </div>
              
              <div className="subHeader">
                Software Developer <br/>
              </div>

              <div className="bioBox">
                Currently developing some full stack apps while keeping myself fresh. Mainly on ML and NLP type of topics.
              </div>

            </div>

            <div className="heroSidebar">
              <div className="sidebarBox contactOnly">
                <div className="sidebarTitle">Contact</div>
                <div className="iconLinksRow centered">
                  <a href={LINKS.github} target="_blank" rel="noreferrer" className="iconLink" title="GitHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                  <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="iconLink" title="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href={`mailto:${LINKS.email}`} className="iconLink" title="Email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="sectionHead">
            <h2>Featured Showcase</h2>
          </div>
          <div className="projectGrid">
            {projects.map((p, idx) => (
              <a key={`${p.name}-${idx}`} className="projectCard" href={p.repo} target="_blank" rel="noreferrer">
                <div className="projectImage">
                  <div className="imgPlaceholder">Showcase Image</div>
                </div>
                <div className="projectContent">
                  <h3 className="projectTitle">{p.name}</h3>
                  <p className="projectDesc">{p.description}</p>
                  <div className="techStack">
                    {p.tech.map((t) => <span key={t} className="techBadge">{t}</span>)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Khuong Nguyen</span>
        </footer>
      </main>
    </>
  );
}
