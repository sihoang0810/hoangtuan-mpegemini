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
  difficulty: string;
  duration: string;
  benefits: string[];
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
    title: "Thi công hệ thống điện thông minh Smarthome Biệt thự Đà Lạt",
    shortDescription: "Dự án cải tạo toàn diện hệ thống điện gia đình cũ sang hệ thống Smarthome thông minh MPE hiện đại bậc nhất cho biệt thự cổ tại Đà Lạt. Xử lý triệt để hơn 500m dây dẫn cũ chằng chịt, tích hợp tủ điện thông minh điều khiển qua điện thoại, nâng cao an toàn phòng chống cháy nổ.",
    fullDescription: "Dự án cải tạo hệ thống điện nước và nâng cấp nhà thông minh cho một biệt thự nghỉ dưỡng cổ điển tại thành phố Đà Lạt, Lâm Đồng. Hiện trạng ban đầu cho thấy hệ thống cơ điện đã xuống cấp cực kỳ nghiêm trọng sau hơn 15 năm sử dụng: dây dẫn bị lão hóa lớp vỏ nhựa cách điện, liên tục xảy ra hiện tượng chập điện nhảy aptomat đột ngột khi sử dụng các thiết bị công suất cao như máy nước nóng và lò nướng, đe dọa nghiêm trọng đến an toàn cháy nổ của biệt thự.\n\nNhận được yêu cầu từ chủ đầu tư, đội ngũ kỹ sư và thợ sửa điện lành nghề của Hoàng Tuấn MPE đã tiến hành khảo sát chi tiết bằng máy đo chuyên dụng, lập bản vẽ thi công cơ điện hoàn chỉnh. Chúng tôi thực hiện bóc tách, luồn lại toàn bộ hơn 500 mét dây dẫn lõi đồng chịu tải cao cấp luồn trong ống nhựa chống cháy chịu lực đi âm tường. Đồng thời thiết kế và lắp đặt tủ điện tổng thông minh thế hệ mới tích hợp át chống rò RCBO siêu nhạy, kết hợp giải pháp Smarthome MPE điều khiển bật/tắt, hẹn giờ hệ thống chiếu sáng, rèm cửa, điều hòa không khí hoàn toàn tự động qua điện thoại di động và ra lệnh bằng giọng nói tiếng Việt mượt mà.\n\nCông trình này đòi hỏi tiêu chuẩn thi công cực kỳ khắt khe của đơn vị thợ điện Lâm Đồng uy tín, đảm bảo vừa giữ nguyên vẹn giá trị thẩm mỹ cổ kính của biệt thự kiến trúc Pháp, vừa tích hợp công nghệ Smarthome tiên tiến nhất hiện nay tại khu vực Tây Nguyên.",
    images: [
      "/public/images/cua-cuon-thong-minh.png",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Điện thông minh",
    location: "Đà Lạt, Lâm Đồng",
    completionDate: "20/05/2026",
    difficulty: "Mức độ 4.5/5 (Rất Phức Tạp) - Do thi công trên nền biệt thự cổ kết cấu tường gạch đúc dày nguyên khối và yêu cầu tuyệt đối giữ nguyên phào chỉ thạch cao trang trí.",
    duration: "7 ngày làm việc liên tục (bao gồm khảo sát, bóc dỡ đường điện cũ, kéo dây chịu tải âm tường mới, lắp đặt cấu hình thiết bị thông minh và kiểm tra tải thực tế).",
    benefits: [
      "An toàn chống cháy nổ tuyệt đối nhờ hệ thống aptomat RCBO bảo vệ chống quá tải và rò dòng thông minh, tự động ngắt điện cực nhạy chỉ trong 0.03 giây.",
      "Tiết kiệm đến 35% hóa đơn tiền điện hàng tháng thông qua hệ thống lập lịch tự động tắt mở các thiết bị công suất cao như bình nóng lạnh, hệ thống sưởi ấm, đèn chiếu sáng ngoài trời.",
      "Trải nghiệm sống đỉnh cao với tính năng ra lệnh giọng nói bằng tiếng Việt mượt mà, điều khiển từ xa sấy phòng ấm áp trước khi quay về từ bất kỳ nơi đâu trên điện thoại.",
      "Nâng cao đáng kể giá trị bất động sản cho biệt thự Đà Lạt khi sở hữu hệ thống Smarthome MPE hiện đại đồng bộ hóa từ thiết bị đóng cắt đến chiếu sáng nghệ thuật."
    ],
    seo: {
      metaTitle: "Cải Tạo Điện Thông Minh Biệt Thự Đà Lạt | Thợ Sửa Điện Nước Lâm Đồng",
      metaDescription: "Dự án cải tạo thi công toàn bộ hệ thống cơ điện sang Smarthome thông minh hiện đại cho biệt thự tại Đà Lạt. Khảo sát, đi lại đường điện âm tường an toàn, tiết kiệm 30% điện năng.",
      keywords: ["sửa điện biệt thự đà lạt", "điện thông minh mpe lâm đồng", "lắp điện thông minh đà lạt", "smarthome mpe đà lạt", "thợ sửa điện lâm đồng", "thi công điện nước biệt thự"]
    },
    gallery: [
      "/public/images/cua-cuon-thong-minh.png",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542013936-6533e14cb263?auto=format&fit=crop&q=80&w=800"
    ],
    services: [
      "Khảo sát toàn bộ sơ đồ phân tải hệ thống cơ điện cũ",
      "Rút và kéo lại dây nguồn chịu tải lõi đồng MPE cao cấp đi âm tường",
      "Thiết kế thi công lắp đặt tủ điện thông minh tích hợp aptomat chống rò RCBO an toàn",
      "Thi công lắp đặt thiết bị nhà thông minh điều khiển giọng nói và smartphone",
      "Lắp đặt hệ thống đèn công nghệ LED cảm ứng hồng ngoại ngoại vi tự động tắt mở"
    ],
    challenges: "Căn biệt thự cổ có kiến trúc xây dựng tường gạch đặc nguyên khối dày tới 30cm từ thập niên trước, hoàn toàn không đi ống ghen luồn dây dẫn cứng khiến việc rút dây cáp điện cũ bị kẹt chặt. Hơn nữa, gia chủ đưa ra yêu cầu khắt khe là tuyệt đối giữ nguyên vẹn kết cấu hoa văn thạch cao trần nghệ thuật và lớp sơn tường sang trọng, không được phép đục khoét bừa bãi gây nứt vỡ kết cấu trang trí.",
    solutions: "Kỹ sư trưởng của Hoàng Tuấn MPE đã quyết định sử dụng dây mồi thép luồn chuyên dụng kết hợp chất bôi trơn kỹ thuật silicone để luồn dây cáp mềm dẻo chịu nhiệt cao. Ở các điểm nối quan trọng, chúng tôi khéo léo tận dụng tối đa các đường giáp lai trang trí, phào chỉ thạch cao và góc tủ khuất để bố trí các hộp đấu dây âm kín đáo, hoàn thành xuất sắc việc đi lại toàn bộ mạch điện mà không ảnh hưởng đến mỹ quan biệt thự.",
    outcome: "Hệ thống điện thông minh vận hành trơn tru và an toàn tuyệt đối. Các thiết bị chống rò dòng siêu nhạy triệt tiêu hoàn toàn nguy cơ giật điện hay chập cháy âm tường. Gia chủ vô cùng hài lòng khi có thể kiểm soát tắt mở điều hòa, bình nóng lạnh từ xa thông qua ứng dụng trên smartphone trước khi về nhà. Lượng điện năng hao phí hàng tháng giảm hơn 30% nhờ hệ thống lập lịch chiếu sáng thông minh.",
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800",
      afterImage: "/public/images/cua-cuon-thong-minh.png",
      beforeDesc: "Hệ thống tủ điện cũ kỹ, dây nhợ đấu nối chằng chịt, không có át chống rò dòng nguy cơ cháy nổ cực kỳ cao.",
      afterDesc: "Tủ điện thông minh MPE lắp âm tường cực kỳ gọn gàng, chia lộ rõ ràng kèm át RCBO bảo vệ chống rò dòng cho từng khu vực."
    },
    faq: [
      {
        question: "Thi công lắp đặt hệ thống điện thông minh biệt thự mất bao lâu?",
        answer: "Với quy trình làm việc khoa học, chuẩn bị đầy đủ thiết bị, dự án cải tạo điện nước biệt thự Đà Lạt được Hoàng Tuấn MPE hoàn thiện toàn bộ từ khâu bóc dỡ, kéo dây, lắp thiết bị thông minh đến bàn giao trong vòng đúng 7 ngày làm việc liên tục."
      },
      {
        question: "Hệ thống smarthome này có dễ sử dụng với người lớn tuổi không?",
        answer: "Rất dễ sử dụng. Ngoài việc thao tác trên ứng dụng di động trực quan có hỗ trợ tiếng Việt, chúng tôi có thiết lập các phím kịch bản gắn tường cơ học quen thuộc (ví dụ nút bấm 'Đi Ngủ' sẽ tự động tắt toàn bộ đèn sảnh, bật công tắc bảo vệ vòng ngoài) giúp người lớn tuổi sử dụng cực kỳ đơn giản."
      }
    ],
    relatedProjects: ["lap-dat-camera-xuong-may", "bao-tri-dien-nuoc-khach-san"]
  },
  {
    id: "2",
    slug: "do-tim-ro-ri-nhatrang",
    title: "Siêu âm dò tìm rò rỉ nước ngầm & Sửa đường ống nước âm sàn bồn bể ngầm",
    shortDescription: "Ứng dụng công nghệ máy dò sóng âm khuếch đại hiện đại tầm soát rò rỉ nước ngầm, định vị chính xác vị trí vỡ bể ống ngầm sâu dưới nền nhà tắm, nền bếp căn hộ chung cư cao cấp. Xử lý triệt để hóa đơn tiền nước tăng đột biến, tránh đục phá phá vỡ kết cấu nền móng gạch đá hoa cương.",
    fullDescription: "Căn hộ chung cư cao cấp gặp tình trạng hóa đơn tiền nước sinh hoạt tăng đột ngột gấp 5-6 lần bình thường mặc dù nhu cầu sử dụng thực tế của gia đình không thay đổi. Đồng thời, khu vực vách tường phòng bếp và mép nền toilet xuất hiện các vệt ẩm ướt lớn, rêu mốc xanh đen bắt đầu loang lổ kèm mùi hôi khó chịu. Nhiều đơn vị sửa chữa thông thường đến kiểm tra thủ công nhưng không tìm ra nguyên nhân, đề xuất phương án đập vỡ toàn bộ lớp gạch đá hoa cương phòng bếp để tìm kiếm.\n\nNhận thấy mức độ nghiêm trọng và yêu cầu cao từ phía gia chủ, đội ngũ chuyên gia siêu âm dò tìm rò rỉ nước của Hoàng Tuấn MPE đã lập tức có mặt cùng trang thiết bị máy dò sóng âm khuếch đại dải tần hiện đại nhất (nhập khẩu từ CHLB Đức). Chúng tôi thực hiện rà soát khoa học dọc theo sơ đồ đường ống nước âm nền để khoanh vùng và xử lý triệt để mà không cần đục phá lan man.\n\nDịch vụ siêu âm rò rỉ nước Bảo Lộc, Lâm Đồng và các quận huyện nội thành Hồ Chí Minh (như Quận 1, Quận 3, Thủ Đức, Bình Thạnh) của chúng tôi cam kết phát hiện lỗ rò rỉ âm sàn sâu nhất, giúp giải quyết triệt để vấn đề mất nước thất thoát bồn bể ngầm dứt điểm vĩnh viễn.",
    images: [
      "/public/images/sieu-am-do-tim-ong-vo.png",
      "/public/images/sieuam.png"
    ],
    category: "Siêu âm dò tìm",
    location: "Quận 1, TP.HCM & Bảo Lộc",
    completionDate: "12/04/2026",
    difficulty: "Mức độ 4.8/5 (Cực Kỳ Khó) - Do đường ống rò rỉ nằm dưới nền đá hoa cương tự nhiên đắt tiền, âm sâu trong lớp bê tông móng chịu lực của căn hộ chung cư cao tầng, xung quanh bị nhiễu tiếng ồn đô thị rất lớn.",
    duration: "4 đến 6 giờ đồng hồ (bao gồm khảo sát dòng chảy tĩnh, bơm nén khí tạo bọt áp lực cao, dùng máy siêu âm khuếch đại sóng âm rà quét định vị lỗ rò, đục cục bộ 1 viên gạch duy nhất và hàn vá ống PPR chịu nhiệt).",
    benefits: [
      "Ngăn chặn ngay lập tức tình trạng hóa đơn nước tăng vọt hàng triệu đồng mỗi tháng do đường ống nước ngầm bị bục vỡ rò rỉ không rõ nguyên nhân.",
      "Bảo vệ 100% kết cấu móng nhà và tường nội thất khỏi hiện tượng ẩm mốc, sụt lún nguy hiểm, loang lổ rêu xanh phá hỏng tủ bếp gỗ và lớp sơn trang trí sang trọng.",
      "Tiết kiệm tối đa chi phí sửa chữa bằng cách tránh đục phá phá dỡ sàn nhà tràn lan, bảo vệ tuyệt đối lớp gạch hoa cương đắt tiền của gia chủ.",
      "Chính sách bảo hành uy tín dài hạn lên tới 12 tháng cho mối hàn vá nhiệt đường ống nước nóng lạnh PPR cấp nước sinh hoạt."
    ],
    seo: {
      metaTitle: "Dò Tìm Rò Rỉ Nước Ngầm Bảo Lộc & HCM | Máy Siêu Âm Rò Rỉ Nước",
      metaDescription: "Dịch vụ dò tìm rò rỉ nước ngầm bằng máy siêu âm hiện đại tại Bảo Lộc, Lâm Đồng và Hồ Chí Minh. Xác định chính xác 100% vị trí rò rỉ âm tường, âm nền bồn bể nước.",
      keywords: ["dò tìm rò rỉ nước ngầm bảo lộc", "siêu âm rò rỉ nước hcm", "thợ sửa ống nước âm tường", "máy siêu âm rò rỉ nước lâm đồng", "sửa ống nước rò rỉ bể ngầm", "tìm rò rỉ nước giá rẻ"]
    },
    gallery: [
      "/public/images/sieu-am-do-tim-ong-vo.png",
      "/public/images/sieuam.png",
      "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800"
    ],
    services: [
      "Đo kiểm tra lưu lượng nước tĩnh để xác định mức độ thất thoát bồn bể",
      "Bơm thử áp suất bằng máy nén áp lực chuyên dụng để khoanh vùng đoạn ống vỡ",
      "Sử dụng máy siêu âm rò rỉ nước định vị âm thanh rạn nứt sâu dưới lòng đất",
      "Đánh dấu vị trí lỗ rò chính xác đến từng centimet trên sàn nhà",
      "Đục cục bộ cực nhỏ, sửa chữa hàn nhiệt ống PPR chịu nhiệt mới nhập khẩu"
    ],
    challenges: "Đường ống cấp nước PPR chôn âm sâu dưới lớp sàn bê tông dày chịu lực, lớp màng chống thấm đa tầng và gạch đá hoa cương tự nhiên đắt đỏ. Thêm vào đó, căn hộ nằm ở khu vực đô thị nhộn nhịp, tiếng ồn dội từ các căn hộ liền kề và xe cộ dưới đường liên tục gây nhiễu dải sóng âm của máy dò thông thường, rất khó định vị chính xác vị trí rò rỉ.",
    solutions: "Đội ngũ kỹ thuật của Hoàng Tuấn MPE đã tiến hành cô lập hoàn toàn hệ thống van khóa cấp nước tổng từng tầng. Chúng tôi sử dụng máy siêu âm có bộ lọc tạp âm dải tần hẹp kỹ thuật số, lọc bỏ 99% tiếng ồn đô thị và tập trung ghi nhận sóng âm xung động đặc hiệu của nước rò rỉ phun ra từ lỗ vỡ ống ngầm, giúp nghe xuyên qua lớp đá granite dày thành công.",
    outcome: "Xác định chuẩn xác duy nhất một điểm nứt vỡ khớp nối chữ T của đường ống nước nóng PPR nằm ngay dưới tủ bếp. Chúng tôi tiến hành tháo dỡ cẩn thận đúng 1 ô gạch kích thước 30x30cm, dùng máy hàn nhiệt vá ống PPR chất lượng cao trong vòng 20 phút. Hệ thống nước cấp trở lại hoạt động bình thường, hóa đơn nước giảm về mức tối thiểu ban đầu, dứt điểm vĩnh viễn tình trạng thấm tường lo ngại.",
    beforeAfter: {
      beforeImage: "/public/images/sieuam.png",
      afterImage: "/public/images/sieu-am-do-tim-ong-vo.png",
      beforeDesc: "Sàn bếp ngấm nước ngầm rò rỉ lênh láng, mốc ẩm tàn phá tủ bếp gỗ cao cấp trị giá hàng chục triệu đồng.",
      afterDesc: "Đường ống được hàn nhiệt PPR chắc chắn, đổ bê tông bù co ngót chống thấm và lát lại viên gạch khít khao như mới."
    },
    faq: [
      {
        question: "Dò siêu âm rò rỉ nước ngầm có phải đập phá nền nhà nhiều không?",
        answer: "Hoàn toàn không. Với công nghệ máy dò siêu âm nhập khẩu hiện đại nhất của Hoàng Tuấn MPE, chúng tôi cam kết định vị chính xác 99.9% vị trí rò rỉ nước ngầm. Thợ kỹ thuật chỉ đục đúng một ô nhỏ vừa đủ thao tác sửa chữa khớp nối ống, cam kết bảo vệ nguyên vẹn thẩm mỹ sàn nhà cho gia chủ."
      },
      {
        question: "Báo giá dịch vụ siêu âm dò rò rỉ nước bể âm sàn là bao nhiêu?",
        answer: "Chi phí dò tìm nước rò rỉ tùy thuộc vào quy mô dự án (nhà phố, biệt thự, nhà xưởng hay mạng lưới cấp nước khu công nghiệp). Chúng tôi có chính sách đặc biệt: KHÔNG TÌM RA VỊ TRÍ RÒ RỈ - HOÀN TOÀN KHÔNG THU PHÍ dịch vụ."
      }
    ],
    relatedProjects: ["sua-dien-biet-thu-dalat", "bao-tri-dien-nuoc-khach-san"]
  },
  {
    id: "3",
    slug: "lap-dat-camera-xuong-may",
    title: "Thi công lắp đặt hệ thống Camera giám sát 4K Xưởng may công nghiệp Bảo Lộc",
    shortDescription: "Tư vấn và lắp đặt đồng bộ hệ thống 32 Camera IP độ phân giải siêu nét UltraHD 4K, tích hợp thuật toán AI nhận diện chuyển động an ninh vòng ngoài tại nhà máy xưởng may xuất khẩu quy mô lớn tại Bảo Lộc, Lâm Đồng.",
    fullDescription: "Một nhà máy dệt may xuất khẩu quy mô lớn diện tích hơn 2000m2 tại thành phố Bảo Lộc cần nâng cấp gấp hệ thống camera quan sát cũ vốn sử dụng cáp đồng trục thế hệ cũ đã mờ nhòe, liên tục mất tín hiệu do quá trình hoạt động của các máy may công nghiệp gây nhiễu điện từ. Hệ thống camera cũ không thể giám sát chi tiết quy trình lắp ráp sản phẩm, dễ xảy ra thất thoát hàng hóa, nguyên vật liệu và không đảm bảo công tác quản lý an ninh phòng chống cháy nổ.\n\nNhận nhiệm vụ, tổ kỹ thuật lắp đặt camera Bảo Lộc của Hoàng Tuấn MPE đã đến hiện trường, thực hiện đo đạc góc nhìn quang học, thiết kế sơ đồ mạng cáp quang nội bộ Gigabit khép kín và đề xuất lắp đặt giải pháp camera giám sát IP 4K chuyên dụng tích hợp công nghệ AI bảo vệ thông minh.\n\nDự án được triển khai toàn diện tại KCN Lộc Sơn, Bảo Lộc, mang lại giải pháp giám sát an ninh nhà xưởng tối ưu, truyền tải dữ liệu hình ảnh thời gian thực mượt mà bất chấp các tác động nhiễu sóng cơ điện.",
    images: [
      "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Camera & An ninh",
    location: "Bảo Lộc, Lâm Đồng",
    completionDate: "05/03/2026",
    difficulty: "Mức độ 4/5 (Phức Tạp) - Phải thiết kế mạng truyền tín hiệu bọc kim chống nhiễu từ trường phát ra từ hàng trăm động cơ máy may hoạt động cùng lúc, đi dây trên độ cao mái tôn nhà xưởng 12m cực kỳ nguy hiểm.",
    duration: "3 ngày làm việc (bao gồm lắp đặt hệ thống ống ghen bảo vệ PVC chống cháy, đi cáp mạng CAT6 FTP, lắp ráp căn chỉnh góc nhìn camera, đấu nối tủ rack đầu ghi trung tâm và cấu hình phần mềm).",
    benefits: [
      "Kiểm soát 100% quy trình sản xuất của từng băng chuyền công nhân, hạn chế sai sót kỹ thuật và thất thoát nguyên vật liệu dệt may có giá trị.",
      "Hình ảnh sắc nét UltraHD 4K giúp ban giám đốc có thể quan sát chi tiết từng lỗi chỉ dệt của sản phẩm từ xa qua smartphone/iPad mà không cần có mặt trực tiếp tại xưởng.",
      "Tính năng khoanh vùng ranh giới ảo bằng AI tự động nhận diện người lạ đột nhập xưởng ban đêm cực kỳ chuẩn xác, loại bỏ 98% báo động giả từ mèo chuột.",
      "Hệ thống đạt tiêu chuẩn kháng nước kháng bụi bông dệt IP67 giúp thiết bị hoạt động ổn định bền bỉ trên 5 năm không cần vệ sinh liên tục."
    ],
    seo: {
      metaTitle: "Lắp Đặt Camera Giám Sát Bảo Lộc Lâm Đồng | Hệ Thống Camera AI 4K",
      metaDescription: "Công ty lắp đặt camera an ninh Bảo Lộc uy tín, chuyên nghiệp. Thi công trọn gói hệ thống camera quan sát nhà xưởng, camera IP thông minh 4K giá rẻ chính hãng.",
      keywords: ["lắp đặt camera bảo lộc", "camera an ninh bảo lộc lâm đồng", "camera wifi giá rẻ bảo lộc", "thi công camera giám sát xưởng", "thợ lắp camera lâm đồng", "báo giá camera quan sát bảo lộc"]
    },
    gallery: [
      "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
    ],
    services: [
      "Khảo sát địa thế thực địa, vẽ sơ đồ lắp đặt 32 mắt camera IP hạn chế tối đa góc chết",
      "Thi công lắp ráp hệ thống ống ghen nhựa cứng chống cháy bảo vệ đường dây cáp tín hiệu",
      "Kéo cáp mạng CAT6 FTP lõi đồng bọc giáp bạc chống nhiễu từ trường động cơ dệt may",
      "Lắp đặt camera IP Hikvision độ phân giải 4K UltraHD, hỗ trợ xoay 360 độ ban đêm sắc nét",
      "Lắp đặt đầu ghi hình trung tâm thế hệ mới, cấu hình hệ thống xem camera qua điện thoại cho ban quản đốc"
    ],
    challenges: "Môi trường nhà xưởng dệt may có hàng trăm máy may công suất lớn hoạt động liên tục tạo ra sóng điện từ có tần số biến thiên rất lớn, dễ gây hiện tượng nhiễu sọc hình ảnh camera. Hơn nữa, lượng bụi bông vải cực mịn lơ lửng trong không khí có thể dễ dàng xâm nhập vào các kẽ hở linh kiện camera gây cháy hỏng mạch hoặc mờ mịt ống kính.",
    solutions: "Hoàng Tuấn MPE đã tư vấn sử dụng hệ thống cáp mạng CAT6 bọc giáp chống nhiễu cao cấp kết hợp với các switch mạng PoE chuyên dụng của hãng Cisco để đảm bảo truyền tải tín hiệu không bị suy hao. Toàn bộ mắt camera lắp đặt đều đạt tiêu chuẩn kháng bụi nước tuyệt đối IP67, được trang bị hộp kỹ thuật bảo vệ kín khít ngăn chặn bụi vải xâm nhập.",
    outcome: "Hệ thống 32 mắt camera vận hành xuất sắc, mang lại hình ảnh cực kỳ sắc nét ở độ phân giải 4K. Ban lãnh đạo dễ dàng quan sát chi tiết đến từng đường kim mũi chỉ của công nhân may trên máy tính, iPad hay điện thoại từ xa. Chức năng AI thông minh khoanh vùng vùng cấm giúp kịp thời ngăn chặn các sự cố đột nhập ranh giới xưởng ban đêm hiệu quả.",
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800",
      beforeDesc: "Hệ thống camera cáp đồng trục cũ mờ nhòe, nhiễu sọc ngang dọc khi máy dệt khởi động và thường xuyên mất tín hiệu.",
      afterDesc: "Hệ thống camera IP 4K mới chạy cáp mạng bọc bạc siêu ổn định, hình ảnh sáng rõ cả ngày lẫn đêm bất chấp mọi loại từ trường."
    },
    faq: [
      {
        question: "Dữ liệu ghi hình của camera nhà xưởng có thể lưu trữ được bao lâu?",
        answer: "Chúng tôi lắp đặt hệ thống đầu ghi chuyên dụng tích hợp ổ cứng dung lượng lớn 10TB chạy chế độ lưu trữ kép an toàn, cho phép lưu trữ video chất lượng cao UltraHD liên tục trong vòng 30 ngày trước khi tự động ghi đè theo chu kỳ."
      },
      {
        question: "Camera có tính năng cảnh báo khi có kẻ đột nhập ban đêm không?",
        answer: "Có. Toàn bộ hệ thống camera an ninh lắp đặt tại nhà xưởng Bảo Lộc đều được kích hoạt tính năng phát hiện chuyển động bằng trí tuệ nhân tạo (AI). Khi phát hiện người lạ vượt hàng rào ảo vào ban đêm, camera lập tức hú còi hỏa tiễn báo động đồng thời gửi thông báo khẩn cấp dạng video về điện thoại của bảo vệ và chủ xưởng."
      }
    ],
    relatedProjects: ["sua-dien-biet-thu-dalat", "bao-tri-dien-nuoc-khach-san"]
  },
  {
    id: "4",
    slug: "bao-tri-dien-nuoc-khach-san",
    title: "Thợ cơ điện bảo trì định kỳ hệ thống điện nước Khách sạn 4 sao chuyên nghiệp",
    shortDescription: "Tầm soát định kỳ, nâng cấp công suất truyền dẫn tủ phân phối điện chính, kiểm tra sửa chữa hệ thống máy bơm tăng áp, bồn bể cấp nước tự động và tối ưu hóa hệ thống chiếu sáng tòa nhà khách sạn 4 sao hàng đầu.",
    fullDescription: "Nhằm chuẩn bị tốt nhất để đón lượng khách du lịch khổng lồ vào mùa lễ hội cao điểm, một khách sạn tiêu chuẩn 4 sao cần thực hiện công tác bảo dưỡng, rà soát tổng thể toàn bộ hệ thống cơ điện nước tòa nhà để triệt tiêu mọi rủi ro sự cố. Việc mất điện sảnh đón tiếp hay mất nước cấp cho các phòng nghỉ giữa lúc phòng đang kín khách chắc chắn sẽ gây ra trải nghiệm tồi tệ cho khách hàng và tổn hại nghiêm trọng đến thương hiệu của khách sạn.\n\nNhận trách nhiệm bảo trì hệ thống cơ điện, đội thợ sửa chữa điện nước tay nghề cao của Hoàng Tuấn MPE đã tiến hành lập kế hoạch chi tiết, sử dụng các thiết bị đo kiểm hiện đại nhất như camera tầm nhiệt, máy đo điện áp chuyên nghiệp để rà soát toàn diện các thiết bị cơ điện mà không làm ảnh hưởng đến hoạt động đón khách của khách sạn.\n\nDịch vụ bảo trì điện nước khách sạn, tòa nhà, biệt thự, nhà hàng tiệc cưới của Hoàng Tuấn MPE luôn sẵn sàng túc trực 24/7 phục vụ quý khách hàng tại TP. Hồ Chí Minh (như Quận 1, Quận 3, Quận 10) và Lâm Đồng (Bảo Lộc, Di Linh, Đức Trọng).",
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
    ],
    category: "Bảo trì trọn gói",
    location: "Quận 3, TP.HCM & Bảo Lộc",
    completionDate: "15/02/2026",
    difficulty: "Mức độ 4/5 (Phức Tạp) - Do việc bảo dưỡng sửa chữa phải thực hiện vào khung giờ đêm muộn rạng sáng, yêu cầu tuyệt đối giữ gìn không gian yên tĩnh cho khách lưu trú nghỉ ngơi và chia nhỏ lộ trình cắt điện sảnh cực kỳ nhanh chóng.",
    duration: "Thực hiện định kỳ hàng tháng (mỗi phiên rà soát tổng thể sảnh chính, buồng bơm tầng hầm và tủ điện phân phối các lầu mất khoảng 4 đến 6 giờ làm việc đêm).",
    benefits: [
      "Đảm bảo hệ thống kỹ thuật điện nước của khách sạn hoạt động liên tục 24/7 ổn định tuyệt đối, triệt tiêu 100% rủi ro mất điện sảnh hay mất nước phòng ngủ đột ngột.",
      "Kéo dài tuổi thọ thiết bị lên tới 40% thông qua việc bảo dưỡng rà soát camera nhiệt, phát hiện sớm các điểm đấu nối bị phóng điện phát nhiệt quá tải cực kỳ nguy hại.",
      "Tối ưu hóa hóa đơn tiền điện và tiền nước hàng tháng cho tòa nhà nhờ tầm soát xử lý rò rỉ van một chiều, bảo trì phao cơ bể mái tự động đóng ngắt kịp thời.",
      "Nhận đầy đủ biên bản nghiệm thu kỹ thuật đạt tiêu chuẩn chất lượng cao cùng hóa đơn đỏ VAT hợp lệ, giúp đơn giản hóa hồ sơ vận hành doanh nghiệp."
    ],
    seo: {
      metaTitle: "Bảo Trì Hệ Thống Điện Nước Khách Sạn | Thợ Sửa Điện Nước Uy Tín",
      metaDescription: "Dịch vụ bảo trì hệ thống cơ điện nước trọn gói cho tòa nhà, khách sạn, resort. Thợ sửa chữa điện nước tay nghề cao, uy tín, cam kết vận hành an toàn 24/7.",
      keywords: ["bảo trì điện nước khách sạn", "thợ sửa điện nước chuyên nghiệp", "bảo dưỡng cơ điện tòa nhà", "sửa chữa điện nước hcm", "sửa chữa điện nước bảo lộc"]
    },
    gallery: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
    ],
    services: [
      "Sử dụng camera nhiệt tầm soát rò rỉ bức xạ nhiệt các thanh đồng tủ điện chính",
      "Xiết lại toàn bộ cọc tiếp xúc của hộp nối tránh hiện tượng phóng tia lửa điện",
      "Bảo dưỡng định kỳ vòng bi, trục máy bơm tăng áp phòng kỹ thuật tầng hầm",
      "Thay thế hệ thống phao cơ bể nước mái tự động đóng ngắt cấp nước lầu cao",
      "Súc xả vệ sinh lõi vòi phun lọc cặn đường ống nước cấp tổng toàn khách sạn"
    ],
    challenges: "Khách sạn hoạt động liên tục 24 giờ mỗi ngày với tỉ lệ lấp đầy phòng cực kỳ cao. Công tác bảo trì đòi hỏi phải ngắt mạch điện tạm thời tại tủ phân phối chính để sửa chữa các điểm quá nhiệt, nhưng tuyệt đối không được làm gián đoạn sinh hoạt của hàng trăm vị khách đang lưu trú tại các tầng.",
    solutions: "Chúng tôi đã điều động tổ thợ sửa chữa điện nước gồm 6 người tiến hành thực hiện công việc vào khung giờ thấp điểm nhất trong ngày (từ 2 giờ đến 4 giờ sáng). Thợ đã đấu nối bypass luân chuyển nguồn điện dự phòng tạm thời theo từng khu vực, chia nhỏ lộ trình cắt điện cục bộ sảnh chỉ trong vòng dưới 3 phút để đấu nối rơ le bảo vệ nhiệt mới thành công.",
    outcome: "Hệ thống kỹ thuật cơ điện tòa nhà vận hành êm ái, trơn tru. Máy bơm tăng áp chạy ổn định, không còn hiện tượng kêu to hay rung giật đường ống nước. Camera tầm nhiệt kiểm tra lại cho thấy dải nhiệt độ tại các điểm đấu nối tủ điện tổng đã quay về mức an toàn tuyệt đối, triệt tiêu hoàn toàn rủi ro nhảy aptomat đột ngột hay cháy nổ tủ điện.",
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
      beforeDesc: "Cầu dao, atomat cũ có hiện tượng phóng tia lửa điện sần sùi do lỏng chân ốc vít tiếp xúc, phát nhiệt cực lớn.",
      afterDesc: "Hệ tủ điện bừng sáng ngăn nắp, dán nhãn phân lộ phân mạch rõ ràng và bổ sung thêm hệ thống quạt tản nhiệt thông gió."
    },
    faq: [
      {
        question: "Bảo trì định kỳ điện nước khách sạn có phải thông báo trước cho du khách?",
        answer: "Có. Chúng tôi luôn phối hợp chặt chẽ với Ban quản lý khách sạn để gửi thông báo bằng văn bản hoặc bảng tin điện tử đặt tại sảnh trước ít nhất 24 giờ. Vì thợ thực hiện vào ban đêm muộn nên du khách hoàn toàn không cảm nhận thấy bất kỳ sự bất tiện nào."
      },
      {
        question: "Dịch vụ bảo trì điện nước của Hoàng Tuấn MPE có xuất hóa đơn giá trị gia tăng (VAT) không?",
        answer: "Có. Hoàng Tuấn MPE cung cấp đầy đủ hóa đơn tài chính VAT hợp lệ, kèm theo biên bản nghiệm thu thông số kỹ thuật công trình chi tiết và phiếu cam kết bảo hành dịch vụ định kỳ dài hạn giúp đối tác khách sạn hoàn toàn an tâm hợp tác."
      }
    ],
    relatedProjects: ["sua-dien-biet-thu-dalat", "do-tim-ro-ri-nhatrang"]
  },
  {
    id: "5",
    slug: "lap-dat-camera-vuon-ray",
    title: "Lắp đặt Camera an ninh Bảo Lộc giám sát vườn sầu riêng & rẫy cà phê Lâm Đồng",
    shortDescription: "Giải pháp thi công hệ thống camera Wifi không dây dùng tấm pin năng lượng mặt trời xoay 360 độ góc rộng, tích hợp modem sim 4G cao cấp ngoài trời, có chức năng còi hú hú báo động chống trộm đêm rực rỡ tại khu vực ngoại ô Bảo Lộc.",
    fullDescription: "Gia chủ sở hữu một trang trại vườn sầu riêng cơm vàng hạt lép và rẫy cà phê sườn ngoại ô rộng hơn 1.5 hecta tại thành phố Bảo Lộc, Lâm Đồng thường xuyên phải lo lắng mất trộm nông sản có giá trị cao khi vào vụ thu hoạch. Đặc thù địa hình dốc đá gồ ghề dốc đứng, khoảng cách từ cổng rào đến cuối bãi ao xa tới hàng trăm mét, đặc biệt là không có nguồn điện lưới kéo trực tiếp ra vườn xa và sóng Wifi từ nhà chính hoàn toàn không thể phủ sóng tới.\n\nĐội ngũ thợ lắp đặt camera Bảo Lộc của Hoàng Tuấn MPE đã trực tiếp lội vườn rẫy khảo sát địa thế và thiết kế giải pháp đột phá: lắp đặt hệ thống camera Wifi không dây dùng tấm pin năng lượng mặt trời tự lập 100% kết hợp bộ phát sóng Sim 4G tốc độ cao chuyên dụng ngoài trời.\n\nDịch vụ lắp đặt camera an ninh Lâm Đồng chuyên nghiệp cho nhà vườn sầu riêng (đặc biệt tại xã Đại Lào, Đambri, Lộc Châu, Lộc Nga và các huyện Di Linh, Bảo Lâm, Đức Trọng) giúp bà con quản lý nông trại dễ dàng, giảm lo âu trộm phá hoại mùa vụ.",
    images: [
      "/public/images/imou-ngoai-troi.jpg",
      "/public/images/camera-.png"
    ],
    category: "Camera & An ninh",
    location: "Đại Lào, Bảo Lộc, Lâm Đồng",
    completionDate: "20/05/2026",
    difficulty: "Mức độ 4.2/5 (Khá Khó) - Do thi công ngoài trời sườn núi dốc đứng gồ ghề sạt trượt, khoảng cách cực kỳ rộng và hoàn toàn không có điện lưới hay hạ tầng cáp quang có sẵn.",
    duration: "1 đến 1.5 ngày làm việc (bao gồm chôn móng, đúc bê tông chân cột thép phi 60, cố định pin năng lượng mặt trời, treo gá lắp camera IMOU và cài đặt phần mềm AI ranh giới an toàn).",
    benefits: [
      "Quản lý toàn bộ 1.5 hecta nông trại sầu riêng và rẫy cà phê từ xa ở bất cứ đâu có sóng điện thoại 3G/4G/Wifi.",
      "An tâm tuyệt đối khi bước vào mùa thu hoạch sầu riêng nhờ hệ thống ranh giới ảo cảnh báo còi hú, tự bật đèn spotlight chiếu thẳng mặt kẻ trộm đột nhập ban đêm.",
      "Thiết bị hoạt động hoàn toàn độc lập tự sạc 100% bằng năng lượng mặt trời, không phát sinh chi phí tiền điện hàng tháng, chống chọi mọi dông bão mưa lũ dốc núi Lâm Đồng.",
      "Hình ảnh sắc nét Super HD có màu ban đêm sinh động rõ từng khuôn mặt kẻ xấu đột nhập ranh rẫy để làm bằng chứng pháp lý."
    ],
    seo: {
      metaTitle: "Lắp Đặt Camera Vườn Sầu Riêng Bảo Lộc | Camera Năng Lượng Mặt Trời",
      metaDescription: "Giải pháp lắp đặt camera an ninh giám sát vườn rẫy sầu riêng tại Bảo Lộc, Lâm Đồng dùng pin năng lượng mặt trời và sim 4G độc lập. Báo giá camera quan sát chính hãng giá rẻ.",
      keywords: ["camera vườn sầu riêng bảo lộc", "camera rẫy năng lượng mặt trời lâm đồng", "lắp camera sim 4g bảo lộc", "camera an ninh vườn sầu riêng", "camera wifi ngoài trời bảo lộc", "thợ lắp camera giá rẻ lâm đồng"]
    },
    gallery: [
      "/public/images/imou-ngoai-troi.jpg",
      "/public/images/camera-.png",
      "/public/images/imou-ngoai-troi2.jpg"
    ],
    services: [
      "Khảo sát địa hình thực tế, đo đạc cường độ sóng sim 4G của từng nhà mạng",
      "Lắp đặt camera IP Wifi IMOU ngoài trời xoay 360 độ chống nước dột bão IP67",
      "Tích hợp hệ thống Tấm pin Năng lượng mặt trời Poly Silicon sạc thông minh",
      "Cấu hình và lắp đặt Router 4G công suất phát sóng cực khỏe xuyên cành lá",
      "Cài đặt ranh giới ảo cảnh báo bằng AI rượt đuổi trộm báo động trực tiếp về điện thoại"
    ],
    challenges: "Diện tích vườn rẫy sầu riêng cực kỳ rộng lớn, many cây tán lá dày rậm rạp làm cản trở tín hiệu sóng vô tuyến. Thêm vào đó, thời tiết Bảo Lộc thường xuyên có sương mù dày đặc và những trận mưa lớn xối xả kéo dài suốt cả tháng vào mùa mưa gây ẩm mốc và làm giảm hiệu năng hấp thu ánh sáng của tấm pin năng lượng mặt trời nuôi camera.",
    solutions: "Chúng tôi đã lựa chọn dòng camera an ninh cao cấp IMOU Cruiser tích hợp chip xử lý thế hệ mới cực kỳ tiết kiệm điện năng. Hệ thống đi kèm tấm pin năng lượng mặt trời Poly thế hệ mới có khả năng chuyển hóa quang năng tốt ngay cả dưới điều kiện trời sương mù âm u. Tất cả các cổng đấu nối tín hiệu và nguồn sạc đều được bảo vệ trong hộp kỹ thuật đúc cao su non kháng nước đạt tiêu chuẩn khắt khe IP67 ngoài trời.",
    outcome: "Hệ thống camera hoạt động cực kỳ mượt mà, ghi hình an ninh 24/7 ổn định sắc nét. Từ nay, gia chủ chỉ cần ngồi thảnh thơi tại nhà vẫn có thể theo dõi chi tiết tình hình vườn rẫy thông qua điện thoại. Chỉ trong tháng đầu tiên, camera đã phát hiện và phát còi hú xua đuổi thành công 2 vụ kẻ gian thâm nhập ranh rẫy ban đêm, bảo vệ toàn vẹn tài sản của gia đình.",
    beforeAfter: {
      beforeImage: "/public/images/camera-.png",
      afterImage: "/public/images/imou-ngoai-troi.jpg",
      beforeDesc: "Khu vườn sầu riêng rộng lớn nằm xa khu dân cư không có điện lưới hay mạng internet, thường xuyên xảy ra nạn trộm trái xanh dập nát cành.",
      afterDesc: "Hệ thống trạm camera độc lập dựng kiên cố trên đồi cao, tự sạc năng lượng mặt trời, gửi hình ảnh chuyển động siêu nét 2K về điện thoại."
    },
    faq: [
      {
        question: "Trời sương mù mưa bão liên tục 3-4 ngày thì camera năng lượng mặt trời có chạy được không?",
        answer: "Hoàn toàn bình thường. Hệ thống pin sạc Lithium chuyên dụng lắp kèm camera do Hoàng Tuấn MPE thiết kế được tối ưu hóa dung tích lớn, có khả năng nuôi thiết bị hoạt động liên tiếp từ 5 đến 7 ngày đêm ngay cả trong trường hợp mưa bão kéo dài hoàn toàn không có ánh nắng mặt trời trực tiếp."
      },
      {
        question: "Chi phí gói cước Sim 4G hàng tháng lắp trên camera ngoài vườn rẫy có đắt không?",
        answer: "Chúng tôi lắp đặt loại Sim Data 4G chuyên dụng với gói cước cực kỳ ưu đãi của nhà mạng lớn Viettel/Mobifone chỉ khoảng 100.000đ/tháng đến 120.000đ/tháng tốc độ cao không giới hạn dung lượng, giúp truyền hình ảnh mượt mà, không giật lag."
      }
    ],
    relatedProjects: ["lap-dat-camera-xuong-may", "sua-dien-biet-thu-dalat"],
    packages: [
      {
        name: "Gói Phổ Thông - IMOU SIM 4G 4MP",
        price: "2.850.000₫",
        features: [
          "Camera IMOU ngoài trời xoay 360 độ 4.0 Megapixel siêu nét",
          "Thẻ nhớ chính hãng SanDisk 64GB ghi đè liên tục 7-10 ngày",
          "Tặng Sim Data 4G tốc độ cao miễn phí tháng cước đầu tiên",
          "Hỗ trợ còi hú báo trộm cực to và bật đèn Spotlight chiếu sáng ban đêm",
          "Miễn phí công lắp đặt, đi ống bảo vệ dây nguồn và cấu hình ứng dụng",
          "Bảo hành trọn gói 12 tháng tận nơi vườn rẫy uy tín"
        ]
      },
      {
        name: "Gói Năng Lượng Mặt Trời Toàn Phần",
        price: "5.600.000₫",
        isPopular: true,
        badge: "Khuyên Dùng Cho Vườn Rẫy",
        features: [
          "Camera dùng Pin Sạc Lithium dung tích cực lớn, hoạt động độc lập",
          "Tấm pin năng lượng mặt trời thế hệ mới sạc nhanh cả khi trời âm u",
          "Tích hợp khe cắm sim 4G trực tiếp trên thân camera",
          "Hệ thống báo động thông minh AI hú còi báo động răn đe kẻ trộm",
          "Thẻ nhớ chính hãng 128GB ghi dữ liệu liên tục 15-20 ngày",
          "Trụ thép phi 60 gia cố đổ bê tông kiên cố chống chịu bão táp đồi núi",
          "Bảo hành chính hãng hỏa tốc tận nhà vườn trong vòng 24 tháng"
        ]
      },
      {
        name: "Hệ Thống Đa Mắt Cáp Quang Liên Rẫy",
        price: "Xem Khảo Sát",
        features: [
          "Toàn bộ mắt camera IP Hikvision chuẩn nén H.265+ độ phân giải 4K",
          "Kéo cáp quang bọc luồn sợi thép chịu lực gia cường ngoài trời siêu bền",
          "Đầu ghi hình trung tâm, ổ cứng lưu trữ chuyên dụng cực lớn từ 30 ngày",
          "Tủ điện an toàn tích hợp hệ thống chống sét lan truyền chống sét sườn đồi",
          "Vẽ hàng rào ảo bảo vệ đa lớp báo động thời gian thực về nhiều điện thoại",
          "Hỗ trợ bảo trì, vệ sinh ống kính camera định kỳ hoàn toàn miễn phí"
        ]
      }
    ],
    specifications: [
      { label: "Thương hiệu thiết bị", value: "IMOU / Ezviz / Hikvision chính hãng 100%" },
      { label: "Độ phân giải hình ảnh", value: "4.0 Megapixel Super HD đến 4K UltraHD cực nét" },
      { label: "Tiêu chuẩn kháng nước chịu bão", value: "IP66 / IP67 chịu sương gió, mưa dông Bảo Lộc hoàn hảo" },
      { label: "Khả năng lưu trữ dữ liệu", value: "Thẻ nhớ chuyên dụng ghi đè liên tục từ 64GB đến 256GB" },
      { label: "Nguồn điện sạc hoạt động", value: "Tấm pin năng lượng mặt trời Poly + Pin Lithium dung lượng cao" },
      { label: "Góc quét tầm nhìn quan sát", value: "Xoay ngang 355 độ, xoay dọc 90 độ điều khiển 360 độ trên app" },
      { label: "Tầm nhìn quan sát ban đêm", value: "Hồng ngoại thông minh 30m + Có Màu ban đêm bằng đèn LED" },
      { label: "Tính năng trí tuệ nhân tạo AI", value: "Phát hiện dáng người, vẽ hàng rào báo động, hú còi răn đe" }
    ],
    steps: [
      {
        title: "Khảo sát địa thế thực tế và Đo sóng Sim 4G",
        description: "Kỹ thuật viên của Hoàng Tuấn MPE sẽ di chuyển trực tiếp tới nhà vườn, rẫy sầu riêng để đo đạc chính xác cường độ sóng 4G của các nhà mạng lớn Viettel, Mobi, Vina ngay tại vị trí lắp đặt để chọn sim có sóng khỏe nhất."
      },
      {
        title: "Dựng cột thép gia cố chắc chắn chống bão",
        description: "Tiến hành chôn móng, đổ bê tông chân cột thép đường kính lớn cao hơn 3m để treo camera, đảm bảo trụ cột không bị rung lắc gây nhòe mờ hình ảnh khi có gió bão lớn trên đồi núi dốc đứng."
      },
      {
        title: "Gá lắp tấm pin sạc Năng Lượng Mặt Trời đón nắng",
        description: "Căn chỉnh góc nghiêng tấm pin hướng chính Nam chếch Tây để hấp thụ tối đa ánh nắng mặt trời cả ngày, đi dây cấp nguồn bọc trong ống nhựa bảo vệ PVC chống chuột cắn phá và ẩm ướt rò điện."
      },
      {
        title: "Cấu hình phân vùng vẽ hàng rào an ninh ảo AI",
        description: "Cài đặt phần mềm xem camera trên toàn bộ các thiết bị smartphone của các thành viên gia đình, thiết lập vẽ các đường ranh giới ảo quanh chòi canh, kho phân bón hay gốc sầu riêng quý để tự động báo động ban đêm."
      },
      {
        title: "Nghiệm thu toàn bộ hệ thống và Bàn giao",
        description: "Chạy thử nghiệm hệ thống camera liên tục ngày đêm trong thời tiết sương mù dày đặc Bảo Lộc để đảm bảo thiết bị hoạt động 100% hoàn hảo, hướng dẫn gia chủ sử dụng tài khoản camera tuyệt mật gốc độc quyền."
      }
    ]
  },
  {
    id: "6",
    slug: "lap-dat-cua-cuon-thong-minh",
    title: "Lắp đặt và cài đặt Cửa Cuốn Thông Minh kết nối điện thoại tại Bảo Lộc Lâm Đồng",
    shortDescription: "Thi công giải pháp nâng cấp hệ thống cửa cuốn truyền thống thành cửa cuốn thông minh điều khiển từ xa qua smartphone, tích hợp cảm biến chống xô vật cản, tự ngắt hành trình và hệ thống camera an ninh giám sát hành trình đóng mở 24/7.",
    fullDescription: "Gia đình sở hữu một ngôi nhà phố mặt tiền kinh doanh sầm uất tại trung tâm thành phố Bảo Lộc, Lâm Đồng. Hiện tại, ngôi nhà đang sử dụng cửa cuốn tấm liền kéo tay kết hợp motor cơ học điều khiển bằng tay bấm remote sóng radio truyền thống. Tuy nhiên, việc sử dụng remote thường xuyên gặp bất tiện: remote hết pin đột ngột, dễ bị rơi rớt hư hỏng, khoảng cách điều khiển cực kỳ ngắn chỉ khoảng vài mét và đặc biệt gia chủ lo lắng tính bảo mật của remote sóng RF rất dễ bị kẻ gian sử dụng máy dò tần số sao chép mã khóa đột nhập nhà.\n\nĐội ngũ chuyên gia cơ điện của Hoàng Tuấn MPE đã trực tiếp khảo sát và đề xuất gói giải pháp đột phá: Lắp đặt tích hợp hộp điều khiển thông minh kết nối mạng Wifi/4G, cảm biến dừng khi gặp vật cản thế hệ mới, và tích hợp camera giám sát trực diện hành trình đóng mở cửa cuốn 24/24 ngay trên một ứng dụng duy nhất.\n\nDịch vụ lắp đặt cửa cuốn thông minh Bảo Lộc và sửa chữa cửa cuốn Lâm Đồng của Hoàng Tuấn MPE cam kết nâng cấp hệ cửa cũ sang cơ chế điều khiển thông minh siêu an toàn, phản hồi hỏa tốc cực nhạy, loại bỏ mọi nguy cơ sao chép sóng RF của kẻ xấu đột nhập trái phép.",
    images: [
      "/public/images/cua-cuon-thong-minh.png",
      "/public/images/imou-ngoai-troi.jpg"
    ],
    category: "Cửa cuốn thông minh",
    location: "Bảo Lộc, Lâm Đồng",
    completionDate: "28/05/2026",
    difficulty: "Mức độ 3.8/5 (Vừa Phải) - Yêu cầu căn chỉnh lò xo trợ lực của hệ cửa tấm liền cũ và tăng cường vùng thu sóng Wifi cho bộ thu nhận tín hiệu đặt sâu trong hộp kỹ thuật bọc lá tôn dày.",
    duration: "4 đến 6 giờ đồng hồ (bao gồm bảo dưỡng bôi trơn ray trượt, đấu nối hộp nhận tín hiệu thông minh Tuya/MPE, gá lắp cảm biến đảo chiều vật cản, lắp camera giám sát trực diện lề đường và chia sẻ cấu hình app cho các thành viên).",
    benefits: [
      "Quản lý điều khiển đóng mở cửa cuốn từ bất cứ đâu trên thế giới chỉ cần có kết nối mạng internet Wifi/4G, không lo bỏ quên remote hay remote hết pin hỏa tốc.",
      "An tâm tuyệt đối với tính năng thông báo tức thì trên màn hình khóa điện thoại mỗi khi cửa cuốn có hành trình đóng hoặc mở.",
      "An toàn tối đa cho vật nuôi, trẻ nhỏ và xe cộ ra vào nhờ cảm biến vật cản siêu nhạy tự động dừng và đảo chiều lập tức khi phát hiện chướng ngại vật sát chân cửa.",
      "Bảo mật tuyệt mật nhờ công nghệ mã hóa xoay sóng AES-128 chống mọi loại máy hack sao chép mã vạch mã hóa tần số radio của trộm.",
      "Kết hợp camera quan sát trực quan ngay trên giao diện điều khiển, giúp kiểm tra trực diện trạng thái đóng kín khít của cửa cuốn tránh nghi ngờ trộm lách khe hở."
    ],
    seo: {
      metaTitle: "Cửa Cuốn Thông Minh Bảo Lộc Lâm Đồng | Lắp Đặt Điều Khiển Điện Thoại",
      metaDescription: "Dịch vụ lắp đặt cửa cuốn thông minh tại Bảo Lộc, nâng cấp điều khiển cửa cuốn từ xa bằng điện thoại an toàn chống trộm đột nhập tối tân của Hoàng Tuấn MPE.",
      keywords: ["cửa cuốn thông minh bảo lộc", "điều khiển cửa cuốn qua điện thoại", "lắp cửa cuốn bảo lộc lâm đồng", "sửa cửa cuốn bảo lộc", "hộp điều khiển cửa cuốn thông minh", "thi công cửa cuốn thông minh"]
    },
    gallery: [
      "/public/images/cua-cuon-thong-minh.png",
      "/public/images/imou-ngoai-troi.jpg",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
    ],
    services: [
      "Khảo sát đo đạc thông số lực kéo hành trình của mô tơ cửa cuốn hiện hữu",
      "Lắp đặt hộp nhận tín hiệu cửa cuốn thông minh thế hệ mới kết nối Wifi/Zigbee siêu bảo mật",
      "Đấu nối rơ le cảm biến đảo chiều tự động khi gặp chướng ngại vật dưới chân cửa cuốn",
      "Lắp đặt camera an ninh IP góc rộng giám sát trực quan 100% tiến trình vận hành cửa cuốn",
      "Cài đặt app quản lý, chia sẻ quyền điều khiển cửa cuốn an toàn cho các thành viên trong gia đình"
    ],
    challenges: "Hệ thống motor cũ đã rỉ sét phần bánh răng hành trình, lực cản cơ học không đồng đều dễ gây kẹt lá cửa khi kéo lên xuống tự động. Đồng thời, sóng Wifi từ modem chính đặt sâu trong phòng khách bị cản trở bởi lớp lá cửa cuốn thép dày đặc khiến sóng bị suy hao yếu, ảnh hưởng lớn đến độ nhạy nhận lệnh đóng mở từ xa qua app smartphone.",
    solutions: "Hoàng Tuấn MPE đã tiến hành bảo dưỡng bôi trơn dầu mỡ chuyên dụng toàn bộ ray trượt, căn chỉnh lò xo trợ lực của cửa cuốn. Chúng tôi lắp đặt thêm một bộ kích sóng Wifi chuyên dụng chống nhiễu đặt gần hộp kỹ thuật cửa cuốn để duy trì cường độ sóng liên tục 100%, bảo đảm cửa phản hồi lệnh tức thì trong vòng 0.5 giây từ điện thoại di động dù gia chủ ở bất cứ nơi đâu có mạng internet.",
    outcome: "Dự án hoàn thiện vượt mong đợi của gia đình. Gia chủ giờ đây có thể điều khiển đóng mở cửa cuốn dễ dàng thông qua smartphone, nhận được thông báo ngay lập tức trên màn hình khi cửa cuốn có chuyển động mở/đóng. Hệ thống cảm biến tự dừng vật cản cực kỳ nhạy, đảo chiều ngay lập tức khi chạm nhẹ vào đồ vật hay vật nuôi dưới chân cửa cuốn, mang lại sự an tâm tuyệt đối.",
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      afterImage: "/public/images/cua-cuon-thong-minh.png",
      beforeDesc: "Cửa cuốn cũ vận hành ồn ào, thường bị kẹt nghiêng, tay remote thường xuyên chập chờn mất tín hiệu sóng RF.",
      afterDesc: "Cửa cuốn vận hành êm ái tích hợp bộ điều khiển thông minh siêu bảo mật mã hóa AES-128, camera kiểm soát hành trình và cảm biến vật cản siêu nhạy."
    },
    faq: [
      {
        question: "Khi cúp điện lưới thì cửa cuốn thông minh có điều khiển được bằng điện thoại không?",
        answer: "Khi mất điện lưới, nếu nhà quý khách chưa lắp đặt bộ tích điện cửa cuốn (UPS) thì hệ thống mô tơ sẽ không có điện hoạt động. Tuy nhiên, Hoàng Tuấn MPE khuyên dùng lắp đặt thêm bộ lưu điện UPS thông minh tự sạc tự ngắt, đảm bảo cửa cuốn hoạt động trơn tru đóng mở từ 30 đến 50 lần liên tục ngay cả khi cúp điện lưới."
      },
      {
        question: "Sử dụng app điều khiển cửa cuốn có an toàn bảo mật, bị hack hay không?",
        answer: "Hộp điều khiển cửa cuốn thông minh do Hoàng Tuấn MPE phân phối sử dụng công nghệ mã hóa bảo mật chuẩn ngân hàng AES-128 bit và đồng bộ đám mây AWS bảo mật tuyệt đối. Mỗi lệnh đóng mở đều có mã số biến thiên chống dò sóng trùng lặp 100%, an toàn vượt trội gấp nhiều lần so với tay khiển remote cơ thông thường."
      }
    ],
    relatedProjects: ["sua-dien-biet-thu-dalat", "lap-dat-camera-vuon-ray"],
    packages: [
      {
        name: "Gói Nâng Cấp Smart Control",
        price: "1.250.000₫",
        features: [
          "Bộ điều khiển thông minh Tuya Smart Wifi cao cấp",
          "Mã hóa tín hiệu chống sao chép bảo mật tối đa",
          "Điều khiển từ xa không giới hạn khoảng cách địa lý",
          "Chia sẻ tài khoản mở khóa cho toàn bộ thành viên gia đình",
          "Miễn phí công lắp đặt, tinh chỉnh hành trình cửa",
          "Bảo hành chính hãng 12 tháng hư đổi mới"
        ]
      },
      {
        name: "Combo An Toàn Toàn Diện",
        price: "2.450.000₫",
        isPopular: true,
        badge: "Gia Đình Tin Dùng",
        features: [
          "Hộp điều khiển cửa cuốn thông minh Wifi siêu nhạy",
          "Rơ le cảm biến đảo chiều hoặc tự ngắt khi gặp vật cản",
          "Camera IP giám sát hành trình cửa cuốn HD ban đêm có màu",
          "Cảnh báo thông minh đẩy thông báo thời gian thực về điện thoại",
          "Miễn phí toàn bộ công lắp ráp căn chỉnh kỹ thuật",
          "Bảo hành tận nhà trọn gói trong vòng 24 tháng"
        ]
      }
    ]
  }
];
