'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

function NavbarContent() {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith('/admin');

  return showNavbar ? <Navbar /> : null;
}

export default function NavbarWrapper() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}
