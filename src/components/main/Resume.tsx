'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { FaDownload, FaEye, FaEyeSlash } from 'react-icons/fa'
import { FaFilePdf } from 'react-icons/fa6'

const Document = dynamic(() => import('react-pdf').then((mod) => mod.Document), { ssr: false })
const Page = dynamic(() => import('react-pdf').then((mod) => mod.Page), { ssr: false })

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

const highlights = [
  { label: 'Frontend', value: 'React · Next.js · TypeScript · Tailwind', color: 'text-pink-400' },
  { label: 'Backend', value: 'ASP.NET Core · Node.js · Spring Boot', color: 'text-emerald-400' },
  { label: 'Languages', value: 'C# · Java · TypeScript · Python', color: 'text-violet-400' },
  { label: 'Databases', value: 'MongoDB · MySQL', color: 'text-cyan-400' },
  { label: 'Tools', value: 'Git · Docker · Postman · GitHub', color: 'text-amber-400' },
]

const ResumeSection = () => {
  const [error, setError] = useState<string | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [showPdf, setShowPdf] = useState(false)

  useEffect(() => {
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc =
        'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.3.31/build/pdf.worker.min.mjs'
    })
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const onDocumentLoadError = (error: Error) => {
    setError(error.message)
  }

  return (
    <section
      id="resume"
      className="relative py-24 px-6 flex flex-col items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-12 space-y-4 relative z-10"
      >
        <p className="code-tag text-violet-accent">{'<Resume />'}</p>
        <h2 title="My Resume" className="text-4xl sm:text-5xl font-black tracking-tight">
          <span className="gradient-text">My</span>{' '}
          <span className="text-foreground dark:text-white">Resume</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          View my professional qualifications and experience.
        </p>
      </motion.div>

      {/* Download hero card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mb-10 relative z-10"
      >
        <div className="glass-card rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600/30 to-cyan-600/30 flex items-center justify-center border border-violet-500/30 shadow-violet">
            <FaFilePdf className="w-10 h-10 text-violet-400" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-foreground mb-1">Ishan Tharusha — Resume 2026</h3>
            <p className="text-sm text-muted-foreground mb-3">Full-Stack Developer · SLIIT Graduate (2026)</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {highlights.map((h) => (
                <span key={h.label} className={`text-xs font-mono-code ${h.color} opacity-80`}>
                  {h.label}
                </span>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-neon px-5 py-2.5 flex items-center gap-2 text-sm rounded-xl shadow-violet"
            >
              <FaDownload className="text-sm" />
              Download
            </motion.a>
            <motion.button
              onClick={() => setShowPdf((v) => !v)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="glass-card px-5 py-2.5 flex items-center gap-2 text-sm rounded-xl text-muted-foreground hover:text-foreground transition-colors border-violet-500/20"
            >
              {showPdf ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              {showPdf ? 'Hide' : 'Preview'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Skills highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-4xl mb-10 relative z-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-card rounded-xl p-4 text-center space-y-1"
            >
              <p className={`text-xs font-bold font-mono-code ${h.color}`}>{h.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{h.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* PDF preview (expandable) */}
      {showPdf && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl glass-card rounded-2xl overflow-hidden relative z-10 border border-violet-500/20"
        >
          <div className="relative w-full overflow-y-auto">
            {error ? (
              <p className="text-destructive text-center text-lg p-8">Failed to load PDF: {error}</p>
            ) : (
              <Document
                file="/resume.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                className="flex flex-col items-center w-full"
              >
                {numPages !== null &&
                  Array.from(new Array(numPages), (_, index) => (
                    <Page
                      key={`page-${index + 1}`}
                      pageNumber={index + 1}
                      className="flex justify-center [&:not(:last-child)]:mb-2"
                      renderTextLayer
                      renderAnnotationLayer
                      width={Math.min(890, typeof window !== 'undefined' ? window.innerWidth - 40 : 1200)}
                    />
                  ))}
              </Document>
            )}
          </div>
        </motion.div>
      )}
    </section>
  )
}

export default ResumeSection