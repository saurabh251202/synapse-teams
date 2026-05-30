// ─── Core Entity Types ───────────────────────────────────────────────────────

export type Role =
  | 'admin'
  | 'manager'
  | 'engineer'
  | 'designer'
  | 'analyst'
  | 'recruiter'
  | 'customer-success'
  | 'devops'

export type Status = 'active' | 'inactive' | 'on-leave' | 'onboarding'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: Role
  title: string
  teamId: string
  status: Status
  joinedAt: string
  location: string
  timezone: string
  skills: string[]
  workload: number        // 0-100
  performance: number     // 0-100
  satisfaction: number    // 0-100
  productivity: number    // 0-100
}

export interface Team {
  id: string
  name: string
  description: string
  color: string
  icon: string
  memberCount: number
  healthScore: number     // 0-100
  productivity: number    // 0-100
  leadId: string
  createdAt: string
  projects: number
  openEscalations: number
}

// ─── Recruitment ──────────────────────────────────────────────────────────────

export type CandidateStage =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'technical'
  | 'offer'
  | 'hired'
  | 'rejected'

export interface Candidate {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  stage: CandidateStage
  score: number           // 0-100
  appliedAt: string
  lastActivity: string
  interviewer: string
  tags: string[]
  source: string
  location: string
  salary: string
  notes: string
}

// ─── Onboarding ───────────────────────────────────────────────────────────────

export type ModuleStatus = 'completed' | 'in-progress' | 'locked' | 'not-started'

export interface TrainingModule {
  id: string
  title: string
  description: string
  duration: number        // minutes
  status: ModuleStatus
  progress: number        // 0-100
  category: string
  required: boolean
  completedAt?: string
}

export interface OnboardingEmployee {
  id: string
  userId: string
  name: string
  avatar: string
  role: string
  startDate: string
  overallProgress: number // 0-100
  modules: TrainingModule[]
  mentor: string
  readinessScore: number  // 0-100
}

// ─── Escalations ─────────────────────────────────────────────────────────────

export type EscalationPriority = 'critical' | 'high' | 'medium' | 'low'
export type EscalationStatus = 'open' | 'in-progress' | 'resolved' | 'escalated'

export interface Escalation {
  id: string
  title: string
  description: string
  priority: EscalationPriority
  status: EscalationStatus
  assigneeId: string
  assigneeName: string
  assigneeAvatar: string
  customerId: string
  customerName: string
  slaDeadline: string
  createdAt: string
  updatedAt: string
  resolutionProgress: number  // 0-100
  tags: string[]
  impact: 'high' | 'medium' | 'low'
  urgency: 'high' | 'medium' | 'low'
}

// ─── Knowledge Graph ──────────────────────────────────────────────────────────

export type KnowledgeNodeType =
  | 'team'
  | 'process'
  | 'document'
  | 'training'
  | 'customer-feedback'
  | 'tool'

export interface KnowledgeNode {
  id: string
  title: string
  type: KnowledgeNodeType
  description: string
  tags: string[]
  connections: string[]   // IDs of connected nodes
  position: { x: number; y: number }
  lastUpdated: string
  author: string
  viewCount: number
}

// ─── Collaboration ────────────────────────────────────────────────────────────

export type FeedbackStatus = 'open' | 'planned' | 'in-progress' | 'completed' | 'declined'
export type FeedbackCategory = 'feature' | 'bug' | 'improvement' | 'question'

export interface FeedbackItem {
  id: string
  title: string
  description: string
  category: FeedbackCategory
  status: FeedbackStatus
  votes: number
  hasVoted: boolean
  authorId: string
  authorName: string
  authorAvatar: string
  teamId: string
  teamName: string
  createdAt: string
  comments: number
  tags: string[]
}

export interface Announcement {
  id: string
  title: string
  content: string
  authorId: string
  authorName: string
  authorAvatar: string
  teamId: string
  teamName: string
  createdAt: string
  type: 'info' | 'success' | 'warning' | 'celebration'
  pinned: boolean
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface MetricDataPoint {
  date: string
  value: number
  label?: string
}

export interface TeamMetrics {
  healthScore: number
  productivity: number
  satisfaction: number
  performance: number
  escalations: number
  onboardingRate: number
  retentionRate: number
  velocityTrend: MetricDataPoint[]
  satisfactionTrend: MetricDataPoint[]
  performanceTrend: MetricDataPoint[]
}

// ─── AI Assistant ─────────────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
  type?: 'text' | 'insight' | 'action' | 'alert'
}

export interface AIInsight {
  id: string
  type: 'risk' | 'recommendation' | 'bottleneck' | 'achievement'
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  actionable: boolean
  action?: string
  metric?: string
  change?: number
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  id: string
  label: string
  href: string
  icon: string
  badge?: number | string
  description: string
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface KPICard {
  id: string
  label: string
  value: string | number
  change: number          // percentage change
  changeLabel: string
  trend: 'up' | 'down' | 'neutral'
  sparkline: number[]
  color: 'primary' | 'accent' | 'emerald' | 'rose' | 'amber' | 'violet'
  icon: string
}

export interface ActivityItem {
  id: string
  type: 'escalation' | 'hire' | 'onboard' | 'announcement' | 'alert' | 'achievement'
  title: string
  description: string
  timestamp: string
  userId: string
  userName: string
  userAvatar: string
  metadata?: Record<string, string | number>
}
