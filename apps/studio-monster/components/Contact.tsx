'use client'
import { useState, useEffect, useCallback } from 'react'
import MLogo from './MLogo'

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  const check = useCallback(() => setMobile(window.innerWidth < 768), [])
  useEffect(() => { check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check) }, [check])
  return mobile
}

// ── Types ──────────────────────────────────────────────
type ContactService = { id: string; name: string; active: boolean }
type ContactOptions = {
  heading: string
  subheading: string
  subKo: string
  btnText: string
  showPhone: boolean
  showService: boolean
  successMsg: string
}

const DEFAULT_OPTS: ContactOptions = {
  heading:    "Let's find your\nperspective.",
  subheading: 'Every brand starts with a different perspective.',
  subKo:      '브랜드는 새로운 시선에서 시작됩니다.',
  btnText:    'GET IN TOUCH',
  showPhone:  true,
  showService: true,
  successMsg: '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
}
const DEFAULT_SERVICES: ContactService[] = [
  { id: '1', name: '로고 디자인',      active: true },
  { id: '2', name: '브랜드 아이덴티티', active: true },
  { id: '3', name: '웹사이트 제작',    active: true },
  { id: '4', name: '인쇄물 디자인',    active: true },
  { id: '5', name: 'SNS 콘텐츠',      active: true },
  { id: '6', name: '기타',            active: true },
]

const BUDGET_OPTS = ['300만원 미만', '300 ~ 500만원', '500 ~ 1,000만원', '1,000만원 이상', '미정']

const INFO = [
  { label: 'Email',        value: 'studo.monster2026@gmail.com' },
  { label: 'Based in',     value: 'Seoul, Korea' },
  { label: 'Availability', value: 'Open to New Projects' },
]

