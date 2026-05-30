import type {
  User,
  Team,
  Candidate,
  OnboardingEmployee,
  Escalation,
  KnowledgeNode,
  FeedbackItem,
  Announcement,
  ActivityItem,
  KPICard,
  AIInsight,
  ChatMessage,
} from '@/types'
import { generateSparkline, generateTrendData } from '@/lib/utils'

// ─── Mock Users ──────────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Alex Rivera',
    email: 'alex.rivera@synapse.io',
    avatar: 'AR',
    role: 'manager',
    title: 'Engineering Lead',
    teamId: 't1',
    status: 'active',
    joinedAt: '2023-01-15',
    location: 'San Francisco, CA',
    timezone: 'PST',
    skills: ['TypeScript', 'React', 'System Design', 'Leadership', 'Node.js'],
    workload: 78,
    performance: 94,
    satisfaction: 88,
    productivity: 92,
  },
  {
    id: 'u2',
    name: 'Sarah Chen',
    email: 'sarah.chen@synapse.io',
    avatar: 'SC',
    role: 'manager',
    title: 'Product Manager',
    teamId: 't2',
    status: 'active',
    joinedAt: '2022-09-01',
    location: 'New York, NY',
    timezone: 'EST',
    skills: ['Product Strategy', 'UX Research', 'Roadmapping', 'Analytics', 'Figma'],
    workload: 85,
    performance: 91,
    satisfaction: 92,
    productivity: 89,
  },
  {
    id: 'u3',
    name: 'Marcus Johnson',
    email: 'marcus.j@synapse.io',
    avatar: 'MJ',
    role: 'customer-success',
    title: 'Customer Success Manager',
    teamId: 't3',
    status: 'active',
    joinedAt: '2023-03-20',
    location: 'Austin, TX',
    timezone: 'CST',
    skills: ['CRM', 'Relationship Management', 'Data Analysis', 'Communication', 'Zendesk'],
    workload: 72,
    performance: 87,
    satisfaction: 85,
    productivity: 83,
  },
  {
    id: 'u4',
    name: 'Priya Patel',
    email: 'priya.patel@synapse.io',
    avatar: 'PP',
    role: 'engineer',
    title: 'Senior Software Engineer',
    teamId: 't1',
    status: 'active',
    joinedAt: '2022-06-10',
    location: 'Seattle, WA',
    timezone: 'PST',
    skills: ['Python', 'Go', 'Kubernetes', 'PostgreSQL', 'Redis'],
    workload: 91,
    performance: 96,
    satisfaction: 79,
    productivity: 95,
  },
  {
    id: 'u5',
    name: 'Jake Wilson',
    email: 'jake.w@synapse.io',
    avatar: 'JW',
    role: 'designer',
    title: 'UX Designer',
    teamId: 't4',
    status: 'active',
    joinedAt: '2023-05-15',
    location: 'Los Angeles, CA',
    timezone: 'PST',
    skills: ['Figma', 'Prototyping', 'User Research', 'Motion Design', 'CSS'],
    workload: 65,
    performance: 88,
    satisfaction: 94,
    productivity: 86,
  },
  {
    id: 'u6',
    name: 'Maya Rodriguez',
    email: 'maya.r@synapse.io',
    avatar: 'MR',
    role: 'analyst',
    title: 'Data Analyst',
    teamId: 't1',
    status: 'active',
    joinedAt: '2023-07-01',
    location: 'Chicago, IL',
    timezone: 'CST',
    skills: ['Python', 'SQL', 'Tableau', 'Machine Learning', 'Statistics'],
    workload: 69,
    performance: 90,
    satisfaction: 88,
    productivity: 91,
  },
  {
    id: 'u7',
    name: 'Tom Brooks',
    email: 'tom.b@synapse.io',
    avatar: 'TB',
    role: 'devops',
    title: 'DevOps Engineer',
    teamId: 't1',
    status: 'active',
    joinedAt: '2022-11-20',
    location: 'Denver, CO',
    timezone: 'MST',
    skills: ['AWS', 'Terraform', 'CI/CD', 'Docker', 'Prometheus'],
    workload: 82,
    performance: 89,
    satisfaction: 83,
    productivity: 88,
  },
  {
    id: 'u8',
    name: 'Lisa Chang',
    email: 'lisa.c@synapse.io',
    avatar: 'LC',
    role: 'recruiter',
    title: 'Recruitment Lead',
    teamId: 't2',
    status: 'active',
    joinedAt: '2023-02-01',
    location: 'Boston, MA',
    timezone: 'EST',
    skills: ['Talent Acquisition', 'ATS', 'Interviewing', 'Employer Branding', 'LinkedIn'],
    workload: 88,
    performance: 93,
    satisfaction: 91,
    productivity: 90,
  },
]

