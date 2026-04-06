'use client'
import React, { useEffect, useRef, useState } from 'react'

const TUTORS = [
  { id: 't1', name: 'Dave Jones',   initials: 'DJ', color: '#0ea5e9', bg: '#e0f2fe' },
  { id: 't2', name: 'Ryan Jung',    initials: 'RJ', color: '#8b5cf6', bg: '#ede9fe' },
  { id: 't3', name: 'Kate Jung',    initials: 'KJ', color: '#ec4899', bg: '#fce7f3' },
  { id: 't4', name: 'Daniel Jung',  initials: 'DJ', color: '#f97316', bg: '#ffedd5' },
]
const BLOCKS = ['3:30 PM', '4:30 PM', '5:30 PM']
const DAYS   = ['Mon 4/7', 'Tue 4/8', 'Wed 4/9', 'Thu 4/10', 'Sat 4/12']

const EXISTING: Record<string, { name: string; subject: string; color: string }[]> = {
  't1-3:30 PM-Mon 4/7':  [{ name: 'Sofia R.',   subject: 'Algebra',    color: '#0ea5e9' }],
  't2-4:30 PM-Tue 4/8':  [{ name: 'Emma L.',    subject: 'Calculus',   color: '#8b5cf6' }],
  't3-3:30 PM-Thu 4/10': [{ name: 'Liam K.',    subject: 'English',    color: '#ec4899' }],
  't4-5:30 PM-Mon 4/7':  [{ name: 'Priya M.',   subject: 'Chemistry',  color: '#f97316' }],
  't1-5:30 PM-Wed 4/9':  [{ name: 'Jordan T.',  subject: 'SAT Math',   color: '#0ea5e9' }],
  't3-4:30 PM-Sat 4/12': [{ name: 'Mia C.',     subject: 'Writing',    color: '#ec4899' }],
  't2-3:30 PM-Wed 4/9':  [{ name: 'Oliver H.',  subject: 'Geometry',   color: '#8b5cf6' }],
  't4-4:30 PM-Thu 4/10': [{ name: 'Chloe B.',   subject: 'ACT Science',color: '#f97316' }],
  't1-4:30 PM-Mon 4/7':  [{ name: 'Marcus W.',  subject: 'Precalc',    color: '#0ea5e9' }],
}

const STUDENTS_TO_PLACE = [
  { id: 's1',  name: 'Maya Patel',   subject: 'Algebra',     initials: 'MP', color: '#0ea5e9', bg: '#e0f2fe' },
  { id: 's2',  name: 'Alex Chen',    subject: 'Algebra',     initials: 'AC', color: '#0ea5e9', bg: '#e0f2fe' },
  { id: 's3',  name: 'Zara Ahmed',   subject: 'English',     initials: 'ZA', color: '#ec4899', bg: '#fce7f3' },
  { id: 's4',  name: 'Tyler Brooks', subject: 'Chemistry',   initials: 'TB', color: '#f97316', bg: '#ffedd5' },
  { id: 's5',  name: 'Anya Singh',   subject: 'Calculus',    initials: 'AS', color: '#8b5cf6', bg: '#ede9fe' },
  { id: 's6',  name: 'Ryan Park',    subject: 'SAT Math',    initials: 'RP', color: '#0ea5e9', bg: '#e0f2fe' },
  { id: 's7',  name: 'Isla Torres',  subject: 'English',     initials: 'IT', color: '#ec4899', bg: '#fce7f3' },
  { id: 's8',  name: 'Dev Sharma',   subject: 'Geometry',    initials: 'DS', color: '#8b5cf6', bg: '#ede9fe' },
  { id: 's9',  name: 'Nora Kim',     subject: 'Chemistry',   initials: 'NK', color: '#f97316', bg: '#ffedd5' },
  { id: 's10', name: 'Ethan Cole',   subject: 'Calculus',    initials: 'EC', color: '#8b5cf6', bg: '#ede9fe' },
  { id: 's11', name: 'Layla Hassan', subject: 'Writing',     initials: 'LH', color: '#ec4899', bg: '#fce7f3' },
  { id: 's12', name: 'Sam Rivera',   subject: 'SAT Math',    initials: 'SR', color: '#0ea5e9', bg: '#e0f2fe' },
  { id: 's13', name: 'Kai Nguyen',   subject: 'ACT Science', initials: 'KN', color: '#f97316', bg: '#ffedd5' },
  { id: 's14', name: 'Pia Gonzalez', subject: 'Algebra',     initials: 'PG', color: '#0ea5e9', bg: '#e0f2fe' },
]

