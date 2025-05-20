
import React from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PlanFeature {
  text: string;
}

export interface WorkspacePlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'hour' | 'day' | 'week' | 'month';
  features: PlanFeature[];
  color?: string;
}

interface PlanCardProps {
  plan: WorkspacePlan;
  isSelected: boolean;
  onSelect: () => void;
  onBookNow: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected, onSelect, onBookNow }) => {
  return (
    <div 
      className={cn(
        "border rounded-lg p-5 cursor-pointer transition-all",
        isSelected ? "border-brand-500 bg-brand-50 shadow-sm" : "border-gray-200 hover:border-brand-300"
      )}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <div className="mt-1 flex items-baseline">
            <span className="text-2xl font-bold text-brand-600">
              ₹{plan.price}
            </span>
            <span className="text-gray-500 ml-1">
              /{plan.billingCycle}
            </span>
          </div>
        </div>
        {isSelected && (
          <Badge className="bg-brand-100 text-brand-800 border-brand-200">
            Selected
          </Badge>
        )}
      </div>
      
      <div className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="h-4 w-4 text-brand-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600">{feature.text}</span>
          </div>
        ))}
      </div>
      
      {isSelected && (
        <Button 
          className="w-full bg-brand-600 hover:bg-brand-700" 
          onClick={(e) => {
            e.stopPropagation();
            onBookNow();
          }}
        >
          Book Now
        </Button>
      )}
    </div>
  );
};

export default PlanCard;
