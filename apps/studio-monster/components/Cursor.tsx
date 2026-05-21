'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const crRef = useRef<HTMLDivElement>(null)
  const crrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let MX = 0, MY = 0, RX = 0, RY = 0

    const onMove = (e: MouseEvent) => { MX = e.clientX; MY = e.clientY }
    document.addEventListener('mousemove', onMove)

    let raf: number
    const tick = () => {
      if (crRef.current) { crRef.current.style.left = MX + 'px'; crRef.current.style.top = MY + 'px' }
      RX += (MX - RX) * 0.1; RY += (MY - RY) * 0.1
      if (crrRef.current) { crrRef.current.style.left = RX + 'px'; crrRef.current.style.top = RY + 'px' }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const addHover = () => document.body.classList.add('ch')
    const removeHover = () => document.body.classList.remove('ch')
    const targets = document.querySelectorAll('a,button,.wcat,.pv-card,.work-card')
    targets.forEach(el => { el.addEventListener('mouseenter', addHover); el.addEventListener('mouseleave', removeHover) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={crRef} className="cr" />
      <div ref={crrRef} className="crr" />
    </>
  )
}
