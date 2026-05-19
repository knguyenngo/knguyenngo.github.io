interface Project {
  name: string;
  repo: string;
  description: string;
  tech: string[];
  image: string;
  imagePosition?: string;
}

// Stable class sets — full strings required for Tailwind detection
const PRIMARY_VARIANT = {
  title: 'text-primary',
  badge: 'bg-primary-container border-primary text-primary',
  accent: 'border-l-4 border-primary',
  hover: 'group-hover:border-primary',
} as const;

const SECONDARY_VARIANT = {
  title: 'text-secondary',
  badge: 'bg-secondary-container border-secondary text-secondary',
  accent: 'border-l-4 border-secondary',
  hover: 'group-hover:border-secondary',
} as const;

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const id = String(index + 1).padStart(2, '0');
  const v = index % 2 === 0 ? PRIMARY_VARIANT : SECONDARY_VARIANT;

  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noreferrer"
      className="bg-surface-container-highest border border-outline-variant p-4 font-mono group hover:border-outline transition-colors duration-150 block"
    >
      {/* Project image */}
      <div className="border-2 border-outline-variant mb-4 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-40 object-cover block grayscale-[40%] brightness-75 group-hover:brightness-90 transition-all duration-150"
          style={{ objectPosition: project.imagePosition ?? 'center' }}
        />
      </div>

      {/* Header row */}
      <div className="flex justify-between items-start gap-3 mb-2">
        <h3 className={`font-bold text-sm ${v.title}`}>
          PROJ_{id}: {project.name.toUpperCase()}
        </h3>
        <span className={`${v.badge} border text-[10px] px-2 py-0.5 shrink-0 uppercase`}>
          STABLE
        </span>
      </div>
      <p className="text-xs text-on-surface mb-3 leading-relaxed text-center">
        {project.description}
      </p>

      {/* Tech stack block — styled as terminal code block */}
      <div className={`bg-surface-container-lowest p-3 ${v.accent} text-[11px] text-on-surface-variant`}>
        <div className="text-secondary-dim mb-2 text-[10px]">$ cat tech_stack.json</div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="bg-surface-container-highest border border-outline px-2 py-0.5 text-on-surface font-bold text-[10px] uppercase tracking-tight"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
