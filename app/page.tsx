"use client"

import { useState } from "react"
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Code2, GraduationCap, BriefcaseBusiness, Trophy, Sparkles, ExternalLink } from "lucide-react"

const projects = [
  { name: "AIVEX — Personal AI Operating System", description: "A personal AI operating system concept focused on turning natural-language intent into useful actions through a modular assistant and automation workflow.", stack: ["Python", "FastAPI", "OpenCV", "SQLite", "Multi-agent AI"], href: "https://github.com/Lokesh087", type: "AI / Automation" },
  { name: "Smart AI Recruiter", description: "An AI-assisted recruitment workflow that analyses candidate resumes and assessment results, categorises applicants, and helps recruiters review candidates.", stack: ["Python", "Streamlit", "SQLite", "NLP"], href: "https://smartrecruitment-hbi5ufyhh2buaxdluuwjze.streamlit.app/", type: "AI / Web" },
  { name: "InternFlow", description: "An internship workflow and management platform, built around role-based access and a structured application experience.", stack: ["Next.js", "TypeScript", "PostgreSQL"], href: "https://github.com/Lokesh087/InternFlow", type: "Full-stack" },
  { name: "SmartDo — To-do List Manager", description: "A clean task-management app for organising work, tracking priorities, and keeping daily tasks in one place.", stack: ["React", "JavaScript", "CSS"], href: "https://focusfusion.vercel.app", type: "Web app" },
  { name: "Price Predictor", description: "A machine-learning project exploring data-driven price estimation and prediction workflows.", stack: ["Python", "Machine Learning"], href: "https://github.com/Lokesh087", type: "Machine learning" },
  { name: "pyvcs", description: "A Python-based version-control-system learning project exploring core repository and versioning concepts.", stack: ["Python", "Git"], href: "https://github.com/Lokesh087", type: "Developer tool" },
]

const skills = [
  { group: "Programming", items: ["Python", "Java", "C", "JavaScript", "HTML", "CSS"] },
  { group: "AI & development", items: ["Machine Learning", "LLMs", "Prompt Engineering", "FastAPI", "Streamlit", "Next.js"] },
  { group: "Tools & platforms", items: ["Git & GitHub", "Docker", "PostgreSQL", "SQLite", "Vercel", "VS Code"] },
]

const experiences = [
  { role: "Infosys Internship", detail: "Completed an internship learning experience through Infosys Springboard.", meta: "Internship" },
  { role: "Infotact Solutions", detail: "Python development internship and training experience.", meta: "Internship & Training" },
  { role: "BUIMB RESEARCH LLP", detail: "Currently working as a Software Development Engineer (SDE).", meta: "Current role" },
  { role: "Springboard Internship 7.0", detail: "Selected for the internship programme.", meta: "Selection" },
  { role: "PM Research Internship", detail: "Selected for a research internship opportunity.", meta: "Selection" },
]

const nav = ["About", "Skills", "Experience", "Projects", "Certificates", "Contact"]

