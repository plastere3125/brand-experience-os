'use client'
import { useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Work from '@/components/Work'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import ClientCursor from '@/components/ClientCursor'

export default function Home() {
  useEffect(() => {
    try {
      const today = new Date().toISOString().slice(0, 10)
      const stored = localStorage.getItem('sm_visitors')
      const list: { date: string; count: number }[] = stored ? JSON.parse(stored) : []
      const idx = list.findIndex(v => v.date === today)
      if (idx >= 0) {
        list[idx].count++
      } else {
        list.push({ date: today, count: 1 })
      }
      localStorage.setItem('sm_visitors', JSON.stringify(list))
    } catch {}
  }, [])

  return (
    <>
      <ClientCursor />
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Work />
        <Portfolio />
        <Contact />
      </main>
    </>
  )
}
