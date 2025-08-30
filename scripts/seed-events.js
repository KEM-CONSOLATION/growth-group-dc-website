import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "kgfvpijk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN, // You'll need to create a token with write access
  apiVersion: "2024-01-01",
  useCdn: false,
});

const events = [
  {
    _type: "event",
    title: "Monthly Prayer Meeting",
    description:
      "Join us for our monthly prayer meeting where we lift up our church, community, and world in prayer.",
    startDate: "2024-12-15T18:00:00Z",
    endDate: "2024-12-15T20:00:00Z",
    location: "Main Sanctuary",
    category: "Prayer",
    featured: true,
    maxAttendees: 100,
    currentAttendees: 45,
    isRegistrationRequired: false,
    organizer: "Prayer Team",
    contactInfo: {
      phone: "+234 802 111 1111",
      email: "prayer@dcgrowthgroups.com",
      whatsapp: "+234 802 111 1111",
    },
    tags: ["prayer", "monthly", "fellowship"],
  },
  {
    _type: "event",
    title: "Youth Bible Study",
    description:
      "Weekly Bible study for young adults focusing on practical application of God's Word in daily life.",
    startDate: "2024-12-18T19:00:00Z",
    endDate: "2024-12-18T20:30:00Z",
    location: "Youth Hall",
    category: "Bible Study",
    featured: false,
    maxAttendees: 50,
    currentAttendees: 28,
    isRegistrationRequired: true,
    registrationLink: "https://forms.example.com/youth-bible-study",
    organizer: "Youth Ministry",
    contactInfo: {
      phone: "+234 802 222 2222",
      email: "youth@dcgrowthgroups.com",
      whatsapp: "+234 802 222 2222",
    },
    tags: ["youth", "bible-study", "weekly"],
  },
  {
    _type: "event",
    title: "Women's Fellowship",
    description:
      "Monthly gathering for women to connect, share testimonies, and grow together in faith.",
    startDate: "2024-12-21T10:00:00Z",
    endDate: "2024-12-21T12:00:00Z",
    location: "Fellowship Hall",
    category: "Fellowship",
    featured: true,
    maxAttendees: 60,
    currentAttendees: 35,
    isRegistrationRequired: false,
    organizer: "Women's Ministry",
    contactInfo: {
      phone: "+234 802 333 3333",
      email: "women@dcgrowthgroups.com",
      whatsapp: "+234 802 333 3333",
    },
    tags: ["women", "fellowship", "monthly"],
  },
  {
    _type: "event",
    title: "Christmas Carol Service",
    description:
      "Celebrate the birth of our Savior with traditional carols, scripture readings, and special performances.",
    startDate: "2024-12-24T19:00:00Z",
    endDate: "2024-12-24T21:00:00Z",
    location: "Main Sanctuary",
    category: "Special Event",
    featured: true,
    maxAttendees: 200,
    currentAttendees: 120,
    isRegistrationRequired: true,
    registrationLink: "https://forms.example.com/christmas-carols",
    organizer: "Worship Team",
    contactInfo: {
      phone: "+234 802 444 4444",
      email: "worship@dcgrowthgroups.com",
      whatsapp: "+234 802 444 4444",
    },
    tags: ["christmas", "carols", "special"],
  },
  {
    _type: "event",
    title: "Men's Breakfast",
    description:
      "Monthly breakfast gathering for men to discuss faith, share challenges, and encourage one another.",
    startDate: "2024-12-28T08:00:00Z",
    endDate: "2024-12-28T10:00:00Z",
    location: "Fellowship Hall",
    category: "Fellowship",
    featured: false,
    maxAttendees: 40,
    currentAttendees: 22,
    isRegistrationRequired: false,
    organizer: "Men's Ministry",
    contactInfo: {
      phone: "+234 802 555 5555",
      email: "men@dcgrowthgroups.com",
      whatsapp: "+234 802 555 5555",
    },
    tags: ["men", "breakfast", "monthly"],
  },
  // Past events
  {
    _type: "event",
    title: "Thanksgiving Service",
    description:
      "Special service of thanksgiving and praise for God's blessings throughout the year.",
    startDate: "2024-11-28T18:00:00Z",
    endDate: "2024-11-28T20:00:00Z",
    location: "Main Sanctuary",
    category: "Special Event",
    featured: false,
    currentAttendees: 150,
    isRegistrationRequired: false,
    organizer: "Worship Team",
    contactInfo: {
      phone: "+234 802 666 6666",
      email: "worship@dcgrowthgroups.com",
      whatsapp: "+234 802 666 6666",
    },
    tags: ["thanksgiving", "special", "worship"],
  },
  {
    _type: "event",
    title: "Bible Conference",
    description:
      "Three-day conference featuring guest speakers, workshops, and deep Bible study sessions.",
    startDate: "2024-11-15T09:00:00Z",
    endDate: "2024-11-17T17:00:00Z",
    location: "Main Sanctuary",
    category: "Conference",
    featured: true,
    currentAttendees: 200,
    isRegistrationRequired: true,
    organizer: "Bible Study Ministry",
    contactInfo: {
      phone: "+234 802 777 7777",
      email: "bible@dcgrowthgroups.com",
      whatsapp: "+234 802 777 7777",
    },
    tags: ["conference", "bible-study", "workshop"],
  },
];

async function seedEvents() {
  console.log("🌱 Seeding events...");

  try {
    for (const event of events) {
      const result = await client.create(event);
      console.log(`✅ Created event: ${event.title} (${result._id})`);
    }
    console.log("🎉 All events seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding events:", error);
  }
}

// Run the seeding function
seedEvents();
