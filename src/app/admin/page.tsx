'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/Admin/AdminDashboard';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken'); // check if admin is logged in
    if (!token) {
      router.replace('/admin/login'); // redirect to login if not
    }
  }, [router]);

  return <AdminDashboard />;
}
