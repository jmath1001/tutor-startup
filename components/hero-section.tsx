'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/hero8-header";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackEvent } from "@/lib/trackEvent";

// ── Fake data ─────────────────────────────────────────────────────────────────

const TUTORS = [
  { id: 't1', name: 'Dave J.',   color: '#0ea5e9', bg: '#e0f2fe' },
  { id: 't2', name: 'Ryan J.',   color: '#8b5cf6', bg: '#ede9fe' },
  { id: 't3', name: 'Kate J.',   color: '#ec4899', bg: '#fce7f3' },
  { id: 't4', name: 'Daniel J.', color: '#f97316', bg: '#ffedd5' },
]
const DAYS   = ['Mon', 'Tue', 'Wed', 'Thu', 'Sat']
const BLOCKS = ['3:30p', '4:30p', '5:30p']

type Cell = { name: string; subject: string; color: string }
type ExtraCell = Cell & { studentId: string; bg: string }

const EXISTING: Record<string, Cell[]> = {
  't1-3:30p-Mon': [{ name: 'Sofia R.',  subject: 'Algebra',   color: '#0ea5e9' }],
  't2-4:30p-Tue': [{ name: 'Emma L.',   subject: 'Calculus',  color: '#8b5cf6' }],
  't3-3:30p-Thu': [{ name: 'Liam K.',   subject: 'English',   color: '#ec4899' }],
  't4-5:30p-Mon': [{ name: 'Priya M.',  subject: 'Chemistry', color: '#f97316' }],
  't1-5:30p-Wed': [{ name: 'Jordan T.', subject: 'SAT Math',  color: '#0ea5e9' }],
  't2-3:30p-Wed': [{ name: 'Oliver H.', subject: 'Geometry',  color: '#8b5cf6' }],
  't4-4:30p-Thu': [{ name: 'Chloe B.',  subject: 'ACT Sci',   color: '#f97316' }],
}

const QUEUE = [
  { id: 'q1', name: 'Maya P.',  subject: 'Algebra',   color: '#0ea5e9', bg: '#e0f2fe', init: 'MP' },
  { id: 'q2', name: 'Alex C.',  subject: 'Calculus',  color: '#8b5cf6', bg: '#ede9fe', init: 'AC' },
  { id: 'q3', name: 'Zara A.',  subject: 'English',   color: '#ec4899', bg: '#fce7f3', init: 'ZA' },
  { id: 'q4', name: 'Tyler B.', subject: 'Chemistry', color: '#f97316', bg: '#ffedd5', init: 'TB' },
  { id: 'q5', name: 'Anya S.',  subject: 'Calculus',  color: '#8b5cf6', bg: '#ede9fe', init: 'AS' },
  { id: 'q6', name: 'Ryan P.',  subject: 'SAT Math',  color: '#0ea5e9', bg: '#e0f2fe', init: 'RP' },
  { id: 'q7', name: 'Isla T.',  subject: 'English',   color: '#ec4899', bg: '#fce7f3', init: 'IT' },
  { id: 'q8', name: 'Dev S.',   subject: 'Geometry',  color: '#8b5cf6', bg: '#ede9fe', init: 'DS' },
]

const PLACEMENTS: Record<string, { tutorId: string; block: string; day: string }> = {
  'q1': { tutorId: 't1', block: '3:30p', day: 'Mon' },
  'q2': { tutorId: 't2', block: '4:30p', day: 'Tue' },
  'q3': { tutorId: 't3', block: '3:30p', day: 'Thu' },
  'q4': { tutorId: 't4', block: '5:30p', day: 'Mon' },
  'q5': { tutorId: 't2', block: '4:30p', day: 'Wed' },
  'q6': { tutorId: 't1', block: '5:30p', day: 'Wed' },
  'q7': { tutorId: 't3', block: '4:30p', day: 'Sat' },
  'q8': { tutorId: 't2', block: '3:30p', day: 'Wed' },
}

function ckey(t: string, b: string, d: string) { return `${t}-${b}-${d}` }
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

type OverlayMode = 'none' | 'contact' | 'history' | 'noshow'

// ── Overlay panels ─────────────────────────────────────────────────────────────

