'use client'

import { useState, useCallback } from 'react'
import { siteData, type PortfolioCategory, type PortfolioItem } from '@beos/core/portfolio'

type SMCat = 'ALL' | 'BRANDING' | 'WEB' | 'PHOTO' | 'MARKETING'
const CAT_MAP: Record<PortfolioCategory, SMCat> = {
  visual: 'BRANDING', web: 'WEB', photo: 'PHOTO', marketing: 'MARKETING',
}

// ─────────────────────────────────────────────────────────────
// 극단적 렌즈 이동 — 이미지의 "시선"만 보인다.
// 결과물을 보여주는 것이 아니라 관점을 보여주는 것이다.
// ─────────────────────────────────────────────────────────────
const LENS_PAIRS = [
  { initial: '4% 5%',   reveal: '96% 95%' },  // 극단 TL → BR
  { initial: '96% 3%',  reveal: '4% 97%' },   // 극단 TR → BL
  { initial: '50% 2%',  reveal: '50% 98%' },  // 극단 top → bottom
  { initial: '3% 94%',  reveal: '97% 6%' },   // 극단 BL → TR
  { initial: '97% 95%', reveal: '3% 5%' },    // 극단 BR → TL
  { initial: '5% 50%',  reveal: '95% 50%' },  // 극단 L → R
  { initial: '94% 8%',  reveal: '6% 92%' },   // 대각선
  { initial: '50% 97%', reveal: '50% 3%' },   // 극단 bottom → top
]

// 파편 타입 — 무엇을 "보는가"가 중요하다
type FragType = 'TEXTURE' | 'STRUCTURE' | 'LINE' | 'CURVE' | 'DETAIL'
const FRAG_CYCLE: FragType[] = [
  'TEXTURE', 'STRUCTURE', 'LINE', 'CURVE', 'DETAIL',
  'STRUCTURE', 'TEXTURE', 'DETAIL', 'LINE', 'CURVE',
  'STRUCTURE', 'DETAIL',
]

// 비대칭 스팬 패턴 — 구조적 긴장감
const SPAN_PATTERN = [2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1]

function coordLabel(index: number, shifted: boolean): string {
  const base = ((index * 17 + 8) % 96) + 4
  const x = String(shifted ? 99 - base : base).padStart(3, '0')
  const y = String(((index * 23 + 5) % 92) + 4).padStart(3, '0')
  return `${x}.${y}`
}

function buildItems() {
  const out: (PortfolioItem & {
    smCat: SMCat
    span: number
    lens: { initial: string; reveal: string }
    frag: FragType
    coord: string
  })[] = []
  let i = 0
  for (const [key, items] of Object.entries(siteData.gallery) as [PortfolioCategory, PortfolioItem[]][]) {
    const smCat = CAT_MAP[key]
    for (const item of items) {
      out.push({
        ...item,
        smCat,
        span: SPAN_PATTERN[i % SPAN_PATTERN.length],
        lens: LENS_PAIRS[i % LENS_PAIRS.length],
        frag: FRAG_CYCLE[i % FRAG_CYCLE.length],
        coord: coordLabel(item.id, false),
      })
      i++
    }
  }
  return out
}

const ALL_ITEMS = buildItems()

const STYLES = `
@keyframes sm-scan {
  0%   { transform: translateY(-100%); opacity: 0; }
  4%   { opacity: 0.85; }
  92%  { opacity: 0.6; }
  100% { transform: translateY(900%); opacity: 0; }
}
@keyframes sm-coord-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.2; }
}
@keyframes sm-frag-in {
  from { opacity: 0; transform: translateX(-4px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes sm-ghost-pulse {
  0%, 100% { opacity: 0.025; }
  50%       { opacity: 0.055; }
}
`

