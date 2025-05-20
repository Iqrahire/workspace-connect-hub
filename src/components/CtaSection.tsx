
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-12 md:py-16 hero-gradient text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to find your perfect workspace?
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of professionals who have discovered their ideal working environment through BookMyWorkspace
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-brand-600 hover:bg-gray-100 hover:text-brand-700">
            <Link to="/workspaces">
              Browse Workspaces
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-accent-500 hover:bg-accent-600 text-white">
            <Link to="/signup">
              Sign Up Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
