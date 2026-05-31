'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Move, ZoomIn } from 'lucide-react'

export default function HoverZoomDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0, showLens: false })
  const [lensPercent, setLensPercent] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Boundary constraints
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setCoords({ x, y, showLens: true })
      
      // Calculate cursor percentage across container
      const xPercent = (x / rect.width) * 100
      const yPercent = (y / rect.height) * 100
      setLensPercent({ x: xPercent, y: yPercent })
    } else {
      setCoords((prev) => ({ ...prev, showLens: false }))
    }
  }

  const handleMouseLeave = () => {
    setCoords((prev) => ({ ...prev, showLens: false }))
  }

  // Abstract Design Graphic (used as the zoomable media asset)
  const DesignVector = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
    <div
      className={`w-full h-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0c0c20] via-synapse-surface to-[#151532] rounded-xl ${className}`}
      style={style}
    >
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Visual Design Elements */}
      <div className="relative flex flex-col items-center justify-center p-6 text-center z-10 w-full h-full">
        {/* Glowing Orb */}
        <div className="absolute w-28 h-28 bg-primary/20 rounded-full blur-[35px] animate-pulse" />
        
        {/* Core mockup chart */}
        <div className="w-4/5 h-2/3 border border-synapse-border-2 bg-synapse-bg/80 rounded-lg p-3 flex flex-col justify-between shadow-elevated">
          {/* Mock Widget Header */}
          <div className="flex items-center justify-between border-b border-synapse-border pb-1.5">
            <span className="text-[7px] font-mono text-primary font-bold uppercase tracking-widest">PulseFlow v1.0</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald/60" />
            </div>
          </div>
          
          {/* Mock Graph Waves */}
          <svg className="w-full h-10 my-1 text-primary overflow-visible" viewBox="0 0 100 30">
            <path
              d="M0,15 Q15,5 30,20 T60,10 T90,25 L100,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="30" cy="20" r="2.5" className="fill-accent animate-ping" />
            <circle cx="30" cy="20" r="1.5" className="fill-accent" />
            <circle cx="60" cy="10" r="1.5" className="fill-violet" />
          </svg>

          {/* Mini analytics bar */}
          <div className="flex gap-1.5 justify-between text-[6px] font-mono pt-1 border-t border-synapse-border/40 text-text-secondary">
            <span>SLA: 99.8%</span>
            <span className="text-emerald font-bold">ACTIVE</span>
          </div>
        </div>

        {/* Small label floating inside */}
        <div className="mt-4 px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-[8px] text-accent font-mono uppercase tracking-widest">
          Lens Preview Area
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header controls banner */}
      <div className="flex items-center justify-between px-4 py-2 bg-synapse-surface-2 border border-synapse-border rounded-xl text-xs">
        <span className="font-mono text-text-secondary flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-primary" />
          Interactive Zoom Engine
        </span>
        <span className="text-[10px] text-text-muted font-mono flex items-center gap-1">
          <Move className="w-3 h-3 text-accent" /> Hover mouse to trigger zoom
        </span>
      </div>

      {/* Target zooming workspace container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full aspect-[4/3] relative rounded-xl cursor-crosshair border border-synapse-border shadow-card overflow-hidden select-none"
      >
        {/* Render base design vector */}
        <DesignVector />

        {/* Floating Magnifying Lens */}
        {coords.showLens && (
          <div
            className="absolute pointer-events-none w-36 h-36 rounded-full border-[2.5px] border-primary bg-[#05050f] overflow-hidden shadow-elevated flex items-center justify-center"
            style={{
              left: coords.x - 72, // centered on cursor
              top: coords.y - 72,
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
            }}
          >
            {/* Zoomed portion of vector, magnified 2.2x */}
            <DesignVector
              className="absolute w-full h-full scale-[2.2]"
              style={{
                transformOrigin: `${lensPercent.x}% ${lensPercent.y}%`,
              }}
            />

            {/* Target Crosshairs / technical grids */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none flex items-center justify-center">
              {/* Horizontal line */}
              <div className="w-full h-px bg-primary/20 absolute" />
              {/* Vertical line */}
              <div className="h-full w-px bg-primary/20 absolute" />
              {/* Inner ring */}
              <div className="w-6 h-6 rounded-full border border-primary/30 absolute" />
              {/* Center dot */}
              <div className="w-1 h-1 rounded-full bg-primary absolute" />
            </div>
            
            {/* Zoom percentage tag */}
            <span className="absolute bottom-2 px-1.5 py-0.5 rounded bg-primary/80 text-[7px] font-mono text-white tracking-widest uppercase font-bold backdrop-blur-sm">
              2.2x
            </span>
          </div>
        )}

        {/* Idle prompt overlays */}
        {!coords.showLens && (
          <div className="absolute inset-0 bg-[#05050f]/20 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 transition-all duration-300 pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center animate-bounce">
              <ZoomIn className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest font-semibold bg-[#05050f]/80 px-3 py-1.5 rounded-full border border-synapse-border">
              Hover here to zoom
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
