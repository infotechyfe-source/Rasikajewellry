import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "919999999999";

const categories = [
  { title: "Artificial Jewellery", image: "/images/artificial.jpeg", desc: "Trendy & affordable styles", },
  { title: "Nose Ring", image: "/images/nose.png", desc: "Traditional & modern nose pins", },
  { title: "Ear Wear", image: "/images/ear1.jpeg", desc: "Earrings for every occasion", },
  { title: "Hand Wear", image: "/images/hand.jpg", desc: "Bangles, bracelets & rings", },
  { title: "Ring", image: "/images/ring1.webp", desc: "All kinds of rings" },
  { title: "Necklace Set", image: "/images/necklace.webp", desc: "Elegant necklace collections" },
  { title: "Mangalsutra", image: "/images/mangalsutra.webp", desc: "Daily wear & bridal mangalsutras" },
  { title: "Payal", image: "/images/payal.webp", desc: "Anklets for every style" },
  { title: "Toe Ring", image: "/images/toering.webp", desc: "Chutki / Bichhiya designs" },
  { title: "Bangles", image: "/images/bangle.jpg", desc: "Traditional & modern bangles" },
  { title: "Pendant / Locket", image: "/images/pendant.jpeg", desc: "Elegant pendant chains" },
  { title: "Maang Tikka", image: "/images/tikka.webp", desc: "Bridal & festive tikka" },
];

export default function Home() {
  return (
    <main className="bg-[#f0eed0] text-gray-800">

      {/* ================= HERO ================= */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.jpeg"
          alt="Rasika Style Jewels – Luxury Jewellery"
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Layered luxury overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

        <div className="relative z-10 text-center max-w-5xl px-6">

          {/* Brand Tag */}
          <p className="tracking-[0.35em] text-sm text-[#e6c36a] mb-6">
            RASIKA STYLE JEWELS
          </p>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-8">
            Timeless Jewellery <br />
            <span className="text-[#e6c36a]">Crafted for Elegance</span>
          </h1>

          {/* Gold divider */}
          <div className="mx-auto mb-8 h-[2px] w-20 bg-[#e6c36a]" />

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-14 leading-relaxed">
            Discover premium gold, silver & designer jewellery
            curated for weddings, festivals and everyday grace.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              className="px-12 py-4 bg-[#c8a24d] text-white tracking-widest
                   hover:bg-black transition-all duration-300
                   rounded-full shadow-lg hover:shadow-2xl"
            >
              WHATSAPP ENQUIRY
            </a>

            <a
              href="#categories"
              className="px-12 py-4 border border-white/80 text-white
                   hover:bg-white hover:text-black transition-all duration-300
                   rounded-full"
            >
              VIEW COLLECTIONS
            </a>
          </div>
        </div>
      </section>


      {/* ================= TRUST BAR ================= */}
      <section className="border-y">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            ["100%", "Quality Assured"],
            ["10K+", "Happy Customers"],
            ["50+", "Exclusive Designs"],
            ["WhatsApp", "Easy Ordering"],
          ].map(([title, subtitle]) => (
            <div key={title}>
              <p className="text-3xl font-serif text-[#c8a24d]">{title}</p>
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="bg-transparent p-0 m-0">
        <Image
          src="/images/rasika4.jpeg"
          alt="Rasika Style Jewels"
          width={1920}
          height={1080}
          priority
          className="w-full h-auto block"
        />
      </div>

      {/* ================= CATEGORIES ================= */}
      <section id="categories" className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore our curated jewellery collections and order directly via WhatsApp.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-14">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/shop?category=${encodeURIComponent(cat.title.toLowerCase())}`}
              className="group"
            >
              <div className="rounded overflow-hidden shadow-md hover:shadow-2xl transition duration-500 bg-white">
                <div className="relative">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    width={500}
                    height={600}
                    className="h-[420px] w-full object-cover
                               group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                </div>

                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {cat.desc}
                  </p>
                  <span className="text-sm tracking-widest text-[#c8a24d] group-hover:text-black transition">
                    EXPLORE →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-[#f7f4ee] py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-center mb-20">
            Why Choose Rasika Style Jewels
          </h2>

          <div className="grid md:grid-cols-3 gap-16 text-center">
            {[
              ["Certified Quality", "Carefully selected materials with expert craftsmanship."],
              ["Personal Assistance", "One-on-one WhatsApp support for every customer."],
              ["Trusted Brand", "Loved by jewellery buyers across generations."],
            ].map(([title, desc]) => (
              <div key={title}>
                <h3 className="font-serif text-xl mb-4">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-8 text-center">
        <h2 className="font-serif text-4xl mb-6">
          Find Jewellery That Defines You
        </h2>
        <p className="text-gray-500 mb-12">
          Message us on WhatsApp for pricing, images & custom assistance.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          className="inline-block px-12 py-4 bg-black text-white
                     tracking-widest hover:bg-[#c8a24d] transition rounded-sm"
        >
          CHAT ON WHATSAPP
        </a>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#111] text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-4">
              Rasika Style Jewels
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Curated collections of elegant jewellery designed for
              timeless beauty, celebrations, and everyday grace.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="tracking-widest text-sm text-white mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#categories" className="hover:text-[#c8a24d]">Collections</Link></li>
              <li><Link href="/shop" className="hover:text-[#c8a24d]">Shop</Link></li>
              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="tracking-widest text-sm text-white mb-4">
              CONTACT
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              📍 India
            </p>
            
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              className="inline-block mt-4 text-sm tracking-widest text-[#c8a24d] hover:text-white transition"
            >
              CHAT ON WHATSAPP →
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Rasika Style Jewels. All rights reserved.
        </div>
      </footer>

    </main>
  );
}
