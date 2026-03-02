'use client'

import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { Badge } from '../ui/badge'
import { BentoGrid, BentoGridItem } from '../ui/bento-grid'
import { Tags, X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'

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
    description: 'A backend food menu web application using ASP.NET Core with RESTful APIs for CRUD operations on food items and categories. Integrated Entity Framework Core for data access and controller-based architecture for scalability.',
    imageURL: '/projects/food%20menu%20app.png',
    github: '#',
    tags: ['.NET', 'ASP.NET Core', 'C#', 'REST API', 'Entity Framework'],
  },
  {
    title: 'Online Text Editor',
    description: 'A web-based text editor built with ASP.NET Core MVC supporting CRUD operations to create, edit, and save documents online. Uses Entity Framework Core for data persistence with a responsive UI.',
    imageURL: '/projects/Online%20Text%20Editor%20-%20ASP.NET%20Core%20MV.png',
    github: '#',
    tags: ['.NET', 'ASP.NET Core MVC', 'C#', 'Entity Framework', 'REST API'],
  },
  {
    title: 'Online Car Rental Service',
    description: 'A full-stack car rental web application with admin and employee panels for managing bookings, users, and vehicle availability. Built with the MERN stack with RESTful APIs, MongoDB, React Router, and CRUD operations.',
    imageURL: '/projects/Online%20Car%20Rental%20Service%20-%20MERN%20Stack.png',
    github: '#',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'MERN Stack'],
  },
  {
    title: 'Social Media Web App',
    description: 'A social media platform with user registration, posting, and follow/unfollow features. Built with a modern React frontend, Spring Boot RESTful backend, Axios for API communication, and MySQL for data management.',
    imageURL: '/projects/Social%20Media%20Web%20App%20-%20React%20%26%20Spring%20Boot.png',
    github: '#',
    tags: ['React', 'Spring Boot', 'Java', 'MySQL', 'Axios'],
  },
]

// Extract all unique tags from projects (trimmed, no duplicates, case-insensitive dedupe)
const allTags = (() => {
  const seenLower = new Set<string>()
  const result: string[] = []
  for (const tag of projectsData.flatMap(project => project.tags)) {
    const t = tag.trim()
    if (!t) continue
    const key = t.toLowerCase()
    if (!seenLower.has(key)) {
      seenLower.add(key)
      result.push(t)
    }
  }
  return result.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
})();

const LiveIndicator = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
  </span>
)

