import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Privacy from './pages/Privacy'
import Support from './pages/Support'
import './styles/global.css'

function GlobalCursor() {
  const ringRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px'
        ringRef.current.style.top = e.clientY + 'px'
      }
    }

    const onOver = (e) => {
      const tag = e.target.tagName.toLowerCase()
      const isClickable = tag === 'a' || tag === 'button' || e.target.closest('a') || e.target.closest('button')
      setIsHovering(!!isClickable)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  const ringStyle = {
    position: 'fixed',
    left: 0, top: 0,
    width: isHovering ? 60 : 36,
    height: isHovering ? 60 : 36,
    borderRadius: '50%',
    border: `1px solid ${isHovering ? 'rgba(124,92,252,0.8)' : 'rgba(255,255,255,0.45)'}`,
    background: isHovering ? 'rgba(124,92,252,0.1)' : 'transparent',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 99999,
    transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease',
    mixBlendMode: 'difference',
  }

  return <div ref={ringRef} style={ringStyle} />
}

function Root() {
  return (
    <BrowserRouter>
      <GlobalCursor />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)