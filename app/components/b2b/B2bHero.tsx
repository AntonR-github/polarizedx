import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Inter } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function B2bHero() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks image-left / panel-right to match design */}
      <div dir="ltr" className="grid grid-cols-1 lg:grid-cols-[76%_24%] items-stretch">

        {/* Left: background image + overlay content */}
        <div className="relative min-h-160 lg:min-h-210">
          <Image
            src="/images/b2b/b2bhero.jpg"
            alt=""
            fill
            priority
            quality={100}
            className="object-cover object-[center_10%] select-none pointer-events-none"
          />
          <div className="absolute inset-0 flex flex-col justify-center translate-x-24 translate-y-32 px-8 sm:px-12 lg:px-16">
            <p dir="rtl" className="text-left text-white/90 font-normal text-6xl sm:text-8xl">
              לחנות שלך
            </p>
            <h1 className={`${bebasNeue.className} text-white leading-[0.95] tracking-tight text-8xl sm:text-9xl lg:text-[clamp(3rem,8vw,12rem)]`}>
              POLARIZED-<span className={inter.className}>X</span>
            </h1>
            <p dir="rtl" className="-mt-1 text-left text-white/90 font-normal text-xl sm:text-2xl lg:text-3xl">
              קלסיקה אמיתית שהולכת איתך.
            </p>
            <div dir="rtl" className="mt-8 flex flex-wrap items-center justify-end gap-4">
              <Link
                href="/b2b"
                className="inline-flex items-center gap-4 self-start bg-black px-10 py-5 text-xl font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                <span>כניסה לבעלי עסקים</span>
                <span aria-hidden>←</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-4 self-start bg-black px-10 py-5 text-xl font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                <span>דבר עם סוכן</span>
                <span aria-hidden>←</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: retail pitch */}
        <div
          dir="rtl"
          className="flex min-h-70 flex-col items-center justify-center gap-26 bg-black px-6 py-12 text-center text-white lg:min-h-145"
        >
          <p className="text-4xl leading-relaxed">
            מותג אסתטי,
            <br /> 
            שקט, שייצב מדהים 
            <br />
            בעסק שלך.
            <br />
            ויעשה את העבודה במקומך.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-white bg-white px-8 py-3 text-xl font-bold text-black transition-colors hover:bg-white/90"
          >
            <span>צור קשר</span>
            <span aria-hidden>←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
