import Image from "next/image";
import Link from "next/link";

// Mock products — replace with real catalog data later.
const products = [
  { id: "navy-x", name: "NAVY X", price: 149 },
  { id: "classic-x", name: "CLASSIC X", price: 149 },
  { id: "leopard-x", name: "LEOPARD X", price: 179 },
  { id: "black-x", name: "BLACK X", price: 149 },
];

export default function FeaturedProducts() {
  return (
    <section className="w-full pt-5 pb-5 bg-[#f5f5f5]">
      {/* dir=ltr locks card order NAVY X → BLACK X with the text block on the right */}
      <div
        dir="ltr"
        className="mx-auto grid w-full max-w-[1650px] grid-cols-2 gap-4 px-6 py-10 lg:grid-cols-[repeat(4,1fr)_minmax(200px,340px)] lg:gap-3 lg:px-12"
      >
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/shop/${p.id}`}
            className="group mx-auto flex w-full max-w-90 flex-col self-start rounded-md bg-white transition-shadow hover:shadow-md"
          >
            <div className="relative h-44">
              <Image
                src="/images/mock-product.png"
                alt={p.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 px-3 py-2.5">
              <span className="text-base font-normal text-black">{p.price} ₪</span>
              <span className="text-lg font-bold text-black">{p.name}</span>
            </div>
          </Link>
        ))}

        {/* Right text + CTA block */}
        <div
          dir="rtl"
          className="col-span-2 flex flex-col items-start justify-center gap-5 text-right lg:col-span-1"
        >
          <p className="text-[36px] font-normal leading-[1.08] text-black lg:text-[42px]">
            לכל שימוש.
            <br />
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
      </div>
    </section>
  );
}
