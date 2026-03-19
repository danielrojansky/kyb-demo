import { createContext, useContext, useState, useCallback, useRef } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home')
  const [darkMode, setDarkMode] = useState(false)
  const [auditLog, setAuditLog] = useState([])
  const [detailEntity, setDetailEntity] = useState(null)
  const [detailTab, setDetailTab] = useState('history')
  const [notification, setNotification] = useState(null)
  const [cmdOpen, setCmdOpen] = useState(false)
  const logSeqRef = useRef(1)
  const notifTimerRef = useRef(null)

  const logAction = useCallback((action, context = '', type = 'action') => {
    const now = new Date()
    const ts = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    const entry = { id: logSeqRef.current++, ts, action, context, type, analyst: 'Sara Levy' }
    setAuditLog(prev => [entry, ...prev])
  }, [])

  const navigate = useCallback((page) => {
    setCurrentPage(page)
    logAction('Navigated to: ' + page, '', 'navigate')
  }, [logAction])

  const notify = useCallback((msg) => {
    setNotification(msg)
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current)
    notifTimerRef.current = setTimeout(() => setNotification(null), 2800)
  }, [])

  const toggleDark = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }, [])

  const showHistory = useCallback((name) => {
    setDetailEntity(name)
    setDetailTab('history')
    logAction('Reviewed entity: ' + name, '', 'review')
  }, [logAction])

  return (
    <AppContext.Provider value={{
      currentPage, navigate,
      darkMode, toggleDark,
      auditLog, logAction,
      detailEntity, setDetailEntity,
      detailTab, setDetailTab,
      notification,
      notify,
      cmdOpen, setCmdOpen,
      showHistory,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
