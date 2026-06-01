import { SanityClient } from '@sanity/client';
import { uploadImageAsset } from './asset-uploader';

/**
 * Scanning registry of fields that are designated as images across all Sanity schemas.
 */
const IMAGE_FIELD_NAMES = new Set([
  'image',
  'aboutImage',
  'avatar',
  'logo',
  'favicon',
  'ogImage',
  'promoImage',
  'thumbnail'
]);

/**
 * Scan a document and resolve all image properties. Any image properties (local files or remote URLs)
 * are uploaded to Sanity Assets and updated with secure Sanity CDN url references.
 */
export async function resolveDocumentImages<T extends Record<string, any>>(
  client: SanityClient,
  doc: T
): Promise<T> {
  if (!doc || typeof doc !== 'object') {
    return doc;
  }

  // Create a deep copy of the document to avoid modifying the original data sources
  const clonedDoc = JSON.parse(JSON.stringify(doc)) as T;

  async function traverseAndResolve(obj: any): Promise<void> {
    if (!obj || typeof obj !== 'object') {
      return;
    }

    // Traverse arrays
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const item = obj[i];
        if (typeof item === 'string' && isImageString(item)) {
          obj[i] = await uploadImageAsset(client, item);
        } else if (item && typeof item === 'object') {
          await traverseAndResolve(item);
        }
      }
      return;
    }

    // Traverse object keys
    for (const key of Object.keys(obj)) {
      const val = obj[key];

      if (typeof val === 'string') {
        if (IMAGE_FIELD_NAMES.has(key) || isImageString(val)) {
          obj[key] = await uploadImageAsset(client, val);
        }
      } else if (val && typeof val === 'object') {
        await traverseAndResolve(val);
      }
    }
  }

  await traverseAndResolve(clonedDoc);
  return clonedDoc;
}

/**
 * Basic heuristic check if a string is a valid image source (local image or remote URL)
 */
function isImageString(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  
  // Exclude simple text, phone paths, etc.
  if (str.startsWith('tel:') || str.startsWith('mailto:') || str.startsWith('/') && !str.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)/i)) {
    return false;
  }

  // Check extensions
  const hasImageExtension = /\.(jpg|jpeg|png|gif|svg|webp|ico)(\?.*)?$/i.test(str);
  
  // Check typical image URLs like Unsplash which might not have conventional extensions
  const isImageHostingUrl = str.includes('images.unsplash.com') || str.includes('api.dicebear.com') || str.includes('cdn.sanity.io');

  return hasImageExtension || isImageHostingUrl;
}
