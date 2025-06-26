
-- Create a table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_by UUID NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE NULL,
  notes TEXT NULL
);

-- Add Row Level Security (RLS) - making it public for contact form submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact submissions (public contact form)
CREATE POLICY "Anyone can submit contact forms" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Only authenticated users (admins) can view contact submissions
CREATE POLICY "Only authenticated users can view contact submissions" 
  ON public.contact_submissions 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Only authenticated users (admins) can update contact submissions
CREATE POLICY "Only authenticated users can update contact submissions" 
  ON public.contact_submissions 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Enable realtime for contact submissions
ALTER TABLE public.contact_submissions REPLICA IDENTITY FULL;
