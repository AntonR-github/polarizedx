import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Inter } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function BluePair() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks text-left / image-right to match design */}
      <div dir="ltr" className="flex flex-col items-center gap-8 lg:flex-row lg:gap-0">

        {/* Left: text */}
        <div dir="rtl" className="px-8 py-12 text-left text-black sm:px-12 lg:w-1/2 lg:py-0 lg:pl-60 lg:pr-2">
          <div className="w-full">
            <h2 className={`${bebasNeue.className} text-8xl leading-none tracking-tight lg:text-[clamp(48px,7.5vw,160px)]`}>
              POLARIZED-<span className={inter.className}>X</span>
            </h2>
            <p className="-mt-2 text-xl font-semibold lg:text-2xl">קלסיקה אמיתית שהולכת איתך.</p>
            <Link
              href="/shop"
              dir="rtl"
              className="mt-6 inline-flex items-center gap-4 self-start bg-black px-8 py-4 text-xl font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              <span>מה ה-<span className={inter.className}>X</span> שלך</span>
              <span aria-hidden>←</span>
            </Link>
          </div>
        </div>

        {/* Right: blue sunglasses */}
        <div className="relative h-72 w-full lg:h-105 lg:w-1/2">
          <Image
            src="/images/hero/sunglasses-blue.jpg"
            alt="POLARIZED-X sunglasses"
            fill
            quality={100}
            className="object-cover object-center scale-70 -translate-x-16 select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
