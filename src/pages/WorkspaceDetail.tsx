
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, MapPin, Wifi, Coffee, AirVent, ParkingMeter, SquareUser, Heart, Share2, Clock, Play, Phone, Mail } from 'lucide-react';
import ImageGallery from '@/components/ImageGallery';
import PlanCard, { WorkspacePlan } from '@/components/PlanCard';
import ContactBlock from '@/components/ContactBlock';
import AvailabilityWidget from '@/components/AvailabilityWidget';
import MapEmbed from '@/components/MapEmbed';
import VideoTourModal from '@/components/VideoTourModal';
import WorkspaceSuggestions from '@/components/WorkspaceSuggestions';
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';

// Mock workspace data with expanded details for the new design
const getWorkspace = (id: number) => {
  return {
    id: id,
    name: 'WorkHub Premium',
    city: 'Bangalore',
    area: 'Residency Road',
    isPremium: true,
    rating: 4.8,
    reviews: 124,
    description: 'Experience premium coworking at WorkHub Premium. Our flagship location in central Bangalore offers stunning views, ergonomic workspaces, and all the amenities you need for productive work.\n\nWhether you need a quiet space for focused work or a collaborative environment for your team, we have flexible options to suit your needs. Our community managers ensure everything runs smoothly, so you can focus on what matters most - your work.\n\nJoin our vibrant community of professionals, entrepreneurs, and creatives in one of Bangalore\'s most prestigious business addresses.',
    capacity: 150,
    openHours: '08:00 - 22:00',
    openDays: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday',
    address: 'MG Road, Shivaji Nagar, Bangalore, Karnataka, 560001',
    contactPhone: '+91 9876543210',
    contactEmail: 'contact@innospace.com',
    contactName: 'InnoSpace Solutions',
    amenities: ['wifi', 'coffee', 'ac', 'parking', 'meeting'],
    availableSeats: 120,
    totalSeats: 150,
    images: [
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    ],
    videoTourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    hasVideoTour: true,
    plans: [
      {
        id: 'hot-desk',
        name: 'Hot Desk',
        price: 500,
        billingCycle: 'day' as const,
        features: [
          { text: 'Access to common area' },
          { text: 'High-speed WiFi' },
          { text: 'Coffee & tea included' }
        ]
      },
      {
        id: 'dedicated-desk',
        name: 'Dedicated Desk',
        price: 8000,
        billingCycle: 'month' as const,
        features: [
          { text: 'Personal desk' },
          { text: 'Locker storage' },
          { text: '8 hours meeting room credits/month' },
          { text: 'Business address' }
        ]
      },
      {
        id: 'private-office',
        name: 'Private Office',
        price: 25000,
        billingCycle: 'month' as const,
        features: [
          { text: 'Private lockable office' },
          { text: '20 hours meeting room credits/month' },
          { text: 'Business address & mail handling' },
          { text: 'Customizable space' }
        ]
      }
    ],
    reviewsList: [
      {
        id: 1,
        name: 'Priya Sharma',
        avatar: 'https://i.pravatar.cc/100?img=1',
        rating: 5,
        date: '2023-05-15',
        comment: 'Excellent workspace with great amenities. The staff is friendly and helpful. The location is perfect for me.',
      },
      {
        id: 2,
        name: 'Rahul Verma',
        avatar: 'https://i.pravatar.cc/100?img=3',
        rating: 4,
        date: '2023-04-22',
        comment: 'Good workspace with nice facilities. The internet is fast and reliable. The coffee is great too!',
      },
      {
        id: 3,
        name: 'Ananya Patel',
        avatar: 'https://i.pravatar.cc/100?img=5',
        rating: 5,
        date: '2023-03-10',
        comment: 'I love this place! The atmosphere is conducive to productivity and the meeting rooms are well-equipped.',
      },
    ],
    suggestedWorkspaces: [
      {
        id: 2,
        name: 'Innov8 Koramangala',
        area: 'Koramangala',
        city: 'Bangalore',
        rating: 4.6,
        pricePerDay: 450,
        imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        isPremium: false
      },
      {
        id: 3,
        name: 'WeWork Galaxy',
        area: 'Residency Road',
        city: 'Bangalore',
        rating: 4.7,
        pricePerDay: 550,
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        isPremium: true
      },
      {
        id: 4,
        name: 'The Hive',
        area: 'Indiranagar',
        city: 'Bangalore',
        rating: 4.5,
        pricePerDay: 480,
        imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        isPremium: false
      }
    ]
  };
};

