
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CalendarDays, 
  Users, 
  Clock, 
  CreditCard, 
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
    return basePrice * duration * numberOfPeople;
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

  const getMinDuration = () => 1;
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Complete Your Booking</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Section - Booking Details */}
              <div className="space-y-6">
                {/* Workspace Info */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{workspaceName}</h3>
                  <div className="flex items-start text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{workspaceAddress}</span>
                  </div>
                  <Badge className="bg-brand-100 text-brand-800 border-brand-200">
                    {plan.name}
                  </Badge>
                </div>

                {/* Date Selection */}
                <div>
                  <div className="flex items-center mb-4">
                    <CalendarDays className="h-5 w-5 mr-2 text-brand-600" />
                    <h4 className="font-semibold text-foreground">Select Date</h4>
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border border-border bg-card"
                  />
                </div>

                {/* Time Selection (for hourly bookings) */}
                {plan.billingCycle === 'hour' && (
                  <div>
                    <div className="flex items-center mb-3">
                      <Clock className="h-5 w-5 mr-2 text-brand-600" />
                      <h4 className="font-semibold text-foreground">Select Time</h4>
                    </div>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full p-3 border border-border rounded-md bg-card text-foreground focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    >
                      {Array.from({ length: 14 }, (_, i) => {
                        const hour = i + 8;
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
                  <div className="flex items-center mb-4">
                    <Users className="h-5 w-5 mr-2 text-brand-600" />
                    <h4 className="font-semibold text-foreground">Number of People</h4>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                      disabled={numberOfPeople <= 1}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="bg-muted rounded-lg px-6 py-2 min-w-[80px] text-center">
                      <span className="text-xl font-semibold text-foreground">
                        {numberOfPeople}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setNumberOfPeople(Math.min(10, numberOfPeople + 1))}
                      disabled={numberOfPeople >= 10}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 text-center">Maximum 10 people per booking</p>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-brand-600" />
                    <h4 className="font-semibold text-foreground">Duration</h4>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDuration(Math.max(getMinDuration(), duration - 1))}
                      disabled={duration <= getMinDuration()}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="bg-muted rounded-lg px-6 py-2 min-w-[120px] text-center">
                      <span className="text-xl font-semibold text-foreground">
                        {duration}
                      </span>
                      <span className="text-muted-foreground ml-2 text-sm">{getDurationLabel()}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDuration(Math.min(getMaxDuration(), duration + 1))}
                      disabled={duration >= getMaxDuration()}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Booking Summary */}
                <div className="bg-brand-50 rounded-lg p-5">
                  <h4 className="font-semibold mb-4 text-foreground">Booking Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plan:</span>
                      <span className="font-medium text-foreground">{plan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium text-foreground">{selectedDate.toLocaleDateString()}</span>
                    </div>
                    {plan.billingCycle === 'hour' && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium text-foreground">{bookingTime}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium text-foreground">{duration} {getDurationLabel()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">People:</span>
                      <span className="font-medium text-foreground">{numberOfPeople}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per {plan.billingCycle}:</span>
                      <span className="font-medium text-foreground">₹{plan.price.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-foreground">Total:</span>
                      <span className="text-brand-600">₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3"
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
          </ScrollArea>
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
