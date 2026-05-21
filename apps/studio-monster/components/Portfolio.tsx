'use client'
import { useState, useEffect, useCallback } from 'react'
import { siteData, type PortfolioCategory, type PortfolioItem } from '@beos/core/portfolio'

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  const check = useCallback(() => setMobile(window.innerWidth < 768), [])
  useEffect(() => { check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check) }, [check])
  return mobile
}

type SMCat = 'ALL' | 'BRANDING' | 'WEB DESIGN' | 'PHOTOGRAPHY' | 'MARKETING'
const CATS: SMCat[] = ['ALL', 'BRANDING', 'WEB DESIGN', 'PHOTOGRAPHY', 'MARKETING']

const CAT_MAP: Record<PortfolioCategory, SMCat> = {
  visual: 'BRANDING',
  web: 'WEB DESIGN',
  photo: 'PHOTOGRAPHY',
  marketing: 'MARKETING',
}

const GRID_SIZE: Record<string, string> = {
  BRANDING: '36px 36px',
  'WEB DESIGN': '48px 48px',
  PHOTOGRAPHY: '64px 64px',
  MARKETING: '52px 22px',
}

// NEWDIA 데이터를 Studio MONSTER 카테고리로 플랫화
function buildItems() {
  const result: (PortfolioItem & { smCat: SMCat })[] = []
  for (const [key, items] of Object.entries(siteData.gallery)) {
    const cat = CAT_MAP[key as PortfolioCategory]
    for (const item of items) {
      result.push({ ...item, smCat: cat })
    }
  }
  return result
}

const ALL_ITEMS = buildItems()

function PortfolioCard({ item }: { item: PortfolioItem & { smCat: SMCat } }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#060606',
        border: `1px solid rgba(255,255,255,${hov ? 0.12 : 0.06})`,
        overflow: 'hidden',
        transform: hov ? 'translateY(-5px)' : 'none',
        transition: 'border-color 0.4s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)',
        cursor: 'none',
      }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden', background: '#080808' }}>

        {/* 실제 NEWDIA 이미지 */}
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            // Extreme Crop: 호버 시 확대
            transform: hov ? 'scale(1.12)' : 'scale(1)',
            // 재번역: 일반=desaturate, 호버=컬러
            filter: hov
              ? 'saturate(1) brightness(0.75)'
              : 'saturate(0.15) brightness(0.5)',
            transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease',
          }}
        />

        {/* Blueprint Grid Overlay — 재번역 레이어 */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: [
            'linear-gradient(rgba(0,174,239,0.12) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(0,174,239,0.12) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: GRID_SIZE[item.smCat] || '44px 44px',
          opacity: hov ? 0.3 : 0.7,
          transition: 'opacity 0.6s ease',
          mixBlendMode: 'screen',
        }} />

        {/* 코너 브래킷 TL */}
        <div style={{ position: 'absolute', top: 12, left: 12, width: 12, height: 12, borderTop: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.4})`, borderLeft: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.4})`, transition: 'border-color 0.4s ease', zIndex: 3 }} />
        {/* TR */}
        <div style={{ position: 'absolute', top: 12, right: 12, width: 12, height: 12, borderTop: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.4})`, borderRight: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.4})`, transition: 'border-color 0.4s ease', zIndex: 3 }} />
        {/* BL */}
        <div style={{ position: 'absolute', bottom: 12, left: 12, width: 12, height: 12, borderBottom: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.4})`, borderLeft: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.4})`, transition: 'border-color 0.4s ease', zIndex: 3 }} />
        {/* BR */}
        <div style={{ position: 'absolute', bottom: 12, right: 12, width: 12, height: 12, borderBottom: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.4})`, borderRight: `1px solid rgba(0,174,239,${hov ? 0.9 : 0.4})`, transition: 'border-color 0.4s ease', zIndex: 3 }} />

        {/* Perspective reframe label */}
        <div style={{
          position: 'absolute', top: 10, right: 32,
          fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: `rgba(0,174,239,${hov ? 0.9 : 0.2})`,
          transition: 'color 0.4s', zIndex: 3,
        }}>
          REFRAMED
        </div>

        {/* 호버 시 하단 블루 선 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, #00AEEF, transparent)',
          opacity: hov ? 1 : 0, transition: 'opacity 0.4s ease', zIndex: 3,
        }} />

        {/* Client tag */}
        {item.client && (
          <div style={{
            position: 'absolute', bottom: 12, left: 16, zIndex: 3,
            fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: `rgba(255,255,255,${hov ? 0.7 : 0.25})`,
            transition: 'color 0.4s',
          }}>
            {item.client}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '20px 22px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '11px' }}>
          <span style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: `rgba(0,174,239,${hov ? 1 : 0.5})`, transition: 'color 0.35s ease',
          }}>
            {item.smCat}
          </span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em' }}>
            {item.year}
          </span>
        </div>

        <h3 style={{
          fontSize: '16px', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3,
          color: hov ? '#fff' : 'rgba(255,255,255,0.82)',
          marginBottom: '7px', transition: 'color 0.3s ease',
        }}>
          {item.title}
        </h3>

        <p style={{
          fontSize: '12px', fontWeight: 300, lineHeight: 1.6, letterSpacing: '0.02em',
          color: `rgba(255,255,255,${hov ? 0.42 : 0.28})`,
          transition: 'color 0.4s ease',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.description}
        </p>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [activeCat, setActiveCat] = useState<SMCat>('ALL')
  const [gridOpacity, setGridOpacity] = useState(1)
  const mobile = useIsMobile()

  const handleCat = (cat: SMCat) => {
    if (cat === activeCat) return
    setGridOpacity(0)
    setTimeout(() => { setActiveCat(cat); setGridOpacity(1) }, 200)
  }

  const visible = activeCat === 'ALL' ? ALL_ITEMS : ALL_ITEMS.filter(i => i.smCat === activeCat)

  return (
    <section id="portfolio" style={{ padding: 'clamp(80px,10vw,140px) var(--pad)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '28px' }}>
          05 / Portfolio
        </p>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px,3.8vw,56px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.08, marginBottom: '10px' }}>
              One Source.<br />Multiple Realities.
            </h2>
            <p style={{ fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.08em' }}>
              NEWDIA 포트폴리오 — Studio MONSTER 시점으로 재번역
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 'clamp(12px,1.1vw,14px)', fontWeight: 300, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', marginBottom: 8 }}>
              {visible.length} reframed
            </p>
            <a
              href="https://newdia.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(0,174,239,0.6)', display: 'flex', alignItems: 'center', gap: 6,
                justifyContent: 'flex-end', transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00AEEF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,174,239,0.6)')}
            >
              NEWDIA 원본 보기 →
            </a>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '40px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => handleCat(cat)}
              style={{
                padding: '12px 22px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: activeCat === cat ? '#00AEEF' : 'rgba(255,255,255,0.3)',
                borderBottom: `2px solid ${activeCat === cat ? '#00AEEF' : 'transparent'}`,
                marginBottom: '-1px', transition: 'color 0.3s ease, border-color 0.3s ease',
                whiteSpace: 'nowrap', fontFamily: 'inherit',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
          gap: mobile ? '16px' : '24px',
          opacity: gridOpacity, transition: 'opacity 0.22s ease',
        }}>
          {visible.map(item => (
            <PortfolioCard key={`${activeCat}-${item.id}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
