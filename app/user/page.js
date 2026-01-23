import React from 'react';
import Link from 'next/link';




// --- MOCK DATA (Replace this with database fetch later) ---
const CURRENT_USER = {
  name: "Alex Johnson",
  email: "alex@example.com"
};

const MY_DEVICES = [
  {
    id: "1",
    productName: "MacBook Pro M3",
    serialNumber: "MBP-2024-X99",
    purchaseDate: "2023-11-15",
    image: "💻", 
    // Logic: If ticket exists, show status. If null, show "No Issues"
    activeTicket: { 
      id: "t1", 
      status: "REPAIRING", 
      lastUpdate: "Technician is replacing the screen." 
    }
  },
  {
    id: "2",
    productName: "Sony WH-1000XM5",
    serialNumber: "SNY-HD-55",
    purchaseDate: "2024-01-10",
    image: "🎧",
    activeTicket: null // No active issues
  },
  {
    id: "3",
    productName: "Dell UltraSharp Monitor",
    serialNumber: "DEL-MON-88",
    purchaseDate: "2021-05-20", 
    image: "🖥️",
    activeTicket: {
      id: "t2",
      status: "COMPLETED",
      lastUpdate: "Ready for pickup at store."
    }
  }
];

// --- HELPER: Get Color Badge based on Status ---
const getStatusBadge = (status) => {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'APPROVED': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'REPAIRING': return 'bg-purple-100 text-purple-800 border-purple-200 animate-pulse';
    case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200';
    case 'REJECTED': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-green-100 to-purple-300 p-6 font-sans">
      {/* 1. HEADER SECTION */}
      <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Welcome, {CURRENT_USER.name} 👋</h1>
          <p className="text-gray-500 mt-1">Here is the status of your registered devices.</p>
        </div>
        <button className="bg-[#3E7FE9] text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition font-medium shadow-sm">
          + Register New Device
        </button>
      </div>

      {/* 2. STATS OVERVIEW */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Total Devices</p>
          <p className="text-2xl font-bold text-gray-900">{MY_DEVICES.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Active Repairs</p>
          <p className="text-2xl font-bold text-orange-600">
            {MY_DEVICES.filter(d => d.activeTicket && d.activeTicket.status !== 'COMPLETED').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Warranty Status</p>
          <p className="text-2xl font-bold text-green-600">All Good</p>
        </div>
      </div>

      {/* 3. DEVICE GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {MY_DEVICES.map((device) => (
          <div key={device.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
            
            {/* Card Header */}
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div className="flex gap-4">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {device.image}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{device.productName}</h3>
                  <p className="text-sm text-gray-400 font-mono">SN: {device.serialNumber}</p>
                </div>
              </div>
              
              {/* Status Pill */}
              {device.activeTicket ? (
                 <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(device.activeTicket.status)}`}>
                   {device.activeTicket.status}
                 </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
                  NO ISSUES
                </span>
              )}
            </div>

            {/* Card Body */}
            <div className="p-6 bg-gray-50/50">
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Purchase Date:</span>
                <span className="font-medium text-gray-700">{device.purchaseDate}</span>
              </div>

              {/* DYNAMIC ACTION AREA */}
              {device.activeTicket ? (
                // CASE A: Active Ticket -> Show Tracking Info
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Latest Update</p>
                  <p className="text-sm text-gray-700 font-medium">"{device.activeTicket.lastUpdate}"</p>
                  <Link href={`/tickets/${device.activeTicket.id}`} className="mt-3 block text-center w-full py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                    View Full Timeline →
                  </Link>
                </div>
              ) : (
                // CASE B: No Ticket -> Show "Report Issue" Button
                <Link href={`/report-issue?device=${device.id}`} className="block w-full text-center py-2 bg-indigo-500 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition">
                  Report an Issue
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}