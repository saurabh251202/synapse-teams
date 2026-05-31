'use client'

import { motion } from 'framer-motion'
import { Award, Briefcase, MapPin, Eye, Zap, Layers, Sparkles } from 'lucide-react'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  }

  const focusCards = [
    {
      icon: Eye,
      title: 'Design Thinking',
      desc: 'Formulating solutions by deeply understanding users, prototyping iterations, and defining product systems.',
      color: 'text-primary',
      bg: 'bg-primary/5',
      border: 'border-primary/10',
    },
    {
      icon: Zap,
      title: 'Frontend Logic',
      desc: 'Translating Figma architectures into responsive, componentized React codebases with high performance and accessibility.',
      color: 'text-accent',
      bg: 'bg-accent/5',
      border: 'border-accent/10',
    },
    {
      icon: Layers,
      title: 'Business Alignment',
      desc: 'Bridging client pain points, onboarding metrics, and KPI monitors to ensure features drive tangible business value.',
      color: 'text-violet',
      bg: 'bg-violet/5',
      border: 'border-violet/10',
    },
  ]

  const domains = [
    { name: 'SaaS Platforms', color: 'from-indigo-500/20 to-indigo-500/5', text: 'text-indigo-400' },
    { name: 'EdTech Systems', color: 'from-emerald-500/20 to-emerald-500/5', text: 'text-emerald-400' },
    { name: 'B2B Workflows', color: 'from-cyan-500/20 to-cyan-500/5', text: 'text-cyan-400' },
    { name: 'FinTech Tools', color: 'from-rose-500/20 to-rose-500/5', text: 'text-rose-400' },
  ]

  return (
    <section id="about" className="py-24 px-6 relative bg-synapse-bg border-t border-synapse-border/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-[10px] text-accent font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Profile Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Engineering Intuitiveness
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Biography Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
              Hi, I'm Saurabh Pathak. I operate at the intersection of user experience design and code execution.
            </h3>
            
            <p className="text-text-secondary text-base leading-relaxed">
              I am a product-minded UX Designer and Frontend Developer with hands-on experience designing user-centered digital solutions across SaaS, EdTech, B2B, and FinTech domains. I thrive in teams that prioritize product quality, fast feedback cycles, and scalable component ecosystems.
            </p>

            <p className="text-text-secondary text-base leading-relaxed">
              My design approach starts with information architecture and wireframing, progressing through detail-oriented UI interfaces, and concluding with robust code implementation. By combining design thinking with developer tools, I build interfaces that feel fluid, premium, and performant.
            </p>

            {/* Meta Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-synapse-surface border border-synapse-border">
                <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center border border-primary/20">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider block">Location</span>
                  <span className="text-sm font-semibold text-text-primary">Bhopal, MP, India</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-synapse-surface border border-synapse-border">
                <div className="w-10 h-10 rounded-lg bg-accent/8 flex items-center justify-center border border-accent/20">
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider block">Specialty</span>
                  <span className="text-sm font-semibold text-text-primary">Product Design & React</span>
                </div>
              </div>
            </div>

            {/* Domain Badges */}
            <div className="pt-4">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-3">Domain Exposure</span>
              <div className="flex flex-wrap gap-3">
                {domains.map((domain, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2.5 rounded-xl bg-gradient-to-br ${domain.color} border border-synapse-border flex items-center gap-2`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${domain.text} bg-current`} />
                    <span className={`text-xs font-semibold ${domain.text}`}>{domain.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Focus Cards Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-5 space-y-5"
          >
            <h4 className="text-xs font-mono text-text-muted uppercase tracking-widest block pl-1">How I Add Value</h4>
            
            {focusCards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className={`p-5 rounded-2xl bg-synapse-surface border ${card.border} hover:border-synapse-border-2 transition-all flex gap-4 group hover:translate-x-1`}
                >
                  <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center shrink-0 border border-synapse-border/40 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-5.5 h-5.5 ${card.color}`} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-text-primary mb-1.5 group-hover:text-primary transition-colors">
                      {card.title}
                    </h5>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
