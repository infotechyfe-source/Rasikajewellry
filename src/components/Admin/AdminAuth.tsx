'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

export default function AdminAuth({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login'); // redirect to login
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p className="p-6 text-center">Checking admin access...</p>;

  return <>{children}</>;
}
