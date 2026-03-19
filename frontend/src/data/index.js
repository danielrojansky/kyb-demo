// ── ENTITY HISTORIES ──────────────────────────────────────────
export const histories = {
  'TechNova FZE': {
    sub: 'UAE-registered tech holding · 3 UBOs · Crypto-exposed',
    items: [
      { cls: 'tl-dot-green',  date: '14 months ago', event: 'Initial KYB — fully cleared', note: 'All 3 UBOs verified. Sumsub + ComplyAdvantage clean.' },
      { cls: 'tl-dot-yellow', date: '9 months ago',  event: 'ComplyAdvantage adverse media hit', note: 'Dismissed — low confidence, common name in UAE registry.' },
      { cls: 'tl-dot-blue',   date: '6 months ago',  event: 'Periodic re-screen — clear', note: 'Auto-triggered. No change in risk profile.' },
      { cls: 'tl-dot-yellow', date: '3 months ago',  event: 'UBO structure change filed', note: 'New beneficial owner added (Faisal Al-Rashid, 26%). Re-screen triggered.' },
      { cls: 'tl-dot-red',    date: 'Today',         event: 'CONFLICT: Sumsub UBO flag + Elliptic 8.4 risk score', note: '⚡ Reasoning engine active — see main panel' },
    ],
  },
  'Meridian Capital': {
    sub: 'Cayman Islands fund · 12 LPs · $180M AUM',
    items: [
      { cls: 'tl-dot-green',  date: '2 years ago',   event: 'Fund onboarding — cleared', note: 'Standard LP disclosure. All 12 LPs verified via Sumsub.' },
      { cls: 'tl-dot-green',  date: '18 months ago', event: 'Re-screen — clear', note: 'No changes in LP structure.' },
      { cls: 'tl-dot-yellow', date: '11 months ago', event: 'New LP added — Viktor Sorokin', note: 'Russian national. PEP-adjacent check run. Cleared with note.' },
      { cls: 'tl-dot-red',    date: 'Today',         event: 'Sorokin sanctions hit — Bridger XG', note: '⚡ LP added to OFAC SDN list 3 days ago. Reasoning engine triggered.' },
    ],
  },
  'Ibrahim Al-Hassan': {
    sub: 'Individual · Egyptian national · MoneyNet retail',
    items: [
      { cls: 'tl-dot-green',  date: '4 months ago', event: 'KYC onboarding — cleared', note: 'Sumsub liveness + document verified. ComplyAdvantage clean.' },
      { cls: 'tl-dot-green',  date: '2 months ago', event: 'First transaction — €4,200', note: 'Within expected profile. No flag.' },
      { cls: 'tl-dot-yellow', date: 'Today',        event: 'Transaction spike: €47,000 in 6 hours', note: '⚡ Behavioural anomaly + new wallet address. Reasoning engine triggered.' },
    ],
  },
  'GreenPath Energy': {
    sub: 'UK-registered renewable energy company',
    items: [
      { cls: 'tl-dot-green',  date: '8 months ago', event: 'KYB onboarding — cleared', note: 'Companies House verified. 2 UBOs. Clean on all providers.' },
      { cls: 'tl-dot-green',  date: '5 months ago', event: 'Contract renewal screening — clear', note: 'Standard periodic check.' },
      { cls: 'tl-dot-yellow', date: '6 weeks ago',  event: 'Director change filed at Companies House', note: 'New director: Li Wei. PEP-adjacent — cleared.' },
      { cls: 'tl-dot-blue',   date: 'Today',        event: 'Routine monthly re-screen', note: 'ComplyAdvantage weak hit surfaced — see main panel.' },
    ],
  },
  'Nexus Trading Ltd': {
    sub: 'Malta-registered trading company · Multi-jurisdiction',
    items: [
      { cls: 'tl-dot-green',  date: '11 months ago', event: 'Onboarding — cleared', note: 'Malta registry verified. Clean across all providers.' },
      { cls: 'tl-dot-yellow', date: '8 months ago',  event: 'Adverse media hit — dismissed', note: 'Analyst: false positive, unrelated company same name.' },
      { cls: 'tl-dot-yellow', date: '5 months ago',  event: 'Second adverse media hit — dismissed', note: 'Same analyst, same reasoning.' },
      { cls: 'tl-dot-yellow', date: '2 months ago',  event: 'PEP-adjacent flag — dismissed', note: 'Low-confidence match. Dismissed without escalation.' },
      { cls: 'tl-dot-red',    date: 'Today',         event: '⚡ Pattern match: pre-SAR cluster detected', note: 'Reasoning engine: 4 dismissals in 11 months matches Q3 SAR precursor pattern.' },
    ],
  },
}

