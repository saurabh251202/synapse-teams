'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Terminal } from 'lucide-react'
import Navbar from '@/components/portfolio/navbar'
import Hero from '@/components/portfolio/hero'
import About from '@/components/portfolio/about'
import Experience from '@/components/portfolio/experience'
import Projects from '@/components/portfolio/projects'
import Skills from '@/components/portfolio/skills'
import Leadership from '@/components/portfolio/leadership'
import Contact from '@/components/portfolio/contact'
import Footer from '@/components/portfolio/footer'

export default function PortfolioLandingPage() {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing core...')

  useEffect(() => {
    // Check if the user has already loaded the site in this session to skip loader if needed, or play it once
    const sessionSeen = sessionStorage.getItem('portfolio-loader-seen')
    
    // Simulate premium system boot diagnostics
    const intervals = [
      { progress: 25, text: 'Booting design tokens...' },
      { progress: 50, text: 'Mapping visual workspaces...' },
      { progress: 75, text: 'Deploying interactive playrooms...' },
      { progress: 100, text: 'System ready.' }
    ]

    let currentStep = 0
    const progressInterval = setInterval(() => {
      if (currentStep < intervals.length) {
        setLoadingProgress(intervals[currentStep].progress)
        setLoadingText(intervals[currentStep].text)
        currentStep++
      } else {
        clearInterval(progressInterval)
        setTimeout(() => {
          setLoading(false)
          sessionStorage.setItem('portfolio-loader-seen', 'true')
        }, 300)
      }
    }, 450)

    return () => clearInterval(progressInterval)
  }, [])

  return (
    <div className="min-h-screen bg-synapse-bg text-text-primary font-sans selection:bg-primary/20 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          /* Premium Fullscreen Bootup Loader */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#05050f] flex flex-col items-center justify-center p-6 select-none"
          >
            <div className="max-w-xs w-full space-y-6 flex flex-col items-center">
              {/* Spinning / Pulsing Glow Box */}
              <motion.div
                animate={{
                  rotate: [0, 180, 360],
                  borderRadius: ["20%", "30%", "20%"],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                className="w-14 h-14 bg-gradient-to-br from-primary via-accent to-violet shadow-[0_0_40px_rgba(99,102,241,0.5)] flex items-center justify-center"
              >
                <div className="w-12 h-12 bg-[#05050f] rounded-lg flex items-center justify-center rotate-[inherit]">
                  <span className="font-black text-white text-base tracking-widest">SP</span>
                </div>
              </motion.div>

              {/* Technical Loading Status */}
              <div className="w-full space-y-2.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-text-muted font-mono text-[9px] uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-accent animate-pulse" />
                  <span>Saurabh.Pathak (SysBoot)</span>
                </div>
                
                {/* Progress bar */}
                <div className="h-1 bg-synapse-border rounded-full overflow-hidden w-full relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-accent to-violet rounded-full"
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                <span className="text-[10px] text-text-secondary font-mono tracking-widest uppercase block mt-1">
                  {loadingText} ({loadingProgress}%)
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Main Portfolio Workspace */
          <motion.div
            key="portfolio-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col min-h-screen"
          >
            {/* Header / Navigation */}
            <Navbar />

            {/* Layout Main Container */}
            <main id="main-content" className="flex-1">
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Leadership />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
