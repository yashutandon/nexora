import ComponentShowcase from "@/components/layout/ComponentShowcase";
import FeaturesSection from "@/features/landing/components/Features";
import { HeroSection } from "@/components/ui/hero-section";
import { PricingSection } from "@/components/ui/pricing-section";
import HowItWorksSection from "@/components/layout/HowItsWork";

export default function Home() {
  return (
    <main className="bg-white dark:bg-black overflow-x-hidden min-h-screen selection:bg-red-500/30">
      <HeroSection />
      
      {/* Subtle Divider */}
      <div className="w-full max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent opacity-50" />
      
      <FeaturesSection />

      {/* Subtle Divider */}
      <div className="w-full max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent opacity-50" />
      
      {/* Premium Wrapper for How It Works */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.03),transparent_70%)] pointer-events-none" />
        <HowItWorksSection/>
      </section>

      {/* Premium Wrapper for Component Showcase */}
      <section className="relative w-full border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-950/20 backdrop-blur-3xl">
        <ComponentShowcase/>
      </section>

      {/* Subtle Divider */}
      <div className="w-full max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent opacity-50" />
      
      {/* Pricing Section */}
      <PricingSection />
    </main>
  );
}