"use client"

import type React from "react"
import dynamicImport from "next/dynamic"

export const dynamic = "force-dynamic"

import { useState, Suspense, useRef, useEffect, useCallback } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// Dynamically import THREE.js components to prevent SSR errors
const Canvas = dynamicImport(() => import("@react-three/fiber").then(mod => mod.Canvas), { ssr: false })
const Points = dynamicImport(() => import("@react-three/drei").then(mod => mod.Points), { ssr: false })
const PointMaterial = dynamicImport(() => import("@react-three/drei").then(mod => mod.PointMaterial), { ssr: false })
const Float = dynamicImport(() => import("@react-three/drei").then(mod => mod.Float), { ssr: false })
const Sphere = dynamicImport(() => import("@react-three/drei").then(mod => mod.Sphere), { ssr: false })
const Box = dynamicImport(() => import("@react-three/drei").then(mod => mod.Box), { ssr: false })
const Environment = dynamicImport(() => import("@react-three/drei").then(mod => mod.Environment), { ssr: false })
const OrbitControls = dynamicImport(() => import("@react-three/drei").then(mod => mod.OrbitControls), { ssr: false })

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Mail,
  Download,
  Code,
  Palette,
  Zap,
  Moon,
  Sun,
  Award,
  Briefcase,
  Home,
  User,
  BookOpen,
  Loader,
  ArrowUp,
  Keyboard,
  Eye,
  Volume2,
  VolumeX,
} from "lucide-react"
import Link from "next/link"

// Type definition for sections
type Section = "home" | "about" | "skills" | "achievements" | "projects" | "blog" | "contact"

// Custom cursor component
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    document.addEventListener("mousemove", updateMousePosition, { passive: true })

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll("button, a, [role='button'], input, textarea")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter, { passive: true })
      el.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    })

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 w-4 h-4 bg-purple-500 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${mousePosition.x - 8}px, ${mousePosition.y - 8}px, 0) scale(${isHovering ? 1.5 : 1})`,
      }}
    />
  )
}

// Scroll-triggered animation hook
function useScrollAnimation() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-scroll-section]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return visibleSections
}

// Sound effect hook with mute toggle
const useSound = (soundType: string) => {
  const [isMuted, setIsMuted] = useState(false)

  const playSound = useCallback(() => {
    if (isMuted || typeof window === "undefined") return

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = soundType === "hover" ? 800 : soundType === "click" ? 600 : 400
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (error) {
      // Silently fail if audio context is not available
      console.warn("Audio context not available:", error)
    }
  }, [soundType, isMuted])

  return { playSound, isMuted, setIsMuted }
}

// Loading component
function LoadingScreen({ darkMode }: { darkMode: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center z-30 ${
        darkMode ? "bg-slate-900/90" : "bg-white/90"
      } backdrop-blur-sm`}
    >
      <div className="text-center">
        <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
        <p className={`text-lg font-medium ${darkMode ? "text-white" : "text-slate-900"}`}>Loading 3D Experience...</p>
      </div>
    </div>
  )
}

// Enhanced Particle system with more variety
function EnhancedParticles({ count = 1000, darkMode }: { count?: number; darkMode: boolean }) {
  const mesh = useRef<THREE.Points>(null!)
  const [sphere] = useState(() => new Float32Array(count * 3))
  const [colors] = useState(() => new Float32Array(count * 3))

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      sphere[i3] = (Math.random() - 0.5) * 25
      sphere[i3 + 1] = (Math.random() - 0.5) * 25
      sphere[i3 + 2] = (Math.random() - 0.5) * 25

      // Random colors
      const color = new THREE.Color()
      color.setHSL(Math.random(), 0.7, darkMode ? 0.6 : 0.5)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
  }, [count, sphere, colors, darkMode])

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x -= delta / 10
      mesh.current.rotation.y -= delta / 15
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={mesh} positions={sphere} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          size={darkMode ? 0.02 : 0.025}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors
        />
      </Points>
    </group>
  )
}

// Mouse interaction component
function MouseInteraction({ children }: { children: React.ReactNode }) {
  const { camera, gl } = useThree()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }

    gl.domElement.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => gl.domElement.removeEventListener("mousemove", handleMouseMove)
  }, [gl])

  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  return <>{children}</>
}

