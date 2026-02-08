'use client';

import React from "react";
import { Users, CheckCircle2, Circle, AlertTriangle, User, PlusCircle, Search, ChevronRight } from "lucide-react";

export function HeroDemo() {
  const timeSlots = ["14:00", "15:00", "16:00", "17:00", "18:00"];
  
  const tutors = [
    { 
      name: "Sarah Jenkins", role: "Sr. Lead",
      schedule: [
        { time: "14:00", students: [{ name: "James M.", topic: "Calculus", present: true }, { name: "Ava R.", topic: "AP Physics", present: true }], status: "active" },
        { time: "15:00", students: [{ name: "James M.", topic: "Calculus", present: true }], status: "active" },
        { time: "16:00", students: [], status: "open" },
        { time: "17:00", students: [], status: "conflict", msg: "Room Overlap" },
        { time: "18:00", students: [{ name: "Noah W.", topic: "SAT Math", present: false }], status: "active" },
      ] 
    },
    { 
      name: "Kevin Vance", role: "Instructor",
      schedule: [
        { time: "14:00", students: [], status: "open" },
        { time: "15:00", students: [{ name: "Sophia W.", topic: "Chemistry", present: true }, { name: "Jack D.", topic: "Chemistry", present: true }], status: "active" },
        { time: "16:00", students: [{ name: "Sophia W.", topic: "Chemistry", present: true }, { name: "Jack D.", topic: "Chemistry", present: true }, { name: "Emma L.", topic: "Biology", present: true }], status: "full" },
        { time: "17:00", students: [{ name: "Leo T.", topic: "Geometry", present: false }], status: "active" },
        { time: "18:00", students: [], status: "open" },
      ] 
    },
    { 
      name: "Maria Lopez", role: "Instructor",
      schedule: [
        { time: "14:00", students: [{ name: "Liam K.", topic: "ESL Lvl 2", present: true }], status: "active" },
        { time: "15:00", students: [{ name: "Liam K.", topic: "ESL Lvl 2", present: true }, { name: "Mia S.", topic: "Grammar", present: true }], status: "active" },
        { time: "16:00", students: [], status: "open" },
        { time: "17:00", students: [], status: "open" },
        { time: "18:00", students: [{ name: "Zoe P.", topic: "Creative Writing", present: true }], status: "active" },
      ] 
    }
  ];

  return (
    <div className="w-full bg-white text-slate-900 border border-slate-200 rounded-xl shadow-2xl overflow-hidden">
      
      {/* ACTION BAR - Responsive Padding */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-4 md:px-6 bg-white border-b border-slate-200 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Master Deployment</h2>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              readOnly 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:w-48 focus:outline-none"
            />
          </div>
          <button className="bg-emerald-600 text-white p-2 rounded-lg md:px-4 md:py-2 md:text-xs font-bold shadow-sm">
            <PlusCircle size={16} className="md:hidden" />
            <span className="hidden md:inline">Assign Student</span>
          </button>
        </div>
      </div>

      {/* MOBILE VIEW (HIDDEN ON DESKTOP) */}
      <div className="block md:hidden">
        {tutors.map((tutor, tIdx) => (
          <div key={tIdx} className="border-b border-slate-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{tutor.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">{tutor.role}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </div>
            
            {/* Horizontal Swipe for Mobile Schedule */}
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
              {tutor.schedule.map((slot, sIdx) => (
                <div key={sIdx} className="min-w-[140px] snap-start">
                  <p className="text-[9px] font-bold text-slate-400 mb-1">{slot.time}</p>
                  <div className={`h-24 rounded-lg border p-2 flex flex-col justify-between ${
                    slot.status === 'open' ? 'border-dashed border-slate-200 bg-slate-50' : 
                    slot.status === 'conflict' ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-white shadow-sm'
                  }`}>
                    {slot.status === 'active' || slot.status === 'full' ? (
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-bold truncate">{slot.students[0]?.name}</p>
                        <p className="text-[8px] text-slate-500 truncate">{slot.students[0]?.topic}</p>
                        {slot.students.length > 1 && (
                          <p className="text-[7px] mt-1 font-bold text-emerald-600">+{slot.students.length - 1} more</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        {slot.status === 'open' ? <PlusCircle size={14} className="text-slate-300" /> : <AlertTriangle size={14} className="text-rose-400" />}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW (HIDDEN ON MOBILE) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse table-fixed min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase">
              <th className="w-[200px] p-4 text-left border-r border-slate-200">Tutor Profile</th>
              {timeSlots.map(time => <th key={time} className="p-4 text-center border-r border-slate-200 last:border-r-0">{time}</th>)}
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor, tIdx) => (
              <tr key={tIdx} className="border-b border-slate-200 last:border-b-0 group">
                <td className="p-4 border-r border-slate-200 bg-white align-top">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors"><User size={18} /></div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800 leading-none mb-1">{tutor.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{tutor.role}</p>
                    </div>
                  </div>
                </td>
                {tutor.schedule.map((slot, sIdx) => (
                  <td key={sIdx} className="p-2 border-r border-slate-100 last:border-r-0 align-top h-[150px]">
                    <div className="h-full flex flex-col gap-2">
                      {slot.status === 'open' ? (
                        <button className="flex-1 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-slate-100 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/50 transition-all text-slate-300 hover:text-emerald-600">
                          <PlusCircle size={16} /><span className="text-[8px] font-bold uppercase tracking-widest">Assign</span>
                        </button>
                      ) : slot.status === 'conflict' ? (
                        <div className="flex-1 bg-rose-50 border border-rose-200 rounded-xl p-3 flex flex-col items-center justify-center gap-1 text-rose-600">
                          <AlertTriangle size={16} className="animate-pulse" />
                          <p className="text-[8px] font-black uppercase text-center">{slot.msg}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          {slot.students.map((st, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm hover:border-emerald-500 transition-all cursor-pointer relative overflow-hidden">
                              <div className={`absolute left-0 top-0 bottom-0 w-1 ${st.present ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                              <div className="flex items-center justify-between mb-1 ml-1">
                                <span className={`text-[7px] font-black px-1 rounded ${st.present ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                                  {st.present ? 'ACTIVE' : 'PENDING'}
                                </span>
                                {st.present && <CheckCircle2 size={8} className="text-emerald-500" />}
                              </div>
                              <p className="text-[10px] font-bold text-slate-800 ml-1 leading-none">{st.name}</p>
                              <p className="text-[8px] text-slate-400 ml-1 italic truncate">{st.topic}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}