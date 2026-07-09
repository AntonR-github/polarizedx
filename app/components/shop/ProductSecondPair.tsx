import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function ProductSecondPair() {
  return (
    <section className="w-full bg-white">
      {/* dir=ltr locks image-left / packaging-right to match design */}
      <div dir="ltr" className="relative grid grid-cols-1 items-stretch lg:grid-cols-2">

        {/* Left: lifestyle image + overlay text + CTA */}
        <div className="relative order-1 min-h-72 overflow-hidden lg:order-1 lg:min-h-[460px]">
          <Image
            src="/images/hero/3rdleft.png"
            alt=""
            fill
            quality={100}
            className="object-cover object-center select-none pointer-events-none"
          />
          <div
            dir="rtl"
            className="absolute inset-0 flex flex-col items-start justify-center px-8 text-right text-white sm:px-12 -translate-x-6"
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

        {/* Right: packaging on white */}
        <div dir="rtl" className="order-2 flex flex-col items-center bg-white px-4 py-10 text-center sm:px-12 lg:items-start lg:order-2 lg:text-right">
          <h2 className="text-center text-3xl font-semibold text-black lg:text-right lg:text-4xl">
            אריזה שלא תרצה לזרוק.
          </h2>
          <div className="mt-4 flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-end">
            <div className="w-fit shrink-0 text-center text-2xl leading-snug text-black lg:text-right">
              <p>כל משקף מגיע עם:</p>
              <p>קופסה מעוצבת.</p>
              <p>תיק פנימי לשמירה.</p>
              <p>מטלית לניקוי.</p>
            </div>
            <div className="relative aspect-274/314 w-[calc(100%+2rem)] -mx-4 mt-8 max-w-2xl sm:w-full sm:mx-0 md:max-w-2xl lg:max-w-xl lg:flex-1">
              <Image
                src="/images/mobile/singleproduct.jpg"
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
