"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { SearchModal } from "@/components/SearchModel";
import { products } from "@/data/products";
import { useSearchParams } from "next/navigation";

const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const params = useSearchParams();
  const activeCategory = params.get("category");

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 w-full z-50">

        {/* INFO BAR */}
        <div className="bg-[#8B4513]/95 backdrop-blur text-center text-[10px] tracking-[0.22em] text-white py-0.5"> Complimentary Shipping on Orders Above ₹1,999
        </div>

        {/* MAIN NAV */}
        <div className="bg-[#EEE2DA]/90 backdrop-blur-md
                shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
          <div className="max-w-8xl mx-auto px-6 md:px-12 py-3">

            {/* MOBILE + DESKTOP GRID */}
            <div className="grid grid-cols-3 items-center">

              {/* LEFT */}
              <div className="flex items-center">

                {/* Desktop Search */}
                <div className="hidden md:flex">
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center gap-3
                       px-4 py-2 w-72 text-[12px]
                       border border-[#8B4513] rounded
                       text-black/60
                       hover:border-[#8B4513]
                       hover:bg-white/40
                       transition-all cursor-pointer"
                  >
                    <Search size={16} />
                    <span className="tracking-wide">
                      Search jewellery…
                    </span>
                  </button>
                </div>

                {/* Mobile Search Icon */}
                <button
                  title="mobile search"
                  onClick={() => setSearchOpen(true)}
                  className="md:hidden text-[#512403] cursor-pointer"
                >
                  <Search size={22} />
                </button>
              </div>

              {/* CENTER LOGO */}
              <div className="flex justify-center">
                <Link href="/" className="select-none">
                  <img
                    src="/images/rasika-logo.png"
                    alt="Rasika Jewels"
                    className="h-9 md:h-11 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </div>

              {/* RIGHT */}
              <div className="flex justify-end items-center gap-4">

                {/* Desktop CTA */}
                <div className="hidden md:flex">
                  <a
                    href="https://wa.me/919120797254"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded
                       bg-[#8B4513]
                       text-[11px] tracking-[0.3em]
                       text-white
                       hover:text-[#c8a24d]
                       hover:bg-[#EEE2DA]/90
                       hover:border-[#8B4513]
                       transition-all shadow-md">
                    ORDER ON WHATSAPP
                  </a>
                </div>

                {/* Mobile Menu */}
                <button
                  onClick={() => setOpen(!open)}
                  className="md:hidden text-[#512403]"
                >
                  {open ? <X size={26} /> : <Menu size={26} />}
                </button>

              </div>
            </div>
          </div>
        </div>

      </header>

      {/* ================= CATEGORY BAR ================= */}
      <div className="hidden lg:block sticky top-22 z-40 bg-[#EEE2DA]/90 backdrop-blur border-b border-black/10">
        <div className="max-w-8xl mx-auto px-8">
          <ul
            className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {uniqueCategories.map((cat) => {
              const isActive = activeCategory === cat.toLowerCase();

              return (
                <li key={cat} className="flex-shrink-0">
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat.toLowerCase())}`}
                    className={`
                inline-flex items-center justify-center px-3 py-1.5 rounded text-[11px] tracking-[0.22em] uppercase transition-all duration-300 ${isActive
                        ? "bg-[#EEE2DA]/90 text-[#512403] shadow-md scale-[1.05]"
                        : "text-black/60 hover:text-[#512403] hover:bg-white/70"
                      }`}>
                    {cat}
                  </Link>
                </li>
              );
            })}

            {/* Highlighted Collection */}
            <li className="flex-shrink-0">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-2 rounded bg-[#EEE2DA]/90 text-[#512403] text-[11px] tracking-[0.22em] uppercase shadow-md hover:bg-[#7a3b10]
           hover:text-white transition">
                Explore More
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* DRAWER PANEL */}
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#EEE2DA]/90
                    shadow-2xl animate-slideIn flex flex-col">
            {/* TOP BAR */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <span className="text-xs tracking-[0.3em] text-[#8B4513]/90 uppercase">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition"
                aria-label="Close menu"
              >
                <X size={22} className="text-[#8B4513]" />
              </button>
            </div>

            {/* MENU ITEMS */}
            <ul className="flex-1 overflow-y-auto px-6 py-6 space-y-5 text-[#8B4513] text-sm">
              {uniqueCategories.map(cat => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat.toLowerCase())}`}
                    onClick={() => setOpen(false)}
                    className="block pb-3 border-b border-white/10 uppercase tracking-widest text-[13px]
                         hover:text-[#e6c36a] transition">
                    {cat}
                  </Link>
                </li>

              ))}
              {/* Highlighted Collection */}
              <li className="flex-shrink-0">
                <Link
                  href="/shop"
                  className="w-full inline-flex items-center justify-center px-6 py-2 rounded bg-[#EEE2DA]/90 text-[#512403] text-[11px] tracking-[0.22em] uppercase shadow-md hover:bg-[#7a3b10]
           hover:text-white transition">
                  Explore More
                </Link>
              </li>
            </ul>

            {/* BOTTOM CTA */}
            <div className="p-6 border-t border-white/10">

              <a
                href="https://wa.me/919120797254"
                target="_blank"
                className="block w-full text-center bg-[#EEE2DA]/90  text-[#512403] py-4 rounded text-xs tracking-[0.3em] font-semibold shadow-xl active:scale-95 transition border border-[#512403] hover:bg-[#512403] hover:text-white">
                CHAT & ORDER ON WHATSAPP
              </a>

            </div>

          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

