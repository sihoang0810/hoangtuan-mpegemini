import { Wrench, Zap, Droplets, Camera, Search } from 'lucide-react';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'electrical' | 'plumbing' | 'camera' | 'leak-detection';
  description: string;
  price: string;
  image: string;
  features: string[];
  specs: { [key: string]: string };
}

export const PRODUCT_CATEGORIES = [
  { 
    id: 'electrical', 
    title: 'Điện dân dụng', 
    icon: Zap,
    description: 'Thiết bị điện chính hãng từ các thương hiệu uy tín như MPE, Panasonic, Schneider.'
  },
  { 
    id: 'plumbing', 
    title: 'Nước dân dụng', 
    icon: Droplets,
    description: 'Ống dẫn nước, máy bơm và thiết bị vệ sinh cao cấp cho gia đình.'
  },
  { 
    id: 'camera', 
    title: 'Camera giám sát', 
    icon: Camera,
    description: 'Giải pháp an ninh thông minh từ Ezviz, Imou, Hikvision.'
  },
  { 
    id: 'leak-detection', 
    title: 'Thiết bị dò tìm', 
    icon: Search,
    description: 'Công nghệ siêu âm hiện đại hỗ trợ dò tìm rò rỉ nước không đục phá.'
  },
];

export const PRODUCTS: Product[] = [
  // ĐIỆN
  {
    id: 'p1',
    slug: 'aptomat-mpe',
    name: 'Aptomat (CB) MPE',
    category: 'electrical',
    description: 'Thiết bị đóng ngắt bảo vệ mạch điện quá tải và ngắn mạch. Chất lượng tiêu chuẩn Châu Âu.',
    price: 'Từ 85.000đ',
    image: 'https://images.unsplash.com/photo-1558230352-78d91c78494b?auto=format&fit=crop&q=80&w=800',
    features: ['Độ bền cao', 'Tự động ngắt khi quá tải', 'Dễ dàng lắp đặt'],
    specs: { 'Thương hiệu': 'MPE', 'Loại': 'CB tép', 'Dòng định mức': '6A - 63A' }
  },
  {
    id: 'p2',
    slug: 'o-cam-am-tuong-mpe',
    name: 'Ổ cắm điện âm tường MPE',
    category: 'electrical',
    description: 'Thiết kế sang trọng, chịu tải tốt, nhựa chống cháy cao cấp.',
    price: 'Từ 45.000đ',
    image: 'https://images.unsplash.com/photo-1590684153482-d33022730ce1?auto=format&fit=crop&q=80&w=800',
    features: ['Nhựa chống cháy', 'Lò xo đàn hồi tốt', 'Kiểu dáng hiện đại'],
    specs: { 'Thương hiệu': 'MPE', 'Chất liệu': 'Polycarbonate', 'Màu sắc': 'Trắng' }
  },
  {
    id: 'p3',
    slug: 'cb-chong-giat-panasonic',
    name: 'CB Chống Giật Panasonic',
    category: 'electrical',
    description: 'Bảo vệ an toàn tuyệt đối cho gia đình bạn khỏi rủi ro rò rỉ điện.',
    price: 'Từ 450.000đ',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    features: ['Độ nhạy cao 30mA', 'Ngắt điện tức thì', 'Công nghệ Nhật Bản'],
    specs: { 'Thương hiệu': 'Panasonic', 'Dòng rò': '30mA', 'Số cực': '2P' }
  },
  // NƯỚC
  {
    id: 'p4',
    slug: 'may-bom-day-cao-panasonic',
    name: 'Máy bơm đẩy cao Panasonic 200W',
    category: 'plumbing',
    description: 'Giải pháp cấp nước mạnh mẽ cho nhà cao tầng.',
    price: 'Từ 1.850.000đ',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800',
    features: ['Vận hành êm ái', 'Tiết kiệm điện', 'Độ bền vượt trội'],
    specs: { 'Công suất': '200W', 'Lưu lượng': '45L/phút', 'Độ cao đẩy': '30m' }
  },
  {
    id: 'p5',
    slug: 'ong-nuoc-ppr-binh-minh',
    name: 'Ống nước chịu nhiệt PPR Bình Minh',
    category: 'plumbing',
    description: 'Chuyên dụng cho hệ thống nước nóng trung tâm.',
    price: 'Liên hệ',
    image: 'https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800',
    features: ['Chịu nhiệt tốt', 'Không đóng cặn', 'Chống ăn mòn'],
    specs: { 'Thương hiệu': 'Bình Minh', 'Chất liệu': 'Nhựa PPR', 'Chịu nhiệt': 'Lên đến 95°C' }
  },
  // CAMERA
  {
    id: 'p6',
    slug: 'camera-ezviz-c6n',
    name: 'Camera WiFi Ezviz C6N 1080p',
    category: 'camera',
    description: 'Camera xoay 360 độ thông minh cho gia đình.',
    price: '590.000đ',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
    features: ['Xoay 360 độ', 'Đàm thoại 2 chiều', 'Theo dõi chuyển động'],
    specs: { 'Độ phân giải': 'Full HD 1080p', 'Tầm nhìn đêm': '10m', 'Lưu trữ': 'MicroSD / Cloud' }
  },
  {
    id: 'p7',
    slug: 'camera-imou-cruiser',
    name: 'Camera Ngoài Trời Imou Cruiser 4MP',
    category: 'camera',
    description: 'Camera xoay ngoài trời có màu ban đêm siêu nét.',
    price: '1.250.000đ',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800',
    features: ['Chống nước IP66', 'Màu ban đêm Full Color', 'Còi hú báo động'],
    specs: { 'Độ phân giải': '4.0 MP (2K)', 'Chuẩn nén': 'H.265', 'Tính năng': 'AI nhận diện người' }
  },
  // THIẾT BỊ DÒ TÌM
  {
    id: 'p8',
    slug: 'may-do-ro-ri-pqwt',
    name: 'Máy dò rò rỉ nước siêu âm PQWT',
    category: 'leak-detection',
    description: 'Thiết bị chuyên nghiệp giúp xác định chính xác vị trí rò rỉ âm tường, âm nền.',
    price: 'Sử dụng theo dịch vụ',
    image: 'https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800',
    features: ['Độ chính xác cao', 'Màn hình hiển thị sóng âm', 'Công nghệ Nhật Bản'],
    specs: { 'Loại': 'Siêu âm đa kênh', 'Dải tần': '1-10000Hz', 'Độ sâu tối đa': '2m' }
  }
];
