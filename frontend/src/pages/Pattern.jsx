import { useApp } from '../context/AppContext'

export default function Pattern() {
  const { notify, showHistory } = useApp()
  const doFlow = (k) => {
    const msgs = {
      cluster:  '🧠 Q3 cluster (12 entities) loaded — see Memory tab',
      enhanced: '🔍 Enhanced monitoring active — daily re-screen + alert threshold lowered',
      escalate: '⚑ Case escalated to Senior Analyst',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Pattern Detection — Institutional Memory</div>
        <div className="page-sub">Reasoning engine surfaces cross-entity correlations no single provider can detect</div>
      </div>

      <div className="card clickable fade-in" onClick={() => showHistory('Nexus Trading Ltd')}>
        <div className="card-header">
          <div>
            <div className="card-title">Nexus Trading Ltd <span className="tag tag-purple">Pattern Match</span></div>
            <div className="card-sub">Malta trading company · 4 dismissed alerts in 11 months · Pre-SAR cluster detected</div>
          </div>
          <div className="badge badge-pattern">Memory Flag</div>
        </div>
        <div className="signals">
          <div className="sig"><div className="sig-prov">Sumsub</div><div className="sig-val green">✓</div><div className="sig-lbl">KYB Clear</div></div>
          <div className="sig"><div className="sig-prov">ComplyAdvantage</div><div className="sig-val yellow">!</div><div className="sig-lbl">PEP-Adj.</div></div>
          <div className="sig"><div className="sig-prov">Bridger XG</div><div className="sig-val green">✓</div><div className="sig-lbl">Sanctions Clear</div></div>
          <div className="sig"><div className="sig-prov">Dismissals</div><div className="sig-val red">4</div><div className="sig-lbl">11 months</div></div>
        </div>
        <div className="alert-box alert-purple">
          <div className="alert-icon">🧠</div>
          <div><strong>Institutional Memory Pattern Match</strong> — This entity's profile matches a cluster of 12 entities that preceded SAR filings in Q3. No single provider flagged this. Only accumulated decision history surfaces it.</div>
        </div>
        <div className="reasoning-box" data-tour="pattern-reasoning">
          <div className="reasoning-hdr">⚡ Pattern Reasoning</div>
          <div className="reasoning-text">
            Individual provider signals are unremarkable. Sumsub and Bridger clear, ComplyAdvantage shows a low-confidence PEP-adjacent connection — normally a dismiss candidate. However, the reasoning engine identified a <span className="flag">structural pattern match</span>: Nexus Trading exhibits the same sequence as 12 entities in the Q3 pre-SAR cluster: <span className="h">(1) clean onboarding, (2) recurring low-confidence hits, (3) analyst dismissals without escalation, (4) gradual transaction volume increase, (5) sudden high-value cross-border transfer</span>. Nexus is at stage 3. The Q3 cluster averaged 58 days between stage 3 and a SAR-triggering event. This is not a rule violation. It is a <span className="warn">learned risk trajectory</span> that warrants enhanced monitoring before the next dismissal.
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-purple"  onClick={e => { e.stopPropagation(); doFlow('cluster') }}>🧠 View Q3 Cluster (12 entities)</button>
          <button className="btn btn-primary" onClick={e => { e.stopPropagation(); doFlow('enhanced') }}>🔍 Enhanced Monitoring</button>
          <button className="btn btn-ghost"   onClick={e => { e.stopPropagation(); doFlow('escalate') }}>⚑ Escalate to Senior</button>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header"><div><div className="card-title">Pattern Library — Active Clusters</div><div className="card-sub">Learned from 18 months of analyst decisions</div></div></div>
        {[
          ['Pre-SAR structuring sequence (Malta/Cyprus)', 'red',    '12 cases'],
          ['PEP-adjacent + slow transaction ramp',        'yellow', '8 cases'],
          ['Crypto wallet hop before fiat exit',          'red',    '6 cases'],
          ['False-positive adverse media (common Arabic names, UAE)', 'green', '47 cases'],
          ['False-positive PEP match (Chinese names, UK registry)',   'green', '23 cases'],
        ].map(([label, color, count]) => (
          <div className="hl-row" key={label}>
            {label}
            <span className={`tag tag-${color}`}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
