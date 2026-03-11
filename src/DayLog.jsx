import { useState, useEffect, useRef } from 'react'
import './DayLog.css'

// ── Icons ────────────────────────────────────────────────
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
  </svg>
)

const GlobeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)

const MediaIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
  </svg>
)

const GifIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM9 8H7v8h2v-3h3v-2H9V8zm5 0h-2v8h2V8zm4 0h-4v2h4V8z" />
  </svg>
)

const PollIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm1 3h-2v7h2V7zm4 3h-2v4h2v-4zm-8 2H7v2h2v-2z" />
  </svg>
)

const EmojiIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5c-1.381 0-2.5-1.119-2.5-2.5S10.619 6.5 12 6.5s2.5 1.119 2.5 2.5S13.381 11.5 12 11.5z" />
  </svg>
)

// ── Data ─────────────────────────────────────────────────
const ACTIVITY_OPTIONS = [
  { badge: 'A', label: 'Deep work / focused task' },
  { badge: 'B', label: 'Meetings or calls' },
  { badge: 'C', label: 'Admin / emails / errands' },
  { badge: 'D', label: 'Taking a break or relaxing' },
  { badge: 'E', label: 'Scrolling / distracted' },
]

const MOOD_OPTIONS = [
  { badge: '1', label: '⚡ Energized and focused' },
  { badge: '2', label: '😐 Okay, getting through it' },
  { badge: '3', label: '😴 Tired or low energy' },
  { badge: '4', label: '😤 Stressed or overwhelmed' },
  { badge: '5', label: '😊 Happy and relaxed' },
]

const ENERGY_OPTIONS = [
  { badge: '↑', label: '🔋 High — firing on all cylinders' },
  { badge: '→', label: '⚡ Medium — steady but not peak' },
  { badge: '↓', label: '🪫 Low — running on fumes' },
]

const MAX_CHARS = 280
const CIRCUMFERENCE = 2 * Math.PI * 9

// ── OptionGroup ───────────────────────────────────────────
function OptionGroup({ id, options, selected, onSelect }) {
  return (
    <div className="options" id={id}>
      {options.map(({ badge, label }) => (
        <button
          key={label}
          className={`option${selected === label ? ' selected' : ''}`}
          onClick={() => onSelect(label)}
        >
          <span className="badge">{badge}</span>
          <span className="option-text">{label}</span>
        </button>
      ))}
    </div>
  )
}

// ── CharRing ──────────────────────────────────────────────
function CharRing({ value }) {
  const len = value.length
  const remaining = MAX_CHARS - len
  const pct = len / MAX_CHARS
  const offset = CIRCUMFERENCE * (1 - pct)
  const stroke = remaining < 20 ? 'var(--red)' : remaining < 60 ? 'var(--yellow)' : 'var(--blue)'
  const showText = remaining <= 30

  return (
    <div className="char-ring">
      <svg width="22" height="22" viewBox="0 0 22 22" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="11" cy="11" r="9" fill="none" stroke="var(--border)" strokeWidth="2" />
        <circle
          cx="11" cy="11" r="9" fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <div className="char-count-text" style={{ color: remaining < 20 ? 'var(--red)' : 'var(--yellow)' }}>
          {remaining}
        </div>
      )}
    </div>
  )
}

