"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ShieldCheck, MessageCircle, HeartHandshake, Truck, RefreshCcw, } from "lucide-react";
const WHATSAPP_NUMBER = "919120797254";

import { categories, categoryImages } from "@/data/categories";

const features = [
  { icon: ShieldCheck, title: "Certified Quality", desc: "Carefully selected materials..." },
  { icon: MessageCircle, title: "Personal Assistance", desc: "One-on-one WhatsApp support..." },
  { icon: HeartHandshake, title: "Trusted Brand", desc: "Loved across generations." },
];

type Testimonial = {
  name: string;
  location: string;
  message: string;
  image_url: string;
};

const defaultTestimonial: Testimonial = {
  name: "Isabella Montgomery",
  location: "London, United Kingdom",
  message:
    "The moment I wore my engagement ring, I felt the weight of a thousand love stories before mine. RASIKA doesn’t just create jewelry — they craft heirlooms that transcend time.",
  image_url: "/images/testinomial.png",
};

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [videos, setVideos] = useState<string[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  /* ================= FETCH HERO VIDEOS ================= */
  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase
        .from("hero_videos")
        .select("video_url")
        .order("created_at", { ascending: true });

      if (data && data.length > 0) {
        setVideos(data.map((v) => v.video_url));
      }
    };

    fetchVideos();
  }, []);

  /* ================= FETCH TESTIMONIALS ================= */
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      const formatted: Testimonial[] = (data ?? []).map((item: any) => ({
        name: item.name,
        location: item.location,
        message: item.message,
        image_url: item.image_url,
      }));

      setTestimonials([defaultTestimonial, ...formatted]);
    };

    fetchData();
  }, []);


  /* ================= VIDEO AUTO SLIDE ================= */
  useEffect(() => {
    if (videos.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [videos]);

  /* ================= TRANSITION CONTROL ================= */
  useEffect(() => {
    setIsTransitioning(true);
  }, [current]);

  /* ================= TESTIMONIAL ACTIVE ================= */
  const activeTestimonial =
    testimonials.length > 0
      ? testimonials[testimonialIndex]
      : defaultTestimonial;

  /* ================= TESTIMONIAL NAVIGATION ================= */
  const prevTestimonial = () => {
    if (testimonials.length === 0) return;

    setTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;

    setTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main className="bg-[#f8f7e2] text-gray-800 w-full overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden flex flex-col md:min-h-screen">

        {/* 🎥 VIDEO CONTAINER */}
        <div className="relative w-full h-[41vh] md:h-screen overflow-hidden">

          <div
            className={`absolute inset-0 flex ${isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""
              }`}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {videos.map((video, index) => (
              <div key={index} className="relative w-full h-full shrink-0">

                <video
                  className="absolute top-0 left-0 w-full h-full
                     object-cover md:object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={video} type="video/mp4" />
                </video>

              </div>
            ))}
          </div>

          {/* 🖤 DARK GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

          {/* TEXT CONTENT */}
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center z-10">
            <div className="max-w-3xl">

              <h1 className="font-playfair text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight">
                <span className="text-[#e6c36a] block">
                  ELEGANCE REDEFINED
                </span>
              </h1>

              <p className="mt-3 mb-5 text-xs sm:text-sm md:text-lg text-white max-w-lg mx-auto">
                Discover the timeless beauty of handcrafted jewelry made to celebrate your moments.
              </p>

              <a
                href="/shop"
                className="inline-block px-6 py-2 md:px-8 md:py-3 text-xs sm:text-sm font-semibold 
          bg-[#8B4513] text-white tracking-widest
          hover:bg-[#EEE2DA]/95 hover:text-[#8B4513] transition duration-300"
              >
                SHOP NOW
              </a>

            </div>
          </div>

          {/* MOBILE SOCIAL ICONS */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 
                flex md:hidden gap-5 z-20">

            {/* WhatsApp */}
            <a href="#" className="group">
              <div className="w-10 h-10 rounded-full bg-[#EEE2DA] flex items-center justify-center
        group-hover:bg-[#e6c36a] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#8B4513">
                  <path d="M20.52 3.48A11.76 11.76 0 0 0 12.04 0C5.4 0 .02 5.38.02 12c0 2.12.55 4.2 1.6 6.04L0 24l6.14-1.6a11.94 11.94 0 0 0 5.9 1.5h.01c6.63 0 12.01-5.38 12.01-12a11.9 11.9 0 0 0-3.54-8.42ZM12.04 22a9.95 9.95 0 0 1-5.1-1.4l-.37-.22-3.64.95.97-3.55-.24-.36A9.94 9.94 0 1 1 12.04 22Zm5.44-7.45c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.49-1.8-1.67-2.1-.17-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.57-.48-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.17 4.56.72.3 1.28.48 1.72.62.72.23 1.37.2 1.89.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                </svg>
              </div>
            </a>

            {/* Instagram */}
            <a href="#" className="group">
              <div className="w-10 h-10 rounded-full bg-[#EEE2DA] flex items-center justify-center
        group-hover:bg-[#e6c36a] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#8B4513">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.4a4.6 4.6 0 0 1 1.66 1.08 4.6 4.6 0 0 1 1.08 1.66c.16.42.35 1.05.4 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.4 2.22a4.6 4.6 0 0 1-1.08 1.66 4.6 4.6 0 0 1-1.66 1.08c-.42.16-1.05.35-2.22.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.4a4.6 4.6 0 0 1-1.66-1.08 4.6 4.6 0 0 1-1.08-1.66c-.16-.42-.35-1.05-.4-2.22C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.24-1.8.4-2.22a4.6 4.6 0 0 1 1.08-1.66A4.6 4.6 0 0 1 5.37 2.63c.42-.16 1.05-.35 2.22-.4C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.4-10.8a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z" />
                </svg>
              </div>
            </a>

            {/* Facebook */}
            <a href="#" className="group">
              <div className="w-10 h-10 rounded-full bg-[#EEE2DA] flex items-center justify-center
        group-hover:bg-[#e6c36a] transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#8B4513">
                  <path d="M22.68 0H1.32A1.32 1.32 0 0 0 0 1.32v21.36A1.32 1.32 0 0 0 1.32 24h11.5v-9.3H9.69v-3.62h3.13V8.41c0-3.1 1.89-4.78 4.65-4.78 1.32 0 2.45.1 2.78.14v3.22h-1.91c-1.5 0-1.79.71-1.79 1.76v2.3h3.58l-.47 3.62h-3.11V24h6.09A1.32 1.32 0 0 0 24 22.68V1.32A1.32 1.32 0 0 0 22.68 0Z" />
                </svg>
              </div>
            </a>

          </div>
        </div>

        {/* 💻 DESKTOP SOCIAL ICONS */}
        <div className="hidden md:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex-col gap-5">

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
      <section className="bg-[#EEE2DA] border-t border-[#e6c36a]/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-12">

          {/* 3 columns on mobile for compact look */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-14 text-center md:text-left">

            {/* FREE SHIPPING */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6">
              <div className="flex items-center justify-center w-9 h-9 md:w-14 md:h-14 rounded-full bg-white shadow-sm">
                <Truck className="text-[#5C2B06] w-4 h-4 md:w-8 md:h-8" />
              </div>
              <div>
                <p className="text-[9px] md:text-[13px] font-semibold tracking-wider md:tracking-[0.35em] text-[#5C2B06]">
                  FREE SHIPPING
                </p>
                <span className="hidden md:block text-sm text-[#7a4a2c]">
                  Complimentary delivery on orders above ₹1,999
                </span>
              </div>
            </div>

            {/* EASY RETURNS */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6">
              <div className="flex items-center justify-center w-9 h-9 md:w-14 md:h-14 rounded-full bg-white shadow-sm">
                <RefreshCcw className="text-[#5C2B06] w-4 h-4 md:w-8 md:h-8" />
              </div>
              <div>
                <p className="text-[9px] md:text-[13px] font-semibold tracking-wider md:tracking-[0.35em] text-[#5C2B06]">
                  EASY RETURNS
                </p>
                <span className="hidden md:block text-sm text-[#7a4a2c]">
                  Hassle-free in-store & online returns
                </span>
              </div>
            </div>

            {/* SECURE PAYMENTS */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6">
              <div className="flex items-center justify-center w-9 h-9 md:w-14 md:h-14 rounded-full bg-white shadow-sm">
                <ShieldCheck className="text-[#5C2B06] w-4 h-4 md:w-8 md:h-8" />
              </div>
              <div>
                <p className="text-[9px] md:text-[13px] font-semibold tracking-wider md:tracking-[0.35em] text-[#5C2B06]">
                  SECURE PAYMENTS
                </p>
                <span className="hidden md:block text-sm text-[#7a4a2c]">
                  Encrypted & trusted checkout experience
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SIGNATURE COLLECTION ================= */}

      <section className="relative bg-[#1b0f08] py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="grid grid-cols-2 items-center gap-6 md:gap-12 lg:gap-16">

            {/* IMAGE SIDE */}
            <div className="relative flex justify-center">

              {/* Decorative frames */}
              <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 
                        w-14 h-14 md:w-28 md:h-28 
                        border border-[#c8a24d]/70" />
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 
                        w-14 h-14 md:w-28 md:h-28 
                        border border-[#c8a24d]/70" />

              <img
                src="/images/signature-model.png"
                alt="Signature Collection"
                className="relative z-10 
                     w-full 
                     max-w-[160px] 
                     md:max-w-sm 
                     lg:max-w-md 
                     object-cover 
                     shadow-xl"
              />
            </div>

            {/* CONTENT SIDE */}
            <div className="relative bg-[#f7e9dd] p-2 md:p-10 lg:p-14">

              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#c8a24d]" />

              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#8b4a16]">
                New Arrivals
              </span>

              <h2 className="mt-3 md:mt-6 font-serif 
                       text-lg md:text-4xl lg:text-5xl 
                       text-black leading-[1.15]">
                Signature <br /> Collection
              </h2>

              <div className="w-12 md:w-20 h-px bg-black my-4 md:my-8" />

              <p className="text-[11px] md:text-base 
                      leading-relaxed text-black/80 
                      max-w-xs md:max-w-md">
                Exquisite pieces meticulously handcrafted by master artisans.
                Each creation embodies timeless elegance, refined artistry,
                and the pursuit of perfection — an investment in heritage
                that transcends generations.
              </p>

              <button
                className="mt-4 md:mt-10 inline-flex items-center 
             gap-1 md:gap-3
             border border-[#8b4a16] text-[#8b4a16]
             px-3 md:px-10 
             py-1.5 md:py-4
             text-[9px] md:text-xs 
             tracking-widest uppercase
             hover:bg-[#8b4a16] hover:text-white
             transition duration-300 cursor-pointer"
              >
                Explore Collection
                <span className="text-xs md:text-base">→</span>
              </button>


            </div>

          </div>

        </div>
      </section>

      {/* ================= SHOP BY CATEGORY ================= */}
      <section
        id="categories"
        className="bg-[#EEE2DA]/90 py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* HEADING */}
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#c8a24d]">
              Shop by Category
            </h2>
            <p className="text-base md:text-lg italic text-[#8b4a16] mt-2">
              Indulge in what we offer.
            </p>
          </div>

          {/* CATEGORY GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className="group"
              >
                <div className="relative overflow-hidden bg-[#111]">

                  <div className="relative w-full aspect-3/4 overflow-hidden">
                    <Image
                      src={categoryImages[cat]}
                      alt={cat}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700 ease-out"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                  <div className="absolute bottom-0 left-0 w-full bg-black/80 py-2 md:py-3 text-center">
                    <span className="font-serif text-xs md:text-sm text-white tracking-wide capitalize">
                      {cat}
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </div>

          {/* VIEW ALL BUTTON */}
          <div className="mt-10 md:mt-14 flex justify-center">
            <Link
              href="/shop"
              className="border text-[#8b4a16] px-10 py-3 text-xs tracking-widest uppercase hover:bg-[#8b4a16] hover:text-[#e6c36a] transition"
            >
              View All
            </Link>
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="relative py-20 md:py-32  bg-gradient-to-r from-[#1b0f08] via-[#2a150b] to-[#1b0f08]  overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* HEADER + NAV */}
          <div className="flex items-center justify-between mb-16 md:mb-24">

            <div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#c8a24d] leading-tight">
                What They Say
              </h2>
              <span className="text-xs tracking-[0.3em] uppercase text-[#c8a24d]/80">
                Client Stories
              </span>
            </div>

            {/* NAVIGATION */}
            <div className="flex gap-3">
              <button
                onClick={prevTestimonial}
                className="w-9 h-9 md:w-11 md:h-11  rounded-full  border border-[#c8a24d]  text-[#c8a24d]
               hover:bg-[#c8a24d]  hover:text-black  hover:scale-105  transition duration-300  flex items-center justify-center cursor-pointer">
                ‹
              </button>

              <button
                onClick={nextTestimonial}
                className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-[#c8a24d] text-[#c8a24d] hover:bg-[#c8a24d] hover:text-black hover:scale-105 transition duration-300 flex items-center justify-center cursor-pointer">
                ›
              </button>
            </div>

          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 
                    gap-14 md:gap-20 lg:gap-28 
                    items-center">

            {/* IMAGE */}
            <div className="relative max-w-sm md:max-w-md mx-auto lg:mx-0 w-full">

              <div className="absolute -top-6 -left-6 w-20 h-20 border border-[#c8a24d]/70" />

              <img
                src={activeTestimonial.image_url}
                alt={activeTestimonial.name}
                className="relative z-10 w-full aspect-[3/4] object-cover shadow-xl"
              />


              <div className="absolute -bottom-6 -right-6 w-20 h-20 border border-[#c8a24d]/70" />
            </div>

            {/* CONTENT */}
            <div className="text-white max-w-xl mx-auto lg:mx-0">



              {/* TEXT */}
              <p className="font-serif text-lg md:text-2xl 
              leading-relaxed text-white/90 
              mb-10">
                {activeTestimonial.message}
              </p>

              {/* CLIENT INFO */}
              <div>
                <p className="font-serif text-xl text-white">
                  {activeTestimonial.name}
                </p>

                <p className="text-sm text-[#c8a24d] tracking-widest uppercase mt-1">
                  {activeTestimonial.location}
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= SPOTTED IN RASIKA ================= */}
      <section className="bg-[#efe5f0] py-16 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">

          {/* HEADING */}
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-serif text-3xl md:text-5xl text-[#c8a24d] tracking-wide">
              Spotted in Rasika
            </h2>
            <p className="text-black/70 mt-3 md:mt-4 text-xs md:text-sm tracking-widest uppercase">
              Styled by you
            </p>
          </div>

          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">

            {/* TOP LEFT */}
            <div className="relative overflow-hidden rounded-lg md:rounded-xl group">
              <img
                src="/images/spotted1.png"
                alt="Spotted 1"
                className="w-full h-full object-cover aspect-[3/4]
                 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />
            </div>

            {/* BIG CENTER IMAGE */}
            <div className="relative overflow-hidden rounded-lg md:rounded-xl group
                  row-span-2">
              <img
                src="/images/spotted2.png"
                alt="Spotted 2"
                className="w-full h-full object-cover aspect-[3/4]
                 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />
            </div>

            {/* TOP RIGHT */}
            <div className="relative overflow-hidden rounded-lg md:rounded-xl group">
              <img
                src="/images/spotted3.png"
                alt="Spotted 3"
                className="w-full h-full object-cover aspect-[3/4]
                 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />
            </div>

            {/* BOTTOM LEFT */}
            <div className="relative overflow-hidden rounded-lg md:rounded-xl group">
              <img
                src="/images/spotted4.png"
                alt="Spotted 4"
                className="w-full h-full object-cover aspect-[3/4]
                 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />
            </div>

            {/* BOTTOM RIGHT */}
            <div className="relative overflow-hidden rounded-lg md:rounded-xl group">
              <img
                src="/images/spotted5.png"
                alt="Spotted 5"
                className="w-full h-full object-cover aspect-[3/4]
                 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />
            </div>

          </div>


        </div>
      </section>

      {/* ================= JOIN OUR INNER CIRCLE ================= */}
      <section className="relative py-16 overflow-hidden">

        {/* Subtle Gold Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#c8a24d]/10 via-transparent to-[#8b4a16]/10 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">

          {/* HEADING */}
          <h2 className="font-serif text-4xl md:text-6xl text-[#c8a24d] mb-6 tracking-wide">
            Join Our Inner Circle
          </h2>

          {/* Elegant Divider */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c8a24d] to-transparent mx-auto mb-6" />

          <p className="italic text-sm md:text-base text-gray/70 mb-6">
            Indulge in what we offer.
          </p>

          {/* DESCRIPTION */}
          <p className="max-w-2xl mx-auto text-sm md:text-base text-black/60 leading-relaxed mb-12">
            Be the first to discover new collections, receive exclusive offers,
            and enjoy VIP access to private viewings and special events.
          </p>

          {/* CTA BUTTON */}
          <div className="flex justify-center">
            <a
              href="https://wa.me/919120797254"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group bg-[#8b4a16] text-white px-12 py-4 text-xs md:text-sm tracking-[0.2em] uppercase rounded overflow-hidden transition-all duration-500 hover:scale-105"
            >
              <span className="relative z-10">Join via WhatsApp</span>

              {/* Hover Gold Effect */}
              <span className="absolute inset-0 bg-[#c8a24d] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            </a>
          </div>

          {/* PRIVACY NOTE */}
          <p className="mt-8 text-xs text-black/40">
            We respect your privacy. Unsubscribe anytime.
          </p>

        </div>
      </section>


      <Footer />

    </main>
  );
}