function ContactCard({ visible }: { visible: boolean }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.98)', borderRadius: 12, padding: '14px 16px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)', transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)', pointerEvents: 'none', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 10, borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: 'linear-gradient(135deg, #7c3aed, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: 'white', flexShrink: 0 }}>MP</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>Maya Patel</div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 3 }}>Grade 11 · SAT Math · 12 hrs left</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, background: '#dcfce7', color: '#16a34a', padding: '3px 8px', borderRadius: 20 }}>Active</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { label: 'Student', email: 'maya.patel@gmail.com', phone: '(214) 555-0182' },
          { label: 'Parent · Priya Patel', email: 'priya.patel@gmail.com', phone: '(214) 555-0183' },
        ].map((row, i) => (
          <div key={i} style={{ padding: '9px 11px', borderRadius: 9, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>{row.label}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: '#2563eb', fontWeight: 500 }}>{row.email}</span>
              <span style={{ fontSize: 10, color: '#475569', fontWeight: 600 }}>{row.phone}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
        <div style={{ flex: 1, padding: '8px', borderRadius: 8, background: '#f5f3ff', border: '1px solid #ede9fe', fontSize: 10, fontWeight: 700, color: '#7c3aed', textAlign: 'center' }}>Send Reminder</div>
        <div style={{ flex: 1, padding: '8px', borderRadius: 8, background: '#7c3aed', fontSize: 10, fontWeight: 700, color: 'white', textAlign: 'center' }}>Book Session</div>
      </div>
    </div>
  )
}

function HistoryCard({ visible }: { visible: boolean }) {
  const rows = [
    { date: 'Apr 3',  status: 'present', topic: 'SAT Math', tutor: 'Dave J.' },
    { date: 'Mar 27', status: 'present', topic: 'SAT Math', tutor: 'Dave J.' },
    { date: 'Mar 20', status: 'no-show', topic: 'SAT Math', tutor: 'Dave J.' },
    { date: 'Mar 13', status: 'present', topic: 'SAT Math', tutor: 'Dave J.' },
    { date: 'Mar 6',  status: 'present', topic: 'Algebra',  tutor: 'Dave J.' },
  ]
  const sc = (s: string) =>
    s === 'present' ? { bg: '#f0fdf4', color: '#16a34a', label: 'Present' } :
                      { bg: '#fef2f2', color: '#dc2626', label: 'No-show' }
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.98)', borderRadius: 12, padding: '14px 16px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)', transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)', pointerEvents: 'none', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a' }}>Maya Patel · History</div>
          <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>Last 5 sessions · SAT Math</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#16a34a', lineHeight: 1 }}>80%</div>
          <div style={{ fontSize: 9, color: '#94a3b8' }}>attendance</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {rows.map((r, i) => {
          const s = sc(r.status)
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 9px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9', animation: `hslide 0.22s ${i*55}ms ease forwards`, opacity: 0 }}>
              <div style={{ minWidth: 38, fontSize: 10, fontWeight: 700, color: '#1e293b' }}>{r.date}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>{r.topic}</div>
                <div style={{ fontSize: 9, color: '#94a3b8' }}>{r.tutor}</div>
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: s.bg, color: s.color }}>{s.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NoShowCard({ visible }: { visible: boolean }) {
  const items = [
    { name: 'Alex Chen',   subject: 'Algebra',   tutor: 'Dave J.',   day: 'Tue 4/8',  init: 'AC', color: '#0ea5e9', bg: '#e0f2fe' },
    { name: 'Isla Torres', subject: 'English',   tutor: 'Kate J.',   day: 'Wed 4/9',  init: 'IT', color: '#ec4899', bg: '#fce7f3' },
    { name: 'Nora Kim',    subject: 'Chemistry', tutor: 'Daniel J.', day: 'Thu 4/10', init: 'NK', color: '#f97316', bg: '#ffedd5' },
  ]
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.98)', borderRadius: 12, padding: '14px 16px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)', transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)', pointerEvents: 'none', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a' }}>No-shows this week</div>
          <div style={{ fontSize: 10, color: '#64748b' }}>3 students need follow-up</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, background: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: 20, border: '1px solid #fecaca' }}>Action needed</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 9, background: '#fff5f5', border: '1px solid #fecaca', animation: `hslide 0.22s ${i*70}ms ease forwards`, opacity: 0 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: s.color, flexShrink: 0 }}>{s.init}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1e293b' }}>{s.name}</div>
              <div style={{ fontSize: 9, color: '#64748b' }}>{s.subject} · {s.tutor} · {s.day}</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={{ padding: '3px 7px', borderRadius: 6, background: '#fef2f2', border: '1px solid #fecaca', fontSize: 9, fontWeight: 600, color: '#dc2626' }}>Call</div>
              <div style={{ padding: '3px 7px', borderRadius: 6, background: '#f5f3ff', border: '1px solid #ede9fe', fontSize: 9, fontWeight: 600, color: '#7c3aed' }}>Reschedule</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '9px 11px', borderRadius: 9, background: '#f5f3ff', border: '1px solid #ede9fe', display: 'flex', alignItems: 'center', gap: 7 }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#7c3aed' }}>Send bulk reminder to all 3 parents</span>
      </div>
    </div>
  )
}

