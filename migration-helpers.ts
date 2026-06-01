import { SanityClient } from '@sanity/client';

/**
 * Clean and convert string to highly readable and safe slug.
 * Specially designed to strip complex Vietnamese accents.
 */
export function slugify(str: string): string {
  if (!str) return '';
  let slug = str.toLowerCase().trim();
  
  // Replace Vietnamese specific accented characters
  slug = slug.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  slug = slug.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  slug = slug.replace(/[ìíịỉĩ]/g, 'i');
  slug = slug.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  slug = slug.replace(/[ùúụủũưừứựửữ]/g, 'u');
  slug = slug.replace(/[ỳýỵỷỹ]/g, 'y');
  slug = slug.replace(/đ/g, 'd');
  
  // Remove punctuation and special symbols
  slug = slug.replace(/[^a-z0-9\s-]/g, '');
  
  // Replace spaces and repeat hyphens
  slug = slug.replace(/[\s_]+/g, '-');
  slug = slug.replace(/-+/g, '-');
  
  // Trim leading/trailing hyphens
  return slug.replace(/^-+|-+$/g, '');
}

/**
 * Returns a Sanity Reference Object pointing to a given document ID.
 */
export function createReference(refId: string) {
  return {
    _type: 'reference',
    _ref: refId
  };
}

/**
 * Deterministic ID Generator for Sanity Migration.
 * Ensures seed imports are idempotent, avoiding dual duplicates on retry runs.
 */
export function generateDeterministicId(type: string, locationSlug: string, key: string): string {
  const cleanType = slugify(type);
  const cleanLoc = slugify(locationSlug || 'global');
  const cleanKey = slugify(key);
  
  return `${cleanType}-${cleanLoc}-${cleanKey}`.substring(0, 150);
}

/**
 * Safely executes document upserts with detailed feedback logging.
 */
export async function upsertDocument(
  client: SanityClient,
  doc: any,
  report: { created: number; updated: number; failed: number; log: string[] }
) {
  try {
    if (!doc._id) {
      throw new Error(`Document of type '${doc._type}' is missing required '_id' field.`);
    }

    console.log(`💾 Upserting [${doc._type}] ID: ${doc._id}...`);
    const status = await client.createOrReplace(doc);
    
    report.created++;
    const msg = `✅ [SUCCESS] Upserted [${doc._type}] with ID: "${status._id}" successfully.`;
    report.log.push(msg);
  } catch (err: any) {
    report.failed++;
    const errMsg = `❌ [FAILED] Error upserting [${doc._type}] ID: "${doc._id}": ${err.message || err}`;
    console.error(errMsg);
    report.log.push(errMsg);
  }
}