const amenityIcons: Record<string, JSX.Element> = {
  wifi: <Wifi className="h-5 w-5" />,
  coffee: <Coffee className="h-5 w-5" />,
  ac: <AirVent className="h-5 w-5" />,
  parking: <ParkingMeter className="h-5 w-5" />,
  meeting: <SquareUser className="h-5 w-5" />
};

const amenityLabels: Record<string, string> = {
  wifi: 'High-Speed WiFi',
  coffee: 'Premium Coffee',
  ac: 'Air Conditioning',
  parking: 'Parking Space',
  meeting: 'Meeting Rooms'
};

const WorkspaceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const workspace = getWorkspace(Number(id));
  
  const [selectedPlan, setSelectedPlan] = useState<string>(workspace.plans[0].id);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handleBookNow = () => {
    const plan = workspace.plans.find(p => p.id === selectedPlan);
    toast(`Booking ${plan?.name} at ${workspace.name}`, {
      description: `Your booking request has been submitted.`,
    });
  };
  
  const handleSave = () => {
    toast.success("Workspace saved to favorites!");
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };
  
  const handleContactNow = () => {
    toast("Contact request sent", {
      description: "A representative will reach out to you shortly.",
    });
  };
  
  const handleWatchVideo = () => {
    setVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {workspace.isPremium && (
                    <Badge className="bg-brand-100 text-brand-800 border-brand-200">
                      Premium
                    </Badge>
                  )}
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{workspace.name}</h1>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{workspace.area}, {workspace.city}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-500 mr-3">
                      <Star className="fill-yellow-500 stroke-yellow-500 h-4 w-4" />
                      <span className="ml-1 font-medium">{workspace.rating}</span>
                    </div>
                    <Link to="#reviews" className="text-brand-600 hover:text-brand-700 transition-colors">
                      {workspace.reviews} reviews
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleSave}
                >
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Save</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Bar - Mobile/Tablet Only */}
        <div className="lg:hidden bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-brand-600" />
                <a href={`tel:${workspace.contactPhone}`} className="text-brand-600 font-medium">
                  Call Now
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">Available:</span>
                <span className="font-medium text-green-600">
                  {workspace.availableSeats}/{workspace.totalSeats}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
            {/* Left Section - Image Gallery and Details */}
            <div className="flex-1 min-w-0">
              {/* Image Gallery */}
              <div className="mb-6 lg:mb-8">
                <ImageGallery 
                  images={workspace.images}
                  hasVideoTour={workspace.hasVideoTour}
                  onWatchVideo={handleWatchVideo}
                />
              </div>
              
              {/* Mobile Contact & Availability Cards */}
              <div className="lg:hidden space-y-4 mb-6">
                <ContactBlock
                  contactName={workspace.contactName}
                  contactPhone={workspace.contactPhone}
                  contactEmail={workspace.contactEmail}
                  openHours={workspace.openHours}
                  openDays={workspace.openDays}
                  onContactNow={handleContactNow}
                />
                <AvailabilityWidget
                  availableSeats={workspace.availableSeats}
                  totalSeats={workspace.totalSeats}
                />
              </div>
              
              {/* Details Tabs */}
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                {/* Details Tab */}
                <TabsContent value="details" className="space-y-6">
                  <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">About this workspace</h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {workspace.description}
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Location</h2>
                    <p className="mb-4 text-muted-foreground">{workspace.address}</p>
                    <MapEmbed 
                      address={workspace.address}
                      height="300px"
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">Opening Hours</h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-brand-600" />
                        <div>
                          <span className="font-medium">Hours:</span>
                          <span className="ml-2 text-muted-foreground">{workspace.openHours}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5" />
                        <div>
                          <span className="font-medium">Open days:</span>
                          <span className="ml-2 text-muted-foreground">{workspace.openDays}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {workspace.hasVideoTour && (
                    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                      <h2 className="text-xl font-semibold mb-4 text-foreground">Video Tour</h2>
                      <div 
                        className="relative h-48 bg-muted rounded-lg cursor-pointer flex items-center justify-center hover:bg-muted/80 transition-colors group"
                        onClick={handleWatchVideo}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="bg-brand-600 rounded-full p-4 group-hover:bg-brand-700 transition-colors">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                          <span className="font-medium text-foreground">Watch Video Tour</span>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {/* Amenities Tab */}
                <TabsContent value="amenities">
                  <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6 text-foreground">Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {workspace.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center bg-muted/50 p-4 rounded-lg">
                          <div className="p-2 bg-brand-50 text-brand-600 rounded-lg mr-3 flex-shrink-0">
                            {amenityIcons[amenity]}
                          </div>
                          <span className="font-medium text-foreground">{amenityLabels[amenity]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Contact Tab */}
                <TabsContent value="contact">
                  <div className="space-y-6">
                    <ContactBlock
                      contactName={workspace.contactName}
                      contactPhone={workspace.contactPhone}
                      contactEmail={workspace.contactEmail}
                      openHours={workspace.openHours}
                      openDays={workspace.openDays}
                      onContactNow={handleContactNow}
                    />
                    <AvailabilityWidget
                      availableSeats={workspace.availableSeats}
                      totalSeats={workspace.totalSeats}
                    />
                  </div>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" id="reviews">
                  <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-foreground">Reviews</h2>
                      <div className="flex items-center text-yellow-500">
                        <Star className="fill-yellow-500 stroke-yellow-500 h-5 w-5 mr-1" />
                        <span className="text-lg font-semibold">{workspace.rating}</span>
                        <span className="text-muted-foreground text-sm ml-2">({workspace.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {workspace.reviewsList.map((review) => (
                        <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                          <div className="flex items-center mb-3">
                            <img 
                              src={review.avatar} 
                              alt={review.name} 
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <h4 className="font-medium text-foreground">{review.name}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex text-yellow-500">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-500 stroke-yellow-500' : 'stroke-muted-foreground/50'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="mt-6 w-full">
                      View All Reviews
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Section - Desktop Sidebar */}
            <div className="hidden lg:flex w-full xl:w-96 flex-col space-y-6">
              {/* Pricing Section - Improved UX */}
              <div className="bg-card rounded-lg border border-border shadow-sm sticky top-6">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Choose Your Plan</h2>
                  <p className="text-sm text-muted-foreground mt-1">Select the perfect plan for your needs</p>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {workspace.plans.map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        isSelected={selectedPlan === plan.id}
                        onSelect={() => handlePlanSelect(plan.id)}
                        onBookNow={handleBookNow}
                        workspaceName={workspace.name}
                        workspaceAddress={workspace.address}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <ContactBlock
                contactName={workspace.contactName}
                contactPhone={workspace.contactPhone}
                contactEmail={workspace.contactEmail}
                openHours={workspace.openHours}
                openDays={workspace.openDays}
                onContactNow={handleContactNow}
              />
              
              {/* Availability Widget */}
              <AvailabilityWidget
                availableSeats={workspace.availableSeats}
                totalSeats={workspace.totalSeats}
              />
            </div>
          </div>

          {/* Mobile Pricing Section - Improved */}
          <div className="lg:hidden mt-8">
            <div className="bg-card rounded-lg border border-border shadow-sm">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Choose Your Plan</h2>
                <p className="text-sm text-muted-foreground mt-1">Select the perfect plan for your needs</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {workspace.plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      isSelected={selectedPlan === plan.id}
                      onSelect={() => handlePlanSelect(plan.id)}
                      onBookNow={handleBookNow}
                      workspaceName={workspace.name}
                      workspaceAddress={workspace.address}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Suggested Workspaces */}
          <div className="mt-12">
            <WorkspaceSuggestions workspaces={workspace.suggestedWorkspaces} />
          </div>
        </div>
      </main>
      
      {/* Video Tour Modal */}
      <VideoTourModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={workspace.videoTourUrl}
        workspaceName={workspace.name}
      />
      
      <Footer />
    </div>
  );
};

export default WorkspaceDetail;
