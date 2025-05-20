
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
              <div className="h-[500px] w-full relative">
                <img 
                  src={image} 
                  alt={`Workspace image ${index + 1}`} 
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        
        {hasVideoTour && (
          <button 
            onClick={onWatchVideo}
            className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-black/90 transition-colors"
          >
            <Play className="h-4 w-4" />
            Watch Video Tour
          </button>
        )}
      </Carousel>
      
      <div className="mt-4 grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="h-24 overflow-hidden rounded-md">
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="h-full w-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
