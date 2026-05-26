import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Packages from '@/components/Packages'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import RealityShiftEngine from '@/components/RealityShiftEngine'

export default function Home() {
  return (
    <>
      {/* SM 균열 흔적 — NEWDIA 내부에 Perspective Reality가 침투 */}
      <div className="sm-crack-ghost" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Packages />
        <Contact />
      </main>
      <Footer />
      <RealityShiftEngine />
    </>
  )
}
