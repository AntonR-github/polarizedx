"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";

const PAGE_SIZE = 12;

// Mock products — replace with real catalog data later.
const products = [
  { id: "leopard-x", name: "LEOPARD X", color: "חום עם נקודות", price: 179 },
  { id: "clear-x", name: "CLEAR X", color: "שחור", price: 149 },
  { id: "navy-x", name: "NAVY X", color: "כחול כהה", price: 149 },
  { id: "wood-x", name: "WOOD X", color: "שחור + עץ", price: 199 },
  { id: "wild-x", name: "WILD X", color: "ירוק + פסים", price: 199 },
  { id: "black-x", name: "BLACK X", color: "שחור + עץ", price: 149 },
];

function ProductCard({ p }: { p: (typeof products)[number] }) {
  const { addItem } = useCart();
  return (
    <div className="flex w-full flex-col rounded-md border border-zinc-200 bg-white p-4 text-center">
      <div className="relative h-40">
        <Image src="/images/mockproduct.jpg" alt={p.name} fill className="object-contain p-2" />
      </div>
      <p className="mt-2 text-2xl font-bold text-black">{p.name}</p>
      <p className="mt-2 text-base text-black">{p.color}</p>
      <p className="mt-2 text-2xl font-bold text-black">₪ {p.price}</p>
      <button
        type="button"
        onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: "/images/mockproduct.jpg" })}
        className="mt-4 rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
      >
        הוסף לסל
      </button>
    </div>
  );
}

export default function ShopProducts() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageProducts = products.slice(start, start + PAGE_SIZE);

  return (
    <section className="w-full bg-white py-10">
      {/* ── Mobile + tablet: single/two column grid ── */}
      <div dir="rtl" className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:hidden">
        {pageProducts.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      {/* ── Desktop: grid ── */}
      <div
        dir="rtl"
        className="site-container hidden lg:grid lg:grid-cols-[repeat(3,clamp(16rem,22vw,24.5rem))] justify-center gap-x-8 gap-y-6 px-12"
      >
        {pageProducts.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      {totalPages > 1 && (
        <div dir="rtl" className="mt-8 flex items-center justify-center gap-2 px-6">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            הקודם
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={page === n}
              className={`h-9 w-9 rounded-md text-sm font-semibold transition-colors ${
                page === n ? "bg-black text-white" : "text-black hover:bg-zinc-100"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            הבא
          </button>
        </div>
      )}
    </section>
  );
}