// ─── Mock Teams ──────────────────────────────────────────────────────────────

export const mockTeams: Team[] = [
  {
    id: 't1',
    name: 'Engineering',
    description: 'Building the core product, infrastructure, and developer experience',
    color: '#6366f1',
    icon: 'Code2',
    memberCount: 12,
    healthScore: 87,
    productivity: 92,
    leadId: 'u1',
    createdAt: '2022-01-01',
    projects: 8,
    openEscalations: 2,
  },
  {
    id: 't2',
    name: 'Product',
    description: 'Defining product vision, strategy, and roadmap',
    color: '#06b6d4',
    icon: 'Lightbulb',
    memberCount: 6,
    healthScore: 91,
    productivity: 89,
    leadId: 'u2',
    createdAt: '2022-01-01',
    projects: 5,
    openEscalations: 1,
  },
  {
    id: 't3',
    name: 'Customer Success',
    description: 'Ensuring customers achieve their goals with Synapse',
    color: '#10b981',
    icon: 'Heart',
    memberCount: 8,
    healthScore: 83,
    productivity: 86,
    leadId: 'u3',
    createdAt: '2022-03-01',
    projects: 4,
    openEscalations: 4,
  },
  {
    id: 't4',
    name: 'Design',
    description: 'Crafting exceptional user experiences and visual systems',
    color: '#8b5cf6',
    icon: 'Palette',
    memberCount: 4,
    healthScore: 94,
    productivity: 88,
    leadId: 'u5',
    createdAt: '2022-06-01',
    projects: 6,
    openEscalations: 0,
  },
]

// ─── Mock Candidates ─────────────────────────────────────────────────────────

export const mockCandidates: Candidate[] = [
  {
    id: 'c1', name: 'Jordan Lee', email: 'jordan@example.com', avatar: 'JL',
    role: 'Senior Frontend Engineer', stage: 'offer', score: 94,
    appliedAt: '2026-04-10', lastActivity: '2026-05-28', interviewer: 'Alex Rivera',
    tags: ['React', 'TypeScript', 'Senior'], source: 'LinkedIn',
    location: 'San Francisco, CA', salary: '$180K–$210K', notes: 'Exceptional candidate, strong system design skills.',
  },
  {
    id: 'c2', name: 'Dana Kim', email: 'dana@example.com', avatar: 'DK',
    role: 'Product Designer', stage: 'technical', score: 88,
    appliedAt: '2026-04-22', lastActivity: '2026-05-27', interviewer: 'Jake Wilson',
    tags: ['Figma', 'UX Research', 'Mid-Level'], source: 'Referral',
    location: 'New York, NY', salary: '$130K–$155K', notes: 'Strong portfolio, great culture fit.',
  },
  {
    id: 'c3', name: 'Riley Torres', email: 'riley@example.com', avatar: 'RT',
    role: 'Data Scientist', stage: 'interview', score: 82,
    appliedAt: '2026-05-01', lastActivity: '2026-05-26', interviewer: 'Maya Rodriguez',
    tags: ['Python', 'ML', 'Mid-Level'], source: 'Job Board',
    location: 'Austin, TX', salary: '$140K–$165K', notes: 'Solid ML background.',
  },
  {
    id: 'c4', name: 'Avery Washington', email: 'avery@example.com', avatar: 'AW',
    role: 'Backend Engineer', stage: 'screening', score: 76,
    appliedAt: '2026-05-08', lastActivity: '2026-05-25', interviewer: 'Alex Rivera',
    tags: ['Go', 'PostgreSQL', 'Mid-Level'], source: 'GitHub',
    location: 'Seattle, WA', salary: '$155K–$180K', notes: 'Strong open source contributions.',
  },
  {
    id: 'c5', name: 'Cameron Park', email: 'cam@example.com', avatar: 'CP',
    role: 'DevOps Engineer', stage: 'applied', score: 71,
    appliedAt: '2026-05-20', lastActivity: '2026-05-20', interviewer: 'Tom Brooks',
    tags: ['AWS', 'Kubernetes', 'Mid-Level'], source: 'LinkedIn',
    location: 'Denver, CO', salary: '$145K–$165K', notes: 'Good AWS certifications.',
  },
  {
    id: 'c6', name: 'Morgan Ellis', email: 'morgan@example.com', avatar: 'ME',
    role: 'Customer Success Manager', stage: 'hired', score: 91,
    appliedAt: '2026-03-15', lastActivity: '2026-05-10', interviewer: 'Marcus Johnson',
    tags: ['CRM', 'SaaS', 'Senior'], source: 'Referral',
    location: 'Chicago, IL', salary: '$110K–$130K', notes: 'Excellent relationship skills.',
  },
  {
    id: 'c7', name: 'Quinn Nakamura', email: 'quinn@example.com', avatar: 'QN',
    role: 'Product Manager', stage: 'interview', score: 85,
    appliedAt: '2026-05-03', lastActivity: '2026-05-26', interviewer: 'Sarah Chen',
    tags: ['B2B', 'SaaS', 'Mid-Level'], source: 'LinkedIn',
    location: 'Boston, MA', salary: '$150K–$175K', notes: 'Strong product sense.',
  },
  {
    id: 'c8', name: 'Sam Okonkwo', email: 'sam@example.com', avatar: 'SO',
    role: 'Security Engineer', stage: 'technical', score: 89,
    appliedAt: '2026-04-28', lastActivity: '2026-05-24', interviewer: 'Tom Brooks',
    tags: ['Security', 'AWS', 'Senior'], source: 'Referral',
    location: 'Remote', salary: '$160K–$190K', notes: 'Strong security background.',
  },
]

