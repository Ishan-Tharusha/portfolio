'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Skill, skills } from '@/constants'
import SkillDataProvider from '../sub/SkillDataProvider'

const uniqueSkills: Skill[] = Array.from(
  skills
    .reduce((map, skill) => {
      if (!map.has(skill.skill_name)) {
        map.set(skill.skill_name, { ...skill, width: 40, height: 40 })
      }
      return map
    }, new Map<string, Skill>())
    .values(),
)

const Skills = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      const slider = sliderRef.current
      if (!slider) return

      const cardWidth = slider.firstElementChild?.getBoundingClientRect().width ?? 128
      slider.scrollBy({ left: cardWidth + 16, behavior: 'smooth' })
    }, 1500)

    return () => window.clearInterval(interval)
  }, [isPaused])

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center gap-12 py-20 px-4 sm:px-8 min-h-[600px] overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(139, 92, 246, 0.055) 1px, transparent 1px), radial-gradient(ellipse at 78% 20%, rgba(6, 182, 212, 0.08), transparent 44%)', backgroundSize: '30px 30px, auto' }}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-cyan-500/6 rounded-full blur-[80px]" />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl relative z-10 space-y-4"
      >
        <p className="text-sm font-semibold text-violet-400">Skills</p>
        <h2
          id="skills-heading"
          title="Technical Skills"
          className="text-4xl sm:text-5xl font-black tracking-tight"
        >
          <span className="gradient-text">Technical</span>{' '}
          <span className="text-foreground dark:text-white">Arsenal</span>
        </h2>
        <p className="text-muted-foreground text-lg font-medium">
          A curated selection of my expertise in Full-Stack Development
        </p>
      </motion.div>

      {/* Single skills carousel */}
      <div
        className="w-full max-w-6xl mx-auto relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false)
        }}
      >
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="list"
          tabIndex={0}
          aria-label="Technical skills"
          onScroll={(event) => {
            const slider = event.currentTarget
            const loopWidth = (slider.children[uniqueSkills.length] as HTMLElement | undefined)?.offsetLeft ?? 0
            if (loopWidth > 0 && slider.scrollLeft >= loopWidth) slider.scrollLeft -= loopWidth
          }}
        >
          {[...uniqueSkills, ...uniqueSkills].map((skill, index) => {
            const skillIndex = index % uniqueSkills.length
            return (
              <motion.div
                key={`${skill.skill_name}-${index}`}
                title={skill.skill_name}
                className="group relative flex shrink-0 snap-center flex-col items-center justify-center p-4 w-28 sm:w-32 rounded-2xl glass-card cursor-default transition-all duration-300 border-violet-500/40 hover:border-violet-400/70 hover:bg-violet-500/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                role="listitem"
                aria-label={skill.skill_name}
                aria-hidden={index >= uniqueSkills.length}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: skillIndex * 0.04 }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative flex flex-col items-center gap-3 z-10 w-full py-2">
                  <SkillDataProvider
                    src={skill.Image}
                    width={36}
                    height={36}
                    index={skillIndex}
                    className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                  />
                  <span className="text-xs font-medium text-center leading-tight font-mono-code text-violet-400 opacity-90 group-hover:opacity-100">
                    {skill.skill_name}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground font-mono-code"
        >
          I'm always learning and exploring new technologies.
        </motion.p>
    </section>
  )
}

export default Skills