"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { SearchModal } from "@/components/SearchModel";
import { products } from "@/data/products";

const uniqueCategories = Array.from(
  new Set(products.map((p) => p.category))
);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* ================= FIXED HEADER ================= */}
      <header className="fixed top-0 w-full z-50">

        {/* FREE DELIVERY BAR */}
        <div className="bg-[#EEE2DA]/95 backdrop-blur py-1 px-6 flex justify-center
                        text-[11px] tracking-wide text-[#5C2B06]">
          Free Delivery on Order above 1999
        </div>

        {/* MAIN NAV */}
        <div className="bg-gradient-to-b from-black/90 to-black/70
                        backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-3
                          flex items-center justify-between gap-4">

            {/* SEARCH */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-3 px-5 py-2.5
                         text-sm border border-white/20 rounded
                         hover:border-[#c8a24d] transition w-80 text-white/90"
            >
              <Search size={16} className="text-white/60" />
              <span className="tracking-wide text-white/70">
                Search designs, collections…
              </span>
            </button>

            {/* LOGO */}
            <Link href="/" className="text-center select-none">
              <h1 className="font-serif text-3xl tracking-widest text-white">
                RASIKA
              </h1>
              <span className="block text-[10px] tracking-[0.45em] text-[#c8a24d]">
                STYLE JEWELS
              </span>
            </Link>

            {/* WHATSAPP CTA */}
            <div className="hidden md:flex">
              <a
                href="https://wa.me/919120797254"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-2.5 rounded border border-[#c8a24d]
                           text-xs tracking-widest text-[#c8a24d]
                           hover:bg-[#c8a24d] hover:text-black
                           transition-all duration-300"
              >
                ORDER ON WHATSAPP
              </a>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-white"
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= CATEGORY MENU (GLASS EFFECT) ================= */}
      <div className="mt-24 sticky top-24px z-40
                      bg-black/60 backdrop-blur-md
                      border-b transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
          <ul
            className="flex gap-12 py-3 text-[11px] tracking-widest uppercase
                       whitespace-nowrap justify-start md:justify-center"
          >
            {uniqueCategories.map((cat) => (
              <li key={cat} className="relative group shrink-0">
                <Link
                  href={`/shop?category=${encodeURIComponent(
                    cat.toLowerCase()
                  )}`}
                  className="text-white/80 hover:text-[#c8a24d]
                             transition font-semibold"
                >
                  {cat}
                </Link>
                <span
                  className="absolute left-0 -bottom-1 h-px w-0
                             bg-[#c8a24d] group-hover:w-full
                             transition-all duration-300"
                />
              </li>
            ))}

            <li className="relative group shrink-0">
              <Link
                href="/shop"
                className="text-white/80 hover:text-[#c8a24d]
                           font-semibold"
              >
                Wedding Collection
              </Link>
              <span
                className="absolute left-0 -bottom-1 h-px w-0
                           bg-[#c8a24d] group-hover:w-full
                           transition-all duration-300"
              />
            </li>
          </ul>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-lg">
          <ul className="flex flex-col px-6 py-8 gap-6
                         text-sm tracking-wide text-white">
            {uniqueCategories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/shop?category=${encodeURIComponent(
                    cat.toLowerCase()
                  )}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 border-b border-white/10"
                >
                  {cat}
                </Link>
              </li>
            ))}

            <li className="mt-6">
              <a
                href="https://wa.me/919120797254"
                className="block text-center rounded bg-[#c8a24d]
                           text-black py-3 text-xs tracking-widest"
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
