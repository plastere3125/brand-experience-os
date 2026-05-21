'use client'

import { useState, useCallback } from 'react'
import { siteData, type PortfolioCategory, type PortfolioItem } from '@beos/core/portfolio'

// ─────────────────────────────────────────────────────────────
// 핵심 철학:
// 이미지는 "보여주는" 것이 아니다.
// 렌즈가 이동하면서 "다른 현실이 드러나는" 것이다.
//
// initial position = 사용자가 처음 보는 현실의 단편
// reveal position  = 관점이 이동한 후 드러나는 다른 단편
//
// 두 position 사이의 transition = 관점 이동의 순간
// ─────────────────────────────────────────────────────────────

type SMCat = 'ALL' | 'BRANDING' | 'WEB' | 'PHOTO' | 'MARKETING'
const CAT_MAP: Record<PortfolioCategory, SMCat> = {
  visual: 'BRANDING', web: 'WEB', photo: 'PHOTO', marketing: 'MARKETING',
}

// 관점 이동 쌍 — initial에서 reveal로 렌즈가 이동
const LENS_PAIRS = [
  { initial: '12% 15%', reveal: '86% 82%' },  // TL → BR (대각선 이동)
  { initial: '84% 12%', reveal: '16% 85%' },  // TR → BL
  { initial: '50% 8%',  reveal: '50% 90%' },  // 상단 → 하단 (수직 이동)
  { initial: '14% 82%', reveal: '84% 18%' },  // BL → TR
  { initial: '88% 80%', reveal: '12% 18%' },  // BR → TL
  { initial: '20% 50%', reveal: '80% 50%' },  // 좌 → 우 (수평 이동)
  { initial: '78% 22%', reveal: '22% 76%' },  // TR → BL 완만
  { initial: '46% 88%', reveal: '54% 10%' },  // 하단 → 상단
]

const SPAN_PATTERN = [2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1]

function coordLabel(index: number, shifted: boolean): string {
  const base = ((index * 17 + 8) % 96) + 4
  const x = String(shifted ? 99 - base : base).padStart(3, '0')
  const y = String(((index * 23 + 5) % 92) + 4).padStart(3, '0')
  return `${x}.${y}`
}

function buildItems() {
  const out: (PortfolioItem & {
    smCat: SMCat; span: number
    lens: { initial: string; reveal: string }
    coord: string
  })[] = []
  let i = 0
  for (const [key, items] of Object.entries(siteData.gallery)) {
    for (const item of items) {
      out.push({
        ...item,
        smCat: CAT_MAP[key as PortfolioCategory],
        span: SPAN_PATTERN[i % SPAN_PATTERN.length],
        lens: LENS_PAIRS[i % LENS_PAIRS.length],
        coord: coordLabel(i, false),
      })
      i++
    }
  }
  return out
}

const ALL_ITEMS = buildItems()
const CATS: SMCat[] = ['ALL', 'BRANDING', 'WEB', 'PHOTO', 'MARKETING']

// ── CSS 애니메이션 주입 ──────────────────────────────────────
const STYLES = `
@keyframes sm-scan {
  0%   { transform: translateY(-100%); opacity: 0; }
  5%   { opacity: 0.7; }
  90%  { opacity: 0.5; }
  100% { transform: translateY(900%); opacity: 0; }
}
@keyframes sm-coord-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
`

