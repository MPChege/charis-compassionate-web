
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

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'contacted';
  notes: string;
  created_at: string;
  updated_at: string;
}

const InquiriesTab = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('inquiries')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'general_inquiries' }, () => {
        fetchInquiries();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('general_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch general inquiries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id: string, status: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('general_inquiries')
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
        description: `Inquiry ${status} successfully`,
      });
      
      setSelectedInquiry(null);
    } catch (error) {
      console.error('Error updating inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to update inquiry",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', variant: 'secondary' as const, icon: Clock },
      approved: { label: 'Responded', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: 'Closed', variant: 'destructive' as const, icon: XCircle },
      contacted: { label: 'Contacted', variant: 'outline' as const, icon: Phone }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.interest?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center py-8">Loading inquiries...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>General Inquiries</span>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search inquiries..."
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
              <TableHead>Interest</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="font-medium">{inquiry.name}</TableCell>
                <TableCell>{inquiry.email}</TableCell>
                <TableCell>{inquiry.interest || 'General'}</TableCell>
                <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                <TableCell>
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      {selectedInquiry && (
                        <>
                          <DialogHeader>
                            <DialogTitle>General Inquiry Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Name</label>
                                <p className="text-sm text-gray-600">{selectedInquiry.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Email</label>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {selectedInquiry.email}
                                </p>
                              </div>
                            </div>

                            {selectedInquiry.phone && (
                              <div>
                                <label className="text-sm font-medium">Phone</label>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {selectedInquiry.phone}
                                </p>
                              </div>
                            )}

                            <div>
                              <label className="text-sm font-medium">Area of Interest</label>
                              <p className="text-sm text-gray-600">{selectedInquiry.interest || 'General inquiry'}</p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Message</label>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border">
                                {selectedInquiry.message || 'No message provided'}
                              </p>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Current Status</label>
                              <div className="mt-1">{getStatusBadge(selectedInquiry.status)}</div>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Admin Notes</label>
                              <Textarea
                                placeholder="Add notes about this inquiry..."
                                value={selectedInquiry.notes || ''}
                                onChange={(e) => setSelectedInquiry({
                                  ...selectedInquiry,
                                  notes: e.target.value
                                })}
                              />
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button
                                onClick={() => updateInquiryStatus(selectedInquiry.id, 'approved', selectedInquiry.notes)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark as Responded
                              </Button>
                              <Button
                                onClick={() => updateInquiryStatus(selectedInquiry.id, 'contacted', selectedInquiry.notes)}
                                variant="outline"
                              >
                                <Phone className="h-4 w-4 mr-1" />
                                Mark as Contacted
                              </Button>
                              <Button
                                onClick={() => updateInquiryStatus(selectedInquiry.id, 'rejected', selectedInquiry.notes)}
                                variant="destructive"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Close
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

        {filteredInquiries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No inquiries match your search' : 'No general inquiries yet'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InquiriesTab;
