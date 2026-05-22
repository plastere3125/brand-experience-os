'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    phase: 'Audit',
    title: '현실을 분석한다',
    desc: '브랜드의 현재 구조를 해체하고 핵심을 추출합니다',
    bg: 'var(--black)',
    textColor: 'var(--white)',
    numColor: 'var(--lime)',
    descColor: 'rgba(255,255,255,0.45)',
    dividerColor: 'rgba(255,255,255,0.12)',
  },
  {
    num: '02',
    phase: 'Frame',
    title: '구조를 설계한다',
    desc: '새로운 아이덴티티의 뼈대를 수직으로 쌓아 올립니다',
    bg: 'var(--lime)',
    textColor: 'var(--black)',
    numColor: 'var(--black)',
    descColor: 'rgba(0,0,0,0.5)',
    dividerColor: 'rgba(0,0,0,0.15)',
  },
  {
    num: '03',
    phase: 'Build',
    title: '현실을 구축한다',
    desc: '모든 접점에서 일관된 브랜드 경험을 완성합니다',
    bg: 'var(--gray-100)',
    textColor: 'var(--black)',
    numColor: 'var(--black)',
    descColor: 'var(--gray-400)',
    dividerColor: 'var(--gray-200)',
  },
  {
    num: '04',
    phase: 'Deliver',
    title: '새로운 아이덴티티',
    desc: 'A NEW ID — 브랜드가 새로운 현실이 됩니다',
    bg: 'var(--gray-200)',
    textColor: 'var(--black)',
    numColor: 'var(--gray-600)',
    descColor: 'var(--gray-400)',
    dividerColor: 'var(--gray-300)',
  },
]

export default function About() {
  return (
    <section id="about" className="nd-section" style={{ background: 'var(--white)' }}>
      <div className="nd-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left — 선언 */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                02 / STRUCTURE.AUDIT
              </span>
              <span style={{ flex: 1, height: 1, background: 'var(--gray-200)', display: 'block', maxWidth: 80 }} />
            </div>

            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700, letterSpacing: '-0.04em',
              lineHeight: 0.95, marginBottom: 32,
            }}>
              <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1.5px var(--black)' }}>
                STRUCTURE
              </span>
              <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1.5px var(--black)' }}>
                DESIGNED
              </span>
              <span style={{ display: 'block', color: 'var(--lime)' }}>
                BUILT.
              </span>
            </h2>

            <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--gray-600)', marginBottom: 40 }}>
              브랜드는 발견되는 것이 아닙니다.<br />
              구조적으로 설계되고, 층층이 쌓이고,<br />
              현실에 단단히 놓여지는 것입니다.<br /><br />
              NEWDIA는 그 구축 과정 전체를<br />
              아키텍처처럼 설계합니다.
            </p>

            {/* STRUCTURAL PARAMETERS */}
            <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 28 }}>
              <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 20 }}>
                STRUCTURAL PARAMETERS
              </p>
              <div style={{ display: 'flex', gap: 28 }}>
                {[
                  { param: 'PARAM.01', key: 'EXP.CYCLE',   value: '10+' },
                  { param: 'PARAM.02', key: 'DELIVERIES',  value: '200+' },
                  { param: 'PARAM.03', key: 'ENTITIES',    value: '50+' },
                ].map(s => (
                  <div key={s.param}>
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 2 }}>
                      {s.param}
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--gray-400)', letterSpacing: '0.06em', marginBottom: 6 }}>
                      {s.key}
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--black)', lineHeight: 1 }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — 구축 프로세스 (블록이 층층이 쌓임) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: step.bg,
                  padding: '26px 30px',
                  display: 'flex', alignItems: 'center', gap: 20,
                }}
              >
                {/* 번호 + Phase */}
                <div style={{ flexShrink: 0, width: 52 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: step.numColor, opacity: 0.55, marginBottom: 4 }}>
                    {step.phase}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: step.numColor, lineHeight: 1 }}>
                    {step.num}
                  </div>
                </div>

                {/* 구분선 */}
                <div style={{ width: 1, height: 36, background: step.dividerColor, flexShrink: 0 }} />

                {/* 내용 */}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: step.textColor, marginBottom: 4, letterSpacing: '-0.01em' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 12, color: step.descColor, lineHeight: 1.55 }}>
                    {step.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
