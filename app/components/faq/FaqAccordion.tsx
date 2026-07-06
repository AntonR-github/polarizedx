"use client";

import { useState } from "react";

// Mock categories/questions — replace with real content from the CRM later.
const categories: { title: string; questions: { q: string; a: string }[] }[] = [
  {
    title: "על המוצר",
    questions: [
      { q: "מה ההבדל בין עדשות פולורייד ( Polarized ) מלוטדיח?", a: "" },
      { q: "מאיזה חומר עשויות משקפות המסגרות שלכם?", a: "" },
      { q: "האם העדשות מספקות הגנת UV מלאה?", a: "" },
    ],
  },
  {
    title: "הזמנה ומשלוח",
    questions: [
      { q: "תוך כמה זמן אקבל את ההזמנה שלי?", a: "" },
      { q: "מהי עלות המשלוח?", a: "" },
    ],
  },
  {
    title: "החזרות והחלפות",
    questions: [{ q: "מהי מדיניות ההחזרות שלכם?", a: "" }],
  },
  {
    title: "אחריות",
    questions: [{ q: "יש אחריות?", a: "" }],
  },
  {
    title: "חנויות בוטיק (B2B)",
    questions: [
      { q: "אני בעל חנות, איך אני מצטרפים?", a: "" },
      { q: "מה כלול בעגלת ההצטרפות?", a: "" },
      { q: "יש אפשרות לסייעת נציגות אחריות?", a: "" },
    ],
  },
];

export default function FaqAccordion() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="w-full bg-black py-16">
      <div dir="rtl" className="mx-auto max-w-4xl px-6 text-right text-white">
        <h2 className="text-right text-5xl font-light">שאלות נפוצות</h2>

        {categories.map((category) => (
          <div key={category.title} className="mt-15">
            <h2 className="text-right text-3xl font-bold">{category.title}</h2>
            <div className="mt-10 flex flex-col gap-3">
              {category.questions.map((item) => {
                const key = `${category.title}-${item.q}`;
                const isOpen = openKey === key;
                return (
                  <div key={key} className="rounded-md bg-zinc-900">
                    <button
                      type="button"
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                    >
                      <span>{item.q}</span>
                      <span
                        aria-hidden
                        className={`shrink-0 text-xl transition-transform ${isOpen ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm leading-relaxed text-zinc-400">
                        {item.a || "התוכן יעודכן בקרוב."}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
