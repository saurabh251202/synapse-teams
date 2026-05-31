'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderGit2, ArrowUpRight, Zap, PlayCircle, Eye, Sparkles, Activity, CheckCircle, Info } from 'lucide-react'
import Link from 'next/link'
import HoverZoomDemo from './hover-zoom-demo'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

interface Project {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  accentColor: string
}

const projectsData: Project[] = [
  {
    id: 'synapse-teams',
    title: 'Synapse Teams',
    category: 'Visual Team Intelligence Platform',
    description: 'Designed and developed a modern SaaS platform focused on team collaboration, onboarding management, workflow visualization, customer operations, and performance monitoring.',
    tags: ['Next.js 16', 'TypeScript', 'Zustand', 'React Flow', 'Tailwind CSS v4'],
    accentColor: 'text-primary',
  },
  {
    id: 'pulseflow',
    title: 'PulseFlow',
    category: 'Operations Intelligence Platform',
    description: 'Developed an operations-focused platform enabling teams to monitor performance, manage workflows, and gain actionable insights through analytics dashboards.',
    tags: ['React', 'Recharts', 'Tailwind CSS', 'Framer Motion'],
    accentColor: 'text-accent',
  },
  {
    id: 'yoagshala',
    title: 'YoAgshala',
    category: 'Personalized Yoga Recommendation Platform',
    description: 'Developed a web application that provides personalized yoga recommendations based on user-selected health conditions and pain points.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'State Machinery'],
    accentColor: 'text-violet',
  },
  {
    id: 'hover-zoom',
    title: 'Hover Zoom Image',
    category: 'Interactive Media Experience',
    description: 'Developed an interactive image experience featuring advanced hover effects, responsive layouts, and smooth animations.',
    tags: ['React', 'Mathematics', 'CSS Transforms', 'Mouse Tracking'],
    accentColor: 'text-emerald',
  },
]

