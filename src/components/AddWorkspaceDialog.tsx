
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface AddWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AddWorkspaceDialog: React.FC<AddWorkspaceDialogProps> = ({
  open,
  onOpenChange,
  onSuccess
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    area: '',
    address: '',
    price_per_day: '',
    price_per_week: '',
    price_per_month: '',
    capacity: '',
    contact_email: '',
    contact_phone: '',
    images: '',
    amenities: {
      wifi: false,
      coffee: false,
      ac: false,
      parking: false,
      meeting: false
    },
    is_premium: false,
    has_video_tour: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const amenitiesArray = Object.entries(formData.amenities)
        .filter(([_, selected]) => selected)
        .map(([key, _]) => key);

      const imagesArray = formData.images
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const { error } = await supabase
        .from('workspaces')
        .insert({
          name: formData.name,
          description: formData.description,
          city: formData.city,
          area: formData.area,
          address: formData.address,
          price_per_day: parseInt(formData.price_per_day),
          price_per_week: formData.price_per_week ? parseInt(formData.price_per_week) : null,
          price_per_month: formData.price_per_month ? parseInt(formData.price_per_month) : null,
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
          contact_email: formData.contact_email,
          contact_phone: formData.contact_phone,
          images: imagesArray,
          amenities: amenitiesArray,
          is_premium: formData.is_premium,
          has_video_tour: formData.has_video_tour,
          owner_id: user.id
        });

      if (error) throw error;

      toast.success('Workspace added successfully!');
      onSuccess();
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        city: '',
        area: '',
        address: '',
        price_per_day: '',
        price_per_week: '',
        price_per_month: '',
        capacity: '',
        contact_email: '',
        contact_phone: '',
        images: '',
        amenities: {
          wifi: false,
          coffee: false,
          ac: false,
          parking: false,
          meeting: false
        },
        is_premium: false,
        has_video_tour: false
      });
    } catch (error) {
      console.error('Error adding workspace:', error);
      toast.error('Failed to add workspace');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: checked
      }
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Workspace</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Workspace Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="area">Area *</Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="price_per_day">Price per Day (₹) *</Label>
              <Input
                id="price_per_day"
                type="number"
                value={formData.price_per_day}
                onChange={(e) => setFormData(prev => ({ ...prev, price_per_day: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="address">Full Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price_per_week">Price per Week (₹)</Label>
              <Input
                id="price_per_week"
                type="number"
                value={formData.price_per_week}
                onChange={(e) => setFormData(prev => ({ ...prev, price_per_week: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="price_per_month">Price per Month (₹)</Label>
              <Input
                id="price_per_month"
                type="number"
                value={formData.price_per_month}
                onChange={(e) => setFormData(prev => ({ ...prev, price_per_month: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={formData.contact_phone}
                onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="images">Images (comma-separated URLs)</Label>
            <Textarea
              id="images"
              value={formData.images}
              onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value }))}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              rows={2}
            />
          </div>

          <div>
            <Label className="text-base font-medium">Amenities</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
              {Object.entries(formData.amenities).map(([amenity, checked]) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={checked}
                    onCheckedChange={(value) => handleAmenityChange(amenity, value as boolean)}
                  />
                  <Label htmlFor={amenity} className="text-sm capitalize">
                    {amenity === 'ac' ? 'AC' : amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_premium"
                checked={formData.is_premium}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_premium: checked as boolean }))}
              />
              <Label htmlFor="is_premium">Premium Workspace</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_video_tour"
                checked={formData.has_video_tour}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_video_tour: checked as boolean }))}
              />
              <Label htmlFor="has_video_tour">Has Video Tour</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Workspace'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkspaceDialog;