function PageContent() {
  const [activeSection, setActiveSection] = useState<Section>("home")
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [projectFilter, setProjectFilter] = useState("all")
  const [blogFilter, setBlogFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { playSound: playHoverSound, isMuted, setIsMuted } = useSound("hover")
  const { playSound: playClickSound } = useSound("click")
  const visibleSections = useScrollAnimation()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "1":
            e.preventDefault()
            handleSectionChange("home")
            break
          case "2":
            e.preventDefault()
            handleSectionChange("about")
            break
          case "3":
            e.preventDefault()
            handleSectionChange("skills")
            break
          case "4":
            e.preventDefault()
            handleSectionChange("projects")
            break
          case "5":
            e.preventDefault()
            handleSectionChange("contact")
            break
          case "d":
            e.preventDefault()
            setDarkMode(!darkMode)
            break
          case "m":
            e.preventDefault()
            setIsMuted(!isMuted)
            break
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [darkMode, isMuted, setIsMuted])

  // Scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const personalInfo = {
    name: "Lokesh Pargain",
    initials: "LP",
    title: "AI / Data Science — Software Development Intern",
    email: "pargainlokesh@gmail.com",
    phone: "918755231985",
    location: "Uttarakhand, India",
    LinkedIn: "https://www.linkedin.com/in/lokesh-pargain-4319b1283",
    GitHub: "https://github.com/Lokesh087",
    Instagram: "https://instagram.com/lokesh_pargain_004",
    resumeUrl: "/LOKESHPARGAIN.pdf",
  }

  const navItems = [
    { id: "home" as Section, label: "Home", icon: Home, shortcut: "Ctrl+1" },
    { id: "about" as Section, label: "About", icon: User, shortcut: "Ctrl+2" },
    { id: "skills" as Section, label: "Skills", icon: Code, shortcut: "Ctrl+3" },
    { id: "achievements" as Section, label: "Achievements", icon: Award, shortcut: "Ctrl+4" },
    { id: "projects" as Section, label: "Projects", icon: Briefcase, shortcut: "Ctrl+5" },
    { id: "blog" as Section, label: "Blog", icon: BookOpen, shortcut: "Ctrl+6" },
    { id: "contact" as Section, label: "Contact", icon: Mail, shortcut: "Ctrl+7" },
  ]

  const handleResumeDownload = useCallback(() => {
    playClickSound()
    window.location.href = personalInfo.resumeUrl
  }, [playClickSound, personalInfo.resumeUrl])

  const handleSectionChange = useCallback(
    (section: Section) => {
      playClickSound()
      setLoading(true)
      setActiveSection(section)
      setTimeout(() => setLoading(false), 1000)
    },
    [playClickSound],
  )

  const scrollToTop = useCallback(() => {
    playClickSound()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [playClickSound])

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-slate-900"
      }`}
      style={{ cursor: "none" }}
    >
      <CustomCursor />

      {/* Enhanced Navigation */}
      <nav
        className={`fixed top-0 w-full backdrop-blur-xl border-b z-50 transition-all duration-500 ${
          darkMode
            ? "bg-slate-900/90 border-slate-700 shadow-2xl shadow-purple-500/10"
            : "bg-white/95 border-slate-200 shadow-xl shadow-blue-500/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo with enhanced styling */}
            <div
              className={`text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer`}
            >
              {personalInfo.name}
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    onMouseEnter={playHoverSound}
                    title={`${item.label} (${item.shortcut})`}
                    className={`group relative flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      activeSection === item.id
                        ? darkMode
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : darkMode
                          ? "text-slate-300 hover:text-white hover:bg-slate-800/50 hover:shadow-lg"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 hover:shadow-md"
                    }`}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                    {activeSection === item.id && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-current rounded-full animate-pulse" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Enhanced Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                onMouseEnter={playHoverSound}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
                }`}
                aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-red-500" />
                ) : (
                  <Volume2 className="h-4 w-4 text-green-500" />
                )}
              </button>

              <div className="flex items-center gap-2 p-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50">
                <Sun className={`h-4 w-4 ${darkMode ? "text-slate-400" : "text-yellow-500"}`} />
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-purple-600"
                />
                <Moon className={`h-4 w-4 ${darkMode ? "text-blue-400" : "text-slate-400"}`} />
              </div>

              <button
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
                }`}
                title="Keyboard shortcuts (Ctrl+K)"
                aria-label="View keyboard shortcuts"
              >
                <Keyboard className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 lg:hidden backdrop-blur-xl border-t z-50 transition-all duration-500 ${
          darkMode
            ? "bg-slate-900/95 border-slate-700 shadow-2xl shadow-purple-500/10"
            : "bg-white/95 border-slate-200 shadow-xl shadow-blue-500/10"
        }`}
      >
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex justify-start min-w-max px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  onMouseEnter={playHoverSound}
                  className={`flex flex-col items-center gap-1 p-3 mx-1 rounded-xl transition-all duration-300 transform hover:scale-105 min-w-[80px] ${
                    activeSection === item.id
                      ? darkMode
                        ? "text-purple-400 bg-purple-500/10"
                        : "text-blue-600 bg-blue-500/10"
                      : darkMode
                        ? "text-slate-400"
                        : "text-slate-600"
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                  {activeSection === item.id && <div className="w-1 h-1 bg-current rounded-full animate-pulse" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          onMouseEnter={playHoverSound}
          className={`fixed bottom-20 right-6 lg:bottom-6 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-40 ${
            darkMode
              ? "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25"
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Content Sections */}
      <div className="pt-20 pb-20 lg:pb-8 relative">
        {loading && <LoadingScreen darkMode={darkMode} />}

        {activeSection === "home" && (
          <HomeSection3D personalInfo={personalInfo} darkMode={darkMode} onResumeDownload={handleResumeDownload} />
        )}
        {activeSection === "about" && <AboutSection3D darkMode={darkMode} />}
        {activeSection === "skills" && <SkillsSection3D darkMode={darkMode} />}
        {activeSection === "achievements" && <AchievementsSection3D darkMode={darkMode} />}
        {activeSection === "projects" && (
          <ProjectsSection3D_Renamed
            darkMode={darkMode}
            filter={projectFilter}
            setFilter={setProjectFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        {activeSection === "blog" && (
          <BlogSection3D_Renamed
            darkMode={darkMode}
            filter={blogFilter}
            setFilter={setBlogFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        {activeSection === "contact" && <ContactSection3D_Renamed personalInfo={personalInfo} darkMode={darkMode} />}
      </div>

      {/* Accessibility announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Current section: {activeSection}
      </div>
    </div>
  )
}

// Enhanced 3D Components for Home Page
function FloatingTechSphere({ position, darkMode }: { position: [number, number, number]; darkMode: boolean }) {
  const meshRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={3}>
      <group
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Main sphere */}
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial
            color={darkMode ? "#8b5cf6" : "#6366f1"}
            transparent
            opacity={hovered ? 0.9 : 0.7}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>

        {/* Orbiting elements */}
        <group rotation={[0, 0, Math.PI / 4]}>
          {[
            { pos: [1.5, 0, 0], color: darkMode ? "#10b981" : "#059669" },
            { pos: [-1.5, 0, 0], color: darkMode ? "#f59e0b" : "#d97706" },
            { pos: [0, 1.5, 0], color: darkMode ? "#ef4444" : "#dc2626" },
            { pos: [0, -1.5, 0], color: darkMode ? "#ec4899" : "#db2777" },
          ].map((item, index) => (
            <mesh key={index} position={item.pos as [number, number, number]}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color={item.color} />
            </mesh>
          ))}
        </group>

        {/* Inner glow */}
        <Sphere args={[0.8, 16, 16]}>
          <meshBasicMaterial color={darkMode ? "#a855f7" : "#8b5cf6"} transparent opacity={0.3} side={THREE.BackSide} />
        </Sphere>
      </group>
    </Float>
  )
}

function CodeMatrix({ position, darkMode }: { position: [number, number, number]; darkMode: boolean }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.5
      })
    }
  })

  const colors = [
    darkMode ? "#10b981" : "#059669",
    darkMode ? "#f59e0b" : "#d97706",
    darkMode ? "#ef4444" : "#dc2626",
    darkMode ? "#8b5cf6" : "#7c3aed",
  ]

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <group ref={groupRef} position={position}>
        {/* Create a matrix of code blocks */}
        {Array.from({ length: 27 }, (_, i) => {
          const x = (i % 3) - 1
          const y = Math.floor((i % 9) / 3) - 1
          const z = Math.floor(i / 9) - 1
          return (
            <Box key={i} position={[x * 0.8, y * 0.8, z * 0.8]} args={[0.3, 0.3, 0.3]}>
              <meshStandardMaterial color={colors[i % 4]} transparent opacity={0.8} />
            </Box>
          )
        })}
      </group>
    </Float>
  )
}

function HolographicDisplay({ position, darkMode }: { position: [number, number, number]; darkMode: boolean }) {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.Material & { opacity?: number }
          if (material.opacity !== undefined) {
            material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.3
          }
        }
      })
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={2} floatIntensity={1.5}>
      <group ref={meshRef} position={position}>
        {/* Holographic frame */}
        <mesh>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial color={darkMode ? "#06b6d4" : "#0891b2"} transparent opacity={0.3} wireframe />
        </mesh>

        {/* Holographic content */}
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[1.8, 1.3]} />
          <meshStandardMaterial
            color={darkMode ? "#3b82f6" : "#2563eb"}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Data streams */}
        {Array.from({ length: 5 }, (_, i) => (
          <mesh key={i} position={[-0.7 + i * 0.35, 0, 0.15]}>
            <boxGeometry args={[0.05, Math.random() * 0.8 + 0.2, 0.05]} />
            <meshStandardMaterial color={darkMode ? "#10b981" : "#059669"} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Enhanced Home Scene
function EnhancedHomeScene3D({ darkMode }: { darkMode: boolean }) {
  return (
    <MouseInteraction>
      <Environment preset={darkMode ? "night" : "dawn"} />
      <ambientLight intensity={darkMode ? 0.4 : 0.7} />
      <pointLight position={[10, 10, 10]} intensity={darkMode ? 1.2 : 1.5} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={darkMode ? 0.6 : 1} color="#06b6d4" />
      <spotLight position={[0, 20, 0]} intensity={darkMode ? 0.8 : 1.2} color="#ec4899" />

      <EnhancedParticles count={1200} darkMode={darkMode} />

      {/* Enhanced tech objects */}
      <FloatingTechSphere position={[4, 2, -2]} darkMode={darkMode} />
      <CodeMatrix position={[-4, 1, -1]} darkMode={darkMode} />
      <HolographicDisplay position={[3, -2, 1]} darkMode={darkMode} />
      <FloatingTechSphere position={[-3, -1, 2]} darkMode={darkMode} />
      <CodeMatrix position={[2, 3, 3]} darkMode={darkMode} />
      <HolographicDisplay position={[-2, -3, -3]} darkMode={darkMode} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </MouseInteraction>
  )
}

// Enhanced sections with scroll animations
function HomeSection3D({
  personalInfo,
  darkMode,
  onResumeDownload,
}: { personalInfo: any; darkMode: boolean; onResumeDownload: () => void }) {
  const { playSound: playHoverSound } = useSound("hover")

  return (
    <section
      className="relative h-screen overflow-hidden"
      data-scroll-section
      id="home"
      role="main"
      aria-label="Home section"
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #7c3aed 70%, #334155 100%)"
              : "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 30%, #a855f7 70%, #93c5fd 100%)",
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <EnhancedHomeScene3D darkMode={darkMode} />
          </Suspense>
        </Canvas>
      </div>

      <div
        className={`absolute inset-0 z-10 ${
          darkMode
            ? "bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30"
            : "bg-gradient-to-br from-blue-100/40 via-transparent to-purple-100/40"
        }`}
      />

      <div className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="mb-8">
              <div
                className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium mb-8 transition-all duration-500 hover:scale-105 backdrop-blur-xl ${
                  darkMode
                    ? "bg-white/10 text-white border border-white/20 shadow-2xl shadow-purple-500/20"
                    : "bg-green-100/80 text-green-800 border border-green-200 shadow-xl shadow-green-500/20"
                }`}
              >
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse shadow-lg shadow-green-500/50"></span>
                Available for work
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className={`${darkMode ? "text-white" : "text-slate-900"} block mb-2`}>Hi, I&apos;m</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x block">
                  {personalInfo.name}
                </span>
              </h1>

              <p
                className={`text-xl sm:text-3xl mb-10 max-w-3xl leading-relaxed ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                {personalInfo.title}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mb-10">
                <Button
                  size="lg"
                  onClick={onResumeDownload}
                  onMouseEnter={playHoverSound}
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                  aria-label="Download resume"
                >
                  <Download className="mr-3 h-6 w-6" />
                  Download Resume
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onMouseEnter={playHoverSound}
                  className={`px-10 py-6 text-xl font-semibold rounded-2xl backdrop-blur-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                    darkMode
                      ? "bg-white/10 border-white/30 text-white hover:bg-white/20 shadow-2xl shadow-white/10"
                      : "bg-slate-900/10 border-slate-300 text-slate-900 hover:bg-slate-900/20 shadow-xl shadow-slate-500/20"
                  }`}
                  aria-label="View portfolio"
                >
                  <Eye className="mr-3 h-6 w-6" />
                  View My Work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className={`animate-bounce ${darkMode ? "text-white" : "text-slate-900"}`}>
          <div className="w-8 h-12 border-2 border-current rounded-full flex justify-center">
            <div className="w-2 h-4 bg-current rounded-full mt-3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Enhanced About Section with scroll animations
function AboutSection3D({ darkMode }: { darkMode: boolean }) {
  return (
    <section
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
      data-scroll-section
      id="about"
      role="region"
      aria-label="About section"
    >
  <div className="absolute inset-0 z-0">
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #1e293b 0%, #334155 30%, #10b981 70%, #1e293b 100%)"
          : "linear-gradient(135deg, #cffafe 0%, #a5f3fc 30%, #86efac 70%, #cffafe 100%)",
      }}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <AboutScene3D_Renamed darkMode={darkMode} />
      </Suspense>
    </Canvas>
  </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent`}
          >
            About Me
          </h2>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            I'm a passionate developer who loves creating innovative solutions and bringing ideas to life through code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-right">
            <h3 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>My Passion</h3>
            <p className={`mb-8 text-lg leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              I'm driven by the endless possibilities of technology and its power to solve real-world problems. Whether
              it's building user-friendly interfaces, optimizing backend systems, or exploring new frameworks, I find
              joy in every aspect of development.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Code, label: "Clean Code", color: "blue" },
                { icon: Palette, label: "UI/UX Design", color: "purple" },
                { icon: Zap, label: "Performance", color: "green" },
              ].map((badge, index) => {
                const Icon = badge.icon
                return (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`flex items-center gap-2 px-4 py-2 text-sm transition-all duration-300 hover:scale-105 ${
                      darkMode ? "bg-slate-700 text-slate-200" : `bg-${badge.color}-100 text-${badge.color}-800`
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {badge.label}
                  </Badge>
                )
              })}
            </div>
          </div>

          <Card
            className={`transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-left ${
              darkMode
                ? "bg-slate-800/90 border-slate-700 backdrop-blur-xl shadow-2xl shadow-green-500/10"
                : "bg-white/90 backdrop-blur-xl border-slate-200 shadow-2xl shadow-green-500/20"
            }`}
          >
            <CardContent className="p-10">
              <h3 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>Quick Facts</h3>
              <ul className={`space-y-4 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                {[
                  { color: "blue", text: "Fresher with internship in python domain" },
                  { color: "purple", text: "5+ projects completed" },
                  { color: "green", text: "Always learning new technologies" },
                  { color: "orange", text: "Open source contributor" },
                ].map((fact, index) => (
                  <li key={index} className="flex items-center transition-all duration-300 hover:translate-x-3 group">
                    <span
                      className={`w-3 h-3 bg-${fact.color}-500 rounded-full mr-4 group-hover:scale-125 transition-transform`}
                    ></span>
                    <span className="text-lg">{fact.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Enhanced Skills Section
function SkillsSection3D({ darkMode }: { darkMode: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<"frontend" | "backend" | "tools">("frontend")
  const { playSound: playHoverSound } = useSound("hover")

  const skillCategories = {
  frontend: {
  title: "Frontend Development",
  icon: Code,
  color: "blue",
  skills: [
  { name: "React", level: 75, description: "Building dynamic user interfaces" },
  { name: "Next.js", level: 70, description: "Full-stack React framework" },
  { name: "TypeScript", level: 65, description: "Type-safe JavaScript development" },
  { name: "Tailwind CSS", level: 80, description: "Utility-first CSS framework" },
  { name: "JavaScript", level: 85, description: "Core web programming language" },
  ],
  },
  backend: {
  title: "Backend Development & NLP",
  icon: Zap,
  color: "green",
  skills: [
  { name: "Python", level: 90, description: "Primary programming language" },
  { name: "spaCy", level: 85, description: "Advanced NLP processing" },
  { name: "Pandas", level: 80, description: "Data manipulation and analysis" },
  { name: "PyPDF2", level: 75, description: "PDF parsing and processing" },
  { name: "NLP", level: 85, description: "Natural Language Processing" },
  ],
  },
  tools: {
  title: "Tools & Technologies",
  icon: Palette,
  color: "purple",
  skills: [
  { name: "Git", level: 90, description: "Version control system" },
  { name: "GitHub", level: 90, description: "Repository management and collaboration" },
  { name: "Visual Studio Code", level: 85, description: "Code editor and IDE" },
  { name: "Microsoft PowerPoint", level: 80, description: "Presentation design" },
  { name: "Gmail", level: 75, description: "Email communication" },
  ],
  },
  }

  return (
    <section
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
      data-scroll-section
      id="skills"
      role="region"
      aria-label="Skills section"
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 75 }}
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
              : "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)",
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <SkillsScene3D_Renamed darkMode={darkMode} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
          >
            Skills & Technologies
          </h2>
          <p className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            Technologies I work with and love
          </p>
        </div>

        <div className="flex justify-center mb-12 px-4">
          <div className="overflow-x-auto scrollbar-hide w-full max-w-4xl">
            <div
              className={`flex rounded-2xl p-2 backdrop-blur-xl min-w-max mx-auto ${
                darkMode
                  ? "bg-slate-800/90 shadow-2xl shadow-blue-500/10"
                  : "bg-white/90 shadow-2xl shadow-blue-500/20 border border-slate-200"
              }`}
              role="tablist"
              aria-label="Skill categories"
            >
              {Object.entries(skillCategories).map(([key, category]) => {
                const Icon = category.icon
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as any)}
                    onMouseEnter={playHoverSound}
                    role="tab"
                    aria-selected={selectedCategory === key}
                    aria-controls={`${key}-panel`}
                    className={`flex items-center gap-3 px-4 py-3 mx-1 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === key
                        ? darkMode
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : darkMode
                          ? "text-slate-300 hover:text-white hover:bg-slate-700"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium text-sm md:text-base">{category.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-8" role="tabpanel" id={`${selectedCategory}-panel`}>
          {skillCategories[selectedCategory].skills.map((skill, index) => (
            <Card
              key={skill.name}
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up ${
                darkMode
                  ? "bg-slate-800/90 border-slate-700 backdrop-blur-xl shadow-xl shadow-blue-500/10"
                  : "bg-white/90 backdrop-blur-xl hover:shadow-lg border-slate-200 shadow-xl shadow-blue-500/20"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
                      {skill.name}
                    </h3>
                    <p className={`text-base mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                      {skill.description}
                    </p>
                  </div>
                  <span
                    className={`text-lg font-bold px-3 py-1 rounded-lg ${
                      skillCategories[selectedCategory].color === "blue"
                        ? darkMode
                          ? "text-blue-400 bg-blue-500/20"
                          : "text-blue-600 bg-blue-100"
                        : skillCategories[selectedCategory].color === "green"
                          ? darkMode
                            ? "text-green-400 bg-green-500/20"
                            : "text-green-600 bg-green-100"
                          : darkMode
                            ? "text-purple-400 bg-purple-500/20"
                            : "text-purple-600 bg-purple-100"
                    }`}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className={`w-full rounded-full h-3 ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}>
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 delay-${index * 100} ${
                      skillCategories[selectedCategory].color === "blue"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600"
                        : skillCategories[selectedCategory].color === "green"
                          ? "bg-gradient-to-r from-green-500 to-green-600"
                          : "bg-gradient-to-r from-purple-500 to-purple-600"
                    }`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced Achievements Section
function AchievementsSection3D({ darkMode }: { darkMode: boolean }) {
  const [selectedTab, setSelectedTab] = useState<"experience" | "education" | "awards">("experience")
  const { playSound: playHoverSound } = useSound("hover")

  const achievements = {
  experience: [
  {
  title: "Intern - AI-based Recruitment Systems",
  company: "Infotact Solutions",
  period: "03/2025 – 04/2025",
  status: "Completed",
  description: "Developed an AI-based recruitment web application automating candidate screening using resume parsing and keyword extraction.",
  highlights: [
  "Implemented Python-based backend logic for parsing resumes in PDF using spaCy and PyPDF2",
  "Led a team of 4 interns in developing an NLP-based candidate screening system",
  "Achieved over 60% improvement in shortlisting efficiency through AI-based automation",
  "Promoted clean code practices and peer reviews via Git and GitHub collaboration",
  ],
  },
  ],
  education: [
  {
  title: "Bachelor of Technology",
  company: "Amrapali University",
  period: "08/2024 – 08/2028",
  status: "Currently Pursuing",
  description: "Bachelor's degree in Technology with focus on AI, ML, and Software Development.",
  highlights: [
  "Location: Uttarakhand, India",
  "Strong foundation in core technical subjects and programming",
  "Hands-on experience in Python and AI-based applications",
  "Self-motivated learner exploring modern tech trends and innovations",
  ],
  },
  ],
  awards: [
  {
  title: "AI Smart Based Recruitment System",
  company: "Key Achievement",
  period: "2025",
  status: "90% Improvement",
  description: "Achieved over 90% improvement in shortlisting efficiency during testing through AI-based automation.",
  highlights: [
  "Built candidate profile matching using cosine similarity and AI ranking models",
  "Implemented secure file upload and resume parsing pipeline",
  "Structured data storage for efficient retrieval and processing",
  ],
  },
  ],
  }

  return (
    <section
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
      data-scroll-section
      id="achievements"
      role="region"
      aria-label="Achievements section"
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 75 }}
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)"
              : "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)",
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <AchievementsScene3D_Renamed darkMode={darkMode} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent`}
          >
            Achievements & Experience
          </h2>
          <p className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-700"}`}>My journey and accomplishments</p>
        </div>

        <div className="flex justify-center mb-12">
          <div
            className={`flex rounded-2xl p-2 backdrop-blur-xl ${
              darkMode
                ? "bg-slate-800/90 shadow-2xl shadow-orange-500/10"
                : "bg-white/90 shadow-2xl shadow-orange-500/20 border border-slate-200"
            }`}
            role="tablist"
            aria-label="Achievement categories"
          >
            {[
              { key: "experience", icon: Briefcase, label: "Experience" },
              { key: "education", icon: BookOpen, label: "Education" },
              { key: "awards", icon: Award, label: "Awards" },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  onMouseEnter={playHoverSound}
                  role="tab"
                  aria-selected={selectedTab === tab.key}
                  aria-controls={`${tab.key}-panel`}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    selectedTab === tab.key
                      ? darkMode
                        ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                        : "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                      : darkMode
                        ? "text-slate-300 hover:text-white hover:bg-slate-700"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-8" role="tabpanel" id={`${selectedTab}-panel`}>
          {achievements[selectedTab].map((item, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up ${
                darkMode
                  ? "bg-slate-800/90 border-slate-700 backdrop-blur-xl shadow-xl shadow-orange-500/10"
                  : "bg-white/90 backdrop-blur-xl hover:shadow-lg border-slate-200 shadow-xl shadow-orange-500/20"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>{item.title}</h3>
                <p className={`text-sm mt-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {item.company} - {item.period}
                </p>
                {item.status && (
                  <Badge
                    variant="outline"
                    className={`mt-4 ${
                      darkMode ? "text-orange-400 border-orange-400" : "text-orange-600 border-orange-600"
                    }`}
                  >
                    {item.status}
                  </Badge>
                )}
                <p className={`mt-4 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>{item.description}</p>
                <ul className="list-disc pl-5 mt-4">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced Projects Section
function ProjectsSection3D_Renamed({
  darkMode,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
}: {
  darkMode: boolean
  filter: string
  setFilter: (filter: string) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}) {
  const { playSound: playHoverSound } = useSound("hover")

  const projects = [
  {
  title: "AI Smart Based Recruitment System",
  description: "Developed an AI-based recruitment web application that automates candidate screening using resume parsing, keyword extraction, and cosine similarity matching. Achieved 90% improvement in shortlisting efficiency.",
  tags: ["python", "spacy", "nlp", "ai", "pypdf2"],
  link: "https://github.com/Lokesh087",
  },
  ]

  const filteredProjects = projects.filter((project) => {
    const searchRegex = new RegExp(searchTerm, "i")
    return (
      (filter === "all" || project.tags.includes(filter)) &&
      (searchRegex.test(project.title) || searchRegex.test(project.description))
    )
  })

  const tagOptions = [
  "all",
  "python",
  "spacy",
  "nlp",
  "ai",
  "pypdf2",
  ]

  return (
    <section
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
      data-scroll-section
      id="projects"
      role="region"
      aria-label="Projects section"
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 75 }}
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #7b1fa2 100%)"
              : "linear-gradient(135deg, #e1bee7 0%, #ce93d8 50%, #ab47bc 100%)",
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <ProjectsScene3D darkMode={darkMode} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}
          >
            My Projects
          </h2>
          <p className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-700"}`}>A selection of my best work</p>
        </div>

        <div className="flex flex-col gap-4 mb-12">
          <div className="overflow-x-auto scrollbar-hide">
            <div
              className={`flex rounded-2xl p-2 backdrop-blur-xl min-w-max ${
                darkMode
                  ? "bg-slate-800/90 shadow-2xl shadow-purple-500/10"
                  : "bg-white/90 shadow-2xl shadow-purple-500/20 border border-slate-200"
              }`}
              role="group"
              aria-label="Project filters"
            >
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  onMouseEnter={playHoverSound}
                  className={`flex items-center gap-2 px-4 py-2 mx-1 rounded-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                    filter === tag
                      ? darkMode
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : darkMode
                        ? "text-slate-300 hover:text-white hover:bg-slate-700"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span className="font-medium text-sm">{tag}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="search"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  darkMode
                    ? "bg-slate-800 text-white border-slate-700 shadow-2xl shadow-purple-500/10"
                    : "bg-white text-slate-900 border-slate-200 shadow-2xl shadow-purple-500/20"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up ${
                darkMode
                  ? "bg-slate-800/90 border-slate-700 backdrop-blur-xl shadow-xl shadow-purple-500/10"
                  : "bg-white/90 backdrop-blur-xl hover:shadow-lg border-slate-200 shadow-xl shadow-purple-500/20"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
                  {project.title}
                </h3>
                <p className={`text-base mt-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className={`text-xs ${
                        darkMode ? "bg-slate-700 text-slate-200" : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="mt-6 w-full">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverSound}
                    className="w-full text-center"
                  >
                    View Project
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced Blog Section
function BlogSection3D_Renamed({
  darkMode,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
}: {
  darkMode: boolean
  filter: string
  setFilter: (filter: string) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}) {
  const { playSound: playHoverSound } = useSound("hover")

  const blogPosts = [
    {
      title: "The Future of AI",
      description: "A deep dive into the future of artificial intelligence and its impact on society.",
      tags: ["ai", "technology", "future"],
      link: "https://example.com/blog/future-of-ai",
    },
    {
      title: "Web Development Trends",
      description: "An overview of the latest trends in web development and how they are shaping the industry.",
      tags: ["webdev", "technology", "trends"],
      link: "https://example.com/blog/web-development-trends",
    },
    {
      title: "The Power of Open Source",
      description: "Exploring the benefits and impact of open source software on innovation and collaboration.",
      tags: ["opensource", "software", "collaboration"],
      link: "https://example.com/blog/power-of-open-source",
    },
  ]

  const filteredBlogPosts = blogPosts.filter((post) => {
    const searchRegex = new RegExp(searchTerm, "i")
    return (
      (filter === "all" || post.tags.includes(filter)) &&
      (searchRegex.test(post.title) || searchRegex.test(post.description))
    )
  })

  const tagOptions = [
    "all",
    "ai",
    "technology",
    "future",
    "webdev",
    "trends",
    "opensource",
    "software",
    "collaboration",
  ]

  return (
    <section
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
      data-scroll-section
      id="blog"
      role="region"
      aria-label="Blog section"
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 75 }}
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #004d40 0%, #00695c 50%, #00796b 100%)"
              : "linear-gradient(135deg, #b2dfdb 0%, #4db6ac 50%, #009688 100%)",
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <BlogScene3D darkMode={darkMode} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent`}
          >
            My Blog
          </h2>
          <p className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            Thoughts and insights on technology and development
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-12">
          <div className="overflow-x-auto scrollbar-hide">
            <div
              className={`flex rounded-2xl p-2 backdrop-blur-xl min-w-max ${
                darkMode
                  ? "bg-slate-800/90 shadow-2xl shadow-green-500/10"
                  : "bg-white/90 shadow-2xl shadow-green-500/20 border border-slate-200"
              }`}
              role="group"
              aria-label="Blog filters"
            >
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  onMouseEnter={playHoverSound}
                  className={`flex items-center gap-2 px-4 py-2 mx-1 rounded-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                    filter === tag
                      ? darkMode
                        ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg"
                        : "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg"
                      : darkMode
                        ? "text-slate-300 hover:text-white hover:bg-slate-700"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span className="font-medium text-sm">{tag}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="search"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-6 py-4 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  darkMode
                    ? "bg-slate-800 text-white border-slate-700 shadow-2xl shadow-green-500/10"
                    : "bg-white text-slate-900 border-slate-200 shadow-2xl shadow-green-500/20"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogPosts.map((post, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-fade-in-up ${
                darkMode
                  ? "bg-slate-800/90 border-slate-700 backdrop-blur-xl shadow-xl shadow-green-500/10"
                  : "bg-white/90 backdrop-blur-xl hover:shadow-lg border-slate-200 shadow-xl shadow-green-500/20"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>{post.title}</h3>
                <p className={`text-base mt-2 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>{post.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className={`text-xs ${darkMode ? "bg-slate-700 text-slate-200" : "bg-green-100 text-green-800"}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="mt-6 w-full">
                  <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverSound}
                    className="w-full text-center"
                  >
                    Read More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced Contact Section
function ContactSection3D_Renamed({ personalInfo, darkMode }: { personalInfo: any; darkMode: boolean }) {
  const { playSound: playHoverSound } = useSound("hover")

  return (
    <section
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
      data-scroll-section
      id="contact"
      role="region"
      aria-label="Contact section"
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 75 }}
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #263238 0%, #37474f 50%, #455a64 100%)"
              : "linear-gradient(135deg, #cfd8dc 0%, #90a4ae 50%, #607d8b 100%)",
          }}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <ContactScene3D darkMode={darkMode} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent`}
          >
            Contact Me
          </h2>
          <p className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            Get in touch and let&apos;s build something amazing together
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-right">
            <h3 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Contact Information
            </h3>
            <p className={`mb-8 text-lg leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              Feel free to reach out to me through any of the following channels. I&apos;m always open to new
              opportunities and collaborations.
            </p>
            <ul className={`space-y-4 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              <li className="flex items-center transition-all duration-300 hover:translate-x-3 group">
                <Mail className="h-5 w-5 mr-4" />
                <a href={`mailto:${personalInfo.email}`} className="text-lg">
                  {personalInfo.email}
                </a>
              </li>
              <li className="flex items-center transition-all duration-300 hover:translate-x-3 group">
                <Home className="h-5 w-5 mr-4" />
                <span className="text-lg">{personalInfo.location}</span>
              </li>
              <li className="flex items-center transition-all duration-300 hover:translate-x-3 group">
                <User className="h-5 w-5 mr-4" />
                <a href={personalInfo.linkedin} className="text-lg">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <Card
            className={`transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-left ${
              darkMode
                ? "bg-slate-800/90 border-slate-700 backdrop-blur-xl shadow-2xl shadow-blue-500/10"
                : "bg-white/90 backdrop-blur-xl border-slate-200 shadow-2xl shadow-blue-500/20"
            }`}
          >
            <CardContent className="p-10">
              <h3 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-900"}`}>
                Send me a message
              </h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`mt-1 block w-full px-4 py-3 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-slate-900 border-slate-300"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`mt-1 block w-full px-4 py-3 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-slate-900 border-slate-300"
                    }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`mt-1 block w-full px-4 py-3 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-slate-900 border-slate-300"
                    }`}
                  ></textarea>
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// 3D Scenes
function AboutScene3D_Renamed({ darkMode }: { darkMode: boolean }) {
  return (
    <MouseInteraction>
      <Environment preset={darkMode ? "sunset" : "apartment"} />
      <ambientLight intensity={darkMode ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={darkMode ? 1 : 1.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={darkMode ? 0.5 : 1} color="#10b981" />

      <EnhancedParticles count={800} darkMode={darkMode} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </MouseInteraction>
  )
}

function SkillsScene3D_Renamed({ darkMode }: { darkMode: boolean }) {
  return (
    <MouseInteraction>
      <Environment preset={darkMode ? "city" : "warehouse"} />
      <ambientLight intensity={darkMode ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={darkMode ? 1 : 1.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={darkMode ? 0.5 : 1} color="#10b981" />

      <EnhancedParticles count={800} darkMode={darkMode} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </MouseInteraction>
  )
}

function AchievementsScene3D_Renamed({ darkMode }: { darkMode: boolean }) {
  return (
    <MouseInteraction>
      <Environment preset={darkMode ? "studio" : "dawn"} />
      <ambientLight intensity={darkMode ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={darkMode ? 1 : 1.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={darkMode ? 0.5 : 1} color="#10b981" />

      <EnhancedParticles count={800} darkMode={darkMode} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </MouseInteraction>
  )
}

function ProjectsScene3D({ darkMode }: { darkMode: boolean }) {
  return (
    <MouseInteraction>
      <Environment preset={darkMode ? "forest" : "lobby"} />
      <ambientLight intensity={darkMode ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={darkMode ? 1 : 1.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={darkMode ? 0.5 : 1} color="#10b981" />

      <EnhancedParticles count={800} darkMode={darkMode} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </MouseInteraction>
  )
}

function BlogScene3D({ darkMode }: { darkMode: boolean }) {
  return (
    <MouseInteraction>
      <Environment preset={darkMode ? "park" : "studio"} />
      <ambientLight intensity={darkMode ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={darkMode ? 1 : 1.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={darkMode ? 0.5 : 1} color="#10b981" />

      <EnhancedParticles count={800} darkMode={darkMode} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </MouseInteraction>
  )
}

function ContactScene3D({ darkMode }: { darkMode: boolean }) {
  return (
    <MouseInteraction>
      <Environment preset={darkMode ? "city" : "warehouse"} />
      <ambientLight intensity={darkMode ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={darkMode ? 1 : 1.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={darkMode ? 0.5 : 1} color="#10b981" />

      <EnhancedParticles count={800} darkMode={darkMode} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
    </MouseInteraction>
  )
}

export default PageContent
