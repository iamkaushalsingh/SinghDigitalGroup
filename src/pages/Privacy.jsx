import React from 'react'
import { Link } from 'react-router-dom'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{
      fontFamily: 'var(--font-display)', fontWeight: 700,
      fontSize: '1.3rem', marginBottom: 16, color: '#f0eeff',
    }}>{title}</h2>
    <div style={{ color: 'rgba(240,238,255,0.6)', lineHeight: 1.9, fontSize: '0.95rem' }}>
      {children}
    </div>
  </div>
)

export default function Privacy() {
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
        <Link to="/" style={{
          fontSize: '0.85rem', color: 'rgba(240,238,255,0.5)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>
        {/* Title */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 100,
            background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.25)',
            fontSize: '0.75rem', color: '#a78bfa', letterSpacing: '0.08em', fontWeight: 600,
            marginBottom: 20,
          }}>
            MOTIVATEME APP
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', marginBottom: 16,
          }}>Privacy Policy</h1>
          <p style={{ color: 'rgba(240,238,255,0.45)', fontSize: '0.9rem' }}>
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 48 }} />

        <Section title="1. Introduction">
          <p>Welcome to MotivateMe ("the App"). This Privacy Policy explains how we handle your information when you use our application. We are committed to protecting your privacy and being transparent about our practices.</p>
          <br/>
          <p>By using MotivateMe, you agree to the collection and use of information in accordance with this policy.</p>
        </Section>

        <Section title="2. Information We Collect">
          <p><strong style={{ color: '#f0eeff' }}>Information you provide:</strong> MotivateMe does not require account registration. The app stores your preferences (selected language, notification settings, premium status) locally on your device only.</p>
          <br/>
          <p><strong style={{ color: '#f0eeff' }}>Automatically collected information:</strong> If you use the AI quote generation feature, your selected category is sent to the Gemini AI API (Google) to generate a quote. No personally identifiable information is included in this request.</p>
          <br/>
          <p><strong style={{ color: '#f0eeff' }}>Advertising:</strong> The free version of the app displays advertisements via Google AdMob. AdMob may collect device identifiers and usage data to serve relevant ads. Please refer to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#7c5cfc' }}>Google's Privacy Policy</a> for details.</p>
          <br/>
          <p><strong style={{ color: '#f0eeff' }}>Purchases:</strong> In-app purchases are processed entirely by Google Play. We do not collect or store any payment information.</p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul style={{ paddingLeft: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>Provide and improve the App's functionality</li>
            <li>Remember your language and category preferences</li>
            <li>Send daily motivational quote notifications (only if you enable this)</li>
            <li>Display relevant advertisements to free users</li>
            <li>Process and verify premium subscription purchases</li>
          </ul>
        </Section>

        <Section title="4. Data Storage">
          <p>All user preferences and quote history are stored <strong style={{ color: '#f0eeff' }}>locally on your device</strong> using AsyncStorage. This data never leaves your device and is not transmitted to our servers.</p>
          <br/>
          <p>We do not operate any backend servers or databases that store your personal information.</p>
        </Section>

        <Section title="5. Third-Party Services">
          <p>MotivateMe uses the following third-party services:</p>
          <br/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { name: 'Google AdMob', desc: 'Displays advertisements in the free version', link: 'https://policies.google.com/privacy' },
              { name: 'Google Gemini AI', desc: 'Generates AI-powered quotes (optional feature)', link: 'https://policies.google.com/privacy' },
              { name: 'Google Play Billing', desc: 'Processes premium subscription purchases', link: 'https://play.google.com/about/play-terms/' },
            ].map(({ name, desc, link }) => (
              <div key={name} style={{
                padding: '16px 20px', borderRadius: 12,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ fontWeight: 600, color: '#f0eeff', marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: '0.88rem', marginBottom: 6 }}>{desc}</div>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#7c5cfc' }}>View Privacy Policy ↗</a>
              </div>
            ))}
          </div>
        </Section>

        <Section title="6. Notifications">
          <p>MotivateMe may send you daily motivational quote notifications if you enable this feature. You can disable notifications at any time through the app's settings or your device's notification settings.</p>
        </Section>

        <Section title="7. Children's Privacy">
          <p>MotivateMe is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Continued use of the App after changes constitutes acceptance of the updated policy.</p>
        </Section>

        <Section title="9. Contact Us">
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <br/>
          <div style={{
            padding: '24px', borderRadius: 16,
            background: 'rgba(124,92,252,0.06)', border: '1px solid rgba(124,92,252,0.2)',
          }}>
            <div style={{ marginBottom: 8 }}>📧 <a href="mailto:support@motivateme.app" style={{ color: '#7c5cfc' }}>support@motivateme.app</a></div>
            <div>🌐 <Link to="/support" style={{ color: '#7c5cfc' }}>App Support Page</Link></div>
          </div>
        </Section>
      </div>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: 'rgba(240,238,255,0.3)' }}>© {new Date().getFullYear()} MotivateMe · <Link to="/" style={{ color: 'rgba(124,92,252,0.7)' }}>kaushik.dev</Link></p>
      </footer>
    </div>
  )
}
