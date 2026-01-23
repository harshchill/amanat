'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, LogOut, Home, Plus, Package, Settings } from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const role = session?.user?.role;

  const menuItems = {
    SHOP_OWNER: [
      { label: 'Dashboard', href: '/shopOwner/dashboard', icon: Home },
      { label: 'New Sale', href: '/shopOwner/dashboard#add-sale', icon: Plus },
      { label: 'My Sales', href: '/shopOwner/sales', icon: Package },
      { label: 'Settings', href: '/shopOwner/settings', icon: Settings },
    ],
    SERVICE_CENTER: [
      { label: 'Dashboard', href: '/service/dashboard', icon: Home },
      { label: 'Tickets', href: '/service/tickets', icon: Package },
      { label: 'Settings', href: '/service/settings', icon: Settings },
    ],
    CUSTOMER: [
      { label: 'Dashboard', href: '/dashboard', icon: Home },
      { label: 'My Items', href: '/dashboard/items', icon: Package },
      { label: 'My Tickets', href: '/dashboard/tickets', icon: Package },
    ],
  };

  const currentMenuItems = menuItems[role] || menuItems.CUSTOMER;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-40`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-bold">Amanat</h1>
          <p className="text-sm text-blue-200 mt-1">{role}</p>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {currentMenuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-blue-100 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <IconComponent size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
