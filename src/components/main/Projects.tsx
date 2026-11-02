'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { Tags, X, ChevronLeft, ChevronRight, ImageIcon, Globe } from 'lucide-react'
import { useState, useMemo, useEffect, useRef } from 'react'

const projectsData: {
  title: string
  description: string
  imageURL: string
  images?: string[]
  github: string
  live?: string
  tags: string[]
}[] = [
  {
    title: 'Cricket Scorer App',
    description: 'A Next.js cricket scoring app to create players and teams, run custom matches with custom balls per over, mark live scores, and share with friends. Users can manage their profile and sign in with Google OAuth.',
    imageURL: '/projects/cricketscorer/crick1.png',
    images: [
      '/projects/cricketscorer/crick1.png',
      '/projects/cricketscorer/cric2.png',
      '/projects/cricketscorer/cric3.png',
      '/projects/cricketscorer/crick4.png',
      '/projects/cricketscorer/crick5.png',
      '/projects/cricketscorer/crick6.png',
      '/projects/cricketscorer/crick%207.png',
    ],
    github: 'https://github.com/Ishan-Tharusha/CricketScorer',
    live: 'https://cricket-scorer-nu.vercel.app/',
    tags: ['Next.js', 'React', 'TypeScript', 'Google OAuth'],
  },
  {
    title: 'Tic-Tac-Toe Game',
    description: 'A classic Tic-Tac-Toe game built with React.js as part of my React course. Interactive gameplay with a clean UI.',
    imageURL: '/projects/tic-tac-toe.png',
    github: '#',
    live: 'https://react-js-tic-tac-toe-project.vercel.app/',
    tags: ['React', 'JavaScript'],
  },
  {
    title: 'Investment Calculator',
    description: 'A React course project—investment calculator app to project returns over time with user-defined initial investment, annual contribution, and expected return.',
    imageURL: '/projects/investment%20calculator.png',
    github: '#',
    live: 'https://react-invesment-calculator.vercel.app/',
    tags: ['React', 'JavaScript'],
  },
  {
    title: 'Food Menu Web Application',
    description: 'A backend food menu web application using ASP.NET Core with RESTful APIs for CRUD operations on food items and categories. Integrated Entity Framework Core for data access.',
    imageURL: '/projects/food%20menu%20app.png',
    github: '#',
    tags: ['.NET', 'ASP.NET Core', 'C#', 'REST API', 'Entity Framework'],
  },
  {
    title: 'Online Text Editor',
    description: 'A web-based text editor built with ASP.NET Core MVC supporting CRUD operations to create, edit, and save documents online. Uses Entity Framework Core for data persistence.',
    imageURL: '/projects/Online%20Text%20Editor%20-%20ASP.NET%20Core%20MV.png',
    github: '#',
    tags: ['.NET', 'ASP.NET Core MVC', 'C#', 'Entity Framework', 'REST API'],
  },
  {
    title: 'Online Car Rental Service',
    description: 'A full-stack car rental web application with admin and employee panels for managing bookings, users, and vehicle availability. Built with the MERN stack with RESTful APIs.',
    imageURL: '/projects/Online%20Car%20Rental%20Service%20-%20MERN%20Stack.png',
    github: '#',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'MERN Stack'],
  },
  {
    title: 'Social Media Web App',
    description: 'A social media platform with user registration, posting, and follow/unfollow features. Built with a modern React frontend, Spring Boot RESTful backend, and MySQL for data management.',
    imageURL: '/projects/Social%20Media%20Web%20App%20-%20React%20%26%20Spring%20Boot.png',
    github: '#',
    tags: ['React', 'Spring Boot', 'Java', 'MySQL', 'Axios'],
  },
]

const allTags = (() => {
  const seenLower = new Set<string>()
  const result: string[] = []
  for (const tag of projectsData.flatMap((p) => p.tags)) {
    const t = tag.trim()
    if (!t) continue
    const key = t.toLowerCase()
    if (!seenLower.has(key)) {
      seenLower.add(key)
      result.push(t)
    }
  }
  return result.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
})()

const LiveIndicator = () => (
  <span className="relative flex h-1.5 w-1.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
  </span>
)

