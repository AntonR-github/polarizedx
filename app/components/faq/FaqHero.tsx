import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function FaqHero() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks text-left / image-right to match design */}
      <div dir="ltr" className="flex flex-col items-center justify-center gap-8 px-8 py-12 sm:px-12 lg:flex-row lg:gap-16 lg:px-16 lg:py-0">

        {/* Left: text */}
        <div dir="rtl" className="text-left text-black">
          <h1 className={`${bebasNeue.className} text-9xl tracking-wide lg:text-[9rem]`}>POLARIZED-X</h1>
          <p className="mt-[-15] text-2xl font-semibold text-black/80 lg:text-3xl">קלסיקה אמיתית שהולכת איתך.</p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-3 self-start bg-black px-14 py-4 text-xl font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            <span>מה ה-X שלך</span>
            <span aria-hidden>←</span>
          </Link>
        </div>

        {/* Right: packaging on white */}
        <div className="relative h-72 w-full lg:h-130 lg:w-1/2">
          <Image
            src="/images/faq/pack-hero.jpg"
            alt="POLARIZED-X sunglasses"
            fill
            quality={100}
            className="object-contain select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
