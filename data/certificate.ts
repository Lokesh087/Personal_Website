export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  image?: string
  pdfUrl?: string
  skills?: string[]
  link?: string
}

export const certificates: Certificate[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2024",
    image: "/certificates/fullstack.png",
    pdfUrl: "/certificates/fullstack.pdf",
    skills: ["React", "Node.js", "MongoDB", "REST APIs"],
    link: "https://udemy.com/certificate/fullstack"
  },
  {
    id: "2",
    title: "Machine Learning Specialization",
    issuer: "Coursera",
    date: "2024",
    image: "/certificates/ml.png",
    pdfUrl: "/certificates/ml.pdf",
    skills: ["Python", "TensorFlow", "Deep Learning", "Data Analysis"],
    link: "https://coursera.org/certificate/ml"
  },
  {
    id: "3",
    title: "Advanced JavaScript",
    issuer: "Frontend Masters",
    date: "2023",
    image: "/certificates/javascript.png",
    pdfUrl: "/certificates/javascript.pdf",
    skills: ["JavaScript", "TypeScript", "Async Programming"],
    link: "https://frontendmasters.com/certificate/javascript"
  },
  {
    id: "4",
    title: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    image: "/certificates/aws.png",
    pdfUrl: "/certificates/aws.pdf",
    skills: ["AWS", "Cloud Architecture", "DevOps"],
    link: "https://aws.amazon.com/certificate/solutions-architect"
  }
]