// ── Contact Form Modal ─────────────────────────────────
function ContactModal({ opts, services, onClose }: {
  opts: ContactOptions
  services: ContactService[]
  onClose: () => void
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', budget: '', message: '' })
  const [picked, setPicked] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')
  const mobile = useIsMobile()

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const toggleService = (name: string) =>
    setPicked(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) return
    try {
      const prev = localStorage.getItem('sm_inquiries')
      const list = prev ? JSON.parse(prev) : []
      localStorage.setItem('sm_inquiries', JSON.stringify([{
        id: Date.now().toString(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        budget: form.budget,
        services: picked,
        message: form.message.trim(),
        createdAt: new Date().toISOString(),
        status: 'new',
      }, ...list]))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inp: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
    padding: '13px 16px', color: '#fff', fontSize: '14px', outline: 'none',
    fontFamily: 'inherit', width: '100%', transition: 'border-color 0.25s', borderRadius: '4px',
  }
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')
  const lbl: React.CSSProperties = {
    display: 'block', fontSize: '13px', fontWeight: 500,
    color: 'rgba(255,255,255,0.75)', marginBottom: '8px',
  }
  const req: React.CSSProperties = { color: '#EF4444', marginLeft: '3px' }

  const activeServices = services.filter(s => s.active)

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        width: '100%', maxWidth: '640px',
        background: '#111', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px', maxHeight: '92vh', overflowY: 'auto',
      }}>
        {/* Modal header */}
        <div style={{
          padding: '26px 32px 22px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.6)', marginBottom: '6px' }}>
              Project Inquiry
            </p>
            <h3 style={{ fontSize: mobile ? '18px' : '22px', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              무료 상담 신청
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '24px', cursor: 'pointer', lineHeight: 1, padding: '0 4px', flexShrink: 0 }}
          >×</button>
        </div>

        {/* Form / Success */}
        <div style={{ padding: '28px 32px 32px' }}>
          {status === 'sent' ? (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(0,174,239,0.12)', border: '1px solid rgba(0,174,239,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '22px', color: '#00AEEF' }}>✓</div>
              <p style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>상담 신청이 완료되었습니다.</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}>{opts.successMsg}</p>
              <button onClick={onClose} style={{ marginTop: '28px', background: '#00AEEF', border: 'none', color: '#000', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', padding: '13px 36px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '4px' }}>
                확인
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Row 1: 이름 + 연락처 */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={lbl}>이름<span style={req}>*</span></label>
                  <input type="text" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="홍길동" style={inp} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={lbl}>연락처<span style={req}>*</span></label>
                  <input type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="010-1234-5678" style={inp} onFocus={focus} onBlur={blur} />
                </div>
              </div>

              {/* 이메일 */}
              <div>
                <label style={lbl}>이메일<span style={req}>*</span></label>
                <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="example@email.com" style={inp} onFocus={focus} onBlur={blur} />
              </div>

              {/* Row: 회사/브랜드명 + 예산 범위 */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={lbl}>회사/브랜드명</label>
                  <input value={form.company} onChange={e => set('company', e.target.value)} placeholder="회사명 또는 브랜드명" style={inp} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={lbl}>예산 범위</label>
                  <select
                    value={form.budget}
                    onChange={e => set('budget', e.target.value)}
                    style={{ ...inp, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.4)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px' }}
                    onFocus={focus} onBlur={blur}
                  >
                    <option value="" style={{ background: '#111' }}>선택해 주세요</option>
                    {BUDGET_OPTS.map(o => <option key={o} value={o} style={{ background: '#111' }}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* 관심 서비스 — checkbox style */}
              {opts.showService && activeServices.length > 0 && (
                <div>
                  <label style={lbl}>관심 서비스</label>
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '10px 16px' }}>
                    {activeServices.map(svc => {
                      const on = picked.includes(svc.name)
                      return (
                        <label
                          key={svc.id}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
                          onClick={() => toggleService(svc.name)}
                        >
                          <div style={{
                            width: '16px', height: '16px', flexShrink: 0,
                            border: `1.5px solid ${on ? '#00AEEF' : 'rgba(255,255,255,0.3)'}`,
                            borderRadius: '3px',
                            background: on ? '#00AEEF' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.18s',
                          }}>
                            {on && <span style={{ color: '#000', fontSize: '10px', fontWeight: 800, lineHeight: 1 }}>✓</span>}
                          </div>
                          <span style={{ fontSize: '13px', color: on ? '#fff' : 'rgba(255,255,255,0.6)', transition: 'color 0.18s' }}>{svc.name}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 문의 내용 */}
              <div>
                <label style={lbl}>문의 내용<span style={req}>*</span></label>
                <textarea
                  required rows={5}
                  value={form.message} onChange={e => set('message', e.target.value)}
                  placeholder="프로젝트 내용, 희망 일정, 참고 사이트 등을 자유롭게 작성해 주세요."
                  style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={focus} onBlur={blur}
                />
              </div>

              {status === 'error' && (
                <p style={{ fontSize: '11px', color: 'rgba(239,68,68,0.8)' }}>전송에 실패했습니다. 다시 시도해주세요.</p>
              )}

              <button
                type="submit"
                style={{
                  marginTop: '4px', background: '#00AEEF', border: 'none',
                  color: '#fff', fontWeight: 700, fontSize: '15px', letterSpacing: '0.04em',
                  padding: '17px', cursor: 'pointer', fontFamily: 'inherit',
                  borderRadius: '4px', transition: 'background 0.25s',
                  width: '100%',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0094cc')}
                onMouseLeave={e => (e.currentTarget.style.background = '#00AEEF')}
              >
                무료 상담 신청하기
              </button>

              <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.22)', lineHeight: 1.6, marginTop: '-4px' }}>
                상담 신청 시 <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>개인정보처리방침</span>에 동의하는 것으로 간주됩니다.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Contact Section ───────────────────────────────
export default function Contact() {
  const [open, setOpen] = useState(false)
  const [opts, setOpts] = useState<ContactOptions>(DEFAULT_OPTS)
  const [services, setServices] = useState<ContactService[]>(DEFAULT_SERVICES)
  const mobile = useIsMobile()

  useEffect(() => {
    try {
      const o = localStorage.getItem('sm_contact_options')
      if (o) setOpts({ ...DEFAULT_OPTS, ...JSON.parse(o) })
      const s = localStorage.getItem('sm_contact_services')
      if (s) setServices(JSON.parse(s))
    } catch {}
  }, [])

  const headingLines = opts.heading.split('\n')

  return (
    <>
      <section id="contact" style={{ padding: 'clamp(80px,10vw,140px) var(--pad)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '60px' }}>
            05 / Contact
          </p>

          {/* Centered hero */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto', paddingBottom: 'clamp(56px,8vw,96px)' }}>
            <h2 style={{ fontSize: 'clamp(32px,5vw,68px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '20px' }}>
              {headingLines.map((line, i) => (
                <span key={i}>{line}{i < headingLines.length - 1 && <br />}</span>
              ))}
            </h2>
            <p style={{ fontSize: 'clamp(13px,1.4vw,16px)', color: 'rgba(255,255,255,0.45)', marginBottom: '6px' }}>
              {opts.subheading}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginBottom: '48px', letterSpacing: '0.04em' }}>
              {opts.subKo}
            </p>

            {/* Info row */}
            <div style={{
              display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
              gap: mobile ? '24px' : '0',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              marginBottom: '48px',
            }}>
              {INFO.map((item, i) => (
                <div key={i} style={{
                  padding: mobile ? '20px 0' : '28px 0',
                  borderRight: !mobile && i < INFO.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}>
                  <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.55)', marginBottom: '10px' }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setOpen(true)}
              style={{
                background: '#00AEEF', border: 'none',
                color: '#000', fontWeight: 800, fontSize: mobile ? '13px' : '14px',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: mobile ? '18px 48px' : '22px 72px',
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5bcbf5'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#00AEEF'; e.currentTarget.style.transform = 'none' }}
            >
              {opts.btnText}
            </button>
          </div>

          {/* ── Footer ── */}
          <div style={{ paddingTop: '64px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '2fr 1fr 1fr', gap: mobile ? '32px' : '40px', marginBottom: '48px' }}>

              {/* Brand */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <MLogo mode="full" style={{ width: '20px', height: '20px' }} />
                  <span style={{ fontWeight: 700, letterSpacing: '0.12em', fontSize: '12px' }}>STUDIO MONSTER</span>
                </div>
                <p style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, maxWidth: '280px' }}>
                  브랜드의 새로운 시선을 찾는<br />크리에이티브 스튜디오.
                </p>
                <p style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.18)', marginTop: '6px', fontStyle: 'italic' }}>
                  One Source. Multiple Realities.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.5)', marginBottom: '18px' }}>
                  Navigation
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['About', 'Perspective', 'Portfolio', 'Contact'].map(label => (
                    <span key={label} style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em' }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Connect */}
              <div>
                <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.5)', marginBottom: '18px' }}>
                  Connect
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Instagram', href: '#' },
                    { label: 'Behance',   href: '#' },
                    { label: 'LinkedIn',  href: '#' },
                    { label: 'Email',     href: '#' },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em', textDecoration: 'none' }}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer bottom */}
            <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.06em' }}>
                © 2026 Studio Monster. All rights reserved.
              </span>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.06em' }}>
                Seoul, Korea
              </span>
            </div>

          </div>
        </div>
      </section>

      {open && <ContactModal opts={opts} services={services} onClose={() => setOpen(false)} />}
    </>
  )
}