// ── FEED ITEMS ────────────────────────────────────────────────
// urgency 5=Critical, 4=High, 3=Medium, 2=Low, 1=Info
// status: 'open' | 'in-progress' | 'resolved'
export const feedItems = [
  { color: 'var(--red)',    urgency: 5, status: 'open',        tag: 'CRITICAL', page: 'conflict',    title: 'Meridian Capital — OFAC SDN match',                 sub: 'Viktor Sorokin designated · Freeze active · Legal sign-off OVERDUE',            time: '2h ago',  ageMin: 120 },
  { color: 'var(--red)',    urgency: 5, status: 'open',        tag: 'CRITICAL', page: 'conflict',    title: 'TechNova FZE — Elliptic 8.4/10',                   sub: 'Wallet risk · CA re-screen stale 11d · UBO unverified · Hold pending',          time: '2m ago',  ageMin: 2 },
  { color: 'var(--red)',    urgency: 4, status: 'open',        tag: 'HIGH',     page: 'transaction', title: 'Ibrahim Al-Hassan — Transaction anomaly',           sub: 'Structuring pattern · 11× spike · 24h hold placed · RFI NOT yet sent',         time: '3h ago',  ageMin: 180 },
  { color: 'var(--red)',    urgency: 4, status: 'open',        tag: 'HIGH',     page: 'remediation', title: 'KYC Remediation — 8 critical entities flagged',     sub: 'Material changes detected · Overdue 90+ days · No analyst assigned',           time: '8h ago',  ageMin: 480 },
  { color: 'var(--purple)', urgency: 3, status: 'in-progress', tag: 'PATTERN',  page: 'pattern',     title: 'Nexus Trading — Pattern match triggered',           sub: 'Pre-SAR cluster match · Escalated to senior analyst · Awaiting response',       time: '1d ago',  ageMin: 1440 },
  { color: 'var(--yellow)', urgency: 3, status: 'open',        tag: 'REVIEW',   page: 'rescreen',    title: 'GreenPath Energy — ComplyAdvantage weak hit',       sub: 'Adverse media · Li Wei director · Confidence 0.38 · Queued for review',        time: '14m ago', ageMin: 14 },
  { color: 'var(--yellow)', urgency: 2, status: 'open',        tag: 'WATCH',    page: 'regchange',   title: 'EU AI Act — 134 days to Annex III deadline',        sub: '3 compliance gaps identified · Remediation plan pre-drafted',                   time: '12h ago', ageMin: 720 },
  { color: 'var(--yellow)', urgency: 2, status: 'open',        tag: 'WATCH',    page: 'regchange',   title: 'MiCA Travel Rule — 7 entities non-compliant',       sub: 'Crypto-to-fiat transfers missing counterparty data',                            time: '2d ago',  ageMin: 2880 },
  { color: 'var(--green)',  urgency: 1, status: 'resolved',    tag: 'AUTO',     page: 'feed',        title: '47 entities — Bridger XG nightly batch',            sub: 'All clear · Auto-cleared · No analyst action',                                  time: '1h ago',  ageMin: 60 },
  { color: 'var(--green)',  urgency: 1, status: 'resolved',    tag: 'AUTO',     page: 'feed',        title: 'GulfStream Logistics — Onboarding complete',        sub: 'Auto-cleared · 0 analyst minutes · Enrolled in monitoring',                     time: '4h ago',  ageMin: 240 },
  { color: 'var(--blue)',   urgency: 1, status: 'resolved',    tag: 'INFO',     page: 'fatigue',     title: 'Alert Fatigue — 1,081 auto-triaged',                sub: 'Weekly batch · 87% auto-dismissed · 19 true escalations surfaced',              time: '6h ago',  ageMin: 360 },
  { color: 'var(--blue)',   urgency: 1, status: 'resolved',    tag: 'INFO',     page: 'audit',       title: 'Audit package auto-refreshed',                      sub: 'Examiner-ready package updated · 47 pages · All evidence current',              time: '1d ago',  ageMin: 1440 },
  { color: 'var(--green)',  urgency: 1, status: 'resolved',    tag: 'AUTO',     page: 'feed',        title: '174 entities — routine re-screen batch',            sub: 'All unchanged · Auto-cleared · Memory updated',                                 time: '1d ago',  ageMin: 1440 },
]

