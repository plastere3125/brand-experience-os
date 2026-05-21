'use client'
import { useState, useEffect } from 'react'
import MLogo from '@/components/MLogo'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Item = {
  id: number
  cat: string
  title: string
  sub: string
  year: string
  tags: string[]
}

type Tab = 'dashboard' | 'portfolio' | 'work' | 'inquiries' | 'settings'

type Inquiry = {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  budget?: string
  services?: string[]
  message: string
  createdAt: string
  status: 'new' | 'contacted' | 'contracted' | 'held' | 'cancelled'
}

type ContactOptions = {
  heading: string
  subheading: string
  subKo: string
  btnText: string
  showPhone: boolean
  showService: boolean
  successMsg: string
}
type ContactService = { id: string; name: string; description?: string; active: boolean }

type ShowcaseItem = { label: string; sub: string }
type PaletteItem = { bg: string; label: string; light: boolean }
type ShowcaseCfg = { ticker: string; ctaUrl: string; ctaLabel: string; items: ShowcaseItem[]; typefaceName: string; typefaceFamily: string; palette: PaletteItem[] }
type WorkCfg = Record<string, ShowcaseCfg>

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const ADMIN_ID = 'studio'
const ADMIN_PW = 'monster2026'

const CATS = ['BRANDING', 'WEB DESIGN', 'PHOTOGRAPHY', 'VISUAL DESIGN', 'MARKETING']

const INITIAL_ITEMS: Item[] = [
  { id: 1,  cat: 'BRANDING',      title: 'Brand Identity System',   sub: 'Complete visual identity — from mark to motion',          year: '2025', tags: ['Brand Identity', 'Logo'] },
  { id: 2,  cat: 'BRANDING',      title: 'Retail Visual Identity',  sub: 'Brand architecture for a retail ecosystem',               year: '2024', tags: ['Identity', 'Packaging'] },
  { id: 3,  cat: 'WEB DESIGN',    title: 'Digital Platform UI',     sub: 'Full interface design for a B2B platform',                year: '2025', tags: ['UI/UX', 'Web'] },
  { id: 4,  cat: 'WEB DESIGN',    title: 'Corporate Website',       sub: 'Enterprise brand expression online',                      year: '2024', tags: ['Web Design', 'Motion'] },
  { id: 5,  cat: 'PHOTOGRAPHY',   title: 'Product Campaign',        sub: 'Hero imagery for a product launch',                       year: '2025', tags: ['Product', 'Campaign'] },
  { id: 6,  cat: 'PHOTOGRAPHY',   title: 'Brand Lifestyle',         sub: 'Authentic lifestyle photography for SNS',                 year: '2024', tags: ['Lifestyle', 'Editorial'] },
  { id: 7,  cat: 'VISUAL DESIGN', title: 'Campaign Art Direction',  sub: 'Visual system for a 360° campaign',                      year: '2025', tags: ['Art Direction', 'Campaign'] },
  { id: 8,  cat: 'VISUAL DESIGN', title: 'Editorial & Print',       sub: 'Annual report and print collateral design',               year: '2024', tags: ['Editorial', 'Print'] },
  { id: 9,  cat: 'MARKETING',     title: 'SNS Content System',      sub: 'Scalable content framework for social channels',          year: '2025', tags: ['SNS', 'Content'] },
  { id: 10, cat: 'MARKETING',     title: 'Performance Campaign',    sub: 'Data-driven campaign with creative direction',            year: '2024', tags: ['Digital', 'Strategy'] },
  { id: 11, cat: 'BRANDING',      title: 'Startup Brand Launch',    sub: 'Zero-to-one identity for a tech startup',                 year: '2025', tags: ['Brand System', 'Launch'] },
  { id: 12, cat: 'PHOTOGRAPHY',   title: 'F&B Editorial Series',    sub: 'Atmosphere-driven photography for a dining brand',       year: '2025', tags: ['Editorial', 'F&B'] },
]

const CAT_COLOR: Record<string, string> = {
  BRANDING:       '#00AEEF',
  'WEB DESIGN':   '#5bcbf5',
  PHOTOGRAPHY:    '#a78bfa',
  'VISUAL DESIGN':'#f472b6',
  MARKETING:      '#34d399',
}

// ─────────────────────────────────────────────
// Shared Styles
// ─────────────────────────────────────────────
const S = {
  input: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    padding: '10px 14px',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
    borderRadius: '2px',
  } as React.CSSProperties,
  label: {
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.35)',
    marginBottom: '6px',
    display: 'block',
  },
  btn: {
    background: '#00AEEF',
    border: 'none',
    color: '#000',
    fontWeight: 700,
    fontSize: '11px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    padding: '10px 24px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    borderRadius: '2px',
  } as React.CSSProperties,
  btnGhost: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 600,
    fontSize: '11px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    borderRadius: '2px',
  } as React.CSSProperties,
}

