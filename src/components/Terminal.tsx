import { useState, useRef, useEffect, useCallback } from 'react';
import { projects } from '../data/projects';
import { experience } from '../data/experience';

interface Line {
  type: 'prompt' | 'output' | 'error' | 'blank';
  text: string;
}

const NEOFETCH_ART = [
  '                 /#\\',
  '                /###\\',
  '               /#####\\',
  '              /#######\\',
  '             _ "=######\\',
  '            /##=,_\\#####\\',
  '           /#############\\',
  '          /###############\\',
  '         /#################\\',
  '        /###################\\',
  '       /########*"""*########\\',
  '      /#######/       \\#######\\',
  '     /########         ########\\',
  '    /#########         ######m=,_',
  '   /##########         ##########\\',
  '  /######***             ***######\\',
  ' /###**                       **###\\',
  '/**                               **\\',
];

const NEOFETCH_INFO = [
  'knguyenngo@bunny-terminal',
  '─────────────────────────',
  'OS: I_USE_ARCH_BTW',
  'HOST: knguyenngo.github.io',
  'SHELL: /bin/fish',
  'UPTIME: since 2001',
  'LANG: TypeScript · Python · SQL · Go',
  'FOCUS: Data Engineering · AI Integration',
  'STATUS: ALWAYS BUILDING!',
  '',
  '███ ███ ███ ███ ███ ███ ███',
];

