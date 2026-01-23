"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, PhoneIcon, Search, X } from "lucide-react";

import { SearchModal } from "@/components/SearchModel";
// Extract unique categories from products
import { products } from "@/data/products";

const uniqueCategories = Array.from(
  new Set(products.map((p) => p.category))
);

export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { title: "Home", href: "/" },
    { title: "Shop", href: "/shop" },
    { title: "Collections", href: "/collections" },
    { title: "Contact", href: "/contact" },

  ];
  const [searchOpen, setSearchOpen] = useState(false);


  return (
    <nav className="sticky top-0 z-50 bg-white">

      {/* ================= TOP UTILITY BAR ================= */}
      <div className="hidden md:block border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between text-xs text-gray-600">
          <span>Certified Jewellery | BIS Hallmarked Gold</span>
          <div className="flex gap-6">
            <span>📍 Store Locator</span>
            <span className="flex items-center gap-1">
              <PhoneIcon size={14} className="text-gray-600" />
              +91 99999 99999
            </span>

          </div>
        </div>
      </div>


      {/* ================= MAIN NAVBAR ================= */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* LEFT: Search */}
          <div
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-700 hover:text-black hover:border-black transition cursor-pointer
             w-48"
          >
            <Search size={16} className="text-gray-500" />
            <span className="tracking-wide">Search Jewellery...</span>
          </div>

          {/* CENTER: Logo */}
          <Link
            href="/"
            className="text-2xl font-serif tracking-widest text-black text-center"
          >
            RASIKA
            <span className="block text-[10px] tracking-[0.35em] text-gray-500">
              STYLE JEWELS
            </span>
          </Link>

          {/* RIGHT: WhatsApp CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              className="px-5 py-2 border border-[#deaa12] text-xs font-semibold tracking-wider
                   hover:bg-[#deaa10] hover:text-white transition"
            >
              ORDER VIA WHATSAPP
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ================= CATEGORY STRIP ================= */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-8xl mx-auto px-12 flex justify-center overflow-x-auto flex scrollbar-hide">
          <ul className="flex gap-8 py-4 text-xs tracking-widest uppercase text-gray-700 whitespace-nowrap">
            {uniqueCategories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.toLowerCase())}`}
                  className="hover:text-[#9c7c3d] transition"
                >
                  {cat}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop" className="hover:text-[#9c7c3d] transition">
                More Jewellery
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col px-6 py-6 gap-4 text-sm text-gray-700">
            <li><Link href="/shop?category=earrings">Earrings</Link></li>
            <li><Link href="/shop?category=rings">Rings</Link></li>
            <li><Link href="/shop?category=bracelets">Bracelets</Link></li>
            <li><Link href="/shop?category=necklace">Necklace</Link></li>
            <li><Link href="/shop?category=mangalsutra">Mangalsutra</Link></li>
            <li><Link href="/shop?category=gold">Gold</Link></li>
            <li><Link href="/shop?category=silver">Silver</Link></li>
            <li><Link href="/shop?category=diamond">Diamond</Link></li>

            <a
              href="https://wa.me/919999999999"
              className="mt-6 text-center border border-black py-3 text-xs font-semibold"
            >
              ORDER VIA WHATSAPP
            </a>
          </ul>
        </div>
      )}

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

    </nav>


  );
}

