'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 'var(--header-h)',
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--gray-200)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="nd-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Image
            src="/NEWDIA_CI-01.svg"
            alt="NEWDIA"
            width={120}
            height={22}
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => handleNav(item.href)}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--gray-800)',
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--black)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-800)')}
            >
              {item.label}
            </button>
          ))}
          {/* Perspective Toggle — 다른 현실 보기 */}
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              border: '1px solid var(--lime)',
              color: 'var(--black)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--lime)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: 14 }}>⟳</span> Shift Perspective
          </a>
          <a
            href="/consultation"
            style={{
              padding: '10px 22px',
              background: 'var(--black)',
              color: 'var(--white)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#333')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--black)')}
          >
            GET IN TOUCH
          </a>
        </nav>
      </div>
    </header>
  )
}
