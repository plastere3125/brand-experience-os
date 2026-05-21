'use client'
import { useEffect, useRef } from 'react'
import MLogo from './MLogo'

export default function Hero() {
  const symRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  const wireRef = useRef<HTMLDivElement>(null)
  const depthRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const catsRef = useRef<HTMLDivElement>(null)
  const catsKoRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    let isReady = false, lastMove = 0, ambT = 0
    let tRY=0, tRX=0, cRY=0, cRX=0
    let tShadRY=0, tShadRX=0, cShadRY=0, cShadRX=0
    let tWireX=0, tWireY=0, cWireX=0, cWireY=0
    let tDpthX=0, tDpthY=0, cDpthX=0, cDpthY=0
    let tWireOp=0, cWireOp=0, tDpthOp=0, cDpthOp=0

    const onMove = (e: MouseEvent) => {
      if (!isReady || !symRef.current) return
      lastMove = Date.now()
      const r = symRef.current.getBoundingClientRect()
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2
      // 심볼 중심 기준 320px 반경 안에서 이미 최대값 도달
      const RADIUS = 320
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / RADIUS))
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / RADIUS))
      const dist = Math.hypot(nx, ny)
      tRY = nx * 12; tRX = -ny * 8
      tShadRY = nx * 20; tShadRX = -ny * 13
      tWireX = nx * 38; tWireY = ny * 20
      tDpthX = -nx * 22; tDpthY = -ny * 12
      tWireOp = 0.18 + Math.min(dist, 1) * 0.28
      tDpthOp = 0.10 + Math.min(dist, 1) * 0.22
    }
    document.addEventListener('mousemove', onMove)

    // Entry sequence
    if (symRef.current) symRef.current.style.opacity = '0'
    if (shadowRef.current) shadowRef.current.style.opacity = '0'

    setTimeout(() => {
      if (gridRef.current) { gridRef.current.style.transition = 'opacity 1.6s ease'; gridRef.current.style.opacity = '0.75' }
    }, 160)
    setTimeout(() => { tWireOp = 0.22 }, 480)
    setTimeout(() => { tDpthOp = 0.12 }, 780)
    setTimeout(() => {
      if (symRef.current) { symRef.current.style.transition = 'opacity 1.1s ease'; symRef.current.style.opacity = '1' }
      if (shadowRef.current) { shadowRef.current.style.transition = 'opacity 1.3s ease'; shadowRef.current.style.opacity = '0.18' }
    }, 1080)
    setTimeout(() => {
      if (symRef.current) symRef.current.style.transition = 'none'
      if (shadowRef.current) shadowRef.current.style.transition = 'none'
      if (copyRef.current) { copyRef.current.style.opacity = '1'; copyRef.current.style.transform = 'translateY(0)' }
      isReady = true
      setTimeout(() => { if (catsRef.current) catsRef.current.classList.add('cats-in') }, 300)
      setTimeout(() => { if (catsKoRef.current) catsKoRef.current.classList.add('cats-in') }, 620)
    }, 2100)

    let raf: number
    const LM=.052, LS=.024, LW=.042, LD=.030, LO=.034

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const idle = isReady && (Date.now() - lastMove) > 1800
      if (idle) {
        ambT += .0032
        const s = Math.sin(ambT), c = Math.cos(ambT * .62)
        tRY = s * 2.4; tRX = c * 1.4
        tShadRY = s * 4.2; tShadRX = c * 2.6
        tWireX = Math.sin(ambT * .88) * 12; tWireY = Math.cos(ambT * .60) * 6
        tDpthX = Math.sin(ambT * .70 + 1.1) * -8; tDpthY = Math.cos(ambT * .50 + .8) * -4
        tWireOp = 0.22 + Math.abs(s) * 0.10; tDpthOp = 0.12 + Math.abs(c) * 0.08
      }
      cRY += (tRY - cRY) * LM; cRX += (tRX - cRX) * LM
      cShadRY += (tShadRY - cShadRY) * LS; cShadRX += (tShadRX - cShadRX) * LS
      cWireX += (tWireX - cWireX) * LW; cWireY += (tWireY - cWireY) * LW
      cDpthX += (tDpthX - cDpthX) * LD; cDpthY += (tDpthY - cDpthY) * LD
      cWireOp += (tWireOp - cWireOp) * LO; cDpthOp += (tDpthOp - cDpthOp) * LO

      if (symRef.current) symRef.current.style.transform = `perspective(900px) rotateY(${cRY.toFixed(3)}deg) rotateX(${cRX.toFixed(3)}deg)`
      if (shadowRef.current) shadowRef.current.style.transform = `perspective(900px) rotateY(${cShadRY.toFixed(3)}deg) rotateX(${cShadRX.toFixed(3)}deg)`
      if (wireRef.current) { wireRef.current.style.transform = `translate(${cWireX.toFixed(2)}px,${cWireY.toFixed(2)}px)`; wireRef.current.style.opacity = cWireOp.toFixed(3) }
      if (depthRef.current) { depthRef.current.style.transform = `translate(${cDpthX.toFixed(2)}px,${cDpthY.toFixed(2)}px)`; depthRef.current.style.opacity = cDpthOp.toFixed(3) }
    }
    raf = requestAnimationFrame(tick)

    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '0 var(--pad)',
    }}>
      {/* Blueprint grid */}
      <div ref={gridRef} style={{
        position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(0,174,239,.038) 1px,transparent 1px),linear-gradient(90deg,rgba(0,174,239,.038) 1px,transparent 1px)',
        backgroundSize: '44px 44px',
      }} />

      {/* Shadow layer */}
      <div ref={shadowRef} style={{
        position: 'absolute', width: '273px', height: '273px', opacity: 0,
        filter: 'blur(28px)', zIndex: 0,
        willChange: 'transform',
      }}>
        <MLogo mode="full" style={{ width: '100%', height: '100%', filter: 'saturate(0.3) brightness(0.4)' }} />
      </div>

      {/* Main M symbol */}
      <div ref={symRef} style={{
        position: 'relative', width: '273px', height: '273px', marginBottom: '32px',
        willChange: 'transform', zIndex: 1,
      }}>
        {/* Layers container */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {/* Wireframe layer */}
          <div ref={wireRef} style={{ position: 'absolute', inset: 0, opacity: 0, willChange: 'transform,opacity' }}>
            <MLogo mode="wire" style={{ width: '100%', height: '100%', transform: 'perspective(700px) rotateY(12deg)' }} />
          </div>
          {/* Depth ghost layer */}
          <div ref={depthRef} style={{ position: 'absolute', inset: 0, opacity: 0, willChange: 'transform,opacity' }}>
            <MLogo mode="depth" style={{ width: '100%', height: '100%', transform: 'perspective(700px) rotateY(-14deg)', opacity: 0.5 }} />
          </div>
        </div>
        {/* Main SVG */}
        <MLogo mode="full" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }} />
      </div>

      {/* Copy */}
      <div ref={copyRef} style={{
        textAlign: 'center', zIndex: 1, position: 'relative',
        opacity: 0, transform: 'translateY(18px)',
        transition: 'opacity 1.2s ease, transform 1.2s ease',
      }}>
        <h1 style={{ fontSize: 'clamp(28px,4vw,54px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: '14px' }}>
          One Source.<br />Multiple Realities.
        </h1>
        <p style={{ fontSize: 'clamp(12px,1.2vw,16px)', fontWeight: 300, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.04em' }}>
          Perspective shifts reality.
        </p>
        <div ref={catsRef} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '28px', justifyContent: 'center', flexWrap: 'wrap', opacity: 0, transition: 'opacity 1.4s ease' }}>
          {['Perspective', 'Translation', 'Reconstruction', 'Distortion', 'Reality Shift'].map((cat, i) => (
            <span key={i} style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>{cat}</span>
          ))}
        </div>
        <p ref={catsKoRef} style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.25)', marginTop: '10px', opacity: 0, transition: 'opacity 1.6s ease' }}>
          관점 이동 / 구조 재번역 / 의미 해체 / 감각 전환 / 숨겨진 현실
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(0,174,239,0.5), transparent)', margin: '0 auto' }} />
      </div>

      <style>{`
        .cats-in { opacity: 1 !important; }
      `}</style>
    </section>
  )
}
