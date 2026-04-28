
import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import HeroSection from "@/components/hero-section";
import Features from "@/components/features-1";
import MigrationProcess from "@/components/MigrationProcess";
import CredibilitySection from "@/components/CredibilitySection";
import CallToAction from "@/components/call-to-action";
import FooterSection from "@/components/footer";
import {
  tutorHeroContent,
  tutorFeatures,
  tutorMigrationSteps,
  tutorCredibility,
  tutorCTA,
} from "@/components/individual-tutor/tutor-home-content";

export default function TutorHome() {
  return (
    <>
      <AnalyticsWrapper name="hero-tutor">
        <HeroSection content={tutorHeroContent} />
      </AnalyticsWrapper>

      <AnalyticsWrapper name="features-tutor">
        <Features features={tutorFeatures} />
      </AnalyticsWrapper>

      <AnalyticsWrapper name="migration_process-tutor">
        <MigrationProcess steps={tutorMigrationSteps} />
      </AnalyticsWrapper>

      <AnalyticsWrapper name="credibility-tutor">
        <CredibilitySection content={tutorCredibility} />
      </AnalyticsWrapper>

      <AnalyticsWrapper name="cta-tutor">
        <CallToAction content={tutorCTA} />
      </AnalyticsWrapper>

      <FooterSection />
    </>
  );
}
