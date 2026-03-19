import { useApp } from '../../context/AppContext'
import { navSections } from '../../data/index'

export default function Sidebar() {
  const { currentPage, navigate, auditLog, sidebarOpen, setSidebarOpen } = useApp()

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`sidebar-backdrop${sidebarOpen ? ' show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className={`sidebar${sidebarOpen ? ' mobile-open' : ''}`}>
        {navSections.map((section, si) => (
          <div className="sidebar-section" key={si}>
            {section.label && <div className="sidebar-label">{section.label}</div>}
            {section.items.map(item => {
              const badge = item.id === 'auditlog' && auditLog.length > 0
                ? String(auditLog.length)
                : item.badge

              return (
                <div
                  key={item.id}
                  className={`nav-item${currentPage === item.id ? ' active' : ''}`}
                  onClick={() => navigate(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {badge ? (
                    <span className={`nav-badge${item.badgeColor ? ' ' + item.badgeColor : ''}`}>
                      {badge}
                    </span>
                  ) : null}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}