// ─── Mock Onboarding ─────────────────────────────────────────────────────────

export const mockOnboarding: OnboardingEmployee[] = [
  {
    id: 'ob1', userId: 'new1', name: 'Morgan Ellis', avatar: 'ME',
    role: 'Customer Success Manager', startDate: '2026-05-13',
    overallProgress: 68, mentor: 'Marcus Johnson', readinessScore: 72,
    modules: [
      { id: 'm1', title: 'Company Overview & Culture', description: 'Learn about Synapse mission, values, and culture.', duration: 60, status: 'completed', progress: 100, category: 'Orientation', required: true, completedAt: '2026-05-13' },
      { id: 'm2', title: 'Product Deep Dive', description: 'Comprehensive training on Synapse Teams platform.', duration: 120, status: 'completed', progress: 100, category: 'Product', required: true, completedAt: '2026-05-15' },
      { id: 'm3', title: 'Customer Success Playbook', description: 'Learn our CS methodology and best practices.', duration: 90, status: 'in-progress', progress: 60, category: 'Role-Specific', required: true },
      { id: 'm4', title: 'CRM & Tools Training', description: 'Master Salesforce, Zendesk, and internal tools.', duration: 45, status: 'in-progress', progress: 40, category: 'Tools', required: true },
      { id: 'm5', title: 'Shadow Customer Calls', description: 'Observe senior CS managers on live customer calls.', duration: 180, status: 'not-started', progress: 0, category: 'Practical', required: true },
      { id: 'm6', title: 'Security & Compliance', description: 'SOC2, GDPR, and data handling policies.', duration: 30, status: 'locked', progress: 0, category: 'Compliance', required: true },
    ],
  },
  {
    id: 'ob2', userId: 'new2', name: 'Jordan Lee', avatar: 'JL',
    role: 'Senior Frontend Engineer', startDate: '2026-06-01',
    overallProgress: 15, mentor: 'Alex Rivera', readinessScore: 20,
    modules: [
      { id: 'm7', title: 'Company Overview & Culture', description: 'Learn about Synapse mission, values, and culture.', duration: 60, status: 'completed', progress: 100, category: 'Orientation', required: true, completedAt: '2026-06-01' },
      { id: 'm8', title: 'Engineering Handbook', description: 'Code standards, PR process, and deployment workflows.', duration: 90, status: 'in-progress', progress: 30, category: 'Engineering', required: true },
      { id: 'm9', title: 'Architecture Overview', description: 'System design, services, and data flows.', duration: 120, status: 'locked', progress: 0, category: 'Engineering', required: true },
      { id: 'm10', title: 'Local Dev Setup', description: 'Set up development environment and tooling.', duration: 45, status: 'locked', progress: 0, category: 'Tools', required: true },
      { id: 'm11', title: 'Security Training', description: 'Security protocols and code security best practices.', duration: 30, status: 'locked', progress: 0, category: 'Compliance', required: true },
    ],
  },
]

