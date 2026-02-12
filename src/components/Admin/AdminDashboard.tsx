'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, DollarSign, RefreshCw } from 'lucide-react';

type Order = {
  _id: string;
  product?: {
    _id: string;
    name?: string;
    category?: string;
    type?: string;
    price?: number;
    image?: string;
  };
  quantity?: number;
  totalPrice?: number;
  customer?: {
    name?: string;
    phone?: string;
    address?: string;
  };
  status: string;
  createdAt: string;
};

const statusOptions = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      setUpdatingId(id);

      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        fetchOrders();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status === filter);

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    processing: "bg-purple-100 text-purple-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const stats = [
    {
      title: 'Orders',
      value: totalOrders,
      icon: <ShoppingCart className="w-8 h-8 text-white" />,
      bg: 'bg-blue-500',
    },
    {
      title: 'Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-8 h-8 text-white" />,
      bg: 'bg-yellow-500',
    },
  ];

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome to Jewelry Admin Panel
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
        >
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center p-6 bg-white rounded-xl shadow"
          >
            <div className={`${stat.bg} p-4 rounded-full mr-4`}>
              {stat.icon}
            </div>
            <div>
              <h2 className="text-gray-500 font-semibold">
                {stat.title}
              </h2>
              <p className="text-2xl font-bold text-gray-800">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", ...statusOptions].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm capitalize ${
              filter === status
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Product
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Total
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Change
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  Loading orders...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders
                .slice()
                .reverse()
                .map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-3">
                      {order.product?.name || "Deleted Product"}
                    </td>

                    <td className="px-4 py-3">
                      {order.customer?.name || "N/A"}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      ₹{(order.totalPrice || 0).toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs capitalize ${
                          statusColors[order.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

