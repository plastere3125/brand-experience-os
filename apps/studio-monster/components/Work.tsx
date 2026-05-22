'use client'
import { useState, useEffect, useCallback } from 'react'

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  const check = useCallback(() => setMobile(window.innerWidth < 768), [])
  useEffect(() => {
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [check])
  return mobile
}

const PROJECTS: Project[] = []

interface Project {
  id: string
  index: string
  name: string
  year: string
  perspective: string
  description: string
  tags: string[]
  accent: string
  bgLines: string
}

// ─── Showcase config (editable via admin) ────────────────────────────────────
export type ShowcaseItem = { label: string; sub: string }
export type PaletteItem = { bg: string; label: string; light: boolean }
export type ShowcaseCfg = {
  ticker: string
  ctaUrl: string
  ctaLabel: string
  items: ShowcaseItem[]
  typefaceName: string
  typefaceFamily: string
  palette: PaletteItem[]
}

export const DEFAULT_WORK_CFG: Record<string, ShowcaseCfg> = {
  newdia: {
    ticker:         'VISUAL DESIGN · WEB DESIGN · PHOTOGRAPHY · MARKETING · FRAMING IDEAS INTO IMPACT · NO FILTER · NEW PERSPECTIVE · ',
    ctaUrl:         'https://newdia.co.kr/',
    ctaLabel:       'Visit NEWDIA',
    items:          [],
    typefaceName:   'Inter',
    typefaceFamily: 'Inter, sans-serif',
    palette: [
      { bg: '#0A0A09', label: 'Black',  light: true },
      { bg: '#CBDB2A', label: 'Lime',   light: false },
      { bg: '#888880', label: 'Gray',   light: true },
      { bg: '#ffffff', label: 'White',  light: false },
    ],
  },
  corenws: {
    ticker:         'NETWORK INFRA · SECURITY SOLUTION · DATA CENTER · IT OUTSOURCING · 500+ CLIENTS · 99.9% UPTIME · 24/7 SUPPORT · SINCE 2018 · TOTAL ICT SPECIALIST · ',
    ctaUrl:         'https://corenws.co.kr/',
    ctaLabel:       'Visit CORE NETWORKS',
    items: [
      { label: 'NET',  sub: 'Network Infra' },
      { label: 'SEC',  sub: 'Security Solution' },
      { label: 'DATA', sub: 'Data Center' },
      { label: 'MGMT', sub: 'IT Outsourcing' },
    ],
    typefaceName:   'Noto Sans KR',
    typefaceFamily: 'Noto Sans KR, sans-serif',
    palette: [
      { bg: '#030A0F', label: 'Dark',  light: true },
      { bg: '#007BA8', label: 'Teal',  light: true },
      { bg: '#00C4E8', label: 'Cyan',  light: false },
      { bg: '#ffffff', label: 'White', light: false },
    ],
  },
  bunyoung: {
    ticker:         'LABEL PRINTING · STICKER MANUFACTURING · ART PAPER · YUPO · FOIL PRESSED · CLEAR · SECURITY LABEL · PRECISION CUTTING · UV COATING · SINCE 1997 · ',
    ctaUrl:         'https://beonyeong.com',
    ctaLabel:       'Visit BEONYEONG',
    items: [
      { label: 'ART',   sub: '아트지 · 범용' },
      { label: 'YUPO',  sub: '유포지 · 방수' },
      { label: 'FOIL',  sub: '형압 · 금은박' },
      { label: 'CLEAR', sub: '투명지 · 고급' },
    ],
    typefaceName:   'Montserrat',
    typefaceFamily: 'Montserrat, sans-serif',
    palette: [
      { bg: '#0A0E1A', label: 'Dark',   light: true },
      { bg: '#0055CC', label: 'Blue',   light: true },
      { bg: '#FF6B2B', label: 'Orange', light: true },
      { bg: '#ffffff', label: 'White',  light: false },
    ],
  },
}

// ─── Transition: Philosophy → Reality ───────────────────────────────────────

