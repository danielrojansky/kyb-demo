import { useApp } from '../context/AppContext'

export default function Transaction() {
  const { notify, showHistory, navigate } = useApp()
  const doFlow = (k) => {
    const msgs = {
      hold:     '⏸ 24h review hold placed — customer notified via automated message',
      escalate: '⚑ Case escalated to AML team — context pre-attached',
      sarflag:  '⚑ SAR preparation started — see SAR queue',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Transaction Screening</div>
        <div className="page-sub">Real-time screening of a payment mid-processing — decision required in &lt;30 seconds</div>
      </div>
      <div className="no-pii-bar">
        <div className="live-dot" />
        Transaction metadata only — no account numbers, no PII from IronBlocks perspective
      </div>

      <div className="card clickable fade-in" onClick={() => showHistory('Ibrahim Al-Hassan')}>
        <div className="card-header">
          <div>
            <div className="card-title">
              Ibrahim Al-Hassan <span className="tag tag-red">Anomaly</span><span className="tag tag-yellow">Pending</span>
            </div>
            <div className="card-sub">Retail customer · Egypt → Germany transfer · Transaction spike detected</div>
          </div>
          <div className="badge badge-high">Hold</div>
        </div>
        <div className="signals">
          <div className="sig"><div className="sig-prov">Profile Risk</div><div className="sig-val green">2.1</div><div className="sig-lbl">Baseline</div></div>
          <div className="sig"><div className="sig-prov">Tx Volume</div><div className="sig-val red">11×</div><div className="sig-lbl">vs 30d avg</div></div>
          <div className="sig"><div className="sig-prov">New Wallet</div><div className="sig-val yellow">!</div><div className="sig-lbl">First seen</div></div>
          <div className="sig"><div className="sig-prov">Elliptic</div><div className="sig-val yellow">4.2</div><div className="sig-lbl">Wallet Risk</div></div>
        </div>
        <div className="alert-box alert-warn">
          <div className="alert-icon">⚠</div>
          <div><strong>Behavioural Anomaly</strong> — €47,000 across 9 transactions in 4 hours. 30-day average: €4,100/month. Structuring pattern possible (9 transactions below €5,000 threshold in 4 hours).</div>
        </div>
        <div className="reasoning-box" data-tour="txn-reasoning">
          <div className="reasoning-hdr">⚡ Real-time Reasoning</div>
          <div className="reasoning-text">
            Ibrahim Al-Hassan's baseline risk profile is <span className="ok">2.1/10 — low</span>, established over 4 months of normal activity. Today's activity deviates sharply: <span className="flag">11× his 30-day transaction average</span>, all directed to a wallet address first seen 6 days ago. Elliptic rates the destination wallet at <span className="warn">4.2/10</span> — elevated but not conclusive. The structuring pattern (9 transactions, all €4,800–€4,950) is the most significant signal. Reasoning engine cross-referenced: <span className="h">3 prior cases with identical structuring signatures</span> resulted in SARs. Recommended action: place a 24-hour review hold, send automated RFI to customer, and escalate to AML analyst for manual review within 2 hours.
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-warn"    onClick={e => { e.stopPropagation(); doFlow('hold') }}>⏸ 24h Review Hold</button>
          <button className="btn btn-primary" onClick={e => { e.stopPropagation(); navigate('rfi') }}>✉ Auto-draft RFI</button>
          <button className="btn btn-ghost"   onClick={e => { e.stopPropagation(); doFlow('escalate') }}>⚑ Escalate to AML</button>
          <button className="btn btn-danger"  onClick={e => { e.stopPropagation(); doFlow('sarflag') }}>⚑ Start SAR</button>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header">
          <div><div className="card-title">Screening Stats — Today</div><div className="card-sub">All transactions processed through reasoning engine before settlement</div></div>
        </div>
        <div className="stat-row">
          <div className="stat-cell"><div className="stat-val green">1,842</div><div className="stat-label">Auto-cleared</div></div>
          <div className="stat-cell"><div className="stat-val yellow">14</div><div className="stat-label">Flagged for review</div></div>
          <div className="stat-cell"><div className="stat-val red">3</div><div className="stat-label">Held</div></div>
        </div>
        <div className="reasoning-box" style={{ marginTop: 4 }}>
          <div className="reasoning-hdr">💡 Engine Insight</div>
          <div className="reasoning-text">
            Of the 14 flagged transactions, <span className="h">11 match known false-positive patterns</span> from prior cases and have been pre-annotated with dismissal rationale. Analyst review time estimated at <span className="ok">4 minutes</span> vs. 40 minutes without reasoning context.
          </div>
        </div>
      </div>
    </div>
  )
}
