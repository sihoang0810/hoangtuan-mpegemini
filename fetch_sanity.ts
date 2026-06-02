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
  console.log("=== SERVICES IN SANITY ===");
  const services = await client.fetch(`*[_type == "service"] {
    title,
    "slug": slug.current,
    "locationSlug": location->slug.current
  }`);
  console.log("Services size:", services.length);
  console.log(services);

  console.log("\n=== PRODUCTS IN SANITY ===");
  const products = await client.fetch(`*[_type == "product"] {
    title,
    "slug": slug.current,
    "locationSlug": location->slug.current
  }`);
  console.log("Products size:", products.length);
  console.log(products.slice(0, 10));

  console.log("\n=== BLOG POSTS IN SANITY ===");
  const posts = await client.fetch(`*[_type == "post"] {
    title,
    "slug": slug.current,
    "locationSlug": location->slug.current
  }`);
  console.log("Blog posts size:", posts.length);
  console.log(posts);
}

run().catch(console.error);
