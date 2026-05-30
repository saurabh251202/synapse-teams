'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  Volume2,
  ChevronUp,
  MessageCircle,
  Tag,
  Pin,
  Calendar,
  Sparkles,
  Plus,
  Send,
  CheckCircle,
  AlertCircle,
  Filter,
} from 'lucide-react'
import { mockFeedback, mockAnnouncements } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function CollaborationBoard() {
  const [feedbacks, setFeedbacks] = useState(mockFeedback)
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [activeTab, setActiveTab] = useState<'feedback' | 'announcements'>('feedback')
  
  // States for creating new feedback
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newCat, setNewCat] = useState('feature')
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Handle upvoting
  const handleVote = (id: string) => {
    setFeedbacks((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const updatedHasVoted = !item.hasVoted
        const updatedVotes = updatedHasVoted ? item.votes + 1 : item.votes - 1
        return {
          ...item,
          hasVoted: updatedHasVoted,
          votes: updatedVotes,
        }
      })
    )
  }

  // Handle submit feedback
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newItem = {
      id: `f-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      category: newCat as 'feature' | 'improvement',
      status: 'open' as const,
      votes: 1,
      hasVoted: true,
      authorId: 'u1',
      authorName: 'Alex Rivera',
      authorAvatar: 'AR',
      teamId: 't1',
      teamName: 'Engineering',
      createdAt: new Date().toISOString().split('T')[0],
      comments: 0,
      tags: [newCat],
    }

    setFeedbacks([newItem, ...feedbacks])
    setNewTitle('')
    setNewDesc('')
    setIsFormOpen(false)
  }

  return (
    <div className="space-y-8 p-1 sm:p-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
            Collaboration Board
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Collect cross-functional feedback, pitch feature enhancements, and announce releases.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-slate-700 bg-slate-800/40 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab('feedback')}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-semibold transition-all',
                activeTab === 'feedback' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              Feature Board
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-semibold transition-all',
                activeTab === 'announcements' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              Announcements
            </button>
          </div>
          {activeTab === 'feedback' && (
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            >
              <Plus className="w-4 h-4" />
              Pitch Idea
            </button>
          )}
        </div>
      </div>

      {/* Slide / Tabs Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'feedback' ? (
          <motion.div
            key="feedback-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* New Pitch form modal drawer */}
            <AnimatePresence>
              {isFormOpen && (
                <motion.form
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onSubmit={handleSubmitFeedback}
                  className="p-6 bg-[#0d0d1f] border border-indigo-500/20 rounded-2xl space-y-4 overflow-hidden"
                >
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">Pitch a New Enhancement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] text-slate-400 uppercase font-bold">Idea title</label>
                      <input
                        type="text"
                        placeholder="e.g. Real-time checklist sync on onboarding pages..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-[#05050f] border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-400 uppercase font-bold">Category</label>
                      <select
                        value={newCat}
                        onChange={(e) => setNewCat(e.target.value)}
                        className="w-full bg-[#05050f] border border-white/5 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
                      >
                        <option value="feature">New Feature</option>
                        <option value="improvement">UX Improvement</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">Details & description</label>
                    <textarea
                      rows={3}
                      placeholder="Outline why this helps and which teams benefit..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-[#05050f] border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                    >
                      Post Idea
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* List of Feedback ideas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbacks.map((f) => (
                <div
                  key={f.id}
                  className="p-5 rounded-2xl border border-white/5 bg-[#0d0d1f] hover:border-white/10 transition-all flex gap-4"
                >
                  {/* Upvote controller */}
                  <div className="flex flex-col items-center shrink-0">
                    <button
                      onClick={() => handleVote(f.id)}
                      className={cn(
                        'w-10 h-10 rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer',
                        f.hasVoted
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                          : 'bg-[#0f0f29] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-[#151538]'
                      )}
                    >
                      <ChevronUp className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] font-bold font-mono mt-0.5 leading-none">{f.votes}</span>
                    </button>
                  </div>

                  {/* Pitch description */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={cn(
                          'text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider',
                          f.category === 'feature'
                            ? 'bg-indigo-500/10 text-indigo-400'
                            : 'bg-cyan-500/10 text-cyan-400'
                        )}
                      >
                        {f.category}
                      </span>
                      <span
                        className={cn(
                          'text-[9px] px-1.5 py-0.5 rounded font-mono',
                          f.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : f.status === 'in-progress'
                            ? 'bg-indigo-500/10 text-indigo-400'
                            : f.status === 'planned'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-slate-800 text-slate-400'
                        )}
                      >
                        {f.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-white leading-snug">{f.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{f.description}</p>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[9px] text-slate-500">
                      <span>By: {f.authorName} ({f.teamName})</span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-slate-500" />
                        {f.comments} comments
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Announcements panel */
          <motion.div
            key="announcements-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4">
              {announcements.map((ann) => {
                const isPin = ann.pinned
                return (
                  <div
                    key={ann.id}
                    className={cn(
                      'p-5 rounded-2xl border transition-all relative flex flex-col sm:flex-row sm:items-start justify-between gap-4',
                      isPin
                        ? 'border-indigo-500/20 bg-indigo-500/5 shadow-[0_0_15px_rgba(99,102,241,0.05)]'
                        : 'border-white/5 bg-[#0d0d1f]'
                    )}
                  >
                    {isPin && (
                      <span className="absolute top-4 right-4 text-indigo-400" title="Pinned Announcement">
                        <Pin className="w-4 h-4 fill-indigo-400 rotate-[45deg]" />
                      </span>
                    )}

                    <div className="flex-1 space-y-3 pr-8">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-bold uppercase tracking-wider font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/15">
                          {ann.type}
                        </span>
                        <span className="text-[9px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(ann.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white leading-snug">{ann.title}</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">{ann.content}</p>
                      </div>

                      <div className="text-[10px] text-slate-500 pt-1">
                        Posted by: <span className="font-semibold text-slate-300">{ann.authorName}</span> — {ann.teamName}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
