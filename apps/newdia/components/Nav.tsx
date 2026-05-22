'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const NAV_ITEMS = [
  { label: 'About',     href: '#about' },
  { label: 'Services',  href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact',   href: '#contact' },
]

const TRANSITION_STYLES = `
  @keyframes nd-cover { from { transform: translateY(100%) } to { transform: translateY(0) } }
  @keyframes nd-scan  { from { transform: translateX(-100%); opacity: 1 } to { transform: translateX(220%); opacity: 0.2 } }
  @keyframes nd-txt   { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
`

export default function Nav() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [transitioning, setTransitioning] = useState(false)

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

  const shiftPerspective = () => {
    setTransitioning(true)
    const dest = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://beos-studio-monster.vercel.app'
    setTimeout(() => { window.location.href = `${dest}?from=newdia` }, 700)
  }

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000, height: 'var(--header-h)',
          display: 'flex', alignItems: 'center',
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
            <Image src="/NEWDIA_CI-01.svg" alt="NEWDIA" width={120} height={22} priority />
          </a>

          <nav style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                style={{
                  fontSize: 14, fontWeight: 500, color: 'var(--gray-800)',
                  letterSpacing: '0.01em', transition: 'color 0.2s',
                  background: 'none', border: 'none', cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--black)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray-800)')}
              >
                {item.label}
              </button>
            ))}

            {/* Shift Perspective — Reality Fracture */}
            <div style={{ position: 'relative', height: 38, minWidth: 160 }}>
              {/* 균열 본체 — dark가 열림 */}
              <div
                onClick={shiftPerspective}
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
              {/* 레스트 좌표 라벨 */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', zIndex: 1,
                transition: 'opacity 0.14s ease',
              }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 8,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.38)',
                  border: '1px solid rgba(0,0,0,0.18)',
                  padding: '6px 14px',
                }}>— SHIFT PERSPECTIVE</span>
              </div>
              {/* 호버 텍스트 */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', zIndex: 2, opacity: 0,
                transition: 'opacity 0.22s ease',
              }}>
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#fff',
                }}>ENTER MONSTER →</span>
              </div>
            </div>

            <a
              href="/consultation"
              style={{
                padding: '10px 22px', background: 'var(--black)',
                color: 'var(--white)', fontSize: 13, fontWeight: 500,
                letterSpacing: '0.02em', transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#333')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--black)')}
            >
              GET IN TOUCH
            </a>
          </nav>
        </div>
      </header>

      {/* Reality Shift Transition Overlay */}
      {transitioning && (
        <>
          <style>{TRANSITION_STYLES}</style>
          <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#020203',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'nd-cover 0.45s cubic-bezier(0.22,1,0.36,1) forwards',
            overflow: 'hidden',
          }}>
            {/* Scan line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'rgba(0,174,239,0.75)',
              animation: 'nd-scan 0.55s ease 0.2s forwards',
            }} />

            {/* Text */}
            <div style={{ textAlign: 'center', animation: 'nd-txt 0.4s ease 0.12s both' }}>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.45em',
                textTransform: 'uppercase', color: 'rgba(0,174,239,0.4)',
                marginBottom: 20,
              }}>
                PERSPECTIVE ENGINE
              </p>
              <p style={{
                fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700,
                letterSpacing: '-0.03em', lineHeight: 1.0,
                color: '#00AEEF',
              }}>
                SHIFTING
              </p>
              <p style={{
                fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700,
                letterSpacing: '-0.03em', lineHeight: 1.0,
                color: 'rgba(255,255,255,0.08)',
              }}>
                PERSPECTIVE
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
