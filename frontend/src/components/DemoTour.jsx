import { useApp } from '../context/AppContext'

// CCO-focused walkthrough — 8 steps through key compliance processes
const TOUR_STEPS = [
  {
    page:    'home',
    title:   'Morning Brief — What Needs Your Attention Today',
    role:    'You are the Chief Compliance Officer. Every morning starts here.',
    narrate: `You're looking at your priority queue — pre-ranked by the reasoning engine so you don't start from scratch.\n\nTwo critical items demand your attention before 10am: a confirmed OFAC sanctions match on Meridian Capital, and a crypto wallet conflict on TechNova FZE. A third case (Ibrahim Al-Hassan) has a structuring pattern with an RFI clock running.\n\nBelow the priority queue: 4 regulatory deadlines. The EU AI Act Annex III deadline is 134 days away — 3 compliance gaps are unowned.`,
    look:    'Scan the priority queue (red cards). Note the stat strip: 4 High Risk, 9 in review. Click "Open Case →" on Meridian to act on the most critical item.',
    action:  'As CCO: confirm the priority order matches your risk appetite. The engine puts OFAC first — agree or override. Then open Meridian Capital.',
    tip:     '💡 CCO Best Practice: A daily 10-minute brief replaces a 2-hour review meeting. If you need to explain a decision to a regulator, the reasoning engine has already documented the "why".',
  },
  {
    page:    'burning',
    title:   "What's Burning — SLA Breaches & Cases Rotting Without Action",
    role:    'CCOs are personally liable for SLA failures on OFAC and SAR obligations.',
    narrate: `This page surfaces what's ageing without action — the cases that will become enforcement findings if nothing happens.\n\nTwo items are already in breach: the Meridian OFAC blocking report (3 days overdue — mandatory, same-day obligation) and Nexus Trading's escalation acknowledgement (unacknowledged for 26 hours).\n\nIbrahim Al-Hassan's RFI is due in 47 minutes. If it doesn't go out, the transaction hold may expire with no documented rationale.`,
    look:    'Red "OVERDUE" pills indicate SLA breaches. Yellow countdown pills show live timers. The age bar (bottom of each card) shows how long a case has been idle — longer = more risk.',
    action:  'As CCO: the Meridian OFAC breach is your most urgent personal liability. Click "Open case →" to get to the file. Then address the Ibrahim RFI before the clock runs out.',
    tip:     '💡 Regulatory Reality: OFAC requires a blocking report on the same business day as discovery. Filing 3 days late creates a strict liability violation, even if the freeze was executed correctly. Document everything — time of discovery, time of action.',
  },
  {
    page:    'conflict',
    title:   'Provider Conflict — OFAC Sanctions Match on Meridian Capital',
    role:    'Hard sanctions match. This is not a judgement call — it is a legal obligation.',
    narrate: `LP Viktor Sorokin was added to the OFAC SDN list on 15 March 2026. Bridger XG surfaced the match. Sorokin holds 8.3% of Meridian Capital.\n\nThe freeze is already active. What's pending: the OFAC blocking report (overdue 3 days), legal sign-off, and a SAR filing within 30 days.\n\nAbove the fold you also see TechNova FZE — a different type of conflict. Here, ComplyAdvantage is clean but Elliptic scores the wallet at 8.4/10. The conflict arises because the CA screen is 11 days stale — it predates the UBO change. Not a contradiction; a timing gap.`,
    look:    'Two separate cards — different risk types. Meridian: hard sanctions. TechNova: provider timing conflict. Read the "⚡ Reasoning Output" box — it explains the root cause of each conflict and the recommended resolution path.',
    action:  'As CCO: for Meridian — file the blocking report NOW (use the action buttons). Notify legal counsel. Do NOT contact the client. For TechNova — approve the CA re-screen trigger and confirm the transaction hold.',
    tip:     '💡 CCO Best Practice: Never dismiss a first-time OFAC match without legal review. The "tipping-off" prohibition (31 CFR §103.18) means you cannot inform the customer. Document the exact time you became aware — OFAC enforcement hinges on the discovery-to-report timeline.',
  },
  {
    page:    'sar',
    title:   'SAR Generation — Pre-Drafted Narrative Ready for CCO Sign-Off',
    role:    'SARs require CCO sign-off before filing. The engine drafts; you review and authorise.',
    narrate: `The reasoning engine has pre-drafted SAR narratives for two cases: TechNova FZE (crypto wallet exposure + UBO conflict) and Ibrahim Al-Hassan (structuring pattern, 9 sub-threshold transactions in 4 hours).\n\nFor Ibrahim: the narrative identifies the structuring pattern as consistent with 31 U.S.C. §5324. The amounts, timing, and new wallet address are all documented.\n\nFor TechNova: the SAR is in preparation mode — the CA re-screen result is pending. The narrative is pre-staged but not filed.`,
    look:    'The SAR narrative block contains the exact language that will be submitted to FinCEN. Review for accuracy: entity identifiers, transaction details, pattern description. The "⚡ Reasoning" box explains why the engine flagged each as SAR-worthy.',
    action:  'As CCO: review and approve the Ibrahim Al-Hassan SAR. It is ready. For TechNova — review the pre-draft and await the CA re-screen result before authorising. Set a reminder: if re-screen confirms exposure, file within 24 hours.',
    tip:     '💡 Regulatory Deadline: SARs must be filed within 30 days of detection. A voluntary early filing (within 72 hours) is looked upon favourably by FinCEN. Always file — penalties for non-filing far exceed penalties for a slightly imperfect SAR.',
  },
  {
    page:    'transaction',
    title:   'Transaction Screening — Structuring Pattern, Live RFI Clock',
    role:    'Real-time anomaly detection. The clock is running — your RFI SLA expires in 47 minutes.',
    narrate: `Ibrahim Al-Hassan executed 9 transactions between 06:12 and 10:47 GMT — each between €4,650 and €4,950, all below the €5,000 reporting threshold. Total: €47,250. This is an 11× spike on his monthly baseline.\n\nA new wallet address (0xA91B...) was added the same morning. The combination of sub-threshold structuring + new crypto wallet is a classic SAR precursor pattern.\n\nA 24-hour transaction hold is active. The RFI must be sent within 4 hours of the hold — that window closes in 47 minutes.`,
    look:    'The timeline shows the individual transaction amounts — each just below threshold. The "⚡ Reasoning" box explains why 9 similar-sized transactions on a new account with a new wallet address triggers escalation. The RFI status is marked OVERDUE (or countdown active).',
    action:  'As CCO: confirm the SAR pre-draft is accurate. Navigate to RFI to send the information request now — do not let the clock expire. If no response within 48h, escalate and consider account restriction.',
    tip:     '💡 Structuring Alert: Under 31 U.S.C. §5324, structuring to evade reporting thresholds is itself a federal crime — regardless of the underlying source of funds. The customer does not need to be a criminal for you to have a SAR obligation.',
  },
  {
    page:    'pattern',
    title:   'Pattern Detection — Nexus Trading on the Pre-SAR Trajectory',
    role:    'Pattern analysis is where proactive compliance happens — before the crime, not after.',
    narrate: `Nexus Trading Ltd has had 4 provider alerts in 11 months — all individually dismissed by analysts as low confidence. The engine has now matched this sequence to a cluster of 12 entities that all preceded SAR filings in Q3.\n\nThe 5-stage trajectory: clean onboarding → recurring low-confidence hits → analyst dismissals without escalation (Nexus is here) → gradual volume increase → sudden high-value cross-border transfer.\n\nNo individual signal justifies a SAR today. But the pattern says you have ~58 days before the trigger event.`,
    look:    'The staged trajectory diagram shows where Nexus sits. Read the "Cluster Match" section — it shows the 12 historical analogues. The "Escalation unacknowledged" alert indicates a process failure: this was escalated to David Cohen 26h ago with no response.',
    action:  'As CCO: acknowledge the escalation. Enable enhanced monitoring (daily re-screen instead of monthly). Document this decision with rationale — if a SAR is filed in 58 days, the regulator will want to see that you detected and acted on early warning signals.',
    tip:     '💡 Proactive Compliance: Examiners increasingly expect financial institutions to identify SAR-worthy patterns before the triggering event — not just react to individual alerts. A documented pattern match with a recorded response is a strong evidence of programme effectiveness.',
  },
  {
    page:    'escalation',
    title:   'Escalation Queue — CCO Sign-Off Required on 3 Cases',
    role:    'Three items require your personal authorisation as CCO before the team can proceed.',
    narrate: `The escalation queue contains the 3 most complex cases, each assigned with full reasoning context:\n\n1. TechNova FZE — wallet conflict, awaiting your decision on whether to proceed to SAR or await re-screen.\n2. Meridian Capital — OFAC freeze in progress, legal must be notified before any client communication.\n3. Nexus Trading — pattern match, your acknowledgement unlocks enhanced monitoring.\n\nAll three were auto-escalated by the reasoning engine with pre-attached context. No analyst time was spent assembling the briefing — it was done automatically.`,
    look:    'Each card shows who escalated it, when, and to whom. The alert box contains the pre-assembled reasoning brief. Action buttons trigger the next step without leaving this page.',
    action:  'As CCO: work top-to-bottom. Notify legal on Meridian first (time-critical). Approve the TechNova re-screen. Acknowledge the Nexus pattern and activate enhanced monitoring. Each action is audit-logged with your identity and timestamp.',
    tip:     '💡 CCO Liability: Personal liability for CCOs has increased significantly post-2024. Every escalation that reaches your desk must be documented as either actioned or explicitly deferred with reasoning. "I didn\'t see it" is not a defensible position when the system has a timestamped escalation record.',
  },
  {
    page:    'audit',
    title:   'Audit Readiness — Programme Effectiveness at a Glance',
    role:    'Regulators in 2026 don\'t just check if controls exist — they audit whether they work.',
    narrate: `Your programme effectiveness score is 94.2%. Every metric on this page is backed by a timestamped, immutable audit trail — not a spreadsheet.\n\nStrong: 98.7% SAR on-time filing rate. 100% sanctions screens current. 70+ false-positive patterns documented with evidence.\n\nGaps: 142 KYC reviews overdue (8 critical). 3 EU AI Act compliance gaps with no owner assigned. 7 entities non-compliant with MiCA Travel Rule.\n\nThe audit package generator creates an examiner-ready document in 30 seconds — replacing the typical 2-week scramble.`,
    look:    'The "Examiner Questions" section shows real questions regulators ask — with the answers the engine can produce instantly. Each answer references actual data in the system. The programme effectiveness dashboard shows your headline metrics.',
    action:  'As CCO: click "Generate Audit Package" to see what an examiner would receive. Review the 3 open gaps — assign owners today. The EU AI Act Annex III deadline is 134 days away; unowned gaps are a significant examiner finding.',
    tip:     '💡 Examiner Insight: In recent FinCEN and FCA examinations, the most common criticism is not that controls are missing — it\'s that decision rationale is undocumented. The reasoning engine\'s audit trail answers "why did you decide X?" for every case, automatically.',
  },
]