function FragmentCard({ item }: {
  item: PortfolioItem & {
    smCat: SMCat; span: number
    lens: { initial: string; reveal: string }
    coord: string
  }
}) {
  const [hov, setHov] = useState(false)
  const [scanKey, setScanKey] = useState(0)

  const onEnter = useCallback(() => {
    setHov(true)
    setScanKey(k => k + 1)
  }, [])
  const onLeave = useCallback(() => setHov(false), [])

  const isWide = item.span === 2
  const paddingTop = isWide ? '44%' : '138%'

  return (
    <div style={{ gridColumn: `span ${item.span}` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div style={{
        position: 'relative', paddingTop,
        overflow: 'hidden', background: '#020203',
        cursor: 'crosshair',
      }}>

        {/* ── 이미지 — 렌즈 이동 ────────────────────────────
            핵심: objectPosition이 initial → reveal로 이동
            이것이 "관점 이동의 순간"
        ─────────────────────────────────────────────── */}
        <img
          src={item.thumbnail}
          alt=""
          style={{
            position: 'absolute', inset: '-10%',
            width: '120%', height: '120%',
            objectFit: 'cover',
            objectPosition: hov ? item.lens.reveal : item.lens.initial,
            filter: hov
              ? 'saturate(0.95) brightness(0.58)'
              : 'saturate(0) brightness(0.28)',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: [
              'object-position 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
              'filter 1.0s ease',
              'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
            ].join(', '),
          }}
        />

        {/* ── 블루프린트 그리드 ───────────────────────────
            렌즈 이동 중 구조가 드러난다
        ─────────────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: [
            'linear-gradient(rgba(0,174,239,0.12) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(0,174,239,0.12) 1px, transparent 1px)',
          ].join(','),
          backgroundSize: '44px 44px',
          mixBlendMode: 'screen',
          opacity: hov ? 0.15 : 0.5,
          transition: 'opacity 0.8s ease',
        }} />

        {/* ── X-Ray 스캔 라인 — 호버 진입 시 1회 스윕 ── */}
        <div
          key={scanKey}
          style={{
            position: 'absolute', left: 0, right: 0,
            height: '3px', top: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,174,239,0.9) 20%, rgba(0,214,255,1) 50%, rgba(0,174,239,0.9) 80%, transparent 100%)',
            boxShadow: '0 0 12px rgba(0,174,239,0.6), 0 0 24px rgba(0,174,239,0.3)',
            animation: hov ? 'sm-scan 0.9s cubic-bezier(0.4,0,0.2,1) forwards' : 'none',
            pointerEvents: 'none', zIndex: 5,
          }}
        />

        {/* ── 프레임 테두리 — 이동 중 빛남 ────────────── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          border: `1px solid rgba(0,174,239,${hov ? 0.45 : 0.08})`,
          transition: 'border-color 0.6s ease',
          zIndex: 3,
        }} />

        {/* ── 코너 브래킷 ──────────────────────────────── */}
        {([
          { t: 10, l: 10, bt: true, bl: true },
          { t: 10, r: 10, bt: true, br: true },
          { b: 10, l: 10, bb: true, bl: true },
          { b: 10, r: 10, bb: true, br: true },
        ] as const).map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 't' in c ? c.t : undefined,
            left: 'l' in c ? c.l : undefined,
            bottom: 'b' in c ? c.b : undefined,
            right: 'r' in c ? c.r : undefined,
            width: 16, height: 16, pointerEvents: 'none', zIndex: 4,
            borderTop:    ('bt' in c && c.bt) ? `1px solid rgba(0,174,239,${hov ? 1 : 0.3})` : 'none',
            borderLeft:   ('bl' in c && c.bl) ? `1px solid rgba(0,174,239,${hov ? 1 : 0.3})` : 'none',
            borderBottom: ('bb' in c && c.bb) ? `1px solid rgba(0,174,239,${hov ? 1 : 0.3})` : 'none',
            borderRight:  ('br' in c && c.br) ? `1px solid rgba(0,174,239,${hov ? 1 : 0.3})` : 'none',
            transition: 'border-color 0.4s ease',
          }} />
        ))}

        {/* ── 좌표 — 관점 이동 중 값이 변한다 ─────────── */}
        <div style={{
          position: 'absolute', top: 12, left: 30, zIndex: 6,
          fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em',
          fontFamily: 'monospace',
          color: hov ? 'rgba(0,214,255,0.95)' : 'rgba(0,174,239,0.35)',
          animation: hov ? 'sm-coord-blink 0.3s ease 0.4s 2' : 'none',
          transition: 'color 0.3s ease',
          pointerEvents: 'none',
        }}>
          {coordLabel(item.id, hov)}
        </div>

        {/* ── 카테고리 라벨 ─────────────────────────────── */}
        <div style={{
          position: 'absolute', top: 12, right: 30, zIndex: 6,
          fontSize: '7px', fontWeight: 700, letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: `rgba(0,174,239,${hov ? 0.75 : 0.2})`,
          transition: 'color 0.5s ease',
          pointerEvents: 'none',
        }}>
          {item.smCat}
        </div>

        {/* ── 하단 타이틀 패널 ─────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
          padding: isWide ? '56px 24px 22px' : '72px 18px 18px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          transform: hov ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
        }}>
          {/* 관점 이동 표시 선 */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px',
          }}>
            <div style={{
              width: hov ? '28px' : '0px', height: '1px',
              background: '#00AEEF',
              transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }} />
            <span style={{
              fontSize: '7px', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(0,174,239,0.65)',
              opacity: hov ? 1 : 0, transition: 'opacity 0.4s ease 0.2s',
            }}>
              PERSPECTIVE SHIFTED
            </span>
          </div>
          <p style={{
            fontSize: '8px', fontWeight: 600, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
            marginBottom: 6,
          }}>
            {item.client} · {item.year}
          </p>
          <p style={{
            fontSize: isWide ? '18px' : '14px',
            fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2,
            color: '#fff',
          }}>
            {item.title}
          </p>
        </div>

        {/* ── 하단 글로우 라인 ─────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '2px', zIndex: 4,
          background: 'linear-gradient(90deg, transparent, #00AEEF 30%, rgba(0,214,255,0.9) 50%, #00AEEF 70%, transparent)',
          opacity: hov ? 1 : 0,
          transition: 'opacity 0.5s ease 0.1s',
        }} />

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
      <style>{STYLES}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* 헤더 */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '24px' }}>
            05 / PORTFOLIO — ONE SOURCE · MULTIPLE REALITIES
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.0, marginBottom: '12px' }}>
                Same Work.<br />
                <span style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic', fontWeight: 300 }}>
                  Different Reality.
                </span>
              </h2>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em', lineHeight: 1.7 }}>
                각 카드 위에 커서를 올려보세요.<br />
                <span style={{ color: 'rgba(0,174,239,0.5)' }}>렌즈가 이동하며 다른 현실이 드러납니다.</span>
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', marginBottom: 10 }}>
                {visible.length} fragments
              </p>
              <a
                href="http://localhost:3000#portfolio"
                style={{
                  fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(203,219,42,0.45)',
                  transition: 'color 0.2s', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#cbdb2a')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(203,219,42,0.45)')}
              >
                ← 구조로 돌아가기 (NEWDIA)
              </a>
            </div>
          </div>
        </div>

        {/* 카테고리 */}
        <div style={{ display: 'flex', marginBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {CATS.map(cat => (
            <button key={cat} onClick={() => switchCat(cat)} style={{
              padding: '14px 24px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '8px', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase',
              color: activeCat === cat ? '#00AEEF' : 'rgba(255,255,255,0.2)',
              borderBottom: `2px solid ${activeCat === cat ? '#00AEEF' : 'transparent'}`,
              marginBottom: '-1px', transition: 'color 0.3s, border-color 0.3s',
              whiteSpace: 'nowrap', fontFamily: 'inherit',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* 파편 그리드 */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3px', opacity, transition: 'opacity 0.22s ease',
        }}>
          {visible.map(item => (
            <FragmentCard key={`${activeCat}-${item.id}`} item={item} />
          ))}
        </div>

      </div>
    </section>
  )
}
