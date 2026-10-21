-- Facebook posts shown on the website's Awareness Hub.
-- Admins paste links to public posts; the site renders them with Facebook's
-- embedded post plugin (no Graph API, Page or access token needed).
CREATE TABLE IF NOT EXISTS public.facebook_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_url text NOT NULL,
  caption text,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid,
  -- Only Facebook links can ever be stored, whoever writes the row
  CONSTRAINT facebook_posts_url_is_facebook
    CHECK (post_url ~* '^https://(www\.|m\.|web\.)?(facebook\.com|fb\.watch)/')
);

ALTER TABLE public.facebook_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view facebook posts" ON public.facebook_posts;
DROP POLICY IF EXISTS "Admins can add facebook posts" ON public.facebook_posts;
DROP POLICY IF EXISTS "Admins can update facebook posts" ON public.facebook_posts;
DROP POLICY IF EXISTS "Admins can delete facebook posts" ON public.facebook_posts;

CREATE POLICY "Anyone can view facebook posts"
  ON public.facebook_posts FOR SELECT
  USING (true);

-- The admin app (charis-admin-compass) signs in through the admin-auth edge
-- function and writes with the anon key, matching the articles/events tables.
CREATE POLICY "Admins can add facebook posts"
  ON public.facebook_posts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update facebook posts"
  ON public.facebook_posts FOR UPDATE
  TO anon, authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Admins can delete facebook posts"
  ON public.facebook_posts FOR DELETE
  TO anon, authenticated
  USING (true);

-- Broadcast changes so the website updates the moment a post is added or removed
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'facebook_posts'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.facebook_posts;
  END IF;
END $$;
