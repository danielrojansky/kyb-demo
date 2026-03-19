import { useApp } from '../context/AppContext'

export default function Rescreen() {
  const { notify, showHistory } = useApp()
  const doFlow = (k) => {
    const msgs = {
      rfi_director: '✉ RFI drafted for GreenPath re: Li Wei — queued for analyst review',
      deepen:       '🔍 Deep-screen requested for Li Wei — Sumsub + Elliptic queued',
      dismiss_note: '✓ Dismissed with rationale — logged to pattern library',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Periodic Re-screen</div>
        <div className="page-sub">Nightly batch re-screen surfaces changes against last-known state</div>
      </div>

      <div className="card clickable fade-in" onClick={() => showHistory('GreenPath Energy')}>
        <div className="card-header">
          <div>
            <div className="card-title">GreenPath Energy Ltd <span className="tag tag-yellow">Change Detected</span></div>
            <div className="card-sub">UK renewable energy · Director change 6 weeks ago · Monthly re-screen</div>
          </div>
          <div className="badge badge-medium">Review</div>
        </div>
        <div className="signals">
          <div className="sig"><div className="sig-prov">Sumsub</div><div className="sig-val green">✓</div><div className="sig-lbl">KYB Clear</div></div>
          <div className="sig"><div className="sig-prov">ComplyAdvantage</div><div className="sig-val yellow">~</div><div className="sig-lbl">Weak Hit</div></div>
          <div className="sig"><div className="sig-prov">Bridger XG</div><div className="sig-val green">✓</div><div className="sig-lbl">Sanctions Clear</div></div>
          <div className="sig"><div className="sig-prov">Director</div><div className="sig-val yellow">New</div><div className="sig-lbl">Li Wei, 6wk</div></div>
        </div>
        <div className="reasoning-box">
          <div className="reasoning-hdr">⚡ Delta Reasoning — What Changed Since Last Screen</div>
          <div className="reasoning-text">
            <span className="ok">Sumsub and Bridger XG are unchanged — both clean</span>. ComplyAdvantage surfaced a <span className="warn">new weak adverse media hit</span> (confidence: 0.38) referencing a "Li Wei" in connection with a Chinese state-owned enterprise procurement dispute. This name was not in prior screens. Reasoning engine cross-referenced: <span className="h">Li Wei joined GreenPath's board 6 weeks ago</span> (per last Sumsub KYB sync). The adverse media article dates to <span className="h">8 weeks ago</span>, predating the directorship — so it was not caught at onboarding. Confidence is low but the temporal alignment warrants human review before dismissal. Not recommended for auto-dismiss.
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={e => { e.stopPropagation(); doFlow('rfi_director') }}>✉ RFI to Company re: Li Wei</button>
          <button className="btn btn-ghost"   onClick={e => { e.stopPropagation(); doFlow('deepen') }}>🔍 Deep-screen Li Wei</button>
          <button className="btn btn-ghost"   onClick={e => { e.stopPropagation(); doFlow('dismiss_note') }}>✓ Dismiss with Note</button>
        </div>
      </div>

      <div className="card fade-in">
        <div className="card-header">
          <div><div className="card-title">Re-screen Batch Summary — Last Night</div><div className="card-sub">187 entities re-screened across 4 providers</div></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          {[
            ['Unchanged — auto-cleared', '174', 'green'],
            ['New weak hits — pre-annotated, queued for fast review', '9', 'yellow'],
            ['Significant changes — escalated to analyst', '4', 'red'],
            ['Provider timeout — re-queued for morning run', '3', 'grey'],
          ].map(([label, val, color]) => (
            <div className="hl-row" key={label}>{label}<span style={{ color: `var(--${color})` }}>{val}</span></div>
          ))}
        </div>
        <div className="alert-box alert-info">
          <div className="alert-icon">💡</div>
          <div>Of the 9 weak-hit cases, reasoning engine pre-matched 7 to prior false-positive patterns. Estimated analyst review time: <strong>8 minutes total</strong> vs ~60 minutes without context.</div>
        </div>
      </div>
    </div>
  )
}
