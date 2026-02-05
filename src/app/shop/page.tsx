"use client";

import { products as defaultProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category")?.toLowerCase() || "";

  /* -------------------- STATE -------------------- */
  const [orders, setOrders] = useState<any[]>([]);
  const [shopProducts, setShopProducts] = useState(defaultProducts);

  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  /* -------------------- LOAD ORDERS -------------------- */
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  /* -------------------- LOAD PRODUCTS -------------------- */
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
    setOrders((prev) => [...prev, newOrder]);
  };

  /* -------------------- FILTER HELPERS -------------------- */
  const toggleValue = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setMaxPrice(200000);
    setSelectedMaterials([]);
    setSelectedStyles([]);
  };

  /* -------------------- FILTER LOGIC -------------------- */
  const filteredProducts = shopProducts.filter((p) => {
    // Category
    if (category && p.category.toLowerCase() !== category) return false;

    // Price
    const price =
      typeof p.price === "string" ? parseInt(p.price) : p.price;
    if (price > maxPrice) return false;

    // Material
    if (
      selectedMaterials.length > 0 &&
      !selectedMaterials.includes(p.material)
    )
      return false;

    // Style
    if (
      selectedStyles.length > 0 &&
      !selectedStyles.includes(p.style)
    )
      return false;

    return true;
  });

  /* -------------------- UI -------------------- */
  return (
    <main className="bg-[#f2f1e6]">

      {/* ================= HERO ================= */}
      <section className="relative h-[380px] md:h-[580px] overflow-hidden">
        <img
          src="/images/shop-hero.jpg"
          alt="Quiet Luxury"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      {/* ================= SHOP ================= */}
      <section className="max-w-8xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">

          {/* ================= FILTERS ================= */}
          <aside className="sticky top-28 h-fit text-sm text-gray-700">

            <div className="mb-6 flex justify-between">
              <span className="font-medium">Filters</span>
              <button
                onClick={clearAllFilters}
                className="text-xs underline text-gray-400"
              >
                Clear All
              </button>
            </div>

            {/* PRICE */}
            <div className="mb-8">
              <h4 className="uppercase text-xs tracking-widest mb-3">
                Price Range
              </h4>
              <input
                type="range"
                min={5000}
                max={200000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8b4a16]"
              />
              <div className="flex justify-between text-xs mt-2">
                <span>₹5,000</span>
                <span>₹{maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* MATERIAL */}
            <div className="mb-8">
              <h4 className="uppercase text-xs tracking-widest mb-3">
                Material
              </h4>
              {["18K Gold", "Diamond", "Platinum", "Rose Gold"].map((m) => (
                <label key={m} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(m)}
                    onChange={() =>
                      toggleValue(m, setSelectedMaterials)
                    }
                  />
                  {m}
                </label>
              ))}
            </div>

            {/* STYLE */}
            <div className="mb-8">
              <h4 className="uppercase text-xs tracking-widest mb-3">
                Style
              </h4>
              {["Studs", "Hoops", "Drops", "Chandeliers"].map((s) => (
                <label key={s} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(s)}
                    onChange={() =>
                      toggleValue(s, setSelectedStyles)
                    }
                  />
                  {s}
                </label>
              ))}
            </div>
          </aside>

          {/* ================= PRODUCTS ================= */}
          <div>
            <div className="mb-10 flex justify-between text-sm text-gray-500">
              <span>
                Showing {filteredProducts.length} of{" "}
                {shopProducts.length} designs
              </span>
              <span>Sort by: Recommended</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onOrderPlaced={handleOrderPlaced}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-24">
                No designs match your filters.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="border-t py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl mb-6">
            Looking for Something Special?
          </h2>
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
