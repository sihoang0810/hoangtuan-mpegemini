import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load variables from .env
dotenv.config();

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

console.log('--------------------------------------------------');
console.log(' Hoàng Tuấn MPE - Sanity CMS Seeding Engine');
console.log('--------------------------------------------------');

if (!projectId || projectId === 'your_sanity_project_id') {
  console.error('⛔ Error: VITE_SANITY_PROJECT_ID is not configured in your .env file.');
  process.exit(1);
}

if (!token || token === 'your_sanity_write_token') {
  console.error('⛔ Error: SANITY_WRITE_TOKEN is not configured in your .env file or is a placeholder.');
  console.error('Please create a write token in Sanity Manage (https://manage.sanity.io),');
  console.error('under Settings -> API settings -> Tokens (with Write permission) and set it in your .env.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  token,
  useCdn: false,
});

const seedDocuments: any[] = [
  // 1. Site Settings
  {
    _id: 'siteSettings-global',
    _type: 'siteSettings',
    siteName: 'Hoàng Tuấn MPE',
    tagline: 'Thiết bị điện MPE chính hãng & Sửa chữa điện nước 24/7 uy tín tại Bảo Lộc',
    favicon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=32',
    logo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=150',
    mainHotline: '0389 011 315',
    mainZalo: 'https://zalo.me/0389011315',
    headerNotice: 'Hỗ trợ khẩn cấp 24/7: Thợ kỹ thuật có mặt sau 15 - 30 phút gọi!',
  },

  // 2. Footer
  {
    _id: 'footer-global',
    _type: 'footer',
    companyName: 'Công Ty Hoàng Tuấn MPE',
    shortAbout: 'Hoàng Tuấn MPE tự hào là một trong những đơn vị sửa chữa cơ điện dân dụng, dò tìm rò rỉ nước ngầm siêu âm và thiết kế lắp đặt camera hàng đầu tại Bảo Lộc, Lâm Đồng.',
    address: 'Hẻm 74 Trần Phú, Lộc Phát, Bảo Lộc, Lâm Đồng',
    phone: '0389 011 315',
    email: 'contact@hoangtuanmpe.com',
    workingHours: 'Hỗ trợ khẩn cấp 24/7 (Kể cả Chủ Nhật & Ngày Lễ)',
    socialLinks: {
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      zalo: 'https://zalo.me/0389011315',
    },
    copyrightText: '© 2026 Công Ty Hoàng Tuấn MPE. Thiết kế & vận hành chuyên nghiệp.',
  },

  // 3. Contact Config
  {
    _id: 'contact-global',
    _type: 'contact',
    pageTitle: 'Liên hệ với Hoàng Tuấn MPE',
    pageSubtitle: 'Đội ngũ trực chiến điện nước luôn sẵn sàng phục vụ quý khách tại Bảo Lộc và toàn tỉnh Lâm Đồng. Đừng ngần ngại liên hệ qua hotline hoặc kênh Zalo cứu hộ.',
    contactFields: [
      {
        _key: 'c1',
        icon: 'Phone',
        label: 'Điện thoại 24/7',
        val: '0389.011.315',
        desc: 'Luôn trực hotline xử lý sự cố ngày đêm, lễ Tết.',
      },
      {
        _key: 'c2',
        icon: 'MessageSquare',
        label: 'Zalo tư vấn & Báo giá',
        val: '0389011315',
        desc: 'Gửi ảnh tình trạng để nhận tư vấn báo giá miễn phí.',
      },
      {
        _key: 'c3',
        icon: 'MapPin',
        label: 'Văn phòng chính',
        val: 'Hẻm 74 Trần Phú, Lộc Phát, Bảo Lộc, Lâm Đồng',
        desc: 'Điểm xuất phát phục vụ siêu tốc khu vực lân cận.',
      },
      {
        _key: 'c4',
        icon: 'Clock',
        label: 'Giờ mở cửa',
        val: 'Trực 24H liên tục',
        desc: 'Hỗ trợ xuyên suốt bất cứ khi nào bạn cần.',
      },
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15582.478201504787!2d107.79586119999999!3d11.5435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173e2a77af8b06d%3A0xe7bd193c6f66bd32!2zTOG7mWMgUGjDoXQsIELhuqNvIEzhu5ljLCBMw6JtIMSQ4buTbmcsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1716301234567!5m2!1sen!2s',
  },

  // 4. Local Business
  {
    _id: 'localBusiness-global',
    _type: 'localBusiness',
    name: 'Hoàng Tuấn MPE',
    legalName: 'Doanh nghiệp Cơ điện nước Hoàng Tuấn MPE Bảo Lộc',
    logo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=150',
    telephone: '0389.011.315',
    address: {
      streetAddress: '74 Trần Phú, Lộc Phát',
      addressLocality: 'Bảo Lộc',
      addressRegion: 'Lâm Đồng',
      postalCode: '67000',
      addressCountry: 'VN',
    },
    geo: {
      latitude: 11.5435,
      longitude: 107.8023,
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        _key: 'h1',
        dayOfWeek: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
        opens: '00:00',
        closes: '23:59',
      },
    ],
  },

  // 5. Locations Info
  {
    _id: 'location-baoloc',
    _type: 'location',
    id: 'baoloc',
    name: 'Bảo Lộc',
    hotline: '0389.011.315',
    description: 'Trụ sở chính, hỗ trợ nhanh nhất khu vực Lâm Đồng (Bảo Lộc, Bảo Lâm, Di Linh, v.v.).',
    image: 'https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'location-hcm',
    _type: 'location',
    id: 'hcm',
    name: 'Hồ Chí Minh',
    hotline: '0389.011.315',
    description: 'Chi nhánh đại diện kỹ thuật, hỗ trợ khu vực các quận nội thành TP. Hồ Chí Minh.',
    image: 'https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800',
  },

  // 6. Homepage Main Slider Content
  {
    _id: 'homepage-main',
    _type: 'homepage',
    heroTitle: 'SỬA ĐIỆN NƯỚC\nHOÀNG TUẤN MPE',
    heroSubtitle: 'Giải pháp sửa chữa điện nước gia đình nhanh chóng, uy tín và chuyên nghiệp. Chúng tôi dò tìm và xử lý triệt để mọi sự cố điện, rò nước tại Bảo Lộc chỉ từ 15-30 phút.',
    heroOverlayText: 'CỨU HỘ KHẨN CẤP 24/7',
    ctaText: 'Gọi Ngay 0389.011.315',
    ctaLink: 'tel:0389011315',
    features: [
      {
        _key: 'f1',
        title: 'Hỗ trợ 24/7',
        description: 'Đội ngũ kỹ thuật trực chiến bất kể ngày đêm, ngày nghỉ hay lễ tết.',
        icon: 'Clock',
      },
      {
        _key: 'f2',
        title: 'Có mặt nhanh',
        description: 'Cam kết kỹ thuật viên di chuyển tới nhà chỉ sau 15 - 30 phút.',
        icon: 'MapPin',
      },
      {
        _key: 'f3',
        title: 'Báo giá minh bạch',
        description: 'Cử thợ kiểm tra miễn phí, thống nhất báo giá rồi mới triển khai sửa.',
        icon: 'DollarSign',
      },
      {
        _key: 'f4',
        title: 'Bảo hành dịch vụ',
        description: 'Tất cả sửa chữa được đồng hành bảo hành chính hãng MPE từ 6-12 tháng.',
        icon: 'ShieldCheck',
      },
    ],
    stats: [
      { _key: 's1', value: '1.500+', label: 'Hộ gia đình xử lý' },
      { _key: 's2', value: '30 phút', label: 'Cam kết có mặt' },
      { _key: 's3', value: '10+', label: 'Năm uy tín ngành' },
      { _key: 's4', value: '100%', label: 'Bảo hành chu đáo' },
    ],
    aboutHeading: 'Về Hoàng Tuấn MPE - Thợ Sửa Chữa Chuyên Nghiệp',
    aboutContent: 'Công ty Hoàng Tuấn MPE tự hào là một trong những đơn vị sửa chữa cơ điện nước hàng đầu tại khu vực Lâm Đồng. Chúng tôi chuyên cung cấp dịch vụ chất lượng cao về điện gia dụng, dò tìm rò rỉ nước ngầm bằng sóng siêu âm hiện đại mang thương hiệu PQWT và lắp đặt thiết bị gia an ninh thông minh. Sự tin dùng của quý khách là động lực phát triển vững mạnh lâu dài của đội ngũ.',
    aboutImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    benefitHeading: 'Cam kết chất lượng dịch vụ của chúng tôi',
    sections: [
      { _type: 'heroSection', _key: 's-hero', isActive: true, heroTitle: 'SỬA ĐIỆN NƯỚC\nHOÀNG TUẤN MPE', heroSubtitle: 'Giải pháp sửa chữa điện nước gia đình nhanh chóng, uy tín và chuyên nghiệp. Chúng tôi dò tìm và xử lý triệt để mọi sự cố điện, rò nước tại Bảo Lộc chỉ từ 15-30 phút.', heroOverlayText: 'CỨU HỘ KHẨN CẤP 24/7' },
      { _type: 'servicesSection', _key: 's-services', isActive: true, heading: 'Dịch Vụ Của Chúng Tôi', subheading: 'Giải Pháp Toàn Diện Cho Gia Đình' },
      { _type: 'whyChooseUsSection', _key: 's-whychooseus', isActive: true, heading: 'Tại Sao Chọn Chúng Tôi', subheading: 'Dịch Vụ Uy Tín, Chất Lượng Hàng Đầu' },
      { _type: 'processTimelineSection', _key: 's-processtimeline', isActive: true, heading: 'Quy Trình Phục Vụ', subheading: 'Các Bước Chuyên Nghiệp Để Xử Lý Sự Cố Điện Nước' },
      { _type: 'featuredProductsSection', _key: 's-featuredproducts', isActive: true, heading: 'Cửa Hàng Thiết Bị', subheading: 'Sản Phẩm Nổi Bật' },
      { _type: 'testimonialsSection', _key: 's-testimonials', isActive: true, heading: 'Ý Kiến Khách Hàng', subheading: 'Khách Hàng Nói Gì Về Chúng Tôi' },
      { _type: 'blogSection', _key: 's-blog', isActive: true, heading: 'Kinh Nghiệm & Mẹo Vặt', subheading: 'Chia Sẻ Kiến Thức Sửa Chữa Thường Ngày' },
      { _type: 'faqSection', _key: 's-faq', isActive: true, heading: 'Nhưng Câu Hỏi Thường Gặp', subheading: 'Thông Tin Cần Biết Về Quy Trình & Giá Cả' },
    ],
    benefits: [
      'Cam kết thợ tay nghề chuẩn 100%, đào tạo chính quy an toàn điện nước.',
      'Sử dụng 100% vật tư chính hãng MPE bền bỉ cao cấp, bảo hành dài hạn.',
      'Báo giá trước khi thi công, hỗ trợ kiểm tra và đo đạc hoàn toàn miễn phí.',
      'Công nghệ siêu âm rò rỉ hiện đại, tìm chính xác điểm vỡ hạn chế đục tàn phá tường.',
    ],
  },

  // 7. Banner (Chạy đầu trang)
  {
    _id: 'banner-main',
    _type: 'banner',
    title: 'Thông báo khẩn cấp ngày đêm',
    text: '☎️ Nhận sửa chữa cứu hộ chập điện, vỡ ống nước khẩn cấp 24/24 đêm ngày. Thợ có mặt sau 15 phút gọi!',
    linkText: 'Số cứu hộ',
    linkUrl: 'tel:0389011315',
    isActive: true,
  },

  // 8. Popup (Hộp quảng cáo)
  {
    _id: 'popup-promo',
    _type: 'popup',
    title: 'GIẢM GIÁ 10% HÔM NAY',
    subtitle: 'Đăng ký đặt lịch trực tuyến sửa chữa điện nước hoặc thiết kế combo Camera an ninh ngay hôm nay để nhận voucher giảm trừ 10% chi phí hóa đơn!',
    image: 'https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=500',
    ctaText: 'Nhận ưu đãi qua Zalo',
    ctaLink: 'https://zalo.me/0389011315',
    delaySeconds: 5,
    isActive: true,
  },

  // 9. Service Categories
  {
    _id: 'serviceCategory-electrical',
    _type: 'serviceCategory',
    id: 'electrical',
    title: 'Điện dân dụng',
    description: 'Sửa chữa lắp đặt xử lý nhanh chập cháy dòng điện gia đình và chiếu sáng.',
    icon: 'Zap',
    color: 'blue',
  },
  {
    _id: 'serviceCategory-plumbing',
    _type: 'serviceCategory',
    id: 'plumbing',
    title: 'Nước dân dụng',
    description: 'Khắc phục gãy vòi, nghẹt bồn cầu, máy bơm, rò nước ẩm mốc.',
    icon: 'Droplet',
    color: 'cyan',
  },
  {
    _id: 'serviceCategory-camera',
    _type: 'serviceCategory',
    id: 'camera',
    title: 'Camera giám sát',
    description: 'Giải pháp thi công hệ thống an ninh xem từ xa qua app tiện lợi.',
    icon: 'Video',
    color: 'indigo',
  },
  {
    _id: 'serviceCategory-detection',
    _type: 'serviceCategory',
    id: 'detection',
    title: 'Siêu âm dò tìm',
    description: 'Khảo sát rò rỉ nước ngầm bằng máy nhập khẩu chính xác 99%.',
    icon: 'Search',
    color: 'amber',
  },

  // 10. Service Nodes
  // --- ELECTRICAL CATEGORY ---
  {
    _id: 'service-sua-dien',
    _type: 'service',
    id: 'e1',
    slug: 'sua-dien',
    title: 'Sửa điện dân dụng',
    shortDescription: 'Xử lý nhanh các sự cố mất điện, chập điện gia đình và văn phòng.',
    fullDescription: 'Dịch vụ sửa chữa hệ thống điện gia đình chuyên nghiệp tại Bảo Lộc. Chúng tôi nhận kiểm tra và khắc phục mọi sự cố về điện như mất điện đột ngột, hỏng công tắc, ổ cắm, hệ thống điện gặp sự cố không rõ nguyên nhân. Đội ngũ thợ giàu kinh nghiệm, chu đáo, kiểm tra báo trước giá rồi mới bắt tay làm.',
    icon: 'Zap',
    category: 'electrical',
    features: ['Kiểm tra hoàn toàn miễn phí', 'Sửa xong triệt để ngay trong ngày', 'Bảo hành uy tín 12 tháng'],
    pricing: [
      { _key: 'p1', item: 'Thay công tắc/ổ cắm', price: 'Từ 50.000đ', unit: 'cái' },
      { _key: 'p2', item: 'Sửa mất điện nội bộ', price: 'Từ 150.000đ', unit: 'lần' },
      { _key: 'p3', item: 'Khảo sát hạ tầng điện ngầm', price: 'Miễn phí', unit: '' },
    ],
    benefits: ['Thợ chuẩn bằng cấp cơ điện', 'Linh kiện MPE chính hiệu', 'Giá bám mặt bằng chung rẻ'],
    faq: [
      { _key: 'f1', question: 'Thời gian thợ có mặt là bao lâu?', answer: 'Thợ sẽ đi tới địa chỉ của bạn trong vòng 15-30 phút kể từ khi tiếp nhận yêu cầu điện thoại.' },
      { _key: 'f2', question: 'Có bảo hành dịch vụ không?', answer: 'Có, các hạng mục thợ sửa điện từ lắp ráp thiết bị đến đi dây điện mới đều bảo hành 6 đến 12 tháng rõ ràng bằng hóa đơn.' },
    ],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'service-sua-chap-dien',
    _type: 'service',
    id: 'e2',
    slug: 'sua-chap-dien',
    title: 'Sửa chập điện âm tường',
    shortDescription: 'Dò tìm rò rỉ điện âm, sửa chập cháy nổ tủ điện ngầm bằng sensor chuyên dụng.',
    fullDescription: 'Chập điện là sự cố nguy hiểm hàng đầu dẫn tới hỏa hoạn gia đình. Đội thợ chuyên nghiệp của chúng tôi sử dụng ampe kìm và máy cảm ứng chuyên dụng dò định vị nhanh điểm đứt, chập cháy ngầm trong lớp thạch cao, tường gạch để khắc phục một cách an toàn mà không cần đập phá lung tung kết cấu nhà.',
    icon: 'ShieldCheck',
    category: 'electrical',
    features: ['Định vị chuẩn 100% điểm chập', 'Thiết bị đo nhập khẩu chuyên dụng', 'Thi công gọn gàng thẩm mĩ'],
    pricing: [
      { _key: 'p1', item: 'Dò chập đường điện âm', price: 'Từ 200.000đ', unit: 'vụ' },
      { _key: 'p2', item: 'Đắp vá cách điện an toàn', price: 'Từ 100.000đ', unit: 'điểm' },
    ],
    image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'service-sua-aptomat',
    _type: 'service',
    id: 'e3',
    slug: 'sua-aptomat',
    title: 'Sửa aptomat & Nhảy CB liên tục',
    shortDescription: 'Tư vấn khắc phục quá tải dòng điện, lắp ráp CB chống giật Panasonic, Schneider bảo vệ nguồn điện.',
    fullDescription: 'Aptomat tổng rò rỉ là lớp khiên quan trọng nhất. Nếu nhà bạn bị nhảy CB vô cớ hoặc cháy hỏng CB thợ của chúng tôi sẽ tính toán tải dòng tiêu thụ và tiến hành đấu nối, lắp dắt thay mới CB chống dật, chống quá tải chất lượng bền bỉ cam kết không hư hỏng vặt.',
    icon: 'Settings',
    category: 'electrical',
    features: ['Aptomat thương hiệu MPE, Panasonic chính hãng', 'Không nhảy bừa bãi sau sửa', 'Tư vấn sơ đồ phân nhánh'],
    pricing: [
      { _key: 'p1', item: 'Thay CB tép đơn', price: 'Từ 80.000đ', unit: 'cái' },
      { _key: 'p2', item: 'Lắp CB chống giật tổng', price: 'Từ 180.000đ', unit: 'cái' },
    ],
    image: 'https://images.unsplash.com/photo-1558230352-78d91c78494b?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'service-lap-dat-dien',
    _type: 'service',
    id: 'e4',
    slug: 'lap-dat-dien',
    title: 'Thi công lắp đặt thiết bị điện',
    shortDescription: 'Lắp quạt trần, đèn Led âm trần, đèn trang trí, đi dây điện gọn gàng thẩm mỹ.',
    fullDescription: 'Nhận thiết kế trang hoàng chiếu sáng và đi dây nổi/âm cho phòng khách, quán cà phê, nhà xưởng nhỏ. Lắp các thiết bị bếp từ, máy lọc nước, đèn chùm, quạt bếp thẩm mỹ hoàn mĩ.',
    icon: 'Lightbulb',
    category: 'electrical',
    features: ['Thi công cực kì thẩm mỹ', 'Tối ưu công suất tiết kiệm chi phí điện', 'Đúng tiến độ cam kết'],
    pricing: [
      { _key: 'p1', item: 'Lắp đèn LED/Đèn thả trang trí', price: 'Từ 100.000đ', unit: 'bộ' },
      { _key: 'p2', item: 'Lắp quạt trần trần thạch cao', price: 'Từ 250.000đ', unit: 'cái' },
    ],
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'service-do-duong-dien-am-tuong',
    _type: 'service',
    id: 'e5',
    slug: 'do-duong-dien-am-tuong',
    title: 'Dò tìm đường dây điện âm gạch',
    shortDescription: 'Xác định nhanh tọa độ sơ đồ dây ngầm để tránh khoan trúng khi cải tạo nhà cửa.',
    fullDescription: 'Dịch vụ cần thiết khi bạn sửa sang nhà, treo kệ bếp, khoan đóng đinh tường để tranh rủi ro khoan thủng dây điện bọc trong ruột gà gây hư hỏng hoặc giật điện.',
    icon: 'Search',
    category: 'electrical',
    features: ['Bộ cảm biến chính xác 99%', 'Vẽ sơ đồ mạch trực diện lên tường', 'Không phá dỡ bê tông'],
    pricing: [
      { _key: 'p1', item: 'Dò định vị tuyến cáp âm tường', price: 'Từ 300.000đ', unit: 'vị trí' },
    ],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
  },

  // --- PLUMBING CATEGORY ---
  {
    _id: 'service-sua-nuoc',
    _type: 'service',
    id: 'p1',
    slug: 'sua-nuoc',
    title: 'Sửa đường nước & Lavabo bồn cầu',
    shortDescription: 'Sửa bồn cầu xả nước không ngừng, rỉ nước chậu rửa bát, thay gãy vòi nước.',
    fullDescription: 'Chuyên khắc phục triệt để các phiền tối về bồn cầu rỉ nước chân van, chậu rửa bát nhỏ giọt gầm kệ bếp, thay thế phao cơ tự ngắt bồn nước chính xác hiệu quả nhanh.',
    icon: 'Droplet',
    category: 'plumbing',
    features: ['Thợ làm tỉ mỉ, dọn dẹp sạch sẽ', 'Linh phụ kiện chuẩn cao cấp chống gỉ', 'Báo đúng giá niêm yết'],
    pricing: [
      { _key: 'p1', item: 'Thay vòi nước gãy', price: 'Từ 100.000đ', unit: 'cái' },
      { _key: 'p2', item: 'Thay bộ xả bồn cầu chảy liên tục', price: 'Từ 150.000đ', unit: 'bộ' },
    ],
    image: 'https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'service-sua-ro-ri-nuoc',
    _type: 'service',
    id: 'p2',
    slug: 'sua-ro-ri-nuoc',
    title: 'Sửa rò rỉ nước âm nền tường',
    shortDescription: 'Xử lý bục vỡ ống nước, thạch cao chảy nhỏ giọt ẩm mốc tường.',
    fullDescription: 'Ống dẫn nước bị bục nứt âm dưới gạch gầm nền nhà gây rò thất thoát hàng trăm khối nước, hoặc thấm lên vách gạch hoen mốc. Chúng tôi xử lý vá dán nhiệt bằng máy hàn PPR tiên tiến vững chắc trọn vẹn.',
    icon: 'Droplet',
    category: 'plumbing',
    features: ['Hàn chịu nhiệt PPR công nghệ cao', 'Trám bột trét, bả matit trả lại mặt bằng đẹp', 'Bảo hành rò rỉ 12 tháng'],
    pricing: [
      { _key: 'p1', item: 'Khắc phục rò nổi hộp kĩ thuật', price: 'Từ 150.000đ', unit: 'điểm' },
      { _key: 'p2', item: 'Vá xì vỡ ống âm sàn thạch cao', price: 'Khảo sát thực tế', unit: 'điểm' },
    ],
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'service-lap-may-bom',
    _type: 'service',
    id: 'p3',
    slug: 'lap-may-bom',
    title: 'Sửa chữa lắp đặt máy bơm nước',
    shortDescription: 'Sửa máy bơm chạy nhưng không lên nước, kêu gầm rú cực to, thay phao điện tự động.',
    fullDescription: 'Nhận lắp đặt máy bơm tăng áp điện tử vận hành siêu êm ái cho nhà tắm, máy bơm đẩy cao tầng đẩy bồn nước ngầm Panasonic chính hãng. Thợ sửa nhanh các lỗi cháy cuộn đồng, rách phớt cơ tại chỗ.',
    icon: 'Wrench',
    category: 'plumbing',
    features: ['Máy bơm Panasonic, Wilo chuẩn bảo hành', 'Xử lý triệt để nước yếu nhanh chóng', 'Đấu nối tủ điện phao bảo vệ tuyệt đối'],
    pricing: [
      { _key: 'p1', item: 'Lắp ráp bơm tăng áp điện tử', price: 'Từ 300.000đ', unit: 'máy' },
      { _key: 'p2', item: 'Thay rơ le/Phao điện tự động', price: 'Từ 200.000đ', unit: 'bộ' },
    ],
    image: 'https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800',
  },

  // --- CAMERA ---
  {
    _id: 'service-lap-camera',
    _type: 'service',
    id: 'c1',
    slug: 'lap-camera',
    title: 'Dịch vụ lắp đặt Camera an ninh',
    shortDescription: 'Thi công camera Wifi không dây, camera đầu ghi hình ảnh 2K sắc nét.',
    fullDescription: 'Tư vấn giải pháp giám sát an ninh trọn gói cho nhà phố, sân vườn, kiot kinh doanh, nhà kho cà phê tại Bảo Lộc. Sử dụng camera hãng chuẩn Ezviz, Imou, Dahua kết nối xem từ xa mượt mà trên nhiều điện thoại di động.',
    icon: 'Video',
    category: 'camera',
    features: ['Hình ảnh sắc nét đêm ngày có màu', 'Cảnh báo chuyển động hú báo còi', 'Lưu trữ đám mây hoặc thẻ nhớ bền lâu'],
    pricing: [
      { _key: 'p1', item: 'Lắp ráp cấu hình camera Wifi tận nhà', price: 'Từ 150.000đ', unit: 'mắt' },
      { _key: 'p2', item: 'Nâng cấp đầu ghi hình ổ cứng chuyên dụng', price: 'Khảo sát trực tiếp', unit: 'bộ' },
    ],
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
  },

  // --- DETECTION ---
  {
    _id: 'service-do-ro-ri-nuoc',
    _type: 'service',
    id: 'd1',
    slug: 'do-ro-ri-nuoc',
    title: 'Siêu âm dò tìm rò rỉ nước ngầm',
    shortDescription: 'Dùng thiết bị cảm ứng âm tần độ nhạy cao PQWT tìm chuẩn xác gãy vỡ ống cứu thất thoát nước.',
    fullDescription: 'Hóa đơn tiền nước nhà bạn đột biến tăng vọt gấp 3-5 lần? Đó là dấu hiệu đường ống nước ngầm dưới nền xi măng gạch men bị nứt toác tràn đất. Chúng tôi sử dụng máy dò rò rỉ siêu âm đa kênh PQWT hiện đại chuẩn xác 99%, khoanh vùng hẹp điểm nứt bục để thợ đục duy nhất 1 viên gạch sửa chữa khôi phục nhanh chóng.',
    icon: 'Search',
    category: 'detection',
    features: ['Dò siêu âm không tàn phá đục nền', 'Xử lý hàn ống dán PPR tại chỗ', 'Chuyên nghiệp uy tín hàng đầu Lâm Đồng'],
    pricing: [
      { _key: 'p1', item: 'Dò siêu âm rò rỉ nhà dân, biệt thự', price: 'Từ 500.000đ', unit: 'lần' },
      { _key: 'p2', item: 'Dò khảo sát nhà xưởng, trạm cấp nước', price: 'Theo quy mô thực tế', unit: 'gói' },
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  },

  // 11. Product Categories
  {
    _id: 'productCategory-electrical',
    _type: 'productCategory',
    id: 'electrical',
    title: 'Điện dân dụng MPE',
    description: 'Bóng đèn búp Led, ổ cắm, tủ âm tường, dây dẫn điện, CB chính hiệu Panasonic, MPE.',
    icon: 'Zap',
  },
  {
    _id: 'productCategory-plumbing',
    _type: 'productCategory',
    id: 'plumbing',
    title: 'Vật tư nước cao cấp',
    description: 'Ống hàn nhiệt PPR chịu nhiệt Bình Minh, van đồng vòi gạt, phao bồn lọc, vòi hoa sen.',
    icon: 'Droplet',
  },
  {
    _id: 'productCategory-camera',
    _type: 'productCategory',
    id: 'camera',
    title: 'Camera giám sát an ninh',
    description: 'Các mẫu Camera xoay 360 Wifi, Dahua hồng ngoại FullColor thế hệ mới.',
    icon: 'Video',
  },
  {
    _id: 'productCategory-detection',
    _type: 'productCategory',
    id: 'leak-detection',
    title: 'Dụng cụ đo đạc kĩ thuật',
    description: 'Thiết bị cảm biến sóng âm, dò điện tường, ampe kìm hỗ trợ công vụ chuyên sâu.',
    icon: 'Search',
  },

  // 12. Products (realistic sample documents)
  {
    _id: 'product-aptomat-mpe',
    _type: 'product',
    id: 'p1',
    slug: 'aptomat-mpe',
    name: 'Aptomat (CB) Bảo Vệ MPE 32A',
    category: 'electrical',
    description: 'Thiết bị đóng ngắt Aptomat (CB) bảo vệ mạch điện quá tải cực nhạy của MPE. Sản xuất theo tiêu chuẩn Châu Âu bền bỉ chống giật hồ quang, vỏ nhựa chịu nhiệt chống phóng tia lửa bảo vệ an toàn tối cao cho gia đình.',
    price: '85.000đ',
    image: 'https://images.unsplash.com/photo-1558230352-78d91c78494b?auto=format&fit=crop&q=80&w=800',
    features: ['Nhựa chống cháy cao cấp chịu nhiệt', 'Cơ chế đóng ngắt siêu nhạy lực bám cực lớn', 'Dòng tải chịu áp cao lên đến 6kA'],
    specs: [
      { _key: 's1', key: 'Thương hiệu', value: 'MPE Vietnam' },
      { _key: 's2', key: 'Dòng định mức', value: '32A' },
      { _key: 's3', key: 'Loại CB', value: 'CB tép 2 cực chống quá tải' },
    ],
  },
  {
    _id: 'product-cb-chong-giat-panasonic',
    _type: 'product',
    id: 'p3',
    slug: 'cb-chong-giat-panasonic',
    name: 'CB Chống Giật Panasonic Nhật Bản 40A',
    category: 'electrical',
    description: 'Bảo vệ an toàn tuyệt đối tính mạng của cả gia đình trước nguy cơ hở dây điện rò rỉ âm đất ẩm tường. Ngắt điện tức thì chỉ trong 0.01 giây khi phát hiện dòng rò đạt ngưỡng nguy hại 30mA.',
    price: '450.000đ',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    features: ['Thời gian phản hồi siêu tốc 0.01 giây', 'Dòng rò ngắt nhạy cực kì chuẩn xác 30mA', 'Sản xuất trực tiếp chính hãng Panasonic bảo hành 2 năm'],
    specs: [
      { _key: 's1', key: 'Thương hiệu', value: 'Panasonic Japan' },
      { _key: 's2', key: 'Dòng cực đại', value: '40A' },
      { _key: 's3', key: 'Độ nhạy dòng rò', value: '30mA' },
    ],
  },
  {
    _id: 'product-may-bom-day-cao-panasonic-200w',
    _type: 'product',
    id: 'p4',
    slug: 'may-bom-day-cao-panasonic',
    name: 'Máy bơm nước đẩy cao Panasonic 200W',
    category: 'plumbing',
    description: 'Trợ thủ đắc lực bơm đẩy nước giếng khoan, bồn ngầm trữ nước lên các bồn nước tầng mái nhà 3-5 tầng cực mạnh mẽ. Động cơ motor dây đồng 100% vận hành êm ru tích hợp rơle tự ngắt khi cạn nước bảo vệ máy chống cháy tuyệt hảo.',
    price: '1.850.000đ',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800',
    features: ['Motor rơ-le êm rung thấp độ ồn cực nhỏ', 'Lưu lượng xả đẩy mạnh mẽ tới 45 lít/phút', 'Kháng nước chống rỉ sét ngoài trời IPX4'],
    specs: [
      { _key: 's1', key: 'Công suất', value: '200W (0.27 HP)' },
      { _key: 's2', key: 'Cột áp đẩy cao tối đa', value: '30 mét' },
      { _key: 's3', key: 'Lưu lượng nước cấp', value: '45 Lít / Phút' },
    ],
  },
  {
    _id: 'product-camera-ezviz-c6n',
    _type: 'product',
    id: 'p6',
    slug: 'camera-ezviz-c6n',
    name: 'Camera WiFi Smart Ezviz C6N Full HD',
    category: 'camera',
    description: 'Thế hệ camera thông minh theo dõi chuyển động bám sát mục tiêu xoay 360 độ góc mở rộng cực lớn. Tích hợp loa micro đàm thoại 2 chiều ấm rõ tiếng giúp bạn theo dõi nhắc nhở con nhỏ tại nhà cực đơn giản chỉ cần kết nối qua Wifi.',
    price: '590.000đ',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
    features: ['Góc quét quay đầy đủ 360 độ điều khiển qua app', 'Hồng ngoại ban đêm xa tới 10 mét nhìn rõ mặt', 'Cảnh báo chống trộm gửi tin nhắn lập tức'],
    specs: [
      { _key: 's1', key: 'Độ phân giải', value: 'Full HD 1080P' },
      { _key: 's2', key: 'Kết nối', value: 'Wifi không dây tần số 2.4Ghz' },
      { _key: 's3', key: 'Hỗ trợ thẻ nhớ', value: 'MicroSD tối đa 256GB' },
    ],
  },

  // 13. Blog Post Categories
  {
    _id: 'postCategory-dien',
    _type: 'postCategory',
    id: 'electrical',
    title: 'Điện',
    icon: 'Zap',
  },
  {
    _id: 'postCategory-nuoc',
    _type: 'postCategory',
    id: 'plumbing',
    title: 'Nước',
    icon: 'Droplet',
  },
  {
    _id: 'postCategory-camera',
    _type: 'postCategory',
    id: 'camera',
    title: 'Camera',
    icon: 'Video',
  },
  {
    _id: 'postCategory-dotim',
    _type: 'postCategory',
    id: 'detection',
    title: 'Dò Tìm',
    icon: 'Search',
  },

  // 14. Blog Posts
  {
    _id: 'post-nguyen-nhan-chap-dien-thuong-gap',
    _type: 'post',
    id: 'b1',
    slug: 'nguyen-nhan-chap-dien-thuong-gap',
    title: '5 Nguyên nhân chập điện thường gặp và cách phòng tránh hiệu quả',
    excerpt: 'Chập điện là một trong những mối nguy hiểm hàng đầu dẫn đến hỏa hoạn trong gia đình. Tìm hiểu nguyên nhân và giải pháp phòng ngừa.',
    category: 'Điện',
    date: '15/05/2026',
    author: { name: 'Kỹ sư Tuấn', role: 'Chuyên gia điện dân dụng', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam' },
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    readTime: '6 phút',
    tags: ['chập điện', 'an toàn điện', 'sửa điện'],
    content: '<h2>Tại sao chập điện lại xảy ra?</h2><p>Chập điện (ngắn mạch) xảy ra khi hai dây dẫn điện có điện thế khác nhau tiếp xúc trực tiếp với nhau mà không qua linh kiện tiêu thụ điện.</p><h3>1. Hệ thống dây dẫn quá tải</h3><p>Việc sử dụng quá nhiều thiết bị công suất lớn (máy lạnh, lò vi sóng, bếp điện) trên cùng một đường dây nhỏ sẽ làm dây nóng chảy lớp vỏ cách điện.</p><h3>2. Mối nối lỏng lẻo</h3><p>Các điểm nối dây điện sau một thời gian bị oxy hóa hoặc thợ lắp đặt không kỹ sẽ sinh nhiệt tại điểm tiếp xúc, dẫn đến nóng chảy và chập cháy.</p><h3>3. Thiết bị điện kém chất lượng</h3><p>Sử dụng ổ cắm, công tắc hoặc dây dẫn không rõ nguồn gốc, trông mỏng manh chịu nhiệt kém.</p><h3>4. Tác động của động vật gặm nhấm</h3><p>Chuột cắn phá dây ngầm vách ngăn thạch cao gây ra đoản mạch bốc khói dữ dội.</p>',
  },
  {
    _id: 'post-dau-hieu-ro-ri-nuoc-am-tuong',
    _type: 'post',
    id: 'b4',
    slug: 'dau-hieu-ro-ri-nuoc-am-tuong',
    title: '4 Dấu hiệu rò rỉ nước âm tường khiến hóa đơn tiền nước tăng vọt',
    excerpt: 'Nhà bạn không dùng nhiều nhưng hóa đơn tiền nước vẫn cao ngất ngưởng? Rất có thể ống dẫn nước PPR thạch cao âm gạch đã bị bục nứt âm ỉ.',
    category: 'Nước',
    date: '20/05/2026',
    author: { name: 'Kỹ Sư Hoàng', role: 'Chuyên gia siêu âm rò nước', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hung' },
    image: 'https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800',
    readTime: '4 phút',
    tags: ['rò rỉ nước', 'tiết kiệm nước', 'PQWT', 'siêu âm nước'],
    content: '<h2>Làm thế nào để phát hiện nứt bể ống nước ngầm?</h2><p>Hiện tượng đường nước âm bị rò rỉ ngầm dưới lòng bê tông gây lãng phí khổng lồ tài nguyên và thiệt hại tiền bạc cực kì nhiều.</p><h3>1. Đồng hồ nước tự quay mặc dù ngắt vòi</h3><p>Khóa toàn bộ thiết bị vòi sen bồn cầu chậu rửa, hãy kiểm tra đồng hồ. Nếu kim quay hoặc nhảy liên tục chứng tỏ nước đang bị thoát đi không lò rỉ dán nứt.</p><h3>2. Tường mốc ẩm mốc ố vàng vách dán gạch</h3><p>Vị trí nứt ống nước rỉ thẩm thấu từ từ qua bê tông hồ dầu, sau vài tháng gạch sẽ loang lổ sùi trắng và rêu xanh bốc mùi ẩm khó chịu.</p><h3>3. Máy bơm tăng áp lắp sát nguồn liên tục nhảy tạch tạch tạch</h3><p>Khi có điểm xì tuy nước yếu rỉ nhỏ giọt làm giảm đứt áp xuất đường ống mồi, cảm ứng máy bơm sẽ nghĩ người dùng mở nước và giật đóng ngắt rơle liên tục tạo âm thanh kì lạ ban đêm.</p>',
  },

  // 15. Pricing Cards
  {
    _id: 'pricing-item-1',
    _type: 'pricing',
    title: 'Gói dò định vị siêu âm rò rỉ nước ngầm',
    price: '500.000đ',
    unit: 'lần',
    category: 'detection',
    features: ['Sử dụng máy chuyên dụng Đức (siêu âm âm tần PQWT)', 'Đo định vị thu hẹp phạm vi nứt bể trong 1 khối gạch', 'Nếu không tìm ra đúng điểm rò rỉ: hoàn phí 100%'],
    badge: 'Đặc trưng nhất',
    orderNo: 1,
  },
  {
    _id: 'pricing-item-2',
    _type: 'pricing',
    title: 'Lắp đặt mắt Camera WIFI an ninh gia đình',
    price: '150.000đ',
    unit: 'mắt',
    category: 'camera',
    features: ['Đã bao gồm công đi dây cấp điện và nẹp nhựa thẩm mỹ', 'Cấu hình kết nối phần mềm trên 3 thiết bị di động', 'Free bảo hành hỗ trợ cấu hình mạng lỗi 6 tháng'],
    badge: '',
    orderNo: 2,
  },
  {
    _id: 'pricing-item-3',
    _type: 'pricing',
    title: 'Xử lý chập nhảy Aptomat tổng ngày đêm',
    price: '150.000đ',
    unit: 'lần',
    category: 'electrical',
    features: ['Sử dụng thiết bị ampe kìm và kiểm tra tải toàn mạch', 'Ngắt định vị các line chập cách điện bảo vệ khẩn cấp', 'Tư vấn phân chia lại nguồn CB phụ tải'],
    badge: 'Khẩn cấp 24/7',
    orderNo: 3,
  },

  // 16. FAQs (Câu hỏi thường gặp)
  {
    _id: 'faq-1',
    _type: 'faq',
    question: 'Thời gian thợ kỹ thuật có mặt siêu tốc là bao lâu?',
    answer: 'Kỹ thuật viên trực chiến của Hoàng Tuấn MPE sẽ có mặt tại nhà khách hàng trong vòng 15 đến 30 phút ngay sau khi xác nhận số hotline. Chúng tôi bố trí thợ dàn trải tại các chốt điểm chính Bảo Lộc để đảm bảo tính khẩn cấp ngày đêm.',
    category: 'Chung',
  },
  {
    _id: 'faq-2',
    _type: 'faq',
    question: 'Tôi có bị mất phí khảo sát đo đạc tận nơi ban ngày không?',
    answer: 'Hoàn toàn MIỄN PHÍ. Thợ sẽ tới tận nơi, mang công cụ kiểm tra đứt dây, tắc cống, thấm ẩm rò rỉ và đề xuất sơ đồ, báo giá cụ thể rõ ràng. Khách hàng đồng ý thợ mới được bắt tay thi công. Nếu quý khách từ chối báo giá, chúng tôi ra về vui vẻ không thu bất kì chi phí phát sinh nào!',
    category: 'Chung',
  },
  {
    _id: 'faq-3',
    _type: 'faq',
    question: 'Cam kết bảo hành sau khi sửa chữa như thế nào?',
    answer: 'Tất cả các dịch vụ thi công đi dây, lắp bồn cầu thay phao cơ dán ống nhiệt đều được đồng hành phiếu bảo hành dịch vụ từ 6 đến 12 tháng từ Hoàng Tuấn MPE. Trong kì hạn bảo hành nếu tái rò rỉ hay chập, chúng tôi xử lý miễn phí 100%.',
    category: 'Chung',
  },

  // 17. Testimonials (Đánh giá khách hàng)
  {
    _id: 'testimonial-nam',
    _type: 'testimonial',
    name: 'Anh Hoàng Nam',
    role: 'Phường Lộc Sơn, Bảo Lộc',
    review: 'Dịch vụ rât nhanh chóng, máy phát hiện rò rỉ nước PQWT của họ hoạt động rất kì diệu. Đội thợ dò chuẩn xác ống vỡ ngầm bể chứa nước lầu 2 bên dưới phòng tắm bị rò rỉ sâu, nứt vỡ đường ống và đục duy nhất 1 viên gạch của tôi để vá dán nhiệt. Cảm ơn sự tận tâm của các anh thợ!',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam',
  },
  {
    _id: 'testimonial-tuyet',
    _type: 'testimonial',
    name: 'Chị Minh Tuyết',
    role: 'Hẻm Hà Giang, Phường 1, Bảo Lộc',
    review: 'Aptomat nhảy sập liên tục lúc 11h đêm bốc mùi khét lạt tịt toàn bộ điện sinh hoạt. Tôi hoang mang lắm, gọi các chỗ khác không chạy thợ hoặc tắt máy. Rất may bên Hoàng Tuấn MPE nhận cuộc gọi và cử thợ đến sau 20 phút. Thợ sửa chuyên nghiệp xử lý điểm chập do dây thằn lằn bò khét tủ rất nhanh và thay CB an tâm sử dụng.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tuyet',
  },

  // 18. Reviews System (Phản hồi thực tế)
  {
    _id: 'review-1',
    _type: 'review',
    customerName: 'Chú Sáu Lộc Phát',
    comment: 'Lắp đặt 4 mắt camera an ninh ngoài trời rất đẹp, đi dây nẹp nhựa gọn gàng thẩm mĩ tuyệt vời.',
    score: 5,
    date: '2026-05-18',
    verifiedPurchase: true,
  },
  {
    _id: 'review-2',
    _type: 'review',
    customerName: 'Cô Lan bán quán ăn',
    comment: 'Sửa đường nước máy tăng áp chảy khét gầm nước cấp kho, thợ xử lí trong 30 phút nhanh gọn lẹ giá bình dân.',
    score: 5,
    date: '2026-05-15',
    verifiedPurchase: true,
  },

  // 19. Gallery Item
  {
    _id: 'gallery-1',
    _type: 'gallery',
    title: 'Siêu âm rò rỉ nước biệt thự hồ cá Lộc Tiến',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    category: 'detection',
    caption: 'Thợ định vị chuẩn bục ống PPR âm sâu ngầm 1.2M cát.',
  },
  {
    _id: 'gallery-2',
    _type: 'gallery',
    title: 'Lắp đặt tụ điện Aptomat tổng nhà xưởng MPE',
    image: 'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80&w=800',
    category: 'electrical',
    caption: 'Đấu nối khoa học tải mác chuẩn 2P bảo hộ cao.',
  },

  // 20. Menu Items
  {
    _id: 'menu-trangchu',
    _type: 'menu',
    title: 'Trang chủ',
    path: '/',
    icon: 'Home',
    orderNo: 1,
  },
  {
    _id: 'menu-dichvu',
    _type: 'menu',
    title: 'Dịch vụ',
    path: '/dich-vu',
    icon: 'Wrench',
    orderNo: 2,
    subItems: [
      { _key: 's1', title: 'Sửa điện', path: '/dich-vu/sua-dien' },
      { _key: 's2', title: 'Sửa nước', path: '/dich-vu/sua-nuoc' },
      { _key: 's4', title: 'Lắp Camera', path: '/dich-vu/lap-camera' },
      { _key: 's5', title: 'Rò rỉ nước', path: '/dich-vu/do-ro-ri-nuoc' },
    ],
  },
  {
    _id: 'menu-sanpham',
    _type: 'menu',
    title: 'Linh kiện MPE',
    path: '/san-pham',
    icon: 'Tag',
    orderNo: 3,
  },
  {
    _id: 'menu-banggia',
    _type: 'menu',
    title: 'Bảng giá',
    path: '/bang-gia',
    icon: 'DollarSign',
    orderNo: 4,
  },
  {
    _id: 'menu-tintuc',
    _type: 'menu',
    title: 'Tin tức & mẹo',
    path: '/blog',
    icon: 'BookOpen',
    orderNo: 5,
  },
  {
    _id: 'menu-lienhe',
    _type: 'menu',
    title: 'Liên hệ',
    path: '/lien-he',
    icon: 'Phone',
    orderNo: 6,
  },

  // 21. SEO configurations
  {
    _id: 'seo-home',
    _type: 'seo',
    pagePath: '/',
    metaTitle: 'Hoàng Tuấn MPE | Thợ Sửa Điện Nước & Siêu Âm Rò Nước 24/7 Bảo Lộc',
    metaDescription: 'Dịch vụ sửa chữa điện nước gia đình khẩn cấp, cảm ứng siêu âm định vị rò nước ngầm chuẩn xác không tàn phá đục phá nền nhà, lắp mắt Camera tại Bảo Lộc Lâm Đồng 24H.',
    keywords: ['thợ điện bảo lộc', 'sửa điện nước bảo lộc', 'dò rò rỉ nước bảo lộc', 'hoàng tuấn mpe bảo lộc', 'camera bảo lộc'],
  },
  {
    _id: 'seo-dichvu',
    _type: 'seo',
    pagePath: '/dich-vu',
    metaTitle: 'Các Dịch Vụ Sửa Chữa Cơ Điện | Hoàng Tuấn MPE',
    metaDescription: 'Chi tiết danh bạ dịch vụ: sửa chập điện, hàn ống PPR, thay phao bồn, lắp quạt hút, siêu âm vỡ ngầm đường ống nước ngày và đêm của Hoàng Tuấn MPE.',
    keywords: ['sửa chập điện', 'lắp quạt hút', 'hàn ống ppr bảo lộc', 'sửa bồn cầu bảo lộc'],
  },
];

async function runSeed() {
  console.log(`🔌 Initializing database writing transaction for ${seedDocuments.length} documents...`);
  let successCount = 0;
  let failCount = 0;

  for (const doc of seedDocuments) {
    try {
      await client.createOrReplace(doc);
      console.log(`✅ Seeded: ${doc._type} (${doc._id})`);
      successCount++;
    } catch (err: any) {
      console.error(`❌ Failed to seed document ${doc._id} [${doc._type}]:`, err.message || err);
      failCount++;
    }
  }

  console.log('\n--------------------------------------------------');
  console.log(` Seeding Completion Report:`);
  console.log(`- Total Checked/Overwritten: ${successCount} successful`);
  console.log(`- Failures: ${failCount} errors`);
  console.log('--------------------------------------------------');
  if (failCount === 0) {
    console.log('🎉 Excellent! Your Sanity CMS Dataset has been completely initialized with real website copy.');
  } else {
    console.log('⚠️ Done with some warnings. Please read the log outputs above.');
  }
}

runSeed();
