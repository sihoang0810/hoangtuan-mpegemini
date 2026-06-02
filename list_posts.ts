import { createClient } from '@sanity/client';

const projectId = 'd2upoych';
const dataset = 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  useCdn: false
});

async function run() {
  const posts = await client.fetch(`*[_type == "post"] {
    title,
    "slug": slug.current,
    "locationSlug": location->slug.current
  }`);
  console.log(`Total blog posts in Sanity: ${posts.length}`);
  posts.forEach(p => {
    console.log(`- Title: "${p.title}"\n  Slug: "${p.slug}"\n  LocationSlug: "${p.locationSlug}"\n`);
  });
}

run().catch(console.error);