// ── BURNING ITEMS (aging / stale / SLA at risk) ───────────────
export const burningItems = [
  {
    id: 'b1', severity: 'critical', type: 'sla_breach',
    icon: '⏰', title: 'Meridian Capital — OFAC reporting window',
    detail: 'OFAC blocking report must be filed within same business day of designation. Designation was 3 days ago. OVERDUE.',
    entity: 'Meridian Capital', page: 'conflict',
    slaLabel: 'OFAC deadline', slaPassed: true, slaAgo: '3 days ago',
    ageHours: 72, lastAction: 'Escalated to Sara Levy',
  },
  {
    id: 'b2', severity: 'critical', type: 'no_action',
    icon: '🔥', title: 'TechNova FZE — CA re-screen still pending',
    detail: 'CA re-screen was triggered 11 days ago but result never actioned. Transaction hold expires in 2h.',
    entity: 'TechNova FZE', page: 'conflict',
    slaLabel: 'Hold expiry', slaPassed: false, slaIn: '2h 14m',
    ageHours: 264, lastAction: 'CA re-screen triggered 11d ago',
  },
  {
    id: 'b3', severity: 'high', type: 'rfi_overdue',
    icon: '📭', title: 'Ibrahim Al-Hassan — RFI not sent',
    detail: 'Transaction hold placed 3h ago. RFI was recommended but never drafted or sent. SLA: 4 hours from hold.',
    entity: 'Ibrahim Al-Hassan', page: 'rfi',
    slaLabel: 'RFI deadline', slaPassed: false, slaIn: '47m',
    ageHours: 3, lastAction: 'Transaction hold placed',
  },
  {
    id: 'b4', severity: 'high', type: 'stale_case',
    icon: '🕸️', title: 'Nexus Trading Ltd — Escalation unacknowledged',
    detail: 'Pattern match escalated to David Cohen 26h ago. No acknowledgement. No action. Pattern stage 3 → 4 risk window: 58 days.',
    entity: 'Nexus Trading Ltd', page: 'pattern',
    slaLabel: 'Escalation ack', slaPassed: true, slaAgo: '18h ago',
    ageHours: 26, lastAction: 'Escalated to David Cohen',
  },
  {
    id: 'b5', severity: 'high', type: 'kyc_overdue',
    icon: '📋', title: 'Opal Ventures FZE — KYC overdue 127 days',
    detail: 'UBO changed + new Elliptic flag. Remediation assigned but no analyst has opened the case.',
    entity: 'Opal Ventures FZE', page: 'remediation',
    slaLabel: 'KYC deadline', slaPassed: true, slaAgo: '127 days ago',
    ageHours: 3048, lastAction: 'Flagged in batch run',
  },
  {
    id: 'b6', severity: 'medium', type: 'rfi_no_response',
    icon: '📭', title: 'Baltic Freight Corp — RFI response overdue',
    detail: 'RFI sent 6 days ago. 48h response window passed 4 days ago. No follow-up sent. Account still active.',
    entity: 'Baltic Freight Corp', page: 'remediation',
    slaLabel: 'RFI response', slaPassed: true, slaAgo: '4 days ago',
    ageHours: 144, lastAction: 'RFI sent 6d ago',
  },
  {
    id: 'b7', severity: 'medium', type: 'stale_case',
    icon: '🌡️', title: 'GreenPath Energy — Director screen not completed',
    detail: 'Li Wei deep-screen was recommended 14 minutes ago. No action taken yet. Weak hit could escalate.',
    entity: 'GreenPath Energy', page: 'rescreen',
    slaLabel: 'Screen SLA', slaPassed: false, slaIn: '7h 46m',
    ageHours: 0.25, lastAction: 'CA weak hit surfaced',
  },
  {
    id: 'b8', severity: 'low', type: 'regulatory',
    icon: '📅', title: 'EU AI Act — 134 days · 3 gaps unassigned',
    detail: 'Compliance gaps identified but no owner assigned to any of the 3 remediation workstreams.',
    entity: null, page: 'regchange',
    slaLabel: 'Annex III deadline', slaPassed: false, slaIn: '134 days',
    ageHours: 12, lastAction: 'Gaps identified by engine',
  },
]

