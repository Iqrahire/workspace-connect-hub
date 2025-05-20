
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';

// Mock data for featured workspaces
const featuredWorkspaces = [
  {
    id: 1,
    name: 'WeWork Galaxy',
    city: 'Bangalore',
    area: 'Residency Road',
    rating: 4.8,
    reviews: 120,
    pricePerDay: 599,
    imageUrl: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Innov8 Vikhroli',
    city: 'Mumbai',
    area: 'Vikhroli West',
    rating: 4.6,
    reviews: 95,
    pricePerDay: 499,
    imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Awfis Cyber City',
    city: 'Delhi',
    area: 'Gurugram',
    rating: 4.7,
    reviews: 108,
    pricePerDay: 549,
    imageUrl: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: '91springboard Koramangala',
    city: 'Bangalore',
    area: 'Koramangala',
    rating: 4.5,
    reviews: 89,
    pricePerDay: 449,
    imageUrl: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
];

const FeaturedWorkspaces = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Featured Workspaces</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium coworking spaces across India's major cities
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWorkspaces.map((workspace) => (
            <Link to={`/workspace/${workspace.id}`} key={workspace.id}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={workspace.imageUrl} 
                    alt={workspace.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="pt-4 flex-grow">
                  <div className="flex items-center mb-1">
                    <div className="flex items-center text-yellow-500">
                      <Star className="fill-yellow-500 stroke-yellow-500 h-4 w-4" />
                      <span className="ml-1 text-sm font-medium">{workspace.rating}</span>
                    </div>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{workspace.reviews} reviews</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{workspace.name}</h3>
                  <div className="flex items-start gap-1 text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{workspace.area}, {workspace.city}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-4">
                  <div className="text-brand-600 font-semibold">
                    ₹{workspace.pricePerDay}/day
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/workspaces" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-8 py-6 bg-brand-600 text-white hover:bg-brand-700"
          >
            View All Workspaces
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkspaces;
