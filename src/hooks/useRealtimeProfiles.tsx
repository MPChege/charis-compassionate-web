
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export const useRealtimeProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user profiles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();

    // Set up real-time subscription
    const channel = supabase
      .channel('profiles_realtime')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'profiles' 
      }, (payload) => {
        console.log('New profile:', payload);
        setProfiles(prev => [payload.new as Profile, ...prev]);
        
        toast({
          title: "New User Registered",
          description: `${payload.new.email} has joined the platform`,
          variant: "default",
        });
      })
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'profiles' 
      }, (payload) => {
        console.log('Updated profile:', payload);
        setProfiles(prev => 
          prev.map(profile => 
            profile.id === payload.old.id 
              ? { ...profile, ...payload.new } 
              : profile
          )
        );
      })
      .on('postgres_changes', { 
        event: 'DELETE', 
        schema: 'public', 
        table: 'profiles' 
      }, (payload) => {
        console.log('Deleted profile:', payload);
        setProfiles(prev => 
          prev.filter(profile => profile.id !== payload.old.id)
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return { profiles, loading, refetch: fetchProfiles };
};
