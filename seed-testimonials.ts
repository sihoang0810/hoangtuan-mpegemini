import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { slugify, createReference, generateDeterministicId } from './migration-helpers';
import { resolveDocumentImages } from './image-resolver';
import { LOCALIZED_REVIEWS, LOCALIZED_TESTIMONIALS } from './src/data/localizedReviews';

// Configure and load variables from .env
dotenv.config();

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

console.log('========================================================================');
console.log(' 🛠️   HOÀNG TUẤN MPE - DEDICATED TESTIMONIAL & REVIEW SEED SYSTEM');
console.log('========================================================================');

if (!projectId || projectId === 'your_sanity_project_id') {
  console.error('⛔ Error: VITE_SANITY_PROJECT_ID is not configured in your .env file.');
  process.exit(1);
}

if (!token || token === 'your_sanity_write_token') {
  console.error('⛔ Error: SANITY_WRITE_TOKEN is not configured in your .env file or is a placeholder.');
  process.exit(1);
}

console.log(`🔗 Connecting to Sanity Project: "${projectId}" on dataset: "${dataset}"...`);

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  token,
  useCdn: false,
});

async function runSeed() {
  const report = {
    created: 0,
    failed: 0,
    log: [] as string[]
  };

  const seedDocuments: any[] = [];

  const locations = [
    { slug: 'bao-loc', refId: 'location-baoloc' },
    { slug: 'ho-chi-minh', refId: 'location-hcm' }
  ];

  // Loop through both locations to build the testimonial and review docs
  for (const { slug: locSlug, refId: locRefId } of locations) {
    console.log(`📦 Building customer feedback documents for Location: [${locSlug}] ...`);

    // 1. Testimonials (Đánh giá khách hàng)
    const testimonialsList = LOCALIZED_TESTIMONIALS[locSlug] || [];
    testimonialsList.forEach((t, index) => {
      const tId = generateDeterministicId('testimonial', locSlug, `t${index}-${slugify(t.name).slice(0, 15)}`);
      
      // Building schema-compliant fields for both front-end query options
      seedDocuments.push({
        _id: tId,
        _type: 'testimonial',
        location: createReference(locRefId),
        locations: [locSlug], // Schema Compliant
        name: t.name,
        customerName: t.name, // Schema Compliant
        role: t.role,
        customerRole: t.role, // Schema Compliant
        review: t.review,
        content: t.review, // Schema Compliant
        rating: t.rating,
        avatar: t.avatar,
        order: index
      });
    });

    // 2. Verified Reviews (Phản hồi thực tế)
    const reviewsList = LOCALIZED_REVIEWS[locSlug] || [];
    reviewsList.forEach((rev, index) => {
      const revId = generateDeterministicId('review', locSlug, `r${index}-${slugify(rev.customerName).slice(0, 15)}`);
      
      seedDocuments.push({
        _id: revId,
        _type: 'review',
        location: createReference(locRefId),
        customerName: rev.customerName,
        comment: rev.comment,
        score: rev.score,
        date: rev.date,
        verifiedPurchase: rev.verifiedPurchase
      });
    });
  }

  console.log(`\n🚀 Verification Complete: Staging ${seedDocuments.length} feedback documents. Starting avatar migrations and upserts...`);

  // Helper to chunk an array
  const chunk = <T>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const fullyProcessedDocs: any[] = [];

  // Process images/avatars in parallel chunks of 10 to avoid any socket exhaustion
  const docChunks = chunk(seedDocuments, 10);
  console.log(`📸 Processing and uploading avatars for ${seedDocuments.length} documents...`);
  
  for (let cIdx = 0; cIdx < docChunks.length; cIdx++) {
    const docChunk = docChunks[cIdx];
    await Promise.all(
      docChunk.map(async (doc) => {
        try {
          const fullyProcessedDoc = await resolveDocumentImages(client, doc);
          fullyProcessedDocs.push(fullyProcessedDoc);
        } catch (err: any) {
          report.failed++;
          const errMsg = `❌ [FATAL PRE-WRITE PROCESS] Failed to parse customer feedback document ID: "${doc._id}": ${err.message || err}`;
          console.error(errMsg);
          report.log.push(errMsg);
        }
      })
    );
  }

  // Commit processed documents in transactional batches of 50
  const writeChunks = chunk(fullyProcessedDocs, 50);
  console.log(`\n💾 Committing ${fullyProcessedDocs.length} customer feedback documents to Sanity...`);
  
  for (let idx = 0; idx < writeChunks.length; idx++) {
    const writeChunk = writeChunks[idx];
    console.log(`📦 Committing transaction batch ${idx + 1}/${writeChunks.length} containing ${writeChunk.length} documents...`);
    try {
      const tx = client.transaction();
      for (const doc of writeChunk) {
        tx.createOrReplace(doc);
      }
      await tx.commit();
      report.created += writeChunk.length;
      console.log(`✨ Successfully committed batch ${idx + 1}.`);
    } catch (err: any) {
      report.failed += writeChunk.length;
      const errMsg = `❌ [BATCH FAILED] Failed to commit transaction batch ${idx + 1}: ${err.message || err}`;
      console.error(errMsg);
      report.log.push(errMsg);
    }
  }

  console.log('========================================================================');
  console.log(' 📊   CUSTOMER FEEDBACK SEED & DATA INTEGRITY REPORT');
  console.log('========================================================================');
  console.log(`- Successfully Migrated Documents: ${report.created}`);
  console.log(`- Failed Documents Node Pipelines: ${report.failed}`);
  console.log('------------------------------------------------------------------------');
  if (report.failed === 0) {
    console.log('🎉 GREAT SUCCESS! 100% of Customer Testimonials & Reviews have been seeded into Sanity!');
  } else {
    console.log('⚠️ Seed finished with some errors. Please check the logs above.');
  }
  console.log('========================================================================');
}

runSeed().catch((err) => {
  console.error('⛔ Critical script failure:', err);
  process.exit(1);
});
