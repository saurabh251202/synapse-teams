'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail, ChevronDown, Sparkles, Code2, Paintbrush, Target } from 'lucide-react'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
    },
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden bg-synapse-bg">
      {/* Background Interactive Nodes and Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Glow Spheres */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[10%] left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/10 rounded-full blur-[100px] sm:blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[40%] -right-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-accent/8 rounded-full blur-[90px] sm:blur-[130px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            x: [0, 15, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-[10%] left-1/3 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-violet/5 rounded-full blur-[80px] sm:blur-[120px]"
        />

        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Main Hero Contents */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge indicator */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-xs text-primary font-semibold mb-6 shadow-glow-primary hover:bg-primary/12 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>Available for Full-time Roles & Internships</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.08]"
          >
            <span className="gradient-text-primary">Saurabh Pathak</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-violet drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              Crafting SaaS Design & Code
            </span>
          </motion.h1>

          {/* Headline and Description */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-text-secondary uppercase tracking-widest mb-6"
          >
            <span className="flex items-center gap-1.5 bg-synapse-surface px-3 py-1.5 rounded-lg border border-synapse-border">
              <Paintbrush className="w-3.5 h-3.5 text-primary" /> UX/UI Design
            </span>
            <span className="flex items-center gap-1.5 bg-synapse-surface px-3 py-1.5 rounded-lg border border-synapse-border">
              <Code2 className="w-3.5 h-3.5 text-accent" /> Frontend Dev
            </span>
            <span className="flex items-center gap-1.5 bg-synapse-surface px-3 py-1.5 rounded-lg border border-synapse-border">
              <Target className="w-3.5 h-3.5 text-violet" /> Product Strategy
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            A product-minded UX Designer & Frontend Developer who designs components, builds interfaces, and shapes user-centric digital workflows for SaaS and B2B systems.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all shadow-glow-primary hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer"
            >
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-synapse-surface border border-synapse-border hover:bg-synapse-surface-2 hover:border-synapse-border-2 text-text-primary font-semibold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-primary" />
              Download Resume
            </a>

            <a
              href="https://github.com/saurabh251202"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass hover:bg-white/5 border-synapse-border hover:border-synapse-border-2 text-text-secondary hover:text-text-primary font-semibold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-accent" />
              View GitHub
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass hover:bg-white/5 border-synapse-border hover:border-synapse-border-2 text-text-secondary hover:text-text-primary font-semibold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-primary" />
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating abstract designer dashboard widget in background (pure premium aesthetics) */}
      <div className="absolute right-[-10%] bottom-[10%] w-[380px] h-[220px] rounded-2xl glass-surface border border-synapse-border shadow-elevated p-5 hidden xl:block pointer-events-none opacity-40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[10px] font-mono text-text-muted">Component.tsx</span>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-primary/10 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-synapse-border-2 rounded w-1/2" />
          <div className="h-3 bg-synapse-border-2 rounded w-5/6" />
          <div className="pt-4 flex items-center gap-3">
            <span className="w-12 h-6 rounded-full bg-primary/20" />
            <span className="w-8 h-4 rounded-lg bg-accent/20" />
            <span className="w-16 h-4 rounded-lg bg-synapse-border-2" />
          </div>
        </div>
      </div>

      {/* Floating designer mockup node chart widget (pure premium aesthetics) */}
      <div className="absolute left-[-5%] bottom-[15%] w-[300px] h-[180px] rounded-2xl glass-surface border border-synapse-border shadow-elevated p-5 hidden xl:block pointer-events-none opacity-40">
        <div className="text-[10px] font-mono text-text-muted mb-3 uppercase tracking-wider">User Journey Node</div>
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-xl bg-accent-muted flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-3 bg-text-primary/20 rounded w-4/5" />
            <div className="h-2 bg-text-muted/20 rounded w-3/5" />
          </div>
        </div>
        <div className="mt-4 border-t border-synapse-border pt-3 flex justify-between items-center text-[10px] font-mono text-emerald">
          <span>Match Score: 98%</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald animate-ping" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Explore Profile</span>
        <ChevronDown className="w-4 h-4 text-text-secondary" />
      </motion.div>
    </section>
  )
}
