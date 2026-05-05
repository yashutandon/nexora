import ComponentShowcase from "@/components/layout/ComponentShowcase";
import FeaturesSection from "@/components/layout/Features";
import HeroSection from "@/components/layout/HeroSection";
import HowItWorksSection from "@/components/layout/HowItsWork";

export default function Home() {
  return (
    <main className="bg-white dark:bg-zinc-950 overflow-x-hidden min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection/>
      <ComponentShowcase/>
    </main>
  );
}