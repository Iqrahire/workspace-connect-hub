
import React from 'react';
import { Wifi, Coffee, AirVent, ParkingMeter, SquareUser } from 'lucide-react';

const amenities = [
  {
    icon: <Wifi className="h-6 w-6" />,
    name: 'High-Speed WiFi',
    description: 'Stay connected with ultra-fast internet across all workspaces'
  },
  {
    icon: <Coffee className="h-6 w-6" />,
    name: 'Premium Coffee',
    description: 'Enjoy complimentary coffee and refreshments throughout the day'
  },
  {
    icon: <AirVent className="h-6 w-6" />,
    name: 'Air Conditioning',
    description: 'Work comfortably with climate-controlled environments'
  },
  {
    icon: <ParkingMeter className="h-6 w-6" />,
    name: 'Parking Space',
    description: 'Convenient parking facilities available at most locations'
  },
  {
    icon: <SquareUser className="h-6 w-6" />,
    name: 'Meeting Rooms',
    description: 'Access to professional meeting spaces when you need them'
  }
];

const AmenitiesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Workspace Amenities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            All our listed workspaces come with essential amenities to ensure a productive work experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {amenities.map((amenity, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-100 transition-colors">
                {amenity.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{amenity.name}</h3>
              <p className="text-gray-500 text-sm">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