// ── localStorage helpers ──────────────────────────────────
const STORAGE_KEY = 'daylog_entries'

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const entries = JSON.parse(raw)
    // Auto-clear if entries are from a previous day
    if (entries.length > 0) {
      const entryDate = new Date(entries[0].timestamp).toDateString()
      if (entryDate !== new Date().toDateString()) {
        localStorage.removeItem(STORAGE_KEY)
        return []
      }
    }
    return entries
  } catch {
    return []
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

// ── Main Component ────────────────────────────────────────
export default function DayLog() {
  const [activity, setActivity] = useState('')
  const [mood, setMood] = useState('')
  const [energy, setEnergy] = useState('')
  const [note, setNote] = useState('')
  const [time, setTime] = useState('')
  const [logged, setLogged] = useState(false)
  const [entries, setEntries] = useState(() => loadEntries())
  const textareaRef = useRef(null)

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleString('en-IN', { weekday: 'long', hour: '2-digit', minute: '2-digit' })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }, [note])

  function handleSend() {
    if (!activity && !mood && !energy) {
      alert('Pick at least one option before posting!')
      return
    }
    const entry = {
      timestamp: new Date().toISOString(),
      activity,
      mood,
      energy,
      note,
    }
    const updated = [...entries, entry]
    saveEntries(updated)
    setEntries(updated)
    setLogged(true)
    setTimeout(() => {
      setLogged(false)
      handleReset()
    }, 1500)
  }

  function handleSendSummary() {
    const dateLabel = new Date().toLocaleString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'short', year: 'numeric',
    })
    const entryBlocks = entries.map((e, i) => {
      const t = new Date(e.timestamp).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' })
      return [
        `═══════════════════════════`,
        `ENTRY ${i + 1} — ${t}`,
        `🗂  Activity : ${e.activity || '—'}`,
        `😶  Mood     : ${e.mood || '—'}`,
        `🔋  Energy   : ${e.energy || '—'}`,
        e.note ? `📝  Note     : ${e.note}` : null,
      ].filter(Boolean).join('\n')
    })

    const body = [
      `[daylog] ${dateLabel} — Daily Summary`,
      '',
      ...entryBlocks,
      '═══════════════════════════',
      '',
      `Total entries: ${entries.length}`,
      'Logged via Day Log',
    ].join('\n')

    const subject = encodeURIComponent(
      `[daylog] ${new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} — Daily Summary`
    )
    window.location.href = `mailto:parthpandhe8@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`
    localStorage.removeItem(STORAGE_KEY)
    setEntries([])
  }

  function handleReset() {
    setActivity('')
    setMood('')
    setEnergy('')
    setNote('')
  }

  return (
    <div className="daylog-root">
      <header className="header">
        <div className="header-left">
          <button className="icon-btn" onClick={handleReset} title="Clear">
            <BackIcon />
          </button>
          <h1>New post</h1>
        </div>
        <div className="header-right">
          {entries.length > 0 && (
            <span className="entry-count">{entries.length} logged</span>
          )}
          <button className="post-btn" onClick={handleSend} disabled={logged}>
            {logged ? 'Logged ✓' : 'Post'}
          </button>
        </div>
      </header>

      <div className="time-strip">{time}</div>

      <div className="compose">
        <div className="avatar">P</div>
        <div className="compose-right">
          <div className="audience-pill">
            <GlobeIcon /> Everyone
          </div>
          <textarea
            ref={textareaRef}
            className="note-box"
            placeholder="What's happening?"
            value={note}
            onChange={e => setNote(e.target.value.slice(0, MAX_CHARS))}
            rows={3}
          />
          <div className="compose-footer">
            <CharRing value={note} />
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="section">
        <div className="section-header">
          <span className="section-icon">🗂</span>
          <span className="section-label">What are you doing?</span>
        </div>
        <OptionGroup id="activity" options={ACTIVITY_OPTIONS} selected={activity} onSelect={setActivity} />
      </div>

      <div className="divider" />

      <div className="section">
        <div className="section-header">
          <span className="section-icon">😶</span>
          <span className="section-label">How are you feeling?</span>
        </div>
        <OptionGroup id="mood" options={MOOD_OPTIONS} selected={mood} onSelect={setMood} />
      </div>

      <div className="divider" />

      <div className="section">
        <div className="section-header">
          <span className="section-icon">🔋</span>
          <span className="section-label">Energy level</span>
        </div>
        <OptionGroup id="energy" options={ENERGY_OPTIONS} selected={energy} onSelect={setEnergy} />
      </div>

      <div className="toolbar">
        <button className="tool-btn" title="Media"><MediaIcon /></button>
        <button className="tool-btn" title="GIF"><GifIcon /></button>
        <button className="tool-btn" title="Poll"><PollIcon /></button>
        <button className="tool-btn" title="Emoji"><EmojiIcon /></button>
        <button className="tool-btn" title="Location"><LocationIcon /></button>
      </div>

      <div className="footer">
        {entries.length > 0 && (
          <button className="summary-btn" onClick={handleSendSummary}>
            📧 Send Daily Summary ({entries.length} {entries.length === 1 ? 'entry' : 'entries'})
          </button>
        )}
        <button className="reset-btn" onClick={handleReset}>↺ Clear all</button>
      </div>
    </div>
  )
}
