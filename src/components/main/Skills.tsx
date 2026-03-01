'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
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

const Skills = () => {
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

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center gap-12 py-20 px-4 sm:px-8 min-h-[600px] overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-blue-400/10 rounded-lg rotate-12 float-animation"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-gradient-to-l from-blue-400/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl relative z-10"
      >
        <h2
          id="skills-heading"
          title="Technical Skills"
          className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text text-transparent mb-4"
        >
          Technical Skills
        </h2>
        <p className="text-lg text-muted-foreground font-medium">
          A curated selection of my expertise in Full-Stack Development
        </p>
      </motion.div>

      <div className="w-full max-w-6xl relative z-10 space-y-14">
        {skillsByCategory.map((group, groupIndex) => (
          <motion.div
            key={group.categoryId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            className="space-y-6"
          >
            {/* Section header with image */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pb-2 border-b border-primary/20">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-card/80 border border-primary/20 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src={group.category.image}
                  alt={group.category.imageAlt}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                {group.category.label}
              </h3>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {group.items.map((skill, index) => (
                <motion.div
                  key={skill.skill_name}
                  title={skill.skill_name}
                  className="group relative flex flex-col items-center p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-xl"
                  role="listitem"
                  aria-label={skill.skill_name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-primary/20 via-blue-500/10 to-transparent blur-sm"></div>
                  <div className="relative flex flex-col items-center gap-3 z-10">
                    <SkillDataProvider
                      src={skill.Image}
                      width={32}
                      height={32}
                      index={index}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-xs font-medium text-foreground text-center leading-tight line-clamp-2">
                      {skill.skill_name}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center text-base text-muted-foreground"
        >
          …and plenty more technologies I'm exploring & mastering every day.
        </motion.p>
      </div>
    </section>
  )
}

export default Skills