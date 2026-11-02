'use client'

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  NavbarLogo,
  Navbar as NavbarWrapper,
} from '@/components/ui/resizable-navbar'
import { ThemeToggle } from '@/hooks/use-toogle'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaBriefcase, FaCode, FaEnvelope, FaProjectDiagram, FaUser } from 'react-icons/fa'
import { Button } from '../ui/button'
import { TrackableElement, TrackableContact } from '@/components/analytics/TrackableElement'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  const navItems = [
    { name: 'About', link: '#about', icon: <FaUser />, id: 'about' },
    { name: 'Skills', link: '#skills', icon: <FaCode />, id: 'skills' },
    { name: 'Education', link: '#education', icon: <FaBriefcase />, id: 'education' },
    { name: 'Projects', link: '#projects', icon: <FaProjectDiagram />, id: 'projects' },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracker
  useEffect(() => {
    const sectionIds = navItems.map((i) => i.id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}>
      <div className={`transition-all duration-500 ${isScrolled
        ? 'mx-4 mt-4'
        : 'mx-0 mt-0'
      }`}>
        <NavbarWrapper
          className={`flex flex-col items-center justify-between gap-4 transition-all duration-500 ${
            isScrolled
              ? 'mx-auto max-w-4xl px-0 py-0'
              : 'px-4 py-2 border-b border-transparent bg-transparent'
          }`}
        >
          <NavBody>
            <NavbarLogo isScrolled={isScrolled} />

            {/* Desktop nav items with active indicator */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    activeSection === item.id
                      ? 'text-violet-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-400 rounded-full" />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <TrackableContact method="navbar-contact">
                <Button
                  title="Contact me"
                  variant="default"
                  className="rounded-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 shadow-violet transition-all duration-300 hover:shadow-violet-lg"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <FaEnvelope className="mr-1" /> Contact
                </Button>
              </TrackableContact>
            </div>
          </NavBody>

          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo isScrolled={isScrolled} />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
              {navItems.map((item) => (
                <TrackableElement
                  key={`mobile-link-${item.name}`}
                  elementId={`mobile-nav-${item.name.toLowerCase()}`}
                  elementText={`Mobile Nav: ${item.name}`}
                >
                  <Link
                    href={item.link}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      document
                        .getElementById(item.link.slice(1))
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`relative text-sm flex gap-2 items-center py-2 px-3 rounded-lg transition-all ${
                      activeSection === item.id
                        ? 'text-violet-400 bg-violet-500/10'
                        : 'text-neutral-400 hover:text-foreground'
                    }`}
                  >
                    {item.icon} <span>{item.name}</span>
                    {activeSection === item.id && (
                      <span className="ml-auto w-1.5 h-1.5 bg-violet-400 rounded-full" />
                    )}
                  </Link>
                </TrackableElement>
              ))}
              <div className="flex w-full flex-col gap-4 pt-2 border-t border-border/50">
                <ThemeToggle />
                <TrackableContact method="mobile-navbar-contact">
                  <Button
                    title="Contact me"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-0"
                  >
                    <FaEnvelope className="mr-2" /> Contact Me
                  </Button>
                </TrackableContact>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </NavbarWrapper>
      </div>
    </div>
  )
}
