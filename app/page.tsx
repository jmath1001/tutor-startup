import HeroSection from "@/components/hero-section";
import Features from "@/components/features-1";
import ContentSection from "@/components/content-1";
import CallToAction from "@/components/call-to-action";
import FooterSection from "@/components/footer";
import MigrationProcess from "@/components/MigrationProcess";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <ContentSection />
      <MigrationProcess />
      <CallToAction />
      <TestimonialCarousel />
      <FooterSection />
    </>
  );
}
