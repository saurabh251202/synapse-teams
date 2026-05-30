import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Synapse Teams — Visual Team Intelligence Platform',
    template: '%s | Synapse Teams',
  },
  description:
    'Synapse Teams helps organizations manage team performance, customer operations, onboarding, recruitment, escalations, and collaboration through an intelligent visual workspace.',
  keywords: [
    'team management',
    'SaaS',
    'team intelligence',
    'customer operations',
    'recruitment',
    'onboarding',
    'escalation management',
    'knowledge graph',
  ],
  authors: [{ name: 'Synapse Teams' }],
  creator: 'Synapse Teams',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://synapse.teams',
    title: 'Synapse Teams — Visual Team Intelligence Platform',
    description:
      'The intelligent visual workspace for high-performance teams.',
    siteName: 'Synapse Teams',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synapse Teams',
    description: 'Visual Team Intelligence Platform',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  )
}
