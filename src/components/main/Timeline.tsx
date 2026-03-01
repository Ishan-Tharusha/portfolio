'use client'

import { motion } from 'framer-motion'
import { FC, JSX } from 'react'
import Image from 'next/image'
import { Timeline as TimelineComponent } from '@/components/ui/timeline'
import { FaBook, FaLaptopCode } from 'react-icons/fa'

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
    imageURL: '/sliit.png',
    date: '2022 – 2026',
    description: 'Pursuing a Bachelor of Science (Honours) degree in Information Technology, gaining in-depth knowledge in software engineering, web development, databases, and cloud computing.',
    achievements: [
      'Built full-stack web applications using ASP.NET Core, Node.js, React, and Spring Boot',
      'Designed RESTful APIs and implemented authentication and validation mechanisms',
      'Managed MongoDB and MySQL databases for various academic and personal projects',
      'Developed responsive user interfaces and integrated frontend and backend systems',
    ],
    icon: <FaBook className="w-6 h-6 text-primary" />,
    companyIcon: <FaLaptopCode className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 2,
    type: 'work',
    title: 'G.C.E. Advanced Level – Physical Science Stream',
    company: 'Dudley Senanayake Central College',
    location: 'Sri Lanka',
    imageURL: '',
    date: '2016 – 2018',
    description: 'Completed G.C.E. Advanced Level examinations in the Physical Science stream, building a strong foundation in mathematics and sciences.',
    achievements: [],
    icon: <FaBook className="w-6 h-6 text-secondary" />,
    companyIcon: <FaLaptopCode className="w-8 h-8 text-gray-500" />,
  },
]

export const TimelineElement: FC<{ item: TimelineItem; index: number }> = ({ item, index }) => (
  <div className="space-y-6" key={index}>
    <div className="flex items-center gap-4">
      {item.type === 'work' && item.imageURL && (
        <Image
          src={item.imageURL}
          alt={`${item.company} Logo`}
          width={48}
          height={48}
          className="rounded-md shadow bg-muted p-1"
        />
      )}
      <div>
        <h3 title={item.title} className="text-lg font-semibold text-foreground">{item.title}</h3>
        <p className="text-sm text-muted-foreground">
          {item.company} • {item.location}
        </p>
        <p className="text-sm text-muted-foreground">{item.date}</p>
      </div>
    </div>

    <p className="text-sm text-muted-foreground">{item.description}</p>

    <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
      {item.achievements.map((ach) => (
        <li key={ach}>{ach}</li>
      ))}
    </ul>

    {item.type === 'project' && (
      <div className="w-full mt-4">
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md bg-background">
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
    <section id="education" className="relative py-20 text-foreground transition-colors overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 left-20 w-20 h-20 bg-blue-500/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-40 right-1/4 w-16 h-16 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-blue-400/10 rounded-lg rotate-12 float-animation"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 right-1/2 translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-l from-blue-400/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 title="Education" className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text text-transparent mb-4">
            Education
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My academic background and educational journey.
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
