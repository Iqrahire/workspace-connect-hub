
import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Search, Wifi, Coffee, AirVent, ParkingMeter, SquareUser, X } from 'lucide-react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  filters: {
    wifi: boolean;
    coffee: boolean;
    ac: boolean;
    parking: boolean;
    meeting: boolean;
  };
  onFilterChange: (key: string, value: boolean) => void;
  onResetFilters: () => void;
}

const MobileFilterDrawer = ({
  isOpen,
  onClose,
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
  filters,
  onFilterChange,
  onResetFilters
}: MobileFilterDrawerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="p-4 space-y-6 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
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
          
          <div>
            <h3 className="block text-sm font-medium mb-3">Amenities</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Checkbox 
                  id="wifi-mobile" 
                  checked={filters.wifi} 
                  onCheckedChange={(checked) => onFilterChange('wifi', checked as boolean)} 
                />
                <label htmlFor="wifi-mobile" className="ml-2 text-sm flex items-center">
                  <Wifi className="h-4 w-4 mr-1" /> Wi-Fi
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox 
                  id="coffee-mobile" 
                  checked={filters.coffee} 
                  onCheckedChange={(checked) => onFilterChange('coffee', checked as boolean)} 
                />
                <label htmlFor="coffee-mobile" className="ml-2 text-sm flex items-center">
                  <Coffee className="h-4 w-4 mr-1" /> Coffee
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox 
                  id="ac-mobile" 
                  checked={filters.ac} 
                  onCheckedChange={(checked) => onFilterChange('ac', checked as boolean)} 
                />
                <label htmlFor="ac-mobile" className="ml-2 text-sm flex items-center">
                  <AirVent className="h-4 w-4 mr-1" /> Air Conditioning
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox 
                  id="parking-mobile" 
                  checked={filters.parking} 
                  onCheckedChange={(checked) => onFilterChange('parking', checked as boolean)} 
                />
                <label htmlFor="parking-mobile" className="ml-2 text-sm flex items-center">
                  <ParkingMeter className="h-4 w-4 mr-1" /> Parking
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox 
                  id="meeting-mobile" 
                  checked={filters.meeting} 
                  onCheckedChange={(checked) => onFilterChange('meeting', checked as boolean)} 
                />
                <label htmlFor="meeting-mobile" className="ml-2 text-sm flex items-center">
                  <SquareUser className="h-4 w-4 mr-1" /> Meeting Rooms
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onResetFilters}
            >
              Reset Filters
            </Button>
            <Button 
              className="flex-1 bg-brand-600 hover:bg-brand-700"
              onClick={onClose}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterDrawer;
