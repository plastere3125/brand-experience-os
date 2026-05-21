'use client'

import { useState, useCallback } from 'react'
import { siteData, type PortfolioCategory, type PortfolioItem } from '@beos/core/portfolio'

type SMCat = 'ALL' | 'BRANDING' | 'WEB' | 'PHOTO' | 'MARKETING'

const CAT_MAP: Record<PortfolioCategory, SMCat> = {
  visual: 'BRANDING',
  web: 'WEB',
  photo: 'PHOTO',
  marketing: 'MARKETING',
}

const CROP_POSITIONS = [
  '18% 22%', '82% 18%', '15% 78%', '78% 72%',
  '52% 28%', '48% 68%', '25% 45%', '72% 50%',
]

const SPAN_PATTERN = [2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1]

function coordLabel(index: number): string {
  const x = String(((index * 17 + 8) % 96) + 4).padStart(3, '0')
  const y = String(((index * 23 + 5) % 92) + 4).padStart(3, '0')
  return `${x}.${y}`
}

function buildItems() {
  const result: (PortfolioItem & { smCat: SMCat; cropPos: string; span: number; coord: string })[] = []
  let i = 0
  for (const [key, items] of Object.entries(siteData.gallery)) {
    for (const item of items) {
      result.push({
        ...item,
        smCat: CAT_MAP[key as PortfolioCategory],
        cropPos: CROP_POSITIONS[i % CROP_POSITIONS.length],
        span: SPAN_PATTERN[i % SPAN_PATTERN.length],
        coord: coordLabel(i),
      })
      i++
    }
  }
  return result
}

const ALL_ITEMS = buildItems()
const CATS: SMCat[] = ['ALL', 'BRANDING', 'WEB', 'PHOTO', 'MARKETING']

function FragmentCard({ item }: {
  item: PortfolioItem & { smCat: SMCat; cropPos: string; span: number; coord: string }
}) {
  const [hov, setHov] = useState(false)
  const isWide = item.span === 2
  const paddingTop = isWide ? '46%' : '120%'

  return (
    <div style={{ gridColumn: `span ${item.span}` }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: 'relative', paddingTop, overflow: 'hidden', background: '#030304', cursor: 'crosshair' }}>

        {/* Extreme Crop Image */}
        <img
          src={item.thumbnail}
          alt=""
          style={{
            position: 'absolute', inset: '-8%',
            width: '116%', height: '116%',
            objectFit: 'cover',
            objectPosition: item.cropPos,
            filter: hov ? 'saturate(1.1) brightness(0.62)' : 'saturate(0) brightness(0.35)',
            transform: hov ? 'scale(1.07)' : 'scale(1)',
            transition: 'filter 0.9s ease, transform 1.1s cubic-bezier(0.22,1,0.36,1)',
          }}
        />

        {/* Blueprint Grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: ['linear-gradient(rgba(0,174,239,0.1) 1px, transparent 1px)', 'linear-gradient(90deg, rgba(0,174,239,0.1) 1px, transparent 1px)'].join(','),
          backgroundSize: '44px 44px',
          opacity: hov ? 0.18 : 0.52,
          mixBlendMode: 'screen',
          transition: 'opacity 0.7s ease',
        }} />

        {/* Corner Brackets */}
        <div style={{ position: 'absolute', top: 12, left: 12, width: 14, height: 14, borderTop: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.32})`, borderLeft: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.32})`, transition: 'border-color 0.4s', zIndex: 3, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 12, right: 12, width: 14, height: 14, borderTop: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.32})`, borderRight: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.32})`, transition: 'border-color 0.4s', zIndex: 3, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 12, left: 12, width: 14, height: 14, borderBottom: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.32})`, borderLeft: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.32})`, transition: 'border-color 0.4s', zIndex: 3, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 12, right: 12, width: 14, height: 14, borderBottom: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.32})`, borderRight: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.32})`, transition: 'border-color 0.4s', zIndex: 3, pointerEvents: 'none' }} />

        {/* Coordinate label */}
        <div style={{ position: 'absolute', top: 14, left: 30, zIndex: 4, pointerEvents: 'none', fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', fontFamily: 'monospace', color: `rgba(0,174,239,${hov ? 0.9 : 0.38})`, transition: 'color 0.4s' }}>
          {item.coord}
        </div>

        {/* Category label */}
        <div style={{ position: 'absolute', top: 14, right: 30, zIndex: 4, pointerEvents: 'none', fontSize: '7px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: `rgba(0,174,239,${hov ? 0.8 : 0.22})`, transition: 'color 0.4s' }}>
          {item.smCat}
        </div>

        {/* Title panel — slides up on hover */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
          padding: '48px 20px 20px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
          transform: hov ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <div style={{ width: hov ? '32px' : '0px', height: '1px', background: '#00AEEF', marginBottom: '10px', transition: 'width 0.55s cubic-bezier(0.22,1,0.36,1) 0.08s' }} />
          <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.7)', marginBottom: 6 }}>
            {item.client} — {item.year}
          </p>
          <p style={{ fontSize: isWide ? '17px' : '13px', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#fff' }}>
            {item.title}
          </p>
        </div>

        {/* Bottom glow line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #00AEEF 40%, #00AEEF 60%, transparent)', opacity: hov ? 1 : 0, transition: 'opacity 0.4s', zIndex: 4 }} />

      </div>
    </div>
  )
}

export default function Portfolio() {
  const [activeCat, setActiveCat] = useState<SMCat>('ALL')
  const [opacity, setOpacity] = useState(1)

  const switchCat = useCallback((cat: SMCat) => {
    if (cat === activeCat) return
    setOpacity(0)
    setTimeout(() => { setActiveCat(cat); setOpacity(1) }, 220)
  }, [activeCat])

  const visible = activeCat === 'ALL'
    ? ALL_ITEMS
    : ALL_ITEMS.filter(i => i.smCat === activeCat)

  return (
    <section id="portfolio" style={{ padding: 'clamp(80px,10vw,140px) var(--pad)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '24px' }}>
            05 / PORTFOLIO — ONE SOURCE
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.0, marginBottom: '10px' }}>
                Same Work.<br />
                <span style={{ color: 'rgba(255,255,255,0.28)', fontStyle: 'italic', fontWeight: 300 }}>Different Reality.</span>
              </h2>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
                NEWDIA에서 완성된 현실 — 여기서는 그 현실의 파편
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 'clamp(11px,1vw,13px)', color: 'rgba(255,255,255,0.22)', fontStyle: 'italic', marginBottom: 8 }}>
                {visible.length} fragments
              </p>
              <a
                href="http://localhost:3000#portfolio"
                style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(203,219,42,0.5)', transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#cbdb2a')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(203,219,42,0.5)')}
              >
                ← 구조로 보기 (NEWDIA)
              </a>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', marginBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => switchCat(cat)}
              style={{
                padding: '14px 24px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '8px', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase',
                color: activeCat === cat ? '#00AEEF' : 'rgba(255,255,255,0.22)',
                borderBottom: `2px solid ${activeCat === cat ? '#00AEEF' : 'transparent'}`,
                marginBottom: '-1px', transition: 'color 0.3s, border-color 0.3s',
                whiteSpace: 'nowrap', fontFamily: 'inherit',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fragment Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3px',
          opacity,
          transition: 'opacity 0.22s ease',
        }}>
          {visible.map((item) => (
            <FragmentCard key={`${activeCat}-${item.id}`} item={item} />
          ))}
        </div>

      </div>
    </section>
  )
}
