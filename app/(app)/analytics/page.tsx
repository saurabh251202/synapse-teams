'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts'
import {
  BarChart3,
  Calendar,
  Download,
  Users,
  AlertTriangle,
  TrendingUp,
  Award,
  Zap,
  Filter,
} from 'lucide-react'
import {
  mockPerformanceTrend,
  mockSatisfactionTrend,
  mockProductivityTrend,
  mockEscalationTrend,
  mockHiringFunnel,
  mockTeamRadarData,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function AnalyticsCenter() {
  const [activeTab, setActiveTab] = useState<'productivity' | 'recruitment' | 'escalations'>('productivity')
  const [timeRange, setTimeRange] = useState('30d')

  // Combine trend data for multi-metric comparison
  const combinedTrendData = mockPerformanceTrend.map((item, idx) => ({
    date: item.date,
    Performance: item.value,
    Satisfaction: mockSatisfactionTrend[idx]?.value || 88,
    Productivity: mockProductivityTrend[idx]?.value || 85,
  }))

  const handleExport = (type: string) => {
    alert(`Exporting analytics data as ${type.toUpperCase()}...`)
  }

  return (
    <div className="space-y-8 p-1 sm:p-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-400" />
            Analytics Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Perform detailed cohort analysis, track SLA velocities, and export organizational telemetry.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#0d0d1f] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <div className="flex items-center border border-slate-700 bg-slate-800/40 rounded-lg p-0.5">
            <button
              onClick={() => handleExport('csv')}
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Workload Deviation', value: '4.2%', desc: 'Slightly above baseline', icon: TrendingUp, color: 'text-indigo-400' },
          { label: 'Recruitment Throughput', value: '88%', desc: 'Screening to Tech stage', icon: Users, color: 'text-cyan-400' },
          { label: 'Escalation Backlog', value: '7 active', desc: 'Resolved within SLA: 96%', icon: AlertTriangle, color: 'text-rose-400' },
          { label: 'Skill Retention Rate', value: '94%', desc: 'Top tier developers align', icon: Award, color: 'text-emerald-400' },
        ].map((metric, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-white/5 bg-[#0d0d1f]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{metric.label}</span>
              <metric.icon className={cn('w-4 h-4', metric.color)} />
            </div>
            <div className="text-lg font-bold text-white mt-1.5">{metric.value}</div>
            <p className="text-[10px] text-slate-500 mt-0.5">{metric.desc}</p>
          </div>
        ))}
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-[#0d0d1f]">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-300">Select Analytics Focus</span>
        </div>
        <div className="flex items-center border border-slate-700 bg-slate-800/40 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTab('productivity')}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
              activeTab === 'productivity' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            )}
          >
            Productivity & Health
          </button>
          <button
            onClick={() => setActiveTab('recruitment')}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
              activeTab === 'recruitment' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            )}
          >
            Recruitment Funnel
          </button>
          <button
            onClick={() => setActiveTab('escalations')}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
              activeTab === 'escalations' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            )}
          >
            SLA Escalations
          </button>
        </div>
      </div>

      {/* Main Charts Canvas Panel */}
      <div className="p-6 rounded-2xl border border-white/5 bg-[#0d0d1f]">
        <AnimatePresence mode="wait">
          {activeTab === 'productivity' ? (
            <motion.div
              key="productivity-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Productivity & Member Health Trends</h3>
                <p className="text-[10px] text-slate-400 mt-1">Cross-referencing overall performance, customer satisfaction, and workload indicators.</p>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={combinedTrendData}>
                    <defs>
                      <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSat" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e38" vertical={false} />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[50, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0d0d1f', border: '1px solid #1a1a2e', borderRadius: '8px' }}
                      labelStyle={{ color: '#94a3b8', fontSize: 10 }}
                      itemStyle={{ color: '#fff', fontSize: 11 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Area type="monotone" dataKey="Performance" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorPerf)" />
                    <Area type="monotone" dataKey="Satisfaction" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorSat)" />
                    <Area type="monotone" dataKey="Productivity" stroke="#8b5cf6" strokeWidth={1.5} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ) : activeTab === 'recruitment' ? (
            <motion.div
              key="recruitment-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Hiring Pipeline Drop-off Funnel</h3>
                <p className="text-[10px] text-slate-400 mt-1">Measuring application volume and progression conversion across recruitment stages.</p>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockHiringFunnel}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e38" vertical={false} />
                    <XAxis dataKey="stage" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0d0d1f', border: '1px solid #1a1a2e', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff', fontSize: 11 }}
                    />
                    <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]}>
                      {mockHiringFunnel.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="escalations-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Escalation Volatility & SLA Trends</h3>
                <p className="text-[10px] text-slate-400 mt-1">Reviewing incoming client tickets alongside average SLA completion indices.</p>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockEscalationTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e1e38" vertical={false} />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0d0d1f', border: '1px solid #1a1a2e', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff', fontSize: 11 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="value" name="Open Cases" stroke="#f43f5e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
