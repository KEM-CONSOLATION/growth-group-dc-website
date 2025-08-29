# Growth Group Website Setup Guide

## 🚀 Getting Started

This is a Next.js website for Dominion City Church's Growth Groups, featuring a blog system powered by Sanity CMS.

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account
- Firebase account (for future features)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd growth-group-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production

   # Firebase Configuration (for future use)
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

## 🎨 Sanity CMS Setup

1. **Create a Sanity project**
   - Go to [sanity.io](https://sanity.io)
   - Create a new project
   - Choose "Clean project with no predefined schemas"

2. **Get your project ID and dataset**
   - Copy the project ID from your Sanity dashboard
   - Update the `sanity.config.ts` file with your project ID

3. **Deploy your schema**
   - Run `npx sanity deploy` to deploy your schema
   - Or use the Sanity Studio at `/studio` route

4. **Add content**
   - Create authors, categories, and blog posts
   - Upload images and media

## 🔥 Firebase Setup (Optional)

1. **Create a Firebase project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Authentication, Firestore, and Storage

2. **Get configuration**
   - Copy the Firebase config to your `.env.local` file

## 🚀 Running the Project

1. **Development mode**

   ```bash
   npm run dev
   ```

2. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📱 Features

- **Blog System**: Full-featured blog with categories, tags, and authors
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Meta tags and structured content
- **CMS Integration**: Sanity Studio for content management
- **SSR**: Server-side rendering for better performance and SEO

## 🎯 Project Structure

```
src/
├── app/
│   ├── blog/           # Blog pages
│   ├── studio/         # Sanity Studio
│   └── layout.tsx      # Root layout
├── components/         # React components
├── lib/               # Utilities and configurations
└── schemas/           # Sanity schemas
```

## 🔧 Customization

- **Colors**: Update Tailwind config for church branding
- **Content**: Modify Sanity schemas for additional content types
- **Layout**: Customize components in the `components/` directory

## 📚 Next Steps

- [ ] Add authentication system
- [ ] Implement events management
- [ ] Create growth group directory
- [ ] Add donation system
- [ ] Implement push notifications
- [ ] Add sermon library

## 🆘 Support

For questions or issues, please contact the development team.
