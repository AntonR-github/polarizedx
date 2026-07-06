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
