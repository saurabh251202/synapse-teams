import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number, decimals = 0): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toFixed(decimals)
}

export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelativeTime(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 7) return formatDate(dateStr)
  if (days > 1) return `${days}d ago`
  if (days === 1) return 'Yesterday'
  if (hours > 1) return `${hours}h ago`
  if (minutes > 1) return `${minutes}m ago`
  return 'Just now'
}

export function getHealthColor(score: number): string {
  if (score >= 80) return 'var(--color-emerald)'
  if (score >= 60) return 'var(--color-amber)'
  return 'var(--color-rose)'
}

export function getHealthLabel(score: number): string {
  if (score >= 85) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 55) return 'Fair'
  if (score >= 40) return 'Needs Attention'
  return 'Critical'
}

export function getPriorityColor(priority: string): string {
  const map: Record<string, string> = {
    critical: 'var(--color-rose)',
    high: 'var(--color-amber)',
    medium: 'var(--color-primary)',
    low: 'var(--color-emerald)',
  }
  return map[priority] ?? 'var(--color-text-muted)'
}

export function getStatusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    inactive: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    'on-leave': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    onboarding: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    open: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    'in-progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    resolved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    planned: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    hired: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    applied: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    screening: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    interview: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    technical: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    offer: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  }
  return map[status] ?? 'bg-slate-500/10 text-slate-400 border-slate-500/20'
}

export function generateSparkline(base: number, points = 12, variance = 10): number[] {
  return Array.from({ length: points }, (_, i) => {
    const trend = (i / points) * 5
    const noise = (Math.random() - 0.5) * variance
    return Math.min(100, Math.max(0, base + trend + noise))
  })
}

export function generateTrendData(
  base: number,
  points = 30,
  variance = 8,
  trend = 0.3,
): { date: string; value: number }[] {
  const now = new Date()
  return Array.from({ length: points }, (_, i) => {
    const date = new Date(now)
    date.setDate(date.getDate() - (points - i))
    const noise = (Math.random() - 0.5) * variance
    const value = Math.min(100, Math.max(0, base + trend * i + noise))
    return {
      date: date.toISOString().split('T')[0],
      value: Math.round(value),
    }
  })
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '…'
}
