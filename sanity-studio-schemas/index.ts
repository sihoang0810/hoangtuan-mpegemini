/**
 * Sanity Studio v3 entry schemaTypes list config.
 * Sao chép toàn bộ tệp này vào schemaTypes/index.ts trong thư mục Sanity của bạn.
 * 
 * Toàn bộ các schema tuân thủ nghiêm ngặt nguyên tắc Headless CMS:
 * - Chỉ quản lý dữ liệu gốc (Semantic Content).
 * - Hoàn toàn không can thiệp vào bố cục, kiểu dáng, Responsive hay hiển thị của React.
 */

import { siteSettings } from './siteSettings';
import { service } from './service';
import { post } from './post';
import { testimonial } from './testimonial';
import { faq } from './faq';
import { product } from './product';

export const schemaTypes = [
  siteSettings,
  service,
  post,
  testimonial,
  faq,
  product
];
