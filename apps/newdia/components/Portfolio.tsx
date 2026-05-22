'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { siteData, type PortfolioCategory, type PortfolioItem } from '@beos/core/portfolio'

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  const check = useCallback(() => setMobile(window.innerWidth < 768), [])
  useEffect(() => { check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check) }, [check])
  return mobile
}

const CAT_LABEL: Record<PortfolioCategory, string> = {
  visual:    'BRANDING',
  web:       'WEB DESIGN',
  photo:     'PHOTOGRAPHY',
  marketing: 'MARKETING',
}

function buildItems() {
  const out: (PortfolioItem & { cat: PortfolioCategory; catLabel: string; index: number })[] = []
  let idx = 0
  for (const [key, items] of Object.entries(siteData.gallery) as [PortfolioCategory, PortfolioItem[]][]) {
    for (const item of items) {
      out.push({ ...item, cat: key, catLabel: CAT_LABEL[key], index: ++idx })
    }
  }
  return out
}

const ALL_ITEMS = buildItems()

// ─── Modal ───────────────────────────────────────────────────
function Modal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0)
  const imgs = [item.thumbnail, ...item.images]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(10,10,10,0.94)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }} transition={{ duration: 0.32 }}
        style={{
          background: 'var(--white)', maxWidth: 960, width: '100%',
          maxHeight: '92vh', overflow: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--gray-100)' }}>
          <img src={imgs[imgIdx]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {[
            { top: 0, left: 0 }, { top: 0, right: 0 },
            { bottom: 0, left: 0 }, { bottom: 0, right: 0 },
          ].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute', ...pos, width: 20, height: 20, pointerEvents: 'none',
              borderTop:    'top' in pos ? '1px solid var(--lime)' : 'none',
              borderBottom: 'bottom' in pos ? '1px solid var(--lime)' : 'none',
              borderLeft:   'left' in pos ? '1px solid var(--lime)' : 'none',
              borderRight:  'right' in pos ? '1px solid var(--lime)' : 'none',
            }} />
          ))}
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14,
            width: 34, height: 34, background: 'var(--black)', color: 'var(--white)',
            fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
          }}>×</button>
        </div>
        {imgs.length > 1 && (
          <div style={{ display: 'flex', gap: 2, padding: '8px 16px', background: 'var(--gray-100)', overflowX: 'auto' }}>
            {imgs.map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)} style={{
                width: 60, height: 40, flexShrink: 0, padding: 0, cursor: 'pointer',
                border: i === imgIdx ? '2px solid var(--lime)' : '2px solid transparent',
              }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}
        <div style={{ padding: '28px 36px 36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: 8 }}>
                {item.client}
              </p>
              <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--black)' }}>
                {item.title}
              </h3>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gray-400)', paddingTop: 4 }}>
              {item.year}
            </span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--gray-600)' }}>{item.description}</p>
          {item.external_site_url && (
            <a href={item.external_site_url} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24,
                padding: '9px 20px', border: '1px solid var(--black)',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
                color: 'var(--black)', textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--black)'; e.currentTarget.style.color = 'var(--white)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--black)' }}
            >
              Visit Website →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Reality Record ──────────────────────────────────────────
