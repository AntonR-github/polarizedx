import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function AboutRetail() {
  return (
    <section className={`${inter.className} w-full bg-black`}>
      {/* dir=ltr locks text-left / image-right to match design */}
      <div dir="ltr" className="grid grid-cols-1 items-stretch lg:grid-cols-2">

        {/* Left: text + CTA */}
        <div dir="rtl" className="flex flex-col justify-center bg-black px-8 py-12 text-right text-white sm:px-12 lg:px-16">
          <p className="text-5xl font-normal leading-none lg:text-6xl">
            יצרנו שיתופי פעולה עם
            <br />
            נבחרת בוטיקים
            <br />
            מהממת ברחבי הארץ.
          </p>
          <p className="mt-9 text-2xl text-white">ובנינו מערך הפצה שמגיע אליכם עד הבית.</p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-3 self-start bg-white px-6 py-3 text-xl font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            <span>קמעונאים - בואו נדבר</span>
          </Link>
        </div>

        {/* Right: packaging on light gray */}
        <div className="relative min-h-90 bg-white lg:min-h-125">
          <Image
            src="/images/about/packagebg.png"
            alt="POLARIZED-X packaging"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
