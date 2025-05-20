
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

interface SuggestedWorkspace {
  id: number;
  name: string;
  area: string;
  city: string;
  rating: number;
  pricePerDay: number;
  imageUrl: string;
  isPremium?: boolean;
}

interface WorkspaceSuggestionsProps {
  workspaces: SuggestedWorkspace[];
}

const WorkspaceSuggestions: React.FC<WorkspaceSuggestionsProps> = ({
  workspaces
}) => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Other Workspaces You Might Like</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <Link key={workspace.id} to={`/workspace/${workspace.id}`}>
            <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={workspace.imageUrl}
                  alt={workspace.name}
                  className="w-full h-full object-cover"
                />
                {workspace.isPremium && (
                  <div className="absolute top-3 left-3 bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Premium
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center mb-1">
                  <div className="flex items-center text-yellow-500">
                    <Star className="fill-yellow-500 stroke-yellow-500 h-4 w-4" />
                    <span className="ml-1 text-sm font-medium">{workspace.rating}</span>
                  </div>
                </div>
                
                <h4 className="font-bold text-lg mb-1">{workspace.name}</h4>
                
                <div className="flex items-start gap-1 text-gray-600 mb-3">
                  <MapPin className="h-3 w-3 mt-1 flex-shrink-0" />
                  <span className="text-sm">{workspace.area}, {workspace.city}</span>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-3 border-t">
                  <div className="text-brand-600 font-semibold">
                    ₹{workspace.pricePerDay}<span className="text-sm text-gray-500 font-normal">/day</span>
                  </div>
                  <Badge variant="outline" className="bg-accent-50 text-accent-600 border-accent-200">
                    View
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceSuggestions;
