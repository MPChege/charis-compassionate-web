
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Heart, 
  Handshake, 
  MessageSquare, 
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import VolunteerApplicationsTab from '@/components/admin/VolunteerApplicationsTab';
import DonationsTab from '@/components/admin/DonationsTab';
import PartnershipsTab from '@/components/admin/PartnershipsTab';
import InquiriesTab from '@/components/admin/InquiriesTab';

const AdminDashboard = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const [stats, setStats] = useState({
    volunteers: { total: 0, pending: 0, approved: 0 },
    donations: { total: 0, amount: 0 },
    partnerships: { total: 0, pending: 0 },
    inquiries: { total: 0, pending: 0 }
  });

  // Redirect if not admin
  if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    if (user && isAdmin) {
      fetchStats();
      setupRealtimeSubscriptions();
    }
  }, [user, isAdmin]);

  const fetchStats = async () => {
    try {
      // Fetch volunteer stats
      const { data: volunteers } = await supabase
        .from('volunteer_applications')
        .select('status');
      
      // Fetch donation stats
      const { data: donations } = await supabase
        .from('donations')
        .select('amount, status');
      
      // Fetch partnership stats
      const { data: partnerships } = await supabase
        .from('partnership_inquiries')
        .select('status');
      
      // Fetch inquiry stats
      const { data: inquiries } = await supabase
        .from('general_inquiries')
        .select('status');

      setStats({
        volunteers: {
          total: volunteers?.length || 0,
          pending: volunteers?.filter(v => v.status === 'pending').length || 0,
          approved: volunteers?.filter(v => v.status === 'approved').length || 0
        },
        donations: {
          total: donations?.length || 0,
          amount: donations?.reduce((sum, d) => sum + parseFloat(String(d.amount || '0')), 0) || 0
        },
        partnerships: {
          total: partnerships?.length || 0,
          pending: partnerships?.filter(p => p.status === 'pending').length || 0
        },
        inquiries: {
          total: inquiries?.length || 0,
          pending: inquiries?.filter(i => i.status === 'pending').length || 0
        }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const setupRealtimeSubscriptions = () => {
    const channel = supabase
      .channel('admin-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'volunteer_applications' }, () => {
        fetchStats();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, () => {
        fetchStats();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'partnership_inquiries' }, () => {
        fetchStats();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'general_inquiries' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charis-blue mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-charis-blue-dark">Admin Dashboard</h1>
            <p className="text-gray-600">Charis Eagles Springs</p>
          </div>
          <Button 
            onClick={signOut}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volunteer Applications</CardTitle>
              <Users className="h-4 w-4 text-charis-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.volunteers.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.volunteers.pending} pending • {stats.volunteers.approved} approved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donations</CardTitle>
              <Heart className="h-4 w-4 text-charis-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.donations.amount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.donations.total} total donations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partnerships</CardTitle>
              <Handshake className="h-4 w-4 text-charis-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.partnerships.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.partnerships.pending} pending review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">General Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-charis-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inquiries.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.inquiries.pending} pending response
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="volunteers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="volunteers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Volunteers
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="partnerships" className="flex items-center gap-2">
              <Handshake className="h-4 w-4" />
              Partnerships
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="volunteers">
            <VolunteerApplicationsTab />
          </TabsContent>

          <TabsContent value="donations">
            <DonationsTab />
          </TabsContent>

          <TabsContent value="partnerships">
            <PartnershipsTab />
          </TabsContent>

          <TabsContent value="inquiries">
            <InquiriesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
