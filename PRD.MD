📘 Product Requirements Document (PRD)
Project: Growth Group Website
Organization: Dominion City Church
Prepared for: Growth Group Team
Prepared by: [Your Name]

1. Overview
   The Growth Group Website is a digital platform for Dominion City Church’s Growth Groups. It will serve as a hub for spiritual resources, fellowship information, events, and leadership connections, making it easy for members and visitors to engage with the church.
   The website should be modern, mobile-first, fast, appealing, and easy to update by non-technical church staff using an admin dashboard backed by a managed database.

2. Objectives
   Provide a central information hub for Growth Groups.

Make it easy to discover and connect with Growth Groups across states.

Share blogs, daily devotions, and book reviews.

Showcase upcoming/past events.

Present church leadership structure (General Pastor, State Pastors, Leaders).

Highlight departments and ministries.

Support scalability for future features (sermons, livestreams, giving, push notifications, etc.).

3. Target Audience
   Dominion City Church members

Visitors seeking to join Growth Groups

State Growth Group Leaders and Coordinators

General public looking for church details

4. Core Features
   A. Public Website
   Home Page

Hero banner with welcoming message

Quick links to major sections (Events, Blogs, Devotions, Groups)

Highlight of upcoming events & featured blog posts

Blog Section

List of blog articles (by pastors, leaders, members)

Categories: Spiritual Growth, Testimonies, Teachings

Search & filter by tags

Rich media (images, videos, audio embeds)

Book Reviews

Reviews of current study book(s)

Past book reviews archive

User/member feedback

Daily Devotions

Daily scripture & reflection

Ability to schedule posts in advance (CMS support)

Option for notifications (for PWA version)

Events (Upcoming & Past)

Upcoming Growth Group meetings

Special events (retreats, seminars, church-wide gatherings)

Past events archive with photos/videos

About Growth Groups

Explanation of purpose, vision, and activities

FAQs on joining a Growth Group

About Dominion City

History of the church

Mission & Vision statements

Leadership

General Pastor profile & bio

State Pastors listing (per state, with photos, bios, and contact details)

Growth Group Leaders directory with contact info

Growth Group Directory

List of all active groups (by state/city)

Group details (leader, meeting times, locations, what they do)

Filter/search functionality

Departments

Ministries & service groups (Choir, Ushering, Media, Prayer, etc.)

Description + contact details

   B. Admin Dashboard & Content Management
   Staff use a **custom admin dashboard** (Next.js) at `/admin`, not a third-party headless CMS studio.

   **Backend & API (current architecture)**
   - **Supabase** hosts the **PostgreSQL** database, **Row Level Security (RLS)** policies, and **Supabase Auth** for administrator accounts (email/password or supported providers).
   - **Next.js API routes** (`/api/admin/*` and selected public APIs) are the **only server-side integration** with Supabase for privileged operations. The admin UI calls these routes with a **Bearer token** from the signed-in session—not direct table access from the browser for sensitive writes.
   - **Public pages** read published content via server-side data access (e.g. Server Components / server helpers) as defined in the app; secrets stay on the server.
   - **Media uploads** (images, files) use **Cloudinary** (or equivalent), with upload/signing handled through API routes so keys are not exposed in the client.

   **Admin dashboard — home (`/admin`)**
   - **Overview metrics**: counts for blog posts, events, groups, weekly reports, comments, and pending weekly reports (items needing review).
   - **Quick actions**: shortcuts to create blog posts, events, and groups (where implemented).
   - **Activity highlights**: e.g. pending reports and comment totals to guide moderation.
   - **Navigation**: sidebar to all admin modules (see below).

   **Admin modules (target scope aligned with product features)**
   - Blog posts (with authors, categories, rich content).
   - Events.
   - Growth groups.
   - Departments.
   - Weekly reports (submission/review workflow as applicable).
   - Comments (moderation / approval as applicable).
   - Daily devotions.
   - Audio messages.
   - Supporting metadata: authors, categories.

   **Roles**
   - Admin / Editor roles for church staff (enforced via Supabase Auth + API authorization checks; refine RLS and server checks for production).

   C. Optional / Future Features
Newsletter / Email Subscription – Weekly devotionals or announcements.

Testimonials – From members about Growth Groups impact.

Volunteer / Join a Department Form – Sign-up forms for service.

FAQs – About Growth Groups, church beliefs, meeting times, etc.

PWA Features – Push notifications, offline support, “Add to Homescreen.”
Push Notifications (PWA) → For new devotionals/events (implementation TBD; not tied to Firebase Cloud Messaging by default).

Online Giving / Donations integration (Flutterwave/Paystack)

Sermon Library (Audio/Video)

Prayer Request Submission Form

Growth Group Signup Forms

User Profiles / Membership Portal

5. Design & UX
   Look & Feel: Warm, modern, welcoming.

Colors: **Dominion City brand** — **royal blue and white** (see app theme / `tailwind` brand tokens); avoid off-brand gradients.

Typography: Clean & readable fonts.

Mobile-first responsive design.

Accessibility compliance (WCAG).

6. Tech Stack (Current)
   **Frontend:** Next.js (App Router, React, SEO-friendly).

   **Backend / data:** **Supabase** (PostgreSQL, Auth, RLS). No Sanity; no Firebase as primary database.

   **Application API:** **Next.js Route Handlers** under `/api/...` for admin and public endpoints; service-role or scoped server clients only on the server—never in client bundles.

   **Media:** **Cloudinary** (upload/sign via API routes).

   **Hosting:** Vercel (or equivalent) with Git-based deploys.

   **Auth (admin):** Supabase Auth; optional future: Clerk / Auth.js if requirements change.

7. KPIs (Success Metrics)
   Engagement with blog/devotions

Growth Group sign-ups / inquiries

Event attendance growth

Returning visitors (analytics)

8. Timeline (High-Level)
   Week 1–2: Setup project, database schema, base frontend structure

Week 3–4: Implement features (blogs, events, devotions, groups)

Week 5: Leadership & Departments sections

Week 6: Styling, testing, admin training for staff

Week 7: Deploy + Launch 🎉

9. Projects & Donations Section (Future / Extended)
Project Listing

Each church project (e.g., building a community center, charity outreach, mission trips) gets its own card or page.

Include:

Project title

Short description

Target funding goal

Progress bar (optional)

Images or videos if available

Donation Options

For each project, allow users to donate:

Fixed amounts (e.g., $10, $50, $100)

Custom amounts

Display payment methods: bank transfer, online payment (Paystack, Flutterwave, PayPal, etc.), mobile money (for local Nigerian context).

Project Details Page

Extended description

Updates (e.g., “Phase 1 completed”)

Testimonials from beneficiaries

Donation history (optional, anonymized for privacy)

Transparency & Accountability

Show how donations are being used.

Provide quarterly or monthly reports on funds and outcomes.

Optional: QR codes for instant mobile payments.

Call to Action

Prominent “Donate Now” buttons

Social sharing to encourage community involvement
