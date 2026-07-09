import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Inter } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function BluePair() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks text-left / image-right to match design */}
      <div dir="ltr" className="flex flex-col items-center lg:flex-row">

        {/* Left: text */}
        <div dir="rtl" className="px-8 pt-12 pb-0 text-center text-black sm:px-12 lg:w-1/2 lg:py-0 lg:pl-[min(240px,16.67vw)] lg:pr-2 lg:text-left">
          <div className="w-full">
            <h2 className={`${bebasNeue.className} text-6xl leading-none tracking-tight sm:text-8xl md:text-9xl lg:text-[clamp(48px,7.5vw,160px)]`}>
              POLARIZED-<span className={inter.className}>X</span>
            </h2>
            <p className="-mt-2 text-xl font-semibold sm:text-2xl md:text-3xl lg:text-2xl">קלסיקה אמיתית שהולכת איתך.</p>
            <Link
              href="/shop"
              dir="rtl"
              className="mt-6 inline-flex items-center gap-4 self-center bg-black px-8 py-4 text-xl font-semibold text-white transition-colors hover:bg-zinc-800 lg:self-start"
            >
              <span>מה ה-<span className={inter.className}>X</span> שלך</span>
              <span aria-hidden>←</span>
            </Link>
          </div>
        </div>

        {/* Right: blue sunglasses */}
        <div className="relative mx-auto h-52 w-full max-w-2xs overflow-hidden sm:h-96 sm:max-w-lg lg:mx-0 lg:h-[min(420px,29.17vw)] lg:w-1/2 lg:max-w-none">
          <Image
            src="/images/hero/sunglasses-blue.jpg"
            alt="POLARIZED-X sunglasses"
            fill
            quality={100}
            className="object-contain object-center select-none pointer-events-none lg:scale-90"
          />
        </div>
      </div>
    </section>
  );
}
