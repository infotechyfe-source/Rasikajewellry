"use client";

import Image from "next/image";
import { useState } from "react";

type Product = {
  _id: string; // ✅ MongoDB ID
  name: string;
  price: number;
  image: string;
  category: string;
  type: string;
  active: boolean;
};

const WHATSAPP_NUMBER = "919120797254";

export function ProductCard({
  _id,
  name,
  price,
  image,
  category,
  type,
  active,
}: Product) {
  const [open, setOpen] = useState(false);

  const handleOrderSubmit = async (form: {
    customerName: string;
    phone: string;
    address: string;
    quantity: number;
  }) => {
    try {
      const totalPrice = price * form.quantity;

      // ✅ Save Order in MongoDB
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: {
            _id,
            name,
            category,
            type,
            price,
            image,
          },
          quantity: form.quantity,
          totalPrice,
          customer: {
            name: form.customerName,
            phone: form.phone,
            address: form.address,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to save order");
        return;
      }

      // ✅ Open WhatsApp After Saving
      const message = `
New Jewellery Order ✨

Product: ${name}
Category: ${category}
Type: ${type}
Price: ₹${price}
Quantity: ${form.quantity}
Total: ₹${totalPrice}

Customer Name: ${form.customerName}
Phone: ${form.phone}
Address: ${form.address}

Order ID: ${data.orderId}
      `;

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      setOpen(false);
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      {/* PRODUCT CARD */}
      <div
        className={`bg-white rounded-lg overflow-hidden transition
          ${active ? "hover:shadow-lg" : "opacity-70"}
        `}
      >
        <div className="relative aspect-[3/4] bg-[#efece6]">
          {!active && (
            <div className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] px-3 py-1 tracking-widest">
              OUT OF STOCK
            </div>
          )}

          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500
              ${active ? "hover:scale-105" : "grayscale"}
            `}
            sizes="(max-width:768px) 50vw, 25vw"
          />
        </div>

        <div className="p-2 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-sm tracking-wide truncate">
              {name}
            </h3>

            <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
              ₹ {price.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => active && setOpen(true)}
            disabled={!active}
            className={`w-full py-2 text-[11px]
              tracking-[0.3em] uppercase transition-all duration-300
              ${active
                ? "text-[#8B4513] bg-white hover:bg-[#8B4513] hover:text-white border border-[#8B4513]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Order Now
          </button>
        </div>
      </div>

      {open && (
        <OrderModal
          productName={name}
          basePrice={price}
          onClose={() => setOpen(false)}
          onSubmit={handleOrderSubmit}
        />
      )}
    </>
  );
}

/* ================= MODAL ================= */

function OrderModal({
  productName,
  basePrice,
  onClose,
  onSubmit,
}: {
  productName: string;
  basePrice: number;
  onClose: () => void;
  onSubmit: (data: {
    customerName: string;
    phone: string;
    address: string;
    quantity: number;
  }) => void;
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  const totalPrice = basePrice * form.quantity;

  const handleSubmit = async () => {
    if (!form.customerName || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 relative rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl"
        >
          ×
        </button>

        <h3 className="font-serif text-2xl mb-1 text-center">
          Complete Your Order
        </h3>

        <p className="text-center text-sm text-gray-500 mb-6">
          {productName} · ₹{totalPrice.toLocaleString()}
        </p>

        <div className="flex justify-center mb-6">
          <div className="flex items-center rounded-full border border-black/20 overflow-hidden">
            <button
              onClick={() =>
                setForm(f => ({
                  ...f,
                  quantity: Math.max(1, f.quantity - 1),
                }))
              }
              className="w-10 h-10 flex items-center justify-center"
            >
              −
            </button>

            <span className="w-10 text-center font-medium">
              {form.quantity}
            </span>

            <button
              onClick={() =>
                setForm(f => ({
                  ...f,
                  quantity: f.quantity + 1,
                }))
              }
              className="w-10 h-10 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full border px-4 py-3 text-sm"
            onChange={(e) =>
              setForm({ ...form, customerName: e.target.value })
            }
          />
          <input
            placeholder="Phone Number"
            className="w-full border px-4 py-3 text-sm"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
          <textarea
            placeholder="Delivery Address"
            rows={3}
            className="w-full border px-4 py-3 text-sm"
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-black text-white py-3 tracking-widest text-sm disabled:opacity-50"
        >
          {loading ? "SAVING ORDER..." : "CONTINUE TO WHATSAPP"}
        </button>
      </div>
    </div>
  );
}
