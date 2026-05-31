'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    // Check local storage or document class list
    const isLight = document.documentElement.classList.contains('light')
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null

    if (savedTheme === 'light' || (!savedTheme && isLight)) {
      setTheme('light')
      document.documentElement.classList.add('light')
    } else {
      setTheme('dark')
      document.documentElement.classList.remove('light')
    }
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl glass hover:bg-white/5 border-synapse-border hover:border-synapse-border-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer relative overflow-hidden"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      layout
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === 'dark' ? 0 : 30,
          opacity: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -45,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-5 h-5 flex items-center justify-center"
      >
        <Moon className="w-4.5 h-4.5 text-indigo-400" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          y: theme === 'light' ? 0 : -30,
          opacity: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 45,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-5 h-5 flex items-center justify-center absolute inset-0 m-auto"
      >
        <Sun className="w-4.5 h-4.5 text-amber-500" />
      </motion.div>
    </motion.button>
  )
}
