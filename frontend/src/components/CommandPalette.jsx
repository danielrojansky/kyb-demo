import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { cmdEntries } from '../data/index'

export default function CommandPalette() {
  const { cmdOpen, setCmdOpen, navigate } = useApp()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)

  const filtered = query.trim()
    ? cmdEntries.filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.sub.toLowerCase().includes(query.toLowerCase())
      )
    : cmdEntries

  useEffect(() => {
    if (cmdOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [cmdOpen])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(true) }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setCmdOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && filtered[selected]) { pick(filtered[selected]) }
  }

  const pick = (entry) => {
    navigate(entry.page)
    setCmdOpen(false)
  }

  if (!cmdOpen) return null

  return (
    <div className="cmd-backdrop" onClick={() => setCmdOpen(false)}>
      <div className="cmd-palette" onClick={e => e.stopPropagation()}>
        <div className="cmd-input-row">
          <span className="cmd-icon">🔍</span>
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Search pages, cases, entities…"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0) }}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 16 }}
            >×</button>
          )}
        </div>
        <div className="cmd-results">
          {!query && <div className="cmd-section-label">All Pages</div>}
          {filtered.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text3)', fontSize: 12 }}>
              No results for "{query}"
            </div>
          )}
          {filtered.map((entry, i) => (
            <div
              key={entry.page}
              className={`cmd-result${i === selected ? ' selected' : ''}`}
              onClick={() => pick(entry)}
              onMouseEnter={() => setSelected(i)}
            >
              <span className="cmd-result-icon">{entry.icon}</span>
              <div>
                <div className="cmd-result-title">{entry.title}</div>
                <div className="cmd-result-sub">{entry.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="cmd-footer">
          <span><span className="cmd-key">↑↓</span> navigate</span>
          <span><span className="cmd-key">↵</span> open</span>
          <span><span className="cmd-key">esc</span> close</span>
        </div>
      </div>
    </div>
  )
}
