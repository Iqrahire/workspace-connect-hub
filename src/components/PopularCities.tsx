
import React from 'react';
import { Link } from 'react-router-dom';

const cities = [
  { name: 'Bangalore', count: '5 workspaces' },
  { name: 'New Delhi', count: '7 workspaces' },
  { name: 'Mumbai', count: '6 workspaces' },
  { name: 'Pune', count: '3 workspaces' },
  { name: 'Hyderabad', count: '4 workspaces' },
  { name: 'Chennai', count: '3 workspaces' }
];

const PopularCities = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Cities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover workspaces in these major cities across India
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link 
              key={city.name}
              to={`/workspaces?location=${encodeURIComponent(city.name)}`}
              className="group"
            >
              <div className="bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-xl p-8 text-center h-32 flex flex-col justify-center">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-brand-600 transition-colors">
                  {city.name}
                </h3>
                <p className="text-gray-500 text-sm">{city.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCities;
