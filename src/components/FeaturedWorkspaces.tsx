
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, MapPin, Wifi, Coffee, Car, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for featured workspaces
const featuredWorkspaces = [
  {
    id: 1,
    name: 'WorkHub Premium',
    city: 'Bangalore',
    area: 'Koramangala',
    rating: 4.8,
    reviews: 120,
    pricePerDay: 500,
    imageUrl: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    isPremium: true,
    amenities: ['wifi', 'coffee', 'parking', 'meeting']
  },
  {
    id: 2,
    name: 'TechNest',
    city: 'Delhi',
    area: 'Connaught Place',
    rating: 4.5,
    reviews: 95,
    pricePerDay: 450,
    imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    amenities: ['wifi', 'coffee', 'meeting']
  },
  {
    id: 3,
    name: 'StartupHub',
    city: 'Mumbai',
    area: 'Bandra Kurla Complex',
    rating: 4.6,
    reviews: 108,
    pricePerDay: 600,
    imageUrl: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    amenities: ['wifi', 'coffee', 'parking', 'meeting']
  }
];

const amenityIcons = {
  wifi: Wifi,
  coffee: Coffee,
  parking: Car,
  meeting: Users
};

const FeaturedWorkspaces = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Workspaces</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our top-rated coworking spaces across India
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredWorkspaces.map((workspace) => (
            <Link to={`/workspace/${workspace.id}`} key={workspace.id}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col group">
                <div className="h-56 overflow-hidden relative">
                  {workspace.isPremium && (
                    <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                      Premium
                    </div>
                  )}
                  <img 
                    src={workspace.imageUrl} 
                    alt={workspace.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <Star className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <CardContent className="pt-6 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl">{workspace.name}</h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="fill-yellow-500 stroke-yellow-500 h-4 w-4" />
                      <span className="ml-1 text-sm font-medium text-gray-900">{workspace.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{workspace.area}, {workspace.city}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {workspace.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                      return Icon ? (
                        <div key={amenity} className="flex items-center text-gray-500">
                          <Icon className="h-4 w-4" />
                        </div>
                      ) : null;
                    })}
                    <span className="text-xs text-gray-500">+{workspace.amenities.length - 4} more</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{workspace.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span>
                    </div>
                    <div className="text-xs text-gray-500">onwards</div>
                  </div>
                  <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-brand-600 text-brand-600 hover:bg-brand-50">
            <Link to="/workspaces">
              View All Workspaces
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkspaces;
