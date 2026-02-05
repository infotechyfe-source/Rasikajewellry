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
        <div className="bg-[#EEE2DA]/95 backdrop-blur
                        text-center text-[11px]
                        tracking-[0.25em] text-[#512403] py-1">
          Complimentary Shipping on Orders Above ₹1,999
        </div>

        {/* MAIN NAV */}
        <div className="bg-[#EEE2DA]/90 backdrop-blur-md
                        shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
          <div className="max-w-8xl mx-auto px-16 py-5
                          grid grid-cols-3 items-center">

            {/* LEFT : SEARCH */}
            <div className="hidden md:flex">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-3
                           px-6 py-3 w-80
                           text-[13px]
                           border border-[#8B4513] rounded
                           text-black/60
                           hover:border-[#8B4513]
                           hover:bg-white/40
                           transition-all"
              >
                <Search size={16} />
                <span className="tracking-wide">
                  Search jewellery…
                </span>
              </button>
            </div>

            {/* CENTER : LOGO */}
            <div className="flex justify-center">
              <Link href="/" className="select-none">
                <img
                  src="/images/rasika-logo.png"
                  alt="Rasika Jewels"
                  className="h-14 w-auto object-contain
                             transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>

            {/* RIGHT : CTA */}
            <div className="hidden md:flex justify-end">
              <a
                href="https://wa.me/919120797254"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded
                           bg-[#8B4513]/90
                           text-[11px] tracking-[0.3em]
                           text-white
                           hover:bg-[#8B4513]
                           transition-all shadow-md"
              >
                ORDER ON WHATSAPP
              </a>
            </div>

            {/* MOBILE MENU ICON */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden absolute right-6 text-[#512403]"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= CATEGORY BAR ================= */}
      <div
        className="sticky z-40 mt-28 bg-[#FAF8F6]/95 backdrop-blur border-b border-black/10">
        <div className="max-w-8xl mx-auto px-12">
          <ul
            className="flex flex-nowrap justify-center items-center gap-6 py-5">
            {uniqueCategories.map(cat => {
              const isActive = activeCategory === cat.toLowerCase();

              return (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat.toLowerCase())}`}
                    className={`px-4 py-2.5 rounded-full
                text-[11px]
                tracking-[0.22em]
                uppercase
                transition-all duration-300
                ${isActive
                        ? "bg-white text-black shadow-md scale-[1.04]"
                        : "text-black/60 hover:text-black hover:bg-white/70"
                      }
              `}
                  >
                    {cat}
                  </Link>
                </li>
              );
            })}

            {/* Highlighted Collection */}
            <li>
              <Link
                href="/shop"
                className="
            px-6 py-2.5 rounded-full
            bg-[#8B4513]
            text-white
            text-[11px]
            tracking-[0.22em]
            uppercase
            shadow-md
            hover:bg-[#7a3b10]
            transition"
              >
                Explore More
              </Link>
            </li>
          </ul>
        </div>
      </div>


      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50
                        bg-[#2b1a12]/95 backdrop-blur-xl">
          <ul className="flex flex-col px-6 py-8 gap-6
                         text-sm tracking-wide text-white">
            {uniqueCategories.map(cat => (
              <li key={cat}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.toLowerCase())}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 border-b border-white/10"
                >
                  {cat}
                </Link>
              </li>
            ))}

            <li className="mt-10">
              <a
                href="https://wa.me/919120797254"
                className="block text-center rounded-full
                           bg-[#c8a24d]
                           text-black
                           py-3 text-xs tracking-[0.3em]"
              >
                CHAT & ORDER ON WHATSAPP
              </a>
            </li>
          </ul>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

