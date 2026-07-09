# CRM / Hyp Pay / Payper Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire polarizedx's storefront to B2BCRM (products, orders, coupons), Hyp Pay (checkout), and Payper (inventory sync, CRM-side only) — the same architecture xvape already runs in production.

**Architecture:** B2BCRM is the single source of truth, scoped per-site by `Site.slug` + `x-api-key`. The storefront never talks to Payper directly — Payper pushes inventory to a CRM webhook (`B2BCRM/app/api/[siteSlug]/payper-webhook/route.ts`), which upserts products gated by `site.payperCategories`. The storefront reads products from `GET /api/{slug}/products`, submits orders to `POST /api/{slug}/orders`, validates coupons via `POST /api/{slug}/validate-coupon`, and gets a signed Hyp Pay redirect URL from its own `/api/hyp-checkout` route. On payment return, `/api/payment/confirm` calls CRM's `orders/{id}/confirm`, which flips order status and sends the admin/customer emails server-side.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, Hyp Pay (`pay.hyp.co.il`), B2BCRM (Prisma/Postgres via Supabase), Payper (`app.payper.co.il`, CRM-side webhook only), Nodemailer/SMTP.

## Global Constraints

- Every CRM call uses `x-api-key: process.env.CRM_API_KEY` and is scoped by `process.env.CRM_SITE_SLUG` — copy this pattern from xvape's `lib/cms.ts` / `app/api/hyp-checkout/route.ts`, don't invent a new auth shape.
- Product fetches must fall back to the local `lib/products-data.ts` mocks if CRM is unreachable or returns an empty array — never let a CRM outage blank the storefront (this is exactly what xvape's `lib/products.ts` does).
- **No unit test framework is wired in this repo** (no jest/vitest; `playwright` is a devDependency but has zero spec files, and xvape — the reference implementation for this exact integration — has no automated tests either). Per "follow existing patterns in existing codebases," this plan does **not** introduce a new test runner. Each task's verification step is a concrete manual check (dev server + `curl`/browser), not a fabricated unit test with mocks nobody asked for.
- Money math (totals, discounts, shipping) must be computed server-side wherever it currently isn't — never trust a client-supplied `amount` for a payment.
- Hebrew RTL and the existing visual language (black header/footer, white content sections) must be preserved; this plan touches data wiring, not layout.

---

### Task 1: CRM Site setup + environment configuration + image domains

**Files:**
- Create: `.env.local` (git-ignored, not committed)
- Modify: `next.config.ts`

**Interfaces:**
- Produces: `process.env.CRM_URL`, `process.env.CRM_API_KEY`, `process.env.CRM_SITE_SLUG`, `process.env.NEXT_PUBLIC_CRM_URL`, `process.env.NEXT_PUBLIC_CRM_SITE_SLUG`, `process.env.NEXT_PUBLIC_SITE_URL`, `process.env.REVALIDATE_SECRET`, `process.env.HYP_MASOF`, `process.env.HYP_KEY`, `process.env.HYP_PASSP`, `process.env.PAYPER_API_KEY`, `process.env.PAYPER_ACCOUNT`, `process.env.SMTP_*` — consumed by every task below.

- [ ] **Step 1: Create the `polarizedx` Site in B2BCRM admin**

  With the CRM dev server running (`cd B2BCRM && npm run dev`, on `localhost:3000`), log in as admin and go to:

  `http://localhost:3000/admin/sites/new`

  Fill in:
  - **Site Name:** `Polarizedx`
  - **Slug:** `polarizedx`
  - **Client Site URL:** `http://localhost:3002` (polarizedx's dev URL — see Step 3; update to the real domain after deploy)

  Submit. This creates a `Site` row with an auto-generated `apiKey` (via `prisma.site.create` in `B2BCRM/app/actions/admin.ts`). Open the new site's page (`/admin/sites/[siteId]` or `/sites/[siteId]/settings`) and copy the **API Key** — you'll need it in Step 2.

- [ ] **Step 2: Write `.env.local`**

  Create `c:\Users\anton\Desktop\b2b\polarizedx\.env.local`:

  ```
  # CRM integration — from B2BCRM admin → Sites → polarizedx → API Key
  CRM_URL=http://localhost:3000
  CRM_API_KEY=<paste the API key from Step 1>
  CRM_SITE_SLUG=polarizedx
  NEXT_PUBLIC_CRM_URL=http://localhost:3000
  NEXT_PUBLIC_CRM_SITE_SLUG=polarizedx
  REVALIDATE_SECRET=<paste the revalidateSecret shown on the same CRM site settings page>

  NEXT_PUBLIC_SITE_URL=http://localhost:3002

  # Payper — CRM-side webhook only; these are NOT used by polarizedx code,
  # kept here only if you later need a debug/test route like xvape's payper-test.
  # PAYPER_API_KEY=
  # PAYPER_ACCOUNT=

  # Hyp Pay — new terminal for polarizedx (do not reuse xvape's)
  HYP_MASOF=<new terminal MASOF>
  HYP_KEY=<new terminal KEY>
  HYP_PASSP=<new terminal PASSP>

  # Email (contact form + order confirmations are sent by the CRM, not this app —
  # SMTP_* here is only used by app/api/contact/route.ts's own transporter)
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_SECURE=false
  SMTP_USER=<polarizedx sending address>
  SMTP_PASS=<gmail app password>
  ```

  `HYP_MASOF`/`HYP_KEY`/`HYP_PASSP` and the Payper values are blocked on external accounts not yet created (per Phase 0) — leave them blank/commented until you have them. Everything else (CRM_*, SITE_URL) can be filled in immediately after Step 1.

- [ ] **Step 3: Set the dev port to 3002**

  Modify `package.json`'s `dev` script (currently `"dev": "next dev"`) so polarizedx doesn't collide with the CRM (port 3000) or xvape (port 3001):

  ```json
  "dev": "next dev -p 3002",
  ```

- [ ] **Step 4: Whitelist CRM + Payper image domains**

  Modify `next.config.ts`:

  ```ts
  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    images: {
      qualities: [75, 100],
      remotePatterns: [
        { protocol: "https", hostname: "ducks.co.il" },
        { protocol: "https", hostname: "**.ducks.co.il" },
        { protocol: "http", hostname: "localhost" },
        { protocol: "https", hostname: "app.payper.co.il" },
      ],
    },
  };

  export default nextConfig;
  ```

  The `localhost` entry lets `next/image` load CRM-hosted images while `CRM_URL=http://localhost:3000` in dev; drop it (or leave it, it's harmless) once deployed.

- [ ] **Step 5: Verify**

  ```bash
  npm run dev
  ```

  Visit `http://localhost:3002` — the site should still render exactly as before (no CRM calls exist yet, this task only wires the environment). Confirm no port conflict and no console errors about missing env vars.

- [ ] **Step 6: Commit**

  ```bash
  git add next.config.ts package.json
  git commit -m "chore: configure CRM/Hyp env scaffolding and image domains"
  ```

  (`.env.local` is git-ignored — verify with `git status` that it does *not* appear before committing.)

---

### Task 2: CRM-backed product fetch layer

**Files:**
- Create: `lib/products.ts`

**Interfaces:**
- Consumes: `StoreProduct` type and `products` fallback array from `lib/products-data.ts` (already defined, matches CRM's field names).
- Produces: `export async function getProducts(): Promise<StoreProduct[]>` and `export const SHIPPING_FEE = 29`, `export const FREE_SHIPPING_THRESHOLD = 199` — consumed by Task 3 (page wiring) and Task 4 (server-side total recompute). These two constants are currently duplicated as raw numbers in `app/cart/page.tsx:8,31` and `app/checkout/page.tsx:46` — this task is the single source of truth going forward.

- [ ] **Step 1: Write `lib/products.ts`**

  ```ts
  import { products as fallbackProducts, type StoreProduct } from "./products-data";

  export type { StoreProduct };

  export const SHIPPING_FEE = 29;
  export const FREE_SHIPPING_THRESHOLD = 199;

  interface CrmProduct {
    id: string;
    handle: string;
    name: string;
    price: number;
    description?: string;
    badge?: string;
    image?: string;
    images?: string[];
    payperSku?: string;
    cardFeatures?: string[];
    features?: string[];
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    videoUrl?: string;
    soldCount?: string;
    rating?: number;
    reviewCount?: number;
    specsRaw?: string;
    inTheBox?: string;
    usageInstructions?: string;
    warrantyInfo?: string;
    faqRaw?: string;
    relatedProductIds?: string[];
  }

  function toStoreProduct(p: CrmProduct): StoreProduct {
    const allImages = p.images?.length ? p.images : p.image ? [p.image] : [];
    return {
      id: p.id,
      handle: p.handle,
      name: p.name,
      price: p.price,
      description: p.description,
      badge: p.badge,
      thumbnail: allImages[0] ?? null,
      images: allImages,
      cardFeatures: p.cardFeatures ?? [],
      features: p.features ?? [],
      variantId: p.payperSku ?? "",
      variants: [],
      metaTitle: p.metaTitle ?? null,
      metaDescription: p.metaDescription ?? null,
      ogImage: p.ogImage ?? null,
      videoUrl: p.videoUrl ?? null,
      soldCount: p.soldCount ?? null,
      rating: p.rating ?? null,
      reviewCount: p.reviewCount ?? null,
      specsRaw: p.specsRaw ?? null,
      inTheBox: p.inTheBox ?? null,
      usageInstructions: p.usageInstructions ?? null,
      warrantyInfo: p.warrantyInfo ?? null,
      faqRaw: p.faqRaw ?? null,
      relatedProductIds: p.relatedProductIds ?? [],
    };
  }

  export async function getProducts(): Promise<StoreProduct[]> {
    try {
      const res = await fetch(
        `${process.env.CRM_URL}/api/${process.env.CRM_SITE_SLUG}/products`,
        { next: { revalidate: 60 } }
      );
      if (!res.ok) return fallbackProducts;

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) return fallbackProducts;

      return data.map(toStoreProduct);
    } catch {
      return fallbackProducts;
    }
  }
  ```

  Note: `color` and `material` (used by `ShopProducts.tsx` and `ProductDetail.tsx`'s `addToCart`) exist on the local mock `StoreProduct` objects in `products-data.ts` but have no equivalent column in the CRM `Product` schema (confirmed against `B2BCRM/prisma/schema.prisma` and the `products` route's `select`). Real CRM-synced products will have `color`/`material` as `undefined` — both fields are already optional on `StoreProduct`, and consuming components must render them conditionally (Task 3 handles the one place this isn't yet true).

- [ ] **Step 2: Verify**

  With `CRM_URL` pointing at a running CRM dev server (`localhost:3000`) that has the `polarizedx` site but zero products yet, add a temporary throwaway log:

  ```bash
  cd polarizedx
  node -e "
    process.env.CRM_URL='http://localhost:3000';
    process.env.CRM_SITE_SLUG='polarizedx';
    import('./lib/products.ts').then(async m => {
      const p = await m.getProducts();
      console.log('product count:', p.length, 'source:', p[0]?.id?.startsWith('prod_') ? 'fallback mock' : 'CRM');
    });
  " 2>&1 | tail -5
  ```

  Expected: `product count: 6 source: fallback mock` (CRM has no products yet, so it falls back — this confirms the fallback path works, which is the only path testable before Payper/CRM products exist).

- [ ] **Step 3: Commit**

  ```bash
  git add lib/products.ts
  git commit -m "feat: add CRM-backed product fetch with mock fallback"
  ```

---

### Task 3: Wire shop listing, homepage, and product detail page to `getProducts()`

**Files:**
- Modify: `app/shop/page.tsx`
- Modify: `app/components/shop/ShopProducts.tsx`
- Modify: `app/page.tsx`
- Modify: `app/components/home/FeaturedProducts.tsx`
- Modify: `app/shop/[id]/page.tsx`

**Interfaces:**
- Consumes: `getProducts()` and `StoreProduct` from `lib/products.ts` (Task 2).
- Produces: `ShopProducts` and `FeaturedProducts` now take `products: StoreProduct[]` as a prop instead of holding their own mock array — no other task depends on this signature, but keep it in mind if either component is reused elsewhere later.

- [ ] **Step 1: Make `app/shop/page.tsx` fetch products server-side**

  Current file:
  ```tsx
  import ShopHero from "../components/shop/ShopHero";
  import ShopProducts from "../components/shop/ShopProducts";
  import ShopTrustBar from "../components/shop/ShopTrustBar";
  import ShopRetail from "../components/shop/ShopRetail";

  export default function ShopPage() {
    return (
      <main>
        <ShopHero />
        <ShopProducts />
        <ShopTrustBar />
        <ShopRetail />
      </main>
    );
  }
  ```

  Replace with:
  ```tsx
  import ShopHero from "../components/shop/ShopHero";
  import ShopProducts from "../components/shop/ShopProducts";
  import ShopTrustBar from "../components/shop/ShopTrustBar";
  import ShopRetail from "../components/shop/ShopRetail";
  import { getProducts } from "../../lib/products";

  export default async function ShopPage() {
    const products = await getProducts();
    return (
      <main>
        <ShopHero />
        <ShopProducts products={products} />
        <ShopTrustBar />
        <ShopRetail />
      </main>
    );
  }
  ```

- [ ] **Step 2: Update `ShopProducts.tsx` to accept `products` as a prop**

  Remove the local hardcoded `products` array and the now-unused inline type alias. Change:

  ```tsx
  "use client";

  import { useState } from "react";
  import Image from "next/image";
  import { useCart } from "../../context/CartContext";
  import type { StoreProduct } from "../../../lib/products";

  const PAGE_SIZE = 12;
  const FALLBACK_IMG = "/images/mockproduct.jpg";

  function ProductCard({ p }: { p: StoreProduct }) {
    const { addItem } = useCart();
    const image = p.thumbnail ?? p.images?.[0] ?? FALLBACK_IMG;
    return (
      <div className="flex w-full flex-col rounded-md border border-zinc-200 bg-white p-4 text-center">
        <div className="relative h-40">
          <Image src={image} alt={p.name} fill className="object-contain p-2" />
        </div>
        <p className="mt-2 text-2xl font-bold text-black">{p.name}</p>
        {p.color && <p className="mt-2 text-base text-black">{p.color}</p>}
        <p className="mt-2 text-2xl font-bold text-black">₪ {p.price}</p>
        <button
          type="button"
          onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image })}
          className="mt-4 rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
        >
          הוסף לסל
        </button>
      </div>
    );
  }

  export default function ShopProducts({ products }: { products: StoreProduct[] }) {
    // ...keep the existing pagination/filter logic below, replacing every
    // reference to the old local `products` array with the `products` prop.
  ```

  Every reference to the module-level `products` array further down in this file (pagination slicing, category filters, etc.) must read from the `products` prop instead. `color` isn't on `StoreProduct` yet either — check `lib/products-data.ts`'s `StoreProduct` interface (it already has `color?: string`), so this compiles as-is; no interface change needed.

- [ ] **Step 3: Wire the homepage's featured row**

  Modify `app/page.tsx` (currently synchronous) to fetch and slice the first 4 products, same pattern as Step 1:

  ```tsx
  import Hero from "./components/home/Hero";
  import FeaturedProducts from "./components/home/FeaturedProducts";
  import SecondPair from "./components/home/SecondPair";
  import WhyX from "./components/home/WhyX";
  import RetailPitch from "./components/home/RetailPitch";
  import BluePair from "./components/home/BluePair";
  import { getProducts } from "../lib/products";

  export default async function HomePage() {
    const products = (await getProducts()).slice(0, 4);
    return (
      <main>
        <Hero />
        <FeaturedProducts products={products} />
        <SecondPair />
        <WhyX />
        <RetailPitch />
        <BluePair />
      </main>
    );
  }
  ```

  (`app/page.tsx` is one level above `lib/`, so the import is `../lib/products` — one `../` shallower than `app/shop/page.tsx`'s `../../lib/products` in Step 1, which sits one directory deeper.)

- [ ] **Step 4: Update `FeaturedProducts.tsx` to accept the `products` prop**

  Same shape change as `ShopProducts`. Replace the top of the file:

  ```tsx
  "use client";

  import Image from "next/image";
  import Link from "next/link";
  import useEmblaCarousel from "embla-carousel-react";
  import { useCallback, useEffect, useState } from "react";
  import type { StoreProduct } from "../../../lib/products";

  const FALLBACK_IMG = "/images/mockproduct.jpg";

  function ProductCard({ p }: { p: StoreProduct }) {
    const image = p.thumbnail ?? p.images?.[0] ?? FALLBACK_IMG;
    return (
      <Link
        href={`/shop/${p.handle || p.id}`}
        className="group mx-auto flex w-full max-w-90 flex-col self-start rounded-md bg-white transition-shadow hover:shadow-md"
      >
        <div className="relative h-44">
          <Image src={image} alt={p.name} fill className="object-contain p-1" />
        </div>
        {/* ...keep the existing footer markup (price/name row) below, unchanged */}
      </Link>
    );
  }

  export default function FeaturedProducts({ products }: { products: StoreProduct[] }) {
    // ...keep the existing embla carousel setup/effects unchanged, replacing every
    // reference to the old module-level `products` array with this `products` prop.
  ```

  Everything below the carousel setup (the `useEmblaCarousel` call, scroll callbacks, and the `.map((p) => <ProductCard key={p.id} p={p} />)` render) stays as-is — it already operates on whatever array it's given, so no logic changes, only the array's source.

- [ ] **Step 5: Wire the product detail page**

  Modify `app/shop/[id]/page.tsx` — replace:
  ```tsx
  import { products } from "../../../lib/products-data";
  ```
  with:
  ```tsx
  import { getProducts } from "../../../lib/products";
  ```

  And in each of `generateStaticParams`, `generateMetadata`, and `ProductPage`, call `const products = await getProducts();` as the first line (they currently reference the module-level `products` import directly — each function needs its own local fetch since it's no longer a static import):

  ```tsx
  export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((p) => ({ id: p.handle || p.id }));
  }

  export async function generateMetadata(props: PageProps<"/shop/[id]">) {
    const { id } = await props.params;
    const products = await getProducts();
    const product = products.find((p) => p.handle === id || p.id === id);
    // ...unchanged below
  }

  export default async function ProductPage(props: PageProps<"/shop/[id]">) {
    const { id } = await props.params;
    const products = await getProducts();
    const product = products.find((p) => p.handle === id || p.id === id);
    // ...unchanged below
  }
  ```

- [ ] **Step 6: Verify**

  ```bash
  npm run dev
  ```

  Visit `http://localhost:3002/shop`, `http://localhost:3002/`, and `http://localhost:3002/shop/leopard-x`. With no products yet in CRM, all three must render identically to before (fallback mocks) — confirms the wiring didn't break anything while CRM is still empty. Check the terminal for any thrown errors from the new `await getProducts()` calls.

- [ ] **Step 7: Commit**

  ```bash
  git add app/shop/page.tsx app/components/shop/ShopProducts.tsx app/page.tsx app/components/home/FeaturedProducts.tsx "app/shop/[id]/page.tsx"
  git commit -m "feat: wire shop, homepage, and product detail pages to CRM products"
  ```

---

### Task 4: Server-side price and coupon recomputation in `/api/hyp-checkout`

**Files:**
- Modify: `app/api/hyp-checkout/route.ts`

**Interfaces:**
- Consumes: `getProducts()`, `SHIPPING_FEE`, `FREE_SHIPPING_THRESHOLD` from `lib/products.ts` (Task 2).
- Produces: same response shape as before (`{ paymentUrl }` or `{ error }`) — the checkout page (`app/checkout/page.tsx`) needs no changes, since it already reads `data.paymentUrl` / `data.error`.

- [ ] **Step 1: Replace the client-trusted amount with a server-computed one**

  In `app/api/hyp-checkout/route.ts`, the existing code has this known gap (its own comment says so):
  ```ts
  // NOTE: `amount` is still client-supplied here — this is a known gap, not a resolved one.
  // ...
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  ```

  Replace the whole body from `const body: HypCheckoutBody = await req.json();` through the amount/shipping/discount validation with:

  ```ts
  import { getProducts, SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "../../../lib/products";

  // ...inside POST, after the masof/key/passP check:

  const body: HypCheckoutBody = await req.json();
  const { coupon, customer, items } = body;

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const products = await getProducts();
  let itemsTotal = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.id || p.variantId === item.id);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${item.id}` }, { status: 400 });
    }
    itemsTotal += product.price * item.qty;
  }

  let discount = 0;
  if (coupon) {
    try {
      const couponRes = await fetch(
        `${process.env.CRM_URL}/api/${process.env.CRM_SITE_SLUG}/validate-coupon`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: coupon }),
        }
      );
      if (couponRes.ok) {
        const couponData = await couponRes.json();
        discount =
          couponData.type === "PERCENT"
            ? Math.round(((itemsTotal * couponData.value) / 100) * 100) / 100
            : Math.min(couponData.value, itemsTotal);
      }
    } catch {
      // Coupon service unreachable — proceed without a discount rather than block checkout.
    }
  }

  const shipping = itemsTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const amount = Math.max(0, itemsTotal - discount) + shipping;

  if (amount <= 0) {
    return NextResponse.json({ error: "Invalid order total" }, { status: 400 });
  }
  ```

  This removes `shipping`/`discount`/`amount` from the trusted request body entirely — they're now always computed from `items` + a fresh coupon lookup, both server-side. Downstream code (the `orderId` generation, the CRM order POST, the Hyp `APISign` params) stays the same but now references this recomputed `amount`/`shipping`/`discount` instead of the ones previously destructured from `body`.

- [ ] **Step 2: Update the CRM pending-order POST to use the recomputed values**

  The existing code already does:
  ```ts
  if (customer && items?.length) {
    try {
      await fetch(`${process.env.CRM_URL}/api/${process.env.CRM_SITE_SLUG}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": process.env.CRM_API_KEY! },
        body: JSON.stringify({ id: orderId, total: amount, shipping, discount, coupon, customer, items }),
      });
    } catch {}
  }
  ```
  No change needed here — `amount`, `shipping`, `discount`, `coupon` now resolve to the server-computed values from Step 1 automatically, since they're the same variable names.

- [ ] **Step 3: Verify**

  With the CRM dev server running and `polarizedx`'s fallback mock products active (from Task 2/3):

  ```bash
  curl -s -X POST http://localhost:3002/api/hyp-checkout \
    -H "Content-Type: application/json" \
    -d '{"items":[{"id":"prod_leopard_x","qty":1}],"customer":{"firstName":"Test","lastName":"User","email":"t@example.com","phone":"0500000000","street":"Main","houseNumber":"1","address":"Main 1","city":"Tel Aviv"}}'
  ```

  Expected (until `HYP_MASOF`/`HYP_KEY`/`HYP_PASSP` are set): `{"error":"Hyp Pay credentials not configured. Set HYP_MASOF, HYP_KEY, HYP_PASSP in .env.local"}` — this confirms the request reaches the Hyp credential check, meaning the item-lookup and total computation ahead of it didn't throw. Once real Hyp credentials exist (Phase 0), rerun and confirm you instead get back `{"paymentUrl": "https://pay.hyp.co.il/..."}`.

  Also verify the rejection path:
  ```bash
  curl -s -X POST http://localhost:3002/api/hyp-checkout \
    -H "Content-Type: application/json" \
    -d '{"items":[{"id":"does-not-exist","qty":1}]}'
  ```
  Expected: `{"error":"Unknown product: does-not-exist"}`.

- [ ] **Step 4: Commit**

  ```bash
  git add app/api/hyp-checkout/route.ts
  git commit -m "fix: compute checkout total server-side instead of trusting the client"
  ```

---

### Task 5: Payment success/failure pages + confirm route

**Files:**
- Create: `app/api/payment/confirm/route.ts`
- Create: `app/payment/success/page.tsx`
- Create: `app/payment/success/SuccessClient.tsx`
- Create: `app/payment/failure/page.tsx`

**Interfaces:**
- Consumes: `useCart()` (`clearCart`) from `app/context/CartContext.tsx` (already exists).
- Produces: nothing consumed by later tasks — this is the terminal step of the checkout flow.

- [ ] **Step 1: Create the confirm route**

  ```ts
  // app/api/payment/confirm/route.ts
  import { NextRequest, NextResponse } from "next/server";

  export async function POST(req: NextRequest) {
    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

    try {
      const res = await fetch(
        `${process.env.CRM_URL}/api/${process.env.CRM_SITE_SLUG}/orders/${orderId}/confirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.CRM_API_KEY!,
          },
        }
      );
      const data = await res.json();
      return NextResponse.json(data);
    } catch (err) {
      console.error("[payment/confirm] CRM call failed:", err);
      return NextResponse.json({ error: "CRM unavailable" }, { status: 502 });
    }
  }
  ```

- [ ] **Step 2: Create the success page + its client-side effect**

  Hyp Pay redirects to `SuccessUrl` (set in `app/api/hyp-checkout/route.ts` as `${siteUrl}/payment/success`) with query params including the `Order` id. Split into a server page + client component so `useCart()` (a client hook) can run the clear/confirm side effect:

  ```tsx
  // app/payment/success/page.tsx
  import SuccessClient from "./SuccessClient";

  export default function PaymentSuccessPage() {
    return <SuccessClient />;
  }
  ```

  ```tsx
  // app/payment/success/SuccessClient.tsx
  "use client";

  import { useEffect, useState } from "react";
  import { useSearchParams } from "next/navigation";
  import Link from "next/link";
  import { useCart } from "../../context/CartContext";

  export default function SuccessClient() {
    const searchParams = useSearchParams();
    const { clearCart } = useCart();
    const [status, setStatus] = useState<"confirming" | "done" | "error">("confirming");

    useEffect(() => {
      const orderId = searchParams.get("Order");
      if (!orderId) {
        setStatus("error");
        return;
      }
      fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      })
        .then((res) => res.json())
        .then(() => {
          clearCart();
          setStatus("done");
        })
        .catch(() => setStatus("error"));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <main dir="rtl" className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        {status === "confirming" && <p className="text-lg text-zinc-600">מאשר את ההזמנה...</p>}
        {status === "done" && (
          <>
            <h1 className="text-3xl font-bold text-black">התשלום התקבל בהצלחה!</h1>
            <p className="text-zinc-600">שלחנו לך מייל אישור עם פרטי ההזמנה.</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-black">התשלום עבר, אך אירעה שגיאה באישור ההזמנה</h1>
            <p className="text-zinc-600">אנא צרו קשר איתנו ונוודא שההזמנה נקלטה.</p>
          </>
        )}
        <Link href="/shop" className="mt-4 rounded-md bg-black px-6 py-3 text-sm font-semibold text-white">
          המשך בקניות
        </Link>
      </main>
    );
  }
  ```

- [ ] **Step 3: Create the failure page**

  ```tsx
  // app/payment/failure/page.tsx
  import Link from "next/link";

  export default function PaymentFailurePage() {
    return (
      <main dir="rtl" className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <h1 className="text-3xl font-bold text-black">התשלום לא הושלם</h1>
        <p className="text-zinc-600">לא חויבת. אפשר לנסות שוב או לפנות אלינו אם הבעיה חוזרת.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/checkout" className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white">
            נסה שוב
          </Link>
          <Link href="/contact" className="rounded-md border border-black px-6 py-3 text-sm font-semibold text-black">
            צור קשר
          </Link>
        </div>
      </main>
    );
  }
  ```

- [ ] **Step 4: Verify**

  ```bash
  npm run dev
  ```

  Visit `http://localhost:3002/payment/success?Order=fake-id` — expect the "confirming" flash then the error state (since `fake-id` doesn't exist in CRM), with no thrown exceptions in the terminal. Visit `http://localhost:3002/payment/failure` — expect the static failure message to render.

