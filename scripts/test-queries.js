import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "kgfvpijk",
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function testQueries() {
  console.log("🧪 Testing all GROQ queries...\n");

  const queries = [
    {
      name: "Events Count",
      query: '*[_type == "event"] | count()',
      description: "Count total events",
    },
    {
      name: "Departments Count",
      query: '*[_type == "department"] | count()',
      description: "Count total departments",
    },
    {
      name: "Upcoming Events",
      query:
        '*[_type == "event" && startDate > now()] | order(startDate asc) | { title, startDate, category }[0...3]',
      description: "Get first 3 upcoming events",
    },
    {
      name: "Past Events",
      query:
        '*[_type == "event" && startDate <= now()] | order(startDate desc) | { title, startDate, category }[0...3]',
      description: "Get first 3 past events",
    },
    {
      name: "Event Categories",
      query:
        '*[_type == "event"] | order(category asc) | { "categories": group(category) { category: key } | { "categories": categories[].category } }[0]',
      description: "Get unique event categories",
    },
    {
      name: "Departments by State",
      query:
        '*[_type == "department"] | order(state asc) | { "states": group(state) { state: key } | { "states": states[].state } }[0]',
      description: "Get unique states from departments",
    },
    {
      name: "Sample Department",
      query:
        '*[_type == "department"] | order(name asc) | { name, state, branch, leader }[0]',
      description: "Get first department details",
    },
  ];

  for (const queryTest of queries) {
    try {
      console.log(`📋 Testing: ${queryTest.name}`);
      console.log(`   Description: ${queryTest.description}`);

      const result = await client.fetch(queryTest.query);
      console.log(
        `   ✅ Success: ${JSON.stringify(result).substring(0, 100)}${JSON.stringify(result).length > 100 ? "..." : ""}`
      );
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
    }
    console.log("");
  }

  console.log("🎯 Query testing complete!");
}

// Run the tests
testQueries();
