'use client'

import { motion } from 'framer-motion'
import { Award, Users, ExternalLink, Sparkles } from 'lucide-react'

export default function Leadership() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  }

  return (
    <section id="leadership" className="py-24 px-6 relative bg-synapse-bg border-t border-synapse-border/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose/8 border border-rose/20 text-[10px] text-rose font-mono uppercase tracking-wider mb-3">
            <Award className="w-3 h-3 text-rose" />
            <span>Community & Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Leadership & Volunteering
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-rose to-amber rounded-full mt-4" />
        </div>

        {/* Branded Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-synapse-surface border border-synapse-border hover:border-synapse-border-2 transition-all flex flex-col md:flex-row gap-8 items-center"
        >
          {/* Branded Icon Column */}
          <div className="relative shrink-0">
            {/* Colorful Outer Ring simulating GDSC Colors */}
            <div className="w-24 h-24 rounded-full border-4 border-transparent bg-gradient-to-tr from-rose to-amber p-1 flex items-center justify-center relative overflow-hidden shadow-[0_0_25px_rgba(244,63,94,0.2)]">
              <div className="w-full h-full rounded-full bg-synapse-surface flex items-center justify-center relative">
                {/* Visual Google logo representations */}
                <div className="grid grid-cols-2 gap-1.5 w-8 h-8">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose" />
                  <div className="w-3.5 h-3.5 rounded-full bg-sky" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald" />
                </div>
              </div>
            </div>
          </div>

          {/* Description and Info */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                  UI Designer & Volunteer
                </h3>
                <span className="text-[10px] font-mono text-text-muted px-2.5 py-1 rounded-full bg-synapse-surface-2 border border-synapse-border uppercase font-semibold self-center sm:self-auto">
                  GDSC UIT RGPV
                </span>
              </div>
              <p className="text-sm font-semibold text-text-secondary">
                Google Developer Student Clubs, Rajiv Gandhi Proudyogiki Vishwavidyalaya
              </p>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
              Designed the event website and visual brand identity for the **GDSC UX Meetup**. Spearheaded visual graphics, responsive user flows, and marketing collateral that supported **120+ attendees**, contributing to a community-focused workshop on design systems and interface heuristics.
            </p>

            {/* Impact Metric Tags */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-synapse-surface-2 border border-synapse-border">
                <Users className="w-4 h-4 text-sky" />
                <span className="text-xs font-bold text-text-primary">120+ Event Attendees</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-synapse-surface-2 border border-synapse-border">
                <Sparkles className="w-4 h-4 text-rose animate-pulse" />
                <span className="text-xs font-bold text-text-primary">Visual Identity Lead</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
