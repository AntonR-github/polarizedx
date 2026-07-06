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
        className="grid grid-cols-1 items-stretch lg:grid-cols-[50%_15%_35%]"
      >
        {/* Left: polarized close-up + caption */}
        <div className="flex flex-col bg-black">
          <div className="relative min-h-80 flex-1">
            <Image
              src="/images/hero/sunglasses-drive.jpg"
              alt="POLARIZED lenses"
              fill
              quality={100}
              className="object-cover object-center select-none pointer-events-none"
            />
          </div>
          <div className="px-6 py-6 text-center text-white">
            <p className="text-4xl font-semibold"> .אמיתיים POLARIZED</p>
            <p className="mt-1 text-4xl text-zinc-200">.הבדל שנראה. הבדל שמרגישים</p>
          </div>
        </div>

        {/* Middle: product stand on white */}
        <div className="relative min-h-[260px] bg-white">
          <Image
            src="/images/hero/sunglasses-stand-fix.jpg"
            alt="POLARIZED-X display stand"
            fill
            className="object-cover p-4"
          />
        </div>

        {/* Right: retail pitch + CTA */}
        <div
          dir="rtl"
          className="flex flex-col items-center justify-center bg-black px-8 py-10 text-center text-white sm:px-12"
        >
          <div className="self-end max-w-lg text-right">
          <h2 className="text-right text-3xl font-bold lg:text-4xl">POLARIZED-<span className={inter.className}>X</span> לחנות שלך.</h2>
          <p className="mt-5 leading-snug text-2xl text-white">
            מותג אסתטי, שקט,
            <br />
            שיישב מדהים בעסק שלך.
            <br />
            ויעשה את העבודה במקומך.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-4 rounded-md border border-white bg-white px-8 py-4 text-xl font-semibold text-black transition-colors hover:bg-white/90"
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
