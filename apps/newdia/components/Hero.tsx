'use client'

import { motion } from 'framer-motion'

const NODES = [
  { x: '74%', y: '20%', delay: 0.8 },
  { x: '74%', y: '60%', delay: 1.0 },
  { x: '90%', y: '20%', delay: 1.1 },
  { x: '90%', y: '60%', delay: 1.2 },
]

const HEADLINE = ['Reality', 'is', 'Constructed.']

export default function Hero() {
  const scrollToPortfolio = () => {
    const el = document.querySelector('#portfolio')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative', height: '100vh', minHeight: 700,
        display: 'flex', alignItems: 'center',
        overflow: 'hidden', background: 'var(--white)',
      }}
    >
      {/* 설계도 그리드 */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--gray-200) 1px, transparent 1px), linear-gradient(90deg, var(--gray-200) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        opacity: 0.5,
      }} />

      {/* 수직 측정선 */}
      <motion.div
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', top: 0, right: 80, width: 1, height: '60%', background: 'var(--lime)' }}
      />

      {/* 수평 측정선 — 수직선 하단에서 연장 */}
      <motion.div
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', top: '60%', right: 0, width: 'calc(16% + 1px)', height: 1, background: 'var(--lime)' }}
      />

      {/* 구조 측정 노드 */}
      {NODES.map((n, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: n.delay }}
          style={{
            position: 'absolute', left: n.x, top: n.y,
            width: 5, height: 5, background: 'var(--lime)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* 측정 박스 — 오른쪽 영역 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        style={{
          position: 'absolute', top: '20%', right: '6%',
          width: '16%', height: '40%',
          border: '1px solid var(--gray-200)',
          pointerEvents: 'none',
        }}
      />

      <div className="nd-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 720 }}>

          <motion.span
            className="nd-label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginBottom: 24 }}
          >
            Structure Engine
          </motion.span>

          {/* 헤드라인 — 단어마다 순차 등장 (구축되듯이) */}
          <div style={{ marginBottom: 12 }}>
            <h1 style={{
              fontSize: 'clamp(48px, 7vw, 88px)',
              fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0,
              color: 'var(--black)',
            }}>
              {HEADLINE.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.5 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.25em',
                    color: word === 'Constructed.' ? 'var(--lime)' : 'var(--black)',
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* 서브 — 구조 단어들 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            style={{
              fontSize: 'clamp(20px, 2.5vw, 30px)',
              fontWeight: 400, letterSpacing: '0.06em',
              color: 'var(--gray-400)', marginBottom: 36,
              textTransform: 'uppercase',
            }}
          >
            Structure — Frame — Build
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--gray-600)', marginBottom: 48, maxWidth: 460 }}
          >
            브랜드 구조를 설계하고,<br />
            새로운 아이덴티티를 현실로 구축합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <button className="nd-btn-primary" onClick={scrollToPortfolio}>
              Explore Work <span style={{ fontSize: 18 }}>→</span>
            </button>
            <a href="/consultation" className="nd-btn-outline">무료 상담 신청</a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.5 }}
            style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gray-400)', marginTop: 28 }}
          >
            NEW<span style={{ color: 'var(--lime)' }}>DIA</span> — A NEW ID
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{ position: 'absolute', bottom: -120, right: 0, display: 'flex', gap: 48 }}
        >
          {[
            { num: '10+', label: 'Years' },
            { num: '200+', label: 'Projects' },
            { num: '50+', label: 'Clients' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--black)' }}>{stat.num}</div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: 1, height: 32, background: 'var(--gray-400)' }}
        />
      </motion.div>
    </section>
  )
}
