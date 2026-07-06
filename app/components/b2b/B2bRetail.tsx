import Image from "next/image";

export default function B2bRetail() {
  return (
    <section className="w-full bg-black">
      {/* dir=ltr locks column order: drive | packaging */}
      <div
        dir="ltr"
        className="grid grid-cols-1 items-stretch lg:grid-cols-2"
      >
        {/* Left: polarized close-up + caption */}
        <div className="flex flex-col bg-black">
          <div className="relative min-h-[400px] flex-1">
            <Image
              src="/images/hero/sunglasses-drive.jpg"
              alt="POLARIZED lenses"
              fill
              quality={100}
              className="object-cover object-center select-none pointer-events-none"
            />
          </div>
          <div className="bg-white px-6 py-6 text-center text-black">
            <p className="text-4xl font-semibold"> .אמיתיים POLARIZED</p>
            <p className="mt-1 text-4xl text-zinc-700">.הבדל שנראה. הבדל שמרגישים</p>
          </div>
        </div>

        {/* Right: packaging image */}
        <div className="relative min-h-[280px] bg-black lg:min-h-[420px]">
          <Image
            src="/images/b2b/b2bpack.jpg"
            alt="POLARIZED-X packaging"
            fill
            className="object-cover object-[center_5%]"
          />
        </div>
      </div>
    </section>
  );
}
