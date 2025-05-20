
import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface VideoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  workspaceName: string;
}

const VideoTourModal: React.FC<VideoTourModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  workspaceName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex justify-between items-center">
            <DialogTitle>{workspaceName} Video Tour</DialogTitle>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>
        <div className="p-6 pt-4">
          <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden">
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoTourModal;
