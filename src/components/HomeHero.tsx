
import React from 'react';
import SearchBar from './SearchBar';

const HomeHero = () => {
  return (
    <div className="hero-gradient text-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <br />
            Workspace in India
          </h1>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Discover and book the best coworking spaces across India. Daily, weekly or monthly options available.
          </p>
          <SearchBar />
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
    </div>
  );
};

export default HomeHero;
