import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "kgfvpijk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN, // You'll need to create a token with write access
  apiVersion: "2024-01-01",
  useCdn: false,
});

const departments = [
  {
    _type: "department",
    name: "Children's Ministry",
    state: "Lagos",
    branch: "Victoria Island",
    description:
      "Nurturing the faith of children with age-appropriate activities and Bible stories.",
    leader: "Sarah Adebayo",
    leaderDetails: {
      name: "Sarah Adebayo",
      phone: "+234 802 111 1111",
      whatsapp: "+234 802 111 1111",
      email: "children@dcgrowthgroups.com",
      bio: "Passionate about children's spiritual development with over 10 years of experience.",
    },
    activities: [
      "Sunday School",
      "Vacation Bible School",
      "Children's Choir",
      "Bible Story Time",
      "Arts & Crafts",
    ],
    membersCount: 45,
    maxMembers: 60,
    meetingTime: "Sundays during service",
    meetingDay: "Sunday",
    isOpen: true,
    tags: ["children", "sunday-school", "ministry"],
  },
  {
    _type: "department",
    name: "Youth Ministry",
    state: "Lagos",
    branch: "Victoria Island",
    description:
      "Empowering teenagers and young adults to grow in their faith.",
    leader: "David Okechukwu",
    leaderDetails: {
      name: "David Okechukwu",
      phone: "+234 802 222 2222",
      whatsapp: "+234 802 222 2222",
      email: "youth@dcgrowthgroups.com",
      bio: "Youth pastor with a heart for mentoring young people in their faith journey.",
    },
    activities: [
      "Youth Bible Study",
      "Worship Nights",
      "Leadership Training",
      "Outreach Programs",
      "Social Events",
    ],
    membersCount: 38,
    maxMembers: 50,
    meetingTime: "6:00 PM",
    meetingDay: "Friday",
    isOpen: true,
    tags: ["youth", "bible-study", "leadership"],
  },
  {
    _type: "department",
    name: "Music & Worship",
    state: "Lagos",
    branch: "Victoria Island",
    description: "Leading the congregation in worship through music.",
    leader: "Grace Johnson",
    leaderDetails: {
      name: "Grace Johnson",
      phone: "+234 802 333 3333",
      whatsapp: "+234 802 333 3333",
      email: "worship@dcgrowthgroups.com",
      bio: "Experienced worship leader and music director with a passion for excellence.",
    },
    activities: [
      "Choir Practice",
      "Instrumental Training",
      "Worship Team",
      "Sound Engineering",
      "Music Theory Classes",
    ],
    membersCount: 25,
    maxMembers: 35,
    meetingTime: "7:00 PM",
    meetingDay: "Wednesday",
    isOpen: true,
    tags: ["worship", "music", "choir"],
  },
  {
    _type: "department",
    name: "Prayer Ministry",
    state: "Lagos",
    branch: "Victoria Island",
    description: "Intercessory prayer and spiritual warfare ministry.",
    leader: "Michael Okonkwo",
    leaderDetails: {
      name: "Michael Okonkwo",
      phone: "+234 802 444 4444",
      whatsapp: "+234 802 444 4444",
      email: "prayer@dcgrowthgroups.com",
      bio: "Dedicated prayer warrior with a gift for intercession and spiritual guidance.",
    },
    activities: [
      "Prayer Meetings",
      "Intercessory Prayer",
      "Prayer Walks",
      "24/7 Prayer Chain",
      "Spiritual Warfare",
    ],
    membersCount: 18,
    maxMembers: 30,
    meetingTime: "6:00 AM",
    meetingDay: "Tuesday",
    isOpen: true,
    tags: ["prayer", "intercession", "spiritual-warfare"],
  },
  {
    _type: "department",
    name: "Ushering & Protocol",
    state: "Lagos",
    branch: "Victoria Island",
    description: "Ensuring smooth service operations and welcoming visitors.",
    leader: "Patience Eze",
    leaderDetails: {
      name: "Patience Eze",
      phone: "+234 802 555 5555",
      whatsapp: "+234 802 555 5555",
      email: "ushering@dcgrowthgroups.com",
      bio: "Professional usher with excellent organizational and hospitality skills.",
    },
    activities: [
      "Service Coordination",
      "Visitor Welcome",
      "Seating Arrangements",
      "Offering Collection",
      "Security Support",
    ],
    membersCount: 22,
    maxMembers: 25,
    meetingTime: "8:00 AM",
    meetingDay: "Sunday",
    isOpen: true,
    tags: ["ushering", "protocol", "hospitality"],
  },
  {
    _type: "department",
    name: "Media & Technology",
    state: "Lagos",
    branch: "Victoria Island",
    description: "Managing audio-visual equipment and digital content.",
    leader: "Emeka Nwosu",
    leaderDetails: {
      name: "Emeka Nwosu",
      phone: "+234 802 666 6666",
      whatsapp: "+234 802 666 6666",
      email: "media@dcgrowthgroups.com",
      bio: "Tech-savvy professional with expertise in audio-visual systems and digital media.",
    },
    activities: [
      "Sound System Management",
      "Video Recording",
      "Live Streaming",
      "Social Media Management",
      "Technical Support",
    ],
    membersCount: 15,
    maxMembers: 20,
    meetingTime: "9:00 AM",
    meetingDay: "Sunday",
    isOpen: true,
    tags: ["media", "technology", "audio-visual"],
  },
  {
    _type: "department",
    name: "Children's Ministry",
    state: "Abuja",
    branch: "Central Business District",
    description:
      "Nurturing the faith of children in Abuja with age-appropriate activities.",
    leader: "Aisha Bello",
    leaderDetails: {
      name: "Aisha Bello",
      phone: "+234 803 111 1111",
      whatsapp: "+234 803 111 1111",
      email: "children.abuja@dcgrowthgroups.com",
      bio: "Experienced children's ministry leader with a heart for young learners.",
    },
    activities: [
      "Sunday School",
      "Children's Choir",
      "Bible Stories",
      "Creative Arts",
      "Outdoor Activities",
    ],
    membersCount: 32,
    maxMembers: 45,
    meetingTime: "Sundays during service",
    meetingDay: "Sunday",
    isOpen: true,
    tags: ["children", "abuja", "ministry"],
  },
  {
    _type: "department",
    name: "Youth Ministry",
    state: "Abuja",
    branch: "Central Business District",
    description: "Empowering young people in Abuja to grow in their faith.",
    leader: "Kemi Adebayo",
    leaderDetails: {
      name: "Kemi Adebayo",
      phone: "+234 803 222 2222",
      whatsapp: "+234 803 222 2222",
      email: "youth.abuja@dcgrowthgroups.com",
      bio: "Dynamic youth leader passionate about mentoring and discipleship.",
    },
    activities: [
      "Youth Bible Study",
      "Leadership Development",
      "Community Service",
      "Sports Ministry",
      "Creative Arts",
    ],
    membersCount: 28,
    maxMembers: 40,
    meetingTime: "5:00 PM",
    meetingDay: "Saturday",
    isOpen: true,
    tags: ["youth", "abuja", "leadership"],
  },
];

async function seedDepartments() {
  console.log("🌱 Seeding departments...");

  try {
    for (const department of departments) {
      const result = await client.create(department);
      console.log(
        `✅ Created department: ${department.name} in ${department.state} (${result._id})`
      );
    }
    console.log("🎉 All departments seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding departments:", error);
  }
}

// Run the seeding function
seedDepartments();
