// app/layout.tsx
import { Inter, Playfair_Display, Merriweather } from "next/font/google";
import './globals.css';
import NavbarWrapper from '@/components/NavbarWrapper'; // a wrapper for client-only Navbar
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-playfair' });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['300','400','700','900'], variable: '--font-merriweather' });

export const metadata = {
  title: "Rasika Style Jewels",
  description: "Luxury Jewelry",
  icons: {
    icon: "/rasika-favicon.png", // favicon path
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${merriweather.variable}`}>
      <body className="antialiased font-[var(--font-geist-sans)]">
        <NavbarWrapper /> {/* only renders Navbar on non-admin pages */}
        {children}
         <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
