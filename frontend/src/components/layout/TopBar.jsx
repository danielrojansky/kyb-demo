import { useApp } from '../../context/AppContext'

export default function TopBar() {
  const { darkMode, toggleDark, setCmdOpen, navigate } = useApp()

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('home')}>
          Venn<span>.</span>Analyzer
        </div>
        <div className="env-badge">Reasoning Engine · Demo</div>
        <div className="metrics">
          <div className="metric">
            <div className="metric-val red">4</div>
            <div className="metric-label">High Risk</div>
          </div>
          <div className="metric">
            <div className="metric-val yellow">9</div>
            <div className="metric-label">Review Queue</div>
          </div>
          <div className="metric">
            <div className="metric-val green">187</div>
            <div className="metric-label">Clear Today</div>
          </div>
          <div className="metric">
            <div className="metric-val blue">2</div>
            <div className="metric-label">SAR Pending</div>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <button
          className="icon-btn"
          title="Search (⌘K)"
          onClick={() => setCmdOpen(true)}
          style={{ fontSize: 13 }}
        >
          🔍
        </button>
        <button
          className="icon-btn"
          title={darkMode ? 'Light mode' : 'Dark mode'}
          onClick={toggleDark}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <div className="analyst-chip">
          <div className="avatar">SL</div>
          Sara Levy · Senior Analyst
        </div>
        <div className="live-dot" title="Live · 5 providers synced" />
      </div>
    </div>
  )
}
