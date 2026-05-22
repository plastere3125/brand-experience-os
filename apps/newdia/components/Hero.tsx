'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NODES = [
  { x: '74%', y: '20%', delay: 0.9 },
  { x: '74%', y: '60%', delay: 1.1 },
  { x: '90%', y: '20%', delay: 1.2 },
  { x: '90%', y: '60%', delay: 1.3 },
]

const METADATA = [
  { label: 'PROJECT', value: 'ND.2026.001' },
  { label: 'SCOPE',   value: 'FULL SYSTEM' },
  { label: 'REV',     value: 'v.004' },
  { label: 'STATUS',  value: 'ACTIVE' },
]

export default function Hero() {
  const [fromMonster, setFromMonster] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('from=monster')) {
      setFromMonster(true)
      // URL에서 param 제거 (히스토리 오염 방지)
      window.history.replaceState({}, '', window.location.pathname)
      setTimeout(() => setFromMonster(false), 3000)
    }
  }, [])

  const scrollToPortfolio = () => {
    const el = document.querySelector('#portfolio')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh', minHeight: 720,
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', background: 'var(--white)',
    }}>
      {/* Perspective Echo — SM에서 넘어올 때 잔상 */}
      {fromMonster && <>
        <div className="nd-perspective-echo" />
        <div className="nd-echo-line" />
      </>}

      {/* 설계도 그리드 */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--gray-200) 1px, transparent 1px), linear-gradient(90deg, var(--gray-200) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        opacity: 0.45,
      }} />

      {/* MONSTER 관점 유령 — 44px 블루 그리드, 동일 현실의 다른 상태 */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0,174,239,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,174,239,0.028) 1px,transparent 1px)',
        backgroundSize: '44px 44px',
      }} />
      {/* M 심볼 — MONSTER 유령, 우측 공간 */}
      <div style={{
        position: 'absolute', right: '5%', top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(180px,22vw,280px)', height: 'clamp(180px,22vw,280px)',
        pointerEvents: 'none', zIndex: 0, opacity: 0.022,
        animation: 'sm-ghost-drift 20s ease-in-out infinite',
      }}>
        <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%' }}>
          <g fill="none" stroke="#00AEEF" strokeWidth="1.2" strokeLinejoin="round">
            <polyline points="8,86 8,14 32,50 50,14 68,50 92,14 92,86" opacity="0.9"/>
            <polyline points="8,86 8,14 32,50 50,14 68,50 92,14 92,86" opacity="0.4" transform="translate(2,2)"/>
            <line x1="8" y1="14" x2="8" y2="86" opacity="0.5"/>
            <line x1="92" y1="14" x2="92" y2="86" opacity="0.5"/>
            <line x1="8" y1="50" x2="92" y2="50" strokeDasharray="3,4" opacity="0.3"/>
          </g>
        </svg>
      </div>
      {/* SM coordinate markers — blue */}
      {[
        { x:'62%', y:'15%', text:'SM.44px' },
        { x:'82%', y:'55%', text:'PERSPECTIVE' },
        { x:'55%', y:'82%', text:'// MONSTER' },
      ].map((m,i) => (
        <div key={i} style={{
          position:'absolute', left:m.x, top:m.y, pointerEvents:'none', zIndex:0,
          fontSize:7, fontFamily:'monospace',
          color:'rgba(0,174,239,0.08)',
          letterSpacing:'0.14em', textTransform:'uppercase',
          animation:`sm-coord-pulse ${4 + i * 1.1}s ease-in-out infinite`,
          animationDelay:`${i * 1.3}s`,
        }}>
          {m.text}
        </div>
      ))}

      {/* 수직 측정선 */}
      <motion.div
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', top: 0, right: 80, width: 1, height: '62%', background: 'var(--lime)' }}
      />
      <motion.div
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', top: '62%', right: 0, width: 'calc(16% + 1px)', height: 1, background: 'var(--lime)' }}
      />

      {/* 측정 노드 */}
      {NODES.map((n, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: n.delay }}
          style={{
            position: 'absolute', left: n.x, top: n.y,
            width: 5, height: 5, background: 'var(--lime)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* 측정 박스 */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.4 }}
        style={{
          position: 'absolute', top: '20%', right: '6%',
          width: '16%', height: '42%',
          border: '1px solid var(--gray-200)',
          pointerEvents: 'none',
        }}
      />

      <div className="nd-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 760 }}>

          <motion.span
            className="nd-label"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ marginBottom: 28 }}
          >
            Structure Engine
          </motion.span>

          {/* 헤드라인 — 단어마다 구축되듯 등장 */}
          <div style={{ marginBottom: 14 }}>
            <h1 style={{
              fontSize: 'clamp(56px, 8.5vw, 112px)',
              fontWeight: 700,
              letterSpacing: '-0.055em',
              lineHeight: 0.92,
              color: 'var(--black)',
            }}>
              {['Reality', 'is'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.5 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'inline-block', marginRight: '0.22em' }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.76, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-block', color: 'var(--lime)' }}
              >
                Constructed.
              </motion.span>
            </h1>
          </div>

          {/* 서브 — 아키텍처 어휘 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            style={{
              fontSize: 'clamp(18px, 2.2vw, 26px)',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--gray-400)',
              marginBottom: 40,
            }}
          >
            Structure — Frame — Build
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--gray-600)', marginBottom: 48, maxWidth: 440 }}
          >
            브랜드 구조를 설계하고,<br />
            새로운 아이덴티티를 현실로 구축합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <button className="nd-btn-primary" onClick={scrollToPortfolio}>
              Explore Work →
            </button>
            <a href="/consultation" className="nd-btn-outline">무료 상담</a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.6 }}
            style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gray-400)', marginTop: 28 }}
          >
            NEW<span style={{ color: 'var(--lime)' }}>DIA</span> — A NEW ID
          </motion.p>
        </div>

        {/* 프로젝트 메타데이터 패널 — 아키텍처 도면 스타일 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          style={{
            position: 'absolute',
            bottom: -100,
            right: 0,
            borderLeft: '1px solid var(--gray-200)',
            paddingLeft: 20,
          }}
        >
          {METADATA.map(m => (
            <div key={m.label} style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 2 }}>
                {m.label}
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--black)', letterSpacing: '0.06em' }}>
                {m.value}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
      >
        <span className="nd-code">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          style={{ width: 1, height: 28, background: 'var(--gray-400)' }}
        />
      </motion.div>
    </section>
  )
}
