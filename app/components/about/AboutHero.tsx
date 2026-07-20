import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function AboutHero() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks image-left / panel-right to match design */}
      <div dir="ltr" className="flex flex-col lg:grid lg:grid-cols-[75%_25%] lg:items-stretch">

        {/* Mobile/tablet only: story text panel, shown above the hero image */}
        <div
          dir="rtl"
          className="order-1 flex flex-col items-center justify-center gap-0 bg-black px-6 py-10 text-center text-white sm:gap-1 lg:hidden"
        >
          <h2 className="text-5xl mt-14 font-regular leading-tight sm:text-7xl">
            הסיפור{" "}שלנו
          </h2>
          <div className="flex flex-row items-baseline gap-2">
            <p className="text-2xl sm:text-4xl">אז מה ה-</p>
            <p className="text-8xl leading-none sm:text-8xl">
              <img src="/images/xmark.png" alt="X" className="inline-block h-[0.72em] w-auto align-baseline" />
            </p>
            <p className="text-2xl sm:text-4xl">שלנו</p>
          </div>
        </div>

        {/* Left: background image + overlay content */}
        <div className="order-2 lg:order-none lg:h-full">
          <div className="relative min-h-[420px] sm:min-h-[520px] lg:h-full lg:min-h-175">
            <Image
              src="/images/about/aboutHero.jpg"
              alt=""
              fill
              priority
              quality={100}
              className="object-cover object-[center_30%] lg:object-[center_0%] select-none pointer-events-none"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-0 text-center translate-y-6 sm:justify-center sm:px-12 sm:translate-y-28 lg:items-start lg:justify-center lg:pb-0 lg:text-left lg:translate-x-24 lg:translate-y-42 lg:px-16">
              <h1 className={`${bebasNeue.className} text-white leading-[0.95] tracking-tight text-[clamp(4rem,17vw,7rem)] sm:text-8xl lg:text-[clamp(3rem,8vw,12.5rem)]`}>
                POLARIZED-<img src="/images/xmark.png" alt="X" className="inline-block h-[0.72em] w-auto align-baseline" />
              </h1>
              <p dir="rtl" className="-mt-1 text-center text-white/90 font-normal text-2xl sm:text-3xl lg:text-left lg:text-4xl">
                קלסיקה אמיתית שהולכת איתך.
              </p>
              <Link
                href="/shop"
                dir="rtl"
                className="mt-8 inline-flex items-center gap-4 self-center border border-white bg-white px-10 py-3 text-lg font-semibold text-black transition-colors hover:bg-white/90 lg:gap-5 lg:self-start lg:border-0 lg:bg-black lg:px-14 lg:py-6 lg:text-2xl lg:text-white lg:hover:bg-zinc-800"
              >
                <span>לחץ לרכישה</span>
                <span aria-hidden>←</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: story pitch */}
        <div className="relative order-1 hidden min-h-[240px] overflow-hidden bg-black lg:order-none lg:block lg:min-h-120">
          <Image
            src="/images/hero/frame-removebg.png"
            alt="PUT AN X ON IT"
            fill
            quality={100}
            className="scale-150 object-contain select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
