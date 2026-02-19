'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/Admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token'); // ✅ fixed key

    if (!token && pathname !== '/admin/login') {
      router.replace('/admin/login');
    } else if (token) {
      setIsLoggedIn(true);
    }

    setLoading(false);
  }, [pathname, router]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Checking authentication...
      </div>
    );
  }

  // If on login page → no sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not logged in → render nothing (redirect already triggered)
  if (!isLoggedIn) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
