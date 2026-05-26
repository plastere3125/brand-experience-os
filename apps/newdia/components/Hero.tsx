'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReality } from '@/contexts/RealityContext'

/* ─── Perspective Mode Hero (Studio Monster) ─── */
function PerspectiveHero() {
  const symRef    = useRef<HTMLDivElement>(null)
  const wireRef   = useRef<HTMLDivElement>(null)
  const depthRef  = useRef<HTMLDivElement>(null)
  const gridRef   = useRef<HTMLDivElement>(null)
  const copyRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isReady = false, lastMove = 0, ambT = 0
    let tRY=0, tRX=0, cRY=0, cRX=0
    let tWireX=0, tWireY=0, cWireX=0, cWireY=0
    let tDpthX=0, tDpthY=0, cDpthX=0, cDpthY=0
    let tWireOp=0, cWireOp=0, tDpthOp=0, cDpthOp=0

    const onMove = (e: MouseEvent) => {
      if (!isReady || !symRef.current) return
      lastMove = Date.now()
      const r = symRef.current.getBoundingClientRect()
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2
      const RADIUS = 320
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / RADIUS))
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / RADIUS))
      const dist = Math.hypot(nx, ny)
      tRY = nx * 12; tRX = -ny * 8
      tWireX = nx * 38; tWireY = ny * 20
      tDpthX = -nx * 22; tDpthY = -ny * 12
      tWireOp = 0.18 + Math.min(dist, 1) * 0.28
      tDpthOp = 0.10 + Math.min(dist, 1) * 0.22
    }
    document.addEventListener('mousemove', onMove)

    if (gridRef.current) { gridRef.current.style.transition = 'opacity 1.6s ease'; gridRef.current.style.opacity = '0.75' }
    setTimeout(() => { tWireOp = 0.22 }, 480)
    setTimeout(() => { tDpthOp = 0.12 }, 780)
    setTimeout(() => {
      if (symRef.current) { symRef.current.style.transition = 'opacity 1.1s ease'; symRef.current.style.opacity = '1' }
    }, 600)
    setTimeout(() => {
      if (symRef.current) symRef.current.style.transition = 'none'
      if (copyRef.current) { copyRef.current.style.opacity = '1'; copyRef.current.style.transform = 'translateY(0)' }
      isReady = true
    }, 1600)

    let raf: number
    const LM=.052, LW=.042, LD=.030, LO=.034

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const idle = isReady && (Date.now() - lastMove) > 1800
      if (idle) {
        ambT += .0032
        const s = Math.sin(ambT), c = Math.cos(ambT * .62)
        tRY = s * 2.4; tRX = c * 1.4
        tWireX = Math.sin(ambT * .88) * 12; tWireY = Math.cos(ambT * .60) * 6
        tDpthX = Math.sin(ambT * .70 + 1.1) * -8; tDpthY = Math.cos(ambT * .50 + .8) * -4
        tWireOp = 0.22 + Math.abs(s) * 0.10; tDpthOp = 0.12 + Math.abs(c) * 0.08
      }
      cRY += (tRY - cRY) * LM; cRX += (tRX - cRX) * LM
      cWireX += (tWireX - cWireX) * LW; cWireY += (tWireY - cWireY) * LW
      cDpthX += (tDpthX - cDpthX) * LD; cDpthY += (tDpthY - cDpthY) * LD
      cWireOp += (tWireOp - cWireOp) * LO; cDpthOp += (tDpthOp - cDpthOp) * LO

      if (symRef.current) symRef.current.style.transform = `perspective(900px) rotateY(${cRY.toFixed(3)}deg) rotateX(${cRX.toFixed(3)}deg)`
      if (wireRef.current) { wireRef.current.style.transform = `translate(${cWireX.toFixed(2)}px,${cWireY.toFixed(2)}px)`; wireRef.current.style.opacity = cWireOp.toFixed(3) }
      if (depthRef.current) { depthRef.current.style.transform = `translate(${cDpthX.toFixed(2)}px,${cDpthY.toFixed(2)}px)`; depthRef.current.style.opacity = cDpthOp.toFixed(3) }
    }
    raf = requestAnimationFrame(tick)

    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: '0 clamp(20px,4vw,64px)',
      background: '#0a0a09',
    }}>
      {/* Blueprint grid */}
      <div ref={gridRef} style={{
        position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0,174,239,.038) 1px,transparent 1px),linear-gradient(90deg,rgba(0,174,239,.038) 1px,transparent 1px)',
        backgroundSize: '44px 44px',
      }} />

      {/* SM Symbol */}
      <div ref={symRef} style={{
        position: 'relative', width: '220px', height: '220px', marginBottom: '36px',
        willChange: 'transform', zIndex: 1, opacity: 0,
      }}>
        {/* Depth ghost layer */}
        <div ref={depthRef} style={{
          position: 'absolute', inset: 0, opacity: 0,
          willChange: 'transform,opacity', filter: 'blur(1px)',
        }}>
          <Image src="/SM_CI-08.svg" alt="" width={220} height={220}
            style={{ width: '100%', height: '100%', opacity: 0.2,
              filter: 'brightness(0) saturate(0) invert(1) sepia(1) saturate(2) hue-rotate(180deg)',
              transform: 'perspective(700px) rotateY(-14deg)',
            }}
          />
        </div>
        {/* Wireframe echo layer */}
        <div ref={wireRef} style={{
          position: 'absolute', inset: 0, opacity: 0,
          willChange: 'transform,opacity',
        }}>
          <Image src="/SM_CI-08.svg" alt="" width={220} height={220}
            style={{ width: '100%', height: '100%', opacity: 0.18,
              filter: 'brightness(0) saturate(0) invert(1) sepia(1) saturate(3) hue-rotate(165deg)',
              transform: 'perspective(700px) rotateY(12deg)',
            }}
          />
        </div>
        {/* Main symbol */}
        <Image src="/SM_CI-08.svg" alt="STUDIO MONSTER" width={220} height={220}
          style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
        />
      </div>

      {/* Copy */}
      <div ref={copyRef} style={{
        textAlign: 'center', zIndex: 1, position: 'relative',
        opacity: 0, transform: 'translateY(18px)',
        transition: 'opacity 1.2s ease, transform 1.2s ease',
      }}>
        <h1 style={{
          fontSize: 'clamp(28px,4vw,54px)', fontWeight: 700,
          letterSpacing: '-0.01em', lineHeight: 1.1,
          color: '#ffffff', marginBottom: '14px',
        }}>
          One Source.<br />Multiple Realities.
        </h1>
        <p style={{
          fontSize: 'clamp(12px,1.2vw,16px)', fontWeight: 300,
          color: 'rgba(255,255,255,0.42)', letterSpacing: '0.04em',
        }}>
          Perspective shifts reality.
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          marginTop: '28px', justifyContent: 'center', flexWrap: 'wrap',
        }}>
          {['Perspective', 'Translation', 'Reconstruction', 'Distortion', 'Reality Shift'].map((cat, i) => (
            <span key={i} style={{
              fontSize: '9px', fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)',
            }}>{cat}</span>
          ))}
        </div>
        <p style={{
          fontSize: '11px', fontWeight: 300,
          color: 'rgba(255,255,255,0.25)', marginTop: '10px',
        }}>
          관점 이동 / 구조 재번역 / 의미 해체 / 감각 전환 / 숨겨진 현실
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(0,174,239,0.5), transparent)', margin: '0 auto' }} />
      </div>
    </section>
  )
}

/* ─── Structure Mode Hero (NEWDIA) ─── */
function StructureHero() {
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
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--gray-200) 1px, transparent 1px), linear-gradient(90deg, var(--gray-200) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        opacity: 0.4,
      }} />

      {/* Lime accent block */}
      <motion.div
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', top: 0, right: 80,
          width: 2, height: '60%', background: 'var(--lime)',
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
              fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0,
              color: 'var(--black)', marginBottom: 32,
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
              fontSize: 17, lineHeight: 1.7,
              color: 'var(--gray-600)', marginBottom: 48, maxWidth: 480,
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.4 }}
            style={{
              fontSize: 10, fontWeight: 600,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--gray-400)', marginTop: 28,
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
            position: 'absolute', bottom: -120, right: 0,
            display: 'flex', gap: 48,
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
          position: 'absolute', bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
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

/* ─── Entry Point ─── */
export default function Hero() {
  const { mode } = useReality()
  return mode === 'perspective' ? <PerspectiveHero /> : <StructureHero />
}