function RealityRecord({
  item,
  expanded,
  onToggle,
  onOpenModal,
  mobile,
}: {
  item: PortfolioItem & { cat: PortfolioCategory; catLabel: string; index: number }
  expanded: boolean
  onToggle: () => void
  onOpenModal: () => void
  mobile: boolean
}) {
  const [hov, setHov] = useState(false)
  const active = hov || expanded

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: 'relative' }}
    >
      {/* 구분선 — 라임 블리드 */}
      <div style={{
        height: 1,
        background: active
          ? 'linear-gradient(90deg, var(--lime) 0%, rgba(203,219,42,0.3) 40%, rgba(0,174,239,0.08) 70%, transparent 100%)'
          : 'var(--gray-200)',
        margin: '0 calc(var(--header-h) * -0.6)',
        transition: 'background 0.55s ease',
      }} />

      {/* Row */}
      <div
        onClick={onToggle}
        style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '52px 1fr' : '80px 1fr 100px',
          gap: mobile ? 14 : 28,
          alignItems: 'start',
          padding: `${expanded ? 28 : 22}px 0`,
          transition: 'padding 0.4s var(--reality-ease)',
          cursor: 'pointer',
        }}
      >
        {/* Coordinate */}
        <div style={{ paddingTop: 2 }}>
          <span style={{
            display: 'block',
            fontFamily: 'var(--mono)', fontSize: 8,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: active ? 'var(--lime)' : 'var(--gray-400)',
            transition: 'color 0.35s ease', marginBottom: 5,
          }}>
            R.{String(item.index).padStart(2, '0')}
          </span>
          <span style={{
            display: 'block',
            fontFamily: 'var(--mono)', fontSize: 7,
            letterSpacing: '0.16em',
            color: active ? 'var(--gray-600)' : 'var(--gray-400)',
            transition: 'color 0.35s ease',
          }}>
            {item.year}
          </span>
        </div>

        {/* Title + expand */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'baseline',
            gap: mobile ? 10 : 18, flexWrap: 'wrap', marginBottom: 2,
          }}>
            <h3 style={{
              fontSize: mobile ? 'clamp(20px,5vw,30px)' : 'clamp(22px,3vw,48px)',
              fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1,
              color: active ? 'var(--black)' : 'var(--gray-600)',
              transform: active ? 'translateX(8px)' : 'none',
              transition: 'color 0.35s ease, transform 0.65s var(--reality-ease)',
            }}>
              {item.title}
            </h3>
            {item.client && (
              <span style={{
                fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: active ? 'var(--lime)' : 'var(--gray-400)',
                transition: 'color 0.35s ease',
                whiteSpace: 'nowrap',
              }}>
                — {item.client}
              </span>
            )}
          </div>

          {/* Expanded content */}
          <div style={{
            overflow: 'hidden',
            maxHeight: expanded ? '360px' : 0,
            opacity: expanded ? 1 : 0,
            transition: 'max-height 0.6s var(--reality-ease), opacity 0.38s ease',
          }}>
            <div style={{
              paddingTop: 20,
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : '1fr 200px',
              gap: 28, alignItems: 'start',
            }}>
              <div>
                <p style={{
                  fontSize: 13, fontWeight: 400, lineHeight: 1.8,
                  color: 'var(--gray-600)', letterSpacing: '0.01em',
                  marginBottom: 18,
                }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                  <div style={{ width: 20, height: 1, background: 'var(--lime)' }} />
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 7,
                    letterSpacing: '0.16em', color: 'rgba(0,174,239,0.5)',
                    textTransform: 'uppercase',
                  }}>
                    REALITY.{String(item.index).padStart(2, '0')} / NEWDIA STRUCTURE
                  </span>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); onOpenModal() }}
                  style={{
                    padding: '8px 18px',
                    border: '1px solid var(--black)',
                    background: 'transparent',
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: 'var(--black)', cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--black)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--black)' }}
                >
                  OPEN RECORD →
                </button>
              </div>
              {!mobile && (
                <div style={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={item.thumbnail} alt={item.title}
                    style={{
                      width: '100%', aspectRatio: '4/3', objectFit: 'cover',
                      display: 'block',
                      filter: 'saturate(0.6) brightness(0.92)',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: [
                      'linear-gradient(rgba(203,219,42,0.08) 1px, transparent 1px)',
                      'linear-gradient(90deg, rgba(203,219,42,0.08) 1px, transparent 1px)',
                    ].join(','),
                    backgroundSize: '80px 80px',
                    mixBlendMode: 'multiply',
                  }} />
                  <div style={{ position:'absolute', top:6, left:6, width:10, height:10, borderTop:'1px solid var(--lime)', borderLeft:'1px solid var(--lime)' }} />
                  <div style={{ position:'absolute', bottom:6, right:6, width:10, height:10, borderBottom:'1px solid var(--lime)', borderRight:'1px solid var(--lime)' }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category */}
        {!mobile && (
          <div style={{ textAlign: 'right', paddingTop: 2 }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 7,
              fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: active ? 'var(--black)' : 'var(--gray-400)',
              transition: 'color 0.35s ease',
            }}>
              {item.catLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────
export default function Portfolio() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [modalItem, setModalItem] = useState<(PortfolioItem & { cat: PortfolioCategory; catLabel: string; index: number }) | null>(null)
  const mobile = useIsMobile()

  return (
    <section id="portfolio" style={{ background: 'var(--white)' }}>

      {/* ── Header ── */}
      <div style={{
        borderTop: '1px solid var(--gray-200)',
        padding: 'clamp(64px,9vh,100px) clamp(24px,6vw,80px)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
          gap: 28, alignItems: 'end',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 8,
              fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--gray-400)', marginBottom: 16,
            }}>
              04 / Reality Archive
            </p>
            <h2 style={{
              fontSize: 'clamp(32px,5vw,68px)',
              fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.0,
              color: 'var(--black)',
            }}>
              {ALL_ITEMS.length} Realities.<br />
              <span style={{ color: 'var(--lime)' }}>One Source.</span>
            </h2>
          </div>
          <div>
            <p style={{
              fontSize: 13, lineHeight: 1.85,
              color: 'var(--gray-600)', letterSpacing: '0.01em', marginBottom: 20,
            }}>
              NEWDIA가 구축한 현실들.<br />
              각 레코드는 동일 구조의 다른 상태(state)다.
            </p>
            {/* SM coordinate marker */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: 'var(--mono)', fontSize: 7,
              letterSpacing: '0.16em', color: 'rgba(0,174,239,0.35)',
              textTransform: 'uppercase',
            }}>
              <div style={{ width: 24, height: 1, background: 'rgba(0,174,239,0.25)' }} />
              PERSPECTIVE ENGINE READS THIS ARCHIVE
            </div>
          </div>
        </div>
      </div>

      {/* ── Reality Archive List ── */}
      <div style={{
        padding: '0 clamp(24px,6vw,80px) clamp(80px,10vh,120px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {ALL_ITEMS.map(item => (
            <RealityRecord
              key={item.id}
              item={item}
              expanded={expandedId === item.id}
              onToggle={() => setExpandedId(prev => prev === item.id ? null : item.id)}
              onOpenModal={() => setModalItem(item)}
              mobile={mobile}
            />
          ))}
          {/* Final rule */}
          <div style={{
            height: 1,
            background: 'var(--gray-200)',
            margin: '0 calc(var(--header-h) * -0.6)',
          }} />
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalItem && <Modal item={modalItem} onClose={() => setModalItem(null)} />}
      </AnimatePresence>
    </section>
  )
}
