import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function B2bStand() {
  return (
    <section className={`${inter.className} w-full bg-black`}>
      {/* dir=ltr locks text-left / stand-right to match design */}
      <div dir="ltr" className="grid grid-cols-1 items-stretch lg:grid-cols-[60%_40%]">

        {/* Left: text */}
        <div dir="rtl" className="flex flex-col justify-center bg-black px-8 py-12 text-right text-white sm:px-12 lg:pl-16 lg:pr-32">
          <h2 className="text-4xl font-normal leading-tight lg:text-5xl">הסטנד עם ה-</h2>
          <p className="mr-28 -mt-2 text-8xl leading-none lg:text-9xl">X</p>
          <p className="mt-6 text-xl text-white lg:text-2xl">סטנד תצוגה ואחסנה באותו מקום.</p>
          <p className="mt-2 text-3xl font-semibold leading-snug text-white lg:text-4xl">
            נגיש, מזמין, וקומפקטי.
            <br />
            נראה מכל מקום.
          </p>
          <p className="mt-8 text-lg text-white lg:text-xl">51 x 19 x 11.5 ס&quot;מ</p>
          <p className="mt-1 text-lg text-white lg:text-xl">כולל ראי מקדימה</p>
        </div>

        {/* Right: stand on white */}
        <div className="relative min-h-90 bg-white lg:min-h-140">
          <Image
            src="/images/hero/sunglasses-stand-fix.jpg"
            alt="POLARIZED-X display stand"
            fill
            className="object-contain p-1"
          />
        </div>
      </div>
    </section>
  );
}
