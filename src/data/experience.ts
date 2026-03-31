export interface ExperienceEntry {
  period: string;
  status: 'RUNNING' | 'SUCCESS' | 'INIT';
  colorVariant?: 'primary' | 'secondary';
  role: string;
  company: string;
  location: string;
  summary: string;
  logo?: string;
}

export const experience: ExperienceEntry[] = [
  {
    period: '[2026]',
    status: 'RUNNING',
    colorVariant: 'primary',
    role: 'SOFTWARE CONSULTANT',
    company: '??? LLC',
    location: 'REMOTE',
    summary:
    "I'm consulting independently at the intersection of strategy and execution — not just advising, but building. I'm currently developing a full-stack platform for a medical transportation company, giving them a web presence and the private-sector client access they never had. My code ships and their business grows.",
    logo: 'self.png',
  },
  {
    period: '[2026]',
    status: 'RUNNING',
    colorVariant: 'primary',
    role: 'SOFTWARE ENGINEER INTERN',
    company: 'RUNNING NAME LLC',
    location: 'RICHMOND, VA',
    summary:
    "This is where I got my first real taste of owning something end-to-end. I came in and ended up rebuilding their entire CRM and client intake system — moved the company off spreadsheets into a proper Next.js and Supabase platform with automated document workflows. The biggest thing I took away was learning how to translate messy, real-world business problems into clean technical solutions and actually ship them in production.",
    logo: 'running-name.png',
  },
  {
    period: '[2024–2025]',
    status: 'SUCCESS',
    colorVariant: 'secondary',
    role: 'SOFTWARE ENGINEER INTERN',
    company: 'NIMBUS LABS LLC',
    location: 'JERSEY CITY, NJ',
    summary:
    "My first industry role — I worked on a RAG AI chatbot with a small team and got thrown into the deep end pretty quickly. I spent most of my time in the data layer tracking down a schema issue that was causing duplicate records, and built Streamlit tooling so the team could monitor the chatbot without pulling engineers in every time. I also got to design our deployment pipeline here, which is where I first got real hands-on time with AWS infrastructure.",
    logo: 'nimbus-labs.png',
  },
  {
    period: '[2021–2025]',
    status: 'INIT',
    role: 'B.S. COMPUTER SCIENCE',
    company: 'VIRGINIA COMMONWEALTH UNIVERSITY',
    location: 'RICHMOND, VA',
    summary:
    "I studied CS at VCU with a focus on machine learning, NLP, and data systems — the areas I knew I wanted to build in. Outside coursework I was part of the Linux User Group, which honestly shaped how I think about computing more than any class did. VCU is where I went from someone who could code to someone who understood why things work the way they do — graduated Cum Laude.",
    logo: 'vcu.png',
  },
];
