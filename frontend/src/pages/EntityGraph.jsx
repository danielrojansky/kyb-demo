import { useState } from 'react'
import { useApp } from '../context/AppContext'

const NODES = [
  { id: 'technova',  label: 'TechNova FZE',      x: 50,  y: 30,  color: '#dc2626', risk: 'High',   type: 'Entity' },
  { id: 'meridian',  label: 'Meridian Capital',   x: 80,  y: 55,  color: '#dc2626', risk: 'Critical', type: 'Fund' },
  { id: 'ibrahim',   label: 'Ibrahim Al-Hassan',  x: 20,  y: 60,  color: '#b45309', risk: 'Medium', type: 'Individual' },
  { id: 'greenpath', label: 'GreenPath Energy',   x: 35,  y: 80,  color: '#b45309', risk: 'Review', type: 'Entity' },
  { id: 'nexus',     label: 'Nexus Trading',      x: 65,  y: 80,  color: '#7c3aed', risk: 'Pattern',type: 'Entity' },
  { id: 'faisal',    label: 'Faisal Al-Rashid',   x: 30,  y: 22,  color: '#b45309', risk: 'UBO',    type: 'Individual' },
  { id: 'sorokin',   label: 'Viktor Sorokin',     x: 75,  y: 30,  color: '#dc2626', risk: 'OFAC',   type: 'Individual' },
  { id: 'wallet1',   label: '0x3f5CE96…',         x: 18,  y: 40,  color: '#7c3aed', risk: '8.4',    type: 'Wallet' },
  { id: 'wallet2',   label: '0xA91B…',            x: 8,   y: 72,  color: '#b45309', risk: '4.2',    type: 'Wallet' },
  { id: 'mixer',     label: 'Mixing Service',     x: 5,   y: 50,  color: '#dc2626', risk: 'Sanctioned', type: 'Wallet' },
]

const EDGES = [
  { from: 'faisal',  to: 'technova',  label: 'UBO 26%',       color: '#dc2626' },
  { from: 'sorokin', to: 'meridian',  label: 'LP 8.3%',       color: '#dc2626' },
  { from: 'technova',to: 'wallet1',   label: 'wallet assoc.', color: '#7c3aed' },
  { from: 'wallet1', to: 'mixer',     label: '3 hops',        color: '#dc2626' },
  { from: 'ibrahim', to: 'wallet2',   label: 'destination',   color: '#b45309' },
  { from: 'nexus',   to: 'technova',  label: 'shared addr.',  color: '#94a3b8' },
  { from: 'greenpath',to: 'nexus',    label: 'common director', color: '#94a3b8' },
]

const NODE_RADIUS = 26

function getXY(pct, w, h) {
  return [(pct / 100) * w, (pct / 100) * h]
}

