
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Star, MapPin, Wifi, Coffee, AirVent, ParkingMeter, SquareUser, Clock, User, Check, Heart } from 'lucide-react';

// Mock workspace data
const getWorkspace = (id: number) => {
  return {
    id: id,
    name: 'WeWork Galaxy',
    city: 'Bangalore',
    area: 'Residency Road',
    rating: 4.8,
    reviews: 120,
    pricePerHour: 99,
    pricePerDay: 599,
    pricePerWeek: 2999,
    pricePerMonth: 9999,
    description: 'Located in the heart of Bangalore, WeWork Galaxy offers a premium coworking experience with all amenities needed for productive work. With spacious desks, comfortable chairs, high-speed WiFi, and complimentary refreshments, this is the perfect space to get work done.',
    capacity: 150,
    openHours: '9:00 AM - 9:00 PM',
    address: '43/1, Residency Road, Shanthala Nagar, Ashok Nagar, Bangalore, Karnataka 560025',
    contactPhone: '+91 9988776655',
    contactEmail: 'bangalore@wework.com',
    amenities: ['wifi', 'coffee', 'ac', 'parking', 'meeting'],
    images: [
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
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
    isPremium: true,
    hasVideoTour: true
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
  
  const [mainImage, setMainImage] = useState(workspace.images[0]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("hour");
  const [guests, setGuests] = useState(1);

  const handleThumbnailClick = (img: string) => {
    setMainImage(img);
  };

  const handleBookNow = () => {
    // In a real app, this would navigate to booking page or show booking modal
    alert(`Booking for ${selectedDate?.toLocaleDateString()} - ${guests} guests`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        {/* Image Gallery */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main Image */}
              <div className="lg:col-span-2 h-96 overflow-hidden rounded-xl relative">
                <img 
                  src={mainImage} 
                  alt={workspace.name} 
                  className="w-full h-full object-cover"
                />
                {workspace.isPremium && (
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Premium
                  </div>
                )}
                {workspace.hasVideoTour && (
                  <div className="absolute bottom-4 right-4 bg-gray-900/80 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    Video Tour
                  </div>
                )}
                <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              
              {/* Thumbnails */}
              <div className="lg:col-span-1 grid grid-cols-2 gap-4 h-96 overflow-y-auto">
                {workspace.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`h-44 overflow-hidden rounded-xl cursor-pointer ${img === mainImage ? 'ring-2 ring-brand-500' : ''}`}
                    onClick={() => handleThumbnailClick(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${workspace.name} ${index + 1}`} 
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Workspace details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Workspace info */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{workspace.name}</h1>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center text-yellow-500">
                        <Star className="fill-yellow-500 stroke-yellow-500 h-5 w-5" />
                        <span className="ml-1 font-medium">{workspace.rating}</span>
                      </div>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="text-gray-500">{workspace.reviewsList.length} reviews</span>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>Save</span>
                  </Button>
                </div>
                
                <div className="flex items-start gap-1 text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{workspace.address}</span>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span>Hours: {workspace.openHours}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <span>Capacity: {workspace.capacity} people</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">About this workspace</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {workspace.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-3">
                    {workspace.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                        <div className="p-1 text-brand-500 mr-2">
                          {amenityIcons[amenity]}
                        </div>
                        <span>{amenityLabels[amenity]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                  <div className="space-y-2">
                    <p><span className="font-medium">Phone:</span> {workspace.contactPhone}</p>
                    <p><span className="font-medium">Email:</span> {workspace.contactEmail}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-6">
                  {workspace.reviewsList.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center mb-2">
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex items-center">
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-500 stroke-yellow-500' : 'stroke-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  View All Reviews
                </Button>
              </div>
            </div>
            
            {/* Right column - Booking card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20 rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Book This Workspace</h2>
                  
                  <Tabs 
                    defaultValue="hour" 
                    className="mb-6"
                    onValueChange={setSelectedTab}
                    value={selectedTab}
                  >
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="hour">Hour</TabsTrigger>
                      <TabsTrigger value="day">Day</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                    <TabsContent value="hour" className="mt-4">
                      <p className="text-2xl font-bold text-brand-600">₹{workspace.pricePerHour}<span className="text-base text-gray-500 font-normal">/hour</span></p>
                    </TabsContent>
                    <TabsContent value="day" className="mt-4">
                      <p className="text-2xl font-bold text-brand-600">₹{workspace.pricePerDay}<span className="text-base text-gray-500 font-normal">/day</span></p>
                    </TabsContent>
                    <TabsContent value="week" className="mt-4">
                      <p className="text-2xl font-bold text-brand-600">₹{workspace.pricePerWeek}<span className="text-base text-gray-500 font-normal">/week</span></p>
                    </TabsContent>
                    <TabsContent value="month" className="mt-4">
                      <p className="text-2xl font-bold text-brand-600">₹{workspace.pricePerMonth}<span className="text-base text-gray-500 font-normal">/month</span></p>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Date</label>
                      <div className="border rounded-md p-2">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="w-full"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Guests</label>
                      <div className="flex border rounded-md">
                        <button 
                          className="px-3 py-2 border-r"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                        >
                          -
                        </button>
                        <div className="flex-grow text-center py-2">{guests}</div>
                        <button 
                          className="px-3 py-2 border-l"
                          onClick={() => setGuests(Math.min(10, guests + 1))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-2">
                        <span>Base price</span>
                        <span>₹{selectedTab === 'hour' ? workspace.pricePerHour : 
                               selectedTab === 'day' ? workspace.pricePerDay : 
                               selectedTab === 'week' ? workspace.pricePerWeek : 
                               workspace.pricePerMonth}</span>
                      </div>
                      <div className="flex justify-between mb-4">
                        <span>Service fee</span>
                        <span>₹{selectedTab === 'hour' ? 20 : 
                               selectedTab === 'day' ? 50 : 
                               selectedTab === 'week' ? 150 : 
                               300}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{selectedTab === 'hour' ? workspace.pricePerHour + 20 : 
                               selectedTab === 'day' ? workspace.pricePerDay + 50 : 
                               selectedTab === 'week' ? workspace.pricePerWeek + 150 : 
                               workspace.pricePerMonth + 300}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-accent-500 hover:bg-accent-600 text-white" onClick={handleBookNow}>
                      Book Now
                    </Button>
                    
                    <p className="text-center text-sm text-gray-500">
                      You won't be charged yet
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorkspaceDetail;
