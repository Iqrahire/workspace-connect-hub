
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import HomeHero from '@/components/HomeHero';
import FeaturedWorkspaces from '@/components/FeaturedWorkspaces';
import PopularCities from '@/components/PopularCities';
import HowItWorks from '@/components/HowItWorks';
import AmenitiesSection from '@/components/AmenitiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HomeHero />
        
        {/* Authentication CTA for non-authenticated users */}
        {!loading && !user && (
          <div className="bg-brand-50 py-8">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold text-brand-900 mb-2">Ready to get started?</h2>
              <p className="text-brand-700 mb-4">Create an account to book workspaces and manage your bookings</p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link to="/auth">Sign Up</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
        
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
