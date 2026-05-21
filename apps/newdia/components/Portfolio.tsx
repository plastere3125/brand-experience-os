'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteData, type PortfolioCategory, type PortfolioItem } from '@beos/core/portfolio'

const CATS: { key: PortfolioCategory; label: string; count: number }[] = [
  { key: 'visual',    label: 'Brand Identity',  count: siteData.gallery.visual.length },
  { key: 'web',       label: 'Web Design',       count: siteData.gallery.web.length },
  { key: 'photo',     label: 'Photography',      count: siteData.gallery.photo.length },
  { key: 'marketing', label: 'Marketing',        count: siteData.gallery.marketing.length },
]

function Modal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const imgs = [item.thumbnail, ...item.images]
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(10,10,9,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: 'var(--white)', maxWidth: 960, width: '100%', maxHeight: '90vh', overflow: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--gray-100)' }}>
          <img src={imgs[idx]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, background: 'var(--black)', color: 'var(--white)', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>×</button>
        </div>
        {imgs.length > 1 && (
          <div style={{ display: 'flex', gap: 4, padding: '12px 24px', background: 'var(--gray-100)', overflowX: 'auto' }}>
            {imgs.map((img, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ width: 72, height: 48, flexShrink: 0, border: i === idx ? '2px solid var(--lime)' : '2px solid transparent', cursor: 'pointer', padding: 0 }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}
        <div style={{ padding: '32px 40px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: 8 }}>{item.client}</p>
              <h3 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--black)' }}>{item.title}</h3>
            </div>
            <span style={{ fontSize: 13, color: 'var(--gray-400)', fontWeight: 500, flexShrink: 0, paddingTop: 4 }}>{item.year}</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--gray-600)' }}>{item.description}</p>
          {item.external_site_url && (
            <a href={item.external_site_url} target="_blank" rel="noopener noreferrer" className="nd-btn-outline" style={{ marginTop: 24, display: 'inline-block' }}>
              Visit Website →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ item, index, onClick }: { item: PortfolioItem; index: number; onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{ cursor: 'pointer', background: 'var(--white)', border: '1px solid var(--gray-200)', transition: 'border-color 0.3s ease, box-shadow 0.3s ease', boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.08)' : 'none' }}
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingTop: '72%', overflow: 'hidden', background: 'var(--gray-100)' }}>
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            transform: hov ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        {/* Hover overlay — info slides up */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hov ? 'rgba(10,10,9,0.72)' : 'rgba(10,10,9,0)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '24px',
          transition: 'background 0.35s ease',
        }}>
          <div style={{
            opacity: hov ? 1 : 0,
            transform: hov ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: 6 }}>
              {item.client}
            </p>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
              {item.title}
            </p>
          </div>
        </div>
      </div>

      {/* Info row */}
      <div style={{ padding: '16px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--black)' }}>
          {item.title}
        </p>
        <span style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 500, flexShrink: 0, marginLeft: 12 }}>
          {item.year}
        </span>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [cat, setCat] = useState<PortfolioCategory>('visual')
  const [selected, setSelected] = useState<PortfolioItem | null>(null)
  const items = siteData.gallery[cat]

  return (
    <section id="portfolio" className="nd-section" style={{ background: 'var(--white)' }}>
      <div className="nd-container">

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <span className="nd-label" style={{ marginBottom: 16 }}>Portfolio</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Structured.<br />Delivered.
            </h2>
            <p style={{ fontSize: 13, color: 'var(--gray-400)', fontWeight: 500 }}>
              {items.length} projects in this category
            </p>
          </div>
        </div>

        {/* Category tabs — architectural style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 48, borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)' }}>
          {CATS.map((c, i) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              style={{
                padding: '18px 16px',
                textAlign: 'left',
                background: cat === c.key ? 'var(--black)' : 'transparent',
                transition: 'background 0.25s ease',
                cursor: 'pointer',
                border: 'none',
                borderRight: i < 3 ? '1px solid var(--gray-200)' : 'none',
              }}
            >
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: cat === c.key ? 'var(--lime)' : 'var(--gray-400)', marginBottom: 6, transition: 'color 0.25s' }}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: cat === c.key ? 'var(--white)' : 'var(--black)', transition: 'color 0.25s', letterSpacing: '0.01em' }}>
                {c.label}
              </p>
              <p style={{ fontSize: 11, color: cat === c.key ? 'rgba(255,255,255,0.4)' : 'var(--gray-400)', marginTop: 4, transition: 'color 0.25s' }}>
                {c.count} projects
              </p>
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}
          >
            {items.map((item, i) => (
              <ProjectCard key={item.id} item={item} index={i} onClick={() => setSelected(item)} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      <AnimatePresence>
        {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