// ── CHATBOT KNOWLEDGE BASE ────────────────────────────────────
export const botKB = [
  {
    patterns: ['priority', 'today', 'urgent', 'focus', 'morning', 'start', 'what should'],
    response: `<strong>Your Priority Queue — Today</strong><br><br><span style="color:var(--red)"><strong>1. CRITICAL — Meridian Capital</strong></span><br>OFAC SDN match: Viktor Sorokin designated 15 Mar. Freeze active. <em>Legal sign-off needed within 2 hours to meet OFAC reporting window.</em><br><br><span style="color:var(--red)"><strong>2. HIGH — TechNova FZE</strong></span><br>CA re-screen in progress (was 11 days stale). Do not clear until result received. Elliptic wallet 8.4/10 remains unresolved.<br><br><span style="color:var(--yellow)"><strong>3. MEDIUM — Ibrahim Al-Hassan</strong></span><br>Structuring pattern confirmed. 24h hold active. SAR narrative pre-drafted — ready for your review.<br><br><em>Combined analyst time with engine pre-work: ~2.5 hours.</em>`,
  },
  {
    patterns: ['technova', 'tech nova', 'ubo', 'faisal', 'elliptic', 'wallet', 'dmcc'],
    response: `<strong>TechNova FZE — Case Analysis</strong><br><br><strong>Entity:</strong> TechNova FZE · Reg. DMCC-252847<br><strong>Jurisdiction:</strong> Dubai Multi Commodities Centre<br><strong>UBO Structure:</strong> Ahmed Al-Rashidi 49% · Faisal Al-Rashid 26% (added 14 Mar) · Omar Khalid 25%<br><br><strong>Signal Summary:</strong><br>• Sumsub: flagged UBO addition — awaiting re-verification<br>• Elliptic: wallet 0x3f5CE96… scored <span style="color:var(--red)">8.4/10</span> — 3 hops from OFAC-listed mixer<br>• ComplyAdvantage: clean but 11-day stale screen (pre-dates UBO change)<br><br><strong>Recommendation:</strong> Await fresh CA re-screen. If clean — conditional approval + 30d enhanced monitoring. If hit — full EDD + RFI on Faisal's source of funds for stake acquisition.`,
  },
  {
    patterns: ['ofac', 'sanctions', 'sdn', 'freeze', 'sorokin', 'meridian', 'viktor'],
    response: `<strong>OFAC SDN Sanctions — Immediate Protocol</strong><br><br>This is a <span style="color:var(--red)"><strong>hard sanction match</strong></span>. Viktor Sorokin designated SDN 15 Mar 2026 (OFAC Ref: SDN-2026-03-0947).<br><br><strong>Within 1 hour:</strong><br>① Block all accounts + pending LP distributions<br>② Notify General Counsel + CCO<br>③ Document time of discovery + all actions<br><br><strong>Within 24 hours:</strong><br>④ File OFAC blocking report (mandatory)<br>⑤ OFAC Compliance Hotline: 1-800-540-6322<br><br><strong>Within 30 days:</strong><br>⑥ File SAR with FinCEN<br>⑦ Consider voluntary self-disclosure (reduces civil penalty up to 50%)<br><br><span style="color:var(--yellow)">⚠ Do NOT notify the customer — may constitute "tipping off" under 31 CFR §103.18</span>`,
  },
  {
    patterns: ['sar', 'suspicious activity', 'file sar', 'draft sar', 'ibrahim', 'structuring'],
    response: `<strong>Pre-Drafted SAR Narrative — Ibrahim Al-Hassan</strong><br><br><em style="font-size:11px;line-height:1.7;display:block;background:var(--bg2);border:1px solid var(--border);padding:10px;border-radius:6px;margin:6px 0;">"On 19 March 2026, MoneyNet identified a suspected structuring pattern on customer Ibrahim Al-Hassan (Acct #MNT-284719). Between 06:12–10:47 GMT, nine (9) transactions were processed totalling €47,250 — all individually below the €5,000 reporting threshold. Pattern is consistent with structuring to evade mandatory reporting (31 U.S.C. §5324). New wallet address 0xA91B... added same day."</em>`,
  },
  {
    patterns: ['crypto', 'onboard', 'vasp', 'mica', 'travel rule', 'checklist', 'blockchain'],
    response: `<strong>MiCA-Compliant Crypto Onboarding Checklist</strong><br>(Effective June 2026 enforcement)<br><br><strong>Identity:</strong><br>☑ Sumsub KYB — company registry + UBO verification<br>☑ All UBOs >10% stake: enhanced identity check<br>☑ Source of crypto funds declaration<br><br><strong>Blockchain:</strong><br>☑ Elliptic wallet risk for all declared addresses<br>☑ 90-day transaction history review<br>☑ VASP counterparty identification<br><br><strong>Travel Rule:</strong><br>☑ Capture originator + beneficiary VASP for transfers >€1,000<br>☑ Connect to Travel Rule solution (TRUST / Notabene)`,
  },
  {
    patterns: ['audit', 'examiner', 'regulator', 'exam', 'prepare', 'visit'],
    response: `<strong>Examiner Readiness Brief</strong><br><br>Current audit score: <span style="color:var(--green)"><strong>94.2%</strong></span> programme effectiveness<br><br><strong>Strong areas:</strong><br>✓ Sanctions: 100% current, SDN updated daily<br>✓ SAR filing: 98.7% on time<br>✓ Dismissals: 70+ FP patterns documented<br>✓ Conflicts: all resolved within 48 hours<br><br><strong>Open items:</strong><br>⚠ 142 KYC reviews overdue (8 material — in progress)<br>⚠ EU AI Act Annex III: 3 gaps open<br>⚠ MiCA Travel Rule: 7 entities pending data capture`,
  },
  {
    patterns: ['false positive', 'fp', 'dismiss', 'noise', 'auto-clear'],
    response: `<strong>False Positive Management</strong><br><br>Provider FP rates (this customer base):<br>• CA adverse media: <span style="color:var(--yellow)">38.7%</span><br>• CA PEP: <span style="color:var(--yellow)">22.4%</span><br>• Elliptic crypto: <span style="color:var(--yellow)">14.2%</span><br>• Bridger XG: <span style="color:var(--green)">1.8%</span><br>• Sumsub: <span style="color:var(--green)">3.1%</span><br><br><strong>Auto-dismiss when:</strong> FP confidence >85% AND no corroborating signals AND matches a known pattern.<br><br><strong>Always escalate when:</strong> Any second provider corroborates · High-risk jurisdiction · 2+ prior dismissals on same entity.`,
  },
  {
    patterns: ['escalat', 'process', 'protocol', 'workflow', 'procedure'],
    response: `<strong>Standard Escalation Protocol</strong><br><br><strong>L1 — Analyst (0–4 hrs):</strong><br>Review engine output · Clear / hold / escalate<br><br><strong>L2 — Senior Analyst (within 8 hrs):</strong><br>Complex conflicts · PEP/SDN adjacency · Multi-provider corroboration<br><br><strong>L3 — CCO + Legal (immediate):</strong><br>Confirmed OFAC SDN → freeze + legal notify<br>SAR ready → CCO sign-off required<br>Pre-SAR pattern → CCO awareness<br><br><em>All escalations are auto-logged with entity history pre-attached.</em>`,
  },
  {
    patterns: ['greenpath', 'li wei', 'director', 'companies house', 'uk', 'rescreen'],
    response: `<strong>GreenPath Energy — Re-screen Analysis</strong><br><br>ComplyAdvantage hit: "Li Wei" adverse media (confidence 0.38).<br><br>Key finding: Li Wei joined GreenPath's board <strong>6 weeks ago</strong>. The adverse media article dates to <strong>8 weeks ago</strong> — predating the directorship. Not caught at onboarding because the person wasn't yet a director.<br><br><strong>Recommended actions:</strong><br>1. Send RFI to GreenPath requesting Li Wei's background disclosure<br>2. Run enhanced Sumsub + Elliptic deep-screen on Li Wei personally<br>3. Do not auto-dismiss — temporal alignment warrants human review.`,
  },
  {
    patterns: ['nexus', 'pattern', 'malta', 'cluster', 'pre-sar'],
    response: `<strong>Nexus Trading Ltd — Pattern Analysis</strong><br><br>All individual provider signals are unremarkable. The risk is in the <strong>sequence</strong>:<br><br>4 dismissals in 11 months matches a cluster of 12 entities that all preceded SAR filings in Q3. The 5-stage trajectory:<br>① Clean onboarding<br>② Recurring low-confidence hits<br>③ Analyst dismissals without escalation ← <strong>Nexus is here</strong><br>④ Gradual transaction volume increase<br>⑤ Sudden high-value cross-border transfer → SAR<br><br>Average time from stage 3 to SAR-triggering event: <strong>58 days</strong>. Enhanced monitoring recommended before next dismissal.`,
  },
]

