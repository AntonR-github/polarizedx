import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function RetailPitch() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks column order: drive | stand | text */}
      <div
        dir="ltr"
        className="grid grid-cols-1 items-stretch lg:grid-cols-[10fr_auto_7fr]"
      >
        {/* Left: polarized close-up + caption */}
        <div className="order-4 flex flex-col bg-black lg:order-0">
          <div className="relative aspect-672/239 w-full lg:aspect-auto lg:min-h-80 lg:flex-1">
            <Image
              src="/images/hero/sunglasses-drive.jpg"
              alt="POLARIZED lenses"
              fill
              quality={100}
              className="object-cover object-center select-none pointer-events-none"
            />
          </div>
          <div className="px-6 py-6 text-center text-white">
            <p className="text-2xl font-semibold sm:text-4xl lg:text-4xl"> .אמיתיים POLARIZED</p>
            <p className="mt-1 text-2xl text-zinc-200 sm:text-4xl lg:text-4xl">.הבדל שנראה. הבדל שמרגישים</p>
          </div>
        </div>

        {/* Middle: product stand on white */}
        <div className="order-2 relative mx-auto mb-8 min-h-96 w-full max-w-xs bg-white sm:mb-10 sm:max-w-sm sm:min-h-125 lg:order-0 lg:mb-0 lg:aspect-253/360 lg:h-auto lg:w-[clamp(220px,18vw,320px)] lg:max-w-none lg:self-center">
          <Image
            src="/images/hero/sunglasses-stand-fix.jpg"
            alt="POLARIZED-X display stand"
            fill
            className="object-contain lg:p-4"
          />
        </div>

        {/* Mobile/tablet only: CTA below the stand image */}
        <Link
          href="/contact"
          dir="rtl"
          className="order-3 mx-auto mb-8 inline-flex items-center gap-4 rounded-md border border-white bg-white px-8 py-4 text-xl font-semibold text-black transition-colors hover:bg-white/90 lg:hidden"
        >
          <span>קמעונים - בוא נדבר</span>
          <span aria-hidden>←</span>
        </Link>

        {/* Right: retail pitch + CTA */}
        <div
          dir="rtl"
          className="order-1 flex flex-col items-center justify-center bg-black px-8 py-10 text-center text-white sm:px-12 lg:order-0"
        >
          <div className="self-center max-w-lg text-center lg:mr-[min(4rem,4.44vw)] lg:self-start lg:text-right">
          <h2 className="mb-16 text-center text-2xl font-bold sm:text-3xl lg:text-right lg:text-4xl">POLARIZED-<span className={inter.className}>X</span> לחנות שלך.</h2>
          <p className="mt-5 leading-snug text-2xl text-white">
            מותג אסתטי, שקט,
            <br />
            שיישב מדהים בעסק שלך.
            <br />
            ויעשה את העבודה במקומך.
          </p>
          <Link
            href="/contact"
            className="mt-7 hidden items-center gap-4 whitespace-nowrap rounded-md border border-white bg-white px-8 py-4 text-xl font-semibold text-black transition-colors hover:bg-white/90 lg:inline-flex lg:text-[clamp(0.95rem,1.35vw,1.25rem)] lg:px-[clamp(1.25rem,2.2vw,2rem)]"
          >
            <span>קמעונים - בוא נדבר</span>
            <span aria-hidden>←</span>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
