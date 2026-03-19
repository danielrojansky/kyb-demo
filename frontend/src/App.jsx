import { useApp } from './context/AppContext'
import TopBar from './components/layout/TopBar'
import Sidebar from './components/layout/Sidebar'
import DetailPanel from './components/detail/DetailPanel'
import CommandPalette from './components/CommandPalette'
import Notification from './components/Notification'

import Home         from './pages/Home'
import Conflict     from './pages/Conflict'
import Onboarding   from './pages/Onboarding'
import Transaction  from './pages/Transaction'
import Rescreen     from './pages/Rescreen'
import Pattern      from './pages/Pattern'
import SAR          from './pages/SAR'
import RFI          from './pages/RFI'
import Feed         from './pages/Feed'
import Memory       from './pages/Memory'
import Escalation   from './pages/Escalation'
import Analytics    from './pages/Analytics'
import AlertFatigue from './pages/AlertFatigue'
import Remediation  from './pages/Remediation'
import RegChange    from './pages/RegChange'
import Audit        from './pages/Audit'
import AuditLog     from './pages/AuditLog'
import EntityGraph  from './pages/EntityGraph'
import Burning      from './pages/Burning'

const PAGES = {
  home:        Home,
  conflict:    Conflict,
  onboarding:  Onboarding,
  transaction: Transaction,
  rescreen:    Rescreen,
  pattern:     Pattern,
  sar:         SAR,
  rfi:         RFI,
  feed:        Feed,
  memory:      Memory,
  escalation:  Escalation,
  analytics:   Analytics,
  fatigue:     AlertFatigue,
  remediation: Remediation,
  regchange:   RegChange,
  audit:       Audit,
  auditlog:    AuditLog,
  entitygraph: EntityGraph,
  burning:     Burning,
}

function PageContent() {
  const { currentPage } = useApp()
  const Page = PAGES[currentPage] || Home
  return (
    <div className="main-content" key={currentPage}>
      <Page />
    </div>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <TopBar />
      <div className="app-body">
        <Sidebar />
        <div className="main-area">
          <PageContent />
          <DetailPanel />
        </div>
      </div>
      <CommandPalette />
      <Notification />
    </div>
  )
}
