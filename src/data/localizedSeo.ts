import { CMSSeo, CMSLocalBusiness, CMSContact, CMSSiteSettings } from '../lib/sanity';

export const LOCALIZED_SEO: { [key: string]: { [path: string]: CMSSeo } } = {
  baoloc: {
    "/": {
      pagePath: "/",
      metaTitle: "Thợ Điện Nước Bảo Lộc 24/7 | Sửa Chập Điện - Dò Rò Rỉ Nước Ngầm Lâm Đồng",
      metaDescription: "Dịch vụ thợ điện nước Bảo Lộc uy tín số 1. Sửa chữa nhảy CB, chập điện 24 giờ cứu nạn đêm, siêu âm rò rỉ ống nước ngầm không đục phá và lắp đặt camera an ninh Bảo Lộc có mặt sau 15-30 phút.",
      keywords: ["tho dien bao loc", "sua dien nuoc bao loc", "do tim ro ri nuoc bao loc", "lap camera bao loc", "tho sua dien gan day bao loc", "sua dien 24h bao loc", "sieu am nuoc bao loc", "tho sua ong nuoc bao loc"]
    },
    "/dich-vu": {
      pagePath: "/dich-vu",
      metaTitle: "Dịch Vụ Sửa Điện Nước & Camera Lắp Đặt Tại Bảo Lộc - Lâm Đồng",
      metaDescription: "Khám phá danh mục dịch vụ sửa chữa cơ điện nước chuyên sâu Bảo Lộc: Điện gia dụng, siêu âm rò rỉ nước ngầm, lắp đặt camera an ninh chính hãng. Giá tốt minh bạch.",
      keywords: ["dich vu sua dien bao loc", "dich vu sua nuoc bao loc", "do ro ri ong nuoc bao loc", "lap dat camera tron goi bao loc"]
    },
    "/san-pham": {
      pagePath: "/san-pham",
      metaTitle: "Cửa Hàng Thiết Bị Điện Nước & Camera Chính Hãng Bảo Lộc",
      metaDescription: "Cung cấp sỉ lẻ thiết bị điện dân dụng MPE, Panasonic, ống Bình Minh PPR chịu nhiệt và camera wifi Ezviz, Imou giá rẻ nhất tại Bảo Lộc Lâm Đồng.",
      keywords: ["thiet bi dien bao loc", "cua hang mpe bao loc", "ong nuoc binh minh bao loc", "mua ban camera bao loc"]
    },
    "/bang-gia": {
      pagePath: "/bang-gia",
      metaTitle: "Bảng Giá Sửa Điện Nước & Lắp Đặt Thiết Bị Mới Nhất Tại Bảo Lộc",
      metaDescription: "Xem chi tiết bảng giá thi công sửa chữa điện dân dụng, lắp đặt bồn rửa, vòi hoa sen, thay CB và siêu âm rào rỉ nước sạch chi tiết công khai tại Bảo Lộc.",
      keywords: ["bang gia sua dien bao loc", "chi phi sua nuoc bao loc", "gia ro ri nuoc sieu am bao loc", "cong lap camera bao loc"]
    },
    "/blog": {
      pagePath: "/blog",
      metaTitle: "Cẩm Nang Hướng Dẫn Sửa Điện Nước & Mẹo Vặt Gia Đình Bảo Lộc",
      metaDescription: "Tổng hợp các bài viết kinh nghiệm xử lý chập cháy điện, định vị bục vỡ ống nước và hướng dẫn bảo quản hệ thống camera giám sát chống ẩm ướt tại Bảo Lộc Lâm Đồng.",
      keywords: ["meo sua dien bao loc", "kinh nghiem ro ri nuoc lam dong", "cach cai camera ezviz bao loc"]
    },
    "/lien-he": {
      pagePath: "/lien-he",
      metaTitle: "Liên Hệ Công Ty Hoàng Tuấn MPE Bảo Lộc | Thợ Điện Nước 24/7",
      metaDescription: "Liên hệ Hotline sửa chữa khẩn cấp 24/7 tại Bảo Lộc: 0389.011.315. Văn phòng: 74 Trần Phú, Lộc Phát, TP. Bảo Lộc, Lâm Đồng. Bản đồ và Zalo chỉ dẫn chi tiết.",
      keywords: ["lien he tho dien bao loc", "so dien thoai sua ong nuoc bao loc", "dia chi sua dien nuoc bao loc"]
    }
  },
  hcm: {
    "/": {
      pagePath: "/",
      metaTitle: "Thợ Điện Nước TP.HCM 24/7 | Sửa Chập Điện Sài Gòn - Siêu Âm Rò Rỉ Nước 4H",
      metaDescription: "Dịch vụ thợ điện nước tphcm khẩn cấp 24/7. Thợ sửa điện chập nổ âm tường, dò tìm rò rỉ nước ngầm sụt lún nền đô thị bằng máy siêu âm Đức và lắp đặt camera an ninh tphcm có mặt đón đầu sau 15-20 phút.",
      keywords: ["tho dien tphcm", "sua dien dien nuoc hcm", "do tim ro ri nuoc tphcm", "lap camera tphcm", "tho sua dien gan day tphcm", "sua dien quan 1", "sua dien quan 7", "sua dien go vap", "tho sua ong nuoc hcm"]
    },
    "/dich-vu": {
      pagePath: "/dich-vu",
      metaTitle: "Dịch Vụ Sửa Điện Nước & Camera Lắp Đặt Tại TP. Hồ Chí Minh",
      metaDescription: "Hoàng Tuấn MPE cung cấp dịch vụ cơ điện nước công nghiệp, điện gia dụng, siêu âm rà rỉ thất thoát nước ngầm nhà xưởng và camera góc rộng giám sát tại tất cả quận huyện Sài Gòn.",
      keywords: ["dich vu sua dien tphcm", "dich vu sua nuoc hot hcm", "do ro ri ong nuoc tphcm", "lap camera an ninh sai gon"]
    },
    "/san-pham": {
      pagePath: "/san-pham",
      metaTitle: "Cửa Hàng Thiết Bị Điện Nước MPE & Camera Giám Sát Uy Tín TP.HCM",
      metaDescription: "Mua sỉ lẻ aptomat Panasonic, ổ cắm khóa MPE chống cháy, camera ngoài trời vỏ sắt và ống PPR chịu nhiệt tại tổng kho Hoàng Tuấn MPE TP. Hồ Chí Minh.",
      keywords: ["thiet bi dien mpe hcm", "cb panasonic sai gon", "camera ip tron goi tphcm", "vật tư nước tphcm"]
    },
    "/bang-gia": {
      pagePath: "/bang-gia",
      metaTitle: "Báo Giá Thợ Sửa Điện Nước & Công Lắp Đặt Khẩn Cấp Tại TP.HCM",
      metaDescription: "Bảng giá công khai dịch vụ sửa chữa chập điện âm tường, thay thế vòi nước gãy hỏng, thông bồn cầu nghẹt và kiểm tra rà rỉ hầm bao thất thoát sâu nhất TP.HCM.",
      keywords: ["bang gia sua dien goi chu tphcm", "chi phi do sieu am nuoc hcm", "phi camera ghi hinh sai gon"]
    },
    "/blog": {
      pagePath: "/blog",
      metaTitle: "Tin Tức & Kinh Nghiệm Tiêu Chuẩn Cơ Điện Lạnh Đô Thị TP.HCM",
      metaDescription: "Bản tin cơ điện nước Sài Gòn: Chia sẻ các giải pháp ngắt tải điều hòa mùa nắng nóng, kỹ thuật phát hiện dột trần bục tường thạch cao ẩm ướt và review camera 360 độ an an ninh.",
      keywords: ["meo tiet kiem nuoc sai gon", "tai sao nhay cb dieu hoa tphcm", "kinh nghiem mua camera gia dinh sai gon"]
    },
    "/lien-he": {
      pagePath: "/lien-he",
      metaTitle: "Liên Hệ Văn Phòng Hoàng Tuấn MPE TP.HCM | Sửa Điện Nước 24H",
      metaDescription: "Số điện thoại thợ điện nước TP.HCM trực đêm khẩn cấp: 0389.011.315. Trụ sở: 74 Trần Phú, Quận 1, TP. Hồ Chí Minh. Bản đồ dẫn đường và kết nối Zalo nhanh.",
      keywords: ["so dien thoai tho dien tphcm", "dia chi sua ong nuoc sai gon", "lien he sua chua co dien lanh hcm"]
    }
  }
};

