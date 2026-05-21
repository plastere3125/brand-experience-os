import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'NEWDIA | Framing Ideas into Impact',
  description: '아이디어를 임팩트로 전환하는 종합 디자인 컴퍼니',
  keywords: '디자인, 브랜딩, 웹디자인, 마케팅, CI, BI',
  openGraph: {
    title: 'NEWDIA | Framing Ideas into Impact',
    description: '아이디어를 임팩트로 전환하는 종합 디자인 컴퍼니',
    url: 'https://newdia.co.kr',
    siteName: 'NEWDIA',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
