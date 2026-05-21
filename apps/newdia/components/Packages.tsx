'use client'

import { motion } from 'framer-motion'
import { siteData } from '@beos/core/portfolio'

export default function Packages() {
  const { packages } = siteData

  return (
    <section id="packages" className="nd-section" style={{ background: 'var(--gray-50)' }}>
      <div className="nd-container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="nd-label" style={{ marginBottom: 12 }}>{packages.label}</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: 16 }}>
            {packages.title}
          </h2>
          <p style={{ fontSize: 15, color: 'var(--gray-600)', maxWidth: 440, margin: '0 auto' }}>
            {packages.description}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {packages.items.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: pkg.highlight ? 'var(--black)' : 'var(--white)',
                padding: '48px 40px',
                position: 'relative',
                border: pkg.highlight ? 'none' : '1px solid var(--gray-200)',
              }}
            >
              {pkg.highlight && (
                <div style={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  padding: '4px 12px',
                  background: 'var(--lime)',
                  color: 'var(--black)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>
                  Recommended
                </div>
              )}

              <div style={{ marginBottom: 32 }}>
                <h3 style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: pkg.highlight ? 'var(--white)' : 'var(--black)',
                  marginBottom: 8,
                }}>
                  {pkg.name}
                </h3>
                <p style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: pkg.highlight ? 'rgba(255,255,255,0.5)' : 'var(--gray-400)',
                  letterSpacing: '0.05em',
                }}>
                  {pkg.subtitle}
                </p>
              </div>

              <p style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: pkg.highlight ? 'rgba(255,255,255,0.7)' : 'var(--gray-600)',
                marginBottom: 32,
              }}>
                {pkg.description}
              </p>

              <ul style={{ marginBottom: 40 }}>
                {pkg.features.map(feature => (
                  <li
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 0',
                      borderTop: pkg.highlight ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--gray-100)',
                      fontSize: 14,
                      color: pkg.highlight ? 'rgba(255,255,255,0.85)' : 'var(--gray-800)',
                    }}
                  >
                    <span style={{ color: 'var(--lime)', fontSize: 16, flexShrink: 0 }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/consultation"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 0',
                  background: pkg.highlight ? 'var(--lime)' : 'transparent',
                  border: pkg.highlight ? 'none' : '1px solid var(--black)',
                  color: pkg.highlight ? 'var(--black)' : 'var(--black)',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (!pkg.highlight) {
                    e.currentTarget.style.background = 'var(--black)'
                    e.currentTarget.style.color = 'var(--white)'
                  }
                }}
                onMouseLeave={e => {
                  if (!pkg.highlight) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--black)'
                  }
                }}
              >
                상담 신청하기
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
