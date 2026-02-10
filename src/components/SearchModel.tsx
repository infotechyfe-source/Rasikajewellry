"use client";

import { X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");

  if (!open) return null;

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


  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm">
      <div className="bg-white max-w-3xl mx-auto mt-24 rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b">
          <Search size={18} className="text-gray-500" />
          <input
            autoFocus
            type="text"
            placeholder="Search jewellery..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
          <button onClick={onClose} className="cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {query && results.length > 0 ? (
            results.map((p) => (
              <Link
                key={p.id}
                href={`/shop?category=${encodeURIComponent(p.category)}`}
                onClick={onClose}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {p.category} · ₹{p.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))
          ) : query ? (
            <p className="text-center text-sm text-gray-500 py-10">
              No jewellery found
            </p>
          ) : (
            <p className="text-center text-sm text-gray-400 py-10">
              Search by category or product name
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
