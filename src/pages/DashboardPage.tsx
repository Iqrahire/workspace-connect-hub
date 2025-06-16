
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  BarChart3, 
  Users, 
  Calendar,
  MapPin,
  Eye,
  Edit,
  Trash2,
  IndianRupee,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import AddWorkspaceDialog from '@/components/AddWorkspaceDialog';

interface DashboardWorkspace {
  id: string;
  name: string;
  city: string;
  area: string;
  price_per_day: number;
  images: string[] | null;
  is_premium: boolean | null;
  review_count: number | null;
}

interface DashboardBooking {
  id: string;
  workspace_id: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: string;
  created_at: string;
}

const DashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Fetch user's workspaces with simplified typing
  const fetchWorkspaces = async () => {
    if (!user) return [] as DashboardWorkspace[];
    
    const { data, error } = await supabase
      .from('workspaces')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching workspaces:', error);
      throw error;
    }
    
    return (data || []) as DashboardWorkspace[];
  };

  const workspacesQuery = useQuery({
    queryKey: ['user-workspaces', user?.id],
    queryFn: fetchWorkspaces,
    enabled: !!user,
  });

  const workspaces = workspacesQuery.data || [];
  const workspacesLoading = workspacesQuery.isLoading;
  const refetch = workspacesQuery.refetch;

  // Fetch bookings for user's workspaces with simplified typing
  const fetchBookings = async () => {
    if (!user || workspaces.length === 0) return [] as DashboardBooking[];
    
    const workspaceIds = workspaces.map(w => w.id);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .in('workspace_id', workspaceIds)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
    
    return (data || []) as DashboardBooking[];
  };

  const bookingsQuery = useQuery({
    queryKey: ['workspace-bookings', user?.id, workspaces.length],
    queryFn: fetchBookings,
    enabled: !!user && workspaces.length > 0,
  });

  const bookings = bookingsQuery.data || [];

  // Calculate analytics
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.total_amount, 0);
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const totalViews = workspaces.reduce((sum, workspace) => sum + (workspace.review_count || 0), 0);

  const handleDeleteWorkspace = async (workspaceId: string) => {
    try {
      const { error } = await supabase
        .from('workspaces')
        .delete()
        .eq('id', workspaceId);

      if (error) throw error;
      
      toast.success('Workspace deleted successfully');
      refetch();
    } catch (error) {
      console.error('Error deleting workspace:', error);
      toast.error('Failed to delete workspace');
    }
  };

  if (authLoading || workspacesLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Manage your workspaces and bookings</p>
            </div>
            <Button onClick={() => setShowAddDialog(true)} className="mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Workspace
            </Button>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  From {bookings.length} bookings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Workspaces</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{workspaces.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active listings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingBookings}</div>
                <p className="text-xs text-muted-foreground">
                  Need attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalViews}</div>
                <p className="text-xs text-muted-foreground">
                  Workspace views
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="workspaces" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="workspaces">
                <MapPin className="h-4 w-4 mr-2" />
                My Workspaces
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <Calendar className="h-4 w-4 mr-2" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workspaces" className="space-y-6">
              {workspaces.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workspaces.map((workspace) => (
                    <Card key={workspace.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={workspace.images?.[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'}
                          alt={workspace.name}
                          className="w-full h-full object-cover"
                        />
                        {workspace.is_premium && (
                          <Badge className="absolute top-2 left-2">Premium</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{workspace.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {workspace.area}, {workspace.city}
                        </p>
                        <p className="text-lg font-bold text-primary mb-4">
                          ₹{workspace.price_per_day}/day
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteWorkspace(workspace.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No workspaces yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first workspace listing to get started
                  </p>
                  <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Workspace
                  </Button>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => {
                    const workspace = workspaces.find(w => w.id === booking.workspace_id);
                    return (
                      <Card key={booking.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{workspace?.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                            </p>
                            <p className="text-sm">₹{booking.total_amount}</p>
                          </div>
                          <Badge variant={
                            booking.status === 'confirmed' ? 'default' : 
                            booking.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {booking.status}
                          </Badge>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground">
                    Bookings for your workspaces will appear here
                  </p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{confirmedBookings}</div>
                    <div className="text-sm text-muted-foreground">Confirmed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{pendingBookings}</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {bookings.length > 0 ? Math.round((confirmedBookings / bookings.length) * 100) : 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg. Booking</div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      <AddWorkspaceDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onSuccess={() => {
          setShowAddDialog(false);
          refetch();
        }}
      />
    </div>
  );
};

export default DashboardPage;
