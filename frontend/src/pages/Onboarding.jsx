import { useState } from 'react'

const STEPS = [
  {
    title: 'New entity submitted for onboarding',
    desc: 'GulfStream Logistics LLC · Dubai, UAE · B2B payments client',
    content: (
      <div className="alert-box alert-info">
        <div className="alert-icon">📥</div>
        <div>Onboarding request received. Reasoning engine initialises entity profile. Baseline: no prior history. Providers queued: Sumsub (KYB), ComplyAdvantage (AML).</div>
      </div>
    ),
  },
  {
    title: 'Sumsub KYB — In Progress',
    desc: 'Document verification + UBO mapping',
    content: (
      <>
        <div className="signals">
          <div className="sig"><div className="sig-prov">Sumsub</div><div className="sig-val blue">…</div><div className="sig-lbl">Running</div></div>
        </div>
        <div className="alert-box alert-info">
          <div className="alert-icon">⏳</div>
          <div>Sumsub verifying UAE trade licence + 2 UBO identities. Estimated: 45 seconds. ComplyAdvantage queued to run on confirmed UBO names.</div>
        </div>
      </>
    ),
  },
  {
    title: 'Sumsub KYB — Complete',
    desc: 'UAE trade licence verified · 2 UBOs confirmed',
    content: (
      <>
        <div className="signals">
          <div className="sig"><div className="sig-prov">Sumsub</div><div className="sig-val green">✓</div><div className="sig-lbl">KYB Pass</div></div>
          <div className="sig"><div className="sig-prov">UBOs</div><div className="sig-val green">2/2</div><div className="sig-lbl">Verified</div></div>
        </div>
        <div className="alert-box alert-ok">
          <div className="alert-icon">✓</div>
          <div>Trade licence active. UBOs: Mohammed Al-Farsi (60%) and Priya Nair (40%). Both identity-verified. Reasoning engine queues ComplyAdvantage with confirmed names + nationalities.</div>
        </div>
      </>
    ),
  },
  {
    title: 'ComplyAdvantage — AML Screening',
    desc: 'Sanctions, PEPs, adverse media',
    content: (
      <>
        <div className="signals">
          <div className="sig"><div className="sig-prov">Sumsub</div><div className="sig-val green">✓</div><div className="sig-lbl">Done</div></div>
          <div className="sig"><div className="sig-prov">ComplyAdvantage</div><div className="sig-val yellow">~</div><div className="sig-lbl">Weak Hit</div></div>
        </div>
        <div className="alert-box alert-warn">
          <div className="alert-icon">⚠</div>
          <div>ComplyAdvantage returned 1 weak adverse media hit for "Mohammed Al-Farsi" (confidence: 0.29). Reasoning engine checks against false-positive pattern library.</div>
        </div>
      </>
    ),
  },
  {
    title: 'Reasoning Engine — Conflict Analysis',
    desc: 'Pattern-matching against 47 known false-positive fingerprints',
    content: (
      <div className="reasoning-box">
        <div className="reasoning-hdr">⚡ Reasoning Output</div>
        <div className="reasoning-text">
          ComplyAdvantage hit confidence: <span className="warn">0.29</span> — below escalation threshold (0.65). Reasoning engine cross-referenced against pattern library: <span className="h">Mohammed Al-Farsi is a high-frequency name in UAE registry</span>. Prior cases show 41 similar hits for this name in the same jurisdiction — <span className="ok">39 of 41 were false positives</span>. The 2 escalated cases both had corroborating signals (Bridger XG hit or Elliptic exposure) — absent here. Recommendation: <span className="ok">auto-clear with logged rationale</span>. No analyst intervention required.
        </div>
      </div>
    ),
  },
  {
    title: 'Onboarding Complete — Auto-Cleared',
    desc: 'GulfStream Logistics LLC approved · Enrolled in ongoing monitoring',
    content: (
      <>
        <div className="signals">
          <div className="sig"><div className="sig-prov">Sumsub</div><div className="sig-val green">✓</div><div className="sig-lbl">KYB Pass</div></div>
          <div className="sig"><div className="sig-prov">CA</div><div className="sig-val green">✓</div><div className="sig-lbl">FP Resolved</div></div>
          <div className="sig"><div className="sig-prov">Monitoring</div><div className="sig-val blue">On</div><div className="sig-lbl">Active</div></div>
        </div>
        <div className="alert-box alert-ok">
          <div className="alert-icon">✓</div>
          <div><strong>Onboarded in 2m 14s</strong> — Zero analyst time required. CA false positive logged to pattern library (becomes case #48 for this name/jurisdiction pattern). Entity enrolled in 30-day ongoing monitoring.</div>
        </div>
      </>
    ),
  },
]

export default function Onboarding() {
  const [step, setStep] = useState(1)

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Onboarding Flow</div>
        <div className="page-sub">Step-by-step reasoning as a new entity moves through KYC/KYB checks</div>
      </div>
      <div className="no-pii-bar">
        <div className="live-dot" />
        Signals arrive in real-time as providers return results — reasoning updates incrementally
      </div>

      <div className="pbar">
        <div className="pbar-fill" style={{ width: `${Math.round((step / STEPS.length) * 100)}%` }} />
      </div>

      {STEPS.map((s, i) => {
        const state = i < step ? 'done' : i === step ? 'active' : ''
        return (
          <div className={`flow-step ${state}`} key={i}>
            <div className="step-num">{i < step ? '✓' : i + 1}</div>
            <div className="step-body">
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
              {(i < step || i === step) && (
                <div className="step-content">{s.content}</div>
              )}
            </div>
          </div>
        )
      })}

      <div className="step-ctrl">
        <button
          className="btn btn-primary"
          disabled={step >= STEPS.length}
          onClick={() => setStep(s => Math.min(s + 1, STEPS.length))}
        >
          ▶ Next Step
        </button>
        <button className="btn btn-ghost" onClick={() => setStep(1)}>↺ Reset</button>
      </div>
    </div>
  )
}
