import Image from "next/image";

// Mock products — replace with real catalog data later.
const products = [
  { id: "leopard-x", name: "LEOPARD X", color: "חום עם נקודות", price: 179 },
  { id: "clear-x", name: "CLEAR X", color: "שחור", price: 149 },
  { id: "navy-x", name: "NAVY X", color: "כחול כהה", price: 149 },
  { id: "wood-x", name: "WOOD X", color: "שחור + עץ", price: 199 },
  { id: "wild-x", name: "WILD X", color: "ירוק + פסים", price: 199 },
  { id: "black-x", name: "BLACK X", color: "שחור + עץ", price: 149 },
];

export default function ShopProducts() {
  return (
    <section className="w-full bg-white py-10">
      <div
        dir="rtl"
        className="site-container grid grid-cols-1 justify-center gap-x-8 gap-y-6 px-6 sm:grid-cols-[repeat(2,24.5rem)] lg:grid-cols-[repeat(3,24.5rem)] lg:px-12"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="flex w-full flex-col rounded-md border border-zinc-200 bg-white p-4 text-center"
          >
            <div className="relative h-40">
              <Image src="/images/mock-product.png" alt={p.name} fill className="object-contain p-2" />
            </div>
            <p className="mt-2 text-2xl font-bold text-black">{p.name}</p>
            <p className="mt-2 text-base text-black">{p.color}</p>
            <p className="mt-2 text-2xl font-bold text-black">₪ {p.price}</p>
            <button
              type="button"
              className="mt-4 rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              הוסף לסל
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
