import { useApp } from '../context/AppContext'

export default function Remediation() {
  const { notify } = useApp()
  const doFlow = (k) => {
    const msgs = {
      remed_critical: '🚨 Critical 8 review workflow started — cases assigned to senior analysts',
      remed_batch:    '↻ Batch refresh queued for 134 unchanged entities — estimated 4 hours',
      remed_schedule: '📅 318 upcoming reviews scheduled across next 30 days — team notified',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">KYC Remediation Backlog</div>
        <div className="page-sub">40% of banks take 30–60 days for a single corporate KYC review. Some take 150–210 days. Regulators in 2026 expect perpetual monitoring, not periodic reviews.</div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Remediation Pipeline</div><div className="card-sub">MoneyNet's current entity portfolio — remediation status</div></div></div>
        <div className="stat-row">
          <div className="stat-cell"><div className="stat-val"       style={{ fontSize: 20 }}>2,847</div><div className="stat-label">Total active entities</div></div>
          <div className="stat-cell"><div className="stat-val red"   style={{ fontSize: 20 }}>142</div>  <div className="stat-label">Overdue for review</div></div>
          <div className="stat-cell"><div className="stat-val yellow"style={{ fontSize: 20 }}>318</div>  <div className="stat-label">Due within 30 days</div></div>
          <div className="stat-cell"><div className="stat-val green" style={{ fontSize: 20 }}>2,387</div><div className="stat-label">Current</div></div>
        </div>
        <div className="pbar"><div className="pbar-fill" style={{ width: '84%', background: 'var(--green)' }} /></div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Smart Prioritisation — Overdue Reviews</div><div className="card-sub">Engine ranks the 142 overdue reviews by actual risk, not just calendar date</div></div></div>
        <div className="alert-box alert-danger" style={{ marginBottom: 8 }}>
          <div className="alert-icon">🚨</div>
          <div><strong>Critical: 8 high-risk entities</strong> are overdue by 90+ days and have had material changes since last review. These should be cleared before any examiner visit.</div>
        </div>
        {[
          ['Priority 1', 'red',    'Opal Ventures FZE — overdue 127d, UBO changed, new Elliptic flag',               'Changed'],
          ['Priority 2', 'red',    'Baltic Freight Corp — overdue 98d, new adverse media hit, jurisdiction risk upgrade', 'Changed'],
          ['Priority 3', 'red',    'Crescent Financial — overdue 94d, 2 new PEP connections via UBO chain',           'Changed'],
          ['Priority 4', 'yellow', 'HexaPort Trading — overdue 112d, no material change detected',                    'Calendar only'],
          ['Priority 5', 'yellow', 'Maple Leaf Holdings — overdue 91d, no material change detected',                  'Calendar only'],
        ].map(([pri, color, desc, status]) => (
          <div className="hl-row" key={pri} style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', gap: 8, flex: 1, alignItems: 'center' }}>
              <span className={`tag tag-${color}`}>{pri}</span>
              <span style={{ fontSize: 11, color: 'var(--text2)' }}>{desc}</span>
            </div>
            <span style={{ color: `var(--${color})`, fontSize: 11, fontWeight: 600 }}>{status}</span>
          </div>
        ))}
        <div className="reasoning-box" style={{ marginTop: 12 }}>
          <div className="reasoning-hdr">⚡ Reasoning: Calendar vs. Risk</div>
          <div className="reasoning-text">
            Traditional remediation queues sort by calendar date. The reasoning engine adds a <span className="h">risk-weighted layer</span>: it checks whether anything <span className="flag">materially changed</span> since the last review. Of the 142 overdue entities, <span className="flag">8 have material changes requiring immediate attention</span>. The remaining 134 are overdue on paper but <span className="ok">unchanged in risk profile</span> — they can be batch-refreshed with confidence. This turns a 6-month remediation project into a <span className="h">2-week sprint</span> focused on the 8 that actually matter.
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-danger"  onClick={() => doFlow('remed_critical')}>🚨 Start Critical 8 Reviews</button>
          <button className="btn btn-primary" onClick={() => doFlow('remed_batch')}>↻ Batch-Refresh 134 Unchanged</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('remed_schedule')}>📅 Schedule Remaining 318</button>
        </div>
      </div>
    </div>
  )
}
