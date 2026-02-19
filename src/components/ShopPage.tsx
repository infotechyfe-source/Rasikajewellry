"use client";
import { ProductCard } from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import { useState, useEffect, useMemo } from "react";
import { categories as allCategories } from "@/data/categories";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  category: string;
  type: string;
  price: number;
  image: string;
  active: boolean;
  created_at?: string;
};

export default function ShopPage() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category")?.toLowerCase() || null;

  /* -------------------- STATE -------------------- */
  const [shopProducts, setShopProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null | undefined>(null);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"recommended" | "price-low" | "price-high">("recommended");
  const [showFilters, setShowFilters] = useState(false); // mobile drawer

  /* -------------------- HERO IMAGE MAP -------------------- */
  const heroImages: Record<string, string> = {
    rings: "/images/hero-rings.jpeg",
    necklace: "/images/hero-necklace.jpg",
    mangalsutra: "/images/hero-mangalsutra.jpeg",
    payal: "/images/hero-payal.jpeg",
    "toe ring": "/images/hero-toering.jpeg",
    bangles: "/images/hero-bangles.jpeg",
    pendant: "/images/hero-pendant.jpeg",
    "nose ring": "/images/hero-nose.jpeg",
    "maang tikka": "/images/hero-tikka.jpeg",
    earring: "/images/hero-earring.jpeg",
  };

  const normalizedCategory = selectedCategory?.trim().toLowerCase();
  const currentHeroImage =
    (normalizedCategory && heroImages[normalizedCategory]) || "/images/shop-hero.png";

  /* -------------------- FETCH PRODUCTS -------------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          const activeProducts: Product[] = (data.products || [])
            .filter((p: Product) => p.active)
            .map((p: Product) => ({
              ...p,
              category: p.category || "unknown",
              type: p.type || "unknown",
              price: Number(p.price),
              active: Boolean(p.active),
            }));
          setShopProducts(activeProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  /* -------------------- URL CATEGORY SYNC -------------------- */
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSelectedType(null);
  }, [urlCategory]);

  /* -------------------- CATEGORY LIST -------------------- */
  const categories = allCategories;

  /* -------------------- TYPE LIST -------------------- */
  const types = useMemo(() => {
    if (!selectedCategory) return [];
    return [
      ...new Set(
        shopProducts
          .filter(
            (p) => p.category?.toLowerCase().trim() === selectedCategory?.toLowerCase().trim()
          )
          .map((p) => p.type)
          .filter(Boolean)
      ),
    ];
  }, [shopProducts, selectedCategory]);

  /* -------------------- FILTER + SORT -------------------- */
  const filteredProducts = useMemo(() => {
    let list = shopProducts.filter((p) => {
      const price = Number(p.price);
      const productCategory = p.category?.toLowerCase().trim();
      if (selectedCategory && productCategory !== normalizedCategory) return false;
      if (selectedType && p.type !== selectedType) return false;
      if (price > maxPrice) return false;
      if (inStockOnly && !p.active) return false;
      return true;
    });

    if (sortBy === "price-low") list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortBy === "price-high") list.sort((a, b) => Number(b.price) - Number(a.price));

    return list;
  }, [shopProducts, selectedCategory, selectedType, maxPrice, inStockOnly, sortBy, normalizedCategory]);

  const clearFilters = () => {
    setSelectedCategory(urlCategory);
    setSelectedType(null);
    setMaxPrice(2000);
    setInStockOnly(false);
    setSortBy("recommended");
  };

  /* -------------------- UI -------------------- */
  return (
    <main className="bg-[#f2f1e6]">
      {/* {Hero} */}
      <section className="relative w-full aspect-video overflow-hidden mt-12">
        <Image
          src={currentHeroImage}
          alt="Luxury Jewellery"
          fill
          className="object-cover"
          priority
        />
      </section>


      {/* SHOP */}
      <section className="max-w-[1600px] mx-auto px-4 py-4">
        <h1 className="text-[#8B4513] text-3xl md:text-5xl font-serif tracking-wide text-center">
          {selectedCategory ? selectedCategory.toUpperCase() : "OUR COLLECTION"}
        </h1>

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <p className="text-sm tracking-wide text-[#8B4513]/90">
            Showing{" "}
            <span className="font-semibold text-[#5C2B06]">{filteredProducts.length}</span>{" "}
            Designs
          </p>

          <select
            title="recommended"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-[#8B4513] px-4 py-2 text-sm bg-[#f2f1e6]"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* MOBILE FILTER BUTTON */}
        <div className="flex justify-end mb-4 lg:hidden">
          <button
            onClick={() => setShowFilters(true)}
            className="px-4 py-2 bg-[#8B4513] text-white rounded"
          >
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 relative">
          {/* MOBILE OVERLAY */}
          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            />
          )}

          {/* FILTER PANEL */}
          <aside
            className={`bg-white p-6 text-sm
              lg:sticky lg:top-28
              fixed top-0 left-0 z-50 w-64 h-full shadow-lg transition-transform duration-300 transform
              lg:transform-none lg:relative lg:w-auto lg:h-auto
              ${showFilters ? "translate-x-0" : "-translate-x-full"} 
            `}
          >
            {/* Mobile Close Button */}
            <div className="flex justify-end mb-4 lg:hidden">
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex justify-between mb-6">
              <span className="font-medium">Filters</span>
              <button
                onClick={clearFilters}
                className="text-xs underline text-gray-400"
              >
                Clear
              </button>
            </div>

            {/* CATEGORY */}
            <div className="mb-8">
              <h4 className="uppercase text-xs tracking-widest mb-3">Category</h4>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedType(null);
                  }}
                  className={`block w-full text-left px-2 py-1 rounded mb-1 cursor-pointer
                    ${selectedCategory === cat ? "bg-black text-white" : "hover:bg-gray-100"}
                  `}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* TYPE */}
            {types.length > 0 && (
              <div className="mb-8">
                <h4 className="uppercase text-xs tracking-widest mb-3">Type</h4>
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`block w-full text-left px-2 py-1 rounded mb-1 cursor-pointer
                      ${selectedType === type ? "bg-black text-white" : "hover:bg-gray-100"}
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}

            {/* PRICE */}
            <div className="mb-8">
              <h4 className="uppercase text-xs tracking-widest mb-3">Price</h4>
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

          {/* PRODUCTS */}
          <div>
            {filteredProducts.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center mt-32 text-gray-500">
                No designs match your filters.
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
