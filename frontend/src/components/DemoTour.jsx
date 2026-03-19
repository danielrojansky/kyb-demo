import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'

const STEPS = [
  {
    page:   'home',
    target: '[data-tour="priority-queue"]',
    title:  '① The Reasoning Engine\'s Morning Brief',
    body:   'Every morning, the reasoning engine pre-ranks your most critical cases. You see the top 3 that need immediate action — not a list of 200 alerts. Today: an OFAC sanctions match, a crypto wallet conflict, and a structuring pattern with a live RFI clock.',
  },
  {
    page:   'burning',
    target: '[data-tour="burning-first"]',
    title:  '② SLA Breach — OFAC Blocking Report Overdue',
    body:   'Meridian Capital\'s OFAC blocking report is 3 days overdue. This is a mandatory same-business-day legal obligation. The red "OVERDUE" pill means the window has passed — this is the CCO\'s highest personal liability item today.',
  },
  {
    page:   'conflict',
    target: '[data-tour="meridian-card"]',
    title:  '③ Hard Sanctions Match — Meridian Capital',
    body:   'LP Viktor Sorokin was added to the OFAC SDN list 3 days ago and holds 8.3% of the fund. The freeze is active. Critical rule: do NOT notify the client — the tipping-off prohibition (31 CFR §103.18) applies. Legal must review before any communication.',
  },
  {
    page:   'conflict',
    target: '[data-tour="technova-reasoning"]',
    title:  '④ AI Root Cause Analysis — Why Providers Disagree',
    body:   'ComplyAdvantage shows clean while Sumsub and Elliptic both flag TechNova FZE. The reasoning engine identified exactly why: CA\'s screen is 11 days stale — it predates the UBO change. This is a timing gap, not a contradiction. Resolution: re-trigger CA with the updated UBO data.',
  },
  {
    page:   'transaction',
    target: '[data-tour="txn-reasoning"]',
    title:  '⑤ Real-Time Structuring Detection',
    body:   '9 transactions between €4,800–€4,950 in 4 hours — 11× the monthly baseline — is a classic structuring pattern. The engine cross-referenced 3 prior cases with identical signatures, all resulting in SARs. An RFI has been pre-drafted and must go out within 47 minutes.',
  },
  {
    page:   'pattern',
    target: '[data-tour="pattern-reasoning"]',
    title:  '⑥ Pattern Memory — 58-Day Early Warning',
    body:   'No single signal on Nexus Trading justifies action today. But the sequence of 4 analyst dismissals over 11 months matches 12 historical entities that all preceded SAR filings. The engine detected a pre-SAR trajectory approximately 58 days before the likely trigger event.',
  },
  {
    page:   'escalation',
    target: '[data-tour="escalation-first"]',
    title:  '⑦ CCO Escalation Queue — Sign-Off Required',
    body:   '3 cases require your personal CCO acknowledgement. Each has been pre-assembled with full reasoning context — no analyst time spent briefing you. Your action is logged with your identity and timestamp, creating the evidence trail regulators require under SM&CR and DORA.',
  },
  {
    page:   'audit',
    target: '[data-tour="audit-score"]',
    title:  '⑧ Programme Effectiveness — Always Examiner-Ready',
    body:   '94.2% programme effectiveness, backed by timestamped immutable data. Every SAR, conflict resolution, and dismissed alert has a documented rationale. Examiners get a complete audit package in 30 seconds — not the 2-week scramble that is the industry norm.',
  },
]

