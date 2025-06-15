
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Clock, 
  CreditCard,
  Download,
  Phone,
  MoreVertical
} from 'lucide-react';
import { toast } from 'sonner';

interface Booking {
  id: string;
  workspace_id: string;
  booking_type: 'daily' | 'weekly' | 'monthly';
  start_date: string;
  end_date: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  workspaces: {
    name: string;
    address: string;
    city: string;
    area: string;
  };
}

const UserBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          workspaces (
            name,
            address,
            city,
            area
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load bookings');
      } else {
        setBookings(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownloadInvoice = (bookingId: string) => {
    console.log(`Downloading invoice for booking ${bookingId}`);
    toast.info('Invoice download feature coming soon!');
  };

  const handleContactSupport = (bookingId: string) => {
    console.log(`Contacting support for booking ${bookingId}`);
    toast.info('Support contact feature coming soon!');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">My Bookings</h2>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">My Bookings</h2>
        <div className="text-sm text-muted-foreground">
          Total bookings: {bookings.length}
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-foreground">{booking.workspaces.name}</h3>
                <div className="flex items-start text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                  <span>{booking.workspaces.area}, {booking.workspaces.city}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground text-sm">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  Dates
                </div>
                <p className="font-medium text-foreground">{formatDate(booking.start_date)}</p>
                <p className="text-sm text-muted-foreground">to {formatDate(booking.end_date)}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Booking Type
                </div>
                <p className="font-medium text-foreground capitalize">{booking.booking_type}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground text-sm">
                  <CreditCard className="h-4 w-4 mr-1" />
                  Amount
                </div>
                <p className="text-lg font-bold text-brand-600">₹{booking.total_amount.toLocaleString()}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  Status
                </div>
                <Badge className={getStatusColor(booking.status) + " text-xs"}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Booking ID: <span className="font-mono">{booking.id.slice(0, 8)}</span> • Booked on {formatDate(booking.created_at)}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownloadInvoice(booking.id)}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Invoice
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleContactSupport(booking.id)}
                  className="flex items-center gap-1"
                >
                  <Phone className="h-4 w-4" />
                  Support
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">No bookings yet</h3>
          <p className="text-muted-foreground">Start by booking your first workspace!</p>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
