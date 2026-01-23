"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { LucideSearch } from 'lucide-react';
// --- MOCK DATA ---
const STATS = {
  pendingRequests: 5,
  activeRepairs: 12,
  completedToday: 3,
  totalRevenue: "₹1,240"
};

const TECHNICIANS = [
  { id: 'tech1', name: 'Ali Raza' },
  { id: 'tech2', name: 'Sara Khan' },
  { id: 'tech3', name: 'Mike Chen' },
];

const INITIAL_TICKETS = [
  {
    id: "t101",
    customer: "John Doe",
    device: "MacBook Pro M1",
    issue: "Screen flickering",
    date: "2024-01-23",
    status: "PENDING", // Needs approval
    warrantyStatus: "VALID" // System calculated this automatically
  },
  {
    id: "t102",
    customer: "Jane Smith",
    device: "Samsung S24",
    issue: "Charging port loose",
    date: "2024-01-22",
    status: "APPROVED", // Waiting for tech assignment
    assignedTech: null
  },
  {
    id: "t103",
    customer: "Ahmed Khan",
    device: "Dell XPS 15",
    issue: "Blue screen error",
    date: "2024-01-20",
    status: "REPAIRING",
    assignedTech: "Ali Raza"
  }
];

export default function ShopOwnerDashboard() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);

  // --- ACTIONS ---
  const handleApprove = (id) => {
    // In real app: API call to update status
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'APPROVED' } : t));
  };

  const handleAssign = (ticketId, techName) => {
    // In real app: API call to assign tech
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, assignedTech: techName, status: 'REPAIRING' } : t));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-green-100 to-purple-300 font-sans">
      
      {/* 1. TOP NAVIGATION */}
      <nav className="bg-gray-100 rounded-b-2xl shadow-2xl border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="text-xl font-bold text-gray-800">Amanat <span className="text-xs text-gray-500 font-normal uppercase tracking-wider">/ Admin</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Shop ID: SH-8821</span>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        
        {/* 2. ACTION BAR (The "Register Sale" Logic) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 text-sm">Manage warranty claims and shop performance.</p>
          </div>
          <div className="flex gap-3">
            <input className='flex items-center  text-black placeholder:text-gray-500  outline-none gap-2 bg-blue-50 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition'  placeholder=' Lookup Serial'/>

             <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
               + Register New Sale
             </button>
          </div>
        </div>

        {/* 3. STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Pending Approvals", val: STATS.pendingRequests, color: "text-orange-600" },
            { label: "Active Repairs", val: STATS.activeRepairs, color: "text-blue-600" },
            { label: "Completed Today", val: STATS.completedToday, color: "text-green-600" },
            { label: "Total Revenue", val: STATS.totalRevenue, color: "text-gray-800" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{stat.label}</p>
              <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        {/* 4. MAIN WORKFLOW TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Recent Tickets</h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Live Updates</span>
          </div>

          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Ticket ID</th>
                <th className="px-6 py-3">Customer & Device</th>
                <th className="px-6 py-3">Issue</th>
                <th className="px-6 py-3">Warranty</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-xs text-indigo-600 font-bold">#{ticket.id}</td>
                  
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{ticket.customer}</p>
                    <p className="text-xs text-gray-400">{ticket.device}</p>
                  </td>
                  
                  <td className="px-6 py-4 max-w-xs truncate" title={ticket.issue}>
                    {ticket.issue}
                  </td>

                  <td className="px-6 py-4">
                    {ticket.warrantyStatus === 'VALID' ? (
                      <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded text-xs font-semibold">
                        ✅ Valid
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">N/A</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded text-xs font-bold 
                       ${ticket.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : ''}
                       ${ticket.status === 'APPROVED' ? 'bg-blue-100 text-blue-700' : ''}
                       ${ticket.status === 'REPAIRING' ? 'bg-purple-100 text-purple-700' : ''}
                     `}>
                       {ticket.status}
                     </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    {/* LOGIC: Show different buttons based on status */}
                    
                    {ticket.status === 'PENDING' && (
                      <div className="flex justify-end gap-2">
                         <button onClick={() => alert('Rejected')} className="text-red-600 hover:bg-red-50 px-3 py-1 rounded border border-red-200 text-xs">Reject</button>
                         <button onClick={() => handleApprove(ticket.id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs shadow-sm">Approve</button>
                      </div>
                    )}

                    {ticket.status === 'APPROVED' && (
                       <select 
                         className="bg-gray-50 border border-gray-300 text-gray-700 text-xs rounded p-1 focus:ring-indigo-500 focus:border-indigo-500"
                         onChange={(e) => handleAssign(ticket.id, e.target.value)}
                         defaultValue=""
                       >
                         <option value="" disabled>Assign Technician</option>
                         {TECHNICIANS.map(tech => (
                           <option key={tech.id} value={tech.name}>{tech.name}</option>
                         ))}
                       </select>
                    )}

                    {ticket.status === 'REPAIRING' && (
                      <span className="text-xs text-gray-400 italic">With {ticket.assignedTech}</span>
                    )}
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