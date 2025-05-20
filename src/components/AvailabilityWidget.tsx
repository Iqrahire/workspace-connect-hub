
import React from 'react';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvailabilityWidgetProps {
  availableSeats: number;
  totalSeats: number;
}

const AvailabilityWidget: React.FC<AvailabilityWidgetProps> = ({
  availableSeats,
  totalSeats,
}) => {
  const availability = availableSeats / totalSeats;
  
  let statusColor = "text-green-600 bg-green-50 border-green-200";
  if (availability <= 0.2) {
    statusColor = "text-red-600 bg-red-50 border-red-200";
  } else if (availability <= 0.5) {
    statusColor = "text-yellow-600 bg-yellow-50 border-yellow-200";
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Availability</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-500" />
          <span className="font-medium">Available seats</span>
        </div>
        
        <div className={cn("px-3 py-1 rounded-full text-sm font-medium border", statusColor)}>
          {availableSeats} / {totalSeats}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityWidget;
