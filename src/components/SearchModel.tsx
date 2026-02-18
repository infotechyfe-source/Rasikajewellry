"use client";

import { X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { products } from "@/data/products";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const results = normalizedQuery
    ? products.filter((p) => {
        const name = p.name?.toLowerCase() || "";
        const category = p.category?.toLowerCase() || "";
        return (
          category.includes(normalizedQuery) ||
          name.includes(normalizedQuery)
        );
      })
    : [];

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex justify-center items-start pt-28 px-4">

      <div
        ref={modalRef}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b bg-gradient-to-r from-[#faf7f2] to-white">
          <Search size={18} className="text-[#8b4a16]" />

          <input
            autoFocus
            type="text"
            placeholder="Search jewellery..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-sm md:text-base bg-transparent"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-black transition"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[450px] overflow-y-auto divide-y">
          {query && results.length > 0 ? (
            results.map((p) => (
              <Link
                key={p.id}
                href={`/shop?category=${encodeURIComponent(p.category)}`}
                onClick={onClose}
                className="flex items-center gap-4 px-6 py-4 hover:bg-[#faf7f2] transition-all duration-300 group"
              >
                <div className="relative w-[70px] h-[70px] rounded-xl overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-sm md:text-base group-hover:text-[#8b4a16] transition">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize mt-1">
                    {p.category} · ₹{Number(p.price).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))
          ) : query ? (
            <div className="text-center py-14">
              <p className="text-sm text-gray-500">
                No jewellery found
              </p>
            </div>
          ) : (
            <div className="text-center py-14">
              <p className="text-sm text-gray-400">
                Search by category or product name
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
