'use client'
import { useEffect, useRef, useState } from 'react'
import MLogo from './MLogo'

const STAGES = [
  {
    num: '01', label: 'REALITY.SCAN',
    en: ['Current reality', 'being scanned.'],
    ko: '현재 현실의 구조를 스캔합니다.',
    logoMode: 'wire' as const,
    logoTransform: 'rotateX(52deg) rotateY(-18deg) scale(0.62)',
    logoOpacity: 0.18,
    logoFilter: 'blur(1px)',
    gridOpacity: 0.10,
    floorOpacity: 0.28,
    glowColor: 'rgba(0,174,239,0.04)',
    shadowW: 55,
  },
  {
    num: '02', label: 'FRACTURE.POINT',
    en: ['The fracture', 'begins here.'],
    ko: '균열이 시작되는 지점.',
    logoMode: 'full' as const,
    logoTransform: 'rotateY(68deg) rotateX(-20deg)',
    logoOpacity: 0.88,
    logoFilter: 'none',
    gridOpacity: 0.22,
    floorOpacity: 0.72,
    glowColor: 'rgba(0,174,239,0.14)',
    shadowW: 75,
  },
  {
    num: '03', label: 'STRUCTURE.EXPOSE',
    en: ['Hidden structure', 'now visible.'],
    ko: '보이지 않던 구조가 드러납니다.',
    logoMode: 'wire' as const,
    logoTransform: 'rotateX(-58deg) rotateY(14deg)',
    logoOpacity: 1,
    logoFilter: 'none',
    gridOpacity: 0.48,
    floorOpacity: 1.0,
    glowColor: 'rgba(0,174,239,0.24)',
    shadowW: 165,
  },
  {
    num: '04', label: 'REALITY.TRANSLATE',
    en: ['Reality is being', 're-translated.'],
    ko: '현실이 재번역됩니다.',
    logoMode: 'full' as const,
    logoTransform: 'rotateY(-64deg) rotateX(16deg)',
    logoOpacity: 0.92,
    logoFilter: 'none',
    gridOpacity: 0.28,
    floorOpacity: 0.76,
    glowColor: 'rgba(0,174,239,0.16)',
    shadowW: 78,
  },
  {
    num: '05', label: 'NEW.STATE.ACTIVE',
    en: ['New reality state', 'now active.'],
    ko: '새로운 현실 상태가 활성화됩니다.',
    logoMode: 'full' as const,
    logoTransform: 'rotateX(0deg) rotateY(0deg)',
    logoOpacity: 1,
    logoFilter: 'none',
    gridOpacity: 0.06,
    floorOpacity: 0.45,
    glowColor: 'rgba(203,219,42,0.18)',
    shadowW: 205,
  },
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [stageIdx, setStageIdx] = useState(0)
  const [displayIdx, setDisplayIdx] = useState(0)
  const [textOpacity, setTextOpacity] = useState(1)
  const transitioning = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const totalScroll = el.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const p = Math.min(1, scrolled / totalScroll)
      const next = Math.min(4, Math.floor(p * 5))
      setStageIdx(next)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (stageIdx === displayIdx) return
    if (transitioning.current) return
    transitioning.current = true
    setTextOpacity(0)
    const t = setTimeout(() => {
      setDisplayIdx(stageIdx)
      setTextOpacity(1)
      transitioning.current = false
    }, 280)
    return () => {
      clearTimeout(t)
      transitioning.current = false
    }
  }, [stageIdx, displayIdx])

  const s = STAGES[stageIdx]
  const d = STAGES[displayIdx]

  return (
    <div ref={containerRef} id="about" style={{ height: '500vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#000' }}>

        {/* ─── 배경 그리드 ─────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          opacity: s.gridOpacity,
          transition: 'opacity 1.4s ease',
          backgroundImage: [
            'linear-gradient(rgba(0,174,239,.07) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(0,174,239,.07) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '44px 44px',
        }} />

        {/* ─── ND Structure Ghost — NEWDIA DNA가 침투하는 80px 그리드 ─── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          opacity: Math.max(0, (stageIdx - 2) * 0.055),
          transition: 'opacity 1.6s ease',
          backgroundImage: [
            'linear-gradient(rgba(203,219,42,0.055) 1px,transparent 1px)',
            'linear-gradient(90deg,rgba(203,219,42,0.055) 1px,transparent 1px)',
          ].join(','),
          backgroundSize: '80px 80px',
        }} />

        {/* ─── 3D PERSPECTIVE FLOOR ─────────────────────────────
            원근법 바닥 — 지평선에서 멀리 뻗어나가는 격자.
            perspective(380px) + rotateX(65deg)이 핵심:
            위쪽(멀리)은 선이 좁게 수렴, 아래(가까이)는 넓게 펼침.
        ────────────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          left: '-25%', right: '-25%',
          top: '60%', bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: s.floorOpacity,
          transition: 'opacity 1.4s ease',
        }}>
          <div style={{
            width: '100%',
            height: '400%',
            transformOrigin: 'center top',
            transform: 'perspective(360px) rotateX(65deg)',
            backgroundImage: [
              'linear-gradient(rgba(0,174,239,0.18) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(0,174,239,0.18) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '80px 80px',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 14%, rgba(0,0,0,0.65) 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 14%, rgba(0,0,0,0.65) 100%)',
          }} />
        </div>


        {/* 지평선 아래 하늘 반사 (바닥 위 얇은 glow) */}
        <div style={{
          position: 'absolute',
          top: '60%', left: 0, right: 0,
          height: '80px',
          background: 'linear-gradient(to bottom, rgba(0,174,239,0.06), transparent)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: s.floorOpacity,
          transition: 'opacity 1.4s ease',
        }} />

        {/* ─── STAGE NUMBER WATERMARK ──────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: '3vw', pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
        }}>
          <span style={{
            fontSize: 'clamp(200px,28vw,380px)', fontWeight: 900,
            letterSpacing: '-0.06em', lineHeight: 1,
            color: 'rgba(255,255,255,0.07)', userSelect: 'none',
            transition: 'opacity 0.8s ease',
          }}>
            {s.num}
          </span>
        </div>

        {/* ─── MAIN CONTENT ────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          padding: '0 var(--pad)', zIndex: 3,
        }}>
          <div style={{
            width: '100%', maxWidth: '1100px', margin: '0 auto',
            height: '100%', display: 'flex', flexDirection: 'column',
          }}>

            {/* Section label */}
            <div style={{ paddingTop: 'clamp(80px,10vw,140px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '20px' }}>
                <p style={{
                  fontFamily: 'monospace', fontSize: '9px', fontWeight: 700,
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                }}>
                  02 / REALITY.FRACTURE.ENGINE
                </p>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)', maxWidth: 60 }} />
                <p style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.14em', color: 'rgba(203,219,42,0.3)', textTransform: 'uppercase' }}>
                  SEQUENCE.05
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: 'clamp(24px,3.2vw,48px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0, marginBottom: '8px' }}>
                    REALITY.STATES.<br />SEQUENCE.05
                  </h2>
                  <p style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 400, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    관점이 현실을 재번역하는 5단계
                  </p>
                </div>
                <div style={{ textAlign: 'right', paddingBottom: '2px' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 400, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    PERSPECTIVE.BREAKS →
                  </p>
                  <p style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, color: 'rgba(203,219,42,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    REALITY.TRANSLATES
                  </p>
                </div>
              </div>
            </div>

            {/* 2-column: text | logo */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '100%',
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                alignItems: 'center', gap: '60px',
              }}>

                {/* Left: stage text */}
                <div style={{ opacity: textOpacity, transition: 'opacity 0.28s ease' }}>
                  <p style={{
                    fontFamily: 'monospace',
                    fontSize: '9px', fontWeight: 700,
                    letterSpacing: '0.32em', textTransform: 'uppercase',
                    color: displayIdx >= 2 ? 'rgba(203,219,42,0.85)' : 'rgba(0,174,239,0.75)',
                    marginBottom: '20px',
                    transition: 'color 0.6s ease',
                  }}>
                    {d.num} — {d.label}
                  </p>
                  <h2 style={{
                    fontSize: 'clamp(28px,3.2vw,48px)',
                    fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px',
                  }}>
                    {d.en.map((line, i) => (
                      <span key={i} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </h2>
                  <p style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.32)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {d.ko}
                  </p>
                </div>

                {/* ─── Right: M Logo in 3D Space ───────────────────
                    공간 안에 떠있는 M 로고.
                    preserve-3d + depth clones = 실제 두께감.
                    ambient glow = 로고 주변 빛 산란.
                    floor shadow = 바닥에 투영된 그림자.
                ───────────────────────────────────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'relative', width: '300px', height: '300px' }}>

                    {/* 로고 주변 공간 빛 (ambient glow) */}
                    <div style={{
                      position: 'absolute',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '500px', height: '500px',
                      background: `radial-gradient(ellipse, ${s.glowColor} 0%, transparent 62%)`,
                      transition: 'background 1.2s ease',
                      pointerEvents: 'none', borderRadius: '50%', zIndex: 0,
                    }} />

                    {/* perspective 컨테이너 — 3D 시점 설정 */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      perspective: '900px',
                      perspectiveOrigin: '50% 45%',
                      zIndex: 1,
                    }}>
                      {/* preserve-3d 래퍼 — 자식들이 Z축에서 실제 깊이를 가짐 */}
                      <div style={{
                        width: '100%', height: '100%',
                        transform: s.logoTransform,
                        transformStyle: 'preserve-3d',
                        opacity: s.logoOpacity,
                        filter: s.logoFilter,
                        transition: [
                          'transform 1.6s cubic-bezier(0.22,1,0.36,1)',
                          'opacity 1.2s ease',
                          'filter 1.0s ease',
                        ].join(', '),
                      }}>

                        {/* 깊이 복제 레이어 — Z축으로 쌓여 실제 두께처럼 보임 */}
                        {[4, 3, 2, 1].map(layer => (
                          <div key={layer} style={{
                            position: 'absolute', inset: 0,
                            transform: `translateZ(-${layer * 8}px)`,
                            opacity: 0.25 - layer * 0.05,
                            pointerEvents: 'none',
                          }}>
                            <MLogo mode="full" style={{ width: '100%', height: '100%' }} />
                          </div>
                        ))}

                        {/* 전면 (primary surface) */}
                        <div style={{ position: 'absolute', inset: 0 }}>
                          <MLogo mode={s.logoMode} style={{ width: '100%', height: '100%' }} />
                        </div>

                      </div>
                    </div>

                    {/* 바닥 그림자 — 회전 각도에 따라 너비 변화 */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-22px', left: '50%',
                      transform: 'translateX(-50%)',
                      width: `${s.shadowW}px`,
                      height: '24px',
                      background: 'radial-gradient(ellipse, rgba(0,90,180,0.35) 0%, transparent 70%)',
                      filter: 'blur(10px)',
                      opacity: s.logoOpacity * 0.8,
                      transition: 'width 1.6s cubic-bezier(0.22,1,0.36,1), opacity 1.2s ease',
                      zIndex: 0, pointerEvents: 'none',
                    }} />

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>


        {/* Progress dots */}
        <div style={{
          position: 'absolute', right: 'var(--pad)', top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center',
          zIndex: 4,
        }}>
          {STAGES.map((st, i) => (
            <div key={i} style={{
              width: '2px',
              height: i === stageIdx ? '28px' : '8px',
              background: i === stageIdx
                ? (i >= 2 ? '#CBDB2A' : '#00AEEF')
                : i < stageIdx
                  ? (i >= 2 ? 'rgba(203,219,42,0.35)' : 'rgba(0,174,239,0.35)')
                  : 'rgba(255,255,255,0.15)',
              transition: 'height 0.5s cubic-bezier(0.22,1,0.36,1), background 0.6s ease',
              borderRadius: '1px',
            }} />
          ))}
        </div>

        {/* Scroll guide */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          opacity: stageIdx === 0 ? 0.4 : 0,
          transition: 'opacity 0.8s ease',
          pointerEvents: 'none', zIndex: 4,
        }}>
          <span style={{ fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#fff' }}>Scroll</span>
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }} />
        </div>

      </div>
    </div>
  )
}