// ─── Mock Escalations ─────────────────────────────────────────────────────────

export const mockEscalations: Escalation[] = [
  {
    id: 'e1', title: 'Production API Latency Spike — Enterprise Client', description: 'API response times increased 400% affecting enterprise dashboard for Acme Corp. Customers unable to load reports.', priority: 'critical', status: 'in-progress', assigneeId: 'u1', assigneeName: 'Alex Rivera', assigneeAvatar: 'AR', customerId: 'cust-1', customerName: 'Acme Corp', slaDeadline: '2026-05-30T20:00:00Z', createdAt: '2026-05-30T12:00:00Z', updatedAt: '2026-05-30T15:30:00Z', resolutionProgress: 65, tags: ['API', 'Performance', 'Enterprise'], impact: 'high', urgency: 'high',
  },
  {
    id: 'e2', title: 'Data Export Failing for CSV Format', description: 'Users unable to export data in CSV format. PDF exports work fine. Affecting multiple customers.', priority: 'high', status: 'in-progress', assigneeId: 'u4', assigneeName: 'Priya Patel', assigneeAvatar: 'PP', customerId: 'cust-2', customerName: 'TechFlow Inc', slaDeadline: '2026-05-31T12:00:00Z', createdAt: '2026-05-29T14:00:00Z', updatedAt: '2026-05-30T09:00:00Z', resolutionProgress: 40, tags: ['Export', 'Bug', 'Data'], impact: 'medium', urgency: 'high',
  },
  {
    id: 'e3', title: 'SSO Integration Broken After Config Update', description: 'SAML SSO stopped working after customer updated their IdP settings. Users locked out.', priority: 'critical', status: 'open', assigneeId: 'u7', assigneeName: 'Tom Brooks', assigneeAvatar: 'TB', customerId: 'cust-3', customerName: 'GlobalBank', slaDeadline: '2026-05-30T18:00:00Z', createdAt: '2026-05-30T10:00:00Z', updatedAt: '2026-05-30T14:00:00Z', resolutionProgress: 20, tags: ['SSO', 'Auth', 'Enterprise'], impact: 'high', urgency: 'high',
  },
  {
    id: 'e4', title: 'Dashboard Charts Not Loading on Mobile Safari', description: 'Recharts components fail to render on iOS 17 Safari. Affecting ~15% of users.', priority: 'medium', status: 'in-progress', assigneeId: 'u5', assigneeName: 'Jake Wilson', assigneeAvatar: 'JW', customerId: 'cust-4', customerName: 'Multiple', slaDeadline: '2026-06-02T12:00:00Z', createdAt: '2026-05-28T08:00:00Z', updatedAt: '2026-05-29T16:00:00Z', resolutionProgress: 55, tags: ['Mobile', 'Charts', 'Safari'], impact: 'medium', urgency: 'medium',
  },
  {
    id: 'e5', title: 'Slack Integration Notifications Delayed 45min', description: 'Slack webhook notifications are delayed by 30-45 minutes. Customers missing real-time alerts.', priority: 'high', status: 'open', assigneeId: 'u7', assigneeName: 'Tom Brooks', assigneeAvatar: 'TB', customerId: 'cust-5', customerName: 'StartupHub', slaDeadline: '2026-05-31T08:00:00Z', createdAt: '2026-05-30T06:00:00Z', updatedAt: '2026-05-30T06:00:00Z', resolutionProgress: 10, tags: ['Integrations', 'Slack', 'Webhooks'], impact: 'medium', urgency: 'high',
  },
  {
    id: 'e6', title: 'Billing Portal 500 Error on Plan Upgrade', description: 'Customers see 500 error when trying to upgrade plan via billing portal. Stripe webhook may be misconfigured.', priority: 'high', status: 'in-progress', assigneeId: 'u4', assigneeName: 'Priya Patel', assigneeAvatar: 'PP', customerId: 'cust-6', customerName: 'GrowthCo', slaDeadline: '2026-05-31T16:00:00Z', createdAt: '2026-05-29T20:00:00Z', updatedAt: '2026-05-30T11:00:00Z', resolutionProgress: 75, tags: ['Billing', 'Stripe', 'Critical'], impact: 'high', urgency: 'medium',
  },
  {
    id: 'e7', title: 'User Role Permissions Not Saving', description: 'Admins unable to save role changes for team members. UI shows success but changes not persisted.', priority: 'medium', status: 'open', assigneeId: 'u1', assigneeName: 'Alex Rivera', assigneeAvatar: 'AR', customerId: 'cust-7', customerName: 'EnterpriseX', slaDeadline: '2026-06-01T12:00:00Z', createdAt: '2026-05-29T10:00:00Z', updatedAt: '2026-05-30T08:00:00Z', resolutionProgress: 5, tags: ['Permissions', 'Roles', 'Bug'], impact: 'medium', urgency: 'low',
  },
]

