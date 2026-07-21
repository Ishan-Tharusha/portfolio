'use client'

import { motion } from 'framer-motion'
import { FC, JSX } from 'react'
import Image from 'next/image'
import { Timeline as TimelineComponent } from '@/components/ui/timeline'
import { FaBook, FaGraduationCap, FaCheckCircle } from 'react-icons/fa'

export interface TimelineItem {
  id: number
  type: 'work' | 'project'
  title: string
  company: string
  location: string
  date: string
  imageURL: string
  description: string
  achievements: string[]
  icon: JSX.Element
  companyIcon: JSX.Element
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'B.Sc. (Hons) in Information Technology',
    company: 'Sri Lanka Institute of Information Technology',
    location: 'Sri Lanka',
    imageURL: '/SLIIT_Logo_Crest.png',
    date: '2022 – 2026',
    description: 'Pursuing a Bachelor of Science (Honours) degree in Information Technology, gaining in-depth knowledge in software engineering, web development, databases, and cloud computing.',
    achievements: [
      'Built full-stack web applications using ASP.NET Core, Node.js, React, and Spring Boot',
      'Designed RESTful APIs and implemented authentication and validation mechanisms',
      'Managed MongoDB and MySQL databases for various academic and personal projects',
      'Developed responsive user interfaces and integrated frontend and backend systems',
    ],
    icon: <FaBook className="w-6 h-6 text-violet-400" />,
    companyIcon: <FaGraduationCap className="w-8 h-8 text-violet-400" />,
  },
  {
    id: 2,
    type: 'work',
    title: 'G.C.E. Advanced Level – Physical Science Stream',
    company: 'Dudley Senanayake Central College',
    location: 'Sri Lanka',
    imageURL: '/dscc%20logo.jpg',
    date: '2016 – 2018',
    description: 'Completed G.C.E. Advanced Level examinations in the Physical Science stream, building a strong foundation in mathematics and sciences.',
    achievements: [],
    icon: <FaBook className="w-6 h-6 text-cyan-400" />,
    companyIcon: <FaGraduationCap className="w-8 h-8 text-cyan-400" />,
  },
]

export const TimelineElement: FC<{ item: TimelineItem; index: number }> = ({ item, index }) => (
  <div className="space-y-5" key={index}>
    {/* Institution header */}
    <div className="flex items-start gap-4">
      {item.type === 'work' && item.imageURL && (
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-md" />
          <Image
            src={item.imageURL}
            alt={`${item.company} Logo`}
            width={56}
            height={56}
            className="relative rounded-xl border border-violet-500/20 bg-card p-1.5 shadow-violet object-contain"
          />
        </div>
      )}
      <div className="space-y-1">
        <h3 title={item.title} className="text-lg font-bold text-foreground leading-tight">
          {item.title}
        </h3>
        <p className="text-sm text-violet-400 font-medium font-mono-code">{item.company}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono-code">
          <span>📍 {item.location}</span>
          <span>·</span>
          <span>{item.date}</span>
        </div>
      </div>
    </div>

    {/* Description */}
    <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-violet-500/30 pl-4">
      {item.description}
    </p>

    {/* Achievements */}
    {item.achievements.length > 0 && (
      <ul className="space-y-2">
        {item.achievements.map((ach) => (
          <li key={ach} className="flex items-start gap-2 text-sm text-foreground/80">
            <FaCheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{ach}</span>
          </li>
        ))}
      </ul>
    )}

    {item.type === 'project' && (
      <div className="w-full mt-4">
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden border border-violet-500/20">
          <Image
            src={item.imageURL}
            alt={`${item.title} Architecture`}
            className="object-contain"
            loading="lazy"
            fill
          />
        </div>
      </div>
    )}
  </div>
)

const Timeline: FC = () => {
  const timelineContent = timelineData.map((item) => ({
    title: item.date,
    content: <TimelineElement key={item.id} item={item} index={item.id} />,
  }))

  return (
    <section id="education" className="relative py-24 text-foreground transition-colors overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-500/6 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="code-tag text-violet-accent">{'<Education />'}</p>
          <h2 title="Education" className="text-4xl sm:text-5xl font-black tracking-tight">
            <span className="gradient-text">Academic</span>{' '}
            <span className="text-foreground dark:text-white">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My educational background and the foundation that drives my development career.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full"
        >
          <TimelineComponent data={timelineContent} />
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline
