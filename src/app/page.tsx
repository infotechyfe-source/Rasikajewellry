import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "919999999999"; // replace with client number

const categories = [
  {
    title: "Gold Jewellery",
    image: "/images/gold.jpeg",
    desc: "Hallmarked & timeless designs",
    msg: "Hello, I want to enquire about Gold Jewellery",
  },
  {
    title: "Silver Jewellery",
    image: "/images/silver.jpeg",
    desc: "Elegant everyday wear",
    msg: "Hello, I want to enquire about Silver Jewellery",
  },
  {
    title: "Artificial Jewellery",
    image: "/images/artificial.jpeg",
    desc: "Trendy & affordable styles",
    msg: "Hello, I want to enquire about Artificial Jewellery",
  },
  {
    title: "Nose Wear",
    image: "/images/nose.png",
    desc: "Traditional & modern nose pins",
    msg: "Hello, I want to enquire about Nose Jewellery",
  },
  {
    title: "Ear",
    image: "/images/ear.jpeg",
    desc: "Earrings for every occasion",
    msg: "Hello, I want to enquire about Ear Wear",
  },
  {
    title: "Hand Wear",
    image: "/images/hand.jpg",
    desc: "Bangles, bracelets & rings",
    msg: "Hello, I want to enquire about Hand Jewellery",
  },
  { title: "Ring", image: "/images/ring1.webp", desc: "All kinds of rings" },
  { title: "Necklace Set", image: "/images/necklace.webp", desc: "Necklace sets for all occasions" },
  { title: "Mangalsutra", image: "/images/mangalsutra.webp", desc: "Daily wear & bridal mangalsutras" },
  { title: "Payal", image: "/images/payal.webp", desc: "Anklets for every style" },
  { title: "Toe Ring", image: "/images/toering.jpeg", desc: "Chutki / Bichhiya designs" },
  { title: "Bangles", image: "/images/bangle.jpeg", desc: "Kade & bangles collection" },
  { title: "Pendant / Locket", image: "/images/pendant.jpeg", desc: "Lockets and pendant chains" },
  { title: "Maang Tikka", image: "/images/tikka.jpeg", desc: "Traditional & bridal tikka" },
];

export default function Home() {
  return (
    <main className="bg-white text-gray-800">

      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <Image
          src="/images/hero.jpeg"
          alt="Luxury Jewellery"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-6">
            Jewellery That Speaks <br /> Elegance & Tradition
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10">
            Premium gold, silver & designer jewellery for weddings,
            festivals and everyday elegance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              className="px-8 py-3 border border-white text-white tracking-wide
                         hover:bg-white hover:text-black transition"
            >
              ENQUIRE ON WHATSAPP
            </a>

            <a
              href="#categories"
              className="text-white underline underline-offset-8 hover:text-yellow-300"
            >
              View Collections
            </a>
          </div>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-2xl font-serif">100%</p>
            <p className="text-sm text-gray-500">Quality Assured</p>
          </div>
          <div>
            <p className="text-2xl font-serif">10K+</p>
            <p className="text-sm text-gray-500">Happy Customers</p>
          </div>
          <div>
            <p className="text-2xl font-serif">50+</p>
            <p className="text-sm text-gray-500">Unique Designs</p>
          </div>
          <div>
            <p className="text-2xl font-serif">WhatsApp</p>
            <p className="text-sm text-gray-500">Easy Ordering</p>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section
        id="categories"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Click on a category to explore curated designs and place your order via WhatsApp.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/shop?category=${encodeURIComponent(cat.title.toLowerCase())}`}
              className="group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={500}
                  height={600}
                  className="h-[420px] w-full object-cover
                             group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0
                                group-hover:opacity-100 transition" />
              </div>

              <div className="mt-5">
                <h3 className="font-serif text-xl mb-1">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {cat.desc}
                </p>
                <p className="mt-2 text-sm tracking-wide">
                  EXPLORE →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-[#f8f5f1] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-center mb-16">
            Why Choose RasikaStyle Jewels
          </h2>

          <div className="grid md:grid-cols-3 gap-14 text-center">
            <div>
              <h3 className="font-serif text-xl mb-3">
                Certified Quality
              </h3>
              <p className="text-gray-500">
                Carefully selected materials with trusted craftsmanship.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl mb-3">
                Custom Assistance
              </h3>
              <p className="text-gray-500">
                Get personal help and recommendations on WhatsApp.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl mb-3">
                Trusted by Customers
              </h3>
              <p className="text-gray-500">
                Serving jewellery lovers with honesty and elegance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-28 text-center">
        <h2 className="font-serif text-4xl mb-6">
          Ready to Find Your Perfect Jewellery?
        </h2>
        <p className="text-gray-500 mb-10">
          Chat with us on WhatsApp and get instant assistance.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          className="inline-block px-10 py-4 border border-black
                     tracking-widest hover:bg-black hover:text-white transition"
        >
          CONNECT ON WHATSAPP
        </a>
      </section>

    </main>
  );
}

