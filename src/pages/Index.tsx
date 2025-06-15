
import React from 'react';
import HomeHero from '@/components/HomeHero';
import FeaturedWorkspaces from '@/components/FeaturedWorkspaces';
import PopularCities from '@/components/PopularCities';
import HowItWorks from '@/components/HowItWorks';
import AmenitiesSection from '@/components/AmenitiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HomeHero />
        <div className="space-y-16 md:space-y-24">
          <FeaturedWorkspaces />
          <PopularCities />
          <HowItWorks />
          <AmenitiesSection />
          <TestimonialsSection />
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
