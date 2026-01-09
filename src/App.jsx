import { useEffect, useState } from "react";
import "./index.css";
import backImg from "./assets/bg.gif";
import projectImg_1 from "../public/iot.png";
import projectImg_2 from "../public/reddit.png";
import projectImg_3 from "../public/pokemon.png";
import projectImg_4 from "../public/ALGS.png";

const LINKS = {
  github: "https://github.com/knguyenngo",
  linkedin: "https://linkedin.com/in/knguyenngo",
  email: "khuongnguyenngo@gmail.com",
  phone: "804-497-9108",
};

const projects = [
  { 
    name: "IoT Fridge Monitoring System", 
    repo: "https://github.com/knguyenngo/rvacf-admin-dashboard",
    description: "Raspberry Pi-based telemetry system monitoring 14 community fridges across Richmond. Processes 100+ daily sensor readings through AWS Lambda and Timestream for real-time insights.",
    tech: ["Python", "AWS", "Raspberry Pi"],
    image: projectImg_1
  },
  { 
    name: "Reddit Trending Topics Dashboard", 
    repo: "https://github.com/knguyenngo/reddit-trending-topics",
    description: "Automated ETL pipeline leveraging Reddit API and Hugging Face transformers to analyze and cluster 3,000+ posts into trending themes with interactive visualizations.",
    tech: ["Python", "NLP", "Airflow"],
    image: projectImg_2
  },
  { 
    name: "Bilingual Pokédex for Generation 3", 
    repo: "https://github.com/knguyenngo/gen3-bilingual-pokedex",
    description: "Interactive dual-language Pokédex featuring all Generation 3 Pokémon with comprehensive stats, abilities, and type matchups in English and Vietnamese.",
    tech: ["React", "TypeScript", "REST API"],
    image: projectImg_3
  },  
  { 
    name: "Esports Tournament Analytics", 
    repo: "https://github.com/knguyenngo/esports-stats",
    description: "Full-stack analytics platform aggregating competitive Apex Legends tournament data. Features MySQL backend with React/PHP frontend for performance tracking and statistical analysis.",
    tech: ["PHP", "MySQL", "React"],
    image: projectImg_4
  }
];

const greetings = [
  { key: "en", text: "Hello", dir: "ltr" },
  { key: "ar", text: "مرحبا", dir: "rtl" },
  { key: "vi", text: "Xin Chào", dir: "ltr" },
];

export default function App() {
  const [greetIndex, setGreetIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(backImg);
  const [githubActivity, setGithubActivity] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      setGreetIndex((i) => (i + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/users/knguyenngo/events/public')
      .then(res => res.json())
      .then(data => {
        const recent = data.slice(0, 5).map(event => ({
          type: event.type.replace('Event', ''),
          repo: event.repo.name.split('/')[1],
          time: new Date(event.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }));
        setGithubActivity(recent);
      })
      .catch(err => console.error('GitHub API error:', err));
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
          </nav>
        </header>
        <section className="heroCard">
          <div className="heroGrid">
            <div className="heroLeft">
              <div className="profileFrame">
                <img className="avatar" src="/headshot.jpg" alt="Khuong Nguyen" />
              </div>
              <div className="statusBadge">Somewhere.</div>
            </div>
            <div className="heroRight">
              <div className="headerTop">
                <h1 className="title">Khương Nguyễn</h1>
              </div>
             <div className="flagsRow">
               <span className="flag">🇻🇳</span>
               <span className="flag">🇵🇸</span>
             </div>
              <div className="subHeader">
                Full Stack Software Developer <br/>
              </div>
              <div className="bioBox">
                I make stuff.
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
          <div className="projectsWrapper">
            <div className="projectsContainer">
              <div className="sectionHead">
                <h2>Featured Showcase</h2>
              </div>
              <div className="projectGrid">
                {projects.map((p, idx) => (
                  <a key={`${p.name}-${idx}`} className="projectCard" href={p.repo} target="_blank" rel="noreferrer">
                    <div className="projectImage">
                      <img className="imgPlaceholder" src={p.image} alt={p.name}/>
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
            </div>
            <div className="projectsSidebar">
              <div className="sidebarBox activityBox">
                <div className="sidebarTitle">Recent Activity</div>
                <div className="activityList">
                  {githubActivity.length > 0 ? (
                    githubActivity.map((activity, idx) => (
                      <div key={idx} className="activityItem">
                        <div className="activityType">{activity.type}</div>
                        <div className="activityRepo">{activity.repo}</div>
                        <div className="activityTime">{activity.time}</div>
                      </div>
                    ))
                  ) : (
                      <div className="activityLoading">Loading...</div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer">
          <span>© {new Date().getFullYear()} Khuong Nguyen</span>
        </footer>
      </main>
    </>
  );
}
