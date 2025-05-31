
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
import { Search, Eye, CheckCircle, XCircle, Clock, Phone, Mail, Building } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type ApplicationStatus = Database['public']['Enums']['application_status'];

interface Partnership {
  id: string;
  organization_name: string;
  contact_person: string;
  email: string;
  phone: string;
  organization_type: string;
  partnership_type: string;
  description: string;
  proposed_collaboration: string;
  resources_offered: string;
  status: ApplicationStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

const PartnershipsTab = () => {
  const { toast } = useToast();
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null);

  useEffect(() => {
    fetchPartnerships();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('partnerships')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'partnership_inquiries' }, () => {
        fetchPartnerships();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPartnerships = async () => {
    try {
      const { data, error } = await supabase
        .from('partnership_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPartnerships(data || []);
    } catch (error) {
      console.error('Error fetching partnerships:', error);
      toast({
        title: "Error",
        description: "Failed to fetch partnership inquiries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePartnershipStatus = async (id: string, status: ApplicationStatus, notes?: string) => {
    try {
      const { error } = await supabase
        .from('partnership_inquiries')
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
        description: `Partnership inquiry ${status} successfully`,
      });
      
      setSelectedPartnership(null);
    } catch (error) {
      console.error('Error updating partnership:', error);
      toast({
        title: "Error",
        description: "Failed to update partnership inquiry",
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

  const filteredPartnerships = partnerships.filter(partnership =>
    partnership.organization_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partnership.partnership_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center py-8">Loading partnerships...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Partnership Inquiries</span>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search partnerships..."
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
              <TableHead>Organization</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Partnership Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPartnerships.map((partnership) => (
              <TableRow key={partnership.id}>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      <Building className="h-4 w-4 text-gray-400" />
                      {partnership.organization_name}
                    </div>
                    <div className="text-sm text-gray-500">{partnership.organization_type}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{partnership.contact_person}</div>
                    <div className="text-sm text-gray-500">{partnership.email}</div>
                  </div>
                </TableCell>
                <TableCell>{partnership.partnership_type || 'General'}</TableCell>
                <TableCell>{getStatusBadge(partnership.status)}</TableCell>
                <TableCell>
                  {new Date(partnership.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedPartnership(partnership)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      {selectedPartnership && (
                        <>
                          <DialogHeader>
                            <DialogTitle>Partnership Inquiry Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Organization</label>
                                <p className="text-sm text-gray-600">{selectedPartnership.organization_name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Organization Type</label>
                                <p className="text-sm text-gray-600">{selectedPartnership.organization_type}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Contact Person</label>
                                <p className="text-sm text-gray-600">{selectedPartnership.contact_person}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Email</label>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {selectedPartnership.email}
                                </p>
                              </div>
                            </div>

                            {selectedPartnership.phone && (
                              <div>
                                <label className="text-sm font-medium">Phone</label>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {selectedPartnership.phone}
                                </p>
                              </div>
                            )}

                            <div>
                              <label className="text-sm font-medium">Partnership Type</label>
                              <p className="text-sm text-gray-600">{selectedPartnership.partnership_type}</p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Organization Description</label>
                              <p className="text-sm text-gray-600">{selectedPartnership.description}</p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Proposed Collaboration</label>
                              <p className="text-sm text-gray-600">{selectedPartnership.proposed_collaboration}</p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Resources Offered</label>
                              <p className="text-sm text-gray-600">{selectedPartnership.resources_offered}</p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Current Status</label>
                              <div className="mt-1">{getStatusBadge(selectedPartnership.status)}</div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Admin Notes</label>
                              <Textarea
                                placeholder="Add notes about this partnership inquiry..."
                                value={selectedPartnership.notes || ''}
                                onChange={(e) => setSelectedPartnership({
                                  ...selectedPartnership,
                                  notes: e.target.value
                                })}
                              />
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button
                                onClick={() => updatePartnershipStatus(selectedPartnership.id, 'approved', selectedPartnership.notes)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                onClick={() => updatePartnershipStatus(selectedPartnership.id, 'contacted', selectedPartnership.notes)}
                                variant="outline"
                              >
                                <Phone className="h-4 w-4 mr-1" />
                                Mark as Contacted
                              </Button>
                              <Button
                                onClick={() => updatePartnershipStatus(selectedPartnership.id, 'rejected', selectedPartnership.notes)}
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

        {filteredPartnerships.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No partnership inquiries match your search' : 'No partnership inquiries yet'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PartnershipsTab;
