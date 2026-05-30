'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  GraduationCap,
  AlertTriangle,
  Network,
  MessageSquare,
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  Zap,
  Settings,
  HelpCircle,
  Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/lib/store'

const navItems = [
  {
    id: 'dashboard',
    label: 'Command Center',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & metrics',
    badge: null,
    color: 'text-indigo-400',
  },
  {
    id: 'team',
    label: 'Team Intelligence',
    href: '/team',
    icon: Users,
    description: 'Performance & workload',
    badge: null,
    color: 'text-cyan-400',
  },
  {
    id: 'recruitment',
    label: 'Recruitment Hub',
    href: '/recruitment',
    icon: UserPlus,
    description: 'Pipeline & candidates',
    badge: 23,
    color: 'text-violet-400',
  },
  {
    id: 'onboarding',
    label: 'Onboarding Center',
    href: '/onboarding',
    icon: GraduationCap,
    description: 'Training & progress',
    badge: null,
    color: 'text-emerald-400',
  },
  {
    id: 'escalations',
    label: 'Escalation Workspace',
    href: '/escalations',
    icon: AlertTriangle,
    description: 'Cases & resolution',
    badge: 7,
    badgeColor: 'bg-rose-500',
    color: 'text-rose-400',
  },
  {
    id: 'knowledge',
    label: 'Knowledge Graph',
    href: '/knowledge',
    icon: Network,
    description: 'Docs & processes',
    badge: null,
    color: 'text-amber-400',
  },
  {
    id: 'collaboration',
    label: 'Collaboration Board',
    href: '/collaboration',
    icon: MessageSquare,
    description: 'Feedback & ideas',
    badge: null,
    color: 'text-sky-400',
  },
  {
    id: 'analytics',
    label: 'Analytics Center',
    href: '/analytics',
    icon: BarChart3,
    description: 'Insights & trends',
    badge: null,
    color: 'text-pink-400',
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    href: '/ai-assistant',
    icon: Bot,
    description: 'Copilot & insights',
    badge: null,
    color: 'text-violet-400',
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { collapsed, setCollapsed } = useSidebarStore()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col overflow-hidden"
      style={{
        background: 'var(--color-synapse-surface)',
        borderRight: '1px solid var(--color-synapse-border)',
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center h-16 px-4 shrink-0"
        style={{ borderBottom: '1px solid var(--color-synapse-border)' }}
      >
        <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
          {/* Synapse Logo Mark */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              boxShadow: '0 0 16px rgba(99,102,241,0.4)',
            }}
          >
            <Zap className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="min-w-0"
              >
                <p className="font-semibold text-sm leading-none" style={{ color: 'var(--color-text-primary)' }}>
                  Synapse
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  Teams
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-lg transition-all hover:bg-white/5 shrink-0"
          style={{ color: 'var(--color-text-muted)' }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link key={item.id} href={item.href} aria-label={item.label}>
              <div
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 cursor-pointer',
                  isActive
                    ? 'bg-indigo-500/10 border border-indigo-500/20'
                    : 'hover:bg-white/5 border border-transparent',
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-indigo-400"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <div className="relative shrink-0">
                  <Icon
                    className={cn(
                      'w-4.5 h-4.5 transition-colors',
                      isActive ? item.color : 'text-slate-500 group-hover:text-slate-300',
                    )}
                    style={{ width: 18, height: 18 }}
                  />
                  {/* Badge dot when collapsed */}
                  {collapsed && item.badge && (
                    <span
                      className={cn(
                        'absolute -top-1 -right-1 w-2 h-2 rounded-full',
                        item.badgeColor ?? 'bg-indigo-500',
                      )}
                    />
                  )}
                </div>

                {/* Label & badge */}
                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex-1 min-w-0 flex items-center justify-between"
                    >
                      <div className="min-w-0">
                        <p
                          className={cn(
                            'text-sm font-medium leading-none truncate',
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-white',
                          )}
                        >
                          {item.label}
                        </p>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            'shrink-0 ml-2 text-xs font-semibold px-1.5 py-0.5 rounded-full',
                            item.badgeColor
                              ? 'bg-rose-500/20 text-rose-400'
                              : 'bg-indigo-500/20 text-indigo-400',
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div
                    className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50"
                    style={{
                      background: 'var(--color-synapse-surface-2)',
                      border: '1px solid var(--color-synapse-border)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {item.label}
                    {item.badge && (
                      <span
                        className={cn(
                          'ml-2 text-xs',
                          item.badgeColor ? 'text-rose-400' : 'text-indigo-400',
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div
        className="px-2 py-3 space-y-0.5 shrink-0"
        style={{ borderTop: '1px solid var(--color-synapse-border)' }}
      >
        {[
          { icon: Bell, label: 'Notifications', badge: 3 },
          { icon: Settings, label: 'Settings' },
          { icon: HelpCircle, label: 'Help & Docs' },
        ].map(({ icon: Icon, label, badge }) => (
          <button
            key={label}
            className="group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-white/5"
            style={{ color: 'var(--color-text-muted)' }}
            aria-label={label}
          >
            <div className="relative shrink-0">
              <Icon className="w-4.5 h-4.5 group-hover:text-white transition-colors" style={{ width: 18, height: 18 }} />
              {badge && collapsed && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-500" />
              )}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex items-center justify-between"
                >
                  <span className="text-sm group-hover:text-white transition-colors">{label}</span>
                  {badge && (
                    <span className="text-xs bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded-full font-semibold">
                      {badge}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}

        {/* User avatar */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
          style={{ borderTop: '1px solid var(--color-synapse-border)', marginTop: 8, paddingTop: 12 }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white' }}
          >
            AR
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0 flex-1"
              >
                <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                  Alex Rivera
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                  Engineering Lead
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}
