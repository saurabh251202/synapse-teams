'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  Handle,
  Position,
  NodeProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  Network,
  Search,
  BookOpen,
  Users,
  Compass,
  Zap,
  Tag,
  Eye,
  Calendar,
  User,
  X,
  FileText,
  Wrench,
  HelpCircle,
  HelpCircle as QuestionIcon,
} from 'lucide-react'
import { mockKnowledgeNodes } from '@/lib/mock-data'
import { useKnowledgeStore } from '@/lib/store'
import { cn } from '@/lib/utils'

// Custom Node Types mapping
const TYPE_CONFIG = {
  team: { icon: Users, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]' },
  document: { icon: FileText, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.1)]' },
  process: { icon: Zap, color: 'text-rose-400 border-rose-500/30 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.1)]' },
  training: { icon: BookOpen, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]' },
  'customer-feedback': { icon: Compass, color: 'text-sky-400 border-sky-500/30 bg-sky-500/10 shadow-[0_0_15px_rgba(14,165,233,0.1)]' },
  tool: { icon: Wrench, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]' },
}

function CustomNode({ data }: NodeProps) {
  const cfg = TYPE_CONFIG[data.type as keyof typeof TYPE_CONFIG] || { icon: HelpCircle, color: 'text-slate-400 border-slate-500/20 bg-slate-500/5' }
  const Icon = cfg.icon

  return (
    <div className={cn('px-4 py-3 rounded-xl border bg-[#0b0b1e] text-white flex items-center gap-3 min-w-[180px] hover:border-indigo-400 transition-colors', cfg.color)}>
      <Handle type="target" position={Position.Top} className="w-1.5 h-1.5 bg-indigo-500" />
      <Icon className="w-5 h-5 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs font-bold truncate leading-none">{data.title as string}</p>
        <p className="text-[9px] text-slate-400 mt-1 uppercase font-mono tracking-wider">{data.type as string}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-1.5 h-1.5 bg-indigo-500" />
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode,
}

export default function KnowledgeGraph() {
  const { selectedNodeId, filterType, searchQuery, setSelectedNodeId, setFilterType, setSearchQuery } = useKnowledgeStore()

  // Generate initial React Flow nodes & edges
  const initialNodes = useMemo(() => {
    return mockKnowledgeNodes.map((n) => ({
      id: n.id,
      type: 'custom',
      position: n.position,
      data: { title: n.title, type: n.type },
    }))
  }, [])

  const initialEdges = useMemo(() => {
    return mockKnowledgeNodes.flatMap((node) =>
      node.connections.map((targetId) => ({
        id: `${node.id}-${targetId}`,
        source: node.id,
        target: targetId,
        animated: true,
        style: { stroke: 'rgba(99, 102, 241, 0.25)', strokeWidth: 1.5 },
      }))
    )
  }, [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Filter nodes & edges on canvas based on search & drop downs
  const filteredNodes = useMemo(() => {
    return nodes.map((node) => {
      const originalNode = mockKnowledgeNodes.find((n) => n.id === node.id)
      const matchesSearch =
        originalNode?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        originalNode?.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        originalNode?.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesType = filterType === 'all' || originalNode?.type === filterType
      
      return {
        ...node,
        hidden: !(matchesSearch && matchesType),
      }
    })
  }, [nodes, searchQuery, filterType])

  // Select node details
  const selectedNode = useMemo(() => {
    return mockKnowledgeNodes.find((n) => n.id === selectedNodeId)
  }, [selectedNodeId])

  const onNodeClick = useCallback(
    (_: any, node: any) => {
      setSelectedNodeId(node.id)
    },
    [setSelectedNodeId]
  )

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6 relative p-1 sm:p-3">
      {/* Search Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-white/5 bg-[#0d0d1f]">
        <div className="flex items-center gap-3">
          <Network className="w-5 h-5 text-indigo-400" />
          <div>
            <h2 className="text-sm font-bold text-white leading-none">Knowledge Graph</h2>
            <p className="text-[10px] text-slate-400 mt-1">Explore team connections, procedures, and core manuals.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search graph..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#05050f] border border-white/5 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#05050f] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="team">Team</option>
            <option value="document">Document</option>
            <option value="process">Process</option>
            <option value="training">Training</option>
            <option value="customer-feedback">Feedback</option>
            <option value="tool">Tool</option>
          </select>
        </div>
      </div>

      {/* Main Canvas area */}
      <div className="flex-1 rounded-xl border border-white/5 bg-[#080818]/60 overflow-hidden relative">
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.5}
          maxZoom={1.5}
        >
          <Background color="#1a1a2e" gap={16} size={1} />
          <Controls className="bg-[#0d0d1f] border border-white/10 text-white rounded-lg overflow-hidden [&_button]:border-white/5 [&_button]:bg-transparent [&_button]:text-white hover:[&_button]:bg-white/5" />
          <MiniMap
            style={{ height: 80, width: 120 }}
            className="bg-[#0d0d1f] border border-white/5 rounded-lg overflow-hidden"
            nodeColor={(node) => {
              const original = mockKnowledgeNodes.find((n) => n.id === node.id)
              if (original?.type === 'team') return '#6366f1'
              if (original?.type === 'document') return '#06b6d4'
              if (original?.type === 'process') return '#f43f5e'
              return '#1e1e3f'
            }}
            maskColor="rgba(0,0,0,0.5)"
          />

          <Panel position="top-left" className="p-3 rounded-lg border border-white/5 bg-[#0d0d1f] flex flex-col gap-1.5 text-[10px] text-slate-400">
            <span className="font-semibold text-slate-200">Graph Legend</span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-indigo-500" /> Team</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-cyan-500" /> Doc</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-rose-500" /> Process</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded bg-emerald-500" /> Training</span>
            </div>
          </Panel>
        </ReactFlow>

        {/* Selected Node Details Drawer */}
        <AnimatePresence>
          {selectedNodeId && selectedNode && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full sm:w-[360px] bg-[#0b0b1e] border-l border-indigo-500/10 p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.5)] z-50"
            >
              <div className="space-y-6 overflow-y-auto pr-1">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <span className="text-[9px] font-mono uppercase text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20 rounded">
                    {selectedNode.type}
                  </span>
                  <button
                    onClick={() => setSelectedNodeId(null)}
                    className="p-1 rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{selectedNode.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{selectedNode.description}</p>
                </div>

                {/* Tags */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-500 uppercase">Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedNode.tags.map((tag) => (
                      <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5 text-indigo-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Node Metadata stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-500 block">Owner</span>
                      <span className="text-[10px] font-semibold text-slate-200">{selectedNode.author}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-500 block">Views</span>
                      <span className="text-[10px] font-semibold text-slate-200 font-mono">{selectedNode.viewCount}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex items-center gap-2 text-[10px] text-slate-400">
                  <Calendar className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Last Updated: {selectedNode.lastUpdated}</span>
                </div>
              </div>

              {/* Bottom Quick-Launch CTA */}
              <div className="border-t border-white/5 pt-6 mt-4">
                <a
                  href="#doc"
                  onClick={(e) => {
                    e.preventDefault()
                    alert(`Opening detail document: ${selectedNode.title}`)
                  }}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Open Document Workspace
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
