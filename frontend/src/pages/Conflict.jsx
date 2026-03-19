import { useApp } from '../context/AppContext'

export default function Conflict() {
  const { notify, showHistory, navigate } = useApp()

  const doFlow = (k) => {
    const msgs = {
      retrigger: '↻ ComplyAdvantage re-screen triggered — result in ~30 seconds',
      escalate:  '⚑ Case escalated to Sara Levy (Senior Analyst) — context pre-attached',
      hold:      '⏸ Transaction hold placed — customer notified via automated message',
      sarflag:   '⚑ Case flagged for SAR preparation — see SAR queue',
      freeze:    '🔒 Freeze protocol initiated — Legal notified — MoneyNet ops alerted',
      linked:    '🔍 3 linked entities found — all flagged for immediate review',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Provider Conflict Resolution</div>
        <div className="page-sub">Reasoning engine identifies and resolves contradictions across providers</div>
      </div>
      <div className="no-pii-bar">
        <div className="live-dot" />
        IronBlocks receives only risk signals — no PII, no documents, no biometrics
      </div>

      {/* TechNova */}
      <div className="card clickable fade-in" onClick={() => showHistory('TechNova FZE')}>
        <div className="card-header">
          <div>
            <div className="card-title">
              TechNova FZE <span className="tag tag-red">Conflict</span>
            </div>
            <div className="card-sub">
              UAE holding company · 3 UBOs · Crypto-exposed
              <span className="ptag">Sumsub</span><span className="ptag">Elliptic</span><span className="ptag">ComplyAdvantage</span>
            </div>
          </div>
          <div className="badge badge-high">High Risk</div>
        </div>
        <div className="signals">
          <div className="sig"><div className="sig-prov">Sumsub</div><div className="sig-val yellow">⚠</div><div className="sig-lbl">UBO Flag</div></div>
          <div className="sig"><div className="sig-prov">Elliptic</div><div className="sig-val red">8.4</div><div className="sig-lbl">Wallet Risk</div></div>
          <div className="sig"><div className="sig-prov">ComplyAdvantage</div><div className="sig-val green">✓</div><div className="sig-lbl">Clean</div></div>
          <div className="sig"><div className="sig-prov">Last Screen</div><div className="sig-val red">11d</div><div className="sig-lbl">CA stale</div></div>
        </div>
        <div className="alert-box alert-warn">
          <div className="alert-icon">⚠</div>
          <div><strong>Conflict Detected</strong> — Sumsub + Elliptic flag vs. ComplyAdvantage clean. Reasoning engine identified root cause: ComplyAdvantage screen predates UBO change by 11 days.</div>
        </div>
        <div className="reasoning-box">
          <div className="reasoning-hdr">⚡ Reasoning Output</div>
          <div className="reasoning-text">
            Three providers ran on TechNova FZE. <span className="flag">Sumsub flagged a UBO structure change</span> — beneficial owner Faisal Al-Rashid (26%) was added 3 weeks ago with no corresponding re-screen trigger. <span className="flag">Elliptic scores the associated wallet at 8.4/10</span>, citing indirect exposure to a mixing service used in 2 flagged transactions. <span className="ok">ComplyAdvantage is clean</span> — but its last screen was <span className="h">11 days ago</span>, predating the UBO addition. The conflict is resolvable: CA's result is stale, not contradictory. Recommend immediate CA re-screen with new UBO data, transaction hold pending result, and escalation given wallet exposure severity.
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={e => { e.stopPropagation(); doFlow('retrigger') }}>↻ Trigger CA Re-screen</button>
          <button className="btn btn-ghost"   onClick={e => { e.stopPropagation(); doFlow('escalate') }}>⚑ Escalate</button>
          <button className="btn btn-warn"    onClick={e => { e.stopPropagation(); doFlow('hold') }}>⏸ Transaction Hold</button>
          <button className="btn btn-danger"  onClick={e => { e.stopPropagation(); doFlow('sarflag') }}>⚑ Flag for SAR</button>
        </div>
      </div>

      {/* Meridian */}
      <div className="card clickable fade-in" onClick={() => showHistory('Meridian Capital')}>
        <div className="card-header">
          <div>
            <div className="card-title">
              Meridian Capital <span className="tag tag-red">Sanctions Hit</span>
            </div>
            <div className="card-sub">
              Cayman Islands fund · LP Viktor Sorokin added to OFAC SDN 3 days ago
              <span className="ptag">Bridger XG</span>
            </div>
          </div>
          <div className="badge badge-high">Immediate Action</div>
        </div>
        <div className="signals">
          <div className="sig"><div className="sig-prov">Bridger XG</div><div className="sig-val red">OFAC</div><div className="sig-lbl">SDN Hit</div></div>
          <div className="sig"><div className="sig-prov">Sumsub</div><div className="sig-val green">✓</div><div className="sig-lbl">KYB Clear</div></div>
          <div className="sig"><div className="sig-prov">LP Added</div><div className="sig-val yellow">11mo</div><div className="sig-lbl">Ago</div></div>
          <div className="sig"><div className="sig-prov">SDN Date</div><div className="sig-val red">3d</div><div className="sig-lbl">Ago</div></div>
        </div>
        <div className="alert-box alert-danger">
          <div className="alert-icon">🚨</div>
          <div><strong>Sanctions Match — OFAC SDN</strong> — LP Viktor Sorokin was designated 3 days ago. Fund has an active relationship. Immediate freeze obligations may apply.</div>
        </div>
        <div className="reasoning-box">
          <div className="reasoning-hdr">⚡ Reasoning Output</div>
          <div className="reasoning-text">
            Bridger XG nightly batch run detected that <span className="flag">LP Viktor Sorokin was added to the OFAC SDN list 72 hours ago</span>. Sorokin holds an 8.3% LP interest in Meridian Capital, onboarded 11 months ago. At onboarding he was PEP-adjacent but not sanctioned — that status has now changed. Reasoning engine cross-referenced all active entities linked to Sorokin: <span className="h">1 fund (this one), 2 related entities in separate cases</span>. All three require immediate action. MoneyNet's freeze obligations under OFAC apply within <span className="flag">same business day</span> of a designation. This alert is time-critical.
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-danger" onClick={e => { e.stopPropagation(); doFlow('freeze') }}>🔒 Initiate Freeze Protocol</button>
          <button className="btn btn-ghost"  onClick={e => { e.stopPropagation(); doFlow('linked') }}>🔍 View Linked Entities</button>
          <button className="btn btn-ghost"  onClick={e => { e.stopPropagation(); navigate('sar') }}>⚑ SAR Preparation</button>
        </div>
      </div>
    </div>
  )
}
