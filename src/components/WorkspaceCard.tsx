
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Wifi, AirVent, ParkingMeter, SquareUser, Coffee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface WorkspaceCardProps {
  id: number;
  name: string;
  city: string;
  area: string;
  rating: number;
  reviews: number;
  pricePerDay: number;
  amenities: string[];
  imageUrl: string;
  isPremium?: boolean;
  hasVideoTour?: boolean;
}

const amenityIcons: Record<string, JSX.Element> = {
  wifi: <Wifi className="h-4 w-4" />,
  coffee: <Coffee className="h-4 w-4" />,
  ac: <AirVent className="h-4 w-4" />,
  parking: <ParkingMeter className="h-4 w-4" />,
  meeting: <SquareUser className="h-4 w-4" />
};

const amenityLabels: Record<string, string> = {
  wifi: 'WiFi',
  coffee: 'Coffee',
  ac: 'AC',
  parking: 'Parking',
  meeting: 'Meeting Rooms'
};

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  id,
  name,
  city,
  area,
  rating,
  reviews,
  pricePerDay,
  amenities,
  imageUrl,
  isPremium = false,
  hasVideoTour = false
}) => {
  return (
    <Link to={`/workspace/${id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative h-48">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          {isPremium && (
            <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Premium
            </div>
          )}
          {hasVideoTour && (
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Video Tour
            </div>
          )}
          <button className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
          </button>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center mb-1">
            <div className="flex items-center text-yellow-500">
              <Star className="fill-yellow-500 stroke-yellow-500 h-4 w-4" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
            </div>
            <span className="mx-1 text-gray-400">•</span>
            <span className="text-xs text-gray-500">{reviews} reviews</span>
          </div>
          
          <h3 className="font-bold text-lg">{name}</h3>
          
          <div className="flex items-start gap-1 text-gray-600 mb-1">
            <MapPin className="h-3 w-3 mt-1 flex-shrink-0" />
            <span className="text-sm">{area}, {city}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2 mb-auto">
            {amenities.slice(0, 3).map((amenity) => (
              <div key={amenity} className="p-1 bg-gray-100 rounded-md text-gray-600 flex items-center gap-1">
                {amenityIcons[amenity]}
                <span className="text-xs">{amenityLabels[amenity]}</span>
              </div>
            ))}
            {amenities.length > 3 && (
              <div className="p-1 bg-gray-100 rounded-md text-gray-600">
                <span className="text-xs">+{amenities.length - 3} more</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="px-4 pb-4 pt-2 border-t flex justify-between items-center">
          <div className="text-brand-600 font-semibold">
            ₹{pricePerDay}<span className="text-sm text-gray-500 font-normal">/day</span>
          </div>
          <Badge variant="outline" className="bg-accent-50 text-accent-600 border-accent-200 hover:bg-accent-100">
            Book Now
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default WorkspaceCard;
