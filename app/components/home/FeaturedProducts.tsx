"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { StoreProduct } from "../../../lib/products";

const FALLBACK_IMG = "/images/mockproduct.jpg";

function ProductCard({ p }: { p: StoreProduct }) {
  const image = p.thumbnail ?? p.images?.[0] ?? FALLBACK_IMG;
  return (
    <Link
      href={`/shop/${p.handle || p.id}`}
      className="group mx-auto flex w-full max-w-90 flex-col self-start rounded-md bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative h-56">
        <Image
          src={image}
          alt={p.name}
          fill
          className="object-contain p-1"
        />
      </div>
      <div dir="rtl" className="flex flex-col gap-1 border-t border-zinc-100 px-3 py-2.5 text-right">
        <span className="line-clamp-2 min-h-[3.1rem] text-lg font-bold leading-snug text-black">{p.name}</span>
        <span className="text-lg font-semibold text-black">{p.price} ₪</span>
      </div>
    </Link>
  );
}

function TextCta({ className = "", center = false }: { className?: string; center?: boolean }) {
  return (
    <div
      dir="rtl"
      className={`flex flex-col justify-center gap-5 ${center ? "items-center text-center" : "items-start text-right"} ${className}`}
    >
      <p className="text-[36px] font-normal leading-[1.08] text-black lg:text-[42px]">
        לכל שימוש.
        <br className="hidden lg:block" />
        לכל אירוע.
        <br />
        תמיד איתך.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center gap-4 rounded-md bg-black px-8 py-4 text-xl font-semibold text-white transition-colors hover:bg-zinc-800"
      >
        <span>לכל הקולקציה</span>
        <span aria-hidden>←</span>
      </Link>
    </div>
  );
}

export default function FeaturedProducts({ products }: { products: StoreProduct[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: "rtl", align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const [desktopEmblaRef, desktopEmblaApi] = useEmblaCarousel({ direction: "ltr", align: "start" });
  const [desktopSelectedIndex, setDesktopSelectedIndex] = useState(0);
  const [desktopScrollSnaps, setDesktopScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onDesktopSelect = useCallback((api: NonNullable<typeof desktopEmblaApi>) => {
    setDesktopSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!desktopEmblaApi) return;
    setDesktopScrollSnaps(desktopEmblaApi.scrollSnapList());
    onDesktopSelect(desktopEmblaApi);
    desktopEmblaApi.on("select", onDesktopSelect);
    desktopEmblaApi.on("reInit", onDesktopSelect);
  }, [desktopEmblaApi, onDesktopSelect]);

  return (
    <section className="w-full pt-5 pb-5 bg-[#DBDBDB]">
      {/* ── Mobile + tablet: text/CTA above slider ── */}
      <div className="lg:hidden px-6 py-10">
        <TextCta className="mb-8" center />
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div dir="rtl" className="flex -ms-4">
            {products.map((p) => (
              <div key={p.id} className="min-w-0 shrink-0 grow-0 basis-[70%] ps-4 sm:basis-[45%]">
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </div>
        {scrollSnaps.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`עבור למוצר ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all ${i === selectedIndex ? "w-6 bg-black" : "w-2 bg-black/25"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop: slider ── */}
      {/* dir=ltr locks card order NAVY X → BLACK X with the text block on the right */}
      <div dir="ltr" className="mx-auto hidden w-full max-w-[1650px] lg:flex lg:items-center lg:gap-6 lg:px-12 lg:py-10">
        <div className="relative min-w-0 flex-1">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={desktopEmblaRef}>
            <div className="flex gap-3">
              {products.map((p) => (
                <div key={p.id} className="min-w-0 shrink-0 grow-0 basis-[clamp(14rem,18vw,20rem)]">
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="הקודם"
            onClick={() => desktopEmblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-md transition-opacity hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="הבא"
            onClick={() => desktopEmblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-md transition-opacity hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          {desktopScrollSnaps.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {desktopScrollSnaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`עבור למוצר ${i + 1}`}
                  onClick={() => desktopEmblaApi?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all ${i === desktopSelectedIndex ? "w-6 bg-black" : "w-2 bg-black/25"}`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="w-55 shrink-0 xl:w-[320px]">
          <TextCta />
        </div>
      </div>
    </section>
  );
}
