-- Migration to add content and images support to articles table
-- This allows storing full article content directly in the database

-- Add new columns to articles table
ALTER TABLE public.articles 
ADD COLUMN content TEXT,
ADD COLUMN author TEXT,
ADD COLUMN featured_image TEXT,
ADD COLUMN images TEXT[], -- Array of image URLs/paths
ADD COLUMN slug TEXT UNIQUE;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);

-- Update the url column to be nullable since internal articles won't need external URLs
ALTER TABLE public.articles 
ALTER COLUMN url DROP NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.articles.content IS 'Full HTML/markdown content of the article';
COMMENT ON COLUMN public.articles.images IS 'Array of image paths for gallery/content';
COMMENT ON COLUMN public.articles.slug IS 'URL-friendly unique identifier for the article';
COMMENT ON COLUMN public.articles.author IS 'Author or contributor name';
COMMENT ON COLUMN public.articles.featured_image IS 'Main image to display in article cards';



