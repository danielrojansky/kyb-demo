import { useState, useRef, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { botKB } from '../../data/index'

// ── Page context map ──────────────────────────────────────────
const PAGE_CONTEXT = {
  home: {
    label: 'Home Dashboard',
    prompt: "What's on my priority queue today?",
    summary: "You're on the morning dashboard. I can see your priority queue, stat strip, and open cases.",
    actions: [
      { label: '🔥 What\'s burning?', nav: 'burning' },
      { label: '⚡ Top conflict', nav: 'conflict' },
    ],
  },
  conflict: {
    label: 'Provider Conflict',
    prompt: 'Explain the TechNova FZE conflict',
    summary: "You're viewing Provider Conflict cases. I can see TechNova FZE (Elliptic 8.4/10) and Meridian Capital (OFAC SDN match).",
    actions: [
      { label: '📄 Draft SAR', nav: 'sar' },
      { label: '✉️ Send RFI', nav: 'rfi' },
      { label: '⚑ Escalate', nav: 'escalation' },
    ],
  },
  transaction: {
    label: 'Transaction Screening',
    prompt: 'Analyse the Ibrahim Al-Hassan transaction pattern',
    summary: "You're viewing the Ibrahim Al-Hassan transaction screen. €47k structuring pattern, 9 sub-threshold transfers.",
    actions: [
      { label: '📄 Draft SAR', nav: 'sar' },
      { label: '✉️ Draft RFI', nav: 'rfi' },
    ],
  },
  rescreen: {
    label: 'Periodic Re-screen',
    prompt: 'Explain the GreenPath Energy re-screen result',
    summary: "You're viewing the GreenPath Energy re-screen. CA weak hit on Li Wei (director, confidence 0.38).",
    actions: [
      { label: '✉️ Send RFI', nav: 'rfi' },
      { label: '⚑ Escalate', nav: 'escalation' },
    ],
  },
  pattern: {
    label: 'Pattern Detection',
    prompt: 'Explain the Nexus Trading pattern',
    summary: "You're viewing the Nexus Trading pattern. 4 dismissals match a pre-SAR cluster — stage 3/5, ~58 days to SAR trigger.",
    actions: [
      { label: '📄 Pre-draft SAR', nav: 'sar' },
      { label: '⚑ Escalate to CCO', nav: 'escalation' },
    ],
  },
  sar: {
    label: 'SAR Generation',
    prompt: 'Review the SAR narrative for TechNova',
    summary: "You're on the SAR Generation page. A pre-drafted SAR narrative is available for your review.",
    actions: [
      { label: '🎯 Audit readiness', nav: 'audit' },
    ],
  },
  rfi: {
    label: 'RFI Drafting',
    prompt: 'What should the RFI for Ibrahim Al-Hassan include?',
    summary: "You're drafting an RFI. The template includes all required fields for source of funds and transaction explanation.",
    actions: [
      { label: '✉️ View escalation', nav: 'escalation' },
    ],
  },
  burning: {
    label: "What's Burning",
    prompt: 'Which burning item needs action first?',
    summary: "You're viewing items burning without action. 2 CRITICAL SLA breaches are active — Meridian (OFAC 3d overdue) and Ibrahim (RFI deadline in 47m).",
    actions: [
      { label: '⚡ Meridian conflict', nav: 'conflict' },
      { label: '✉️ Send Ibrahim RFI', nav: 'rfi' },
    ],
  },
  remediation: {
    label: 'KYC Remediation',
    prompt: 'Which remediation cases are most critical?',
    summary: "You're on KYC Remediation. 142 overdue reviews, 8 material — Opal Ventures FZE is 127 days overdue with no analyst assigned.",
    actions: [
      { label: '⚑ Escalation queue', nav: 'escalation' },
    ],
  },
  regchange: {
    label: 'Reg Change Tracker',
    prompt: 'What are the biggest regulatory deadlines right now?',
    summary: "You're viewing the Reg Change Tracker. EU AI Act (134 days), MiCA Travel Rule (June 2026), AMLA updates all active.",
    actions: [
      { label: '🎯 Audit readiness', nav: 'audit' },
    ],
  },
  analytics: {
    label: 'Analytics',
    prompt: 'What does the analytics data tell me?',
    summary: "You're on the Analytics page. ROI stats, automation savings, and provider performance breakdown are visible.",
    actions: [],
  },
  escalation: {
    label: 'Escalation Queue',
    prompt: 'What escalations need my attention?',
    summary: "You're viewing the Escalation Queue. 3 active escalations — TechNova, Meridian, Nexus.",
    actions: [
      { label: '⚡ Open conflicts', nav: 'conflict' },
    ],
  },
  fatigue: {
    label: 'Alert Fatigue',
    prompt: 'How is our false positive rate?',
    summary: "You're on Alert Fatigue. 1,081 auto-triaged this week, 87% automation rate. CA adverse media FP rate: 38.7%.",
    actions: [],
  },
  audit: {
    label: 'Audit Readiness',
    prompt: 'How prepared are we for an examiner visit?',
    summary: "You're on Audit Readiness. Current score: 94.2%. 3 open gaps — KYC overdue, EU AI Act, MiCA Travel Rule.",
    actions: [
      { label: '📋 KYC remediation', nav: 'remediation' },
      { label: '📰 Reg changes', nav: 'regchange' },
    ],
  },
  entitygraph: {
    label: 'Entity Graph',
    prompt: 'Explain the entity relationships',
    summary: "You're viewing the Entity Relationship Graph. Nodes show entities, wallets, and individuals. Click any node to analyze.",
    actions: [
      { label: '⚡ Provider conflicts', nav: 'conflict' },
    ],
  },
  feed: {
    label: 'Signal Stream',
    prompt: 'What signals need action right now?',
    summary: "You're on the Signal Stream. Items are sorted by urgency. 2 critical and 4 high-urgency items are open.",
    actions: [
      { label: '🔥 What\'s burning?', nav: 'burning' },
    ],
  },
  memory: {
    label: 'Institutional Memory',
    prompt: 'How is institutional memory used in this system?',
    summary: "You're on Institutional Memory. 4,821 past decisions power the reasoning engine — 47 active patterns driving auto-logic.",
    actions: [],
  },
  onboarding: {
    label: 'Onboarding Flow',
    prompt: 'Walk me through the zero-touch onboarding flow',
    summary: "You're viewing the Onboarding Flow. 5-stage zero-touch KYB process using Sumsub + ComplyAdvantage + Elliptic.",
    actions: [],
  },
  auditlog: {
    label: 'Audit Log',
    prompt: 'What has happened in this session?',
    summary: "You're on the Audit Log page. Full immutable session trail is displayed — all actions timestamped.",
    actions: [],
  },
}

const DEFAULT_SUGGESTIONS = [
  "What's my priority today?",
  'Explain TechNova FZE risk',
  'OFAC freeze protocol',
  'SAR draft for Ibrahim',
  'Crypto onboarding checklist',
  'GreenPath re-screen analysis',
]

const DEFAULT_RESPONSE = `I don't have a specific answer for that, but here's what I can help with:<br><br>
• <strong>Case analysis</strong> — TechNova, Meridian, Ibrahim, GreenPath, Nexus<br>
• <strong>Procedures</strong> — OFAC, SAR filing, escalation, KYC remediation<br>
• <strong>Regulations</strong> — MiCA Travel Rule, EU AI Act, AMLA, UK Fraud<br>
• <strong>Checklists</strong> — crypto onboarding, audit prep, perpetual monitoring<br>
• <strong>Drafting</strong> — SAR narratives, RFI letters, escalation emails<br><br>
<em>Try one of the suggestion chips above or rephrase your question.</em>`

function getBotResponse(q) {
  const ql = q.toLowerCase()
  for (const entry of botKB) {
    if (entry.patterns.some(p => ql.includes(p))) return entry.response
  }
  return DEFAULT_RESPONSE
}

let msgId = 0

export default function ChatPane() {
  const { logAction, notify, navigate, currentPage } = useApp()
  const ctx = PAGE_CONTEXT[currentPage] || null
  const prevPageRef = useRef(currentPage)

  const [messages, setMessages] = useState([
    { id: ++msgId, cls: 'bot', html: '👋 I\'m your AI compliance assistant. Ask me about cases, procedures, regulations, or process design.<br><br><strong>I\'m aware of what you\'re viewing — try "Analyse this screen".</strong>' },
  ])
  const [input, setInput] = useState('')
  const messagesRef = useRef(null)

  // When page changes, inject a context-aware nudge
  useEffect(() => {
    if (prevPageRef.current === currentPage) return
    prevPageRef.current = currentPage
    if (!ctx) return

    const nudgeId = ++msgId
    setMessages(prev => [
      ...prev,
      {
        id: nudgeId,
        cls: 'bot context-nudge',
        html: `<span style="font-size:10px;color:var(--text4);display:block;margin-bottom:4px">📍 You navigated to <strong>${ctx.label}</strong></span>${ctx.summary}<br><br><em style="font-size:10.5px">Ask me to analyse this page or click a suggestion.</em>`,
      },
    ])
  }, [currentPage, ctx])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const send = (text) => {
    const q = (text || input).trim()
    if (!q) return
    setInput('')

    const userMsg = { id: ++msgId, cls: 'user', html: q }
    const thinkId = ++msgId
    const thinkMsg = { id: thinkId, cls: 'thinking', html: '⏳ Analysing…' }

    setMessages(prev => [...prev, userMsg, thinkMsg])
    logAction('AI query: ' + q.substring(0, 55), 'AI Compliance Assistant', 'query')

    // If "analyse this" / "this screen" etc, use page context
    const ql = q.toLowerCase()
    const isPageQuery = ql.includes('this screen') || ql.includes('this page') || ql.includes('analyse this') || ql.includes('analyze this') || ql.includes('what am i looking at')

    setTimeout(() => {
      let response
      if (isPageQuery && ctx) {
        response = `<strong>Screen Analysis — ${ctx.label}</strong><br><br>${ctx.summary}<br><br>${getBotResponse(ctx.prompt)}`
      } else {
        response = getBotResponse(q)
      }
      setMessages(prev => prev.map(m =>
        m.id === thinkId ? { ...m, cls: 'bot', html: response } : m
      ))
    }, 800 + Math.random() * 500)
  }

  const handleAction = (action) => {
    logAction('AI panel action: navigate to ' + action.nav, currentPage, 'action')
    navigate(action.nav)
    notify('Navigated to ' + (PAGE_CONTEXT[action.nav]?.label || action.nav))
  }

  const suggestions = ctx
    ? [ctx.prompt, ...DEFAULT_SUGGESTIONS.slice(0, 3)]
    : DEFAULT_SUGGESTIONS

  return (
    <>
      <div className="detail-hdr" style={{ flexShrink: 0 }}>
        <div className="detail-hdr-title">💬 AI Compliance Assistant</div>
        <div className="detail-hdr-sub">
          {ctx
            ? <>Context: <strong style={{ color: 'var(--blue)' }}>{ctx.label}</strong></>
            : 'Case analysis · Procedures · SAR drafting · Reg guidance'}
        </div>
      </div>

      {/* Context-aware action strip */}
      {ctx && ctx.actions.length > 0 && (
        <div style={{
          display: 'flex', gap: 6, padding: '6px 12px', flexWrap: 'wrap',
          borderBottom: '1px solid var(--border)', background: 'var(--bg2)', flexShrink: 0,
        }}>
          <span style={{ fontSize: 10, color: 'var(--text4)', alignSelf: 'center', flexShrink: 0 }}>Quick actions:</span>
          {ctx.actions.map(a => (
            <button
              key={a.nav}
              onClick={() => handleAction(a)}
              style={{
                fontSize: 10, fontWeight: 600, padding: '3px 10px',
                border: '1px solid var(--border)', borderRadius: 'var(--r)',
                background: 'var(--bg)', color: 'var(--text2)',
                cursor: 'pointer', fontFamily: 'var(--font)',
                transition: 'all var(--transition)',
              }}
              onMouseEnter={e => { e.target.style.background = 'var(--blue)'; e.target.style.color = '#fff' }}
              onMouseLeave={e => { e.target.style.background = 'var(--bg)'; e.target.style.color = 'var(--text2)' }}
            >
              {a.label}
            </button>
          ))}
          <button
            onClick={() => send('Analyse this screen')}
            style={{
              fontSize: 10, fontWeight: 600, padding: '3px 10px',
              border: '1px solid var(--blue)', borderRadius: 'var(--r)',
              background: 'var(--blue-bg)', color: 'var(--blue)',
              cursor: 'pointer', fontFamily: 'var(--font)',
              transition: 'all var(--transition)',
            }}
          >
            🔍 Analyse this screen
          </button>
        </div>
      )}

      <div className="chat-messages" ref={messagesRef}>
        {messages.map(m => (
          <div
            key={m.id}
            className={`chat-msg ${m.cls}`}
            dangerouslySetInnerHTML={{ __html: m.html }}
          />
        ))}
      </div>
      <div className="chat-suggestions">
        {suggestions.map(s => (
          <div key={s} className="chat-sug" onClick={() => send(s)}>{s}</div>
        ))}
      </div>
      <div className="chat-input-row">
        <textarea
          className="chat-input"
          placeholder={ctx ? `Ask about ${ctx.label}…` : 'Ask a compliance question…'}
          rows={2}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
        />
        <button className="chat-send" onClick={() => send()}>↑</button>
      </div>
    </>
  )
}
