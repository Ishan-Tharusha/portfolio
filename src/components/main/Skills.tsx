'use client'

import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Skill, skills, skillCategories } from '@/constants'
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

// Category color map
const categoryColors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  languages: {
    border: 'border-violet-500/40 hover:border-violet-400/70',
    bg: 'hover:bg-violet-500/10',
    text: 'text-violet-400',
    glow: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]',
  },
  databases: {
    border: 'border-cyan-500/40 hover:border-cyan-400/70',
    bg: 'hover:bg-cyan-500/10',
    text: 'text-cyan-400',
    glow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]',
  },
  frontend: {
    border: 'border-pink-500/40 hover:border-pink-400/70',
    bg: 'hover:bg-pink-500/10',
    text: 'text-pink-400',
    glow: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]',
  },
  backend: {
    border: 'border-emerald-500/40 hover:border-emerald-400/70',
    bg: 'hover:bg-emerald-500/10',
    text: 'text-emerald-400',
    glow: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]',
  },
  tools: {
    border: 'border-amber-500/40 hover:border-amber-400/70',
    bg: 'hover:bg-amber-500/10',
    text: 'text-amber-400',
    glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]',
  },
}

const categoryTabColors: Record<string, string> = {
  languages: 'bg-violet-500/15 border-violet-500/40 text-violet-300 data-[active=true]:bg-violet-500/30 data-[active=true]:border-violet-400',
  databases: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 data-[active=true]:bg-cyan-500/30 data-[active=true]:border-cyan-400',
  frontend: 'bg-pink-500/15 border-pink-500/40 text-pink-300 data-[active=true]:bg-pink-500/30 data-[active=true]:border-pink-400',
  backend: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 data-[active=true]:bg-emerald-500/30 data-[active=true]:border-emerald-400',
  tools: 'bg-amber-500/15 border-amber-500/40 text-amber-300 data-[active=true]:bg-amber-500/30 data-[active=true]:border-amber-400',
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const skillsByCategory = useMemo(() => {
    const map = new Map<string, Skill[]>()
    const order = skillCategories.map((c) => c.id)
    uniqueSkills.forEach((skill) => {
      const cat = skill.category || 'tools'
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(skill)
    })
    return order
      .map((id) => ({
        categoryId: id,
        category: skillCategories.find((c) => c.id === id)!,
        items: map.get(id) || [],
      }))
      .filter((g) => g.items.length > 0)
  }, [])

  const filteredGroups = useMemo(() => {
    if (activeCategory === 'all') return skillsByCategory
    return skillsByCategory.filter((g) => g.categoryId === activeCategory)
  }, [activeCategory, skillsByCategory])

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center gap-12 py-24 px-4 sm:px-8 min-h-[600px] overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
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
        <p className="code-tag text-violet-accent">{'<Skills />'}</p>
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

      {/* Category filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 relative z-10"
      >
        <button
          onClick={() => setActiveCategory('all')}
          data-active={activeCategory === 'all'}
          className={`px-4 py-1.5 rounded-full border text-sm font-medium font-mono-code transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-violet-500/25 border-violet-400 text-violet-200'
              : 'bg-muted/30 border-border text-muted-foreground hover:border-violet-500/40 hover:text-violet-300'
          }`}
        >
          All
        </button>
        {skillsByCategory.map((group) => (
          <button
            key={group.categoryId}
            onClick={() => setActiveCategory(group.categoryId)}
            data-active={activeCategory === group.categoryId}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium font-mono-code transition-all duration-200 ${categoryTabColors[group.categoryId] || 'bg-muted/30 border-border text-muted-foreground'} ${activeCategory === group.categoryId ? '' : 'opacity-60 hover:opacity-100'}`}
          >
            {group.category.label.split(' ')[0]}
          </button>
        ))}
      </motion.div>

      {/* Skills grid */}
      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-10">
        <AnimatePresence mode="popLayout">
          {filteredGroups.map((group, groupIndex) => {
            const colors = categoryColors[group.categoryId] || categoryColors.tools
            return (
              <motion.div
                key={group.categoryId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
                className="space-y-5"
              >
                {/* Category header */}
                <div className="flex items-center gap-3">
                  <div className={`h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent`} />
                  <span className={`text-sm font-semibold font-mono-code ${colors.text} px-3 py-1 rounded-full border ${colors.border} bg-transparent`}>
                    {group.category.label}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {group.items.map((skill, index) => (
                    <motion.div
                      key={skill.skill_name}
                      title={skill.skill_name}
                      className={`group relative flex flex-col items-center justify-center p-4 w-28 sm:w-32 rounded-2xl glass-card cursor-default transition-all duration-300 ${colors.border} ${colors.bg} ${colors.glow}`}
                      role="listitem"
                      aria-label={skill.skill_name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      whileHover={{ scale: 1.06, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative flex flex-col items-center gap-3 z-10 w-full py-2">
                        <SkillDataProvider
                          src={skill.Image}
                          width={36}
                          height={36}
                          index={index}
                          className="group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                        />
                        <span className={`text-xs font-medium text-center leading-tight font-mono-code ${colors.text} opacity-90 group-hover:opacity-100`}>
                          {skill.skill_name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground font-mono-code"
        >
          {'// and plenty more technologies I\'m exploring & mastering every day'}
        </motion.p>
      </div>
    </section>
  )
}

export default Skills