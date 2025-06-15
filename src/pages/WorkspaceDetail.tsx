import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, MapPin, Wifi, Coffee, AirVent, ParkingMeter, SquareUser, Heart, Share2, Clock, Play, Phone, Mail, Users, Calendar, Shield } from 'lucide-react';
import ImageGallery from '@/components/ImageGallery';
import PlanCard, { WorkspacePlan } from '@/components/PlanCard';
import ContactBlock from '@/components/ContactBlock';
import AvailabilityWidget from '@/components/AvailabilityWidget';
import MapEmbed from '@/components/MapEmbed';
import VideoTourModal from '@/components/VideoTourModal';
import WorkspaceSuggestions from '@/components/WorkspaceSuggestions';
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* Enhanced Header Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {workspace.isPremium && (
                    <Badge className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200 font-medium">
                      ✨ Premium
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                    <Users className="h-3 w-3 mr-1" />
                    {workspace.availableSeats} seats available
                  </Badge>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{workspace.name}</h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">{workspace.area}, {workspace.city}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4" />
                      <span className="ml-1 font-semibold text-gray-900">{workspace.rating}</span>
                    </div>
                    <Link to="#reviews" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      {workspace.reviews} reviews
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="default"
                  className="flex items-center gap-2 hover:bg-gray-50"
                  onClick={handleSave}
                >
                  <Heart className="h-4 w-4" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="flex items-center gap-2 hover:bg-gray-50"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{workspace.openHours}</div>
                  <div className="text-xs text-gray-500">Operating Hours</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{workspace.capacity} seats</div>
                  <div className="text-xs text-gray-500">Total Capacity</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-4 w-4 text-purple-600" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">Verified</div>
                  <div className="text-xs text-gray-500">Workspace</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-orange-600" />
                <a href={`tel:${workspace.contactPhone}`} className="hover:underline">
                  <div className="text-sm font-semibold text-gray-900">Contact</div>
                  <div className="text-xs text-gray-500">Quick Call</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Left Section - Content */}
            <div className="flex-1 min-w-0">
              {/* Image Gallery with improved styling */}
              <div className="mb-8">
                <ImageGallery 
                  images={workspace.images}
                  hasVideoTour={workspace.hasVideoTour}
                  onWatchVideo={handleWatchVideo}
                />
              </div>
              
              {/* Mobile Contact & Availability Cards */}
              <div className="lg:hidden space-y-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <ContactBlock
                    contactName={workspace.contactName}
                    contactPhone={workspace.contactPhone}
                    contactEmail={workspace.contactEmail}
                    openHours={workspace.openHours}
                    openDays={workspace.openDays}
                    onContactNow={handleContactNow}
                  />
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <AvailabilityWidget
                    availableSeats={workspace.availableSeats}
                    totalSeats={workspace.totalSeats}
                  />
                </div>
              </div>
              
              {/* Enhanced Details Tabs */}
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Details</TabsTrigger>
                  <TabsTrigger value="amenities" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Amenities</TabsTrigger>
                  <TabsTrigger value="contact" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Contact</TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Reviews</TabsTrigger>
                  <TabsTrigger value="availability" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Available</TabsTrigger>
                </TabsList>
                
                {/* Details Tab */}
                <TabsContent value="details" className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">About this workspace</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                        {workspace.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Location & Directions</h2>
                    <p className="mb-6 text-gray-600 font-medium">{workspace.address}</p>
                    <MapEmbed 
                      address={workspace.address}
                      height="350px"
                      className="rounded-xl shadow-sm"
                    />
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Operating Hours</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Daily Hours</div>
                          <div className="text-gray-600">{workspace.openHours}</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-start gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Open Days</div>
                          <div className="text-gray-600">{workspace.openDays}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {workspace.hasVideoTour && (
                    <div className="bg-white rounded-xl shadow-sm border p-8">
                      <h2 className="text-2xl font-bold mb-6 text-gray-900">Video Tour</h2>
                      <div 
                        className="relative h-64 bg-gray-100 rounded-xl cursor-pointer flex items-center justify-center hover:bg-gray-50 transition-colors group border-2 border-dashed border-gray-200"
                        onClick={handleWatchVideo}
                      >
                        <div className="text-center">
                          <div className="bg-blue-600 rounded-full p-6 group-hover:bg-blue-700 transition-colors mx-auto mb-4">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                          <div className="font-semibold text-gray-900 text-lg">Take a Virtual Tour</div>
                          <div className="text-gray-500 mt-1">Get a 360° view of the workspace</div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {/* Amenities Tab */}
                <TabsContent value="amenities">
                  <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold mb-8 text-gray-900">Workspace Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {workspace.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center bg-gray-50 p-6 rounded-xl border hover:shadow-sm transition-shadow">
                          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mr-4 flex-shrink-0">
                            {amenityIcons[amenity]}
                          </div>
                          <span className="font-semibold text-gray-900">{amenityLabels[amenity]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Contact Tab */}
                <TabsContent value="contact">
                  <div className="bg-white rounded-xl shadow-sm border p-8">
                    <ContactBlock
                      contactName={workspace.contactName}
                      contactPhone={workspace.contactPhone}
                      contactEmail={workspace.contactEmail}
                      openHours={workspace.openHours}
                      openDays={workspace.openDays}
                      onContactNow={handleContactNow}
                    />
                  </div>
                </TabsContent>

                {/* Availability Tab */}
                <TabsContent value="availability">
                  <div className="bg-white rounded-xl shadow-sm border p-8">
                    <AvailabilityWidget
                      availableSeats={workspace.availableSeats}
                      totalSeats={workspace.totalSeats}
                    />
                  </div>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" id="reviews">
                  <div className="bg-white rounded-xl shadow-sm border p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                      <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-lg">
                        <Star className="fill-yellow-400 stroke-yellow-400 h-5 w-5 mr-2" />
                        <span className="text-xl font-bold text-gray-900">{workspace.rating}</span>
                        <span className="text-gray-500 text-sm ml-2">({workspace.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      {workspace.reviewsList.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                          <div className="flex items-center mb-4">
                            <img 
                              src={review.avatar} 
                              alt={review.name} 
                              className="w-12 h-12 rounded-full mr-4 border-2 border-gray-100"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-lg">{review.name}</h4>
                              <div className="flex items-center gap-3 mt-1">
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500 font-medium">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="mt-8 w-full py-3 text-base font-medium">
                      View All Reviews
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Section - Enhanced Pricing Sidebar */}
            <div className="hidden lg:flex w-full xl:w-96">
              <div className="bg-white rounded-xl shadow-lg border sticky top-8 w-full h-fit max-h-[calc(100vh-120px)] flex flex-col">
                <div className="p-8 border-b border-gray-100 flex-shrink-0">
                  <h2 className="text-xl font-bold text-gray-900">Choose Your Plan</h2>
                  <p className="text-gray-600 mt-2">Select the perfect workspace solution</p>
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-6 space-y-4">
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
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Pricing Section */}
          <div className="lg:hidden mt-8">
            <div className="bg-white rounded-xl shadow-lg border">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Choose Your Plan</h2>
                <p className="text-gray-600 mt-2">Select the perfect workspace solution</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
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
          <div className="mt-16">
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
