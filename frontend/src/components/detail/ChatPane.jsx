import { useState, useRef, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { botKB } from '../../data/index'

// ── Page context: summary + deep recommendations per page ─────
const PAGE_CONTEXT = {
  home: {
    label: 'Home Dashboard',
    prompt: "What's on my priority queue today?",
    summary: "You're on the morning dashboard — priority queue pre-ranked by the reasoning engine.",
    actions: [
      { label: '🔥 What\'s burning?', nav: 'burning' },
      { label: '🏢 Client registry', nav: 'clients' },
    ],
    analysis: `<strong>Screen Analysis — Home Dashboard</strong><br><br>
<strong>What you're looking at:</strong><br>
Pre-ranked priority queue (3 cases), stat strip (4 High Risk / 9 Review / 187 Auto-Cleared / 2 SAR Pending), regulatory countdown timers, and this week's performance metrics.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
① <strong>Meridian Capital — OFAC SDN match</strong>: the OFAC blocking report is 3 days overdue. This is a mandatory same-business-day obligation. Act now.<br>
② <strong>TechNova FZE</strong>: CA re-screen was stale 11 days — re-screen is now in progress. Do not clear until result confirmed.<br>
③ <strong>Ibrahim Al-Hassan</strong>: RFI SLA expires in ~47 minutes. Navigate to RFI page to send immediately.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Start every morning on this page — the engine surfaces what matters, not what's loudest<br>
• Check the regulatory countdown timers weekly — the EU AI Act Annex III (134 days) has 3 unowned gaps<br>
• The "auto-cleared today" metric (187) is your efficiency indicator — a low number signals alert fatigue<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• If "High Risk" count rises above 6, escalate the priority queue review to CCO<br>
• SAR Pending > 3 triggers a 72-hour internal SLA for CCO review`,
  },
  conflict: {
    label: 'Provider Conflict',
    prompt: 'Explain the TechNova FZE conflict',
    summary: "Two conflicts active: TechNova FZE (Elliptic 8.4/10 vs CA clean) and Meridian Capital (OFAC SDN match).",
    actions: [
      { label: '📄 Draft SAR', nav: 'sar' },
      { label: '✉️ Send RFI', nav: 'rfi' },
      { label: '⚑ Escalate', nav: 'escalation' },
    ],
    analysis: `<strong>Screen Analysis — Provider Conflict Resolution</strong><br><br>
<strong>What you're looking at:</strong><br>
Two conflict cases with opposing provider signals. The "⚡ Reasoning Output" explains why providers disagree and recommends the resolution path.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
<strong>Meridian Capital (OFAC):</strong><br>
① File the OFAC blocking report NOW — 3 days overdue. Use the action buttons on the Meridian card.<br>
② Notify General Counsel and CCO before any client communication.<br>
③ Do NOT contact the client — tipping-off prohibition applies (31 CFR §103.18).<br>
④ Begin SAR preparation — must file within 30 days of discovery.<br><br>
<strong>TechNova FZE (Crypto/UBO):</strong><br>
① Approve CA re-screen trigger — CA screen is stale (predates UBO change by 11 days).<br>
② Transaction hold is active — do not lift until re-screen result is received.<br>
③ If re-screen confirms CA clean: conditional approval + 30-day enhanced monitoring.<br>
④ If re-screen confirms hit: full EDD + RFI on Faisal Al-Rashid's source of funds.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Never dismiss a provider conflict by defaulting to the "optimistic" signal — always determine <em>why</em> providers disagree<br>
• Document the root cause: in this case, CA's screen predates the UBO change (timing gap, not contradiction)<br>
• An OFAC match requires legal review before CCO decision — do not action unilaterally<br>
• Stale screens should trigger automatic re-run; if they don't, flag as a process gap in your audit log<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• If TechNova CA re-screen returns a hit: SAR mandatory within 30 days<br>
• Any additional LP in Meridian Capital with PEP/SDN adjacency — the freeze may need to expand<br>
• Wallet 0x3f5CE96… — monitor for additional transactions during the hold period`,
  },
  transaction: {
    label: 'Transaction Screening',
    prompt: 'Analyse the Ibrahim Al-Hassan transaction pattern',
    summary: "€47k structuring pattern. 9 sub-threshold transactions in 4 hours. RFI deadline in 47 minutes.",
    actions: [
      { label: '📄 Draft SAR', nav: 'sar' },
      { label: '✉️ Draft RFI', nav: 'rfi' },
    ],
    analysis: `<strong>Screen Analysis — Transaction Screening</strong><br><br>
<strong>What you're looking at:</strong><br>
9 transactions (€4,650–€4,950 each) executed between 06:12–10:47 GMT. Total: €47,250 — 11× monthly baseline. New crypto wallet added same day. 24h hold active.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
① <strong>Send the RFI now</strong> — SLA is 4 hours from hold placement. Clock expires in ~47 minutes. Navigate to RFI page immediately.<br>
② <strong>Review the SAR pre-draft</strong> — structuring pattern is documented. The narrative is ready for CCO sign-off.<br>
③ <strong>Monitor wallet 0xA91B...</strong> — new address, added same day as the structuring activity. Flag for Elliptic deep-scan.<br>
④ Document the time you became aware of the pattern — FinCEN scrutinises the detection-to-SAR timeline.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Under 31 U.S.C. §5324, structuring to evade reporting thresholds is itself a federal crime — file a SAR regardless of the underlying source of funds<br>
• The transaction hold window is 24 hours under most MSB frameworks — if you need more time, escalate to CCO for extension authorisation<br>
• Do not release the hold without an RFI response or CCO sign-off<br>
• If the RFI goes unanswered within 48h: consider account restriction and escalate to SAR filing<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Follow-on transactions after the hold is lifted — a resumed pattern confirms SAR intent<br>
• New wallet addresses — each new address during a suspicious period should be logged<br>
• If the customer provides an explanation: document it verbatim and assess against the transaction record`,
  },
  rescreen: {
    label: 'Periodic Re-screen',
    prompt: 'Explain the GreenPath Energy re-screen result',
    summary: "CA weak hit on Li Wei (director, confidence 0.38). Temporal alignment issue — adverse media predates the directorship.",
    actions: [
      { label: '✉️ Send RFI', nav: 'rfi' },
      { label: '⚑ Escalate', nav: 'escalation' },
    ],
    analysis: `<strong>Screen Analysis — Periodic Re-screen</strong><br><br>
<strong>What you're looking at:</strong><br>
GreenPath Energy re-screen triggered a ComplyAdvantage weak hit on Li Wei (confidence 0.38). The adverse media article predates Li Wei's directorship by 2 weeks — meaning this was not caught at onboarding (Li Wei wasn't a director yet).<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
① <strong>Do NOT auto-dismiss</strong> — the temporal alignment (media predates directorship) makes this a genuine open question that requires human judgement.<br>
② <strong>Send an RFI to GreenPath</strong> requesting Li Wei's background disclosure and explanation of the adverse media reference.<br>
③ <strong>Run a deep-screen on Li Wei</strong> personally — Sumsub enhanced + Elliptic if any crypto exposure exists.<br>
④ If Li Wei's screen returns clear: dismiss with documented rationale (confidence 0.38, no corroboration).<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• A confidence score of 0.38 alone is often dismissable — but temporal alignment to a new appointment raises the bar<br>
• FCA Principle 11 (UK): any significant changes in ownership or control require re-assessment of the entity risk profile<br>
• Perpetual monitoring should trigger on director changes — if it didn't, review your screening trigger configuration<br>
• Document your dismissal reasoning with the confidence score, corroboration check, and the specific temporal observation<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any second CA hit on Li Wei — a second signal changes the risk calculus significantly<br>
• GreenPath's response to the RFI — a non-response within 48h should escalate<br>
• Elliptic results if GreenPath has crypto exposure — Li Wei + crypto would be a material combination`,
  },
  pattern: {
    label: 'Pattern Detection',
    prompt: 'Explain the Nexus Trading pattern',
    summary: "4 dismissals in 11 months match a pre-SAR cluster. Stage 3/5 — ~58 days to potential SAR trigger.",
    actions: [
      { label: '📄 Pre-draft SAR', nav: 'sar' },
      { label: '⚑ Escalate to CCO', nav: 'escalation' },
    ],
    analysis: `<strong>Screen Analysis — Pattern Detection</strong><br><br>
<strong>What you're looking at:</strong><br>
Nexus Trading Ltd has had 4 individual alerts in 11 months — each dismissed as low-confidence. The engine matched this sequence to 12 historical entities that all preceded SAR filings in Q3. Current stage: 3 of 5. Average time to SAR event from stage 3: 58 days.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
① <strong>Acknowledge the escalation</strong> — it has been unacknowledged for 26 hours. Examiners will view this as a process failure.<br>
② <strong>Enable enhanced monitoring</strong> (daily re-screen) for Nexus — use the action button on this page.<br>
③ <strong>Pre-draft a SAR</strong> — this is preparation, not filing. If a triggering event occurs in the next 58 days, you want to be ready.<br>
④ <strong>Document your reasoning</strong> for the enhanced monitoring decision — this evidence is critical if a SAR is filed later.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Regulators increasingly expect detection of SAR-worthy patterns <em>before</em> the triggering event — not just reactive filing<br>
• A documented pattern match with a recorded analyst response is strong programme effectiveness evidence<br>
• The 4 prior dismissals are not problematic if each was documented with rationale — undocumented dismissals are the problem<br>
• Consider whether a "3 dismissals in 12 months" rule should be codified as an escalation trigger in your monitoring programme<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any sudden volume increase in Nexus transactions — stage 4 indicator<br>
• Cross-border transfers above €10k — stage 5 precursor<br>
• The next CA hit — if a 5th alert occurs within 60 days, file a SAR regardless of individual confidence score`,
  },
  sar: {
    label: 'SAR Generation',
    prompt: 'Review the SAR narrative for TechNova',
    summary: "SAR pre-drafts ready for TechNova FZE and Ibrahim Al-Hassan. CCO sign-off required before filing.",
    actions: [
      { label: '🎯 Audit readiness', nav: 'audit' },
    ],
    analysis: `<strong>Screen Analysis — SAR Generation</strong><br><br>
<strong>What you're looking at:</strong><br>
Two pre-drafted SAR narratives: one for Ibrahim Al-Hassan (structuring, ready to file) and one for TechNova FZE (staged — awaiting CA re-screen result). Each narrative includes the required FinCEN/FINTRAC fields: entity identifiers, transaction details, suspicious activity description, and legal basis.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
① <strong>Ibrahim Al-Hassan SAR — approve and file NOW</strong>. The structuring pattern is documented. The 30-day filing clock is running. CCO sign-off is the only remaining step.<br>
② <strong>TechNova SAR — review and stage</strong>. Do not file until CA re-screen result is received. If re-screen confirms exposure: file within 24 hours.<br>
③ Verify entity identifiers (account numbers, registration IDs) are accurate before filing.<br>
④ Check the SAR form 5300 fields — ensure "suspicious activity type" is correctly coded (structuring = code 01, sanctions evasion = code 07).<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Filing a SAR "defensively" on an ambiguous case is generally safer than not filing — penalties for non-filing are severe<br>
• The 30-day window runs from the date you became aware, not the date of the suspicious activity<br>
• Never notify the customer that a SAR has been or will be filed — this is a federal offence (SAR tipping-off)<br>
• Keep SAR drafts in your secure document system — do not email SAR narratives<br>
• Voluntary early filing (within 72 hours) is noted positively in FinCEN examinations<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• After filing, continue monitoring the entity — a second SAR within 90 days is a strong indicator of ongoing activity<br>
• Law enforcement contact: if you receive a subpoena or 314(b) request for these entities, respond promptly`,
  },
  rfi: {
    label: 'RFI Drafting',
    prompt: 'What should the RFI for Ibrahim Al-Hassan include?',
    summary: "RFI draft for Ibrahim Al-Hassan. SLA expires in 47 minutes. Template includes all required fields.",
    actions: [
      { label: '✉️ View escalation', nav: 'escalation' },
    ],
    analysis: `<strong>Screen Analysis — RFI Drafting</strong><br><br>
<strong>What you're looking at:</strong><br>
RFI template for Ibrahim Al-Hassan, pre-populated with the transaction context. The 4-hour SLA from hold placement is nearly expired. The RFI must go out immediately.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
① <strong>Send the RFI NOW</strong> — click the send action on this page. The SLA expires in ~47 minutes.<br>
② Verify the recipient contact details are current in the system before sending.<br>
③ Log the send timestamp — this is your evidence that you acted within the SLA window.<br>
④ Set a 48-hour follow-up reminder for the response deadline.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• An RFI establishes a formal information request — the customer's response (or non-response) becomes part of the SAR evidence record<br>
• Keep the RFI factual and non-accusatory — you're requesting information, not making allegations<br>
• Include a specific response deadline in the RFI text (typically 48–72 hours)<br>
• If the customer provides a plausible explanation with supporting documentation: document it, reassess risk, and decide on hold release<br>
• If no response within 48h: escalate, consider account restriction, proceed with SAR preparation<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• An unusual RFI response (e.g., claiming no knowledge of the transactions) is itself a red flag — document it verbatim<br>
• Any unusual behaviour in the account immediately after the RFI is sent<br>
• Account closure attempts following an RFI — a known indicator of suspicious intent`,
  },
  burning: {
    label: "What's Burning",
    prompt: 'Which burning item needs action first?',
    summary: "8 items aging without action. 2 CRITICAL SLA breaches. Meridian OFAC (3 days overdue), Ibrahim RFI (47m left).",
    actions: [
      { label: '⚡ Meridian conflict', nav: 'conflict' },
      { label: '✉️ Ibrahim RFI', nav: 'rfi' },
    ],
    analysis: `<strong>Screen Analysis — What's Burning</strong><br><br>
<strong>What you're looking at:</strong><br>
8 cases aging without analyst action, sorted by severity. 2 are already in SLA breach. The age bar shows how long each case has been idle. "OVERDUE" pills indicate breached obligations; countdown pills show live timers.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions — in order:</strong><br>
① <strong>Meridian OFAC blocking report</strong> — 3 days overdue. This is your most urgent personal liability. File immediately.<br>
② <strong>Ibrahim Al-Hassan RFI</strong> — 47 minutes left. Navigate to RFI page now.<br>
③ <strong>TechNova hold expiry</strong> — 2h 14m left. Ensure re-screen result is received before the hold expires or request an extension.<br>
④ <strong>Nexus escalation acknowledgement</strong> — 26h unacknowledged. Acknowledge and activate enhanced monitoring.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• SLA breaches should be reviewed in your weekly CCO report — each breach is a potential examiner finding<br>
• The "acknowledge" button records your awareness — use it even when you can't immediately resolve the item<br>
• Cases aging without any action (even a note) create a documentation gap. Log a comment if you're waiting on external input.<br>
• Consider setting up automated escalations: if no action on a Critical item within 4h, auto-notify CCO<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any item where "last action" is more than 24h ago — these are your highest-risk documentation gaps<br>
• Items where the SLA is about to pass (< 1h remaining) — prioritise these immediately over routine work`,
  },
  clients: {
    label: 'Client Registry',
    prompt: 'Which clients need my immediate attention?',
    summary: "Full entity registry — 2 critical, 3 high risk, 2 medium, 1 clear. All with case links and provider signals.",
    actions: [
      { label: '🔥 What\'s burning?', nav: 'burning' },
      { label: '⚡ Open conflicts', nav: 'conflict' },
    ],
    analysis: `<strong>Screen Analysis — Client Registry</strong><br><br>
<strong>What you're looking at:</strong><br>
All monitored entities with risk badges, provider signals, open items, and direct case navigation. This is your entity-centric view — each card shows the entity's current compliance status at a glance.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
① <strong>Meridian Capital (CRITICAL)</strong> — OFAC freeze active, blocking report overdue. Click "View case →" to go directly to the conflict case.<br>
② <strong>Opal Ventures FZE (HIGH)</strong> — KYC 127 days overdue with no analyst assigned. Assign an owner today — this will be flagged in any examiner review.<br>
③ <strong>Baltic Freight Corp</strong> — RFI response overdue 4 days and account still active. Consider account restriction until response is received.<br>
④ <strong>Ibrahim Al-Hassan</strong> — RFI SLA expiring. Use "View case →" to navigate directly to the transaction file.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• The client registry is your entity-level risk inventory — review it weekly as CCO<br>
• Every entity with "No analyst assigned" is a documentation gap and a potential examiner finding<br>
• Use "View History" to access the full entity timeline before making any case decision<br>
• Risk badges should reflect the current highest signal — if a badge is outdated, that's a monitoring gap<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any entity that moves from "medium" to "high" without a corresponding analyst action<br>
• Entities with multiple "open items" but no escalation — they may have fallen through the cracks<br>
• Jurisdictions with increased sanctions risk (Russia, Iran, Belarus) — review all associated entities`,
  },
  remediation: {
    label: 'KYC Remediation',
    prompt: 'Which remediation cases are most critical?',
    summary: "142 overdue reviews. 8 material (90+ days with changes). Opal Ventures: 127d overdue, no owner.",
    actions: [
      { label: '⚑ Escalation queue', nav: 'escalation' },
      { label: '🏢 Client registry', nav: 'clients' },
    ],
    analysis: `<strong>Screen Analysis — KYC Remediation</strong><br><br>
<strong>What you're looking at:</strong><br>
142 overdue KYC reviews, prioritised by actual risk change (not just calendar date). 8 have material changes and require immediate attention. 134 are "calendar-only" overdue — no material change detected, eligible for batch processing.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
① <strong>Start the Critical 8 Reviews</strong> — Opal Ventures (127d overdue, UBO changed) and Baltic Freight Corp (98d, new adverse media) are the top 2 priorities.<br>
② <strong>Assign owners to all Critical 8</strong> — unowned critical cases are an automatic examiner finding.<br>
③ <strong>Batch-refresh the 134 unchanged entities</strong> — the engine can handle this automatically, freeing analyst time for the critical cases.<br>
④ For Opal Ventures: request fresh UBO documentation and trigger Elliptic re-scan for any crypto exposure.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Risk-weighted remediation (vs. calendar-only) is a recognised best practice — it demonstrates programme sophistication to examiners<br>
• The industry average for a corporate KYC review is 30–60 days; some banks take 150–210 days. Automated pre-screening compresses this significantly.<br>
• Document the "no material change" finding for the 134 batch entities — this is your evidence that the overdue status is a calendar artefact, not a risk gap<br>
• Post-2024 regulatory guidance expects perpetual monitoring — the remediation backlog is a symptom of periodic review programmes<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any entity in the "unchanged" batch that gets a live hit during the batch refresh — immediately promote to critical<br>
• Entities approaching 180 days overdue — this is typically the threshold where regulators require a formal remediation plan`,
  },
  regchange: {
    label: 'Reg Change Tracker',
    prompt: 'What are the biggest regulatory deadlines right now?',
    summary: "EU AI Act (134 days, 3 gaps unowned), MiCA Travel Rule (74 days), UK Fraud (40 days), AMLA (110 days).",
    actions: [
      { label: '🎯 Audit readiness', nav: 'audit' },
    ],
    analysis: `<strong>Screen Analysis — Reg Change Tracker</strong><br><br>
<strong>What you're looking at:</strong><br>
4 active regulatory deadlines with compliance gap analysis. Each gap is pre-identified by the engine with a suggested remediation path. Ownership status is shown for each workstream.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
① <strong>UK Failure to Prevent Fraud — 40 days</strong>: the most immediate deadline. Verify your fraud prevention procedures are documented and tested.<br>
② <strong>EU AI Act Annex III — 134 days, 3 gaps unowned</strong>: assign owners today. Unowned gaps 134 days before deadline will become findings.<br>
③ <strong>MiCA Travel Rule — 74 days</strong>: 7 entities non-compliant. Schedule remediation before enforcement begins.<br>
④ Review the AMLA direct supervision implications for your entity type — classification may affect your reporting obligations from August 2026.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Each regulation on this page carries personal CCO liability in addition to institutional liability (post-2024 Senior Manager regimes in UK/EU)<br>
• Assign a named owner, a target date, and a completion criterion for each gap — "in progress" without specifics does not satisfy examiner expectations<br>
• For MiCA Travel Rule: the 7 non-compliant entities need VASP counterparty identification on all crypto-to-fiat transfers above €1,000<br>
• EU AI Act: if any of your screening tools use AI (e.g., ML-based adverse media matching), they may require registration and documentation under Annex III<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any new OFAC/EU/UK sanctions listings in high-risk jurisdictions — these create immediate re-screening obligations<br>
• FinCEN or FCA consultation papers in the pipeline — the reg change tracker should monitor for these proactively`,
  },
  analytics: {
    label: 'Analytics',
    prompt: 'What does the analytics data tell me?',
    summary: "ROI stats, automation savings, provider performance. 87% alert automation rate this week.",
    actions: [],
    analysis: `<strong>Screen Analysis — Analytics</strong><br><br>
<strong>What you're looking at:</strong><br>
Programme performance metrics: alert automation rate, provider ROI analysis, analyst time savings, false positive rates per provider, and resolution time trends.<br><br>
<strong style="color:var(--yellow)">⚡ Key Insights:</strong><br>
• <strong>87% automation rate</strong> is strong — industry benchmark is 60–75%. This means your analysts are focused on genuine risk, not noise.<br>
• <strong>CA adverse media FP rate at 38.7%</strong> is above industry average for your entity mix. Consider tuning the confidence threshold for your jurisdiction profile.<br>
• <strong>Average resolution time: 22 minutes</strong> vs. industry average of 4–8 hours. This is your primary ROI story.<br>
• <strong>Elliptic FP rate at 14.2%</strong> for crypto entities is typical — crypto screening inherently has more noise than sanctions screening.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Track FP rate by provider AND by jurisdiction — a high FP rate in one country may warrant a custom threshold rather than a global change<br>
• Present the automation rate to your board quarterly — it directly demonstrates compliance programme ROI<br>
• Use resolution time trends to identify analyst capacity bottlenecks before they become SLA risks<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any sudden drop in auto-clear rate — may indicate a rules change causing over-escalation<br>
• Any provider showing > 50% FP rate — may indicate a calibration issue with that integration`,
  },
  escalation: {
    label: 'Escalation Queue',
    prompt: 'What escalations need my attention?',
    summary: "3 active escalations — TechNova, Meridian, Nexus. Each with pre-attached reasoning context.",
    actions: [
      { label: '⚡ Open conflicts', nav: 'conflict' },
      { label: '🏢 Client registry', nav: 'clients' },
    ],
    analysis: `<strong>Screen Analysis — Escalation Queue</strong><br><br>
<strong>What you're looking at:</strong><br>
3 cases escalated with full reasoning context pre-attached. Each card shows who escalated, when, the current owner, and the recommended next action. No analyst time was spent assembling these briefings — the engine populated them automatically.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions — in order:</strong><br>
① <strong>Meridian Capital — notify legal NOW</strong>. OFAC freeze is active; legal must review before any client communication. Use "Notify Legal" button.<br>
② <strong>TechNova — approve the CA re-screen</strong>. The re-screen is in progress; your approval moves the case to the next stage.<br>
③ <strong>Nexus Trading — acknowledge the escalation</strong>. It has been open for 26 hours without acknowledgement. Activate enhanced monitoring.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Every escalation that reaches CCO must be documented as actioned or explicitly deferred — an unacknowledged escalation is a process failure<br>
• Use the "Reassign" function if a case falls outside your direct expertise — but record the reassignment reason<br>
• CCO personal liability post-2024 Senior Manager regimes (SM&CR/DORA): actions taken on escalated cases must be documented with your identity and timestamp<br>
• Escalation SLA: CCO acknowledgement should occur within 4 hours of escalation for Critical cases, 8 hours for High<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any escalation that appears for the second time — recurring escalations suggest a root-cause process gap<br>
• Cases escalated more than 24 hours ago with no CCO action — these create personal liability exposure`,
  },
  fatigue: {
    label: 'Alert Fatigue',
    prompt: 'How is our false positive rate?',
    summary: "1,081 auto-triaged. 87% automation. CA adverse media FP at 38.7%. 19 true escalations surfaced.",
    actions: [],
    analysis: `<strong>Screen Analysis — Alert Fatigue</strong><br><br>
<strong>What you're looking at:</strong><br>
Weekly alert triage performance: 1,247 alerts in → 1,081 auto-dismissed → 147 analyst-reviewed → 19 true escalations surfaced. FP rates per provider.<br><br>
<strong style="color:var(--yellow)">⚡ Key Insights:</strong><br>
• <strong>87% auto-dismiss rate</strong> is operationally strong. Industry average: 60–75%.<br>
• <strong>CA adverse media: 38.7% FP rate</strong> — this is the highest-noise provider in your stack. Consider a jurisdiction-specific confidence threshold.<br>
• <strong>19 true escalations from 1,247 alerts</strong> = 1.5% true positive rate. This is typical but reinforces the case for automation.<br>
• <strong>Bridger XG FP rate: 1.8%</strong> — the most precise provider in your stack. Trust its signals heavily.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Auto-dismiss rules must be documented and reviewed quarterly — examiners will ask to see the rule set<br>
• Each auto-dismiss pattern should have a documented rationale and at least one historical case proving the rule's validity<br>
• Do not auto-dismiss any signal if it's the second hit on the same entity within 90 days — correlation matters<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• If the auto-dismiss rate drops below 70% suddenly — may indicate a rules change or a new sanctions list hitting multiple entities<br>
• Any provider whose FP rate is trending upward — may indicate calibration drift`,
  },
  audit: {
    label: 'Audit Readiness',
    prompt: 'How prepared are we for an examiner visit?',
    summary: "94.2% programme effectiveness. 3 open gaps — KYC overdue, EU AI Act, MiCA Travel Rule.",
    actions: [
      { label: '📋 KYC remediation', nav: 'remediation' },
      { label: '📰 Reg changes', nav: 'regchange' },
    ],
    analysis: `<strong>Screen Analysis — Audit Readiness</strong><br><br>
<strong>What you're looking at:</strong><br>
Programme effectiveness score (94.2%), key metrics (SAR on-time rate, KYC current rate, sanctions screen currency), examiner Q&A capability, and audit package generator.<br><br>
<strong style="color:var(--red)">🚨 Immediate Actions:</strong><br>
① <strong>Close the 3 EU AI Act gaps</strong> — assign owners today. These are unowned 134 days before deadline.<br>
② <strong>Resolve the 7 MiCA Travel Rule entities</strong> — remediation deadline is 74 days away.<br>
③ <strong>Address the Critical 8 KYC reviews</strong> — these will be the examiner's first question in any visit.<br>
④ <strong>Generate an audit package</strong> now and review it — identify any gaps before an examiner does.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Post-2024 regulatory philosophy: examiners evaluate <em>programme effectiveness</em>, not just the existence of controls. Your 94.2% effectiveness score is strong evidence.<br>
• "Generate Audit Package" should be run monthly and reviewed by CCO — don't save it only for examiner visits<br>
• Every examiner question on this page has an immediate, documented answer — this is your differentiation from a spreadsheet-based compliance programme<br>
• The SAR decision trail export is your single most valuable document in a FinCEN examination<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any drop in SAR on-time filing rate below 95% — this is a primary examiner focus area<br>
• Sanctions screen currency: even one day of lag on Bridger XG can create liability if an SDN hit occurred during that window`,
  },
  entitygraph: {
    label: 'Entity Graph',
    prompt: 'Explain the entity relationships on this graph',
    summary: "Relationship map across 10 nodes: entities, individuals, wallets. Click any node to analyse connections.",
    actions: [
      { label: '⚡ Provider conflicts', nav: 'conflict' },
      { label: '🏢 Client registry', nav: 'clients' },
    ],
    analysis: `<strong>Screen Analysis — Entity Relationship Graph</strong><br><br>
<strong>What you're looking at:</strong><br>
SVG-rendered relationship graph showing entities, individuals, and crypto wallets as nodes. Edges represent ownership, directorship, and wallet connections. Click any node for the detail card and actions.<br><br>
<strong style="color:var(--yellow)">⚡ Key Insights:</strong><br>
• The graph surfaces connections that are invisible in individual case reviews — a person appearing as UBO in two entities is only visible here<br>
• Sorokin → Meridian Capital and the Elliptic wallet → TechNova FZE are the two highest-risk edges<br>
• The wallet cluster (0x3f5CE96…) connected to a known mixer via 3 hops is the TechNova risk anchor<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Network analysis is increasingly expected in SAR filings — "the subject is connected to entity X which is connected to entity Y" strengthens the narrative<br>
• Any new edge (new UBO, new director, new wallet) should trigger a review of all connected nodes<br>
• Use this graph in your CCO board presentation — it's a powerful visual for explaining complex risk relationships to non-technical stakeholders<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any new node added that connects to two or more existing high-risk nodes — network contagion risk<br>
• Wallet addresses connecting to OFAC-adjacent mixers — even indirect connections create AML risk`,
  },
  feed: {
    label: 'Signal Stream',
    prompt: 'What signals need action right now?',
    summary: "Live feed sorted by urgency. 2 critical, 4 high open. Heat bars show urgency level per item.",
    actions: [
      { label: '🔥 What\'s burning?', nav: 'burning' },
      { label: '🏢 Client registry', nav: 'clients' },
    ],
    analysis: `<strong>Screen Analysis — Signal Stream</strong><br><br>
<strong>What you're looking at:</strong><br>
All provider signals in a single urgency-sorted feed. The heat bar under each item shows the urgency score visually. Resolved items are dimmed. Filter/sort controls let you customise the view.<br><br>
<strong style="color:var(--yellow)">⚡ Key Insights:</strong><br>
• Items sorted by urgency by default — the 2 Critical and 4 High items at the top require action before anything else is reviewed<br>
• The "CRITICAL" tag = urgency 5 (immediate action required). "AUTO" tag = safely resolved without analyst involvement.<br>
• 5 items are resolved (auto or analyst). This is your efficiency baseline — each resolved item represents a case that didn't need human attention.<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Review this page at the start and end of every shift — it's your most complete picture of current programme state<br>
• Use the "Resolved" filter to review auto-cleared items periodically — spot-check 5% for accuracy<br>
• The "Time" sort is useful for morning briefings — it shows what happened overnight<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any item that stays in "Open" status for more than 24 hours — it should either be actioned or escalated<br>
• Multiple HIGH items from the same entity in the same day — a clustering pattern worth investigating`,
  },
  memory: {
    label: 'Institutional Memory',
    prompt: 'How is institutional memory used in this system?',
    summary: "4,821 past decisions power the reasoning engine. 47 active patterns. FP learnings reduce analyst noise.",
    actions: [],
    analysis: `<strong>Screen Analysis — Institutional Memory</strong><br><br>
<strong>What you're looking at:</strong><br>
The accumulated decision history that powers the reasoning engine. 4,821 past decisions, 47 active patterns, and 70+ documented false-positive learnings — all used to pre-assess new alerts before analyst review.<br><br>
<strong style="color:var(--yellow)">⚡ Key Insights:</strong><br>
• Every analyst decision (dismiss/escalate/clear) feeds back into the engine — the system gets more accurate over time<br>
• The 47 active patterns are the engine's most valuable asset — they represent institutional knowledge that doesn't leave when staff turnover<br>
• The Nexus Trading pre-SAR detection was powered by a pattern first observed in Q3 — this is the engine applying historical learning to a new case<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Document rationale on every analyst decision — even "dismiss" decisions feed the engine's accuracy<br>
• Review the active patterns quarterly — remove patterns that no longer reflect the current threat landscape<br>
• Treat institutional memory as a compliance asset — it's evidence of a learning programme, which examiners view favourably<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Patterns that haven't fired in 6+ months — they may need to be retired or updated<br>
• Any new high-volume signal type that doesn't yet have a documented pattern — it's a gap in institutional learning`,
  },
  onboarding: {
    label: 'Onboarding Flow',
    prompt: 'Walk me through the zero-touch onboarding flow',
    summary: "5-stage zero-touch KYB. Sumsub + ComplyAdvantage + Elliptic in automated sequence. 0 analyst minutes on clear cases.",
    actions: [],
    analysis: `<strong>Screen Analysis — Onboarding Flow</strong><br><br>
<strong>What you're looking at:</strong><br>
The 5-stage zero-touch KYB onboarding process. For entities that clear all automated checks, the process requires zero analyst minutes. Only hits and conflicts escalate to human review.<br><br>
<strong style="color:var(--yellow)">⚡ Key Insights:</strong><br>
• Stage 1: Entity verification (Sumsub KYB) → Stage 2: Adverse media (ComplyAdvantage) → Stage 3: Sanctions (Bridger XG) → Stage 4: Crypto screening (Elliptic, if applicable) → Stage 5: Risk scoring + routing<br>
• A "zero-touch clear" entity gets enrolled in perpetual monitoring at Stage 5 — it doesn't leave the programme<br>
• The process routes High/Critical hits directly to the analyst queue with full context pre-assembled<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Onboarding criteria should be reviewed annually — as your entity mix changes (e.g., more crypto), the stage sequence may need adjustment<br>
• Document the onboarding configuration (thresholds, provider sequence) — examiners will ask about your customer acceptance policy<br>
• A zero-touch clear is not a "forever clear" — perpetual monitoring at Stage 5 ensures the entity is re-evaluated on material changes<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any increase in onboarding rejection rate — may indicate changes in the applicant pool or provider calibration<br>
• Entities that clear onboarding but generate signals within 60 days — review the onboarding criteria for that entity type`,
  },
  auditlog: {
    label: 'Audit Log',
    prompt: 'What has happened in this session?',
    summary: "Full immutable session trail. Every navigation, query, and action logged with timestamp and analyst identity.",
    actions: [],
    analysis: `<strong>Screen Analysis — Audit Log</strong><br><br>
<strong>What you're looking at:</strong><br>
Every action taken in this session — navigation, queries, entity reviews, and compliance actions — logged with timestamp and analyst identity. This log is immutable and cannot be edited or deleted.<br><br>
<strong style="color:var(--yellow)">⚡ Key Insights:</strong><br>
• The audit log is your primary evidence in any regulatory investigation or legal dispute<br>
• It shows <em>who</em> saw <em>what</em>, <em>when</em> — critical for establishing the "reasonable person" standard in enforcement actions<br>
• Action types: 🧭 Navigate / 👁 Review / ✓ Action / 💬 Query / ▶ System<br><br>
<strong style="color:var(--yellow)">⚡ Best Practices:</strong><br>
• Export the audit log before closing a session — retain for your compliance records in line with record retention policies (typically 5–7 years)<br>
• Review the log weekly as CCO to ensure all escalations were actioned — an unactioned escalation visible in the log is a liability<br>
• The log is evidence of programme effectiveness — if a SAR is challenged, the log shows the step-by-step decision process<br><br>
<strong style="color:var(--blue)">👁 Watch For:</strong><br>
• Any case where the log shows "reviewed" but no subsequent action — this is a documentation gap<br>
• Long gaps between navigation events during business hours — may indicate analyst capacity issues`,
  },
}

const DEFAULT_SUGGESTIONS = [
  "What's my priority today?",
  'Explain TechNova FZE risk',
  'OFAC freeze protocol',
  'SAR draft for Ibrahim',
  'Crypto onboarding checklist',
  'GreenPath re-screen analysis',
]

const DEFAULT_RESPONSE = `I don't have a specific answer for that, but here's what I can help with:<br><br>
• <strong>Case analysis</strong> — TechNova, Meridian, Ibrahim, GreenPath, Nexus<br>
• <strong>Procedures</strong> — OFAC, SAR filing, escalation, KYC remediation<br>
• <strong>Regulations</strong> — MiCA Travel Rule, EU AI Act, AMLA, UK Fraud<br>
• <strong>Checklists</strong> — crypto onboarding, audit prep, perpetual monitoring<br>
• <strong>Drafting</strong> — SAR narratives, RFI letters, escalation emails<br>
• <strong>Screen analysis</strong> — type "analyse this screen" on any page for contextual recommendations<br><br>
<em>Try one of the suggestion chips above or rephrase your question.</em>`

function getBotResponse(q) {
  const ql = q.toLowerCase()
  for (const entry of botKB) {
    if (entry.patterns.some(p => ql.includes(p))) return entry.response
  }
  return DEFAULT_RESPONSE
}

let msgId = 0

export default function ChatPane() {
  const { logAction, notify, navigate, currentPage } = useApp()
  const ctx = PAGE_CONTEXT[currentPage] || null
  const prevPageRef = useRef(currentPage)

  const [messages, setMessages] = useState([
    { id: ++msgId, cls: 'bot', html: '👋 I\'m your AI compliance assistant. I\'m context-aware — I can see what you\'re viewing.<br><br><strong>Navigate to any page and type "analyse this screen" for page-specific recommendations and best practices.</strong>' },
  ])
  const [input, setInput] = useState('')
  const messagesRef = useRef(null)

  // Inject a context nudge on page navigation
  useEffect(() => {
    if (prevPageRef.current === currentPage) return
    prevPageRef.current = currentPage
    if (!ctx) return

    setMessages(prev => [
      ...prev,
      {
        id: ++msgId,
        cls: 'bot',
        html: `<span style="font-size:10px;color:var(--text4);display:block;margin-bottom:4px">📍 Navigated to <strong>${ctx.label}</strong></span>${ctx.summary}<br><br><em style="font-size:10.5px;color:var(--text4)">Type "analyse this screen" for full recommendations and best practices.</em>`,
      },
    ])
  }, [currentPage, ctx])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const send = (text) => {
    const q = (text || input).trim()
    if (!q) return
    setInput('')

    const userMsg = { id: ++msgId, cls: 'user', html: q }
    const thinkId = ++msgId
    const thinkMsg = { id: thinkId, cls: 'thinking', html: '⏳ Analysing…' }

    setMessages(prev => [...prev, userMsg, thinkMsg])
    logAction('AI query: ' + q.substring(0, 55), 'AI Compliance Assistant', 'query')

    const ql = q.toLowerCase()
    const isPageQuery = ql.includes('this screen') || ql.includes('this page') || ql.includes('analyse this') || ql.includes('analyze this') || ql.includes('what am i looking') || ql.includes('recommendations') || ql.includes('best practice')

    setTimeout(() => {
      let response
      if (isPageQuery && ctx) {
        response = ctx.analysis
      } else {
        response = getBotResponse(q)
      }
      setMessages(prev => prev.map(m =>
        m.id === thinkId ? { ...m, cls: 'bot', html: response } : m
      ))
    }, 700 + Math.random() * 400)
  }

  const handleAction = (action) => {
    logAction('AI panel action: navigate to ' + action.nav, currentPage, 'action')
    navigate(action.nav)
    notify('Navigated to ' + (PAGE_CONTEXT[action.nav]?.label || action.nav))
  }

  const suggestions = ctx
    ? [ctx.prompt, ...DEFAULT_SUGGESTIONS.slice(0, 3)]
    : DEFAULT_SUGGESTIONS

  return (
    <>
      <div className="detail-hdr" style={{ flexShrink: 0 }}>
        <div className="detail-hdr-title">💬 AI Compliance Assistant</div>
        <div className="detail-hdr-sub">
          {ctx
            ? <>Context: <strong style={{ color: 'var(--blue)' }}>{ctx.label}</strong></>
            : 'Recommendations · Best practices · Procedures · SAR drafting'}
        </div>
      </div>

      {/* Analyse this screen — primary CTA */}
      {ctx && (
        <div style={{
          padding: '10px 12px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg2)',
          flexShrink: 0,
        }}>
          <button
            onClick={() => send('analyse this screen')}
            style={{
              width: '100%',
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px',
              border: '1.5px solid var(--blue)',
              borderRadius: 'var(--r)',
              background: 'var(--blue-bg)',
              cursor: 'pointer',
              fontFamily: 'var(--font)',
              textAlign: 'left',
              transition: 'all var(--transition)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.querySelectorAll('span').forEach(s => s.style.color = '#fff') }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--blue-bg)'; e.currentTarget.querySelectorAll('span').forEach(s => s.style.color = '') }}
          >
            <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>🔍</span>
            <span style={{ flex: 1 }}>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--blue)', lineHeight: 1.3 }}>
                Analyse this screen
              </span>
              <span style={{ display: 'block', fontSize: 10, color: 'var(--text3)', marginTop: 2, lineHeight: 1.3 }}>
                Immediate actions · Best practices · Watch for
              </span>
            </span>
            <span style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>→</span>
          </button>

          {/* Quick nav links — secondary row */}
          {ctx.actions.length > 0 && (
            <div style={{ display: 'flex', gap: 5, marginTop: 7, flexWrap: 'wrap' }}>
              {ctx.actions.map(a => (
                <button
                  key={a.nav}
                  onClick={() => handleAction(a)}
                  style={{
                    fontSize: 10, fontWeight: 600, padding: '3px 9px',
                    border: '1px solid var(--border)', borderRadius: 'var(--r)',
                    background: 'var(--bg)', color: 'var(--text3)',
                    cursor: 'pointer', fontFamily: 'var(--font)',
                    transition: 'all var(--transition)',
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--blue)'; e.target.style.color = 'var(--blue)' }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text3)' }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="chat-messages" ref={messagesRef}>
        {messages.map(m => (
          <div
            key={m.id}
            className={`chat-msg ${m.cls}`}
            dangerouslySetInnerHTML={{ __html: m.html }}
          />
        ))}
      </div>
      <div className="chat-suggestions">
        {suggestions.map(s => (
          <div key={s} className="chat-sug" onClick={() => send(s)}>{s}</div>
        ))}
      </div>
      <div className="chat-input-row">
        <textarea
          className="chat-input"
          placeholder={ctx ? `Ask about ${ctx.label} or type "analyse this screen"…` : 'Ask a compliance question…'}
          rows={2}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
        />
        <button className="chat-send" onClick={() => send()}>↑</button>
      </div>
    </>
  )
}
