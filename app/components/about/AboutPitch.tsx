import Image from "next/image";
import Link from "next/link";

export default function AboutPitch() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks text-left / image-right to match design */}
      <div dir="ltr" className="grid grid-cols-1 items-center lg:grid-cols-2">

        {/* Left: text + CTA */}
        <div dir="rtl" className="px-8 py-12 text-right text-black text-xl sm:text-2xl lg:text-3xl lg:pr-24">
          <p className="leading-relaxed">
            בדקנו מה הופך משקף להיות טוב,
            <br />
            ומצאנו את מי שעושה את זה הכי טוב. כי בסוף אם
            <br />
            המוצר לא טוב, לא עשינו כלום.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-4 self-start rounded-md bg-black px-10 py-4 text-xl font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            <span>לכל הקולקציה</span>
            <span aria-hidden>←</span>
          </Link>
        </div>

        {/* Right: sunglasses on stone */}
        <div className="relative min-h-80 lg:min-h-100">
          <Image
            src="/images/about/aboutblackglasses.png"
            alt="POLARIZED-X sunglasses"
            fill
            quality={100}
            className="object-cover object-[center_20%] select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
