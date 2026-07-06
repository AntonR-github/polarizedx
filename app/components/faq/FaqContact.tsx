function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.76.46 3.48 1.35 5L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.07c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11a16.6 16.6 0 0 1-2.15-.8c-3.78-1.63-6.06-5.6-6.24-5.86-.18-.26-1.49-1.98-1.49-3.78s.93-2.68 1.26-3.05c.32-.36.7-.45.94-.45.24 0 .47 0 .68.01.22.01.51-.08.8.61.29.7 1 2.4 1.09 2.58.09.18.15.39.03.65-.12.26-.18.42-.36.65-.18.23-.38.51-.55.68-.18.18-.37.38-.16.75.21.37.94 1.55 2.02 2.51 1.39 1.24 2.56 1.62 2.93 1.8.37.18.59.15.8-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.03.96 2.38 1.14.35.18.58.26.67.41.09.15.09.86-.15 1.54Z" />
    </svg>
  );
}

export default function FaqContact() {
  return (
    <section className="w-full bg-white py-16">
      <div dir="rtl" className="mx-auto max-w-2xl px-6 text-center text-black">
        <h2 className="text-3xl font-bold lg:text-4xl">לא מצאת תשובה?</h2>
        <p className="mt-4 leading-relaxed text-zinc-600">
          הצוות שלנו כאן כדי לעזור לך בכל שאלה. זמינים ראשון עד חמישי, 09:00-17:00.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://wa.me/"
            className="inline-flex items-center gap-2 bg-black px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            <span>שוחח איתנו בוואטסאפ</span>
            <WhatsAppIcon />
          </a>
          <a
            href="tel:"
            className="inline-flex items-center gap-2 border border-black px-6 py-3 text-base font-semibold text-black transition-colors hover:bg-black/5"
          >
            <span>התקשר אלינו</span>
            <PhoneIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
