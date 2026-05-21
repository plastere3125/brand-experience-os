'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

type ConsultType = 'free' | 'package'

const typeConfig = {
  free: {
    badge: 'FREE',
    title: '무료 상담 신청',
    description: '무료 상담을 통해 귀사에 맞는 최적의 브랜딩 솔루션을 제안해 드립니다.',
    subDesc: '상담은 무료이며, 부담 없이 문의해 주세요. 영업일 기준 24시간 내 답변드립니다.',
    btnText: '무료 상담 신청하기',
    services: [
      'Visual Design (CI/BI)',
      'Web Design',
      'Photography',
      'Marketing',
      'Brand Strategy',
      '기타',
    ],
  },
  package: {
    badge: 'PACKAGE',
    title: '패키지 상담 신청',
    description: '비즈니스 규모와 목표에 맞는 패키지 상담을 신청하세요.',
    subDesc: '전문 컨설턴트가 맞춤형 패키지를 제안해 드립니다. 영업일 기준 24시간 내 답변드립니다.',
    btnText: '패키지 상담 신청하기',
    services: [
      'Starter — 스타트업 & 소규모',
      'Growth — 성장하는 기업',
      'Enterprise — 대기업 & 프랜차이즈',
    ],
  },
}

const budgetOptions = [
  '100만원 미만',
  '100~300만원',
  '300~500만원',
  '500~1000만원',
  '1000만원 이상',
  '미정 / 상담 후 결정',
]

