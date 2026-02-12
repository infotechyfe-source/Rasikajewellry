'use client';

import { useEffect, useState } from 'react';
import {
  RefreshCw,
  Loader2,
  Trash2,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

type Order = {
  _id: string;
  product?: { name?: string };
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

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Order updated");
        fetchOrders();
      } else {
        toast.error("Failed to update");
      }

    } catch {
      toast.error("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteOrder = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`/api/orders/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Order deleted successfully");
        fetchOrders();
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Error deleting order");
    } finally {
      setDeleteId(null);
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status === filter);

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    processing: "bg-purple-100 text-purple-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-500 mt-1">
            Manage customer orders efficiently
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 bg-white shadow px-5 py-2.5 rounded-xl hover:bg-gray-50 transition"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {["all", ...statusOptions].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition font-medium
              ${
                filter === status
                  ? "bg-black text-white shadow"
                  : "bg-white hover:bg-gray-100 border"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Total</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Change</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Delete</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-12">
                  <Loader2 className="animate-spin mx-auto" />
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">
                    {order.product?.name || "Deleted Product"}
                  </td>

                  <td className="px-6 py-4">
                    <div>{order.customer?.name}</div>
                    <div className="text-xs text-gray-500">
                      {order.customer?.phone}
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ₹{(order.totalPrice || 0).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs capitalize font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="border rounded-lg px-3 py-1 text-sm"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => setDeleteId(order._id)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>

                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl animate-scaleIn">
            <h3 className="text-lg font-semibold mb-4">
              Delete Order?
            </h3>
            <p className="text-gray-500 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={deleteOrder}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

