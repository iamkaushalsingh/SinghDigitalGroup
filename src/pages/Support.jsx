import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderRadius: 14, overflow: 'hidden',
      border: `1px solid ${open ? 'rgba(124,92,252,0.3)' : 'rgba(255,255,255,0.07)'}`,
      transition: 'border-color 0.2s',
      marginBottom: 12,
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '18px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: open ? 'rgba(124,92,252,0.08)' : 'rgba(255,255,255,0.03)',
          color: '#f0eeff', fontFamily: 'var(--font-body)',
          fontSize: '0.95rem', fontWeight: 500, textAlign: 'left',
          transition: 'background 0.2s', cursor: 'none',
        }}
      >
        {q}
        <span style={{
          fontSize: '1.2rem', color: '#7c5cfc', transition: 'transform 0.25s',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          display: 'inline-block', flexShrink: 0, marginLeft: 16,
        }}>+</span>
      </button>
      {open && (
        <div style={{
          padding: '16px 24px 20px',
          color: 'rgba(240,238,255,0.55)', fontSize: '0.9rem', lineHeight: 1.8,
          background: 'rgba(124,92,252,0.04)',
        }}>
          {a}
        </div>
      )}
    </div>
  )
}

export default function Support() {
  const faqs = [
    {
      q: 'How do I restore my Premium purchase?',
      a: 'Open MotivateMe → Settings → tap "Restore Purchase". Your Google account purchase will be detected automatically. Make sure you\'re signed in to the same Google account used for the original purchase.',
    },
    {
      q: 'Why does the app show an error when loading?',
      a: 'Make sure you have an internet connection if using AI-generated quotes. The app works fully offline with bundled quotes — go to Settings and disable "AI Quotes" to use only offline quotes.',
    },
    {
      q: 'How do I cancel my Premium subscription?',
      a: 'Open Google Play Store → tap your profile photo → Payments & subscriptions → Subscriptions → MotivateMe → Cancel subscription. You\'ll retain Premium access until the end of the current billing period.',
    },
    {
      q: 'How do I change the language?',
      a: 'Tap the flag icon (🌐) in the top right of the home screen to open the language picker. You can select from English, Hindi, Hinglish, Marathi, and Gujarati.',
    },
    {
      q: 'How do I set up daily reminders?',
      a: 'Go to Settings → Daily Reminder → enable the toggle. Make sure you\'ve granted notification permissions to the app in your device settings.',
    },
    {
      q: 'Why are some categories locked (🔒)?',
      a: 'Categories marked with 🔒 (Mindset, Growth, Wisdom) are Premium features. Upgrade to MotivateMe Premium for ₹99/year to unlock all 12 categories.',
    },
    {
      q: 'The AI quote feature isn\'t working',
      a: 'AI quotes require an internet connection and may occasionally be unavailable. The app will automatically fall back to our 126 bundled offline quotes. This is normal behavior.',
    },
    {
      q: 'How do I share a quote?',
      a: 'Tap the 📤 Share button below the quote card to share as text via WhatsApp, SMS, or any other app. Tap 📸 Save to save the quote image to your gallery.',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '20px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(6,6,15,0.9)', backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem' }}>
          K<span style={{ color: '#7c5cfc' }}>.</span>
        </Link>
        <Link to="/" style={{ fontSize: '0.85rem', color: 'rgba(240,238,255,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>
        {/* Title */}
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>🛠</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', marginBottom: 16,
          }}>App Support</h1>
          <p style={{ color: 'rgba(240,238,255,0.45)', fontSize: '1rem', maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
            Need help with MotivateMe? Find answers below or get in touch directly.
          </p>
        </div>

        {/* Contact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 64 }}>
          {[
            { icon: '📧', title: 'Email Support', desc: 'Typically reply within 24 hours', action: 'Email Us', href: 'mailto:support@motivateme.app' },
            { icon: '⭐', title: 'Rate the App', desc: 'Enjoying MotivateMe? Leave a review!', action: 'Google Play', href: 'https://play.google.com/store' },
          ].map(({ icon, title, desc, action, href }) => (
            <div key={title} style={{
              padding: '28px 24px', borderRadius: 20,
              background: 'rgba(124,92,252,0.06)', border: '1px solid rgba(124,92,252,0.2)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>{icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(240,238,255,0.45)', marginBottom: 20 }}>{desc}</div>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{
                display: 'inline-block', padding: '8px 20px', borderRadius: 100,
                background: '#7c5cfc', color: 'white', fontSize: '0.82rem', fontWeight: 600,
                transition: 'all 0.2s',
              }}>{action} ↗</a>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '1.8rem', letterSpacing: '-0.02em', marginBottom: 32,
        }}>Frequently Asked Questions</h2>

        {faqs.map((faq, i) => <FAQ key={i} {...faq} />)}

        {/* App info */}
        <div style={{
          marginTop: 48, padding: '28px', borderRadius: 20,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 16, fontSize: '1rem' }}>App Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: '0.85rem' }}>
            {[
              ['App Name', 'MotivateMe'],
              ['Version', '1.0.0'],
              ['Platform', 'Android'],
              ['Package', 'com.motivateme.app'],
              ['Developer', 'Kaushik'],
              ['Category', 'Lifestyle / Health & Fitness'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'rgba(240,238,255,0.4)' }}>{label}</span>
                <span style={{ color: '#f0eeff', fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Link to="/privacy" style={{ fontSize: '0.85rem', color: '#7c5cfc' }}>View Privacy Policy →</Link>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: 'rgba(240,238,255,0.3)' }}>© {new Date().getFullYear()} MotivateMe · <Link to="/" style={{ color: 'rgba(124,92,252,0.7)' }}>kaushik.dev</Link></p>
      </footer>
    </div>
  )
}