import Image from "next/image";
import Link from "next/link";

export default function ShopRetail() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks column order: drive | text */}
      <div
        dir="ltr"
        className="grid grid-cols-1 items-stretch lg:grid-cols-2"
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

        {/* Right: retail pitch + CTA */}
        <div
          dir="rtl"
          className="flex min-h-80 flex-col items-start justify-between bg-black px-8 py-10 text-right text-white sm:px-12 lg:pr-28"
        >
          <h2 className="text-4xl font-regular lg:text-5xl">POLARIZED-X לחנות שלך.</h2>
          <p className="max-w-md text-right leading-relaxed text-2xl text-white mb-10">
            מותג אסתטי, שקט, שיישב מדהים בעסק שלך.
            <br />
            ויעשה את העבודה במקומך.
          </p>
          <Link
            href="/contact"
            className="mb-15 inline-flex items-center gap-3 rounded-md border border-white bg-white px-6 py-2.5 text-lg font-semibold text-black transition-colors hover:bg-white/90"
          >
            <span>קמעונים - בוא נדבר</span>
            <span aria-hidden>←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
