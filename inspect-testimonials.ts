import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-05-21',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  const query = `*[_type == "testimonial"]`;
  const docs = await client.fetch(query);
  console.log(JSON.stringify(docs, null, 2));
}

main().catch(console.error);
