import { useApp } from '../../context/AppContext'
import HistoryPane from './HistoryPane'
import ChatPane from './ChatPane'
import LogPane from './LogPane'

export default function DetailPanel() {
  const { detailTab, setDetailTab, auditLog, detailOpen, setDetailOpen } = useApp()

  return (
    <div className={`detail-panel${detailOpen ? ' mobile-open' : ''}`}>
      {/* Mobile drag handle */}
      <div className="detail-handle" onClick={() => setDetailOpen(false)}>
        <div className="detail-handle-bar" />
      </div>

      <div className="detail-tabs">
        <div
          className={`detail-tab${detailTab === 'history' ? ' active' : ''}`}
          onClick={() => setDetailTab('history')}
        >
          🕐 History
        </div>
        <div
          className={`detail-tab${detailTab === 'chat' ? ' active' : ''}`}
          onClick={() => setDetailTab('chat')}
        >
          💬 AI Chat
        </div>
        <div
          className={`detail-tab${detailTab === 'log' ? ' active' : ''}`}
          onClick={() => setDetailTab('log')}
        >
          🔒 Log{auditLog.length > 0 && (
            <span className="log-badge" style={{ marginLeft: 4 }}>{auditLog.length}</span>
          )}
        </div>
      </div>

      <div className={`detail-pane${detailTab === 'history' ? ' active' : ''}`}>
        <HistoryPane />
      </div>
      <div className={`detail-pane${detailTab === 'chat' ? ' active' : ''}`}>
        <ChatPane />
      </div>
      <div className={`detail-pane${detailTab === 'log' ? ' active' : ''}`}>
        <LogPane />
      </div>
    </div>
  )
}
