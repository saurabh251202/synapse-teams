'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  UserPlus,
  Calendar,
  Briefcase,
  MapPin,
  DollarSign,
  TrendingUp,
  Tag,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Users,
} from 'lucide-react'
import { mockCandidates } from '@/lib/mock-data'
import { useRecruitmentStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import type { CandidateStage } from '@/types'

const COLUMNS: { id: CandidateStage; label: string; color: string }[] = [
  { id: 'applied', label: 'Applied', color: 'border-slate-500/20 text-slate-400 bg-slate-500/5' },
  { id: 'screening', label: 'Screening', color: 'border-indigo-500/20 text-indigo-400 bg-indigo-500/5' },
  { id: 'interview', label: 'Interview', color: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/5' },
  { id: 'technical', label: 'Technical', color: 'border-violet-500/20 text-violet-400 bg-violet-500/5' },
  { id: 'offer', label: 'Offer', color: 'border-amber-500/20 text-amber-400 bg-amber-500/5' },
  { id: 'hired', label: 'Hired', color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' },
]

export default function RecruitmentHub() {
  const {
    searchQuery,
    filterStage,
    setSearchQuery,
    setFilterStage,
    selectedCandidateId,
    setSelectedCandidateId,
  } = useRecruitmentStore()

  const [candidates, setCandidates] = useState(mockCandidates)

  // Move candidate to a different stage
  const moveCandidate = (candidateId: string, targetStage: CandidateStage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: targetStage, lastActivity: new Date().toISOString().split('T')[0] } : c))
    )
  }

  // Filter candidates based on search & column filters
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStage = filterStage === 'all' || c.stage === filterStage
    return matchesSearch && matchesStage
  })

  // Selected candidate object
  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId)

  // Kanban column statistics
  const getColCount = (stage: string) => candidates.filter((c) => c.stage === stage).length
  const getAvgColScore = (stage: string) => {
    const colItems = candidates.filter((c) => c.stage === stage)
    if (!colItems.length) return 0
    return Math.round(colItems.reduce((acc, curr) => acc + curr.score, 0) / colItems.length)
  }

  return (
    <div className="space-y-8 p-1 sm:p-3">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-indigo-400" />
            Recruitment Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage candidates, track hiring pipelines, and review candidate scorecards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-all">
            <Calendar className="w-4 h-4 text-cyan-400" />
            Schedule Interview
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Plus className="w-4 h-4" />
            Add Candidate
          </button>
        </div>
      </div>

      {/* Recruitment KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Candidates', value: candidates.length, desc: 'Across 6 stages', icon: Users, color: 'text-indigo-400' },
          { label: 'Time-to-Hire', value: '14 days', desc: 'Industry avg: 22 days', icon: Clock, color: 'text-cyan-400' },
          { label: 'Pipeline Quality', value: '85%', desc: 'Avg score: 85/100', icon: Star, color: 'text-amber-400' },
          { label: 'Total Hired', value: candidates.filter(c => c.stage === 'hired').length, desc: 'This quarter', icon: CheckCircle2, color: 'text-emerald-400' },
        ].map((kpi, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-white/5 bg-[#0d0d1f]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{kpi.label}</span>
              <kpi.icon className={cn('w-4 h-4', kpi.color)} />
            </div>
            <div className="text-lg font-bold text-white mt-1.5">{kpi.value}</div>
            <p className="text-[10px] text-slate-500 mt-0.5">{kpi.desc}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-[#0d0d1f]">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search candidates, skills, or titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#05050f] border border-white/5 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="bg-[#05050f] border border-white/5 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50 w-full sm:w-auto"
          >
            <option value="all">All Stages</option>
            {COLUMNS.map((col) => (
              <option key={col.id} value={col.id}>
                {col.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colCandidates = filteredCandidates.filter((c) => c.stage === col.id)

          return (
            <div key={col.id} className="flex flex-col gap-4 min-w-[200px] shrink-0">
              {/* Column Header */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', col.color)}>
                    {col.label}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">{getColCount(col.id)}</span>
                </div>
                {getColCount(col.id) > 0 && (
                  <span className="text-[10px] text-slate-500 font-mono">
                    Score: {getAvgColScore(col.id)}%
                  </span>
                )}
              </div>

              {/* Column Cards */}
              <div className="flex flex-col gap-3 min-h-[300px] p-2 rounded-xl bg-white/2 border border-white/2">
                {colCandidates.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/5 rounded-lg">
                    <p className="text-[10px] text-slate-600">No candidates</p>
                  </div>
                ) : (
                  colCandidates.map((candidate) => (
                    <motion.div
                      layoutId={`candidate-${candidate.id}`}
                      key={candidate.id}
                      onClick={() => setSelectedCandidateId(candidate.id)}
                      className={cn(
                        'p-3 rounded-xl border bg-[#0f0f29] transition-all cursor-pointer hover:translate-y-[-2px]',
                        selectedCandidateId === candidate.id ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'border-white/5 hover:border-white/10'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center font-bold text-xs text-white shrink-0">
                            {candidate.avatar}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-white truncate">{candidate.name}</h4>
                            <p className="text-[10px] text-slate-400 truncate">{candidate.role}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded font-mono">
                          {candidate.score}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {candidate.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Card Footer */}
                      <div className="flex items-center justify-between border-t border-white/5 mt-3 pt-2">
                        <span className="text-[9px] text-slate-500">Act: {candidate.lastActivity}</span>
                        <div className="flex items-center gap-1">
                          {COLUMNS.slice(COLUMNS.findIndex((c) => c.id === col.id) + 1).slice(0, 1).map((nextCol) => (
                            <button
                              key={nextCol.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                moveCandidate(candidate.id, nextCol.id)
                              }}
                              className="p-1 rounded bg-white/5 hover:bg-indigo-600 hover:text-white text-slate-400 transition-colors"
                              title={`Advance to ${nextCol.label}`}
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Candidate Detail Modal */}
      <AnimatePresence>
        {selectedCandidateId && selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#0b0b1e] border border-indigo-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-start justify-between bg-gradient-to-r from-indigo-950/20 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-lg font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    {selectedCandidate.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedCandidate.name}</h3>
                    <p className="text-xs text-indigo-400">{selectedCandidate.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-slate-800 text-slate-300 font-bold px-2 py-1 rounded-lg border border-slate-700">
                    Eval Score: {selectedCandidate.score}/100
                  </span>
                  <button
                    onClick={() => setSelectedCandidateId(null)}
                    className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-5 h-5 rotate-45" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[400px]">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-white/2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                      Role Source
                    </span>
                    <p className="text-xs font-semibold text-white mt-1">{selectedCandidate.source}</p>
                  </div>
                  <div className="p-3 bg-white/2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      Location
                    </span>
                    <p className="text-xs font-semibold text-white mt-1">{selectedCandidate.location}</p>
                  </div>
                  <div className="p-3 bg-white/2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                      Salary Range
                    </span>
                    <p className="text-xs font-semibold text-white mt-1">{selectedCandidate.salary}</p>
                  </div>
                  <div className="p-3 bg-white/2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-violet-400" />
                      Applied Date
                    </span>
                    <p className="text-xs font-semibold text-white mt-1">{selectedCandidate.appliedAt}</p>
                  </div>
                </div>

                {/* Candidate Notes */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Interviewer Evaluation</h5>
                  <div className="p-4 rounded-xl bg-white/2 border border-white/5 text-xs text-slate-300 leading-relaxed italic">
                    "{selectedCandidate.notes}"
                  </div>
                </div>

                {/* Tags & Action Plan */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] font-bold text-slate-500 uppercase">Tags & Skills</h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedCandidate.tags.map((t, idx) => (
                        <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Assigned Interviewer:</span>
                    <span className="text-xs font-semibold text-white">{selectedCandidate.interviewer}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/5 flex items-center justify-between bg-white/2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Move candidate:</span>
                  <div className="flex gap-1">
                    {COLUMNS.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => moveCandidate(selectedCandidate.id, col.id)}
                        className={cn(
                          'px-2.5 py-1 rounded text-[10px] font-bold border transition-colors',
                          selectedCandidate.stage === col.id
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-[#0f0f29] border-white/5 text-slate-400 hover:text-slate-200'
                        )}
                      >
                        {col.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCandidateId(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
