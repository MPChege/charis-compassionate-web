# 🔧 Fix: Add Article to Awareness Hub

## The Problem
The article isn't showing because it hasn't been added to your database yet.

## ✅ Quick Fix (2 minutes)

### Step 1: Open Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Sign in to your account
3. Select your **Charis Eagle Springs** project

### Step 2: Run SQL Script
1. Click **"SQL Editor"** in the left sidebar
2. Click **"New Query"** button
3. Copy and paste this code:

```sql
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
```

4. Click **"Run"** button (or press Ctrl+Enter)

### Step 3: Verify It Worked
1. You should see "Success. No rows returned" message
2. Go to your website: http://localhost:8080/awareness-hub
3. You should now see the IFA Conference article!

## 🔍 Troubleshooting

### If you get an error:
- Make sure you're in the correct project
- Check that the articles table exists
- Try running the script again

### If the article still doesn't appear:
1. **Refresh your browser** (Ctrl+F5 or Cmd+Shift+R)
2. **Check the browser console** for errors (F12)
3. **Verify the SQL ran successfully** in Supabase

### If you need to check what's in your database:
Run this in Supabase SQL Editor:
```sql
SELECT title, category, date FROM articles ORDER BY created_at DESC;
```

## 📱 What You Should See

After running the SQL:
- **Awareness Hub page** will show the IFA Conference article
- **Article card** with title, excerpt, and "Read More" button
- **"Read More" button** will take users to the Gallery page
- **Gallery page** will show all 10 IFA Conference photos

## 🎯 Next Steps

Once the article appears:
1. **Test the flow**: Click "Read More" → Should go to Gallery
2. **Check Gallery**: Filter by "International Conferences" → Should see 10 photos
3. **Share the links**: Both pages will be ready for your audience

---

**Need help?** The most common issue is simply not running the SQL script yet. Once you run it, everything will work perfectly! 🚀


