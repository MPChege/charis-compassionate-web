
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Search, Eye, CheckCircle, XCircle, Clock, Phone, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type ApplicationStatus = Database['public']['Enums']['application_status'];

interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  availability: string;
  experience: string;
  motivation: string;
  volunteer_areas: string[];
  status: ApplicationStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

const VolunteerApplicationsTab = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<VolunteerApplication | null>(null);

  useEffect(() => {
    fetchApplications();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('volunteer-applications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'volunteer_applications' }, () => {
        fetchApplications();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('volunteer_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch volunteer applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: ApplicationStatus, notes?: string) => {
    try {
      const { error } = await supabase
        .from('volunteer_applications')
        .update({ 
          status, 
          notes: notes || '',
          updated_at: new Date().toISOString(),
          reviewed_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Application ${status} successfully`,
      });
      
      setSelectedApplication(null);
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    const statusConfig = {
      pending: { label: 'Pending', variant: 'secondary' as const, icon: Clock },
      approved: { label: 'Approved', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: 'Rejected', variant: 'destructive' as const, icon: XCircle },
      contacted: { label: 'Contacted', variant: 'outline' as const, icon: Phone }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.volunteer_areas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div className="flex justify-center py-8">Loading applications...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Volunteer Applications</span>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Areas of Interest</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.name}</TableCell>
                <TableCell>{application.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {application.volunteer_areas.slice(0, 2).map((area, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                    {application.volunteer_areas.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{application.volunteer_areas.length - 2} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell>
                  {new Date(application.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedApplication(application)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      {selectedApplication && (
                        <>
                          <DialogHeader>
                            <DialogTitle>Volunteer Application Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Name</label>
                                <p className="text-sm text-gray-600">{selectedApplication.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Email</label>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {selectedApplication.email}
                                </p>
                              </div>
                            </div>

                            {selectedApplication.phone && (
                              <div>
                                <label className="text-sm font-medium">Phone</label>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {selectedApplication.phone}
                                </p>
                              </div>
                            )}

                            <div>
                              <label className="text-sm font-medium">Volunteer Areas</label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {selectedApplication.volunteer_areas.map((area, index) => (
                                  <Badge key={index} variant="secondary">
                                    {area}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Availability</label>
                              <p className="text-sm text-gray-600">{selectedApplication.availability}</p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Experience</label>
                              <p className="text-sm text-gray-600">{selectedApplication.experience}</p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Motivation</label>
                              <p className="text-sm text-gray-600">{selectedApplication.motivation}</p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Current Status</label>
                              <div className="mt-1">{getStatusBadge(selectedApplication.status)}</div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Admin Notes</label>
                              <Textarea
                                placeholder="Add notes about this application..."
                                value={selectedApplication.notes || ''}
                                onChange={(e) => setSelectedApplication({
                                  ...selectedApplication,
                                  notes: e.target.value
                                })}
                              />
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'approved', selectedApplication.notes)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'contacted', selectedApplication.notes)}
                                variant="outline"
                              >
                                <Phone className="h-4 w-4 mr-1" />
                                Mark as Contacted
                              </Button>
                              <Button
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected', selectedApplication.notes)}
                                variant="destructive"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredApplications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No applications match your search' : 'No volunteer applications yet'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VolunteerApplicationsTab;
