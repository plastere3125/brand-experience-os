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
