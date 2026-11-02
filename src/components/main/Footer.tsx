'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC } from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { TrackableElement, TrackableContact } from '@/components/analytics/TrackableElement'

const Footer: FC = () => {
  const socialLinks = [
    {
      href: 'https://github.com/Ishan-Tharusha',
      icon: <FaGithub className="w-4 h-4" />,
      label: 'GitHub',
      color: 'hover:text-violet-400 hover:border-violet-400/50 hover:bg-violet-500/10',
    },
    {
      href: 'https://www.linkedin.com/in/ishantharusha',
      icon: <FaLinkedin className="w-4 h-4" />,
      label: 'LinkedIn',
      color: 'hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10',
    },
  ]

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ]

  const techStack = ['ASP.NET Core', 'Node.js', 'React', 'Next.js', 'Spring Boot', 'TypeScript']

  return (
    <footer className="relative w-full border-t border-border/30 mt-4 overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at 24% 25%, rgba(139, 92, 246, 0.10), transparent 40%), radial-gradient(rgba(6, 182, 212, 0.06) 1px, transparent 1px)', backgroundSize: 'auto, 26px 26px' }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black gradient-text-static">Ishan Tharusha</h2>
              <p className="text-xs font-mono-code text-muted-foreground mt-1">
                Junior Full-Stack Developer
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building end-to-end web applications with modern technologies. Based in Sri Lanka, open to remote opportunities worldwide.
            </p>
            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <TrackableContact key={link.label} method={`footer-${link.label.toLowerCase()}`}>
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-2 glass-card rounded-xl text-xs text-muted-foreground border border-border/50 transition-all duration-200 ${link.color}`}
                    whileHover={{ y: -2 }}
                    aria-label={`Visit my ${link.label} profile`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </motion.a>
                </TrackableContact>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <TrackableElement
                    elementId={`footer-nav-${item.name.toLowerCase()}`}
                    elementText={`Footer: ${item.name}`}
                  >
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-violet-400 transition-colors duration-200 font-mono-code"
                      aria-label={`Navigate to ${item.name} section`}
                    >
                      {item.name}
                    </a>
                  </TrackableElement>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="tag-pill text-[10px]">{tech}</span>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground font-mono-code">
                📍 Sri Lanka · 🌍 Remote-friendly
              </p>
              <a
                href="mailto:Ishantharusha02@gmail.com"
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-mono-code"
              >
                Ishantharusha02@gmail.com
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs text-muted-foreground/60 font-mono-code">
            © {new Date().getFullYear()} Ishan Tharusha. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/40 font-mono-code">
            Built with{' '}
            <span className="text-violet-400/70">Next.js</span>
            {' · '}
            <span className="text-cyan-400/70">TypeScript</span>
            {' · '}
            <span className="text-pink-400/70">Tailwind CSS</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
