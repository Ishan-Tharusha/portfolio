'use client'

import { Variants, motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin, Copy, Check } from 'lucide-react'
import { FC, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { FaGithub, FaLinkedin, FaPaperPlane, FaSpinner } from 'react-icons/fa'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactUs: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus(''), 5000)
    }
  }

  const copyToClipboard = (text: string, field: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied!`)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4 text-violet-400" />,
      label: 'Email',
      value: 'Ishantharusha02@gmail.com',
      field: 'email',
      href: 'mailto:Ishantharusha02@gmail.com',
    },
    {
      icon: <Phone className="w-4 h-4 text-cyan-400" />,
      label: 'Phone',
      value: '+94 78 673 3876',
      field: 'phone',
      href: 'tel:+94786733876',
    },
    {
      icon: <MapPin className="w-4 h-4 text-emerald-400" />,
      label: 'Location',
      value: 'Sri Lanka',
      field: null,
      href: null,
    },
  ]

  const socialLinks = [
    { href: 'https://github.com/Ishan-Tharusha', icon: <FaGithub className="w-5 h-5" />, label: 'GitHub', color: 'hover:text-violet-400 hover:border-violet-400/50 hover:bg-violet-500/10' },
    { href: 'https://www.linkedin.com/in/ishantharusha', icon: <FaLinkedin className="w-5 h-5" />, label: 'LinkedIn', color: 'hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10' },
  ]

  const inputFields = [
    { name: 'name', label: 'Your Name', type: 'text', icon: <MessageCircle className="w-4 h-4" /> },
    { name: 'email', label: 'Email Address', type: 'email', icon: <Mail className="w-4 h-4" /> },
    { name: 'subject', label: 'Subject', type: 'text', icon: <MessageCircle className="w-4 h-4" /> },
  ]

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-cyan-500/6 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="code-tag text-violet-accent">{'<Contact />'}</p>
          <h2 title="Connect With Me" className="text-4xl sm:text-5xl font-black tracking-tight">
            <span className="gradient-text">Let&apos;s</span>{' '}
            <span className="text-foreground dark:text-white">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Have a project in mind or a question? Reach out and let&apos;s turn your ideas into reality.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Availability status */}
            <div className="glass-card rounded-2xl p-6 space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="available-badge">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <code>Available for hire</code>
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Ready to collaborate on your next project
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I&apos;m currently open to new opportunities. Whether it&apos;s a full-time role, freelance project, or just a chat about tech — feel free to reach out!
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 4 }}
                  className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted/30 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono-code text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-foreground hover:text-violet-400 transition-colors font-medium truncate block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground font-medium">{item.value}</p>
                    )}
                  </div>
                  {item.field && (
                    <button
                      onClick={() => copyToClipboard(item.value, item.field!, item.label)}
                      className="flex-shrink-0 text-muted-foreground hover:text-violet-400 transition-colors p-1.5 rounded-lg hover:bg-violet-500/10"
                      title={`Copy ${item.label}`}
                    >
                      {copiedField === item.field ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <p className="text-xs font-mono-code text-muted-foreground uppercase tracking-wider">// Connect on</p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl text-sm text-muted-foreground border border-border/50 transition-all duration-200 ${link.color}`}
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-7 space-y-5" aria-label="Contact Form">
              <h3 className="text-lg font-bold text-foreground font-mono-code">
                <span className="text-violet-400">{'>'}</span> Send a message
              </h3>

              {/* Input fields */}
              {inputFields.map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                >
                  <label className="block text-xs font-mono-code text-muted-foreground mb-1.5 uppercase tracking-wider">
                    {field.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                      {field.icon}
                    </span>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleChange}
                      placeholder={field.label}
                      required
                      aria-label={field.label}
                      className="input-neon w-full pl-9 pr-4 py-2.5 bg-background/50 text-foreground text-sm rounded-xl border border-border/50 transition-all duration-200 placeholder:text-muted-foreground/40 focus:bg-background/80"
                    />
                  </div>
                </motion.div>
              ))}

              {/* Message textarea */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.24 }}
              >
                <label className="block text-xs font-mono-code text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or question..."
                  required
                  aria-label="Message"
                  className="input-neon w-full px-4 py-3 bg-background/50 text-foreground text-sm rounded-xl border border-border/50 h-32 resize-none transition-all duration-200 placeholder:text-muted-foreground/40 focus:bg-background/80"
                />
              </motion.div>

              {/* Submit button */}
              <motion.button
                title={isSubmitting ? 'Sending message...' : 'Send message'}
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-neon w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-violet"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" /> Send Message
                  </>
                )}
              </motion.button>

              {/* Status message */}
              {status && (
                <motion.p
                  className={`text-center text-sm font-mono-code ${
                    status === 'success' ? 'text-emerald-400' : 'text-red-400'
                  }`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {status === 'success'
                    ? '✓ Message sent successfully!'
                    : '✗ Failed to send. Please try again.'}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
