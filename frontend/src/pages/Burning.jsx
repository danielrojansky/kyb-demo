import { useState } from 'react'
import { burningItems } from '../data/index'
import { useApp } from '../context/AppContext'

const SEV_STYLE = {
  critical: { color: 'var(--red)',    bg: 'var(--red-bg)',    border: 'var(--red-border)',    label: 'CRITICAL' },
  high:     { color: 'var(--red)',    bg: 'var(--red-bg)',    border: 'var(--red-border)',    label: 'HIGH' },
  medium:   { color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)', label: 'MEDIUM' },
  low:      { color: 'var(--blue)',   bg: 'var(--blue-bg)',   border: 'var(--blue-border)',   label: 'LOW' },
}

const TYPE_LABEL = {
  sla_breach:     'SLA BREACH',
  no_action:      'NO ACTION',
  rfi_overdue:    'RFI OVERDUE',
  rfi_no_response:'RFI NO RESPONSE',
  stale_case:     'STALE CASE',
  kyc_overdue:    'KYC OVERDUE',
  regulatory:     'REGULATORY',
}

function AgeBar({ hours }) {
  // log scale: 0h → 0%, 168h (7 days) → 100%
  const pct = Math.min(100, (Math.log1p(hours) / Math.log1p(168)) * 100)
  const color = hours >= 72 ? 'var(--red)' : hours >= 12 ? 'var(--yellow)' : 'var(--green)'
  return (
    <div style={{ height: 3, background: 'var(--bg3)', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
      <div style={{ width: pct + '%', height: '100%', background: color, borderRadius: 2, transition: 'width .3s' }} />
    </div>
  )
}

function CountdownPill({ item }) {
  if (item.slaPassed) {
    return (
      <span style={{
        fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--r-full)',
        background: 'var(--red-bg)', border: '1px solid var(--red-border)', color: 'var(--red)',
        flexShrink: 0,
      }}>
        ⏰ OVERDUE · {item.slaAgo}
      </span>
    )
  }
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--r-full)',
      background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', color: 'var(--yellow)',
      flexShrink: 0,
    }}>
      ⏱ {item.slaIn} left
    </span>
  )
}

export default function Burning() {
  const { navigate, logAction, notify } = useApp()
  const [dismissed, setDismissed] = useState(new Set())
  const [filter, setFilter] = useState('all')

  const visible = burningItems.filter(b => {
    if (dismissed.has(b.id)) return false
    if (filter === 'critical') return b.severity === 'critical'
    if (filter === 'high')     return b.severity === 'high'
    if (filter === 'overdue')  return b.slaPassed
    return true
  })

  const critCount = burningItems.filter(b => b.severity === 'critical' && !dismissed.has(b.id)).length
  const overdueCount = burningItems.filter(b => b.slaPassed && !dismissed.has(b.id)).length
  const totalHours = burningItems.reduce((s, b) => s + b.ageHours, 0)

  function dismiss(id) {
    setDismissed(prev => new Set([...prev, id]))
    logAction('Acknowledged burning item: ' + id, '', 'action')
    notify('Item acknowledged')
  }

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">What's Burning 🔥</div>
        <div className="page-sub">Cases aging without action · SLA breaches · Overdue RFIs · Stale escalations</div>
      </div>
      <div className="no-pii-bar"><div className="live-dot" />SLA timers are live — items sorted by severity then age</div>

      {/* Summary strip */}
      <div className="stat-row" style={{ marginBottom: 14 }}>
        <div className="stat-cell" style={{ borderColor: 'var(--red-border)', background: 'var(--red-bg)' }}>
          <div className="stat-val red" style={{ fontSize: 20 }}>{critCount}</div>
          <div className="stat-label" style={{ color: 'var(--red)' }}>🔴 Critical items</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val red" style={{ fontSize: 20 }}>{overdueCount}</div>
          <div className="stat-label">⏰ SLA breaches</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val yellow" style={{ fontSize: 20 }}>{visible.length}</div>
          <div className="stat-label">🔥 Active items</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val" style={{ fontSize: 20 }}>{Math.round(totalHours / 24)}d</div>
          <div className="stat-label">⌛ Total aging time</div>
        </div>
      </div>

      {/* Filter row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {[['all', 'All'], ['critical', '🔴 Critical'], ['high', '🟠 High'], ['overdue', '⏰ Overdue']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 'var(--r)',
              fontSize: 11, fontWeight: 600, fontFamily: 'var(--font)',
              background: filter === key ? 'var(--blue)' : 'var(--bg)',
              color: filter === key ? '#fff' : 'var(--text3)',
              cursor: 'pointer', transition: 'all var(--transition)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Items */}
      {visible.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 32, color: 'var(--text3)' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
          <div style={{ fontWeight: 600 }}>Nothing burning right now</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>All SLA items acknowledged or on track</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {visible.map(item => {
            const sev = SEV_STYLE[item.severity] || SEV_STYLE.low
            return (
              <div
                key={item.id}
                className="card"
                style={{ padding: '14px 16px', borderLeft: `3px solid ${sev.color}` }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  {/* Icon */}
                  <div style={{ fontSize: 20, flexShrink: 0, paddingTop: 1 }}>{item.icon}</div>

                  {/* Body */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{item.title}</span>
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 'var(--r-full)',
                        background: sev.bg, border: `1px solid ${sev.border}`, color: sev.color, flexShrink: 0,
                      }}>
                        {sev.label}
                      </span>
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 'var(--r-full)',
                        background: 'var(--bg3)', color: 'var(--text4)', flexShrink: 0,
                      }}>
                        {TYPE_LABEL[item.type] || item.type}
                      </span>
                    </div>

                    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6, lineHeight: 1.5 }}>{item.detail}</div>

                    {/* SLA + age row */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <CountdownPill item={item} />
                      <span style={{ fontSize: 10, color: 'var(--text4)' }}>
                        Last action: {item.lastAction}
                      </span>
                    </div>

                    <AgeBar hours={item.ageHours} />
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                    <button
                      className="btn-primary"
                      onClick={() => navigate(item.page)}
                      style={{ fontSize: 11, padding: '5px 12px', whiteSpace: 'nowrap' }}
                    >
                      Open case →
                    </button>
                    <button
                      onClick={() => dismiss(item.id)}
                      style={{
                        fontSize: 10, padding: '4px 10px', border: '1px solid var(--border)',
                        borderRadius: 'var(--r)', background: 'var(--bg)', color: 'var(--text3)',
                        cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: 600,
                        transition: 'all var(--transition)',
                      }}
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {dismissed.size > 0 && (
        <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text4)', textAlign: 'center' }}>
          {dismissed.size} item{dismissed.size > 1 ? 's' : ''} acknowledged this session
          {' · '}
          <button
            onClick={() => setDismissed(new Set())}
            style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font)' }}
          >
            Show all
          </button>
        </div>
      )}
    </div>
  )
}
