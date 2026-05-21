'use client'
import { useState } from 'react'
import MLogo from './MLogo'

const cards = [
  {
    step: '01', en: 'FRONT VIEW', ko: '보이는 형태를 바라보다',
    desc: 'The shape before any interpretation.',
    svgTransform: 'none', wire: false,
  },
  {
    step: '02', en: 'ANGLE SHIFT', ko: '시선이 바뀌면 구조도 달라진다',
    desc: 'A different angle changes the meaning.',
    svgTransform: 'perspective(600px) rotateY(24deg)', wire: false,
  },
  {
    step: '03', en: 'STRUCTURE', ko: '형태 안의 구조를 발견하다',
    desc: 'Remove the surface. Read the form.',
    svgTransform: 'perspective(600px) rotateX(-30deg) scale(0.88)', wire: true,
  },
  {
    step: '04', en: 'REFRAME', ko: '같은 형태를 새롭게 해석하다',
    desc: 'Same shape. Entirely new reading.',
    svgTransform: 'perspective(600px) scaleX(-1) rotateY(10deg)', wire: false,
  },
  {
    step: '05', en: 'DIRECTION', ko: '관점은 결국 방향이 된다',
    desc: 'Every perspective leads somewhere.',
    svgTransform: 'perspective(600px) rotateY(-42deg) rotateX(16deg)', wire: false,
  },
]

export default function Perspective() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section id="perspective" style={{ padding: 'clamp(80px,10vw,140px) var(--pad)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '60px' }}>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '20px' }}>
            04 / Perspective System
          </p>
          <h2 style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 700, letterSpacing: '0.01em' }}>
            The same form changes with perspective.
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginTop: '10px' }}>
            같은 형태도 관점에 따라 다르게 보입니다.
          </p>
        </div>

        {/* Cards row */}
        <div style={{
          display: 'flex', gap: '1px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.07)',
          perspective: '2400px',
        }}>
          {cards.map((card, i) => {
            const isHovered = hoveredIdx === i
            const isDimmed = hoveredIdx !== null && !isHovered

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  flex: 1,
                  aspectRatio: '4/5',
                  position: 'relative',
                  background: '#000',
                  overflow: 'hidden',
                  transition: 'opacity 0.45s, filter 0.45s, transform 0.45s, box-shadow 0.45s',
                  opacity: isDimmed ? 0.18 : 1,
                  filter: isDimmed ? 'saturate(0.08)' : 'saturate(1)',
                  transform: isHovered ? 'rotateY(-1.5deg) rotateX(1deg)' : 'none',
                  boxShadow: isHovered ? 'inset 0 0 0 1px rgba(0,174,239,0.2), inset 0 0 64px rgba(0,174,239,0.05)' : 'none',
                  cursor: 'none',
                }}
              >
                {/* Step number */}
                <span style={{
                  position: 'absolute', top: '14px', left: '16px',
                  fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.14)', zIndex: 2,
                }}>
                  {card.step}
                </span>

                {/* M Logo SVG */}
                <div style={{
                  position: 'absolute', inset: '14% 14% 36%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <MLogo
                    mode={card.wire ? 'wire' : 'full'}
                    style={{ width: '100%', height: '100%', transform: card.svgTransform, overflow: 'visible' }}
                  />
                </div>

                {/* Label */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '28px 14px 16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 50%, transparent 100%)',
                  zIndex: 2,
                }}>
                  <span style={{
                    display: 'block', fontSize: '9px', fontWeight: 700,
                    letterSpacing: '0.24em', textTransform: 'uppercase',
                    color: isHovered ? 'rgba(0,174,239,0.95)' : 'rgba(255,255,255,0.3)',
                    marginBottom: '4px', transition: 'color 0.3s',
                  }}>
                    {card.en}
                  </span>
                  <span style={{
                    display: 'block', fontSize: '8px', fontWeight: 300,
                    color: isHovered ? 'rgba(255,255,255,0.48)' : 'rgba(255,255,255,0)',
                    marginBottom: '3px', transition: 'color 0.3s',
                  }}>
                    {card.desc}
                  </span>
                  <span style={{
                    fontSize: '9px', fontWeight: 300,
                    color: isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.22)',
                    transition: 'color 0.3s',
                  }}>
                    {card.ko}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
