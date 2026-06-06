import { Zap, Droplet, Video, Search } from 'lucide-react';
import { articleBl1 } from './blogs/bao-loc-1';
import { articleBl2 } from './blogs/bao-loc-2';
import { articleBl3 } from './blogs/bao-loc-3';
import { articleHcm1 } from './blogs/hcm-1';
import { articleHcm2 } from './blogs/hcm-2';
import { articleHcm3 } from './blogs/hcm-3';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  image: string;
  readTime: string;
  tags: string[];
  faq?: { question: string; answer: string }[];
}

export const BLOG_CATEGORIES = [
  { id: 'all', title: 'Tất cả' },
  { id: 'electrical', title: 'Điện', icon: Zap },
  { id: 'plumbing', title: 'Nước', icon: Droplet },
  { id: 'camera', title: 'Camera', icon: Video },
  { id: 'detection', title: 'Dò Tìm', icon: Search },
];

export const BLOG_POSTS: BlogPost[] = [
  // Lấy các bài viết chất lượng cao hoàn thiện 100% làm fallback chính thức
  articleBl1,
  articleBl2,
  articleBl3,
  articleHcm1,
  articleHcm2,
  articleHcm3
];
