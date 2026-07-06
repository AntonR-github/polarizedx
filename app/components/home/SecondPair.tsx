import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function SecondPair() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks image-left / packaging-right to match design */}
      <div dir="ltr" className="relative grid grid-cols-1 items-stretch lg:grid-cols-2">

        {/* Left: lifestyle image + overlay text + CTA */}
        <div className="relative min-h-[420px] lg:min-h-[460px]">
          <Image
            src="/images/hero/3rdleft.png"
            alt=""
            fill
            quality={100}
            className="object-cover object-center select-none pointer-events-none"
          />
          <div
            dir="rtl"
            className="absolute inset-0 flex flex-col items-start justify-center px-8 text-right text-white sm:px-12 -translate-x-6 mb-22"
          >
            <h2 className="text-4xl font-normal lg:text-5xl">זוג שני - 100 ₪</h2>
            <p className="mt-12 text-2xl font-normal leading-snug lg:text-3xl">
              כל דגם שתבחר. כל שילוב.
              <br />
              כי זוג אחד אף פעם לא מספיק.
              <br />
              <span className={inter.className}>X</span>
            </p>
          </div>
        </div>

        <Link
          href="/shop"
          dir="rtl"
          className="absolute bottom-8 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-6 bg-black px-10 py-4 text-xl font-semibold text-white transition-colors hover:bg-zinc-800"
        >
          <span>מה ה-<span className={inter.className}>X</span> שלך</span>
          <span aria-hidden>←</span>
        </Link>

        {/* Right: packaging on white */}
        <div dir="rtl" className="flex flex-col bg-white px-8 py-10 sm:px-12">
          <h2 className="self-right pr-42 text-right text-3xl font-semibold text-black lg:text-4xl">
            אריזה שלא תרצה לזרוק.
          </h2>
          <div className="mt-4 flex items-start justify-end gap-6">
            <div className="w-fit shrink-0 text-right text-2xl leading-snug text-black">
              <p>כל משקף מגיע עם:</p>
              <p>קופסה מעוצבת.</p>
              <p>תיק פנימי לשמירה.</p>
              <p>מטלית לניקוי.</p>
            </div>
            <div className="relative aspect-429/310 w-full mt-8 max-w-xl flex-1">
              <Image
                src="/images/hero/package-product.jpg"
                alt="POLARIZED-X packaging"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
