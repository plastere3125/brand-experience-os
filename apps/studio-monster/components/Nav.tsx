'use client'
import { useEffect, useState, useCallback } from 'react'
import MLogo from './MLogo'

const NAV_LINKS = [
  { id: 'about',     label: 'About' },
  { id: 'work',      label: 'Perspective' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact',   label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [open, setOpen]           = useState(false)
  const [mobile, setMobile]       = useState(false)

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

  // 메뉴 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // 화면 넓어지면 메뉴 자동 닫기
  useEffect(() => {
    if (!mobile && open) setOpen(false)
  }, [mobile, open])

  const scrollTo = (id: string) => {
    setOpen(false)
    // 메뉴 닫힘 애니메이션 후 스크롤
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--pad)',
        height: '64px',
        background: (scrolled || open) ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: (scrolled || open) ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
      }}>
        {/* Logo */}
        <button
          onClick={() => scrollTo('about')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <MLogo mode="full" style={{ width: '22px', height: '22px' }} />
          <span style={{ fontWeight: 700, letterSpacing: '0.12em', fontSize: '13px', color: '#fff' }}>STUDIO MONSTER</span>
        </button>

        {/* Desktop links */}
        {!mobile && (
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {NAV_LINKS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', cursor: 'pointer',
                transition: 'color 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >{label}</button>
            ))}
            {/* Perspective Toggle → Return to Structure */}
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '7px 14px',
                border: '1px solid rgba(203,219,42,0.5)',
                color: 'rgba(203,219,42,0.8)',
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: 5,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#cbdb2a'
                e.currentTarget.style.color = '#cbdb2a'
                e.currentTarget.style.background = 'rgba(203,219,42,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(203,219,42,0.5)'
                e.currentTarget.style.color = 'rgba(203,219,42,0.8)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              ← STRUCTURE
            </a>
          </div>
        )}

        {/* Hamburger button (mobile only) */}
        {mobile && (
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            style={{
              background: 'none', border: 'none', padding: '8px',
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0', width: '40px', height: '40px',
            }}
          >
            {/* 3선 → X 애니메이션 */}
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#fff', borderRadius: '1px',
              transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
              transition: 'transform 0.3s ease',
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#fff', borderRadius: '1px',
              margin: '5px 0',
              opacity: open ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: '#fff', borderRadius: '1px',
              transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
              transition: 'transform 0.3s ease',
            }} />
          </button>
        )}
      </nav>

      {/* Mobile full-screen menu overlay */}
      {mobile && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 190,
            background: 'rgba(0,0,0,0.96)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'flex-start',
            padding: '0 var(--pad)',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
            transition: 'opacity 0.35s ease',
          }}
          // 배경 탭으로 닫기
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
            {NAV_LINKS.map(({ id, label }, i) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  color: '#fff', fontSize: 'clamp(28px,7vw,40px)',
                  fontWeight: 700, letterSpacing: '-0.01em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  textAlign: 'left', padding: '20px 0',
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `opacity 0.35s ease ${i * 0.06 + 0.1}s, transform 0.4s ease ${i * 0.06 + 0.1}s`,
                }}
              >
                <span>{label}</span>
                <span style={{ fontSize: '16px', color: 'rgba(0,174,239,0.7)' }}>→</span>
              </button>
            ))}
          </nav>

          {/* 하단 브랜드 */}
          <p style={{
            position: 'absolute', bottom: '32px', left: 'var(--pad)',
            fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)',
            textTransform: 'uppercase',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.4s ease 0.35s',
          }}>
            STUDIO MONSTER — Perspective-Driven Brand Studio
          </p>
        </div>
      )}
    </>
  )
}
