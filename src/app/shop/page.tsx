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
    
      <section className="relative h-[380px] md:h-[580px] bg-[#f2f1e6] overflow-hidden">
        <img
          src="/images/shop-hero.jpg" // replace with your banner image
          alt="Quiet Luxury"
          className="absolute inset-0 w-full h-full object-cover"
        />

        

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          
        </div>
      </section>


      {/* ================= PRODUCT LIST ================= */}
      <section className="max-w-8xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">

          {/* ================= FILTER SIDEBAR ================= */}
          <aside className="text-sm text-gray-700 sticky top-28 h-fit">

            <div className="mb-6 flex justify-between">
              <span className="font-medium">Filters</span>
              <button className="text-xs underline text-gray-400">
                Clear All
              </button>
            </div>

            {/* PRICE */}
            <div className="mb-8">
              <h4 className="uppercase text-xs tracking-widest mb-3">
                Price Range
              </h4>
              <input type="range" className="w-full accent-[#8b4a16]" />
              <div className="flex justify-between text-xs mt-2">
                <span>₹5,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            {/* MATERIAL */}
            <div className="mb-8">
              <h4 className="uppercase text-xs tracking-widest mb-3">
                Material
              </h4>
              {["18K Gold", "Diamond", "Platinum", "Rose Gold"].map(m => (
                <label key={m} className="flex items-center gap-2 mb-2">
                  <input type="checkbox" />
                  {m}
                </label>
              ))}
            </div>

            {/* STYLE */}
            <div className="mb-8">
              <h4 className="uppercase text-xs tracking-widest mb-3">
                Style
              </h4>
              {["Studs", "Hoops", "Drops", "Chandeliers"].map(s => (
                <label key={s} className="flex items-center gap-2 mb-2">
                  <input type="checkbox" />
                  {s}
                </label>
              ))}
            </div>
          </aside>

          {/* ================= PRODUCT GRID ================= */}
          <div>
            <div className="mb-10 flex justify-between text-sm text-gray-500">
              <span>Showing 1–{filteredProducts.length} designs</span>
              <span>Sort by: Recommended</span>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onOrderPlaced={handleOrderPlaced}
                />
              ))}
            </div>
          </div>

        </div>
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