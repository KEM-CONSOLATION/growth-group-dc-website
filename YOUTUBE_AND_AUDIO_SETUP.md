# YouTube Livestream and Audio Messages Setup Guide

## 🎥 YouTube Livestream Setup

### 1. Get Your YouTube Channel ID

1. Go to your YouTube channel
2. Right-click and "View Page Source"
3. Search for `"channelId":"` in the source code
4. Copy the channel ID (it's a long string like `UC1234567890abcdef`)

### 2. Update Configuration

Edit `src/lib/config.ts` and replace `YOUR_CHANNEL_ID` with your actual channel ID:

```typescript
youtube: {
  channelId: "UC1234567890abcdef", // Your actual channel ID
  liveStreamUrl: "https://www.youtube.com/embed/live_stream?channel=UC1234567890abcdef",
  channelUrl: "https://www.youtube.com/channel/UC1234567890abcdef",
},
```

### 3. How It Works

- The livestream will automatically appear when you go live on YouTube
- Uses YouTube's live stream embed API
- No need to manually update links - it's automatic!

## 🎵 Audio Messages Setup

### 1. Upload Audio to Google Drive

1. Upload your audio files to Google Drive
2. Right-click the file → "Share" → "Copy link"
3. Make sure the link allows "Anyone with the link can view"

### 2. Add Audio Messages in Sanity Studio

1. Go to your Sanity Studio
2. Navigate to "Audio Message" section
3. Create new audio message with:
   - Title
   - Speaker name
   - Date
   - Description
   - Google Drive link (paste the copied link)
   - Duration in minutes
   - Category (Sermon, Teaching, Testimony, etc.)
   - Tags
   - Set "Published" to true

### 3. Google Drive Link Format

The link should look like:

```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

### 4. Features Available

- **Search**: Search by title, speaker, or description
- **Filter**: Filter by category
- **Download**: Direct download from Google Drive
- **Categories**: Organize by type (Sermon, Teaching, etc.)
- **Tags**: Add relevant tags for better organization

## 🔧 Technical Details

### YouTube Livestream

- Uses `live_stream` parameter for automatic livestream detection
- Responsive iframe that works on all devices
- Automatically shows live content when available

### Audio Messages

- Stored in Sanity CMS for easy management
- Google Drive integration for file storage
- Download tracking capability (can be extended)
- Responsive grid layout
- Search and filter functionality

## 📱 Mobile Optimization

- Responsive design works on all screen sizes
- Touch-friendly download buttons
- Optimized for mobile audio consumption

## 🚀 Deployment Notes

1. Make sure your Sanity dataset is properly configured
2. Update the YouTube channel ID in production
3. Test the Google Drive links work from your domain
4. Consider setting up download analytics if needed

## 🆘 Troubleshooting

### Livestream Not Showing

- Check if your channel ID is correct
- Ensure you're actually live on YouTube
- Check browser console for errors

### Audio Downloads Not Working

- Verify Google Drive sharing permissions
- Check if the link format is correct
- Test the link in an incognito window

### Sanity Issues

- Check your environment variables
- Verify the audioMessage schema is deployed
- Check Sanity Studio for any validation errors

## 📞 Support

If you need help with setup, check:

1. YouTube API documentation
2. Sanity documentation
3. Google Drive sharing settings
4. Browser console for error messages
