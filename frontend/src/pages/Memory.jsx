export default function Memory() {
  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Institutional Memory</div>
        <div className="page-sub">The compounding moat — every analyst decision enriches the reasoning engine</div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Knowledge Base Stats</div><div className="card-sub">18 months of accumulated decisions</div></div></div>
        <div className="stat-row">
          <div className="stat-cell"><div className="stat-val blue">4,821</div><div className="stat-label">Total decisions logged</div></div>
          <div className="stat-cell"><div className="stat-val green">89%</div><div className="stat-label">Dismissal accuracy vs. outcome</div></div>
          <div className="stat-cell"><div className="stat-val purple">47</div><div className="stat-label">Active patterns</div></div>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">What the Reasoning Engine Knows</div><div className="card-sub">That no individual provider knows</div></div></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="alert-box alert-ok" style={{ marginBottom: 0 }}>
            <div className="alert-icon">✓</div>
            <div><strong>False positive fingerprints</strong> — 70+ patterns of known FP hits by provider, jurisdiction, and name type. Auto-dismissal confidence score calculated before analyst sees the alert.</div>
          </div>
          <div className="alert-box alert-purple" style={{ marginBottom: 0 }}>
            <div className="alert-icon">🧠</div>
            <div><strong>Pre-SAR trajectories</strong> — 5 distinct sequences that historically preceded SAR filings. Entity trajectories are tracked and flagged before the triggering event occurs.</div>
          </div>
          <div className="alert-box alert-info" style={{ marginBottom: 0 }}>
            <div className="alert-icon">⏱</div>
            <div><strong>Screen staleness context</strong> — The engine knows when each provider last ran on each entity and surfaces temporal conflicts (e.g., CA screen predates UBO change).</div>
          </div>
          <div className="alert-box alert-warn" style={{ marginBottom: 0 }}>
            <div className="alert-icon">🔍</div>
            <div><strong>Entity relationships</strong> — Cross-entity links (shared UBOs, wallets, addresses) surface risk that individual entity screening cannot detect.</div>
          </div>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Pattern Library — Active Clusters</div><div className="card-sub">Learned from 18 months of analyst decisions · Growing every week</div></div></div>
        {[
          ['Pre-SAR structuring sequence (Malta/Cyprus)', 'tag-red',    '12 cases', '58d avg to trigger'],
          ['PEP-adjacent + slow transaction ramp',        'tag-yellow', '8 cases',  '90d avg to trigger'],
          ['Crypto wallet hop before fiat exit',          'tag-red',    '6 cases',  '14d avg to trigger'],
          ['False-positive adverse media (common Arabic names, UAE)', 'tag-green', '47 cases', '39/41 FP rate'],
          ['False-positive PEP match (Chinese names, UK registry)',   'tag-green', '23 cases', '21/23 FP rate'],
        ].map(([label, color, count, note]) => (
          <div className="hl-row" key={label} style={{ flexWrap: 'wrap', gap: 6 }}>
            <span>{label}</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span className={`tag ${color}`}>{count}</span>
              <span style={{ color: 'var(--text4)', fontSize: 10 }}>{note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
