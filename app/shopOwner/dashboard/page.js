'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Sidebar } from '../../components/Sidebar';
import { SoldItemForm } from '../../components/SoldItemForm';
import { ShoppingBag, User, AlertCircle } from 'lucide-react';

export default function ShopOwnerDashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  if (session?.user?.role !== 'SHOP_OWNER') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <AlertCircle size={48} className="mx-auto text-red-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            Only shop owners can access this dashboard. Your role is: <span className="font-semibold">{session?.user?.role}</span>
          </p>
          <a href="/dashboard" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Top Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-30">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <ShoppingBag className="text-blue-600" size={32} />
              Shop Owner Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, <span className="font-semibold">{session?.user?.name}</span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Sales</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                </div>
                <ShoppingBag size={40} className="text-blue-100" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Items</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                </div>
                <User size={40} className="text-green-100" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Support Tickets</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                </div>
                <AlertCircle size={40} className="text-purple-100" />
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div id="add-sale" className="max-w-3xl">
            <SoldItemForm />
          </div>
        </div>
      </main>
    </div>
  );
}
