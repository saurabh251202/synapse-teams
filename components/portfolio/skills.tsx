'use client'

import { motion } from 'framer-motion'
import { Paintbrush, Compass, Code2, Terminal, Wrench, BarChart3, Sparkles } from 'lucide-react'

interface SkillCategory {
  title: string
  icon: any
  skills: string[]
  accentClass: string
  bgClass: string
  borderClass: string
  colorTheme: string
}

const skillsData: SkillCategory[] = [
  {
    title: 'Design',
    icon: Paintbrush,
    skills: ['UX Design', 'UI Design', 'Wireframing', 'Prototyping', 'Responsive Design', 'Design Systems'],
    accentClass: 'text-primary',
    bgClass: 'bg-primary/5',
    borderClass: 'border-primary/15',
    colorTheme: 'indigo',
  },
  {
    title: 'Research',
    icon: Compass,
    skills: ['User Research', 'Information Architecture', 'Journey Mapping', 'Accessibility'],
    accentClass: 'text-accent',
    bgClass: 'bg-accent/5',
    borderClass: 'border-accent/15',
    colorTheme: 'cyan',
  },
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['HTML', 'CSS', 'JavaScript'],
    accentClass: 'text-emerald',
    bgClass: 'bg-emerald/5',
    borderClass: 'border-emerald/15',
    colorTheme: 'emerald',
  },
  {
    title: 'Programming',
    icon: Terminal,
    skills: ['Java'],
    accentClass: 'text-sky',
    bgClass: 'bg-sky/5',
    borderClass: 'border-sky/15',
    colorTheme: 'sky',
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['Figma', 'Git', 'GitHub', 'VS Code'],
    accentClass: 'text-amber',
    bgClass: 'bg-amber/5',
    borderClass: 'border-amber/15',
    colorTheme: 'amber',
  },
  {
    title: 'Product',
    icon: BarChart3,
    skills: ['Customer Success', 'Customer Onboarding', 'KPI Monitoring', 'Team Collaboration', 'Cross Functional Communication'],
    accentClass: 'text-violet',
    bgClass: 'bg-violet/5',
    borderClass: 'border-violet/15',
    colorTheme: 'violet',
  },
]

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  }

  return (
    <section id="skills" className="py-24 px-6 relative bg-synapse-bg border-t border-synapse-border/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald/8 border border-emerald/20 text-[10px] text-emerald font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>Capability Index</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Skills & Competencies
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald to-accent rounded-full mt-4" />
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`p-6 rounded-2xl bg-synapse-surface border ${category.borderClass} hover:border-synapse-border-2 transition-all flex flex-col justify-between group hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)]`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-synapse-border/40">
                    <div className={`w-10 h-10 rounded-xl ${category.bgClass} flex items-center justify-center shrink-0 border border-synapse-border/40 group-hover:scale-105 transition-transform`}>
                      <Icon className={`w-5 h-5 ${category.accentClass}`} />
                    </div>
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider font-mono">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Tag Grid */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => {
                      // Custom hover shadows / outlines depending on theme
                      const hoverStyle =
                        category.colorTheme === 'indigo'
                          ? 'hover:border-primary/50 hover:bg-primary/5 hover:text-primary'
                          : category.colorTheme === 'cyan'
                          ? 'hover:border-accent/50 hover:bg-accent/5 hover:text-accent'
                          : category.colorTheme === 'emerald'
                          ? 'hover:border-emerald/50 hover:bg-emerald/5 hover:text-emerald'
                          : category.colorTheme === 'sky'
                          ? 'hover:border-sky/50 hover:bg-sky/5 hover:text-sky'
                          : category.colorTheme === 'amber'
                          ? 'hover:border-amber/50 hover:bg-amber/5 hover:text-amber'
                          : 'hover:border-violet/50 hover:bg-violet/5 hover:text-violet'

                      return (
                        <span
                          key={sIdx}
                          className={`px-3 py-1.5 rounded-xl bg-synapse-surface-2 border border-synapse-border text-xs font-semibold text-text-secondary transition-all select-none ${hoverStyle}`}
                        >
                          {skill}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom interactive indicator line */}
                <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-synapse-border-2 to-synapse-border group-hover:w-full transition-all duration-300" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
