'use client'

import Image from 'next/image'
import { siteData } from '@beos/core/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 0' }}>
      <div className="nd-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <Image src="/NEWDIA_CI-02.svg" alt="NEWDIA" width={100} height={18} />
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            © {year} NEWDIA. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {siteData.social.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
