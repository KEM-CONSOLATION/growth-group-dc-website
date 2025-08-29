const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Initialize Sanity client
const client = createClient({
  projectId: 'kgfvpijk',
  dataset: 'production',
  token: 'sktJ6IC72KWQciJ2URSwGBb7WPRq5XQzPpFSkzEbrobWsHCPVb69EyVclsHEjvfwLyyCHrIJ3iXoOkdEgy9G5F2ngLM2dELQRK4WqrfLFfNaXVAptHGF0MUmtGCUDwJ2SOlr9WMbkdPQ1c89Ou9TtAZ5ODQixZ1lkdv7D04xhQ5z8sP4rnje',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function importGroups() {
  try {
    console.log('Starting group import...');
    
    // Read the seed data file
    const seedDataPath = path.join(__dirname, 'seed-groups.ndjson');
    const seedData = fs.readFileSync(seedDataPath, 'utf8');
    
    // Parse each line as JSON
    const groups = seedData.trim().split('\n').map(line => JSON.parse(line));
    
    console.log(`Found ${groups.length} groups to import`);
    
    // Import each group
    for (const group of groups) {
      try {
        console.log(`Importing: ${group.name}`);
        
        // Create the group document
        const result = await client.create(group);
        console.log(`✅ Successfully imported: ${group.name} (ID: ${result._id})`);
        
        // Add a small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Failed to import ${group.name}:`, error.message);
      }
    }
    
    console.log('Group import completed!');
    
  } catch (error) {
    console.error('Import failed:', error);
  }
}

// Run the import
importGroups();

