export interface StoreProduct {
  id: string;
  handle: string;
  name: string;
  badge?: string;
  color?: string;
  material?: string;
  price: number;
  variantId: string;
  thumbnail?: string | null;
  images?: string[];
  description?: string;
  features?: string[];
  cardFeatures?: string[];
  variants: { id: string; title?: string; price?: number }[];
  options?: { id: string; title: string; value?: string }[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  videoUrl?: string | null;
  soldCount?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  specsRaw?: string | null;
  inTheBox?: string | null;
  usageInstructions?: string | null;
  warrantyInfo?: string | null;
  faqRaw?: string | null;
  relatedProductIds?: string[];
}

export type Product = StoreProduct;

const SPECS = [
  "עדשות|פולורייד UV400",
  "מסגרת|פוליקרבונט קשיח",
  "הגנה|100% מפני קרינת UV",
  "משקל|24 גרם",
  "התאמה|יוניסקס, מידה אחת",
  "אחריות|שנה אחת",
].join("\n");

const IN_THE_BOX = "זוג משקפי שמש POLARIZED-X\nקופסה מעוצבת\nתיק פנימי לשמירה\nמטלית ניקוי מיקרופייבר";
const USAGE = "נגבו את העדשות במטלית המצורפת בלבד. הימנעו ממגע עם חומרי ניקוי אגרסיביים. אחסנו בקופסה כשאינם בשימוש.";
const WARRANTY = "אחריות יצרן לשנה אחת מפגמי ייצור. במקרה תקלה, פנו אלינו דרך עמוד יצירת הקשר ונדאג לפתרון מהיר.";
const FAQ = [
  "האם המשקפיים מגנות מקרינת UV?|כן, כל זוג כולל הגנה מלאה מקרני UV400.",
  "איך מנקים את העדשות?|במטלית המיקרופייבר המצורפת בלבד, ללא חומרי ניקוי.",
  "האם יש אחריות?|כן, שנה אחת מפגמי ייצור.",
].join("\n");

export const products: Product[] = [
  {
    id: "prod_leopard_x",
    handle: "leopard-x",
    name: "LEOPARD X",
    badge: "מומלץ",
    color: "חום עם נקודות",
    material: "פוליקרבונט",
    price: 179,
    variantId: "",
    thumbnail: "/images/mockproduct.jpg",
    images: ["/images/mockproduct.jpg"],
    description: "עיצוב נמרי בולט עם עדשות פולורייד אמיתיות. קלאסיקה עם אופי.",
    features: [
      "עדשות TAC עם 7 שכבות הגנה::בלי קיצורי דרך באיכות.",
      "הגנת UV400 מלאה::בדקנו מה הופך משקף להיות טוב.",
      "מארז פרימיום הכולל נרתיק ומטלית::מסגרת PC קלה ועמידה.",
    ],
    cardFeatures: ["פולורייד UV400", "מסגרת פוליקרבונט", "7 שכבות הגנה", "אחריות שנה"],
    variants: [],
    rating: 4.8,
    reviewCount: 12,
    soldCount: "230",
    specsRaw: SPECS,
    inTheBox: IN_THE_BOX,
    usageInstructions: USAGE,
    warrantyInfo: WARRANTY,
    faqRaw: FAQ,
    relatedProductIds: ["prod_clear_x", "prod_wood_x", "prod_wild_x"],
  },
  {
    id: "prod_clear_x",
    handle: "clear-x",
    name: "CLEAR X",
    color: "שחור",
    material: "פוליקרבונט",
    price: 149,
    variantId: "",
    thumbnail: "/images/mockproduct.jpg",
    images: ["/images/mockproduct.jpg"],
    description: "עיצוב נקי ומינימליסטי, שחור על שחור. מתאים לכל יום.",
    features: [
      "עדשות TAC עם 7 שכבות הגנה::בלי קיצורי דרך באיכות.",
      "הגנת UV400 מלאה::בדקנו מה הופך משקף להיות טוב.",
      "מארז פרימיום הכולל נרתיק ומטלית::מסגרת PC קלה ועמידה.",
    ],
    cardFeatures: ["פולורייד UV400", "מסגרת פוליקרבונט", "7 שכבות הגנה", "אחריות שנה"],
    variants: [],
    rating: 4.6,
    reviewCount: 8,
    soldCount: "180",
    specsRaw: SPECS,
    inTheBox: IN_THE_BOX,
    usageInstructions: USAGE,
    warrantyInfo: WARRANTY,
    faqRaw: FAQ,
    relatedProductIds: ["prod_navy_x", "prod_black_x", "prod_leopard_x"],
  },
  {
    id: "prod_navy_x",
    handle: "navy-x",
    name: "NAVY X",
    color: "כחול כהה",
    material: "פוליקרבונט",
    price: 149,
    variantId: "",
    thumbnail: "/images/mockproduct.jpg",
    images: ["/images/mockproduct.jpg"],
    description: "גוון כחול עמוק שמתאים לכל אירוע. איכות בלי פשרות.",
    features: [
      "עדשות TAC עם 7 שכבות הגנה::בלי קיצורי דרך באיכות.",
      "הגנת UV400 מלאה::בדקנו מה הופך משקף להיות טוב.",
      "מארז פרימיום הכולל נרתיק ומטלית::מסגרת PC קלה ועמידה.",
    ],
    cardFeatures: ["פולורייד UV400", "מסגרת פוליקרבונט", "7 שכבות הגנה", "אחריות שנה"],
    variants: [],
    rating: 4.7,
    reviewCount: 5,
    soldCount: "140",
    specsRaw: SPECS,
    inTheBox: IN_THE_BOX,
    usageInstructions: USAGE,
    warrantyInfo: WARRANTY,
    faqRaw: FAQ,
    relatedProductIds: ["prod_clear_x", "prod_black_x", "prod_wood_x"],
  },
  {
    id: "prod_wood_x",
    handle: "wood-x",
    name: "WOOD X",
    color: "שחור + עץ",
    material: "פוליקרבונט ועץ",
    price: 199,
    variantId: "",
    thumbnail: "/images/mockproduct.jpg",
    images: ["/images/mockproduct.jpg"],
    description: "שילוב של מסגרת שחורה עם גימור עץ טבעי. סטייל שלא נגמר.",
    features: [
      "עדשות TAC עם 7 שכבות הגנה::בלי קיצורי דרך באיכות.",
      "הגנת UV400 מלאה::בדקנו מה הופך משקף להיות טוב.",
      "מארז פרימיום הכולל נרתיק ומטלית::מסגרת PC קלה ועמידה.",
    ],
    cardFeatures: ["פולורייד UV400", "גימור עץ טבעי", "7 שכבות הגנה", "אחריות שנה"],
    variants: [],
    rating: 4.9,
    reviewCount: 15,
    soldCount: "310",
    specsRaw: SPECS,
    inTheBox: IN_THE_BOX,
    usageInstructions: USAGE,
    warrantyInfo: WARRANTY,
    faqRaw: FAQ,
    relatedProductIds: ["prod_leopard_x", "prod_wild_x", "prod_black_x"],
  },
  {
    id: "prod_wild_x",
    handle: "wild-x",
    name: "WILD X",
    color: "ירוק + פסים",
    material: "פוליקרבונט",
    price: 199,
    variantId: "",
    thumbnail: "/images/mockproduct.jpg",
    images: ["/images/mockproduct.jpg"],
    description: "עיצוב נועז עם פסים ירוקים. ל-X שלא מתפשר.",
    features: [
      "עדשות TAC עם 7 שכבות הגנה::בלי קיצורי דרך באיכות.",
      "הגנת UV400 מלאה::בדקנו מה הופך משקף להיות טוב.",
      "מארז פרימיום הכולל נרתיק ומטלית::מסגרת PC קלה ועמידה.",
    ],
    cardFeatures: ["פולורייד UV400", "מסגרת פוליקרבונט", "7 שכבות הגנה", "אחריות שנה"],
    variants: [],
    rating: 4.5,
    reviewCount: 6,
    soldCount: "95",
    specsRaw: SPECS,
    inTheBox: IN_THE_BOX,
    usageInstructions: USAGE,
    warrantyInfo: WARRANTY,
    faqRaw: FAQ,
    relatedProductIds: ["prod_wood_x", "prod_leopard_x", "prod_navy_x"],
  },
  {
    id: "prod_black_x",
    handle: "black-x",
    name: "BLACK X",
    color: "שחור + עץ",
    material: "פוליקרבונט ועץ",
    price: 149,
    variantId: "",
    thumbnail: "/images/mockproduct.jpg",
    images: ["/images/mockproduct.jpg"],
    description: "השחור הקלאסי שתמיד עובד. עדשות פולורייד אמיתיות.",
    features: [
      "עדשות TAC עם 7 שכבות הגנה::בלי קיצורי דרך באיכות.",
      "הגנת UV400 מלאה::בדקנו מה הופך משקף להיות טוב.",
      "מארז פרימיום הכולל נרתיק ומטלית::מסגרת PC קלה ועמידה.",
    ],
    cardFeatures: ["פולורייד UV400", "גימור עץ טבעי", "7 שכבות הגנה", "אחריות שנה"],
    variants: [],
    rating: 4.7,
    reviewCount: 9,
    soldCount: "205",
    specsRaw: SPECS,
    inTheBox: IN_THE_BOX,
    usageInstructions: USAGE,
    warrantyInfo: WARRANTY,
    faqRaw: FAQ,
    relatedProductIds: ["prod_wood_x", "prod_clear_x", "prod_navy_x"],
  },
];
