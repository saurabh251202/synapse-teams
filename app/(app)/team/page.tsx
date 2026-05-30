'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts'
import { Search, Filter, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { mockUsers, mockTeams, mockTeamRadarData } from '@/lib/mock-data'
import { cn, getStatusBadgeClass, initials } from '@/lib/utils'
import type { User } from '@/types'

function WorkloadBar({ value, color }: { value: number; color: string }) {
  const getColor = (v: number) =>
    v >= 85 ? 'var(--color-rose)' : v >= 70 ? 'var(--color-amber)' : 'var(--color-emerald)'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-synapse-border)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: getColor(value) }}
        />
      </div>
      <span className="text-xs tabular-nums w-8 text-right font-medium" style={{ color: getColor(value) }}>
        {value}%
      </span>
    </div>
  )
}

function MemberCard({ user, index }: { user: User; index: number }) {
  const [hovered, setHovered] = useState(false)
  const perfColor = user.performance >= 90 ? 'var(--color-emerald)' : user.performance >= 75 ? 'var(--color-amber)' : 'var(--color-rose)'
  const team = mockTeams.find(t => t.id === user.teamId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="synapse-card p-5 space-y-4 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: `linear-gradient(135deg, ${team?.color ?? '#6366f1'}, ${team?.color ?? '#6366f1'}88)` }}
          >
            {initials(user.name)}
          </div>
          <div>
            <p className="text-sm font-semibold leading-none" style={{ color: 'var(--color-text-primary)' }}>
              {user.name}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{user.title}</p>
          </div>
        </div>
        <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', getStatusBadgeClass(user.status))}>
          {user.status}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Workload', value: user.workload },
          { label: 'Performance', value: user.performance },
          { label: 'Satisfaction', value: user.satisfaction },
          { label: 'Productivity', value: user.productivity },
        ].map(({ label, value }) => (
          <div key={label} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
            </div>
            <WorkloadBar value={value} color={team?.color ?? '#6366f1'} />
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1">
        {user.skills.slice(0, 3).map(skill => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-md"
            style={{
              background: 'var(--color-synapse-border)',
              color: 'var(--color-text-muted)',
            }}
          >
            {skill}
          </span>
        ))}
        {user.skills.length > 3 && (
          <span
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ background: 'var(--color-synapse-border)', color: 'var(--color-text-muted)' }}
          >
            +{user.skills.length - 3}
          </span>
        )}
      </div>

      {/* Location */}
      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <span>📍 {user.location}</span>
        <span
          className="font-bold"
          style={{ color: perfColor }}
        >
          {user.performance}/100
        </span>
      </div>
    </motion.div>
  )
}

const productivityData = mockUsers.map(u => ({
  name: u.name.split(' ')[0],
  productivity: u.productivity,
  performance: u.performance,
}))

export default function TeamPage() {
  const [search, setSearch] = useState('')
  const [filterTeam, setFilterTeam] = useState('all')

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.title.toLowerCase().includes(search.toLowerCase())
    const matchTeam = filterTeam === 'all' || u.teamId === filterTeam
    return matchSearch && matchTeam
  })

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Team Intelligence
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {mockUsers.length} members · 4 teams · Avg health 88.7/100
          </p>
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="synapse-card p-5"
        >
          <h2 className="text-base font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            Team Capability Matrix
          </h2>
          <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Multi-dimensional performance comparison
          </p>
          <div className="flex gap-3 flex-wrap mb-4">
            {mockTeams.map(t => (
              <span key={t.id} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                {t.name}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={mockTeamRadarData}>
              <PolarGrid stroke="var(--color-synapse-border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} />
              {mockTeams.map(t => (
                <Radar
                  key={t.id}
                  name={t.name}
                  dataKey={t.name.replace(' ', '')}
                  stroke={t.color}
                  fill={t.color}
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="synapse-card p-5"
        >
          <h2 className="text-base font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            Individual Productivity
          </h2>
          <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
            Productivity score by team member
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={productivityData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-synapse-border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-synapse-surface-2)',
                  border: '1px solid var(--color-synapse-border)',
                  borderRadius: 10,
                  fontSize: 12,
                  color: 'var(--color-text-primary)',
                }}
              />
              <Bar dataKey="productivity" radius={[4, 4, 0, 0]}>
                {productivityData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.productivity >= 90 ? '#6366f1' : entry.productivity >= 80 ? '#06b6d4' : '#8b5cf6'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 flex-1 max-w-sm px-3 py-2 rounded-xl"
          style={{ background: 'var(--color-synapse-surface)', border: '1px solid var(--color-synapse-border)' }}
        >
          <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search members…"
            className="bg-transparent text-sm outline-none flex-1"
            style={{ color: 'var(--color-text-primary)' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterTeam('all')}
            className={cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
              filterTeam === 'all' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-500 hover:text-slate-300'
            )}
          >
            All
          </button>
          {mockTeams.map(t => (
            <button
              key={t.id}
              onClick={() => setFilterTeam(t.id)}
              className={cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                filterTeam === t.id ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-500 hover:text-slate-300'
              )}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map((user, i) => (
          <MemberCard key={user.id} user={user} index={i} />
        ))}
      </div>
    </div>
  )
}
