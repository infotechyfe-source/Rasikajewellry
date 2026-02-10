'use client';

import {
  Inter,
  Playfair_Display,
  Merriweather,
} from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";

/* BODY FONT */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/* LUXURY DISPLAY FONT */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

/* ELEGANT SERIF – BODY / SUBHEAD */
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`
    ${inter.variable}
    ${playfair.variable}
    ${merriweather.variable}
  `}
    >
      <body className="antialiased font-[var(--font-geist-sans)]">
        {showNavbar && <Navbar />}
        {children}
      </body>
    </html>

  );
}
