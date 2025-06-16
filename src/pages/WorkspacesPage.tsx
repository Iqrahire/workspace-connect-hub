
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Search, Wifi, Coffee, AirVent, ParkingMeter, SquareUser, Filter, Grid3X3, List } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import WorkspaceCard from '@/components/WorkspaceCard';
import MobileFilterDrawer from '@/components/MobileFilterDrawer';

const amenityIcons: Record<string, JSX.Element> = {
  wifi: <Wifi className="h-4 w-4" />,
  coffee: <Coffee className="h-4 w-4" />,
  ac: <AirVent className="h-4 w-4" />,
  parking: <ParkingMeter className="h-4 w-4" />,
  meeting: <SquareUser className="h-4 w-4" />
};

interface Workspace {
  id: string;
  name: string;
  city: string;
  area: string;
  rating: number | null;
  review_count: number | null;
  price_per_day: number;
  amenities: string[] | null;
  images: string[] | null;
  is_premium: boolean | null;
  has_video_tour: boolean | null;
}

const WorkspacesPage = () => {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get('location');
  
  const [searchTerm, setSearchTerm] = useState(locationParam || '');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    wifi: false,
    coffee: false,
    ac: false,
    parking: false,
    meeting: false
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch workspaces from database
  const { data: workspaces = [], isLoading, error } = useQuery<Workspace[]>({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Filter workspaces based on search and filters
  const filteredWorkspaces = workspaces.filter(workspace => {
    // Search term filter
    if (searchTerm && !workspace.city.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !workspace.area.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !workspace.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Price range filter
    if (workspace.price_per_day < priceRange[0] || workspace.price_per_day > priceRange[1]) {
      return false;
    }

    // Amenities filters
    const activeFilters = Object.entries(filters).filter(([_, isActive]) => isActive);
    if (activeFilters.length > 0) {
      return activeFilters.every(([key, _]) => workspace.amenities?.includes(key));
    }

    return true;
  });

  const handleFilterChange = (key: string, value: boolean) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setSearchTerm(locationParam || '');
    setPriceRange([0, 1000]);
    setFilters({
      wifi: false,
      coffee: false,
      ac: false,
      parking: false,
      meeting: false
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading workspaces...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive">Failed to load workspaces</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Modern Header Section */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                Coworking Spaces
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                Find Your Perfect Workspace
              </h1>
              {locationParam && (
                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                  Showing results for <span className="font-semibold text-primary">"{locationParam}"</span>
                </p>
              )}
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by location, workspace name..."
                  className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 focus:border-primary shadow-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Mobile Filter Button */}
            <div className="lg:hidden flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-2"
              >
                <Filter className="h-4 w-4" />
                Filters & Sort
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Enhanced Desktop Filters Sidebar */}
            <div className="lg:w-80 hidden lg:block">
              <div className="bg-card p-6 rounded-2xl shadow-lg border border-border sticky top-24 custom-scrollbar max-h-[calc(100vh-120px)] overflow-y-auto">
                <h2 className="font-bold text-xl mb-6 text-foreground">Refine Your Search</h2>
                
                {/* Price Range */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-4 text-foreground">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}/day
                  </label>
                  <Slider 
                    defaultValue={[0, 1000]} 
                    max={1000} 
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹0</span>
                    <span>₹1000+</span>
                  </div>
                </div>
                
                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-4">Amenities</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'wifi', label: 'High-Speed Wi-Fi', icon: Wifi },
                      { key: 'coffee', label: 'Coffee & Tea', icon: Coffee },
                      { key: 'ac', label: 'Air Conditioning', icon: AirVent },
                      { key: 'parking', label: 'Parking Space', icon: ParkingMeter },
                      { key: 'meeting', label: 'Meeting Rooms', icon: SquareUser }
                    ].map(({ key, label, icon: Icon }) => (
                      <div key={key} className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Checkbox 
                          id={key}
                          checked={filters[key as keyof typeof filters]} 
                          onCheckedChange={(checked) => handleFilterChange(key, checked as boolean)}
                          className="mr-3"
                        />
                        <Icon className="h-4 w-4 mr-3 text-muted-foreground" />
                        <label htmlFor={key} className="text-sm font-medium text-foreground cursor-pointer flex-1">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl"
                  onClick={handleResetFilters}
                >
                  Reset All Filters
                </Button>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredWorkspaces.length}</span> workspace{filteredWorkspaces.length !== 1 ? 's' : ''} found
                  </div>
                  <Badge variant="secondary" className="hidden sm:inline-flex">
                    Updated daily
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="flex items-center bg-muted rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="px-3"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Link to="/dashboard">
                    <Button size="sm" variant="outline" className="hidden sm:inline-flex">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Workspace Grid/List */}
              {filteredWorkspaces.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredWorkspaces.map((workspace) => (
                    <WorkspaceCard 
                      key={workspace.id}
                      id={workspace.id}
                      name={workspace.name}
                      city={workspace.city}
                      area={workspace.area}
                      rating={workspace.rating || 0}
                      reviews={workspace.review_count || 0}
                      pricePerDay={workspace.price_per_day}
                      amenities={workspace.amenities || []}
                      imageUrl={workspace.images?.[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'}
                      isPremium={workspace.is_premium || false}
                      hasVideoTour={workspace.has_video_tour || false}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card p-12 rounded-2xl text-center shadow-sm border border-border">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">No results found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any workspaces matching your criteria. Try adjusting your filters.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={handleResetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </main>
      <Footer />
    </div>
  );
};

export default WorkspacesPage;
