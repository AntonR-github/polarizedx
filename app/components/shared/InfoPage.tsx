const DEEP = "#171714";
const ON_DEEP = "#f8f8f5";
const ACCENT = "#c5a43a";
const INK = "#11110f";
const MUTED = "#5c5a52";
const LINE = "#c9c6bc";
const SURFACE = "#f8f8f5";

const decorMap = {
  shipping: "03",
  terms: "§",
  privacy: "●",
  accessibility: "A",
} as const;

type Section = { title: string; body: string | string[] };

export default function InfoPage({
  pageKey,
  title,
  subtitle,
  sections,
  timeline = false,
}: {
  pageKey: keyof typeof decorMap;
  title: string;
  subtitle: string;
  sections: Section[];
  timeline?: boolean;
}) {
  return (
    <>
      {/* Hero */}
      <section
        dir="rtl"
        className="relative overflow-hidden border-b-[3px] px-6 py-14 sm:px-12 lg:px-20 lg:py-20"
        style={{ background: DEEP, borderColor: ACCENT }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-8 left-0 select-none text-[13rem] font-black leading-none sm:text-[18rem] lg:text-[22rem]"
          style={{ color: "rgba(248,248,245,.045)" }}
        >
          {decorMap[pageKey]}
        </span>
        <div className="mt-20 relative z-10 mx-auto max-w-[1280px]">
          <p dir="ltr" className="w-max text-sm font-black tracking-[0.12em]" style={{ color: ACCENT }}>
            POLARIZED-X / INFO
          </p>
          <h1 className="mt-2 max-w-[20ch] text-4xl font-black leading-[0.95] sm:text-5xl lg:text-6xl" style={{ color: ON_DEEP }}>
            {title}
          </h1>
          <p className="mt-3 max-w-[58ch] text-base sm:text-lg" style={{ color: "rgba(248,248,245,.76)" }}>
            {subtitle}
          </p>
        </div>
      </section>

      {/* Content + TOC */}
      <section style={{ background: SURFACE }}>
        <div
          dir="rtl"
          className="mx-auto grid max-w-[1280px] gap-8 px-6 py-12 sm:px-12 lg:grid-cols-[minmax(0,68ch)_minmax(12rem,15rem)] lg:justify-between lg:gap-16 lg:py-20"
        >
          <article className={timeline ? "relative pr-8 sm:pr-11" : undefined}>
            {timeline && (
              <span
                aria-hidden
                className="absolute right-1 top-2 bottom-16 w-px sm:right-1.5"
                style={{ background: LINE }}
              />
            )}
            {sections.map((s, i) => (
              <div
                key={s.title}
                id={`section-${i + 1}`}
                className="relative mb-9 scroll-mt-24 border-b pb-9 last:mb-0 last:border-0 last:pb-0"
                style={{ borderColor: LINE }}
              >
                {timeline && (
                  <span
                    aria-hidden
                    className="absolute -right-8 top-1.5 h-2.5 w-2.5 rounded-full ring-4 sm:-right-11"
                    style={{ background: i === 0 ? ACCENT : SURFACE, border: `2px solid ${ACCENT}`, boxShadow: `0 0 0 5px ${SURFACE}` }}
                  />
                )}
                <h2 className="mb-4 flex items-baseline gap-2 text-2xl font-black leading-tight sm:text-3xl" style={{ color: INK }}>
                  {timeline && (
                    <span dir="ltr" className="text-sm font-black tracking-wider" style={{ color: ACCENT }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  {s.title}
                </h2>
                {Array.isArray(s.body) ? (
                  <ul className="list-disc space-y-2 pr-5" style={{ color: MUTED }}>
                    {s.body.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: MUTED }}>{s.body}</p>
                )}
              </div>
            ))}
            <p className="mt-4 text-sm" style={{ color: MUTED }}>
              עודכן לאחרונה: 18 ביולי 2026
            </p>
          </article>

          <nav aria-label="תוכן העמוד" className="lg:sticky lg:top-24 lg:self-start">
            <details open className="border-t-2 pt-3" style={{ borderColor: ACCENT }}>
              <summary className="flex min-h-11 cursor-pointer items-center justify-between text-lg font-black" style={{ color: INK }}>
                בעמוד הזה
              </summary>
              <div className="mt-1 grid grid-cols-2 gap-x-4 lg:grid-cols-1 lg:gap-0">
                {sections.map((s, i) => (
                  <a
                    key={s.title}
                    href={`#section-${i + 1}`}
                    className="flex min-h-11 items-center border-b py-1 text-sm transition-colors hover:text-black"
                    style={{ borderColor: LINE, color: MUTED }}
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </details>
          </nav>
        </div>
      </section>

      {/* Contact CTA */}
      <section dir="rtl" className="border-t-[3px] px-6 py-8 sm:px-12 lg:px-20" style={{ background: DEEP, borderColor: ACCENT }}>
        <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-12">
          <div>
            <p dir="ltr" className="w-max text-xs font-black tracking-[0.04em]" style={{ color: ACCENT }}>
              צריכים עזרה?
            </p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl" style={{ color: ON_DEEP }}>
              אנחנו בוואטסאפ.
            </h2>
          </div>
          <a
            href="https://wa.me/972587991094"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12.5 w-full items-center justify-center px-6 text-lg font-black transition-transform hover:-translate-y-0.5 sm:w-auto"
            style={{ background: ACCENT, color: INK }}
          >
            דברו איתנו
          </a>
        </div>
      </section>
    </>
  );
}
