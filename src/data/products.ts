import { Wrench, Zap, Droplets, Camera, Search, Sun, Hammer } from 'lucide-react';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'electrical' | 'plumbing' | 'camera' | 'leak-detection' | 'detection' | 'solar' | 'construction';
  description: string;
  price: string;
  image: string;
  features?: string[];
  specs?: { [key: string]: string } | string;
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
    id: 'construction', 
    title: 'Thi công trọn gói', 
    icon: Hammer,
    description: 'Vật tư thi công cơ điện nước trọn gói cho công trình nhà phố, biệt thự.'
  },
  { 
    id: 'solar', 
    title: 'Đèn năng lượng', 
    icon: Sun,
    description: 'Đèn pha LED, đèn đường năng lượng mặt trời thông minh tự sạc siêu sáng.'
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
  },
  // ĐÈN NĂNG LƯỢNG MẶT TRỜI
  {
    id: 'p9',
    slug: 'den-pha-led-nang-luong-mat-troi-jidian-200w',
    name: 'Đèn pha LED năng lượng mặt trời Jidian 200W',
    category: 'solar',
    description: 'Đèn pha LED năng lượng mặt trời siêu sáng, tự sạc thông minh, chống nước tiêu chuẩn IP67 chịu mưa nắng cực tốt.',
    price: '750.000đ',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800',
    features: ['Chống nước tuyệt đối IP67', 'Tự động bật khi tối và sạc khi sáng', 'Remote điều khiển khoảng cách 10m'],
    specs: { 'Thương hiệu': 'Jidian', 'Công suất': '200W', 'Dung lượng pin': '24.000mAh', 'Thời gian chiếu sáng': '12 - 15 giờ' }
  },
  {
    id: 'p10',
    slug: 'den-duong-nang-luong-mat-troi-chiec-la-300w',
    name: 'Đèn đường năng lượng mặt trời chiếc lá 300W',
    category: 'solar',
    description: 'Thiết kế hình chiếc lá tối ưu góc chiếu sáng, sử dụng chip LED cao cấp và cảm biến chuyển động thông minh.',
    price: '1.150.000đ',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    features: ['Cảm biến chuyển động hồng ngoại', 'Vỏ nhôm đúc nguyên khối tản nhiệt cực tốt', 'Lắp đặt dễ dàng không cần đi dây điện'],
    specs: { 'Thương hiệu': 'Solar Light', 'Công suất': '300W', 'Chất liệu': 'Nhôm đúc', 'Chuẩn chống nước': 'IP66' }
  },
  // THI CÔNG TRỌN GÓI
  {
    id: 'p11',
    slug: 'goi-thi-cong-dien-nuoc-nha-pho-tron-goi',
    name: 'Thi công điện nước nhà phố trọn gói (Vật tư + Nhân công)',
    category: 'construction',
    description: 'Dịch vụ thi công lắp đặt trọn gói hệ thống điện nước, điện nhẹ chuẩn kỹ thuật cho công trình nhà phố từ phần thô đến hoàn thiện.',
    price: 'Từ 120.000đ/m2',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    features: ['Đội ngũ kỹ sư, thợ lành nghề', 'Thi công cam kết đúng tiến độ', 'Bảo hành hệ thống lên đến 24 tháng'],
    specs: { 'Gói thi công': 'Nhà phố / Biệt thự', 'Phạm vi': 'Toàn tỉnh Lâm Đồng & TP.HCM', 'Bảo hành': '24 tháng kể từ ngày bàn giao' }
  }
];
