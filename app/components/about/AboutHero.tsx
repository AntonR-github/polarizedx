import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Inter } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function AboutHero() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks image-left / panel-right to match design */}
      <div dir="ltr" className="grid grid-cols-1 lg:grid-cols-[75%_25%] items-stretch">

        {/* Left: background image + overlay content */}
        <div className="relative min-h-[640px] lg:min-h-[840px]">
          <Image
            src="/images/about/aboutHero.jpg"
            alt=""
            fill
            priority
            quality={100}
            className="object-cover object-[center_0%] select-none pointer-events-none"
          />
          <div className="absolute inset-0 flex flex-col justify-center translate-x-24 translate-y-42 px-8 sm:px-12 lg:px-16">
            <h1 className={`${bebasNeue.className} text-white leading-[0.95] tracking-tight text-7xl sm:text-8xl lg:text-[clamp(3rem,8vw,12.5rem)]`}>
              POLARIZED-<span className={inter.className}>X</span>
            </h1>
            <p dir="rtl" className="-mt-1 text-left text-white/90 font-normal text-2xl sm:text-3xl lg:text-4xl">
              קלסיקה אמיתית שהולכת איתך.
            </p>
            <Link
              href="/shop"
              dir="rtl"
              className="mt-8 inline-flex items-center gap-5 self-start bg-black px-12 py-6 text-2xl font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              <span>מה ה-<span className={inter.className}>X</span> שלך</span>
              <span aria-hidden>←</span>
            </Link>
          </div>
        </div>

        {/* Right: story pitch */}
        <div
          dir="rtl"
          className="flex min-h-[280px] flex-col items-center justify-center gap-6 bg-black px-6 py-12 text-center text-white lg:min-h-[580px]"
        >
          <h2 className="text-7xl font-regular leading-tight lg:text-8xl">
            הסיפור
            <br />
            שלנו
          </h2>
          <div className="flex flex-col items-center">
            <p className="text-4xl">אז מה ה-</p>
            <p className={`${inter.className} text-9xl leading-none lg:text-[8.5rem]`}>X</p>
            <p className="text-4xl">שלנו</p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-4 border border-white bg-white px-8 py-3 text-xl font-semibold text-black transition-colors hover:bg-white/90"
          >
            <span>לכל הקולקציה</span>
            <span aria-hidden>←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
