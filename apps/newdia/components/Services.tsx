'use client'

import { motion } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Brand Identity',
    en: 'Frame the Structure',
    description: '브랜드의 본질을 시각 구조로 프레이밍합니다. CI/BI 시스템을 설계하고 아이덴티티를 현실로 구현합니다.',
    href: '#portfolio',
  },
  {
    num: '02',
    title: 'Web Design',
    en: 'Build the Reality',
    description: '디지털 경험을 구조화하여 브랜드 현실로 만듭니다. 시스템 기반 반응형 웹사이트를 설계하고 개발합니다.',
    href: '#portfolio',
  },
  {
    num: '03',
    title: 'Photography',
    en: 'Capture the Frame',
    description: '브랜드 스토리를 시각적 프레임으로 포착합니다. 제품, 인물, 공간의 본질을 구조적 렌즈로 담습니다.',
    href: '#portfolio',
  },
  {
    num: '04',
    title: 'Marketing',
    en: 'Amplify the Impact',
    description: '브랜드 시스템을 기반으로 임팩트를 구축합니다. SNS 콘텐츠부터 캠페인 전략까지 일관된 구조로 실행합니다.',
    href: '#portfolio',
  },
]

export default function Services() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="nd-section" style={{ background: 'var(--black)' }}>
      <div className="nd-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
          {/* Left */}
          <div style={{ position: 'sticky', top: 120 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
                03 / STRUCTURE.SYSTEMS
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'var(--white)',
              marginBottom: 24,
            }}>
              <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.5)' }}>STRUCTURE</span>
              <span style={{ display: 'block', color: 'var(--lime)' }}>SYSTEMS.</span>
            </h2>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, lineHeight: 1.8, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              구조를 설계하고<br />
              현실을 구축합니다.
            </p>
          </div>

          {/* Right */}
          <div>
            {services.map((svc, i) => (
              <motion.div
                key={svc.num}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  gap: 32,
                  padding: '36px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                }}
                onClick={() => scrollTo(svc.href)}
                onMouseEnter={e => (e.currentTarget.style.paddingLeft = '12px')}
                onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
                className="services-item"
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--lime)', letterSpacing: '0.1em', paddingTop: 4, flexShrink: 0 }}>
                  {svc.num}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--white)' }}>
                      {svc.title}
                    </h3>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                      {svc.en}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)' }}>
                    {svc.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
