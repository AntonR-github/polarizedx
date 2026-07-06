import Hero from "./components/home/Hero";
import FeaturedProducts from "./components/home/FeaturedProducts";
import SecondPair from "./components/home/SecondPair";
import WhyX from "./components/home/WhyX";
import RetailPitch from "./components/home/RetailPitch";
import BluePair from "./components/home/BluePair";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <SecondPair />
      <WhyX />
      <RetailPitch />
      <BluePair />
    </main>
  );
}