export default function DemoTour() {
  const { tourActive, tourStep, setTourStep, setTourActive, navigate } = useApp()

  if (!tourActive) return null

  const step = TOUR_STEPS[tourStep]
  const isLast = tourStep === TOUR_STEPS.length - 1
  const isFirst = tourStep === 0

  const goTo = (idx) => {
    setTourStep(idx)
    navigate(TOUR_STEPS[idx].page)
  }

  const next = () => isLast ? setTourActive(false) : goTo(tourStep + 1)
  const prev = () => !isFirst && goTo(tourStep - 1)

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 'var(--sidebar-w)',
      right: 'var(--detail-w)',
      zIndex: 200,
      padding: '0 16px 12px',
      pointerEvents: 'none',
    }}>
      <div style={{
        background: 'var(--bg)',
        border: '1px solid var(--blue)',
        borderRadius: 'var(--r-lg)',
        boxShadow: '0 -4px 24px rgba(37,99,235,.18)',
        padding: '14px 16px',
        pointerEvents: 'all',
        position: 'relative',
      }}>
        {/* Close */}
        <button
          onClick={() => setTourActive(false)}
          style={{
            position: 'absolute', top: 10, right: 12,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text4)', fontSize: 16, lineHeight: 1, padding: 4,
          }}
          title="Exit tour"
        >×</button>

        {/* Step breadcrumb */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 8, alignItems: 'center' }}>
          <span style={{
            fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--r-full)',
            background: 'var(--blue)', color: '#fff', flexShrink: 0,
          }}>CCO DEMO · STEP {tourStep + 1} OF {TOUR_STEPS.length}</span>
          <span style={{ fontSize: 10, color: 'var(--text4)', fontStyle: 'italic' }}>{step.role}</span>
        </div>

        {/* Step title */}
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
          {step.title}
        </div>

        {/* Main narrative */}
        <div style={{ fontSize: 11.5, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 8, whiteSpace: 'pre-line' }}>
          {step.narrate}
        </div>

        {/* Two-column: what to look at + CCO action */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <div style={{
            flex: 1, background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 'var(--r)', padding: '8px 10px',
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--text4)', marginBottom: 4, letterSpacing: '0.05em' }}>
              👁 WHAT TO LOOK AT
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.5 }}>{step.look}</div>
          </div>
          <div style={{
            flex: 1, background: 'var(--blue-bg)', border: '1px solid var(--blue-border)',
            borderRadius: 'var(--r)', padding: '8px 10px',
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--blue)', marginBottom: 4, letterSpacing: '0.05em' }}>
              ✅ CCO ACTION
            </div>
            <div style={{ fontSize: 11, color: 'var(--text2)', lineHeight: 1.5 }}>{step.action}</div>
          </div>
        </div>

        {/* Tip */}
        <div style={{
          fontSize: 11, color: 'var(--text3)', background: 'var(--bg3)',
          borderRadius: 'var(--r)', padding: '6px 10px', marginBottom: 10,
          borderLeft: '2px solid var(--yellow)', lineHeight: 1.5,
        }}>
          {step.tip}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={prev}
            disabled={isFirst}
            style={{
              padding: '6px 14px', fontSize: 11, fontWeight: 600,
              border: '1px solid var(--border)', borderRadius: 'var(--r)',
              background: 'var(--bg)', color: isFirst ? 'var(--text4)' : 'var(--text2)',
              cursor: isFirst ? 'default' : 'pointer', fontFamily: 'var(--font)',
            }}
          >← Prev</button>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'center' }}>
            {TOUR_STEPS.map((_, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === tourStep ? 16 : 6, height: 6,
                  borderRadius: 3, cursor: 'pointer',
                  background: i === tourStep ? 'var(--blue)' : i < tourStep ? 'var(--blue-border)' : 'var(--bg3)',
                  transition: 'all .2s',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            style={{
              padding: '6px 16px', fontSize: 11, fontWeight: 700,
              border: 'none', borderRadius: 'var(--r)',
              background: isLast ? 'var(--green)' : 'var(--blue)',
              color: '#fff', cursor: 'pointer', fontFamily: 'var(--font)',
              transition: 'opacity .15s',
            }}
          >
            {isLast ? '✓ Finish Tour' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
