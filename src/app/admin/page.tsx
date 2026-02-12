import AdminAuth from '@/components/Admin/AdminAuth';
import AdminDashboard from '@/components/Admin/AdminDashboard';

export default function AdminPage() {
  return (
    <AdminAuth>
      <AdminDashboard />
    </AdminAuth>
  );
}
