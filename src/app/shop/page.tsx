"use client";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
export default function ShopPage() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category")?.toLowerCase() || "";

  // Filter products if category is selected
  const filteredProducts = category
    ? products.filter((p) => p.category.toLowerCase() === category)
    : products;

  // Capitalize category for display
  const displayCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Jewellery";

  return (
    <main className="bg-[#f0eed0]">

      {/* ================= HEADER ================= */}
      <section className="border-b bg-linear-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">

          {/* Small accent line */}
          <span className="uppercase tracking-[0.3em] text-xs text-gray-400">
            Style Jewels Collection
          </span>

          <h1 className="font-serif text-4xl md:text-6xl mt-4 mb-6 tracking-wide">
            {displayCategory}
          </h1>

          <div className="w-20 h-px bg-gray-300 mx-auto mb-6" />

          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Thoughtfully crafted designs that celebrate elegance, detail,
            and timeless beauty.
          </p>
        </div>
      </section>


      {/* ================= PRODUCT LIST ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        {/* Optional: Result Count */}
        <div className="mb-12 flex justify-between items-center text-sm text-gray-500">
          <span>
            {filteredProducts.length} Designs Available
          </span>

          {/* Placeholder for future filters */}
          <span className="tracking-wide">
            SORT BY: FEATURED
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-16">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                metal={p.metal}
                image={p.image}
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
      <section className="border-t py-4">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl mb-6">
            Looking for Something Special?
          </h2>
          <p className="text-gray-500 mb-10">
            Our jewellery experts are available to help you find the perfect
            piece.
          </p>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            className="inline-block px-10 py-4 border border-black
                       tracking-widest hover:bg-black hover:text-white transition"
          >
            CHAT ON WHATSAPP
          </a>
        </div>
      </section>
   <Footer/>
    </main>
  );
}
