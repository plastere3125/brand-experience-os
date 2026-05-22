'use client'

import { useEffect, useState, useCallback } from 'react'
import MLogo from './MLogo'

const NAV_LINKS = [
  { id: 'about',     label: 'About' },
  { id: 'work',      label: 'Perspective' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact',   label: 'Contact' },
]

const TRANSITION_STYLES = `
  @keyframes sm-cover { from { transform: translateY(-100%) } to { transform: translateY(0) } }
  @keyframes sm-grid  { from { opacity: 0 } to { opacity: 0.15 } }
  @keyframes sm-line  { from { transform: scaleY(0); transform-origin: top } to { transform: scaleY(1); transform-origin: top } }
  @keyframes sm-txt   { from { opacity: 0; transform: translateY(-20px) } to { opacity: 1; transform: translateY(0) } }
`

export default function Nav() {
  const [scrolled, setScrolled]           = useState(false)
  const [open, setOpen]                   = useState(false)
  const [mobile, setMobile]               = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [structFrac, setStructFrac]       = useState(false)

  const checkMobile = useCallback(() => setMobile(window.innerWidth < 768), [])

  useEffect(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [checkMobile])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!mobile && open) setOpen(false)
  }, [mobile, open])

  const scrollTo = (id: string) => {
    setOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  const returnToStructure = () => {
    setTransitioning(true)
    const dest = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://beos-newdia.vercel.app'
    setTimeout(() => { window.location.href = `${dest}?from=monster` }, 700)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--pad)', height: '64px',
        background: (scrolled || open) ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: (scrolled || open) ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
      }}>
        <button
          onClick={() => scrollTo('about')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <MLogo mode="full" style={{ width: '22px', height: '22px' }} />
          <span style={{ fontWeight: 700, letterSpacing: '0.12em', fontSize: '13px', color: '#fff' }}>STUDIO MONSTER</span>
        </button>

        {!mobile && (
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {NAV_LINKS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'color 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >{label}</button>
            ))}

            {/* ← STRUCTURE — 현실 균열 버튼 */}
            <button
              onClick={returnToStructure}
              onMouseEnter={() => setStructFrac(true)}
              onMouseLeave={() => setStructFrac(false)}
              style={{
                position: 'relative', overflow: 'hidden',
                padding: '7px 14px',
                border: `1px solid ${structFrac ? '#cbdb2a' : 'rgba(203,219,42,0.5)'}`,
                background: 'transparent',
                color: structFrac ? '#cbdb2a' : 'rgba(203,219,42,0.8)',
                fontFamily: 'var(--mono, monospace)',
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: 5,
                cursor: 'pointer',
                transition: 'border-color 0.25s, color 0.25s',
              }}
            >
              {/* NEWDIA 80px 그리드 균열 오버레이 */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(203,219,42,0.10) 1px,transparent 1px),linear-gradient(90deg,rgba(203,219,42,0.10) 1px,transparent 1px)',
                backgroundSize: '80px 80px',
                transform: structFrac ? 'scaleY(1)' : 'scaleY(0.012)',
                transformOrigin: 'center',
                transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)',
                background: structFrac ? 'rgba(203,219,42,0.06)' : 'transparent',
              }} />
              <span style={{ position: 'relative', zIndex: 1 }}>
                {structFrac ? '← ENTER STRUCTURE' : '← STRUCTURE'}
              </span>
            </button>
          </div>
        )}

        {mobile && (
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0', width: '40px', height: '40px' }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '1px', transform: open ? 'translateY(7px) rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '1px', margin: '5px 0', opacity: open ? 0 : 1, transition: 'opacity 0.2s ease' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '1px', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none', transition: 'transform 0.3s ease' }} />
          </button>
        )}
      </nav>

      {mobile && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(0,0,0,0.96)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
            padding: '0 var(--pad)',
            opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
            transition: 'opacity 0.35s ease',
          }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
            {NAV_LINKS.map(({ id, label }, i) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  color: '#fff', fontSize: 'clamp(28px,7vw,40px)', fontWeight: 700,
                  letterSpacing: '-0.01em', textTransform: 'uppercase', cursor: 'pointer',
                  textAlign: 'left', padding: '20px 0', width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  opacity: open ? 1 : 0, transform: open ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `opacity 0.35s ease ${i * 0.06 + 0.1}s, transform 0.4s ease ${i * 0.06 + 0.1}s`,
                }}
              >
                <span>{label}</span>
                <span style={{ fontSize: '16px', color: 'rgba(0,174,239,0.7)' }}>→</span>
              </button>
            ))}
          </nav>
          <p style={{
            position: 'absolute', bottom: '32px', left: 'var(--pad)',
            fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
            opacity: open ? 1 : 0, transition: 'opacity 0.4s ease 0.35s',
          }}>
            STUDIO MONSTER — Perspective-Driven Brand Studio
          </p>
        </div>
      )}

      {/* Reality Transition Overlay */}
      {transitioning && (
        <>
          <style>{TRANSITION_STYLES}</style>
          <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'sm-cover 0.45s cubic-bezier(0.22,1,0.36,1) forwards',
            overflow: 'hidden',
          }}>
            {/* NEWDIA 그리드 */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              animation: 'sm-grid 0.35s ease 0.1s both',
            }} />
            {/* Lime 수직선 */}
            <div style={{
              position: 'absolute', top: 0, right: '15%',
              width: 1, height: '100%', background: '#cbdb2a', opacity: 0.9,
              animation: 'sm-line 0.5s cubic-bezier(0.22,1,0.36,1) 0.15s both',
            }} />

            {/* Text */}
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, animation: 'sm-txt 0.4s ease 0.12s both' }}>
              <p style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.45em',
                textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)',
                marginBottom: 20,
              }}>
                STRUCTURE ENGINE
              </p>
              <p style={{
                fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700,
                letterSpacing: '-0.04em', lineHeight: 1.0,
                color: '#0a0a09',
              }}>
                RETURNING
              </p>
              <p style={{
                fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700,
                letterSpacing: '-0.04em', lineHeight: 1.0,
                color: '#cbdb2a',
              }}>
                STRUCTURE
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
