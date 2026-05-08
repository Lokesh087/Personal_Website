export interface Skill {
  category: string
  items: string[]
  icon?: string
}

export const skills: Skill[] = [
  {
    category: "Programming Languages",
    items: ["Python", "JavaScript", "TypeScript", "Java", "C++"],
    icon: "Code"
  },
  {
    category: "Frontend Development",
    items: ["React", "Next.js", "TailwindCSS", "HTML5", "CSS3", "Redux"],
    icon: "Palette"
  },
  {
    category: "Backend Development",
    items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "REST APIs"],
    icon: "Server"
  },
  {
    category: "Data Science & ML",
    items: ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Data Analysis", "Pandas"],
    icon: "BarChart3"
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "Docker", "AWS", "Firebase", "VS Code", "Linux"],
    icon: "Wrench"
  },
  {
    category: "Soft Skills",
    items: ["Problem Solving", "Team Collaboration", "Communication", "Project Management", "Mentoring"],
    icon: "Users"
  }
]
