import { useApp } from '../context/AppContext'

const now = new Date()
const dateStr = now.toLocaleDateString()
const dtStr   = now.toLocaleString()
const prev21  = new Date(Date.now() - 21 * 86400000).toLocaleDateString()

export default function SAR() {
  const { notify } = useApp()
  const doFlow = (k) => {
    const msgs = {
      sar_review: '✎ SAR opened for editing in document viewer',
      sar_export: '⬇ SAR exported to Word — saved to case file',
      sar_file:   '⚠ SAR submission requires final analyst sign-off — confirm in settings',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  const sarText = `SUSPICIOUS ACTIVITY REPORT — DRAFT
Reference: VNN-2026-0341
Institution: MoneyNet Ltd
Reporting Analyst: Sara Levy (Senior AML Analyst)
Date of Report: ${dateStr}

1. SUBJECT INFORMATION
   Entity: TechNova FZE (UAE Trade License: CN-1847392)
   Type: Business — Technology Holding Company
   Jurisdiction: UAE (Free Zone)
   Associated Individual: Faisal Al-Rashid (UBO, 26% beneficial interest)
   Added to Entity: ${prev21} (21 days ago)

2. NATURE OF SUSPICIOUS ACTIVITY
   On ${dateStr}, automated screening identified a UBO structure change
   (addition of Faisal Al-Rashid) combined with a high-risk blockchain
   wallet association (Elliptic risk score: 8.4/10). The wallet shows
   indirect exposure to a mixing service linked to 2 previously flagged
   transactions totalling €890,000 in 2025.

   The compliance monitoring system (ComplyAdvantage) did not flag this
   combination because the last AML screen predated the UBO addition by
   11 days. The conflict was identified by the reasoning engine cross-
   referencing screening timestamps against KYB change events.

3. BASIS FOR SUSPICION
   - UBO added without triggering mandatory re-screen
   - Associated wallet: indirect mixer service exposure
   - Elliptic risk score 8.4/10 (threshold for escalation: 7.0)
   - Prior adverse media hit (dismissed 6 months ago) now contextually
     relevant in light of new UBO structure

4. ACTIONS TAKEN
   - Transaction hold placed: ${dateStr}
   - ComplyAdvantage re-screen triggered: [PENDING]
   - Case escalated to Senior AML Analyst
   - Customer relationship flagged for enhanced due diligence

5. ANALYST NOTES
   [Add notes here before filing]`

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">SAR Generation</div>
        <div className="page-sub">Reasoning engine assembles a regulator-ready SAR narrative from accumulated signals</div>
      </div>

      <div className="card fade-in">
        <div className="card-header">
          <div>
            <div className="card-title">SAR Draft — TechNova FZE / Faisal Al-Rashid</div>
            <div className="card-sub">Auto-assembled from provider signals + institutional memory · Analyst review required before filing</div>
          </div>
          <div className="badge badge-high">Draft</div>
        </div>
        <div className="doc-meta">
          <span>Generated: {dtStr} · Case ID: VNN-2026-0341 · Analyst: Sara Levy</span>
          <span>Status: DRAFT — Not Filed</span>
        </div>
        <div className="doc-preview">{sarText}</div>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => doFlow('sar_review')}>✎ Open for Editing</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('sar_export')}>⬇ Export to Word</button>
          <button className="btn btn-danger"  onClick={() => doFlow('sar_file')}>📤 Submit to FIU</button>
        </div>
      </div>
    </div>
  )
}
