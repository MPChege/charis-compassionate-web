# 🚀 Quick Start: Adding the IFA Conference Article

## Steps to Complete (5 minutes)

### 1️⃣ Open Supabase Dashboard
- Go to: https://supabase.com/dashboard
- Select project: **Charis Eagle Springs**

### 2️⃣ Run Migration (SQL Editor)
1. Click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy-paste contents from: `apply_migration.sql`
4. Click **Run** ▶️

### 3️⃣ Add Article (SQL Editor)
1. Click **New Query** again
2. Copy-paste contents from: `add_ifa_article.sql`
3. Click **Run** ▶️

### 4️⃣ View Your Article
```bash
npm run dev
```
Then visit: http://localhost:5173/awareness-hub

## ✅ What You'll See

- IFA Conference article card with featured image
- Click "Read More" → Full article with photo gallery
- 10 conference photos in a beautiful grid
- Professional article layout with proper formatting

## 📁 Files Ready

- ✅ Images: `/public/IFA Conference Capetown/` (10 photos)
- ✅ SQL Scripts: `apply_migration.sql` & `add_ifa_article.sql`
- ✅ Components: ArticleDetail page created
- ✅ Routing: `/article/:slug` route added
- ✅ Types: Database types updated

## 🎯 Article URL

Once live: `https://chariseaglesprings.org/article/ifa-global-conference-cape-town-2025`

---

**Need help?** Check `IFA_ARTICLE_SETUP.md` for detailed instructions.



