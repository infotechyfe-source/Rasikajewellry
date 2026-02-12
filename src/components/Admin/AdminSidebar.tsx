// components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Package, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear admin token from localStorage
    localStorage.removeItem('adminToken');
    router.push('/admin/login'); // redirect to login page
  };

  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between h-screen">
      <div>
        <h2 className="text-xl font-bold mb-8">Rasika Admin</h2>

        <nav className="space-y-3">
          <Link
            href="/admin"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
          >
            <Package size={18} /> Products
          </Link>
        </nav>
      </div>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-100 text-red-600 mt-6"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