export const LOCALIZED_BUSINESS_SCHEMA: { [key: string]: CMSLocalBusiness } = {
  baoloc: {
    name: "Hoàng Tuấn MPE - Trụ Sở Sửa Điện Nước Bảo Lộc Lâm Đồng",
    legalName: "Công ty TNHH Hoàng Tuấn MPE Cơ Điện (Trụ sở chính Bảo Lộc)",
    telephone: "0389.011.315",
    address: {
      streetAddress: "Hẻm 74 Trần Phú, Phường Lộc Phát, TP. Bảo Lộc",
      addressLocality: "Lâm Đồng",
      addressRegion: "Tỉnh Lâm Đồng",
      postalCode: "67000",
      addressCountry: "VN"
    },
    geo: {
      latitude: 11.545,
      longitude: 107.808
    },
    priceRange: "$$",
    openingHoursSpecification: [
      { dayOfWeek: "Monday-Sunday", opens: "00:00", closes: "23:59" }
    ]
  },
  hcm: {
    name: "Hoàng Tuấn MPE - Chi Nhánh Sửa Điện Nước TP. Hồ Chí Minh",
    legalName: "Công ty TNHH Hoàng Tuấn MPE Cơ Điện (Chi nhánh TP.HCM)",
    telephone: "0389.011.315",
    address: {
      streetAddress: "74 Trần Phú, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      addressLocality: "TP. Hồ Chí Minh",
      addressRegion: "Khu vực Sài Gòn",
      postalCode: "70000",
      addressCountry: "VN"
    },
    geo: {
      latitude: 10.776,
      longitude: 106.701
    },
    priceRange: "$$",
    openingHoursSpecification: [
      { dayOfWeek: "Monday-Sunday", opens: "00:00", closes: "23:59" }
    ]
  }
};

