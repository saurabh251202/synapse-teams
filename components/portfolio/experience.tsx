'use client'

import { motion } from 'framer-motion'
import { Calendar, Building2, MapPin, LayoutGrid, Cpu, Route, Eye, Users2, Sparkles } from 'lucide-react'

const FigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
  </svg>
)

export default function Experience() {
  const responsibilities = [
    {
      icon: LayoutGrid,
      title: 'UX Design for Live Products',
      desc: 'Designed user experience architectures and interfaces for 5+ active products spanning EdTech, B2B, SaaS, and FinTech verticals.',
      badge: 'Multi-domain',
    },
    {
      icon: FigmaIcon,
      title: 'Scalable Figma Design Systems',
      desc: 'Created and maintained organized design systems, style guides, and reusable component libraries in Figma, streamlining collaboration between designers and devs.',
      badge: 'Figma Components',
    },
    {
      icon: Route,
      title: 'Information Architecture & Navigation',
      desc: 'Optimized complex workflows, navigation hierarchies, and user journeys to reduce churn and enhance feature discoverability.',
      badge: 'UX Research',
    },
    {
      icon: Eye,
      title: 'Interactive Wireframing & Prototyping',
      desc: 'Formulated low-fidelity wireframes and built high-fidelity interactive prototypes to validate design ideas with stakeholders and users.',
      badge: 'Rapid Prototyping',
    },
    {
      icon: Users2,
      title: 'Cross-functional Collaboration',
      desc: 'Partnered closely with engineering leads, product managers, and customer success teams to refine interfaces based on technical feasibility and business KPIs.',
      badge: 'Agile Teams',
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 18 },
    },
  }

  return (
    <section id="experience" className="py-24 px-6 relative bg-synapse-bg border-t border-synapse-border/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet/8 border border-violet/20 text-[10px] text-violet font-mono uppercase tracking-wider mb-3">
            <Calendar className="w-3 h-3" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Work Experience
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-violet to-primary rounded-full mt-4" />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-10 before:content-[''] before:absolute before:left-2 before:sm:left-[18px] before:top-2 before:bottom-2 before:w-[2px] before:bg-synapse-border before:rounded-full">
          {/* Main Node */}
          <div className="relative">
            {/* Timeline Pulsing Node */}
            <span className="absolute -left-[30px] sm:-left-[42px] top-1.5 w-6 h-6 rounded-full bg-[#05050f] border-2 border-primary flex items-center justify-center shadow-glow-primary">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            </span>

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-synapse-surface border border-synapse-border shadow-card hover:border-synapse-border-2 transition-all">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-synapse-border/40">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary">UX Design Intern</h3>
                    <p className="text-sm font-semibold text-text-secondary flex items-center gap-1.5 mt-0.5">
                      PixelPandas
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-semibold self-start md:self-center">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-synapse-surface-2 border border-synapse-border text-text-secondary">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> Aug 2025 – Nov 2025
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-synapse-surface-2 border border-synapse-border text-text-secondary">
                    <MapPin className="w-3.5 h-3.5 text-accent" /> Remote
                  </span>
                </div>
              </div>

              {/* Responsibilities list */}
              <div>
                <h4 className="text-xs font-mono text-text-muted uppercase tracking-widest block mb-4">Core Responsibilities</h4>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="space-y-6"
                >
                  {responsibilities.map((resp, index) => {
                    const Icon = resp.icon
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex gap-4 items-start group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-synapse-surface-2 border border-synapse-border flex items-center justify-center shrink-0 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                          <Icon className="w-4.5 h-4.5 text-text-secondary group-hover:text-primary transition-colors" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-4 flex-wrap">
                            <span className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                              {resp.title}
                            </span>
                            <span className="text-[10px] font-mono text-text-muted px-2 py-0.5 rounded bg-synapse-bg border border-synapse-border/40 uppercase">
                              {resp.badge}
                            </span>
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed font-medium">
                            {resp.desc}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
