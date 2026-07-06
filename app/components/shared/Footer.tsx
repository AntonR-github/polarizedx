import Link from "next/link";

const collection = [
  { label: "WILD X", href: "/shop/wild-x" },
  { label: "LEOPARD X", href: "/shop/leopard-x" },
  { label: "NAVY X", href: "/shop/navy-x" },
  { label: "BLACK X", href: "/shop/black-x" },
  { label: "CLEAR X", href: "/shop/clear-x" },
];

const brand = [
  { label: "צור קשר", href: "/contact" },
  { label: "הסיפור B2B", href: "/b2b" },
  { label: "האיכות", href: "/about" },
  { label: "קמעונאים", href: "/b2b" },
  { label: "שאלות נפוצות", href: "/faq" },
];

const service = [
  { label: "מדיניות פרטיות", href: "/privacy" },
  { label: "הצהרת נגישות", href: "/accessibility" },
  { label: "תקנון ותנאי שימוש", href: "/terms-of-service" },
  { label: "מדיניות משלוחים", href: "/shipping" },
];

const badges = ["שירות לקוחות", "משלוח מהיר", "אחריות מלאה"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const socials = [
  {
    label: "TikTok",
    href: "#",
    icon: (
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6 4.39 10.97 10.13 11.87v-8.4H7.08v-3.47h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.47h-2.8v8.4C19.61 23.04 24 18.07 24 12.07Z" />
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <path d="M.06 24l1.69-6.16a11.87 11.87 0 01-1.6-5.95C.15 5.32 5.5 0 12.06 0a11.8 11.8 0 018.42 3.49 11.74 11.74 0 013.49 8.39c0 6.55-5.35 11.88-11.92 11.88a11.94 11.94 0 01-5.7-1.45L.06 24zM6.6 20.13c1.68.99 3.28 1.58 5.4 1.58 5.45 0 9.9-4.42 9.9-9.86A9.82 9.82 0 0012.06 2c-5.46 0-9.9 4.42-9.9 9.86 0 2.23.65 3.9 1.74 5.65l-1 3.65 3.7-.97zm11.36-5.6c-.07-.12-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41z" />
    ),
  },
  {
    label: "טלפון",
    href: "#",
    icon: (
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    ),
  },
];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="text-center">
      <h3 className="text-sm font-semibold tracking-wide text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="site-container px-6 py-10 lg:px-12">

        {/* Brand row */}
        <div className="flex items-center gap-6 pb-8">
          <span className="text-2xl font-bold tracking-wide">POLARIZED-X</span>
          <span className="text-sm text-zinc-400">קלסיקה אמיתית שהולכת איתך.</span>
        </div>

        <div className="border-t border-white/10" />

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-10 md:grid-cols-4">
          <LinkColumn title="הקולקציה" links={collection} />
          <LinkColumn title="המותג" links={brand} />
          <LinkColumn title="שירות" links={service} />

          {/* Newsletter */}
          <div className="col-span-2 text-center md:col-span-1">
            <p className="text-sm leading-relaxed text-zinc-300">
              הישאר מעודכן קולקציה חדשה כל שנה.
              <br />
              תהיה הראשון לדעת.
            </p>
            <div className="mx-auto mt-4 flex max-w-xs items-stretch overflow-hidden rounded-md border border-white/20">
              <input
                type="email"
                placeholder="כתובת אימייל"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500"
              />
              <button
                type="button"
                className="shrink-0 border-r border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                הרשמה
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-6 text-sm text-zinc-200">
          {badges.map((b, i) => (
            <div key={b} className="flex items-center gap-4">
              {i > 0 && <span className="h-4 w-px bg-white/15" />}
              <span className="flex items-center gap-2">
                <CheckIcon />
                {b}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 pt-6 text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">
          {/* Company info (right in RTL) */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:justify-start">
            <span>© 2026 POLARIZED-X</span>
            <span>B2B MARKT LTD יבואנית בלעדית</span>
             <span>המרכבה 25, חולון</span>
          </div>

          {/* Socials (left in RTL) */}
          <div className="flex items-center justify-center gap-4 md:justify-end">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="text-zinc-400 transition-colors hover:text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
