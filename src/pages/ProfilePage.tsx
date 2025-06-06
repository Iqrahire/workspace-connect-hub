
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Calendar, 
  Settings, 
  Heart,
  Bell,
  CreditCard,
  LogOut
} from 'lucide-react';
import UserBookings from '@/components/UserBookings';

const ProfilePage = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    joinDate: 'January 2024',
    totalBookings: 12,
    status: 'Premium Member'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg border p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <Badge className="bg-brand-100 text-brand-800">
                    {user.status}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-1">{user.email}</p>
                <p className="text-gray-600 mb-2">{user.phone}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Joined {user.joinDate}</span>
                  <span>•</span>
                  <span>{user.totalBookings} bookings</span>
                </div>
              </div>
              
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bookings" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                My Bookings
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-6">
              <UserBookings />
            </TabsContent>

            <TabsContent value="favorites" className="space-y-6">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Favorite Workspaces</h2>
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No favorite workspaces yet</p>
                  <p className="text-sm text-gray-400">Save workspaces to access them quickly</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Payment History</h2>
                <div className="text-center py-12">
                  <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Payment history will appear here</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-sm text-gray-500">Manage your notification preferences</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Payment Methods</p>
                        <p className="text-sm text-gray-500">Manage saved payment methods</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="font-medium">Account Information</p>
                        <p className="text-sm text-gray-500">Update your personal information</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <LogOut className="h-5 w-5 mr-3 text-red-400" />
                      <div>
                        <p className="font-medium text-red-600">Sign Out</p>
                        <p className="text-sm text-gray-500">Sign out of your account</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