export const LOCALIZED_CONTACT: { [key: string]: CMSContact } = {
  baoloc: {
    pageTitle: "BẢO LỘC - KẾT NỐI VỚI THỢ VẬN HÀNH HOÀNG TUẤN MPE",
    pageSubtitle: "Đội ngũ điều phối viên trực đài sương gió Bảo Lộc luôn túc trực, thợ bản địa di chuyển dốc đồi Lâm Đồng có mặt sau 15-30 phút gọi.",
    contactFields: [
      { icon: "Phone", label: "Điện thoại 24/7", val: "0389.011.315", desc: "Không nghỉ trưa, túc trực cả ngày lễ và Tết" },
      { icon: "MessageSquare", label: "Zalo Chat Bảo Lộc", val: "0389011315", desc: "Gửi hình ảnh sự cố nhận tư vấn báo giá ngay" },
      { icon: "MapPin", label: "Địa chỉ Trụ sở Bảo Lộc", val: "Hẻm 74 Trần Phú, Phường Lộc Phát, TP. Bảo Lộc, Lâm Đồng (Đối diện Trạm Xăng rẽ vào)" },
      { icon: "Clock", label: "Giờ làm việc Lâm Đồng", val: "Mở cửa xuyên suốt 24H từ thứ 2 đến chủ nhật" }
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15582.478201504787!2d107.79586119999999!3d11.5435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173e2a77af8b06d%3A0xe7bd193c6f66bd32!2zTOG7mWMgUGjDoXQsIELhuqNvIEzhu5ljLCBMw6JtIMSQ4buTbmcsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1716301234567"
  },
  hcm: {
    pageTitle: "TP.HCM - LIÊN HỆ ĐỘI KỸ SƯ HOÀNG TUẤN MPE SÀI GÒN",
    pageSubtitle: "Đội ngũ kỹ thuật viên rải rác phủ sóng 24 quận huyện Sài Gòn. Xử lý sửa chữa chập điện gia đình, rà siêu âm rò nước ngầm chuyên sâu đô thị.",
    contactFields: [
      { icon: "Phone", label: "Hotline Khẩn Cấp TP.HCM", val: "0389.011.315", desc: "Phản hồi kết nối kỹ sư dự án trực tiếp 24/24" },
      { icon: "MessageSquare", label: "Zalo Cơ Điện Sài Gòn", val: "0389011315", desc: "Khảo sát tư vấn trực tuyến giảm giá gói thi công 10%" },
      { icon: "MapPin", label: "Trụ sở chi nhánh Sài Gòn", val: "74 Trần Phú, Quận 1, TP. Hồ Chí Minh" },
      { icon: "Clock", label: "Giờ phục vụ đô thị", val: "Phục vụ ngày lẫn đêm 24/7/365, có thợ trực trực tết" }
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.51786591041rem!2d106.699!3d10.776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4w!2zUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen"
  }
};

export const LOCALIZED_SITE_SETTINGS: { [key: string]: CMSSiteSettings } = {
  baoloc: {
    siteName: "Hoàng Tuấn MPE Bảo Lộc",
    tagline: "Thợ Điện Nước Bản Địa Bảo Lộc - Lắp Đặt Camera Lâm Đồng - Siêu Âm Dò Rò Rỉ Nước 24H Gia Đình",
    mainHotline: "0389.011.315",
    mainZalo: "https://zalo.me/0389011315",
    headerNotice: "Thợ túc trực dốc đèo Bảo Lộc có mặt khẩn cấp sau 15-30 phút gọi!"
  },
  hcm: {
    siteName: "Hoàng Tuấn MPE TP.HCM",
    tagline: "Thợ sửa điện nước tphcm 24/7 - Dò tìm rò rỉ siêu âm Sài Gòn - Chuyên Sửa Chập Điện Âm Tường Đô Thị",
    mainHotline: "0389.011.315",
    mainZalo: "https://zalo.me/0389011315",
    headerNotice: "Thợ điện nước tphcm trực đêm quận huyện có mặt cấp bách sau 15 phút gọi!"
  }
};
