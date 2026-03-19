import { useApp } from '../../context/AppContext'

const TYPE_ICONS = { navigate: '🧭', review: '👁', action: '✓', query: '💬', demo: '▶' }

export default function LogPane() {
  const { auditLog, notify } = useApp()

  const handleExport = () => notify('📦 Audit package generated — 47 pages, all evidence timestamped')

  return (
    <>
      <div className="detail-hdr" style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="detail-hdr-title">🔒 Action Audit Trail</div>
            <div className="detail-hdr-sub">All analyst actions — timestamped, immutable</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={handleExport}>Export</button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 0 }}>
        {auditLog.length === 0 ? (
          <div style={{ color: 'var(--text3)', fontSize: 12, padding: 20, textAlign: 'center' }}>
            No actions recorded yet.<br />Start reviewing cases to build your audit trail.
          </div>
        ) : auditLog.map(e => (
          <div className="log-entry" key={e.id}>
            <div className="log-ts">{e.ts} · {e.analyst} · #{String(e.id).padStart(4, '0')}</div>
            <div className="log-act">{TYPE_ICONS[e.type] || '•'} {e.action}</div>
            {e.context && <div className="log-ctx">{e.context}</div>}
          </div>
        ))}
      </div>
    </>
  )
}
