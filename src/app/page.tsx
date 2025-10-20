import { Hero } from "./components/hero";
import { Footer } from "./components/footer";
import { GrowingGuideSection } from "./sections/growing-guide-section";
import { GeneticsSection } from "./sections/genetics-section";
import { AboutSection } from "./sections/about-section";
import { NewsSection } from "./sections/news-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSection />
      <GeneticsSection />
      <GrowingGuideSection />
      <NewsSection />
      <Footer />
    </div>
  );
}
