import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function AboutRetail() {
  return (
    <section className={`${inter.className} w-full bg-black`}>
      {/* dir=ltr locks text-left / image-right to match design */}
      <div dir="ltr" className="flex flex-col items-stretch lg:grid lg:grid-cols-2">

        {/* Left: text + CTA */}
        <div dir="rtl" className="order-2 flex flex-col justify-center bg-black px-8 py-12 text-right text-white sm:px-12 lg:order-none lg:px-16">
          <p className="text-3xl font-normal leading-tight sm:text-5xl lg:text-6xl lg:leading-none">
            יצרנו שיתופי פעולה עם
            <br />
            נבחרת בוטיקים
            <br />
            מהממת ברחבי הארץ.
          </p>
          <p className="mt-9 text-2xl text-white sm:text-2xl">ובנינו מערך הפצה שמגיע אליכם עד הבית.</p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-3 self-center bg-white px-6 py-3 text-xl font-semibold text-black transition-colors hover:bg-zinc-200 sm:self-start"
          >
            <span>קמעונאים - בואו נדבר</span>
          </Link>
        </div>

        {/* Right: packaging on light gray */}
        <div className="order-1 relative min-h-70 bg-white overflow-hidden sm:min-h-90 lg:order-none lg:h-[min(600px,34.72vw)]">
          <Image
            src="/images/about/packagebg.png"
            alt="POLARIZED-X packaging"
            fill
            className="object-cover object-[60%_center] sm:object-center"
          />
        </div>
      </div>
    </section>
  );
}
