
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseRealtimeTableOptions {
  table: string;
  onInsert?: (payload: any) => void;
  onUpdate?: (payload: any) => void;
  onDelete?: (payload: any) => void;
  showNotifications?: boolean;
}

export const useRealtimeTable = (options: UseRealtimeTableOptions) => {
  const { toast } = useToast();
  const { table, onInsert, onUpdate, onDelete, showNotifications = false } = options;

  useEffect(() => {
    const channel = supabase
      .channel(`${table}_realtime`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table 
      }, (payload) => {
        console.log(`New ${table} record:`, payload);
        onInsert?.(payload);
        
        if (showNotifications) {
          toast({
            title: `New ${table.charAt(0).toUpperCase() + table.slice(1)}`,
            description: `A new ${table.slice(0, -1)} has been added`,
            variant: "default",
          });
        }
      })
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table 
      }, (payload) => {
        console.log(`Updated ${table} record:`, payload);
        onUpdate?.(payload);
      })
      .on('postgres_changes', { 
        event: 'DELETE', 
        schema: 'public', 
        table 
      }, (payload) => {
        console.log(`Deleted ${table} record:`, payload);
        onDelete?.(payload);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, onInsert, onUpdate, onDelete, showNotifications, toast]);
};
