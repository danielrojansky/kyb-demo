# Venn Analyzer — AI-Powered KYB Compliance Workstation

**Live demo → [frontend-kappa-wheat-55.vercel.app](https://frontend-kappa-wheat-55.vercel.app)**

A fully interactive compliance demo built for **IronBlocks / MoneyNet**, simulating how an AI-powered reasoning engine transforms the daily workflow of a compliance analyst or Chief Compliance Officer (CCO).

---

## What This Demo Shows

Modern compliance programmes are drowning in alert volume, manual research, and fragmented tooling. This demo shows a different model: a **reasoning engine** that ingests signals from multiple KYC/AML providers, resolves conflicts automatically, surfaces patterns humans can't see, and keeps an immutable audit trail — all without storing raw PII.

The demo walks through **18 pages** covering every major compliance use case, from real-time transaction screening to SAR generation to examiner-ready audit packages.

---

## Feature Overview

### Live Compliance Pages

| Page | What It Demonstrates |
|---|---|
| **Home Dashboard** | AI-ranked morning brief — top 3 cases pre-sorted by urgency, regulatory countdown timers |
| **Provider Conflict** | Resolving contradictions between Sumsub, Elliptic, ComplyAdvantage, and Bridger XG |
| **Transaction Screening** | Real-time structuring detection — €47k across 9 sub-threshold transactions in 4 hours |
| **Periodic Re-screen** | Director change triggers re-screen — CA weak hit with temporal alignment issue |
| **Pattern Detection** | Pre-SAR cluster match — 4 dismissed alerts over 11 months match a Q3 trajectory |
| **SAR Generation** | Pre-drafted SAR narrative ready for CCO sign-off and FinCEN filing |
| **RFI Drafting** | Auto-drafted information request with SLA countdown |
| **What's Burning 🔥** | SLA breach tracker — overdue RFIs, stale cases, OFAC deadlines aging without action |
| **KYC Remediation** | 142 overdue reviews, risk-ranked (not calendar-ranked) — 8 critical vs. 134 unchanged |
| **Reg Change Tracker** | EU AI Act, MiCA Travel Rule, AMLA, UK Fraud — deadline countdowns with gap analysis |
| **Alert Fatigue** | 87% automation rate — 1,081 auto-triaged; 19 true escalations surfaced |
| **Audit Readiness** | 94.2% programme effectiveness — examiner Q&A with instant, documented answers |
| **Client Registry** | All 8 monitored entities with risk badges, provider signals, open items, and case links |
| **Entity Graph** | SVG relationship map — entities, individuals, crypto wallets, ownership edges |
| **Signal Stream** | Live feed sorted by urgency — heat bars, tag badges, status filters |
| **Escalation Queue** | 3 CCO-level items with full reasoning context pre-attached |
| **Institutional Memory** | 4,821 past decisions + 47 active patterns powering the reasoning engine |
| **Audit Log** | Immutable, timestamped session trail — every navigation, query, and action |

---

### CCO Demo Tour

Click **▶ CCO Demo** in the top bar to start an 8-step guided walkthrough of the exact journey a Chief Compliance Officer takes through a high-pressure morning:

1. Morning brief — priority queue
2. SLA breach — OFAC blocking report overdue
3. Hard sanctions match — Meridian Capital
4. AI root cause analysis — why providers disagree
5. Real-time structuring detection
6. Pre-SAR pattern — 58-day early warning
7. CCO escalation queue
8. Programme effectiveness — examiner readiness

The tour uses an **animated cursor** that physically moves to each UI element, a **spotlight overlay** that dims everything else, and a **floating tooltip** with narration, what to look at, and the CCO action for each step.

---

### Context-Aware AI Panel

The right-side AI Chat tab knows what page you're on. On every page:

- **"Analyse this screen"** button triggers a full structured analysis:
  - 🚨 Immediate Actions — numbered, time-sensitive steps
  - ⚡ Best Practices — regulatory and procedural guidance (OFAC, FinCEN, SM&CR, MiCA, EU AI Act)
  - 👁 Watch For — early warning signals to monitor

- **Quick navigation links** take you directly to related pages
- **Contextual suggestion chips** update to the most relevant questions for the current page
- **Navigation nudges** — when you move to a new page, the assistant automatically summarises what you're looking at

---

### Other Features

- **Command Palette** (`⌘K`) — fuzzy search across all 18 pages
- **Dark mode** toggle
- **Audit log** — every action logged with analyst identity and timestamp
- **Entity history timeline** — click any entity card to open its full case history
- **Urgency-sorted signal stream** — heat bars, tag badges (CRITICAL / HIGH / PATTERN / WATCH / AUTO / INFO)
- **Burning items tracker** — SLA countdown timers, age bars, acknowledge workflow

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | CSS custom properties (design tokens, dark mode via `:root.dark`) |
| State | React Context API (no external state library) |
| Routing | Context-based (no react-router) |
| Entity graph | Pure SVG |
| Fonts | Inter (UI) + JetBrains Mono (code areas) via Google Fonts |
| Deployment | Vercel |

No backend. No database. No external AI API calls. All data is static demo data — the "reasoning engine" outputs are pre-authored to tell a coherent compliance story.

---

## Project Structure

```
frontend/
├── src/
│   ├── context/
│   │   └── AppContext.jsx        # Global state: navigation, dark mode, audit log, tour
│   ├── data/
│   │   └── index.js              # All demo data: entities, feed items, burning items, nav, KB
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.jsx        # Logo, metrics, CCO Demo button, dark mode, analyst chip
│   │   │   └── Sidebar.jsx       # Navigation with live badges
│   │   ├── detail/
│   │   │   ├── DetailPanel.jsx   # Right panel — History / AI Chat / Audit Log tabs
│   │   │   ├── ChatPane.jsx      # Context-aware AI assistant with page analysis
│   │   │   ├── HistoryPane.jsx   # Entity timeline viewer
│   │   │   └── LogPane.jsx       # Live audit log display
│   │   ├── DemoTour.jsx          # Animated CCO walkthrough (cursor + spotlight + tooltip)
│   │   ├── CommandPalette.jsx    # ⌘K fuzzy search
│   │   └── Notification.jsx      # Toast notifications
│   ├── pages/
│   │   ├── Home.jsx              # Morning dashboard
│   │   ├── Clients.jsx           # Entity registry
│   │   ├── Conflict.jsx          # Provider conflict resolution
│   │   ├── Onboarding.jsx        # Zero-touch KYB flow
│   │   ├── Transaction.jsx       # Transaction screening
│   │   ├── Rescreen.jsx          # Periodic re-screen
│   │   ├── Pattern.jsx           # Pattern detection
│   │   ├── SAR.jsx               # SAR generation
│   │   ├── RFI.jsx               # RFI drafting
│   │   ├── Burning.jsx           # SLA breach / aging tracker
│   │   ├── Feed.jsx              # Signal stream
│   │   ├── Memory.jsx            # Institutional memory
│   │   ├── Escalation.jsx        # Escalation queue
│   │   ├── Analytics.jsx         # Provider ROI and automation metrics
│   │   ├── AlertFatigue.jsx      # Alert triage performance
│   │   ├── Remediation.jsx       # KYC remediation backlog
│   │   ├── RegChange.jsx         # Regulatory deadline tracker
│   │   ├── Audit.jsx             # Examiner readiness
│   │   ├── AuditLog.jsx          # Full session audit trail
│   │   └── EntityGraph.jsx       # SVG entity relationship graph
│   ├── App.jsx                   # Page router + layout shell
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Full design system (tokens, dark mode, animations)
```

---

## Running Locally

```bash
git clone https://github.com/danielrojansky/kyb-demo.git
cd kyb-demo/frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Demo Scenarios

### Scenario A — CCO Morning Run (8 min)
1. Click **▶ CCO Demo** — follow the 8-step guided tour
2. On each step: open the **AI Chat** tab → click **"Analyse this screen"** for full recommendations

### Scenario B — Live Compliance Walkthrough (15 min)
1. Start on **Home** — review the priority queue
2. Navigate to **What's Burning** — note the OFAC SLA breach
3. Open **Provider Conflict** — read the reasoning engine output for Meridian Capital
4. Go to **Transaction Screening** — review the Ibrahim Al-Hassan structuring case
5. Open **Pattern Detection** — explain the Nexus Trading pre-SAR trajectory
6. Navigate to **Audit Readiness** — generate the audit package
7. Open the **AI Chat** tab on any page — click "Analyse this screen" for page-specific guidance

### Scenario C — Entity Deep Dive (5 min)
1. Open **Client Registry** — review the full entity list with risk badges
2. Click "View History" on TechNova FZE — see the full case timeline
3. Click "View case →" to go to the conflict page
4. Open **Entity Graph** — see the relationship map, click nodes

---

## Key Data Points Used in the Demo

| Entity | Risk | Scenario |
|---|---|---|
| Meridian Capital | CRITICAL | OFAC SDN match — LP Viktor Sorokin designated 15 Mar 2026 |
| TechNova FZE | HIGH | Provider conflict — Elliptic 8.4/10 vs. CA clean (stale screen) |
| Ibrahim Al-Hassan | HIGH | Structuring — €47k across 9 sub-threshold transactions |
| Nexus Trading Ltd | HIGH | Pre-SAR pattern — stage 3/5, ~58 days to trigger |
| GreenPath Energy | MEDIUM | Re-screen — CA weak hit on new director Li Wei |
| Opal Ventures FZE | HIGH | KYC overdue 127 days — no analyst assigned |

---

## Built By

Demo built for **IronBlocks** to illustrate the Venn compliance reasoning engine for **MoneyNet Financial Services**.
