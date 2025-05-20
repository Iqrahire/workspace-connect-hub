
import React from 'react';
import SearchBar from './SearchBar';

const HomeHero = () => {
  return (
    <div className="hero-gradient text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Perfect Workspace in India
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Discover and book coworking spaces, meeting rooms, and private offices across India
          </p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
