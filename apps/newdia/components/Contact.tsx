'use client'

import { motion } from 'framer-motion'
import { siteData } from '@beos/core/portfolio'

export default function Contact() {
  const { contact, cta } = siteData

  return (
    <>
      {/* CTA Section */}
      <section style={{ background: 'var(--lime)', padding: '80px 0' }}>
        <div className="nd-container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--black)',
              marginBottom: 16,
            }}>
              {cta.title}
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(0,0,0,0.6)', marginBottom: 40, maxWidth: 440, margin: '0 auto 40px' }}>
              {cta.description}
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/consultation"
                style={{
                  padding: '16px 40px',
                  background: 'var(--black)',
                  color: 'var(--white)',
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--black)')}
              >
                {cta.buttonText}
              </a>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', marginTop: 16 }}>
              {cta.subText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="nd-section" style={{ background: 'var(--black)' }}>
        <div className="nd-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="nd-label" style={{ marginBottom: 16 }}>Contact</span>
              <h2 style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 600,
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                color: 'var(--white)',
                marginBottom: 24,
              }}>
                {contact.title}
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 48 }}>
                {contact.description}
              </p>
              <a
                href="/consultation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '16px 40px',
                  background: 'var(--lime)',
                  color: 'var(--black)',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'filter 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.08)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
              >
                GET IN TOUCH →
              </a>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ paddingTop: 40 }}
            >
              {[
                { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
                { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
                { label: 'Location', value: contact.address, href: undefined },
              ].map(item => (
                <div
                  key={item.label}
                  style={{
                    padding: '24px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: 8 }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>{item.value}</span>
                  )}
                </div>
              ))}

              {/* Social */}
              <div style={{ display: 'flex', gap: 24, paddingTop: 32 }}>
                {siteData.social.map(s => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
