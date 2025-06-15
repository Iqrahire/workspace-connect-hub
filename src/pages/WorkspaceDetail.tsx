
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, MapPin, Wifi, Coffee, AirVent, ParkingMeter, SquareUser, Heart, Share2, Clock, Play, Phone, Mail, Users, Calendar, Shield } from 'lucide-react';
import ImageGallery from '@/components/ImageGallery';
import PlanCard from '@/components/PlanCard';
import ContactBlock from '@/components/ContactBlock';
import AvailabilityWidget from '@/components/AvailabilityWidget';
import MapEmbed from '@/components/MapEmbed';
import VideoTourModal from '@/components/VideoTourModal';
import WorkspaceSuggestions from '@/components/WorkspaceSuggestions';
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Icons mapping, can be extended easily
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

const WorkspaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Fetch workspace by id
  const { data: workspace, isLoading, error } = useQuery({
    queryKey: ['workspace', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  // Plan selection for pricing card; set default once data loads
  React.useEffect(() => {
    if (workspace && workspace.price_per_day !== undefined) {
      setSelectedPlan('hot-desk');
    }
  }, [workspace]);

  const handleBookNow = () => {
    toast("Booking request submitted (demo only)", {
      description: "Booking logic will go here."
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
      description: "A representative will reach out to you shortly."
    });
  };

  const handleWatchVideo = () => {
    setVideoModalOpen(true);
  };

  // Loading and error states
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading workspace details…</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-600">Workspace not found or an error occurred.</div>;
  }
  if (!workspace) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Workspace not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-white shadow-md border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {workspace.is_premium && (
                    <Badge className="bg-amber-50 text-amber-700 border-amber-200 font-medium shadow-sm">
                      ✨ Premium
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                    <Users className="h-3 w-3 mr-1" />
                    {workspace.capacity ?? 0} seats
                  </Badge>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{workspace.name}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">{workspace.area}, {workspace.city}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <Star className="fill-yellow-400 stroke-yellow-400 h-4 w-4" />
                      <span className="ml-1 font-semibold text-gray-900">{workspace.rating?.toFixed(1) ?? "—"}</span>
                    </div>
                    <span className="text-blue-600 font-medium">{workspace.review_count ?? 0} reviews</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="default"
                  className="flex items-center gap-2 hover:bg-blue-50 border border-blue-100 shadow-xs"
                  onClick={handleSave}
                >
                  <Heart className="h-4 w-4" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="flex items-center gap-2 hover:bg-blue-50 border border-blue-100 shadow-xs"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{workspace.created_at?.split("T")[0]}</div>
                  <div className="text-xs text-gray-500">Listed On</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{workspace.capacity ?? 0} seats</div>
                  <div className="text-xs text-gray-500">Total Capacity</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">Verified</div>
                  <div className="text-xs text-gray-500">Workspace</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-orange-600" />
                <a href={`tel:${workspace.contact_phone ?? ''}`} className="hover:underline">
                  <div className="text-sm font-semibold text-gray-900">Contact</div>
                  <div className="text-xs text-gray-500">Quick Call</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-1 min-w-0">
              <div className="mb-8 rounded-xl shadow-md bg-white p-2">
                <ImageGallery 
                  images={workspace.images ?? []}
                  hasVideoTour={workspace.has_video_tour ?? false}
                  onWatchVideo={handleWatchVideo}
                />
              </div>
              <div className="lg:hidden space-y-6 mb-8">
                <div className="bg-white rounded-xl shadow-md border p-6">
                  <ContactBlock
                    contactName={workspace.name}
                    contactPhone={workspace.contact_phone ?? ''}
                    contactEmail={workspace.contact_email ?? ''}
                    openHours=""
                    openDays=""
                    onContactNow={handleContactNow}
                  />
                </div>
                <div className="bg-white rounded-xl shadow-md border p-6">
                  <AvailabilityWidget
                    availableSeats={workspace.capacity ?? 0}
                    totalSeats={workspace.capacity ?? 0}
                  />
                </div>
              </div>
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg shadow-inner">
                  <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">Details</TabsTrigger>
                  <TabsTrigger value="amenities" className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">Amenities</TabsTrigger>
                  <TabsTrigger value="contact" className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">Contact</TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">Reviews</TabsTrigger>
                  <TabsTrigger value="availability" className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">Available</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-6">
                  <div className="bg-white rounded-xl shadow-md border p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">About this workspace</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                        {workspace.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md border p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Location & Directions</h2>
                    <p className="mb-6 text-gray-600 font-medium">{workspace.address}</p>
                    {workspace.address && (
                      <MapEmbed 
                        address={workspace.address}
                        height="350px"
                        className="rounded-xl shadow-md"
                      />
                    )}
                  </div>
                  <div className="bg-white rounded-xl shadow-md border p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Operating Hours</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Daily Hours</div>
                          <div className="text-gray-600">—</div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-start gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Open Days</div>
                          <div className="text-gray-600">—</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {workspace.has_video_tour && (
                    <div className="bg-white rounded-xl shadow-md border p-8">
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
                <TabsContent value="amenities">
                  <div className="bg-white rounded-xl shadow-md border p-8">
                    <h2 className="text-2xl font-bold mb-8 text-gray-900">Workspace Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {(workspace.amenities ?? []).map((amenity: string) => (
                        <div key={amenity} className="flex items-center bg-gray-50 p-6 rounded-xl border hover:shadow-sm transition-shadow">
                          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl mr-4 flex-shrink-0">
                            {amenityIcons[amenity]}
                          </div>
                          <span className="font-semibold text-gray-900">{amenityLabels[amenity] ?? amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="contact">
                  <div className="bg-white rounded-xl shadow-md border p-8">
                    <ContactBlock
                      contactName={workspace.name}
                      contactPhone={workspace.contact_phone ?? ''}
                      contactEmail={workspace.contact_email ?? ''}
                      openHours=""
                      openDays=""
                      onContactNow={handleContactNow}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="availability">
                  <div className="bg-white rounded-xl shadow-md border p-8">
                    <AvailabilityWidget
                      availableSeats={workspace.capacity ?? 0}
                      totalSeats={workspace.capacity ?? 0}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="bg-white rounded-xl shadow-md border p-8 flex flex-col items-center">
                    <div className="flex items-center justify-between w-full mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                      <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-lg">
                        <Star className="fill-yellow-400 stroke-yellow-400 h-5 w-5 mr-2" />
                        <span className="text-xl font-bold text-gray-900">{workspace.rating?.toFixed(1) ?? "—"}</span>
                        <span className="text-gray-500 text-sm ml-2">({workspace.review_count ?? 0} reviews)</span>
                      </div>
                    </div>
                    <div className="w-full text-center text-gray-500 mb-8">
                      No reviews (from database) yet.
                    </div>
                    <Button variant="outline" className="mt-8 w-full py-3 text-base font-medium">
                      View All Reviews
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="hidden lg:flex w-full xl:w-96">
              <div className="bg-white rounded-xl shadow-xl border sticky top-8 w-full h-fit max-h-[calc(100vh-120px)] flex flex-col">
                <div className="p-8 border-b border-gray-100 flex-shrink-0">
                  <h2 className="text-xl font-bold text-gray-900">Choose Your Plan</h2>
                  <p className="text-gray-600 mt-2">Pricing information</p>
                </div>
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-6 space-y-4">
                      {workspace.price_per_day && (
                        <PlanCard
                          plan={{
                            id: "hot-desk",
                            name: "Hot Desk",
                            price: workspace.price_per_day,
                            billingCycle: "day",
                            features: [
                              { text: "Open seating in main area" },
                              { text: "High-speed WiFi" }
                            ]
                          }}
                          isSelected={selectedPlan === "hot-desk"}
                          onSelect={() => setSelectedPlan("hot-desk")}
                          onBookNow={handleBookNow}
                          workspaceName={workspace.name}
                          workspaceAddress={workspace.address ?? ""}
                        />
                      )}
                      {workspace.price_per_week && (
                        <PlanCard
                          plan={{
                            id: "weekly-desk",
                            name: "Weekly Desk",
                            price: workspace.price_per_week,
                            billingCycle: "week",
                            features: [
                              { text: "Reserved seat (1 week)" },
                              { text: "All amenities included" }
                            ]
                          }}
                          isSelected={selectedPlan === "weekly-desk"}
                          onSelect={() => setSelectedPlan("weekly-desk")}
                          onBookNow={handleBookNow}
                          workspaceName={workspace.name}
                          workspaceAddress={workspace.address ?? ""}
                        />
                      )}
                      {workspace.price_per_month && (
                        <PlanCard
                          plan={{
                            id: "monthly-desk",
                            name: "Monthly Desk",
                            price: workspace.price_per_month,
                            billingCycle: "month",
                            features: [
                              { text: "Reserved seat (1 month)" },
                              { text: "Locker & mail handling" }
                            ]
                          }}
                          isSelected={selectedPlan === "monthly-desk"}
                          onSelect={() => setSelectedPlan("monthly-desk")}
                          onBookNow={handleBookNow}
                          workspaceName={workspace.name}
                          workspaceAddress={workspace.address ?? ""}
                        />
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden mt-8">
            <div className="bg-white rounded-xl shadow-xl border">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Choose Your Plan</h2>
                <p className="text-gray-600 mt-2">Pricing information</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {workspace.price_per_day && (
                    <PlanCard
                      plan={{
                        id: "hot-desk",
                        name: "Hot Desk",
                        price: workspace.price_per_day,
                        billingCycle: "day",
                        features: [
                          { text: "Open seating in main area" },
                          { text: "High-speed WiFi" }
                        ]
                      }}
                      isSelected={selectedPlan === "hot-desk"}
                      onSelect={() => setSelectedPlan("hot-desk")}
                      onBookNow={handleBookNow}
                      workspaceName={workspace.name}
                      workspaceAddress={workspace.address ?? ""}
                    />
                  )}
                  {workspace.price_per_week && (
                    <PlanCard
                      plan={{
                        id: "weekly-desk",
                        name: "Weekly Desk",
                        price: workspace.price_per_week,
                        billingCycle: "week",
                        features: [
                          { text: "Reserved seat (1 week)" },
                          { text: "All amenities included" }
                        ]
                      }}
                      isSelected={selectedPlan === "weekly-desk"}
                      onSelect={() => setSelectedPlan("weekly-desk")}
                      onBookNow={handleBookNow}
                      workspaceName={workspace.name}
                      workspaceAddress={workspace.address ?? ""}
                    />
                  )}
                  {workspace.price_per_month && (
                    <PlanCard
                      plan={{
                        id: "monthly-desk",
                        name: "Monthly Desk",
                        price: workspace.price_per_month,
                        billingCycle: "month",
                        features: [
                          { text: "Reserved seat (1 month)" },
                          { text: "Locker & mail handling" }
                        ]
                      }}
                      isSelected={selectedPlan === "monthly-desk"}
                      onSelect={() => setSelectedPlan("monthly-desk")}
                      onBookNow={handleBookNow}
                      workspaceName={workspace.name}
                      workspaceAddress={workspace.address ?? ""}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Suggestions are no longer shown, you can add back once dynamic */}
        </div>
      </main>
      <VideoTourModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={""} // Not in database, so left blank
        workspaceName={workspace.name}
      />
      <Footer />
    </div>
  );
};

export default WorkspaceDetail;