function ConsultationContent() {
  const params = useSearchParams()
  const router = useRouter()
  const typeParam = params.get('type') === 'package' ? 'package' : 'free'

  const [consultType, setConsultType] = useState<ConsultType>(typeParam)
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', budget: '', message: '' })
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const config = typeConfig[consultType]

  const switchType = (t: ConsultType) => {
    setConsultType(t)
    setSelectedServices([])
    router.replace(`/consultation?type=${t}`, { scroll: false })
  }

  const toggleService = (s: string) => {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consultType, ...form, services: selectedServices }),
      })
      if (res.ok) {
        setDone(true)
      } else {
        const d = await res.json()
        setError(d.error || '오류가 발생했습니다.')
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    border: '1px solid var(--gray-200)',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    background: 'var(--white)',
    transition: 'border-color 0.2s',
    borderRadius: 0,
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray-50)' }}>
      {/* Nav */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--header-h)', display: 'flex', alignItems: 'center',
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--gray-200)',
      }}>
        <div className="nd-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Link href="/"><Image src="/NEWDIA_CI-01.svg" alt="NEWDIA" width={120} height={22} /></Link>
          <Link href="/" style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: 6 }}>
            ← 홈으로
          </Link>
        </div>
      </header>

      <div style={{ paddingTop: 'calc(var(--header-h) + 60px)', paddingBottom: 100 }}>
        <div className="nd-container" style={{ maxWidth: 660 }}>

          {done ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', padding: '80px 0' }}
            >
              <div style={{
                width: 80, height: 80, background: 'var(--lime)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, margin: '0 auto 32px',
              }}>
                ✓
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 16 }}>
                신청 완료
              </h2>
              <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 40 }}>
                {consultType === 'free' ? '무료 상담' : '패키지 상담'} 신청이 완료되었습니다.<br />
                영업일 기준 24시간 내에 담당자가 연락드리겠습니다.
              </p>
              <Link href="/" className="nd-btn-primary">홈으로 돌아가기</Link>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div style={{ marginBottom: 40, textAlign: 'center' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '5px 14px',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
                  background: consultType === 'package' ? 'var(--black)' : 'var(--lime)',
                  color: consultType === 'package' ? 'var(--white)' : 'var(--black)',
                  marginBottom: 20,
                }}>
                  {config.badge}
                </span>
                <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: 12 }}>
                  {config.title}
                </h1>
                <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 6 }}>
                  {config.description}
                </p>
                <p style={{ fontSize: 13, color: 'var(--gray-400)' }}>
                  {config.subDesc}
                </p>

                {/* Type Switcher */}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
                  {(['free', 'package'] as ConsultType[]).map(t => (
                    <button
                      key={t}
                      onClick={() => switchType(t)}
                      style={{
                        padding: '9px 20px',
                        fontSize: 13, fontWeight: 500,
                        border: '1px solid',
                        borderColor: consultType === t ? 'var(--black)' : 'var(--gray-200)',
                        background: consultType === t ? 'var(--black)' : 'transparent',
                        color: consultType === t ? 'var(--white)' : 'var(--gray-600)',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                      }}
                    >
                      {t === 'free' ? '무료 상담' : '패키지 상담'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={consultType}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  style={{ background: 'var(--white)', padding: '48px 40px', border: '1px solid var(--gray-200)' }}
                >
                  {/* 이름 + 연락처 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-800)', marginBottom: 8 }}>
                        이름 <span style={{ color: '#e53e3e' }}>*</span>
                      </label>
                      <input required type="text" value={form.name} placeholder="홍길동"
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--black)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--gray-200)')}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-800)', marginBottom: 8 }}>
                        연락처 <span style={{ color: '#e53e3e' }}>*</span>
                      </label>
                      <input required type="tel" value={form.phone} placeholder="010-1234-5678"
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--black)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--gray-200)')}
                      />
                    </div>
                  </div>

                  {/* 이메일 */}
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-800)', marginBottom: 8 }}>
                      이메일 <span style={{ color: '#e53e3e' }}>*</span>
                    </label>
                    <input required type="email" value={form.email} placeholder="example@email.com"
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--black)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--gray-200)')}
                    />
                  </div>

                  {/* 회사 + 예산 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-800)', marginBottom: 8 }}>
                        회사/브랜드명
                      </label>
                      <input type="text" value={form.company} placeholder="회사명 또는 브랜드명"
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--black)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--gray-200)')}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-800)', marginBottom: 8 }}>
                        예산 범위
                      </label>
                      <select value={form.budget}
                        onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                        style={{ ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: 36 }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--black)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--gray-200)')}
                      >
                        <option value="">선택해 주세요</option>
                        {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* 관심 서비스 */}
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-800)', marginBottom: 12 }}>
                      관심 서비스
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {config.services.map(svc => (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          style={{
                            padding: '9px 16px',
                            fontSize: 13, fontWeight: 500,
                            border: '1px solid',
                            borderColor: selectedServices.includes(svc) ? 'var(--black)' : 'var(--gray-200)',
                            background: selectedServices.includes(svc) ? 'var(--black)' : 'transparent',
                            color: selectedServices.includes(svc) ? 'var(--white)' : 'var(--gray-600)',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                          }}
                        >
                          {selectedServices.includes(svc) && <span style={{ marginRight: 6, color: 'var(--lime)' }}>✓</span>}
                          {svc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 문의 내용 */}
                  <div style={{ marginBottom: 32 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-800)', marginBottom: 8 }}>
                      문의 내용 <span style={{ color: '#e53e3e' }}>*</span>
                    </label>
                    <textarea required rows={6} value={form.message}
                      placeholder="프로젝트 내용, 희망 일정, 참고 사이트 등을 자유롭게 작성해 주세요."
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'var(--black)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'var(--gray-200)')}
                    />
                  </div>

                  {error && (
                    <div style={{ padding: '12px 16px', background: '#fff5f5', border: '1px solid #fed7d7', color: '#c53030', fontSize: 14, marginBottom: 20 }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '18px 0',
                      background: consultType === 'package' ? 'var(--black)' : 'var(--lime)',
                      color: consultType === 'package' ? 'var(--white)' : 'var(--black)',
                      fontSize: 15, fontWeight: 700, letterSpacing: '0.05em',
                      border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.7 : 1,
                      transition: 'all 0.2s',
                    }}
                  >
                    {submitting ? '처리 중...' : config.btnText}
                  </button>

                  <p style={{ fontSize: 12, color: 'var(--gray-400)', textAlign: 'center', marginTop: 16 }}>
                    상담 신청 시 개인정보 처리방침에 동의하는 것으로 간주됩니다.
                  </p>
                </motion.form>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ConsultationPage() {
  return (
    <Suspense>
      <ConsultationContent />
    </Suspense>
  )
}
