# 🚀 Complete Setup Guide

This guide will help you set up your Growth Group Website with Sanity CMS.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Sanity project created at [sanity.io](https://sanity.io)

## 🔧 Step-by-Step Setup

### 1. Environment Configuration

Create a `.env.local` file in your project root:

```bash
# Copy from env.local.template
cp env.local.template .env.local
```

Your `.env.local` should contain:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=kgfvpijk
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sktJ6IC72KWQciJ2URSwGBb7WPRq5XQzPpFSkzEbrobWsHCPVb69EyVclsHEjvfwLyyCHrIJ3iXoOkdEgy9G5F2ngLM2dELQRK4WqrfLFfNaXVAptHGF0MUmtGCUDwJ2SOlr9WMbkdPQ1c89Ou9TtAZ5ODQixZ1lkdv7D04xhQ5z8sP4rnje
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Test Sanity Connection

```bash
npm run setup
```

This will test if your Sanity connection is working.

### 4. Test All GROQ Queries

```bash
npm run test:queries
```

This will test all the database queries to ensure they work correctly.

### 5. Start Sanity Studio

```bash
npm run studio
```

Visit `http://localhost:3333` to access your Sanity Studio.

### 6. Seed Your Database

```bash
# Seed all data at once
npm run seed:all

# Or seed individually
npm run seed:events
npm run seed:departments
```

### 7. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your website.

## 🧪 Testing Your Setup

### Test Events Page

- Visit `/events` - should show events from Sanity
- Test category filtering
- Verify upcoming/past event logic

### Test Departments Page

- Visit `/departments` - should show departments from Sanity
- Test state filtering
- Verify leader contact information

### Test Sanity Studio

- Create/edit events and departments
- Verify all fields are working
- Test image uploads

## 🔍 Troubleshooting

### Common Issues

1. **"Connection failed" error**
   - Check your `.env.local` file exists
   - Verify `SANITY_API_TOKEN` is correct
   - Ensure token has read/write permissions

2. **"GROQ query parse error"**
   - Run `npm run test:queries` to identify which query fails
   - Check the query syntax in `lib/sanity.ts`

3. **"No data showing"**
   - Run `npm run seed:all` to populate your database
   - Check Sanity Studio for content
   - Verify schemas are published

4. **"Studio not loading"**
   - Check `sanity.config.ts` configuration
   - Verify project ID and dataset
   - Restart the studio with `npm run studio`

### Environment Variables

Make sure these are set correctly:

- `NEXT_PUBLIC_SANITY_PROJECT_ID=kgfvpijk`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `SANITY_API_TOKEN=your-token-here`

### Sanity Token Permissions

Your token needs:

- **Read access** to all content types
- **Write access** for seeding scripts
- **Create/Update/Delete** permissions

## 📚 Available Scripts

```bash
npm run setup          # Test Sanity connection
npm run test:queries   # Test all GROQ queries
npm run studio         # Start Sanity Studio
npm run seed:all       # Seed all sample data
npm run seed:events    # Seed only events
npm run seed:departments # Seed only departments
npm run dev            # Start development server
npm run build          # Build for production
```

## 🎯 Next Steps

After successful setup:

1. **Customize Content**: Edit events and departments in Sanity Studio
2. **Add Images**: Upload images for events and departments
3. **Test Frontend**: Verify all pages work correctly
4. **Deploy**: Build and deploy your website

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Run `npm run test:queries` to identify query issues
3. Verify your Sanity project settings
4. Check the browser console for errors

## 🎉 Success Indicators

You'll know everything is working when:

- ✅ `npm run setup` shows "Connection successful"
- ✅ `npm run test:queries` shows all queries pass
- ✅ Sanity Studio loads without errors
- ✅ Frontend displays data from Sanity
- ✅ Events show as upcoming/past based on dates
- ✅ Departments filter by state correctly