export default function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('synapse-teams')

  // YoAgshala Interactive Preview State
  const [selectedCondition, setSelectedCondition] = useState<string>('back-pain')
  const yogaRecommendations: Record<string, { pose: string, duration: string, benefits: string }> = {
    'back-pain': { pose: 'Bhujangasana (Cobra Pose)', duration: '5-10 mins', benefits: 'Strengthens spine and stretches chest.' },
    'anxiety': { pose: 'Balasana (Child\'s Pose)', duration: '8-12 mins', benefits: 'Calms the nervous system and relieves stress.' },
    'fatigue': { pose: 'Viparita Karani (Legs-Up-The-Wall)', duration: '10-15 mins', benefits: 'Boosts energy levels and improves circulation.' },
  }

  // PulseFlow telemetry animation state
  const [metricMultiplier, setMetricMultiplier] = useState(1)

  return (
    <section id="projects" className="py-24 px-6 relative bg-synapse-bg border-t border-synapse-border/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-[10px] text-primary font-mono uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3 h-3" />
            <span>Interactive Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Featured Projects
          </h2>
          <p className="text-sm text-text-secondary mt-2 max-w-xl">
            Select a project card to launch its interactive conceptual preview or live prototype demo.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
        </div>

        {/* Dynamic Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Project Selector List (Left Column) */}
          <div className="lg:col-span-6 space-y-4">
            {projectsData.map((project) => {
              const isSelected = selectedProjectId === project.id
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all border text-text-primary relative overflow-hidden flex flex-col gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-synapse-surface-2 border-primary/50 shadow-glow-primary scale-[1.01]'
                      : 'bg-synapse-surface border-synapse-border hover:border-synapse-border-2 hover:translate-y-[-2px]'
                  }`}
                >
                  {/* Category */}
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${project.accentColor}`}>
                    {project.category}
                  </span>

                  {/* Title & Arrow */}
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="p-1 rounded-lg bg-synapse-bg border border-synapse-border text-text-secondary shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-secondary leading-relaxed font-medium">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-synapse-bg border border-synapse-border text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Highlight bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeAccentBorder"
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-accent"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Interactive Live Playground Console (Right Column) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex-1 p-6 rounded-2xl glass-surface border border-synapse-border flex flex-col gap-6 relative min-h-[400px]">
              {/* Top status bar */}
              <div className="flex justify-between items-center pb-4 border-b border-synapse-border/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald uppercase tracking-widest font-semibold">
                    Interactive Console Active
                  </span>
                </div>
                <span className="text-[9px] font-mono text-text-muted">
                  Project: {selectedProjectId.toUpperCase()}
                </span>
              </div>

              {/* Console Workspace Screens */}
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {/* SCREEN 1: SYNAPSE TEAMS */}
                  {selectedProjectId === 'synapse-teams' && (
                    <motion.div
                      key="synapse-teams"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 flex flex-col"
                    >
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-text-primary">Live Next.js Sandbox Hub</h4>
                        <p className="text-xs text-text-secondary leading-relaxed font-medium">
                          You are currently inside the workspace of this project. You can access the fully realized live platform dashboard and command tools built right into this portfolio.
                        </p>
                      </div>

                      {/* Map Node visualization preview */}
                      <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-synapse-bg border border-synapse-border">
                        <div className="p-3 rounded-lg bg-synapse-surface border border-synapse-border text-center">
                          <span className="text-[9px] font-mono text-text-muted block">Active Pages</span>
                          <span className="text-base font-bold text-primary">9 Workspaces</span>
                        </div>
                        <div className="p-3 rounded-lg bg-synapse-surface border border-synapse-border text-center">
                          <span className="text-[9px] font-mono text-text-muted block">Telemetry State</span>
                          <span className="text-base font-bold text-accent">Zustand Sync</span>
                        </div>
                      </div>

                      {/* Quick access sub-links */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Link
                          href="/dashboard"
                          className="px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-glow-primary"
                        >
                          <PlayCircle className="w-4 h-4 text-cyan-400" />
                          Launch Workspace
                        </Link>
                        <a
                          href="https://github.com/saurabh251202"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 rounded-xl glass hover:bg-white/5 border-synapse-border text-text-primary text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <GithubIcon className="w-4 h-4 text-accent" />
                          View GitHub
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 2: PULSEFLOW */}
                  {selectedProjectId === 'pulseflow' && (
                    <motion.div
                      key="pulseflow"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-text-primary">Operations Graph Streamer</h4>
                        <p className="text-xs text-text-secondary leading-relaxed font-medium">
                          PulseFlow renders flow workloads and incident spikes. Click below to stimulate incidents and see charts adapt.
                        </p>
                      </div>

                      {/* Simulated Interactive Graph */}
                      <div className="p-4 rounded-xl bg-synapse-bg border border-synapse-border flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-text-secondary">Incident Response Time</span>
                          <span className="text-xs font-bold font-mono text-accent">
                            {(14.2 * metricMultiplier).toFixed(1)} mins
                          </span>
                        </div>
                        <div className="h-16 flex items-end gap-1.5">
                          {[30, 45, 60, 20, 80, 55, 90, 40, 65, 100].map((h, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.min(h * metricMultiplier, 100)}%` }}
                              className={`w-full rounded-t ${idx % 2 === 0 ? 'bg-accent' : 'bg-primary'}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setMetricMultiplier(prev => (prev === 1 ? 0.6 : 1))}
                          className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold transition-all w-full flex items-center justify-center gap-1.5"
                        >
                          <Activity className="w-4 h-4 text-white animate-pulse" />
                          Optimize Network Load
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 3: YOAGSHALA */}
                  {selectedProjectId === 'yoagshala' && (
                    <motion.div
                      key="yoagshala"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-text-primary">Yoga Suggestion Engine</h4>
                        <p className="text-xs text-text-secondary leading-relaxed font-medium">
                          Select a pain point or health condition to query recommendations in real-time.
                        </p>
                      </div>

                      {/* Interactive condition selectors */}
                      <div className="flex gap-2 flex-wrap">
                        {['back-pain', 'anxiety', 'fatigue'].map((cond) => (
                          <button
                            key={cond}
                            onClick={() => setSelectedCondition(cond)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              selectedCondition === cond
                                ? 'bg-violet/10 border-violet text-violet'
                                : 'bg-synapse-bg border-synapse-border text-text-secondary hover:text-text-primary'
                            }`}
                          >
                            {cond.replace('-', ' ').toUpperCase()}
                          </button>
                        ))}
                      </div>

                      {/* Display suggested pose */}
                      <div className="p-4 rounded-xl bg-synapse-bg border border-synapse-border flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0">
                          <CheckCircle className="w-5 h-5 text-violet" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider block">Recommended Pose</span>
                          <span className="text-xs font-bold text-text-primary">
                            {yogaRecommendations[selectedCondition].pose}
                          </span>
                          <p className="text-[10px] text-text-secondary font-medium leading-tight">
                            {yogaRecommendations[selectedCondition].benefits}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 4: HOVER ZOOM */}
                  {selectedProjectId === 'hover-zoom' && (
                    <motion.div
                      key="hover-zoom"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="w-full"
                    >
                      <HoverZoomDemo />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom informative bar */}
              <div className="mt-4 pt-3 border-t border-synapse-border/40 text-[10px] text-text-muted flex gap-2 items-center">
                <Info className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Interact by clicking controls or moving mouse within screens.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
