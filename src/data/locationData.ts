export interface LocationSpecificDetails {
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  address: string;
  phone: string;
  email: string;
  tiktokUrl: string;
  workingHours: string;
  mapUrl: string;
}

export const locationData: Record<'bao-loc' | 'ho-chi-minh', LocationSpecificDetails> = {
  'bao-loc': {
    seo: {
      title: "Dịch vụ Điện Nước & Camera tại Bảo Lộc – Hoàng Tuấn MPE",
      description: "Thợ cứu hộ sửa chữa hệ thống điện chập cháy, ống nước vỡ ngầm, lắp đặt camera an ninh uy tín hàng đầu tại Bảo Lộc Lâm Đồng. Phục vụ 24/7.",
      canonical: "https://hoangtuanmpe.com/bao-loc"
    },
    hero: {
      title: "Dịch Vụ Sửa Điện Nước, Lắp Camera Bảo Lộc",
      subtitle: "Khắc phục triệt để sự cố điện nước khẩn cấp tại Lâm Đồng. Đội ngũ thợ trực chiến 24/7 có mặt sau 30 phút!"
    },
    address: "279 B'Lao sire, Phường 3, Bảo Lộc, Lâm Đồng",
    phone: "0389011315",
    email: "hoangtuanmpe@gmail.com",
    tiktokUrl: "https://www.tiktok.com/@diennuoccamerabaoloc",
    workingHours: "Thứ 2 - Chủ Nhật (Hotline cứu hộ trực ngày đêm 24/7)",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15585.122177517173!2d107.80164609999999!3d11.549646049999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173e91ff02aefcf%3A0xc3fa59902cf67d26!2zSOG6u20gNzQgVHLhuqduIFBow6osIEzhu5ljIFBow6F0LCBC4bqjbyBM4buZYywgTMOibSDEkOG7k25nLCBWaWV0bmFt!5e0!3m2!1svi!2svn!4v1652171452171"
  },
  'ho-chi-minh': {
    seo: {
      title: "Dịch vụ Điện Nước & Dò Tìm Rò Rỉ Hồ Chí Minh – Hoàng Tuấn MPE",
      description: "Sửa chữa sự cố điện nước sụt lún, vỡ gầm, dò tìm rò rỉ nước ngầm tỉ mỉ bằng máy PQWT tại TPHCM. Bảo hành lâu dài, an toàn tuyệt đối.",
      canonical: "https://hoangtuanmpe.com/ho-chi-minh"
    },
    hero: {
      title: "Dịch Vụ Sửa Điện Nước, Siêu Âm Dò Rò Rỉ TPHCM",
      subtitle: "Công nghệ rà tìm rò rỉ nước ngầm chuyên nghiệp tại Hồ Chí Minh, xử lý tận gốc tình trạng mất nước và hóa đơn vọt triệu."
    },
    address: "528/17 Tô Ngọc Vân, Tam Bình, Thủ Đức, TP. Hồ Chí Minh",
    phone: "0389011315",
    email: "hoangtuanmpe@gmail.com",
    tiktokUrl: "https://www.tiktok.com/@diennuoccamerabaoloc",
    workingHours: "Thứ 2 - Chủ Nhật (Hotline cứu hộ trực ngày đêm 24/7)",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7758252261!2d106.75705667!3d10.8284564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527ba7ee46d75%3A0x1da6c3e3fc7e6ba!2zV2FyZCAyLCBUaOG7pyDEkOG7qWMsIEhvIENoaSBNaW5oIENpdHksIFZpZXRuYW0!5e0!3m2!1svi!2svn!4v1652171452172"
  }
};
