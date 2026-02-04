import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "9120797254";

export default function Footer() {
  return (
    <footer className="bg-black text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* BRAND */}
        <div>
          <h3 className="font-serif text-2xl text-[#c8a24d] mb-6">
            Rasika <span className="text-white">Style Jewels</span>
          </h3>
          <p className="text-sm leading-relaxed text-white/50">
            Where artistry meets elegance. Each piece is crafted to
            celebrate timeless beauty and capture the essence of
            life’s most precious moments.
          </p>
        </div>

        {/* COLLECTIONS */}
        <div>
          <h4 className="text-sm tracking-widest uppercase text-[#c8a24d] mb-6">
            Collections
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/shop?category=necklaces" className="hover:text-white">Necklaces</Link></li>
            <li><Link href="/shop?category=earrings" className="hover:text-white">Earrings</Link></li>
            <li><Link href="/shop?category=bracelets" className="hover:text-white">Bracelets</Link></li>
            <li><Link href="/shop?category=rings" className="hover:text-white">Rings</Link></li>
            <li><Link href="/shop" className="hover:text-white">Bespoke Pieces</Link></li>
          </ul>
        </div>

        {/* EXPERIENCE */}
        <div>
          <h4 className="text-sm tracking-widest uppercase text-[#c8a24d] mb-6">
            Experience
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-white">Our Story</Link></li>
            <li><Link href="/craftsmanship" className="hover:text-white">Craftsmanship</Link></li>
            <li><Link href="/care-guide" className="hover:text-white">Care Guide</Link></li>
            <li><Link href="/appointments" className="hover:text-white">Appointments</Link></li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                className="hover:text-white"
              >
                Concierge
              </a>
            </li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h4 className="text-sm tracking-widest uppercase text-[#c8a24d] mb-6">
            Connect
          </h4>

          <div className="space-y-4 text-sm">
            <p className="flex items-start gap-3">
              <MapPin size={16} className="text-[#c8a24d]" />
              Jaipur, India
            </p>

            <p className="flex items-center gap-3">
              <Phone size={16} className="text-[#c8a24d]" />
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                className="hover:text-white"
              >
                +91 91207 97254
              </a>
            </p>

            <p className="flex items-center gap-3">
              <Clock size={16} className="text-[#c8a24d]" />
              By Appointment<br />Monday – Saturday
            </p>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10" />

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-4">
        <p>
          © {new Date().getFullYear()} Rasika Style Jewels. All rights reserved.
        </p>

        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