// ── NAV STRUCTURE ─────────────────────────────────────────────
export const navSections = [
  {
    items: [{ id: 'home', icon: '🏠', label: 'Home' }],
  },
  {
    label: 'Use Cases',
    items: [
      { id: 'conflict',    icon: '⚡', label: 'Provider Conflict',   badge: '3',   badgeColor: '' },
      { id: 'onboarding',  icon: '🧩', label: 'Onboarding Flow' },
      { id: 'transaction', icon: '💸', label: 'Transaction Screen',  badge: '1',   badgeColor: '' },
      { id: 'rescreen',    icon: '🔄', label: 'Periodic Re-screen',  badge: '2',   badgeColor: 'yellow' },
      { id: 'pattern',     icon: '🧠', label: 'Pattern Detection' },
      { id: 'sar',         icon: '📄', label: 'SAR Generation',      badge: '2',   badgeColor: '' },
      { id: 'rfi',         icon: '✉️', label: 'RFI Drafting' },
    ],
  },
  {
    label: 'CCO Daily',
    items: [
      { id: 'burning',     icon: '🔥', label: "What's Burning",       badge: '8',   badgeColor: '' },
      { id: 'fatigue',     icon: '📊', label: 'Alert Fatigue',       badge: '95%', badgeColor: 'yellow' },
      { id: 'remediation', icon: '📋', label: 'KYC Remediation',     badge: '142', badgeColor: '' },
      { id: 'regchange',   icon: '📰', label: 'Reg Change Tracker',  badge: '7',   badgeColor: 'blue' },
      { id: 'audit',       icon: '🎯', label: 'Audit Readiness' },
    ],
  },
  {
    label: 'Live Feed',
    items: [
      { id: 'feed',   icon: '📡', label: 'Signal Stream', badge: 'live', badgeColor: 'blue' },
      { id: 'memory', icon: '🔮', label: 'Inst. Memory' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { id: 'entitygraph', icon: '🕸️', label: 'Entity Graph',    badge: 'new', badgeColor: 'green' },
      { id: 'analytics',   icon: '📈', label: 'Analytics' },
    ],
  },
  {
    label: 'Team',
    items: [
      { id: 'escalation', icon: '⚑',  label: 'Escalation Queue', badge: '3',   badgeColor: 'yellow' },
      { id: 'auditlog',   icon: '🔒', label: 'Audit Log',         badge: '',    badgeColor: 'blue', id2: 'log-count' },
    ],
  },
]

// ── COMMAND PALETTE ENTRIES ───────────────────────────────────
export const cmdEntries = [
  { icon: '🏠', title: 'Home Dashboard',          sub: 'Morning brief, priority queue',                    page: 'home' },
  { icon: '⚡', title: 'Provider Conflict',        sub: 'TechNova FZE, Meridian Capital',                   page: 'conflict' },
  { icon: '🧩', title: 'Onboarding Flow',          sub: 'Zero-touch KYB step-by-step',                      page: 'onboarding' },
  { icon: '💸', title: 'Transaction Screening',    sub: 'Ibrahim Al-Hassan structuring pattern',            page: 'transaction' },
  { icon: '🔄', title: 'Periodic Re-screen',       sub: 'GreenPath Energy director change',                 page: 'rescreen' },
  { icon: '🧠', title: 'Pattern Detection',        sub: 'Nexus Trading pre-SAR cluster',                    page: 'pattern' },
  { icon: '📄', title: 'SAR Generation',           sub: 'TechNova FZE draft SAR',                           page: 'sar' },
  { icon: '✉️', title: 'RFI Drafting',             sub: 'Ibrahim Al-Hassan RFI',                            page: 'rfi' },
  { icon: '🔥', title: "What's Burning",          sub: 'Overdue RFIs, stale cases, SLA breaches, aging without action', page: 'burning' },
  { icon: '📊', title: 'Alert Fatigue',            sub: '1,081 auto-triaged · 87% reduction',               page: 'fatigue' },
  { icon: '📋', title: 'KYC Remediation',          sub: '142 overdue · 8 critical',                         page: 'remediation' },
  { icon: '📰', title: 'Reg Change Tracker',       sub: 'EU AI Act, MiCA, AMLA deadlines',                  page: 'regchange' },
  { icon: '🎯', title: 'Audit Readiness',          sub: 'Examiner package, gap analysis',                   page: 'audit' },
  { icon: '📡', title: 'Signal Stream',            sub: 'Live feed from all providers',                     page: 'feed' },
  { icon: '🔮', title: 'Institutional Memory',     sub: '4,821 decisions · 47 active patterns',             page: 'memory' },
  { icon: '🕸️', title: 'Entity Graph',             sub: 'Relationship visualisation across entities',       page: 'entitygraph' },
  { icon: '📈', title: 'Analytics',                sub: 'Provider ROI · Automation savings',                page: 'analytics' },
  { icon: '⚑',  title: 'Escalation Queue',        sub: '3 active · TechNova · Meridian · Nexus',           page: 'escalation' },
  { icon: '🔒', title: 'Audit Log',               sub: 'Full session audit trail',                          page: 'auditlog' },
]
