import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ShieldCheck, MessageCircle, HeartHandshake, Truck, RefreshCcw, } from "lucide-react";
const WHATSAPP_NUMBER = "919120797254";

const categories = [
  { title: "Artificial Jewellery", image: "/images/artificial.jpeg", desc: "Trendy & affordable styles", },
  { title: "Nose Ring", image: "/images/nose.png", desc: "Traditional & modern nose pins", },
  { title: "Ear Wear", image: "/images/ear1.jpeg", desc: "Earrings for every occasion", },
  { title: "Hand Wear", image: "/images/hand.jpg", desc: "Bangles, bracelets & rings", },
  { title: "Rings", image: "/images/ring1.webp", desc: "All kinds of rings" },
  { title: "Necklace Set", image: "/images/necklace.jpeg", desc: "Elegant necklace collections" },
  { title: "Mangalsutra", image: "/images/mangalsutra.webp", desc: "Daily wear & bridal mangalsutras" },
  { title: "Payal", image: "/images/payal.jpg", desc: "Anklets for every style" },
  { title: "Toe Ring", image: "/images/toering.webp", desc: "Chutki / Bichhiya designs" },
  { title: "Bangles", image: "/images/bangle.jpg", desc: "Traditional & modern bangles" },
  { title: "Pendant", image: "/images/pendant.jpeg", desc: "Elegant pendant chains" },
  { title: "Maang Tikka", image: "/images/tikka.webp", desc: "Bridal & festive tikka" },
];

const features = [
  { icon: ShieldCheck, title: "Certified Quality", desc: "Carefully selected materials..." },
  { icon: MessageCircle, title: "Personal Assistance", desc: "One-on-one WhatsApp support..." },
  { icon: HeartHandshake, title: "Trusted Brand", desc: "Loved across generations." },
];