export default function EntityGraph() {
  const { showHistory, navigate } = useApp()
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)

  const W = 760, H = 420

  const nodePositions = NODES.map(n => ({
    ...n,
    cx: (n.x / 100) * W,
    cy: (n.y / 100) * H,
  }))

  const selectedNode = nodePositions.find(n => n.id === selected)

  const handleNodeClick = (node) => {
    setSelected(node.id === selected ? null : node.id)
    if (['technova', 'meridian', 'ibrahim', 'greenpath', 'nexus'].includes(node.id)) {
      const nameMap = {
        technova: 'TechNova FZE', meridian: 'Meridian Capital',
        ibrahim: 'Ibrahim Al-Hassan', greenpath: 'GreenPath Energy', nexus: 'Nexus Trading Ltd',
      }
      showHistory(nameMap[node.id])
    }
  }

  return (
    <div className="fade-in">
      <div className="page-hdr">
        <div className="page-title">Entity Graph</div>
        <div className="page-sub">Relationship visualisation across entities, individuals, and wallets — connections no single provider can surface</div>
      </div>
      <div className="no-pii-bar">
        <div className="live-dot" />
        Graph built from normalised risk signals only — no PII stored or transmitted
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
        {[
          { color: '#dc2626', label: 'High / Critical Risk' },
          { color: '#b45309', label: 'Medium / Review' },
          { color: '#7c3aed', label: 'Pattern / Wallet' },
          { color: '#94a3b8', label: 'Weak link' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text3)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>

      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', overflow: 'hidden', marginBottom: 12,
        boxShadow: 'var(--shadow-sm)',
      }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', height: 'auto', display: 'block', cursor: 'default' }}
        >
          {/* Edges */}
          {EDGES.map((e, i) => {
            const from = nodePositions.find(n => n.id === e.from)
            const to   = nodePositions.find(n => n.id === e.to)
            if (!from || !to) return null
            const midX = (from.cx + to.cx) / 2
            const midY = (from.cy + to.cy) / 2
            return (
              <g key={i}>
                <line
                  x1={from.cx} y1={from.cy}
                  x2={to.cx}   y2={to.cy}
                  stroke={e.color}
                  strokeWidth={1.5}
                  strokeOpacity={.5}
                  strokeDasharray={e.color === '#94a3b8' ? '4 3' : undefined}
                />
                <text x={midX} y={midY - 5} textAnchor="middle" fontSize={8} fill="var(--text3)" fontFamily="var(--font)">
                  {e.label}
                </text>
              </g>
            )
          })}

          {/* Nodes */}
          {nodePositions.map(node => {
            const isHovered  = hovered  === node.id
            const isSelected = selected === node.id
            const r = isHovered || isSelected ? NODE_RADIUS + 4 : NODE_RADIUS
            return (
              <g
                key={node.id}
                transform={`translate(${node.cx}, ${node.cy})`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleNodeClick(node)}
              >
                {isSelected && (
                  <circle r={r + 6} fill="none" stroke={node.color} strokeWidth={2} strokeOpacity={.3} />
                )}
                <circle
                  r={r}
                  fill={node.color}
                  fillOpacity={isSelected ? 1 : .85}
                  stroke="#fff"
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  style={{ transition: 'r .15s, fill-opacity .15s' }}
                />
                <text
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={9} fontWeight={700} fill="#fff" fontFamily="var(--font)"
                >
                  {node.type === 'Wallet' ? '₿' : node.type === 'Individual' ? '👤' : node.type === 'Fund' ? '🏦' : '🏢'}
                </text>
                <text
                  y={r + 12} textAnchor="middle"
                  fontSize={9} fill="var(--text2)" fontWeight={600} fontFamily="var(--font)"
                >
                  {node.label}
                </text>
                <text
                  y={r + 22} textAnchor="middle"
                  fontSize={8} fill="var(--text3)" fontFamily="var(--font)"
                >
                  {node.risk}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {selectedNode && (
        <div className="card fade-in" style={{ borderColor: selectedNode.color, borderWidth: 1.5 }}>
          <div className="card-header">
            <div>
              <div className="card-title">{selectedNode.label}</div>
              <div className="card-sub">{selectedNode.type} · Risk: {selectedNode.risk}</div>
            </div>
            <div className="badge" style={{ background: selectedNode.color + '22', border: `1px solid ${selectedNode.color}55`, color: selectedNode.color }}>
              {selectedNode.risk}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['technova', 'meridian', 'ibrahim', 'greenpath', 'nexus'].includes(selectedNode.id) && (
              <>
                <button className="btn btn-primary btn-sm" onClick={() => {
                  const pageMap = { technova: 'conflict', meridian: 'conflict', ibrahim: 'transaction', greenpath: 'rescreen', nexus: 'pattern' }
                  navigate(pageMap[selectedNode.id])
                }}>Open Case →</button>
              </>
            )}
            {['faisal', 'sorokin'].includes(selectedNode.id) && (
              <button className="btn btn-danger btn-sm">Run Enhanced Screen</button>
            )}
            {['wallet1', 'wallet2', 'mixer'].includes(selectedNode.id) && (
              <button className="btn btn-warn btn-sm">View Elliptic Report</button>
            )}
            <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕ Deselect</button>
          </div>
        </div>
      )}

      <div className="two-col">
        <div className="card fade-in">
          <div className="card-header"><div><div className="card-title">High-Risk Clusters</div></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div className="hl-row">Wallet mixer chain <span className="red">Critical</span></div>
            <div className="hl-row">OFAC SDN → LP → Fund <span className="red">Action Required</span></div>
            <div className="hl-row">UBO addition unscreened <span className="yellow">Review</span></div>
            <div className="hl-row">Structuring + new wallet <span className="yellow">SAR Queued</span></div>
          </div>
        </div>
        <div className="card fade-in">
          <div className="card-header"><div><div className="card-title">Graph Stats</div></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div className="hl-row">Total nodes <span>{NODES.length}</span></div>
            <div className="hl-row">Relationships mapped <span>{EDGES.length}</span></div>
            <div className="hl-row">High-risk paths <span className="red">3</span></div>
            <div className="hl-row">Shared connections <span className="yellow">2</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