// Project card with hover tilt
function ProjectCard({
  project,
  onImageClick,
}: {
  project: typeof projectsData[0]
  onImageClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 12
    cardRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
    cardRef.current.style.boxShadow = `
      ${-x * 2}px ${y * 2}px 40px rgba(139,92,246,0.25),
      0 20px 60px rgba(0,0,0,0.3)
    `
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
    cardRef.current.style.boxShadow = ''
  }

  return (
    <div
      ref={cardRef}
      className="glass-card rounded-2xl overflow-hidden transition-all duration-200 h-full flex flex-col"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <button
        type="button"
        onClick={onImageClick}
        className="group relative w-full h-48 overflow-hidden flex-shrink-0 focus:outline-none"
        title={`View images: ${project.title}`}
      >
        <Image
          src={project.imageURL}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={80}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        {/* View images badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
          <ImageIcon className="w-3 h-3" />
          <span>
            {project.images?.length ? `${project.images.length} images` : 'View'}
          </span>
        </div>
        {/* Live badge */}
        {project.live && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-xs text-white/90">
            <LiveIndicator />
            <span>Live</span>
          </div>
        )}
      </button>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-base font-bold text-foreground leading-tight">{project.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill text-[10px]">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2 pt-1 border-t border-border/30">
          {project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${project.title} on GitHub`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-violet-400 transition-colors"
            >
              <FaGithub className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${project.title} live demo`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors ml-auto"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Live Demo</span>
              <FaExternalLinkAlt className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showAll, setShowAll] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<{
    src: string
    title: string
    images?: string[]
    currentIndex?: number
  } | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    if (!lightboxImage) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null)
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [lightboxImage])

  const lightboxImages = lightboxImage?.images ?? (lightboxImage ? [lightboxImage.src] : [])
  const lightboxCurrentSrc = lightboxImages[slideIndex] ?? lightboxImage?.src ?? ''
  const hasMultipleImages = lightboxImages.length > 1

  useEffect(() => {
    if (lightboxImage?.images && lightboxImage.currentIndex != null) {
      setSlideIndex(lightboxImage.currentIndex)
    } else {
      setSlideIndex(0)
    }
  }, [lightboxImage?.title, lightboxImage?.currentIndex, lightboxImage?.images])

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projectsData
    const selectedLower = selectedTags.map((t) => t.toLowerCase())
    return projectsData.filter((project) =>
      selectedLower.every((tag) =>
        project.tags.some((pt) => pt.trim().toLowerCase() === tag)
      )
    )
  }, [selectedTags])

  const projectsToDisplay = useMemo(() => {
    if (showAll) return filteredProjects
    return filteredProjects.slice(0, 6)
  }, [filteredProjects, showAll])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          backgroundImage: 'url(/backgrounds/projects-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.10,
        }}
      />

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at 16% 76%, rgba(6, 182, 212, 0.09), transparent 38%), radial-gradient(ellipse at 86% 18%, rgba(139, 92, 246, 0.09), transparent 42%), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.012) 0 1px, transparent 1px 16px)', backgroundSize: 'auto, auto, auto' }}>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-cyan-500/6 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-semibold text-violet-400">Projects</p>
          <h2 title="My Projects" className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="gradient-text">Featured</span>{' '}
            <span className="text-foreground dark:text-white">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of innovative projects showcasing technical expertise & creativity.
          </p>
          <p className="text-xs font-mono-code text-muted-foreground/60">
            {projectsData.length} projects total
          </p>
        </motion.div>

        {/* Tag filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="glass-card rounded-2xl p-5 w-full max-w-3xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Tags className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-medium text-muted-foreground font-mono-code">filter by technology</span>
                {selectedTags.length > 0 && (
                  <button
                    title="Clear all filters"
                    onClick={() => setSelectedTags([])}
                    className="ml-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-violet-400 transition-colors"
                  >
                    <X className="w-3 h-3" /> clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    title={`Filter by ${tag}`}
                    onClick={() => toggleTag(tag)}
                    className={`tag-pill cursor-pointer transition-all duration-200 text-xs ${
                      selectedTags.includes(tag) ? 'active bg-violet-500/25 border-violet-400 text-violet-200' : ''
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground font-mono-code text-sm">
                {'// No projects match the selected filters'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {projectsToDisplay.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <ProjectCard
                    project={project}
                    onImageClick={() =>
                      setLightboxImage({
                        src: project.imageURL,
                        title: project.title,
                        images: project.images,
                        currentIndex: 0,
                      })
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show more / less */}
        {filteredProjects.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowAll((v) => !v)}
              className="btn-neon px-8 py-3 rounded-xl text-sm font-semibold shadow-violet"
            >
              {showAll
                ? 'Show Less'
                : `Show All ${filteredProjects.length} Projects`}
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 z-10 rounded-full glass p-2.5 text-white hover:text-violet-400 transition-colors focus:outline-none"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-medium text-white/80 font-mono-code">
              {lightboxImage.title}
              {hasMultipleImages && (
                <span className="ml-2 text-violet-400">
                  ({slideIndex + 1}/{lightboxImages.length})
                </span>
              )}
            </p>

            <div className="relative flex w-full items-center gap-3">
              {hasMultipleImages && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSlideIndex((i) => (i === 0 ? lightboxImages.length - 1 : i - 1))
                  }}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full glass p-2 text-white hover:text-violet-400 transition-colors md:-left-14 focus:outline-none"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              <div className="relative min-h-[50vh] max-h-[80vh] w-full overflow-auto rounded-xl border border-violet-500/20 bg-black/50 flex items-center justify-center flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={lightboxCurrentSrc}
                  src={lightboxCurrentSrc}
                  alt={`${lightboxImage.title} - image ${slideIndex + 1}`}
                  className="max-h-[80vh] w-auto max-w-full object-contain"
                  style={{ height: 'auto' }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {hasMultipleImages && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSlideIndex((i) => (i === lightboxImages.length - 1 ? 0 : i + 1))
                  }}
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full glass p-2 text-white hover:text-violet-400 transition-colors md:-right-14 focus:outline-none"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {hasMultipleImages && (
              <div className="flex gap-1.5 mt-1">
                {lightboxImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSlideIndex(idx) }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === slideIndex ? 'w-6 bg-violet-400' : 'w-1.5 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