const VideoIndicator = () => (
  <svg fill="#000000" width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>youtube</title> <path d="M12.932 20.459v-8.917l7.839 4.459zM30.368 8.735c-0.354-1.301-1.354-2.307-2.625-2.663l-0.027-0.006c-3.193-0.406-6.886-0.638-10.634-0.638-0.381 0-0.761 0.002-1.14 0.007l0.058-0.001c-0.322-0.004-0.701-0.007-1.082-0.007-3.748 0-7.443 0.232-11.070 0.681l0.434-0.044c-1.297 0.363-2.297 1.368-2.644 2.643l-0.006 0.026c-0.4 2.109-0.628 4.536-0.628 7.016 0 0.088 0 0.176 0.001 0.263l-0-0.014c-0 0.074-0.001 0.162-0.001 0.25 0 2.48 0.229 4.906 0.666 7.259l-0.038-0.244c0.354 1.301 1.354 2.307 2.625 2.663l0.027 0.006c3.193 0.406 6.886 0.638 10.634 0.638 0.38 0 0.76-0.002 1.14-0.007l-0.058 0.001c0.322 0.004 0.702 0.007 1.082 0.007 3.749 0 7.443-0.232 11.070-0.681l-0.434 0.044c1.298-0.362 2.298-1.368 2.646-2.643l0.006-0.026c0.399-2.109 0.627-4.536 0.627-7.015 0-0.088-0-0.176-0.001-0.263l0 0.013c0-0.074 0.001-0.162 0.001-0.25 0-2.48-0.229-4.906-0.666-7.259l0.038 0.244z"></path> </g></svg>
)
const BlogIndicator = () => (
  <svg fill="#000000" height="15px" width="15px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.8,18H15c-0.6,0-1-0.4-1-1v-2.8c0-0.3,0.1-0.5,0.3-0.7L24.9,2.9c0.2-0.2,0.4-0.3,0.7-0.3l0,0c0.3,0,0.5,0.1,0.7,0.3 l2.8,2.8c0.4,0.4,0.4,1,0,1.4L18.5,17.7C18.3,17.9,18.1,18,17.8,18z"></path> </g> <path d="M19.9,19.1c-0.6,0.6-1.3,0.9-2.1,0.9H15c-1.7,0-3-1.3-3-3v-2.8c0-0.8,0.3-1.6,0.9-2.1L18.9,6H9<C7.3,6,6,7.3,6,9v14 c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-9.9L19.9,19.1z"></path> </g></svg>
)

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

  // Filter projects based on selected tags (case-insensitive match)
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projectsData
    const selectedLower = selectedTags.map(t => t.toLowerCase())
    return projectsData.filter(project =>
      selectedLower.every(tag =>
        project.tags.some(pt => pt.trim().toLowerCase() === tag)
      )
    )
  }, [selectedTags])

  // Determine which projects to display based on showAll state
  const projectsToDisplay = useMemo(() => {
    if (showAll) return filteredProjects
    return filteredProjects.slice(0, 5) // Show only first 5 projects when showAll is false
  }, [filteredProjects, showAll])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  let lastColSpan2Index = 0
  const isColSpan2 = (index: number) => {
    if (index === lastColSpan2Index + 3) {
      lastColSpan2Index = index
      return true
    }
    return false
  }

  const totalProjects = projectsData.length // only added: data to show

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-32 left-16 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-80 right-24 w-20 h-20 bg-blue-500/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-60 left-1/3 w-16 h-16 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-1/4 w-24 h-24 bg-blue-400/10 rounded-lg rotate-12 float-animation"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/2 translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-l from-blue-400/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 title="My Projects" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text text-transparent mb-4">
            My Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
            A collection of innovative projects showcasing technical expertise & creativity.
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            Total projects: {totalProjects}
          </p>
        </motion.div>

        {/* Tag Filter Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col items-center">
            <div className="relative bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Tags className="h-5 w-5 text-primary" />
                <h3 title="Filter by tags" className="text-lg font-medium">Filter by tags</h3>
                {selectedTags.length > 0 && (
                  <button
                    title="Clear all filters"
                    onClick={clearFilters}
                    className="text-sm text-muted-foreground hover:text-primary ml-2 underline transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    title={`Filter by ${tag} (Project)`}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1 rounded-full transition-all hover:scale-105 hover:shadow-md"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[26rem] [@media(max-width:425px)]:grid-cols-1">
        {projectsToDisplay.map((project, i) => {
          const isFifthProject = !showAll && i === 4
          const isHiddenProject = !showAll && i >= 5

          if (isHiddenProject) return null

          return (
            <div key={project.title} className={`relative ${isColSpan2(i) ? 'md:col-span-2' : ''}`}>
              <BentoGridItem
                title={project.title}
                description={
                  <div className="space-y-1 text-sm text-foreground">
                    <p className="line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-3 ">
                      <Badge asChild variant="secondary" className="gap-1 rounded-full">
                        <a
                          title={`View ${project.title} on GitHub`}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <FaGithub className="size-3" />
                          GitHub
                        </a>
                      </Badge>

                      {"live" in project && (
                        <a
                          title={`View ${project.title} live demo`}
                          href={project.live as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <LiveIndicator />
                          Live
                        </a>
                      )}
                      {"video" in project && (
                        <a
                          title={`Watch ${project.title} video demo`}
                          href={project.video as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50" >
                          <VideoIndicator />
                          Video
                        </a>
                      )}
                      {"blog" in project && (
                        <a
                          title={`Read ${project.title} blog post`}
                          href={project.blog as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50" >
                          <BlogIndicator />
                          Blog
                        </a>
                      )}
                    </div>
                  </div>
                }
                header={
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxImage({
                        src: project.imageURL,
                        title: project.title,
                        images: project.images,
                        currentIndex: 0,
                      })
                    }
                    className="group relative w-full h-full [@media(max-width:425px)]:min-h-[14rem] min-h-[12rem] rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    title={`View ${project.images?.length ? `${project.images.length} images` : 'full image'}: ${project.title}`}
                  >
                    <Image
                      src={project.imageURL}
                      alt={project.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={80}
                      fill
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 rounded-b-xl bg-black/60 py-2 text-sm font-medium text-white backdrop-blur-sm transition-opacity group-hover:bg-black/70">
                      <ImageIcon className="h-4 w-4" />
                      <span>
                        View {project.images?.length ? `(${project.images.length} images)` : 'image'}
                      </span>
                    </div>
                  </button>
                }
                className={isFifthProject ? 'blur-[3px] pointer-events-none' : ''}
              />

              {/* Show All Button overlay for 5th project */}
              {isFifthProject && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    title={`Show All Projects (${filteredProjects.length - 4})`}
                    onClick={toggleShowAll}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Show All ({filteredProjects.length}) Projects
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {/* Show message when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects match the selected tags. Try selecting different tags.
            </p>
          </div>
        )}

        {/* Show Less button when showAll is true */}
        {showAll && filteredProjects.length > 5 && (
          <div className="col-span-full text-center mt-8">
            <button
              title="Show Less Projects"
              onClick={toggleShowAll}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Show Less
            </button>
          </div>
        )}
      </BentoGrid>

      {/* Full-image lightbox modal with optional slideshow */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="View full project image"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-2 text-center text-sm font-medium text-white">
              {lightboxImage.title}
              {hasMultipleImages && (
                <span className="ml-2 text-white/70">
                  ({slideIndex + 1} / {lightboxImages.length})
                </span>
              )}
            </p>
            <div className="relative flex w-full items-center gap-2">
              {hasMultipleImages && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSlideIndex((i) => (i === 0 ? lightboxImages.length - 1 : i - 1))
                  }}
                  className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white md:-left-12"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
              )}
              <div className="relative min-h-[50vh] max-h-[85vh] w-full overflow-auto rounded-lg bg-black/50 flex items-center justify-center flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={lightboxCurrentSrc}
                  src={lightboxCurrentSrc}
                  alt={`${lightboxImage.title} - image ${slideIndex + 1}`}
                  className="max-h-[85vh] w-auto max-w-full object-contain"
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
                  className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white md:-right-12"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              )}
            </div>
            {hasMultipleImages && (
              <div className="mt-3 flex gap-1.5">
                {lightboxImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSlideIndex(idx)
                    }}
                    className={`h-2 rounded-full transition-all ${
                      idx === slideIndex ? 'w-6 bg-primary' : 'w-2 bg-white/40 hover:bg-white/60'
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
