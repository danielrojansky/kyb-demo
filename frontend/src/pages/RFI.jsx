import { useApp } from '../context/AppContext'

const dateStr = new Date().toLocaleDateString()
const dtStr   = new Date().toLocaleString()

export default function RFI() {
  const { notify } = useApp()
  const doFlow = (k) => {
    const msgs = {
      rfi_edit:    '✎ RFI opened for editing',
      rfi_approve: '✓ RFI approved — queued for sending within 15 minutes',
      rfi_export:  '⬇ RFI exported to PDF',
    }
    notify(msgs[k] || '✓ Action recorded')
  }

  const rfiText = `Subject: Important — Verification Required for Recent Account Activity

Dear Ibrahim,

We are writing regarding recent activity on your MoneyNet account and need
to verify some information to ensure your account remains fully operational.

We have noted the following transactions on ${dateStr}:
  • 9 transfers to external accounts, each between €4,800–€4,950
  • Total: €42,750 within a 4-hour period
  • Destination: wallet address first registered 6 days ago

To continue processing these transactions, we require the following
information within 48 hours:

1. Purpose of these transfers (please provide a brief description)
2. Relationship with the recipient of the funds
3. Source of funds for this transaction volume (e.g. salary, sale
   of asset, inheritance)
4. Any supporting documentation you can provide (invoice, contract,
   bank statement)

You can respond securely via your MoneyNet account dashboard under
"Compliance Requests", or reply to this message directly.

If we do not receive a response within 48 hours, we may be required to
place a temporary hold on the relevant transactions in line with our
regulatory obligations.

This request is confidential. Please do not discuss it with the
transaction counterparty.

Kind regards,
MoneyNet Compliance Team`

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">RFI Drafting</div>
        <div className="page-sub">Reasoning engine drafts targeted information requests — analyst reviews and sends</div>
      </div>

      <div className="card fade-in">
        <div className="card-header">
          <div>
            <div className="card-title">RFI — Ibrahim Al-Hassan</div>
            <div className="card-sub">Transaction anomaly · Structuring pattern · Auto-drafted in 2 seconds</div>
          </div>
          <div className="badge badge-medium">Draft</div>
        </div>
        <div className="doc-meta">
          <span>Drafted by Reasoning Engine · {dtStr}</span>
          <span>Not sent — awaiting analyst approval</span>
        </div>
        <div className="doc-preview">{rfiText}</div>
        <div className="alert-box alert-info" style={{ marginBottom: 10 }}>
          <div className="alert-icon">💡</div>
          <div>Reasoning engine pre-populated based on transaction pattern. The "confidentiality" notice was auto-added because the structuring pattern suggests possible counterparty coordination. Analyst should review before sending.</div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => doFlow('rfi_edit')}>✎ Edit Draft</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('rfi_approve')}>✓ Approve & Queue</button>
          <button className="btn btn-ghost"   onClick={() => doFlow('rfi_export')}>⬇ Export</button>
        </div>
      </div>
    </div>
  )
}
