import ContactUs from '@/components/main/ContactUs'
import Hero from '@/components/main/Hero'
import Projects from '@/components/main/Projects'
import ResumeSection from '@/components/main/Resume'
import Skills from '@/components/main/Skills'
import Timeline from '@/components/main/Timeline'
import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'
import CertificationsSection from '@/components/main/Certifications'
import { AnalyticsDebug } from '@/components/analytics/AnalyticsDebug'
import InteractiveWrapper from '@/components/main/InteractiveWrapper'

export const metadata: Metadata = {
  title: 'Ishan Tharusha - Full-Stack Developer Portfolio',
  description: 'Full-Stack Developer portfolio showcasing projects with ASP.NET Core, Node.js, React, and Spring Boot.',
  alternates: {
    canonical: 'https://hasan-ashab.vercel.app',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen" >
      {/* Hidden SEO content for better indexing */}
      <div className="sr-only">
        <h1>Ishan Tharusha - Full-Stack Developer Portfolio</h1>
        <p>
          Welcome to my portfolio. I am a Full-Stack Developer building web applications with
          ASP.NET Core, Node.js, React, and Spring Boot. Browse my projects, skills, and experience.
        </p>
      </div>

      <InteractiveWrapper>
        <Hero />
        <Skills />
        <ResumeSection />
        <Timeline />
        {/* <CertificationsSection /> */}
        <Projects />
        <ContactUs />
        <Toaster position="bottom-right" />
      </InteractiveWrapper>
      
      {/* Temporary test components for analytics - remove in production */}
      {/* <AnalyticsDebug /> */}
    </div>
  )
}
