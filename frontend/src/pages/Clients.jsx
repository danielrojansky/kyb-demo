import { useApp } from '../context/AppContext'

// Full entity registry — all merchants/entities known to the system
const ENTITIES = [
  {
    id:          'meridian',
    name:        'Meridian Capital',
    type:        'Investment Fund',
    jurisdiction:'Cayman Islands',
    regId:       'CI-88241',
    status:      'frozen',
    risk:        'critical',
    riskLabel:   'CRITICAL',
    aum:         '$180M',
    uboCount:    12,
    lastScreen:  'Today',
    page:        'conflict',
    historyKey:  'Meridian Capital',
    signals: [
      { prov: 'Bridger XG',       val: '🔴', label: 'SDN Match', color: 'var(--red)' },
      { prov: 'ComplyAdvantage',  val: '✓',  label: 'Clean',     color: 'var(--green)' },
      { prov: 'Sumsub',           val: '✓',  label: 'Verified',  color: 'var(--green)' },
    ],
    openItems: ['OFAC blocking report OVERDUE (3 days)', 'Legal sign-off pending', 'LP distributions frozen'],
    tags: ['OFAC', 'SDN', 'Sanctions', 'Freeze'],
  },
  {
    id:          'technova',
    name:        'TechNova FZE',
    type:        'Tech Holding Company',
    jurisdiction:'UAE (DMCC)',
    regId:       'DMCC-252847',
    status:      'hold',
    risk:        'high',
    riskLabel:   'HIGH',
    uboCount:    3,
    lastScreen:  '11 days ago',
    page:        'conflict',
    historyKey:  'TechNova FZE',
    signals: [
      { prov: 'Sumsub',          val: '⚠',   label: 'UBO Flag',    color: 'var(--yellow)' },
      { prov: 'Elliptic',        val: '8.4',  label: 'Wallet Risk', color: 'var(--red)' },
      { prov: 'ComplyAdvantage', val: '✓',    label: 'Stale 11d',   color: 'var(--yellow)' },
    ],
    openItems: ['CA re-screen pending', 'UBO Faisal Al-Rashid unverified', 'Transaction hold active'],
    tags: ['UBO', 'Crypto', 'Conflict', 'Hold'],
  },
  {
    id:          'nexus',
    name:        'Nexus Trading Ltd',
    type:        'Trading Company',
    jurisdiction:'Malta',
    regId:       'MT-334421',
    status:      'escalated',
    risk:        'high',
    riskLabel:   'HIGH',
    uboCount:    2,
    lastScreen:  'Today',
    page:        'pattern',
    historyKey:  'Nexus Trading Ltd',
    signals: [
      { prov: 'ComplyAdvantage', val: '⚠',  label: '4× hits',       color: 'var(--yellow)' },
      { prov: 'Pattern Engine',  val: '🔴', label: 'Pre-SAR Stage 3', color: 'var(--red)' },
      { prov: 'Sumsub',          val: '✓',  label: 'Verified',        color: 'var(--green)' },
    ],
    openItems: ['Pre-SAR cluster — stage 3/5', 'Escalation unacknowledged 26h', '58 days to potential SAR'],
    tags: ['Pattern', 'Pre-SAR', 'Escalated'],
  },
  {
    id:          'ibrahim',
    name:        'Ibrahim Al-Hassan',
    type:        'Individual (Retail)',
    jurisdiction:'Egypt / MoneyNet',
    regId:       'MNT-284719',
    status:      'hold',
    risk:        'high',
    riskLabel:   'HIGH',
    uboCount:    null,
    lastScreen:  'Today',
    page:        'transaction',
    historyKey:  'Ibrahim Al-Hassan',
    signals: [
      { prov: 'Txn Engine',      val: '🔴', label: '11× spike',     color: 'var(--red)' },
      { prov: 'Elliptic',        val: '⚠',  label: 'New wallet',    color: 'var(--yellow)' },
      { prov: 'ComplyAdvantage', val: '✓',  label: 'Clean',         color: 'var(--green)' },
    ],
    openItems: ['Structuring pattern confirmed', 'RFI not yet sent (47m left)', 'SAR pre-drafted'],
    tags: ['Structuring', 'SAR', 'RFI Overdue'],
  },
  {
    id:          'greenpath',
    name:        'GreenPath Energy',
    type:        'Renewable Energy Company',
    jurisdiction:'United Kingdom',
    regId:       'CH-09384721',
    status:      'review',
    risk:        'medium',
    riskLabel:   'MEDIUM',
    uboCount:    2,
    lastScreen:  'Today',
    page:        'rescreen',
    historyKey:  'GreenPath Energy',
    signals: [
      { prov: 'ComplyAdvantage', val: '⚠',  label: 'Weak hit 0.38', color: 'var(--yellow)' },
      { prov: 'Sumsub',          val: '✓',  label: 'Verified',       color: 'var(--green)' },
      { prov: 'Elliptic',        val: 'N/A', label: 'Non-crypto',    color: 'var(--text4)' },
    ],
    openItems: ['Li Wei director screen incomplete', 'Adverse media temporal alignment issue'],
    tags: ['Director Change', 'Review', 'Re-screen'],
  },
  {
    id:          'opal',
    name:        'Opal Ventures FZE',
    type:        'Holding Company',
    jurisdiction:'UAE (DIFC)',
    regId:       'DIFC-44829',
    status:      'overdue',
    risk:        'high',
    riskLabel:   'HIGH',
    uboCount:    4,
    lastScreen:  '127 days ago',
    page:        'remediation',
    historyKey:  null,
    signals: [
      { prov: 'KYC Status',  val: '🔴', label: 'Overdue 127d',  color: 'var(--red)' },
      { prov: 'Elliptic',    val: '⚠',  label: 'New flag',       color: 'var(--yellow)' },
      { prov: 'Sumsub',      val: '⚠',  label: 'UBO change',     color: 'var(--yellow)' },
    ],
    openItems: ['KYC overdue 127 days', 'UBO structure changed', 'No analyst assigned'],
    tags: ['KYC Overdue', 'Remediation', 'No Owner'],
  },
  {
    id:          'baltic',
    name:        'Baltic Freight Corp',
    type:        'Logistics / Freight',
    jurisdiction:'Lithuania',
    regId:       'LT-330192',
    status:      'rfi-overdue',
    risk:        'medium',
    riskLabel:   'MEDIUM',
    uboCount:    2,
    lastScreen:  '6 days ago',
    page:        'remediation',
    historyKey:  null,
    signals: [
      { prov: 'RFI Status',      val: '🔴', label: 'No response 4d', color: 'var(--red)' },
      { prov: 'ComplyAdvantage', val: '⚠',  label: 'Adverse media',  color: 'var(--yellow)' },
      { prov: 'Sumsub',          val: '✓',  label: 'Verified',        color: 'var(--green)' },
    ],
    openItems: ['RFI response overdue 4 days', 'Account still active', 'No follow-up sent'],
    tags: ['RFI Overdue', 'Watchlist'],
  },
  {
    id:          'gulfstream',
    name:        'GulfStream Logistics',
    type:        'Logistics / Freight',
    jurisdiction:'UAE',
    regId:       'UAE-GL-8821',
    status:      'clear',
    risk:        'clear',
    riskLabel:   'CLEAR',
    uboCount:    2,
    lastScreen:  '4h ago',
    page:        'feed',
    historyKey:  null,
    signals: [
      { prov: 'Sumsub',          val: '✓', label: 'Verified',  color: 'var(--green)' },
      { prov: 'ComplyAdvantage', val: '✓', label: 'Clean',     color: 'var(--green)' },
      { prov: 'Elliptic',        val: '✓', label: 'Clean',     color: 'var(--green)' },
    ],
    openItems: [],
    tags: ['Auto-cleared', 'Enrolled'],
  },
]

