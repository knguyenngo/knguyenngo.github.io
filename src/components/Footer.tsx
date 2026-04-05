export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t-4 border-surface-container flex flex-col items-center py-8 mt-4 w-full">
      <div className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-3">
        SYS_REF: BUNNY_TERMINAL_{year}
      </div>
      <nav className="flex gap-6">
        <a
          href="https://github.com/knguyenngo"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] uppercase tracking-widest text-outline hover:text-secondary transition-colors duration-150"
        >
          GITHUB
        </a>
        <a
          href="https://linkedin.com/in/knguyenngo"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] uppercase tracking-widest text-primary underline"
        >
          LINKEDIN
        </a>
        <a
          href="mailto:knguyenngo@proton.me"
          className="font-mono text-[10px] uppercase tracking-widest text-outline hover:text-secondary transition-colors duration-150"
        >
          MAIL
        </a>
      </nav>
      <div className="mt-5 text-[10px] font-mono text-outline">
        RENDERED_ON: GITHUB_PAGES | STATUS: SECURE
      </div>
    </footer>
  );
}
