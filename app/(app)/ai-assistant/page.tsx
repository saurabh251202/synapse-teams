'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Send,
  User,
  Sparkles,
  AlertTriangle,
  Zap,
  TrendingUp,
  CheckCircle,
  HelpCircle,
  Plus,
  RefreshCw,
  ArrowRight,
} from 'lucide-react'
import { useAIStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function AIAssistant() {
  const { messages, insights, isTyping, addMessage, setTyping, clearMessages } = useAIStore()
  const [inputValue, setInputValue] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Scroll chat to bottom whenever messages are updated
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simple automated chat response dictionary
  const getAIResponse = (input: string): string => {
    const text = input.toLowerCase()
    if (text.includes('burnout') || text.includes('priya')) {
      return `Priya Patel's workload is currently at **91%**, which is 15% higher than the engineering baseline. Slack response latency has increased by **40%** in the past week. 

**Recommended Action:**
1. Re-assign **SSO Integration** card from Priya to Tom Brooks.
2. Schedule a 1:1 sync with Priya to adjust deliverables. Would you like me to draft a Slack message to her?`
    }
    if (text.includes('escalation') || text.includes('incident')) {
      return `There are currently **7 open customer escalations** (2 Critical, 3 High). 

**Alerts:**
• Critical ticket **Production API Latency Spike** is at risk of breach in **40 minutes**. Responder Alex Rivera is active.
• High ticket **Slack webhook delay** has been unassigned for 3 hours. 

I recommend assigning **Tom Brooks** to the Slack webhook issue as he has domain expertise.`
    }
    if (text.includes('hire') || text.includes('recruitment')) {
      return `Your recruitment funnel is stable with **23 active candidates**. 

**Updates:**
• **Jordan Lee** (Senior Frontend) has been extended an offer.
• **Dana Kim** (Product Designer) is in the technical stage.
• The average velocity in the "Interview" stage is **12 days** (target is 7 days). Recommend scheduling more slots.`
    }
    return `I've analyzed your teams workspace. 

Key performance indicators show:
• **Team Health**: 87/100 (high)
• **SLA Compliance**: 96%
• **Operations**: Stable

Please ask me details about: "Is Priya Patel burnt out?", "Show escalations status", or "Hiring funnel updates".`
  }

  // Handle message send
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMsg = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: inputValue,
      timestamp: new Date().toISOString(),
    }
    addMessage(userMsg)
    setInputValue('')
    setTyping(true)

    // Simulate AI thinking and typing latency
    setTimeout(() => {
      const reply = getAIResponse(userMsg.content)
      const assistantMsg = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant' as const,
        content: reply,
        timestamp: new Date().toISOString(),
        type: 'insight' as const,
      }
      addMessage(assistantMsg)
      setTyping(false)
    }, 1200)
  }

  // Handle insight quick actions
  const triggerInsightAction = (title: string) => {
    const actionQuery = `Tell me more about: ${title}`
    const userMsg = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: actionQuery,
      timestamp: new Date().toISOString(),
    }
    addMessage(userMsg)
    setTyping(true)

    setTimeout(() => {
      const reply = getAIResponse(title)
      const assistantMsg = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant' as const,
        content: reply,
        timestamp: new Date().toISOString(),
        type: 'insight' as const,
      }
      addMessage(assistantMsg)
      setTyping(false)
    }, 1000)
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6 p-1 sm:p-3">
      {/* Chat Workspace (Left side) */}
      <div className="flex-1 flex flex-col rounded-2xl border border-white/5 bg-[#0d0d1f] overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-gradient-to-r from-indigo-950/25 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                AI Operations Assistant
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </h2>
              <p className="text-[10px] text-slate-400">Trained on real-time team workloads, escalations, & recruitment metrics.</p>
            </div>
          </div>
          <button
            onClick={clearMessages}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-[10px] font-semibold text-slate-300 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Clear
          </button>
        </div>

        {/* Message Streams */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isAI = msg.role === 'assistant'
            return (
              <div
                key={msg.id}
                className={cn(
                  'flex gap-3 max-w-[85%]',
                  isAI ? 'self-start' : 'self-end flex-row-reverse ml-auto'
                )}
              >
                {/* Avatar Icon */}
                <div
                  className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-xs font-bold font-mono',
                    isAI
                      ? 'bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border-indigo-500/20 text-indigo-400'
                      : 'bg-indigo-600 border-indigo-500 text-white'
                  )}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    'p-4 rounded-2xl border text-xs leading-relaxed',
                    isAI
                      ? 'bg-[#0f0f29] border-white/5 text-slate-200'
                      : 'bg-indigo-600/15 border-indigo-500/30 text-white'
                  )}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <span className="text-[8px] text-slate-500 mt-2 block text-right font-mono">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            )}
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[80%] self-start">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="p-3 rounded-2xl bg-[#0f0f29] border border-white/5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-[#05050f] flex gap-2">
          <input
            type="text"
            placeholder="Query workspace alerts (e.g. 'check priya burnout metrics', 'list escalations')..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-white/2 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/40"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-[0_0_10px_rgba(99,102,241,0.3)] shrink-0 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Operational Insights side panel */}
      <div className="w-full lg:w-[320px] shrink-0 space-y-4">
        <div className="p-4 rounded-xl border border-white/5 bg-[#0d0d1f]">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI Workspace Signals
          </h3>

          <div className="space-y-3">
            {insights.map((ins) => {
              const isRisk = ins.type === 'risk'
              const isBottle = ins.type === 'bottleneck'

              return (
                <div
                  key={ins.id}
                  className={cn(
                    'p-3.5 rounded-xl border flex flex-col gap-2.5 transition-all',
                    isRisk
                      ? 'border-rose-500/20 bg-rose-500/5'
                      : isBottle
                      ? 'border-amber-500/20 bg-amber-500/5'
                      : 'border-white/5 bg-white/2'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {isRisk ? (
                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                      ) : isBottle ? (
                        <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0" />
                      )}
                      <h4 className="text-[11px] font-bold text-white truncate">{ins.title}</h4>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{ins.description}</p>
                  
                  {ins.actionable && ins.action && (
                    <button
                      onClick={() => triggerInsightAction(ins.title)}
                      className={cn(
                        'w-fit py-1 px-2.5 rounded text-[9px] font-bold flex items-center gap-1 transition-colors self-end',
                        isRisk
                          ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400'
                          : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400'
                      )}
                    >
                      {ins.action}
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
