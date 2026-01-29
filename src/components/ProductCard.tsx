"use client";
import Image from "next/image";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number | string;
  metal: string;
  image: string;
  category: string;
};

const WHATSAPP_NUMBER = "919120797254";

export function ProductCard({ id, name, price, metal, image, category }: Product) {
  const [quantity, setQuantity] = useState(1);

  const safeCategory = category || "general";
  const safeId = id || 0;
  const totalPrice = typeof price === "string" ? parseInt(price) * quantity : price * quantity;

  const productLink = `https://yourdomain.com/shop?category=${encodeURIComponent(safeCategory)}#product-${safeId}`;

  const whatsappMessage = `Hello, I am interested in this jewellery:%0A%0AName: ${name}%0AMetal: ${metal || 'Jewellery'}%0APrice: ₹${totalPrice}%0AQuantity: ${quantity}%0AProduct Link: ${productLink}`;

  return (
    <div className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white" id={`product-${safeId}`}>

      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={500}
          height={650}
          className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center gap-4">

          <div className="flex items-center gap-3 bg-black/40 px-3 py-1 rounded text-white">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-black/70 rounded hover:bg-black transition"
            >-</button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="px-3 py-1 bg-black/70 rounded hover:bg-black transition"
            >+</button>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            className="px-8 py-3 border border-white text-white text-xs tracking-[0.25em] hover:bg-white hover:text-black transition rounded"
          >
            ORDER NOW
          </a>
        </div>
      </div>

      <div className="mt-6 text-center px-4 pb-6">
        <h3 className="font-serif text-lg md:text-xl mb-1">{name}</h3>
        <p className="text-[11px] tracking-widest uppercase text-gray-500 mb-2">{metal || 'Jewellery'} Jewellery</p>
        <p className="text-[#9c7c3d] text-lg font-medium">₹{totalPrice.toLocaleString()}</p>
      </div>
    </div>
  );
}
