import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChatMessage, AIInsight } from '@/types'
import { mockInitialMessages, mockAIInsights } from '@/lib/mock-data'

// ─── Sidebar Store ─────────────────────────────────────────────────────────────

interface SidebarStore {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  toggle: () => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      collapsed: false,
      setCollapsed: (v) => set({ collapsed: v }),
      toggle: () => set((s) => ({ collapsed: !s.collapsed })),
    }),
    { name: 'synapse-sidebar' },
  ),
)

// ─── Command Palette Store ────────────────────────────────────────────────────

interface CommandStore {
  open: boolean
  setOpen: (v: boolean) => void
  toggle: () => void
}

export const useCommandStore = create<CommandStore>()((set) => ({
  open: false,
  setOpen: (v) => set({ open: v }),
  toggle: () => set((s) => ({ open: !s.open })),
}))

// ─── AI Assistant Store ────────────────────────────────────────────────────────

interface AIStore {
  messages: ChatMessage[]
  insights: AIInsight[]
  isTyping: boolean
  addMessage: (msg: ChatMessage) => void
  setTyping: (v: boolean) => void
  clearMessages: () => void
}

export const useAIStore = create<AIStore>()((set) => ({
  messages: mockInitialMessages,
  insights: mockAIInsights,
  isTyping: false,
  addMessage: (msg) =>
    set((s) => ({ messages: [...s.messages, msg] })),
  setTyping: (v) => set({ isTyping: v }),
  clearMessages: () => set({ messages: mockInitialMessages }),
}))

// ─── Escalation Store ─────────────────────────────────────────────────────────

interface EscalationStore {
  filterPriority: string
  filterStatus: string
  setFilterPriority: (v: string) => void
  setFilterStatus: (v: string) => void
}

export const useEscalationStore = create<EscalationStore>()((set) => ({
  filterPriority: 'all',
  filterStatus: 'all',
  setFilterPriority: (v) => set({ filterPriority: v }),
  setFilterStatus: (v) => set({ filterStatus: v }),
}))

// ─── Recruitment Store ─────────────────────────────────────────────────────────

interface RecruitmentStore {
  searchQuery: string
  filterStage: string
  setSearchQuery: (v: string) => void
  setFilterStage: (v: string) => void
  selectedCandidateId: string | null
  setSelectedCandidateId: (v: string | null) => void
}

export const useRecruitmentStore = create<RecruitmentStore>()((set) => ({
  searchQuery: '',
  filterStage: 'all',
  setSearchQuery: (v) => set({ searchQuery: v }),
  setFilterStage: (v) => set({ filterStage: v }),
  selectedCandidateId: null,
  setSelectedCandidateId: (v) => set({ selectedCandidateId: v }),
}))

// ─── Knowledge Graph Store ────────────────────────────────────────────────────

interface KnowledgeStore {
  selectedNodeId: string | null
  filterType: string
  searchQuery: string
  setSelectedNodeId: (v: string | null) => void
  setFilterType: (v: string) => void
  setSearchQuery: (v: string) => void
}

export const useKnowledgeStore = create<KnowledgeStore>()((set) => ({
  selectedNodeId: null,
  filterType: 'all',
  searchQuery: '',
  setSelectedNodeId: (v) => set({ selectedNodeId: v }),
  setFilterType: (v) => set({ filterType: v }),
  setSearchQuery: (v) => set({ searchQuery: v }),
}))