// ─────────────────────────────────────────────
// Login
// ─────────────────────────────────────────────
function Login({ onOk }: { onOk: () => void }) {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const [shaking, setShaking] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      sessionStorage.setItem('sm_admin', '1')
      onOk()
    } else {
      setErr(true)
      setShaking(true)
      setTimeout(() => { setErr(false); setShaking(false); setId(''); setPw('') }, 1200)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#060606', cursor: 'default',
    }}>
      <style>{`* { cursor: default !important; } input, button { cursor: default !important; }
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
      `}</style>

      <div style={{ width: '360px', animation: shaking ? 'shake 0.4s ease' : 'none' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <MLogo mode="full" style={{ width: '30px', height: '30px' }} />
            <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.16em' }}>STUDIO MONSTER</span>
          </div>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.22em', marginTop: '8px', textTransform: 'uppercase' }}>Admin Dashboard</p>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* ID */}
          <div>
            <label style={S.label}>아이디</label>
            <input
              type="text"
              value={id}
              onChange={e => setId(e.target.value)}
              placeholder="아이디 입력"
              autoFocus
              autoComplete="username"
              style={{
                ...S.input,
                borderColor: err ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)' }}
              onBlur={e => { e.currentTarget.style.borderColor = err ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)' }}
            />
          </div>

          {/* PW */}
          <div>
            <label style={S.label}>비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="비밀번호 입력"
              autoComplete="current-password"
              style={{
                ...S.input,
                borderColor: err ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)' }}
              onBlur={e => { e.currentTarget.style.borderColor = err ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)' }}
            />
          </div>

          {err && (
            <p style={{ fontSize: '11px', color: 'rgba(239,68,68,0.9)', marginTop: '-4px' }}>
              아이디 또는 비밀번호가 올바르지 않습니다.
            </p>
          )}

          <button type="submit" style={{ ...S.btn, width: '100%', padding: '14px', marginTop: '4px' }}>
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Item Modal (Add / Edit)
// ─────────────────────────────────────────────
function ItemModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: Item
  onSave: (data: Omit<Item, 'id'>) => void
  onClose: () => void
}) {
  const [form, setForm] = useState({
    cat: initial?.cat ?? 'BRANDING',
    title: initial?.title ?? '',
    sub: initial?.sub ?? '',
    year: initial?.year ?? String(new Date().getFullYear()),
    tags: initial?.tags?.join(', ') ?? '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const save = () => {
    if (!form.title.trim()) return
    onSave({
      cat: form.cat,
      title: form.title.trim(),
      sub: form.sub.trim(),
      year: form.year.trim(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{
        width: '520px', background: '#0e0e0e',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '32px', borderRadius: '4px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em' }}>
            {initial ? '프로젝트 수정' : '새 프로젝트 추가'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Category */}
          <div>
            <label style={S.label}>카테고리</label>
            <select
              value={form.cat}
              onChange={e => set('cat', e.target.value)}
              style={{ ...S.input, appearance: 'none' }}
            >
              {CATS.map(c => <option key={c} value={c} style={{ background: '#111' }}>{c}</option>)}
            </select>
          </div>

          {/* Title */}
          <div>
            <label style={S.label}>프로젝트 제목 *</label>
            <input
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="ex) Brand Identity System"
              style={S.input}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {/* Sub */}
          <div>
            <label style={S.label}>설명 (한 줄)</label>
            <input
              value={form.sub}
              onChange={e => set('sub', e.target.value)}
              placeholder="ex) Complete visual identity — from mark to motion"
              style={S.input}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
          </div>

          {/* Year + Tags (row) */}
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '14px' }}>
            <div>
              <label style={S.label}>연도</label>
              <input
                value={form.year}
                onChange={e => set('year', e.target.value)}
                placeholder="2025"
                style={S.input}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>
            <div>
              <label style={S.label}>태그 (쉼표 구분)</label>
              <input
                value={form.tags}
                onChange={e => set('tags', e.target.value)}
                placeholder="Brand Identity, Logo"
                style={S.input}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '28px' }}>
          <button style={S.btnGhost} onClick={onClose}>취소</button>
          <button style={S.btn} onClick={save}>저장</button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Dashboard Tab
// ─────────────────────────────────────────────
function Dashboard({ items }: { items: Item[] }) {
  const total = items.length
  const recent = [...items].sort((a, b) => Number(b.year) - Number(a.year)).slice(0, 5)

  return (
    <div>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {[
          { label: '총 프로젝트', value: total, unit: 'projects' },
          { label: '카테고리', value: CATS.length, unit: 'categories' },
          { label: '최근 연도', value: Math.max(...items.map(i => Number(i.year))), unit: '' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            padding: '24px 28px', borderRadius: '4px',
          }}>
            <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}>{stat.label}</p>
            <p style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1 }}>{stat.value}</p>
            {stat.unit && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.22)', marginTop: '4px' }}>{stat.unit}</p>}
          </div>
        ))}
      </div>

      {/* Category distribution */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '28px', borderRadius: '4px', marginBottom: '28px' }}>
        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '24px' }}>카테고리 분포</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {CATS.map(cat => {
            const count = items.filter(i => i.cat === cat).length
            const pct = total ? Math.round((count / total) * 100) : 0
            return (
              <div key={cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em' }}>{cat}</span>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{count}개 · {pct}%</span>
                </div>
                <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: CAT_COLOR[cat] || '#00AEEF', borderRadius: '1px', transition: 'width 0.8s ease' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent items */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '28px', borderRadius: '4px' }}>
        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>최근 프로젝트</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {recent.map((item, i) => (
            <div key={item.id} style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '14px 0',
              borderBottom: i < recent.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}>
              <span style={{ fontSize: '10px', color: CAT_COLOR[item.cat] || '#00AEEF', fontWeight: 700, minWidth: '110px', letterSpacing: '0.1em' }}>{item.cat}</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', flex: 1 }}>{item.title}</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Portfolio Tab
// ─────────────────────────────────────────────
function PortfolioTab({
  items,
  onChange,
}: {
  items: Item[]
  onChange: (items: Item[]) => void
}) {
  const [filter, setFilter] = useState('ALL')
  const [modal, setModal] = useState<{ mode: 'add' | 'edit'; item?: Item } | null>(null)

  const visible = filter === 'ALL' ? items : items.filter(i => i.cat === filter)

  const handleAdd = (data: Omit<Item, 'id'>) => {
    const id = Math.max(0, ...items.map(i => i.id)) + 1
    onChange([...items, { id, ...data }])
    setModal(null)
  }

  const handleEdit = (id: number, data: Omit<Item, 'id'>) => {
    onChange(items.map(i => i.id === id ? { id, ...data } : i))
    setModal(null)
  }

  const handleDelete = (id: number) => {
    if (!confirm('이 프로젝트를 삭제하시겠습니까?')) return
    onChange(items.filter(i => i.id !== id))
  }

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['ALL', ...CATS].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? 'rgba(0,174,239,0.15)' : 'transparent',
                border: `1px solid ${filter === cat ? 'rgba(0,174,239,0.4)' : 'rgba(255,255,255,0.1)'}`,
                color: filter === cat ? '#00AEEF' : 'rgba(255,255,255,0.4)',
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                padding: '6px 14px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px',
                transition: 'all 0.2s',
              }}
            >{cat}</button>
          ))}
        </div>
        <button style={S.btn} onClick={() => setModal({ mode: 'add' })}>
          + 프로젝트 추가
        </button>
      </div>

      {/* Count */}
      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: '16px' }}>
        {visible.length}개 프로젝트
      </p>

      {/* Table */}
      <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '40px 120px 1fr 1fr 70px 100px', gap: '0', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '12px 20px' }}>
          {['#', '카테고리', '제목', '설명', '연도', ''].map(h => (
            <span key={h} style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {visible.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '13px' }}>
            프로젝트가 없습니다.
          </div>
        ) : (
          visible.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: 'grid', gridTemplateColumns: '40px 120px 1fr 1fr 70px 100px',
                gap: '0', padding: '16px 20px', alignItems: 'center',
                borderBottom: i < visible.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                background: 'transparent',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>{item.id}</span>
              <span style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em',
                color: CAT_COLOR[item.cat] || '#00AEEF',
                background: `${CAT_COLOR[item.cat] || '#00AEEF'}18`,
                padding: '3px 8px', borderRadius: '2px', display: 'inline-block',
              }}>{item.cat}</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.82)', paddingRight: '16px' }}>{item.title}</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', paddingRight: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.sub}</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{item.year}</span>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setModal({ mode: 'edit', item })}
                  style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '11px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px' }}
                >수정</button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'rgba(239,68,68,0.7)', fontSize: '11px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px' }}
                >삭제</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modal && (
        <ItemModal
          initial={modal.item}
          onSave={data => modal.mode === 'add' ? handleAdd(data) : handleEdit(modal.item!.id, data)}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// Work Tab
// ─────────────────────────────────────────────
const DEFAULT_WORK_CFG: WorkCfg = {
  newdia: {
    ticker:         'VISUAL DESIGN · WEB DESIGN · PHOTOGRAPHY · MARKETING · FRAMING IDEAS INTO IMPACT · NO FILTER · NEW PERSPECTIVE · ',
    ctaUrl:         'https://newdia.co.kr/',
    ctaLabel:       'Visit NEWDIA',
    items:          [],
    typefaceName:   'Inter',
    typefaceFamily: 'Inter, sans-serif',
    palette: [
      { bg: '#0A0A09', label: 'Black',  light: true  },
      { bg: '#CBDB2A', label: 'Lime',   light: false },
      { bg: '#888880', label: 'Gray',   light: true  },
      { bg: '#ffffff', label: 'White',  light: false },
    ],
  },
  corenws: {
    ticker:         'NETWORK INFRA · SECURITY SOLUTION · DATA CENTER · IT OUTSOURCING · 500+ CLIENTS · 99.9% UPTIME · 24/7 SUPPORT · SINCE 2018 · TOTAL ICT SPECIALIST · ',
    ctaUrl:         'https://corenws.co.kr/',
    ctaLabel:       'Visit CORE NETWORKS',
    items: [
      { label: 'NET',  sub: 'Network Infra' },
      { label: 'SEC',  sub: 'Security Solution' },
      { label: 'DATA', sub: 'Data Center' },
      { label: 'MGMT', sub: 'IT Outsourcing' },
    ],
    typefaceName:   'Noto Sans KR',
    typefaceFamily: 'Noto Sans KR, sans-serif',
    palette: [
      { bg: '#030A0F', label: 'Dark',  light: true  },
      { bg: '#007BA8', label: 'Teal',  light: true  },
      { bg: '#00C4E8', label: 'Cyan',  light: false },
      { bg: '#ffffff', label: 'White', light: false },
    ],
  },
  bunyoung: {
    ticker:         'LABEL PRINTING · STICKER MANUFACTURING · ART PAPER · YUPO · FOIL PRESSED · CLEAR · SECURITY LABEL · PRECISION CUTTING · UV COATING · SINCE 1997 · ',
    ctaUrl:         'https://beonyeong.com',
    ctaLabel:       'Visit BEONYEONG',
    items: [
      { label: 'ART',   sub: '아트지 · 범용' },
      { label: 'YUPO',  sub: '유포지 · 방수' },
      { label: 'FOIL',  sub: '형압 · 금은박' },
      { label: 'CLEAR', sub: '투명지 · 고급' },
    ],
    typefaceName:   'Montserrat',
    typefaceFamily: 'Montserrat, sans-serif',
    palette: [
      { bg: '#0A0E1A', label: 'Dark',   light: true  },
      { bg: '#0055CC', label: 'Blue',   light: true  },
      { bg: '#FF6B2B', label: 'Orange', light: true  },
      { bg: '#ffffff', label: 'White',  light: false },
    ],
  },
}

const DEFAULT_SHOWCASE_META = [
  { id: 'newdia',   name: 'NEWDIA',        no: '01' },
  { id: 'corenws',  name: 'CORE NETWORKS', no: '02' },
  { id: 'bunyoung', name: 'BEONYEONG',     no: '03' },
]

type ShowcaseMeta = { id: string; name: string; no: string }

function AddShowcaseModal({ onSave, onClose }: { onSave: (m: ShowcaseMeta, cfg: ShowcaseCfg) => void; onClose: () => void }) {
  const [name, setName] = useState('')
  const [ctaUrl, setCtaUrl] = useState('https://')

  const save = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    const id = trimmed.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
    const newCfg: ShowcaseCfg = {
      ticker: `${trimmed.toUpperCase()} · `,
      ctaUrl,
      ctaLabel: `Visit ${trimmed.toUpperCase()}`,
      items: [],
      typefaceName: 'Inter',
      typefaceFamily: 'Inter, sans-serif',
      palette: [
        { bg: '#0A0A0A', label: 'Dark',  light: true  },
        { bg: '#ffffff', label: 'White', light: false },
      ],
    }
    onSave({ id, name: trimmed.toUpperCase(), no: '' }, newCfg)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ width: '440px', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em' }}>새 쇼케이스 추가</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={S.label}>브랜드명 *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="ex) NEWDIA"
              autoFocus style={S.input}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>
          <div>
            <label style={S.label}>사이트 URL</label>
            <input value={ctaUrl} onChange={e => setCtaUrl(e.target.value)} placeholder="https://example.com"
              style={S.input}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button style={S.btnGhost} onClick={onClose}>취소</button>
          <button style={S.btn} onClick={save}>추가</button>
        </div>
      </div>
    </div>
  )
}

