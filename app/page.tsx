'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Zap,
  ArrowRight,
  Shield,
  Activity,
  Users,
  Compass,
  MessageSquare,
  Sparkles,
  CheckCircle,
  HelpCircle,
} from 'lucide-react'

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  }

  return (
    <div className="min-h-screen bg-[#05050f] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[60%] left-1/3 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#05050f]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center relative bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-[0_0_16px_rgba(99,102,241,0.4)]">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm leading-none text-white tracking-wide">Synapse</p>
              <p className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase mt-0.5">Teams</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] flex items-center gap-2"
            >
              Enter Workspace
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Introducing Synapse Teams v2.4 — Live Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 leading-[1.1]"
          >
            Visual Team Intelligence <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
              For High-Performance Teams
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Manage team workload, candidate pipelines, onboarding modules, knowledge structures, and critical customer escalations through an integrated interactive visual canvas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center"
            >
              Explore Features
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-24 px-6 relative border-t border-white/5 bg-[#080814]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Integrated Workspaces, Intelligent Insights
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Synapse Teams combines specialized workspaces into a single high-performance team hub.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Activity,
                title: 'Command Center',
                desc: 'Real-time overview of organization pulse, active escalations, team scores, and dynamic charts.',
                color: 'from-indigo-500 to-indigo-600',
              },
              {
                icon: Users,
                title: 'Team Intelligence',
                desc: 'Detailed view of developer skill matrices, task distributions, productivity charts, and radar graphs.',
                color: 'from-cyan-500 to-cyan-600',
              },
              {
                icon: Shield,
                title: 'Escalation Workspace',
                desc: 'SLA countdown timers and severity matrices to manage and resolve client issues in real-time.',
                color: 'from-rose-500 to-rose-600',
              },
              {
                icon: Compass,
                title: 'Knowledge Graph',
                desc: 'An interactive graph UI to explore connected documents, procedures, and engineering guides.',
                color: 'from-amber-500 to-amber-600',
              },
              {
                icon: MessageSquare,
                title: 'Collaboration Board',
                desc: 'Feature request upvoting and cross-functional feedback system with modern interactive panels.',
                color: 'from-sky-500 to-sky-600',
              },
              {
                icon: Sparkles,
                title: 'AI Operations Assistant',
                desc: 'Dedicated Copilot trained on your workspace context to summarize tasks, alert risks, and outline resolutions.',
                color: 'from-violet-500 to-violet-600',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-[#0d0d1f] border border-white/5 hover:border-white/10 transition-all hover:translate-y-[-4px] group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Flexible Pricing for Any Scale
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Start free, unlock advanced intelligence and custom integrations as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Growth',
                price: '$29',
                desc: 'For fast-growing startups.',
                features: ['Up to 15 team members', 'Interactive dashboards', 'Kanban recruitment', 'Base Knowledge Graph', 'Email support'],
                popular: false,
                color: 'border-white/5',
              },
              {
                name: 'Scale',
                price: '$79',
                desc: 'For scaling companies.',
                features: ['Unlimited team members', 'Escalation workspace', 'Full AI Operations Assistant', 'Advanced Analytics dashboard', 'Priority Slack support', 'SSO & advanced compliance'],
                popular: true,
                color: 'border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.15)] bg-[#0c0c20]',
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                desc: 'For large organizations.',
                features: ['Dedicated database instance', 'Custom SLA tracking', 'On-prem deployment options', '24/7 Phone & TAM support', 'Custom AI agent training', 'Audit logs & analytics exports'],
                popular: false,
                color: 'border-white/5',
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border relative flex flex-col justify-between ${plan.color}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mb-6">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-xs text-slate-500">/user/mo</span>}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/dashboard"
                  className={`w-full py-3 rounded-xl font-semibold text-xs text-center transition-all ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                      : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 border-t border-white/5 bg-[#080814]/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about the platform.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'What makes Synapse Teams different from traditional tools like Jira?',
                a: 'Traditional project management tools focus entirely on ticket tracking. Synapse Teams integrates recruitment, onboarding, live SLA escalations, and automated AI team workload risk detection onto a cohesive interactive workspace, focusing on visual organizational intelligence.',
              },
              {
                q: 'How does the AI Assistant integrate with our daily tasks?',
                a: 'The AI assistant actively monitors telemetry across the dashboard (such as team workload, code check-ins, customer success logs, and recruitment schedules) to auto-detect bottlenecks or team burnout signals. You can query recommendations directly via the interactive AI Console.',
              },
              {
                q: 'Can we connect Synapse Teams with our existing toolset?',
                a: 'Yes. Synapse has built-in integrations for Slack, GitHub, Zendesk, Salesforce, and Stripe, keeping your visual graph and SLA metrics updated in real-time.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[#0d0d1f] border border-white/5">
                <div className="flex gap-3 mb-2">
                  <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                  <h4 className="text-sm font-bold text-white">{faq.q}</h4>
                </div>
                <p className="text-xs text-slate-400 pl-8 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-slate-300">Synapse Teams</span>
          </div>
          <p>© 2026 Synapse Teams. All rights reserved. Premium Visual Org Intelligence.</p>
        </div>
      </footer>
    </div>
  )
}
