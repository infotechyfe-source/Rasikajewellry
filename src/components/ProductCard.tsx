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
      className={`group rounded-xl overflow-hidden shadow-lg transition bg-white
        ${!active ? "opacity-90" : "hover:shadow-2xl"}
      `}
      id={`product-${id}`}
    >
      <div className="relative overflow-hidden">
        {/* OUT OF STOCK BADGE */}
        {!active && (
          <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs px-3 py-1 rounded-full tracking-wide">
            OUT OF STOCK
          </div>
        )}

        <Image
          src={image}
          alt={name}
          width={500}
          height={650}
          className={`w-full h-[420px] object-cover transition-transform duration-700
            ${active ? "group-hover:scale-105" : "grayscale"}
          `}
        />

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center gap-4 px-4">
          
          {/* Quantity (only if active) */}
          {active && (
            <div className="flex items-center gap-3 bg-black/60 px-3 py-1 rounded text-white">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          )}

          {/* Order Button */}
          <button
            onClick={handleOrder}
            disabled={!active}
            className={`px-8 py-3 border text-xs tracking-[0.25em] rounded transition
              ${
                active
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-gray-400 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {active ? "ORDER NOW" : "OUT OF STOCK"}
          </button>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="mt-6 text-center px-4 pb-6">
        <h3 className="font-serif text-lg md:text-xl mb-1">{name}</h3>
        <p className="text-[#9c7c3d] text-lg font-medium">
          ₹{totalPrice.toLocaleString()}
        </p>
         {/* Phone input */}
          <input
            type="tel"
            placeholder={active ? "Your phone number" : "Out of stock"}
            value={phone}
            disabled={!active}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full text-sm px-3 py-2 rounded outline-none
              ${!active ? "bg-gray-200 cursor-not-allowed" : ""}
            `}
          />
      </div>
    </div>
  );
}
