import { useState, useEffect, useRef, useCallback } from 'react'
import './DayLog.css'

// ── Icons ────────────────────────────────────────────────
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
  </svg>
)
const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
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
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
  </svg>
)
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
  </svg>
)

// ── Emoji data ────────────────────────────────────────────
const EMOJI_CATS = [
  { name: '😀', emojis: ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','😊','😇','🥰','😍','🤩','😘','😋','😜','🤪','😎','🤔','😐','🙄','😒','😔','😪','😴','😷','🤒','🥴','😵','🤯','😱','😨','😰','😢','😭','😤','😠','🤬','💀','👻','🤖','💩','😈','👿'] },
  { name: '👋', emojis: ['👋','✋','🖐','👌','✌️','🤞','🤟','🤘','👍','👎','✊','👊','👏','🙌','🤲','🙏','💪','🫶','❤️','🧡','💛','💚','💙','💜','🖤','💕','💯','💥','🔥','✨','⭐','💫','⚡','🎉','🎊'] },
  { name: '🐶', emojis: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🦆','🦅','🦉','🦋','🐝','🐛','🐌','🐞','🐜','🦟','🦗','🐢','🐍','🦎','🦕','🦖','🐳','🐬','🦈','🐙','🦑','🌸','🌺','🌻','🌹','🌷','🍀','🌿','🌱','🌲','🌴','🍁','🍃','🌾','🌵'] },
  { name: '🍕', emojis: ['🍕','🍔','🍟','🌮','🌯','🍣','🍜','🍝','🍛','🍱','🍙','🍚','🍰','🎂','🧁','🍩','🍪','🍫','🍬','🍭','🍦','🧋','☕','🍵','🥤','🍺','🥂','🍷','🍸','🍹','🧃','🍾','🥃'] },
  { name: '⚽', emojis: ['⚽','🏀','🏈','⚾','🎾','🏐','🏉','🎱','🏓','🏸','⛳','🎣','🥊','🏋️','🤸','🏊','🚴','🏆','🥇','🎮','🎲','🎯','🎨','🎵','🎶','🎹','🥁','🎸','🎺','🎷','🎤','🎧','🎬','🎭','🎪'] },
  { name: '✈️', emojis: ['🚗','🚕','🚙','🏎️','🚨','✈️','🚀','🛸','🚁','⛵','🚢','🗺️','🏔️','🌋','🏝️','🏖️','🏕️','🌃','🌆','🌇','🌉','🌁','🏠','🏡','🏢','🏦','⛪','🕌','🌍','🌎','🌏','🌐'] },
  { name: '📱', emojis: ['📱','💻','⌨️','🖥️','📷','📹','🎥','📞','☎️','📺','📻','⏰','💡','🔦','🔑','🔒','🔨','🔧','⚙️','💊','💉','🩺','🔭','🔬','📚','📖','✏️','📝','📌','📍','🗓️','📅','💰','💳','🪙','💸'] },
]

// ── Options data ──────────────────────────────────────────
const ACTIVITY_OPTIONS = [
  { badge: 'A', label: 'Deep work' },
  { badge: 'B', label: 'Meetings & calls' },
  { badge: 'C', label: 'Admin & errands' },
  { badge: 'D', label: 'Break' },
  { badge: 'E', label: 'Distracted' },
]
const MOOD_OPTIONS = [
  { badge: '1', label: 'Energized' },
  { badge: '2', label: 'Getting through it' },
  { badge: '3', label: 'Tired' },
  { badge: '4', label: 'Stressed' },
  { badge: '5', label: 'Happy & relaxed' },
]
const ENERGY_OPTIONS = [
  { badge: '↑', label: 'High' },
  { badge: '→', label: 'Medium' },
  { badge: '↓', label: 'Low' },
]

const MAX_CHARS = 280
const CIRCUMFERENCE = 2 * Math.PI * 9
const GIPHY_KEY = 'dc6zaTOxFJmzC'

// ── OptionGroup ───────────────────────────────────────────
function OptionGroup({ id, options, selected, onSelect }) {
  return (
    <div className="options" id={id}>
      {options.map(({ badge, label }) => {
        const isSelected = selected === label
        return (
          <button
            key={label}
            className={`option${isSelected ? ' selected' : ''}`}
            onClick={() => onSelect(isSelected ? '' : label)}
          >
            <span className="badge">{badge}</span>
            <span className="option-text">{label}</span>
            {isSelected && <span className="option-check"><CheckIcon /></span>}
          </button>
        )
      })}
    </div>
  )
}

// ── CharRing ──────────────────────────────────────────────
function CharRing({ value }) {
  const len = value.length
  if (len === 0) return null
  const remaining = MAX_CHARS - len
  const pct = len / MAX_CHARS
  const offset = CIRCUMFERENCE * (1 - pct)
  const stroke = remaining < 20 ? 'var(--red)' : remaining < 60 ? 'var(--yellow)' : 'var(--blue)'
  const showText = remaining <= 30
  return (
    <div className="char-ring">
      <svg width="22" height="22" viewBox="0 0 22 22" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="11" cy="11" r="9" fill="none" stroke="var(--border)" strokeWidth="2" />
        <circle cx="11" cy="11" r="9" fill="none" stroke={stroke} strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      {showText && (
        <div className="char-count-text" style={{ color: remaining < 20 ? 'var(--red)' : 'var(--yellow)' }}>
          {remaining}
        </div>
      )}
    </div>
  )
}

// ── EmojiPicker ───────────────────────────────────────────
function EmojiPicker({ onSelect, onClose }) {
  const [activeCat, setActiveCat] = useState(0)
  return (
    <div className="picker-sheet">
      <div className="picker-backdrop" onClick={onClose} />
      <div className="picker-panel">
        <div className="picker-header">
          <span className="picker-title">Emoji</span>
          <button className="icon-btn" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="emoji-cats">
          {EMOJI_CATS.map((cat, i) => (
            <button key={i} className={`emoji-cat-btn${activeCat === i ? ' active' : ''}`}
              onClick={() => setActiveCat(i)}>{cat.name}</button>
          ))}
        </div>
        <div className="emoji-grid">
          {EMOJI_CATS[activeCat].emojis.map(e => (
            <button key={e} className="emoji-btn" onClick={() => onSelect(e)}>{e}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── GifPicker ─────────────────────────────────────────────
function GifPicker({ onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const [gifs, setGifs] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef(null)

  const fetchGifs = useCallback(async (q) => {
    setLoading(true)
    try {
      const endpoint = q
        ? `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(q)}&limit=24&rating=g`
        : `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=24&rating=g`
      const res = await fetch(endpoint)
      const data = await res.json()
      setGifs(data.data || [])
    } catch {
      setGifs([])
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchGifs('') }, [fetchGifs])

  function handleSearch(val) {
    setQuery(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchGifs(val), 400)
  }

  return (
    <div className="picker-sheet">
      <div className="picker-backdrop" onClick={onClose} />
      <div className="picker-panel picker-panel-tall">
        <div className="picker-header">
          <span className="picker-title">GIF</span>
          <button className="icon-btn" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="gif-search-wrap">
          <SearchIcon />
          <input
            className="gif-search"
            placeholder="Search GIFs…"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            autoFocus
          />
        </div>
        <div className="gif-grid">
          {loading ? (
            <div className="gif-loading">Loading…</div>
          ) : gifs.length === 0 ? (
            <div className="gif-loading">No results</div>
          ) : (
            gifs.map(gif => (
              <button key={gif.id} className="gif-item"
                onClick={() => onSelect({ url: gif.images.original.url, preview: gif.images.fixed_width.url, title: gif.title })}>
                <img src={gif.images.fixed_width_small.url} alt={gif.title} loading="lazy" />
              </button>
            ))
          )}
        </div>
      </div>
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
    if (entries.length > 0) {
      if (new Date(entries[0].timestamp).toDateString() !== new Date().toDateString()) {
        localStorage.removeItem(STORAGE_KEY)
        return []
      }
    }
    return entries
  } catch { return [] }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

// ── DraftCard ─────────────────────────────────────────────
function DraftCard({ entry }) {
  const t = new Date(entry.timestamp).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const tags = [entry.activity, entry.mood, entry.energy].filter(Boolean)
  return (
    <div className="draft-card">
      <div className="draft-avatar">P</div>
      <div className="draft-body">
        <div className="draft-meta">
          <span className="draft-name">Day Log</span>
          <span className="draft-dot">·</span>
          <span className="draft-time">{t}</span>
        </div>
        {entry.note && <p className="draft-content">{entry.note}</p>}
        {entry.gif && (
          <div className="draft-gif">
            <img src={entry.gif.preview} alt={entry.gif.title} />
          </div>
        )}
        {entry.images && entry.images.length > 0 && (
          <div className={`draft-images count-${entry.images.length}`}>
            {entry.images.map((src, i) => (
              <img key={i} src={src} alt="" />
            ))}
          </div>
        )}
        {tags.length > 0 && (
          <div className="draft-tags">
            {tags.map((tag, i) => <span key={i} className="draft-tag">{tag}</span>)}
          </div>
        )}
        {entry.location && (
          <div className="draft-location">
            <LocationIcon /> {entry.location}
          </div>
        )}
      </div>
    </div>
  )
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
  const [view, setView] = useState('compose')

  // Media state
  const [images, setImages] = useState([])      // [{dataUrl, name}]
  const [gif, setGif] = useState(null)          // {url, preview, title}
  const [location, setLocation] = useState('')

  // Picker state
  const [showEmoji, setShowEmoji] = useState(false)
  const [showGif, setShowGif] = useState(false)

  const textareaRef = useRef(null)
  const fileInputRef = useRef(null)

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

  // Close pickers on back button / escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { setShowEmoji(false); setShowGif(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  function insertEmoji(emoji) {
    const el = textareaRef.current
    const start = el ? el.selectionStart : note.length
    const end = el ? el.selectionEnd : note.length
    const newText = (note.slice(0, start) + emoji + note.slice(end)).slice(0, MAX_CHARS)
    setNote(newText)
    setShowEmoji(false)
    requestAnimationFrame(() => {
      if (el) {
        el.selectionStart = el.selectionEnd = start + emoji.length
        el.focus()
      }
    })
  }

  function handleMediaClick() {
    if (gif) return  // can't mix gif + images
    fileInputRef.current?.click()
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const remaining = 4 - images.length
    files.slice(0, remaining).forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImages(prev => [...prev, { dataUrl: ev.target.result, name: file.name }].slice(0, 4))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  function removeImage(idx) {
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

  function handleGifSelect(g) {
    setGif(g)
    setImages([])   // gif and images are mutually exclusive
    setShowGif(false)
  }

  async function handleLocation() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        )
        const data = await res.json()
        const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || ''
        const country = data.address?.country || ''
        setLocation([city, country].filter(Boolean).join(', '))
      } catch {
        setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`)
      }
    }, () => setLocation(''))
  }

  function handleSend() {
    if (!activity && !mood && !energy && !note.trim() && images.length === 0 && !gif) {
      alert('Add something before logging.')
      return
    }
    const entry = {
      timestamp: new Date().toISOString(),
      activity, mood, energy,
      note: note.trim(),
      images: images.map(i => i.dataUrl),
      gif: gif || null,
      location: location || null,
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
        e.activity ? `Activity : ${e.activity}` : null,
        e.mood ? `Mood     : ${e.mood}` : null,
        e.energy ? `Energy   : ${e.energy}` : null,
        e.note ? `Note     : ${e.note}` : null,
        e.gif ? `GIF      : ${e.gif.url}` : null,
        e.images?.length ? `Photos   : ${e.images.length} photo(s) attached` : null,
        e.location ? `Location : ${e.location}` : null,
      ].filter(Boolean).join('\n')
    })
    const body = [
      `[daylog] ${dateLabel} — Daily Summary`, '',
      ...entryBlocks,
      '═══════════════════════════', '',
      `Total entries: ${entries.length}`,
      'Logged via Day Log',
    ].join('\n')
    const subject = encodeURIComponent(
      `[daylog] ${new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} — Daily Summary`
    )
    window.location.href = `mailto:parthpandhe8@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`
    localStorage.removeItem(STORAGE_KEY)
    setEntries([])
    setView('compose')
  }

  function handleClearAll() {
    localStorage.removeItem(STORAGE_KEY)
    setEntries([])
    setView('compose')
  }

  function handleReset() {
    setActivity(''); setMood(''); setEnergy('')
    setNote(''); setImages([]); setGif(null); setLocation('')
  }

  const hasMedia = images.length > 0 || !!gif

  // ── Drafts view ─────────────────────────────────────────
  if (view === 'drafts') {
    return (
      <div className="daylog-root">
        <header className="header">
          <div className="header-left">
            <button className="icon-btn" onClick={() => setView('compose')}><BackIcon /></button>
            <h1>Today's logs</h1>
          </div>
          <span className="entry-count-badge">{entries.length}</span>
        </header>
        <div className="drafts-list">
          {entries.length === 0 ? (
            <div className="drafts-empty">No logs yet today</div>
          ) : (
            entries.map((entry, i) => (
              <div key={entry.timestamp}>
                <DraftCard entry={entry} />
                {i < entries.length - 1 && <div className="divider full-bleed" />}
              </div>
            ))
          )}
        </div>
        {entries.length > 0 && (
          <div className="drafts-footer">
            <button className="primary-btn" onClick={handleSendSummary}>
              <SendIcon /> Send daily summary
            </button>
            <button className="clear-link" onClick={handleClearAll}>Clear all logs</button>
          </div>
        )}
      </div>
    )
  }

  // ── Compose view ────────────────────────────────────────
  return (
    <div className="daylog-root">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <header className="header">
        <div className="header-left">
          <button className="icon-btn" onClick={handleReset}><BackIcon /></button>
          <h1>New post</h1>
          {entries.length > 0 && (
            <button className="drafts-pill" onClick={() => setView('drafts')}>
              Logs <span className="drafts-count">{entries.length}</span>
            </button>
          )}
        </div>
        <button className="post-btn" onClick={handleSend} disabled={logged}>
          {logged ? 'Saved ✓' : 'Log it'}
        </button>
      </header>

      {/* X-style compose area */}
      <div className="compose">
        <div className="avatar">P</div>
        <div className="compose-right">
          <button className="audience-pill">
            <GlobeIcon /> Everyone
          </button>
          <textarea
            ref={textareaRef}
            className="note-box"
            placeholder="Write something…"
            value={note}
            onChange={e => setNote(e.target.value.slice(0, MAX_CHARS))}
            rows={2}
          />

          {/* GIF preview */}
          {gif && (
            <div className="media-preview gif-preview">
              <img src={gif.preview} alt={gif.title} />
              <button className="media-remove" onClick={() => setGif(null)}><CloseIcon /></button>
            </div>
          )}

          {/* Image previews */}
          {images.length > 0 && (
            <div className={`media-preview image-grid count-${images.length}`}>
              {images.map((img, i) => (
                <div key={i} className="image-item">
                  <img src={img.dataUrl} alt="" />
                  <button className="media-remove" onClick={() => removeImage(i)}><CloseIcon /></button>
                </div>
              ))}
            </div>
          )}

          {/* Location tag */}
          {location && (
            <div className="location-tag">
              <LocationIcon /> {location}
              <button className="loc-remove" onClick={() => setLocation('')}><CloseIcon /></button>
            </div>
          )}

          <div className="compose-footer">
            <div className="toolbar">
              <button
                className={`tool-btn${images.length >= 4 || !!gif ? ' disabled' : ''}`}
                title="Media"
                onClick={handleMediaClick}
                disabled={images.length >= 4 || !!gif}
              ><MediaIcon /></button>
              <button
                className={`tool-btn${hasMedia ? ' disabled' : ''}`}
                title="GIF"
                onClick={() => { if (!images.length) setShowGif(true) }}
                disabled={!!images.length}
              ><GifIcon /></button>
              <button className="tool-btn" title="Emoji" onClick={() => setShowEmoji(true)}>
                <EmojiIcon />
              </button>
              <button
                className={`tool-btn${location ? ' tool-btn-active' : ''}`}
                title="Location"
                onClick={handleLocation}
              ><LocationIcon /></button>
            </div>
            <CharRing value={note} />
          </div>
        </div>
      </div>

      <div className="time-strip">{time}</div>
      <div className="divider" />

      <div className="section">
        <div className="section-header">
          <span className="section-label">Activity</span>
          <span className="section-hint">What are you doing?</span>
        </div>
        <OptionGroup id="activity" options={ACTIVITY_OPTIONS} selected={activity} onSelect={setActivity} />
      </div>
      <div className="divider" />

      <div className="section">
        <div className="section-header">
          <span className="section-label">Mood</span>
          <span className="section-hint">How are you feeling?</span>
        </div>
        <OptionGroup id="mood" options={MOOD_OPTIONS} selected={mood} onSelect={setMood} />
      </div>
      <div className="divider" />

      <div className="section">
        <div className="section-header">
          <span className="section-label">Energy</span>
          <span className="section-hint">Current level</span>
        </div>
        <OptionGroup id="energy" options={ENERGY_OPTIONS} selected={energy} onSelect={setEnergy} />
      </div>

      <div className="footer">
        <button className="reset-btn" onClick={handleReset}>Clear form</button>
      </div>

      {/* Pickers */}
      {showEmoji && <EmojiPicker onSelect={insertEmoji} onClose={() => setShowEmoji(false)} />}
      {showGif && <GifPicker onSelect={handleGifSelect} onClose={() => setShowGif(false)} />}
    </div>
  )
}