function WorkTab() {
  const [cfg, setCfg] = useState<WorkCfg>(DEFAULT_WORK_CFG)
  const [meta, setMeta] = useState<ShowcaseMeta[]>(DEFAULT_SHOWCASE_META)
  const [open, setOpen] = useState<string>('newdia')
  const [saved, setSaved] = useState(false)
  const [addModal, setAddModal] = useState(false)

  useEffect(() => {
    const storedCfg  = localStorage.getItem('sm_work')
    const storedMeta = localStorage.getItem('sm_work_meta')
    if (storedCfg)  try { setCfg({ ...DEFAULT_WORK_CFG, ...JSON.parse(storedCfg) }) }  catch {}
    if (storedMeta) try { setMeta(JSON.parse(storedMeta)) }                              catch {}
  }, [])

  // ── cfg handlers ──
  const setField = (id: string, key: keyof ShowcaseCfg, val: string) =>
    setCfg(prev => ({ ...prev, [id]: { ...prev[id], [key]: val } }))

  const setItem = (id: string, idx: number, key: keyof ShowcaseItem, val: string) =>
    setCfg(prev => {
      const items = [...prev[id].items]
      items[idx] = { ...items[idx], [key]: val }
      return { ...prev, [id]: { ...prev[id], items } }
    })

  const addItem = (id: string) =>
    setCfg(prev => ({ ...prev, [id]: { ...prev[id], items: [...prev[id].items, { label: '', sub: '' }] } }))

  const removeItem = (id: string, idx: number) =>
    setCfg(prev => ({ ...prev, [id]: { ...prev[id], items: prev[id].items.filter((_, i) => i !== idx) } }))

  // ── palette handlers ──
  const setPaletteItem = (id: string, idx: number, key: keyof PaletteItem, val: string | boolean) =>
    setCfg(prev => {
      const palette = [...prev[id].palette]
      palette[idx] = { ...palette[idx], [key]: val }
      return { ...prev, [id]: { ...prev[id], palette } }
    })

  const addPaletteItem = (id: string) =>
    setCfg(prev => ({ ...prev, [id]: { ...prev[id], palette: [...prev[id].palette, { bg: '#888888', label: 'Color', light: false }] } }))

  const removePaletteItem = (id: string, idx: number) =>
    setCfg(prev => ({ ...prev, [id]: { ...prev[id], palette: prev[id].palette.filter((_, i) => i !== idx) } }))

  // ── showcase add / delete ──
  const addShowcase = (m: ShowcaseMeta, newCfg: ShowcaseCfg) => {
    const no = String(meta.length + 1).padStart(2, '0')
    setMeta(prev => [...prev, { ...m, no }])
    setCfg(prev => ({ ...prev, [m.id]: newCfg }))
    setOpen(m.id)
    setAddModal(false)
  }

  const deleteShowcase = (id: string) => {
    if (!confirm(`"${meta.find(m => m.id === id)?.name}" 쇼케이스를 삭제하시겠습니까?`)) return
    const next = meta.filter(m => m.id !== id).map((m, i) => ({ ...m, no: String(i + 1).padStart(2, '0') }))
    setMeta(next)
    setCfg(prev => { const n = { ...prev }; delete n[id]; return n })
    setOpen(next[0]?.id ?? '')
  }

  const save = () => {
    localStorage.setItem('sm_work', JSON.stringify(cfg))
    localStorage.setItem('sm_work_meta', JSON.stringify(meta))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
          티커·CTA·팔레트·서비스 항목 수정. 저장 후 새로고침하면 반영됩니다.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {saved && <span style={{ fontSize: '12px', color: '#34d399' }}>✓ 저장됨</span>}
          <button style={S.btnGhost} onClick={() => setAddModal(true)}>+ 쇼케이스 추가</button>
          <button style={S.btn} onClick={save}>전체 저장</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {meta.map(({ id, name, no }) => {
          const c = cfg[id]
          if (!c) return null
          const isOpen = open === id
          return (
            <div key={id} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>

              {/* Accordion header */}
              <div style={{
                display: 'flex', alignItems: 'center',
                background: isOpen ? 'rgba(0,174,239,0.06)' : 'rgba(255,255,255,0.02)',
                borderBottom: isOpen ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}>
                <button
                  onClick={() => setOpen(isOpen ? '' : id)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '18px 24px', background: 'transparent',
                    border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '9px', color: 'rgba(0,174,239,0.6)', fontWeight: 700, letterSpacing: '0.16em', minWidth: '28px' }}>{no}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', color: '#fff', flex: 1 }}>{name}</span>
                  <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.3)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>∨</span>
                </button>
                <button
                  onClick={() => deleteShowcase(id)}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(239,68,68,0.45)', fontSize: '18px', padding: '18px 20px', cursor: 'pointer', lineHeight: 1 }}
                  title="삭제"
                >×</button>
              </div>

              {/* Accordion body */}
              {isOpen && (
                <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>

                  {/* CTA */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={S.label}>CTA URL</label>
                      <input value={c.ctaUrl} onChange={e => setField(id, 'ctaUrl', e.target.value)}
                        style={S.input}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                    <div>
                      <label style={S.label}>CTA 버튼 텍스트</label>
                      <input value={c.ctaLabel} onChange={e => setField(id, 'ctaLabel', e.target.value)}
                        style={S.input}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                  </div>

                  {/* Typeface */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={S.label}>Brand Typeface 이름</label>
                      <input value={c.typefaceName} onChange={e => setField(id, 'typefaceName', e.target.value)}
                        placeholder="ex) Inter" style={S.input}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                    <div>
                      <label style={S.label}>Font Family (CSS)</label>
                      <input value={c.typefaceFamily} onChange={e => setField(id, 'typefaceFamily', e.target.value)}
                        placeholder="ex) Inter, sans-serif" style={S.input}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '12px 16px', borderRadius: '2px', display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', minWidth: '60px' }}>미리보기</span>
                    <span style={{ fontSize: '22px', fontWeight: 900, color: '#fff', fontFamily: c.typefaceFamily, letterSpacing: '-0.02em' }}>Aa Bb Cc</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: c.typefaceFamily }}>{c.typefaceName}</span>
                  </div>

                  {/* Ticker */}
                  <div>
                    <label style={S.label}>티커 텍스트 (스크롤 자막)</label>
                    <input value={c.ticker} onChange={e => setField(id, 'ticker', e.target.value)}
                      style={S.input}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginTop: '6px' }}>항목 사이를 " · " 로 구분, 끝에 " · " 추가</p>
                  </div>

                  {/* Brand Palette */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ ...S.label, marginBottom: 0 }}>Brand Palette</label>
                      <button onClick={() => addPaletteItem(id)} style={{ ...S.btnGhost, fontSize: '10px', padding: '5px 12px' }}>+ 컬러 추가</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {c.palette.map((sw, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '44px 120px 1fr auto 36px', gap: '8px', alignItems: 'center' }}>
                          {/* Color picker + swatch */}
                          <div style={{ position: 'relative', width: '44px', height: '36px', borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', flexShrink: 0 }}>
                            <div style={{ position: 'absolute', inset: 0, background: sw.bg }} />
                            <input
                              type="color"
                              value={sw.bg}
                              onChange={e => setPaletteItem(id, idx, 'bg', e.target.value)}
                              style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                            />
                          </div>
                          {/* Hex input */}
                          <input
                            value={sw.bg}
                            onChange={e => setPaletteItem(id, idx, 'bg', e.target.value)}
                            placeholder="#000000"
                            style={{ ...S.input, fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                          />
                          {/* Label */}
                          <input
                            value={sw.label}
                            onChange={e => setPaletteItem(id, idx, 'label', e.target.value)}
                            placeholder="Color Name"
                            style={{ ...S.input, fontSize: '12px' }}
                            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                          />
                          {/* Light/Dark toggle */}
                          <button
                            onClick={() => setPaletteItem(id, idx, 'light', !sw.light)}
                            title="텍스트 색상 (밝은 배경=Dark text, 어두운 배경=Light text)"
                            style={{
                              background: sw.light ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.5)',
                              border: '1px solid rgba(255,255,255,0.15)',
                              color: sw.light ? '#fff' : 'rgba(255,255,255,0.4)',
                              fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
                              padding: '0 10px', height: '36px', whiteSpace: 'nowrap',
                              cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px',
                            }}
                          >{sw.light ? 'LIGHT' : 'DARK'}</button>
                          {/* Remove */}
                          <button
                            onClick={() => removePaletteItem(id, idx)}
                            style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'rgba(239,68,68,0.7)', fontSize: '16px', width: '36px', height: '36px', cursor: 'pointer', borderRadius: '2px', lineHeight: 1 }}
                          >×</button>
                        </div>
                      ))}
                    </div>
                    {/* Palette preview */}
                    {c.palette.length > 0 && (
                      <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                        {c.palette.map((sw, i) => (
                          <div key={i} style={{ flex: 1, height: '28px', background: sw.bg, borderRadius: '2px' }} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Service items */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ ...S.label, marginBottom: 0 }}>서비스 / 소재 항목</label>
                      <button onClick={() => addItem(id)} style={{ ...S.btnGhost, fontSize: '10px', padding: '5px 12px' }}>+ 추가</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {c.items.length === 0 && (
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', padding: '8px 0' }}>항목 없음 (NEWDIA처럼 숨겨집니다)</p>
                      )}
                      {c.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 36px', gap: '8px', alignItems: 'center' }}>
                          <input
                            value={item.label}
                            onChange={e => setItem(id, idx, 'label', e.target.value)}
                            placeholder="라벨 (4자)"
                            style={{ ...S.input, fontSize: '12px' }}
                            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                          />
                          <input
                            value={item.sub}
                            onChange={e => setItem(id, idx, 'sub', e.target.value)}
                            placeholder="설명"
                            style={{ ...S.input, fontSize: '12px' }}
                            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                          />
                          <button
                            onClick={() => removeItem(id, idx)}
                            style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'rgba(239,68,68,0.7)', fontSize: '16px', padding: '8px', cursor: 'pointer', borderRadius: '2px', lineHeight: 1 }}
                          >×</button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          )
        })}
      </div>

      {addModal && <AddShowcaseModal onSave={addShowcase} onClose={() => setAddModal(false)} />}
    </div>
  )
}

