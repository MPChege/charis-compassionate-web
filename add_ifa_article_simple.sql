-- Simple script to add IFA Conference article
-- This works with the existing articles table structure

INSERT INTO public.articles (
  title,
  category,
  excerpt,
  date,
  read_time,
  source,
  url
) VALUES (
  'Insights from the International Federation on Ageing Global Conference in Cape Town',
  'International Conferences',
  'Mrs. Margaret Njagi, Director of Charis Eagle Springs, shares insights from the IFA Global Conference in Cape Town focused on shaping an inclusive, healthy, and empowered future for all generations.',
  '2025-09-12',
  '5 min read',
  'Charis Eagle Springs',
  'https://chariseaglesprings.org/gallery'
)
ON CONFLICT (title) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  excerpt = EXCLUDED.excerpt,
  date = EXCLUDED.date,
  read_time = EXCLUDED.read_time,
  source = EXCLUDED.source,
  url = EXCLUDED.url,
  updated_at = now();


