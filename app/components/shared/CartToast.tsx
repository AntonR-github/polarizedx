"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const TOAST_MS = 3200;
const FALLBACK_IMG = "/images/mockproduct.jpg";

export default function CartToast() {
  const { toast, hideToast } = useCart();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(hideToast, TOAST_MS);
    return () => clearTimeout(t);
  }, [toast?.key]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!toast) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-4 left-4 right-4 z-[200] flex justify-center sm:left-auto sm:right-6 sm:justify-end"
      role="status"
      aria-live="polite"
    >
      <div
        key={toast.key}
        dir="rtl"
        className="cart-toast pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-2xl bg-[#0a0a0a] px-4 py-3 text-white shadow-2xl ring-1 ring-white/10"
      >
        <div className="flex items-center gap-3">
          {/* Animated success check */}
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/15 ring-1 ring-green-500/30">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
              <path
                className="cart-toast-check"
                d="M5 13l4 4L19 7"
                stroke="#22c55e"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* Product thumbnail */}
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white/5">
            <Image src={toast.image ?? FALLBACK_IMG} alt="" fill className="object-contain p-1" />
          </span>

          {/* Copy */}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-white/60">נוסף לסל{toast.qty > 1 ? ` · ${toast.qty} יח׳` : ""}</p>
            <p className="truncate text-sm font-semibold text-white">{toast.name}</p>
          </div>

          {/* Action */}
          <Link
            href="/cart"
            onClick={hideToast}
            className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-white/85"
          >
            צפייה בסל
          </Link>

          {/* Dismiss */}
          <button
            type="button"
            onClick={hideToast}
            aria-label="סגור"
            className="shrink-0 rounded-md p-1 text-white/50 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Countdown hairline */}
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
          <span className="cart-toast-progress block h-full w-full bg-green-500/70" style={{ ["--toast-duration" as string]: `${TOAST_MS}ms` }} />
        </span>
      </div>
    </div>
  );
}
