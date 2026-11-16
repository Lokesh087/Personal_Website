export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  link?: string
  image?: string
  github?: string
}

export const projects: Project[] = [
  {
    id: "aivex",
    title: "AIVEX — Personal AI Operating System",
    description: "A modular personal AI operating system concept designed to turn natural-language intent into useful actions and workflows.",
    technologies: ["Python", "FastAPI", "OpenCV", "SQLite", "Multi-agent AI"],
    github: "https://github.com/Lokesh087",
  },
  {
    id: "smart-recruiter",
    title: "Smart AI Recruiter",
    description: "An AI-assisted recruitment workflow that analyses resumes and assessment results, categorises applicants, and helps recruiters review candidates.",
    technologies: ["Python", "Streamlit", "SQLite", "NLP"],
    link: "https://smartrecruitment-hbi5ufyhh2buaxdluuwjze.streamlit.app/",
    github: "https://github.com/Lokesh087/smart_recruitment",
  },
  {
    id: "internflow",
    title: "InternFlow",
    description: "An internship workflow and management platform built around role-based access and a structured application experience.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com/Lokesh087/InternFlow",
  },
  {
    id: "smartdo",
    title: "SmartDo — To-do List Manager",
    description: "A task-management app for organising work, tracking priorities, and keeping daily tasks in one place.",
    technologies: ["React", "JavaScript", "CSS"],
    link: "https://focusfusion.vercel.app",
    github: "https://github.com/Lokesh087/TO-DO-LIST-MANAGER",
  },
  {
    id: "price-predictor",
    title: "Price Predictor",
    description: "A machine-learning project exploring data-driven price estimation and prediction workflows.",
    technologies: ["Python", "Machine Learning"],
    github: "https://github.com/Lokesh087",
  },
  {
    id: "pyvcs",
    title: "pyvcs",
    description: "A Python-based version-control learning project exploring repository and versioning concepts.",
    technologies: ["Python", "Git"],
    github: "https://github.com/Lokesh087",
  },
]
