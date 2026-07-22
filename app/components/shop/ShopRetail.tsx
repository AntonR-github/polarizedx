import Image from "next/image";

export default function ShopRetail() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks column order: drive | text */}
      <div
        dir="ltr"
        className="grid grid-cols-1 items-stretch lg:grid-cols-2"
      >
        {/* Left: polarized close-up + caption */}
        <div className="flex flex-col-reverse bg-black lg:flex-col">
          <div className="relative aspect-672/239 flex-none sm:aspect-auto sm:min-h-65 sm:flex-1 lg:min-h-80">
            <Image
              src="/images/hero/sunglasses-drive.jpg"
              alt="POLARIZED lenses"
              fill
              quality={100}
              className="object-contain object-center select-none pointer-events-none lg:object-cover"
            />
          </div>
        </div>

        {/* Right: retail pitch */}
        <div
          dir="rtl"
          className="flex min-h-80 flex-col items-center justify-center bg-black px-8 py-10 text-center text-white sm:px-12 lg:items-start lg:pr-[clamp(2rem,7vw,7rem)] lg:text-right"
        >
          <h2 className="mb-8 text-2xl font-regular lg:mb-4 sm:text-4xl lg:text-5xl">POLARIZED-X לחנות שלך.</h2>
          <p className="max-w-md text-center leading-tight sm:leading-snug text-base sm:text-2xl lg:text-2xl text-white mb-10 lg:text-right lg:text-[clamp(1.1rem,1.8vw,1.5rem)]">
            מותג אסתטי, שקט, שיישב מדהים בעסק שלך.
            <br />
            ויעשה את העבודה במקומך.
          </p>
        </div>
      </div>
    </section>
  );
}
