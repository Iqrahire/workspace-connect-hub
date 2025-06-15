
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, MapPin, Wifi, Coffee, Car, Users, Heart, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    hasVideoTour: true,
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
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 md:mb-16 text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            Featured Spaces
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground">
            Top-Rated Workspaces
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Explore our hand-picked premium coworking spaces with exceptional amenities and reviews
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {featuredWorkspaces.map((workspace) => (
            <Link to={`/workspace/${workspace.id}`} key={workspace.id} className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col bg-card">
                <div className="relative h-64 md:h-72 overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    {workspace.isPremium && (
                      <Badge className="bg-gradient-to-r from-accent-500 to-accent-600 text-white border-0 shadow-lg">
                        Premium
                      </Badge>
                    )}
                    {workspace.hasVideoTour && (
                      <Badge variant="secondary" className="bg-black/20 text-white border-0 backdrop-blur-sm">
                        <Play className="h-3 w-3 mr-1" />
                        Video Tour
                      </Badge>
                    )}
                  </div>
                  
                  {/* Image */}
                  <img 
                    src={workspace.imageUrl} 
                    alt={workspace.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Heart Icon */}
                  <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 group z-10">
                    <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 transition-colors" />
                  </button>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardContent className="pt-6 pb-4 flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-xl md:text-2xl text-foreground group-hover:text-brand-600 transition-colors">
                      {workspace.name}
                    </h3>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="fill-yellow-500 stroke-yellow-500 h-4 w-4" />
                      <span className="ml-1 text-sm font-semibold text-yellow-700">{workspace.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{workspace.area}, {workspace.city}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    {workspace.amenities.slice(0, 4).map((amenity) => {
                      const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                      return Icon ? (
                        <div key={amenity} className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ) : null;
                    })}
                    {workspace.amenities.length > 4 && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        +{workspace.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 pb-6 flex justify-between items-center">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                      ₹{workspace.pricePerDay}
                      <span className="text-base font-normal text-muted-foreground">/day</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Starting price</div>
                  </div>
                  <Button size="lg" className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-lg hover:shadow-xl transition-all duration-200">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white transition-all duration-200 px-8 py-3 text-lg">
            <Link to="/workspaces">
              Explore All Workspaces
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkspaces;
