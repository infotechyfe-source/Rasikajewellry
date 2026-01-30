'use client';

import { useEffect, useState } from 'react';
import { products } from '@/data/products';
import { Package, ShoppingCart, DollarSign, RefreshCw } from 'lucide-react';

type Order = {
  id: number;
  product: string;
  amount: number;
  date: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  const stats = [
    { title: 'Total Products', value: totalProducts, icon: <Package className="w-8 h-8 text-white" />, bg: 'bg-teal-500' },
    { title: 'Orders', value: totalOrders, icon: <ShoppingCart className="w-8 h-8 text-white" />, bg: 'bg-blue-500' },
    { title: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: <DollarSign className="w-8 h-8 text-white" />, bg: 'bg-yellow-500' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome to Jewelry Admin Panel</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
        >
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className={`${stat.bg} p-4 rounded-full mr-4 flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <h2 className="text-gray-500 font-semibold">{stat.title}</h2>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Recent Orders</h2>

        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Product</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Price</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-center text-gray-400">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-center text-gray-400">
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.slice(-5).reverse().map(order => (
                  <tr key={order.id}>
                    <td className="px-4 py-2">{order.product}</td>
                    <td className="px-4 py-2">₹{order.amount}</td>
                    <td className="px-4 py-2">{new Date(order.date).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
