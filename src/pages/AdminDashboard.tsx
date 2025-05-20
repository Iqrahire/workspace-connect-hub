
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2, Building2, Users, Calendar, Star, Plus } from 'lucide-react';

// Mock data for workspaces
const adminWorkspaces = [
  {
    id: 1,
    name: 'WeWork Galaxy',
    city: 'Bangalore',
    area: 'Residency Road',
    status: 'active',
    bookings: 32,
    revenue: 24500,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Innov8 Vikhroli',
    city: 'Mumbai',
    area: 'Vikhroli West',
    status: 'active',
    bookings: 28,
    revenue: 18700,
    rating: 4.6
  },
  {
    id: 3,
    name: 'Awfis Cyber City',
    city: 'Delhi',
    area: 'Gurugram',
    status: 'maintenance',
    bookings: 15,
    revenue: 12000,
    rating: 4.7
  }
];

// Mock bookings
const bookings = [
  {
    id: 1,
    workspaceName: 'WeWork Galaxy',
    userName: 'Rahul Sharma',
    date: '2025-05-15',
    time: '10:00 AM - 6:00 PM',
    status: 'confirmed',
    amount: 599
  },
  {
    id: 2,
    workspaceName: 'Innov8 Vikhroli',
    userName: 'Priya Patel',
    date: '2025-05-16',
    time: '9:00 AM - 5:00 PM',
    status: 'confirmed',
    amount: 499
  },
  {
    id: 3,
    workspaceName: 'WeWork Galaxy',
    userName: 'Amit Kumar',
    date: '2025-05-18',
    time: '10:00 AM - 2:00 PM',
    status: 'pending',
    amount: 299
  },
  {
    id: 4,
    workspaceName: 'Awfis Cyber City',
    userName: 'Neha Singh',
    date: '2025-05-20',
    time: 'Full Day',
    status: 'confirmed',
    amount: 549
  },
  {
    id: 5,
    workspaceName: 'WeWork Galaxy',
    userName: 'Vikram Reddy',
    date: '2025-05-22',
    time: '2:00 PM - 6:00 PM',
    status: 'cancelled',
    amount: 199
  }
];

// Mock reviews
const reviews = [
  {
    id: 1,
    workspaceName: 'WeWork Galaxy',
    userName: 'Priya Sharma',
    date: '2025-05-15',
    rating: 5,
    comment: 'Excellent workspace with great amenities. The staff is friendly and helpful.',
    status: 'published'
  },
  {
    id: 2,
    workspaceName: 'Innov8 Vikhroli',
    userName: 'Rahul Verma',
    date: '2025-05-12',
    rating: 4,
    comment: 'Good workspace with nice facilities. The internet is fast and reliable.',
    status: 'published'
  },
  {
    id: 3,
    workspaceName: 'WeWork Galaxy',
    userName: 'Ananya Patel',
    date: '2025-05-10',
    rating: 5,
    comment: 'I love this place! The atmosphere is conducive to productivity.',
    status: 'pending'
  },
  {
    id: 4,
    workspaceName: 'Awfis Cyber City',
    userName: 'Karthik Iyer',
    date: '2025-05-09',
    rating: 3,
    comment: "Decent place but the air conditioning wasn't working properly during my visit.",
    status: 'pending'
  }
];

const AdminDashboard = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditWorkspace = (workspace: any) => {
    setSelectedWorkspace(workspace);
    setIsEditing(true);
  };

  const handleSaveWorkspace = () => {
    // In a real app, this would update the workspace in the database
    setIsEditing(false);
    setSelectedWorkspace(null);
    // Show success message
    alert('Workspace updated successfully');
  };

  const statsCards = [
    {
      title: "Total Workspaces",
      value: adminWorkspaces.length,
      icon: <Building2 className="h-8 w-8 text-brand-600" />,
      change: "+2 this month"
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: <Calendar className="h-8 w-8 text-accent-500" />,
      change: "+12 this week"
    },
    {
      title: "Active Users",
      value: 158,
      icon: <Users className="h-8 w-8 text-green-500" />,
      change: "+24 this month"
    },
    {
      title: "Average Rating",
      value: "4.6",
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      change: "+0.2 this month"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Link to="/workspaces">
              <Button size="sm">Back to Workspaces</Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <Card key={index} className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                      <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-50">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="workspaces" className="space-y-4">
            <TabsList className="bg-gray-100 p-1">
              <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="workspaces" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Workspaces</h2>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Workspace
                </Button>
              </div>
              
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Location</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Bookings</th>
                        <th className="px-6 py-3">Revenue (₹)</th>
                        <th className="px-6 py-3">Rating</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminWorkspaces.map((workspace) => (
                        <tr key={workspace.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{workspace.name}</td>
                          <td className="px-6 py-4">{workspace.area}, {workspace.city}</td>
                          <td className="px-6 py-4">
                            <Badge className={`${
                              workspace.status === 'active' ? 'bg-green-100 text-green-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {workspace.status === 'active' ? 'Active' : 'Maintenance'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">{workspace.bookings}</td>
                          <td className="px-6 py-4">{workspace.revenue.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="ml-1">{workspace.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleEditWorkspace(workspace)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              
              {isEditing && selectedWorkspace && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Edit Workspace</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Workspace Name</label>
                        <Input defaultValue={selectedWorkspace.name} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <Input defaultValue={selectedWorkspace.city} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Area</label>
                        <Input defaultValue={selectedWorkspace.area} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select className="w-full border border-gray-300 rounded-md p-2">
                          <option value="active" selected={selectedWorkspace.status === 'active'}>Active</option>
                          <option value="maintenance" selected={selectedWorkspace.status === 'maintenance'}>Maintenance</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea 
                          rows={4}
                          defaultValue="Located in the heart of the city, this workspace offers a premium coworking experience with all amenities needed for productive work."
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button onClick={handleSaveWorkspace}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="bookings">
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Workspace</th>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Time</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Amount (₹)</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{booking.id}</td>
                          <td className="px-6 py-4">{booking.workspaceName}</td>
                          <td className="px-6 py-4">{booking.userName}</td>
                          <td className="px-6 py-4">{booking.date}</td>
                          <td className="px-6 py-4">{booking.time}</td>
                          <td className="px-6 py-4">
                            <Badge className={`${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">{booking.amount}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              {booking.status === 'pending' && (
                                <>
                                  <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                                    Approve
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                    Reject
                                  </Button>
                                </>
                              )}
                              {booking.status !== 'pending' && (
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Workspace</th>
                        <th className="px-6 py-3">Rating</th>
                        <th className="px-6 py-3">Comment</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review) => (
                        <tr key={review.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{review.userName}</td>
                          <td className="px-6 py-4">{review.workspaceName}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="ml-1">{review.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 max-w-xs truncate">{review.comment}</td>
                          <td className="px-6 py-4">{review.date}</td>
                          <td className="px-6 py-4">
                            <Badge className={`${
                              review.status === 'published' ? 'bg-green-100 text-green-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              {review.status === 'pending' && (
                                <>
                                  <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                                    Approve
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                    Reject
                                  </Button>
                                </>
                              )}
                              {review.status === 'published' && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500 border-red-200 hover:bg-red-50"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
