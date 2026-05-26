import type { Metadata } from 'next'
import { RealityArrivalOverlay } from '@beos/core/bridge'
import './globals.css'

export const metadata: Metadata = {
  title: 'STUDIO MONSTER — Perspective-Driven Brand Studio',
  description: 'One Form. Multiple Perspectives. Brand Identity, Web Experience, Visual Systems, Marketing Design.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Noto+Sans+KR:wght@300;400;500;700;900&family=Nanum+Brush+Script&family=Montserrat:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <RealityArrivalOverlay />
        {children}
      </body>
    </html>
  )
}
