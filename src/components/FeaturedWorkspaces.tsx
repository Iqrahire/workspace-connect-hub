
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, MapPin, Wifi, Coffee, Car, Users, Heart, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const amenityIcons = {
  wifi: Wifi,
  coffee: Coffee,
  parking: Car,
  meeting: Users
};

const FeaturedWorkspaces = () => {
  const { data: workspaces, isLoading, error } = useQuery({
    queryKey: ['featured-workspaces'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('is_premium', true)
        .limit(6)
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                <div className="h-64 bg-muted rounded-lg mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !workspaces) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Failed to load featured workspaces</p>
        </div>
      </section>
    );
  }

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
          {workspaces.map((workspace) => (
            <Link to={`/workspace/${workspace.id}`} key={workspace.id} className="group">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col bg-card">
                <div className="relative h-64 md:h-72 overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    {workspace.is_premium && (
                      <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-lg">
                        Premium
                      </Badge>
                    )}
                    {workspace.has_video_tour && (
                      <Badge variant="secondary" className="bg-black/20 text-white border-0 backdrop-blur-sm">
                        <Play className="h-3 w-3 mr-1" />
                        Video Tour
                      </Badge>
                    )}
                  </div>
                  
                  {/* Image */}
                  <img 
                    src={workspace.images?.[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'} 
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
                    <h3 className="font-bold text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                      {workspace.name}
                    </h3>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="fill-yellow-500 stroke-yellow-500 h-4 w-4" />
                      <span className="ml-1 text-sm font-semibold text-yellow-700">{workspace.rating || 0}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{workspace.area}, {workspace.city}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    {workspace.amenities?.slice(0, 4).map((amenity) => {
                      const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                      return Icon ? (
                        <div key={amenity} className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ) : null;
                    })}
                    {workspace.amenities && workspace.amenities.length > 4 && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        +{workspace.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 pb-6 flex justify-between items-center">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                      ₹{workspace.price_per_day}
                      <span className="text-base font-normal text-muted-foreground">/day</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Starting price</div>
                  </div>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 px-8 py-3 text-lg">
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
