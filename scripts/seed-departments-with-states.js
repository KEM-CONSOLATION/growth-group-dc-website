import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "kgfvpijk",
  dataset: "production",
  token:
    "sktJ6IC72KWQciJ2URSwGBb7WPRq5XQzPpFSkzEbrobWsHCPVb69EyVclsHEjvfwLyyCHrIJ3iXoOkdEgy9G5F2ngLM2dELQRK4WqrfLFfNaXVAptHGF0MUmtGCUDwJ2SOlr9WMbkdPQ1c89Ou9TtAZ5ODQixZ1lkdv7D04xhQ5z8sP4rnje",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const sampleDepartments = [
  {
    name: "Choir Department",
    slug: { _type: "slug", current: "choir-department" },
    state: "Lagos",
    branch: "Victoria Island",
    description:
      "Our vibrant choir department leads worship and creates an atmosphere of praise through music and song. We welcome singers of all skill levels to join us in glorifying God through music.",
    leader: "Grace Okoro",
    leaderDetails: {
      name: "Grace Okoro",
      phone: "+234 801 234 5678",
      whatsapp: "+234 801 234 5678",
      email: "grace.okoro@dominioncity.com",
      bio: "Grace is a passionate worship leader with over 10 years of experience in choral music and worship ministry.",
    },
    activities: [
      "Sunday Worship",
      "Choir Practice",
      "Special Events",
      "Recording Sessions",
    ],
    membersCount: 25,
    maxMembers: 40,
    meetingTime: "Wednesdays 6:00 PM",
    meetingDay: "Wednesday",
    isOpen: true,
    tags: ["Music", "Worship", "Choir", "Arts"],
  },
  {
    name: "Media Department",
    slug: { _type: "slug", current: "media-department" },
    state: "Lagos",
    branch: "Victoria Island",
    description:
      "The Media Department handles all technical aspects of our services including sound, lighting, video production, and live streaming. We ensure quality presentation of God's word.",
    leader: "Peter James",
    leaderDetails: {
      name: "Peter James",
      phone: "+234 802 345 6789",
      whatsapp: "+234 802 345 6789",
      email: "peter.james@dominioncity.com",
      bio: "Peter is a certified audio engineer with expertise in live sound and video production.",
    },
    activities: [
      "Sound Engineering",
      "Video Production",
      "Live Streaming",
      "Technical Support",
    ],
    membersCount: 12,
    maxMembers: 20,
    meetingTime: "Saturdays 10:00 AM",
    meetingDay: "Saturday",
    isOpen: true,
    tags: ["Technology", "Media", "Sound", "Video"],
  },
  {
    name: "Children's Ministry",
    slug: { _type: "slug", current: "childrens-ministry" },
    state: "Lagos",
    branch: "Victoria Island",
    description:
      "Our Children's Ministry nurtures the faith of young ones through age-appropriate Bible lessons, activities, and worship. We create a safe and fun environment for children to grow in Christ.",
    leader: "Sarah Johnson",
    leaderDetails: {
      name: "Sarah Johnson",
      phone: "+234 803 456 7890",
      whatsapp: "+234 803 456 7890",
      email: "sarah.johnson@dominioncity.com",
      bio: "Sarah has a background in early childhood education and loves working with children.",
    },
    activities: [
      "Sunday School",
      "Vacation Bible School",
      "Children's Church",
      "Family Events",
    ],
    membersCount: 45,
    maxMembers: 60,
    meetingTime: "Sundays 9:00 AM",
    meetingDay: "Sunday",
    isOpen: true,
    tags: ["Children", "Education", "Family", "Youth"],
  },
  {
    name: "Prayer Ministry",
    slug: { _type: "slug", current: "prayer-ministry" },
    state: "Lagos",
    branch: "Victoria Island",
    description:
      "The Prayer Ministry coordinates intercessory prayer, prayer meetings, and prayer requests. We believe in the power of prayer and its ability to transform lives and situations.",
    leader: "Michael Adebayo",
    leaderDetails: {
      name: "Michael Adebayo",
      phone: "+234 804 567 8901",
      whatsapp: "+234 804 567 8901",
      email: "michael.adebayo@dominioncity.com",
      bio: "Michael has a deep passion for prayer and intercession, leading prayer groups for over 15 years.",
    },
    activities: [
      "Prayer Meetings",
      "Intercessory Prayer",
      "Prayer Walks",
      "24/7 Prayer Chain",
    ],
    membersCount: 30,
    maxMembers: 50,
    meetingTime: "Tuesdays 7:00 PM",
    meetingDay: "Tuesday",
    isOpen: true,
    tags: ["Prayer", "Intercession", "Spiritual Warfare", "Faith"],
  },
  {
    name: "Ushering Department",
    slug: { _type: "slug", current: "ushering-department" },
    state: "Lagos",
    branch: "Victoria Island",
    description:
      "The Ushering Department ensures smooth flow of services by welcoming members, managing seating, collecting offerings, and maintaining order during church activities.",
    leader: "David Okechukwu",
    leaderDetails: {
      name: "David Okechukwu",
      phone: "+234 805 678 9012",
      whatsapp: "+234 805 678 9012",
      email: "david.okechukwu@dominioncity.com",
      bio: "David is known for his warm hospitality and excellent organizational skills.",
    },
    activities: [
      "Service Management",
      "Greeting",
      "Offering Collection",
      "Event Coordination",
    ],
    membersCount: 20,
    maxMembers: 35,
    meetingTime: "Mondays 6:00 PM",
    meetingDay: "Monday",
    isOpen: true,
    tags: ["Hospitality", "Service", "Organization", "Welcome"],
  },
  {
    name: "Youth Ministry",
    slug: { _type: "slug", current: "youth-ministry" },
    state: "Lagos",
    branch: "Victoria Island",
    description:
      "Our Youth Ministry engages young people through relevant Bible studies, fun activities, mentorship, and opportunities to serve. We help youth develop a strong foundation in Christ.",
    leader: "Jennifer Okonkwo",
    leaderDetails: {
      name: "Jennifer Okonkwo",
      phone: "+234 806 789 0123",
      whatsapp: "+234 806 789 0123",
      email: "jennifer.okonkwo@dominioncity.com",
      bio: "Jennifer is passionate about youth development and has a degree in youth ministry.",
    },
    activities: [
      "Youth Bible Study",
      "Fellowship Events",
      "Mentorship",
      "Community Service",
    ],
    membersCount: 35,
    maxMembers: 50,
    meetingTime: "Fridays 6:00 PM",
    meetingDay: "Friday",
    isOpen: true,
    tags: ["Youth", "Mentorship", "Fellowship", "Development"],
  },
  {
    name: "Evangelism Department",
    slug: { _type: "slug", current: "evangelism-department" },
    state: "Lagos",
    branch: "Victoria Island",
    description:
      "The Evangelism Department leads outreach efforts, street evangelism, and community engagement. We share the gospel and demonstrate God's love through practical acts of service.",
    leader: "Emmanuel Chukwudi",
    leaderDetails: {
      name: "Emmanuel Chukwudi",
      phone: "+234 807 890 1234",
      whatsapp: "+234 807 890 1234",
      email: "emmanuel.chukwudi@dominioncity.com",
      bio: "Emmanuel has a heart for evangelism and has led numerous outreach programs.",
    },
    activities: [
      "Street Evangelism",
      "Community Outreach",
      "Gospel Distribution",
      "Social Action",
    ],
    membersCount: 18,
    maxMembers: 30,
    meetingTime: "Thursdays 5:00 PM",
    meetingDay: "Thursday",
    isOpen: true,
    tags: ["Evangelism", "Outreach", "Mission", "Community"],
  },
  {
    name: "Technical Department",
    slug: { _type: "slug", current: "technical-department" },
    state: "Lagos",
    branch: "Victoria Island",
    description:
      "The Technical Department manages all IT infrastructure, website maintenance, social media, and digital communications. We ensure the church stays connected in the digital age.",
    leader: "Daniel Eze",
    leaderDetails: {
      name: "Daniel Eze",
      phone: "+234 808 901 2345",
      whatsapp: "+234 808 901 2345",
      email: "daniel.eze@dominioncity.com",
      bio: "Daniel is a certified IT professional with expertise in web development and digital marketing.",
    },
    activities: [
      "Website Management",
      "Social Media",
      "IT Support",
      "Digital Communications",
    ],
    membersCount: 8,
    maxMembers: 15,
    meetingTime: "Saturdays 2:00 PM",
    meetingDay: "Saturday",
    isOpen: true,
    tags: ["Technology", "IT", "Digital", "Communication"],
  },
  {
    name: "Worship Team",
    slug: { _type: "slug", current: "worship-team" },
    state: "Abuja",
    branch: "Central Business District",
    description:
      "Our Worship Team leads the congregation in contemporary and traditional worship songs. We create an atmosphere of praise and worship through music and song.",
    leader: "Blessing Adeyemi",
    leaderDetails: {
      name: "Blessing Adeyemi",
      phone: "+234 809 012 3456",
      whatsapp: "+234 809 012 3456",
      email: "blessing.adeyemi@dominioncity.com",
      bio: "Blessing is a gifted worship leader with a passion for contemporary Christian music.",
    },
    activities: [
      "Sunday Worship",
      "Worship Practice",
      "Special Events",
      "Recording",
    ],
    membersCount: 15,
    maxMembers: 25,
    meetingTime: "Wednesdays 7:00 PM",
    meetingDay: "Wednesday",
    isOpen: true,
    tags: ["Worship", "Music", "Contemporary", "Praise"],
  },
  {
    name: "Bible Study Department",
    slug: { _type: "slug", current: "bible-study-department" },
    state: "Abuja",
    branch: "Central Business District",
    description:
      "The Bible Study Department facilitates in-depth study of God's Word through structured classes, small groups, and discussion sessions. We help members grow in biblical knowledge.",
    leader: "Dr. Samuel Okafor",
    leaderDetails: {
      name: "Dr. Samuel Okafor",
      phone: "+234 810 123 4567",
      whatsapp: "+234 810 123 4567",
      email: "samuel.okafor@dominioncity.com",
      bio: "Dr. Okafor has a PhD in Theology and over 20 years of teaching experience.",
    },
    activities: [
      "Bible Classes",
      "Small Groups",
      "Theological Studies",
      "Discussion Forums",
    ],
    membersCount: 40,
    maxMembers: 60,
    meetingTime: "Tuesdays 6:30 PM",
    meetingDay: "Tuesday",
    isOpen: true,
    tags: ["Bible Study", "Education", "Theology", "Teaching"],
  },
  {
    name: "Hospitality Department",
    slug: { _type: "slug", current: "hospitality-department" },
    state: "Port Harcourt",
    branch: "GRA",
    description:
      "The Hospitality Department ensures visitors and members feel welcome through warm greetings, refreshments, and assistance. We create a friendly and inviting church environment.",
    leader: "Patience Nwosu",
    leaderDetails: {
      name: "Patience Nwosu",
      phone: "+234 811 234 5678",
      whatsapp: "+234 811 234 5678",
      email: "patience.nwosu@dominioncity.com",
      bio: "Patience has a natural gift for hospitality and loves making people feel at home.",
    },
    activities: [
      "Visitor Greeting",
      "Refreshments",
      "Information Desk",
      "Special Events Support",
    ],
    membersCount: 22,
    maxMembers: 35,
    meetingTime: "Sundays 8:00 AM",
    meetingDay: "Sunday",
    isOpen: true,
    tags: ["Hospitality", "Welcome", "Service", "Care"],
  },
  {
    name: "Security Department",
    slug: { _type: "slug", current: "security-department" },
    state: "Port Harcourt",
    branch: "GRA",
    description:
      "The Security Department ensures the safety and security of all church members and property during services and events. We maintain a secure environment for worship.",
    leader: "Victor Okoro",
    leaderDetails: {
      name: "Victor Okoro",
      phone: "+234 812 345 6789",
      whatsapp: "+234 812 345 6789",
      email: "victor.okoro@dominioncity.com",
      bio: "Victor is a trained security professional with experience in crowd management.",
    },
    activities: [
      "Security Monitoring",
      "Crowd Control",
      "Emergency Response",
      "Property Protection",
    ],
    membersCount: 12,
    maxMembers: 20,
    meetingTime: "Saturdays 9:00 AM",
    meetingDay: "Saturday",
    isOpen: true,
    tags: ["Security", "Safety", "Protection", "Emergency"],
  },
];

