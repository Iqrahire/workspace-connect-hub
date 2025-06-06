
import React from 'react';
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

// Mock booking data - in real app this would come from a database
const mockBookings = [
  {
    id: 'WS12345678',
    workspaceName: 'WorkHub Premium',
    address: 'MG Road, Shivaji Nagar, Bangalore',
    plan: 'Dedicated Desk',
    date: '2024-06-10',
    time: '09:00',
    duration: '8 hours',
    numberOfPeople: 1,
    totalAmount: 500,
    paymentMethod: 'Online Payment',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    createdAt: '2024-06-06',
  },
  {
    id: 'WS87654321',
    workspaceName: 'Innov8 Koramangala',
    address: 'Koramangala, Bangalore',
    plan: 'Hot Desk',
    date: '2024-06-08',
    time: '14:00',
    duration: '4 hours',
    numberOfPeople: 2,
    totalAmount: 800,
    paymentMethod: 'Pay at Venue',
    paymentStatus: 'Pending',
    bookingStatus: 'Confirmed',
    createdAt: '2024-06-05',
  },
  {
    id: 'WS11223344',
    workspaceName: 'WeWork Galaxy',
    address: 'Residency Road, Bangalore',
    plan: 'Private Office',
    date: '2024-05-25',
    time: '09:00',
    duration: '1 month',
    numberOfPeople: 5,
    totalAmount: 25000,
    paymentMethod: 'UPI Payment',
    paymentStatus: 'Paid',
    bookingStatus: 'Completed',
    createdAt: '2024-05-20',
  }
];

const UserBookings = () => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadInvoice = (bookingId: string) => {
    // Simulate invoice download
    console.log(`Downloading invoice for booking ${bookingId}`);
  };

  const handleContactSupport = (bookingId: string) => {
    // Simulate contact support
    console.log(`Contacting support for booking ${bookingId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <div className="text-sm text-gray-600">
          Total bookings: {mockBookings.length}
        </div>
      </div>

      <div className="space-y-4">
        {mockBookings.map((booking) => (
          <div key={booking.id} className="bg-white border rounded-lg p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{booking.workspaceName}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {booking.address}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(booking.bookingStatus)}>
                  {booking.bookingStatus}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1">
                <div className="flex items-center text-gray-600 text-sm">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  Date & Time
                </div>
                <p className="font-medium">{booking.date}</p>
                <p className="text-sm text-gray-600">{booking.time}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Duration & Plan
                </div>
                <p className="font-medium">{booking.duration}</p>
                <p className="text-sm text-gray-600">{booking.plan}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-gray-600 text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  People & Amount
                </div>
                <p className="font-medium">{booking.numberOfPeople} people</p>
                <p className="text-lg font-bold text-brand-600">₹{booking.totalAmount}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-gray-600 text-sm">
                  <CreditCard className="h-4 w-4 mr-1" />
                  Payment
                </div>
                <p className="font-medium">{booking.paymentMethod}</p>
                <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                  {booking.paymentStatus}
                </Badge>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Booking ID: {booking.id} • Booked on {booking.createdAt}
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownloadInvoice(booking.id)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Invoice
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleContactSupport(booking.id)}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Support
                </Button>
                {booking.bookingStatus === 'Confirmed' && booking.paymentStatus === 'Pending' && (
                  <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                    Pay Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockBookings.length === 0 && (
        <div className="text-center py-12">
          <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookings yet</h3>
          <p className="text-gray-500">Start by booking your first workspace!</p>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
