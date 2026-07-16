import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: "600" });

const features: { en: string; he: string; icon: string }[] = [
  { en: "POLARIZED", he: "סינון קרני אור חזק", icon: "/icn/waves.png" },
  { en: "UV 400", he: "הגנה מלאה מקרני השמש", icon: "/icn/sun.png" },
  { en: "7 LAYERS", he: "7 שכבות להגנה מושלמת", icon: "/icn/layers.png" },
];

export default function FeatureBar() {
  return (
    <div className="bg-black py-4">
      <div
        dir="ltr"
        className="relative mx-auto flex w-full max-w-[1800px] flex-row-reverse items-start justify-center gap-3 px-4 sm:flex-row sm:items-center sm:gap-20 md:gap-28 lg:gap-[clamp(5rem,11vw,14rem)]"
      >
        {features.map((f) => (
          <div
            key={f.en}
            className="flex flex-1 flex-col-reverse items-center gap-2.5 py-3 sm:flex-none sm:flex-row sm:gap-4 md:gap-5"
          >
            <div className="text-center sm:text-right">
              <div className={`${montserrat.className} featurebar-title hidden whitespace-nowrap font-semibold tracking-widest text-white sm:block sm:text-lg sm:tracking-[0.15em] md:text-2xl`}>
                {f.en}
              </div>
              <div dir="rtl" className="featurebar-subtitle text-xs font-normal leading-snug text-white/60 sm:whitespace-nowrap sm:text-sm md:text-lg">
                {f.he}
              </div>
            </div>
            <div className="featurebar-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/60 sm:h-14 sm:w-14 md:h-20 md:w-20">
              <span
                className="featurebar-icon-mask featurebar-icon-img h-7 w-7 sm:h-9 sm:w-9"
                style={{ ["--icon" as string]: `url(${f.icon})` }}
                aria-hidden
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
