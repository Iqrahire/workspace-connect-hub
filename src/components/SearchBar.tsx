
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const popularCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"
];

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      navigate(`/workspaces?location=${encodeURIComponent(location.trim())}`);
    }
  };

  const handleCityClick = (city: string) => {
    navigate(`/workspaces?location=${encodeURIComponent(city)}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            className="pl-10 py-6 text-base sm:text-lg rounded-l-lg focus-visible:ring-brand-500"
            placeholder="Enter city or area"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button 
          type="submit" 
          className="px-6 py-6 bg-accent-500 hover:bg-accent-600 text-white rounded-l-none rounded-r-lg"
        >
          <Search className="h-5 w-5 mr-2" />
          <span>Search</span>
        </Button>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {popularCities.map((city) => (
          <button
            key={city}
            onClick={() => handleCityClick(city)}
            className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
