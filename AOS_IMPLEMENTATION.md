# AOS Implementation & New Features

## Overview

This document outlines the implementation of AOS (Animate On Scroll) animations and new features added to the Growth Groups website.

## AOS Animations Added

### 1. Home Page (`src/app/page.tsx`)

- **Hero Section**: Fade-up animations for title, subtitle, description, and CTA button
- **Features Section**: Staggered fade-up animations for feature cards
- **Events Section**: Staggered fade-up animations for event cards
- **CTA Section**: Fade-up animations for heading, description, and buttons
- **Footer**: Staggered fade-up animations for footer sections

### 2. Groups Page (`src/app/groups/page.tsx`)

- **Hero Section**: Fade-up animations for title and subtitle
- **Groups Grid**: Staggered fade-up animations for group cards
- **Map Section**: Fade-up animation for the map placeholder
- **How to Join**: Staggered fade-up animations for instruction cards
- **CTA Section**: Fade-up animations for heading, description, and buttons

### 3. Group Detail Page (`src/app/groups/[slug]/page.tsx`)

- **Hero Section**: Fade-up animations for group name and description
- **Content Sections**: Staggered fade-up animations for different content blocks
- **Sidebar**: Fade-left animations for contact card and other sidebar elements
- **CTA Section**: Fade-up animations for call-to-action elements

### 4. About Page (`src/app/about/page.tsx`)

- **Hero Section**: Fade-up animations for title and subtitle
- **Mission & Vision**: Fade-right and fade-left animations for content sections
- **Stats Section**: Staggered fade-up animations for statistics
- **Values Section**: Staggered fade-up animations for value cards
- **History Section**: Fade-right and fade-left animations for content
- **CTA Section**: Fade-up animations for call-to-action elements

### 5. Header Component (`src/components/Header.tsx`)

- **Logo**: Fade-right animation
- **Navigation**: Staggered fade-down animations for menu items
- **CTA Button**: Fade-left animation
- **Mobile Menu**: Fade-down animation for mobile navigation

## New Features Implemented

### 1. Enhanced Group Schema

The group schema has been significantly enhanced with:

- Detailed leader information (name, phone, WhatsApp, email, bio, image)
- Contact information (phone, WhatsApp, email)
- Meeting details (day, time, duration)
- Group characteristics (age group, language, online availability)
- Member management (current members, max members)
- Tags and focus areas
- Online meeting platform information

### 2. Detailed Group Pages

New individual group pages (`/groups/[slug]`) featuring:

- Comprehensive group information
- Leader details with contact options
- Meeting schedule and details
- Group statistics and characteristics
- WhatsApp contact integration
- Multiple contact methods (phone, email, WhatsApp)

### 3. WhatsApp Integration

- Direct WhatsApp contact buttons on group cards
- Pre-filled messages for easy communication
- WhatsApp contact in group detail pages
- Contact group leaders directly through WhatsApp

### 4. Improved Carousel

- Fixed carousel implementation with proper autoplay
- Better navigation controls
- Responsive design improvements
- Smooth transitions between slides

### 5. Sanity Dashboard Integration

- Updated environment configuration
- Enhanced group schema for better content management
- Seed data for populating the dashboard
- Import script for bulk data upload

## Technical Implementation

### AOS Configuration

```typescript
// AOS initialization in AOSProvider.tsx
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
  delay: 100,
});
```

### Animation Classes Used

- `data-aos="fade-up"` - Elements fade in from bottom
- `data-aos="fade-down"` - Elements fade in from top
- `data-aos="fade-left"` - Elements fade in from right
- `data-aos="fade-right"` - Elements fade in from left
- `data-aos-delay="200"` - Delays animation by 200ms
- `data-aos-delay={index * 100}` - Staggered delays for lists

### Responsive Considerations

- Animations work on all device sizes
- Delays are optimized for mobile and desktop
- Smooth performance across different devices

## Usage Instructions

### 1. Adding AOS to New Components

```tsx
// Basic fade-up animation
<div data-aos="fade-up">
  Content here
</div>

// With delay
<div data-aos="fade-up" data-aos-delay="200">
  Content here
</div>

// Staggered animations in lists
{items.map((item, index) => (
  <div key={item.id} data-aos="fade-up" data-aos-delay={index * 100}>
    {item.content}
  </div>
))}
```

### 2. Importing Groups to Sanity

```bash
# Navigate to scripts directory
cd scripts

# Run the import script
node import-groups.js
```

### 3. Environment Setup

Ensure your `.env.local` file contains:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=kgfvpijk
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=kgfvpijk
SANITY_STUDIO_DATASET=production
SANITY_API_TOKEN=sktJ6IC72KWQciJ2URSwGBb7WPRq5XQzPpFSkzEbrobWsHCPVb69EyVclsHEjvfwLyyCHrIJ3iXoOkdEgy9G5F2ngLM2dELQRK4WqrfLFfNaXVAptHGF0MUmtGCUDwJ2SOlr9WMbkdPQ1c89Ou9TtAZ5ODQixZ1lkdv7D04xhQ5z8sP4rnje
```

## Performance Considerations

### 1. AOS Performance

- Animations only trigger once (`once: true`)
- Optimized delays to prevent overwhelming the user
- Smooth easing functions for better visual appeal

### 2. Image Optimization

- Next.js Image component for optimized loading
- Proper image sizing and formats
- Lazy loading for better performance

### 3. Bundle Size

- AOS library is lightweight
- Tree-shaking for unused animations
- Efficient CSS animations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Future Enhancements

- Additional animation types (zoom, slide, flip)
- Intersection Observer API for better performance
- Custom animation curves
- Animation preferences in user settings
- Reduced motion support for accessibility

## Troubleshooting

### Common Issues

1. **Animations not working**: Check if AOSProvider is properly imported in layout.tsx
2. **Performance issues**: Reduce animation delays or use simpler animations
3. **Mobile issues**: Test on actual devices, not just browser dev tools

### Debug Mode

```typescript
// Enable debug mode in AOSProvider.tsx
AOS.init({
  // ... other options
  disable: "mobile", // Disable on mobile if needed
  debug: true, // Enable debug logging
});
```

## Conclusion

The AOS implementation provides a modern, engaging user experience while maintaining performance and accessibility. The enhanced group features create a comprehensive platform for managing and discovering growth groups with easy contact options.
