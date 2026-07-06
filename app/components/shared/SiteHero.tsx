import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Inter } from "next/font/google";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function SiteHero() {
  return (
    <section className="w-full bg-black">
      {/* ── Split hero ── (dir=ltr locks image-left / panel-right to match design) */}
      <div dir="ltr" className="grid grid-cols-1 lg:grid-cols-[73%_27%] items-stretch">

        {/* Left: background image + overlay content */}
        <div className="relative min-h-[440px] lg:min-h-[580px]">
          <Image
            src="/images/hero/heroimage.png"
            alt=""
            fill
            priority
            quality={100}
            className="object-cover object-[center_10%] select-none pointer-events-none"
          />
          <div className="absolute inset-0 flex flex-col justify-center translate-x-6 translate-y-12 px-8 sm:px-12 lg:px-16">
            <h1 className={`${bebasNeue.className} text-white leading-[0.95] tracking-tight text-8xl sm:text-9xl lg:text-[clamp(3rem,8vw,13.5rem)]`}>
              POLARIZED-<span className={inter.className}>X</span>
            </h1>
            <p dir="rtl" className="-mt-1 text-left text-white/90 font-normal text-3xl sm:text-2xl lg:text-4xl">
              קלסיקה אמיתית שהולכת איתך.
            </p>
            <Link
              href="/shop"
              dir="rtl"
              className="mt-8 inline-flex items-center gap-3 self-start bg-black px-12 py-4 text-2xl font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              <span>מה ה-<span className={inter.className}>X</span> שלך</span>
              <span aria-hidden>←</span>
            </Link>
          </div>
        </div>

        {/* Right: black panel split top/bottom */}
        <div className="flex flex-col bg-black">
          {/* Top: PUT AN X ON IT + tagline */}
          <div className="flex flex-[3] flex-col items-center justify-center px-2 py-2 text-center">
            <Image
              src="/images/hero/putx.png"
              alt="PUT AN X ON IT"
              width={260}
              height={170}
              className="h-56 w-auto object-contain lg:h-72 mt-3"
            />
            <p dir="rtl" className="-mt-2 mb-6 text-xl leading-relaxed text-white/80">
              כי &quot;בְּסְדֵר&quot; זה לא מספיק.
              <br />
              פולורייזד אמיתי. נגיש. כמו שצריך.
            </p>
          </div>
          {/* Bottom: sunglasses product on white */}
          <div className="relative flex-4 min-h-72 border-b-3 border-black bg-white">
            <Image
              src="/images/hero/hero-sunglasses.jpg"
              alt="POLARIZED-X sunglasses"
              fill
              className="object-contain p-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