const ASSIGNMENTS: Record<string, { tutorId: string; block: string; day: string }> = {
  's1':  { tutorId: 't1', block: '3:30 PM', day: 'Mon 4/7'  },
  's2':  { tutorId: 't1', block: '3:30 PM', day: 'Tue 4/8'  },
  's3':  { tutorId: 't3', block: '3:30 PM', day: 'Thu 4/10' },
  's4':  { tutorId: 't4', block: '5:30 PM', day: 'Mon 4/7'  },
  's5':  { tutorId: 't2', block: '4:30 PM', day: 'Tue 4/8'  },
  's6':  { tutorId: 't1', block: '5:30 PM', day: 'Wed 4/9'  },
  's7':  { tutorId: 't3', block: '4:30 PM', day: 'Sat 4/12' },
  's8':  { tutorId: 't2', block: '3:30 PM', day: 'Wed 4/9'  },
  's9':  { tutorId: 't4', block: '4:30 PM', day: 'Thu 4/10' },
  's10': { tutorId: 't2', block: '4:30 PM', day: 'Tue 4/8'  },
  's11': { tutorId: 't3', block: '3:30 PM', day: 'Thu 4/10' },
  's12': { tutorId: 't1', block: '5:30 PM', day: 'Wed 4/9'  },
  's13': { tutorId: 't4', block: '5:30 PM', day: 'Mon 4/7'  },
  's14': { tutorId: 't1', block: '3:30 PM', day: 'Mon 4/7'  },
}

// ── Overlay panel types ────────────────────────────────────────────────────────
type OverlayType = 'none' | 'confirm' | 'contact' | 'history' | 'noshow'

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }
function cellKey(tutorId: string, block: string, day: string) { return `${tutorId}-${block}-${day}` }

type ExtraStudent = { name: string; subject: string; color: string; studentId: string; bg: string }

// ── Overlay panels ─────────────────────────────────────────────────────────────