// ─── Fragment Card ───────────────────────────────────────────
function FragmentCard({
  item, isWide,
}: {
  item: ReturnType<typeof buildItems>[0]
  isWide: boolean
}) {
  const [hov, setHov] = useState(false)
  const [scanKey, setScanKey] = useState(0)

  const onEnter = useCallback(() => {
    setHov(true)
    setScanKey(k => k + 1)
  }, [])

  const blue = (a: number) => `rgba(0,174,239,${a})`
  const cyan = (a: number) => `rgba(0,214,255,${a})`

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        gridColumn: isWide ? 'span 2' : 'span 1',
        cursor: 'crosshair',
        background: '#020203',
        overflow: 'hidden',
      }}
    >
      {/* 이미지 — 극단적 크롭으로 "시선"만 노출 */}
      <div style={{
        position: 'relative',
        paddingTop: isWide ? '42%' : '135%',
        overflow: 'hidden',
        background: '#0a0a0d',
      }}>
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{
            position: 'absolute',
            inset: '-15%',
            width: '130%',
            height: '130%',
            objectFit: 'cover',
            objectPosition: hov ? item.lens.reveal : item.lens.initial,
            transition: 'object-position 2.0s cubic-bezier(0.16, 1, 0.3, 1)',
            // 파편 타입별 필터
            filter: item.frag === 'TEXTURE'   ? 'saturate(0.4) contrast(1.3)' :
                    item.frag === 'STRUCTURE'  ? 'saturate(0.2) contrast(1.6) brightness(0.85)' :
                    item.frag === 'LINE'       ? 'saturate(0) contrast(2.0) brightness(0.7)' :
                    item.frag === 'CURVE'      ? 'saturate(0.6) contrast(1.2)' :
                    'saturate(0.35) contrast(1.4)',
            mixBlendMode: 'luminosity',
          }}
        />

        {/* ── NEWDIA 구조 유령 — 두 현실이 같은 DNA를 공유한다 ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(203,219,42,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(203,219,42,0.03) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
          animation: 'sm-ghost-pulse 4s ease-in-out infinite',
          zIndex: 1,
        }} />

        {/* Blueprint grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          backgroundImage: 'linear-gradient(rgba(0,174,239,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,174,239,0.04) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          opacity: hov ? 0.1 : 0.5,
          transition: 'opacity 0.4s ease',
        }} />

        {/* X-Ray 스캔라인 */}
        <div
          key={scanKey}
          style={{
            position: 'absolute', left: 0, right: 0, height: 2, zIndex: 5,
            background: `linear-gradient(90deg, transparent, ${cyan(0.9)}, transparent)`,
            boxShadow: `0 0 12px 2px ${cyan(0.4)}`,
            animation: scanKey ? 'sm-scan 0.85s linear forwards' : 'none',
            pointerEvents: 'none',
          }}
        />

        {/* 프레임 테두리 */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          border: hov ? `1px solid ${blue(0.5)}` : `1px solid ${blue(0.12)}`,
          boxShadow: hov ? `inset 0 0 24px ${blue(0.08)}` : 'none',
          transition: 'all 0.35s ease',
          pointerEvents: 'none',
        }} />

        {/* 코너 브래킷 */}
        {([
          { t: 8, l: 8, bt: true, bl: true },
          { t: 8, r: 8, bt: true, br: true },
          { b: 8, l: 8, bb: true, bl: true },
          { b: 8, r: 8, bb: true, br: true },
        ] as const).map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 't' in c ? c.t : undefined,
            left: 'l' in c ? c.l : undefined,
            bottom: 'b' in c ? c.b : undefined,
            right: 'r' in c ? c.r : undefined,
            width: 14, height: 14, pointerEvents: 'none', zIndex: 4,
            borderTop:    ('bt' in c && c.bt) ? `1px solid ${blue(hov ? 1 : 0.3)}` : 'none',
            borderLeft:   ('bl' in c && c.bl) ? `1px solid ${blue(hov ? 1 : 0.3)}` : 'none',
            borderBottom: ('bb' in c && c.bb) ? `1px solid ${blue(hov ? 1 : 0.3)}` : 'none',
            borderRight:  ('br' in c && c.br) ? `1px solid ${blue(hov ? 1 : 0.3)}` : 'none',
            transition: 'border-color 0.35s ease',
          }} />
        ))}

        {/* 좌표 — 관점 이동 시 값 변화 */}
        <div style={{
          position: 'absolute', top: 10, left: 28, zIndex: 6,
          fontSize: 8, fontWeight: 700, letterSpacing: '0.2em',
          fontFamily: 'monospace',
          color: hov ? cyan(0.95) : blue(0.35),
          animation: hov ? 'sm-coord-blink 0.3s ease 0.4s 2' : 'none',
          transition: 'color 0.3s ease',
          pointerEvents: 'none',
        }}>
          {coordLabel(item.id, hov)}
        </div>

        {/* 파편 타입 라벨 — 카테고리가 아니라 "무엇을 보는가" */}
        <div style={{
          position: 'absolute', top: 10, right: 10, zIndex: 6,
          fontSize: 7, fontWeight: 700, letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: hov ? blue(0.8) : blue(0.3),
          fontFamily: 'monospace',
          transition: 'color 0.3s ease',
          pointerEvents: 'none',
        }}>
          {item.frag}
        </div>

        {/* 하단 타이틀 패널 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 6,
          background: `linear-gradient(to top, rgba(2,2,3,0.92) 0%, transparent 100%)`,
          padding: '32px 14px 12px',
        }}>
          <div style={{
            opacity: hov ? 1 : 0,
            transform: hov ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: cyan(0.7), marginBottom: 4 }}>
              {item.client}
            </p>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em', marginBottom: 4 }}>
              {item.title}
            </p>
            <p style={{
              fontSize: 7, fontWeight: 700, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: blue(0.5),
              animation: hov ? 'sm-frag-in 0.3s ease 0.2s both' : 'none',
            }}>
              // PERSPECTIVE SHIFTED
            </p>
          </div>
        </div>

        {/* 하단 Electric Blue 라인 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, zIndex: 7,
          background: `linear-gradient(90deg, transparent, ${blue(hov ? 0.8 : 0.2)}, transparent)`,
          transition: 'background 0.4s ease',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}

// ─── SM Category Bar ─────────────────────────────────────────
const SM_CATS: { key: SMCat; label: string }[] = [
  { key: 'ALL',       label: 'ALL' },
  { key: 'BRANDING',  label: 'BRAND' },
  { key: 'WEB',       label: 'WEB' },
  { key: 'PHOTO',     label: 'PHOTO' },
  { key: 'MARKETING', label: 'MKTG' },
]

// ─── Main ────────────────────────────────────────────────────
export default function Portfolio() {
  const [filter, setFilter] = useState<SMCat>('ALL')
  const items = filter === 'ALL' ? ALL_ITEMS : ALL_ITEMS.filter(x => x.smCat === filter)

  return (
    <section id="portfolio" style={{ position: 'relative', padding: '80px 0', background: '#020203' }}>
      <style>{STYLES}</style>

      {/* ── NEWDIA 구조 유령 — 섹션 배경 ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(203,219,42,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(203,219,42,0.015) 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* 구조 유령 측정 노트 — NEWDIA DNA 흔적 */}
      {[
        { x: '8%',  y: '12%', text: '// 1200px' },
        { x: '72%', y: '38%', text: '—  80px'   },
        { x: '35%', y: '62%', text: 'ND.003'     },
        { x: '88%', y: '78%', text: 'rev.004'    },
      ].map((m, i) => (
        <div key={i} style={{
          position: 'absolute', left: m.x, top: m.y, pointerEvents: 'none',
          fontSize: 8, fontFamily: 'monospace',
          color: 'rgba(203,219,42,0.05)',
          letterSpacing: '0.12em',
        }}>
          {m.text}
        </div>
      ))}

      <div style={{ padding: '0 var(--pad)', position: 'relative', zIndex: 1 }}>

        {/* ── 헤더 ── */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.5)', marginBottom: 10 }}>
                REALITY FRAGMENT ARCHIVE
              </p>
              <h2 style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 0.92,
                color: '#fff',
              }}>
                Fragments.
              </h2>
            </div>
            <p style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(0,174,239,0.35)', letterSpacing: '0.1em' }}>
              {items.length} FRAGMENTS
            </p>
          </div>

          {/* 카테고리 필터 */}
          <div style={{ display: 'flex', gap: 2, borderTop: '1px solid rgba(0,174,239,0.08)', paddingTop: 16 }}>
            {SM_CATS.map(c => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                style={{
                  padding: '7px 16px',
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  background: filter === c.key ? 'rgba(0,174,239,0.12)' : 'transparent',
                  color: filter === c.key ? '#00AEEF' : 'rgba(255,255,255,0.3)',
                  border: filter === c.key ? '1px solid rgba(0,174,239,0.3)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid — 비대칭 구조 ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          {items.map(item => (
            <FragmentCard
              key={item.id}
              item={item}
              isWide={item.span === 2}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
