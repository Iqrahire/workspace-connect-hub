
import React from 'react';
import SearchBar from './SearchBar';

const HomeHero = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto text-center text-white">
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight tracking-tight">
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                Workspace
              </span> in India
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 md:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Discover and book the best coworking spaces across India. Daily, weekly or monthly options available with premium amenities.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 md:mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-400">500+</div>
              <div className="text-sm md:text-base opacity-80">Workspaces</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-400">50+</div>
              <div className="text-sm md:text-base opacity-80">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-400">10K+</div>
              <div className="text-sm md:text-base opacity-80">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modern Geometric Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent-500/20 to-transparent rounded-full blur-3xl translate-y-40 -translate-x-40"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent-300 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
    </div>
  );
};

export default HomeHero;
