import FaqHero from "../components/faq/FaqHero";
import FaqAccordion from "../components/faq/FaqAccordion";
import FaqContact from "../components/faq/FaqContact";

export default function FaqPage() {
  return (
    <main>
      <FaqHero />
      <FaqAccordion />
      <FaqContact />
    </main>
  );
}