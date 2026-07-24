export const TWO_PAIR_BUNDLE_PRICE = 199;

interface PriceableItem {
  price: number;
  qty: number;
}

// Current promotion: every two sunglasses are bundled together for 199₪.
// Units are sorted high-to-low so that if the cart has an odd number of items,
// the remaining single item is the cheapest one and keeps its regular price.
export function calculateItemsTotal(items: PriceableItem[]): number {
  const unitPrices: number[] = [];
  for (const item of items) {
    for (let i = 0; i < item.qty; i++) unitPrices.push(item.price);
  }
  unitPrices.sort((a, b) => b - a);

  let total = 0;
  for (let i = 0; i < unitPrices.length; i += 2) {
    if (i + 1 < unitPrices.length) {
      total += TWO_PAIR_BUNDLE_PRICE;
    } else {
      total += unitPrices[i];
    }
  }
  return Math.round(total * 100) / 100;
}
