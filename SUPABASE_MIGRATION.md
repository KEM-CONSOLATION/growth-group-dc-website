# Supabase Migration Guide

This guide will help you migrate from Sanity CMS to Supabase and set up the admin dashboard.

## Why Supabase?

✅ **Better for relational data** - Perfect for groups, departments, reports with relationships  
✅ **Built-in authentication** - Secure admin dashboard with user management  
✅ **Real-time capabilities** - Live updates for comments, likes, etc.  
✅ **More flexible queries** - Complex SQL queries for analytics  
✅ **Generous free tier** - 500MB database, 1GB file storage  
✅ **Full control** - Complete ownership of your data structure  

## Step 1: Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in:
   - **Name**: growth-group-website
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to your users
4. Wait for project to be created (2-3 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

## Step 3: Configure Environment Variables

1. Copy `.env.local` (or create it from `env.example`)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 4: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Open the file `supabase/schema.sql` from this project
3. Copy the entire SQL content
4. Paste it into the SQL Editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. Verify tables were created in **Table Editor**

## Step 5: Set Up Authentication

### Option A: Email/Password Authentication (Recommended)

1. Go to **Authentication** → **Providers** in Supabase dashboard
2. Enable **Email** provider
3. Configure email templates if needed
4. Create your first admin user:
   - Go to **Authentication** → **Users**
   - Click **Add User** → **Create new user**
   - Enter admin email and password
   - Set email as confirmed

### Option B: Magic Link (Passwordless)

1. Enable **Email** provider
2. Users can login with just their email (no password)

## Step 6: Set Up Storage for File Uploads

1. Go to **Storage** in Supabase dashboard
2. Create buckets (click "New bucket" for each):
   - `blog-images` - For blog post images
   - `group-photos` - For group photos
   - `activity-photos` - For activity photos
   - `audio-messages` - For audio files

3. **For each bucket, enable "Public bucket" toggle** ✅
   - This allows anyone to **read/view** files (needed for website display)
   - **Uploads and deletes are still protected** by Row Level Security (RLS)
   - Only authenticated admins can upload/delete files

4. **Optional Settings** (recommended):
   - **Restrict file size**: Enable and set limit (e.g., 10MB for images, 50MB for audio)
   - **Restrict MIME types**: 
     - Images: `image/jpeg, image/png, image/webp`
     - Audio: `audio/mpeg, audio/mp3, audio/wav`

5. **Important Security Note**:
   - Public buckets allow anyone to read files (this is intentional for public website content)
   - RLS policies will still protect upload/delete operations
   - Only authenticated admin users can upload files
   - File URLs will be publicly accessible, which is needed for displaying images on your website

## Step 6.5: Set Up Storage Bucket Policies (Important!)

After creating public buckets, you need to set up policies to protect uploads:

1. Go to **Storage** → Select a bucket (e.g., `blog-images`)
2. Click on **Policies** tab
3. Click **New Policy** for each operation

### For each bucket, create these policies:

**Policy 1: Public Read Access**
- Policy name: `Public read access`
- Allowed operation: `SELECT`
- Policy definition: `true` (allows anyone to read)

**Policy 2: Authenticated Upload**
- Policy name: `Authenticated upload`
- Allowed operation: `INSERT`
- Policy definition: `auth.role() = 'authenticated'` (only logged-in users can upload)

**Policy 3: Authenticated Update**
- Policy name: `Authenticated update`
- Allowed operation: `UPDATE`
- Policy definition: `auth.role() = 'authenticated'`

**Policy 4: Authenticated Delete**
- Policy name: `Authenticated delete`
- Allowed operation: `DELETE`
- Policy definition: `auth.role() = 'authenticated'`

**Repeat these 4 policies for all buckets:**
- `blog-images`
- `group-photos`
- `activity-photos`
- `audio-messages`

**Security Note**: 
- Public buckets allow **anyone** to read/view files (needed for website)
- Only **authenticated users** can upload/update/delete (protected by policies)
- For stricter control, you can add checks against your `admin_users` table

## Step 7: Install Dependencies

```bash
npm install @supabase/supabase-js
```

## Step 8: Update Row Level Security (RLS) Policies

The schema includes basic RLS policies. For production, you should:

1. Update admin policies to check for authenticated admin users
2. Add more granular permissions
3. Test all CRUD operations

Example admin policy update:
```sql
-- Update admin policy to check user role
DROP POLICY IF EXISTS "Admin full access to blog posts" ON blog_posts;
CREATE POLICY "Admin full access to blog posts" 
ON blog_posts FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);
```

## Step 9: Migrate Existing Data (Optional)

If you have existing data in Sanity:

1. Export data from Sanity Studio
2. Create migration scripts in `scripts/migrate-from-sanity.js`
3. Transform data to match Supabase schema
4. Import using Supabase API

## Step 10: Test the Admin Dashboard

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin/login`
3. Login with your admin credentials
4. Explore the dashboard at `/admin`

## Admin Dashboard Features

### Available Pages:
- **Dashboard** (`/admin`) - Overview and statistics
- **Blog Posts** (`/admin/blog`) - Manage blog posts
- **Events** (`/admin/events`) - Manage events
- **Groups** (`/admin/groups`) - Manage growth groups
- **Departments** (`/admin/departments`) - Manage departments
- **Weekly Reports** (`/admin/weekly-reports`) - Review and manage reports
- **Comments** (`/admin/comments`) - Moderate comments
- **Devotions** (`/admin/devotions`) - Manage devotions
- **Audio Messages** (`/admin/audio-messages`) - Manage audio content
- **Authors** (`/admin/authors`) - Manage authors
- **Categories** (`/admin/categories`) - Manage categories

## Next Steps

1. **Create Admin Pages**: Complete CRUD operations for each entity
2. **Add File Upload**: Implement Supabase Storage integration
3. **Update API Routes**: Replace Sanity API calls with Supabase
4. **Update Frontend**: Update pages to fetch from Supabase
5. **Add Analytics**: Track admin actions and user activity
6. **Set Up Backups**: Configure automatic database backups

## Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` file exists
- Verify all three variables are set
- Restart your dev server after adding variables

### "Row Level Security policy violation"
- Check RLS policies in Supabase dashboard
- Verify user authentication
- Test with service role key for admin operations

### "Storage bucket not found"
- Create buckets in Supabase Storage
- Set proper bucket policies
- Check bucket names match code

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Review Next.js + Supabase examples
3. Check project issues on GitHub

## Migration Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database schema executed
- [ ] Authentication enabled
- [ ] Storage buckets created
- [ ] Admin user created
- [ ] Dependencies installed
- [ ] Admin dashboard accessible
- [ ] RLS policies tested
- [ ] File uploads working
- [ ] Data migrated (if applicable)
- [ ] Production environment configured

---

**Note**: After migration is complete, you can remove Sanity dependencies from `package.json` if desired.

