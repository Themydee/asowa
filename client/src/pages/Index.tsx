import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedDesigns } from "@/components/home/FeaturedDesigns";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedDesigns />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
