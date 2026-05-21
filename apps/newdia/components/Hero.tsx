'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const scrollToPortfolio = () => {
    const el = document.querySelector('#portfolio')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 700,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--white)',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(var(--gray-200) 1px, transparent 1px), linear-gradient(90deg, var(--gray-200) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.4,
        }}
      />

      {/* Lime accent block */}
      <motion.div
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          right: 80,
          width: 2,
          height: '60%',
          background: 'var(--lime)',
        }}
      />

      <div className="nd-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 700 }}>
          <motion.span
            className="nd-label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginBottom: 24 }}
          >
            Structure Engine
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: 'clamp(48px, 7vw, 88px)',
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: 'var(--black)',
              marginBottom: 32,
            }}
          >
            Frame the Reality.
            <br />
            <span style={{ color: 'var(--lime)' }}>Build the Impact.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: 'var(--gray-600)',
              marginBottom: 48,
              maxWidth: 480,
            }}
          >
            브랜드 아이덴티티를 구조화하고,<br />
            새로운 현실로 프레이밍합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <button className="nd-btn-primary" onClick={scrollToPortfolio}>
              Explore Work
              <span style={{ fontSize: 18 }}>→</span>
            </button>
            <a href="/consultation" className="nd-btn-outline">
              무료 상담 신청
            </a>
          </motion.div>

          {/* A NEW ID anagram hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.4 }}
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--gray-400)',
              marginTop: 28,
            }}
          >
            NEW<span style={{ color: 'var(--lime)' }}>DIA</span> — A NEW ID
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            position: 'absolute',
            bottom: -120,
            right: 0,
            display: 'flex',
            gap: 48,
          }}
        >
          {[
            { num: '10+', label: 'Years' },
            { num: '200+', label: 'Projects' },
            { num: '50+', label: 'Clients' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--black)' }}>
                {stat.num}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
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
