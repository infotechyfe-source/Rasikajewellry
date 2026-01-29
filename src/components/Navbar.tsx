"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, PhoneIcon, Search, X } from "lucide-react";
import { SearchModal } from "@/components/SearchModel";
import { products } from "@/data/products";

const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#f5ebd7] backdrop-blur-md">

      {/* ================= PROMO / TRUST BAR ================= */}
      <div className="hidden md:block bg-[#f6f1e8] border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between text-[11px] tracking-wide text-gray-700">
          <span>Festive Collection Live • Certified Jewellery</span>
          <span className="flex items-center gap-2">
            <PhoneIcon size={13} /> Need help? WhatsApp us
          </span>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <div className="border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between gap-4">

          {/* SEARCH */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-3 px-5 py-2.5 text-sm border border-black/15 rounded hover:border-black transition w-80">
            <Search size={16} className="text-gray-500" />
            <span className="text-gray-600 tracking-wide">
              Search designs, collections…
            </span>
          </button>

          {/* LOGO */}
          <Link href="/" className="text-center select-none">
            <h1 className="font-serif text-3xl tracking-widest text-black">
              RASIKA
            </h1>
            <span className="block text-[10px] tracking-[0.45em] text-[#9c7c3d]">
              STYLE JEWELS
            </span>
          </Link>

          {/* WHATSAPP CTA */}
          <div className="hidden md:flex flex-col items-end">
            <a href="https://wa.me/919999999999"
              target="_blank"
              className="px-7 py-2.5 rounded bg-[#c8a24d] text-xs tracking-widest text-white hover:bg-black transition-all duration-300 shadow-md">
              ORDER ON WHATSAPP
            </a>

          </div>

          {/* MOBILE MENU */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ================= CATEGORY / INTENT MENU ================= */}
      <div className="border-b border-black/5 bg-[#f9f3e7]">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
          <ul
            className="flex gap-8 py-4 text-[11px] tracking-widest uppercase whitespace-nowrap justify-start md:justify-center">
            {uniqueCategories.map(cat => (
              <li key={cat} className="relative group flex-shrink-0">
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.toLowerCase())}`}
                  className="text-gray-700 hover:text-[#9c7c3d] transition font-semibold"
                >
                  {cat}
                </Link>
                <span
                  className="absolute left-0 -bottom-1 h-px w-0 bg-[#c8a24d] group-hover:w-full transition-all duration-300" />
              </li>
            ))}

            {/* Intent-based shortcut */}
            <li className="relative group flex-shrink-0">
              <Link
                href="/shop"
                className="text-gray-700 hover:text-[#9c7c3d] font-semibold"
              >
                Wedding Collection
              </Link>
              <span
                className="absolute left-0 -bottom-1 h-px w-0 bg-[#c8a24d] group-hover:w-full transition-all duration-300"/>
            </li>
          </ul>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="md:hidden bg-[#fffdf9] border-t border-black/10">
          <ul className="flex flex-col px-6 py-6 gap-5 text-sm tracking-wide">
            {uniqueCategories.map(cat => (
              <li key={cat}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.toLowerCase())}`}
                  onClick={() => setOpen(false)}
                >
                  {cat}
                </Link>
              </li>
            ))}
            <li><a
              href="https://wa.me/919999999999"
              className="mt-6 p-2 text-center rounded bg-[#c8a24d] text-white py-3 text-xs tracking-widest"
            >
              CHAT & ORDER ON WHATSAPP
            </a></li>

          </ul>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}
