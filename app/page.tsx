import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { ProductDemo } from "@/components/landing/ProductDemo";
import { Features } from "@/components/landing/Features";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { AIInsightsPreview } from "@/components/landing/AIInsightsPreview";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Nav />
      <main className="flex-1">
        {/* 1. Hook — who it's for and what it does */}
        <Hero />

        {/* 2. Credibility — prove you're legit immediately */}
        <SocialProof />

        {/* 3. Clarity — show exactly how it works */}
        <ProductDemo />

        {/* 4. Value — all the things they get */}
        <Features />

        {/* 5. Depth — the dashboard they'll actually use */}
        <DashboardPreview />

        {/* 6. Differentiation — AI that advises, not just reports */}
        <AIInsightsPreview />

        {/* 7. Trust — real people, real results */}
        <Testimonials />

        {/* 8. Conversion — make it easy to say yes */}
        <Pricing />

        {/* 9. Objections — remove last doubts */}
        <FAQ />

        {/* 10. Final push — one clear CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
