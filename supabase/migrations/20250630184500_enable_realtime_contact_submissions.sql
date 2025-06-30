
-- Enable realtime for contact_submissions table
ALTER TABLE public.contact_submissions REPLICA IDENTITY FULL;

-- Add table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_submissions;
