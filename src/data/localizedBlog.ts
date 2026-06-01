// Tự động import 6 bài viết thật sự (hardcoded)
// LƯU Ý: Không sử dụng bất kỳ hàm generateBatch() nội bộ nào. Toàn bộ nội dung là bài viết SEO hoàn chỉnh 100% được lưu ở src/data/blogs/.

import { CMSBlogPost } from '../lib/sanity';
import { articleBl1 } from './blogs/bao-loc-1';
import { articleBl2 } from './blogs/bao-loc-2';
import { articleBl3 } from './blogs/bao-loc-3';
import { articleHcm1 } from './blogs/hcm-1';
import { articleHcm2 } from './blogs/hcm-2';
import { articleHcm3 } from './blogs/hcm-3';

// Danh sách các bài đăng không tạo máy, hoàn toàn viết tay theo chỉ định SEO Authority Pillar
const baoLocBlogs: CMSBlogPost[] = [
  articleBl1,
  articleBl2,
  articleBl3
];

const hoChiMinhBlogs: CMSBlogPost[] = [
  articleHcm1,
  articleHcm2,
  articleHcm3
];

// Cấu trúc Categories giữ nguyên
const BLOG_CATEGORIES = [
  {
    id: 'dien',
    title: 'Sửa Điện',
    description: 'Kiến thức và hướng dẫn xử lý sự cố điện'
  },
  {
    id: 'nuoc',
    title: 'Sửa Nước',
    description: 'Chuyên mục cấp thoát nước và đường ống'
  },
  {
    id: 'camera',
    title: 'Camera',
    description: 'Giải pháp an ninh và camera giám sát'
  },
  {
    id: 'tong-hop',
    title: 'Tổng Hợp',
    description: 'Tin tức và mẹo vặt gia đình'
  }
];

export const LOCALIZED_BLOGS = {
  'bao-loc': {
    posts: baoLocBlogs,
    categories: BLOG_CATEGORIES
  },
  'ho-chi-minh': {
    posts: hoChiMinhBlogs,
    categories: BLOG_CATEGORIES
  }
};
