# IFA Conference Article Setup Guide

This guide will help you add the IFA Conference article and images to your Charis Eagle Springs website.

## What's Been Done

✅ Created database migration to add new fields to articles table
✅ Created ArticleDetail page component for full article viewing
✅ Updated routing to support article detail pages
✅ Updated AwarenessHub to link to internal articles
✅ Updated TypeScript types for the new schema
✅ Prepared SQL scripts for database updates

## What You Need to Do

### Step 1: Apply Database Migration

You need to run the SQL migration in your Supabase dashboard to add the new columns to the articles table.

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `Charis Eagle Springs` (mmbyxjjwxxgjxdddosbp)
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy and paste the contents of `apply_migration.sql` into the editor
6. Click "Run" or press Cmd/Ctrl + Enter

**File to run:** `apply_migration.sql`

### Step 2: Add IFA Conference Article

After the migration is successful, add the article data:

1. Stay in the SQL Editor
2. Click "New Query"
3. Copy and paste the contents of `add_ifa_article.sql` into the editor
4. Click "Run" or press Cmd/Ctrl + Enter

**File to run:** `add_ifa_article.sql`

### Step 3: Verify the Article

1. Start your development server: `npm run dev`
2. Navigate to `/awareness-hub`
3. You should see the IFA Conference article with the featured image
4. Click "Read More" to view the full article with the photo gallery

## New Features

### For Users
- **Full Article View**: Users can now read complete articles on your website
- **Photo Galleries**: Articles can include multiple images in a beautiful gallery
- **Better Navigation**: Clear "Read More" buttons for internal articles
- **Featured Images**: Eye-catching images on article cards
- **Author Attribution**: Articles show author information

### For Admins
When adding new articles through the database, you can now include:
- `content`: Full article text (supports paragraphs separated by double newlines)
- `author`: Author name
- `slug`: URL-friendly unique identifier (e.g., "my-article-title")
- `featured_image`: Main image for the card view
- `images`: Array of image paths for the gallery
- `url`: Optional external link (for articles hosted elsewhere)

## Article Structure

The IFA Conference article includes:
- **Title**: "Insights from the International Federation on Ageing Global Conference in Cape Town"
- **Slug**: `ifa-global-conference-cape-town-2025` (used in URL: `/article/ifa-global-conference-cape-town-2025`)
- **Category**: "International Conferences"
- **Author**: "Mrs. Margaret Njagi"
- **Date**: September 12, 2025
- **Read Time**: 5 min read
- **Featured Image**: Professional conference photo
- **Gallery**: 10 conference photos from the event

## Image Paths

All conference images are stored in `/public/IFA Conference Capetown/` and are properly referenced in the article.

## Troubleshooting

### If the article doesn't appear:
1. Check that both SQL files ran successfully without errors
2. Verify the images exist in `/public/IFA Conference Capetown/`
3. Clear your browser cache and refresh
4. Check the browser console for any errors

### If images don't load:
1. Verify the image files are in the correct folder
2. Check that the file names match exactly (case-sensitive)
3. Try accessing an image directly (e.g., `http://localhost:5173/IFA Conference Capetown/755b1307-289e-4d44-bd26-df709ea90f7e.jpg`)

### If you get SQL errors:
- Make sure you run `apply_migration.sql` first, then `add_ifa_article.sql`
- Check that your Supabase connection is active
- Verify you're running the queries in the correct project

## Next Steps

After successfully adding the IFA article, you can:
1. Add more articles following the same pattern
2. Update the article content through the Supabase dashboard
3. Add more conference photos if available
4. Share the article link: `https://chariseaglesprings.org/article/ifa-global-conference-cape-town-2025`

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the Supabase logs in the dashboard
3. Verify all file paths are correct
4. Ensure your development server is running

---

**Created**: October 28, 2025
**Last Updated**: October 28, 2025



