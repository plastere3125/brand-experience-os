'use client'
import { useEffect, useRef, useState } from 'react'

const lines = [
  { en: "We don't just make things look good.", ko: '단순히 보기 좋게 만들지 않습니다.' },
  { en: 'We find the angle that makes them mean something.', ko: '의미를 만드는 각도를 찾습니다.' },
  { en: 'Every brand has a true form.', ko: '모든 브랜드에는 진짜 형태가 있습니다.' },
]

const items = [
  { id: 'observe',   en: 'Observe',   ko: '관찰',  body: 'We study your brand before we touch it. Every line, every tension, every silence.' },
  { id: 'resee',     en: 'Resee',     ko: '재인식', body: 'We question what your brand has taken for granted — and find what was always there.' },
  { id: 'reframe',   en: 'Reframe',   ko: '재구성', body: 'The same form, seen from a different angle. That shift is where identity becomes meaning.' },
  { id: 'direction', en: 'Direction', ko: '방향',  body: 'A perspective is only useful when it leads somewhere. We build toward that place.' },
]

export default function About() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setRevealed(true)
      obs.disconnect()
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const lineStyle = (i: number): React.CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 0.7s ease ${i * 200}ms, transform 0.7s ease ${i * 200}ms`,
  })

  const lineKoStyle = (i: number): React.CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transition: `opacity 0.7s ease ${i * 200 + 140}ms`,
  })

  const itemStyle = (i: number): React.CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 0.5s ease ${600 + i * 110}ms, transform 0.5s ease ${600 + i * 110}ms`,
  })

  const activeItem = items.find(m => m.id === activeModal)

  return (
    <section id="about" style={{ padding: 'clamp(80px,10vw,140px) var(--pad)' }}>
      <div ref={gridRef} style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '80px', alignItems: 'start',
      }}>
        {/* Left */}
        <div>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '60px' }}>
            02 / About
          </p>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ display: 'block', fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 400, color: 'rgba(255,255,255,0.62)', marginBottom: '10px' }}>
              What makes perspective important?
            </span>
            <span style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>
              왜 관점이 중요한가?
            </span>
          </div>
          {lines.map((line, i) => (
            <div key={i} style={{ marginBottom: '18px' }}>
              <p style={{ fontSize: 'clamp(15px,1.6vw,20px)', fontWeight: 400, lineHeight: 1.5, ...lineStyle(i) }}>
                {line.en}
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', ...lineKoStyle(i) }}>
                {line.ko}
              </p>
            </div>
          ))}
        </div>

        {/* Right */}
        <div>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '60px' }}>
            Our Process
          </p>
          {items.map((item, i) => (
            <div
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.07)',
                cursor: 'none', ...itemStyle(i),
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '8px' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0' }}
            >
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(0,174,239,0.6)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 600, letterSpacing: '0.01em' }}>{item.en}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{item.ko}</span>
                </div>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>+</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeModal && activeItem && (
        <div
          onClick={() => setActiveModal(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500, padding: '40px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '520px', width: '100%',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(0,0,0,0.9)', padding: '48px', position: 'relative',
            }}
          >
            <button
              onClick={() => setActiveModal(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '18px', cursor: 'none' }}
            >×</button>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.24em', color: 'rgba(0,174,239,0.7)', marginBottom: '16px' }}>
              {String(items.indexOf(activeItem) + 1).padStart(2, '0')} / {activeItem.ko}
            </p>
            <h3 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, marginBottom: '24px', letterSpacing: '0.01em' }}>
              {activeItem.en}
            </h3>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
              {activeItem.body}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
