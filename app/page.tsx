import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import HeroSection from "@/components/hero-section";
import Features from "@/components/features-1";
import MigrationProcess from "@/components/MigrationProcess";
import CredibilitySection from "@/components/CredibilitySection";
import CallToAction from "@/components/call-to-action";
import FooterSection from "@/components/footer";

export default function Home() {
  return (
    <>
      <AnalyticsWrapper name="hero">
        <HeroSection />
      </AnalyticsWrapper>

      <AnalyticsWrapper name="features">
        <Features />
      </AnalyticsWrapper>

      <AnalyticsWrapper name="migration_process">
        <MigrationProcess />
      </AnalyticsWrapper>

      <AnalyticsWrapper name="credibility">
        <CredibilitySection />
      </AnalyticsWrapper>

      <AnalyticsWrapper name="cta">
        <CallToAction />
      </AnalyticsWrapper>

      <FooterSection />
    </>
  );
}