// ─── Mock Knowledge Nodes ──────────────────────────────────────────────────────

export const mockKnowledgeNodes: KnowledgeNode[] = [
  { id: 'k1', title: 'Engineering Team', type: 'team', description: 'Core engineering team managing product development and infrastructure.', tags: ['engineering', 'core'], connections: ['k3', 'k5', 'k9', 'k11'], position: { x: 400, y: 200 }, lastUpdated: '2026-05-28', author: 'Alex Rivera', viewCount: 342 },
  { id: 'k2', title: 'Product Team', type: 'team', description: 'Product management and UX research team.', tags: ['product', 'ux'], connections: ['k3', 'k6', 'k10'], position: { x: 700, y: 150 }, lastUpdated: '2026-05-27', author: 'Sarah Chen', viewCount: 198 },
  { id: 'k3', title: 'Product Roadmap Q3', type: 'document', description: 'Q3 2026 product roadmap including feature priorities and milestones.', tags: ['roadmap', 'planning', 'q3'], connections: ['k1', 'k2', 'k4'], position: { x: 550, y: 350 }, lastUpdated: '2026-05-25', author: 'Sarah Chen', viewCount: 521 },
  { id: 'k4', title: 'Release Process', type: 'process', description: 'Standard operating procedure for software releases including QA gates.', tags: ['process', 'release', 'qa'], connections: ['k3', 'k1', 'k8'], position: { x: 300, y: 450 }, lastUpdated: '2026-05-20', author: 'Alex Rivera', viewCount: 289 },
  { id: 'k5', title: 'System Architecture', type: 'document', description: 'High-level system architecture and component diagram for Synapse platform.', tags: ['architecture', 'technical', 'infra'], connections: ['k1', 'k9'], position: { x: 180, y: 300 }, lastUpdated: '2026-05-15', author: 'Priya Patel', viewCount: 412 },
  { id: 'k6', title: 'UX Research Guidelines', type: 'training', description: 'Best practices for user research including interview frameworks and synthesis methods.', tags: ['ux', 'research', 'training'], connections: ['k2', 'k10'], position: { x: 850, y: 300 }, lastUpdated: '2026-05-22', author: 'Jake Wilson', viewCount: 167 },
  { id: 'k7', title: 'Customer Success Playbook', type: 'process', description: 'End-to-end CS process from onboarding to renewal and expansion.', tags: ['cs', 'process', 'customers'], connections: ['k8', 'k12', 'k13'], position: { x: 650, y: 500 }, lastUpdated: '2026-05-18', author: 'Marcus Johnson', viewCount: 384 },
  { id: 'k8', title: 'Incident Response Protocol', type: 'process', description: 'Standard procedure for handling production incidents and escalations.', tags: ['incident', 'escalation', 'sla'], connections: ['k4', 'k7', 'k1'], position: { x: 420, y: 580 }, lastUpdated: '2026-05-10', author: 'Tom Brooks', viewCount: 256 },
  { id: 'k9', title: 'API Documentation', type: 'document', description: 'Complete API reference for all Synapse endpoints with examples.', tags: ['api', 'docs', 'developers'], connections: ['k1', 'k5'], position: { x: 150, y: 150 }, lastUpdated: '2026-05-29', author: 'Priya Patel', viewCount: 783 },
  { id: 'k10', title: 'Design System', type: 'document', description: 'Synapse component library, tokens, and design guidelines.', tags: ['design', 'ui', 'components'], connections: ['k2', 'k6'], position: { x: 900, y: 180 }, lastUpdated: '2026-05-26', author: 'Jake Wilson', viewCount: 445 },
  { id: 'k11', title: 'Engineering Onboarding', type: 'training', description: 'New engineer onboarding guide covering setup, codebase, and first tasks.', tags: ['onboarding', 'training', 'engineering'], connections: ['k1', 'k4'], position: { x: 250, y: 180 }, lastUpdated: '2026-05-05', author: 'Alex Rivera', viewCount: 132 },
  { id: 'k12', title: 'Customer Feedback Q2', type: 'customer-feedback', description: 'Aggregated customer feedback from Q2 2026 surveys and support tickets.', tags: ['feedback', 'customers', 'q2'], connections: ['k7', 'k3'], position: { x: 750, y: 550 }, lastUpdated: '2026-05-01', author: 'Marcus Johnson', viewCount: 301 },
  { id: 'k13', title: 'Zendesk Integration', type: 'tool', description: 'How to use and configure the Zendesk integration for support workflows.', tags: ['zendesk', 'tools', 'support'], connections: ['k7'], position: { x: 850, y: 480 }, lastUpdated: '2026-04-20', author: 'Marcus Johnson', viewCount: 178 },
]

