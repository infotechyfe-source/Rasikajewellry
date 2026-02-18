'use client';

import { useEffect, useState } from "react";
import { ShoppingCart, DollarSign, Package } from "lucide-react";

interface Order {
  id: string;
  total_price: number;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
  // Fetch Orders
  fetch("/api/orders")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setOrders(data.orders || []);
      }
    });

  // Fetch Products
  fetch("/api/products")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setProductCount(data.products.length); //  fixed
      }
    });
}, []);


  // Calculate revenue using new column name
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total_price || 0),
    0
  );

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      bg: "bg-blue-600",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-6 h-6 text-white" />,
      bg: "bg-green-600",
    },
    {
      title: "Products",
      value: productCount,
      icon: <Package className="w-6 h-6 text-white" />,
      bg: "bg-purple-600",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
            </div>
            <div className={`${stat.bg} p-3 rounded-full`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
