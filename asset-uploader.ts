import { SanityClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Persistent cache to avoid re-uploading the same URL/file across script runs
const CACHE_FILE = path.join(process.cwd(), '.image-cache.json');
let uploadCache = new Map<string, string>();

// Load cache from disk if it exists
if (fs.existsSync(CACHE_FILE)) {
  try {
    const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    uploadCache = new Map(Object.entries(data));
    console.log(`📎 Loaded ${uploadCache.size} cached image references from ${CACHE_FILE}`);
  } catch (err) {
    console.warn('⚠️ Failed to load image cache file:', err);
  }
}

function saveCache() {
  try {
    const data = Object.fromEntries(uploadCache.entries());
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.warn('⚠️ Failed to save image cache file:', err);
  }
}

/**
 * Downloads a remote image or reads a local image and uploads it as a Sanity Asset.
 * Returns the secure Sanity CDN URL of the uploaded asset.
 * If the upload fails, it logs a warning and falls back to the original source.
 */
export async function uploadImageAsset(client: SanityClient, imageSource: string): Promise<string> {
  if (!imageSource) return '';

  // Return cached result if already processed
  if (uploadCache.has(imageSource)) {
    // console.log(`🚀 Using cached asset for: ${imageSource.slice(0, 50)}...`);
    return uploadCache.get(imageSource)!;
  }

  try {
    let buffer: Buffer;
    let filename = '';

    if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
      // Remote image URL
      console.log(`📡 Fetching remote image: ${imageSource}`);
      const response = await fetch(imageSource);
      if (!response.ok) {
        throw new Error(`Failed to fetch remote image: ${response.statusText} (${response.status})`);
      }
      const arrayBuffer = await response.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      
      // Extract clean filename from URL parameter or pathname
      try {
        const parsedUrl = new URL(imageSource);
        const urlPath = parsedUrl.pathname;
        filename = path.basename(urlPath) || 'asset.jpg';
        
        // Add unsplash photo ID to filename if it matches unsplash structure to avoid overlapping names
        if (parsedUrl.hostname.includes('unsplash.com') && urlPath.startsWith('/photo-')) {
          const photoId = urlPath.split('/')[1] || 'photo';
          filename = `${photoId}.jpg`;
        }
      } catch {
        filename = 'remote-image.jpg';
      }
    } else {
      // Local file path
      const rootDir = process.cwd();
      const possiblePaths = [
        path.join(rootDir, 'public', imageSource),
        path.join(rootDir, 'public', imageSource.replace(/^\//, '')),
        path.join(rootDir, imageSource),
        path.join(rootDir, imageSource.replace(/^\//, ''))
      ];

      let resolvedPath = '';
      for (const p of possiblePaths) {
        if (fs.existsSync(p) && fs.statSync(p).isFile()) {
          resolvedPath = p;
          break;
        }
      }

      if (!resolvedPath) {
        throw new Error(`Local file not found across searched paths for: ${imageSource}`);
      }

      console.log(`💾 Reading local image: ${resolvedPath}`);
      buffer = fs.readFileSync(resolvedPath);
      filename = path.basename(resolvedPath);
    }

    // Upload asset to Sanity
    console.log(`📤 Uploading '${filename}' (${buffer.length} bytes) to Sanity Assets...`);
    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType: getMimeType(filename)
    });

    console.log(`✨ Successfully uploaded. Sanity CDN URL: ${asset.url}`);
    uploadCache.set(imageSource, asset.url);
    saveCache(); // Persist to disk
    return asset.url;
  } catch (err: any) {
    console.warn(`⚠️ Warning: Failed to upload image '${imageSource}' to Sanity:`, err.message || err);
    console.warn(`👉 Gracefully falling back to the original image reference.`);
    // Cache the original as fallback to avoid redundant upload failures
    uploadCache.set(imageSource, imageSource);
    saveCache(); // Persist to disk
    return imageSource;
  }
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    case '.webp': return 'image/webp';
    case '.jpg':
    case '.jpeg':
    default:
      return 'image/jpeg';
  }
}