// ─── Mock Feedback ────────────────────────────────────────────────────────────

export const mockFeedback: FeedbackItem[] = [
  { id: 'f1', title: 'Dark mode for mobile app', description: 'The mobile app needs a dark mode option. Very important for night usage.', category: 'feature', status: 'planned', votes: 247, hasVoted: false, authorId: 'u3', authorName: 'Marcus Johnson', authorAvatar: 'MJ', teamId: 't3', teamName: 'Customer Success', createdAt: '2026-04-15', comments: 34, tags: ['mobile', 'dark-mode', 'ux'] },
  { id: 'f2', title: 'Bulk export for analytics data', description: 'Allow exporting all analytics data at once instead of one chart at a time.', category: 'feature', status: 'in-progress', votes: 189, hasVoted: true, authorId: 'u6', authorName: 'Maya Rodriguez', authorAvatar: 'MR', teamId: 't1', teamName: 'Engineering', createdAt: '2026-04-20', comments: 21, tags: ['analytics', 'export', 'productivity'] },
  { id: 'f3', title: 'Keyboard shortcuts for all actions', description: 'Power users need keyboard shortcuts for common actions. The cmd+K palette is great, expand it!', category: 'improvement', status: 'open', votes: 156, hasVoted: false, authorId: 'u1', authorName: 'Alex Rivera', authorAvatar: 'AR', teamId: 't1', teamName: 'Engineering', createdAt: '2026-05-01', comments: 18, tags: ['keyboard', 'shortcuts', 'power-users'] },
  { id: 'f4', title: 'Slack notification customization', description: 'More control over which Slack notifications get sent and when.', category: 'improvement', status: 'planned', votes: 134, hasVoted: false, authorId: 'u2', authorName: 'Sarah Chen', authorAvatar: 'SC', teamId: 't2', teamName: 'Product', createdAt: '2026-05-05', comments: 15, tags: ['slack', 'notifications', 'integrations'] },
  { id: 'f5', title: 'Custom dashboard widgets', description: 'Let users create and arrange custom widgets on their personal dashboards.', category: 'feature', status: 'open', votes: 121, hasVoted: true, authorId: 'u5', authorName: 'Jake Wilson', authorAvatar: 'JW', teamId: 't4', teamName: 'Design', createdAt: '2026-05-08', comments: 12, tags: ['dashboard', 'customization', 'widgets'] },
  { id: 'f6', title: 'AI summary for escalations', description: 'Auto-generate a summary of an escalation thread using AI to speed up handoffs.', category: 'feature', status: 'in-progress', votes: 98, hasVoted: false, authorId: 'u3', authorName: 'Marcus Johnson', authorAvatar: 'MJ', teamId: 't3', teamName: 'Customer Success', createdAt: '2026-05-12', comments: 9, tags: ['ai', 'escalations', 'automation'] },
]

// ─── Mock Announcements ────────────────────────────────────────────────────────

