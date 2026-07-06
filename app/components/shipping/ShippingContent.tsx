export default function ShippingContent() {
  return (
    <section className="w-full bg-white py-12">
      <div dir="rtl" className="site-container px-6 text-right text-black lg:px-12">
        <h2 className="text-3xl font-bold lg:text-4xl">מדיניות משלוחים ואספקה</h2>
        <p className="mt-2 text-zinc-500">ביטובי מרקט לעסקים</p>

        <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-zinc-800 lg:text-base">
          <p>
            אנו ב-CLICK2PARTY.CO.IL עושים את מירב המאמצים כדי שההזמנה שלכם תגיע אליכם במהירות המרבית. להלן פירוט
            תהליך השילוח שלנו:
          </p>

          <div>
            <h3 className="text-lg font-bold text-black">מהירות הטיפול בהזמנה 🚀</h3>
            <ul className="mt-2 list-disc space-y-1 pr-5">
              <li>
                הזמנות עד השעה 14:00: כל הזמנה שתתקבל עד השעה 14:00 ביום עסקים רגיל (א&apos;-ה&apos;), תארז ותימסר
                באותו היום לחברת השליחויות ותיקלט במחסן ההפצה שלה.
              </li>
              <li>
                מעקב אחר משלוח: ברגע שהחבילה נקלטת אצל חברת השליחויות, תקבלו הודעת SMS למספר הטלפון שהזנתם, עם קישור
                למעקב בזמן אמת אחר מיקום המשלוח.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-black">זמני אספקה 🚛</h3>
            <ul className="mt-2 list-disc space-y-1 pr-5">
              <li>השאיפה שלנו: ברוב המקרים, המשלוח ייצא עוד באותו הערב לאזור החלוקה הקרוב אליכם ויימסר לכם כבר ביום העסקים למחרת.</li>
              <li>
                התחייבות: אנו מתחייבים לאספקת המוצרים עד 3 ימי עסקים (ימי עסקים אינם כוללים את יום ההזמנה, ימי
                שישי, שבת, ערבי חג וחג).
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-black">שירות ובירורים 📞</h3>
            <p className="mt-2">
              במידה וההזמנה לא הגיעה אליכם בתוך 3 ימי עסקים, או אם יש לכם שאלה בנוגע למשלוח, צוות שירות הלקוחות שלנו
              זמין עבורכם:
            </p>
            <ul className="mt-2 list-disc space-y-1 pr-5">
              <li>טלפון/וואטסאפ: 054-719-9390</li>
              <li>שעות פעילות: א&apos;-ה&apos; בין השעות בין השעות 9:00-15:00</li>
            </ul>
          </div>

          <p>
            לישובים מרוחקים (רמת הגולן, אילת, יישובי הערבה ומעבר לקו הירוק), ייתכנו עיכובים קלים מעבר ל-3 ימי עסקים.
          </p>
        </div>
      </div>
    </section>
  );
}
