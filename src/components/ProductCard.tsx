'use client';

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
  const [phone, setPhone] = useState("");

  const totalPrice =
    typeof price === "string"
      ? parseInt(price) * quantity
      : price * quantity;

  const productLink = `https://yourdomain.com/shop?category=${encodeURIComponent(
    category
  )}#product-${id}`;

  const whatsappMessage = `Hello, I want to order jewellery:

Name: ${name}
Price: ₹${totalPrice}
Quantity: ${quantity}
Phone: ${phone}
Product Link: ${productLink}`;

  const handleOrder = async () => {
    // ⛔ Block order if out of stock
    if (!active) return;

    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: name,
          amount: totalPrice,
          phone,
        }),
      });

      if (!res.ok) throw new Error("Order save failed");

      const savedOrder = await res.json();

      // Update parent immediately
      onOrderPlaced?.(savedOrder);

      // Open WhatsApp AFTER saving
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank"
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      id={`product-${id}`}
      className={`group transition
      ${!active ? "opacity-80" : ""}
    `}
    >
      {/* IMAGE WRAPPER */}
      <div className="relative bg-[#eae6df] p-6 overflow-hidden">

        {/* OUT OF STOCK */}
        {!active && (
          <div className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] px-3 py-1 tracking-widest">
            OUT OF STOCK
          </div>
        )}

        <Image
          src={image}
          alt={name}
          width={500}
          height={650}
          className={`mx-auto h-[320px] object-contain transition-transform duration-700
          ${active ? "group-hover:scale-105" : "grayscale"}
        `}
        />

        {/* HOVER ACTION */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-4
        bg-white/70 opacity-0 group-hover:opacity-100 transition`}
        >
          {active && (
            <div className="flex items-center gap-4 text-sm border px-4 py-1">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          )}

          <button
            onClick={handleOrder}
            disabled={!active}
            className={`px-8 py-3 text-[11px] tracking-[0.3em] uppercase border transition
            ${active
                ? "border-black hover:bg-black hover:text-white"
                : "border-gray-400 text-gray-400 cursor-not-allowed"
              }
          `}
          >
            {active ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="mt-4 text-center">
        <h3 className="font-serif text-sm tracking-wide">{name}</h3>

        <p className="mt-1 text-sm text-gray-600">
          ₹ {totalPrice.toLocaleString()}
        </p>

        {/* PHONE INPUT */}
        <input
          type="tel"
          placeholder={active ? "Enter phone number" : "Out of stock"}
          value={phone}
          disabled={!active}
          onChange={(e) => setPhone(e.target.value)}
          className={`mt-3 w-full border px-3 py-2 text-xs outline-none
          ${!active ? "bg-gray-100 cursor-not-allowed" : "focus:border-black"}
        `}
        />
      </div>
    </div>
  );

}
