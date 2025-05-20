
import React from 'react';
import { Phone, Mail, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactBlockProps {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  openHours: string;
  openDays: string;
  onContactNow: () => void;
}

const ContactBlock: React.FC<ContactBlockProps> = ({
  contactName,
  contactPhone,
  contactEmail,
  openHours,
  openDays,
  onContactNow,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
      
      <div className="space-y-4">
        <p className="font-medium">{contactName}</p>
        
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
          <a href={`tel:${contactPhone}`} className="text-brand-600 hover:underline">
            {contactPhone}
          </a>
        </div>
        
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
          <a href={`mailto:${contactEmail}`} className="text-brand-600 hover:underline">
            {contactEmail}
          </a>
        </div>
        
        <div className="pt-2 border-t">
          <p className="font-medium mb-2">Opening Hours</p>
          
          <div className="flex items-start gap-3 mb-2">
            <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
            <span>{openHours}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
            <span>{openDays}</span>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6 bg-brand-600 hover:bg-brand-700"
        onClick={onContactNow}
      >
        Contact Now
      </Button>
    </div>
  );
};

export default ContactBlock;
