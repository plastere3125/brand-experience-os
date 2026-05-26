'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useReality } from '@/contexts/RealityContext'

const NAV_ITEMS = [
  { label: 'About',     href: '#about' },
  { label: 'Services',  href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact',   href: '#contact' },
]

export default function Nav() {
  const { mode, shift, reset } = useReality()
  const [scrolled, setScrolled] = useState(false)
  const [shifting, setShifting]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleShift = () => {
    setShifting(true)
    setTimeout(() => {
      shift()
      setShifting(false)
    }, 700)
  }

  const handleReset = () => {
    setShifting(true)
    setTimeout(() => {
      reset()
      setShifting(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 400)
  }

  const isPerspective = mode === 'perspective'

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000, height: 'var(--header-h)',
          display: 'flex', alignItems: 'center',
          background: isPerspective
            ? scrolled ? 'rgba(10,10,9,0.96)' : 'transparent'
            : scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? isPerspective ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--gray-200)'
            : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <div className="nd-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

          {/* Logo — mode별 */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            {isPerspective ? (
              <Image src="/SM_CI-07.svg" alt="STUDIO MONSTER" width={160} height={57} priority />
            ) : (
              <Image src="/NEWDIA_CI-01.svg" alt="NEWDIA" width={120} height={22} priority />
            )}
          </a>

          {/* Nav items */}
          <nav style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                style={{
                  fontSize: 14, fontWeight: 500,
                  color: isPerspective ? 'rgba(255,255,255,0.55)' : 'var(--gray-800)',
                  letterSpacing: '0.01em', transition: 'color 0.2s',
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = isPerspective ? '#ffffff' : 'var(--black)')}
                onMouseLeave={e => (e.currentTarget.style.color = isPerspective ? 'rgba(255,255,255,0.55)' : 'var(--gray-800)')}
              >
                {item.label}
              </button>
            ))}

            {/* Reality Mode 토글 */}
            {isPerspective ? (
              /* Perspective → Structure 복귀 버튼 */
              <button
                onClick={handleReset}
                style={{
                  position: 'relative', overflow: 'hidden', cursor: 'pointer',
                  padding: '9px 16px',
                  background: 'transparent',
                  border: '1px solid rgba(0,174,239,0.35)',
                  fontFamily: 'var(--mono)', fontSize: 8, fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'rgba(0,174,239,0.7)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,174,239,0.8)'
                  e.currentTarget.style.color = '#00AEEF'
                  e.currentTarget.style.background = 'rgba(0,174,239,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,174,239,0.35)'
                  e.currentTarget.style.color = 'rgba(0,174,239,0.7)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                ← RETURN.STRUCTURE
              </button>
            ) : (
              /* Structure → Perspective 전환 버튼 */
              <div style={{ position: 'relative', height: 38, minWidth: 160 }}>
                <div
                  onClick={handleShift}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'var(--black)',
                    transformOrigin: 'center',
                    transform: 'scaleY(0.012)',
                    transition: 'transform 0.52s cubic-bezier(0.16,1,0.3,1)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.transform = 'scaleY(1)'
                    const grid = el.querySelector('.sm-grid-inner') as HTMLElement
                    if (grid) { grid.style.opacity = '1'; grid.style.transition = 'opacity 0.28s ease 0.24s' }
                    const rest = el.nextElementSibling as HTMLElement
                    if (rest) rest.style.opacity = '0'
                    const hover = el.nextElementSibling?.nextElementSibling as HTMLElement
                    if (hover) { hover.style.opacity = '1'; hover.style.transition = 'opacity 0.22s ease 0.28s' }
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.transform = 'scaleY(0.012)'
                    el.style.transition = 'transform 0.38s cubic-bezier(0.16,1,0.3,1)'
                    const grid = el.querySelector('.sm-grid-inner') as HTMLElement
                    if (grid) { grid.style.opacity = '0'; grid.style.transition = 'opacity 0.14s ease' }
                    const rest = el.nextElementSibling as HTMLElement
                    if (rest) rest.style.opacity = '1'
                    const hover = el.nextElementSibling?.nextElementSibling as HTMLElement
                    if (hover) { hover.style.opacity = '0' }
                  }}
                >
                  <div
                    className="sm-grid-inner"
                    style={{
                      position: 'absolute', inset: 0, opacity: 0,
                      backgroundImage: [
                        'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                        'linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                      ].join(','),
                      backgroundSize: '44px 44px',
                    }}
                  />
                </div>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  pointerEvents: 'none', zIndex: 1, transition: 'opacity 0.14s ease',
                }}>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 8,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.38)',
                    border: '1px solid rgba(0,0,0,0.18)',
                    padding: '6px 14px',
                  }}>— SHIFT PERSPECTIVE</span>
                </div>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  pointerEvents: 'none', zIndex: 2, opacity: 0, transition: 'opacity 0.22s ease',
                }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff',
                  }}>ENTER MONSTER →</span>
                </div>
              </div>
            )}

            <a
              href="/consultation"
              style={{
                padding: '10px 22px',
                background: isPerspective ? '#00AEEF' : 'var(--black)',
                color: isPerspective ? '#0a0a09' : 'var(--white)',
                fontSize: 13, fontWeight: 500,
                letterSpacing: '0.02em', transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = isPerspective ? 'rgba(0,174,239,0.82)' : '#333')}
              onMouseLeave={e => (e.currentTarget.style.background = isPerspective ? '#00AEEF' : 'var(--black)')}
            >
              GET IN TOUCH
            </a>
          </nav>
        </div>
      </header>

      {/* Shift transition flash overlay */}
      {shifting && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: isPerspective ? 'rgba(0,174,239,0.08)' : 'rgba(10,10,9,0.9)',
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
        }} />
      )}
    </>
  )
}
