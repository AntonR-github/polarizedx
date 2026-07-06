import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: "600" });

const features: { en: string; he: string; icon?: string }[] = [
  { en: "PC FRAME", he: "מסגרת פוליקרבונט", icon: "/icn/wshield.png" },
  { en: "POLARIZED", he: "סינון קרני אור חזק", icon: "/icn/waves.png" },
  { en: "UV 400", he: "הגנה מלאה מקרני השמש", icon: "/icn/sun.png" },
  { en: "7 LAYERS", he: "7 שכבות להגנה מושלמת", icon: "/icn/layers.png" },
];

export default function FeatureBar() {
  return (
    <div className="bg-white py-4">
      <div
        dir="ltr"
        className="mx-auto grid w-full max-w-[1800px] grid-cols-2 divide-x divide-black px-6 lg:grid-cols-4"
      >
        {features.map((f) => (
          <div
            key={f.en}
            className="flex items-center justify-center gap-6 px-20 py-6"
          >
            <div className="text-right">
              <div className={`${montserrat.className} whitespace-nowrap font-semibold tracking-[0.15em] text-black text-2xl`}>{f.en}</div>
              <div dir="rtl" className="whitespace-nowrap text-lg font-normal text-black">
                {f.he}
              </div>
            </div>
            {/* Icon placeholder — swap for the real icon when provided */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-black/70">
              {f.icon && (
                <Image
                  src={f.icon}
                  alt=""
                  width={24}
                  height={24}
                  className={`object-contain${f.icon.includes("wshield") ? " h-11 w-11 invert" : " h-9 w-9"}`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