// Custom cursor with pulse rings
function Cursor({ pulsing }) {
  return (
    <div style={{ position: 'relative', width: 28, height: 28 }}>
      {pulsing && <>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 36, height: 36, borderRadius: '50%',
          border: '2px solid rgba(59,130,246,.7)',
          animation: 'dtPulse 1.1s ease-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 56, height: 56, borderRadius: '50%',
          border: '1px solid rgba(59,130,246,.3)',
          animation: 'dtPulse 1.1s ease-out infinite .22s',
          pointerEvents: 'none',
        }} />
      </>}
      <svg
        width="28" height="28" viewBox="0 0 28 28" fill="none"
        style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.45))' }}
      >
        <path
          d="M5 3L5 20.5L9.5 16L13 23L16 21.5L12.5 15L19.5 15Z"
          fill="white" stroke="#1d4ed8" strokeWidth="1.5" strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function DemoTour() {
  const { tourActive, tourStep, setTourStep, setTourActive, navigate } = useApp()

  const [cursorPos,     setCursorPos]     = useState({ x: 300, y: 200 })
  const [targetRect,    setTargetRect]    = useState(null)
  const [tooltipVisible,setTooltipVisible]= useState(false)
  const [pulsing,       setPulsing]       = useState(false)
  const timers = useRef([])

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t) }

  useEffect(() => {
    if (!tourActive) return
    clearTimers()

    const step = STEPS[tourStep]

    // Reset state for new step
    navigate(step.page)
    setTooltipVisible(false)
    setPulsing(false)
    setTargetRect(null)

    // 1. Wait for page to render
    later(() => {
      const el = document.querySelector(step.target)
      if (!el) return

      // Scroll target into view in the main content area
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })

      // 2. Wait for scroll to settle, then capture position
      later(() => {
        const r = el.getBoundingClientRect()
        setTargetRect(r)
        setCursorPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 })

        // 3. After cursor travels (~650ms), start pulsing and show tooltip
        later(() => {
          setPulsing(true)
          setTooltipVisible(true)
        }, 750)
      }, 420)
    }, 480)

    return clearTimers
  }, [tourStep, tourActive]) // eslint-disable-line

  if (!tourActive) return null

  const step = STEPS[tourStep]
  const PAD  = 10
  const VW   = window.innerWidth
  const VH   = window.innerHeight
  const TW   = 360

  // Compute tooltip position relative to target
  let tipTop    = undefined
  let tipBottom = undefined
  let tipLeft   = Math.max(16, Math.min(VW - TW - 16, VW / 2 - TW / 2))

  if (targetRect) {
    const cx = targetRect.left + targetRect.width / 2
    tipLeft = Math.max(16, Math.min(VW - TW - 16, cx - TW / 2))

    const spaceBelow = VH - targetRect.bottom
    if (spaceBelow >= 200 || targetRect.top > spaceBelow) {
      // Enough room below, or less room above — go below
      tipTop = targetRect.bottom + PAD + 8
    } else {
      // Go above
      tipBottom = VH - (targetRect.top - PAD - 8)
    }
  } else {
    tipTop  = VH / 2 - 100
  }

  const isFirst = tourStep === 0
  const isLast  = tourStep === STEPS.length - 1

  return (
    <>
      {/* Animation keyframes */}
      <style>{`
        @keyframes dtPulse {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: .85; }
          100% { transform: translate(-50%,-50%) scale(2);   opacity: 0;   }
        }
        @keyframes dtTooltipIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Spotlight overlay — 4 panels + glow border ── */}
      {targetRect && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 195, pointerEvents: 'none' }}>
          {/* Top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: Math.max(0, targetRect.top - PAD),
            background: 'rgba(0,0,0,.52)', transition: 'height .35s ease',
          }} />
          {/* Bottom */}
          <div style={{
            position: 'absolute',
            top: targetRect.bottom + PAD, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,.52)', transition: 'top .35s ease',
          }} />
          {/* Left */}
          <div style={{
            position: 'absolute',
            top: targetRect.top - PAD,
            left: 0,
            width: Math.max(0, targetRect.left - PAD),
            height: targetRect.height + PAD * 2,
            background: 'rgba(0,0,0,.52)', transition: 'all .35s ease',
          }} />
          {/* Right */}
          <div style={{
            position: 'absolute',
            top: targetRect.top - PAD,
            left: targetRect.right + PAD,
            right: 0,
            height: targetRect.height + PAD * 2,
            background: 'rgba(0,0,0,.52)', transition: 'all .35s ease',
          }} />
          {/* Glowing border around target */}
          <div style={{
            position: 'absolute',
            top: targetRect.top - PAD, left: targetRect.left - PAD,
            width: targetRect.width + PAD * 2, height: targetRect.height + PAD * 2,
            borderRadius: 10,
            border: '2px solid rgba(59,130,246,.9)',
            boxShadow: '0 0 0 1px rgba(59,130,246,.25), 0 0 28px rgba(59,130,246,.22)',
            transition: 'all .35s ease',
          }} />
        </div>
      )}

      {/* ── Animated cursor ── */}
      <div style={{
        position: 'fixed',
        left: cursorPos.x - 4,
        top:  cursorPos.y - 4,
        zIndex: 210,
        pointerEvents: 'none',
        transition: 'left .65s cubic-bezier(.25,.46,.45,.94), top .65s cubic-bezier(.25,.46,.45,.94)',
      }}>
        <Cursor pulsing={pulsing} />
      </div>

      {/* ── Floating tooltip ── */}
      {tooltipVisible && (
        <div style={{
          position: 'fixed',
          top:    tipTop,
          bottom: tipBottom,
          left:   tipLeft,
          width:  TW,
          zIndex: 220,
          background: 'var(--bg)',
          border: '1.5px solid rgba(59,130,246,.6)',
          borderRadius: 10,
          boxShadow: '0 10px 40px rgba(0,0,0,.28), 0 0 0 1px rgba(59,130,246,.12)',
          padding: '13px 15px',
          animation: 'dtTooltipIn .2s ease-out',
        }}>

          {/* Header row: step dots + counter + close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 9 }}>
            <div style={{ display: 'flex', gap: 4, flex: 1 }}>
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setTourStep(i)}
                  style={{
                    height: 5,
                    width: i === tourStep ? 16 : 5,
                    borderRadius: 3,
                    background: i === tourStep ? '#2563eb' : i < tourStep ? '#93c5fd' : 'var(--bg3)',
                    cursor: 'pointer',
                    transition: 'all .2s',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text4)', flexShrink: 0 }}>
              {tourStep + 1} / {STEPS.length}
            </span>
            <button
              onClick={() => setTourActive(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text4)', fontSize: 16, lineHeight: 1,
                padding: '0 2px', flexShrink: 0,
              }}
              title="Exit tour"
            >×</button>
          </div>

          {/* Title */}
          <div style={{
            fontSize: 12, fontWeight: 700, color: 'var(--text)',
            marginBottom: 6, lineHeight: 1.4,
          }}>
            {step.title}
          </div>

          {/* Body */}
          <div style={{
            fontSize: 11.5, color: 'var(--text2)', lineHeight: 1.65,
            marginBottom: 12,
          }}>
            {step.body}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setTourStep(tourStep - 1)}
              disabled={isFirst}
              style={{
                flex: 1, padding: '7px 0', fontSize: 11, fontWeight: 600,
                border: '1px solid var(--border)', borderRadius: 7,
                background: 'var(--bg)',
                color: isFirst ? 'var(--text4)' : 'var(--text2)',
                cursor: isFirst ? 'default' : 'pointer',
                fontFamily: 'var(--font)',
              }}
            >← Prev</button>
            <button
              onClick={() => isLast ? setTourActive(false) : setTourStep(tourStep + 1)}
              style={{
                flex: 2, padding: '7px 0', fontSize: 11, fontWeight: 700,
                border: 'none', borderRadius: 7,
                background: isLast ? '#16a34a' : '#2563eb',
                color: '#fff', cursor: 'pointer',
                fontFamily: 'var(--font)',
              }}
            >
              {isLast ? '✓ Finish Tour' : 'Next →'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
