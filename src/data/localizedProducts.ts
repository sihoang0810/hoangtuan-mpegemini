import { CMSProduct } from '../lib/sanity';

export const LOCALIZED_PRODUCTS: { [key: string]: CMSProduct[] } = {
  baoloc: [
    {
      id: "p1",
      slug: "aptomat-mpe",
      name: "Aptomat (CB) MPE Tiêu Chuẩn Bảo Lộc",
      category: "electrical",
      description: "Thiết bị ngắt điện MPE chính hãng chống đoản mạch quá tải sấy sấy trà sương mù Bảo Lộc.",
      price: "Từ 85.000đ",
      image: "https://images.unsplash.com/photo-1558230352-78d91c78494b?auto=format&fit=crop&q=80&w=800",
      features: ["Độ bền điện lỳ dốc đồi", "Ngắt tức thì khi chập tưới vườn", "Chịu sương ẩm tốt"],
      specs: { "Thương hiệu": "MPE", "Cực": "1P - 2P", "Xuất xứ": "Việt Nam" }
    },
    {
      id: "p2",
      slug: "o-cam-am-tuong-mpe",
      name: "Ổ Cắm Âm Tường MPE Cao Cấp Lộc Phát",
      category: "electrical",
      description: "Ổ cắm nhựa Polycarbonate chống cháy dẹt phẳng sang trọng cho homestay Bảo Lộc.",
      price: "Từ 45.000đ",
      image: "https://images.unsplash.com/photo-1590684153482-d33022730ce1?auto=format&fit=crop&q=80&w=800",
      features: ["Nhựa dẻo dai khó trầy xước", "Họng đồng ôm khít phích cắm pin", "Chân lẫy đàn hồi cắm rút 10.000 lần"],
      specs: { "Thương hiệu": "MPE", "Sản phẩm": "Mặt vuông 3 phích", "Dòng cực": "16A" }
    },
    {
      id: "p3",
      slug: "cb-chong-giat-panasonic",
      name: "CB Chống Giật Panasonic Bảo Lộc Đồi Dốc",
      category: "electrical",
      description: "CB chống dòng rò của thương hiệu đình đám Nhật Bản Panasonic ngắt điện sục tắm an toàn tại Bảo Lộc.",
      price: "Từ 450.000đ",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
      features: ["Rò rỉ chỉ 30mA là ngắt lập tức", "Bảo hộ cơ thể người tắm nước nóng lạnh", "Hàng bãi xuất chính ngạch tem Panasonic chống giả"],
      specs: { "Thương hiệu": "Panasonic", "Dòng ngắt rò": "30mA", "Nhật": "Phản hồi dập 0.01s" }
    },
    {
      id: "p4",
      slug: "may-bom-day-cao-panasonic",
      name: "Máy Bơm Nước Đẩy Cao Panasonic Lộc Sơn Bảo Lộc",
      category: "plumbing",
      description: "Cơ bơm hút giếng khơi đẩy áp suất bồn tắm nước trà vượt dốc đồi chênh vênh ở Lâm Đồng cực khỏe.",
      price: "Từ 1.850.000đ",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800",
      features: ["Sóng đẩy cao dốc đứng 30 mét đứng", "Lưu lượng xả mạnh 45 lít/phút", "Môtơ quấn dây đồng tinh khiết chịu nhiệt 200W"],
      specs: { "Công suất": "200W", "Tải áp đứng": "30 mét", "Quạt hút": "Đồng ly tâm chống bám phèn" }
    },
    {
      id: "p5",
      slug: "ong-nuoc-ppr-binh-minh",
      name: "Ống Chịu Nhiệt PPR Bình Minh Bảo Lộc",
      category: "plumbing",
      description: "Ống dẫn nước Bình Minh PPR dán hàn dẹt dùng ráp đường nước nóng bình mặt trời khí dốc đèo Bảo Lộc.",
      price: "Báo giá theo mét",
      image: "https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800",
      features: ["Dẻo dai co hẹp co giãn chống sụt nún đất nương", "Nước sôi sủi bọt 95 độ không biến dạng ống", "Độ bền bỉ rải móng 50 năm móng"],
      specs: { "Thương hiệu": "Nhựa Bình Minh", "Tiêu chuẩn": "ISO Quốc tế", "Vách ren": "Đầu đồng thau cao cấp" }
    },
    {
      id: "p6",
      slug: "camera-ezviz-c6n",
      name: "Camera Wifi Ezviz C6N Bảo Lộc Sương Mù",
      category: "camera",
      description: "Mắt camera xoay 360 độ giám sát phòng khách biệt thự sân vườn dốc Lộc Thanh sương mù cao.",
      price: "590.000đ",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
      features: ["Hồng ngoại thấu tối sương mờ 10 mét", "Xoay đa hướng 360 độ từ xa app wifi", "Ghi âm bắt giọng đàm thoại mượt mà"],
      specs: { "Hồng ngoại": "Full HD 1080p", "Theo dõi": "AI nhận biến động chuyển", "Bảo mật": "Mã hóa lu luồng" }
    },
    {
      id: "p7",
      slug: "camera-imou-cruiser",
      name: "Camera Ngoài Trời Imou Cruiser Bảo Lộc Chống Nước",
      category: "camera",
      description: "Thần giám hộ đồi dâu vườn chè sạt sương đèo dốc Bảo Lộc. Có màu ban đêm rọi còi hú xua đuổi chồn trộm.",
      price: "1.250.000đ",
      image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800",
      features: ["Vỏ sắt mạ kẽm tiêu chuẩn chống nước IP66", "LED rọi rực rỡ có màu ban đêm Full Color cực rõ", "Còi báo động giật loa hú loa rượt côn đồ"],
      specs: { "Độ phân": "4.0 MP 2K", "Chuẩn nén": "H.265 tiết kiệm thẻ nhớ", "Hình quét": "Xoay vắt 355 độ" }
    },
    {
      id: "p8",
      slug: "may-do-ro-ri-pqwt",
      name: "Máy Dò Rò Rỉ Siêu Âm PQWT Bảo Lộc",
      category: "leak-detection",
      description: "Thiết bị rà rỉ hầm bao nước sạch không đập gạch chuyên dụng hỗ trợ thợ Hoàng Tuấn Bảo Lộc Lâm Đồng.",
      price: "Sử dụng trọn dịch vụ",
      image: "https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800",
      features: ["Sóng đa xung rà sâu âm đất đá dốc dèo", "Hiển thị quang âm phổ vách vỡ chính xác", "Khử sóng rung nhiễu của gió đồi dốc"],
      specs: { "Tải rà": "Độ sâu tối đa 2m", "Màn hiển": "Màn cảm ứng LED màu", "Tần số": "PQWT đa kênh" }
    }
  ],
  hcm: [
    {
      id: "p1",
      slug: "aptomat-mpe",
      name: "Aptomat (CB) MPE Chung Cư TP.HCM",
      category: "electrical",
      description: "CB ngắt điện chịu tải nguồn lạnh căn hộ cao ốc Gò Vấp, Quận 1 chống chập cháy sụt nguồn đột ngột hcm.",
      price: "Từ 85.000đ",
      image: "https://images.unsplash.com/photo-1558230352-78d91c78494b?auto=format&fit=crop&q=80&w=800",
      features: ["Thiết kế mỏng gọn ôm khít rãnh tủ dẹt", "Ngắt gián đoạn chập nguồn nổ trong thạch cao", "Đạt chuẩn an toàn PCCC tòa nhà Sài Gòn"],
      specs: { "Thương hiệu": "MPE", "Cực": "1P - 2P - 3P ba pha", "Chứng nhận": "CO CQ kiểm định" }
    },
    {
      id: "p2",
      slug: "o-cam-am-tuong-mpe",
      name: "Ổ Cắm Điện MPE Văn Phòng Quận 1 TP.HCM",
      category: "electrical",
      description: "Mặt vuông ổ cắm âm sàn nhôm đúc chịu tải nặng cho công sở, tòa nhà hội họp trung tâm Hồ Chí Minh.",
      price: "Từ 45.000đ",
      image: "https://images.unsplash.com/photo-1590684153482-d33022730ce1?auto=format&fit=crop&q=80&w=800",
      features: ["Nắp đậy dẹp khít chống nước lau sàn loang lổ", "Trụ đồng nguyên khối chịu tải máy tính sấy nấu", "Màu xám kim loại sang trọng chuẩn văn phòng"],
      specs: { "Thương hiệu": "MPE", "Khối": "Âm sàn nắp trượt", "Tải nguồn": "16A tủ nguồn" }
    },
    {
      id: "p3",
      slug: "cb-chong-giat-panasonic",
      name: "CB Chống Giật Panasonic TP.HCM An Toàn",
      category: "electrical",
      description: "CB bảo hộ an sinh sụp tải giật điện dùng cho bếp từ âm, lò vi sóng căn hộ mini sầm uất Sài Gòn.",
      price: "Từ 450.000đ",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
      features: ["Độ nhạy cực độ nhảy mượt khi dột trần dột ngấm", "Ngắt nguồn tức khắc chống điện giật tay ướt", "Hàng đóng hộp nguyên tem mác Panasonic Nhật Bản"],
      specs: { "Thương hiệu": "Panasonic", "Dòng chống rò": "30mA", "Cột": "2P 220V dân dụng" }
    },
    {
      id: "p4",
      slug: "may-bom-day-cao-panasonic",
      name: "Bơm Đẩy Cao Panasonic 200W Nhà Sài Gòn",
      category: "plumbing",
      description: "Giải pháp đẩy nguồn giếng hay nước máy chảy bồn trần tầng trung tầng vách cực khỏe ở Quận 7, Thủ Đức.",
      price: "Từ 1.850.000đ",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800",
      features: ["Động cơ quấn đồng chạy êm ru mượt mà cực kỳ", "Rơ-le cảm nhiệt tự tắt máy khi nghẹt mất nước máy", "Độ chống rỉ sét đạt chuẩn vận hành khép kín"],
      specs: { "Dòng tải": "200W", "Hút rít nước": "Lực hút mạnh sâu", "Đẩy bồn": "3 đến 4 tầng lầu" }
    },
    {
      id: "p5",
      slug: "ong-nuoc-ppr-binh-minh",
      name: "Ống Chịu Áp PPR Bình Minh TP.HCM Chính Hiệu",
      category: "plumbing",
      description: "Hệ thống ống chịu nhiệt sủi Bình Minh PPR bóp nghẹt các vụ nứt gãy ống nước chung cư đô thị HCM.",
      price: "Báo giá theo cuộn",
      image: "https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800",
      features: ["Chống rung nứt nứt vỡ khi đất móng sụt trượt hcm", "Nhựa nguyên sinh PPR siêu sạch nước uốn quanh vòm", "Khớp ren nối đồng thau bao bền áp 25 bar cản bục vỡ"],
      specs: { "Thương hiệu": "Mác Bình Minh", "Chất liệu": "PPR PP-R kháng hóa", "Khớp ren": "Ren đồng thau bọc" }
    },
    {
      id: "p6",
      slug: "camera-ezviz-c6n",
      name: "Camera Wifi Ezviz C6N Sài Gòn Quản Lý Con Nhỏ",
      category: "camera",
      description: "Camera gắn trần thạch cao xoay 360 độ đàm thoại lọc ồn giữ nếp nhà an ninh tại căn hộ tphcm.",
      price: "590.000đ",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
      features: ["Màn hình xem app điện thoại wifi không trễ trễ sóng", "Mắt xoay quanh chụp ảnh bám chuyển trộm", "Nhỏ gọn cắm phích đính thạch cao mượt nhanh"],
      specs: { "Hình": "Ezviz C6N 2.0 Mega", "Wifi": "2.4GHz không rớt dòng", "Khung hình": "1080p sắc nách" }
    },
    {
      id: "p7",
      slug: "camera-imou-cruiser",
      name: "Camera Trực Imou Cruiser 4MP Cửa Hàng TP.HCM",
      category: "camera",
      description: "Thần bảo an cho bãi xe spa giặt, quán ăn Vạn Kiếp Bình Thạnh. Có màu ban rực rỡ dọa trộm cắp.",
      price: "1.250.000đ",
      image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800",
      features: ["Kháng sương mưa lớn sình nới lỏng IP66", "LED pha rọi có màu ban đêm rọi thấu vách", "Còi loa rít 110dB hú hét dập tắt ý đồ xâm phạm"],
      specs: { "Ghi": "4.0 MP 2K cực mượt", "Theo dõi": "AI quét phát hiện bóng người", "Lưu": "Cloud hoặc MicroSD" }
    },
    {
      id: "p8",
      slug: "may-do-ro-ri-pqwt",
      name: "Thiết Bị Siêu Âm Nước PQWT Đức TP.HCM",
      category: "leak-detection",
      description: "Máy tìm rò nước rò rỉ hầm bao dưới móng nền đường ống sụt lún đô thị Gò Vấp - Quận 7.",
      price: "Sử dụng theo dịch vụ",
      image: "https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800",
      features: ["Độ nhạy cực cao lọc tạp âm tiếng còi xe hơi sài gòn", "Định điểm nứt ren dưới khe đất lửng chính xác 100%", "Màn hình vẽ phổ phổ chấn động vấp rò rỉ sâu nhất"],
      specs: { "Máy rà": "Độ sâu rà rà 2,5 mét", "Cảm": "Bộ cảm biến chống rung đô thị", "Hiệu": "PQWT chuyên nghiệp" }
    }
  ]
};
