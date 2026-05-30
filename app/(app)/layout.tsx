import type { Metadata } from 'next'
import Sidebar from '@/components/layout/sidebar'
import Topbar from '@/components/layout/topbar'
import CommandPalette from '@/components/layout/command-palette'

export const metadata: Metadata = {
  title: {
    default: 'Synapse Teams',
    template: '%s | Synapse Teams',
  },
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-synapse-bg)' }}>
      <Sidebar />
      <Topbar />
      <CommandPalette />
      <main
        id="main-content"
        style={{
          paddingTop: 64,
          paddingLeft: 260,
          transition: 'padding-left 0.3s cubic-bezier(0.4,0,0.2,1)',
          minHeight: '100vh',
        }}
        className="app-main"
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
