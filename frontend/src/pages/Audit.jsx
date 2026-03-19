import { useApp } from '../context/AppContext'

export default function Audit() {
  const { notify } = useApp()
  const doFlow = (k) => {
    const msgs = {
      audit_pkg: '📦 Audit package generated — 47 pages, all evidence timestamped',
      audit_sar: '📄 SAR decision trail exported — 34 filings, 12-month window',
      audit_kyc: '📋 KYC coverage report generated — 2,847 entities, gap analysis included',
      audit_fp:  '📊 False-positive analysis report ready — per-provider, per-jurisdiction breakdown',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  const qaItems = [
    {
      cls: 'alert-ok', q: '"How do you handle provider conflicts?"',
      a: '47 conflicts resolved this quarter. Each with documented root cause, resolution logic, and analyst sign-off. Average resolution time: 22 minutes. Zero unresolved conflicts older than 48 hours.',
    },
    {
      cls: 'alert-ok', q: '"What\'s your false positive rate and how do you manage it?"',
      a: 'Overall FP rate: 89% (industry avg: 95%). FP-to-true-positive conversion tracked per provider, per jurisdiction, per alert type. 70+ learned FP patterns documented with evidence trail.',
    },
    {
      cls: 'alert-ok', q: '"Show me your SAR decision trail for the last 12 months."',
      a: '34 SARs filed. Each with complete signal history: initial screening results, escalation chain, analyst notes, reasoning engine recommendations, override decisions (with documented rationale), and filing confirmation timestamps.',
    },
    {
      cls: 'alert-ok', q: '"How current are your KYC files?"',
      a: '2,387 of 2,847 entities (84%) current. 142 overdue — prioritised by risk, not calendar. 8 flagged critical (material changes detected). Remediation timeline: 2 weeks for critical, 6 weeks for full backlog.',
    },
    {
      cls: 'alert-warn', q: '"What\'s your coverage gap on crypto entities under MiCA?"',
      a: '23 crypto-exposed entities. 7 non-compliant with Travel Rule. Remediation plan in progress — target: full compliance by May 2026, 30 days before enforcement.',
    },
  ]

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Audit & Examiner Readiness</div>
        <div className="page-sub">In 2026, regulators evaluate the effectiveness of controls, not just their presence. The reasoning engine generates the audit trail that proves your program works.</div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Program Effectiveness Dashboard</div><div className="card-sub">Ready for examiner review at any time — no last-minute scramble</div></div></div>
        <div className="stat-row" data-tour="audit-score">
          <div className="stat-cell"><div className="stat-val green" style={{ fontSize: 20 }}>94.2%</div><div className="stat-label">Alert disposition accuracy</div></div>
          <div className="stat-cell"><div className="stat-val green" style={{ fontSize: 20 }}>98.7%</div><div className="stat-label">SARs filed on time</div></div>
          <div className="stat-cell"><div className="stat-val green" style={{ fontSize: 20 }}>100%</div><div className="stat-label">Sanctions screens current</div></div>
          <div className="stat-cell"><div className="stat-val yellow"style={{ fontSize: 20 }}>95.0%</div><div className="stat-label">KYC reviews current</div></div>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Examiner Questions the Engine Can Answer Instantly</div><div className="card-sub">Every question backed by timestamped, immutable audit trail</div></div></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {qaItems.map((item, i) => (
            <div className={`alert-box ${item.cls}`} key={i} style={{ marginBottom: 0 }}>
              <div className="alert-icon">Q</div>
              <div><strong>{item.q}</strong><br />{item.a}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Audit Package Generator</div><div className="card-sub">One click = complete examiner package with all evidence</div></div></div>
        <div className="reasoning-box">
          <div className="reasoning-hdr">💡 The Old Way vs. Venn</div>
          <div className="reasoning-text">
            <span className="flag">Industry average: compliance teams spend 1–2 weeks preparing for examiner visits</span> — pulling spreadsheets, compiling email threads, reconstructing decision histories. With the reasoning engine, every decision is already logged with timestamp, analyst ID, and reasoning context. The <span className="ok">examiner package is always current — generated in 30 seconds</span>, not 2 weeks.
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => doFlow('audit_pkg')}>📦 Generate Audit Package</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('audit_sar')}>📄 SAR Decision Trail (12mo)</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('audit_kyc')}>📋 KYC Coverage Report</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('audit_fp')}>📊 FP Analysis Report</button>
        </div>
      </div>
    </div>
  )
}
