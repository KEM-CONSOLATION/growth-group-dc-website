import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "kgfvpijk",
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function testConnection() {
  console.log("🔍 Testing Sanity connection...");
  console.log("Project ID: kgfvpijk");
  console.log("Dataset: production");

  try {
    // Test basic connection
    const result = await client.fetch('*[_type == "event"] | count()');
    console.log("✅ Connection successful!");
    console.log(`📊 Current events count: ${result}`);

    // Test departments
    const deptCount = await client.fetch('*[_type == "department"] | count()');
    console.log(`📊 Current departments count: ${deptCount}`);

    // Test categories with simpler query
    const categories = await client.fetch(
      '*[_type == "event"] | order(category asc) | { "categories": group(category) { category: key } }[0]'
    );
    console.log(
      `📊 Available event categories: ${categories?.categories?.join(", ") || "None"}`
    );

    console.log("\n🎉 Sanity is ready to use!");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log(
      "1. Make sure you have a .env.local file with SANITY_API_TOKEN"
    );
    console.log("2. Verify your token has read access to the project");
    console.log("3. Check that the project ID and dataset are correct");
  }
}

// Run the test
testConnection();