function runCommand(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();

  if (cmd === '') return [];

  if (cmd === 'help') {
    return [
      { type: 'output', text: '' },
      { type: 'output', text: '  AVAILABLE COMMANDS' },
      { type: 'output', text: '  ─────────────────────────────────────' },
      { type: 'output', text: '  whoami          — about the developer' },
      { type: 'output', text: '  ls              — list site sections' },
      { type: 'output', text: '  ls projects/    — list all projects' },
      { type: 'output', text: '  cat experience  — work history' },
      { type: 'output', text: '  skills          — tech stack' },
      { type: 'output', text: '  contact         — contact info' },
      { type: 'output', text: '  neofetch        — system profile' },
      { type: 'output', text: '  uname -a        — kernel info' },
      { type: 'output', text: '  sudo rm -rf /   — try it' },
      { type: 'output', text: '  clear           — clear terminal' },
      { type: 'output', text: '  exit / q        — close terminal' },
      { type: 'output', text: '' },
    ];
  }

  if (cmd === 'whoami') {
    return [
      { type: 'output', text: '' },
      { type: 'output', text: '  Khương Nguyễn (knguyenngo)' },
      { type: 'output', text: '  Full Stack Software Developer' },
      { type: 'output', text: '  Interests: NLP · ML · Data Systems' },
      { type: 'output', text: '  Location: Richmond, VA' },
      { type: 'output', text: '  Education: B.S. CS — VCU, Cum Laude' },
      { type: 'output', text: '  Status: [ RUNNING ]' },
      { type: 'output', text: '' },
    ];
  }

  if (cmd === 'ls') {
    return [
      { type: 'output', text: '' },
      { type: 'output', text: '  drwxr-xr-x  ./HERO_CARD' },
      { type: 'output', text: '  drwxr-xr-x  ./BOOT_LOG' },
      { type: 'output', text: '  drwxr-xr-x  ./ACTIVE_PROCESSES' },
      { type: 'output', text: '  drwxr-xr-x  ./ACTIVITY_FEED' },
      { type: 'output', text: '  drwxr-xr-x  ./FOOTER' },
      { type: 'output', text: '' },
    ];
  }

  if (cmd === 'ls projects/' || cmd === 'ls projects') {
    return [
      { type: 'output', text: '' },
      ...projects.map((p, i) => ({
        type: 'output' as const,
        text: `  [${String(i + 1).padStart(2, '0')}]  ${p.name.toUpperCase()}   [${p.tech.join(' · ')}]`,
      })),
      { type: 'output', text: '' },
    ];
  }

  if (cmd === 'cat experience' || cmd === 'cat exp') {
    return [
      { type: 'output', text: '' },
      ...experience.flatMap(e => [
        { type: 'output' as const, text: `  [ ${e.status} ]  ${e.role} @ ${e.company}  ${e.period}` },
        { type: 'output' as const, text: `  ${e.location}` },
        { type: 'output' as const, text: '' },
      ]),
    ];
  }

  if (cmd === 'skills') {
    return [
      { type: 'output', text: '' },
      { type: 'output', text: '  LANGUAGES    TypeScript · Python · SQL · PHP · Go' },
      { type: 'output', text: '  FRONTEND     React · Next.js · Tailwind CSS · Vite' },
      { type: 'output', text: '  BACKEND      Node.js · FastAPI · Supabase · PostgreSQL' },
      { type: 'output', text: '  ML / NLP     Hugging Face · LangChain · RAG · Airflow' },
      { type: 'output', text: '  INFRA        AWS · Docker · GitHub Actions · gh-pages' },
      { type: 'output', text: '' },
    ];
  }

  if (cmd === 'contact') {
    return [
      { type: 'output', text: '' },
      { type: 'output', text: '  GITHUB    github.com/knguyenngo' },
      { type: 'output', text: '  LINKEDIN  linkedin.com/in/knguyenngo' },
      { type: 'output', text: '  MAIL      khuongnguyenngo@gmail.com' },
      { type: 'output', text: '' },
    ];
  }

  if (cmd === 'neofetch') {
    const lines: Line[] = [{ type: 'output', text: '' }];
    const maxLen = Math.max(NEOFETCH_ART.length, NEOFETCH_INFO.length);
    for (let i = 0; i < maxLen; i++) {
      const art = NEOFETCH_ART[i] ?? ''.padEnd(40);
      const info = NEOFETCH_INFO[i] ?? '';
      lines.push({ type: 'output', text: `${art.padEnd(40)}  ${info}` });
    }
    lines.push({ type: 'output', text: '' });
    return lines;
  }

  if (cmd === 'uname -a') {
    return [
      { type: 'output', text: '' },
      { type: 'output', text: '  BUNNY_TERMINAL 1.0.0 #1 SMP React19+Vite7 x86_64 GNU/TypeScript' },
      { type: 'output', text: '' },
    ];
  }

  if (cmd === 'sudo rm -rf /' || cmd === 'sudo rm -rf /*') {
    return [
      { type: 'output', text: '' },
      { type: 'output', text: '  [sudo] password for knguyenngo: ' },
      { type: 'output', text: '  rm: cannot remove \'/\': Permission denied' },
      { type: 'output', text: '  rm: it\'s a portfolio, bro' },
      { type: 'output', text: '' },
    ];
  }

  if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
    return [
      { type: 'output', text: '' },
      { type: 'output', text: '  sudo: this incident will be reported.' },
      { type: 'output', text: '' },
    ];
  }

  if (cmd === 'pwd') {
    return [{ type: 'output', text: '  /home/kn/portfolio' }];
  }

  if (cmd === 'date') {
    return [{ type: 'output', text: `  ${new Date().toString()}` }];
  }

  if (cmd === 'uptime') {
    return [{ type: 'output', text: '  up 4 years, building nonstop' }];
  }

  if (cmd === 'man' || cmd.startsWith('man ')) {
    return [
      { type: 'output', text: '' },
      { type: 'output', text: '  No manual entry. Try: help' },
      { type: 'output', text: '' },
    ];
  }

  return [
    { type: 'error', text: `  bash: ${raw.trim()}: command not found. Try: help` },
  ];
}

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: '  BUNNY_TERMINAL v1.0.0 — knguyenngo@portfolio' },
    { type: 'output', text: '  Type "help" for available commands. Press ESC to exit.' },
    { type: 'output', text: '' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const submit = useCallback(() => {
    const cmd = input.trim();
    const newLines: Line[] = [
      ...lines,
      { type: 'prompt', text: cmd },
    ];

    if (cmd === 'clear') {
      setLines([]);
      setInput('');
      setHistIdx(-1);
      return;
    }
    if (cmd === 'exit' || cmd === 'q') {
      onClose();
      return;
    }

    const output = runCommand(cmd);
    setLines([...newLines, ...output]);
    if (cmd) {
      setHistory(h => [cmd, ...h.filter(x => x !== cmd)].slice(0, 50));
    }
    setInput('');
    setHistIdx(-1);
  }, [input, lines, onClose]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? '' : history[idx]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-surface/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl mx-4 border-2 border-outline bg-surface-container flex flex-col"
        style={{ maxHeight: '70vh', minHeight: '420px' }}>

        {/* Title bar */}
        <div className="bg-surface-bright border-b-2 border-outline flex items-center justify-between px-3 py-1 shrink-0">
          <span className="font-mono text-xs font-bold text-primary tracking-widest terminal-glow">
            BUNNY_TERMINAL — knguyenngo@portfolio:~
          </span>
          <button
            onClick={onClose}
            className="font-mono text-[10px] text-on-surface-variant hover:text-error px-1 transition-colors"
            aria-label="Close terminal"
          >
            [ESC]
          </button>
        </div>

        {/* Output */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className={
              line.type === 'prompt'
                ? 'flex gap-2 text-secondary'
                : line.type === 'error'
                  ? 'text-error'
                  : 'text-on-surface-variant'
            }>
              {line.type === 'prompt' && (
                <span className="text-primary shrink-0">kn@portfolio:~$</span>
              )}
              <span style={{ whiteSpace: 'pre' }}>{line.text}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="border-t border-outline/50 px-4 py-2 flex items-center gap-2 font-mono text-xs shrink-0 bg-surface-container-lowest">
          <span className="text-primary shrink-0">kn@portfolio:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none text-on-surface caret-primary"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
          <span className="text-primary animate-pulse">█</span>
        </div>
      </div>
    </div>
  );
}
