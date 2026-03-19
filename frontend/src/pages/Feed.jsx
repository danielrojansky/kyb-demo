import { useState, useMemo } from 'react'
import { feedItems } from '../data/index'
import { useApp } from '../context/AppContext'

const URGENCY_LABEL = { 5: 'Critical', 4: 'High', 3: 'Medium', 2: 'Watch', 1: 'Info' }
const URGENCY_COLOR = { 5: 'var(--red)', 4: 'var(--red)', 3: 'var(--yellow)', 2: 'var(--yellow)', 1: 'var(--text4)' }
const TAG_STYLE = {
  CRITICAL: { background: 'var(--red-bg)',    border: '1px solid var(--red-border)',    color: 'var(--red)' },
  HIGH:     { background: 'var(--red-bg)',    border: '1px solid var(--red-border)',    color: 'var(--red)' },
  PATTERN:  { background: 'var(--purple-bg)', border: '1px solid var(--purple-border)', color: 'var(--purple)' },
  REVIEW:   { background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', color: 'var(--yellow)' },
  WATCH:    { background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)', color: 'var(--yellow)' },
  AUTO:     { background: 'var(--green-bg)',  border: '1px solid var(--green-border)',  color: 'var(--green)' },
  INFO:     { background: 'var(--blue-bg)',   border: '1px solid var(--blue-border)',   color: 'var(--blue)' },
}

// Urgency heat bar
function HeatBar({ urgency }) {
  const pct = (urgency / 5) * 100
  const color = urgency >= 4 ? 'var(--red)' : urgency === 3 ? 'var(--yellow)' : 'var(--green)'
  return (
    <div style={{ width: 32, height: 4, background: 'var(--bg3)', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
      <div style={{ width: pct + '%', height: '100%', background: color, borderRadius: 2 }} />
    </div>
  )
}

export default function Feed() {
  const { navigate } = useApp()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all | open | resolved
  const [sortBy, setSortBy] = useState('urgency') // urgency | time

  const processed = useMemo(() => {
    let items = [...feedItems]

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(f =>
        f.title.toLowerCase().includes(q) || f.sub.toLowerCase().includes(q)
      )
    }
    if (filter === 'open')     items = items.filter(f => f.status !== 'resolved')
    if (filter === 'resolved') items = items.filter(f => f.status === 'resolved')

    if (sortBy === 'urgency') {
      items.sort((a, b) => b.urgency - a.urgency || a.ageMin - b.ageMin)
    } else {
      items.sort((a, b) => a.ageMin - b.ageMin)
    }
    return items
  }, [search, filter, sortBy])

  const critical = feedItems.filter(f => f.urgency >= 4 && f.status !== 'resolved')
  const open     = feedItems.filter(f => f.status === 'open' || f.status === 'in-progress')

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Signal Stream</div>
        <div className="page-sub">Live feed sorted by urgency — critical items surface first, resolved items sink to bottom</div>
      </div>
      <div className="no-pii-bar"><div className="live-dot" />All signals are normalised scores and flags — zero raw PII in this stream</div>

      {/* Summary strip */}
      <div className="stat-row" style={{ marginBottom: 14 }}>
        <div className="stat-cell" style={{ borderColor: 'var(--red-border)', background: 'var(--red-bg)' }}>
          <div className="stat-val red" style={{ fontSize: 20 }}>{critical.length}</div>
          <div className="stat-label" style={{ color: 'var(--red)' }}>🔴 Critical / High — open</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val yellow" style={{ fontSize: 20 }}>{open.length}</div>
          <div className="stat-label">🟡 Total open signals</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val green" style={{ fontSize: 20 }}>{feedItems.length - open.length}</div>
          <div className="stat-label">🟢 Resolved / Auto-cleared</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Filter signals…"
            style={{
              width: '100%', padding: '7px 30px 7px 10px',
              border: '1px solid var(--border)', borderRadius: 'var(--r)',
              background: 'var(--bg)', color: 'var(--text)', fontSize: 12,
              fontFamily: 'var(--font)', outline: 'none',
              transition: 'border-color var(--transition)',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--blue)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 14 }}>×</button>
          )}
        </div>

        {/* Status filter */}
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', flexShrink: 0 }}>
          {['all', 'open', 'resolved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 12px', border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, fontFamily: 'var(--font)',
                background: filter === f ? 'var(--blue)' : 'var(--bg)',
                color: filter === f ? '#fff' : 'var(--text3)',
                transition: 'all var(--transition)',
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 'var(--r)', overflow: 'hidden', flexShrink: 0 }}>
          {[['urgency', '⚡ Urgency'], ['time', '🕐 Time']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              style={{
                padding: '6px 12px', border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, fontFamily: 'var(--font)',
                background: sortBy === key ? 'var(--blue)' : 'var(--bg)',
                color: sortBy === key ? '#fff' : 'var(--text3)',
                transition: 'all var(--transition)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="card fade-in" style={{ padding: 0 }}>
        {processed.length === 0 ? (
          <div style={{ color: 'var(--text3)', fontSize: 12, padding: 20, textAlign: 'center' }}>
            No signals match your filter.
          </div>
        ) : processed.map((f, i) => {
          const isOpen = f.status !== 'resolved'
          return (
            <div
              key={i}
              onClick={() => navigate(f.page)}
              style={{
                display: 'flex', gap: 10, padding: '11px 16px',
                borderBottom: i < processed.length - 1 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer', alignItems: 'flex-start',
                transition: 'background var(--transition)',
                opacity: isOpen ? 1 : .6,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Urgency indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0, paddingTop: 2 }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: f.color, flexShrink: 0 }} />
                <HeatBar urgency={f.urgency} />
              </div>

              {/* Body */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)' }}>{f.title}</span>
                  <span style={{ fontSize: 9.5, fontWeight: 700, padding: '1px 6px', borderRadius: 'var(--r-full)', flexShrink: 0, ...TAG_STYLE[f.tag] }}>
                    {f.tag}
                  </span>
                  {!isOpen && (
                    <span style={{ fontSize: 9.5, color: 'var(--green)', fontWeight: 600 }}>✓ RESOLVED</span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{f.sub}</div>
              </div>

              {/* Time + urgency rank */}
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: 'var(--text4)' }}>{f.time}</div>
                <div style={{ fontSize: 9.5, color: URGENCY_COLOR[f.urgency], fontWeight: 600, marginTop: 2 }}>
                  {URGENCY_LABEL[f.urgency]}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
