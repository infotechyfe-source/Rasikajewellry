// components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { LayoutDashboard, Package } from 'lucide-react';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-6">
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
    </aside>
  );
}