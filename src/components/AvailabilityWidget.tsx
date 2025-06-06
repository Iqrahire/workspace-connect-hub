
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
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Availability</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-brand-600" />
          <span className="font-medium text-foreground">Available seats</span>
        </div>
        
        <div className={cn("px-3 py-2 rounded-full text-sm font-medium border", statusColor)}>
          {availableSeats} / {totalSeats}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              availability > 0.5 ? "bg-green-500" : availability > 0.2 ? "bg-yellow-500" : "bg-red-500"
            )}
            style={{ width: `${(availability * 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {Math.round(availability * 100)}% available
        </p>
      </div>
    </div>
  );
};

export default AvailabilityWidget;
