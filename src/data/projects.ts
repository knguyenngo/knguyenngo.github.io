// src/data/projects.ts
export const projects = [
  { 
    name: "IoT Fridge Monitoring System", 
    repo: "https://github.com/knguyenngo/rvacf-admin-dashboard",
    description: "Raspberry Pi-based telemetry system monitoring 14 community fridges across Richmond. Processes 100+ daily sensor readings through AWS Lambda and Timestream for real-time insights.",
    tech: ["Python", "AWS", "Raspberry Pi"],
    image: "iot.png"
  },
  { 
    name: "Reddit Trending Topics Dashboard", 
    repo: "https://github.com/knguyenngo/reddit-trending-topics",
    description: "Automated ETL pipeline leveraging Reddit API and Hugging Face transformers to analyze and cluster 3,000+ posts into trending themes with interactive visualizations.",
    tech: ["Python", "NLP", "Airflow"],
    image: "reddit.png"
  },
  { 
    name: "Bilingual Pokédex for Generation 3", 
    repo: "https://github.com/knguyenngo/gen3-bilingual-pokedex",
    description: "Interactive dual-language Pokédex featuring all Generation 3 Pokémon with comprehensive stats, abilities, and type matchups in English and Japanese.",
    tech: ["React", "TypeScript", "REST API"],
    image: "pokemon.png"
  },  
  { 
    name: "Esports Tournament Analytics", 
    repo: "https://github.com/knguyenngo/esports-stats",
    description: "Full-stack analytics platform aggregating competitive Apex Legends tournament data. Features MySQL backend with React/PHP frontend for performance tracking and statistical analysis.",
    tech: ["PHP", "MySQL", "React"],
    image: "ALGS.png"
  }
];