- [ ] **Step 5: Commit**

  ```bash
  git add app/api/payment/confirm/route.ts app/payment/success app/payment/failure
  git commit -m "feat: add Hyp Pay success/failure pages and order confirm route"
  ```

---

### Task 6: Fix contact form branding

**Files:**
- Modify: `app/api/contact/route.ts:56-57`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing consumed elsewhere — leaf fix.

- [ ] **Step 1: Replace the hardcoded xvape-era sender/recipient**

  Current:
  ```ts
  from: `"POLARIZED-X Website" <noreply@polarizedx.co.il>`,
  to: "realleafherbs@gmail.com",
  ```

  The `from` address is already correct for polarizedx. The `to` is still xvape's client inbox — replace with polarizedx's own inbox (use the same address as `SMTP_USER` unless a different inbox is wanted):

  ```ts
  from: `"POLARIZED-X Website" <noreply@polarizedx.co.il>`,
  to: process.env.SMTP_USER!,
  ```

- [ ] **Step 2: Verify**

  With `SMTP_*` set in `.env.local` to a real Gmail account + app password:
  ```bash
  curl -s -X POST http://localhost:3002/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","phone":"0500000000","email":"test@example.com","message":"hello"}'
  ```
  Expected: `{"ok":true}` and an email arrives at the `SMTP_USER` inbox.

