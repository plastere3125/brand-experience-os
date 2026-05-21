'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteData, type PortfolioCategory, type PortfolioItem } from '@beos/core/portfolio'

const CAT_META: Record<PortfolioCategory, { index: string; label: string; system: string }> = {
  visual:    { index: '01', label: 'Brand Identity',  system: 'IDENTITY STRUCTURE SYSTEM' },
  web:       { index: '02', label: 'Web Design',      system: 'DIGITAL REALITY SYSTEM' },
  photo:     { index: '03', label: 'Photography',     system: 'VISUAL CAPTURE SYSTEM' },
  marketing: { index: '04', label: 'Marketing',       system: 'IMPACT DELIVERY SYSTEM' },
}
const CATS = Object.entries(CAT_META).map(([key, v]) => ({
  key: key as PortfolioCategory, ...v,
  count: siteData.gallery[key as PortfolioCategory].length,
}))

// ─── Modal ────────────────────────────────────────────
function Modal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const imgs = [item.thumbnail, ...item.images]
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(10,10,9,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: 'var(--white)', maxWidth: 1000, width: '100%', maxHeight: '92vh', overflow: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--gray-100)' }}>
          <img src={imgs[idx]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* Corner marks */}
          {[{t:0,l:0},{t:0,r:0},{b:0,l:0},{b:0,r:0}].map((c,i) => (
            <div key={i} style={{
              position:'absolute', ...c, width:20, height:20,
              borderTop: 't' in c ? '1px solid var(--lime)' : 'none',
              borderBottom: 'b' in c ? '1px solid var(--lime)' : 'none',
              borderLeft: 'l' in c ? '1px solid var(--lime)' : 'none',
              borderRight: 'r' in c ? '1px solid var(--lime)' : 'none',
              pointerEvents: 'none',
            }}/>
          ))}
          <button onClick={onClose} style={{ position:'absolute', top:16, right:16, width:36, height:36, background:'var(--black)', color:'var(--white)', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', border:'none', cursor:'pointer' }}>×</button>
        </div>
        {/* Thumbnails */}
        {imgs.length > 1 && (
          <div style={{ display:'flex', gap:2, padding:'8px 16px', background:'var(--gray-100)', overflowX:'auto' }}>
            {imgs.map((img, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ width:64, height:42, flexShrink:0, border: i===idx ? '2px solid var(--lime)' : '2px solid transparent', cursor:'pointer', padding:0 }}>
                <img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </button>
            ))}
          </div>
        )}
        {/* Content */}
        <div style={{ padding:'32px 40px 40px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <p className="nd-label" style={{ marginBottom:8 }}>{item.client}</p>
              <h3 style={{ fontSize:28, fontWeight:700, letterSpacing:'-0.03em', color:'var(--black)' }}>{item.title}</h3>
            </div>
            <span className="nd-index" style={{ paddingTop:4, flexShrink:0 }}>{item.year}</span>
          </div>
          <p style={{ fontSize:15, lineHeight:1.8, color:'var(--gray-600)' }}>{item.description}</p>
          {item.external_site_url && (
            <a href={item.external_site_url} target="_blank" rel="noopener noreferrer" className="nd-btn-outline" style={{ marginTop:24, display:'inline-flex' }}>
              Visit Website →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Project Card — "브랜드 구조 문서" ───────────────────
function ProjectCard({ item, index, onClick }: { item: PortfolioItem; index: number; onClick: () => void }) {
  const [hov, setHov] = useState(false)
  const idx = String(index + 1).padStart(3, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: 'var(--white)',
        border: `1px solid ${hov ? 'var(--black)' : 'var(--gray-200)'}`,
        transition: 'border-color 0.2s ease',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingTop: '68%', overflow: 'hidden', background: 'var(--gray-100)' }}>
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            transform: hov ? 'scale(1.035)' : 'scale(1)',
            filter: hov ? 'saturate(1)' : 'saturate(0.7)',
            transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease',
          }}
        />

        {/* 측정 코너 마크 */}
        {(['tl','tr','bl','br'] as const).map(pos => (
          <div key={pos} style={{
            position: 'absolute',
            top:    pos.startsWith('t') ? 0 : undefined,
            bottom: pos.startsWith('b') ? 0 : undefined,
            left:   pos.endsWith('l')   ? 0 : undefined,
            right:  pos.endsWith('r')   ? 0 : undefined,
            width: 16, height: 16, pointerEvents: 'none',
            borderTop:    pos.startsWith('t') ? `1px solid ${hov ? 'var(--lime)' : 'transparent'}` : 'none',
            borderBottom: pos.startsWith('b') ? `1px solid ${hov ? 'var(--lime)' : 'transparent'}` : 'none',
            borderLeft:   pos.endsWith('l')   ? `1px solid ${hov ? 'var(--lime)' : 'transparent'}` : 'none',
            borderRight:  pos.endsWith('r')   ? `1px solid ${hov ? 'var(--lime)' : 'transparent'}` : 'none',
            transition: 'border-color 0.2s ease',
          }} />
        ))}

        {/* 인덱스 배지 */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          background: hov ? 'var(--lime)' : 'rgba(10,10,10,0.65)',
          color: hov ? 'var(--black)' : 'var(--white)',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          padding: '3px 7px',
          fontFamily: 'var(--mono)',
          transition: 'all 0.22s ease',
        }}>
          {idx}
        </div>
      </div>

      {/* 구조 정보 */}
      <div style={{ padding: '12px 14px 16px', borderTop: `1px solid ${hov ? 'var(--gray-200)' : 'var(--gray-100)'}` }}>
        <p style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.24em',
          textTransform: 'uppercase', color: 'var(--lime)', marginBottom: 5,
        }}>
          {item.client}
        </p>
        <p style={{
          fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em',
          color: 'var(--black)', marginBottom: 10, lineHeight: 1.3,
        }}>
          {item.title}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 10,
            color: 'var(--gray-400)', letterSpacing: '0.06em',
          }}>
            {item.year}
          </span>
          <span style={{
            fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: hov ? 'var(--black)' : 'var(--gray-200)',
            transition: 'color 0.2s ease',
          }}>
            ENTRY →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────