function ContactPanel({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ background: 'white', borderRadius: 18, border: '1px solid #e8ecf0', boxShadow: '0 40px 80px rgba(0,0,0,0.18)', width: 400, animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)', overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', padding: '18px 20px', borderBottom: '1px solid #e8ecf0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: 'white' }}>MP</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>Maya Patel</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Grade 11 · SAT Math · 12 hrs remaining</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, background: '#dcfce7', color: '#16a34a', padding: '3px 9px', borderRadius: 20 }}>Active</div>
        </div>
      </div>
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Student contact */}
        <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Student</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 6 }}>
            {[
              ['Email', 'maya.patel@gmail.com'],
              ['Phone', '(214) 555-0182'],
            ].map(([label, val]) => (
              <React.Fragment key={label}>
                <div style={{ fontSize: 11, color: '#64748b' }}>{label}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b', textAlign: 'right' }}>{val}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Parent contact */}
        <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Parent · Priya Patel</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 6 }}>
            {[
              ['Email', 'priya.patel@gmail.com'],
              ['Phone', '(214) 555-0183'],
            ].map(([label, val]) => (
              <React.Fragment key={label}>
                <div style={{ fontSize: 11, color: '#64748b' }}>{label}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', textAlign: 'right' }}>{val}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
          <div style={{ flex: 1, padding: '9px', borderRadius: 10, background: '#f5f3ff', border: '1px solid #ede9fe', fontSize: 11, fontWeight: 700, color: '#7c3aed', textAlign: 'center', cursor: 'pointer' }}>Send Reminder</div>
          <div style={{ flex: 1, padding: '9px', borderRadius: 10, background: '#7c3aed', fontSize: 11, fontWeight: 700, color: 'white', textAlign: 'center', cursor: 'pointer' }}>Book Session</div>
        </div>
      </div>
    </div>
  )
}

function HistoryPanel({ onClose }: { onClose: () => void }) {
  const sessions = [
    { date: 'Apr 3', day: 'Thu', tutor: 'Dave Jones', topic: 'SAT Math', status: 'present',   time: '3:30 PM' },
    { date: 'Mar 27', day: 'Thu', tutor: 'Dave Jones', topic: 'SAT Math', status: 'present',  time: '3:30 PM' },
    { date: 'Mar 20', day: 'Thu', tutor: 'Dave Jones', topic: 'SAT Math', status: 'no-show',  time: '3:30 PM' },
    { date: 'Mar 13', day: 'Thu', tutor: 'Dave Jones', topic: 'SAT Math', status: 'present',  time: '3:30 PM' },
    { date: 'Mar 6',  day: 'Thu', tutor: 'Dave Jones', topic: 'SAT Math', status: 'present',  time: '3:30 PM' },
    { date: 'Feb 27', day: 'Thu', tutor: 'Dave Jones', topic: 'SAT Math', status: 'cancelled',time: '3:30 PM' },
  ]
  const attended  = sessions.filter(s => s.status === 'present').length
  const rate      = Math.round((attended / sessions.filter(s => s.status !== 'cancelled').length) * 100)
  const statusStyle = (s: string) =>
    s === 'present'   ? { bg: '#f0fdf4', color: '#16a34a', label: 'Present' } :
    s === 'no-show'   ? { bg: '#fef2f2', color: '#dc2626', label: 'No-show' } :
                        { bg: '#f8fafc', color: '#94a3b8', label: 'Cancelled' }

  return (
    <div style={{ background: 'white', borderRadius: 18, border: '1px solid #e8ecf0', boxShadow: '0 40px 80px rgba(0,0,0,0.18)', width: 420, animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#7c3aed' }}>MP</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Maya Patel · Session History</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Last 6 sessions · SAT Math with Dave Jones</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: rate >= 80 ? '#16a34a' : '#f97316' }}>{rate}%</div>
          <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600 }}>attendance</div>
        </div>
      </div>
      <div style={{ padding: '12px 20px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sessions.map((s, i) => {
          const st = statusStyle(s.status)
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, background: '#f8fafc', border: '1px solid #f1f5f9', animation: `slideIn 0.25s ${i * 60}ms ease forwards`, opacity: 0 }}>
              <div style={{ textAlign: 'center', minWidth: 32 }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{s.day}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>{s.date.split(' ')[1]}</div>
                <div style={{ fontSize: 8, color: '#94a3b8' }}>{s.date.split(' ')[0]}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b' }}>{s.topic}</div>
                <div style={{ fontSize: 10, color: '#64748b' }}>{s.tutor} · {s.time}</div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: st.bg, color: st.color }}>{st.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NoShowPanel({ onClose }: { onClose: () => void }) {
  const noShows = [
    { name: 'Alex Chen',    subject: 'Algebra',   tutor: 'Dave Jones',  day: 'Tue 4/8',  time: '3:30p', initials: 'AC', color: '#0ea5e9', bg: '#e0f2fe' },
    { name: 'Jordan T.',    subject: 'SAT Math',  tutor: 'Dave Jones',  day: 'Wed 4/9',  time: '5:30p', initials: 'JT', color: '#0ea5e9', bg: '#e0f2fe' },
    { name: 'Isla Torres',  subject: 'English',   tutor: 'Kate Jung',   day: 'Sat 4/12', time: '4:30p', initials: 'IT', color: '#ec4899', bg: '#fce7f3' },
  ]
  return (
    <div style={{ background: 'white', borderRadius: 18, border: '1px solid #e8ecf0', boxShadow: '0 40px 80px rgba(0,0,0,0.18)', width: 400, animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>No-shows this week</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>3 students need follow-up</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, background: '#fef2f2', color: '#dc2626', padding: '3px 9px', borderRadius: 20, border: '1px solid #fecaca' }}>Action needed</div>
      </div>
      <div style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {noShows.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 11, background: '#fff5f5', border: '1px solid #fecaca', animation: `slideIn 0.25s ${i * 80}ms ease forwards`, opacity: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: s.color, flexShrink: 0 }}>{s.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{s.name}</div>
              <div style={{ fontSize: 10, color: '#64748b' }}>{s.subject} · {s.tutor} · {s.day} {s.time}</div>
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              <div style={{ padding: '4px 8px', borderRadius: 7, background: '#fef2f2', border: '1px solid #fecaca', fontSize: 10, fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>Call</div>
              <div style={{ padding: '4px 8px', borderRadius: 7, background: '#f5f3ff', border: '1px solid #ede9fe', fontSize: 10, fontWeight: 600, color: '#7c3aed', cursor: 'pointer' }}>Reschedule</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 4, padding: '9px 12px', borderRadius: 10, background: '#f5f3ff', border: '1px solid #ede9fe', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#7c3aed' }}>Send bulk reminder to all 3 parents</span>
        </div>
      </div>
    </div>
  )
}

function ConfirmPanel({ extraPlacements }: { extraPlacements: Record<string, ExtraStudent[]> }) {
  return (
    <div style={{ background: 'white', borderRadius: 18, border: '1px solid #e8ecf0', boxShadow: '0 40px 80px rgba(0,0,0,0.2)', padding: 22, width: 440, maxHeight: '75vh', display: 'flex', flexDirection: 'column', animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Confirm Schedule</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>{STUDENTS_TO_PLACE.length} students · Week of Apr 7</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: '#7c3aed', background: '#f5f3ff', padding: '3px 9px', borderRadius: 6 }}>0 conflicts</div>
      </div>
      <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
        {STUDENTS_TO_PLACE.map((s, i) => {
          const a = ASSIGNMENTS[s.id]
          const tutor = TUTORS.find(t => t.id === a.tutorId)!
          const key = cellKey(a.tutorId, a.block, a.day)
          const slotCount = (EXISTING[key]?.length ?? 0) + (extraPlacements[key]?.length ?? 0)
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 9px', borderRadius: 8, background: '#f8fafc', border: '1px solid #eff2f6', animation: `slideIn 0.2s ${i * 30}ms ease forwards`, opacity: 0 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
              <div style={{ width: 20, height: 20, borderRadius: 5, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 800, color: s.color, flexShrink: 0 }}>{s.initials}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
              <div style={{ fontSize: 9, color: '#64748b', whiteSpace: 'nowrap' }}>{a.day} · {a.block.replace(' PM', 'p')}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: tutor.color, whiteSpace: 'nowrap' }}>{tutor.name.split(' ')[0]}</div>
              <div style={{ fontSize: 9, color: '#94a3b8', whiteSpace: 'nowrap' }}>{slotCount}/3</div>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, padding: '10px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12, fontWeight: 600, color: '#64748b', textAlign: 'center', cursor: 'pointer' }}>Cancel</div>
        <div style={{ flex: 2, padding: '10px', borderRadius: 10, background: 'linear-gradient(135deg, #7c3aed, #a855f7)', fontSize: 12, fontWeight: 700, color: 'white', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 14px rgba(124,58,237,0.4)' }}>
          Confirm {STUDENTS_TO_PLACE.length} Bookings
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ThetixDemo() {
  const [phase,           setPhase]           = useState<string>('idle')
  const [query,           setQuery]           = useState('')
  const [placedIds,       setPlacedIds]       = useState<Set<string>>(new Set())
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null)
  const [highlightCell,   setHighlightCell]   = useState<string | null>(null)
  const [confirmedIds,    setConfirmedIds]    = useState<Set<string>>(new Set())
  const [overlay,         setOverlay]         = useState<OverlayType>('none')
  const [resultLabel,     setResultLabel]     = useState('')
  const [extraPlacements, setExtraPlacement] = useState<Record<string, ExtraStudent[]>>({})
  const [sidebarScrollId, setSidebarScrollId] = useState<string | null>(null)
  const loopRef      = useRef(false)
  const studentRefs  = useRef<Record<string, HTMLDivElement | null>>({})
  const sidebarRef   = useRef<HTMLDivElement | null>(null)

  async function typeText(text: string, speed = 40) {
    for (let i = 0; i <= text.length; i++) {
      setQuery(text.slice(0, i))
      await sleep(speed + Math.random() * 18)
    }
  }

  async function eraseText() {
    setQuery(q => {
      const run = async (len: number) => {
        for (let i = len; i >= 0; i--) {
          setQuery(prev => prev.slice(0, i))
          await sleep(16)
        }
      }
      run(q.length)
      return q
    })
    await sleep(700)
    setQuery('')
  }

  async function runLoop() {
    if (loopRef.current) return
    loopRef.current = true

    while (true) {

      // ── SCENARIO 1: Schedule builder ──────────────────────────────────────
      setPhase('idle'); setPlacedIds(new Set()); setActiveStudentId(null)
      setHighlightCell(null); setConfirmedIds(new Set()); setOverlay('none')
      setExtraPlacement({}); setResultLabel(''); setQuery(''); setSidebarScrollId(null)
      await sleep(1200)

      await typeText('Build schedule for next week', 40)
      await sleep(400)

      setPhase('scanning')
      setResultLabel('Analyzing tutor availability…'); await sleep(350)
      setResultLabel('Matching subjects to students…'); await sleep(350)
      setResultLabel('Checking capacity constraints…'); await sleep(450)
      setResultLabel('Generating optimal assignments…'); await sleep(500)

      for (const student of STUDENTS_TO_PLACE) {
        setPhase(`placing-${student.id}`)
        setActiveStudentId(student.id)
        setSidebarScrollId(student.id)
        setResultLabel(`Placing ${student.name}…`)
        await sleep(280)
        const a = ASSIGNMENTS[student.id]
        const key = cellKey(a.tutorId, a.block, a.day)
        setHighlightCell(key)
        await sleep(520)
        setExtraPlacement(prev => ({
          ...prev,
          [key]: [...(prev[key] ?? []), { name: student.name, subject: student.subject, color: student.color, bg: student.bg, studentId: student.id }]
        }))
        setPlacedIds(prev => new Set([...prev, student.id]))
        await sleep(280)
        setHighlightCell(null)
        await sleep(160)
      }

      setActiveStudentId(null); setSidebarScrollId(null)
      setResultLabel(`${STUDENTS_TO_PLACE.length} students placed · 0 conflicts`)
      await sleep(600)

      setOverlay('confirm')
      await sleep(2800)
      setConfirmedIds(new Set(STUDENTS_TO_PLACE.map(s => s.id)))
      setOverlay('none')
      setPhase('done')
      setResultLabel(`All ${STUDENTS_TO_PLACE.length} bookings confirmed ✓`)
      await sleep(2000)

      // Erase
      const q1 = 'Build schedule for next week'
      for (let i = q1.length; i >= 0; i--) { setQuery(q1.slice(0, i)); await sleep(16) }
      setQuery('')
      await sleep(700)

      // ── SCENARIO 2: Student contact lookup ───────────────────────────────
      setPhase('idle'); setResultLabel('')
      await sleep(800)
      await typeText("Show me Maya Patel's contact info", 38)
      await sleep(300)
      setPhase('contact')
      setResultLabel('Loading student record…')
      await sleep(600)
      setOverlay('contact')
      setResultLabel('Maya Patel · Grade 11 · SAT Math')
      await sleep(3200)
      setOverlay('none')
      const q2 = "Show me Maya Patel's contact info"
      for (let i = q2.length; i >= 0; i--) { setQuery(q2.slice(0, i)); await sleep(16) }
      setQuery('')
      await sleep(700)

      // ── SCENARIO 3: Session history ───────────────────────────────────────
      setPhase('idle'); setResultLabel('')
      await sleep(800)
      await typeText("Maya's session history", 40)
      await sleep(300)
      setPhase('history')
      setResultLabel('Fetching attendance records…')
      await sleep(700)
      setOverlay('history')
      setResultLabel('6 sessions · 80% attendance')
      await sleep(3400)
      setOverlay('none')
      const q3 = "Maya's session history"
      for (let i = q3.length; i >= 0; i--) { setQuery(q3.slice(0, i)); await sleep(16) }
      setQuery('')
      await sleep(700)

      // ── SCENARIO 4: No-shows ──────────────────────────────────────────────
      setPhase('idle'); setResultLabel('')
      await sleep(800)
      await typeText('Who has no-shows this week?', 40)
      await sleep(300)
      setPhase('noshow')
      setResultLabel('Scanning attendance records…')
      await sleep(700)
      setOverlay('noshow')
      setResultLabel('3 students need follow-up')
      await sleep(3400)
      setOverlay('none')
      const q4 = 'Who has no-shows this week?'
      for (let i = q4.length; i >= 0; i--) { setQuery(q4.slice(0, i)); await sleep(16) }
      setQuery('')
      await sleep(800)
    }
  }

  useEffect(() => {
    const t = setTimeout(() => runLoop(), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (sidebarScrollId && studentRefs.current[sidebarScrollId]) {
      studentRefs.current[sidebarScrollId]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [sidebarScrollId])

  const totalPlaced = placedIds.size
  const isBuilderPhase = phase.startsWith('placing') || phase === 'scanning' || phase === 'done'

  return (
    <>
      {/* Fixed overlay — renders OUTSIDE the card, never clipped */}
      {overlay !== 'none' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15,23,42,0.35)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease' }}>
          {overlay === 'confirm' && <ConfirmPanel extraPlacements={extraPlacements} />}
          {overlay === 'contact' && <ContactPanel onClose={() => setOverlay('none')} />}
          {overlay === 'history' && <HistoryPanel onClose={() => setOverlay('none')} />}
          {overlay === 'noshow'  && <NoShowPanel  onClose={() => setOverlay('none')} />}
        </div>
      )}

      <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #e8f4fd 0%, #f0ebff 35%, #fdf2ff 60%, #e8f8f2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif', overflow: 'hidden', position: 'relative' }}>

        {/* Grid texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.35, backgroundImage: `linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.13), transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.11), transparent 70%)', filter: 'blur(45px)' }} />

        {/* Main card */}
        <div style={{ width: '97vw', maxWidth: 1200, background: 'rgba(255,255,255,0.84)', backdropFilter: 'blur(28px)', borderRadius: 22, border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 32px 80px rgba(124,58,237,0.13), 0 8px 24px rgba(0,0,0,0.06)', overflow: 'hidden', position: 'relative' }}>

          {/* Top bar */}
          <div style={{ background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #e8ecf0', padding: '11px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>thetix</span>
            </div>
            <div style={{ display: 'flex', gap: 2, marginLeft: 8 }}>
              {['Schedule', 'Students', 'Recurring', 'Contact'].map(n => (
                <div key={n} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, color: n === 'Schedule' ? '#7c3aed' : '#64748b', background: n === 'Schedule' ? '#f5f3ff' : 'transparent' }}>{n}</div>
              ))}
            </div>
            {/* Command bar */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: phase !== 'idle' ? 'rgba(245,243,255,0.95)' : '#f8fafc', border: `1.5px solid ${phase !== 'idle' ? '#a78bfa' : '#dde3eb'}`, borderRadius: 10, padding: '6px 12px', minWidth: 300, boxShadow: phase !== 'idle' ? '0 0 0 3px rgba(124,58,237,0.1)' : 'none', transition: 'all 0.3s' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={phase !== 'idle' ? '#7c3aed' : '#94a3b8'} strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#1e293b', flex: 1 }}>
                {query}
                {phase !== 'idle' && <span style={{ display: 'inline-block', width: 2, height: 12, background: '#7c3aed', borderRadius: 1, marginLeft: 1, animation: 'blink 1s infinite', verticalAlign: 'middle' }} />}
              </span>
              {phase === 'idle' && <span style={{ fontSize: 10, padding: '2px 5px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', fontWeight: 600 }}>⌘K</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px', borderRadius: 8, background: '#7c3aed', color: 'white', fontSize: 11, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(124,58,237,0.4)', whiteSpace: 'nowrap' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Build Schedule
            </div>
          </div>

          <div style={{ display: 'flex', height: 520 }}>

            {/* Sidebar */}
            <div style={{ width: 186, borderRight: '1px solid #e8ecf0', background: 'rgba(248,250,252,0.7)', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '10px 12px 6px', flexShrink: 0 }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  {isBuilderPhase ? `Queue · ${STUDENTS_TO_PLACE.length} students` : 'Recent Students'}
                </div>
                {isBuilderPhase && phase !== 'idle' && phase !== 'scanning' && (
                  <div style={{ marginTop: 5, height: 3, borderRadius: 2, background: '#e8ecf0', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #a855f7)', borderRadius: 2, width: `${(totalPlaced / STUDENTS_TO_PLACE.length) * 100}%`, transition: 'width 0.4s ease' }} />
                  </div>
                )}
              </div>
              <div ref={sidebarRef} style={{ overflowY: 'auto', flex: 1, padding: '4px 10px 10px' }}>
                {(isBuilderPhase ? STUDENTS_TO_PLACE : STUDENTS_TO_PLACE.slice(0, 8)).map(s => {
                  const placed    = placedIds.has(s.id)
                  const active    = activeStudentId === s.id
                  const confirmed = confirmedIds.has(s.id)
                  return (
                    <div key={s.id} ref={el => { studentRefs.current[s.id] = el }}
                      style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 7px', borderRadius: 8, marginBottom: 4, background: active ? 'rgba(124,58,237,0.09)' : confirmed ? 'rgba(22,163,74,0.05)' : placed ? 'transparent' : 'white', border: `1px solid ${active ? '#a78bfa' : confirmed ? '#86efac' : placed ? '#f1f5f9' : '#e8ecf0'}`, opacity: placed && !active ? (confirmed ? 1 : 0.5) : 1, transform: active ? 'scale(1.02) translateX(2px)' : 'scale(1)', transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)', boxShadow: active ? '0 3px 10px rgba(124,58,237,0.18)' : 'none' }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: s.color, flexShrink: 0 }}>{s.initials}</div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: confirmed ? '#16a34a' : placed ? '#94a3b8' : '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                        <div style={{ fontSize: 9, color: confirmed ? '#4ade80' : placed ? '#cbd5e1' : '#64748b' }}>{s.subject}</div>
                      </div>
                      {confirmed && <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg></div>}
                      {active && <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>{[0,1,2].map(i => <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: '#7c3aed', animation: `dot 0.9s ${i * 0.18}s infinite` }} />)}</div>}
                    </div>
                  )
                })}
              </div>
              {phase !== 'idle' && (
                <div style={{ padding: '8px 10px', margin: '0 10px 10px', borderRadius: 8, background: phase === 'done' ? 'rgba(22,163,74,0.07)' : 'rgba(124,58,237,0.06)', border: `1px solid ${phase === 'done' ? 'rgba(22,163,74,0.2)' : 'rgba(124,58,237,0.15)'}`, flexShrink: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: phase === 'done' ? '#16a34a' : '#7c3aed', lineHeight: 1.5 }}>{resultLabel}</div>
                  {phase === 'scanning' && <div style={{ marginTop: 5, height: 2, borderRadius: 1, background: '#e8ecf0', overflow: 'hidden' }}><div style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #a855f7)', borderRadius: 1, animation: 'progress 1.6s ease infinite' }} /></div>}
                </div>
              )}
            </div>

            {/* Grid */}
            <div style={{ flex: 1, padding: '12px 14px', overflow: 'auto' }}>
              <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>Week of April 7, 2026</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#7c3aed', background: '#f5f3ff', padding: '2px 8px', borderRadius: 5 }}>Next Week</div>
                {phase === 'done' && <div style={{ fontSize: 10, fontWeight: 700, color: '#16a34a', background: '#f0fdf4', padding: '2px 8px', borderRadius: 5 }}>✓ {STUDENTS_TO_PLACE.length} sessions booked</div>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '52px repeat(5, 1fr)', gap: 0, borderRadius: 11, overflow: 'hidden', border: '1px solid #cbd5e1', background: '#dde3eb' }}>
                <div style={{ background: '#f4f6f9', padding: '7px 4px', borderBottom: '1px solid #dde3eb' }} />
                {DAYS.map(d => (
                  <div key={d} style={{ background: '#f4f6f9', borderBottom: '1px solid #dde3eb', borderLeft: '1px solid #dde3eb', padding: '6px 8px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#334155' }}>{d.split(' ')[0]}</div>
                    <div style={{ fontSize: 9, color: '#64748b', fontWeight: 500 }}>{d.split(' ')[1]}</div>
                  </div>
                ))}
                {TUTORS.map(tutor => (
                  <React.Fragment key={tutor.id}>
                    <div style={{ gridColumn: '1 / -1', background: '#f8f9fc', borderTop: '1px solid #dde3eb', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, background: tutor.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: tutor.color }}>{tutor.initials}</div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#334155' }}>{tutor.name}</span>
                    </div>
                    {BLOCKS.map(block => (
                      <React.Fragment key={`${tutor.id}-${block}`}>
                        <div style={{ background: 'white', borderTop: '1px solid #f0f2f5', borderRight: '1px solid #dde3eb', padding: '5px 4px 5px 3px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: 8, color: '#94a3b8', fontWeight: 600, marginTop: 2, whiteSpace: 'nowrap' }}>{block.replace(' PM', 'p')}</span>
                        </div>
                        {DAYS.map(day => {
                          const key = cellKey(tutor.id, block, day)
                          const cellStudents = [...(EXISTING[key] ?? []), ...(extraPlacements[key] ?? [])]
                          const isHighlighted = highlightCell === key
                          const isFull = cellStudents.length >= 3
                          return (
                            <div key={`c-${key}`} style={{ background: isHighlighted ? 'rgba(124,58,237,0.05)' : 'white', borderTop: '1px solid #f0f2f5', borderLeft: '1px solid #dde3eb', padding: 3, minHeight: 58, transition: 'background 0.25s', outline: isHighlighted ? '2px solid rgba(124,58,237,0.45)' : 'none', outlineOffset: -2, position: 'relative' }}>
                              {cellStudents.map((st, idx) => {
                                const extra       = (extraPlacements[key] ?? []).find(e => e.name === st.name)
                                const isNew       = !!extra
                                const isConfirmed = extra && confirmedIds.has(extra.studentId)
                                return (
                                  <div key={idx} style={{ borderRadius: 4, padding: '2px 4px', marginBottom: 2, background: isConfirmed ? '#f0fdf4' : isNew ? `${st.color}18` : `${st.color}12`, border: `1px solid ${isConfirmed ? '#86efac' : isNew ? st.color + '55' : st.color + '28'}`, animation: isNew && !isConfirmed ? 'popIn 0.38s cubic-bezier(0.34,1.56,0.64,1)' : 'none' }}>
                                    <div style={{ fontSize: 8, fontWeight: 700, color: isConfirmed ? '#16a34a' : st.color, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{st.name}</div>
                                    <div style={{ fontSize: 7, color: isConfirmed ? '#4ade80' : st.color + 'bb', whiteSpace: 'nowrap' }}>{st.subject}</div>
                                  </div>
                                )
                              })}
                              {isFull && !isHighlighted && cellStudents.length === 3 && <div style={{ position: 'absolute', top: 2, right: 3, fontSize: 7, fontWeight: 700, color: '#94a3b8' }}>Full</div>}
                              {isHighlighted && !isFull && <div style={{ position: 'absolute', bottom: 3, right: 3, fontSize: 7, fontWeight: 700, color: '#7c3aed' }}>{3 - cellStudents.length} open</div>}
                            </div>
                          )
                        })}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes dot     { 0%,100%{opacity:0.15;transform:scale(0.7)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes popIn   { from{opacity:0;transform:scale(0.65)} to{opacity:1;transform:scale(1)} }
        @keyframes progress{ 0%{width:5%;margin-left:0} 60%{width:75%} 100%{width:100%;margin-left:0} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </>
  )
}