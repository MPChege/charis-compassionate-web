-- First Facebook post on the Awareness Hub
INSERT INTO public.facebook_posts (post_url, caption)
SELECT 'https://www.facebook.com/permalink.php?story_fbid=pfbid02GfW4GqB1X7VYDHgNvFL9N62QoBjcDNKgcsLRTXyu3k8PMa9hvY6MrAQ6Y1oryXE3l&id=61577716952299', 'First post'
WHERE NOT EXISTS (
  SELECT 1 FROM public.facebook_posts
  WHERE post_url = 'https://www.facebook.com/permalink.php?story_fbid=pfbid02GfW4GqB1X7VYDHgNvFL9N62QoBjcDNKgcsLRTXyu3k8PMa9hvY6MrAQ6Y1oryXE3l&id=61577716952299'
);
