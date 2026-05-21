'use client'

interface MLogoProps {
  mode?: 'full' | 'wire' | 'depth'
  style?: React.CSSProperties
}

// Original STUDIO MONSTER M symbol — exact polygon data from source SVG
const polygons = [
  { pts: "139.1 65.51 139.1 108.01 118.56 119.86 118.56 39.94 92.91 53.32 92.6 52.73 70.05 39.85 97.58 23.96 122.34 37.96 139.1 65.51", cls: 'fb' },
  { pts: "139.1 0 139.1 65.51 122.34 37.96 97.58 23.96 139.1 0", cls: 'fc' },
  { pts: "70.05 115.01 41.52 131.73 41.52 100.18 41.71 100.18 70.05 115.01", cls: 'fc' },
  { pts: "97.26 76.62 70.05 93.08 69.55 65.51 92.91 53.32 118.56 39.94 118.56 119.86 97.58 131.97 97.58 97.66 97.58 77.15 97.26 76.62", cls: 'fc' },
  { pts: "69.55 65.51 70.05 93.08 41.52 76.78 41.52 100.18 41.52 131.73 20.54 119.74 20.54 39.94 69.55 65.51", cls: 'fb' },
  { pts: "97.58 77.15 97.58 97.66 70.05 115.01 41.71 100.18 41.52 100.18 41.52 76.78 70.05 93.08 97.26 76.62 97.58 77.15", cls: 'fw' },
  { pts: "92.6 52.73 92.91 53.32 69.55 65.51 20.54 39.94 20.54 119.74 0 108.01 0 0 69.89 39.94 70.05 39.85 92.6 52.73", cls: 'fw' },
]

// fb = #006eb7 (--cib), fc = #5bcbf5 (--cic), fw = #ffffff (--w)
const FILL: Record<string, string> = { fb: '#006eb7', fc: '#5bcbf5', fw: '#ffffff' }
const WIRE_STROKE: Record<string, string> = { fb: 'rgba(0,174,239,.85)', fc: 'rgba(0,174,239,.65)', fw: 'rgba(255,255,255,.55)' }

export default function MLogo({ mode = 'full', style }: MLogoProps) {
  const isWire = mode === 'wire'

  return (
    <svg viewBox="0 0 139.1 131.97" style={style} overflow="visible">
      {polygons.map((p, i) => (
        <polygon
          key={i}
          points={p.pts}
          fill={isWire ? 'none' : FILL[p.cls]}
          stroke={isWire ? WIRE_STROKE[p.cls] : 'none'}
          strokeWidth={isWire ? 1.1 : 0}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}
