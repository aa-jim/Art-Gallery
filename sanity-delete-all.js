const { createClient } = require("@sanity/client");

require('dotenv').config();

const client = createClient({
  projectId: "3kct911x",
  dataset: "production",
  useCdn: false,
  token: process.env.SANITY_IMPORT_TOKEN, // Protected variable
  apiVersion: "2024-01-01",
});

async function deleteAll() {
  console.log("🗑️  Deleting all artwork documents...");
  const docs = await client.fetch(`*[_type == "artwork"]._id`);
  console.log(`Found ${docs.length} documents`);
  for (const id of docs) {
    await client.delete(id);
    process.stdout.write(".");
  }
  console.log("\n✅ Done!");
}

deleteAll().catch(console.error);