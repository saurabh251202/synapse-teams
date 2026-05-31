'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles, MapPin } from 'lucide-react'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validations
    if (!formState.name || !formState.email || !formState.message) {
      setErrorMessage('Please fill in all required fields.')
      setStatus('error')
      return
    }

    if (!/\S+@\S+\.\S+/.test(formState.email)) {
      setErrorMessage('Please provide a valid email address.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    // Simulate server side submission
    setTimeout(() => {
      setStatus('success')
      setFormState({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <section id="contact" className="py-24 px-6 relative bg-synapse-bg border-t border-synapse-border/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-[10px] text-accent font-mono uppercase tracking-wider mb-3">
            <Mail className="w-3 h-3 text-accent" />
            <span>Connect Workspace</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Get In Touch
          </h2>
          <p className="text-sm text-text-secondary mt-2 max-w-xl">
            Have an open role, project inquiry, or just want to chat? Send a message below.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          {/* Quick Contact Info Cards (Left Column) */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-text-primary">Contact Channels</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                Feel free to reach out via email directly, explore my codebases on GitHub, or submit the contact form.
              </p>

              {/* Direct Mail Card */}
              <a
                href="mailto:saurabhpathak2512@gmail.com"
                className="flex items-center gap-4 p-5 rounded-2xl bg-synapse-surface border border-synapse-border hover:border-synapse-border-2 hover:translate-y-[-2px] transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider block">Email Address</span>
                  <span className="text-xs sm:text-sm font-bold text-text-primary truncate block group-hover:text-primary transition-colors">
                    saurabhpathak2512@gmail.com
                  </span>
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href="https://github.com/saurabh251202"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-synapse-surface border border-synapse-border hover:border-synapse-border-2 hover:translate-y-[-2px] transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0 group-hover:scale-105 transition-transform">
                  <GithubIcon className="w-5 h-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider block">GitHub Repository</span>
                  <span className="text-xs sm:text-sm font-bold text-text-primary truncate block group-hover:text-accent transition-colors">
                    github.com/saurabh251202
                  </span>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-synapse-surface border border-synapse-border">
                <div className="w-11 h-11 rounded-xl bg-violet/10 flex items-center justify-center border border-violet/20 shrink-0">
                  <MapPin className="w-5 h-5 text-violet" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider block">Operating Base</span>
                  <span className="text-xs sm:text-sm font-bold text-text-primary block">
                    Bhopal, Madhya Pradesh, India
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle motivational quote/footer note inside left column */}
            <div className="p-5 rounded-2xl bg-synapse-surface-2 border border-synapse-border hidden lg:flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent shrink-0" />
              <span className="text-[10px] font-mono text-text-secondary leading-snug">
                "Combining analytical development with empathetic design to shape user interactions."
              </span>
            </div>
          </div>

          {/* Contact Form Console (Right Column) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-synapse-surface border border-synapse-border h-full flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 flex flex-col h-full justify-between"
                  >
                    <div className="space-y-4">
                      {/* Name field */}
                      <div>
                        <label htmlFor="name" className="text-[10px] font-mono text-text-secondary uppercase tracking-widest block mb-1.5 pl-1">
                          Name <span className="text-rose">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl bg-synapse-bg border border-synapse-border text-text-primary text-sm focus:border-primary focus:outline-none transition-all placeholder:text-text-muted/60"
                        />
                      </div>

                      {/* Email and Subject fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="text-[10px] font-mono text-text-secondary uppercase tracking-widest block mb-1.5 pl-1">
                            Email Address <span className="text-rose">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formState.email}
                            onChange={handleInputChange}
                            placeholder="name@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-synapse-bg border border-synapse-border text-text-primary text-sm focus:border-primary focus:outline-none transition-all placeholder:text-text-muted/60"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="text-[10px] font-mono text-text-secondary uppercase tracking-widest block mb-1.5 pl-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleInputChange}
                            placeholder="Inquiry or opportunity"
                            className="w-full px-4 py-3 rounded-xl bg-synapse-bg border border-synapse-border text-text-primary text-sm focus:border-primary focus:outline-none transition-all placeholder:text-text-muted/60"
                          />
                        </div>
                      </div>

                      {/* Message field */}
                      <div>
                        <label htmlFor="message" className="text-[10px] font-mono text-text-secondary uppercase tracking-widest block mb-1.5 pl-1">
                          Message <span className="text-rose">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formState.message}
                          onChange={handleInputChange}
                          placeholder="Tell me about your project, team requirements, or role specs..."
                          className="w-full px-4 py-3 rounded-xl bg-synapse-bg border border-synapse-border text-text-primary text-sm focus:border-primary focus:outline-none transition-all placeholder:text-text-muted/60 resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      {/* Error Banner */}
                      {status === 'error' && (
                        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                          <span className="font-semibold">{errorMessage}</span>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-glow-primary hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {status === 'sending' ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Establishing Connection...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-cyan-400" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  /* Success Feedback state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className="flex flex-col items-center justify-center text-center h-full gap-4 py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald/10 border-2 border-emerald flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-8 h-8 text-emerald" />
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <h4 className="text-lg font-bold text-text-primary">Transmission Success!</h4>
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">
                        Your message has been sent successfully. Saurabh will review your submission and reply shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-4 px-5 py-2.5 rounded-xl glass hover:bg-white/5 border-synapse-border text-text-primary text-xs font-bold transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
