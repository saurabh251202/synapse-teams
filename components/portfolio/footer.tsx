'use client'

import { Mail, Zap } from 'lucide-react'
import Link from 'next/link'

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

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 border-t border-synapse-border/40 bg-synapse-bg text-text-secondary relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Logo and Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.2)]">
            <span className="font-extrabold text-white text-xs">SP</span>
          </div>
          <div>
            <span className="font-bold text-xs text-text-primary block leading-none">Saurabh Pathak</span>
            <span className="text-[9px] text-text-muted font-mono uppercase tracking-widest mt-0.5 block">UX | Frontend | Product</span>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="text-center text-xs font-medium text-text-muted">
          <p>© {currentYear} Saurabh Pathak. All rights reserved. Premium Product Design Portfolio.</p>
        </div>

        {/* Social and live workspace redirects */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:saurabhpathak2512@gmail.com"
            className="p-2 rounded-lg bg-synapse-surface border border-synapse-border hover:border-synapse-border-2 hover:text-primary transition-all cursor-pointer"
            aria-label="Send email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/saurabh251202"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-synapse-surface border border-synapse-border hover:border-synapse-border-2 hover:text-accent transition-all cursor-pointer"
            aria-label="View Github"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <Link
            href="/dashboard"
            className="p-2 rounded-lg bg-synapse-surface border border-synapse-border hover:border-synapse-border-2 hover:text-violet transition-all flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-text-secondary"
            aria-label="Enter Workspace"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Workspace</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
