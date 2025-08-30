# Data Seeding Scripts

This directory contains scripts to populate your Sanity CMS with sample data for testing and development.

## Prerequisites

1. **Sanity Token**: You need a Sanity token with write access to your project
2. **Environment Variables**: Set up your environment variables

## Setup

1. **Create a Sanity Token**:
   - Go to [manage.sanity.io](https://manage.sanity.io)
   - Select your project
   - Go to API section
   - Create a new token with write access
   - Copy the token

2. **Set Environment Variables**:
   ```bash
   # Create a .env.local file in your project root
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-write-token-here
   ```

## Available Scripts

### Seed Events

```bash
npm run seed:events
```

Creates sample events with:

- Upcoming events (future dates)
- Past events (past dates)
- Various categories (Prayer, Bible Study, Fellowship, etc.)
- Contact information
- Registration details

### Seed Departments

```bash
npm run seed:departments
```

Creates sample departments with:

- Multiple states (Lagos, Abuja)
- Branch information
- Leader contact details
- Activities and meeting schedules
- Member counts

### Seed All Data

```bash
npm run seed:all
```

Runs both seeding scripts in sequence.

## Data Structure

### Events

- **Title**: Event name
- **Description**: Detailed description
- **Start Date**: When the event begins (determines if it's upcoming/past)
- **End Date**: When the event ends
- **Location**: Where the event takes place
- **Category**: Predefined categories (Prayer, Bible Study, Fellowship, etc.)
- **Featured**: Boolean for highlighting important events
- **Registration**: Links and requirements
- **Contact**: Organizer contact information
- **Tags**: For better organization

### Departments

- **Name**: Department name
- **State**: Required location (Lagos, Abuja, etc.)
- **Branch**: Optional specific location within state
- **Description**: What the department does
- **Leader**: Department leader name
- **Leader Details**: Full contact information (phone, email, WhatsApp, bio)
- **Activities**: List of department activities
- **Members**: Current and maximum member counts
- **Schedule**: Meeting times and days
- **Status**: Whether department is open for new members

## Notes

- **Dates**: Events use ISO 8601 format (e.g., `2024-12-15T18:00:00Z`)
- **Categories**: Events have predefined categories that match the frontend filtering
- **States**: Departments are organized by state for location-based filtering
- **Contact**: All contact information is fictional for testing purposes
- **Images**: The scripts don't include images - you'll need to add those manually in Sanity Studio

## Troubleshooting

1. **Token Issues**: Ensure your SANITY_API_TOKEN has write permissions
2. **Project ID**: Verify your NEXT_PUBLIC_SANITY_PROJECT_ID is correct
3. **Dataset**: Check that your dataset exists and is accessible
4. **Network**: Ensure you have internet access to reach Sanity's API

## Customization

You can modify the sample data in each script to match your specific needs:

- Change phone numbers, emails, and contact details
- Modify event descriptions and locations
- Adjust department activities and meeting schedules
- Add more states or categories as needed

## After Seeding

Once you've seeded the data:

1. Visit your Sanity Studio to see the new content
2. Test the frontend to ensure data is displaying correctly
3. Verify that filtering and categorization work as expected
4. Check that past/upcoming event logic functions properly
