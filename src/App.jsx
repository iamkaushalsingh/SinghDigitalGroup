import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// ─── Mobile detection hook ────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return isMobile
}

// ─── Custom cursor (desktop only) ─────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isMobile])

  if (isMobile) return null

  return (
    <div ref={cursorRef} style={{
      position: 'fixed', top: 0, left: 0, width: 32, height: 32,
      borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
      background: 'radial-gradient(circle, rgba(124,92,252,0.6) 0%, rgba(124,92,252,0.1) 70%, transparent 100%)',
      border: '1px solid rgba(124,92,252,0.4)',
      transition: 'transform 0.08s linear',
      backdropFilter: 'blur(2px)',
    }} />
  )
}

// ─── Floating Orb background ──────────────────────────────────────────────────
function Orbs() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,92,252,0.18) 0%, transparent 70%)',
        top: '-10%', left: '-10%', animation: 'drift 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.10) 0%, transparent 70%)',
        top: '40%', right: '-8%', animation: 'drift 22s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)',
        bottom: '-5%', left: '30%', animation: 'drift 16s ease-in-out infinite 4s',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(124,92,252,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,252,0.04) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: isMobile ? '16px 20px' : '20px 40px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled || menuOpen ? 'rgba(6,6,15,0.95)' : 'transparent',
      backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
      borderBottom: scrolled || menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.4s ease',
      flexWrap: 'wrap',
    }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
        S<span style={{ color: 'var(--accent)' }}>.</span>DG
      </span>

      {!isMobile && (
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['About', 'Apps', 'Skills', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontSize: '0.85rem', fontWeight: 400, color: 'var(--muted)',
              transition: 'color 0.2s', letterSpacing: '0.04em',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{item}</a>
          ))}
          <a href="https://play.google.com/store/apps/details?id=com.singhdigitalgroup.subhvichar" target="_blank" rel="noopener noreferrer" style={{
            padding: '8px 20px', borderRadius: 100,
            background: 'var(--accent)', color: 'white',
            fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.03em',
            transition: 'all 0.2s', boxShadow: '0 0 20px rgba(124,92,252,0.4)',
          }}>Get App ↗</a>
        </div>
      )}

      {isMobile && (
        <button onClick={() => setMenuOpen(v => !v)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'white', fontSize: '1.4rem', padding: 4, lineHeight: 1,
        }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      )}

      {isMobile && menuOpen && (
        <div style={{ width: '100%', paddingTop: 16, paddingBottom: 8, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {['About', 'Apps', 'Skills', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '1rem', fontWeight: 500, color: 'var(--muted)',
                padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'block',
              }}
            >{item}</a>
          ))}
          <a href="https://play.google.com/store/apps/details?id=com.singhdigitalgroup.subhvichar"
            target="_blank" rel="noopener noreferrer"
            style={{
              marginTop: 16, padding: '12px 20px', borderRadius: 100, textAlign: 'center',
              background: 'var(--accent)', color: 'white', fontSize: '0.9rem', fontWeight: 600, display: 'block',
            }}
          >Get App ↗</a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return
    const h = (e) => setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [isMobile])

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', textAlign: 'center',
      padding: isMobile ? '100px 24px 60px' : '120px 40px 80px',
      position: 'relative', zIndex: 1,
    }}>
      <div className="reveal reveal-1" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 16px', borderRadius: 100,
        background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.3)',
        marginBottom: 32, fontSize: '0.75rem', fontWeight: 500, color: '#a78bfa',
        letterSpacing: '0.06em',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'pulse-glow 2s infinite', display: 'inline-block' }} />
        {isMobile ? 'BUILDING IN PUBLIC' : 'OPEN TO OPPORTUNITIES · BUILDING IN PUBLIC'}
      </div>

      <h1 className="reveal reveal-2" style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: 'clamp(3rem, 9vw, 8rem)', lineHeight: 0.95,
        letterSpacing: '-0.04em', marginBottom: 8,
        transform: isMobile ? 'none' : `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>Building</h1>

      <h1 className="reveal reveal-3" style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: 'clamp(3rem, 9vw, 8rem)', lineHeight: 0.95,
        letterSpacing: '-0.04em', marginBottom: 8,
        background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        transform: isMobile ? 'none' : `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>Products</h1>

      <h1 className="reveal reveal-4" style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: 'clamp(3rem, 9vw, 8rem)', lineHeight: 0.95,
        letterSpacing: '-0.04em', marginBottom: 40,
        transform: isMobile ? 'none' : `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px)`,
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>That Matter<span style={{ color: 'var(--accent)' }}>.</span></h1>

      <p className="reveal reveal-5" style={{
        fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', color: 'var(--muted)',
        maxWidth: 520, lineHeight: 1.7, marginBottom: 48,
      }}>
        We are <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Singh Digital Group</strong> — a software company
        building apps for real people. Creators of ShubhVichar, a daily motivation app built for India.
      </p>

      <div className="reveal reveal-6" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#apps" style={{
          padding: isMobile ? '12px 24px' : '14px 32px', borderRadius: 100,
          background: 'linear-gradient(135deg, var(--accent), #9f7aea)',
          color: 'white', fontWeight: 600, fontSize: isMobile ? '0.9rem' : '0.95rem',
          boxShadow: '0 0 40px rgba(124,92,252,0.4)', transition: 'all 0.25s',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>View Our Work ↓</a>
        <a href="#contact" style={{
          padding: isMobile ? '12px 24px' : '14px 32px', borderRadius: 100,
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'var(--text)', fontWeight: 400, fontSize: isMobile ? '0.9rem' : '0.95rem',
          transition: 'all 0.25s', background: 'rgba(255,255,255,0.04)',
        }}>Get in Touch</a>
      </div>

      {/* Floating decorative elements — desktop only */}
      {!isMobile && (
        <>
          <div style={{
            position: 'absolute', top: '20%', left: '8%',
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(124,92,252,0.4)',
            animation: 'float 6s ease-in-out infinite', writingMode: 'vertical-rl',
          }}>REACT NATIVE · EXPO · FIREBASE</div>
          <div style={{
            position: 'absolute', top: '25%', right: '8%',
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(0,229,255,0.35)',
            animation: 'float 8s ease-in-out infinite 2s', writingMode: 'vertical-rl',
          }}>ANDROID · IOS · WEB</div>
          <div style={{
            position: 'absolute', bottom: '12%', left: '6%',
            width: 180, padding: '16px 18px',
            background: 'linear-gradient(135deg, #2d1b69, #11998e)',
            borderRadius: 20, animation: 'float 7s ease-in-out infinite 1s',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            fontSize: '0.72rem', color: 'rgba(255,255,255,0.9)',
            fontStyle: 'italic', lineHeight: 1.5,
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <span style={{ fontSize: '1.2rem', opacity: 0.4 }}>"</span>
            Build in silence. Let success make the noise.
            <span style={{ fontSize: '0.65rem', opacity: 0.6, fontStyle: 'normal', fontWeight: 500 }}>— ShubhVichar ✨</span>
          </div>
        </>
      )}

      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'float 2s ease-in-out infinite',
      }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--muted), transparent)' }} />
      </div>
    </section>
  )
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['React Native', 'Expo', 'JavaScript', 'Firebase', 'AdMob', 'Android', 'iOS', 'Node.js', 'Vite', 'Gemini AI', 'Google Play', 'App Store']
  const repeated = [...items, ...items]
  return (
    <div style={{
      overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      padding: '18px 0', position: 'relative', zIndex: 1,
      background: 'rgba(124,92,252,0.04)',
    }}>
      <div style={{ display: 'flex', gap: 48, width: 'max-content', animation: 'marquee 25s linear infinite' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem',
            letterSpacing: '0.12em', color: i % 3 === 0 ? 'var(--accent)' : i % 3 === 1 ? 'var(--accent2)' : 'var(--muted)',
            whiteSpace: 'nowrap',
          }}>
            {item} <span style={{ color: 'rgba(255,255,255,0.15)', marginLeft: 24 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── App Showcase ─────────────────────────────────────────────────────────────
function AppShowcase() {
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()

  return (
    <section id="apps" style={{ padding: isMobile ? '80px 24px' : '120px 40px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
        <div style={{ width: 40, height: 1, background: 'var(--accent)' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--accent)' }}>FEATURED APP</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 48 : 80, alignItems: 'center',
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 14px', borderRadius: 100,
            background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)',
            marginBottom: 24, fontSize: '0.75rem', color: 'var(--accent2)', letterSpacing: '0.06em', fontWeight: 500,
          }}>📱 ANDROID APP · ₹99/YEAR PREMIUM</div>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.95,
            letterSpacing: '-0.03em', marginBottom: 24,
          }}>
            Shubh<span style={{ color: 'var(--accent)' }}>Vichar</span>
          </h2>

          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32 }}>
            Daily motivational quotes app built for India. 203 bundled quotes across 13 categories in 5 languages — Hindi, Hinglish, Marathi, Gujarati & English. Works fully offline with optional Gemini AI generation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
            {[['203', 'Bundled Quotes'], ['13', 'Categories'], ['5', 'Languages'], ['₹99', 'Per Year Premium']].map(([num, label]) => (
              <div key={label} style={{ padding: '16px 20px', borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--accent)' }}>{num}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://play.google.com/store/apps/details?id=com.singhdigitalgroup.subhvichar" target="_blank" rel="noopener noreferrer" style={{
              padding: '12px 28px', borderRadius: 100, background: 'var(--accent)', color: 'white',
              fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '0 0 30px rgba(124,92,252,0.35)', transition: 'all 0.25s',
            }}>▶ Google Play</a>
            <Link to="/privacy" style={{
              padding: '12px 28px', borderRadius: 100, border: '1px solid var(--border)',
              color: 'var(--muted)', fontSize: '0.9rem', transition: 'all 0.25s',
            }}>Privacy Policy</Link>
          </div>
        </div>

        {/* Phone mockup */}
        <div style={{ display: 'flex', justifyContent: 'center' }}
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <div style={{
            width: isMobile ? 220 : 260, animation: 'float 5s ease-in-out infinite',
            transform: hovered ? 'scale(1.05) rotate(-2deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.4s ease',
          }}>
            <div style={{
              background: '#0a0a1a', borderRadius: 40, padding: 12,
              border: '2px solid rgba(124,92,252,0.3)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6), inset 0 0 40px rgba(124,92,252,0.05)',
            }}>
              <div style={{ borderRadius: 30, overflow: 'hidden', background: '#080818' }}>
                <div style={{ background: '#080818', padding: '12px 20px 8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>
                  <span>9:41</span><span>●●●</span>
                </div>
                <div style={{ padding: '4px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', color: 'white' }}>ShubhVichar</div>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>Good morning ☀️</div>
                  </div>
                  <span style={{ fontSize: '1rem' }}>⚙️</span>
                </div>
                <div style={{ padding: '0 12px 12px', display: 'flex', gap: 6, overflowX: 'hidden' }}>
                  {['🌅 Morning', '💼 Hustle', '🧠 Mindset'].map((c, i) => (
                    <span key={i} style={{
                      padding: '4px 10px', borderRadius: 20, fontSize: '0.55rem', whiteSpace: 'nowrap',
                      background: i === 0 ? 'rgba(124,92,252,0.4)' : 'rgba(255,255,255,0.07)',
                      border: `1px solid ${i === 0 ? '#7C3AED' : 'rgba(255,255,255,0.1)'}`,
                      color: i === 0 ? 'white' : 'rgba(255,255,255,0.5)',
                    }}>{c}</span>
                  ))}
                </div>
                <div style={{ padding: '0 12px 12px' }}>
                  <div style={{
                    borderRadius: 20, padding: '20px 16px',
                    background: 'linear-gradient(135deg, #0f0c29, #302b63)',
                    minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8,
                  }}>
                    <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: 3, fontWeight: 700 }}>SHUBHVICHAR</div>
                    <div style={{ fontSize: '1.6rem', color: 'rgba(255,255,255,0.1)', lineHeight: 1 }}>"</div>
                    <div style={{ fontSize: '0.72rem', color: 'white', fontStyle: 'italic', lineHeight: 1.5 }}>Build in silence. Let success make the noise.</div>
                    <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.25)' }} />
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)' }}>— ShubhVichar</div>
                  </div>
                </div>
                <div style={{ padding: '0 12px 16px', display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, height: 36, borderRadius: 12, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)' }}>📸 Save</div>
                  <div style={{ flex: 2, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #7C3AED, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: 'white', fontWeight: 700 }}>🔄 New Quote</div>
                  <div style={{ flex: 1, height: 36, borderRadius: 12, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)' }}>📤 Share</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const isMobile = useIsMobile()
  return (
    <section id="about" style={{ padding: isMobile ? '80px 24px' : '120px 40px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
        <div style={{ width: 40, height: 1, background: 'var(--accent2)' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--accent2)' }}>ABOUT</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05,
            letterSpacing: '-0.03em', marginBottom: 32,
          }}>
            We build apps that<br /><span style={{ color: 'var(--accent2)' }}>people actually use.</span>
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: 20, fontSize: '1rem' }}>
            Singh Digital Group is an indie software company building mobile apps and web products. We believe in shipping fast, learning from users, and iterating towards something great.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '1rem' }}>
            Currently building ShubhVichar — a daily motivation app designed specifically for India, supporting Hindi, Hinglish, Marathi, and Gujarati alongside English.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { emoji: '🚀', title: 'App Developer', desc: 'React Native, Expo, Android & iOS' },
            { emoji: '🎨', title: 'UI/UX Focused', desc: 'Obsessed with dark themes and smooth animations' },
            { emoji: '🇮🇳', title: 'Building for India', desc: 'Multilingual apps for the next billion users' },
            { emoji: '💡', title: 'Indie Maker', desc: 'Solo building from idea to Play Store' },
          ].map(({ emoji, title, desc }) => (
            <div key={title} style={{
              display: 'flex', alignItems: 'center', gap: 20,
              padding: '18px 24px', borderRadius: 16,
              background: 'var(--surface)', border: '1px solid var(--border)',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,92,252,0.3)'; e.currentTarget.style.transform = 'translateX(8px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{emoji}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>{title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 2 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const isMobile = useIsMobile()
  const skills = [
    { name: 'React Native', level: 90, color: 'var(--accent)' },
    { name: 'JavaScript', level: 88, color: '#f7df1e' },
    { name: 'Expo', level: 85, color: 'var(--accent2)' },
    { name: 'React', level: 82, color: '#61dafb' },
    { name: 'Firebase', level: 75, color: '#ff9800' },
    { name: 'Node.js', level: 72, color: '#4ade80' },
    { name: 'CSS/Tailwind', level: 85, color: '#38bdf8' },
    { name: 'Git', level: 80, color: '#f05032' },
  ]

  return (
    <section id="skills" style={{ padding: isMobile ? '80px 24px' : '120px 40px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
        <div style={{ width: 40, height: 1, background: 'var(--accent3)' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--accent3)' }}>SKILLS</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', marginBottom: 48 }}>
        Our Tech Stack<span style={{ color: 'var(--accent)' }}>.</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '20px' : '24px 64px' }}>
        {skills.map(({ name, level, color }) => (
          <div key={name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem' }}>{name}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{level}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${level}%`, borderRadius: 2, background: color, boxShadow: `0 0 10px ${color}`, animation: 'reveal-left 1.2s cubic-bezier(0.16,1,0.3,1) both' }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const isMobile = useIsMobile()
  return (
    <section id="contact" style={{ padding: isMobile ? '80px 24px 100px' : '120px 40px 160px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
        <div style={{ width: 40, height: 1, background: 'var(--accent)' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--accent)' }}>CONTACT</span>
      </div>
      <div style={{
        padding: isMobile ? '48px 24px' : '80px', borderRadius: 32,
        background: 'linear-gradient(135deg, rgba(124,92,252,0.08), rgba(0,229,255,0.05))',
        border: '1px solid rgba(124,92,252,0.2)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)',
          top: '-50%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none',
        }} />
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em', marginBottom: 20, position: 'relative',
        }}>
          Let's Build<br />Something<span style={{ color: 'var(--accent)' }}> Together.</span>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 440, margin: '0 auto 40px', lineHeight: 1.8, position: 'relative' }}>
          Have an app idea? Want to collaborate? Or just want to say hi — we're always open to interesting conversations.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
          <a href="mailto:singhdigitalgroup@gmail.com" style={{
            padding: isMobile ? '14px 28px' : '16px 36px', borderRadius: 100,
            background: 'linear-gradient(135deg, var(--accent), #9f7aea)',
            color: 'white', fontWeight: 600, fontSize: isMobile ? '0.9rem' : '1rem',
            boxShadow: '0 0 40px rgba(124,92,252,0.4)', transition: 'all 0.25s',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>✉️ Say Hello</a>
          <Link to="/support" style={{
            padding: isMobile ? '14px 28px' : '16px 36px', borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)',
            color: 'var(--text)', fontWeight: 400, fontSize: isMobile ? '0.9rem' : '1rem',
            transition: 'all 0.25s', display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>🛠 App Support</Link>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile()
  return (
    <footer style={{
      borderTop: '1px solid var(--border)', padding: isMobile ? '24px 20px' : '32px 40px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: 12,
      flexDirection: isMobile ? 'column' : 'row', textAlign: isMobile ? 'center' : 'left',
    }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem' }}>
        Singh Digital Group<span style={{ color: 'var(--accent)' }}>.</span>
      </span>
      <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
        © {new Date().getFullYear()} Singh Digital Group · Built with React · Deployed on Vercel
      </span>
      <div style={{ display: 'flex', gap: 24 }}>
        {[{ label: 'Privacy Policy', to: '/privacy' }, { label: 'Support', to: '/support' }].map(({ label, to }) => (
          <Link key={label} to={to} style={{ fontSize: '0.8rem', color: 'var(--muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >{label}</Link>
        ))}
      </div>
    </footer>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Orbs />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <AppShowcase />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}