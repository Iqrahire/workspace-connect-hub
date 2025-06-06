
import React from 'react';
import { Search, BarChart3, Calendar, Briefcase } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse Workspaces',
    description: 'Search through our vast range of coworking spaces with detailed information and real images.'
  },
  {
    icon: BarChart3,
    title: 'Compare & Choose',
    description: 'Compare prices, amenities and reviews to find the perfect workspace that suits your needs.'
  },
  {
    icon: Calendar,
    title: 'Book Instantly',
    description: 'Complete your booking in 5 minutes with our simple booking process.'
  },
  {
    icon: Briefcase,
    title: 'Work Worry-Free',
    description: 'Arrive and start working right away. All amenities and services will be ready for you.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Booking your perfect workspace is quick and easy
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-8"></div>
                )}
              </div>
              <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
