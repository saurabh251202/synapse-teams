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
    default: 'Saurabh Pathak — UX Designer | Frontend Developer | Product Enthusiast',
    template: '%s | Saurabh Pathak Portfolio',
  },
  description:
    'Product-minded UX Designer and Frontend Developer with experience designing user-centered digital experiences across SaaS, EdTech, B2B, and FinTech domains.',
  keywords: [
    'Saurabh Pathak',
    'UX Designer',
    'Frontend Developer',
    'Product Designer',
    'SaaS Design',
    'React Developer',
    'Figma Prototyping',
    'Customer Success',
    'UX Research',
  ],
  authors: [{ name: 'Saurabh Pathak' }],
  creator: 'Saurabh Pathak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saurabhpathak.design',
    title: 'Saurabh Pathak — UX Designer | Frontend Developer',
    description:
      'Product-minded UX Designer and Frontend Developer designing intuitive digital experiences.',
    siteName: 'Saurabh Pathak Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saurabh Pathak Portfolio',
    description: 'UX Designer & Frontend Developer Portfolio',
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
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
