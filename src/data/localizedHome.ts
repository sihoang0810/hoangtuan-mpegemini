export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroOverlayText: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  stats: {
    value: string;
    label: string;
  }[];
  aboutHeading: string;
  aboutContent: string;
  aboutImage: string;
  benefitHeading: string;
  benefits: string[];
  servicesHeading?: string;
  servicesSubtitle?: string;
}

export const LOCALIZED_HOME: { [key: string]: HomeContent } = {
  baoloc: {
    heroTitle: "DỊCH VỤ SỬA ĐIỆN NƯỚC BẢO LỘC UY TÍN - THỢ TRỰC CHIẾN 24/7",
    heroSubtitle: "Đội ngũ thợ điện nước Bảo Lộc chuyên nghiệp phục vụ nhanh chóng sau 15-30 phút gọi. Chuyên sửa chập điện, vỡ ống nước âm, dò rò rỉ nước ngầm tại Bảo Lộc, Lộc Phát, Lộc Sơn, Lộc Tiến và toàn khu vực Bảo Lâm - Lâm Đồng.",
    heroOverlayText: "THỢ ĐỊA PHƯƠNG - UY TÍN THƯƠNG HIỆU - KHÔNG VẼ VỜI CHI PHÍ",
    features: [
      {
        title: "Thợ Bản Địa Bảo Lộc",
        description: "Có mặt ngay lập tức sau 15 phút, am hiểu sâu sắc kết cấu hạ tầng điện nước của toàn khu vực Lâm Đồng.",
        icon: "User"
      },
      {
        title: "Dò Tìm Rò Rỉ Siêu Âm",
        description: "Sử dụng máy siêu âm Đức siêu nhạy, cam kết định vị đúng điểm vỡ đường ống nước ngầm tại Bảo Lộc không đục phá bừa bãi.",
        icon: "Search"
      },
      {
        title: "Báo Giá Trực Tiếp",
        description: "Khảo sát và tư vấn miễn phí tận nơi. Báo giá minh bạch rõ ràng theo định mức chuẩn trước khi thực hiện.",
        icon: "DollarSign"
      },
      {
        title: "Bảo Hành Dài Hạn 12 THÁNG",
        description: "Mọi dự án sửa chữa điện dân dụng hay lắp đặt camera Bảo Lộc đều có phiếu bảo hành chính quy, hậu mãi uy tín.",
        icon: "ShieldCheck"
      }
    ],
    stats: [
      { value: "1.800+", label: "Hộ gia đình Bảo Lộc tin dùng" },
      { value: "15-30 Phút", label: "Tốc độ có mặt tận nhà" },
      { value: "10 Năm", label: "Kinh nghiệm thực chiến bản địa" },
      { value: "100%", label: "Cam kết xử lý triệt để" }
    ],
    aboutHeading: "Về Hoàng Tuấn MPE - Thợ Điện Nước & Camera Hàng Đầu Bảo Lộc",
    aboutContent: "Hoàng Tuấn MPE tự hào là đơn vị uy tín số 1 chuyên cung cấp giải pháp xử lý sự cố điện, ống nước, dò tìm rò rỉ nước ngầm siêu âm và tư vấn lắp đặt hệ thống camera an ninh thông minh tại TP. Bảo Lộc, Lâm Đồng. Khởi đầu với nhóm thợ lành nghề gắn bó sâu sắc với người dân xứ trà Lộc Phát, Phường 1, Phường 2, Lộc Sơn đến nay chúng tôi đã phát triển mạng lưới dịch vụ túc trực 24/7 chất lượng cao. Với phương châm lấy chữ tín làm đầu, thợ của Hoàng Tuấn MPE luôn tư vấn giải pháp tiết kiệm nhất, bền vững nhất, sử dụng linh phụ kiện chính hãng có CO CQ đầy đủ.",
    aboutImage: "https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800",
    benefitHeading: "Giá Trị Khách Hàng Bảo Lộc Nhận Được",
    benefits: [
      "Chi phí dịch vụ cạnh tranh nhất tại khu vực tỉnh Lâm Đồng.",
      "Thợ điện nước túc trực 24/7 kể cả ngày nghỉ lễ dốc sức vì an toàn gia đình bạn.",
      "Cam kết hoàn tiền 100% nếu sự cố chập điện hoặc rò rỉ nước không được giải quyết dứt điểm.",
      "Vật tư thiết bị điện MPE, bình nóng lạnh, camera Ezviz chính hãng chiết khấu cao.",
      "Hỗ trợ dọn dẹp mặt bằng thi công sạch sẽ gọn gàng trước khi bàn giao."
    ],
    servicesHeading: "Dịch Vụ Của Chúng Tôi",
    servicesSubtitle: "Giải Pháp Toàn Diện Cho Gia Đình"
  },
  hcm: {
    heroTitle: "DỊCH VỤ SỬA ĐIỆN NƯỚC TP.HCM KHẨN CẤP 24H - THỢ QUẬN HUYỆN CÓ MẶT NGAY",
    heroSubtitle: "Đội ngũ kỹ thuật viên Hoàng Tuấn MPE trực chiến 24/7 tại 24 quận huyện Sài Gòn. Chuyên thợ điện nước tphcm sửa chập điện âm tường, siêu âm rò rỉ nước ngầm cho tòa nhà và căn hộ tại Gò Vấp, Quận 1, Quận 7, Bình Thạnh, Thủ Đức...",
    heroOverlayText: "KHẨN CẤP 24U - AN TOÀN TUYỆT ĐỐI - TRANG THIẾT BỊ HIỆN ĐẠI",
    features: [
      {
        title: "Trực Điện Nước 24 Quận Huyện",
        description: "Thợ túc trực tại các điểm nút giao thông TP.HCM, nhanh chóng có mặt đón đầu xử lý nhanh sự cố về đêm.",
        icon: "Clock"
      },
      {
        title: "Dò Tìm Rò Nước Siêu Âm Độ Sâu 2M",
        description: "Áp dụng công nghệ xung điện từ và cảm biến sóng siêu âm chống rung chấn giúp rà soát ống vỡ ngầm TP.HCM chính quy.",
        icon: "Activity"
      },
      {
        title: "Minh Bạch Giá & Hóa Đơn",
        description: "Cung cấp báo giá dạng văn bản, hỗ trợ xuất hóa đơn VAT điện tử linh hoạt cho các doanh nghiệp, cửa hàng tại TP.HCM.",
        icon: "FileText"
      },
      {
        title: "Tiêu Chuẩn Kỹ Thuật Đô Thị",
        description: "Dịch vụ lắp đặt camera an ninh và điện nước đạt quy chuẩn xây dựng và vận hành nhà cao tầng hiện đại.",
        icon: "CheckCircle2"
      }
    ],
    stats: [
      { value: "4.500+", label: "Căn hộ và cơ sở kinh doanh Sài Gòn" },
      { value: "20 Phút", label: "Tốc độ trung bình thợ tiếp cận" },
      { value: "15 Kỹ Sư", label: "Bằng cấp chính quy tay nghề cao" },
      { value: "0 Đồng", label: "Phí khảo sát hiện trạng thực tế" }
    ],
    aboutHeading: "Về Hoàng Tuấn MPE - Hệ Thống Sửa Chữa Cơ Điện Lạnh Uy Tín TP.HCM",
    aboutContent: "Hệ thống sửa chữa cơ điện nước Hoàng Tuấn MPE TP.HCM là liên hiệp đội thợ trình độ cao, thợ bậc thợ 3/7 và kỹ sư điện nước tốt nghiệp bách khoa hàng đầu Sài Gòn. Chúng tôi chuyên giải quyết các hồ sơ khó khăn nhất như dò nước thất thoát cho khu đô thị lớn, chung cư cao cấp quận 7, dò tìm chập điện âm tường khu dân cư gò vấp, hay thi công trọn gói camera góc rộng không điểm mù cho chuỗi cửa hàng tiện lợi tại quận 1. Hoàng Tuấn MPE luôn tuân thủ nguyên tắc an toàn lao động, cung cấp dịch vụ chuyên nghiệp, sạch sẽ giải tỏa mọi lo âu cho quý cư dân đô thị hiện đại.",
    aboutImage: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80&w=800",
    benefitHeading: "Cam Kết Hàng Đầu Tại Thị Trường TP.HCM",
    benefits: [
      "Có mặt cực nhanh bất chấp giờ cao điểm nhờ đội ngũ rải rác khắp các quận trung tâm.",
      "Bảng giá chuẩn hóa, không tăng giá hay thu thêm phụ phí ngoài giờ hành chính hoặc đêm muộn.",
      "Linh kiện thiết bị điện MPE và van khóa nước nhập khẩu chất lượng cao chống áp suất đô thị.",
      "Chính sách bảo hành điện tử nhanh chóng, quét QR nhận thông tin bảo trì trong 4H khẩn cấp.",
      "Tập trung bảo hộ lao động, giảm thiểu tối đa tiếng ồn và bụi bẩn khi thi công chung cư."
    ],
    servicesHeading: "Dịch Vụ Chuyên Nghiệp TP.HCM",
    servicesSubtitle: "Thợ Điện Nước Sửa Chữa Nhanh Chóng 24/7"
  }
};
