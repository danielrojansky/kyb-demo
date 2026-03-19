function AnalyticsBar({ label, value, pct, color }) {
  return (
    <div className="analytics-bar" style={{ marginBottom: 10 }}>
      <div className="analytics-bar-top">
        <span>{label}</span>
        <span style={{ color: `var(--${color})`, fontWeight: 600 }}>{value}</span>
      </div>
      <div className="analytics-bar-track">
        <div
          className="analytics-bar-fill"
          style={{ width: pct + '%', background: `var(--${color})` }}
        />
      </div>
    </div>
  )
}

export default function Analytics() {
  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Analytics</div>
        <div className="page-sub">Reasoning engine performance — accuracy, efficiency, and pattern health</div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">This Month</div></div></div>
        <div className="stat-row">
          <div className="stat-cell"><div className="stat-val green" style={{ fontSize: 20 }}>94.2%</div><div className="stat-label">Dismissal accuracy</div></div>
          <div className="stat-cell"><div className="stat-val blue"  style={{ fontSize: 20 }}>−68%</div><div className="stat-label">Alert review time</div></div>
          <div className="stat-cell"><div className="stat-val yellow"style={{ fontSize: 20 }}>3.1×</div><div className="stat-label">More SARs filed vs prev period</div></div>
        </div>
        <div className="stat-row">
          <div className="stat-cell"><div className="stat-val" style={{ fontSize: 20 }}>5,284</div><div className="stat-label">Entities screened</div></div>
          <div className="stat-cell"><div className="stat-val red"   style={{ fontSize: 20 }}>8</div><div className="stat-label">SARs filed</div></div>
          <div className="stat-cell"><div className="stat-val green" style={{ fontSize: 20 }}>2,341</div><div className="stat-label">Auto-cleared (no analyst)</div></div>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Provider Signal Quality</div><div className="card-sub">False positive rates by provider — feeds dismissal confidence model</div></div></div>
        <AnalyticsBar label="Sumsub KYC/KYB"             value="FP rate: 3.1%"  pct={3}  color="green" />
        <AnalyticsBar label="ComplyAdvantage adverse media" value="FP rate: 38.7%" pct={39} color="yellow" />
        <AnalyticsBar label="ComplyAdvantage PEP"         value="FP rate: 22.4%" pct={22} color="yellow" />
        <AnalyticsBar label="Bridger XG sanctions"        value="FP rate: 1.8%"  pct={2}  color="green" />
        <AnalyticsBar label="Elliptic crypto screening"   value="FP rate: 14.2%" pct={14} color="yellow" />
        <div className="alert-box alert-info" style={{ marginTop: 10, marginBottom: 0 }}>
          <div className="alert-icon">💡</div>
          <div>ComplyAdvantage adverse media has a 38.7% FP rate for this customer base. The reasoning engine auto-pre-scores CA adverse media hits against prior patterns — <strong>71% are pre-tagged as likely FP before analyst review</strong>.</div>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Analyst Time Savings</div><div className="card-sub">Before vs. after reasoning engine</div></div></div>
        {[
          ['Alert review time per week',  'Before: 519h', 'After: 68h',   'green'],
          ['True positives surfaced',     'Before: 6/mo', 'After: 19/mo', 'blue'],
          ['SARs filed per quarter',      'Before: 2.6',  'After: 8.1',   'purple'],
          ['Avg case resolution time',    'Before: 4.2h', 'After: 22min', 'green'],
        ].map(([label, before, after, color]) => (
          <div className="hl-row" key={label} style={{ flexWrap: 'wrap', gap: 6 }}>
            <span>{label}</span>
            <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
              <span style={{ color: 'var(--text3)' }}>{before}</span>
              <span>→</span>
              <span style={{ color: `var(--${color})`, fontWeight: 600 }}>{after}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
