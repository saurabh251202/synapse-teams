'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Zap, Download } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from './theme-toggle'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Highlight active section based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-synapse-bg/85 backdrop-blur-md border-b border-synapse-border/40 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center relative bg-gradient-to-br from-primary to-accent shadow-[0_0_16px_rgba(99,102,241,0.3)] transition-transform duration-300 group-hover:scale-105">
            <span className="font-bold text-white text-sm tracking-wider">SP</span>
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-text-primary block leading-none">
              Saurabh Pathak
            </span>
            <span className="text-[9px] text-accent font-mono uppercase tracking-widest mt-0.5 block">
              UX & Dev Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-text-primary relative py-1 ${
                    activeSection === link.href ? 'text-text-primary font-semibold' : 'text-text-secondary'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 pl-4 border-l border-synapse-border">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* GitHub Link */}
            <a
              href="https://github.com/saurabh251202"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-text-secondary glass hover:bg-white/5 hover:text-text-primary border-synapse-border hover:border-synapse-border-2 transition-all cursor-pointer"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              View GitHub
            </a>

            {/* Resume Integration */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-text-primary glass hover:bg-white/5 border-synapse-border hover:border-synapse-border-2 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>

            {/* Live Workspace Demo (Synapse Teams) */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-primary hover:bg-primary-hover text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              Live Demo
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle & Quick Tools */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl glass text-text-secondary hover:text-text-primary border-synapse-border hover:border-synapse-border-2 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full glass-surface border-t border-synapse-border/40 overflow-hidden absolute top-full left-0"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-semibold block transition-colors ${
                        activeSection === link.href ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="h-px bg-synapse-border my-2" />

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/saurabh251202"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-text-secondary glass hover:bg-white/5 border-synapse-border transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  View GitHub
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-text-primary glass hover:bg-white/5 border-synapse-border transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>

                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-hover text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                >
                  Launch Workspace Demo
                  <Zap className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