export default function Home() {
  return (
    <main className="bg-[#f8f7e2] text-gray-800">

      {/* ================= HERO ================= */}
      <section className="relative h-[100vh] max-h-[900px] overflow-hidden flex items-center justify-center">

        <video
          className="absolute inset-0 w-full h-full object-cover object-top"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >

          <source src="/videos/hero-jewellery.mp4" type="video/mp4" />
        </video>

        {/* 🖤 DARK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

        {/* 📝 HERO CONTENT */}
        <div className="relative z-10 text-center max-w-5xl px-6">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            <span className="text-[#e6c36a] block mb-2">
              ELEGANCE REDEFINED
            </span>

          </h1>

          <p className="font-playfair text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover the timeless beauty of handcrafted jewelry made to celebrate your moments.
          </p>

          <a
            href="/shop"
            className="inline-block px-10 py-4 border border-[#8B4513] text-white tracking-widest
                 hover:bg-[#8B4513] hover:text-[#e6c36a] transition duration-300"
          >
            SHOP NOW
          </a>
        </div>

        {/* 📱 SOCIAL ICONS (RIGHT SIDE) */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-5">

          {/* WhatsApp */}
          <a href="#" className="group">
            <div className="w-11 h-11 rounded-full bg-[#EEE2DA] flex items-center justify-center
                      group-hover:bg-[#e6c36a] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#8B4513">
                <path d="M20.52 3.48A11.76 11.76 0 0 0 12.04 0C5.4 0 .02 5.38.02 12c0 2.12.55 4.2 1.6 6.04L0 24l6.14-1.6a11.94 11.94 0 0 0 5.9 1.5h.01c6.63 0 12.01-5.38 12.01-12a11.9 11.9 0 0 0-3.54-8.42ZM12.04 22a9.95 9.95 0 0 1-5.1-1.4l-.37-.22-3.64.95.97-3.55-.24-.36A9.94 9.94 0 1 1 12.04 22Zm5.44-7.45c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.49-1.8-1.67-2.1-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.57-.48-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.17 4.56.72.3 1.28.48 1.72.62.72.23 1.37.2 1.89.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
              </svg>
            </div>
          </a>

          {/* Instagram */}
          <a href="#" className="group">
            <div className="w-11 h-11 rounded-full bg-[#EEE2DA] flex items-center justify-center
                      group-hover:bg-[#e6c36a] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#8B4513">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.4a4.6 4.6 0 0 1 1.66 1.08 4.6 4.6 0 0 1 1.08 1.66c.16.42.35 1.05.4 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.4 2.22a4.6 4.6 0 0 1-1.08 1.66 4.6 4.6 0 0 1-1.66 1.08c-.42.16-1.05.35-2.22.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.4a4.6 4.6 0 0 1-1.66-1.08 4.6 4.6 0 0 1-1.08-1.66c-.16-.42-.35-1.05-.4-2.22C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.24-1.8.4-2.22a4.6 4.6 0 0 1 1.08-1.66A4.6 4.6 0 0 1 5.37 2.63c.42-.16 1.05-.35 2.22-.4C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.4-10.8a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z" />
              </svg>
            </div>
          </a>

          {/* Facebook */}
          <a href="#" className="group">
            <div className="w-11 h-11 rounded-full bg-[#EEE2DA] flex items-center justify-center
                      group-hover:bg-[#e6c36a] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#8B4513">
                <path d="M22.68 0H1.32A1.32 1.32 0 0 0 0 1.32v21.36A1.32 1.32 0 0 0 1.32 24h11.5v-9.3H9.69v-3.62h3.13V8.41c0-3.1 1.89-4.78 4.65-4.78 1.32 0 2.45.1 2.78.14v3.22h-1.91c-1.5 0-1.79.71-1.79 1.76v2.3h3.58l-.47 3.62h-3.11V24h6.09A1.32 1.32 0 0 0 24 22.68V1.32A1.32 1.32 0 0 0 22.68 0Z" />
              </svg>
            </div>
          </a>

        </div>
      </section>

      <div className="bg-gray-800 p-0 m-0">
      </div>

      {/* ================= FEATURES STRIP ================= */}
      <section className="bg-[#EEE2DA] border-t border-[#e6c36a]/50">
        <div className="max-w-7xl mx-auto px-8 py-20">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

            {/* FREE SHIPPING */}
            <div className="flex items-start gap-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-full
                        bg-white shadow-sm">
                <Truck size={32} className="text-[#5C2B06]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold tracking-[0.35em] text-[#5C2B06] mb-2">
                  FREE SHIPPING
                </p>
                <span className="text-sm text-[#7a4a2c] leading-relaxed">
                  Complimentary delivery on orders above ₹49,999
                </span>
              </div>
            </div>

            {/* FREE RETURNS */}
            <div className="flex items-start gap-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-full
                        bg-white shadow-sm">
                <RefreshCcw size={32} className="text-[#5C2B06]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold tracking-[0.35em] text-[#5C2B06] mb-2">
                  EASY RETURNS
                </p>
                <span className="text-sm text-[#7a4a2c] leading-relaxed">
                  Hassle-free in-store & online returns
                </span>
              </div>
            </div>

            {/* SECURE CHECKOUT */}
            <div className="flex items-start gap-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-full
                        bg-white shadow-sm">
                <ShieldCheck size={32} className="text-[#5C2B06]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold tracking-[0.35em] text-[#5C2B06] mb-2">
                  SECURE PAYMENTS
                </p>
                <span className="text-sm text-[#7a4a2c] leading-relaxed">
                  Encrypted & trusted checkout experience
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="relative bg-[#1b0f08] py-20 md:py-28">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* IMAGE SIDE */}
            <div className="relative flex justify-center">
              {/* Decorative frames */}
              <div className="absolute -top-8 -left-8 w-28 h-28 border border-[#c8a24d]/70" />
              <div className="absolute -bottom-8 -right-8 w-28 h-28 border border-[#c8a24d]/70" />

              <img
                src="/images/signature-model.png"
                alt="Signature Collection"
                className="relative z-10 w-full max-w-md object-cover
                     shadow-xl"
              />
            </div>

            {/* CONTENT CARD */}
            <div className="relative bg-[#f7e9dd] p-12 md:p-14">

              {/* subtle accent */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#c8a24d]" />

              <span className="text-xs tracking-[0.3em] uppercase text-[#8b4a16]">
                New Arrivals
              </span>

              <h2 className="mt-6 font-serif text-4xl md:text-5xl text-black leading-[1.15]">
                Signature <br /> Collection
              </h2>

              <div className="w-20 h-px bg-black my-8" />

              <p className="text-base leading-relaxed text-black/80 max-w-md">
                Exquisite pieces meticulously handcrafted by master artisans.
                Each creation embodies timeless elegance, refined artistry,
                and the pursuit of perfection — an investment in heritage
                that transcends generations.
              </p>

              <button
                className="mt-10 inline-flex items-center gap-3
                     border border-[#8b4a16] text-[#8b4a16]
                     px-10 py-4 text-xs tracking-widest uppercase
                     hover:bg-[#8b4a16] hover:text-white
                     transition duration-300 cursor-pointer"
              >
                Explore Collection
                <span className="text-base">→</span>
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* ================= SHOP BY CATEGORY ================= */}
      <section
        id="categories"
        className="bg-[#EEE2DA]/90 py-20"
      >
        <div className="max-w-auto mx-auto px-16">

          {/* HEADING */}
          <div className="text-center mb-16">
            <h2 className="text-[80px] font-serif text-4xl text-[#c8a24d] mb-2">
              Shop by Category
            </h2>
            <p className="text-l italic text-[#8b4a16]">
              Indulge in what we offer.
            </p>
          </div>

          {/* CATEGORY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={`/shop?category=${encodeURIComponent(cat.title.toLowerCase())}`}
                className="group"
              >
                <div className="relative overflow-hidden bg-[#111]">

                  {/* IMAGE */}
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    width={500}
                    height={700}
                    className="h-[350px] md:h-[420px] lg:h-[450px] w-full object-cover 
                     group-hover:scale-105 transition duration-700 ease-out"
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                  {/* CATEGORY NAME */}
                  <div className="absolute bottom-0 left-0 w-full bg-black/80 py-3 text-center">
                    <span className="font-serif text-sm text-white tracking-wide">
                      {cat.title}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* VIEW ALL BUTTON */}
          <div className="mt-14 flex justify-center">
            <Link
              href="/shop"
              className="border border-[#8b4a16] text-white px-10 py-3 text-xs tracking-widest uppercase hover:bg-[#8b4a16] hover:text-[#e6c36a] transition"
            >
              View All
            </Link>
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="relative py-28 bg-gradient-to-r from-[#1b0f08] via-[#2a150b] to-[#1b0f08] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="mb-20">
            <span className="text-xs tracking-widest uppercase text-[#c8a24d]">
              Client Stories
            </span>
            <h2 className="font-serif text-5xl mt-3 text-[#c8a24d]">
              What They Say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

            {/* IMAGE */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute -top-5 -left-5 w-20 h-20 border border-[#c8a24d]" />

              <img
                src="/images/testinomial.png"
                alt="Client"
                className="relative z-10 w-full h-[420px] object-cover"
              />

              <div className="absolute -bottom-5 -right-5 w-20 h-20 border border-[#c8a24d]" />
            </div>

            {/* CONTENT */}
            <div className="relative text-white max-w-xl h-[420px] flex flex-col justify-between">

              {/* TOP CONTENT */}
              <div>
                {/* NAV ARROWS */}
                <div className="absolute right-0  -translate-y-1/2 flex flex-col gap-4">
                  <button className="w-10 h-10 border border-[#c8a24d] text-[#c8a24d]
                             hover:bg-[#c8a24d] hover:text-black transition">
                    ‹
                  </button>
                  <button className="w-10 h-10 border border-[#c8a24d] text-[#c8a24d]
                             hover:bg-[#c8a24d] hover:text-black transition">
                    ›
                  </button>
                </div>
                {/* QUOTE ICON */}
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-8">
                  <span className="text-3xl text-[#c8a24d]">“</span>
                </div>

                {/* TESTIMONIAL TEXT */}
                <p className="font-serif text-xl leading-relaxed text-white/90">
                  The moment I wore my engagement ring, I felt the weight of a
                  thousand love stories before mine. RASIKA doesn’t just create
                  jewelry — they craft heirlooms that transcend time.
                </p>
              </div>

              {/* CLIENT INFO */}
              <div>
                <p className="font-serif text-lg text-white">
                  Isabella Montgomery
                </p>
                <p className="text-sm text-[#c8a24d] tracking-wide">
                  London, United Kingdom
                </p>
              </div>



            </div>
          </div>
        </div>
      </section>

      {/* ================= SPOTTED IN RASIKA ================= */}
      <section className="bg-[#efe5f0] py-28">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl text-[#c8a24d] tracking-wide">
              Spotted in Rasika
            </h2>
            <p className="text-black/70 mt-4 text-sm tracking-widest uppercase">
              Styled by you
            </p>
          </div>

          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

            {/* IMAGE CARD */}
            {[
              "/images/spotted1.png",
              "/images/spotted3.png",
              "/images/spotted2.png",
              "/images/spotted4.png",
              "/images/spotted5.png",
            ].map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl group
            ${i === 1 ? "md:col-span-2 md:row-span-2" : ""}
          `}
              >
                <img
                  src={img}
                  alt={`Rasika look ${i + 1}`}
                  className="w-full h-full object-cover aspect-[3/4]
                       group-hover:scale-105 transition-transform duration-700"
                />

                {/* GOLD OVERLAY */}
                <div className="absolute inset-0 bg-black/10 
                          group-hover:bg-black/30 transition" />

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= JOIN OUR INNER CIRCLE ================= */}
      <section className="bg-black py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">

          {/* HEADING */}
          <h2 className="font-serif text-4xl md:text-5xl text-[#c8a24d] mb-4">
            Join Our Inner Circle
          </h2>

          <p className="italic text-sm text-white/60 mb-6">
            Indulge in what we offer.
          </p>

          {/* DESCRIPTION */}
          <p className="max-w-2xl mx-auto text-sm text-white/50 leading-relaxed mb-10">
            Be the first to discover new collections, receive exclusive offers,
            and enjoy VIP access to private viewings and special events.
          </p>

          {/* CTA BUTTON */}
          <div className="flex justify-center">
            <a
              href="https://wa.me/919120797254"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8b4a16] text-white px-12 py-4 text-xs tracking-widest uppercase
                   hover:bg-[#c8a24d] hover:text-black transition duration-300"
            >
              Join via WhatsApp
            </a>
          </div>

          {/* PRIVACY NOTE */}
          <p className="mt-6 text-xs text-white/40">
            We respect your privacy. Unsubscribe anytime.
          </p>

        </div>
      </section>

      <Footer />

    </main>
  );
}
