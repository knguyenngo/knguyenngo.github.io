// src/components/ProjectCard.tsx
interface Project {
  name: string;
  repo: string;
  description: string;
  tech: string[];
  image: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a href={project.repo} target="_blank" rel="noreferrer" className="projectCard">
      <div className="projectImage">
        <img src={project.image} alt={project.name} className="imgPlaceholder" />
      </div>
      <div className="projectContent">
        <h3 className="projectTitle">{project.name}</h3>
        <p className="projectDesc">{project.description}</p>
        <div className="techStack">
          {project.tech.map((tech) => (
            <span key={tech} className="techBadge">{tech}</span>
          ))}
        </div>
      </div>
    </a>
  );
}
