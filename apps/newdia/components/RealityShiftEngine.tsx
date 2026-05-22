'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

type ShiftState = 'dormant' | 'visible' | 'holding' | 'fracturing' | 'translating'

const STYLES = `
@keyframes rse-pulse {
  0%, 100% { opacity: 0.55; }
  50%       { opacity: 1; }
}
@keyframes rse-hold {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
`

function getSmDest() {
  if (typeof window === 'undefined') return 'https://beos-studio-monster.vercel.app'
  return window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://beos-studio-monster.vercel.app'
}

export default function RealityShiftEngine() {
  const [state, setState] = useState<ShiftState>('dormant')
  const [progress, setProgress] = useState(0)
  const holdTimer  = useRef<ReturnType<typeof setTimeout>  | null>(null)
  const progressIv = useRef<ReturnType<typeof setInterval> | null>(null)
  const holding    = useRef(false)

  // 포트폴리오 섹션 진입 시 엔진 활성화
  useEffect(() => {
    const sensor = document.getElementById('portfolio')
    if (!sensor) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setState(s => s === 'dormant' ? 'visible' : s) },
      { threshold: 0.15 }
    )
    obs.observe(sensor)
    return () => obs.disconnect()
  }, [])

  const launchFracture = useCallback(() => {
    setState('fracturing')
    holding.current = false
    let p = 0
    progressIv.current = setInterval(() => {
      p += 1.6
      setProgress(Math.min(100, p))
      if (p >= 100) {
        clearInterval(progressIv.current!)
        setState('translating')
        setTimeout(() => { window.location.href = `${getSmDest()}?from=newdia` }, 1400)
      }
    }, 28)
  }, [])

  const onEnter = useCallback(() => {
    if (state !== 'visible') return
    setState('holding')
    holding.current = true
    holdTimer.current = setTimeout(() => { if (holding.current) launchFracture() }, 1800)
  }, [state, launchFracture])

  const onLeave = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current)
    holding.current = false
    setState(s => s === 'holding' ? 'visible' : s)
  }, [])

  if (state === 'dormant') return null

  return (
    <>
      <style>{STYLES}</style>

      {/* ─── Ambient Reality State Panel ─── */}
      {(state === 'visible' || state === 'holding') && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 800,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5,
        }}>
          {/* Current state badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7, padding: '5px 10px',
            background: 'rgba(255,255,255,0.97)',
            border: '1px solid rgba(203,219,42,0.35)',
          }}>
            <div style={{
              width: 4, height: 4, background: '#CBDB2A',
              animation: 'rse-pulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'monospace', fontSize: 7, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0a0a09',
            }}>
              STRUCTURE.REALITY — STABLE
            </span>
          </div>

          {/* Shift trigger zone */}
          <div
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
            style={{
              position: 'relative', overflow: 'hidden', cursor: 'crosshair',
              padding: '9px 14px', background: '#0a0a09',
              border: `1px solid ${state === 'holding' ? 'rgba(203,219,42,0.75)' : 'rgba(203,219,42,0.22)'}`,
              transition: 'border-color 0.3s ease',
            }}
          >
            {/* SM 44px grid ghost */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: [
                'linear-gradient(rgba(203,219,42,0.055) 1px,transparent 1px)',
                'linear-gradient(90deg,rgba(203,219,42,0.055) 1px,transparent 1px)',
              ].join(','),
              backgroundSize: '44px 44px',
            }} />
            {/* Hold progress bar */}
            {state === 'holding' && (
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                height: 2, width: '100%', background: '#CBDB2A',
                transformOrigin: 'left', animation: 'rse-hold 1.8s linear forwards',
              }} />
            )}
            <span style={{
              fontFamily: 'monospace', fontSize: 8, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              position: 'relative', zIndex: 1,
              color: state === 'holding' ? '#CBDB2A' : 'rgba(203,219,42,0.65)',
              transition: 'color 0.25s ease',
            }}>
              {state === 'holding' ? 'REALITY.FRACTURING...' : 'HOLD → SHIFT.REALITY'}
            </span>
          </div>
        </div>
      )}

      {/* ─── Reality Fracture Overlay ─── */}
      {(state === 'fracturing' || state === 'translating') && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
          background: '#0a0a09',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* ND 80px grid dissolving */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: [
              'linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px)',
              'linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)',
            ].join(','),
            backgroundSize: '80px 80px',
            opacity: Math.max(0, 1 - progress / 45),
          }} />
          {/* SM 44px grid materializing */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: [
              'linear-gradient(rgba(0,174,239,0.06) 1px,transparent 1px)',
              'linear-gradient(90deg,rgba(0,174,239,0.06) 1px,transparent 1px)',
            ].join(','),
            backgroundSize: '44px 44px',
            opacity: Math.min(0.7, progress / 50),
          }} />

          {/* Lime vertical trace */}
          <div style={{
            position: 'absolute', top: 0, right: '15%', width: 1,
            height: `${Math.min(100, progress * 1.1)}%`,
            background: 'linear-gradient(to bottom, transparent 0%, #CBDB2A 10%, #CBDB2A 90%, transparent 100%)',
            opacity: 0.9,
          }} />
          {/* Horizontal scan */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(203,219,42,0.85), transparent)',
            top: `${Math.min(99, progress * 1.02)}%`,
          }} />

          {/* SM ghost symbol */}
          <div style={{
            position: 'absolute', right: '7%', top: '50%', transform: 'translateY(-50%)',
            width: 'clamp(120px,16vw,200px)', height: 'clamp(120px,16vw,200px)',
            opacity: Math.max(0, Math.min(0.22, (progress - 30) / 200)),
            pointerEvents: 'none',
          }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <g fill="none" stroke="#00AEEF" strokeWidth="1.2" strokeLinejoin="round">
                <polyline points="8,86 8,14 32,50 50,14 68,50 92,14 92,86" opacity="0.9"/>
                <polyline points="8,86 8,14 32,50 50,14 68,50 92,14 92,86" opacity="0.4" transform="translate(2,2)"/>
                <line x1="8" y1="50" x2="92" y2="50" strokeDasharray="3,4" opacity="0.3"/>
              </g>
            </svg>
          </div>

          {/* Corner brackets */}
          <div style={{ position: 'absolute', top: 28, left: 28, width: 16, height: 16, borderTop: '1px solid rgba(203,219,42,0.5)', borderLeft: '1px solid rgba(203,219,42,0.5)' }} />
          <div style={{ position: 'absolute', top: 28, right: 28, width: 16, height: 16, borderTop: '1px solid rgba(203,219,42,0.5)', borderRight: '1px solid rgba(203,219,42,0.5)' }} />
          <div style={{ position: 'absolute', bottom: 28, left: 28, width: 16, height: 16, borderBottom: '1px solid rgba(203,219,42,0.5)', borderLeft: '1px solid rgba(203,219,42,0.5)' }} />
          <div style={{ position: 'absolute', bottom: 28, right: 28, width: 16, height: 16, borderBottom: '1px solid rgba(203,219,42,0.5)', borderRight: '1px solid rgba(203,219,42,0.5)' }} />

          {/* Center content */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <p style={{
              fontFamily: 'monospace', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.4em', textTransform: 'uppercase',
              color: 'rgba(203,219,42,0.45)', marginBottom: 28,
            }}>
              REALITY.TRANSLATION.ENGINE
            </p>
            <div style={{ fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.0 }}>
              {state === 'translating' ? (
                <span style={{ color: '#CBDB2A' }}>TRANSLATING.</span>
              ) : (
                <>
                  <div style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.32)' }}>REALITY</div>
                  <div style={{ color: '#CBDB2A' }}>FRACTURING.</div>
                </>
              )}
            </div>
            {/* Progress */}
            <div style={{ margin: '36px auto 0', width: 200, height: 1, background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress}%`, background: '#CBDB2A' }} />
            </div>
            <p style={{
              fontFamily: 'monospace', fontSize: 7,
              letterSpacing: '0.22em', color: 'rgba(255,255,255,0.2)',
              marginTop: 10, textTransform: 'uppercase',
            }}>
              {String(Math.round(progress)).padStart(3, '0')}% — PERSPECTIVE.LAYER.LOADING
            </p>
          </div>
        </div>
      )}
    </>
  )
}
