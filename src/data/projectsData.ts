export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  category: string;
  location: string;
  completionDate: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  gallery: string[];
  services: string[];
  challenges: string;
  solutions: string;
  outcome: string;
  beforeAfter: {
    beforeImage: string;
    afterImage: string;
    beforeDesc: string;
    afterDesc: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
  relatedProjects: string[];
  packages?: {
    name: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    badge?: string;
  }[];
  specifications?: {
    label: string;
    value: string;
  }[];
  steps?: {
    title: string;
    description: string;
  }[];
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    slug: "sua-dien-biet-thu-dalat",
    title: "Thi công hệ thống điện thông minh Biệt thự Đà Lạt",
    shortDescription: "Dự án cải tạo toàn bộ hệ thống điện cũ sang hệ thống Smarthome MPE hiện đại cho biệt thự cổ tại Đà Lạt. Xử lý hơn 500m dây dẫn âm tường chằng chịt, tích hợp tủ điện thông minh điều khiển qua điện thoại.",
    fullDescription: "Dự án biệt thự tại Đà Lạt có kiến trúc cổ điển nhưng hệ thống cơ điện cũ đã xuống cấp nghiêm trọng, thường xuyên xảy ra hiện tượng quá tải và chập mạch điện nhảy aptomat liên tục. Hoàng Tuấn MPE được chủ đầu tư tin tưởng giao phó toàn bộ quá trình khảo sát, thiết kế và thi công nâng cấp cơ sở vật chất năng lượng. Chúng tôi tiến hành luồn lại toàn bộ hơn 500 mét dây dẫn lõi đồng cao cấp MPE luồn trong ống nhựa chống cháy chịu lực âm tường. Cùng với đó là lắp đặt tủ điều khiển tổng thế hệ mới, tích hợp thiết bị chuyển mạch thông minh điều khiển từ xa qua smartphone và hệ thống chiếu sáng tiết kiệm thông minh cảm biến chuyển động.",
    images: [
      "/images/cua-cuon-thong-minh.png",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Điện thông minh",
    location: "Đà Lạt, Lâm Đồng",
    completionDate: "20/05/2026",
    seo: {
      metaTitle: "Cải Tạo Điện Thông Minh Biệt Thự Đà Lạt | Hoàng Tuấn MPE",
      metaDescription: "Dự án cải tạo toàn bộ hệ thống điện sang Smarthome MPE hiện đại cho biệt thự Đà Lạt. Thiết kế tủ điều khiển, hệ thống LED cảm biến an toàn.",
      keywords: ["sửa điện biệt thự đà lạt", "điện thông minh mpe lâm đồng", "lắp điện thông minh đà lạt", "smarthome mpe"]
    },
    gallery: [
      "/images/cua-cuon-thong-minh.png",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542013936-6533e14cb263?auto=format&fit=crop&q=80&w=800"
    ],
    services: [
      "Khảo sát toàn bộ sơ đồ phân tải hệ thống cơ điện cũ",
      "Rút và kéo lại dây nguồn chịu tải lõi đồng MPE âm tường",
      "Thiết kế lắp đặt tủ điện thông minh tích hợp aptomat chống rò RCBO",
      "Thi công lắp đặt thiết bị nhà thông minh điều khiển giọng nói và smartphone",
      "Lắp đặt hệ thống đèn công nghệ LED cảm ứng hồng ngoại ngoại vi"
    ],
    challenges: "Căn biệt thự cũ xây dựng từ thập niên trước có kết cấu tường gạch đặc dày lên đến 30cm, không sử dụng ống luồn dây cứng dẫn đến việc rút dây cũ ra cực kỳ khó khăn. Đồng thời, chủ nhà yêu cầu giữ nguyên vẹn hoa văn thạch cao trần nhà, tuyệt đối không được đục khoét bừa bãi gây nứt vỡ kết cấu trang trí thẩm mỹ.",
    solutions: "Kỹ thuật trưởng của Hoàng Tuấn MPE đã áp dụng dụng cụ mồi luồn dây cáp chuyên dụng kết hợp chất bôi trơn kỹ thuật để đi dây luồn mềm dẻo. Chúng tôi tận dụng tối đa các đường giáp lai trang trí và góc khuất để tạo các hộp chia nắp âm kín đáo, không phải khoan trần hay đập tường diện rộng.",
    outcome: "Hệ thống điện mới vận hành hoàn hảo, an toàn tuyệt đối với rơle chống giật tự ngắt siêu nhạy. Gia chủ dễ dàng điều khiển tắt mở hẹn giờ toàn bộ ngôi nhà khi ở bất kỳ đâu thông qua điện thoại. Điện năng tiêu thụ hàng tháng của biệt thự giảm 30% rõ rệt nhờ tối ưu hóa chiếu sáng thông minh.",
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800",
      afterImage: "/images/cua-cuon-thong-minh.png",
      beforeDesc: "Hệ thống tủ điện cũ kĩ, dây nhợ chằng chịt mất mỹ quan và có nguy cơ chập cháy cao do quá tải.",
      afterDesc: "Hệ thống tủ điện thông minh mới được bố trí khoa học, đi dây ngăn nắp vào tủ âm và vỏ bảo vệ chống nước sang trọng."
    },
    faq: [
      {
        question: "Thi công lắp đặt điện thông minh biệt thự mất bao lâu?",
        answer: "Với quy trình làm việc khoa học, dự án biệt thự Đà Lạt được chúng tôi hoàn thiện toàn bộ từ khâu bóc dỡ đến nghiệm thu bàn giao lắp đặt SmartHome trong vòng đúng 7 ngày làm việc liên tục."
      },
      {
        question: "Hệ thống smarthome này có dễ sử dụng với người lớn tuổi không?",
        answer: "Rất dễ sử dụng. Ngoài việc thao tác trên điện thoại thông minh, chúng tôi lắp đặt các phím kịch bản gắn tường cơ học quen thuộc (ví dụ bấm phím Đi Ngủ sẽ tắt hết đèn sảnh, bật công tắc bảo vệ vệ tinh) và hỗ trợ điều khiển rảnh tay bằng giọng nói tiếng Việt."
      }
    ],
    relatedProjects: ["lap-dat-camera-xuong-may", "bao-tri-dien-nuoc-khach-san"]
  },
  {
    id: "2",
    slug: "do-tim-ro-ri-nhatrang",
    title: "Dò tìm rò rỉ nước ngầm chung cư căn hộ cao cấp",
    shortDescription: "Sử dụng công nghệ siêu âm tiên tiến tầm soát rò rỉ để định vị vị trí vỡ đường ống rò rỉ âm sàn căn hộ cao cấp. Khắc phục dứt điểm hóa đơn tiền nước tăng đột biến.",
    fullDescription: "Căn hộ chung cư cao cấp gặp tình trạng hóa đơn tiền nước tăng gấp 5 lần bình thường mặc dù lượng sử dụng thực tế không đổi. Đồng thời, dọc mảng tường bếp và phòng ngủ bắt đầu xuất hiện vệt nứt ẩm rêu xanh và mùi hôi ẩm mốc. Nhiều đơn vị kiểm tra thủ công chưa định vị được mà đề xuất phải đục phá nền nhà tắm tìm kiếm. Đội ngũ Hoàng Tuấn MPE nhận lệnh khẩn cấp, đem theo thiết bị máy dò siêu âm khuếch đại dải tần hiện đại nhất đến hiện trường để tiến hành rà tìm đường nước âm một cách an toàn và khoa học.",
    images: [
      "/images/sieuam.png",
      "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Siêu âm dò tìm",
    location: "Quận 1, TP.HCM",
    completionDate: "12/04/2026",
    seo: {
      metaTitle: "Dò Tìm Rò Rỉ Nước Ngầm Căn Hộ Cao Cấp | Hoàng Tuấn MPE",
      metaDescription: "Ứng dụng máy dò sóng âm nhập khẩu tìm kiếm thành công điểm nứt vỡ ống nước chôn sâu dưới lớp sàn căn hộ cao cấp. Sửa dứt điểm không phá hỏng cấu trúc.",
      keywords: ["dò tìm rò rỉ nước hcm", "siêu âm đường ống nước quận 1", "tìm điểm vỡ ống nước mpe", "máy siêu âm rò rỉ nước"]
    },
    gallery: [
      "/images/sieuam.png",
      "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800"
    ],
    services: [
      "Đo lưu lượng nước tĩnh rà soát chênh lệch hóa đơn",
      "Kiểm tra áp suất dải đường ống chôn âm bằng bơm thử áp",
      "Sử dụng thiết bị siêu âm khuếch đại âm thanh nứt ống ngầm",
      "Khoanh vùng chính xác lỗ rò rỉ trên bản vẽ căn hộ",
      "Đục lỗ nhỏ cục bộ thay lắp đường ống PPR hàn nhiệt mới"
    ],
    challenges: "Đường ống PPR dẫn nước lạnh được lắp chôn sâu dưới lớp gạch đá hoa cương dày đắt tiền và lớp chống thấm sàn nhiều tầng. Mặt khác, kết cấu căn hộ khép kín tiếng ồn dội từ các căn hộ bên cạnh dễ gây nhiễu sóng tín hiệu phản hồi vào thiết bị dò tìm siêu âm thông thường.",
    solutions: "Kỹ sư dạn dày sương gió của chúng tôi thực hiện cô lập cách ly hoàn toàn hệ thống van cấp nước cục bộ tầng. Đồng thời chuyển mạch sử dụng dải tần số đặc hiệu của máy dò chặn tạp âm hiện đại, nghe xuyên sàn đá granite dày và định vị chính xác vị trí vỡ chôn sâu.",
    outcome: "Xác định chuẩn xác duy nhất 1 điểm rò vỡ tại khớp nới chữ T dưới lòng bếp. Chúng tôi chỉ cần tháo dỡ vừa đủ 1 viên gạch hoa lớn, vá hàn nhiệt ống chịu lực PPR mới trong vòng 20 phút. Hóa đơn nước của căn hộ phục hồi bình thường, chấm dứt triệt để tình trạng thấm tường ẩm mốc lo ngại.",
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800",
      beforeDesc: "Gạch ốp bếp ngập nước rỉ ra liên tục gây ố vàng và ẩm mốc hư hại tủ bếp đắt giá.",
      afterDesc: "Khắc phục xong triệt để, đóng mạch trả lại nguyên trạng nền gạch sáng bóng như mới không hề tì vết."
    },
    faq: [
      {
        question: "Dò siêu âm rò rỉ có phải đập phá nhà nhiều không?",
        answer: "Không. Phương pháp siêu âm của Hoàng Tuấn MPE đạt độ chính xác đến 99%. Chúng tôi chỉ đục đúng 1 ô gạch tương ứng với vị trí sự cố, hoàn toàn không đập bừa bãi nên giảm thiểu tối đa hư hỏng sàn nhà."
      },
      {
        question: "Giá dịch vụ siêu âm dò rò rỉ nước ngầm là bao nhiêu?",
        answer: "Phí dịch vụ dò tìm tùy thuộc vào độ phức tạp của quy mô ngôi nhà (nhà phố, biệt thự, xưởng hay nhà máy). Hoàng Tuấn MPE luôn cam kết: KHÔNG TÌM RA VỊ TRÍ RÒ RỈ - KHÔNG THU PHÍ."
      }
    ],
    relatedProjects: ["sua-dien-biet-thu-dalat", "bao-tri-dien-nuoc-khach-san"]
  },
  {
    id: "3",
    slug: "lap-dat-camera-xuong-may",
    title: "Lắp đặt hệ thống Camera giám sát 4K Xưởng may công nghiệp",
    shortDescription: "Triển khai lắp đặt đồng bộ hệ thống 32 Camera IP độ phân giải siêu nét 4K tích hợp AI nhận diện an ninh vòng ngoài tại xưởng may công nghiệp.",
    fullDescription: "Xưởng sản xuất hàng dệt may quy mô hơn 2000 m2 cần nâng cấp hệ thống camera hành trình dây dài từ xưa để nâng cao năng lực kiểm soát chất lượng, quản lý công nhân và cải thiện bảo mật chống thất thoát nguyên vật liệu. Hệ thống camera cũ sử dụng cáp đồng trục mờ nhòe thường xuyên mất tín hiệu vật lý. Hoàng Tuấn MPE đã tiến hành khảo sát góc quan sát tối ưu, xây dựng giải pháp mạng cáp quang nội bộ Gigabit kết hợp camera IP 4K chuyên dụng phục vụ vận hành quản trị.",
    images: [
      "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Camera & An ninh",
    location: "Bảo Lộc, Lâm Đồng",
    completionDate: "05/03/2026",
    seo: {
      metaTitle: "Lắp Hệ Thống Camera Giám Sát 4K Xưởng May Bảo Lộc | Hoàng Tuấn MPE",
      metaDescription: "Thi công trọn gói hệ thống 32 mắt camera IP thông minh cho xưởng may quy mô lớn. Độ phân giải 4K sắc nét tích hợp cảnh báo ban đêm.",
      keywords: ["lắp camera xưởng may lâm đồng", "camera bảo lộc uy tín", "thi công camera giám sát xưởng bảo lộc", "hệ thống camera ip 4k"]
    },
    gallery: [
      "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
    ],
    services: [
      "Khảo sát địa hình lập bản vẽ bố trí 32 mắt camera không góc chết",
      "Đi ống luồn bảo vệ cứng cách điện cách âm PVC chịu mài mòn",
      "Thi công đi cáp mạng CAT6 FTP bọc giáp chống nhiễu máy may công nghiệp",
      "Lắp đặt Camera IP Hikvision UltraHD 4K thông minh quay quét góc rộng",
      "Cài đặt hệ điều hành lưu trữ đám mây, cấu hình phân quyền xem từ xa"
    ],
    challenges: "Môi trường xưởng may có hàng trăm máy may công suất lớn xả tải liên tục, phát sinh lượng lớn hạt bụi bông vải li ti bám dày đặc và sóng hài từ trường cực rộng nguy cơ gây nhiễu và đơ mờ ống kính camera, suy giảm chất lượng truyền tải dây mạng lan thường.",
    solutions: "Hoàng Tuấn MPE đã chọn loại cáp mạng CAT6 bọc bạc đồng chuyên dụng chống nhiễu sóng cao cấp. Đồng thời sử dụng vỏ bảo vệ chuẩn IP67 kín khít kháng bụi hạt vải tuyệt đối và điều chỉnh góc lắp đặt tránh luồng gió lốc nóng thổi ra từ dàn máy cắt kim kim loại.",
    outcome: "Hệ thống đi vào hoạt động trơn tru siêu nét, hiển thị rõ ràng chuyển động nhỏ của từng kén sợi thêu. Ban lãnh đạo dễ dàng giám sát an toàn lao động mọi lúc mọi nơi ngay trên máy tính/iPad của mình với đường truyền ổn định không độ trễ.",
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
      beforeDesc: "Dây nguồn camera cũ luồn lách nguy hiểm chung cột điện và treo lơ lửng mất an toàn.",
      afterDesc: "Hệ thống dây mới được bọc kỹ rãnh tủ bảo ôn ghim kẹp sườn thép xưởng bền bỉ thẩm mỹ tuyệt đối."
    },
    faq: [
      {
        question: "Hệ thống camera an ninh có thể lưu dữ liệu trong bao lâu?",
        answer: "Xưởng được trang bị ô cứng NAS chuyên dụng 10TB ghép RAID an toàn, đảm bảo lưu trữ chất lượng UltraHD nguyên vẹn trong vòng 30 ngày liên tục trước khi tự động ghi đè kế tiếp."
      },
      {
        question: "Thiết bị có hỗ trợ cảnh báo xâm nhập ban đêm tự động không?",
        answer: "Có. Chúng tôi đã thiết lập hàng rào bảo vệ ảo AI vòng ngoài xưởng. Khi có người lạ vượt rào vào ban đêm sau giờ làm việc, loa hỏa tiễn trên camera lập tức hú và gửi tin báo động khẩn cấp trực tiếp tới số điện thoại giám đốc."
      }
    ],
    relatedProjects: ["sua-dien-biet-thu-dalat", "bao-tri-dien-nuoc-khach-san"]
  },
  {
    id: "4",
    slug: "bao-tri-dien-nuoc-khach-san",
    title: "Bảo trì định kỳ hệ thống điện nước Khách sạn 4 sao",
    shortDescription: "Kiểm tra kỹ thuật định kỳ nâng mức an toàn nạp tải điện sảnh chiếu sáng, máy bơm công suất lớn cấp thoát nước cho khách sạn 4 sao.",
    fullDescription: "Để chuẩn bị chu đáo phục vụ mùa cao điểm du lịch nghỉ dưỡng, khách sạn cần bảo dưỡng rà soát nâng tuổi thọ cho hệ thống nén lạnh trung tâm, đường ống bơm tuần hoàn và dải tủ biến áp điện chính của khách sạn nhằm loại trừ tuyệt đối sự cố mất điện hay khóa van rò rỉ nước sảnh trung tâm gây ảnh hưởng xấu tới chất lượng lưu trú.",
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Bảo trì trọn gói",
    location: "Quận 3, TP.HCM",
    completionDate: "15/02/2026",
    seo: {
      metaTitle: "Bảo Trì Định Kỳ Điện Nước Khách Sạn Quận 3 | Hoàng Tuấn MPE",
      metaDescription: "Công tác bảo dưỡng hệ thống máy bơm áp lực, tủ phân phối tải điện và đèn nội thất chiếu sáng cho khách sạn định kỳ. Cam kết an toàn bền bỉ.",
      keywords: ["bảo trì điện nước khách sạn hcm", "thợ cơ điện quận 3 sửa chữa", "khảo sát điện nước khách sạn", "máy bơm áp lực khách sạn"]
    },
    gallery: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
    ],
    services: [
      "Sử dụng camera nhiệt tầm soát rò rỉ bức xạ nhiệt tủ điện chính",
      "Xiết lại toàn bộ cọc tiếp xúc của hộp nối tránh hiện tượng đánh lửa điện",
      "Kiểm tra định kì bảo dưỡng trục máy bơm tăng áp phòng kỹ thuật",
      "Thay thế hệ thống phao cơ bể mái tự động đóng ngắt cấp nước lầu cao",
      "Vệ sinh lõi vòi phun lọc cặn đường nước tổng tòa nhà"
    ],
    challenges: "Khách sạn hoạt động xuyên suốt 24/24 với tỉ lệ kín phòng cao. Việc bảo dưỡng tủ điện tổng bắt buộc phải cắt mạch điện tạm thời nhưng không được làm gián đoạn sinh hoạt và sự dễ chịu của khách đang sử dụng phòng.",
    solutions: "Hoàng Tuấn MPE đã điều động đội ngũ thợ lành nghề tiến hành công tác vào khung giờ thấp điểm (từ 2h00 đến 4h00 sáng). Điện được đấu nối bypass luân chuyển từng phân vùng tủ riêng, thời gian mất điện cục bộ tại sảnh sưởi nước chỉ gói gọn tối thiểu dưới 3 phút.",
    outcome: "Toàn bộ hệ thống kỹ thuật vận hành êm ái, dải nhiệt điện của các át ổn định hoàn toàn không còn điểm phát nóng quá nhiệt phát hiện bởi máy quét hồng ngoại chuyên nghiệp. Ban quản lý yên tâm đón hàng ngàn lượt khách cao điểm.",
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
      beforeDesc: "Atomat biến áp sần sùi bám khói tản nhiệt kém dẫn đến hao hụt điện áp vô ích.",
      afterDesc: "Hệ tủ điện bừng sáng ngăn nắp, dán nhãn phân vùng an toàn và được bổ sung thêm quạt tản nhiệt hút khí."
    },
    faq: [
      {
        question: "Khi bảo dưỡng có cần thông báo trước cho cư dân khách sạn?",
        answer: "Có. Chúng tôi phối hợp với ban quản lý thông báo trước qua bảng điện tử dán sảnh ít nhất 24 giờ. Thời điểm thực hiện đêm muộn nên hầu như khách nghỉ dưỡng hoàn toàn không nhận thấy sự thay đổi nhỏ."
      },
      {
        question: "Dịch vụ bảo trì khách sạn có xuất hóa đơn giá trị gia tăng (VAT) không?",
        answer: "Có. Hoàng Tuấn MPE cung cấp đầy đủ hóa đơn tài chính VAT hợp lệ, biên bảm nghiệm thu đo đạc kỹ thuật công trình chi tiết và phiếu cam kết bảo hành dịch vụ dài hạn định kì."
      }
    ],
    relatedProjects: ["sua-dien-biet-thu-dalat", "do-tim-ro-ri-nhatrang"]
  },
  {
    id: "5",
    slug: "lap-dat-camera-vuon-ray",
    title: "Lắp đặt Camera an ninh thông minh giám sát vườn sầu riêng & rẫy cà phê",
    shortDescription: "Triển khai hệ thống camera Wifi năng lượng mặt trời xoay 360 độ góc rộng, tích hợp AI báo động hồng ngoại chống trộm đêm và phát hiện xâm nhập ngoài vườn xa dốc đồi.",
    fullDescription: "Gia chủ sở hữu vườn sầu riêng và rẫy cà phê sườn đồi tại Bảo Lộc, Lâm Đồng thường xuyên đối mặt với lo ngại mất trộm sầu riêng chín rộ và dụng cụ lao động giá trị cao khi vào vụ thu hoạch. Địa hình đồi dốc dốc đá gồ ghề rộng lớn tới hơn 1,5 hecta, không có nguồn điện lưới kéo trực tiếp ra vườn xa và sóng Wifi thông thường không thể phủ tới ranh giới bờ ao bãi quả. Đội ngũ Hoàng Tuấn MPE đã khảo sát và thiết kế gói giải pháp sử dụng camera IP siêu nét, camera dùng sim 4G kết hợp pin năng lượng mặt trời tự lập hoàn hảo 24/24.",
    images: [
      "/images/imou-ngoai-troi.jpg",
      "/images/camera-.png"
    ],
    category: "Camera & An ninh",
    location: "Đại Lào, Bảo Lộc, Lâm Đồng",
    completionDate: "20/05/2026",
    seo: {
      metaTitle: "Lắp Đặt Camera Dự Án Vườn Rẫy Sầu Riêng Bảo Lộc | Hoàng Tuấn MPE",
      metaDescription: "Thi công giải pháp camera an ninh rẫy sầu riêng dùng năng lượng mặt trời phối hợp camera sim 4G cao cấp không cần kéo điện lưới của Hoàng Tuấn MPE.",
      keywords: ["camera vườn sầu riêng bảo lộc", "camera rẫy năng lượng mặt trời", "lắp camera sim 4g lâm đồng", "camera an ninh vườn bảo lộc"]
    },
    gallery: [
      "/images/imou-ngoai-troi.jpg",
      "/images/camera-.png"
    ],
    services: [
      "Khảo sát địa thế sườn đồi lắp đặt camera góc phủ rộng nhất",
      "Lắp đặt Camera IMOU ngoài trời xoay 360 độ chống nước tuyệt đối IP67",
      "Tích hợp hệ thống Tấm pin Năng lượng mặt trời lưu trữ tự cấp nguồn điện",
      "Cấu hình và lắp đặt Router 4G công suất phát sóng cực rộng",
      "Cài đặt ranh giới bảo vệ ảo qua AI thông minh cảnh báo trực tiếp về điện thoại"
    ],
    challenges: "Vườn rẫy có diện tích rộng 2ha đồi dốc, sương mù dày đặc và mưa lớn suốt mùa mưa Bảo Lộc gây ẩm mốc mạch sạc pin năng lượng mặt trời. Thêm vào đó, việc thiếu điện lưới buộc hệ thống phải tự tối ưu điện cực kỳ tốt để chạy ổn định cả trong những ngày mưa dầm âm u kéo dài.",
    solutions: "Chúng tôi chọn dòng camera IMOU Cruiser tích hợp cảm biến thế hệ mới tiết kiệm điện năng tối đa, kết hợp tấm pin sạc Poly cao cấp sạc nhanh ngay cả khi trời âm u sương mù. Đầu nối dây cấp nguồn bọc kỹ bằng hộp kỹ thuật chống ẩm cao cấp đạt chuẩn IP67 ngoài trời.",
    outcome: "Hệ thống hoạt động mượt mà, ghi hình 24/7 siêu nét không gián đoạn. Gia chủ có thể ngồi tại nhà xem toàn cảnh vườn sầu riêng, kịp thời ngăn chặn 2 vụ kẻ gian thâm nhập ranh rẫy ban đêm nhờ tiếng còi hú báo động cực lớn từ camera.",
    beforeAfter: {
      beforeImage: "/images/camera-.png",
      afterImage: "/images/imou-ngoai-troi.jpg",
      beforeDesc: "Vườn rẫy rộng lớn mênh mông không có giải pháp giám sát an ninh dễ thất thoát sầu riêng trái mùa.",
      afterDesc: "Hệ thống camera trụ độc lập dùng năng lượng mặt trời rực rỡ, ghi hình an ninh 360 độ sắc nét."
    },
    faq: [
      {
        question: "Trời mưa bão liên tiếp 3-4 ngày không có nắng thì camera vườn rẫy có hoạt động không?",
        answer: "Có. Bộ pin lưu trữ Lithium chuyên dụng của hệ thống camera năng lượng mặt trời do Hoàng Tuấn MPE thiết kế được tối ưu hóa dung lượng lớn, cho phép nuôi hệ thống vận hành liên tục 5 ngày đêm ngay cả trong điều kiện trời âm u sương mù hoàn toàn không có ánh nắng trực tiếp."
      },
      {
        question: "Chi phí duy trì trạm phát sóng sim 4G gắn trên camera ngoài vườn sầu riêng là bao nhiêu?",
        answer: "Chúng tôi lắp đặt sim Data chuyên dụng với gói phát cước tối ưu khoảng 100.000đ/tháng đến 120.000đ/tháng tốc độ cao không giới hạn băng thông, hoàn toàn đáp ứng nhu cầu xem video giám sát trực tuyến liên tục mượt mờ."
      }
    ],
    relatedProjects: ["lap-dat-camera-xuong-may", "sua-dien-biet-thu-dalat"],
    packages: [
      {
        name: "Gói Phổ Thông - IMOU SIM 4G 4MP",
         price: "2.850.000₫",
         features: [
           "Camera IMOU 360 độ ngoài trời 4MP chống nước dột IP67",
           "Thẻ nhớ chính hãng SanDisk 64GB lưu trữ 7-10 ngày liên tục",
           "Tặng Sim Data 4G Viettel/Mobi miễn phí tháng đầu tiên",
           "Hỗ trợ còi hú rượt đuổi trộm và đèn Spotlight có màu ban đêm",
           "Miễn phí toàn bộ công kéo dây, cấu hình app trên điện thoại",
           "Bảo hành trọn gói 12 tháng tại nhà vườn"
         ]
      },
      {
        name: "Gói Năng Lượng Mặt Trời Toàn Phần",
        price: "5.600.000₫",
        isPopular: true,
        badge: "Khuyên Dùng Cho Vườn Rẫy",
        features: [
          "Camera Pin Sạc Lithium dung lượng lớn xoay 360 độ",
          "Tấm pin năng lượng mặt trời Poly Silicon 15W sạc nhanh",
          "Không cần kéo dây nguồn điện lưới - Độc lập 100%",
          "Khe cắm sim 4G tích hợp thẳng trong phần thân camera",
          "Nháy đèn chớp và hú còi cảnh báo trộm thông minh AI",
          "Thẻ nhớ chính hãng 128GB lưu trữ 14-20 ngày",
          "Bảo hành hỏa tốc tận vườn rẫy trong vòng 24 tháng"
        ]
      },
      {
        name: "Hệ Thống Đa Mắt Cáp Quang Liên Rẫy",
        price: "Xem Khảo Sát",
        features: [
          "Toàn bộ camera IP Hikvision độ phân giải 4K UltraHD",
          "Kéo mạng cáp quang ngoài trời bọc luồn thép cực bền",
          "Đầu ghi hình lưu trữ dữ liệu tập trung từ 30 ngày",
          "Tích hợp hệ thống tủ an toàn chống sét lan truyền sườn đồi",
          "Vẽ hàng rào ảo đa tuyến báo động thời gian thực",
          "Bảo trì, vệ sinh định kỳ miễn phí định kỳ 6 tháng"
        ]
      }
    ],
    specifications: [
      { label: "Thương hiệu sản phẩm", value: "IMOU / Ezviz / Hikvision chính ngạch" },
      { label: "Độ phân giải", value: "4.0 Megapixel Super HD tới 4K Ultra HD siêu nét" },
      { label: "Chuẩn chống nước bão", value: "IP66 / IP67 phơi sương mưa dại nắng Bảo Lộc tốt" },
      { label: "Dung lượng thẻ nhớ dữ liệu", value: "64GB - 256GB chuyên dụng ghi đè liên tục" },
      { label: "Nguồn cấp hoạt động", value: "Tấm pin năng lượng mặt trời Poly sạc nhanh + Pin sạc Lithium" },
      { label: "Góc quét tầm nhìn", value: "Xoay ngang 355 độ, xoay dọc 90 độ điều khiển 360 độ trên app" },
      { label: "Tầm nhìn đêm", value: "Hồng ngoại 30 mét + Có Màu ban đêm nhờ Spotlight" },
      { label: "Tính năng AI thông minh", value: "Phát hiện người thông báo nhanh, khoanh vùng cấm hú còi" }
    ],
    steps: [
      {
        title: "Khảo sát và Đo sóng Sim 4G thực địa",
        description: "Kỹ thuật viên di chuyển trực tiếp tới vườn rẫy đo đạc cường độ thu sóng của sim Viettel, Vinaphone hay Mobifone ngay tại góc lắp đặt để lựa chọn nhà mạng ổn định nhất, đồng thời xác định ranh giới không điểm mù."
      },
      {
        title: "Dựng trụ thép gia cố chống chịu gió bão",
        description: "Thi công chôn đế trụ thép chống rỉ cao hơn 3.2m đổ bê tông kiên cố sườn đồi, tạo độ vững chắc không rung lắc vỡ hình ảnh camera khi chịu mưa bão đồi dốc giật mạnh."
      },
      {
        title: "Gá đặt tấm pin sạc Năng Lượng Mặt Trời",
        description: "Căn chỉnh hướng đón nắng hướng Nam chếch Tây để thu trọn năng lượng ánh nắng cả ngày, đi dây bọc ống ruột gà PVC chịu nhiệt chống chuột mọc dột ẩm tuyệt đối vào bo mạch sạc sâm panh."
      },
      {
        title: "Khoanh vùng ranh giới ảo cấm đột nhập AI",
        description: "Cài đặt ứng dụng trên toàn bộ các máy điện thoại của gia đình, cấu hình vẽ hàng rào ảo AI bao phủ gốc sầu riêng quý hay kho phân bón chòi cá, thiết lập khung giờ ban đêm hú còi tự động răn đe."
      },
      {
        title: "Nghiệm thu thực tế và Hướng dẫn sử dụng",
        description: "Chạy thử camera xuyên suốt ngày và đêm dưới sương mù Bảo Lộc dày đặc, kiểm tra độ nhạy gửi thông báo báo trộm, bàn giao toàn bộ tài khoản quản lý gốc cho gia đình sở hữu tuyệt đối."
      }
    ]
  }
];
