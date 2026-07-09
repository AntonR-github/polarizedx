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
        <div dir="rtl" className="mt-10 text-center text-black lg:text-left">
          <h1 className={`${bebasNeue.className} text-6xl tracking-wide sm:text-7xl lg:text-[clamp(5rem,9vw,11rem)]`}>POLARIZED-X</h1>
          <p className="mt-2 text-xl font-semibold text-black/80 sm:text-2xl lg:mt-[-15] lg:text-3xl">קלסיקה אמיתית שהולכת איתך.</p>
          <Link
            href="/shop"
            className="mt-8 inline-flex w-full items-center justify-center gap-3 self-center bg-black px-14 py-4 text-xl font-semibold text-white transition-colors hover:bg-zinc-800 lg:w-auto lg:justify-start lg:self-start"
          >
            <span>מה ה-X שלך</span>
            <span aria-hidden>←</span>
          </Link>
        </div>

        {/* Right: packaging on white */}
        <div className="relative mx-auto h-72 w-full max-w-xs border border-black/10 sm:h-96 sm:max-w-2xl lg:mx-0 lg:h-130 lg:w-1/2 lg:max-w-none lg:border-0">
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
