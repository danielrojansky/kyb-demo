import { useApp } from '../context/AppContext'

export default function AlertFatigue() {
  const { notify } = useApp()
  const doFlow = (k) => {
    const msgs = {
      batch_dismiss: '✓ 1,081 auto-dismissals approved — rationale logged to audit trail',
      review_queue:  '📋 Pre-scored review queue opened — 147 alerts sorted by confidence',
      escalations:   '🚨 19 true escalations loaded — highest priority first',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Alert Fatigue Triage</div>
        <div className="page-sub">Industry-wide, up to 95% of AML alerts are false positives — consuming 42% of compliance resources. The reasoning engine pre-scores every alert before your analysts see it.</div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">This Week's Alert Load</div><div className="card-sub">Before vs. after reasoning engine triage</div></div></div>
        <div className="stat-row">
          <div className="stat-cell"><div className="stat-val"       style={{ fontSize: 20 }}>1,247</div><div className="stat-label">Raw alerts received</div></div>
          <div className="stat-cell"><div className="stat-val green" style={{ fontSize: 20 }}>1,081</div><div className="stat-label">Auto-triaged (87%)</div></div>
          <div className="stat-cell"><div className="stat-val yellow"style={{ fontSize: 20 }}>147</div>  <div className="stat-label">Pre-scored for fast review</div></div>
          <div className="stat-cell"><div className="stat-val red"   style={{ fontSize: 20 }}>19</div>   <div className="stat-label">True escalations</div></div>
        </div>
        <div className="alert-box alert-ok">
          <div className="alert-icon">✓</div>
          <div>Without the engine, your 4-person team reviews 1,247 alerts manually at ~25 min each = <strong>519 analyst-hours/week</strong>. With the engine: 19 true escalations + 147 pre-scored reviews = <strong>68 analyst-hours/week</strong>. That's an 87% reduction in analyst burden.</div>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Auto-Triage Queue — Pre-Scored Alerts</div><div className="card-sub">Engine assigns confidence scores + dismissal rationale before analyst review</div></div></div>
        {[
          ['green', 'FP 97%', '"Ahmed Al-Mansouri" — CA adverse media — common name, UAE, no corroborating signal', 'Auto-dismiss'],
          ['green', 'FP 94%', '"Li Wei" — CA PEP — matches 23 prior FP cases same name/UK jurisdiction', 'Auto-dismiss'],
          ['green', 'FP 91%', '"Maria Garcia" — Bridger XG fuzzy match — name overlap with sanctioned individual in different jurisdiction', 'Auto-dismiss'],
          ['yellow','FP 62%', '"Dmitri Volkov" — CA PEP + adverse media — low confidence but 2 corroborating signals', 'Quick Review'],
          ['red',   'FP 12%', '"Constellation Holdings Ltd" — Sumsub UBO + Elliptic wallet + CA sanctions proximity', 'Escalate'],
        ].map(([color, label, desc, action]) => (
          <div className="hl-row" key={label} style={{ flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flex: 1 }}>
              <span className={`tag tag-${color}`}>{label}</span>
              <span style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>{desc}</span>
            </div>
            <span style={{ color: `var(--${color})`, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{action}</span>
          </div>
        ))}
        <div className="reasoning-box" style={{ marginTop: 12 }}>
          <div className="reasoning-hdr">⚡ How the Engine Decides</div>
          <div className="reasoning-text">
            Each alert is scored against <span className="h">70+ false-positive fingerprints</span> built from 18 months of analyst decisions. The model weighs: provider reliability for this alert type, name frequency in jurisdiction, corroborating signals from other providers, and historical outcome for similar alerts. Alerts above <span className="ok">85% FP confidence</span> are auto-dismissed with logged rationale. Between <span className="warn">50–85%</span> get pre-scored for fast review. Below <span className="flag">50%</span> are true escalations. Every analyst override refines the model — it gets better every week.
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => doFlow('batch_dismiss')}>✓ Approve Auto-Dismissals (1,081)</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('review_queue')}>📋 Open Review Queue (147)</button>
          <button className="btn btn-danger"  onClick={() => doFlow('escalations')}>🚨 View Escalations (19)</button>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Analyst Wellness Impact</div><div className="card-sub">Industry benchmark: 83% of AML analysts report being overwhelmed · 65% consider leaving</div></div></div>
        <div className="reasoning-box">
          <div className="reasoning-hdr">💡 Team Health</div>
          <div className="reasoning-text">
            Before the reasoning engine, MoneyNet's team was reviewing <span className="flag">312 alerts per analyst per week</span>. After engine deployment: <span className="ok">42 alerts per analyst per week</span> — of which 37 are pre-scored with dismissal rationale. Senior analyst Sara Levy now spends <span className="h">80% of her time on genuine investigations</span> vs. 15% before. Team turnover intent dropped from 3 of 4 analysts to zero in the first quarter.
          </div>
        </div>
      </div>
    </div>
  )
}
