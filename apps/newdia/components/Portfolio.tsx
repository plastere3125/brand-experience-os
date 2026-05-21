'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { siteData, type PortfolioCategory, type PortfolioItem } from '@beos/core/portfolio'

const categories: { key: PortfolioCategory; label: string }[] = [
  { key: 'visual', label: 'Visual Design' },
  { key: 'web', label: 'Web Design' },
  { key: 'photo', label: 'Photography' },
  { key: 'marketing', label: 'Marketing' },
]

function PortfolioModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0)
  const allImages = [item.thumbnail, ...item.images]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: 'var(--white)',
          maxWidth: 900,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Main image */}
        <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--gray-100)' }}>
          <img
            src={allImages[imgIdx]}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 40,
              height: 40,
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div style={{ display: 'flex', gap: 8, padding: '12px 24px', background: 'var(--gray-100)', overflowX: 'auto' }}>
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                style={{
                  width: 72,
                  height: 48,
                  flexShrink: 0,
                  outline: i === imgIdx ? '2px solid var(--lime)' : '2px solid transparent',
                  outlineOffset: 1,
                  cursor: 'pointer',
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}

        {/* Info */}
        <div style={{ padding: '24px 32px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <span className="nd-label" style={{ marginBottom: 8 }}>{item.client}</span>
              <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>{item.title}</h3>
            </div>
            <span style={{ fontSize: 13, color: 'var(--gray-400)', fontWeight: 600 }}>{item.year}</span>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--gray-600)' }}>{item.description}</p>
          {item.external_site_url && (
            <a
              href={item.external_site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="nd-btn-outline"
              style={{ marginTop: 20 }}
            >
              Visit Website →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('visual')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const items = siteData.gallery[activeCategory]

  return (
    <section id="portfolio" className="nd-section" style={{ background: 'var(--white)' }}>
      <div className="nd-container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="nd-label" style={{ marginBottom: 12 }}>Portfolio</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Selected Works
            </h2>
          </div>
          <div style={{ fontSize: 14, color: 'var(--gray-400)' }}>
            {items.length} Projects
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 48, borderBottom: '1px solid var(--gray-200)' }}>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: '12px 24px',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.02em',
                color: activeCategory === cat.key ? 'var(--black)' : 'var(--gray-400)',
                borderBottom: activeCategory === cat.key ? '2px solid var(--black)' : '2px solid transparent',
                marginBottom: -1,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 2,
            }}
          >
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelectedItem(item)}
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'var(--gray-100)',
                  display: 'block',
                  width: '100%',
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '20px 20px',
                    transition: 'background 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.6)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}
                >
                  <div style={{ transform: 'translateY(8px)', transition: 'transform 0.3s ease, opacity 0.3s ease', opacity: 0 }}
                    onMouseEnter={e => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--lime)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                      {item.client}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>
                      {item.title}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