- [ ] **Step 3: Commit**

  ```bash
  git add app/api/contact/route.ts
  git commit -m "fix: send contact form submissions to polarizedx's own inbox"
  ```

---

### Task 7: End-to-end manual verification (no code changes)

This task has no files to modify — it's the checklist to run once the Phase 0 externals (Payper category, Hyp Pay terminal) exist. Not automatable without live third-party credentials, so it's deliberately manual rather than scripted.

- [ ] In B2BCRM admin, set `polarizedx`'s `payperCategories` to the sunglasses category name once known, and trigger (or wait for) a real Payper webhook push. Confirm a product appears in `/sites/{siteId}/products` (starts `active: false`) — activate it.
- [ ] Reload `http://localhost:3002/shop` and confirm the real product now appears instead of the mock fallback (check `product count` / image source visually — real Payper images come from `app.payper.co.il`).
- [ ] Once `HYP_MASOF`/`HYP_KEY`/`HYP_PASSP` are set, run a real Hyp Pay test transaction end-to-end from `/checkout`: fill the form, pay, confirm redirect to `/payment/success`, confirm the order flips to a non-`pending` status in CRM's `/sites/{siteId}/orders`, and confirm both admin and customer emails arrive (sent by the CRM's confirm route, not polarizedx).
- [ ] Submit the real `/contact` page form and confirm the email arrives at the address set in Task 6.
- [ ] Deploy polarizedx to Vercel; update `NEXT_PUBLIC_SITE_URL`, `CRM_URL`/`NEXT_PUBLIC_CRM_URL` (→ `https://www.ducks.co.il`), and the CRM Site's `revalidateUrl` to the real domain.

---