async function seedDepartments() {
  console.log("🌱 Starting to seed departments with states and branches...\n");

  try {
    // First, let's check if there are existing departments
    const existingDepartments = await client.fetch(
      'count(*[_type == "department"])'
    );
    console.log(`📊 Found ${existingDepartments} existing departments`);

    if (existingDepartments > 0) {
      console.log(
        "⚠️  Departments already exist. Skipping seeding to avoid duplicates."
      );
      return;
    }

    // Create departments
    const createdDepartments = [];
    for (const dept of sampleDepartments) {
      try {
        const result = await client.create({
          _type: "department",
          ...dept,
        });

        createdDepartments.push(result);
        console.log(
          `✅ Created: ${dept.name} (${dept.state} - ${dept.branch})`
        );
      } catch (error) {
        console.error(`❌ Failed to create ${dept.name}:`, error.message);
      }
    }

    console.log(
      `\n🎉 Successfully created ${createdDepartments.length} departments!`
    );

    // Verify the creation
    const totalDepartments = await client.fetch(
      'count(*[_type == "department"])'
    );
    const states = await client.fetch(
      '*[_type == "department"] | order(state asc) | { "states": group(state) { state: key } }[0]'
    );

    console.log(`\n📊 Verification:`);
    console.log(`   Total departments: ${totalDepartments}`);
    console.log(
      `   States available: ${states?.states?.map((s) => s.state).join(", ") || "None"}`
    );

    console.log(
      "\n🚀 Departments seeding complete! You can now visit /departments to see the states and branches."
    );
  } catch (error) {
    console.error("❌ Error seeding departments:", error.message);
    console.error("Full error:", error);
  }
}

// Run the seeding
seedDepartments();
