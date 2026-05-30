'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  Clock,
  User,
  Shield,
  Activity,
  CheckCircle,
  Play,
  ArrowRight,
  Filter,
  Layers,
  ChevronDown,
  UserCheck,
  Plus,
} from 'lucide-react'
import { mockEscalations } from '@/lib/mock-data'
import { useEscalationStore } from '@/lib/store'
import { cn } from '@/lib/utils'

// Calculate SLA time remaining string
function useSLATimer(deadlineStr: string) {
  const [timeRemaining, setTimeRemaining] = useState('')
  const [isOverdue, setIsOverdue] = useState(false)

  useEffect(() => {
    const updateTimer = () => {
      const deadline = new Date(deadlineStr).getTime()
      const now = new Date().getTime()
      const diff = deadline - now

      if (diff <= 0) {
        setTimeRemaining('Overdue')
        setIsOverdue(true)
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
      setIsOverdue(false)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [deadlineStr])

  return { timeRemaining, isOverdue }
}

function SLADisplay({ deadline }: { deadline: string }) {
  const { timeRemaining, isOverdue } = useSLATimer(deadline)

  return (
    <span
      className={cn(
        'text-[10px] px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1 border shrink-0',
        isOverdue
          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      )}
    >
      <Clock className="w-3 h-3" />
      {timeRemaining}
    </span>
  )
}

export default function EscalationWorkspace() {
  const { filterPriority, filterStatus, setFilterPriority, setFilterStatus } = useEscalationStore()
  const [escalations, setEscalations] = useState(mockEscalations)
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'matrix'>('matrix')

  // Toggle status of an escalation
  const updateStatus = (id: string, newStatus: 'open' | 'in-progress' | 'resolved') => {
    setEscalations((prev) =>
      prev.map((esc) => {
        if (esc.id !== id) return esc
        return {
          ...esc,
          status: newStatus,
          resolutionProgress: newStatus === 'resolved' ? 100 : newStatus === 'in-progress' ? 50 : 10,
          updatedAt: new Date().toISOString(),
        }
      })
    )
  }

  // Filter logic
  const filteredCases = escalations.filter((esc) => {
    const matchesPriority = filterPriority === 'all' || esc.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || esc.status === filterStatus
    return matchesPriority && matchesStatus
  })

  const selectedCase = escalations.find((e) => e.id === selectedCaseId)

  // Groups for 2x2 Matrix
  // Quadrant 1: High Urgency & High Impact (Critical)
  // Quadrant 2: High Urgency & Medium-Low Impact (High)
  // Quadrant 3: Low Urgency & High Impact (Medium)
  // Quadrant 4: Low Urgency & Medium-Low Impact (Low)
  const q1Cases = filteredCases.filter((e) => e.urgency === 'high' && e.impact === 'high')
  const q2Cases = filteredCases.filter((e) => e.urgency === 'high' && e.impact !== 'high')
  const q3Cases = filteredCases.filter((e) => e.urgency !== 'high' && e.impact === 'high')
  const q4Cases = filteredCases.filter((e) => e.urgency !== 'high' && e.impact !== 'high')

  return (
    <div className="space-y-8 p-1 sm:p-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-500 animate-pulse" />
            Escalation Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Resolve critical customer operation failures, coordinate response teams, and audit SLA performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-slate-700 bg-slate-800/40 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('matrix')}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-semibold transition-all',
                viewMode === 'matrix' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              2x2 Matrix
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-semibold transition-all',
                viewMode === 'list' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              Timeline List
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Plus className="w-4 h-4" />
            New Incident
          </button>
        </div>
      </div>

      {/* SLA Overview KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Incidents', value: escalations.filter(e => e.status !== 'resolved').length, desc: 'Across all priority flags', icon: AlertTriangle, color: 'text-rose-400' },
          { label: 'Avg Resolution Time', value: '4.2 hrs', desc: 'SLA target: <6 hrs', icon: Clock, color: 'text-indigo-400' },
          { label: 'SLA Compliance Rate', value: '96.4%', desc: '+1.2% vs last month', icon: Shield, color: 'text-emerald-400' },
          { label: 'Incident Velocity', value: '2.1/day', desc: 'Resolved within 24h', icon: Activity, color: 'text-cyan-400' },
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

      {/* Filters Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-[#0d0d1f]">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-300">Filters</span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#05050f] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#05050f] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Grid Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'matrix' ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Quadrant 1: High Urgency & High Impact */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Q1: Urgent & Critical Impact
                </h3>
                <span className="text-xs font-bold text-rose-500 font-mono">{q1Cases.length}</span>
              </div>
              <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
                {q1Cases.map((c) => (
                  <CaseCard key={c.id} c={c} onClick={() => setSelectedCaseId(c.id)} />
                ))}
                {q1Cases.length === 0 && <EmptyQuadrant />}
              </div>
            </div>

            {/* Quadrant 2: High Urgency & Low Impact */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Q2: High Urgency & Minor Impact
                </h3>
                <span className="text-xs font-bold text-amber-500 font-mono">{q2Cases.length}</span>
              </div>
              <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
                {q2Cases.map((c) => (
                  <CaseCard key={c.id} c={c} onClick={() => setSelectedCaseId(c.id)} />
                ))}
                {q2Cases.length === 0 && <EmptyQuadrant />}
              </div>
            </div>

            {/* Quadrant 3: Low Urgency & High Impact */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Q3: Low Urgency & Enterprise Impact
                </h3>
                <span className="text-xs font-bold text-indigo-500 font-mono">{q3Cases.length}</span>
              </div>
              <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
                {q3Cases.map((c) => (
                  <CaseCard key={c.id} c={c} onClick={() => setSelectedCaseId(c.id)} />
                ))}
                {q3Cases.length === 0 && <EmptyQuadrant />}
              </div>
            </div>

            {/* Quadrant 4: Low Urgency & Low Impact */}
            <div className="flex flex-col gap-3 p-4 rounded-xl border border-slate-700 bg-slate-800/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Q4: Routine Operations
                </h3>
                <span className="text-xs font-bold text-slate-500 font-mono">{q4Cases.length}</span>
              </div>
              <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
                {q4Cases.map((c) => (
                  <CaseCard key={c.id} c={c} onClick={() => setSelectedCaseId(c.id)} />
                ))}
                {q4Cases.length === 0 && <EmptyQuadrant />}
              </div>
            </div>
          </motion.div>
        ) : (
          /* List/Timeline View */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 rounded-xl border border-white/5 bg-[#0d0d1f] space-y-4"
          >
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Incidents chronological timeline</h3>
            <div className="space-y-3">
              {filteredCases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className="p-4 rounded-xl bg-white/2 border border-white/5 hover:border-indigo-500/30 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'w-2 h-2 rounded-full shrink-0',
                        c.priority === 'critical'
                          ? 'bg-rose-500'
                          : c.priority === 'high'
                          ? 'bg-amber-500'
                          : c.priority === 'medium'
                          ? 'bg-indigo-400'
                          : 'bg-slate-500'
                      )}
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-white">{c.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Customer: {c.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                    <SLADisplay deadline={c.slaDeadline} />
                    <span
                      className={cn(
                        'text-[10px] px-1.5 py-0.5 rounded font-bold uppercase',
                        c.status === 'resolved'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : c.status === 'in-progress'
                          ? 'bg-indigo-500/10 text-indigo-400'
                          : 'bg-rose-500/10 text-rose-400'
                      )}
                    >
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
              {filteredCases.length === 0 && (
                <div className="text-center py-12 text-slate-600 text-xs">No incidents match your filter.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Details Slide-in Panel */}
      <AnimatePresence>
        {selectedCaseId && selectedCase && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-[#0b0b1e] border-l border-indigo-500/10 h-screen p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <span
                    className={cn(
                      'text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase',
                      selectedCase.priority === 'critical'
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        : selectedCase.priority === 'high'
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                    )}
                  >
                    {selectedCase.priority} priority
                  </span>
                  <button
                    onClick={() => setSelectedCaseId(null)}
                    className="p-1 rounded hover:bg-white/5 text-slate-400"
                  >
                    <Plus className="w-5 h-5 rotate-45" />
                  </button>
                </div>

                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">{selectedCase.title}</h3>
                    <p className="text-xs text-slate-400 mt-2">{selectedCase.description}</p>
                  </div>

                  {/* Operational Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/2 rounded-xl border border-white/5">
                      <span className="text-[10px] text-slate-400 block">Impact Segment</span>
                      <span className="text-xs font-semibold text-white mt-1 block uppercase">
                        {selectedCase.impact} Impact
                      </span>
                    </div>
                    <div className="p-3 bg-white/2 rounded-xl border border-white/5">
                      <span className="text-[10px] text-slate-400 block">Urgency Status</span>
                      <span className="text-xs font-semibold text-white mt-1 block uppercase">
                        {selectedCase.urgency} Urgency
                      </span>
                    </div>
                  </div>

                  {/* SLA Timers */}
                  <div className="p-4 bg-white/2 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">SLA Commitment Deadline</span>
                      <span className="text-xs font-semibold text-slate-200 mt-1 block">
                        {new Date(selectedCase.slaDeadline).toLocaleString()}
                      </span>
                    </div>
                    <SLADisplay deadline={selectedCase.slaDeadline} />
                  </div>

                  {/* Resolution Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Resolution Progress</span>
                      <span className="font-bold text-indigo-400">{selectedCase.resolutionProgress}%</span>
                    </div>
                    <div className="h-2 bg-[#05050f] rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                        style={{ width: `${selectedCase.resolutionProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Timeline History log */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Incident Activity Log</h4>
                    <div className="relative border-l border-white/5 pl-4 ml-2 space-y-4">
                      <div className="relative">
                        <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-rose-500 border border-[#0b0b1e]" />
                        <p className="text-xs text-white">Incident Triggered & Customer Logged</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{selectedCase.createdAt}</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-indigo-500 border border-[#0b0b1e]" />
                        <p className="text-xs text-white">Assigned responder: {selectedCase.assigneeName}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">{selectedCase.updatedAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="border-t border-white/5 pt-6 space-y-3">
                <span className="text-xs text-slate-400">Update Incident Status:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(selectedCase.id, 'in-progress')}
                    className={cn(
                      'flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-1.5',
                      selectedCase.status === 'in-progress'
                        ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                        : 'bg-[#0f0f29] border-white/5 text-slate-400 hover:text-slate-200'
                    )}
                  >
                    <Play className="w-3.5 h-3.5" />
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(selectedCase.id, 'resolved')}
                    className={cn(
                      'flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-1.5',
                      selectedCase.status === 'resolved'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-[#0f0f29] border-white/5 text-slate-400 hover:text-slate-200'
                    )}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Mark Resolved
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CaseCard({ c, onClick }: { c: any; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="p-4 rounded-xl border border-white/5 bg-[#0a0a1f]/80 hover:bg-[#0f0f2d] hover:border-indigo-500/20 transition-all cursor-pointer space-y-3 relative group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-xs font-semibold text-white leading-snug group-hover:text-indigo-400 transition-colors">
            {c.title}
          </h4>
          <p className="text-[10px] text-slate-400 mt-1">Client: {c.customerName}</p>
        </div>
        <span
          className={cn(
            'text-[9px] font-bold px-1.5 py-0.5 rounded font-mono uppercase',
            c.priority === 'critical'
              ? 'bg-rose-500/10 text-rose-400'
              : c.priority === 'high'
              ? 'bg-amber-500/10 text-amber-400'
              : 'bg-indigo-400/10 text-indigo-400'
          )}
        >
          {c.priority}
        </span>
      </div>

      {/* Progress & Responders */}
      <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-[9px]">
            {c.assigneeAvatar}
          </div>
          <span className="text-[10px] text-slate-400">{c.assigneeName}</span>
        </div>
        <SLADisplay deadline={c.slaDeadline} />
      </div>
    </div>
  )
}

function EmptyQuadrant() {
  return (
    <div className="p-8 text-center border border-dashed border-white/5 rounded-xl text-[10px] text-slate-600 bg-black/5">
      No items in this quadrant
    </div>
  )
}
