'use client'

import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Bell,
  ChevronRight,
  Slash,
  LayoutDashboard,
  Users,
  UserPlus,
  GraduationCap,
  AlertTriangle,
  Network,
  MessageSquare,
  BarChart3,
  Bot,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useCommandStore, useSidebarStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const breadcrumbMap: Record<string, { label: string; icon: React.ElementType }> = {
  '/dashboard': { label: 'Command Center', icon: LayoutDashboard },
  '/team': { label: 'Team Intelligence', icon: Users },
  '/recruitment': { label: 'Recruitment Hub', icon: UserPlus },
  '/onboarding': { label: 'Onboarding Center', icon: GraduationCap },
  '/escalations': { label: 'Escalation Workspace', icon: AlertTriangle },
  '/knowledge': { label: 'Knowledge Graph', icon: Network },
  '/collaboration': { label: 'Collaboration Board', icon: MessageSquare },
  '/analytics': { label: 'Analytics Center', icon: BarChart3 },
  '/ai-assistant': { label: 'AI Assistant', icon: Bot },
}

export default function Topbar() {
  const pathname = usePathname()
  const { open: commandOpen, setOpen } = useCommandStore()
  const { collapsed } = useSidebarStore()
  const current = breadcrumbMap[pathname]

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(!commandOpen)
      }
    },
    [commandOpen, setOpen],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <header
      className="fixed top-0 right-0 h-16 z-30 flex items-center px-6 gap-4"
      style={{
        left: collapsed ? 72 : 260,
        background: 'rgba(5,5,15,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-synapse-border)',
        transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <Zap className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
          <span>Synapse</span>
          <ChevronRight className="w-3 h-3" />
        </div>
        {current && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5"
          >
            <current.icon
              className="w-4 h-4"
              style={{ color: 'var(--color-primary)' }}
            />
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {current.label}
            </span>
          </motion.div>
        )}
      </div>

      {/* Search / Command Palette Trigger */}
      <button
        id="command-palette-trigger"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all hover:border-indigo-500/40"
        style={{
          background: 'var(--color-synapse-surface)',
          border: '1px solid var(--color-synapse-border)',
          color: 'var(--color-text-muted)',
          minWidth: 200,
        }}
        aria-label="Open command palette"
      >
        <Search className="w-3.5 h-3.5 shrink-0" />
        <span className="flex-1 text-left text-xs">Search or jump to…</span>
        <kbd
          className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-mono"
          style={{
            background: 'var(--color-synapse-border)',
            color: 'var(--color-text-muted)',
            fontSize: 10,
          }}
        >
          <span>⌘</span>
          <span>K</span>
        </kbd>
      </button>

      {/* Notification Bell */}
      <button
        className="relative p-2 rounded-lg transition-all hover:bg-white/5"
        style={{ color: 'var(--color-text-muted)' }}
        aria-label="Notifications"
      >
        <Bell className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
        <span
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500"
          style={{ boxShadow: '0 0 6px rgba(99,102,241,0.6)' }}
        />
      </button>

      {/* Status badge */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        style={{ background: 'var(--color-emerald-muted)', color: '#10b981' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        All systems operational
      </div>
    </header>
  )
}
