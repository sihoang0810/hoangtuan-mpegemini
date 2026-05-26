import { 
  Zap, 
  Droplet, 
  Settings, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  MapPin 
} from 'lucide-react';

export const COLORS = {
  primary: "#0EA5E9",
  secondary: "#1E293B",
  accent: "#F97316",
};

export const SERVICES = [
  {
    id: 1,
    title: "Sửa điện dân dụng",
    description: "Xử lý nhanh các sự cố chập điện, mất điện, thay thế thiết bị điện gia đình an toàn.",
    icon: Zap,
    category: "Electrical"
  },
  {
    id: 2,
    title: "Sửa chập điện",
    description: "Dò tìm vị trí chập điện âm tường, xử lý triệt để nguy cơ hỏa hoạn.",
    icon: ShieldCheck,
    category: "Electrical"
  },
  {
    id: 3,
    title: "Sửa máy bơm nước",
    description: "Sửa chữa, lắp đặt máy bơm nước các loại, xử lý máy bơm không lên nước hoặc kêu to.",
    icon: Settings,
    category: "Plumbing"
  },
  {
    id: 4,
    title: "Thông tắc bồn cầu",
    description: "Thông tắc bồn cầu, cống thoát nước bằng máy lò xo hiện đại, không đục phá.",
    icon: Wrench,
    category: "Plumbing"
  },
  {
    id: 5,
    title: "Sửa rò rỉ nước",
    description: "Dò tìm và sửa chữa rò rỉ nước âm tường, giảm hóa đơn tiền nước hàng tháng.",
    icon: Droplet,
    category: "Plumbing"
  },
  {
    id: 6,
    title: "Lắp đặt thiết bị",
    description: "Lắp đặt máy nước nóng, vòi sen, bồn cầu, đèn trang trí và các thiết bị điện nước khác.",
    icon: CheckCircle2,
    category: "General"
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ kỹ thuật trực chiến bất kể ngày đêm, lễ tết.",
    icon: Clock
  },
  {
    title: "Có mặt nhanh",
    description: "Cam kết có mặt tại nhà khách hàng chỉ sau 30 phút gọi.",
    icon: MapPin
  },
  {
    title: "Báo giá minh bạch",
    description: "Kiểm tra tình trạng, báo giá rõ ràng trước khi bắt tay vào sửa.",
    icon: DollarSign
  },
  {
    title: "Bảo hành dịch vụ",
    description: "Chế độ bảo hành dài hạn sau khi sửa chữa, an tâm sử dụng.",
    icon: ShieldCheck
  }
];

export const LOCATIONS = [
  {
    id: 'bao-loc',
    name: 'Bảo Lộc',
    hotline: '0389.011.315',
    description: 'Trụ sở chính, hỗ trợ nhanh nhất khu vực Lâm Đồng.'
  },
  {
    id: 'ho-chi-minh',
    name: 'Hồ Chí Minh',
    hotline: '0389.011.315',
    description: 'Văn phòng đại diện, hỗ trợ khu vực các quận nội thành.'
  }
];

export const TESTIMONIALS = [
  {
    name: "Anh Hoàng Nam",
    role: "Quận 1, TP.HCM",
    review: "Dịch vụ rất nhanh, thợ đến chỉ sau 20 phút. Báo giá rõ ràng, không vẽ vời linh tinh. Tôi rất hài lòng.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nam"
  },
  {
    name: "Chị Minh Tuyết",
    role: "Phường 2, TP. Bảo Lộc",
    review: "Máy bơm nhà tôi bị cháy lúc nửa đêm, gọi bên này vẫn có người hỗ trợ ngay. Thợ làm việc chuyên nghiệp, sạch sẽ.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tuyet"
  },
  {
    name: "Chú Hùng",
    role: "Quận Thủ Đức, TP.HCM",
    review: "Tôi đã gọi nhiều nơi nhưng ở đây làm việc tận tâm nhất. Sửa xong còn dọn dẹp hiện trường rất gọn gàng.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hung"
  },
  {
    name: "Chị Khánh Vân",
    role: "Khu biệt thự Lộc Thanh, Bảo Lộc",
    review: "Tôi rất hài lòng với gói dịch vụ bảo trì lò sưởi và hệ thống điện nước thông minh của Hoàng Tuấn. Đội ngũ nhiệt tình chăm sóc.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Van"
  },
  {
    name: "Chị Hồng Hạnh",
    role: "Quận 3, TP. Hồ Chí Minh",
    review: "Chập điện sập CB giữa trưa nắng ngắt cả điều hòa, may nhờ thợ Hoàng Tuấn sang thay thế dây chịu nhiệt cấp tốc. Chuyên nghiệp bậc nhất Sài Gòn.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hong"
  },
  {
    name: "Cô Mỹ Hạnh",
    role: "Đường Hà Giang, Bảo Lộc",
    review: "Bồn nước bị rò rỉ âm không rõ lý do, Hoàng Tuấn cho thợ dùng máy phát hiện rò rỉ siêu âm dò đúng góc nhà tắm. Bảo hành uy tín 12 tháng rất an tâm.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hanh"
  },
  {
    name: "Cô Bích Liên",
    role: "Quận Phú Nhuận, TP.HCM",
    review: "Sửa trần đèn MPE phòng khách sang xịn mịn. Thợ làm việc cẩn thận, bọc phủ che chắn sàn và tủ gỗ không để dính một hạt bụi thạch cao.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lien"
  }
];

export const BLOG_POSTS = [
  {
    title: "5 lưu ý quan trọng khi tự sửa điện tại nhà",
    excerpt: "Việc tự sửa điện có thể nguy hiểm nếu bạn không nắm vững các nguyên tắc an toàn cơ bản này...",
    category: "Kinh nghiệm",
    date: "15/05/2026"
  },
  {
    title: "Cách xử lý bồn cầu bị tắc chỉ trong 5 phút",
    excerpt: "Tổng hợp các mẹo đơn giản sử dụng vật dụng có sẵn trong nhà để xử lý tình trạng tắc nghẽn...",
    category: "Mẹo hay",
    date: "12/05/2026"
  },
  {
    title: "Tại sao hóa đơn tiền nước tăng đột ngột?",
    excerpt: "Nếu hóa đơn tiền nước nhà bạn tăng cao bất thường, hãy kiểm tra ngay những vị trí rò rỉ sau đây...",
    category: "Tư vấn",
    date: "10/05/2026"
  }
];
