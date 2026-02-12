'use client';

import { Suspense } from "react";
import ShopPages from "@/components/ShopPage";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center mt-32 text-gray-400">Loading...</div>}>
      <ShopPages />
    </Suspense>
  );
}
