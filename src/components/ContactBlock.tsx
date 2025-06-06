
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
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Contact Information</h3>
      
      <div className="space-y-4">
        <p className="font-medium text-foreground">{contactName}</p>
        
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-brand-600 mt-0.5 flex-shrink-0" />
          <a 
            href={`tel:${contactPhone}`} 
            className="text-brand-600 hover:text-brand-700 transition-colors font-medium"
          >
            {contactPhone}
          </a>
        </div>
        
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-brand-600 mt-0.5 flex-shrink-0" />
          <a 
            href={`mailto:${contactEmail}`} 
            className="text-brand-600 hover:text-brand-700 transition-colors font-medium break-all"
          >
            {contactEmail}
          </a>
        </div>
        
        <div className="pt-2 border-t border-border">
          <p className="font-medium mb-3 text-foreground">Opening Hours</p>
          
          <div className="flex items-start gap-3 mb-2">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-foreground">{openHours}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-foreground text-sm">{openDays}</span>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6 bg-brand-600 hover:bg-brand-700 text-white"
        onClick={onContactNow}
      >
        Contact Now
      </Button>
    </div>
  );
};

export default ContactBlock;
