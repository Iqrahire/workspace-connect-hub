
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

// Mock data for workspaces
const workspaces = [
  {
    id: 1,
    name: 'WeWork Galaxy',
    city: 'Bangalore',
    area: 'Residency Road',
    rating: 4.8,
    reviews: 120,
    pricePerDay: 599,
    amenities: ['wifi', 'coffee', 'ac', 'parking', 'meeting'],
    imageUrl: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    isPremium: true,
    hasVideoTour: true
  },
  {
    id: 2,
    name: 'Innov8 Vikhroli',
    city: 'Mumbai',
    area: 'Vikhroli West',
    rating: 4.6,
    reviews: 95,
    pricePerDay: 499,
    amenities: ['wifi', 'coffee', 'ac', 'meeting'],
    imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    isPremium: true
  },
  {
    id: 3,
    name: 'Awfis Cyber City',
    city: 'Delhi',
    area: 'Gurugram',
    rating: 4.7,
    reviews: 108,
    pricePerDay: 549,
    amenities: ['wifi', 'coffee', 'ac', 'parking'],
    imageUrl: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    hasVideoTour: true
  },
  {
    id: 4,
    name: '91springboard Koramangala',
    city: 'Bangalore',
    area: 'Koramangala',
    rating: 4.5,
    reviews: 89,
    pricePerDay: 449,
    amenities: ['wifi', 'coffee', 'ac', 'meeting'],
    imageUrl: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Regus Express',
    city: 'Chennai',
    area: 'T Nagar',
    rating: 4.4,
    reviews: 72,
    pricePerDay: 399,
    amenities: ['wifi', 'ac', 'meeting'],
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'Smartworks Kolkata',
    city: 'Kolkata',
    area: 'Salt Lake',
    rating: 4.3,
    reviews: 65,
    pricePerDay: 349,
    amenities: ['wifi', 'coffee', 'ac'],
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
];

const amenityIcons: Record<string, JSX.Element> = {
  wifi: <Wifi className="h-4 w-4" />,
  coffee: <Coffee className="h-4 w-4" />,
  ac: <AirVent className="h-4 w-4" />,
  parking: <ParkingMeter className="h-4 w-4" />,
  meeting: <SquareUser className="h-4 w-4" />
};

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

  // Filter workspaces based on search and filters
  const filteredWorkspaces = workspaces.filter(workspace => {
    // Search term filter
    if (searchTerm && !workspace.city.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !workspace.area.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !workspace.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Price range filter
    if (workspace.pricePerDay < priceRange[0] || workspace.pricePerDay > priceRange[1]) {
      return false;
    }

    // Amenities filters
    const activeFilters = Object.entries(filters).filter(([_, isActive]) => isActive);
    if (activeFilters.length > 0) {
      return activeFilters.every(([key, _]) => workspace.amenities.includes(key));
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Modern Header Section */}
        <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 border-b border-border">
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
                  Showing results for <span className="font-semibold text-brand-600">"{locationParam}"</span>
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
                  className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 focus:border-brand-500 shadow-lg"
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
                  
                  <Link to="/admin/dashboard">
                    <Button size="sm" variant="outline" className="hidden sm:inline-flex">
                      Admin Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Workspace Grid/List */}
              {filteredWorkspaces.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'gri-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredWorkspaces.map((workspace) => (
                    <WorkspaceCard 
                      key={workspace.id}
                      {...workspace}
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
                      className="border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white"
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
