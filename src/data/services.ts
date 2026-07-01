import { Zap, ShieldCheck, Settings, Wrench, Droplet, CheckCircle2, Video, Search, Lightbulb, Hammer, Activity, Cpu, Sun } from 'lucide-react';

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: any;
  category: 'electrical' | 'plumbing' | 'construction' | 'solar' | 'camera' | 'detection' | 'smarthome';
  features: string[];
  pricing: { item: string; price: string; unit?: string }[];
  image?: string;
  gallery?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }[];
  benefits?: string[];
  faq?: { question: string; answer: string }[];
  order?: number;
}

export const SERVICES: Service[] = [
  // ELECTRICAL
  {
    id: 'e1',
    slug: 'sua-dien',
    order: 1,
    title: 'Sửa điện',
    shortDescription: 'Xử lý nhanh các sự cố mất điện, chập điện gia đình và văn phòng.',
    fullDescription: 'Dịch vụ sửa chữa hệ thống điện gia đình chuyên nghiệp. Chúng tôi nhận kiểm tra và khắc phục mọi sự cố về điện như mất điện đột ngột, hỏng công tắc, ổ cắm, hệ thống điện gặp sự cố không rõ nguyên nhân.',
    icon: Zap,
    category: 'electrical',
    features: ['Kiểm tra miễn phí', 'Sửa xong ngay trong ngày', 'Bảo hành 12 tháng'],
    pricing: [
      { item: 'Thay công tắc/ổ cắm', price: 'Từ 50.000đ', unit: 'cái' },
      { item: 'Sửa mất điện cục bộ', price: 'Từ 150.000đ', unit: 'lần' },
      { item: 'Kiểm tra đường dây', price: 'Miễn phí', unit: '' }
    ],
    benefits: ['Thợ tay nghề cao', 'Linh kiện chính hãng', 'Giá cả minh bạch'],
    faq: [
      { question: 'Thời gian thợ có mặt là bao lâu?', answer: 'Thợ sẽ có mặt trong vòng 30 phút kể từ khi tiếp nhận yêu cầu.' },
      { question: 'Có bảo hành sau khi sửa không?', answer: 'Tất cả dịch vụ sửa điện đều được bảo hành từ 6 đến 12 tháng.' }
    ]
  },
  {
    id: 'e2',
    slug: 'sua-chap-dien',
    title: 'Sửa chập điện',
    shortDescription: 'Dò tìm vị trí chập điện âm tường bằng máy chuyên dụng.',
    fullDescription: 'Chập điện là sự cố nguy hiểm có thể dẫn đến hỏa hoạn. Đội ngũ kỹ thuật của chúng tôi sử dụng thiết bị đo chuyên dụng để tìm chính xác điểm chập ngầm, xử lý triệt để mà không cần đục phá lung tung.',
    icon: ShieldCheck,
    category: 'electrical',
    features: ['Dò tìm bằng máy hiện đại', 'Xử lý triệt để 100%', 'An toàn tuyệt đối'],
    pricing: [
      { item: 'Dò tìm điểm chập', price: 'Từ 200.000đ', unit: 'vụ' },
      { item: 'Xử lý cách điện', price: 'Từ 100.000đ', unit: 'điểm' }
    ]
  },
  {
    id: 'e3',
    slug: 'sua-aptomat',
    title: 'Sửa aptomat',
    shortDescription: 'Lắp đặt, thay thế Aptomat (CB) chống giật, chống quá tải.',
    fullDescription: 'Aptomat thường xuyên nhảy hoặc bị cháy là dấu hiệu của sự quá tải hoặc hỏng hóc. Chúng tôi cung cấp và thay thế các loại CB chính hãng Panasonic, Schneider đảm bảo an toàn cho toàn bộ hệ thống điện.',
    icon: Settings,
    category: 'electrical',
    features: ['Hàng chính hãng 100%', 'Lắp đặt đúng kỹ thuật', 'Tư vấn công suất'],
    pricing: [
      { item: 'Thay CB đơn', price: 'Từ 80.000đ', unit: 'cái' },
      { item: 'Lắp CB chống giật', price: 'Từ 180.000đ', unit: 'cái' }
    ]
  },
  {
    id: 'e4',
    slug: 'lap-dat-dien',
    title: 'Lắp đặt điện',
    shortDescription: 'Thi công lắp đặt hệ thống điện mới, đèn trang trí, thiết bị điện.',
    fullDescription: 'Nhận lắp đặt mới hệ thống điện cho chung cư, nhà phố, văn phòng. Lắp đặt đèn trang trí, đèn chùm, quạt trần và các thiết bị điện dân dụng khác theo yêu cầu.',
    icon: Lightbulb,
    category: 'electrical',
    features: ['Thi công thẩm mỹ', 'Đúng tiến độ', 'Tư vấn tiết kiệm điện'],
    pricing: [
      { item: 'Lắp đèn LED/Đèn chùm', price: 'Từ 100.000đ', unit: 'bộ' },
      { item: 'Lắp quạt trần', price: 'Từ 250.000đ', unit: 'cái' }
    ]
  },
  {
    id: 'e5',
    slug: 'do-duong-dien-am-tuong',
    title: 'Dò đường điện âm tường',
    shortDescription: 'Xác định chính xác vị trí dây điện âm tường phục vụ sửa chữa, khoan tường.',
    fullDescription: 'Dịch vụ giúp bạn biết chính xác vị trí đường dây điện đi trong tường để tránh khoan trúng hoặc tìm điểm đứt ngầm mà không cần đục nát tường nhà.',
    icon: Search,
    category: 'electrical',
    features: ['Máy dò hiện đại', 'Tránh rủi ro khoan trúng', 'Sơ đồ điện rõ ràng'],
    pricing: [
      { item: 'Dò tìm đường điện', price: 'Từ 300.000đ', unit: 'vị trí' }
    ]
  },

  // PLUMBING
  {
    id: 'p1',
    slug: 'sua-nuoc',
    title: 'Sửa nước',
    shortDescription: 'Xử lý các sự cố gãy vòi, hỏng khóa, hệ thống nước gặp trục trặc.',
    fullDescription: 'Chuyên sửa chữa các thiết bị vệ sinh, bồn cầu, chậu rửa, vòi nước. Xử lý triệt để tình trạng nước yếu, mất nước hoặc rò rỉ tại các đầu nối.',
    icon: Droplet,
    category: 'plumbing',
    features: ['Thợ tận tâm', 'Phụ kiện cao cấp', 'Giá rẻ cạnh tranh'],
    pricing: [
      { item: 'Thay vòi nước', price: 'Từ 100.000đ', unit: 'cái' },
      { item: 'Sửa bồn cầu rò nước', price: 'Từ 150.000đ', unit: 'bộ' }
    ]
  },
  {
    id: 'p3',
    slug: 'lap-may-bom',
    order: 2,
    title: 'Lắp bơm tăng áp',
    image: '/bom-ap.jpg',
    shortDescription: 'Lắp đặt, sửa chữa máy bơm tăng áp, khắc phục áp lực nước yếu.',
    fullDescription: 'Tư vấn lắp đặt máy bơm tăng áp lực nước chính hãng phù hợp với nhu cầu gia đình: tăng áp vòi sen tắm, bình nóng lạnh, máy giặt. Khắc phục triệt để sự cố bơm tăng áp kêu tạch tạch, rò điện gây mất an toàn.',
    icon: Wrench,
    category: 'plumbing',
    features: ['Vận hành siêu êm', 'Tăng áp thông minh', 'Lắp rơ-le, CB chống giật'],
    pricing: [
      { item: 'Lắp máy bơm tăng áp mới', price: 'Từ 300.000đ', unit: 'máy' },
      { item: 'Sửa bơm tăng áp, chỉnh rơ-le', price: 'Từ 200.000đ', unit: 'máy' }
    ]
  },
  {
    id: 'p2',
    slug: 'sua-ro-ri-nuoc',
    title: 'Sửa rò rỉ nước',
    shortDescription: 'Xử lý triệt để tình trạng rò rỉ nước, ẩm tường do vỡ ống.',
    fullDescription: 'Hiện tượng ẩm mốc tường hoặc hóa đơn nước tăng vọt là dấu hiệu rò rỉ. Chúng tôi có kỹ thuật xử lý chuyên nghiệp giúp tiết kiệm nước và bảo vệ kết cấu công trình.',
    icon: Droplet,
    category: 'plumbing',
    features: ['Chống thấm triệt để', 'Vật liệu bền bỉ', 'Tiết kiệm chi phí'],
    pricing: [
      { item: 'Xử lý rò rỉ lộ thiên', price: 'Từ 150.000đ', unit: 'điểm' },
      { item: 'Sửa rò rỉ âm tường', price: 'Theo khảo sát', unit: 'điểm' }
    ]
  },
  {
    id: 'p4',
    slug: 'sua-ong-nuoc-am',
    title: 'Sửa ống nước âm',
    shortDescription: 'Xử lý các sự cố gãy, bục đường ống nước nằm trong tường/nền.',
    fullDescription: 'Đây là dịch vụ đòi hỏi tay nghề cao. Chúng tôi sử dụng máy dò rỉ để xác định vị trí và tiến hành sửa chữa ít đục phá nhất có thể, trả lại mặt bằng đẹp.',
    icon: Hammer,
    category: 'plumbing',
    features: ['Hạn chế đục phá', 'Thi công nhanh gọn', 'Bảo hành dài hạn'],
    pricing: [
      { item: 'Hàn ống nhiệt PPR', price: 'Từ 200.000đ', unit: 'điểm' },
      { item: 'Đục và trám trét', price: 'Căn cứ thực tế', unit: 'm2' }
    ]
  },
  {
    id: 'p5',
    slug: 'lap-dat-thiet-bi-nuoc',
    title: 'Lắp đặt thiết bị nước',
    shortDescription: 'Lắp đặt bồn cầu, lavabo, bồn tắm, bình nóng lạnh thiết bị vệ sinh.',
    fullDescription: 'Nhận lắp đặt trọn gói thiết bị vệ sinh cho công trình mới hoặc thay thế thiết bị cũ. Đảm bảo đúng kỹ thuật, tính thẩm mỹ và không rò rỉ.',
    icon: Settings,
    category: 'plumbing',
    features: ['Lắp đặt thẩm mỹ', 'Đội ngũ chuyên nghiệp', 'Hỗ trợ 24/7'],
    pricing: [
      { item: 'Lắp bồn cầu/Lavabo', price: 'Từ 250.000đ', unit: 'bộ' },
      { item: 'Lắp bình nóng lạnh', price: 'Từ 300.000đ', unit: 'bộ' }
    ]
  },

  // CAMERA
  {
    id: 'c1',
    slug: 'lap-camera',
    order: 3,
    title: 'Lắp camera',
    image: '/images/camera-.png',
    shortDescription: 'Tư vấn giải pháp lắp đặt camera an ninh trọn gói cho nhà ở, văn phòng.',
    fullDescription: 'Cung cấp và lắp đặt các dòng camera chính hãng: Hikvision, Dahua, Ezviz. Giải pháp ổn định, hình ảnh sắc nét, xem qua điện thoại mượt mà.',
    icon: Video,
    category: 'camera',
    features: ['Xem qua App 24/7', 'Lưu trữ trọn vẹn', 'Hỗ trợ kỹ thuật nhanh'],
    pricing: [
      { item: 'Công lắp đặt camera', price: 'Từ 150.000đ', unit: 'mắt' },
      { item: 'Trọn gói hệ thống', price: 'Liên hệ', unit: 'gói' }
    ]
  },
  {
    id: 'c2',
    slug: 'sua-camera',
    title: 'Sửa camera',
    shortDescription: 'Khắc phục lỗi camera không xem được, mất hình, mờ hình, hỏng đầu ghi.',
    fullDescription: 'Kiểm tra và sửa chữa hệ thống camera cũ gặp lỗi: không ghi hình, mất kết nối wifi, lỗi ổ cứng, hình ảnh bị nhiễu.',
    icon: Wrench,
    category: 'camera',
    features: ['Sửa xong ngay', 'Linh kiện thay thế sẵn có', 'Kiểm tra đường dây'],
    pricing: [
      { item: 'Kiểm tra xử lý lỗi', price: 'Từ 150.000đ', unit: 'lần' }
    ]
  },
  {
    id: 'c3',
    slug: 'camera-gia-dinh',
    title: 'Camera gia đình',
    shortDescription: 'Giải pháp camera wifi không dây, đàm thoại 2 chiều cho gia đình.',
    fullDescription: 'Lắp đặt camera wifi đơn giản, thẩm mỹ, không cần đi dây phức tạp. Tính năng đàm thoại 2 chiều, báo động khi có người lạ đột nhập.',
    icon: Video,
    category: 'camera',
    features: ['Giá từ 5xx.000đ', 'Dễ sử dụng', 'Cảnh báo chuyển động'],
    pricing: [
      { item: 'Camera Ezviz/Imou', price: 'Từ 850.000đ', unit: 'mắt' }
    ]
  },
  {
    id: 'c4',
    slug: 'camera-cua-hang',
    title: 'Camera cửa hàng',
    shortDescription: 'Hệ thống camera quản lý nhân viên, khách hàng và tài sản cửa hàng.',
    fullDescription: 'Lắp đặt camera có micro thu âm, camera xoay 360 độ giúp quản lý cửa hàng hiệu quả từ xa. Hệ thống hoạt động ổn định 24/24.',
    icon: Video,
    category: 'camera',
    features: ['Quản lý từ xa', 'Hình ảnh sắc nét', 'Bảo hành tận nơi'],
    pricing: [
      { item: 'Hệ thống cao cấp', price: 'Báo giá theo mẫu', unit: 'gói' }
    ]
  },
  {
    id: 'c5',
    slug: 'camera-nang-luong-mat-troi',
    order: 4,
    title: 'Camera năng lượng mặt trời',
    image: '/images/imou-ngoai-troi.jpg',
    shortDescription: 'Lắp đặt camera dùng pin năng lượng mặt trời chuyên dụng cho rẫy vườn, rừng núi không có điện lưới.',
    fullDescription: 'Giải pháp lắp đặt hệ thống camera giám sát tự cấp nguồn bằng tấm pin năng lượng mặt trời kết hợp SIM 4G hoặc bộ phát Wifi tầm xa. Thích hợp tối ưu cho các rẫy cà phê, sầu riêng, khu bảo tồn rừng, công trình vùng sâu vùng xa.',
    icon: Video,
    category: 'camera',
    features: ['Tự cấp nguồn xanh 100%', 'Tích hợp SIM 4G tốc độ cao', 'Chuẩn chống nước tuyệt bộc IP67'],
    pricing: [
      { item: 'Bao gồm camera + tấm pin mặt trời', price: 'Từ 2.450.000đ', unit: 'bộ' },
      { item: 'Công thi công tận rẫy rừng', price: 'Khảo sát thực tế', unit: 'gói' }
    ]
  },

  // DETECTION
  {
    id: 'd1',
    slug: 'do-ro-ri-nuoc',
    order: 1,
    title: 'Dò rò rỉ nước',
    image: '/images/sieu-am-do-tim-ong-vo.png',
    shortDescription: 'Sử dụng máy siêu âm hiện đại tìm vị trí vỡ ống nước ngầm cực chính xác.',
    fullDescription: 'Dịch vụ chuyên nghiệp giúp phát hiện sự cố rò rỉ nước dưới nền nhà, trong tường. Sử dụng thiết bị âm thanh độ nhạy cao để định vị chính xác điểm vỡ.',
    icon: Activity,
    category: 'detection',
    features: ['Siêu âm hiện đại', 'Tiết kiệm tài nguyên', 'Xử lý tại chỗ'],
    pricing: [
      { item: 'Dò rò rỉ nhà dân', price: 'Từ 500.000đ', unit: 'lần' },
      { item: 'Dò rò rỉ công ty', price: 'Khảo sát báo giá', unit: 'lần' }
    ]
  },
  {
    id: 'd2',
    slug: 'sieu-am-do-ong-am',
    title: 'Siêu âm dò ống âm',
    shortDescription: 'Phát hiện vị trí đường ống nước bị bục vỡ ngầm bằng sóng siêu âm.',
    fullDescription: 'Công nghệ tiên tiến nhất hiện nay để dò tìm đường ống mà không cần đục phá mặt bằng. Phù hợp cho nhà phố, biệt thự, nhà xưởng.',
    icon: Search,
    category: 'detection',
    features: ['Thiết bị Đức', 'Không đục phá', 'Chính xác 99%'],
    pricing: [
      { item: 'Siêu âm dò tìm', price: 'Từ 500.000đ', unit: 'vị trí' }
    ]
  },
  {
    id: 'd3',
    slug: 'do-duong-nuoc-am',
    title: 'Dò đường nước âm',
    shortDescription: 'Vẽ sơ đồ đường ống nước âm tường, âm sàn phục vụ cải tạo nhà.',
    fullDescription: 'Xác định chính xác vị trí và hướng đi của hệ thống đường ống nước ngầm phục vụ cho việc khoan đục hoặc thi công cải tạo công trình.',
    icon: Search,
    category: 'detection',
    features: ['Vẽ lại sơ đồ ống', 'Thiết bị cảm biến', 'Hỗ trợ kịp thời'],
    pricing: [
      { item: 'Dò sơ đồ ống', price: 'Từ 300.000đ', unit: 'lần' }
    ]
  },
  {
    id: 'd4',
    slug: 'kiem-tra-ro-ri-khong-duc-tuong',
    title: 'Kiểm tra rò rỉ không đục tường',
    shortDescription: 'Sử dụng camera nội soi và máy kiểm tra áp lực để chẩn đoán rò rỉ.',
    fullDescription: 'Giải pháp kiểm tra tổng thể hệ thống cấp thoát nước bằng công nghệ nội soi và nén khí, xác định hư hỏng mà không gây ảnh hưởng đến thẩm mỹ ngôi nhà.',
    icon: ShieldCheck,
    category: 'detection',
    features: ['Camera nội soi', 'Máy nén khí', 'An toàn thẩm mỹ'],
    pricing: [
      { item: 'Kiểm tra tổng quát', price: 'Từ 400.000đ', unit: 'lần' }
    ]
  },
  
  // SMART HOME (NHÀ THÔNG MINH)
  {
    id: 'sm1',
    slug: 'cong-tac-cua-cuon-thong-minh',
    order: 5,
    title: 'Công tắc cửa cuốn thông minh',
    shortDescription: 'Điều khiển, hẹn giờ, kiểm tra trạng thái cửa cuốn mọi lúc mọi nơi từ xa qua điện thoại di động.',
    fullDescription: 'Lắp đặt thay thế công tắc cơ truyền thống bằng công tắc cửa cuốn thông minh có kết nối Wi-Fi/Zigbee. Cho phép bạn điều khiển đóng/mở từ xa, khóa/mở khóa thông minh, lập lịch đóng tự động vào ban đêm để tăng cường an ninh tuyệt đối cho gia đình.',
    icon: Cpu,
    category: 'smarthome',
    features: ['Điều khiển qua Smartphone', 'Hẹn giờ đóng mở tự động', 'Chia sẻ cho người thân', 'Phản hồi trạng thái thực tế'],
    pricing: [
      { item: 'Công tắc cảm ứng cửa cuốn (Wi-Fi)', price: 'Từ 850.000đ', unit: 'bộ' },
      { item: 'Công tắc cửa cuốn Zigbee cao cấp', price: 'Từ 1.150.000đ', unit: 'bộ' },
      { item: 'Công lắp đặt & cấu hình app', price: 'Từ 200.000đ', unit: 'lần' }
    ],
    image: '/images/cua-cuon-thong-minh.png',
    gallery: [
      {
        type: 'video',
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: '/images/cua-cuon-thong-minh.png',
      },
      {
        type: 'image',
        url: '/images/cua-cuon-thong-minh.png',
      }
    ],
    benefits: ['Kiểm soát an ninh từ xa', 'Tự động đóng cửa khi đi ngủ', 'Bảo hành 24 tháng chính hãng'],
    faq: [
      { question: 'Có thể mở bằng tay khi mất mạng Internet không?', answer: 'Có, các nút bấm vật lý/cảm ứng trên công tắc vẫn hoạt động bình thường kể cả khi mất kết nối Internet.' },
      { question: 'Cửa cuốn cũ có lắp được không?', answer: 'Hầu hết các dòng cửa cuốn hiện nay trên thị trường đều có thể lắp đặt và nâng cấp lên công tắc thông minh.' }
    ]
  },
  {
    id: 'sm2',
    slug: 'cong-tac-dien-thong-minh',
    title: 'Công tắc điện thông minh',
    shortDescription: 'Điều khiển tắt/mở hệ thống chiếu sáng bằng điện thoại hoặc giọng nói và lập lịch thông minh.',
    fullDescription: 'Thiết kế tinh tế mang tính thẩm mỹ cao với mặt kính cường lực chống trầy xước. Cho phép hẹn giờ bật tắt đèn tự động, liên kết kịch bản thông minh (ví dụ: mở cửa tự bật sáng), chống giật điện an toàn khi tay ướt bấm nút.',
    icon: Lightbulb,
    category: 'smarthome',
    features: ['Kính cường lực sang trọng', 'Điều khiển giọng nói Alexa/Google', 'Hẹn giờ tắt/bật thông minh', 'Lắp vừa đế âm tường cũ'],
    pricing: [
      { item: 'Công tắc cảm ứng Wi-Fi 1 nút', price: 'Từ 450.000đ', unit: 'cái' },
      { item: 'Công tắc cảm ứng Wi-Fi 2-4 nút', price: 'Từ 550.000đ', unit: 'cái' },
      { item: 'Lắp đặt, căn chỉnh dây điện', price: 'Từ 100.000đ', unit: 'nút' }
    ],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    benefits: ['Tiết kiệm điện năng tối đa', 'An toàn tuyệt đối cho trẻ nhỏ', 'Bảo hành 24 tháng chính hãng']
  },
  {
    id: 'sm3',
    slug: 'cam-bien-an-ninh-thong-minh',
    title: 'Cảm biến an ninh thông minh (Sắp ra mắt)',
    shortDescription: 'Hệ thống cảm biến chống đột nhập, rò rỉ khí độc, báo cháy khẩn cấp qua ứng dụng.',
    fullDescription: 'Dịch vụ đang được thử nghiệm công nghệ và cấu hình chuẩn chỉnh từ các nhà sản xuất nổi tiếng. Chúng tôi sẽ sớm cập nhật và ra mắt khách hàng trong thời gian tới để hoàn thiện ngôi nhà an toàn.',
    icon: ShieldCheck,
    category: 'smarthome',
    features: ['Sắp ra mắt (Coming soon)', 'Cấu hình đỉnh cao', 'Kết nối bảo mật'],
    pricing: [
      { item: 'Dịch vụ đang phát triển', price: 'Coming Soon', unit: 'hệ thống' }
    ],
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sm4',
    slug: 'chieu-sang-va-giai-tri-thong-minh',
    title: 'Chiếu sáng & Giải trí thông minh (Sắp ra mắt)',
    shortDescription: 'Hệ thống điều khiển TV, Điều hòa, Rèm cửa, Âm thanh đa vùng tự động hóa.',
    fullDescription: 'Dịch vụ tích hợp nâng cao giúp bạn tự động hóa hoàn toàn không gian sống: tự động đóng rèm khi trời nắng, phát nhạc thư giãn khi về nhà, kiểm soát điều hòa tinh tế. Nội dung chi tiết sắp ra mắt.',
    icon: Settings,
    category: 'smarthome',
    features: ['Sắp ra mắt (Coming soon)', 'Phong cách sống hiện đại', 'Trải nghiệm đỉnh cao'],
    pricing: [
      { item: 'Dịch vụ đang phát triển', price: 'Coming Soon', unit: 'thiết bị' }
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },

  // CONSTRUCTION (THI CÔNG ĐIỆN NƯỚC TRỌN GÓI)
  {
    id: 'con1',
    slug: 'thi-cong-dien-nuoc-nha-pho-biet-thu',
    title: 'Thi công điện nước nhà phố, biệt thự',
    shortDescription: 'Thi công trọn gói hệ thống điện nước từ phần thô đến hoàn thiện, cam kết an toàn, chuẩn bản vẽ.',
    fullDescription: 'Dịch vụ thi công lắp đặt trọn gói hệ thống cơ điện nước cho các công trình nhà phố, biệt thự, nhà cấp 4. Đội ngũ thợ giàu kinh nghiệm, thi công tỉ mỉ theo đúng bản vẽ thiết kế kỹ thuật, cam kết tiến độ và chất lượng vượt trội.',
    icon: Hammer,
    category: 'construction',
    features: ['Thi công đúng bản vẽ', 'Cam kết tiến độ bàn giao', 'Bảo hành hệ thống 2 năm'],
    pricing: [
      { item: 'Thi công phần thô + hoàn thiện', price: 'Từ 120.000đ', unit: 'm2' },
      { item: 'Lắp đặt thiết bị vệ sinh, nhà bếp', price: 'Từ 80.000đ', unit: 'thiết bị' }
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'con2',
    slug: 'thi-cong-cai-tao-dien-nuoc-cu',
    title: 'Cải tạo hệ thống điện nước cũ trọn gói',
    shortDescription: 'Cải tạo, nâng cấp toàn diện hệ thống đường dây điện và ống nước xuống cấp cho nhà dân, văn phòng.',
    fullDescription: 'Đối với các ngôi nhà cũ, hệ thống điện nước xuống cấp tiềm ẩn nhiều rủi ro cháy nổ và rò rỉ nước. Hoàng Tuấn MPE cung cấp giải pháp cải tạo trọn gói: thay dây điện Cadivi bọc ống cách điện, đi lại đường ống cấp thoát nước mới chịu áp lực cao, giúp ngôi nhà an toàn tuyệt đối.',
    icon: Wrench,
    category: 'construction',
    features: ['Sử dụng vật tư cao cấp', 'Thi công nhanh, sạch sẽ', 'Khảo sát và báo giá miễn phí'],
    pricing: [
      { item: 'Cải tạo toàn bộ hệ thống', price: 'Theo khảo sát', unit: 'gói' }
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
  },

  // SOLAR LIGHTS (ĐÈN NĂNG LƯỢNG MẶT TRỜI)
  {
    id: 'sol1',
    slug: 'lap-den-pha-nang-luong-mat-troi',
    title: 'Lắp đặt đèn pha năng lượng mặt trời',
    shortDescription: 'Cung cấp và lắp đặt đèn pha LED năng lượng mặt trời siêu sáng, chống nước IP67, tự động bật tắt.',
    fullDescription: 'Giải pháp chiếu sáng sân vườn, cổng ngõ, nhà xưởng bằng đèn pha năng lượng mặt trời chất lượng cao. Đèn sử dụng chip LED siêu sáng, pin Lithium thế hệ mới có tuổi thọ cao, tự động bật khi trời tối và sạc đầy pin khi trời sáng, tuyệt đối an toàn và không lo mất điện.',
    icon: Sun,
    category: 'solar',
    features: ['Không tốn 1 đồng tiền điện', 'Chống nước IP67 bền bỉ', 'Có remote điều khiển từ xa'],
    pricing: [
      { item: 'Đèn pha LED 100W/200W', price: 'Từ 650.000đ', unit: 'bộ' },
      { item: 'Đèn pha LED 300W/500W', price: 'Từ 950.000đ', unit: 'bộ' }
    ],
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sol2',
    slug: 'lap-den-duong-nang-luong-mat-troi',
    title: 'Lắp đặt đèn đường năng lượng mặt trời',
    shortDescription: 'Lắp đặt đèn đường năng lượng mặt trời cho ngõ hẻm, lối đi chung cư, rẫy vườn và trang trại.',
    fullDescription: 'Chuyên lắp đặt đèn chiếc lá, đèn đường năng lượng mặt trời cho các công trình công cộng, đường đi nông thôn, rẫy vườn vùng sâu vùng xa chưa có điện lưới. Đèn hoạt động tự động thông minh, thiết kế gọn gàng dễ lắp đặt, bảo hành chính hãng uy tín.',
    icon: Sun,
    category: 'solar',
    features: ['Tự cấp nguồn 100% tự nhiên', 'Cảm biến chuyển động thông minh', 'Lắp đặt dễ dàng không đi dây'],
    pricing: [
      { item: 'Đèn đường năng lượng mặt trời', price: 'Từ 850.000đ', unit: 'bộ' }
    ],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800'
  }
];
