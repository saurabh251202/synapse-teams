'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, UserPlus, GraduationCap,
  AlertTriangle, Network, MessageSquare, BarChart3, Bot,
  Search, ArrowRight, Command, Zap,
} from 'lucide-react'
import { useCommandStore } from '@/lib/store'

const commands = [
  {
    group: 'Navigation',
    items: [
      { id: 'nav-dashboard', label: 'Command Center', description: 'Team overview & KPIs', href: '/dashboard', icon: LayoutDashboard, color: 'text-indigo-400', shortcut: 'G D' },
      { id: 'nav-team', label: 'Team Intelligence', description: 'Performance & workload', href: '/team', icon: Users, color: 'text-cyan-400', shortcut: 'G T' },
      { id: 'nav-recruitment', label: 'Recruitment Hub', description: 'Candidates & pipeline', href: '/recruitment', icon: UserPlus, color: 'text-violet-400', shortcut: 'G R' },
      { id: 'nav-onboarding', label: 'Onboarding Center', description: 'Training & readiness', href: '/onboarding', icon: GraduationCap, color: 'text-emerald-400', shortcut: 'G O' },
      { id: 'nav-escalations', label: 'Escalation Workspace', description: '7 open cases', href: '/escalations', icon: AlertTriangle, color: 'text-rose-400', shortcut: 'G E' },
      { id: 'nav-knowledge', label: 'Knowledge Graph', description: 'Docs & processes', href: '/knowledge', icon: Network, color: 'text-amber-400', shortcut: 'G K' },
      { id: 'nav-collaboration', label: 'Collaboration Board', description: 'Feedback & ideas', href: '/collaboration', icon: MessageSquare, color: 'text-sky-400', shortcut: 'G C' },
      { id: 'nav-analytics', label: 'Analytics Center', description: 'Insights & trends', href: '/analytics', icon: BarChart3, color: 'text-pink-400', shortcut: 'G A' },
      { id: 'nav-ai', label: 'AI Operations Assistant', description: 'Copilot & recommendations', href: '/ai-assistant', icon: Bot, color: 'text-violet-400', shortcut: 'G I' },
    ],
  },
]

export default function CommandPalette() {
  const router = useRouter()
  const { open, setOpen } = useCommandStore()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    },
    [setOpen],
  )

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  const handleSelect = (href: string) => {
    router.push(href)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[998]"
            style={{ background: 'rgba(5,5,15,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-[999] w-[560px] max-w-[calc(100vw-32px)] overflow-hidden"
            style={{
              background: 'var(--color-synapse-surface)',
              border: '1px solid var(--color-synapse-border-2)',
              borderRadius: 16,
              boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.1)',
            }}
            role="dialog"
            aria-label="Command palette"
            aria-modal="true"
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: '1px solid var(--color-synapse-border)' }}
            >
              <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
              <input
                autoFocus
                type="text"
                placeholder="Search pages, actions, people…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
                style={{ color: 'var(--color-text-primary)' }}
              />
              <div className="flex items-center gap-1">
                <kbd
                  className="px-1.5 py-0.5 rounded text-xs font-mono"
                  style={{ background: 'var(--color-synapse-border)', color: 'var(--color-text-muted)', fontSize: 10 }}
                >
                  ESC
                </kbd>
              </div>
            </div>

            {/* Commands list */}
            <div className="py-2 max-h-[420px] overflow-y-auto">
              {commands.map((group) => (
                <div key={group.group}>
                  <div
                    className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--color-text-disabled)' }}
                  >
                    {group.group}
                  </div>
                  {group.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all group hover:bg-white/5"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: 'var(--color-synapse-border)' }}
                        >
                          <Icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium group-hover:text-white transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                            {item.label}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <kbd
                            className="hidden group-hover:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-mono"
                            style={{ background: 'var(--color-synapse-border)', color: 'var(--color-text-muted)', fontSize: 10 }}
                          >
                            {item.shortcut}
                          </kbd>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text-muted)' }} />
                        </div>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between px-4 py-2.5 text-xs"
              style={{
                borderTop: '1px solid var(--color-synapse-border)',
                color: 'var(--color-text-disabled)',
              }}
            >
              <div className="flex items-center gap-1.5">
                <Command className="w-3 h-3" />
                <span>Synapse Command</span>
              </div>
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>ESC dismiss</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
