
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageGalleryProps {
  images: string[];
  hasVideoTour?: boolean;
  onWatchVideo?: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  hasVideoTour = false,
  onWatchVideo
}) => {
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="h-[400px] md:h-[500px] w-full relative">
                <img 
                  src={image} 
                  alt={`Workspace image ${index + 1}`} 
                  className="h-full w-full object-cover rounded-xl shadow-sm"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg" />
        
        {hasVideoTour && (
          <button 
            onClick={onWatchVideo}
            className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-3 hover:bg-white transition-all shadow-lg hover:shadow-xl"
          >
            <div className="bg-blue-600 p-2 rounded-full">
              <Play className="h-4 w-4 text-white" />
            </div>
            Watch Virtual Tour
          </button>
        )}
      </Carousel>
      
      <div className="mt-6 grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="h-20 md:h-24 overflow-hidden rounded-lg border-2 border-transparent hover:border-blue-200 transition-colors">
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="h-full w-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
