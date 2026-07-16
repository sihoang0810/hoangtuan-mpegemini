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
  'thumbnail',
  'mainImage',
  'productImage',
  'metaShareImage'
]);

/**
 * Convert a Sanity CDN URL (or local path uploaded to Sanity) to a proper Sanity image object.
 */
function buildSanityImageObject(url: string) {
  if (!url || typeof url !== 'string' || !url.includes('cdn.sanity.io')) {
    return url;
  }
  try {
    const parts = url.split('/');
    const filename = parts[parts.length - 1]; // e.g., "a1da895a062eb05cb96777a3adde3bfb64cf2ecd-280x280.svg"
    
    // Replace the last dot with a hyphen to match Sanity asset ID format
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) return url;
    
    const base = filename.substring(0, lastDotIndex);
    const ext = filename.substring(lastDotIndex + 1);
    const assetId = `image-${base}-${ext}`;
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId
      }
    };
  } catch {
    return url;
  }
}

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
          const uploadedUrl = await uploadImageAsset(client, item);
          obj[i] = buildSanityImageObject(uploadedUrl);
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
        if (IMAGE_FIELD_NAMES.has(key)) {
          const uploadedUrl = await uploadImageAsset(client, val);
          obj[key] = buildSanityImageObject(uploadedUrl);
        } else if (isImageString(val)) {
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
  
  const cleanStr = str.trim();
  
  // Limit length: a real image URL or path shouldn't be thousands of characters long
  if (cleanStr.length > 2048) {
    return false;
  }

  // Exclude HTML content tags
  if (cleanStr.includes('<') || cleanStr.includes('>')) {
    return false;
  }
  
  // Exclude simple text, phone paths, etc.
  if (cleanStr.startsWith('tel:') || cleanStr.startsWith('mailto:') || (cleanStr.startsWith('/') && !cleanStr.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)/i))) {
    return false;
  }

  // Check extensions
  const hasImageExtension = /\.(jpg|jpeg|png|gif|svg|webp|ico)(\?.*)?$/i.test(cleanStr);
  
  // Check typical image URLs like Unsplash which might not have conventional extensions, but must be direct URLs
  const isImageHostingUrl = (cleanStr.startsWith('http://') || cleanStr.startsWith('https://')) &&
    (cleanStr.includes('images.unsplash.com') || cleanStr.includes('api.dicebear.com') || cleanStr.includes('cdn.sanity.io'));

  return hasImageExtension || isImageHostingUrl;
}