// ─────────────────────────────────────────────
// Inquiries Tab (5 sub-tabs)
// ─────────────────────────────────────────────
type InqSubTab = '상담통계' | '상담관리' | '방문자통계' | '상담옵션관리' | '관심서비스 관리'

const DEFAULT_CONTACT_OPTS: ContactOptions = {
  heading:    "Let's find your\nperspective.",
  subheading: 'Every brand starts with a different perspective.',
  subKo:      '브랜드는 새로운 시선에서 시작됩니다.',
  btnText:    'GET IN TOUCH',
  showPhone:  true,
  showService: true,
  successMsg: '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
}

const DEFAULT_CONTACT_SERVICES: ContactService[] = [
  { id: '1', name: '로고 디자인',       description: '브랜드 아이덴티티의 핵심, 로고 디자인',     active: true },
  { id: '2', name: '브랜드 아이덴티티', description: '일관된 브랜드 경험을 위한 디자인 시스템',   active: true },
  { id: '3', name: '웹사이트 제작',     description: '반응형 웹사이트 기획 및 개발',              active: true },
  { id: '4', name: '인쇄물 디자인',     description: '명함, 브로셔, 카탈로그 등',                active: true },
  { id: '5', name: 'SNS 콘텐츠',       description: '소셜 미디어 콘텐츠 디자인',                 active: true },
  { id: '6', name: '기타',             description: '기타 문의사항',                             active: true },
]

const INQ_STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  new:        { label: '신규',     color: '#00AEEF',               bg: 'rgba(0,174,239,0.12)' },
  contacted:  { label: '연락완료', color: '#F59E0B',               bg: 'rgba(245,158,11,0.12)' },
  contracted: { label: '계약',     color: '#34d399',               bg: 'rgba(52,211,153,0.12)' },
  held:       { label: '보류',     color: 'rgba(255,255,255,0.4)', bg: 'rgba(255,255,255,0.06)' },
  cancelled:  { label: '무산',     color: '#EF4444',               bg: 'rgba(239,68,68,0.12)' },
  read:       { label: '연락완료', color: '#F59E0B',               bg: 'rgba(245,158,11,0.12)' },
  replied:    { label: '계약',     color: '#34d399',               bg: 'rgba(52,211,153,0.12)' },
}

