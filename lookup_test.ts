import { createClient } from '@sanity/client';

const projectId = 'd2upoych';
const dataset = 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  useCdn: false
});

const serviceBySlugQuery = `*[_type == "service" && (slug == $slug || slug.current == $slug) && location->slug.current == $locationSlug][0] {
  _id,
  id,
  slug,
  title
}`;

const productBySlugQuery = `*[_type == "product" && (slug == $slug || slug.current == $slug) && location->slug.current == $locationSlug][0] {
  _id,
  id,
  slug,
  title,
  name
}`;

const postBySlugQuery = `*[_type == "post" && (slug == $slug || slug.current == $slug) && location->slug.current == $locationSlug][0] {
  _id,
  id,
  slug,
  title
}`;

async function run() {
  console.log("--- TEST 1: Service sua-dien in bao-loc ---");
  const srvBaoLoc = await client.fetch(serviceBySlugQuery, { slug: 'sua-dien', locationSlug: 'bao-loc' });
  console.log("srvBaoLoc:", srvBaoLoc);

  console.log("\n--- TEST 2: Product camera-wifi-ezviz-c6n in bao-loc ---");
  const prdBaoLoc = await client.fetch(productBySlugQuery, { slug: 'camera-wifi-ezviz-c6n', locationSlug: 'bao-loc' });
  console.log("prdBaoLoc:", prdBaoLoc);

  console.log("\n--- TEST 3: BlogPost sua-dien-dan-dung-tai-bao-loc in bao-loc ---");
  const postBaoLoc = await client.fetch(postBySlugQuery, { slug: 'sua-dien-dan-dung-tai-bao-loc', locationSlug: 'bao-loc' });
  console.log("postBaoLoc:", postBaoLoc);
}

run().catch(console.error);
