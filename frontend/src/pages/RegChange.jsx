import { useApp } from '../context/AppContext'

export default function RegChange() {
  const { notify } = useApp()
  const doFlow = (k) => {
    const msgs = {
      ai_act_plan:  '📋 AI Act remediation plan opened — 134-day countdown, 3 workstreams',
      ai_act_docs:  '📄 Article 11 technical documentation template generated',
      ai_act_label: '🏷 AI labelling enabled — all engine outputs now tagged as AI-generated',
      mica_flag:    '⚑ 7 non-compliant crypto entities flagged for enhanced screening',
      mica_retro:   '↻ Retroactive compliance scan queued — 90-day history for 23 entities',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Regulatory Change Tracker</div>
        <div className="page-sub">Global rulemaking has surged. 27 EU member states, AMLA centralisation, MiCA enforcement, AI Act deadlines — tracked and mapped to your portfolio automatically.</div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Active Regulatory Changes — Impact Assessment</div><div className="card-sub">7 regulatory changes requiring action in next 90 days</div></div></div>
        {[
          ['Aug 2026', 'red',    'EU AI Act Annex III — High-risk AI system requirements in force',           '47 entities affected'],
          ['Jun 2026', 'red',    'MiCA Travel Rule enforcement — crypto transfer reporting for all VASPs',    '23 entities affected'],
          ['Jul 2026', 'yellow', 'AMLA direct supervision begins — cross-border entity reporting centralised', '12 entities affected'],
          ['May 2026', 'yellow', 'UK "Failure to prevent fraud" — reasonable procedures burden on companies', 'All UK entities'],
          ['Apr 2026', 'blue',   'Israeli PPL Amendment 13 — enhanced breach notification + DPO thresholds', 'IronBlocks ops'],
          ['Ongoing',  'blue',   'FinCEN SAR guidance updates — streamlined filing, focused reporting',       'SAR process'],
          ['Ongoing',  'blue',   'OFAC SDN list daily updates — 3 new designations this week',               'All entities'],
        ].map(([date, color, desc, impact]) => (
          <div className="hl-row" key={desc} style={{ flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
            <div style={{ display: 'flex', gap: 8, flex: 1, alignItems: 'center' }}>
              <span className={`tag tag-${color}`}>{date}</span>
              <span style={{ fontSize: 11, color: 'var(--text2)' }}>{desc}</span>
            </div>
            <span style={{ color: `var(--${color})`, fontSize: 11, flexShrink: 0 }}>{impact}</span>
          </div>
        ))}
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">EU AI Act — Annex III Readiness</div><div className="card-sub">Deadline: 2 August 2026 · Penalties: up to €35M or 7% of turnover</div></div></div>
        <div className="alert-box alert-danger">
          <div className="alert-icon">🚨</div>
          <div><strong>134 days remaining.</strong> If Venn's risk scores drive compliance decisions for MoneyNet clients, the system likely classifies as high-risk under Annex III. Human oversight mechanism, explanation layer, and technical documentation must be in place before go-live.</div>
        </div>
        <div className="reasoning-box">
          <div className="reasoning-hdr">⚡ Impact Assessment</div>
          <div className="reasoning-text">
            The reasoning engine has mapped the AI Act requirements to MoneyNet's operations. <span className="flag">3 compliance gaps identified</span>: (1) AI-generated risk narratives are not yet labelled as AI-generated — <span className="warn">transparency violation</span>. (2) No formal mechanism for analysts to challenge and override AI scores with audit trail — <span className="warn">human oversight gap</span>. (3) Technical documentation per Article 11 not yet drafted — <span className="warn">conformity gap</span>. The engine has <span className="ok">pre-drafted a remediation plan</span> with owner assignments and milestones for the 134-day window.
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => doFlow('ai_act_plan')}>📋 View Remediation Plan</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('ai_act_docs')}>📄 Generate Article 11 Docs</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('ai_act_label')}>🏷 Enable AI Labelling</button>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">MiCA Travel Rule — Crypto Portfolio Impact</div><div className="card-sub">Full enforcement June 2026 — all crypto-to-fiat transfers require counterparty identification</div></div></div>
        <div className="reasoning-box">
          <div className="reasoning-hdr">⚡ Portfolio Scan</div>
          <div className="reasoning-text">
            The engine has identified <span className="h">23 MoneyNet entities with crypto exposure</span>. Of these, <span className="flag">7 are currently processing crypto-to-fiat conversions without Travel Rule-compliant counterparty data</span>. Under MiCA enforcement, each non-compliant transfer is a potential regulatory violation. Recommended: (1) flag all 7 entities for enhanced screening, (2) add Travel Rule data capture to the onboarding flow for new crypto entities, (3) run retroactive compliance check on 90-day transaction history for the 23 exposed entities.
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => doFlow('mica_flag')}>⚑ Flag 7 Non-Compliant Entities</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('mica_retro')}>↻ Retroactive Compliance Scan</button>
        </div>
      </div>
    </div>
  )
}