export const mockAnnouncements: Announcement[] = [
  { id: 'a1', title: '🚀 Synapse v2.4 is live!', content: 'Major release with AI Operations Assistant, improved knowledge graph, and 2x faster analytics. Read the full changelog.', authorId: 'u1', authorName: 'Alex Rivera', authorAvatar: 'AR', teamId: 't1', teamName: 'Engineering', createdAt: '2026-05-29T10:00:00Z', type: 'success', pinned: true },
  { id: 'a2', title: 'Q2 Results: 94% team satisfaction', content: 'Our Q2 team satisfaction survey is in — 94% satisfaction rate, up 6% from Q1. Huge shoutout to every team member! 🎉', authorId: 'u2', authorName: 'Sarah Chen', authorAvatar: 'SC', teamId: 't2', teamName: 'Product', createdAt: '2026-05-27T14:00:00Z', type: 'celebration', pinned: true },
  { id: 'a3', title: 'New hire orientation — June 3rd', content: 'Welcome Jordan Lee (Frontend) and Morgan Ellis (CS) joining June 1st. Orientation Monday June 3rd at 10am EST. Calendar invites sent.', authorId: 'u8', authorName: 'Lisa Chang', authorAvatar: 'LC', teamId: 't2', teamName: 'Product', createdAt: '2026-05-25T09:00:00Z', type: 'info', pinned: false },
  { id: 'a4', title: '⚠️ Planned maintenance window — May 31st', content: 'We will have a 2-hour maintenance window on May 31st from 2:00–4:00 AM UTC. Some services may be briefly unavailable.', authorId: 'u7', authorName: 'Tom Brooks', authorAvatar: 'TB', teamId: 't1', teamName: 'Engineering', createdAt: '2026-05-24T08:00:00Z', type: 'warning', pinned: false },
]

// ─── KPI Cards ────────────────────────────────────────────────────────────────

export const mockKPICards: KPICard[] = [
  { id: 'kpi1', label: 'Team Health Score', value: '87', change: 4.2, changeLabel: 'vs last month', trend: 'up', sparkline: generateSparkline(85, 12, 5), color: 'emerald', icon: 'Heart' },
  { id: 'kpi2', label: 'Avg Productivity', value: '91%', change: 2.1, changeLabel: 'vs last month', trend: 'up', sparkline: generateSparkline(89, 12, 6), color: 'primary', icon: 'TrendingUp' },
  { id: 'kpi3', label: 'Open Escalations', value: '7', change: -18.2, changeLabel: 'vs last month', trend: 'up', sparkline: generateSparkline(10, 12, 3), color: 'rose', icon: 'AlertTriangle' },
  { id: 'kpi4', label: 'Candidates in Pipeline', value: '23', change: 35.3, changeLabel: 'vs last month', trend: 'up', sparkline: generateSparkline(20, 12, 4), color: 'accent', icon: 'Users' },
  { id: 'kpi5', label: 'Customer Satisfaction', value: '4.6', change: 0.3, changeLabel: 'vs last month', trend: 'up', sparkline: generateSparkline(88, 12, 3), color: 'amber', icon: 'Star' },
  { id: 'kpi6', label: 'Onboarding Progress', value: '78%', change: 12.0, changeLabel: 'avg completion', trend: 'up', sparkline: generateSparkline(72, 12, 8), color: 'violet', icon: 'GraduationCap' },
]

// ─── Activity Feed ─────────────────────────────────────────────────────────────

export const mockActivity: ActivityItem[] = [
  { id: 'act1', type: 'alert', title: 'Critical escalation opened', description: 'Production API latency spike affecting Acme Corp', timestamp: '2026-05-30T15:30:00Z', userId: 'u1', userName: 'Alex Rivera', userAvatar: 'AR', metadata: { priority: 'critical' } },
  { id: 'act2', type: 'hire', title: 'New hire confirmed', description: 'Morgan Ellis accepted the Customer Success Manager offer', timestamp: '2026-05-30T13:00:00Z', userId: 'u8', userName: 'Lisa Chang', userAvatar: 'LC' },
  { id: 'act3', type: 'achievement', title: 'Q2 satisfaction goal hit', description: 'Team satisfaction reached 94%, beating 90% target by 4%', timestamp: '2026-05-29T16:00:00Z', userId: 'u2', userName: 'Sarah Chen', userAvatar: 'SC' },
  { id: 'act4', type: 'escalation', title: 'Escalation resolved', description: 'Billing portal 500 error fixed — Stripe webhook reconfigured', timestamp: '2026-05-29T11:00:00Z', userId: 'u4', userName: 'Priya Patel', userAvatar: 'PP' },
  { id: 'act5', type: 'onboard', title: 'Onboarding milestone reached', description: 'Morgan Ellis completed Product Deep Dive training module', timestamp: '2026-05-29T09:00:00Z', userId: 'u3', userName: 'Marcus Johnson', userAvatar: 'MJ' },
  { id: 'act6', type: 'announcement', title: 'v2.4 shipped to production', description: 'AI Operations Assistant and Knowledge Graph improvements live', timestamp: '2026-05-29T08:00:00Z', userId: 'u1', userName: 'Alex Rivera', userAvatar: 'AR' },
]

