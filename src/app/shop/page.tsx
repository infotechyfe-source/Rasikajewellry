"use client";

import { products as defaultProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category")?.toLowerCase() || "";

  const [orders, setOrders] = useState<any[]>([]);

  // Fetch existing orders (optional, if you want to show live order count on shop page)
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(console.error);
  }, []);

  const [shopProducts, setShopProducts] = useState(defaultProducts);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      try {
        setShopProducts(JSON.parse(stored));
      } catch {
        setShopProducts(defaultProducts);
      }
    }
  }, []);



  const handleOrderPlaced = (newOrder: any) => {
    setOrders((prev) => [...prev, newOrder]); // Add new order locally
  };

  // Filter products by category
  const filteredProducts = category
    ? shopProducts.filter(p => p.category.toLowerCase() === category)
    : shopProducts;


  const displayCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Jewellery";

  return (
    <main className="bg-[#f2f1e6]">
      {/* ================= HEADER ================= */}
      <section className="border-b bg-linear-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <span className="uppercase tracking-[0.3em] text-xs text-gray-400">
            Style Jewels Collection
          </span>

          <h1 className="font-serif text-4xl md:text-6xl mt-4 mb-6 tracking-wide">
            {displayCategory}
          </h1>

          <div className="mx-auto mb-6 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-[#c8a24d]" />
            <span className="w-1 h-1 bg-[#c8a24d] rounded-full animate-pulse" />
            <span className="w-8 h-px bg-[#c8a24d]" />
          </div>

          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed tracking-wide">
            Exquisite jewellery crafted to celebrate life’s most precious moments.
          </p>
        </div>
      </section>

      {/* ================= PRODUCT LIST ================= */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="mb-12 flex justify-between items-center text-sm text-gray-500">
          <span>{filteredProducts.length} Designs Available</span>
          <span className="tracking-wide">SORT BY: FEATURED</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onOrderPlaced={handleOrderPlaced} // Pass callback
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-24">
            No designs found in this category.
          </p>
        )}
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="border-t py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl mb-6">Looking for Something Special?</h2>
          <p className="text-gray-500 mb-10">
            Our jewellery experts are available to help you find the perfect piece.
          </p>
          <a
            href="https://wa.me/919120797254"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 border border-black tracking-widest hover:bg-black hover:text-white transition"
          >
            CHAT ON WHATSAPP
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}