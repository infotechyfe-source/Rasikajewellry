"use client";

import { products as defaultProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import { useState, useEffect, useMemo } from "react";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category")?.toLowerCase() || null;

  /* -------------------- STATE -------------------- */
  const [shopProducts, setShopProducts] = useState(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");
  const [showFilters, setShowFilters] = useState(false);

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

  /* -------------------- 🔥 SYNC URL → STATE -------------------- */
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSelectedType(null);
    setShowFilters(false);
  }, [urlCategory]);

  /* -------------------- FILTER OPTIONS -------------------- */
  const categories = useMemo(
    () => [...new Set(shopProducts.map((p) => p.category))],
    [shopProducts]
  );

  const types = useMemo(() => {
    if (!selectedCategory) return [];
    return [
      ...new Set(
        shopProducts
          .filter(
            (p) => p.category.toLowerCase() === selectedCategory
          )
          .map((p) => p.type)
          .filter(Boolean)
      ),
    ];
  }, [shopProducts, selectedCategory]);

  /* -------------------- FILTER + SORT -------------------- */
  const filteredProducts = useMemo(() => {
    let list = shopProducts.filter((p) => {
      const price =
        typeof p.price === "string" ? parseInt(p.price) : p.price;

      if (
        selectedCategory &&
        p.category.toLowerCase() !== selectedCategory
      )
        return false;

      if (selectedType && p.type !== selectedType) return false;
      if (price > maxPrice) return false;
      if (inStockOnly && !p.active) return false;

      return true;
    });

    if (sortBy === "price-low")
      list.sort((a, b) => Number(a.price) - Number(b.price));

    if (sortBy === "price-high")
      list.sort((a, b) => Number(b.price) - Number(a.price));

    return list;
  }, [
    shopProducts,
    selectedCategory,
    selectedType,
    maxPrice,
    inStockOnly,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSelectedCategory(urlCategory);
    setSelectedType(null);
    setMaxPrice(2000);
    setInStockOnly(false);
  };


  /* -------------------- UI -------------------- */
  return (
    <main className="bg-[#f2f1e6]">
      {/* ================= HERO ================= */}
      <section className="relative h-[360px] md:h-[520px] overflow-hidden mt-12">
        <img
          src="/images/shop-hero.jpg"
          alt="Luxury Jewellery"
          className="absolute inset-0 w-full h-full object-cover"
        />

      </section>

      {/* ================= SHOP ================= */}
      <section className="max-w-[1600px] mx-auto px-4 py-16">

        <h1 className="text-[#8B4513] text-3xl md:text-5xl font-serif tracking-wide text-center">
          {selectedCategory
            ? selectedCategory.toUpperCase()
            : "OUR COLLECTION"}
        </h1>
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <p className="text-sm text-[#8B4513]">
            Showing {filteredProducts.length} designs
          </p>
          <div className="flex gap-4 items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-[#8B4513] px-4 py-2 text-sm bg-[#f2f1e6]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden border px-4 py-2 text-sm"
            >
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
          {/* ================= FILTERS ================= */}
          <aside
            className={`bg-white p-6 text-sm lg:sticky lg:top-28
              ${showFilters ? "block" : "hidden lg:block"}
            `}
          >
            <div className="flex justify-between mb-6">
              <span className="font-medium">Filters</span>
              <button
                onClick={() => {
                  clearAllFilters();
                  setShowFilters(false);
                }}
                className="text-xs underline text-gray-400"
              >
                Clear
              </button>
            </div>

            {/* CATEGORY */}
            <div className="mb-8">
              <h4 className="uppercase text-xs tracking-widest mb-3">
                Category
              </h4>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedType(null);
                  }}
                  className={`block w-full text-left px-2 py-1 rounded mb-1
                    ${selectedCategory === cat
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* TYPE */}
            {types.length > 0 && (
              <div className="mb-8">
                <h4 className="uppercase text-xs tracking-widest mb-3">
                  Type
                </h4>
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`block w-full text-left px-2 py-1 rounded mb-1
                      ${selectedType === type
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}

            {/* PRICE */}
            <div className="mb-8">
              <h4 className="uppercase text-xs tracking-widest mb-3">
                Price
              </h4>
              <input
                type="range"
                min={0}
                max={2000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8b4a16]"
              />
              <div className="flex justify-between text-xs mt-2">
                <span>₹0</span>
                <span>₹{maxPrice}</span>
              </div>
            </div>

            {/* STOCK */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              In stock only
            </label>
          </aside>

          {/* ================= PRODUCTS ================= */}
          <div>
            {filteredProducts.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center mt-32">
                <p className="text-gray-500 mb-6">
                  No designs match your filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="border px-6 py-3 text-sm"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
