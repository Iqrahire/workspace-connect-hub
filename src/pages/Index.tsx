
import React from 'react';
import HomeHero from '@/components/HomeHero';
import FeaturedWorkspaces from '@/components/FeaturedWorkspaces';
import AmenitiesSection from '@/components/AmenitiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HomeHero />
        <FeaturedWorkspaces />
        <AmenitiesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
