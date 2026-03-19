import { useApp } from '../context/AppContext'

export default function Escalation() {
  const { notify, navigate } = useApp()
  const doFlow = (k) => {
    const msgs = {
      reassign: '↷ Case reassigned — team notified',
      legal:    '⚑ Legal team notified — secure message sent',
      enhanced: '🔍 Enhanced monitoring active — daily re-screen enabled',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Escalation Queue</div>
        <div className="page-sub">Cases escalated to senior analysts — with full reasoning context pre-attached</div>
      </div>

      <div className="card fade-in" data-tour="escalation-first">
        <div className="card-header">
          <div><div className="card-title">TechNova FZE</div><div className="card-sub">Escalated by: Auto-engine · 14 minutes ago · Assigned to: Sara Levy</div></div>
          <div className="badge badge-high">High</div>
        </div>
        <div className="alert-box alert-danger" style={{ marginBottom: 8 }}>
          <div className="alert-icon">🚨</div>
          <div>UBO + crypto wallet conflict. CA screen stale. Transaction hold in place. Reasoning engine recommends SAR preparation if re-screen confirms exposure.</div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => navigate('conflict')}>Open Case</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('reassign')}>↷ Reassign</button>
        </div>
      </div>

      <div className="card fade-in" style={{ opacity: .9 }}>
        <div className="card-header">
          <div><div className="card-title">Meridian Capital — Sorokin Sanctions</div><div className="card-sub">Escalated by: Bridger XG Batch · 2 hours ago · Assigned to: Sara Levy</div></div>
          <div className="badge badge-high">Urgent</div>
        </div>
        <div className="alert-box alert-danger" style={{ marginBottom: 8 }}>
          <div className="alert-icon">🚨</div>
          <div>OFAC SDN designation 3 days ago. Freeze obligations apply today. Legal review recommended before any communication with client.</div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => navigate('conflict')}>Open Case</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('legal')}>⚑ Notify Legal</button>
        </div>
      </div>

      <div className="card fade-in" style={{ opacity: .8 }}>
        <div className="card-header">
          <div><div className="card-title">Nexus Trading Ltd</div><div className="card-sub">Escalated by: Pattern engine · 1 day ago · Assigned to: David Cohen</div></div>
          <div className="badge badge-pattern">Pattern</div>
        </div>
        <div className="alert-box alert-purple" style={{ marginBottom: 8 }}>
          <div className="alert-icon">🧠</div>
          <div>Pre-SAR trajectory match. No immediate violation — but enhanced monitoring recommended. Review by EOD.</div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => navigate('pattern')}>Open Case</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('enhanced')}>🔍 Enhanced Monitoring</button>
        </div>
      </div>
    </div>
  )
}
