import { useApp } from '../context/AppContext'

const TYPE_ICONS = { navigate: '🧭', review: '👁', action: '✓', query: '💬', demo: '▶' }

export default function AuditLog() {
  const { auditLog, notify } = useApp()
  const nav = auditLog.filter(e => e.type === 'navigate').length
  const act = auditLog.filter(e => e.type === 'action').length
  const qry = auditLog.filter(e => e.type === 'query').length

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Analyst Action Audit Log</div>
        <div className="page-sub">Complete timestamped record of all analyst interactions — case reviews, decisions, AI queries, and escalations. Tamper-evident. Examiner-ready.</div>
      </div>
      <div className="no-pii-bar"><div className="live-dot" />All actions recorded automatically · Analyst-attributed · Immutable audit chain</div>

      <div className="card fade-in">
        <div className="card-header">
          <div><div className="card-title">Session Summary</div><div className="card-sub">Current session · Analyst: Sara Levy · MoneyNet Compliance</div></div>
          <div className="actions" style={{ marginTop: 0 }}>
            <button className="btn btn-primary btn-sm" onClick={() => notify('📦 Audit package generated — 47 pages, all evidence timestamped')}>📦 Export Package</button>
            <button className="btn btn-ghost btn-sm"  onClick={() => notify('⬇ CSV export downloaded')}>⬇ CSV</button>
          </div>
        </div>
        <div className="stat-row">
          <div className="stat-cell"><div className="stat-val blue"   style={{ fontSize: 22 }}>{auditLog.length}</div><div className="stat-label">Total Actions</div></div>
          <div className="stat-cell"><div className="stat-val green"  style={{ fontSize: 22 }}>{nav}</div><div className="stat-label">Pages Reviewed</div></div>
          <div className="stat-cell"><div className="stat-val yellow" style={{ fontSize: 22 }}>{act}</div><div className="stat-label">Decisions Made</div></div>
          <div className="stat-cell"><div className="stat-val purple" style={{ fontSize: 22 }}>{qry}</div><div className="stat-label">AI Queries</div></div>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Action Log</div><div className="card-sub">Most recent first · Each entry: timestamp, analyst ID, action type, context</div></div></div>
        {auditLog.length === 0 ? (
          <div style={{ color: 'var(--text3)', fontSize: 12, padding: '20px 0', textAlign: 'center' }}>
            No actions recorded yet. Start reviewing cases to build your audit trail.
          </div>
        ) : (
          <div style={{ maxHeight: 450, overflowY: 'auto' }}>
            {auditLog.map(e => (
              <div className="log-entry" key={e.id}>
                <div className="log-ts">{e.ts} · {e.analyst} · Ref #{String(e.id).padStart(4, '0')}</div>
                <div className="log-act">{TYPE_ICONS[e.type] || '•'} {e.action}</div>
                {e.context && <div className="log-ctx">{e.context}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
