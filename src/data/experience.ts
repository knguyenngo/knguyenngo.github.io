export interface ExperienceEntry {
  period: string;
  status: 'RUNNING' | 'SUCCESS' | 'INIT';
  colorVariant?: 'primary' | 'secondary';
  role: string;
  company: string;
  location: string;
  summary: string;
  logo?: string;
  tech?: string[];
  url?: string;
  roleLabel?: string;
}

export const experience: ExperienceEntry[] = [
  {
    period: '[2026]',
    status: 'RUNNING',
    colorVariant: 'primary',
    role: 'FULL STACK SOFTWARE ENGINEER',
    company: 'VMT',
    location: 'REMOTE',
    summary:
    "Medical transportation is life-critical and underserved. Built their entire platform from scratch — web presence, booking, dispatch, encrypted patient data. Now they can reach clients they never could before and actually run the operation.",
    logo: 'self.png',
    tech: ['TypeScript', 'Next.js', 'Supabase', 'PostgreSQL'],
    url: 'https://virginmedtransportation.com/',
  },
  {
    period: '[2026]',
    status: 'RUNNING',
    colorVariant: 'primary',
    role: 'SOFTWARE ENGINEER INTERN',
    company: 'RUNNING NAME LLC',
    location: 'RICHMOND, VA',
    summary:
    "Small business helping other small businesses. Their ops were buried in spreadsheets — built them a full CRM so they could stop managing data and start focusing on the mission.",
    logo: 'running-name.png',
    tech: ['TypeScript', 'Next.js', 'Supabase', 'PostgreSQL'],
    url: 'https://eduruna-crm.vercel.app/',
  },
  {
    period: '[2024–2025]',
    status: 'SUCCESS',
    colorVariant: 'secondary',
    role: 'SOFTWARE ENGINEER INTERN',
    company: 'NIMBUS LABS LLC',
    location: 'JERSEY CITY, NJ',
    summary:
    "AI integration for Point of Sale systems — built the RAG pipeline that made the data actually retrievable and the insights actually useful.",
    logo: 'nimbus-labs.png',
  },
  {
    period: '[2021–2025]',
    status: 'INIT',
    role: 'B.S. COMPUTER SCIENCE',
    company: 'VIRGINIA COMMONWEALTH UNIVERSITY',
    location: 'RICHMOND, VA',
    summary:
    "Graduated Cum Laude. Focused on machine learning, NLP, and data systems.",
    logo: 'vcu.png',
    roleLabel: 'CS @ VCU',
  },
];