// ─── AI Insights ──────────────────────────────────────────────────────────────

export const mockAIInsights: AIInsight[] = [
  { id: 'ai1', type: 'risk', title: 'Priya Patel showing burnout signals', description: 'Workload at 91% for 3 consecutive weeks. Response time in Slack decreased by 40%. Recommend a workload review.', severity: 'high', actionable: true, action: 'Schedule 1:1', metric: 'Workload', change: 91 },
  { id: 'ai2', type: 'bottleneck', title: 'Engineering escalation backlog growing', description: '3 critical escalations open simultaneously. Average resolution time up 28% this week. Consider temporary CS support.', severity: 'high', actionable: true, action: 'Review escalations', metric: 'Open escalations', change: 28 },
  { id: 'ai3', type: 'recommendation', title: 'Interview pipeline moving slowly', description: 'Average time in "Interview" stage is 12 days vs 7-day target. Recommend scheduling more interview slots this week.', severity: 'medium', actionable: true, action: 'Open calendar slots', metric: 'Time-to-hire', change: -12 },
  { id: 'ai4', type: 'achievement', title: 'Design team at peak performance', description: 'Design team health score at 94% — highest in 6 months. Zero open escalations. Exceptional collaboration metrics.', severity: 'low', actionable: false, metric: 'Health score', change: 94 },
  { id: 'ai5', type: 'recommendation', title: 'Knowledge graph coverage gap detected', description: 'Only 6 of 14 core processes are documented in the knowledge graph. Missing: Deployment, Security Review, Customer Onboarding.', severity: 'medium', actionable: true, action: 'Add missing docs', metric: 'Coverage', change: 43 },
]

// ─── Initial AI Chat ──────────────────────────────────────────────────────────

export const mockInitialMessages: ChatMessage[] = [
  {
    id: 'msg0',
    role: 'assistant',
    content: 'Hello! I\'m your Synapse AI Operations Assistant. I have real-time visibility into your team health, escalations, recruitment pipeline, and performance metrics.\n\nToday\'s summary:\n• **7 open escalations** — 2 critical, 3 high priority\n• **Team health at 87/100** (+4.2% this month)\n• **Priya Patel\'s workload** is at 91% — possible burnout risk\n• **Jordan Lee\'s offer** is pending acceptance\n\nWhat would you like to explore?',
    timestamp: new Date().toISOString(),
    type: 'insight',
  },
]

// ─── Trend Data ─────────────────────────────────────────────────────────────

export const mockPerformanceTrend = generateTrendData(82, 30, 6, 0.2)
export const mockSatisfactionTrend = generateTrendData(88, 30, 4, 0.15)
export const mockProductivityTrend = generateTrendData(85, 30, 5, 0.25)
export const mockEscalationTrend = generateTrendData(12, 30, 2, -0.1).map(d => ({
  ...d,
  value: Math.max(3, d.value),
}))

export const mockTeamRadarData = [
  { subject: 'Performance', Engineering: 94, Product: 91, CustomerSuccess: 87, Design: 88 },
  { subject: 'Collaboration', Engineering: 88, Product: 93, CustomerSuccess: 92, Design: 96 },
  { subject: 'Velocity', Engineering: 92, Product: 85, CustomerSuccess: 83, Design: 87 },
  { subject: 'Quality', Engineering: 96, Product: 89, CustomerSuccess: 88, Design: 94 },
  { subject: 'Satisfaction', Engineering: 83, Product: 92, CustomerSuccess: 85, Design: 94 },
  { subject: 'Growth', Engineering: 90, Product: 88, CustomerSuccess: 82, Design: 91 },
]

export const mockHiringFunnel = [
  { stage: 'Applied', count: 124, color: '#64748b' },
  { stage: 'Screening', count: 67, color: '#6366f1' },
  { stage: 'Interview', count: 28, color: '#06b6d4' },
  { stage: 'Technical', count: 14, color: '#8b5cf6' },
  { stage: 'Offer', count: 5, color: '#f59e0b' },
  { stage: 'Hired', count: 3, color: '#10b981' },
]
