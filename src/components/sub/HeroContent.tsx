'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa'
import { FC, useState, useEffect } from 'react'
import { NavbarButton } from '../ui/resizable-navbar'
import { TrackableContact } from '@/components/analytics/TrackableElement'
import Image from 'next/image'

const roles = [
  'Full-Stack Developer',
  'ASP.NET Core Engineer',
  'React & Next.js Dev',
  'Spring Boot Builder',
  'TypeScript Enthusiast',
]

const HeroContent: FC = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 65)
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, 35)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])

  const handleConnectClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-6 sm:px-10 lg:px-16 w-full max-w-7xl mx-auto pt-24 sm:pt-28 lg:pt-0"
    >
      {/* ── Left: Text Content ── */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 order-2 lg:order-1">
        {/* Available badge */}
        <motion.div variants={itemVariants}>
          <span className="available-badge">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <code>Available for hire</code>
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants} className="space-y-2">
          <p className="code-tag text-violet-accent">Hello, I'm</p>
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-none">
            <span className="gradient-text">Ishan</span>
            <br />
            <span className="text-foreground dark:text-white">Tharusha</span>
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div variants={itemVariants} className="h-10 flex items-center gap-2">
          <span className="code-tag text-muted-foreground">&gt;_</span>
          <span className="text-xl sm:text-2xl font-semibold font-mono-code text-violet-accent">
            {displayed}
          </span>
          <span className="w-0.5 h-6 bg-violet-700 dark:bg-violet-400 cursor-blink" />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-foreground/70 dark:text-muted-foreground max-w-xl leading-relaxed"
        >
          Passionate about building end-to-end web applications using{' '}
          <span className="text-violet-accent font-semibold">ASP.NET Core</span>,{' '}
          <span className="text-cyan-accent font-semibold">Node.js</span>,{' '}
          <span className="text-violet-accent font-semibold">React</span>, and{' '}
          <span className="text-cyan-accent font-semibold">Spring Boot</span>. Writing clean, maintainable code.
        </motion.p>

        {/* Tech pills */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {['C#', 'Java', 'TypeScript', 'ASP.NET', 'React', 'Node.js'].map((tech) => (
            <span key={tech} className="tag-pill">{tech}</span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
        >
          <button
            onClick={handleConnectClick}
            title="Let's Connect - Navigate to contact section"
            className="btn-neon px-7 py-3 flex items-center gap-2 text-sm font-semibold rounded-xl shadow-violet"
          >
            <span>Let&apos;s Connect</span>
            <span className="text-xs opacity-75">→</span>
          </button>

          <div className="flex items-center gap-2">
            <TrackableContact method="github">
              <NavbarButton
                title="Visit GitHub profile"
                variant="secondary"
                className="group glass-card border-0 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-violet"
                href="https://github.com/Ishan-Tharusha"
              >
                <FaGithub className="w-5 h-5 group-hover:text-violet-400 transition-colors" />
              </NavbarButton>
            </TrackableContact>

            <TrackableContact method="linkedin" title="Visit LinkedIn profile">
              <NavbarButton
                title="Visit LinkedIn profile"
                variant="secondary"
                className="group glass-card border-0 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-cyan"
                href="https://www.linkedin.com/in/ishantharusha"
              >
                <FaLinkedin title="Visit LinkedIn profile" className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              </NavbarButton>
            </TrackableContact>

            <NavbarButton
              title="Download Resume"
              variant="secondary"
              className="group glass-card border-0 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-violet"
              href="/resume.pdf"
            >
              <FaDownload className="w-4 h-4 group-hover:text-violet-400 transition-colors" />
            </NavbarButton>
          </div>
        </motion.div>
      </div>

      {/* ── Right: Profile Picture ── */}
      <motion.div
        variants={itemVariants}
        className="order-1 lg:order-2 flex-shrink-0 flex items-center justify-center"
      >
        <div className="relative">
          {/* Orbit ring animation */}
          <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute inset-[-12px] rounded-full border border-cyan-500/15 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

          {/* Glow rings */}
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-violet-500/30 via-transparent to-cyan-500/30 blur-md glow-ring" />

          {/* Profile picture */}
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-violet-500/40 shadow-violet-lg">
            <Image
              src="/profile_pic.jpg"
              alt="Ishan Tharusha - Full-Stack Developer"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 288px"
            />
            {/* Overlay shimmer */}
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 via-transparent to-transparent" />
          </div>

          {/* Floating badge - top right */}
          <motion.div
            className="absolute -top-4 -right-4 glass-card rounded-xl px-3 py-2 text-xs font-mono-code shadow-violet"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-violet-accent">{'<>'}</span>
            <span className="text-foreground/80 mx-1">Full-Stack</span>
            <span className="text-violet-accent">{'</>'}</span>
          </motion.div>

          {/* Floating badge - bottom left */}
          <motion.div
            className="absolute -bottom-4 -left-4 glass-card rounded-xl px-3 py-2 text-xs font-mono-code shadow-cyan"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span className="text-cyan-accent">SLIIT</span>
            <span className="text-muted-foreground mx-1">·</span>
            <span className="text-foreground/80">2022–2026</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs font-mono-code text-muted-foreground/60">scroll</span>
        <div className="w-5 h-8 border border-violet-500/30 rounded-full flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-2 bg-violet-500 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HeroContent
