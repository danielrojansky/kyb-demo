import { useApp } from '../../context/AppContext'
import { histories } from '../../data/index'

export default function HistoryPane() {
  const { detailEntity } = useApp()
  const h = detailEntity ? histories[detailEntity] : null

  if (!h) {
    return (
      <>
        <div className="detail-hdr">
          <div className="detail-hdr-title">Entity History</div>
          <div className="detail-hdr-sub">Select an entity to view timeline</div>
        </div>
        <div className="detail-body">
          <div style={{ color: 'var(--text3)', fontSize: 12, padding: '20px 0', textAlign: 'center' }}>
            Click any entity card to view its institutional memory and audit trail.
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="detail-hdr">
        <div className="detail-hdr-title">{detailEntity}</div>
        <div className="detail-hdr-sub">{h.sub}</div>
      </div>
      <div className="detail-body">
        <div className="timeline fade-in">
          {h.items.map((item, i) => (
            <div className="tl-item" key={i}>
              <div className={`tl-dot ${item.cls}`} />
              <div>
                <div className="tl-date">{item.date}</div>
                <div className="tl-event">{item.event}</div>
                <div className="tl-note">{item.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
