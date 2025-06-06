
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarDays, 
  Users, 
  Clock, 
  CreditCard, 
  Building, 
  Plus, 
  Minus,
  MapPin
} from 'lucide-react';
import { WorkspacePlan } from './PlanCard';
import PaymentOptionsDialog from './PaymentOptionsDialog';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plan: WorkspacePlan;
  workspaceName: string;
  workspaceAddress: string;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  isOpen,
  onClose,
  plan,
  workspaceName,
  workspaceAddress
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [duration, setDuration] = useState(1);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [bookingTime, setBookingTime] = useState('09:00');
  
  const calculateTotal = () => {
    const basePrice = plan.price;
    let multiplier = duration;
    
    if (plan.billingCycle === 'hour') {
      multiplier = duration; // duration in hours
    } else if (plan.billingCycle === 'day') {
      multiplier = duration; // duration in days
    } else if (plan.billingCycle === 'week') {
      multiplier = duration; // duration in weeks
    } else if (plan.billingCycle === 'month') {
      multiplier = duration; // duration in months
    }
    
    return basePrice * multiplier * numberOfPeople;
  };

  const handleProceedToPayment = () => {
    setPaymentDialogOpen(true);
  };

  const getDurationLabel = () => {
    switch (plan.billingCycle) {
      case 'hour': return duration === 1 ? 'hour' : 'hours';
      case 'day': return duration === 1 ? 'day' : 'days';
      case 'week': return duration === 1 ? 'week' : 'weeks';
      case 'month': return duration === 1 ? 'month' : 'months';
      default: return 'units';
    }
  };

  const getMinDuration = () => plan.billingCycle === 'hour' ? 1 : 1;
  const getMaxDuration = () => {
    switch (plan.billingCycle) {
      case 'hour': return 12;
      case 'day': return 30;
      case 'week': return 12;
      case 'month': return 12;
      default: return 12;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Complete Your Booking</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section - Booking Details */}
            <div className="space-y-6">
              {/* Workspace Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{workspaceName}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{workspaceAddress}</span>
                </div>
                <Badge className="bg-brand-100 text-brand-800">
                  {plan.name}
                </Badge>
              </div>

              {/* Date Selection */}
              <div>
                <div className="flex items-center mb-3">
                  <CalendarDays className="h-5 w-5 mr-2 text-brand-600" />
                  <h4 className="font-semibold">Select Date</h4>
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>

              {/* Time Selection (for hourly bookings) */}
              {plan.billingCycle === 'hour' && (
                <div>
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 mr-2 text-brand-600" />
                    <h4 className="font-semibold">Select Time</h4>
                  </div>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    {Array.from({ length: 14 }, (_, i) => {
                      const hour = i + 8; // 8 AM to 9 PM
                      const time = `${hour.toString().padStart(2, '0')}:00`;
                      return (
                        <option key={time} value={time}>
                          {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>

            {/* Right Section - Booking Configuration */}
            <div className="space-y-6">
              {/* Number of People */}
              <div>
                <div className="flex items-center mb-3">
                  <Users className="h-5 w-5 mr-2 text-brand-600" />
                  <h4 className="font-semibold">Number of People</h4>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                    disabled={numberOfPeople <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {numberOfPeople}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setNumberOfPeople(Math.min(10, numberOfPeople + 1))}
                    disabled={numberOfPeople >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Maximum 10 people per booking</p>
              </div>

              {/* Duration */}
              <div>
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 mr-2 text-brand-600" />
                  <h4 className="font-semibold">Duration</h4>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDuration(Math.max(getMinDuration(), duration - 1))}
                    disabled={duration <= getMinDuration()}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold w-16 text-center">
                    {duration}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDuration(Math.min(getMaxDuration(), duration + 1))}
                    disabled={duration >= getMaxDuration()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-gray-600">{getDurationLabel()}</span>
                </div>
              </div>

              <Separator />

              {/* Booking Summary */}
              <div className="bg-brand-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-medium">{plan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                  </div>
                  {plan.billingCycle === 'hour' && (
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{bookingTime}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{duration} {getDurationLabel()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>People:</span>
                    <span className="font-medium">{numberOfPeople}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per {plan.billingCycle}:</span>
                    <span className="font-medium">₹{plan.price}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-brand-600">₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-brand-600 hover:bg-brand-700"
                  onClick={handleProceedToPayment}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Payment
                </Button>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentOptionsDialog
        isOpen={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        bookingDetails={{
          workspaceName,
          plan: plan.name,
          date: selectedDate,
          time: bookingTime,
          duration,
          durationUnit: getDurationLabel(),
          numberOfPeople,
          total: calculateTotal()
        }}
      />
    </>
  );
};

export default BookingDialog;
