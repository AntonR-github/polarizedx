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
        <div dir="rtl" className="relative flex flex-col items-center bg-white px-8 py-10 text-center sm:px-12 lg:flex-row lg:min-h-[380px] lg:items-center lg:justify-end lg:py-12 lg:text-right lg:px-16">
          <div className="relative z-10 lg:max-w-[50%] lg:text-left lg:translate-x-[clamp(0px,4vw,4rem)]">
            <h1 className={`${bebasNeue.className} mt-10 text-black leading-[0.95] tracking-tight text-7xl sm:text-8xl lg:text-[clamp(3rem,8vw,12.5rem)]`}>
              POLARIZED-X
            </h1>
            <p className="text-xl font-regular text-black/80 lg:text-3xl">קלסיקה אמיתית שהולכת איתך.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-4 self-center bg-black px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800 lg:self-start"
            >
              <span>מה ה-X שלך</span>
              <span aria-hidden>←</span>
            </Link>
          </div>
          <div className="relative mt-6 h-56 w-full sm:h-72 lg:absolute lg:inset-y-0 lg:right-5 lg:mt-0 lg:h-auto lg:w-[52%]">
            <Image
              src="/images/shop/shophero.jpg"
              alt="POLARIZED-X sunglasses"
              fill
              quality={100}
              className="object-contain select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Right: promo panel */}
        <div
          dir="rtl"
          className="mx-4 my-6 flex flex-col items-center justify-center gap-1 rounded-2xl bg-black px-6 py-6 text-center text-white lg:mx-0 lg:my-0 lg:gap-6 lg:rounded-none lg:py-12 lg:min-h-full"
        >
          <p className="text-3xl font-regular leading-tight lg:text-6xl">
            זוג שני
            <br className="hidden lg:block" />
            {" "}ב-100₪
          </p>
          <div className={`${inter.className} flex flex-col items-center`}>
            <p className="text-2xl lg:text-2xl">6 דגמים</p>
            <p className="text-2xl lg:text-2xl">כל אחד עם ה-</p>
            <p className="text-8xl font-regular leading-none lg:text-8xl mt-2">X</p>
            <p className="text-2xl lg:text-2xl">שלו</p>
          </div>
        </div>
      </div>
    </section>
  );
}
