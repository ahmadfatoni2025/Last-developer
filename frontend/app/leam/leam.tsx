import { Hero } from './components/home/hero/Hero';
import { TrustedBy } from './components/home/trusted/TrustedBy';
import { StatsSection } from './components/value-props/ValueProps';
import { Features } from './components/home/features/Features';
import { HowItWorks } from './components/home/how-it-works/HowItWorks';
import { QuoteSection } from './components/home/quote/QuoteSection';
import { TemplateGallery } from './components/home/templates/TemplateGallery';
import { PerformanceSection } from './components/home/performance/PerformanceSection';
import { Testimonials } from './components/home/testimonials/Testimonials';
import Prices from './components/home/prices/prices';
import { FAQ } from './components/home/faq/FAQ';
import { Footer } from './components/footer/Footer';

export function Leam() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <StatsSection />
      <Features />
      <HowItWorks />
      <QuoteSection />
      <TemplateGallery />
      <PerformanceSection />
      <Testimonials />
      <Prices />
      <FAQ />
      <Footer />
    </>
  );
}
