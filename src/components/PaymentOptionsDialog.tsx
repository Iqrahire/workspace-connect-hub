
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Building, 
  Smartphone,
  Wallet,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface BookingDetails {
  workspaceName: string;
  plan: string;
  date: Date;
  time: string;
  duration: number;
  durationUnit: string;
  numberOfPeople: number;
  total: number;
}

interface PaymentOptionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails;
}

const PaymentOptionsDialog: React.FC<PaymentOptionsDialogProps> = ({
  isOpen,
  onClose,
  bookingDetails
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const paymentMethods = [
    {
      id: 'online',
      title: 'Pay Online',
      description: 'Secure payment with credit/debit card or UPI',
      icon: <CreditCard className="h-6 w-6" />,
      badge: 'Instant Confirmation',
      badgeColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'upi',
      title: 'UPI Payment',
      description: 'Pay using Google Pay, PhonePe, Paytm or any UPI app',
      icon: <Smartphone className="h-6 w-6" />,
      badge: 'Quick & Easy',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'pay_at_venue',
      title: 'Pay at Workspace',
      description: 'Pay when you arrive at the workspace',
      icon: <Building className="h-6 w-6" />,
      badge: 'Flexible',
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'wallet',
      title: 'Digital Wallet',
      description: 'Pay using Paytm, Amazon Pay, or other wallets',
      icon: <Wallet className="h-6 w-6" />,
      badge: 'Cashback Available',
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleConfirmBooking = () => {
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    const method = paymentMethods.find(m => m.id === selectedPaymentMethod);
    
    // Simulate booking creation
    const bookingId = 'WS' + Date.now().toString().slice(-8);
    
    if (selectedPaymentMethod === 'online' || selectedPaymentMethod === 'upi' || selectedPaymentMethod === 'wallet') {
      // For online payments, simulate payment processing
      toast.success('Redirecting to payment gateway...', {
        description: 'You will be redirected to complete your payment securely.'
      });
      
      // Simulate redirect delay
      setTimeout(() => {
        toast.success('Booking confirmed!', {
          description: `Your booking ID is ${bookingId}. Confirmation details sent to your email.`
        });
        onClose();
      }, 2000);
    } else {
      // For pay at venue
      toast.success('Booking confirmed!', {
        description: `Your booking ID is ${bookingId}. Please pay at the workspace when you arrive.`
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Choose Payment Method</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Booking Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Workspace:</span>
                <p className="font-medium">{bookingDetails.workspaceName}</p>
              </div>
              <div>
                <span className="text-gray-600">Plan:</span>
                <p className="font-medium">{bookingDetails.plan}</p>
              </div>
              <div>
                <span className="text-gray-600">Date & Time:</span>
                <p className="font-medium">
                  {bookingDetails.date.toLocaleDateString()} at {bookingDetails.time}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Duration:</span>
                <p className="font-medium">{bookingDetails.duration} {bookingDetails.durationUnit}</p>
              </div>
              <div>
                <span className="text-gray-600">People:</span>
                <p className="font-medium">{bookingDetails.numberOfPeople}</p>
              </div>
              <div>
                <span className="text-gray-600">Total Amount:</span>
                <p className="font-bold text-brand-600 text-lg">₹{bookingDetails.total}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold mb-4">Select Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === method.id
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-brand-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedPaymentMethod === method.id 
                          ? 'bg-brand-100 text-brand-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{method.title}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={method.badgeColor}>
                        {method.badge}
                      </Badge>
                      {selectedPaymentMethod === method.id && (
                        <CheckCircle className="h-5 w-5 text-brand-600" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Security Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">Secure Payment</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              className="flex-1 bg-brand-600 hover:bg-brand-700"
              onClick={handleConfirmBooking}
              disabled={!selectedPaymentMethod}
            >
              Confirm Booking
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentOptionsDialog;
