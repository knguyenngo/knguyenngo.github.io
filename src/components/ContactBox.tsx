const LINKS = {
  github: "https://github.com/knguyenngo",
  linkedin: "https://linkedin.com/in/knguyenngo",
  email: "knguyenngo@proton.me",
};

export default function ContactBox() {
  return (
    <div className="flex flex-wrap gap-3 font-mono text-xs">
      <a
        href={LINKS.github}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 border border-outline-variant px-3 py-2 hover:bg-surface-container-highest transition-colors duration-150 group"
      >
        <span className="text-secondary">./GITHUB</span>
        <span className="text-on-surface-variant group-hover:text-primary transition-colors duration-150">
          knguyenngo
        </span>
      </a>
      <a
        href={LINKS.linkedin}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 border border-outline-variant px-3 py-2 hover:bg-surface-container-highest transition-colors duration-150 group"
      >
        <span className="text-secondary">./LINKEDIN</span>
        <span className="text-on-surface-variant group-hover:text-primary transition-colors duration-150">
          knguyenngo
        </span>
      </a>
      <a
        href={`mailto:${LINKS.email}`}
        className="flex items-center gap-2 border border-outline-variant px-3 py-2 hover:bg-surface-container-highest transition-colors duration-150 group"
      >
        <span className="text-secondary">./MAIL</span>
        <span className="text-on-surface-variant group-hover:text-primary transition-colors duration-150">
          {LINKS.email}
        </span>
      </a>
    </div>
  );
}
