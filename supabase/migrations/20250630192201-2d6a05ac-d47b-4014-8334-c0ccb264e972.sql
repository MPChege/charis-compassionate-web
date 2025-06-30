
-- Enable realtime for articles table
ALTER TABLE public.articles REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.articles;

-- Enable realtime for events table
ALTER TABLE public.events REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;

-- Enable realtime for profiles table
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;

-- Enable realtime for resources table
ALTER TABLE public.resources REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.resources;
