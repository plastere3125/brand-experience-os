'use client'
import { useEffect, useState } from 'react'

export type RealityOrigin = 'newdia' | 'monster'

export function getRealityShiftUrl(
  dest: { dev: string; prod: string },
  from: RealityOrigin,
): string {
  const base = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? dest.dev
    : dest.prod
  return `${base}?reality=shift&from=${from}`
}

function getArrivalOrigin(): RealityOrigin | null {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search)
  if (p.get('reality') !== 'shift') return null
  const from = p.get('from')
  return from === 'newdia' || from === 'monster' ? from : null
}

const BRIDGE_STYLES = `
@keyframes rb-fade-out {
  0%   { opacity: 1; pointer-events: all; }
  85%  { opacity: 0.02; }
  100% { opacity: 0; pointer-events: none; }
}
@keyframes rb-scan {
  from { transform: translateY(-100%); opacity: 0.9; }
  to   { transform: translateY(110vh);  opacity: 0; }
}
`

export function RealityArrivalOverlay() {
  const [origin, setOrigin] = useState<RealityOrigin | null>(null)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const o = getArrivalOrigin()
    if (!o) return
    setOrigin(o)

    // URL 정리 (리로드 없이)
    const url = new URL(window.location.href)
    url.searchParams.delete('reality')
    url.searchParams.delete('from')
    window.history.replaceState({}, '', url.toString())

    const t = setTimeout(() => setActive(false), 1600)
    return () => clearTimeout(t)
  }, [])

  if (!origin) return null

  const fromMonster = origin === 'monster'
  // 모스터에서 왔다 = NEWDIA 도착 = 다크 오버레이 → 라이트로 전환
  // NEWDIA에서 왔다 = MONSTER 도착 = 라이트 오버레이 → 다크로 전환
  const bg       = fromMonster ? '#0a0a09' : '#ffffff'
  const grid     = fromMonster ? 'rgba(0,174,239,0.055)'   : 'rgba(203,219,42,0.09)'
  const gridSize = fromMonster ? '44px' : '80px'
  const accent   = fromMonster ? '#00AEEF' : '#CBDB2A'

  return (
    <>
      <style>{BRIDGE_STYLES}</style>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
        background: bg,
        animation: active ? 'none' : 'rb-fade-out 1.4s cubic-bezier(0.22,1,0.36,1) forwards',
        pointerEvents: active ? 'all' : 'none',
      }}>
        {/* 출발 사이트 grid 잔상 */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: [
            `linear-gradient(${grid} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          ].join(','),
          backgroundSize: `${gridSize} ${gridSize}`,
        }} />

        {/* 수직 스캔 잔상 */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', width: 1, height: '60%',
          background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
          opacity: 0.55,
          animation: !active ? 'rb-scan 1.0s ease 0.2s forwards' : 'none',
        }} />

        {/* 코너 브라켓 */}
        {[
          { top: 24,    left: 24,  borderTop:    `1px solid ${accent}55`, borderLeft:   `1px solid ${accent}55` },
          { top: 24,    right: 24, borderTop:    `1px solid ${accent}55`, borderRight:  `1px solid ${accent}55` },
          { bottom: 24, left: 24,  borderBottom: `1px solid ${accent}55`, borderLeft:   `1px solid ${accent}55` },
          { bottom: 24, right: 24, borderBottom: `1px solid ${accent}55`, borderRight:  `1px solid ${accent}55` },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 16, height: 16, ...s }} />
        ))}

        {/* 상태 라벨 */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'monospace', fontSize: 8, fontWeight: 700,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: `${accent}88`,
        }}>
          {fromMonster ? 'STRUCTURE.REALITY — LOADING' : 'PERSPECTIVE.REALITY — LOADING'}
        </div>
      </div>
    </>
  )
}
