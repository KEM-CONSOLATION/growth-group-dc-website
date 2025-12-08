-- Storage Bucket Policies for Growth Group Website
-- Run this in Supabase SQL Editor after creating your buckets

-- ============================================
-- BLOG-IMAGES BUCKET POLICIES
-- ============================================

-- Public read access for blog-images
CREATE POLICY "Public read access blog-images" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'blog-images');

-- Authenticated upload for blog-images
CREATE POLICY "Authenticated upload blog-images" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'blog-images');

-- Authenticated update for blog-images
CREATE POLICY "Authenticated update blog-images" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'blog-images');

-- Authenticated delete for blog-images
CREATE POLICY "Authenticated delete blog-images" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'blog-images');

-- ============================================
-- GROUP-PHOTOS BUCKET POLICIES
-- ============================================

-- Public read access for group-photos
CREATE POLICY "Public read access group-photos" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'group-photos');

-- Authenticated upload for group-photos
CREATE POLICY "Authenticated upload group-photos" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'group-photos');

-- Authenticated update for group-photos
CREATE POLICY "Authenticated update group-photos" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'group-photos');

-- Authenticated delete for group-photos
CREATE POLICY "Authenticated delete group-photos" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'group-photos');

-- ============================================
-- ACTIVITY-PHOTOS BUCKET POLICIES
-- ============================================

-- Public read access for activity-photos
CREATE POLICY "Public read access activity-photos" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'activity-photos');

-- Authenticated upload for activity-photos
CREATE POLICY "Authenticated upload activity-photos" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'activity-photos');

-- Authenticated update for activity-photos
CREATE POLICY "Authenticated update activity-photos" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'activity-photos');

-- Authenticated delete for activity-photos
CREATE POLICY "Authenticated delete activity-photos" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'activity-photos');

-- ============================================
-- AUDIO-MESSAGES BUCKET POLICIES
-- ============================================

-- Public read access for audio-messages
CREATE POLICY "Public read access audio-messages" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'audio-messages');

-- Authenticated upload for audio-messages
CREATE POLICY "Authenticated upload audio-messages" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'audio-messages');

-- Authenticated update for audio-messages
CREATE POLICY "Authenticated update audio-messages" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'audio-messages');

-- Authenticated delete for audio-messages
CREATE POLICY "Authenticated delete audio-messages" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'audio-messages');

