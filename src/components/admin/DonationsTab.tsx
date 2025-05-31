
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, DollarSign, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  amount: number;
  frequency: 'one_time' | 'monthly' | 'quarterly' | 'annually';
  donation_type: string;
  payment_method: string;
  status: string;
  transaction_id: string;
  created_at: string;
}

const DonationsTab = () => {
  const { toast } = useToast();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDonations();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('donations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, () => {
        fetchDonations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch donations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getFrequencyBadge = (frequency: string) => {
    const frequencyConfig = {
      one_time: { label: 'One-time', variant: 'secondary' as const },
      monthly: { label: 'Monthly', variant: 'default' as const },
      quarterly: { label: 'Quarterly', variant: 'outline' as const },
      annually: { label: 'Annually', variant: 'destructive' as const }
    };

    const config = frequencyConfig[frequency as keyof typeof frequencyConfig] || frequencyConfig.one_time;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', variant: 'secondary' as const },
      completed: { label: 'Completed', variant: 'default' as const },
      failed: { label: 'Failed', variant: 'destructive' as const },
      refunded: { label: 'Refunded', variant: 'outline' as const }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredDonations = donations.filter(donation =>
    donation.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.donor_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.donation_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const monthlyRecurring = filteredDonations
    .filter(d => d.frequency === 'monthly' && d.status === 'completed')
    .reduce((sum, donation) => sum + donation.amount, 0);

  if (loading) {
    return <div className="flex justify-center py-8">Loading donations...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-charis-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {filteredDonations.length} donations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring</CardTitle>
            <TrendingUp className="h-4 w-4 text-charis-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyRecurring.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Per month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
            <DollarSign className="h-4 w-4 text-charis-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredDonations.length > 0 ? (totalAmount / filteredDonations.length).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Per donation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Donations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Donation Records</span>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search donations..."
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
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{donation.donor_name}</div>
                      <div className="text-sm text-gray-500">{donation.donor_email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${donation.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{donation.donation_type}</TableCell>
                  <TableCell>{getFrequencyBadge(donation.frequency)}</TableCell>
                  <TableCell>{getStatusBadge(donation.status)}</TableCell>
                  <TableCell>
                    {new Date(donation.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredDonations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No donations match your search' : 'No donations yet'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationsTab;
