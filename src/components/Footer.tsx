import Link from "next/link";

const WHATSAPP_NUMBER = "9120797254";

export default function Footer() {
  return (
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
            <li>
              <Link href="#categories" className="hover:text-[#c8a24d]">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-[#c8a24d]">
                Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="tracking-widest text-sm text-white mb-4">
            CONTACT
          </h4>
          <p className="text-sm text-gray-400 mb-3">
            📍 Jaipur
          </p>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
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
  );
}
