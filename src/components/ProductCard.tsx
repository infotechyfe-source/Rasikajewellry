"use client";

import Image from "next/image";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number | string;
  image: string;
  category: string;
  active: boolean;
};

type Order = {
  id: number;
  product: string;
  amount: number;
  phone: string;
  date: string;
};

type ProductCardProps = Product & {
  onOrderPlaced?: (newOrder: Order) => void;
};

const WHATSAPP_NUMBER = "919120797254";

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  active,
  onOrderPlaced,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const totalPrice =
    typeof price === "string"
      ? parseInt(price) * quantity
      : price * quantity;

  /* ================= ORDER SUBMIT ================= */
  const handleOrderSubmit = async (form: {
    customerName: string;
    phone: string;
    address: string;
  }) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: name,
          amount: totalPrice,
          phone: form.phone,
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      const savedOrder = await res.json();
      onOrderPlaced?.(savedOrder);

      const message = `
New Jewellery Order ✨

Product: ${name}
Quantity: ${quantity}
Total Price: ₹${totalPrice}

Customer Name: ${form.customerName}
Phone: ${form.phone}
Address: ${form.address}
      `;

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* ================= PRODUCT CARD ================= */}
      <div
        id={`product-${id}`}
        className={`group transition-all duration-300
          ${!active ? "opacity-70" : "hover:-translate-y-1"}
        `}
      >
        {/* IMAGE */}
        <div className="relative h-[420px] bg-[#efece6] overflow-hidden rounded-sm shadow-sm">
          {!active && (
            <div className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] px-3 py-1 tracking-widest">
              OUT OF STOCK
            </div>
          )}

          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-700
              ${active ? "group-hover:scale-110" : "grayscale"}
            `}
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>

        {/* INFO */}
        <div className="mt-5 text-center px-2">
          <h3 className="font-serif text-[15px] tracking-wide">
            {name}
          </h3>

          <p className="mt-1 text-sm text-gray-700">
            ₹ {totalPrice.toLocaleString()}
          </p>

          {/* ORDER NOW */}
          <button
            onClick={() => setOpen(true)}
            disabled={!active}
            className={`mt-4 w-full py-3 text-[11px] tracking-[0.35em] uppercase border transition cursor-pointer
              ${active
                ? "border-[#8B4513] bg-[#8B4513] text-white hover:text-[#e6c36a]"
                : "border-gray-300 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Order Now
          </button>

          {/* QUANTITY */}
          {active && (
            <div className="mt-4 flex items-center justify-center gap-6 text-sm border py-2 cursor-pointer">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= ORDER MODAL ================= */}
      {open && (
        <OrderModal
          productName={name}
          totalPrice={totalPrice}
          onClose={() => setOpen(false)}
          onSubmit={handleOrderSubmit}
        />
      )}
    </>
  );
}

/* ================= MODAL COMPONENT ================= */

function OrderModal({
  productName,
  totalPrice,
  onClose,
  onSubmit,
}: {
  productName: string;
  totalPrice: number;
  onClose: () => void;
  onSubmit: (data: {
    customerName: string;
    phone: string;
    address: string;
  }) => void;
}) {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl"
        >
          ×
        </button>

        <h3 className="font-serif text-2xl mb-2 text-center">
          Complete Your Order
        </h3>

        <p className="text-center text-sm text-gray-500 mb-6">
          {productName} · ₹{totalPrice.toLocaleString()}
        </p>

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
          onClick={() => onSubmit(form)}
          className="mt-6 w-full bg-black text-white py-3 tracking-widest text-sm"
        >
          CONTINUE TO WHATSAPP
        </button>
      </div>
    </div>
  );
}
