import { useApp } from '../context/AppContext'
import { feedItems } from '../data/index'

const d = new Date()
const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const TODAY = `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`

export default function Home() {
  const { navigate, notify, showHistory } = useApp()

  const doFlow = (k) => {
    const msgs = {
      freeze: '🔒 Freeze protocol initiated — Legal notified — MoneyNet ops alerted',
      sarflag: '⚑ Case flagged for SAR preparation — see SAR queue',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  return (
    <div className="fade-in">
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        borderRadius: 'var(--r-lg)', padding: '18px 22px', marginBottom: 14,
        color: '#fff', boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>👋 Good morning, Sara.</div>
        <div style={{ fontSize: 11.5, opacity: .8, marginTop: 3 }}>
          {TODAY} · MoneyNet Financial Services · Senior Analyst
        </div>
      </div>

      <div className="no-pii-bar">
        <div className="live-dot" />
        Reasoning engine active · 5 providers synced · 2,847 entities monitored · No PII stored
      </div>

      <div className="stat-row">
        <div className="stat-cell clickable" onClick={() => navigate('conflict')}>
          <div className="stat-val red">4</div>
          <div className="stat-label">🔴 High Risk — Action Required</div>
        </div>
        <div className="stat-cell clickable" onClick={() => navigate('escalation')}>
          <div className="stat-val yellow">9</div>
          <div className="stat-label">🟡 In Review Queue</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val green">187</div>
          <div className="stat-label">🟢 Auto-Cleared Today</div>
        </div>
        <div className="stat-cell clickable" onClick={() => navigate('sar')}>
          <div className="stat-val blue">2</div>
          <div className="stat-label">🔵 SARs Pending Filing</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">🚨 Priority Queue — Requires Your Decision</div>
            <div className="card-sub">Engine pre-assessed and ranked these 3 cases. Estimated combined analyst time: 2.5 hours.</div>
          </div>
        </div>

        <div className="priority-item" onClick={() => navigate('conflict')}>
          <div className="priority-icon">⚡</div>
          <div className="priority-body">
            <div className="priority-title">
              TechNova FZE — Provider Conflict Unresolved
              <span className="tag tag-red" style={{ marginLeft: 6 }}>Urgent</span>
            </div>
            <div className="priority-sub">
              Reg. DMCC-252847 · Elliptic wallet 0x3f5CE96… scored 8.4/10 · UBO Faisal Al-Rashid (26%) added 14 Mar · CA re-screen now in progress (11 days stale)
            </div>
            <div className="priority-action">
              <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); navigate('conflict') }}>Open Case →</button>
            </div>
          </div>
          <div className="badge badge-high">High Risk</div>
        </div>

        <div className="priority-item" onClick={() => navigate('conflict')}>
          <div className="priority-icon">🔒</div>
          <div className="priority-body">
            <div className="priority-title">
              Meridian Capital — OFAC SDN Match
              <span className="tag tag-red" style={{ marginLeft: 6 }}>Legal Required</span>
            </div>
            <div className="priority-sub">
              Fund Reg. CI-88241 · LP Viktor Sorokin (8.3%) designated OFAC SDN 15 Mar 2026 · Freeze protocol active · Legal sign-off pending
            </div>
            <div className="priority-action">
              <button className="btn btn-danger btn-sm" onClick={e => { e.stopPropagation(); navigate('conflict') }}>Open Case →</button>
            </div>
          </div>
          <div className="badge badge-high">Critical</div>
        </div>

        <div className="priority-item" onClick={() => navigate('transaction')}>
          <div className="priority-icon">💸</div>
          <div className="priority-body">
            <div className="priority-title">
              Ibrahim Al-Hassan — Structuring Pattern
              <span className="tag tag-yellow" style={{ marginLeft: 6 }}>SAR Queued</span>
            </div>
            <div className="priority-sub">
              Acct MNT-284719 · 9 txns €4,650–€4,950 between 06:12–10:47 GMT · Total €47,250 · 11× monthly baseline · New wallet 0xA91B... added same day
            </div>
            <div className="priority-action">
              <button className="btn btn-warn btn-sm" onClick={e => { e.stopPropagation(); navigate('transaction') }}>Open Case →</button>
            </div>
          </div>
          <div className="badge badge-medium">Medium Risk</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div><div className="card-title">⏱ Regulatory Deadline Countdown</div><div className="card-sub">Days remaining to key compliance deadlines</div></div>
        </div>
        <div className="countdown-row">
          {[
            { val: 40,  color: 'var(--red)',    label: 'UK Failure to Prevent Fraud' },
            { val: 74,  color: 'var(--yellow)', label: 'MiCA Travel Rule Enforcement' },
            { val: 110, color: 'var(--yellow)', label: 'AMLA Direct Supervision' },
            { val: 134, color: 'var(--red)',    label: 'EU AI Act Annex III' },
          ].map(c => (
            <div key={c.label} className="countdown-cell" onClick={() => navigate('regchange')}>
              <div className="countdown-val" style={{ color: c.color }}>{c.val}</div>
              <div className="countdown-lbl">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header"><div><div className="card-title">📡 Provider Status</div><div className="card-sub">Last sync: 2 min ago</div></div></div>
          {[
            { name: 'Sumsub KYC/KYB',    status: '✓ Operational' },
            { name: 'ComplyAdvantage',    status: '✓ Running' },
            { name: 'Elliptic Blockchain',status: '✓ Operational' },
            { name: 'Bridger XG Sanctions',status: '✓ SDN list current' },
            { name: 'Trulioo Global KYC', status: '✓ Operational' },
          ].map(p => (
            <div className="provider-row" key={p.name}>
              <div className="provider-dot" style={{ background: 'var(--green)' }} />
              <span className="provider-name">{p.name}</span>
              <span className="provider-status green">{p.status}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-header"><div><div className="card-title">📊 This Week</div><div className="card-sub">Mon 16 — today</div></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              ['Alerts received',              '1,247'],
              ['Auto-dismissed by engine',     '1,081 (87%)', 'green'],
              ['Analyst reviewed',             '147'],
              ['True escalations',             '19', 'yellow'],
              ['SARs filed',                   '3', 'blue'],
              ['Avg resolution time',          '22 min', 'green'],
            ].map(([label, val, color]) => (
              <div className="hl-row" key={label}>
                {label}
                <span style={color ? { color: `var(--${color})` } : {}}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div><div className="card-title">⚡ Recent Activity</div></div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('feed')}>View all →</button>
        </div>
        {feedItems.slice(0, 5).map((f, i) => (
          <div className="feed-item" key={i}>
            <div className="feed-dot" style={{ background: f.color }} />
            <div className="feed-body">
              <div className="feed-title">{f.title}</div>
              <div className="feed-sub">{f.sub}</div>
            </div>
            <div className="feed-time">{f.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
