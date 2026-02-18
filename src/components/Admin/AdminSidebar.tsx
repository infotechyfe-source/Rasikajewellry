'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FileBox,
  ShoppingCart,
  LogOut,
  X,
  LayoutIcon,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    toast.success("Logout successful!");

    router.replace("/admin/login");
  };


  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Hero-videos", href: "/admin/hero", icon: FileBox },
    { name: "Testimonials", href: "/admin/testimonials", icon: LayoutIcon },
  ];

  return (
    <>
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm h-screen flex flex-col justify-between p-6">

        {/* Top */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-10">
            Rasika Admin
          </h2>

          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive
                      ? "bg-[#8B4513] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-white" : "text-gray-500"}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 px-4 py-3 border rounded-xl text-red-600 hover:bg-red-50 transition cursor-pointer"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* 🔥 Premium Animated Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-96 z-10 animate-scaleIn">

            {/* Close Icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h3>

            <p className="text-gray-500 mb-6">
              Are you sure you want to logout from admin panel?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
