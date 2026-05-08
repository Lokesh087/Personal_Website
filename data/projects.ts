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
    id: "1",
    title: "AI Chat Application",
    description: "A real-time chat application powered by AI with natural language processing capabilities. Features include user authentication, message history, and AI-powered responses.",
    technologies: ["React", "TypeScript", "Node.js", "WebSocket", "TailwindCSS"],
    link: "https://example.com/ai-chat",
    github: "https://github.com/Lokesh087/ai-chat-app",
    image: "/projects/ai-chat.png"
  },
  {
    id: "2",
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing large datasets with real-time updates. Built with modern charting libraries and responsive design.",
    technologies: ["React", "D3.js", "Python", "Flask", "PostgreSQL"],
    link: "https://example.com/dashboard",
    github: "https://github.com/Lokesh087/data-viz",
    image: "/projects/dashboard.png"
  },
  {
    id: "3",
    title: "Machine Learning Model API",
    description: "RESTful API for serving machine learning models with high performance. Includes model versioning, monitoring, and batch processing capabilities.",
    technologies: ["Python", "FastAPI", "TensorFlow", "Docker", "AWS"],
    link: "https://example.com/ml-api",
    github: "https://github.com/Lokesh087/ml-api",
    image: "/projects/ml-api.png"
  },
  {
    id: "4",
    title: "Mobile App for Task Management",
    description: "Cross-platform mobile application for managing tasks and projects. Features include offline support, real-time sync, and intuitive UI.",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    link: "https://example.com/task-app",
    github: "https://github.com/Lokesh087/task-app",
    image: "/projects/task-app.png"
  }
]
