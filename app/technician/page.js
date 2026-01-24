"use client";

import React, { useState } from 'react';
import { Wrench, Package, CheckCircle, ArrowRight, Search, Clock } from 'lucide-react';

export default function TechnicianPage() {
  // 1. Mock Data (Prisma se aane wala data)
  const [tickets, setTickets] = useState([
    { id: 'TK-101', model: 'MacBook Pro 14"', serial: 'SN-99281', status: 'IN_TRANSIT', issue: 'Screen Flickering' },
    { id: 'TK-104', model: 'Dell XPS 15', serial: 'SN-11022', status: 'REPAIRING', issue: 'Battery Swelling' },
    { id: 'TK-105', model: 'HP Spectre x360', serial: 'SN-44301', status: 'WAITING_FOR_PARTS', issue: 'Keyboard Ghosting' },
  ]);

  // 2. Pipeline Logic (Strict Status Transitions)
  const handleStatusUpdate = (id, nextStatus) => {
    setTickets(tickets.map(t => 
      t.id === id ? { ...t, status: nextStatus } : t
    ));
    // Yahan aap apna API call (fetch/axios) laga sakte hain database update karne ke liye
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-10">
      {/* --- Navbar --- */}
      <nav className="bg-white border-b border-blue-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Wrench size={20} />
          </div>
          <h1 className="text-xl font-bold text-blue-900 italic">WarrantyVault <span className="text-blue-500 not-italic">Tech</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none">Alex Rivera</p>
            <p className="text-[10px] text-slate-400">Senior Technician</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">AR</div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800">Assigned Tasks</h2>
            <p className="text-slate-500 italic">Items currently in the repair pipeline</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Serial Number..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 bg-white"
            />
          </div>
        </div>

        {/* --- Work Table --- */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Device Details</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Reported Issue</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400 text-center">Current Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-blue-50/30 transition-all">
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-900">{ticket.model}</div>
                    <div className="text-xs font-mono text-slate-400">{ticket.serial}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">
                    {ticket.issue}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <ActionButtons 
                        status={ticket.status} 
                        onUpdate={(next) => handleStatusUpdate(ticket.id, next)} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// --- Status Badge Component ---
function StatusBadge({ status }) {
  const styles = {
    IN_TRANSIT: "bg-blue-100 text-blue-600 border-blue-200",
    REPAIRING: "bg-indigo-100 text-indigo-600 border-indigo-200",
    WAITING_FOR_PARTS: "bg-amber-100 text-amber-600 border-amber-200",
    FIXED: "bg-emerald-100 text-emerald-600 border-emerald-200",
  };

  const labels = {
    IN_TRANSIT: "In Transit",
    REPAIRING: "Repairing",
    WAITING_FOR_PARTS: "On Hold",
    FIXED: "Fixed",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

// --- Action Logic Component ---
function ActionButtons({ status, onUpdate }) {
  if (status === 'IN_TRANSIT') {
    return (
      <button 
        onClick={() => onUpdate('REPAIRING')}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
      >
        <Package size={14} /> Receive Item
      </button>
    );
  }

  if (status === 'REPAIRING') {
    return (
      <>
        <button 
          onClick={() => onUpdate('FIXED')}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <CheckCircle size={14} /> Complete
        </button>
        <button 
          onClick={() => onUpdate('WAITING_FOR_PARTS')}
          className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg text-xs font-bold"
        >
          Hold
        </button>
      </>
    );
  }

  if (status === 'WAITING_FOR_PARTS') {
    return (
      <button 
        onClick={() => onUpdate('REPAIRING')}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold"
      >
        <ArrowRight size={14} /> Resume Repair
      </button>
    );
  }

  return <span className="text-emerald-500 font-bold text-sm">Task Completed ✓</span>;
}