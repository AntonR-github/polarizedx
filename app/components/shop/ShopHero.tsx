import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Inter } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function ShopHero() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks white-panel-left / black-promo-right to match design */}
      <div dir="ltr" className="grid grid-cols-1 lg:grid-cols-[78%_22%] items-stretch">

        {/* Left: text + product image on white */}
        <div dir="rtl" className="relative flex min-h-[320px] items-center justify-end bg-white px-8 py-12 sm:px-12 lg:min-h-[380px] lg:px-16">
          <div className="absolute inset-y-0 right-5 w-[62%] sm:w-[58%] lg:w-[52%]">
            <Image
              src="/images/shop/shophero.jpg"
              alt="POLARIZED-X sunglasses"
              fill
              quality={100}
              className="object-contain select-none pointer-events-none"
            />
          </div>
          <div className="relative z-10 text-left lg:max-w-[50%] lg:translate-x-16">
            <h1 className={`${bebasNeue.className} text-black leading-[0.95] tracking-tight text-7xl sm:text-8xl lg:text-[clamp(3rem,8vw,12.5rem)]`}>
              POLARIZED-X
            </h1>
            <p className="text-2xl font-regular text-black/80 lg:text-3xl">קלסיקה אמיתית שהולכת איתך.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-4 self-start bg-black px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              <span>מה ה-X שלך</span>
              <span aria-hidden>←</span>
            </Link>
          </div>
        </div>

        {/* Right: promo panel */}
        <div
          dir="rtl"
          className="flex min-h-[220px] flex-col items-center justify-center gap-6 bg-black px-6 py-12 text-center text-white lg:min-h-full"
        >
          <p className="text-5xl font-regular leading-tight lg:text-6xl">
            זוג שני
            <br />
            ב-100₪
          </p>
          <div className={`${inter.className} flex flex-col items-center`}>
            <p className="text-2xl">6 דגמים</p>
            <p className="text-2xl">כל אחד עם ה-</p>
            <p className="text-7xl font-regular leading-none lg:text-8xl mt-2">X</p>
            <p className="text-2xl">שלו</p>
          </div>
        </div>
      </div>
    </section>
  );
}
