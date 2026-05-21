'use client'
import dynamic from 'next/dynamic'

const Cursor = dynamic(() => import('./Cursor'), { ssr: false })

export default function ClientCursor() {
  return <Cursor />
}
