"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "../context/FavoritesContext";

function HeartIcon({ filled = false, className = "" }: { filled?: boolean; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function FavoritesPage() {
  const { favorites, toggle } = useFavorites();
  const hasFavorites = favorites.length > 0;

  return (
    <main>
      <section className="w-full bg-white pt-32 pb-16">
        <div dir="rtl" className="site-container px-6 text-center lg:px-12">
          <h1 className="text-3xl font-bold text-black lg:text-4xl">המועדפים שלי</h1>
          <p className="mt-2 text-zinc-500">
            {hasFavorites ? `${favorites.length} דגמים שמורים` : "כאן יופיעו הדגמים ששמרת"}
          </p>

          {!hasFavorites ? (
            <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-5">
              <HeartIcon className="h-16 w-16 text-zinc-300" />
              <p className="text-xl font-semibold text-black">עדיין לא בחרת מועדפים</p>
              <p className="text-zinc-500">
                שמרו את הדגמים שאהבתם בלחיצה על הלב, ותחזרו אליהם כאן בכל זמן.
              </p>
              <Link
                href="/shop"
                className="mt-3 inline-flex items-center gap-3 bg-black px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                <span>לכל הקולקציה</span>
                <span aria-hidden>←</span>
              </Link>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((p) => (
                <div
                  key={p.id}
                  className="relative flex flex-col bg-white p-4 text-center"
                >
                  <button
                    type="button"
                    onClick={() => toggle(p)}
                    aria-label="הסר ממועדפים"
                    className="absolute left-4 top-4 text-red-500 transition-opacity hover:opacity-70"
                  >
                    <HeartIcon filled className="h-6 w-6" />
                  </button>
                  <div className="relative h-40">
                    <Image
                      src="/images/mock-product.png"
                      alt={typeof p.name === "string" ? p.name : ""}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <p className="mt-2 text-lg font-bold text-black">
                    {typeof p.name === "string" ? p.name : p.id}
                  </p>
                  {typeof p.price === "number" && (
                    <p className="mt-1 text-base font-semibold text-black">{p.price} ₪</p>
                  )}
                  <button
                    type="button"
                    className="mt-4 bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                  >
                    הוסף לסל
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
