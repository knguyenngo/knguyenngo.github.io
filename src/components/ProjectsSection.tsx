// src/components/ProjectsSection.tsx
import ProjectCard from './ProjectCard';
import ActivityFeed from './ActivityFeed';
import { projects } from '../data/projects';

export default function ProjectsSection() {
  return (
    <section className="section" id="projects">
      <div className="projectsWrapper">
        {/* Projects */}
        <div className="projectsContainer">
          <div className="sectionHead">
            <h2>Featured Showcase</h2>
          </div>
          <div className="projectGrid">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="projectsSidebar">
          <ActivityFeed />
        </div>
      </div>
    </section>
  );
}