// SVG line/area chart for visitor stats
function VisitorLineChart({ data }: { data: { date: string; count: number }[] }) {
  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date)).slice(-30)
  if (sorted.length === 0) return <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', padding: '24px 0' }}>데이터 없음</p>
  const W = 100, H = 60
  const maxVal = Math.max(1, ...sorted.map(v => v.count))
  const pad = { t: 8, b: 16, l: 2, r: 2 }
  const toX = (i: number) => pad.l + (sorted.length <= 1 ? (W - pad.l - pad.r) / 2 : (i / (sorted.length - 1)) * (W - pad.l - pad.r))
  const toY = (v: number) => pad.t + (1 - v / maxVal) * (H - pad.t - pad.b)
  const pts = sorted.map((v, i) => `${toX(i)},${toY(v.count)}`).join(' ')
  const area = `${toX(0)},${H - pad.b} ${pts} ${toX(sorted.length - 1)},${H - pad.b}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '150px' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00AEEF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00AEEF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map(t => (
        <line key={t} x1={pad.l} y1={pad.t + t * (H - pad.t - pad.b)} x2={W - pad.r} y2={pad.t + t * (H - pad.t - pad.b)} stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
      ))}
      <polygon points={area} fill="url(#vg)" />
      <polyline points={pts} fill="none" stroke="#00AEEF" strokeWidth="0.8" strokeLinejoin="round" strokeLinecap="round" />
      {sorted.map((v, i) => <circle key={i} cx={toX(i)} cy={toY(v.count)} r="1.2" fill="#00AEEF" />)}
    </svg>
  )
}

// Service edit modal
function ServiceEditModal({ svc, onSave, onClose }: {
  svc: ContactService
  onSave: (updated: ContactService) => void
  onClose: () => void
}) {
  const [name, setName] = useState(svc.name)
  const [desc, setDesc] = useState(svc.description || '')
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ width: '440px', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.1)', padding: '28px', borderRadius: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700 }}>서비스 수정</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={S.label}>서비스명</label>
            <input value={name} onChange={e => setName(e.target.value)} style={S.input}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>
          <div>
            <label style={S.label}>설명</label>
            <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="서비스 간략 설명" style={S.input}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button style={S.btnGhost} onClick={onClose}>취소</button>
          <button style={S.btn} onClick={() => onSave({ ...svc, name: name.trim() || svc.name, description: desc.trim() })}>저장</button>
        </div>
      </div>
    </div>
  )
}

function InquiryDetailModal({ inq, onClose, onStatusChange, onDelete }: {
  inq: Inquiry
  onClose: () => void
  onStatusChange: (id: string, status: Inquiry['status']) => void
  onDelete: (id: string) => void
}) {
  const meta = INQ_STATUS_META[inq.status] ?? INQ_STATUS_META['new']
  const dt = new Date(inq.createdAt)
  const dateStr = dt.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
  const timeStr = dt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  const STATUSES = ['new', 'contacted', 'contracted', 'held', 'cancelled'] as const

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{
        width: '600px', maxWidth: '95vw', background: '#0e0e0e',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px',
        maxHeight: '88vh', overflowY: 'auto',
      }}>
        <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>{inq.name}</h3>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', padding: '3px 10px', background: meta.bg, color: meta.color, borderRadius: '2px' }}>{meta.label}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{inq.email}</p>
              {inq.phone && <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{inq.phone}</p>}
              {inq.company && <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{inq.company}{inq.budget ? ` · ${inq.budget}` : ''}</p>}
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginTop: '2px', letterSpacing: '0.04em' }}>{dateStr} {timeStr}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '22px', cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}>×</button>
        </div>

        {inq.services && inq.services.length > 0 && (
          <div style={{ padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.5)', marginBottom: '10px' }}>관심 서비스</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {inq.services.map(s => (
                <span key={s} style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', padding: '4px 12px', background: 'rgba(0,174,239,0.1)', color: '#00AEEF', borderRadius: '2px' }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.5)', marginBottom: '14px' }}>Message</p>
          <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{inq.message}</p>
        </div>

        <div style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {STATUSES.map(s => {
              const sm = INQ_STATUS_META[s]
              return (
                <button key={s} onClick={() => onStatusChange(inq.id, s)} style={{
                  background: inq.status === s ? sm.bg : 'transparent',
                  border: `1px solid ${inq.status === s ? sm.color : 'rgba(255,255,255,0.1)'}`,
                  color: inq.status === s ? sm.color : 'rgba(255,255,255,0.35)',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
                  padding: '7px 14px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px', transition: 'all 0.2s',
                }}>{sm.label}</button>
              )
            })}
          </div>
          <button onClick={() => { if (confirm('이 문의를 삭제하시겠습니까?')) { onDelete(inq.id); onClose() } }}
            style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'rgba(239,68,68,0.7)', fontSize: '11px', padding: '7px 16px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px' }}>삭제</button>
        </div>
      </div>
    </div>
  )
}

function InquiriesTab() {
  const [subTab, setSubTab] = useState<InqSubTab>('상담통계')
  const [list, setList] = useState<Inquiry[]>([])
  const [statPeriod, setStatPeriod] = useState<'month' | 'last' | 'all'>('all')
  const [mgmtStatus, setMgmtStatus] = useState<'all' | Inquiry['status']>('all')
  const [mgmtDateFrom, setMgmtDateFrom] = useState('')
  const [mgmtDateTo, setMgmtDateTo] = useState('')
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [contactOpts, setContactOpts] = useState<ContactOptions>(DEFAULT_CONTACT_OPTS)
  const [contactServices, setContactServices] = useState<ContactService[]>(DEFAULT_CONTACT_SERVICES)
  const [optsSaved, setOptsSaved] = useState(false)
  const [svcSaved, setSvcSaved] = useState(false)
  const [visitors, setVisitors] = useState<{ date: string; count: number }[]>([])
  const [editingSvc, setEditingSvc] = useState<ContactService | null>(null)

  useEffect(() => {
    const loadInq = () => {
      const stored = localStorage.getItem('sm_inquiries')
      if (stored) try { setList(JSON.parse(stored)) } catch {}
    }
    loadInq()
    window.addEventListener('storage', loadInq)
    const o = localStorage.getItem('sm_contact_options')
    if (o) try { setContactOpts({ ...DEFAULT_CONTACT_OPTS, ...JSON.parse(o) }) } catch {}
    const s = localStorage.getItem('sm_contact_services')
    if (s) try { setContactServices(JSON.parse(s)) } catch {}
    const v = localStorage.getItem('sm_visitors')
    if (v) try { setVisitors(JSON.parse(v)) } catch {}
    return () => window.removeEventListener('storage', loadInq)
  }, [])

  const saveInquiries = (next: Inquiry[]) => {
    setList(next)
    localStorage.setItem('sm_inquiries', JSON.stringify(next))
  }
  const changeStatus = (id: string, status: Inquiry['status']) => {
    const next = list.map(i => i.id === id ? { ...i, status } : i)
    saveInquiries(next)
    setSelected(sel => sel?.id === id ? { ...sel, status } : sel)
  }
  const deleteInq = (id: string) => saveInquiries(list.filter(i => i.id !== id))
  const openDetail = (inq: Inquiry) => {
    setSelected(inq)
    if (inq.status === 'new') changeStatus(inq.id, 'contacted')
  }
  const saveOpts = () => {
    localStorage.setItem('sm_contact_options', JSON.stringify(contactOpts))
    setOptsSaved(true); setTimeout(() => setOptsSaved(false), 2500)
  }
  const saveServices = () => {
    localStorage.setItem('sm_contact_services', JSON.stringify(contactServices))
    setSvcSaved(true); setTimeout(() => setSvcSaved(false), 2500)
  }
  const addService = () =>
    setContactServices(prev => [...prev, { id: Date.now().toString(), name: '', description: '', active: true }])
  const removeService = (id: string) => setContactServices(prev => prev.filter(s => s.id !== id))
  const updateService = (id: string, key: keyof ContactService, val: string | boolean) =>
    setContactServices(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s))

  const SUB_TABS: InqSubTab[] = ['상담통계', '상담관리', '방문자통계', '상담옵션관리', '관심서비스 관리']

  // ── 상담통계 계산
  const now = new Date()
  const periodList = (() => {
    if (statPeriod === 'month') {
      const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
      return list.filter(i => i.createdAt.startsWith(ym))
    }
    if (statPeriod === 'last') {
      const d = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      return list.filter(i => i.createdAt.startsWith(ym))
    }
    return list
  })()
  const monthlyData = (() => {
    const result: { label: string; count: number }[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      result.push({ label: `${d.getMonth() + 1}월`, count: list.filter(x => x.createdAt.startsWith(ym)).length })
    }
    return result
  })()
  const maxMonthly = Math.max(1, ...monthlyData.map(m => m.count))
  const statusDist = (['new', 'contacted', 'contracted', 'held', 'cancelled'] as const).map(s => ({
    s, label: INQ_STATUS_META[s].label, color: INQ_STATUS_META[s].color,
    count: periodList.filter(i => i.status === s).length,
  }))
  const budgetDist: Record<string, number> = {}
  periodList.forEach(i => { if (i.budget) budgetDist[i.budget] = (budgetDist[i.budget] ?? 0) + 1 })
  const maxBudget = Math.max(1, ...Object.values(budgetDist))
  const svcCount: Record<string, number> = {}
  periodList.forEach(inq => { (inq.services ?? []).forEach(s => { svcCount[s] = (svcCount[s] ?? 0) + 1 }) })
  const maxSvc = Math.max(1, ...Object.values(svcCount))

  // ── 상담관리 필터
  const STATUSES_ALL: { key: 'all' | Inquiry['status']; label: string }[] = [
    { key: 'all', label: '전체' }, { key: 'new', label: '신규' }, { key: 'contacted', label: '연락완료' },
    { key: 'contracted', label: '계약' }, { key: 'held', label: '보류' }, { key: 'cancelled', label: '무산' },
  ]
  const mgmtVisible = list.filter(i => {
    if (mgmtStatus !== 'all' && i.status !== mgmtStatus) return false
    if (mgmtDateFrom && i.createdAt.slice(0, 10) < mgmtDateFrom) return false
    if (mgmtDateTo && i.createdAt.slice(0, 10) > mgmtDateTo) return false
    return true
  })
  const downloadCSV = () => {
    const rows = [
      ['이름', '이메일', '연락처', '회사', '예산', '관심서비스', '메시지', '상태', '날짜'],
      ...mgmtVisible.map(i => [
        i.name, i.email, i.phone ?? '', i.company ?? '', i.budget ?? '',
        (i.services ?? []).join(';'), i.message.replace(/\n/g, ' '),
        INQ_STATUS_META[i.status]?.label ?? i.status,
        new Date(i.createdAt).toLocaleDateString('ko-KR'),
      ]),
    ]
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url
    a.download = `inquiries_${new Date().toISOString().slice(0, 10)}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  // ── 방문자통계
  const totalVisitors = visitors.reduce((acc, v) => acc + v.count, 0)
  const todayKey = new Date().toISOString().slice(0, 10)
  const todayVisitors = visitors.find(v => v.date === todayKey)?.count ?? 0
  const sortedVisitors = [...visitors].sort((a, b) => b.date.localeCompare(a.date))
  const DOW = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div>
      {/* Sub-tab navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '28px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {SUB_TABS.map(t => (
          <button key={t} onClick={() => setSubTab(t)} style={{
            padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: subTab === t ? '#00AEEF' : 'rgba(255,255,255,0.3)',
            borderBottom: `2px solid ${subTab === t ? '#00AEEF' : 'transparent'}`,
            marginBottom: '-1px', whiteSpace: 'nowrap', fontFamily: 'inherit',
            transition: 'color 0.2s, border-color 0.2s',
          }}>{t}</button>
        ))}
      </div>

      {/* ── 상담통계 ── */}
      {subTab === '상담통계' && (
        <div>
          {/* 기간 필터 */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '22px' }}>
            {([{ key: 'month', label: '이번달' }, { key: 'last', label: '지난달' }, { key: 'all', label: '전체' }] as const).map(p => (
              <button key={p.key} onClick={() => setStatPeriod(p.key)} style={{
                background: statPeriod === p.key ? 'rgba(0,174,239,0.14)' : 'transparent',
                border: `1px solid ${statPeriod === p.key ? 'rgba(0,174,239,0.4)' : 'rgba(255,255,255,0.1)'}`,
                color: statPeriod === p.key ? '#00AEEF' : 'rgba(255,255,255,0.4)',
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                padding: '6px 14px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px',
              }}>{p.label}</button>
            ))}
          </div>
          {/* 5개 스탯카드 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '10px', marginBottom: '20px' }}>
            {[
              { label: '총 문의', value: periodList.length, accent: false },
              { label: '신규', value: periodList.filter(i => i.status === 'new').length, accent: true },
              { label: '연락완료', value: periodList.filter(i => i.status === 'contacted').length, accent: false },
              { label: '계약', value: periodList.filter(i => i.status === 'contracted').length, accent: false },
              { label: '보류/무산', value: periodList.filter(i => i.status === 'held' || i.status === 'cancelled').length, accent: false },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.accent && s.value > 0 ? 'rgba(0,174,239,0.3)' : 'rgba(255,255,255,0.07)'}`, padding: '16px 18px', borderRadius: '4px' }}>
                <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: s.accent && s.value > 0 ? 'rgba(0,174,239,0.7)' : 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>{s.label}</p>
                <p style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', color: s.accent && s.value > 0 ? '#00AEEF' : '#fff', lineHeight: 1 }}>{s.value}</p>
              </div>
            ))}
          </div>
          {/* 월별 막대차트 6개월 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '22px 26px', borderRadius: '4px', marginBottom: '16px' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '18px' }}>월별 문의 추이 (최근 6개월)</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '90px' }}>
              {monthlyData.map(m => (
                <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)' }}>{m.count > 0 ? m.count : ''}</span>
                  <div style={{ width: '100%', background: m.count > 0 ? '#00AEEF' : 'rgba(255,255,255,0.08)', borderRadius: '2px 2px 0 0', height: `${(m.count / maxMonthly) * 56 + (m.count > 0 ? 4 : 2)}px`, minHeight: '2px', transition: 'height 0.5s ease' }} />
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            {/* 상태분포 */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '20px 22px', borderRadius: '4px' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}>상태 분포</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {statusDist.map(d => (
                  <div key={d.s}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ fontSize: '11px', color: d.color }}>{d.label}</span>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{d.count}</span>
                    </div>
                    <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px' }}>
                      <div style={{ height: '100%', width: `${periodList.length ? (d.count / periodList.length) * 100 : 0}%`, background: d.color, borderRadius: '1px', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 예산분포 */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '20px 22px', borderRadius: '4px' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}>예산 분포</p>
              {Object.keys(budgetDist).length === 0 ? (
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>데이터 없음</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {Object.entries(budgetDist).sort((a, b) => b[1] - a[1]).map(([budget, count]) => (
                    <div key={budget}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{budget}</span>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{count}건</span>
                      </div>
                      <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px' }}>
                        <div style={{ height: '100%', width: `${(count / maxBudget) * 100}%`, background: '#a78bfa', borderRadius: '1px', transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* 서비스 빈도 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '22px 26px', borderRadius: '4px' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '18px' }}>관심 서비스별 문의 현황</p>
            {Object.keys(svcCount).length === 0 ? (
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>데이터 없음</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                {Object.entries(svcCount).sort((a, b) => b[1] - a[1]).map(([name, count]) => (
                  <div key={name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{name}</span>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{count}건</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: `${(count / maxSvc) * 100}%`, background: '#00AEEF', borderRadius: '2px', transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 상담관리 ── */}
      {subTab === '상담관리' && (
        <div>
          {/* 6개 상태 요약카드 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '8px', marginBottom: '18px' }}>
            {STATUSES_ALL.map(f => {
              const cnt = f.key === 'all' ? list.length : list.filter(i => i.status === f.key).length
              const m = f.key !== 'all' ? INQ_STATUS_META[f.key] : null
              const isActive = mgmtStatus === f.key
              return (
                <button key={f.key} onClick={() => setMgmtStatus(f.key)} style={{
                  background: isActive ? (m ? m.bg : 'rgba(0,174,239,0.12)') : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? ((m ? m.color : '#00AEEF') + '55') : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '4px', padding: '12px 10px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  transition: 'all 0.2s',
                }}>
                  <p style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: isActive ? (m ? m.color : '#00AEEF') : 'rgba(255,255,255,0.3)', marginBottom: '5px' }}>{f.label}</p>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: isActive ? (m ? m.color : '#00AEEF') : '#fff', lineHeight: 1 }}>{cnt}</p>
                </button>
              )
            })}
          </div>
          {/* 날짜 필터 + CSV */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input type="date" value={mgmtDateFrom} onChange={e => setMgmtDateFrom(e.target.value)}
              style={{ ...S.input, width: 'auto', fontSize: '12px', padding: '7px 10px' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>~</span>
            <input type="date" value={mgmtDateTo} onChange={e => setMgmtDateTo(e.target.value)}
              style={{ ...S.input, width: 'auto', fontSize: '12px', padding: '7px 10px' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            {(mgmtDateFrom || mgmtDateTo) && (
              <button onClick={() => { setMgmtDateFrom(''); setMgmtDateTo('') }} style={{ ...S.btnGhost, padding: '7px 12px', fontSize: '10px' }}>초기화</button>
            )}
            <button onClick={downloadCSV} style={{ ...S.btnGhost, fontSize: '10px', padding: '7px 16px', marginLeft: 'auto' }}>CSV 다운로드</button>
          </div>
          {mgmtVisible.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)' }}>해당 조건의 문의가 없습니다.</p>
            </div>
          ) : (
            <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 130px 70px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '11px 20px' }}>
                {['이름 / 이메일', '날짜', '상태', ''].map(h => (
                  <span key={h} style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>{h}</span>
                ))}
              </div>
              {mgmtVisible.map((inq, i) => {
                const dt = new Date(inq.createdAt)
                const m = INQ_STATUS_META[inq.status]
                return (
                  <div key={inq.id} style={{
                    display: 'grid', gridTemplateColumns: '1fr 160px 130px 70px',
                    padding: '13px 20px', alignItems: 'center',
                    borderBottom: i < mgmtVisible.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    background: inq.status === 'new' ? 'rgba(0,174,239,0.03)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.background = inq.status === 'new' ? 'rgba(0,174,239,0.03)' : 'transparent')}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {inq.status === 'new' && <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00AEEF', flexShrink: 0 }} />}
                        <span style={{ fontSize: '13px', color: '#fff', fontWeight: inq.status === 'new' ? 600 : 400 }}>{inq.name}</span>
                      </div>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px', paddingLeft: inq.status === 'new' ? '13px' : '0' }}>{inq.email}</p>
                    </div>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                      {dt.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} {dt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <select value={inq.status} onChange={e => changeStatus(inq.id, e.target.value as Inquiry['status'])}
                      onClick={e => e.stopPropagation()}
                      style={{
                        background: m?.bg ?? 'transparent', border: `1px solid ${(m?.color ?? '#fff') + '44'}`,
                        color: m?.color ?? '#fff', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em',
                        padding: '5px 8px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px',
                        outline: 'none', appearance: 'none', width: '100px',
                      }}>
                      {(['new', 'contacted', 'contracted', 'held', 'cancelled'] as const).map(s => (
                        <option key={s} value={s} style={{ background: '#111', color: '#fff' }}>{INQ_STATUS_META[s].label}</option>
                      ))}
                    </select>
                    <button onClick={() => openDetail(inq)} style={{
                      background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)',
                      fontSize: '10px', padding: '5px 8px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px',
                    }}>보기</button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ── 방문자통계 ── */}
      {subTab === '방문자통계' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: '총 방문자', value: totalVisitors },
              { label: '오늘 방문', value: todayVisitors },
              { label: '기록된 날수', value: visitors.length },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '22px 24px', borderRadius: '4px' }}>
                <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>{s.label}</p>
                <p style={{ fontSize: '34px', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', lineHeight: 1 }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '22px 26px', borderRadius: '4px', marginBottom: '18px' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '14px' }}>일별 방문 추이 (최근 30일)</p>
            <VisitorLineChart data={visitors} />
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '11px 20px' }}>
              {['날짜', '요일', '방문수'].map(h => <span key={h} style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>{h}</span>)}
            </div>
            {sortedVisitors.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>방문 데이터가 없습니다. 메인 페이지 방문 시 자동으로 기록됩니다.</p>
              </div>
            ) : sortedVisitors.slice(0, 30).map((v, i, arr) => {
              const d = new Date(v.date)
              return (
                <div key={v.date} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px', padding: '10px 20px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{v.date}</span>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{DOW[d.getDay()]}요일</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: v.date === todayKey ? '#00AEEF' : '#fff' }}>{v.count}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── 상담옵션관리 ── */}
      {subTab === '상담옵션관리' && (
        <div style={{ maxWidth: '560px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '28px', borderRadius: '4px', marginBottom: '20px' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.6)', marginBottom: '24px' }}>Contact 섹션 옵션</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={S.label}>헤딩 텍스트 (줄바꿈: \n)</label>
                <textarea rows={2} value={contactOpts.heading} onChange={e => setContactOpts(o => ({ ...o, heading: e.target.value }))}
                  style={{ ...S.input, resize: 'vertical' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <div>
                <label style={S.label}>서브 헤딩 (영문)</label>
                <input value={contactOpts.subheading} onChange={e => setContactOpts(o => ({ ...o, subheading: e.target.value }))} style={S.input}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <div>
                <label style={S.label}>서브 헤딩 (국문)</label>
                <input value={contactOpts.subKo} onChange={e => setContactOpts(o => ({ ...o, subKo: e.target.value }))} style={S.input}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <div>
                <label style={S.label}>CTA 버튼 텍스트</label>
                <input value={contactOpts.btnText} onChange={e => setContactOpts(o => ({ ...o, btnText: e.target.value }))} style={S.input}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <div>
                <label style={S.label}>완료 메시지</label>
                <input value={contactOpts.successMsg} onChange={e => setContactOpts(o => ({ ...o, successMsg: e.target.value }))} style={S.input}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {([{ key: 'showPhone' as const, label: '연락처 필드' }, { key: 'showService' as const, label: '관심서비스 선택' }]).map(({ key, label }) => (
                  <button key={key} onClick={() => setContactOpts(o => ({ ...o, [key]: !o[key] }))} style={{
                    background: contactOpts[key] ? 'rgba(0,174,239,0.14)' : 'transparent',
                    border: `1px solid ${contactOpts[key] ? 'rgba(0,174,239,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    color: contactOpts[key] ? '#00AEEF' : 'rgba(255,255,255,0.35)',
                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                    padding: '8px 16px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px', transition: 'all 0.2s',
                  }}>{label}: {contactOpts[key] ? 'ON' : 'OFF'}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button style={S.btn} onClick={saveOpts}>설정 저장</button>
            {optsSaved && <span style={{ fontSize: '12px', color: '#34d399' }}>✓ 저장됨</span>}
          </div>
        </div>
      )}

      {/* ── 관심서비스 관리 ── */}
      {subTab === '관심서비스 관리' && (
        <div style={{ maxWidth: '560px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '24px 28px', borderRadius: '4px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.6)' }}>서비스 목록</p>
              <button onClick={addService} style={{ ...S.btnGhost, fontSize: '10px', padding: '5px 12px' }}>+ 추가</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {contactServices.length === 0 && (
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', padding: '8px 0' }}>서비스 없음</p>
              )}
              {contactServices.map(svc => (
                <div key={svc.id} style={{ display: 'grid', gridTemplateColumns: '22px 1fr auto auto auto', gap: '8px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', userSelect: 'none', cursor: 'grab' }}>≡</span>
                  <div>
                    <p style={{ fontSize: '13px', color: '#fff', fontWeight: 500, lineHeight: 1.3 }}>{svc.name || <span style={{ color: 'rgba(255,255,255,0.2)' }}>이름 없음</span>}</p>
                    {svc.description && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{svc.description}</p>}
                  </div>
                  <button onClick={() => updateService(svc.id, 'active', !svc.active)} style={{
                    background: svc.active ? 'rgba(0,174,239,0.14)' : 'transparent',
                    border: `1px solid ${svc.active ? 'rgba(0,174,239,0.4)' : 'rgba(255,255,255,0.12)'}`,
                    color: svc.active ? '#00AEEF' : 'rgba(255,255,255,0.3)',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
                    padding: '0 10px', height: '30px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px', transition: 'all 0.2s',
                  }}>{svc.active ? 'ON' : 'OFF'}</button>
                  <button onClick={() => setEditingSvc(svc)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '11px', padding: '0 12px', height: '30px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px' }}>수정</button>
                  <button onClick={() => removeService(svc.id)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'rgba(239,68,68,0.7)', fontSize: '16px', width: '30px', height: '30px', cursor: 'pointer', borderRadius: '2px', lineHeight: 1 }}>×</button>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button style={S.btn} onClick={saveServices}>저장</button>
            {svcSaved && <span style={{ fontSize: '12px', color: '#34d399' }}>✓ 저장됨</span>}
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '14px', lineHeight: 1.6 }}>
            ※ 저장 후 사이트 새로고침 시 반영됩니다.<br />
            OFF 서비스는 문의 폼에 표시되지 않습니다.
          </p>
        </div>
      )}

      {selected && (
        <InquiryDetailModal
          inq={selected}
          onClose={() => setSelected(null)}
          onStatusChange={changeStatus}
          onDelete={deleteInq}
        />
      )}
      {editingSvc && (
        <ServiceEditModal
          svc={editingSvc}
          onSave={updated => { setContactServices(prev => prev.map(s => s.id === updated.id ? updated : s)); setEditingSvc(null) }}
          onClose={() => setEditingSvc(null)}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// Settings Tab
// ─────────────────────────────────────────────
function SettingsTab() {
  const [info, setInfo] = useState({
    email: 'studo.monster2026@gmail.com',
    location: 'Seoul, Korea',
    availability: 'Open to New Projects',
    instagram: '#',
    behance: '#',
    linkedin: '#',
    email_link: '#',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('sm_settings')
    if (stored) try { setInfo(JSON.parse(stored)) } catch {}
  }, [])

  const set = (k: string, v: string) => setInfo(f => ({ ...f, [k]: v }))

  const save = () => {
    localStorage.setItem('sm_settings', JSON.stringify(info))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const fields: { key: keyof typeof info; label: string; placeholder: string }[] = [
    { key: 'email',        label: 'Email 주소',       placeholder: 'studio@example.com' },
    { key: 'location',     label: '위치',              placeholder: 'Seoul, Korea' },
    { key: 'availability', label: '프로젝트 상태',     placeholder: 'Open to New Projects' },
    { key: 'instagram',    label: 'Instagram URL',     placeholder: 'https://instagram.com/...' },
    { key: 'behance',      label: 'Behance URL',       placeholder: 'https://behance.net/...' },
    { key: 'linkedin',     label: 'LinkedIn URL',      placeholder: 'https://linkedin.com/...' },
    { key: 'email_link',   label: 'Email 링크 (mailto)', placeholder: 'mailto:studio@example.com' },
  ]

  return (
    <div>
      <div style={{ maxWidth: '560px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          padding: '32px', borderRadius: '4px', marginBottom: '20px',
        }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,174,239,0.6)', marginBottom: '24px' }}>
            Studio Info
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {fields.map(f => (
              <div key={f.key}>
                <label style={S.label}>{f.label}</label>
                <input
                  value={info[f.key]}
                  onChange={e => set(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  style={S.input}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,174,239,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={S.btn} onClick={save}>설정 저장</button>
          {saved && (
            <span style={{ fontSize: '12px', color: '#34d399', letterSpacing: '0.06em' }}>✓ 저장되었습니다</span>
          )}
        </div>

        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '16px', lineHeight: 1.6 }}>
          ※ 현재 설정은 브라우저 localStorage에 저장됩니다.<br />
          실제 사이트에 반영하려면 Contact.tsx의 INFO / SNS 값을 직접 수정하세요.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Sidebar Nav Item
// ─────────────────────────────────────────────
function NavItem({ icon, label, active, onClick, badge }: { icon: string; label: string; active: boolean; onClick: () => void; badge?: number }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        width: '100%', padding: '11px 20px',
        background: active ? 'rgba(0,174,239,0.1)' : 'transparent',
        border: 'none',
        borderLeft: `2px solid ${active ? '#00AEEF' : 'transparent'}`,
        color: active ? '#00AEEF' : 'rgba(255,255,255,0.4)',
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
        cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
    >
      <span style={{ fontSize: '16px', opacity: 0.8 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {!!badge && badge > 0 && (
        <span style={{
          background: '#00AEEF', color: '#000',
          fontSize: '9px', fontWeight: 800, lineHeight: 1,
          padding: '3px 6px', borderRadius: '10px', minWidth: '18px', textAlign: 'center',
        }}>{badge}</span>
      )}
    </button>
  )
}

// ─────────────────────────────────────────────
// Main Admin Page
// ─────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [tab, setTab] = useState<Tab>('dashboard')
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS)

  useEffect(() => {
    setAuthed(!!sessionStorage.getItem('sm_admin'))
    const saved = localStorage.getItem('sm_portfolio')
    if (saved) try { setItems(JSON.parse(saved)) } catch {}
  }, [])

  const handleSetItems = (next: Item[]) => {
    setItems(next)
    localStorage.setItem('sm_portfolio', JSON.stringify(next))
  }

  const logout = () => {
    sessionStorage.removeItem('sm_admin')
    setAuthed(false)
  }

  if (authed === null) return null
  if (!authed) return <Login onOk={() => setAuthed(true)} />

  const newInqCount = (() => {
    try {
      const stored = localStorage.getItem('sm_inquiries')
      if (!stored) return 0
      return (JSON.parse(stored) as Inquiry[]).filter(i => i.status === 'new').length
    } catch { return 0 }
  })()

  const TABS: { key: Tab; icon: string; label: string; badge?: number }[] = [
    { key: 'dashboard',  icon: '◻', label: '대시보드' },
    { key: 'portfolio',  icon: '◈', label: '포트폴리오' },
    { key: 'work',       icon: '◇', label: 'Work 관리' },
    { key: 'inquiries',  icon: '◎', label: '상담관리', badge: newInqCount },
    { key: 'settings',   icon: '◌', label: '설정' },
  ]

  const PAGE_TITLE: Record<Tab, string> = {
    dashboard:  '대시보드',
    portfolio:  '포트폴리오 관리',
    work:       'Work (Perspective In Reality)',
    inquiries:  '상담관리',
    settings:   '설정',
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#060606', color: '#fff', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", cursor: 'default' }}>
      <style>{`* { cursor: default !important; } button, input, select, textarea { cursor: default !important; } a { cursor: default !important; }`}</style>

      {/* ── Sidebar ── */}
      <aside style={{
        width: '220px', minHeight: '100vh',
        background: '#080808',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        flexShrink: 0, position: 'sticky', top: 0, alignSelf: 'flex-start', height: '100vh',
      }}>
        {/* Logo */}
        <div style={{ padding: '28px 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '4px' }}>
            <MLogo mode="full" style={{ width: '20px', height: '20px' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em' }}>STUDIO MONSTER</span>
          </div>
          <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', paddingLeft: '27px' }}>ADMIN</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, paddingTop: '12px' }}>
          {TABS.map(t => (
            <NavItem key={t.key} icon={t.icon} label={t.label} active={tab === t.key} onClick={() => setTab(t.key)} badge={t.badge} />
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.12em', textDecoration: 'none',
              padding: '8px 4px', marginBottom: '4px',
            }}
          >↗ 사이트 보기</a>
          <button
            onClick={logout}
            style={{
              width: '100%', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.3)', fontSize: '10px',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '9px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: '2px',
            }}
          >로그아웃</button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Topbar */}
        <div style={{
          height: '60px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 36px', flexShrink: 0,
        }}>
          <h1 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em' }}>{PAGE_TITLE[tab]}</h1>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em' }}>
            {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '36px', overflowY: 'auto' }}>
          {tab === 'dashboard'  && <Dashboard items={items} />}
          {tab === 'portfolio'  && <PortfolioTab items={items} onChange={handleSetItems} />}
          {tab === 'work'       && <WorkTab />}
          {tab === 'inquiries'  && <InquiriesTab />}
          {tab === 'settings'   && <SettingsTab />}
        </div>
      </div>
    </div>
  )
}
