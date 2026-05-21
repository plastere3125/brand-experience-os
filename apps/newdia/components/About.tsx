'use client'

import { motion } from 'framer-motion'

const stats = [
  { num: '10+', label: 'Years Experience' },
  { num: '200+', label: 'Projects Done' },
  { num: '50+', label: 'Happy Clients' },
]

export default function About() {
  return (
    <section id="about" className="nd-section" style={{ background: 'var(--white)' }}>
      <div className="nd-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="nd-label" style={{ marginBottom: 16 }}>Structure Engine</span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 24,
            }}>
              We Build Realities.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--gray-600)', marginBottom: 48 }}>
              NEWDIA는 브랜드 구조를 설계하고 새로운 아이덴티티를 프레이밍합니다.<br />
              정돈된 시스템으로 명확한 브랜드 현실을 만듭니다.
            </p>
            <div style={{ display: 'flex', gap: 40 }}>
              {stats.map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--black)', marginBottom: 4 }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <div style={{ background: 'var(--black)', aspectRatio: '1', padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: 8 }}>
                  Structure
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--white)', lineHeight: 1.3 }}>
                  정돈된 현실
                </div>
              </div>
              <div style={{ background: 'var(--lime)', aspectRatio: '1', padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: 8 }}>
                  Impact
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--black)', lineHeight: 1.3 }}>
                  A NEW ID
                </div>
              </div>
              <div style={{ background: 'var(--gray-100)', aspectRatio: '1', padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 8 }}>
                  Clarity
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--black)', lineHeight: 1.3 }}>
                  명확한 실행
                </div>
              </div>
              <div style={{ background: 'var(--gray-200)', aspectRatio: '1', padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-600)', marginBottom: 8 }}>
                  Trust
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--black)', lineHeight: 1.3 }}>
                  브랜드 신뢰
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
