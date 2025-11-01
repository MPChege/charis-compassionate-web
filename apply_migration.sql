-- Migration to add content and images support to articles table
-- This allows storing full article content directly in the database

-- Add new columns to articles table
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS content TEXT,
ADD COLUMN IF NOT EXISTS author TEXT,
ADD COLUMN IF NOT EXISTS featured_image TEXT,
ADD COLUMN IF NOT EXISTS images TEXT[], -- Array of image URLs/paths
ADD COLUMN IF NOT EXISTS slug TEXT;

-- Add unique constraint to slug if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'articles_slug_key'
    ) THEN
        ALTER TABLE public.articles ADD CONSTRAINT articles_slug_key UNIQUE (slug);
    END IF;
END $$;

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