// ── HeroDemo inline component ─────────────────────────────────────────────────

function HeroDemo() {
  const [query,        setQuery]        = useState('')
  const [statusLabel,  setStatusLabel]  = useState('')
  const [thinking,     setThinking]     = useState(false)
  const [phase,        setPhase]        = useState<'idle'|'building'|'done'>('idle')
  const [placedIds,    setPlacedIds]    = useState<Set<string>>(new Set())
  const [activeId,     setActiveId]     = useState<string|null>(null)
  const [highlightKey, setHighlightKey] = useState<string|null>(null)
  const [confirmedIds, setConfirmedIds] = useState<Set<string>>(new Set())
  const [extras,       setExtras]       = useState<Record<string, ExtraCell[]>>({})
  const [overlay,      setOverlay]      = useState<OverlayMode>('none')
  const loopRef = useRef(false)

  async function type(text: string, speed = 45) {
    for (let i = 0; i <= text.length; i++) {
      setQuery(text.slice(0, i))
      await sleep(speed + Math.random() * 20)
    }
  }

  async function erase(text: string) {
    for (let i = text.length; i >= 0; i--) {
      setQuery(text.slice(0, i))
      await sleep(18)
    }
    setQuery('')
  }

  async function runLoop() {
    if (loopRef.current) return
    loopRef.current = true

    while (true) {
      // Reset
      setQuery(''); setStatusLabel(''); setThinking(false)
      setPhase('idle'); setPlacedIds(new Set()); setActiveId(null)
      setHighlightKey(null); setConfirmedIds(new Set()); setExtras({})
      setOverlay('none')
      await sleep(1000)

      // Scenario 1: Build schedule
      await type('Build schedule for next week')
      await sleep(300)
      setThinking(true); setStatusLabel('Analyzing availability…')
      await sleep(500); setStatusLabel('Matching subjects…')
      await sleep(450); setStatusLabel('Checking capacity…')
      await sleep(400); setThinking(false)
      setPhase('building')

      for (const q of QUEUE) {
        setActiveId(q.id)
        setStatusLabel(`Placing ${q.name}…`)
        await sleep(260)
        const p = PLACEMENTS[q.id]
        const k = ckey(p.tutorId, p.block, p.day)
        setHighlightKey(k)
        await sleep(480)
        setExtras(prev => ({ ...prev, [k]: [...(prev[k] ?? []), { name: q.name, subject: q.subject, color: q.color, bg: q.bg, studentId: q.id }] }))
        setPlacedIds(prev => new Set([...prev, q.id]))
        await sleep(260)
        setHighlightKey(null)
        await sleep(150)
      }

      setActiveId(null)
      setStatusLabel(`${QUEUE.length} students placed · 0 conflicts`)
      setPhase('done')
      await sleep(700)
      setConfirmedIds(new Set(QUEUE.map(q => q.id)))
      setStatusLabel(`All ${QUEUE.length} bookings confirmed ✓`)
      await sleep(2200)

      await erase('Build schedule for next week')
      await sleep(600)

      // Scenario 2: Contact info
      setPhase('idle'); setStatusLabel('')
      await type("Show Maya Patel's contact info")
      await sleep(300)
      setThinking(true); setStatusLabel('Loading student record…')
      await sleep(700); setThinking(false)
      setOverlay('contact')
      setStatusLabel('Maya Patel · Grade 11 · SAT Math')
      await sleep(3200)
      setOverlay('none')
      await erase("Show Maya Patel's contact info")
      await sleep(600)

      // Scenario 3: Session history
      setPhase('idle'); setStatusLabel('')
      await type("Maya's session history")
      await sleep(300)
      setThinking(true); setStatusLabel('Fetching attendance records…')
      await sleep(750); setThinking(false)
      setOverlay('history')
      setStatusLabel('5 sessions · 80% attendance rate')
      await sleep(3400)
      setOverlay('none')
      await erase("Maya's session history")
      await sleep(600)

      // Scenario 4: No-shows
      setPhase('idle'); setStatusLabel('')
      await type('Who has no-shows this week?')
      await sleep(300)
      setThinking(true); setStatusLabel('Scanning attendance…')
      await sleep(700); setThinking(false)
      setOverlay('noshow')
      setStatusLabel('3 students need follow-up')
      await sleep(3400)
      setOverlay('none')
      await erase('Who has no-shows this week?')
      await sleep(800)
    }
  }

  useEffect(() => {
    const t = setTimeout(runLoop, 600)
    return () => clearTimeout(t)
  }, [])

  const totalPlaced = placedIds.size

  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'ui-sans-serif, system-ui, sans-serif', userSelect: 'none' }}>
      <style>{`
        @keyframes hblink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes hdot    { 0%,100%{opacity:0.15;transform:scale(0.7)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes hpop    { from{opacity:0;transform:scale(0.6)} to{opacity:1;transform:scale(1)} }
        @keyframes hslide  { from{opacity:0;transform:translateX(-5px)} to{opacity:1;transform:translateX(0)} }
        @keyframes hprog   { 0%{width:8%} 60%{width:78%} 100%{width:100%} }
        @keyframes hpulse  { 0%,100%{box-shadow:0 0 0 0 rgba(124,58,237,0.3)} 50%{box-shadow:0 0 0 6px rgba(124,58,237,0)} }
      `}</style>

      <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: 20, border: '1px solid #e8ecf2', boxShadow: '0 24px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Top bar */}
        <div style={{ background: '#fafbfc', borderBottom: '1px solid #edf0f4', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, #7c3aed, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>thetix</span>
          </div>
          <div style={{ display: 'flex', gap: 2, marginLeft: 6 }}>
            {['Schedule', 'Students', 'Contact'].map(n => (
              <div key={n} style={{ padding: '3px 8px', borderRadius: 5, fontSize: 9, fontWeight: 600, color: n === 'Schedule' ? '#7c3aed' : '#64748b', background: n === 'Schedule' ? '#f5f3ff' : 'transparent' }}>{n}</div>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', flex: 1, maxWidth: 240, display: 'flex', alignItems: 'center', gap: 7, background: query ? '#faf8ff' : '#f4f6f9', border: `1px solid ${query ? '#c4b5fd' : '#e2e8f0'}`, borderRadius: 8, padding: '5px 10px', boxShadow: query ? '0 0 0 2px rgba(124,58,237,0.08)' : 'none', transition: 'all 0.25s' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={query ? '#7c3aed' : '#94a3b8'} strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span style={{ fontSize: 10, fontWeight: 500, color: '#1e293b', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {query ? <>{query}<span style={{ display: 'inline-block', width: 1.5, height: 11, background: '#7c3aed', borderRadius: 1, marginLeft: 1, verticalAlign: 'middle', animation: 'hblink 1s infinite' }} /></> : <span style={{ color: '#94a3b8' }}>Ask AI…</span>}
            </span>
          </div>
          <div style={{ padding: '5px 10px', borderRadius: 7, background: '#7c3aed', color: 'white', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, boxShadow: '0 2px 6px rgba(124,58,237,0.35)', animation: phase === 'idle' && !query ? 'hpulse 2.5s ease infinite' : 'none' }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Build
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

          {/* Sidebar */}
          <div style={{ width: 130, borderRight: '1px solid #edf0f4', background: '#fafbfc', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <div style={{ padding: '8px 8px 4px' }}>
              <div style={{ fontSize: 8, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {phase === 'idle' ? 'Students' : 'Queue'}
              </div>
              {phase !== 'idle' && (
                <div style={{ marginTop: 4, height: 2, borderRadius: 1, background: '#e8ecf0', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #a855f7)', borderRadius: 1, width: `${Math.round((totalPlaced / QUEUE.length) * 100)}%`, transition: 'width 0.4s ease' }} />
                </div>
              )}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '2px 6px 8px' }}>
              {QUEUE.map(q => {
                const placed    = placedIds.has(q.id)
                const active    = activeId === q.id
                const confirmed = confirmedIds.has(q.id)
                return (
                  <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 5px', borderRadius: 7, marginBottom: 3, background: active ? 'rgba(124,58,237,0.08)' : 'transparent', border: `1px solid ${active ? '#c4b5fd' : 'transparent'}`, transform: active ? 'scale(1.02)' : 'scale(1)', transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)', opacity: placed && !active ? (confirmed ? 1 : 0.4) : 1 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, background: q.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 800, color: q.color, flexShrink: 0 }}>{q.init}</div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: confirmed ? '#16a34a' : placed ? '#cbd5e1' : '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.name}</div>
                      <div style={{ fontSize: 8, color: confirmed ? '#4ade80' : '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.subject}</div>
                    </div>
                    {confirmed && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3.5" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>}
                    {active && <div style={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>{[0,1,2].map(i => <div key={i} style={{ width: 2.5, height: 2.5, borderRadius: '50%', background: '#7c3aed', animation: `hdot 0.9s ${i*0.18}s infinite` }} />)}</div>}
                  </div>
                )
              })}
            </div>
            {statusLabel && (
              <div style={{ margin: '0 6px 8px', padding: '7px 8px', borderRadius: 7, background: phase === 'done' && confirmedIds.size > 0 ? 'rgba(22,163,74,0.07)' : 'rgba(124,58,237,0.06)', border: `1px solid ${phase === 'done' && confirmedIds.size > 0 ? 'rgba(22,163,74,0.2)' : 'rgba(124,58,237,0.15)'}`, flexShrink: 0 }}>
                {thinking && (
                  <div style={{ display: 'flex', gap: 3, alignItems: 'center', marginBottom: 4 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#7c3aed', opacity: 0.4, animation: `hdot 1s ${i*0.2}s infinite` }} />)}
                  </div>
                )}
                <div style={{ fontSize: 9, fontWeight: 600, color: phase === 'done' && confirmedIds.size > 0 ? '#16a34a' : '#7c3aed', lineHeight: 1.4 }}>{statusLabel}</div>
                {thinking && (
                  <div style={{ marginTop: 5, height: 1.5, borderRadius: 1, background: '#e8ecf0', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #a855f7)', animation: 'hprog 1.4s ease infinite' }} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Grid area */}
          <div style={{ flex: 1, overflow: 'auto', padding: '8px 10px', position: 'relative' }}>
            <ContactCard visible={overlay === 'contact'} />
            <HistoryCard  visible={overlay === 'history'} />
            <NoShowCard   visible={overlay === 'noshow'}  />

            <div style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#1e293b' }}>Week of Apr 7</div>
              <div style={{ fontSize: 8, fontWeight: 600, color: '#7c3aed', background: '#f5f3ff', padding: '1px 6px', borderRadius: 4 }}>Next Week</div>
              {confirmedIds.size > 0 && <div style={{ fontSize: 8, fontWeight: 700, color: '#16a34a', background: '#f0fdf4', padding: '1px 6px', borderRadius: 4 }}>✓ {QUEUE.length} booked</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '36px repeat(5, 1fr)', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid #cbd5e1', background: '#dde3eb' }}>
              <div style={{ background: '#f4f6f9', padding: '5px 3px', borderBottom: '1px solid #dde3eb' }} />
              {DAYS.map(d => (
                <div key={d} style={{ background: '#f4f6f9', borderBottom: '1px solid #dde3eb', borderLeft: '1px solid #dde3eb', padding: '4px 5px' }}>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#334155' }}>{d}</div>
                </div>
              ))}
              {TUTORS.map(tutor => (
                <React.Fragment key={tutor.id}>
                  <div style={{ gridColumn: '1 / -1', background: '#f8f9fc', borderTop: '1px solid #dde3eb', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: tutor.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 6, fontWeight: 800, color: tutor.color }}>{tutor.name.charAt(0)}</div>
                    <span style={{ fontSize: 8, fontWeight: 700, color: '#374155' }}>{tutor.name}</span>
                  </div>
                  {BLOCKS.map(block => (
                    <React.Fragment key={`${tutor.id}-${block}`}>
                      <div style={{ background: 'white', borderTop: '1px solid #f0f2f5', borderRight: '1px solid #dde3eb', padding: '3px 2px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                        <span style={{ fontSize: 6, color: '#94a3b8', fontWeight: 600 }}>{block}</span>
                      </div>
                      {DAYS.map(day => {
                        const k = ckey(tutor.id, block, day)
                        const cells = [...(EXISTING[k] ?? []), ...(extras[k] ?? [])]
                        const isHighlighted = highlightKey === k
                        const isFull = cells.length >= 3
                        return (
                          <div key={`c-${k}`} style={{ background: isHighlighted ? 'rgba(124,58,237,0.05)' : 'white', borderTop: '1px solid #f0f2f5', borderLeft: '1px solid #dde3eb', padding: 2, minHeight: 40, transition: 'background 0.2s', outline: isHighlighted ? '1.5px solid rgba(124,58,237,0.4)' : 'none', outlineOffset: -1, position: 'relative' }}>
                            {cells.map((st, idx) => {
                              const extra  = (extras[k] ?? []).find(e => e.name === st.name)
                              const isNew  = !!extra
                              const isConf = extra && confirmedIds.has(extra.studentId)
                              return (
                                <div key={idx} style={{ borderRadius: 3, padding: '1.5px 3px', marginBottom: 1.5, background: isConf ? '#f0fdf4' : isNew ? `${st.color}18` : `${st.color}12`, border: `1px solid ${isConf ? '#86efac' : isNew ? st.color + '55' : st.color + '28'}`, animation: isNew && !isConf ? 'hpop 0.35s cubic-bezier(0.34,1.56,0.64,1)' : 'none' }}>
                                  <div style={{ fontSize: 6, fontWeight: 700, color: isConf ? '#16a34a' : st.color, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{st.name}</div>
                                  <div style={{ fontSize: 5.5, color: isConf ? '#4ade80' : st.color + 'bb', whiteSpace: 'nowrap' }}>{st.subject}</div>
                                </div>
                              )
                            })}
                            {isFull && !isHighlighted && cells.length === 3 && <div style={{ position: 'absolute', top: 1, right: 2, fontSize: 5, fontWeight: 700, color: '#94a3b8' }}>Full</div>}
                            {isHighlighted && !isFull && <div style={{ position: 'absolute', bottom: 2, right: 2, fontSize: 5.5, fontWeight: 700, color: '#7c3aed' }}>{3 - cells.length} open</div>}
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
  )
}

// ── Hero page ─────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="relative bg-white min-h-screen pt-18 flex flex-col justify-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.14),transparent_45%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.12),transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-5 sm:py-6 md:py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 sm:gap-8 lg:gap-10 items-center lg:min-h-[calc(100vh-132px)]">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 sm:space-y-6 lg:space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center bg-black text-white px-4 py-2 text-xs font-medium uppercase tracking-wider"
              >
                The tutoring operations copilot
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-tight"
              >
                A centralized platform that connects fragmented tutoring workflows.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed"
              >
                Centers often run on fragmented, unreliable systems with repetitive manual work and frequent logging mistakes. Thetix unifies scheduling, attendance, reminders, communication, and history into one operating layer, with AI autoscheduling that optimizes tutor match, availability, capacity, and time constraints.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm text-gray-500 font-medium"
              >
                Built for one center, many centers, franchise networks, and enterprise teams that need one operating standard.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col gap-4"
              >
                <Button
                  asChild
                  className="bg-black text-white font-medium px-8 py-3 hover:bg-gray-800 transition-colors w-fit"
                >
                  <Link href="/book-demo" onClick={() => trackEvent("hero_cta_click")}>
                    Book Demo
                  </Link>
                </Button>
                <p className="text-xs text-gray-400">See a live walkthrough tailored to your centers.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-2 sm:gap-3"
              >
                {[
                  "Connect fragmented operational workflows",
                  "Replace repetitive manual record keeping",
                  "Constraint-aware AI autoscheduling",
                  "Reliable tracking and student history",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border border-gray-200">
                    <CheckCircle2 size={12} className="text-black" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — simulation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex items-center justify-center lg:justify-end w-full"
              style={{ height: 500 }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 60% 50%, rgba(124,58,237,0.1), transparent 70%)',
                  filter: 'blur(30px)',
                  transform: 'scale(1.15)',
                }}
              />
              <div className="relative w-full h-full">
                <HeroDemo />
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </>
  );
}