const RISK_STYLE = {
  critical: { color: 'var(--red)',    bg: 'var(--red-bg)',    border: 'var(--red-border)' },
  high:     { color: 'var(--red)',    bg: 'var(--red-bg)',    border: 'var(--red-border)' },
  medium:   { color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  clear:    { color: 'var(--green)',  bg: 'var(--green-bg)',  border: 'var(--green-border)' },
}

const STATUS_LABEL = {
  frozen:      '🔒 Frozen',
  hold:        '⏸ On Hold',
  escalated:   '⚑ Escalated',
  review:      '👁 In Review',
  overdue:     '⏰ Overdue',
  'rfi-overdue':'📭 RFI Overdue',
  clear:       '✓ Clear',
}

export default function Clients() {
  const { navigate, showHistory } = useApp()

  const critical = ENTITIES.filter(e => e.risk === 'critical' || e.risk === 'high')
  const medium   = ENTITIES.filter(e => e.risk === 'medium')
  const clear    = ENTITIES.filter(e => e.risk === 'clear')

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Client Registry</div>
        <div className="page-sub">All monitored entities — risk status, open items, and case navigation</div>
      </div>
      <div className="no-pii-bar"><div className="live-dot" />Risk signals only — entity profiles contain no raw PII</div>

      <div className="stat-row" style={{ marginBottom: 14 }}>
        <div className="stat-cell" style={{ borderColor: 'var(--red-border)', background: 'var(--red-bg)' }}>
          <div className="stat-val red" style={{ fontSize: 20 }}>{critical.length}</div>
          <div className="stat-label" style={{ color: 'var(--red)' }}>🔴 Critical / High Risk</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val yellow" style={{ fontSize: 20 }}>{medium.length}</div>
          <div className="stat-label">🟡 Medium / Review</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val green" style={{ fontSize: 20 }}>{clear.length}</div>
          <div className="stat-label">🟢 Clear / Enrolled</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val" style={{ fontSize: 20 }}>{ENTITIES.length}</div>
          <div className="stat-label">Total entities</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ENTITIES.map(entity => {
          const rs = RISK_STYLE[entity.risk] || RISK_STYLE.clear
          return (
            <div
              key={entity.id}
              className="card"
              style={{ padding: '14px 16px', borderLeft: `3px solid ${rs.color}` }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>

                {/* Left: identity */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{entity.name}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: '1px 7px', borderRadius: 'var(--r-full)',
                      background: rs.bg, border: `1px solid ${rs.border}`, color: rs.color,
                    }}>{entity.riskLabel}</span>
                    <span style={{
                      fontSize: 9.5, fontWeight: 600, color: 'var(--text4)',
                      background: 'var(--bg3)', padding: '1px 7px', borderRadius: 'var(--r-full)',
                    }}>{STATUS_LABEL[entity.status] || entity.status}</span>
                  </div>

                  <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>
                    {entity.type} · {entity.jurisdiction} · {entity.regId}
                    {entity.uboCount && ` · ${entity.uboCount} UBO${entity.uboCount > 1 ? 's' : ''}`}
                    {entity.aum && ` · ${entity.aum} AUM`}
                    {' · Last screen: '}<strong style={{ color: 'var(--text2)' }}>{entity.lastScreen}</strong>
                  </div>

                  {/* Provider signals */}
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                    {entity.signals.map(s => (
                      <div key={s.prov} style={{
                        display: 'flex', gap: 4, alignItems: 'center',
                        background: 'var(--bg2)', border: '1px solid var(--border)',
                        borderRadius: 'var(--r)', padding: '3px 8px',
                      }}>
                        <span style={{ fontSize: 9, color: 'var(--text4)', fontWeight: 600 }}>{s.prov}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: s.color }}>{s.val}</span>
                        <span style={{ fontSize: 9, color: 'var(--text4)' }}>{s.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Open items */}
                  {entity.openItems.length > 0 && (
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {entity.openItems.map(item => (
                        <span key={item} style={{
                          fontSize: 9.5, padding: '2px 7px', borderRadius: 'var(--r-full)',
                          background: 'var(--bg3)', color: 'var(--text3)', border: '1px solid var(--border)',
                        }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <button
                    className="btn-primary"
                    onClick={() => navigate(entity.page)}
                    style={{ fontSize: 11, padding: '5px 14px', whiteSpace: 'nowrap' }}
                  >
                    View case →
                  </button>
                  {entity.historyKey && (
                    <button
                      onClick={() => showHistory(entity.historyKey)}
                      style={{
                        fontSize: 10, padding: '4px 10px',
                        border: '1px solid var(--border)', borderRadius: 'var(--r)',
                        background: 'var(--bg)', color: 'var(--text3)',
                        cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: 600,
                        transition: 'all var(--transition)',
                      }}
                    >
                      📋 History
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
