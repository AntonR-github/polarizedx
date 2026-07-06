import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function OrangePair() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks image-left / text-right to match design */}
      <div dir="ltr" className="flex flex-col items-center gap-8 lg:flex-row lg:gap-0">

        {/* Left: orange sunglasses */}
        <div className="relative h-72 w-full lg:h-105 lg:w-1/2">
          <Image
            src="/images/about/orange_glasses.jpg"
            alt="POLARIZED-X sunglasses"
            fill
            quality={100}
            className="object-cover object-center scale-75 select-none pointer-events-none"
          />
        </div>

        {/* Right: text */}
        <div dir="rtl" className="px-8 py-12 text-right text-black sm:px-12 lg:w-1/2 lg:py-0 lg:pl-2 lg:pr-16">
          <div className="w-full lg:-translate-x-32">
            <h2 className={`${bebasNeue.className} text-8xl leading-none tracking-tight lg:text-[clamp(48px,7.5vw,160px)]`}>
              POLARIZED-X
            </h2>
            <p className="-mt-2 text-xl font-semibold lg:text-2xl">קלסיקה אמיתית שהולכת איתך.</p>
            <Link
              href="/shop"
              dir="rtl"
              className="mt-6 inline-flex items-center gap-4 self-start bg-black px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              <span>מה ה-X שלך</span>
              <span aria-hidden>←</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
