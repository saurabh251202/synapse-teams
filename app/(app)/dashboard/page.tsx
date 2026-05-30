'use client'

import { motion } from 'framer-motion'
import {
  Heart, TrendingUp, AlertTriangle, Users, Star, GraduationCap,
  ArrowUpRight, ArrowDownRight, Activity, Clock, CheckCircle2, Zap
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadialBarChart, RadialBar, Cell
} from 'recharts'
import { mockKPICards, mockActivity, mockPerformanceTrend, mockSatisfactionTrend, mockTeams } from '@/lib/mock-data'
import { cn, formatRelativeTime, getHealthColor } from '@/lib/utils'
import type { KPICard } from '@/types'

const iconMap: Record<string, React.ElementType> = {
  Heart, TrendingUp, AlertTriangle, Users, Star, GraduationCap,
}

const colorVars: Record<string, string> = {
  primary: 'var(--color-primary)',
  accent: 'var(--color-accent)',
  emerald: 'var(--color-emerald)',
  rose: 'var(--color-rose)',
  amber: 'var(--color-amber)',
  violet: 'var(--color-violet)',
}

const stagger = {
  container: { transition: { staggerChildren: 0.07 } },
  item: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: [0.16,1,0.3,1] } },
}

// Sparkline micro-chart
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 64
  const h = 24
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function KPICardComponent({ card }: { card: KPICard }) {
  const Icon = iconMap[card.icon] ?? Activity
  const color = colorVars[card.color] ?? 'var(--color-primary)'
  const isPositiveTrend = card.trend === 'up' && card.color !== 'rose'
    ? card.change > 0
    : card.change < 0

  return (
    <motion.div
      variants={{ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
      className="synapse-card p-5 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}18` }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color, width: 18, height: 18 }} />
        </div>
        <Sparkline data={card.sparkline} color={color} />
      </div>

      <div>
        <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
          {card.value}
        </p>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
          {card.label}
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        {card.change > 0 ? (
          <ArrowUpRight
            className="w-3.5 h-3.5"
            style={{ color: card.color === 'rose' ? 'var(--color-rose)' : 'var(--color-emerald)' }}
          />
        ) : (
          <ArrowDownRight
            className="w-3.5 h-3.5"
            style={{ color: card.color === 'rose' ? 'var(--color-emerald)' : 'var(--color-rose)' }}
          />
        )}
        <span
          className="text-xs font-semibold"
          style={{
            color: card.change > 0
              ? (card.color === 'rose' ? 'var(--color-rose)' : 'var(--color-emerald)')
              : (card.color === 'rose' ? 'var(--color-emerald)' : 'var(--color-rose)'),
          }}
        >
          {Math.abs(card.change)}%
        </span>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {card.changeLabel}
        </span>
      </div>
    </motion.div>
  )
}

// Combined chart data
const combinedTrend = mockPerformanceTrend.slice(-14).map((d, i) => ({
  date: d.date.slice(5),
  performance: d.value,
  satisfaction: mockSatisfactionTrend[mockSatisfactionTrend.length - 14 + i]?.value ?? 80,
}))

const activityTypeConfig = {
  alert: { color: 'var(--color-rose)', icon: AlertTriangle, bg: 'var(--color-rose-muted)' },
  hire: { color: 'var(--color-emerald)', icon: Users, bg: 'var(--color-emerald-muted)' },
  achievement: { color: 'var(--color-amber)', icon: Star, bg: 'var(--color-amber-muted)' },
  escalation: { color: 'var(--color-primary)', icon: CheckCircle2, bg: 'var(--color-primary-muted)' },
  onboard: { color: 'var(--color-violet)', icon: GraduationCap, bg: 'var(--color-violet-muted)' },
  announcement: { color: 'var(--color-accent)', icon: Zap, bg: 'var(--color-accent-muted)' },
}

// Team Health Radial
const teamHealthData = mockTeams.map(t => ({
  name: t.name,
  value: t.healthScore,
  color: t.color,
}))

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Good evening, Alex 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Friday, May 30 · 7 open escalations need your attention
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
          style={{
            background: 'var(--color-emerald-muted)',
            border: '1px solid rgba(16,185,129,0.2)',
            color: 'var(--color-emerald)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">Team Health: 87/100</span>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.07 } } }}
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        {mockKPICards.map(card => (
          <KPICardComponent key={card.id} card={card} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Performance Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="synapse-card p-5 xl:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Performance Trends
              </h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                Team performance & satisfaction — last 14 days
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-indigo-400 inline-block" />
                Performance
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-cyan-400 inline-block" />
                Satisfaction
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={combinedTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradPerf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradSat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-synapse-border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />
              <YAxis
                domain={[60, 100]}
                tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-synapse-surface-2)',
                  border: '1px solid var(--color-synapse-border)',
                  borderRadius: 10,
                  color: 'var(--color-text-primary)',
                  fontSize: 12,
                }}
                cursor={{ stroke: 'var(--color-synapse-border-2)', strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="performance" stroke="#6366f1" strokeWidth={2} fill="url(#gradPerf)" dot={false} />
              <Area type="monotone" dataKey="satisfaction" stroke="#06b6d4" strokeWidth={2} fill="url(#gradSat)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Team Health Scores */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="synapse-card p-5"
        >
          <h2 className="text-base font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            Team Health
          </h2>
          <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
            Composite score by team
          </p>
          <div className="space-y-4">
            {mockTeams.map((team, i) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: team.color }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>{team.name}</span>
                  </div>
                  <span className="font-semibold tabular-nums" style={{ color: getHealthColor(team.healthScore) }}>
                    {team.healthScore}
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-synapse-border)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${team.healthScore}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: team.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div
            className="mt-5 p-3 rounded-xl text-xs space-y-2"
            style={{ background: 'var(--color-synapse-bg)', border: '1px solid var(--color-synapse-border)' }}
          >
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-text-muted)' }}>Avg Health</span>
              <span className="font-semibold" style={{ color: 'var(--color-emerald)' }}>88.75</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-text-muted)' }}>Top Performer</span>
              <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Design (94)</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-text-muted)' }}>MoM Change</span>
              <span className="font-semibold" style={{ color: 'var(--color-emerald)' }}>+4.2%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="synapse-card p-5 xl:col-span-2"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Organization Activity
            </h2>
            <button className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
              View all
            </button>
          </div>
          <div className="space-y-1">
            {mockActivity.map((item, i) => {
              const config = activityTypeConfig[item.type] ?? activityTypeConfig.announcement
              const Icon = config.icon
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-white/3 cursor-pointer"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: config.bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color: config.color, width: 14, height: 14 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                      {item.title}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-text-muted)' }}>
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'var(--color-synapse-border)', color: 'var(--color-text-muted)' }}
                    >
                      {item.userAvatar}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)', minWidth: 52 }}>
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="synapse-card p-5 space-y-4"
        >
          <h2 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Operations Summary
          </h2>

          {[
            { label: 'Critical Escalations', value: 2, icon: AlertTriangle, color: 'var(--color-rose)', bg: 'var(--color-rose-muted)' },
            { label: 'High Priority Escalations', value: 3, icon: AlertTriangle, color: 'var(--color-amber)', bg: 'var(--color-amber-muted)' },
            { label: 'Candidates in Review', value: 8, icon: Users, color: 'var(--color-primary)', bg: 'var(--color-primary-muted)' },
            { label: 'Active Onboardings', value: 2, icon: GraduationCap, color: 'var(--color-violet)', bg: 'var(--color-violet-muted)' },
            { label: 'Offer Stage', value: 1, icon: Star, color: 'var(--color-emerald)', bg: 'var(--color-emerald-muted)' },
            { label: 'Docs in Knowledge Base', value: 13, icon: Activity, color: 'var(--color-accent)', bg: 'var(--color-accent-muted)' },
          ].map(({ label, value, icon: Icon, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: bg }}
              >
                <Icon style={{ color, width: 14, height: 14 }} />
              </div>
              <span className="flex-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {label}
              </span>
              <span className="text-sm font-bold tabular-nums" style={{ color }}>
                {value}
              </span>
            </motion.div>
          ))}

          {/* SLA Warning */}
          <div
            className="p-3 rounded-xl mt-2"
            style={{ background: 'var(--color-rose-muted)', border: '1px solid rgba(244,63,94,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3.5 h-3.5" style={{ color: 'var(--color-rose)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--color-rose)' }}>
                SLA at Risk
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              GlobalBank SSO escalation SLA expires in 4h. Immediate action required.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