export default function PageContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const filters = ["All", "AI / Automation", "AI / Web", "Full-stack", "Web app", "Machine learning", "Developer tool"]
  const visibleProjects = activeFilter === "All" ? projects : projects.filter((project) => project.type === activeFilter)

  return (
    <main className="min-h-screen bg-[#f7faf7] text-[#17251e] selection:bg-emerald-200">
      <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#f7faf7]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="Lokesh Pargain home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-900 text-sm font-semibold text-white">LP</span>
            <span className="font-semibold tracking-tight">Lokesh Pargain<span className="text-emerald-700">.</span></span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-[#5c6b61] transition hover:text-emerald-800">{item}</a>)}
            <a href="mailto:pargainlokesh@gmail.com" className="rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800">Let's talk</a>
          </nav>
          <div className="relative md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} className="rounded-xl border border-emerald-900/15 p-2.5">
              {menuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
            {menuOpen && <div className="absolute right-0 top-14 w-52 rounded-2xl border border-emerald-900/10 bg-white p-2 shadow-xl">
              {nav.map((item) => <a key={item} onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`} className="block rounded-xl px-4 py-3 text-sm hover:bg-emerald-50">{item}</a>)}
            </div>}
          </div>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-28 -top-28 h-[28rem] w-[28rem] rounded-full bg-emerald-200/40 blur-3xl"/>
        <div className="pointer-events-none absolute -left-36 bottom-0 h-80 w-80 rounded-full bg-lime-100/70 blur-3xl"/>
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 sm:px-8 md:grid-cols-[1.25fr_.75fr] md:py-32">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/75 px-4 py-2 text-xs font-medium tracking-wide text-emerald-900">
              <span className="h-2 w-2 rounded-full bg-emerald-500"/> OPEN TO INTERNSHIP & COLLABORATION
            </div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[.22em] text-emerald-800">Hello, I'm</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-6xl lg:text-7xl">Lokesh <span className="text-emerald-800">Pargain.</span></h1>
            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-[#53645a] sm:text-2xl">I build thoughtful software and explore practical ways to use <span className="font-medium text-emerald-900">AI to solve real problems.</span></p>
            <p className="mt-5 max-w-xl leading-7 text-[#718077]">Computer Science student specialising in AI & Machine Learning, interested in full-stack development, intelligent systems, and developer tools.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-emerald-950/10 transition hover:-translate-y-0.5 hover:bg-emerald-800">Explore my work <ArrowUpRight size={17}/></a>
              <a href="mailto:pargainlokesh@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/70 px-6 py-3.5 text-sm font-medium text-emerald-950 transition hover:border-emerald-800">Get in touch <ArrowDownRight size={17}/></a>
              <a href="/resume.pdf" download className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-6 py-3.5 text-sm font-medium text-emerald-950 transition hover:border-emerald-800">Download resume <ArrowDownRight size={17}/></a>
            </div>
            <div className="mt-10 flex items-center gap-5 text-[#738178]">
              <a aria-label="GitHub" href="https://github.com/Lokesh087" target="_blank" rel="noreferrer" className="transition hover:text-emerald-800"><Github size={20}/></a>
              <a aria-label="LinkedIn" href="https://www.linkedin.com/in/lokesh-pargain-4319b1283/" target="_blank" rel="noreferrer" className="transition hover:text-emerald-800"><Linkedin size={20}/></a>
              <a aria-label="Email" href="mailto:pargainlokesh@gmail.com" className="transition hover:text-emerald-800"><Mail size={20}/></a>
              <span className="h-px w-12 bg-emerald-900/20"/>
              <span className="text-xs">Based in Uttarakhand, India</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] border border-emerald-900/10"/>
            <div className="relative overflow-hidden rounded-[2rem] bg-emerald-950 p-8 text-white shadow-2xl shadow-emerald-950/15">
              <div className="flex items-center justify-between"><Sparkles className="text-emerald-300" size={22}/><span className="text-xs tracking-[.2em] text-emerald-200/70">PROFILE / 2026</span></div>
              <div className="mt-10 overflow-hidden rounded-[1.6rem] border border-white/15 bg-white/10"><img src="/profile-lokesh.jpg" alt="Lokesh Pargain" className="h-[22rem] w-full object-cover object-top" /></div>
              <p className="mt-9 text-2xl font-semibold">Curious by nature.</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-300">Builder by choice.</p>
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
                <div><p className="text-2xl font-semibold">AI/ML</p><p className="mt-1 text-xs text-emerald-100/65">Specialisation</p></div>
                <div><p className="text-2xl font-semibold">2028</p><p className="mt-1 text-xs text-emerald-100/65">Graduation</p></div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-8 rounded-2xl border border-emerald-900/10 bg-white px-4 py-3 shadow-xl"><p className="text-xs text-[#738178]">Currently focused on</p><p className="mt-1 text-sm font-semibold text-emerald-950">Building useful things ↗</p></div>
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-emerald-950/10 bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[.7fr_1.3fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-emerald-700">01 / A little about me</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">The person behind the projects.</h2></div>
          <div>
            <p className="text-lg leading-8 text-[#53645a]">I'm pursuing a B.Tech in Computer Science and Engineering with a specialisation in Artificial Intelligence & Machine Learning at Amrapali University. I enjoy taking an idea from a rough concept to a working product—learning the engineering behind it along the way.</p>
            <p className="mt-5 leading-8 text-[#718077]">My interests span Python development, web applications, AI-powered workflows, and tools that make everyday work simpler. I value clean interfaces, practical engineering, and learning by building.</p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#f3f8f3] p-5"><GraduationCap className="text-emerald-800"/><p className="mt-4 text-sm text-[#738178]">Education</p><p className="mt-1 font-semibold">B.Tech CSE · AI & ML</p></div>
              <div className="rounded-2xl bg-[#f3f8f3] p-5"><Code2 className="text-emerald-800"/><p className="mt-4 text-sm text-[#738178]">University</p><p className="mt-1 font-semibold">Amrapali University</p></div>
              <div className="rounded-2xl bg-[#f3f8f3] p-5"><Trophy className="text-emerald-800"/><p className="mt-4 text-sm text-[#738178]">Academic score</p><p className="mt-1 font-semibold">8.13 CGPA</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-12"><p className="text-xs font-semibold uppercase tracking-[.22em] text-emerald-700">02 / What I work with</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Skills & tools.</h2></div>
        <div className="grid gap-5 md:grid-cols-3">
          {skills.map((group) => <div key={group.group} className="rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-sm"><h3 className="text-lg font-semibold">{group.group}</h3><div className="mt-6 flex flex-wrap gap-2">{group.items.map((item) => <span key={item} className="rounded-full bg-[#edf5ee] px-3.5 py-2 text-sm text-emerald-950">{item}</span>)}</div></div>)}
        </div>
      </section>

      <section id="experience" className="border-y border-emerald-950/10 bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-12"><p className="text-xs font-semibold uppercase tracking-[.22em] text-emerald-700">03 / Learning in the field</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Experience & milestones.</h2></div>
          <div className="grid gap-4 md:grid-cols-2">
            {experiences.map((item) => <div key={item.role} className="flex gap-5 rounded-2xl border border-emerald-950/10 p-6"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800"><BriefcaseBusiness size={20}/></div><div><div className="flex flex-wrap items-center gap-3"><h3 className="font-semibold">{item.role}</h3><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800">{item.meta}</span></div><p className="mt-2 text-sm leading-6 text-[#718077]">{item.detail}</p></div></div>)}
          </div>
          <div className="mt-6 rounded-2xl bg-emerald-950 p-6 text-white sm:flex sm:items-center sm:justify-between"><div><p className="text-sm text-emerald-200">Leadership & recognition</p><p className="mt-1 text-lg font-semibold">Google Student Ambassador · Hack for Green Bharat finalist</p></div><Trophy className="mt-4 text-emerald-300 sm:mt-0" size={28}/></div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-emerald-700">04 / Selected work</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Things I've built.</h2></div><a href="https://github.com/Lokesh087" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:text-emerald-600">All repositories <ArrowUpRight size={16}/></a></div>
        <div className="mb-8 flex flex-wrap gap-2">{filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full px-4 py-2 text-xs font-medium transition ${activeFilter === filter ? "bg-emerald-900 text-white" : "border border-emerald-900/15 bg-white text-[#65746a] hover:border-emerald-800"}`}>{filter}</button>)}</div>
        <div className="grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project, index) => <article key={project.name} className="group flex min-h-64 flex-col rounded-3xl border border-emerald-950/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5">
            <div className="flex items-start justify-between"><span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-800">{project.type}</span><span className="text-sm text-[#a0aca3]">0{index + 1}</span></div>
            <h3 className="mt-7 text-xl font-semibold tracking-tight">{project.name}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#718077]">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="text-xs text-emerald-800">{tech}</span>)}</div>
            <a href={project.href} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">View project <ExternalLink size={15} className="transition group-hover:translate-x-1"/></a>
          </article>)}
        </div>
      </section>


      <section id="certificates" className="border-y border-emerald-950/10 bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-emerald-700">05 / Proof of learning</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Certificates & resume.</h2><p className="mt-4 max-w-2xl leading-7 text-[#718077]">A selection of internship, training, and learning credentials. Open any certificate to view the original document.</p></div>
            <div className="flex flex-wrap gap-3"><a href="/resume.pdf" download className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-800">Download resume <ArrowDownRight size={16}/></a><a href="/resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 px-5 py-3 text-sm font-medium text-emerald-950 hover:border-emerald-800">View resume <ExternalLink size={15}/></a></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {title:"Infosys Springboard",subtitle:"Internship 7.0 · AI-Powered Dynamic Pricing",file:"/certificates/infosys-internship.pdf",kind:"Internship completion"},
              {title:"Infotact Solutions",subtitle:"Python Development",file:"/certificates/infotact-python-internship.pdf",kind:"Internship"},
              {title:"Infotact Solutions",subtitle:"Python Development",file:"/certificates/infotact-python-training.pdf",kind:"Training"},
              {title:"GeeksforGeeks · Nation SkillUp",subtitle:"Agentic AI – Skill Up",file:"/certificates/agentic-ai-skillup.pdf",kind:"Course completion"},
            ].map((item)=><article key={item.file} className="flex flex-col rounded-3xl border border-emerald-950/10 bg-[#fbfdfb] p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/5"><span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-800">{item.kind}</span><h3 className="mt-5 text-lg font-semibold">{item.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-[#718077]">{item.subtitle}</p><a href={item.file} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">View certificate <ExternalLink size={15}/></a></article>)}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-emerald-950 py-20 text-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-emerald-300">05 / Start a conversation</p>
          <div className="mt-5 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"><div><h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Have an idea? Let's make it useful.</h2><p className="mt-5 max-w-xl leading-7 text-emerald-100/70">I'm open to internship opportunities, collaborations, and conversations about software and AI.</p></div><a href="mailto:pargainlokesh@gmail.com" className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-100">Say hello <ArrowUpRight size={18}/></a></div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-7 text-sm text-emerald-100/65"><span>© {new Date().getFullYear()} Lokesh Pargain</span><div className="flex gap-5"><a href="https://github.com/Lokesh087" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a><a href="https://www.linkedin.com/in/lokesh-pargain-4319b1283/" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a><a href="mailto:pargainlokesh@gmail.com" className="hover:text-white">Email</a></div></div>
        </div>
      </section>
    </main>
  )
}