export default function Portfolio() {
  const [cat, setCat] = useState<PortfolioCategory>('visual')
  const [selected, setSelected] = useState<PortfolioItem | null>(null)
  const items = siteData.gallery[cat]
  const meta = CAT_META[cat]

  return (
    <section id="portfolio" style={{ background: 'var(--white)' }}>

      {/* ── Category Navigation — 아키텍처 탭 ── */}
      <div style={{ borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {CATS.map((c, i) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              style={{
                padding: '18px 20px',
                background: cat === c.key ? 'var(--black)' : 'transparent',
                borderRight: i < 3 ? '1px solid var(--gray-200)' : 'none',
                border: 'none', cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.25s ease',
              }}
            >
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: cat === c.key ? 'var(--lime)' : 'var(--gray-400)', marginBottom: 5 }}>
                {c.index}
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: cat === c.key ? 'var(--white)' : 'var(--black)', letterSpacing: '0.01em' }}>
                {c.label}
              </p>
              <p style={{ fontSize: 10, color: cat === c.key ? 'rgba(255,255,255,0.3)' : 'var(--gray-400)', marginTop: 3, fontFamily: 'var(--mono)' }}>
                {c.count}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Category Header — Editorial 대형 타이포 ── */}
      <div className="nd-container">
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          paddingTop: 64, paddingBottom: 40,
          borderBottom: '1px solid var(--gray-200)',
        }}>
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={cat} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: 12 }}>
                  {meta.system}
                </p>
                <h2 style={{
                  fontSize: 'clamp(52px, 8vw, 104px)',
                  fontWeight: 700,
                  letterSpacing: '-0.055em',
                  lineHeight: 0.9,
                  color: 'var(--black)',
                }}>
                  {meta.label}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 대형 인덱스 번호 */}
          <AnimatePresence mode="wait">
            <motion.div key={`num-${cat}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ textAlign: 'right', paddingBottom: 6 }}>
              <p style={{
                fontSize: 'clamp(60px, 9vw, 112px)',
                fontWeight: 700,
                letterSpacing: '-0.06em',
                color: 'var(--gray-100)',
                lineHeight: 1,
                marginBottom: 6,
                fontFamily: 'var(--mono)',
              }}>
                {meta.index}
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--gray-400)', letterSpacing: '0.1em' }}>
                {items.length} ENTRIES
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="nd-container" style={{ paddingTop: 40, paddingBottom: 120 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}
          >
            {items.map((item, i) => (
              <ProjectCard key={item.id} item={item} index={i} onClick={() => setSelected(item)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
