import Image from "next/image";

// Mock badges — swap in real icons later.
const badges: { label: string; icon?: string }[] = [
  { label: "UV400", icon: "/icn/wshield.png" },
  { label: "POLARIZED", icon: "/icn/eye.png" },
  { label: "משלוח מהיר", icon: "/icn/bdelivery.png" },
  { label: "אחריות מלאה", icon: "/icn/award.png" },
];

export default function ShopTrustBar() {
  return (
    <section className="w-full bg-neutral-50 py-8">
      <div
        dir="rtl"
        className="site-container grid grid-cols-2 gap-8 px-6 text-center sm:grid-cols-4 lg:px-12"
      >
        {badges.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center">
              {b.icon && (
                <Image
                  src={b.icon}
                  alt=""
                  width={24}
                  height={24}
                  className={`h-6 w-6 object-contain${b.icon.includes("wshield") ? " invert" : ""}`}
                />
              )}
            </div>
            <p className="text-sm font-medium text-zinc-700">{b.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
