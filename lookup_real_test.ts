import { createClient } from '@sanity/client';

const projectId = 'd2upoych';
const dataset = 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  useCdn: false
});

const postBySlugQuery = `*[_type == "post" && (slug == $slug || slug.current == $slug) && location->slug.current == $locationSlug][0] {
  _id,
  id,
  title,
  "slug": slug.current,
  "locationSlug": location->slug.current
}`;

async function run() {
  const result = await client.fetch(postBySlugQuery, { slug: 'cb-aptomat-nhay-lien-tuc-bao-loc', locationSlug: 'bao-loc' });
  console.log("Result:", result);
}

run().catch(console.error);
