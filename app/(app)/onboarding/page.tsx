'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Users,
  CheckCircle2,
  Play,
  Lock,
  Calendar,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Plus,
} from 'lucide-react'
import { mockOnboarding } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function OnboardingCenter() {
  const [employees, setEmployees] = useState(mockOnboarding)
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || '')

  // Toggle a module state
  const toggleModuleStatus = (empId: string, moduleId: string) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== empId) return emp

        const updatedModules = emp.modules.map((mod) => {
          if (mod.id !== moduleId) return mod

          // Cycle through completed -> in-progress -> not-started
          let nextStatus: 'completed' | 'in-progress' | 'not-started' = 'not-started'
          let nextProgress = 0
          let completedAt: string | undefined = undefined

          if (mod.status === 'not-started') {
            nextStatus = 'in-progress'
            nextProgress = 40
          } else if (mod.status === 'in-progress') {
            nextStatus = 'completed'
            nextProgress = 100
            completedAt = new Date().toISOString().split('T')[0]
          }

          return { ...mod, status: nextStatus, progress: nextProgress, completedAt }
        })

        // Recalculate overall progress & readiness
        const completedCount = updatedModules.filter((m) => m.status === 'completed').length
        const totalCount = updatedModules.length
        const overallProgress = Math.round((completedCount / totalCount) * 100)
        // Simple readiness scoring (based on overall progress and average module progress)
        const totalProgressSum = updatedModules.reduce((acc, m) => acc + m.progress, 0)
        const readinessScore = Math.round((totalProgressSum / (totalCount * 100)) * 100)

        // Dynamically unlock the next locked module if the previous one is completed
        const finalModules = updatedModules.map((m, idx, arr) => {
          if (m.status === 'locked' && idx > 0 && arr[idx - 1].status === 'completed') {
            return { ...m, status: 'not-started' as const }
          }
          return m
        })

        return {
          ...emp,
          modules: finalModules,
          overallProgress,
          readinessScore,
        }
      })
    )
  }

  const selectedEmp = employees.find((e) => e.id === selectedEmpId)

  return (
    <div className="space-y-8 p-1 sm:p-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            Onboarding Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track onboarding progression, learning courses, and workspace alignment indices for new hires.
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] w-fit">
          <Plus className="w-4 h-4" />
          Enroll New Hire
        </button>
      </div>

      {/* Onboarding Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Onboardings', value: employees.length, desc: 'Currently enrolled', icon: Users, color: 'text-indigo-400' },
          { label: 'Avg Readiness', value: '46%', desc: 'Workspace alignment index', icon: TrendingUp, color: 'text-cyan-400' },
          { label: 'Modules Completed', value: employees.reduce((acc, curr) => acc + curr.modules.filter(m => m.status === 'completed').length, 0), desc: 'Across all guides', icon: CheckCircle2, color: 'text-emerald-400' },
          { label: 'Certifications Issued', value: 12, desc: 'SOC2 & Tool proficiency', icon: Award, color: 'text-amber-400' },
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

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* New Hires List Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl border border-white/5 bg-[#0d0d1f]">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Active Enrollees</h3>
            <div className="space-y-3">
              {employees.map((emp) => {
                const isActive = emp.id === selectedEmpId
                return (
                  <div
                    key={emp.id}
                    onClick={() => setSelectedEmpId(emp.id)}
                    className={cn(
                      'p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-3',
                      isActive
                        ? 'border-indigo-500 bg-indigo-500/5 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                        : 'border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/5'
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center font-bold text-xs text-white shrink-0">
                          {emp.avatar}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">{emp.name}</h4>
                          <p className="text-[10px] text-slate-400 truncate">{emp.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Starts: {emp.startDate}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Onboarding Completion</span>
                        <span className="font-semibold text-indigo-400 font-mono">{emp.overallProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#05050f] rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
                          style={{ width: `${emp.overallProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Detail Badges */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[10px]">
                      <span className="text-slate-500">Mentor: {emp.mentor}</span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        Readiness: {emp.readinessScore}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Selected Hire Modules Checklist */}
        <div className="lg:col-span-8 space-y-6">
          {selectedEmp ? (
            <div className="p-6 rounded-xl border border-white/5 bg-[#0d0d1f] space-y-6">
              {/* Profile Card Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5 bg-gradient-to-r from-indigo-950/20 to-transparent p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    {selectedEmp.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedEmp.name}</h3>
                    <p className="text-xs text-indigo-400">{selectedEmp.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center sm:text-right">
                    <span className="text-[10px] text-slate-500 block">Mentor</span>
                    <span className="text-xs font-semibold text-slate-200">{selectedEmp.mentor}</span>
                  </div>
                  <div className="text-center sm:text-right">
                    <span className="text-[10px] text-slate-500 block">Readiness Index</span>
                    <span className="text-xs font-bold text-emerald-400">{selectedEmp.readinessScore}/100</span>
                  </div>
                </div>
              </div>

              {/* Guide Modules List */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Onboarding Syllabus & Tasks
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {selectedEmp.modules.map((mod) => {
                    const isLocked = mod.status === 'locked'
                    const isCompleted = mod.status === 'completed'
                    const isInProgress = mod.status === 'in-progress'

                    return (
                      <div
                        key={mod.id}
                        onClick={() => !isLocked && toggleModuleStatus(selectedEmp.id, mod.id)}
                        className={cn(
                          'p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer',
                          isLocked
                            ? 'border-white/2 bg-white/1 opacity-50 cursor-not-allowed'
                            : isCompleted
                            ? 'border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10'
                            : isInProgress
                            ? 'border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10'
                            : 'border-white/5 bg-white/2 hover:border-white/5'
                        )}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Left Status Icon Indicator */}
                          <div className="shrink-0 mt-0.5">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : isInProgress ? (
                              <div className="w-5 h-5 rounded-full border border-indigo-400 flex items-center justify-center">
                                <Play className="w-2.5 h-2.5 text-indigo-400 fill-indigo-400" />
                              </div>
                            ) : isLocked ? (
                              <Lock className="w-5 h-5 text-slate-600" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-slate-600" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="text-xs font-semibold text-white truncate">{mod.title}</h5>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                                {mod.category}
                              </span>
                              {mod.required && (
                                <span className="text-[9px] px-1 text-rose-400 bg-rose-500/10 rounded font-semibold border border-rose-500/15">
                                  Required
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">{mod.description}</p>
                          </div>
                        </div>

                        {/* Status / Duration Metrics */}
                        <div className="flex items-center gap-4 sm:shrink-0 justify-end">
                          <span className="text-[10px] text-slate-500">{mod.duration} mins</span>
                          {isCompleted && mod.completedAt ? (
                            <span className="text-[9px] text-slate-500">Done: {mod.completedAt}</span>
                          ) : (
                            <div className="w-16 h-1 bg-[#05050f] rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  'h-full rounded-full transition-all duration-300',
                                  isInProgress ? 'bg-indigo-500' : 'bg-transparent'
                                )}
                                style={{ width: `${mod.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Module Progress Warning */}
              {selectedEmp.modules.some((m) => m.status === 'locked') && (
                <div className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-lg flex items-start gap-2 text-[10px] text-slate-400">
                  <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Some modules are currently locked. Completing preceding required modules will automatically unlock them in chronological sequence.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/5 rounded-xl min-h-[300px]">
              <AlertCircle className="w-8 h-8 text-slate-600 mb-2" />
              <p className="text-xs text-slate-500">No active onboarding employee selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
