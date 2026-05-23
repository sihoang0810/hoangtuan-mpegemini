import { CMSProduct } from '../lib/sanity';
import { CMS_PRODUCTS, CmsProduct } from './cmsProducts';

// Helper to convert rich CMS products database to localized frontend products
function mapToCmsProduct(p: CmsProduct, isHcm: boolean): CMSProduct {
  const regionName = isHcm ? 'TP.HCM' : 'Bảo Lộc';
  const priceStr = p.salePrice 
    ? `${p.salePrice.toLocaleString('vi-VN')}đ` 
    : `${p.price.toLocaleString('vi-VN')}đ`;

  // Filter out any trailing or duplicate region phrases in name, then append clean regional name
  const cleanBaseName = p.title
    .replace(/tại Bảo Lộc, Lâm Đồng/g, '')
    .replace(/tại Bảo Lộc/g, '')
    .replace(/tại TP\.HCM/g, '')
    .replace(/Bảo Lộc, Lâm Đồng|Bảo Lộc|Lâm Đồng|Hồ Chí Minh|Sài Gòn|TP\.HCM/g, '')
    .trim();

  const name = `${cleanBaseName} tại ${regionName}`;

  // Localize content description text
  const currentRegion = isHcm ? 'Thành phố Hồ Chí Minh (TP.HCM)' : 'Bảo Lộc, Lâm Đồng';
  const description = p.description
    .replace(/Bảo Lộc, Lâm Đồng/g, currentRegion)
    .replace(/Bảo Lộc/g, isHcm ? 'Hồ Chí Minh' : 'Bảo Lộc')
    .replace(/Sài Gòn|TP\.HCM/g, isHcm ? 'TP.HCM' : 'Bảo Lộc')
    .replace(/Lâm Đồng/g, isHcm ? 'TP. Hồ Chí Minh' : 'Lâm Đồng');

  // Specs array to dictionary
  const specs: { [key: string]: string } = {};
  p.specifications.forEach(spec => {
    specs[spec.key] = spec.value;
  });

  return {
    id: p.sku,
    slug: p.slug,
    name,
    category: p.category,
    description,
    price: priceStr,
    image: p.featuredImage,
    features: p.features,
    specs,
    gallery: p.gallery
  };
}

export const LOCALIZED_PRODUCTS: { [key: string]: CMSProduct[] } = {
  'bao-loc': CMS_PRODUCTS.map(p => mapToCmsProduct(p, false)),
  'ho-chi-minh': CMS_PRODUCTS.map(p => mapToCmsProduct(p, true))
};
