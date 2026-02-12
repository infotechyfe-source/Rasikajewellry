import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "9120797254";

export default function Footer() {
  return (
    <footer className="bg-black text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* BRAND */}
        <div>
          <h3 className="font-serif text-2xl text-[#c8a24d] mb-4">
            Rasika <span className="text-white">Jewels</span>
          </h3>

          <p className="text-sm text-white/50 leading-relaxed max-w-sm">
            Timeless handcrafted jewellery designed to celebrate your most
            precious moments with elegance and grace.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#c8a24d] mb-6">
            Explore
          </h4>

          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/shop" className="hover:text-white transition">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/shop?category=necklaces" className="hover:text-white transition">
                Necklaces
              </Link>
            </li>
            <li>
              <Link href="/shop?category=rings" className="hover:text-white transition">
                Rings
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                Our Story
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#c8a24d] mb-6">
            Contact
          </h4>

          <div className="space-y-4 text-sm">
            <p className="flex items-start gap-3">
              <MapPin size={16} className="text-[#c8a24d] mt-1" />
              Jaipur, India
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Phone size={16} className="text-[#c8a24d]" />
              +91 91207 97254
            </a>
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10" />

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Rasika Jewels. All rights reserved.
      </div>
    </footer>
  );
}