function TransitionStatement() {
  const mobile = useIsMobile()
  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#020203',
      padding: 'clamp(56px,8vh,96px) var(--pad)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blueprint DNA thread — continues into NEWDIA below */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(0,174,239,0.06) 30%, rgba(0,174,239,0.06) 70%, rgba(0,174,239,0.1))',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? '32px' : '60px',
          alignItems: 'center',
        }}>
          {/* Left: philosophical statement */}
          <div>
            <p style={{
              fontSize: '9px', fontWeight: 600, letterSpacing: '0.24em',
              textTransform: 'uppercase', color: 'rgba(0,174,239,0.7)',
              marginBottom: '20px',
            }}>
              Philosophy → Reality
            </p>
            <p style={{
              fontSize: 'clamp(18px,2.2vw,30px)', fontWeight: 300,
              fontStyle: 'italic', lineHeight: 1.35,
              color: 'rgba(255,255,255,0.72)',
              letterSpacing: '-0.01em',
            }}>
              "Perspective only matters<br />when it becomes reality."
            </p>
            <p style={{
              marginTop: '16px', fontSize: '12px', fontWeight: 300,
              color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', lineHeight: 1.8,
            }}>
              관점은 실제가 될 때 의미를 가집니다.
            </p>
          </div>

          {/* Right: relationship description */}
          <div style={{
            paddingLeft: '40px',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          }}>
            <p style={{
              fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(0,174,239,0.7)', marginBottom: '14px',
            }}>
              Featured Perspective 01
            </p>
            <p style={{
              fontSize: '13px', fontWeight: 300, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.6)', letterSpacing: '0.03em',
            }}>
              STUDIO MONSTER는 관점 시스템을 설계합니다.<br />
              NEWDIA는 그 관점이 실제 브랜드가 된 첫 번째 증거입니다.
            </p>
            <div style={{
              marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{ width: '16px', height: '1px', background: 'rgba(0,174,239,0.35)' }} />
              <span style={{
                fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}>
                STUDIO MONSTER × NEWDIA
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── NEWDIA Showcase ─────────────────────────────────────────────────────────

function NewdiaShowcase({ isHov, onEnter, onLeave, cfg }: {
  isHov: boolean
  onEnter: () => void
  onLeave: () => void
  cfg: ShowcaseCfg
}) {
  const [ctaHov, setCtaHov] = useState(false)
  const mobile = useIsMobile()
  const hov = mobile || isHov
  const TICKER = cfg.ticker

  return (
    <div
      className="work-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        height: mobile ? 'auto' : '100vh',
        minHeight: mobile ? '100svh' : undefined,
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        cursor: 'none',
      }}
    >
      {/* Base */}
      <div style={{ position: 'absolute', inset: 0, background: '#030304' }} />

      {/* Blueprint DNA grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        opacity: isHov ? 0.09 : 0.022,
        transition: 'opacity 1.4s ease',
        backgroundImage: [
          'linear-gradient(rgba(0,174,239,.07) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,174,239,.07) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '44px 44px',
      }} />

      {/* Structural line — vertical */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: '45%', width: '1px',
        background: 'rgba(0,174,239,0.14)',
        transform: `scaleY(${isHov ? 1 : 0})`,
        transformOrigin: 'top',
        transition: 'transform 1.1s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Structural line — top */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        top: 'clamp(70px,9vh,110px)', height: '1px',
        background: 'rgba(0,174,239,0.07)',
        transform: `scaleX(${isHov ? 1 : 0})`,
        transformOrigin: 'left',
        transition: 'transform 1s cubic-bezier(0.22,1,0.36,1) 0.07s',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Structural line — bottom */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        bottom: 'clamp(70px,9vh,110px)', height: '1px',
        background: 'rgba(0,174,239,0.07)',
        transform: `scaleX(${isHov ? 1 : 0})`,
        transformOrigin: 'right',
        transition: 'transform 1s cubic-bezier(0.22,1,0.36,1) 0.12s',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Layout — NEWDIA */}
      <div style={{
        position: mobile ? 'relative' : 'absolute', inset: 0, zIndex: 2,
        display: 'grid', gridTemplateColumns: mobile ? '1fr' : '45% 55%',
      }}>

        {/* ── LEFT: SM editorial framing ── */}
        <div style={{
          padding: 'clamp(64px,9vh,108px) 48px clamp(64px,9vh,108px) clamp(52px,12vw,170px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>

          {/* Top meta */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: isHov ? '#CBDB2A' : 'rgba(203,219,42,0.45)',
                transition: 'color 0.4s ease',
              }}>Featured Perspective 01</span>
              <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>— 2025</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Brand Identity', 'Web Design'].map((tag, i) => (
                <span key={i} style={{
                  fontSize: '9px', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: isHov ? '#CBDB2A' : 'rgba(203,219,42,0.5)',
                  border: `1px solid rgba(203,219,42,${isHov ? 0.45 : 0.18})`,
                  padding: '4px 10px',
                  transition: 'color 0.4s ease, border-color 0.4s ease',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Headline */}
          <div>
            <h3 style={{
              fontSize: 'clamp(60px,8.5vw,128px)',
              fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 0.88,
              color: '#fff',
              transform: isHov ? 'translateX(6px)' : 'none',
              transition: 'transform 1.8s cubic-bezier(0.22,1,0.36,1)',
              userSelect: 'none',
            }}>
              NEW<span style={{ color: '#CBDB2A' }}>DIA</span>
            </h3>

            <div style={{
              width: isHov ? '100%' : '32px', height: '2px',
              background: '#CBDB2A',
              margin: '28px 0 24px',
              transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1) 0.04s',
            }} />

            <p style={{
              fontSize: 'clamp(14px,1.6vw,21px)', fontWeight: 300, fontStyle: 'italic',
              color: isHov ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)',
              lineHeight: 1.4, letterSpacing: '0.01em',
              transition: 'color 0.6s ease',
            }}>
              No Filter.<br />New Perspective.
            </p>

            <p style={{
              fontSize: '12px', fontWeight: 300,
              color: isHov ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.45)',
              letterSpacing: '0.05em', lineHeight: 1.9, marginTop: '12px',
              transition: 'color 0.55s ease',
            }}>
              정보를 가공하지 않고,<br />새로운 시선으로 전달하다.
            </p>

            <p style={{
              fontSize: '11px', fontWeight: 300,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.04em', lineHeight: 1.85, marginTop: '18px',
              maxHeight: isHov ? '60px' : '0', overflow: 'hidden',
              opacity: isHov ? 1 : 0,
              transition: 'opacity 0.5s ease 0.18s, max-height 0.5s ease 0.06s',
            }}>
              정보 전달 중심의 플랫폼을<br />새로운 시선의 미디어 경험으로 재해석.
            </p>
          </div>

          {/* Connection statement */}
          <div style={{
            borderTop: `1px solid rgba(203,219,42,${isHov ? 0.22 : 0.08})`,
            paddingTop: '18px',
            transition: 'border-color 0.5s ease',
          }}>
            <p style={{
              fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: `rgba(203,219,42,${isHov ? 0.95 : 0.65})`,
              marginBottom: '7px', transition: 'color 0.4s ease',
            }}>Perspective System → Brand Reality</p>
            <p style={{
              fontSize: '10px', fontWeight: 300, lineHeight: 1.7,
              color: `rgba(255,255,255,${isHov ? 0.7 : 0.5})`,
              letterSpacing: '0.03em', transition: 'color 0.4s ease',
            }}>
              Built through the STUDIO MONSTER<br />perspective system.
            </p>
            <p style={{
              fontSize: '10px', fontWeight: 300,
              color: `rgba(255,255,255,${isHov ? 0.5 : 0.38})`,
              letterSpacing: '0.04em', marginTop: '3px', transition: 'color 0.4s ease',
            }}>
              STUDIO MONSTER의 관점 시스템을 기반으로 구축된 브랜드.
            </p>
          </div>
        </div>

        {/* ── RIGHT: NEWDIA brand universe ── */}
        <div style={{
          padding: 'clamp(44px,6vh,68px) clamp(52px,5vw,80px) clamp(44px,6vh,68px) 28px',
          display: 'flex', flexDirection: 'column', gap: '10px',
          transform: isHov ? 'translateY(-8px)' : 'none',
          transition: 'transform 1.9s cubic-bezier(0.22,1,0.36,1)',
        }}>

          {/* ─ Main brand panel ─ */}
          <div style={{
            flex: '1 1 0', minHeight: 0,
            border: '1px solid rgba(255,255,255,0.07)',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>

            {/* NEWDIA nav strip */}
            <div style={{
              height: '40px', flexShrink: 0,
              background: '#0A0A09',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', padding: '0 20px',
            }}>
              {/* NEWDIA mark: lime square + white wordmark */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{
                  width: '9px', height: '9px',
                  background: isHov ? '#CBDB2A' : 'rgba(203,219,42,0.7)',
                  transition: 'background 0.4s ease',
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', color: '#fff' }}>
                  NEWDIA
                </span>
              </div>
              <div style={{ display: 'flex', gap: '14px' }}>
                {['Work', 'Services', 'About', 'Contact'].map(item => (
                  <span key={item} style={{
                    fontSize: '7.5px', letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
                  }}>{item}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{
                  width: '5px', height: '5px', background: '#CBDB2A', borderRadius: '50%',
                  animation: 'nd-pulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontSize: '7px', letterSpacing: '0.12em', color: 'rgba(203,219,42,0.6)', textTransform: 'uppercase' }}>Live</span>
              </div>
            </div>

            {/* Hero: split — dark mark + lime brand statement */}
            <div style={{
              flex: '1 1 0', minHeight: 0,
              display: 'grid', gridTemplateColumns: '1fr 1.45fr',
            }}>

              {/* Left cell: dark — brand mark */}
              <div style={{
                background: '#0A0A09',
                borderRight: '1px solid rgba(255,255,255,0.04)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '20px 18px',
              }}>
                {/* Ghost N — lime outline */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: `translate(-50%, -52%) ${isHov ? 'scale(1.04)' : 'scale(1)'}`,
                  fontSize: 'clamp(80px,11vw,140px)', fontWeight: 900, letterSpacing: '-0.05em',
                  lineHeight: 1, color: 'transparent',
                  WebkitTextStroke: `1px rgba(203,219,42,${isHov ? 0.18 : 0.06})`,
                  userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
                  transition: 'transform 1.6s cubic-bezier(0.22,1,0.36,1), -webkit-text-stroke 0.8s ease',
                }}>N</div>

                {/* Top-left corner bracket */}
                <div style={{
                  position: 'absolute', top: '14px', left: '14px',
                  width: '14px', height: '14px',
                  borderTop: `1px solid rgba(203,219,42,${isHov ? 0.55 : 0.2})`,
                  borderLeft: `1px solid rgba(203,219,42,${isHov ? 0.55 : 0.2})`,
                  transition: 'border-color 0.6s ease',
                }} />

                {/* Lime square accent — CI 정체성 */}
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  width: isHov ? '14px' : '10px', height: isHov ? '14px' : '10px',
                  background: '#CBDB2A',
                  transition: 'width 0.5s ease, height 0.5s ease',
                }} />

                {/* Brand mark */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontSize: 'clamp(18px,2.6vw,34px)', fontWeight: 900,
                    letterSpacing: '-0.035em', lineHeight: 1, color: '#fff',
                    transform: isHov ? 'translateY(-3px)' : 'none',
                    transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
                  }}>NEWDIA</div>
                  <div style={{
                    marginTop: '6px',
                    width: isHov ? '100%' : '20px', height: '2px',
                    background: '#CBDB2A',
                    transition: 'width 0.9s cubic-bezier(0.22,1,0.36,1) 0.06s',
                  }} />
                  <p style={{
                    marginTop: '7px', fontSize: '7px', letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: isHov ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.2)',
                    transition: 'color 0.4s ease',
                  }}>Creative Agency · 2025</p>
                </div>
              </div>

              {/* Right cell: NEWDIA signature lime — editorial statement */}
              <div style={{
                background: isHov ? '#CBDB2A' : '#B8C924',
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                padding: '22px 20px',
                transition: 'background 0.9s ease',
              }}>
                {/* Scan line */}
                <div style={{
                  position: 'absolute', left: 0, right: 0, height: '80px',
                  background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.04), transparent)',
                  animation: 'nd-scan 5s ease-in-out infinite',
                  pointerEvents: 'none', zIndex: 0,
                }} />

                {/* Top label */}
                <p style={{
                  position: 'relative', zIndex: 1,
                  fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)',
                }}>Framing Ideas into Impact</p>

                {/* Center statement */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  transform: isHov ? 'translateX(-3px)' : 'none',
                  transition: 'transform 1.5s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  <div style={{
                    fontSize: 'clamp(20px,2.8vw,38px)', fontWeight: 800,
                    letterSpacing: '-0.025em', lineHeight: 1.05, color: '#000',
                  }}>
                    FRAMING<br />IDEAS<br />INTO<br />IMPACT.
                  </div>
                </div>

                {/* Services hover reveal */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? 'none' : 'translateY(6px)',
                  transition: 'opacity 0.5s ease 0.12s, transform 0.5s ease 0.12s',
                }}>
                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.18)', marginBottom: '10px' }} />
                  {['Visual Design', 'Web Design', 'Photography', 'Marketing'].map((s, i) => (
                    <div key={i} style={{
                      fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: 'rgba(0,0,0,0.5)', lineHeight: 2,
                    }}>— {s}</div>
                  ))}
                </div>

                {/* Corner accent */}
                <div style={{
                  position: 'absolute', bottom: '14px', right: '14px',
                  width: '14px', height: '14px',
                  borderBottom: '1px solid rgba(0,0,0,0.22)',
                  borderRight: '1px solid rgba(0,0,0,0.22)',
                }} />
              </div>
            </div>

            {/* Ticker */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.04)',
              height: '26px', flexShrink: 0,
              display: 'flex', alignItems: 'center',
              overflow: 'hidden', background: '#0A0A09',
            }}>
              <div style={{
                display: 'flex', gap: '0', whiteSpace: 'nowrap',
                animation: 'nd-ticker 22s linear infinite',
              }}>
                {[TICKER, TICKER].map((t, i) => (
                  <span key={i} style={{
                    fontSize: '7px', letterSpacing: '0.16em', paddingLeft: '20px',
                    color: 'rgba(255,255,255,0.18)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ─ Bottom strip: type specimen + NEWDIA palette ─ */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
            flexShrink: 0, height: '68px',
          }}>
            {/* Type specimen — NEWDIA lime */}
            <div style={{
              background: '#CBDB2A', padding: '11px 16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transform: isHov ? 'translateX(-5px)' : 'none',
              transition: 'transform 1.5s cubic-bezier(0.22,1,0.36,1) 0.08s',
            }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(0,0,0,0.55)', textTransform: 'uppercase', fontFamily: cfg.typefaceFamily }}>Brand Typeface · {cfg.typefaceName}</span>
              <div style={{ fontSize: 'clamp(18px,2.4vw,28px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#000', fontFamily: cfg.typefaceFamily }}>Aa Bb Cc</div>
            </div>

            {/* NEWDIA real palette */}
            <div style={{ display: 'flex', overflow: 'hidden', opacity: isHov ? 1 : 0.65, transition: 'opacity 0.6s ease' }}>
              {cfg.palette.map((sw, i) => (
                <div key={i} style={{
                  flex: 1, background: sw.bg,
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '7px 6px',
                  borderRight: i < cfg.palette.length - 1 ? '1px solid rgba(0,0,0,0.18)' : 'none',
                  gap: '2px',
                }}>
                  <span style={{
                    fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: sw.light ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
                  }}>{sw.label}</span>
                  <span style={{
                    fontSize: '8px', letterSpacing: '0.04em', fontFamily: 'monospace',
                    color: sw.light ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
                  }}>{sw.bg.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─ CTA: Reality Fracture — 현실 균열로서의 진입점 ─ */}
          <div
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{ flexShrink: 0, position: 'relative', minHeight: '52px', cursor: 'none' }}
          >
            {/* 라임 균열 — scaleY로 열림 */}
            <div style={{
              position: 'absolute', inset: 0,
              background: '#CBDB2A',
              transform: ctaHov ? 'scaleY(1)' : 'scaleY(0.019)',
              transformOrigin: 'center',
              transition: 'transform 0.58s cubic-bezier(0.16,1,0.3,1)',
              overflow: 'hidden',
            }}>
              {/* 균열 내부 — MONSTER 44px 그리드 노출 */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: [
                  'linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)',
                  'linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)',
                ].join(','),
                backgroundSize: '44px 44px',
                opacity: ctaHov ? 1 : 0,
                transition: 'opacity 0.3s ease 0.22s',
              }} />
            </div>
            {/* 레스트 — 좌표 라벨 */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              display: 'flex', alignItems: 'center', padding: '0 20px',
              opacity: ctaHov ? 0 : 1,
              transition: 'opacity 0.16s ease',
              pointerEvents: 'none',
            }}>
              <span style={{
                fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.14em',
                color: 'rgba(203,219,42,0.5)',
              }}>
                — REALITY.01 · {cfg.ctaUrl.replace(/^https?:\/\//, '')}
              </span>
            </div>
            {/* 호버 — Enter Reality 링크 */}
            <a
              href={cfg.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute', inset: 0, zIndex: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 20px', textDecoration: 'none',
                opacity: ctaHov ? 1 : 0,
                transition: 'opacity 0.28s ease 0.22s',
              }}
            >
              <span style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.24em',
                textTransform: 'uppercase', color: '#000',
              }}>ENTER REALITY → NEWDIA</span>
              <span style={{
                fontFamily: 'monospace', fontSize: '8px',
                letterSpacing: '0.1em', color: 'rgba(0,0,0,0.42)',
              }}>{cfg.ctaUrl.replace(/^https?:\/\//, '')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── CORE NETWORKS Showcase ──────────────────────────────────────────────────

function CoreNWSShowcase({ isHov, onEnter, onLeave, cfg }: {
  isHov: boolean
  onEnter: () => void
  onLeave: () => void
  cfg: ShowcaseCfg
}) {
  const [ctaHov, setCtaHov] = useState(false)
  const mobile = useIsMobile()
  const TICKER = cfg.ticker
  const SERVICES = cfg.items

  return (
    <div
      className="work-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        height: mobile ? 'auto' : '100vh',
        minHeight: mobile ? '100svh' : undefined,
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        cursor: 'none',
      }}
    >
      {/* Base — deep teal-black */}
      <div style={{ position: 'absolute', inset: 0, background: '#050D11' }} />

      {/* Signal grid — network-oriented */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        opacity: isHov ? 0.11 : 0.03,
        transition: 'opacity 1.4s ease',
        backgroundImage: [
          'linear-gradient(rgba(0,184,216,.15) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,184,216,.15) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '48px 48px',
      }} />

      {/* Structural line — vertical */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: '45%', width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(0,184,216,0.25) 30%, rgba(0,123,168,0.18) 70%, transparent)',
        transform: `scaleY(${isHov ? 1 : 0})`,
        transformOrigin: 'top',
        transition: 'transform 1.1s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Structural line — top */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        top: 'clamp(70px,9vh,110px)', height: '1px',
        background: 'rgba(0,184,216,0.08)',
        transform: `scaleX(${isHov ? 1 : 0})`,
        transformOrigin: 'left',
        transition: 'transform 1s cubic-bezier(0.22,1,0.36,1) 0.07s',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Structural line — bottom */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        bottom: 'clamp(70px,9vh,110px)', height: '1px',
        background: 'rgba(0,184,216,0.08)',
        transform: `scaleX(${isHov ? 1 : 0})`,
        transformOrigin: 'right',
        transition: 'transform 1s cubic-bezier(0.22,1,0.36,1) 0.12s',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Layout — CORENWS */}
      <div style={{
        position: mobile ? 'relative' : 'absolute', inset: 0, zIndex: 2,
        display: 'grid', gridTemplateColumns: mobile ? '1fr' : '45% 55%',
      }}>

        {/* ── LEFT: SM infrastructure framing ── */}
        <div style={{
          padding: 'clamp(64px,9vh,108px) 48px clamp(64px,9vh,108px) clamp(52px,12vw,170px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>

          {/* Top meta */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: isHov ? '#00C4E8' : 'rgba(0,196,232,0.48)',
                transition: 'color 0.4s ease',
              }}>Featured Perspective 02</span>
              <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>— 2025</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Branding', 'Web Design'].map((tag, i) => (
                <span key={i} style={{
                  fontSize: '9px', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: isHov ? '#00C4E8' : 'rgba(0,196,232,0.5)',
                  border: `1px solid rgba(0,196,232,${isHov ? 0.4 : 0.15})`,
                  padding: '4px 10px',
                  transition: 'color 0.4s ease, border-color 0.4s ease',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Headline */}
          <div>
            <h3 style={{
              fontSize: 'clamp(44px,6.5vw,100px)',
              fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9,
              color: '#fff',
              transform: isHov ? 'translateX(6px)' : 'none',
              transition: 'transform 1.8s cubic-bezier(0.22,1,0.36,1)',
              userSelect: 'none',
            }}>
              CORE<br />
              <span style={{
                color: isHov ? '#00C4E8' : '#007BA8',
                transition: 'color 0.7s ease',
              }}>NWS</span>
            </h3>

            <div style={{
              width: isHov ? '100%' : '32px', height: '2px',
              background: 'linear-gradient(90deg, #007BA8, #00C4E8)',
              margin: '24px 0 20px',
              transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1) 0.04s',
            }} />

            <p style={{
              fontSize: 'clamp(14px,1.5vw,20px)', fontWeight: 300, fontStyle: 'italic',
              color: isHov ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
              lineHeight: 1.4, letterSpacing: '0.01em',
              transition: 'color 0.6s ease',
            }}>
              The Standard of IT.<br />Total ICT Specialist.
            </p>

            <p style={{
              fontSize: '12px', fontWeight: 300,
              color: isHov ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.45)',
              letterSpacing: '0.05em', lineHeight: 1.9, marginTop: '12px',
              transition: 'color 0.55s ease',
            }}>
              IT 인프라의 기준,<br />코어네트워스.
            </p>

            <p style={{
              fontSize: '11px', fontWeight: 300,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.04em', lineHeight: 1.85, marginTop: '18px',
              maxHeight: isHov ? '80px' : '0', overflow: 'hidden',
              opacity: isHov ? 1 : 0,
              transition: 'opacity 0.5s ease 0.18s, max-height 0.5s ease 0.06s',
            }}>
              500+ 고객사의 IT 인프라를<br />10년간 든든하게 책임져온 전문 기업.
            </p>
          </div>

          {/* Connection statement */}
          <div style={{
            borderTop: `1px solid rgba(0,196,232,${isHov ? 0.2 : 0.07})`,
            paddingTop: '18px',
            transition: 'border-color 0.5s ease',
          }}>
            <p style={{
              fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: `rgba(0,196,232,${isHov ? 0.95 : 0.65})`,
              marginBottom: '7px', transition: 'color 0.4s ease',
            }}>Infrastructure System → Business Continuity</p>
            <p style={{
              fontSize: '10px', fontWeight: 300, lineHeight: 1.7,
              color: `rgba(255,255,255,${isHov ? 0.7 : 0.5})`,
              letterSpacing: '0.03em', transition: 'color 0.4s ease',
            }}>
              Built through the STUDIO MONSTER<br />perspective system.
            </p>
            <p style={{
              fontSize: '10px', fontWeight: 300,
              color: `rgba(255,255,255,${isHov ? 0.5 : 0.38})`,
              letterSpacing: '0.04em', marginTop: '3px', transition: 'color 0.4s ease',
            }}>
              STUDIO MONSTER의 관점 시스템을 기반으로 구축된 IT 인프라 브랜드.
            </p>
          </div>
        </div>

        {/* ── RIGHT: CORE NETWORKS live infrastructure platform ── */}
        <div style={{
          padding: 'clamp(44px,6vh,68px) clamp(52px,5vw,80px) clamp(44px,6vh,68px) 28px',
          display: 'flex', flexDirection: 'column', gap: '10px',
          transform: isHov ? 'translateY(-8px)' : 'none',
          transition: 'transform 1.9s cubic-bezier(0.22,1,0.36,1)',
        }}>

          {/* ─ Main brand panel ─ */}
          <div style={{
            flex: '1 1 0', minHeight: 0,
            border: '1px solid rgba(0,123,168,0.22)',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>

            {/* CoreNWS nav strip */}
            <div style={{
              height: '40px', flexShrink: 0,
              background: '#030A0F',
              borderBottom: '1px solid rgba(0,123,168,0.15)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', padding: '0 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{
                  width: '8px', height: '8px',
                  background: isHov ? '#00C4E8' : 'rgba(0,196,232,0.7)',
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', color: '#fff' }}>
                  CORE NETWORKS
                </span>
              </div>
              <div style={{ display: 'flex', gap: '14px' }}>
                {['Infra', 'Security', 'Support', 'Contact'].map(item => (
                  <span key={item} style={{
                    fontSize: '7.5px', letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
                  }}>{item}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{
                  width: '5px', height: '5px',
                  background: '#00C4E8', borderRadius: '50%',
                  animation: 'nd-pulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontSize: '7px', letterSpacing: '0.12em', color: 'rgba(0,196,232,0.6)', textTransform: 'uppercase' }}>Online</span>
              </div>
            </div>

            {/* Hero: dark brand mark | service grid */}
            <div style={{
              flex: '1 1 0', minHeight: 0,
              display: 'grid', gridTemplateColumns: '1fr 1.45fr',
            }}>

              {/* Left cell: deep dark — CoreNWS mark */}
              <div style={{
                background: '#050D11',
                borderRight: '1px solid rgba(0,123,168,0.12)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '20px 18px',
              }}>
                {/* Ghost C */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: `translate(-50%, -52%) ${isHov ? 'scale(1.04)' : 'scale(1)'}`,
                  fontSize: 'clamp(80px,11vw,140px)', fontWeight: 900, letterSpacing: '-0.05em',
                  lineHeight: 1, color: 'transparent',
                  WebkitTextStroke: `1px rgba(0,196,232,${isHov ? 0.22 : 0.07})`,
                  userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
                  transition: 'transform 1.6s cubic-bezier(0.22,1,0.36,1), -webkit-text-stroke 0.8s ease',
                }}>C</div>

                {/* Corner bracket TL */}
                <div style={{
                  position: 'absolute', top: '14px', left: '14px',
                  width: '14px', height: '14px',
                  borderTop: `1px solid rgba(0,196,232,${isHov ? 0.55 : 0.2})`,
                  borderLeft: `1px solid rgba(0,196,232,${isHov ? 0.55 : 0.2})`,
                  transition: 'border-color 0.6s ease',
                }} />

                {/* Cyan bar accent */}
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  width: isHov ? '20px' : '12px', height: isHov ? '5px' : '3px',
                  background: 'linear-gradient(90deg, #007BA8, #00C4E8)',
                  transition: 'width 0.55s ease, height 0.55s ease',
                }} />

                {/* Brand mark */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontSize: 'clamp(14px,2vw,26px)', fontWeight: 900,
                    letterSpacing: '-0.03em', lineHeight: 1.05, color: '#fff',
                    transform: isHov ? 'translateY(-3px)' : 'none',
                    transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
                  }}>CORE<br />NETWORKS</div>
                  <div style={{
                    marginTop: '7px',
                    width: isHov ? '100%' : '20px', height: '2px',
                    background: 'linear-gradient(90deg, #007BA8, #00C4E8)',
                    transition: 'width 0.9s cubic-bezier(0.22,1,0.36,1) 0.06s',
                  }} />
                  <p style={{
                    marginTop: '7px', fontSize: '7px', letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: isHov ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.2)',
                    transition: 'color 0.4s ease',
                  }}>Total ICT Specialist · Since 2018</p>
                </div>
              </div>

              {/* Right cell: dark navy — infrastructure service grid */}
              <div style={{
                background: isHov ? '#0A1929' : '#081525',
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                transition: 'background 0.9s ease',
              }}>
                {/* Header strip */}
                <div style={{
                  padding: '12px 18px 10px',
                  borderBottom: '1px solid rgba(0,196,232,0.1)',
                  flexShrink: 0,
                }}>
                  <p style={{
                    fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(0,196,232,0.4)',
                  }}>IT 인프라의 기준 · Total ICT Specialist</p>
                </div>

                {/* 2×2 service grid */}
                <div style={{
                  flex: '1 1 0',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '1fr 1fr',
                  gap: '1px',
                  background: 'rgba(0,196,232,0.06)',
                }}>
                  {SERVICES.map((sv, i) => (
                    <div key={i} style={{
                      background: '#081525',
                      padding: '14px 16px',
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {/* Activation overlay on hover */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: `rgba(0,196,232,${isHov ? 0.07 : 0})`,
                        transition: `background 0.5s ease ${i * 0.07}s`,
                      }} />
                      <span style={{
                        position: 'relative', zIndex: 1,
                        fontSize: '7px', letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: isHov ? 'rgba(0,196,232,0.7)' : 'rgba(0,196,232,0.35)',
                        transition: 'color 0.4s ease',
                      }}>{sv.sub}</span>
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        {/* Signal bar — staggered expansion */}
                        <div style={{
                          width: isHov ? '100%' : '18px', height: '1px',
                          background: 'rgba(0,196,232,0.4)',
                          marginBottom: '6px',
                          transition: `width 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 0.09}s`,
                        }} />
                        <span style={{
                          fontSize: 'clamp(13px,1.5vw,19px)', fontWeight: 800,
                          letterSpacing: '-0.01em', color: '#fff',
                        }}>{sv.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Corner accent BR */}
                <div style={{
                  position: 'absolute', bottom: '14px', right: '14px',
                  width: '14px', height: '14px',
                  borderBottom: '1px solid rgba(0,196,232,0.25)',
                  borderRight: '1px solid rgba(0,196,232,0.25)',
                }} />
              </div>
            </div>

            {/* Ticker */}
            <div style={{
              borderTop: '1px solid rgba(0,123,168,0.15)',
              height: '26px', flexShrink: 0,
              display: 'flex', alignItems: 'center',
              overflow: 'hidden', background: '#030A0F',
            }}>
              <div style={{
                display: 'flex', whiteSpace: 'nowrap',
                animation: 'nd-ticker 26s linear infinite',
              }}>
                {[TICKER, TICKER].map((t, i) => (
                  <span key={i} style={{
                    fontSize: '7px', letterSpacing: '0.16em', paddingLeft: '20px',
                    color: 'rgba(0,196,232,0.3)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ─ Bottom strip: cyan specimen + CoreNWS palette ─ */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
            flexShrink: 0, height: '68px',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #007BA8 0%, #00C4E8 100%)',
              padding: '11px 16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transform: isHov ? 'translateX(-5px)' : 'none',
              transition: 'transform 1.5s cubic-bezier(0.22,1,0.36,1) 0.08s',
            }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', fontFamily: cfg.typefaceFamily }}>Brand Typeface · {cfg.typefaceName}</span>
              <div style={{ fontSize: 'clamp(18px,2.4vw,28px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', fontFamily: cfg.typefaceFamily }}>Aa Bb Cc</div>
            </div>

            <div style={{ display: 'flex', overflow: 'hidden', opacity: isHov ? 1 : 0.65, transition: 'opacity 0.6s ease' }}>
              {cfg.palette.map((sw, i) => (
                <div key={i} style={{
                  flex: 1, background: sw.bg,
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '7px 6px',
                  borderRight: i < cfg.palette.length - 1 ? '1px solid rgba(0,0,0,0.18)' : 'none',
                  gap: '2px',
                }}>
                  <span style={{
                    fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: sw.light ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
                  }}>{sw.label}</span>
                  <span style={{
                    fontSize: '8px', letterSpacing: '0.04em', fontFamily: 'monospace',
                    color: sw.light ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
                  }}>{sw.bg.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─ CTA: Visit CORE NETWORKS ─ */}
          <a
            href={cfg.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 20px',
              background: ctaHov
                ? 'linear-gradient(135deg, #007BA8, #00C4E8)'
                : '#030A0F',
              border: `1px solid rgba(0,123,168,${ctaHov ? 0 : 0.3})`,
              textDecoration: 'none', cursor: 'none',
              transition: 'background 0.35s ease, border-color 0.35s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: ctaHov ? '#fff' : 'rgba(255,255,255,0.42)',
                transition: 'color 0.3s ease',
              }}>{cfg.ctaLabel}</span>
              <span style={{
                fontSize: '8px', letterSpacing: '0.1em',
                color: ctaHov ? 'rgba(255,255,255,0.6)' : 'rgba(0,196,232,0.5)',
                transition: 'color 0.3s ease',
              }}>{cfg.ctaUrl.replace(/^https?:\/\//, '')}</span>
            </div>
            <span style={{
              fontSize: '13px',
              color: ctaHov ? '#fff' : 'rgba(0,196,232,0.55)',
              transform: ctaHov ? 'translateX(4px)' : 'none',
              transition: 'color 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── BUNYOUNG Showcase ───────────────────────────────────────────────────────

function BunyoungShowcase({ isHov, onEnter, onLeave, cfg }: {
  isHov: boolean
  onEnter: () => void
  onLeave: () => void
  cfg: ShowcaseCfg
}) {
  const [ctaHov, setCtaHov] = useState(false)
  const mobile = useIsMobile()
  const TICKER = cfg.ticker
  const MATERIALS = cfg.items

  return (
    <div
      className="work-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        height: mobile ? 'auto' : '100vh',
        minHeight: mobile ? '100svh' : undefined,
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        cursor: 'none',
      }}
    >
      {/* Base — dark navy */}
      <div style={{ position: 'absolute', inset: 0, background: '#0A0E1A' }} />

      {/* Blueprint grid — blue toned */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        opacity: isHov ? 0.1 : 0.028,
        transition: 'opacity 1.4s ease',
        backgroundImage: [
          'linear-gradient(rgba(0,85,204,.1) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,85,204,.1) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '44px 44px',
      }} />

      {/* Structural line — vertical (orange) */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: '45%', width: '1px',
        background: 'rgba(255,107,43,0.2)',
        transform: `scaleY(${isHov ? 1 : 0})`,
        transformOrigin: 'top',
        transition: 'transform 1.1s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Structural line — top */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        top: 'clamp(70px,9vh,110px)', height: '1px',
        background: 'rgba(0,85,204,0.1)',
        transform: `scaleX(${isHov ? 1 : 0})`,
        transformOrigin: 'left',
        transition: 'transform 1s cubic-bezier(0.22,1,0.36,1) 0.07s',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Structural line — bottom */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        bottom: 'clamp(70px,9vh,110px)', height: '1px',
        background: 'rgba(0,85,204,0.1)',
        transform: `scaleX(${isHov ? 1 : 0})`,
        transformOrigin: 'right',
        transition: 'transform 1s cubic-bezier(0.22,1,0.36,1) 0.12s',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Layout — BUNYOUNG */}
      <div style={{
        position: mobile ? 'relative' : 'absolute', inset: 0, zIndex: 2,
        display: 'grid', gridTemplateColumns: mobile ? '1fr' : '45% 55%',
      }}>

        {/* ── LEFT: SM industrial framing ── */}
        <div style={{
          padding: 'clamp(64px,9vh,108px) 48px clamp(64px,9vh,108px) clamp(52px,12vw,170px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>

          {/* Top meta */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: isHov ? '#FF6B2B' : 'rgba(255,107,43,0.5)',
                transition: 'color 0.4s ease',
              }}>Featured Perspective 03</span>
              <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>— 2024</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Branding', 'Web Design'].map((tag, i) => (
                <span key={i} style={{
                  fontSize: '9px', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: isHov ? '#FF6B2B' : 'rgba(255,107,43,0.5)',
                  border: `1px solid rgba(255,107,43,${isHov ? 0.4 : 0.16})`,
                  padding: '4px 10px',
                  transition: 'color 0.4s ease, border-color 0.4s ease',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Headline */}
          <div>
            <h3 style={{
              fontSize: 'clamp(52px,7.5vw,116px)',
              fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 0.88,
              color: '#fff',
              transform: isHov ? 'translateX(6px)' : 'none',
              transition: 'transform 1.8s cubic-bezier(0.22,1,0.36,1)',
              userSelect: 'none',
            }}>
              BEON<br /><span style={{
                color: isHov ? '#FF6B2B' : 'rgba(255,107,43,0.75)',
                transition: 'color 0.7s ease',
              }}>YEONG</span>
            </h3>

            <div style={{
              width: isHov ? '100%' : '32px', height: '2px',
              background: '#0055CC',
              margin: '24px 0 20px',
              transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1) 0.04s',
            }} />

            <p style={{
              fontSize: 'clamp(14px,1.5vw,20px)', fontWeight: 300, fontStyle: 'italic',
              color: isHov ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
              lineHeight: 1.4, letterSpacing: '0.01em',
              transition: 'color 0.6s ease',
            }}>
              Industrial printing,<br />reframed visually.
            </p>

            <p style={{
              fontSize: '12px', fontWeight: 300,
              color: isHov ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.45)',
              letterSpacing: '0.05em', lineHeight: 1.9, marginTop: '12px',
              transition: 'color 0.55s ease',
            }}>
              산업을 시각 언어로<br />재구성하다.
            </p>

            <p style={{
              fontSize: '11px', fontWeight: 300,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.04em', lineHeight: 1.85, marginTop: '18px',
              maxHeight: isHov ? '80px' : '0', overflow: 'hidden',
              opacity: isHov ? 1 : 0,
              transition: 'opacity 0.5s ease 0.18s, max-height 0.5s ease 0.06s',
            }}>
              산업 기반 브랜드를<br />현대적인 시각 언어로 재구성.
            </p>
          </div>

          {/* Connection statement */}
          <div style={{
            borderTop: `1px solid rgba(0,85,204,${isHov ? 0.3 : 0.1})`,
            paddingTop: '18px',
            transition: 'border-color 0.5s ease',
          }}>
            <p style={{
              fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: `rgba(255,107,43,${isHov ? 0.95 : 0.65})`,
              marginBottom: '7px', transition: 'color 0.4s ease',
            }}>Industrial Vision → Brand Reality</p>
            <p style={{
              fontSize: '10px', fontWeight: 300, lineHeight: 1.7,
              color: `rgba(255,255,255,${isHov ? 0.7 : 0.5})`,
              letterSpacing: '0.03em', transition: 'color 0.4s ease',
            }}>
              Built through the STUDIO MONSTER<br />perspective system.
            </p>
            <p style={{
              fontSize: '10px', fontWeight: 300,
              color: `rgba(255,255,255,${isHov ? 0.5 : 0.38})`,
              letterSpacing: '0.04em', marginTop: '3px', transition: 'color 0.4s ease',
            }}>
              STUDIO MONSTER의 관점 시스템을 기반으로 구축된 브랜드.
            </p>
          </div>
        </div>

        {/* ── RIGHT: BUNYOUNG brand universe ── */}
        <div style={{
          padding: 'clamp(44px,6vh,68px) clamp(52px,5vw,80px) clamp(44px,6vh,68px) 28px',
          display: 'flex', flexDirection: 'column', gap: '10px',
          transform: isHov ? 'translateY(-8px)' : 'none',
          transition: 'transform 1.9s cubic-bezier(0.22,1,0.36,1)',
        }}>

          {/* ─ Main brand panel ─ */}
          <div style={{
            flex: '1 1 0', minHeight: 0,
            border: '1px solid rgba(0,85,204,0.25)',
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>

            {/* BUNYOUNG nav strip */}
            <div style={{
              height: '40px', flexShrink: 0,
              background: '#060810',
              borderBottom: '1px solid rgba(0,85,204,0.15)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', padding: '0 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                {/* Orange pentagon mark */}
                <div style={{
                  width: '9px', height: '9px',
                  background: isHov ? '#FF6B2B' : 'rgba(255,107,43,0.75)',
                  clipPath: 'polygon(0 20%, 20% 0, 100% 0, 100% 100%, 0 100%)',
                  transition: 'background 0.4s ease',
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', color: '#fff' }}>
                  BEONYEONG
                </span>
              </div>
              <div style={{ display: 'flex', gap: '14px' }}>
                {['Products', 'Equipment', 'About', 'Contact'].map(item => (
                  <span key={item} style={{
                    fontSize: '7.5px', letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
                  }}>{item}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{
                  width: '5px', height: '5px',
                  background: '#FF6B2B', borderRadius: '50%',
                  animation: 'nd-pulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontSize: '7px', letterSpacing: '0.12em', color: 'rgba(255,107,43,0.6)', textTransform: 'uppercase' }}>Est. 1997</span>
              </div>
            </div>

            {/* Hero: dark mark | blue industrial panel */}
            <div style={{
              flex: '1 1 0', minHeight: 0,
              display: 'grid', gridTemplateColumns: '1fr 1.45fr',
            }}>

              {/* Left cell: dark navy — brand mark */}
              <div style={{
                background: '#0A0E1A',
                borderRight: '1px solid rgba(0,85,204,0.12)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '20px 18px',
              }}>
                {/* Ghost B — orange outline */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: `translate(-50%, -52%) ${isHov ? 'scale(1.04)' : 'scale(1)'}`,
                  fontSize: 'clamp(80px,11vw,140px)', fontWeight: 900, letterSpacing: '-0.05em',
                  lineHeight: 1, color: 'transparent',
                  WebkitTextStroke: `1px rgba(255,107,43,${isHov ? 0.22 : 0.08})`,
                  userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
                  transition: 'transform 1.6s cubic-bezier(0.22,1,0.36,1), -webkit-text-stroke 0.8s ease',
                }}>B</div>

                {/* Corner bracket TL — blue */}
                <div style={{
                  position: 'absolute', top: '14px', left: '14px',
                  width: '14px', height: '14px',
                  borderTop: `1px solid rgba(0,85,204,${isHov ? 0.6 : 0.22})`,
                  borderLeft: `1px solid rgba(0,85,204,${isHov ? 0.6 : 0.22})`,
                  transition: 'border-color 0.6s ease',
                }} />

                {/* Orange pentagon accent */}
                <div style={{
                  position: 'absolute', top: '14px', right: '14px',
                  width: isHov ? '12px' : '8px', height: isHov ? '12px' : '8px',
                  background: '#FF6B2B',
                  clipPath: 'polygon(0 25%, 25% 0, 100% 0, 100% 100%, 0 100%)',
                  transition: 'width 0.5s ease, height 0.5s ease',
                }} />

                {/* Brand mark */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontSize: 'clamp(16px,2.4vw,30px)', fontWeight: 900,
                    letterSpacing: '-0.03em', lineHeight: 1, color: '#fff',
                    transform: isHov ? 'translateY(-3px)' : 'none',
                    transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
                  }}>번영<br /><span style={{ fontSize: '0.55em', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>BEONYEONG</span></div>
                  <div style={{
                    marginTop: '7px',
                    width: isHov ? '100%' : '20px', height: '2px',
                    background: '#0055CC',
                    transition: 'width 0.9s cubic-bezier(0.22,1,0.36,1) 0.06s',
                  }} />
                  <p style={{
                    marginTop: '7px', fontSize: '7px', letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: isHov ? 'rgba(255,107,43,0.75)' : 'rgba(255,107,43,0.4)',
                    transition: 'color 0.4s ease',
                  }}>Print Specialist · 1997</p>
                </div>
              </div>

              {/* Right cell: blue flat — industrial statement */}
              <div style={{
                background: isHov ? '#0055CC' : '#004BB8',
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                padding: '22px 20px',
                transition: 'background 0.9s ease',
              }}>
                {/* Scan line */}
                <div style={{
                  position: 'absolute', left: 0, right: 0, height: '80px',
                  background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent)',
                  animation: 'nd-scan 5s ease-in-out infinite',
                  pointerEvents: 'none', zIndex: 0,
                }} />

                {/* Orange accent bar + top label */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: isHov ? '40px' : '20px', height: '3px',
                    background: '#FF6B2B',
                    marginBottom: '10px',
                    transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)',
                  }} />
                  <p style={{
                    fontSize: '7px', fontWeight: 700, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                  }}>라벨 · 스티커 인쇄 전문기업</p>
                </div>

                {/* Center statement */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  transform: isHov ? 'translateX(-3px)' : 'none',
                  transition: 'transform 1.5s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  <div style={{
                    fontSize: 'clamp(18px,2.6vw,36px)', fontWeight: 800,
                    letterSpacing: '-0.025em', lineHeight: 1.05, color: '#fff',
                  }}>
                    INDUSTRIAL<br />PRINTING<br />REFRAMED<br />VISUALLY.
                  </div>
                </div>

                {/* Material types — hover reveal */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? 'none' : 'translateY(6px)',
                  transition: 'opacity 0.5s ease 0.12s, transform 0.5s ease 0.12s',
                }}>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', marginBottom: '10px' }} />
                  {MATERIALS.map((m, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'baseline', gap: '8px',
                      fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.6)', lineHeight: 2,
                    }}>
                      <span style={{ fontWeight: 700, color: '#FF6B2B' }}>{m.label}</span>
                      <span style={{ opacity: 0.7 }}>{m.sub}</span>
                    </div>
                  ))}
                </div>

                {/* Corner accent BR — orange */}
                <div style={{
                  position: 'absolute', bottom: '14px', right: '14px',
                  width: '14px', height: '14px',
                  borderBottom: '1px solid rgba(255,107,43,0.45)',
                  borderRight: '1px solid rgba(255,107,43,0.45)',
                }} />
              </div>
            </div>

            {/* Ticker */}
            <div style={{
              borderTop: '1px solid rgba(0,85,204,0.15)',
              height: '26px', flexShrink: 0,
              display: 'flex', alignItems: 'center',
              overflow: 'hidden', background: '#060810',
            }}>
              <div style={{
                display: 'flex', whiteSpace: 'nowrap',
                animation: 'nd-ticker 28s linear infinite',
              }}>
                {[TICKER, TICKER].map((t, i) => (
                  <span key={i} style={{
                    fontSize: '7px', letterSpacing: '0.16em', paddingLeft: '20px',
                    color: 'rgba(255,107,43,0.3)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ─ Bottom strip: orange specimen + BUNYOUNG palette ─ */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
            flexShrink: 0, height: '68px',
          }}>
            <div style={{
              background: '#FF6B2B',
              padding: '11px 16px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transform: isHov ? 'translateX(-5px)' : 'none',
              transition: 'transform 1.5s cubic-bezier(0.22,1,0.36,1) 0.08s',
            }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', fontFamily: cfg.typefaceFamily }}>Brand Typeface · {cfg.typefaceName}</span>
              <div style={{ fontSize: 'clamp(18px,2.4vw,28px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff', fontFamily: cfg.typefaceFamily }}>Aa Bb Cc</div>
            </div>

            <div style={{ display: 'flex', overflow: 'hidden', opacity: isHov ? 1 : 0.65, transition: 'opacity 0.6s ease' }}>
              {cfg.palette.map((sw, i) => (
                <div key={i} style={{
                  flex: 1, background: sw.bg,
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '7px 6px',
                  borderRight: i < cfg.palette.length - 1 ? '1px solid rgba(0,0,0,0.15)' : 'none',
                  gap: '2px',
                }}>
                  <span style={{
                    fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: sw.light ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
                  }}>{sw.label}</span>
                  <span style={{
                    fontSize: '8px', letterSpacing: '0.04em', fontFamily: 'monospace',
                    color: sw.light ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
                  }}>{sw.bg.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─ CTA: Visit BEONYEONG ─ */}
          <a
            href={cfg.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 20px',
              background: ctaHov ? '#FF6B2B' : '#060810',
              border: `1px solid rgba(255,107,43,${ctaHov ? 0 : 0.22})`,
              textDecoration: 'none', cursor: 'none',
              transition: 'background 0.35s ease, border-color 0.35s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: ctaHov ? '#fff' : 'rgba(255,255,255,0.45)',
                transition: 'color 0.3s ease',
              }}>{cfg.ctaLabel}</span>
              <span style={{
                fontSize: '8px', letterSpacing: '0.1em',
                color: ctaHov ? 'rgba(255,255,255,0.7)' : 'rgba(255,107,43,0.55)',
                transition: 'color 0.3s ease',
              }}>{cfg.ctaUrl.replace(/^https?:\/\//, '')}</span>
            </div>
            <span style={{
              fontSize: '13px',
              color: ctaHov ? '#fff' : 'rgba(255,107,43,0.65)',
              transform: ctaHov ? 'translateX(4px)' : 'none',
              transition: 'color 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Standard Project Card ────────────────────────────────────────────────────

function ProjectCard({ project, isHov, onEnter, onLeave }: {
  project: Project
  isHov: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const accentRgb = '0,110,183'

  return (
    <div
      className="work-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        height: 'clamp(480px,62vh,700px)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        cursor: 'none',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: isHov ? '#090909' : '#060606',
        transition: 'background 0.8s ease',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: isHov ? 0.16 : 0.04,
        transition: 'opacity 1s ease',
        backgroundImage: [
          'linear-gradient(rgba(0,174,239,.12) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(0,174,239,.12) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '44px 44px',
      }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: '44%', width: '1px',
        background: `rgba(${accentRgb},0.2)`,
        opacity: isHov ? 1 : 0,
        transition: 'opacity 0.7s ease',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0,
        top: '50%', height: '1px',
        background: `rgba(${accentRgb},0.1)`,
        opacity: isHov ? 1 : 0,
        transition: 'opacity 0.7s ease 0.08s',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '32px', right: '52px',
        width: '20px', height: '20px',
        borderTop: `1px solid rgba(${accentRgb},${isHov ? 0.45 : 0.12})`,
        borderRight: `1px solid rgba(${accentRgb},${isHov ? 0.45 : 0.12})`,
        transition: 'border-color 0.6s ease',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '32px', left: '52px',
        width: '20px', height: '20px',
        borderBottom: `1px solid rgba(${accentRgb},${isHov ? 0.45 : 0.12})`,
        borderLeft: `1px solid rgba(${accentRgb},${isHov ? 0.45 : 0.12})`,
        transition: 'border-color 0.6s ease',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        right: isHov ? '-1vw' : '0',
        top: '50%', transform: `translateY(-50%)`,
        fontSize: 'clamp(100px,15vw,240px)', fontWeight: 900,
        letterSpacing: '-0.04em', lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: isHov
          ? `1.5px rgba(${accentRgb},0.18)`
          : '1px rgba(255,255,255,0.04)',
        userSelect: 'none', whiteSpace: 'nowrap', pointerEvents: 'none',
        transition: 'right 1.2s cubic-bezier(0.22,1,0.36,1), -webkit-text-stroke 0.8s ease',
      }}>
        {project.name}
      </div>
      <div style={{
        position: 'absolute',
        top: '50%', left: 0, right: 0, height: '1px',
        background: `linear-gradient(90deg, transparent 0%, rgba(${accentRgb},0.25) 30%, rgba(${accentRgb},0.25) 70%, transparent 100%)`,
        opacity: isHov ? 1 : 0,
        transition: 'opacity 0.6s ease 0.05s',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{ position: 'absolute', top: '36px', left: '52px', zIndex: 2 }}>
        <span style={{
          fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em',
          color: `rgba(${accentRgb},${isHov ? 0.9 : 0.55})`,
          transition: 'color 0.4s ease',
        }}>
          {project.index} — {project.year}
        </span>
      </div>
      <div style={{
        position: 'absolute', bottom: '44px', left: '80px', right: '80px',
        zIndex: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <div>
          <h3 style={{
            fontSize: 'clamp(32px,4.5vw,68px)', fontWeight: 700,
            letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '14px', color: '#fff',
            transform: isHov ? 'translateY(-4px)' : 'none',
            transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}>
            {project.name}
          </h3>
          <p style={{
            fontSize: 'clamp(12px,1.1vw,15px)', fontWeight: 300,
            color: isHov ? `rgba(${accentRgb},0.65)` : 'rgba(255,255,255,0.22)',
            letterSpacing: '0.06em', fontStyle: 'italic', lineHeight: 1.5,
            marginBottom: isHov ? '12px' : '0', whiteSpace: 'pre-line',
            transition: 'color 0.5s ease, margin 0.4s ease',
          }}>
            {project.perspective}
          </p>
          <p style={{
            fontSize: '11px', fontWeight: 300,
            color: 'rgba(255,255,255,0.32)',
            letterSpacing: '0.04em', lineHeight: 1.7, maxWidth: '360px',
            whiteSpace: 'pre-line',
            maxHeight: isHov ? '80px' : '0', overflow: 'hidden',
            opacity: isHov ? 1 : 0,
            transition: 'opacity 0.45s ease 0.12s, max-height 0.45s ease',
          }}>
            {project.description}
          </p>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px',
          opacity: isHov ? 1 : 0.5, transition: 'opacity 0.4s ease',
        }}>
          {project.tags.map((tag, i) => (
            <span key={i} style={{
              fontSize: '9px', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: `rgba(${accentRgb},${isHov ? 0.9 : 0.6})`,
              border: `1px solid rgba(${accentRgb},${isHov ? 0.35 : 0.18})`,
              padding: '5px 12px',
              transition: 'color 0.4s ease, border-color 0.4s ease',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Work Section ─────────────────────────────────────────────────────────────

export default function Work() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [workCfg, setWorkCfg] = useState(DEFAULT_WORK_CFG)
  const mobile = useIsMobile()

  useEffect(() => {
    const saved = localStorage.getItem('sm_work')
    if (saved) try { setWorkCfg({ ...DEFAULT_WORK_CFG, ...JSON.parse(saved) }) } catch {}
  }, [])

  return (
    <section id="work" style={{ paddingTop: 'clamp(80px,10vw,140px)' }}>

      {/* Section header */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', marginBottom: '64px', padding: '0 var(--pad)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '28px' }}>
          <p style={{
            fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
          }}>
            03 / REALITY.TRANSLATION.OUTPUT
          </p>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)', maxWidth: 48 }} />
          <p style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.14em', color: 'rgba(203,219,42,0.35)', textTransform: 'uppercase' }}>
            03.INSTANCES — ACTIVE
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px',
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(28px,3.8vw,56px)',
              fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.96,
              marginBottom: '14px',
            }}>
              <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}>PERSPECTIVE</span>
              <span style={{ display: 'block', color: '#fff' }}>BECOMES REALITY.</span>
            </h2>
            <p style={{
              fontFamily: 'monospace', fontSize: '10px', fontWeight: 400,
              color: 'rgba(255,255,255,0.22)', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              관점이 실제 브랜드가 된 3개의 증거
            </p>
          </div>
          <div style={{ textAlign: 'right', paddingBottom: '4px' }}>
            <p style={{
              fontFamily: 'monospace', fontSize: '8px', fontWeight: 700,
              color: 'rgba(203,219,42,0.45)', letterSpacing: '0.18em', textTransform: 'uppercase',
              marginBottom: '6px',
            }}>
              TRANSLATION.COMPLETE →
            </p>
            <p style={{
              fontFamily: 'monospace', fontSize: '8px', color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              관점은 실제가 될 때 의미를 가집니다.
            </p>
          </div>
        </div>
      </div>

      {/* Transition: philosophy → reality */}
      <TransitionStatement />

      {/* NEWDIA — Featured Perspective 01 */}
      <NewdiaShowcase
        isHov={mobile || hovered === 'newdia'}
        onEnter={() => setHovered('newdia')}
        onLeave={() => setHovered(null)}
        cfg={workCfg.newdia}
      />

      {/* CORE NETWORKS — Featured Perspective 02 */}
      <CoreNWSShowcase
        isHov={mobile || hovered === 'corenws'}
        onEnter={() => setHovered('corenws')}
        onLeave={() => setHovered(null)}
        cfg={workCfg.corenws}
      />

      {/* BEONYEONG — Featured Perspective 03 */}
      <BunyoungShowcase
        isHov={mobile || hovered === 'bunyoung'}
        onEnter={() => setHovered('bunyoung')}
        onLeave={() => setHovered(null)}
        cfg={workCfg.bunyoung}
      />

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
    </section>
  )
}
