import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Search, Wifi, Coffee, AirVent, ParkingMeter, SquareUser, Filter } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Workspaces</h1>
            {locationParam && (
              <p className="text-gray-600 mb-4">Showing results for "{locationParam}"</p>
            )}
            
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Button 
                variant="outline" 
                onClick={() => setIsMobileFilterOpen(true)}
                className="w-full flex items-center justify-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Filters Sidebar */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-20">
                <h2 className="font-semibold text-lg mb-6">Filters</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search location..."
                      className="pl-10 rounded-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}/day
                  </label>
                  <Slider 
                    defaultValue={[0, 1000]} 
                    max={1000} 
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                
                <div className="mb-6">
                  <h3 className="block text-sm font-medium mb-3">Amenities</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox 
                        id="wifi" 
                        checked={filters.wifi} 
                        onCheckedChange={(checked) => handleFilterChange('wifi', checked as boolean)} 
                      />
                      <label htmlFor="wifi" className="ml-2 text-sm flex items-center">
                        <Wifi className="h-4 w-4 mr-1" /> Wi-Fi
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="coffee" 
                        checked={filters.coffee} 
                        onCheckedChange={(checked) => handleFilterChange('coffee', checked as boolean)} 
                      />
                      <label htmlFor="coffee" className="ml-2 text-sm flex items-center">
                        <Coffee className="h-4 w-4 mr-1" /> Coffee
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="ac" 
                        checked={filters.ac} 
                        onCheckedChange={(checked) => handleFilterChange('ac', checked as boolean)} 
                      />
                      <label htmlFor="ac" className="ml-2 text-sm flex items-center">
                        <AirVent className="h-4 w-4 mr-1" /> Air Conditioning
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="parking" 
                        checked={filters.parking} 
                        onCheckedChange={(checked) => handleFilterChange('parking', checked as boolean)} 
                      />
                      <label htmlFor="parking" className="ml-2 text-sm flex items-center">
                        <ParkingMeter className="h-4 w-4 mr-1" /> Parking
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="meeting" 
                        checked={filters.meeting} 
                        onCheckedChange={(checked) => handleFilterChange('meeting', checked as boolean)} 
                      />
                      <label htmlFor="meeting" className="ml-2 text-sm flex items-center">
                        <SquareUser className="h-4 w-4 mr-1" /> Meeting Rooms
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* Workspace Listings */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <div className="text-gray-600">
                  {filteredWorkspaces.length} workspace{filteredWorkspaces.length !== 1 ? 's' : ''} found
                </div>
                <Link to="/admin/dashboard">
                  <Button size="sm" variant="outline">Admin Dashboard</Button>
                </Link>
              </div>
              
              {filteredWorkspaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredWorkspaces.map((workspace) => (
                    <WorkspaceCard 
                      key={workspace.id}
                      {...workspace}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl text-center shadow-sm">
                  <p className="text-gray-500 mb-4">No workspaces found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    className="text-brand-600"
                    onClick={handleResetFilters}
                  >
                    Reset filters
                  </Button>
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
