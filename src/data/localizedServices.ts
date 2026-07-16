import { CMSService } from '../lib/sanity';

export const LOCALIZED_SERVICES: { [key: string]: CMSService[] } = {
  'bao-loc': [
    {
      id: "e1",
      slug: "sua-dien",
      order: 1,
      title: "Thợ Sửa Điện Bảo Lộc Đêm 24/7",
      shortDescription: "Khắc phục nhanh hư hỏng cơ điện gia đình, chập nổ tủ điện, hỏng bóng led ở Bảo Lộc Lâm Đồng.",
      fullDescription: `
        <h1>Thợ Sửa Điện Bảo Lộc Khẩn Cấp - Bảo Vệ Gia Đình Bạn Từ Xứ Trà Lâm Đồng</h1>
        <p>Hệ thống điện nhà bạn gặp sự cố lúc nửa đêm tại khu vực Lộc Châu, Đại Lào khiến việc sinh hoạt và kinh doanh bị ngưng trệ? Bạn lo ngại những đơn vị thợ không uy tín báo khống giá sửa? Đội thợ điện Bảo Lộc của Hoàng Tuấn MPE chính là giải pháp an toàn tuyệt đối cho bạn.</p>
        
        <h2>Các sự cố điện thường gặp tại khu vực TP. Bảo Lộc</h2>
        <ul>
          <li><strong>Mất điện toàn phần đột ngột:</strong> Xảy ra ngẫu nhiên khi quá tải điện hoặc độ ẩm dầm dột tủ sấy tại Lộc Phát, Lộc Nga.</li>
          <li><strong>Mối tiếp xúc ổ cắm bị chảy nhựa:</strong> Do thợ đi dây lỏng lẻo hoặc sử dụng ổ cắm kém phẩm chất.</li>
          <li><strong>Lỗi bóng đèn ngoài trời:</strong> Chống nước sương xâm nhập đui đèn gây rò rỉ điện.</li>
        </ul>

        <h2>Quy trình sửa điện chuyên nghiệp uy tín của Hoàng Tuấn MPE tại Lâm Đồng</h2>
        <ol>
          <li><strong>Khảo sát và Đo Đạc:</strong> Thợ điện mang thiết bị kiểm tra đến nhà bạn lập tức sau 15 phút cam kết hoàn toàn miễn phí khảo sát.</li>
          <li><strong>Khuyên phương án tối ưu:</strong> Hỗ trợ thiết kế nhánh điện độc lập phân tỏa cho thiết bị tải lớn.</li>
          <li><strong>Tiến hành thi công:</strong> Luồn dập chống cháy vỏ màng điện, hàn bọc cách điện nhiệt độ cao.</li>
          <li><strong>Nghiệm thu:</strong> Đóng tủ điện tổng Panasonic, dọn sạch mặt thạch cao trước khi nhận tiền và gửi phiếu bảo hành 12 tháng.</li>
        </ol>
      `,
      icon: "Zap",
      category: "electrical",
      features: ["Thợ địa bàn Bảo Lộc túc trực", "Tư vấn báo giá 0 ĐỒNG tận nhà", "Linh kiện Panasonic chính gốc 100%"],
      pricing: [
        { item: "Khảo sát & Lập sơ đồ điện", price: "Khảo sát Miễn Phí", unit: "lần" },
        { item: "Thay công tắc ổ cắm Panasonic", price: "Từ 50.000đ", unit: "cái" },
        { item: "Khắc phục mất điện sập CB gia đình", price: "Từ 150.000đ", unit: "vụ" }
      ],
      benefits: ["Thợ lành nghề Bảo Lộc am hiểu an toàn chu đáo", "Giá cả minh bạch không phát sinh chặt chém", "Bảo hành nhanh chỉ trong 4H"],
      faq: [
        { question: "Thợ điện có sửa cho xóm trà xa trung tâm Lâm Đồng?", answer: "Có! Chúng tôi phục vụ sửa điện cho mọi gia đình tại dốc Đại Lào, Lộc Nga, Lộc Châu, Bảo Lâm và Di Linh." }
      ]
    },
    {
      id: "e2",
      slug: "sua-chap-dien",
      title: "Sửa Chập Điện Bảo Lộc Bằng Máy Dò Xung Từ",
      shortDescription: "Phát hiện vết rò nổ điện âm tường Bảo Lộc chính xác 99% không băm nát thạch cao tường nhà.",
      fullDescription: `
        <h1>Dịch Vụ Sửa Chập Điện Tại Bảo Lộc Bằng Máy Dò Xung Từ Siêu Hiện Đại</h1>
        <p>Hiện trạng nổ lách tách trong vách tường hay CB Panasonic nhảy liên tục là tín hiệu chập mạch nguy cơ hỏa hoạn cháy nhà hàng đầu tại Lâm Đồng. Đội thợ cơ điện sửa điện nước Bảo Lộc trang bị máy xung điện Đức cô lập điểm xảy ra chập tức thì.</p>
        <h2>Quy trình rà chập điện âm sàn tại TP. Bảo Lộc</h2>
        <p>Chúng tôi đo đạc cách dòng rò màng bọc tĩnh điện, luồn thiết bị rà từ trường dọc khe tường. Điểm chập sẽ được phát tín hiệu trên đồng hồ hiển thị LED. Sau đó thợ chỉ khắc phục nén dập ngay ô vuông đó sơn dán trét lại đẹp như mới.</p>
      `,
      icon: "ShieldCheck",
      category: "electrical",
      features: ["Dò chập điện âm không phá dỡ bừa bãi", "Dò chuẩn đến từng mili-mét mạch dẫn", "Giải quyết dứt điểm 100% vụ việc"],
      pricing: [
        { item: "Dò tìm vị trí chập điện âm tường", price: "Từ 200.000đ", unit: "vụ" },
        { item: "Rút bó dây điện chập luồn luồn ống PVC mới", price: "Từ 180.000đ", unit: "nhánh" }
      ]
    },
    {
      id: "e3",
      slug: "sua-aptomat",
      title: "Sửa Aptomat CB Chống Giật Bảo Lộc",
      shortDescription: "Thay thế, nâng cấp Aptomat / CB Panasonic Schneider chống giật an toàn, phù hợp cho mọi khu vực tại Bảo Lộc.",
      fullDescription: `
        <h1>Lắp Đặt & Sửa Thay Thế CB Chống Giật Tại Bảo Lộc Lâm Đồng Chính Hãng</h1>
        <p>Aptomat nhà bạn thường xuyên bị nhảy tại Lộc Châu, Đại Lào hay do sử dụng lò nướng, máy nước nóng quá tải? Chúng tôi lắp đặt CB chính hiệu Panasonic, dòng nhạy cao phản hồi tắt sau 0.01 giây khi có dòng rò điện sục nước.</p>
      `,
      icon: "Settings",
      category: "electrical",
      features: ["Aptomat Panasonic nhập gốc bảo hành chính hãng", "Tải công suất hoạt động ổn định tại Bảo Lộc", "Thay an toàn đúng quy chuẩn cơ điện"],
      pricing: [
        { item: "Thay CB đơn Panasonic chính hãg", price: "Từ 80.000đ", unit: "bộ" },
        { item: "Căn chỉnh lắp đạt CB chống giật rò dòng", price: "Từ 180.000đ", unit: "con" }
      ]
    },
    {
      id: "e4",
      slug: "lap-dat-dien",
      title: "Lắp Đặt Điện Sập Tường Trang Trí Bảo Lộc",
      shortDescription: "Thi công luồn dập dây cơ điện nhà phố, rải led trang trí quán cafe khu vực Bảo Lộc, Lộc Phát, Đamb'ri.",
      fullDescription: `
        <h1>Thi Công Mạng Điện & Bóng Led Nghệ Thuật Cho Shop, Homestay Tại Bảo Lộc</h1>
        <p>Chúng tôi nhận lắp đặt điện sập tường, bóng âm thạch cao, led tạo khối lãng mạn cho các homestay tại Đại Lào, Lộc Châu, Lộc Sơn đạt tính nghệ thuật cao không dơ tường.</p>
      `,
      icon: "Lightbulb",
      category: "electrical",
      features: ["Rải led uốn dây mượt lãng mạn nghệ thuật", "Thiết kế tiết kiệm hao phí điện năng", "Thi công dọn dẹp sạch thạch cao"],
      pricing: [
        { item: "Kéo dây nguồn điện luồn ống nẹp PVC", price: "Từ 75.000đ", unit: "mét" },
        { item: "Lắp đèn chùm quạt trần quán trà tại Lộc Phát, Lộc Thanh", price: "Từ 250.000đ", unit: "bộ" }
      ]
    },
    {
      id: "e5",
      slug: "do-duong-dien-am-tuong",
      title: "Dò Tìm Vẽ Mạch Điện Âm Tường Bảo Lộc",
      shortDescription: "Phác họa vị trí rải nguồn điện ngầm trong bê tông phục vụ khoan đục nhà cửa an tâm ở Bảo Lộc.",
      fullDescription: `
        <h1>Dò Tìm Đường Điện Âm Tường Chuyên Nghiệp Bảo Lộc - Tránh Rủi Ro Khoan Trúng</h1>
        <p>Mỗi khi cơi nới xây dựng tại Lộc Tiến, Phường 2, việc khoan đụng trúng dây nguồn điện sống cực nguy hiểm tính mạng và chập nổ hệ thống lớn. Thợ cơ điện Lâm Đồng rà lập bản đồ nguồn điện âm tường chi tiết cam kết chính xác tuyệt đối.</p>
      `,
      icon: "Search",
      category: "electrical",
      features: ["Xác định chính xác dải dây nguồn", "An tâm sửa xây nhà tại Lộc Sơn, B'Lao", "Chỉ điểm dây mát dây nóng rõ ràng"],
      pricing: [
        { item: "Dò tìm dựng bản đồ mạch ranh tường", price: "Từ 300.000đ", unit: "phòng" }
      ]
    },
    {
      id: "p1",
      slug: "sua-nuoc",
      title: "Dịch Vụ Sửa Chữa Ống Nước Tại Bảo Lộc",
      shortDescription: "Sửa bục vỡ ống cấp thoát sương, vòi hoa sen gãy, bồn cầu rỉ tràn nước xi-phông tại Bảo Lộc.",
      fullDescription: `
        <h1>Thợ Sửa Nước Bảo Lộc - Khóa Van Bục Tiết Kiệm Từng Giọt Nước Sạch Lâm Đồng</h1>
        <p>Áp suất nước ngầm tại Lộc Phát, Đamb'ri thường phá hủy gioăng cao su, nứt dột gãy vòi nước bồn tiểu vệ sinh mốc ẩm dột chân nhà tại Bảo Lộc. Thợ sửa ống nước Bảo Lộc của Hoàng Tuấn MPE mang phụ tùng xử lý nhanh, giá rẻ.</p>
      `,
      icon: "Droplet",
      category: "plumbing",
      features: ["Khóa đầu rò gãy vòi mượt nhanh", "Vật liệu van đồng thau thau chống sét gỉ", "Vách rò bị hoai mốc chống dột triệt để"],
      pricing: [
        { item: "Tháo dỡ lắp đặt vòi đồng van inox khóa", price: "Từ 100.000đ", unit: "vòi" },
        { item: "Thông tắc bồn rửa thông xi phông nghẹt", price: "Từ 150.000đ", unit: "bộ" }
      ]
    },
    {
      id: "p3",
      slug: "lap-may-bom",
      order: 3,
      title: "Lắp Bơm Tăng Áp Tại Bảo Lộc",
      image: "/bom-ap.jpg",
      shortDescription: "Dịch vụ lắp đặt máy bơm tăng áp lực nước chính hãng, khắc phục triệt để nước yếu cho vòi sen, máy giặt, nhà tắm tại Bảo Lộc.",
      fullDescription: `
        <h1>Dịch Vụ Lắp Bơm Tăng Áp Tại Bảo Lộc Uy Tín, Chuyên Nghiệp</h1>
        <p>Hệ thống nước sinh hoạt của gia đình, homestay, hay quán cà phê của bạn tại Bảo Lộc đang gặp tình trạng yếu, vòi sen chảy rỉ rỉ, bình nóng lạnh không đủ áp lực hoặc máy giặt báo lỗi nguồn nước? Việc lắp đặt máy bơm tăng áp lực nước tự động, thông minh là giải pháp hoàn hảo và triệt để nhất.</p>
        
        <h2>Tại Sao Nên Lắp Bơm Tăng Áp Tại Thợ Nước Hoàng Tuấn?</h2>
        <p>Thợ nước Hoàng Tuấn chuyên cung cấp và lắp đặt các dòng máy bơm tăng áp thông minh, vận hành siêu tĩnh âm, không gây tiếng ồn tạch tạch khó chịu trong đêm khuya:</p>
        <ul>
          <li><strong>Khảo sát & tư vấn miễn phí:</strong> Đo áp lực nước thực tế và tư vấn loại máy bơm có công suất (W) phù hợp với nhu cầu sử dụng thực tế của gia đình bạn.</li>
          <li><strong>Sản phẩm chính hãng:</strong> Cung cấp máy bơm tăng áp Panasonic, Wilo, Hitachi, Hanil chính hãng, bảo hành dài hạn từ 12-24 tháng.</li>
          <li><strong>Vận hành siêu tĩnh âm:</strong> Lắp đặt dòng bơm tăng áp điện tử hoặc bơm biến tần thông minh tự điều chỉnh áp lực, hoạt động êm ái lý tưởng cho không gian yên tĩnh tại Bảo Lộc.</li>
          <li><strong>Thi công an toàn:</strong> Lắp đặt kèm rơ-le chống cạn, tủ điện hoặc CB (Aptomat) chống giật để đảm bảo an toàn tuyệt đối cho người dùng và thiết bị trong điều kiện độ ẩm cao.</li>
        </ul>

         <h2>Các Dịch Vụ Máy Bơm Chúng Tôi Cung Cấp:</h2>
        <ul>
          <li>Lắp đặt trọn gói máy bơm tăng áp bồn nước, tăng áp tầng áp mái, tăng áp riêng cho bình nóng lạnh, vòi sen, máy giặt.</li>
          <li>Sửa chữa máy bơm tăng áp bị kêu tạch tạch liên tục, rò rỉ nước ở đầu máy hoặc rò rỉ điện ra vỏ.</li>
          <li>Thay thế rơ-le cơ bằng rơ-le điện tử thông minh chống ồn hoàn toàn.</li>
          <li>Xử lý sự cố máy bơm chạy liên tục không ngắt hoặc không hoạt động khi mở vòi nước.</li>
        </ul>
      `,
      icon: "Wrench",
      category: "plumbing",
      features: [
        "Bơm tăng áp điện tử siêu êm không ồn",
        "Thương hiệu Panasonic, Wilo chính hãng",
        "Tự động ngắt khi mất nước để bảo vệ máy",
        "Lắp đặt kèm CB chống giật an toàn tuyệt đối"
      ],
      pricing: [
        { item: "Lắp máy bơm tăng áp điện tử mới", price: "Từ 350.000đ", unit: "bộ" },
        { item: "Lắp máy bơm biến tần thông minh", price: "Từ 500.000đ", unit: "bộ" },
        { item: "Sửa máy bơm tăng áp, thay rơ-le", price: "Từ 150.000đ", unit: "máy" },
        { item: "Lắp phao điện tự ngắt tự động", price: "Từ 250.000đ", unit: "bộ" }
      ]
    },
    {
      id: "p2",
      slug: "sua-ro-ri-nuoc",
      title: "Sửa Rò Rỉ Nước Ngầm Tại Bảo Lộc",
      shortDescription: "Định vị và vá vết nứt gãy sập ống nước nhựa PPR ngầm dưới đất tại Lâm Đồng.",
      fullDescription: `
        <h1>Sửa Rò Rỉ Nước Ngầm Tại Bảo Lộc - Bảo Vệ Nền Móng Căn Nhà An Toàn</h1>
        <p>Tình trạng sụt trượt đất khu vực Đại Lào, Lộc Châu liên tục xô lệch ống cấp nước PPR sinh rò rỉ âm đất dột móng. Thợ Hoàng Tuấn hàn nhiệt ống PPR, xử lý chống thấm dột nền móng chuẩn chỉnh bảo vệ đất vườn nhà.</p>
      `,
      icon: "Droplet",
      category: "plumbing",
      features: ["Hàn dán ống chịu lực nhiệt độ cao", "Trả lại đất nén vững chãi chân ranh", "Phát hiện chặn hóa đơn nước tiền triệu"],
      pricing: [
        { item: "Khắc phục bục ống nước cất lộ thiên", price: "Từ 150.000đ", unit: "điểm" },
        { item: "Gia cố dán keo ống chịu tải PPR dột ngầm", price: "Khảo sát miễn phí – Báo giá tại chỗ", unit: "điểm" }
      ]
    },
    {
      id: "p4",
      slug: "sua-ong-nuoc-am",
      title: "Sửa Ống Nước Âm Vách Thạch Cao Bảo Lộc",
      shortDescription: "Gia công bọc vành chịu lực ống nhiệt vách nhà tắm, ngăn nước sương thấm tường nốt dột sũng nước.",
      fullDescription: `
        <h1>Thợ Chuyên Sửa Ống Nước Đi Âm Vách Thạch Cao Bê Tông Chất Lượng Bảo Lộc</h1>
        <p>Vách bê tông ẩm ướt tại khu vực Bảo Lộc dễ làm mục hoặc bục gãy ren các chỗ nối tê chữ T trong hệ thống phân nước nhà. Hoàng Tuấn nén keo silicon, hàn ống nhiệt PPR chịu lực mướt mượt móng vững lâu dài.</p>
      `,
      icon: "Hammer",
      category: "plumbing",
      features: ["Dò chuẩn bục nứt khít chuẩn không sai", "Vật liệu Bình Minh PPR chính hiệu bền lỳ", "Trát hồ vữa dán gạch khít như cũ"],
      pricing: [
        { item: "Hàn nhiệt ống bọc kín vách âm tường", price: "Từ 200.000đ", unit: "điểm" }
      ]
    },
    {
      id: "p5",
      slug: "lap-dat-thiet-bi-nuoc",
      title: "Lắp Đặt Thiết Bị Vệ Sinh Giá Rẻ Bảo Lộc",
      shortDescription: "Lắp đặt ráp bồn vệ sinh, lavabo cao cấp, sen cây tắm ấm nóng chính hiệu cho bà con Bảo Lộc.",
      fullDescription: `
        <h1>Thợ Thiết Kế Thi Công Ráp Thiết Bị Vệ Sinh Nước Sạch Homestay Bảo Lộc</h1>
        <p>Gắn bồn rửa bồn tắm vòi tắm thư giãn nghỉ ngơi giữa lòng đồi Bảo Lộc. Dịch vụ Hoàng Tuấn MPE lắp đặt thiết bị vệ sinh nhập khẩu chiết khấu cho khách hàng, gia cố không rêu mốc bảo hành uy tín tận dốc nhà bạn.</p>
      `,
      icon: "Settings",
      category: "plumbing",
      features: ["Lắp thẩm mỹ cực cao kín tuyệt đối gián bọ", "Phù hợp phong thủy gia chủ Lâm Đồng", "Tặng kèm khóa phụ lọc cặn giếng đào"],
      pricing: [
        { item: "Lắp bồn cầu sứ / chậu treo Lavabo", price: "Từ 250.000đ", unit: "bộ" },
        { item: "Lắp đặt bình nóng lạnh tại Đamb'ri, Lộc Nga", price: "Từ 300.000đ", unit: "máy" }
      ]
    },
    {
      id: "c1",
      slug: "lap-camera",
      order: 2,
      title: "Lắp Đặt Hệ Thống Camera Bảo Lộc Trọn Gói",
      image: "/images/camera-.png",
      shortDescription: "Giải pháp lắp đặt camera an ninh Bảo Lộc giám sát khu vực Lộc Phát, Đamb'ri rõ như ban ngày 24/24.",
      fullDescription: `
        <h1>Lắp Đặt Camera Bảo Lộc - Bảo Vệ Biệt Thự, Quán Cafe Tại Bảo Lộc Chu Đáo</h1>
        <p>Lâm Đồng mưa dầm sương dốc che lấp tầm nhìn biệt thự hay nhà xưởng. Hoàng Tuấn thiết lập cấu hình mắt camera chống nước IP67 Ezviz góc rộng 360 xoay chuyển theo dáng người gửi còi báo động trực tiếp điện thoại.</p>
      `,
      icon: "Video",
      category: "camera",
      features: ["Mắt hồng ngoại rọi thấu khu vực thiếu sáng", "Bộ nhớ lưu trữ an ninh mã hóa dữ liệu cao", "Cài app xem từ xa mượt không trễ dòng"],
      pricing: [
        { item: "Công đi dây ráp mắt camera lên trần dốc", price: "Từ 150.000đ", unit: "mắt" }
      ]
    },
    {
      id: "c2",
      slug: "sua-camera",
      title: "Dịch Vụ Sửa Camera Bị Lỗi Mất Hình Bảo Lộc",
      shortDescription: "Khắc phục lỗi đơ hình, camera rách sương đứt dây, cháy nguồn đầu ghi camera Bảo Lộc.",
      fullDescription: `
        <h1>Thợ Sửa Hệ Thống Camera Bảo Lộc Sửa Nhanh Tại Nhà Lấy Liền An Tâm</h1>
        <p>Thời tiết sương ẩm và bụi bẩn dễ làm hư phích nguồn dẹt tiếp điện hoặc sập modem wifi. Chúng tôi thay dây bọc dẻo cách điện, khôi phục sóng định cấu hình hệ thống camera gia đình Bảo Lộc khôi phục an ninh.</p>
      `,
      icon: "Wrench",
      category: "camera",
      features: ["Bắt đúng bệnh đo mạch thắt dây loáng", "Hồi phục dữ liệu cũ trong ổ ghi", "Sửa gấp trong ngày cho quán trà sả"],
      pricing: [
        { item: "Kiểm tra xử lý tín hiệu lỗi sập dây nguồn", price: "Từ 150.000đ", unit: "mắt" }
      ]
    },
    {
      id: "c3",
      slug: "camera-gia-dinh",
      title: "Camera Gia Đình Wifi Chống Trộm Bảo Lộc",
      shortDescription: "Lắp đặt camera wifi không cần đục lỗ kéo cáp lòng vòng tại Lộc Châu, Đại Lào.",
      fullDescription: `
        <h1>Lắp Camera Gia Đình Tại Bảo Lộc - Trò Chuyện Con Nhỏ Giám Sát Cổng Rào</h1>
        <p>Tăng cường bảo hộ gia đình với camera wifi đàm thoại 2 chiều ấm giọng, rà soát an ninh khu vực Đại Lào, Lộc Châu. Thương hiệu Ezviz Imou phân phối sỉ lẻ giá cực rẻ lắp đặt lấy ngay tại Lâm Đồng bảo hành điện tử chính hiệu.</p>
      `,
      icon: "Video",
      category: "camera",
      features: ["Nhận diện người chuyển động bằng AI", "Đàm thoại hai chiều ấm áp thanh âm", "Thẩm mỹ tinh tế treo vách nhỏ gọn"],
      pricing: [
        { item: "Giá thiết bị (chính hãng)", price: "Từ 850.000đ", unit: "mắt" },
        { item: "Công lắp đặt + đi dây", price: "Từ 150.000đ", unit: "mắt" },
        { item: "Tổng chi phí dự kiến từ", price: "Từ 1.000.000đ", unit: "mắt", isTotal: true }
      ]
    },
    {
      id: "c4",
      slug: "camera-cua-hang",
      title: "Lắp Camera Quản Lý Cửa Hàng Chè Bảo Lộc",
      shortDescription: "Camera thu tiếng sột soạt, zoom hóa đơn góc thu tiền an tâm cho shop Bảo Lộc.",
      fullDescription: `
        <h1>Lắp Hệ Thống Camera Cửa Hàng Siêu Sắc Nét Chống Thất Thoát Ở Bảo Lộc</h1>
        <p>Tối ưu hóa quản lý quán trà, spa, hiệu thuốc dốc phố Bảo Lộc. Hoàng Tuấn bố trí luồng camera đầu ghi trung tâm siêu bền quay quét chi tiết tiền quầy thu ngân và khu vực bãi đỗ xe khách, bảo an chu đáo dọn sạch lo lắng.</p>
      `,
      icon: "Video",
      category: "camera",
      features: ["Quản lý từ xa sếp xem qua điện thoại mượt", "Ghi âm mic thu thanh cao vách thu ngân", "Bảo trì trọn gói miễn phí bảo dưỡng"],
      pricing: [
        { item: "Hệ thống đầu ghi Hikvision trọn gói", price: "Báo giá theo gói", unit: "bộ" }
      ]
    },
    {
      id: "c5",
      slug: "camera-nang-luong-mat-troi",
      order: 4,
      title: "Lắp Camera Năng Lượng Mặt Trời Rẫy Vườn Bảo Lộc",
      image: "/images/imou-ngoai-troi.jpg",
      shortDescription: "Giải pháp giám sát rẫy sầu riêng, cà phê Bảo Lộc từ xa bằng pin mặt trời tự sạc, SIM 4G ổn định.",
      fullDescription: `
        <h1>Lắp Đặt Camera Năng Lượng Mặt Trời Bảo Lộc - Trông Coi Rẫy Cà Phê Sầu Riêng An Tâm</h1>
        <p>Các khu vực nông trại tại Đamb'ri, Lộc Phát hay rẫy sầu riêng vườn bơ tại Bảo Lâm, Di Linh thường xa nguồn lưới điện và mạng Internet dây. Dịch vụ Hoàng Tuấn lắp đặt camera năng lượng mặt trời tích hợp SIM 4G chuyên dụng với pin dung lượng cao, tự sạc đầy từ ánh sáng tự nhiên, giúp quý khách trông coi rẫy rừng bất kể thời tiết phức tạp.</p>
      `,
      icon: "Video",
      category: "camera",
      features: ["Tự cấp nguồn từ ánh nắng khu vực đồi núi 365 ngày", "Tích hợp thẻ SIM 4G phát sóng mạnh mẽ từ xa", "Chống bụi chống sương bão sấm sét hoàn hảo IP67"],
      pricing: [
        { item: "Giá thiết bị (chính hãng)", price: "Từ 2.450.000đ", unit: "bộ" },
        { item: "Công lắp đặt + đi dây", price: "Từ 150.000đ", unit: "bộ" },
        { item: "Tổng chi phí dự kiến từ", price: "Từ 2.600.000đ", unit: "bộ", isTotal: true }
      ]
    },
    {
      id: "d1",
      slug: "do-ro-ri-nuoc",
      title: "Dò Tìm Rò Rỉ Nước Siêu Âm Bảo Lộc",
      image: "/images/sieu-am-do-tim-ong-vo.png",
      shortDescription: "Siêu âm tìm ống nước vỡ ngầm tại Lộc Sơn, Phường 1 chính xác từng vạch cát.",
      fullDescription: `
        <h1>Dò Tìm Rò Rỉ Nước Sạch Tại Bảo Lộc Bằng Sóng Siêu Âm Công Nghệ Đức</h1>
        <p>Hóa đơn cấp nước sạch tăng phi mã sụt lún sạt trượt góc nền là thảm họa ngầm rò nước Bảo Lộc. Hoàng Tuấn rà rà mặt xi măng dùng thiết bị phát sóng đo biên độ âm nứt ống nước rách rò, định điểm rách chính xác tuyệt nhiên không đập phá.</p>
      `,
      icon: "Search",
      category: "detection",
      features: ["Thiết bị PQWT Đức siêu âm nhạy xuyên nền", "Bảo vệ móng công trình tại Lộc Phát", "Hạn chế đập tối đa giữ nguyên móng xây"],
      pricing: [
        { item: "Siêu âm dò tìm rò rỉ nhà dân Bảo Lộc", price: "Từ 500.000đ", unit: "lần" }
      ]
    },
    {
      id: "d2",
      slug: "sieu-am-do-ong-am",
      title: "Siêu Âm Tìm Đường Ống Nước Bục Vỡ Bảo Lộc",
      shortDescription: "Rà định vị vết nứt dột ngầm ống dẫn nước cứu hỏa xưởng chè Bảo Lộc.",
      fullDescription: `
        <h1>Dịch Vụ Siêu Âm Rà Ống Nước Bị Nứt Bục Ngầm Dưới Lớp Bê Tông Bảo Lộc</h1>
        <p>Xưởng chế biến, lò sấy tại Lộc Nga, Đại Lào có hệ thống ống phòng cháy chữa cháy âm đất dễ bị ăn mòn rỉ tràn gây sụt áp liên tục. Chúng tôi rà siêu cảm biến định danh khuyết tật rạn vỡ ống dột ngầm loáng cái sửa xong.</p>
      `,
      icon: "Search",
      category: "detection",
      features: ["Thiết bị Đức rọi sâu 2 mét dưới gạch đá", "Rà điểm nứt cực khít tránh rủi ro sạt đất", "Phát hành văn bản đo đạc đúng chuẩn"],
      pricing: [
        { item: "Rà ống cứu hỏa nhà xưởng Bảo Lộc", price: "Khảo sát miễn phí – Báo giá tại chỗ", unit: "lần" }
      ]
    },
    {
      id: "d3",
      slug: "do-duong-nuoc-am",
      title: "Vẽ Sơ Đồ Hệ Thống Cấp Nước Ngầm Bảo Lộc",
      shortDescription: "Vẽ bản vẽ cấp thoát nước giếng khoan tại Lộc Phát, Đamb'ri giúp gia chủ Bảo Lộc sửa móng nhà.",
      fullDescription: `
        <h1>Dịch Vụ Dò Dựng Lập Sơ Đồ Ống Nước Âm Đất Tại Bảo Lộc</h1>
        <p>Tránh tối đa đục lầm khoan rách ống PPR chịu áp cao khi cất nhà xây thêm bờ kè tại Lộc Tiến, B'Lao. Đội thợ dò đường ống nước đo dòng chảy cảm nhiệt vẽ phác hoàn chỉnh toàn hệ thoát van giếng đào nhà gia chủ.</p>
      `,
      icon: "Search",
      category: "detection",
      features: ["Đảm bảo không tàn phá thạch cao móng nện", "Tạo lập sơ đồ sơ cấp thoát nước rõ nét", "Kỹ thuật bậc thợ cơ khí lành nghề"],
      pricing: [
        { item: "Dò thiết kế sơ đồ ranh ống nước ngầm", price: "Từ 300.000đ", unit: "lần" }
      ]
    },
    {
      id: "d4",
      slug: "kiem-tra-ro-ri-khong-duc-tuong",
      title: "Kiểm Tra Nội Soi Nước Rò Rỉ Bảo Lộc",
      shortDescription: "Nội soi đường cống thoát bể dột bằng camera siêu nhỏ đầu dò chống ẩm tại Bảo Lộc.",
      fullDescription: `
        <h1>Nội Soi Tổng Quát Hệ Thống Van Cấp Nước Chống Rò Rỉ Không Phá Tường Bảo Lộc</h1>
        <p>Cam kết công nghệ nội soi camera vách ống nước hiện đại dẹp đi lo âu rách bung đường dây trong tường toilet homestay Bảo Lộc. Kiểm tra dính mốc rêu mốc bộc lộ chỗ rỉ rạn đúng chuẩn kỹ thuật đô thị hữu dưỡng.</p>
      `,
      icon: "ShieldCheck",
      category: "detection",
      features: ["Camera nội soi uốn vi khe hẹp ống thoát", "Máy nén khí tạo bọt rà rỉ chân ống", "Bảo dưỡng rêu nấm mốc đen sàn tắm"],
      pricing: [
        { item: "Nội soi tổng thể chuẩn bệnh ống nước", price: "Từ 400.000đ", unit: "lần" }
      ]
    },
    {
      id: "sm1",
      slug: "cong-tac-cua-cuon-thong-minh",
      order: 5,
      title: "Công Tắc Cửa Cuốn Thông Minh Bảo Lộc",
      shortDescription: "Lắp đặt công tắc điều khiển cửa cuốn qua điện thoại thông minh, hẹn giờ đóng mở an toàn tại Bảo Lộc.",
      fullDescription: `
        <h1>Giải Pháp Công Tắc Cửa Cuốn Thông Minh Tiện Lợi & An Toàn Tại Bảo Lộc</h1>
        <p>Không cần bước xuống giường hay mang theo chìa khóa cơ vướng víu sương gió khi về nhà muộn tại Bảo Lộc. Công tắc cửa cuốn thông minh có kết nối Wi-Fi/Zigbee sẽ giúp bạn đóng mở cửa cuốn dễ dàng từ xa chỉ bằng 1 nút bấm trên smartphone.</p>
        <h2>Tính năng vượt trội cho ngôi nhà thông minh Bảo Lộc</h2>
        <ul>
          <li><strong>Hẹn giờ đóng ngắt tự động:</strong> Lên kịch bản tự khóa cửa lúc 22:00 tránh rủi ro quên đóng cửa.</li>
          <li><strong>Kiểm soát trạng thái thực:</strong> Biết chính xác cửa đang mở, đóng hay dừng trên ứng dụng di động dù ở bất cứ đâu.</li>
          <li><strong>An toàn cao:</strong> Kết hợp cùng các cảm biến vật cản dập khóa ngay lập tức khi phát hiện chướng ngại vật dưới chân cửa.</li>
        </ul>
      `,
      icon: "Cpu",
      category: "smarthome",
      features: ["Điều khiển từ xa bằng Smartphone 3G/4G/Wifi", "Hẹn giờ đóng mở tự động thông minh", "Nút bấm kính cường lực chống nước, chống xước"],
      pricing: [
        { item: "Bộ công tắc cảm ứng cửa cuốn thông minh", price: "Từ 850.000đ", unit: "bộ" },
        { item: "Dịch vụ lắp đặt đấu nối & hướng dẫn app", price: "Từ 200.000đ", unit: "bộ" }
      ],
      image: "/images/cua-cuon-thong-minh.png",
      gallery: [
        {
          type: 'video',
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          thumbnail: '/images/cua-cuon-thong-minh.png'
        },
        {
          type: 'image',
          url: '/images/cua-cuon-thong-minh.png'
        }
      ]
    },
    {
      id: "sm2",
      slug: "cong-tac-dien-thong-minh",
      title: "Công Tắc Điện Thông Minh Cảm Ứng Bảo Lộc",
      shortDescription: "Thiết kế mặt kính cảm ứng sang trọng, điều khiển hệ thống chiếu sáng từ xa qua smartphone.",
      fullDescription: `
        <h1>Lắp Đặt Hệ Thống Công Tắc Điện Thông Minh Sang Trọng Tại Bảo Lộc</h1>
        <p>Nâng cấp toàn diện cho ngôi nhà của bạn bằng giải pháp công tắc cảm ứng thông minh. Mặt kính cường lực tinh tế, kháng ẩm cực tốt tại môi trường ẩm ướt đặc trưng của Bảo Lộc Lâm Đồng. Điều khiển tắt mở đèn thuận tiện qua giọng nói và smartphone.</p>
        <h2>Ưu điểm của công tắc điện thông minh</h2>
        <ul>
          <li><strong>Rất an toàn:</strong> Thiết kế cách điện hoàn toàn, bạn hoàn toàn có thể bật tắt bằng tay ướt không sợ giật giật nhiễu nguồn.</li>
          <li><strong>Thẩm mỹ nổi bật:</strong> Mặt kính bọc cạnh đen/trắng sang trọng có đèn LED định vị ban đêm dịu dịu mắt.</li>
          <li><strong>Cấu hình kịch bản:</strong> Bật tắt tự động theo thời gian thực hoặc xâu chuỗi kịch bản bật rèn chiếu rọi lối đi khi đi làm về.</li>
        </ul>
      `,
      icon: "Lightbulb",
      category: "smarthome",
      features: ["Mặt kính cường lực sang trọng đẳng cấp", "Hỗ trợ điều khiển bằng giọng nói tiếng Việt", "Bảo hành 24 tháng hư hỏng đổi mới 1-1"],
      pricing: [
        { item: "Công tắc thông minh cảm ứng 1-4 nút bọc nhôm", price: "Từ 450.000đ", unit: "cái" },
        { item: "Công thợ đấu nối luồn dập đế dợ âm cũ", price: "Từ 100.000đ", unit: "nút" }
      ]
    },
    {
      id: "sm3",
      slug: "cam-bien-an-ninh-thong-minh",
      title: "Cảm Biến An Ninh Thông Minh Bảo Lộc (Sắp ra mắt)",
      shortDescription: "Hệ thống bảo vệ gia đình toàn diện khỏi đột nhập trái phép, rò rỉ khí gas tự động báo khẩn cấp.",
      fullDescription: `
        <h1>Giải Pháp Cảm Biến Khí Gas & Chống Đột Nhập Tự Động Bảo Lộc</h1>
        <p>Hệ thống cảm biến chuyển động hồng ngoại, cảm biến cửa mở chống cạy đột nhập, cảm biến nhiệt khói rò rỉ khí gas đang được cải tiến, tích hợp sâu lắp đặt chuẩn cho gia đình ở Bảo Lộc. Nội dung đang được cập nhật phát triển sắp ra mắt quý khách hàng.</p>
      `,
      icon: "ShieldCheck",
      category: "smarthome",
      features: ["Sắp ra mắt (Coming soon)", "Công nghệ cảm biến bảo mật cao", "Đầu thu trung tâm kết nối ổn định"],
      pricing: [
        { item: "Giải pháp an toàn cảm ứng thông minh", price: "Liên hệ để nhận báo giá", unit: "hệ thống" }
      ]
    },
    {
      id: "sm4",
      slug: "chieu-sang-va-giai-tri-thong-minh",
      title: "Giải Trí & Chiếu Sáng Thông Minh Bảo Lộc (Sắp ra mắt)",
      shortDescription: "Tự động hóa hệ thống rèm cửa, điều hòa, tivi kết hợp âm thanh đa vùng sống động.",
      fullDescription: `
        <h1>Điều Khiển Rèm Cửa - Điều Hòa Không Khí Tự Động Thông Minh Bảo Lộc</h1>
        <p>Chiếu sáng thích ứng nhịp điệu sinh học, đồng bộ rạp chiếu phim gia đình, tự động nâng rèm khi mặt trời lên rạng rỡ tại Lộc Thanh, Đamb'ri. Chúng tôi sẽ sớm ra mắt giải pháp tối ưu này tại Lâm Đồng trong thời gian tới.</p>
      `,
      icon: "Settings",
      category: "smarthome",
      features: ["Sắp ra mắt (Coming soon)", "Phong cách sống tiện nghi vượt bậc", "Tiết kiệm tối đa điện tiêu hao điều hòa"],
      pricing: [
        { item: "Gói tích hợp rèm điều hòa thông minh", price: "Liên hệ để nhận báo giá", unit: "gói" }
      ]
    },
    {
      id: "sol1",
      slug: "lap-den-pha-nang-luong-mat-troi",
      order: 1,
      title: "Lắp Đèn Pha Năng Lượng Mặt Trời Bảo Lộc",
      shortDescription: "Cung cấp, lắp đặt đèn pha LED năng lượng mặt trời siêu sáng, tự động bật tắt, chống nước bão sương tại Bảo Lộc.",
      fullDescription: `
        <h1>Lắp Đặt Đèn Pha LED Năng Lượng Mặt Trời Bảo Lộc - Chiếu Sáng Xanh Tiết Kiệm 100% Điện Năng</h1>
        <p>Bà con tại Bảo Lộc, Lâm Đồng thường sở hữu những mảnh vườn, trang trại đồi dốc dốc rộng lớn, hay biệt thự sân vườn tại Lộc Phát, Đamb'ri rộng lớn, nơi việc kéo đường dây điện 220V truyền thống vô cùng tốn kém chi phí thi công và tiềm ẩn nhiều rủi ro chập cháy, giật điện trong thời tiết sương ẩm, mưa dầm. Giải pháp lắp đặt đèn pha năng lượng mặt trời thông minh tự sạc chính là lựa chọn an toàn, hiện đại hàng đầu.</p>
        
        <h2>Tại Sao Nên Lắp Đèn Pha Năng Lượng Mặt Trời Tại Hoàng Tuấn MPE?</h2>
        <p>Chúng tôi cung cấp giải pháp lắp đặt đèn pha LED năng lượng mặt trời thế hệ mới của các hãng nổi tiếng như Jidian, Blue Carbon với độ bền vượt trội:</p>
        <ul>
          <li><strong>Không tốn tiền điện:</strong> Đèn hoàn toàn tự cấp 100% nguồn điện xanh từ ánh sáng tự nhiên thông qua tấm pin mặt trời cao cấp hiệu suất chuyển đổi cực lớn.</li>
          <li><strong>Chống chịu thời tiết IP67:</strong> Thân đèn đúc nhôm nguyên khối sơn tĩnh điện, kết hợp kính cường lực chịu áp cao và gioăng cao su khít bít ngăn hoàn toàn mưa sương sương mù đặc trưng Bảo Lộc thâm nhập.</li>
          <li><strong>Cảm biến ánh sáng thông minh:</strong> Đèn tự động tắt và sạc pin khi rạng đông, tự động bật sáng rực rỡ khi hoàng hôn buông xuống mà không cần con người tác động gạt gạt nút bấm.</li>
          <li><strong>Độ sáng bền bỉ, thời gian chiếu dài:</strong> Sử dụng pin lưu trữ Lithium sắt phosphat (LiFePO4) chống chai, duy trì chiếu rọi liên tục 12 - 15 giờ mỗi đêm kể cả những ngày trời Bảo Lộc nhiều mây ẩm sương.</li>
        </ul>

        <h2>Quy Trình Lắp Đặt Chuyên Nghiệp Từ Thợ Hoàng Tuấn:</h2>
        <p>Thợ Hoàng Tuấn MPE trực tiếp khảo sát góc đón nắng tại sân vườn hay rẫy của bạn tại Lâm Đồng, tư vấn công suất (W) phù hợp nhất, tiến hành gá cố định tấm pin chắc chắn chống gió bão dột rung lắc, căn chỉnh góc rọi tối ưu của đèn pha và bàn giao remote điều khiển hẹn giờ tiện lợi.</p>
      `,
      icon: "Sun",
      category: "solar",
      features: [
        "Không tốn một đồng tiền điện suốt đời sử dụng",
        "Tấm pin đa tinh thể (Poly) hiệu suất sạc siêu nhanh",
        "Vỏ nhôm đúc nguyên khối chuẩn chống nước IP67",
        "Pin Lithium LiFePO4 chống chai bùng nổ, sạc xả 2000 lần"
      ],
      pricing: [
        { item: "Đèn pha Solar LED Jidian 100W", price: "Từ 650.000đ", unit: "bộ" },
        { item: "Đèn pha Solar LED Jidian 200W", price: "Từ 750.000đ", unit: "bộ" },
        { item: "Đèn pha Solar LED Blue Carbon 300W", price: "Từ 1.150.000đ", unit: "bộ" },
        { item: "Đèn pha Solar LED Blue Carbon 500W", price: "Từ 1.650.000đ", unit: "bộ" },
        { item: "Công thợ gá lắp tấm pin, định vị đèn pha", price: "Từ 150.000đ", unit: "bộ" }
      ],
      benefits: [
        "Đèn sáng ổn định bất kể sự cố cúp điện lưới",
        "An toàn tuyệt đối cho người già, trẻ nhỏ khỏi lo giật điện",
        "Thợ Bảo Lộc thi công nhanh gọn, bảo hành uy tín 24 tháng"
      ],
      faq: [
        { question: "Đèn pha năng lượng mặt trời có sạc được vào ngày trời Bảo Lộc mưa sương mù không?", answer: "Có! Tấm pin công nghệ đa tinh thể cao cấp của chúng tôi vẫn hấp thụ tia cực tím và sạc yếu vào những ngày nhiều mây hoặc sương mù nhẹ, đảm bảo đèn vẫn duy trì sáng dịu nhẹ ban đêm." },
        { question: "Tôi có được tự lắp đặt để tiết kiệm chi phí không?", answer: "Có, đèn pha đi kèm đầy đủ bát treo, ốc vít và remote điều khiển từ xa. Quý khách hoàn toàn có thể tự gá lắp tại nhà. Tuy nhiên, nếu cần lắp trên cao hoặc vườn rẫy diện tích lớn đón hướng nắng phức tạp, hãy để thợ Hoàng Tuấn hỗ trợ để tấm pin đón nắng tốt nhất." }
      ]
    },
    {
      id: "sol2",
      slug: "lap-den-duong-nang-luong-mat-troi",
      order: 2,
      title: "Lắp Đèn Đường Năng Lượng Mặt Trời Bảo Lộc",
      shortDescription: "Thi công đèn đường năng lượng mặt trời chiếc lá, đèn bàn chải siêu sáng cho ngõ hẻm, lối đi, rẫy vườn Bảo Lộc.",
      fullDescription: `
        <h1>Lắp Đặt Đèn Đường Năng Lượng Mặt Trời Bảo Lộc - Giải Pháp Sáng Sân Lối Đi Không Lo Hóa Đơn Điện</h1>
        <p>Hệ thống đèn đường ngõ hẻm công cộng, đường đi chung homestay, hoặc đường dẫn quanh rẫy rẫy cà phê sầu riêng tại Bảo Lộc thường thiếu ánh sáng về đêm gây bất tiện cho đi lại và mất an ninh trật tự. Việc lắp ráp đèn đường năng lượng mặt trời độc lập không cần đi dây điện luồn ống nẹp phức tạp là giải pháp tối ưu và tiết kiệm chi phí xây lắp nhất.</p>
        
        <h2>Các Dòng Đèn Đường Năng Lượng Mặt Trời Được Ưa Chuộng:</h2>
        <ul>
          <li><strong>Đèn chiếc lá Solar:</strong> Thiết kế thon gọn hình chiếc lá tối ưu hóa góc chiếu sáng rộng, thấu kính lồi rọi rực sáng dải đường đi, chất liệu nhôm đúc cực bền.</li>
          <li><strong>Đèn đường bàn chải liền thể:</strong> Tích hợp sẵn tấm pin sạc ở mặt lưng cực kỳ gọn gàng, có cảm biến chuyển động tiện dụng.</li>
          <li><strong>Đèn đĩa bay UFO Solar 360 độ:</strong> Chiếu tỏa tròn đều mọi hướng, phù hợp lắp đặt giữa sân nhà hay khuôn viên Homestay nghỉ dưỡng.</li>
        </ul>

        <h2>Tính Năng Cảm Biến Chuyển Động Hồng Ngoại Thông Minh:</h2>
        <p>Đèn đường lắp đặt tại lối đi thường tích hợp cảm biến radar thông minh: Tự động sáng dịu 30% công suất khi không có người qua lại để tiết kiệm tối đa pin sạc, và ngay lập tức bộc phát sáng rực 100% công suất cực đại khi phát hiện chuyển động của người hoặc xe trong bán kính 8-10 mét. Giúp nâng cao hiệu quả đuổi trộm và kéo dài thời gian phát sáng lên tới 2-3 đêm mưa liên tục.</p>
      `,
      icon: "Sun",
      category: "solar",
      features: [
        "Cảm biến chuyển động hồng ngoại tự động điều tiết ánh sáng",
        "Lắp ráp độc lập trên cột thép hoặc treo vách tường cực lẹ",
        "Thời gian chiếu sáng xuyên đêm từ 12 đến 16 tiếng",
        "Thân đèn đúc hợp kim chống rỉ sét muối sương"
      ],
      pricing: [
        { item: "Đèn đường chiếc lá Solar 100W", price: "Từ 850.000đ", unit: "bộ" },
        { item: "Đèn đường chiếc lá Solar 200W", price: "Từ 1.050.000đ", unit: "bộ" },
        { item: "Đèn đường chiếc lá Solar 300W", price: "Từ 1.150.000đ", unit: "bộ" },
        { item: "Đèn đường bàn chải liền thể UFO 400W", price: "Từ 1.350.000đ", unit: "bộ" },
        { item: "Trụ thép gắn đèn đường sấy tĩnh điện cao 3m", price: "Từ 450.000đ", unit: "trụ" },
        { item: "Công thợ chôn móng bê tông dựng trụ gá đèn", price: "Từ 250.000đ", unit: "trụ" }
      ],
      benefits: [
        "Làm đẹp và sáng ngõ đi chung an lành cho xóm trà Bảo Lộc",
        "Lắp đặt hoàn toàn độc lập, không sợ sấm sét chập nguồn mùa mưa",
        "Sản phẩm bảo hành chính hãng đổi mới 1-1 nhanh gọn tận nơi"
      ]
    }
  ],
  'ho-chi-minh': [
    {
      id: "e1",
      slug: "sua-dien",
      title: "Thợ Sửa Điện TPHCM 24/7 Quận Huyện",
      shortDescription: "Thợ điện tphcm túc trực sửa mất điện đột ngột, chập tủ nguồn hệ thống cao ốc chung cư Sài Gòn.",
      fullDescription: `
        <h1>Sửa Điện TP.HCM - Thợ Sửa Điện Nước Gần Bạn Nhất Có Mặt Ngay Để Phục Vụ 24H</h1>
        <p>Sài Gòn bước vào chu kỳ nắng nóng gay gắt làm hệ thống quạt hơi quạt sấy máy điều hòa tòa nhà hoạt động căng quá mức gây nhảy sập sập CB thạch cao của chung cư. Thợ sửa điện nước tphcm dập tắt dập nguồn chập nổ nhanh gọn.</p>
        
        <h2>Tại sao thợ điện tphcm Hoàng Tuấn MPE được cư dân tin cậy?</h2>
        <ul>
          <li><strong>Mật độ thợ phủ rộng:</strong> Phân chia chốt trực tại quận 1, quận 7, gò vấp, bình thạnh, thủ đức.</li>
          <li><strong>Giá chuẩn đô thị Sài Gòn:</strong> Trừ bỏ nỗi muộn phiền chặt giá thét chặt ví về đêm khuya của các đội tự phát bợm bãi.</li>
          <li><strong>Kỹ sư bách khoa vững chuyên môn:</strong> Vẽ chuẩn sơ đồ tải Cadivi, rải điện đúng mác an toàn của sở cứu hỏa PCCC.</li>
        </ul>

        <h2>Các dịch vụ sửa điện dân dụng chuyên sâu tại TP.HCM</h2>
        <p>Nhận khắc phục nhanh chập điện hư ổ chìm rò tủ điện thạch cao, thay aptomat chống điện giật xối lavabo, sửa điện xưởng làm bánh kẹo cơ khí, lắp mâm bóng chiếu sáng MPE nghệ thuật chu đáo.</p>
      `,
      icon: "Zap",
      category: "electrical",
      features: ["Kỹ sư giỏi TP.HCM túc trực tại quận", "Báo giá dạng văn bản hóa đơn VAT điện tử nhanh", "Linh kiện Cadivi MPE Panasonic chính hiệu"],
      pricing: [
        { item: "Khảo sát báo giá lập hồ sơ sửa điện hcm", price: "Khảo sát Miễn Phí", unit: "lần" },
        { item: "Khắc phục chập cháy nổ tủ điện ba pha", price: "Từ 150.000đ", unit: "vụ" },
        { item: "Gia cố bó dây luồn ruột gà sắt chung cư", price: "Từ 200.000đ", unit: "nhánh" }
      ],
      benefits: ["Cam kết mặt phẳng thẩm mỹ khít sạch trần nhà", "Hậu mãi điện tử quét QR tiện lợi", "Cứu nguy ban đêm 24H cấp tốc"],
      faq: [
        { question: "Có sửa điện cho nhà trọ sinh viên Gò Vấp giá rẻ?", answer: "Có! Chúng tôi hỗ trợ mức giá sinh viên dọn trọ sửa lẻ hỗ trợ nhân sinh Sài Gòn tốt nhất." }
      ]
    },
    {
      id: "e2",
      slug: "sua-chap-dien",
      title: "Sửa Chập Điện TPHCM Dò Máy Hộp Từ",
      shortDescription: "Rà quét sóng nổ âm tường sập CB an toàn tuyệt đối 100% tại chung cư căn hộ TP.HCM.",
      fullDescription: `
        <h1>Sửa Chập Điện Âm Tường Sài Gòn - Thợ Chuyên Máy Quét Định Vị Sự Cố Siêu Tốc</h1>
        <p>Tòa nhà cao tầng gác lửng HCM liên kết chập chéo chùm dây điện dễ sinh quá nhiệt cháy lan nách vách tôn thạch cao lửng. Thợ Hoàng Tuấn dùng máy quét dòng rò kiểm soát cách ly điểm chập nổ tphcm cứu nguy dứt điểm.</p>
      `,
      icon: "ShieldCheck",
      category: "electrical",
      features: ["Cách ly đoạn chập trong 15 phút rà", "Tránh rủi ro cháy nổ lan truyền chung cư", "Vẽ lại hộp cáp an toàn thẩm mỹ"],
      pricing: [
        { item: "Phát hiện chặn lò nổ chập tủ điện tphcm", price: "Từ 200.000đ", unit: "vụ" }
      ]
    },
    {
      id: "e3",
      slug: "sua-aptomat",
      title: "Thay Aptomat CB Chống Giật TP.HCM",
      shortDescription: "Thay aptomat Panasonic, Schneider chịu tải điều hòa hầm nóng, mâm bếp từ Quận 7, Gò Vấp.",
      fullDescription: `
        <h1>Kho Thay CB Aptomat Chống Rò Chống Điện Giật Sài Gòn Hàng Ngày Đêm</h1>
        <p>CB cũ rỉ hoặc hư cơ sập tải gây mất điện hầm nóng làm ngột ngạt chung cư TP.HCM. Hoàng Tuấn thay aptomat Panasonic chính phẩm lắp đặt dây đất bảo bảo vệ dòng sục điện lavarbo tắm rửa dứt điểm nhảy lầm.</p>
      `,
      icon: "Settings",
      category: "electrical",
      features: ["Linh kiện ngắt tự động chính gốc châu Âu", "Tư vấn công suất theo am-pe kìm chuẩn", "Lắp đặt kỹ lưỡng giấu phích thẩm mỹ"],
      pricing: [
        { item: "Thay mâm CB đơn Panasonic an toàn hcm", price: "Từ 80.000đ", unit: "bộ" },
        { item: "Lắp CB chống ngắt giật điện sục nhà tắm", price: "Từ 180.000đ", unit: "cái" }
      ]
    },
    {
      id: "e4",
      slug: "lap-dat-dien",
      title: "Lắp Hệ Thống Điện Trực Văn Phòng TPHCM",
      shortDescription: "Thi công hộp nẹp nẹp nguồn điện luống cáp, trang trí led shop thời trang Quận 1 TP.HCM.",
      fullDescription: `
        <h1>Thi Công Điện MPE Lắp Đèn Led Trần Thạch Cao Công Ty Tại TP. Hồ Chí Minh</h1>
        <p>Cung cấp nhóm kỹ sư rải cáp mạng LAN sập nguồn, led mâm thả quán trà sữa, spa làm đẹp sầm uất Quận 1, Quận 3, rải bóng pha ngoài trời nhà xưởng Tân Bình mượt mà thẩm mỹ dọn dẹp cực ngăn nắp sạch trơn bụi thạch cao.</p>
      `,
      icon: "Lightbulb",
      category: "electrical",
      features: ["Gọn gàng đáp ứng tiêu chuẩn văn phòng hạng A", "Chiết khấu vật tư MPE Panasonic cao nhất lẻ", "Hoàn công dọn dẹp sạch thạch cao lau bụi"],
      pricing: [
        { item: "Kéo dây mâm phao led nẹp cáp dẹp phẳng", price: "Từ 75.000đ", unit: "mét" },
        { item: "Lắp quạt trần quạt đảo hút khói bếp hcm", price: "Từ 250.000đ", unit: "con" }
      ]
    },
    {
      id: "e5",
      slug: "do-duong-dien-am-tuong",
      title: "Dò Tìm Cáp Điện Âm Trần Nhà Sài Gòn",
      shortDescription: "Rà định dải cáp nguồn sập sập âm thạch cao sàn bê tông phục vụ sửa chữa chung cư HCM.",
      fullDescription: `
        <h1>Dò Tìm Đường Dây Điện Đi Âm Tường Sàn Bê Tông Quận 1, Quận 7, Gò Vấp</h1>
        <p>Hỗ trợ rà quét định vị mạch điện âm bê tông tránh khoan bừa trúng dây nguồn gây tai nạn cháy nổ dột sương phòng làm việc Sài Gòn. Sử dụng kỹ thuật số hóa định tần số an tâm sửa cơi sàn nhà.</p>
      `,
      icon: "Search",
      category: "electrical",
      features: ["Cam kết chính xác không khoan sai bể gạch", "Dựng bản họa đồ dây nguồn tổng an toàn", "Thiết bị rọi thấu tầng thạch cao xối nền"],
      pricing: [
        { item: "Rà quét cáp điện âm sàn chung cư tphcm", price: "Từ 300.000đ", unit: "phòng" }
      ]
    },
    {
      id: "p1",
      slug: "sua-nuoc",
      title: "Thợ Sửa Ống Nước Sài Gòn Phục Vụ 24H",
      shortDescription: "Sửa vòi sen gãy kẹt ren, bồn nước tràn phao cơ, sửa bồn cầu rỉ nước xối xả thất thoát tphcm.",
      fullDescription: `
        <h1>Thợ Sửa Nước TP.HCM - Xử Lý Nút Gãy Van Khóa Khẩn Cấp Báo Giá Chuẩn Đô Thị</h1>
        <p>Ống nước cũ mục gỉ gỉ chân lavabo rỉ giọt nước dột thạch cao căn hộ tầng dưới gây mâu thuẫn láng giềng tphcm. Thợ nước mang kìm van chuyên dụng bọc ống kẽm thay PPR dẻo khít mướt bền bỉ dọn dẹp vệ sinh sạch.</p>
      `,
      icon: "Droplet",
      category: "plumbing",
      features: ["Có mặt sau 15 phút dập van tổng khẩn", "Thay thế đầu cao su van đổng chống chịu áp", "Sửa trơn chu bồn xả vệ sinh toilet rò rỉ"],
      pricing: [
        { item: "Thay vòi gãy mâm sen chậu lavabo bát", price: "Từ 100.000đ", unit: "cái" },
        { item: "Thông tắc bồn rửa thông xi phông nghẹt", price: "Từ 150.000đ", unit: "vụ" }
      ]
    },
    {
      id: "p3",
      slug: "lap-may-bom",
      title: "Lắp Bơm Tăng Áp Cho Gia Đình Tại TP.HCM",
      shortDescription: "Lắp máy bơm tăng áp bồn nước chung cư mini, vòi sen sủi bọt, thiết bị vệ sinh Sài Gòn.",
      fullDescription: `
        <h1>Tư Vấn Lắp Ráp Máy Bơm Tăng Áp Khỏe Áp Suất Nước TP.HCM</h1>
        <p>Căn hộ chung cư mini hoặc phòng trọ ở Sài Sòn có áp suất nước rỉ rỉ không đủ chạy máy giặt, chảy bồn sen tắm rít? Hoàng Tuấn nhận lắp máy bơm tăng áp điện tử Panasonic, Wilo không phát tiếng ồn lớn, cấp nước dạt dào, vận hành êm ru trong đêm tối.</p>
      `,
      icon: "Wrench",
      category: "plumbing",
      features: ["Bơm tăng áp điện tử êm ái xả dạt dào", "Nhập khẩu chính gốc bảo trì tận nhà", "Lắp đặt CB chống giật rò nước"],
      pricing: [
        { item: "Ráp tủ điều bơm tăng áp tự động điện tử", price: "Từ 300.000đ", unit: "máy" },
        { item: "Bảo dưỡng sửa máy bơm, rơ-le điện hcm", price: "Từ 200.000đ", unit: "bộ" }
      ]
    },
    {
      id: "p2",
      slug: "sua-ro-ri-nuoc",
      title: "Sửa Rò Rỉ Nước Ngầm Nhà Phố Sài Gòn",
      shortDescription: "Xử lý bục vỡ ống cấp nước PPR nứt dột ngầm sụt móng rêu phong Gò Vấp Quận 7.",
      fullDescription: `
        <h1>Sửa Chữa Đường Ống Nước Bị Rò Rỉ Ngầm Trong Lòng Đất Nhà Phố TP.HCM</h1>
        <p>Nền đất HCM lún đầm dột sạt móng dễ xô gãy ống nước ngầm dẫn từ đồng hồ vào bể chứa lửng Sài Gòn. Hoàng Tuấn đào mở gọn vuông vắn rải lại PPR uốn góc linh hoạt chịu sức nặng sạt móng lâu bền.</p>
      `,
      icon: "Droplet",
      category: "plumbing",
      features: ["Hàn đắp nhiệt dẻo PPR chịu lực hoàn hảo", "Chống dột nứt chân công trình cao tầng", "Tiết kiệm tiền nước sạch thoát rò rỉ"],
      pricing: [
        { item: "Xử lý bục vỡ rò ống nổi lộ thiên hcm", price: "Từ 150.000đ", unit: "điểm" },
        { item: "Keo gia cố ống âm dầm nền nhà vệ sinh", price: "Cụ thể khảo sát", unit: "vụ" }
      ]
    },
    {
      id: "p4",
      slug: "sua-ong-nuoc-am",
      title: "Sửa Ống Nước Âm Bê Tông Trần Sài Gòn",
      shortDescription: "Gia cố cổ ống xuyên sàn dột nách tường mốc meo nấm bám trần nhà chung cư TP.HCM.",
      fullDescription: `
        <h1>Thợ Chuyên Sửa Chữa Khắc Phục Lỗi Bục Ống Nước Âm Sàn Bê Tông TP.HCM</h1>
        <p>Toilet chung cư dột loang lổ mốc vàng trần phòng khách căn hộ dưới cực phiền hà Sài Gòn. Hoàng Tuấn đục trám lót thảm sika chống thấm, rải măng xông khớp chịu ren bít chặt rò rỉ bền bỉ vĩnh viễn dọn sạch trơn bẩn bụi.</p>
      `,
      icon: "Hammer",
      category: "plumbing",
      features: ["Khắc phục dột loang mốc sần chân trần thạch cao", "Sử dụng keo gốc Sika chống co ngót móng biệt thự", "Dọn dẹp thạch cao vách tường thẩm mỹ cao"],
      pricing: [
        { item: "Hàn PPR nhiệt luồn khe thoát hộp kỹ thuật", price: "Từ 200.000đ", unit: "điểm" }
      ]
    },
    {
      id: "p5",
      slug: "lap-dat-thiet-bi-nuoc",
      title: "Lắp Thiết Bị Vệ Sinh Sang Trọng TP.HCM",
      shortDescription: "Ráp mâm bồn cầu sứ, sen vòi tắm, vách tắm kính, lavabo chậu rửa bục chìm TP.HCM.",
      fullDescription: `
        <h1>Thi Công Ráp Bồn Cầu Sứ Sủi Thác Lavabo Chậu Treo Văn Phòng Shop TP.HCM</h1>
        <p>Lên đồ thiết bị vệ sinh sang trọng cao cấp cho chung cư, căn hộ thuê, văn phòng làm việc Sài Gòn. Chúng tôi lắp ráp chuẩn chỉ, dán keo silicon chịu nước sinh học chống rêu xanh bảo hành cực uy tín chất lương.</p>
      `,
      icon: "Settings",
      category: "plumbing",
      features: ["Lắp khít đẹp chuẩn ly dọn sạch bã bột trét", "Nhận tháo thiết bị cũ di dời sang địa điểm trọ mới", "Lắp kèm co lọc phao phụ chống tràn phung phí"],
      pricing: [
        { item: "Công ráp bồn cầu sứ / chậu rửa lavabo treo hcm", price: "Từ 250.000đ", unit: "bộ" },
        { item: "Lắp bình tắm xối nước nóng trực tiếp Panasonic", price: "Từ 300.000đ", unit: "máy" }
      ]
    },
    {
      id: "c1",
      slug: "lap-camera",
      order: 3,
      title: "Lắp Camera An Ninh TPHCM Góc Rộng Trọn Bộ",
      image: "/images/camera-.png",
      shortDescription: "Nhận kéo cáp luồn luồn camera IP Dahua, Hikvision nét căng rọi biển số xe hẹp Sài Gòn.",
      fullDescription: `
        <h1>Lắp Đặt Camerra Giám Sát Chuyên Nghiệp Đầy Đủ Co Cq Đại Lý Cấp 1 Sài Gòn</h1>
        <p>Chống trộm rình mò rào cổng ngõ ngách chật hẹp tphcm. Hệ camera đầu ghi Hikvision ghi nhận biển số rõ từ 15-20 mét, ghi hình màu 24H ban đêm dẹp tan bóng tối, mã hóa bảo mật chuẩn đám mây an tâm sếp xem điện thoại.</p>
      `,
      icon: "Video",
      category: "camera",
      features: ["Đại lý cấp 1 phân phối giá kịch sàn Sài Gòn", "Kéo dây mượt thẩm mỹ luồn vành cáp âm tường", "Lắp mắt hồng ngoại soi xuyên bóng tối mật đêm"],
      pricing: [
        { item: "Công lắp đặt định vị mắt camera lên vách chung cư", price: "Từ 150.000đ", unit: "mắt" }
      ]
    },
    {
      id: "c2",
      slug: "sua-camera",
      title: "Thợ Sửa Camera Lỗi Không Xem App TP.HCM",
      shortDescription: "Bắt bệnh xử lỗi lỗi hỏng đầu thu ghi hình camera an ninh tại chỗ ở Sài Gòn.",
      fullDescription: `
        <h1>Sửa Lỗi Camera Không Kết Nối Wifi Sập Đầu Ghi Sài Gòn Phục Vụ 24H</h1>
        <p>Sự cố camera bị mờ sương, mất tín hiệu wifi Sài Gòn làm mất dữ liệu an ninh quan yếu của shop. Hoàng Tuấn xử đổi jack nối điện chịu áp bọc keo chống ẩm rỉ, nâng cấp ổ cứng lưu trữ an tâm dọn sạch lỗi camera.</p>
      `,
      icon: "Wrench",
      category: "camera",
      features: ["Xử lý cấp tốc phục vụ cho shop thời trang", "Nâng cấp ổ cứng lưu backup dữ liệu cũ an toàn lỗi", "Thay thế linh kiện dẹt mỏng đúng mác đại lý"],
      pricing: [
        { item: "Kiểm tra dò sửa tín hiệu dây nguồn camera lỗi", price: "Từ 150.000đ", unit: "mắt" }
      ]
    },
    {
      id: "c3",
      slug: "camera-gia-dinh",
      title: "Camera Wifi Wifi Thông Minh Đứng HCM",
      shortDescription: "Lắp camera Ezviz, Imou camera xoay 360 độ trò chuyện trẻ nhỏ đàm thoại hcm.",
      fullDescription: `
        <h1>Lắp Camera Wifi Gia Đình Ở TP.HCM - Thiết Bị Đóng Gói Nhỏ Gọn Thẩm Mỹ Cao</h1>
        <p>Bảo hộ trông mẹ già trẻ nhỏ ở chung cư tphcm từ xa bằng camera đàm thoại 2 chiều lọc tiếng ồn. Camera Ezviz ghi xoay quanh phòng báo biến động chuyển động gửi thông báo an tâm ba mẹ công sở Sài Gòn.</p>
      `,
      icon: "Video",
      category: "camera",
      features: ["Tính năng bám đuôi người lạ đột nhập thông minh AI", "Đàm thoại hai chiều siêu trong veo trung thực sóng", "Lắp ráp cực nhanh ghim ốc phẳng đẹp"],
      pricing: [
        { item: "Giá thiết bị (chính hãng)", price: "Từ 850.000đ", unit: "mắt" },
        { item: "Công lắp đặt + đi dây", price: "Từ 150.000đ", unit: "mắt" },
        { item: "Tổng chi phí dự kiến từ", price: "Từ 1.000.000đ", unit: "mắt", isTotal: true }
      ]
    },
    {
      id: "c4",
      slug: "camera-cua-hang",
      title: "Hệ Cam Quản Lý Chuỗi Spa Cafe TP.HCM",
      shortDescription: "Cung cấp trọn gói camera đầu ghi thu âm chi tiết tiền quầy thu ngân sài gòn.",
      fullDescription: `
        <h1>Thiết Lập Hệ Camera Giám Sát Shop Spa Cafe Tránh Thất Thoát Tài Sản HCM</h1>
        <p>Spa sầm uất Quận 1, Quận 3 mọc lên hàng loạt cần hệ camera trung tâm bền bỉ xem mượt 4-8 mắt đồng loạt trên màn hình tivi lớn. Hoàng Tuấn thiết lập lu luồng camera chính quy an ninh tầm xa dọn dẹp gọn.</p>
      `,
      icon: "Video",
      category: "camera",
      features: ["Mắt ghi hình micro thu thanh sắc nách quầy thu tiền", "Lưu trữ dữ liệu trong 30 ngày đêm an tâm hoàn hảo", "Hỗ trợ bảo hành quét mã điện tử nhanh 4H quận"],
      pricing: [
        { item: "Hệ thống đầu thu analog nén Hikvision tphcm", price: "Khảo sát báo gói", unit: "bộ" }
      ]
    },
    {
      id: "c5",
      slug: "camera-nang-luong-mat-troi",
      order: 4,
      title: "Lắp Camera Năng Lượng Mặt Trời Dự Án TP.HCM",
      image: "/images/imou-ngoai-troi.jpg",
      shortDescription: "Giám sát công trình xây dựng, kho ngoại quan, bãi xe TP.HCM tự cấp nguồn pin mặt trời & SIM 4G.",
      fullDescription: `
        <h1>Lắp Đặt Camera Năng Lượng Mặt Trời TPHCM - Không Lo Mất Điện Thất Thoát Tài Sản</h1>
        <p>Các bãi xe tạm thời, bãi cát, công trình cao ốc đang xây dựng dường như chưa kéo nguồn điện lưới an toàn hoặc thiếu hạ tầng wifi ổn định. Hoàng Tuấn cung cấp giải pháp ghép camera IP kèm tấm năng lượng Solar, sạc pin siêu tốc, ghi hình liên tục ban ngày ban đêm, truyền dữ liệu mượt mà qua sóng 4G tốc độ cao.</p>
      `,
      icon: "Video",
      category: "camera",
      features: ["Nguồn pin lưu trữ dung lượng lớn giám sát ban đêm 24/7", "SIM DATA 4G chuyên dụng mượt mà không trễ giật", "Mắt camera AI bám xoay cảnh báo trộm cướp đột nhập tức thì"],
      pricing: [
        { item: "Giá thiết bị (chính hãng)", price: "Từ 2.450.000đ", unit: "bộ" },
        { item: "Công lắp đặt + đi dây", price: "Từ 150.000đ", unit: "bộ" },
        { item: "Tổng chi phí dự kiến từ", price: "Từ 2.600.000đ", unit: "bộ", isTotal: true }
      ]
    },
    {
      id: "d1",
      slug: "do-ro-ri-nuoc",
      order: 1,
      title: "Dò Tìm Rò Rỉ Nước Siêu Âm TP.HCM",
      image: "/images/sieu-am-do-tim-ong-vo.png",
      shortDescription: "Dịch vụ dò rò rỉ nước ngầm sụt lún nền móng chung cư, nhà phố Sài Gòn 24H.",
      fullDescription: `
        <h1>Dò Tìm Nước Thất Thoát Rò Rỉ Ngầm Ở TP.HCM Bằng Máy Siêu Âm Đức Siêu Nhạy</h1>
        <p>Tiền nước tăng vọt hàng chục triệu đồng gặm lún móng thảm thạch cao là khuyết tật vỡ ngầm sàn tphcm. Kỹ sư Hoàng Tuấn rà cảm biến đa xung PQWT quét siêu âm chặn đứng rò nước Sài Gòn chính xác không băm sàn nhà.</p>
      `,
      icon: "Search",
      category: "detection",
      features: ["Máy siêu âm nhập Đức quét định vị gãy nứt ống ngầm", "Đục đúng 1 ô gạch ghim vết rò rỉ bọc trét sika sạch", "Cam kết xử lý triệt để 100% rách rò nước ngầm hcm"],
      pricing: [
        { item: "Siêu âm tìm rò rỉ phòng trọ nhà dân tphcm", price: "Từ 500.000đ", unit: "lần" }
      ]
    },
    {
      id: "d2",
      slug: "sieu-am-do-ong-am",
      title: "Siêu Âm Tìm Rò Nước Nhà Xưởng TP.HCM",
      shortDescription: "Rà định vị vết vỡ ống cứu hỏa PCCC khu công nghiệp Tân Bình Thủ Đức.",
      fullDescription: `
        <h1>Dịch Vụ Siêu Âm Rà Ống Phòng Cháy Chữa Cháy Thất Áp Tại TPHCM Văn Phòng</h1>
        <p>Hệ thống cứu hỏa rò nước làm sụt áp máy nén khí hầm lò xưởng chế xuất tphcm cực tai hại. Hoàng Tuấn túc trực mang xe đẩy máy rà rỉ hầm bao quét ranh giới rộng định điểm bục vỡ ống cứu hỏa sài gòn loáng cái sửa xong.</p>
      `,
      icon: "Search",
      category: "detection",
      features: ["Rọi thấu bê tông dày 30cm sâu đến 2,5 mét hcm", "Tìm điểm rỉ nứt chuẩn tránh hao rỉ áp bơm sụt", "Hỗ trợ trọn gói nghiệm thu ban đêm khói bụi xưởng"],
      pricing: [
        { item: "Rà ống cứu hỏa công ty nhà máy tphcm", price: "Liên hệ khảo sát", unit: "lần" }
      ]
    },
    {
      id: "d3",
      slug: "do-duong-nuoc-am",
      title: "Vẽ Sơ Lập Đường Ống Nước TPHCM",
      shortDescription: "Dò rà dựng bản họa đồ ống nước cất ngầm phục vụ xây bồn rào cải tạo chung cư hcm.",
      fullDescription: `
        <h1>Dò Vẽ Lập Sơ Đồ Hệ Thống Ống Cấp Thoát Nước Ngầm Nhà Phố Sài Gòn</h1>
        <p>Khoan tường khoan nền dính bục rách ống PPR tủ bếp toilet hcm là thảm họa sửa chữa cực mệt mỏi. Đội kỹ sư rà ống đo nhiệt phác họa sơ đồ rải van giếng khoan bể lọc cất ngầm Sài Gòn thẩm mỹ ngăn nắp.</p>
      `,
      icon: "Search",
      category: "detection",
      features: ["Lập bản đồ rải ranh nẹp nước siêu sắc nét căn hộ", "An tâm toàn bảo xây cải tạo nền móng đè ép", "Được vẽ bởi kỹ sư cơ điện tay nghề bậc cao hcm"],
      pricing: [
        { item: "Dò thiết kế lập phác đồ ống nước ngầm tphcm", price: "Từ 300.000đ", unit: "lần" }
      ]
    },
    {
      id: "d4",
      slug: "kiem-tra-ro-ri-khong-duc-tuong",
      title: "Kiểm Tra Nội Soi Ống Nước Sài Gòn",
      shortDescription: "Sử dụng camera nội soi chẩn đoán vết nứt rạn rác bám nghẹt hộp kỹ thuật hcm.",
      fullDescription: `
        <h1>Dịch Vụ Nội Soi Đường Ống Nước Bằng Thiết Bị Camera Đầu Ghi Đô Thị HCM</h1>
        <p>Nội soi vi góc luồn ống hẹp rà sỏi, vữa đá kẹt rác bít tắc rỉ nước ngấm nách thạch cao chung cư hcm dẻo dai. Cam kết dọn rải nấm loang dột mốc thêu nốt dột nước an toàn sạch sẽ dọn sạch lo âu Sài Gòn.</p>
      `,
      icon: "ShieldCheck",
      category: "detection",
      features: ["Camera uốn lượn rà sâu lòng cống lavabo mút", "Nén bọt thử áp chân vách chống dột trần láng giềng", "Chữa trị vi nấm rêu mốc bốc mùi thối sũng nước toilet"],
      pricing: [
        { item: "Nội soi chẩn bệnh van dột nứt ống nước sài gòn", price: "Từ 400.000đ", unit: "lần" }
      ]
    },
    {
      id: "sm1",
      slug: "cong-tac-cua-cuon-thong-minh",
      order: 1,
      title: "Công Tắc Cửa Cuốn Thông Minh Sài Gòn",
      shortDescription: "Lắp đặt bộ điều khiển đóng mở cửa cuốn qua điện thoại thông minh, an toàn tuyệt đối tại TPHCM.",
      fullDescription: `
        <h1>Dịch Vụ Lắp Thiết Bị Điều Khiển Cửa Cuốn Từ Xa Bằng Điện Thoại TPHCM</h1>
        <p>Bạn không muốn mệt mỏi mang theo chìa khóa cuốn nặng tay hay remote dùng pin mỗi khi du chuyển bằng xe máy tại Sài Gòn sầm uất nhộn nhịp? Thiết bị công tắc cuốn thông minh sẽ hỗ trợ bạn điều hành cửa đóng mở tự do mọi lúc từ xa thông qua ứng dụng hoàn toàn bảo mật.</p>
        <h2>Đặc tính nổi bật của công tắc cửa cuốn thông minh HCM</h2>
        <ul>
          <li><strong>Mở từ xa cho người thân:</strong> Mở cửa cho shipper hoặc gia đình vào nhà trước khi bạn lái xe về tới sân.</li>
          <li><strong>Lập lịch an toàn:</strong> Tự động đóng và rà khóa thép lúc đêm về ngăn các đối tượng cạy đột nhập xấu.</li>
          <li><strong>Tính tương thích cao:</strong> Dễ dàng phối nối đấu gắn vào môtơ YH, Austdoor cũ sấy nhanh không sập nguồn điện lưới.</li>
        </ul>
      `,
      icon: "Cpu",
      category: "smarthome",
      features: ["Mở cửa xe túc trực rảnh tay trên di động bận rộn hcm", "Gửi tín hiệu đóng cửa khẩn cấp ban đêm", "Bảo mật mã hóa chống hack vượt trội"],
      pricing: [
        { item: "Công tắc cửa cuốn thông minh Wi-Fi", price: "Từ 850.000đ", unit: "bộ" },
        { item: "Lắp đặt đấu bảng môtơ Ausdoor trọn gói hcm", price: "Từ 200.000đ", unit: "lần" }
      ],
      image: "/images/cua-cuon-thong-minh.png",
      gallery: [
        {
          type: 'video',
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          thumbnail: '/images/cua-cuon-thong-minh.png'
        },
        {
          type: 'image',
          url: '/images/cua-cuon-thong-minh.png'
        }
      ]
    },
    {
      id: "sm2",
      slug: "cong-tac-dien-thong-minh",
      title: "Công Tắc Điện Thông Minh Cảm Ứng TPHCM",
      shortDescription: "Trang trí mặt kính cường lực chống giật ẩm, điều khiển tắt bật đèn hcm bằng smartphone rảnh tay.",
      fullDescription: `
        <h1>Nâng Cấp Công Tắc Cảm Ứng Đèn Thông Minh Đẳng Cấp Sang Trọng HCM</h1>
        <p>Căn hộ chung cư, nhà phố Sài Gòn sang xịn mịn hơn nhờ trang trí hệ thống công tắc cơ bọc kính bóng đêm sáng trưng huyền ảo. Tắt toàn hệ các bóng đèn trước khi đi ngủ chỉ qua một click chuột điện thoại hoặc ra lệnh bằng giọng nói mượt mà không hư hỏng dây tường.</p>
        <h2>Tính an toàn thẩm mỹ được nâng cao</h2>
        <ul>
          <li><strong>Thiết kế kính cường lực kín nước:</strong> Ngăn ngừa chập cháy nổ tủ ổ cắm khi tay sũng nước tắm rửa bật tắt bóng đèn.</li>
          <li><strong>Định vị đèn LED lung linh:</strong> Tạo dải phát quang trợ sáng giúp bạn dễ dàng chạm đúng nút trong mịt mùng mờ mờ ban đêm không cần mò mẫm.</li>
          <li><strong>Tiết kiệm lượng điện lớn:</strong> Phát hiện tắt sớm từ xa các dải phòng trống tắt sấy điều hòa rò rỉ lạnh.</li>
        </ul>
      `,
      icon: "Lightbulb",
      category: "smarthome",
      features: ["Sử dụng nguồn điện an toàn không sợ rò giật điện", "Tương thích đế âm vuông chữ nhật quốc tế tiêu chuẩn", "Nhận dạng giọng nói Google Home nhanh nhạy"],
      pricing: [
        { item: "Công tắc bóng cảm ứng từ 1 nút hcm", price: "Từ 450.000đ", unit: "bộ" },
        { item: "Công tắc thông minh bọc nhôm 3-4 nút", price: "Từ 550.000đ", unit: "bộ" }
      ]
    },
    {
      id: "sm3",
      slug: "cam-bien-an-ninh-thong-minh",
      title: "Cảm Biến An Ninh Thông Minh TPHCM (Sắp ra mắt)",
      shortDescription: "Lắp ráp màng cảm biến chuyển động dập trộm, báo gas, báo khói cháy gửi sms thông báo khẩn.",
      fullDescription: `
        <h1>Lắp Đặt Trọn Bộ Cảm Biến An Ninh Theo Dõi Đột Nhập Thông Minh HCM</h1>
        <p>Hệ thống hàng rào hồng ngoại cảm biến rung lắc, báo mở cửa tự động bảo vệ tài sản doanh nghiệp, shop bán hàng cửa hiệu Sài Gòn lúc đóng tiệm đi du lịch. Sản phẩm đang cấu hình và chuẩn bị ra mắt trong thời gian sớm kế tiếp.</p>
      `,
      icon: "ShieldCheck",
      category: "smarthome",
      features: ["Sắp ra mắt (Coming soon)", "Uốn hướng quét chống báo giả từ vật nuôi", "Nối mạng còi hú dọa trộm dập tắt rủi ro"],
      pricing: [
        { item: "Hệ thống cảm biến rà chống trộm hcm", price: "Liên hệ để nhận báo giá", unit: "gói" }
      ]
    },
    {
      id: "sm4",
      slug: "chieu-sang-va-giai-tri-thong-minh",
      title: "Giải Trí & Chiếu Sáng Thông Minh TPHCM (Sắp ra mắt)",
      shortDescription: "Tự động hóa hệ thống màn rèm cửa sổ, âm thanh rải phòng thích ứng thời tiết.",
      fullDescription: `
        <h1>Giải Pháp Điều Hành Tự Động Rèm Cửa & Máy Lạnh Thông Minh HCM</h1>
        <p>Tinh hoa giải trí rạp chiếu phim sướng tai thư giãn, ánh sáng dịu nhạt lãng mạn khi màn đêm xuống cùng hệ thống rèm tự động kéo gọn theo hướng nắng tphcm rực lửa. Đang được test tối ưu và sớm mở phục vụ toàn thành phố.</p>
      `,
      icon: "Settings",
      category: "smarthome",
      features: ["Sắp ra mắt (Coming soon)", "Mang rạp chiếu phim rạp nhạc rải âm sành điệu", "Mô tơ rèm chạy êm ái dưới 30dB độ ồn"],
      pricing: [
        { item: "Thiết kế giải trí đa phòng thông minh", price: "Liên hệ để nhận báo giá", unit: "gói" }
      ]
    },
    {
      id: "sol1",
      slug: "lap-den-pha-nang-luong-mat-troi",
      order: 1,
      title: "Lắp Đèn Pha Năng Lượng Mặt Trời TPHCM",
      shortDescription: "Lắp đặt đèn pha LED năng lượng mặt trời chiếu sáng sân vườn, kho bãi, biệt thự sân thượng tại TP.HCM chính hãng.",
      fullDescription: `
        <h1>Lắp Đặt Đèn Pha LED Năng Lượng Mặt Trời TP.HCM - Giải Pháp Chiếu Sáng Sân Vườn Tiết Kiệm, Hiện Đại</h1>
        <p>Tại Thành phố Hồ Chí Minh, nhu cầu chiếu sáng biệt thự sân vườn, chiếu rọi ban công, sân thượng, hoặc bảo vệ bãi giữ xe, nhà kho bãi, khu đất trống là very lớn. Việc vận hành hệ thống chiếu sáng thâu đêm suốt sáng bằng điện lưới không chỉ gia tăng đáng kể hóa đơn tiền điện hàng tháng, mà còn gặp phiền phức về kéo dây, rủi ro chập cháy mỗi mùa mưa ngập nước Sài Gòn. Đèn pha năng lượng mặt trời chính là lựa chọn thay thế hoàn hảo hàng đầu.</p>
        
        <h2>Lợi Ích Đột Phá Khi Lắp Đèn Pha Năng Lượng Mặt Trời Tại HCM:</h2>
        <ul>
          <li><strong>Tiết kiệm 100% chi phí điện năng:</strong> Đèn hoạt động tự cung tự cấp nguồn năng lượng xanh dồi dào từ ánh nắng mặt trời, hóa đơn tiền điện luôn ở mức 0 đồng.</li>
          <li><strong>Cấu tạo chống nước, bền bỉ tối đa:</strong> Thân đèn hợp kim nhôm nguyên khối đúc dày dặn, bảo vệ kín bít tuyệt đối chuẩn IP67 thách thức mọi cơn mưa bão lụt ngập đường sá TP.HCM.</li>
          <li><strong>Điều khiển tự động thông minh:</strong> Đèn tự sạc sạc đầy pin trong ngày và tự động thắp sáng rực rỡ suốt đêm dài từ lúc 18h00 tối đến rạng sáng 6h00 hôm sau.</li>
          <li><strong>Thi công tinh gọn, tính thẩm mỹ cao:</strong> Không cần đi dây điện đục khoét tường vách bê tông căn biệt thự hay nhà phố của bạn, đảm bảo mỹ quan láng mịn.</li>
        </ul>

        <h2>Hoàng Tuấn MPE Cam Kết Chất Lượng Đèn Pha Cao Cấp:</h2>
        <p>Chúng tôi cung cấp sỉ lẻ các loại đèn pha LED Solar Jidian, Blue Carbon đa công suất 100W, 200W, 300W, 500W chính hãng, có đội ngũ thợ lành nghề trực tiếp giao hàng lắp đặt chuẩn xác chỉ trong 2 giờ tại tất cả các quận huyện thuộc TPHCM.</p>
      `,
      icon: "Sun",
      category: "solar",
      features: [
        "Hoàn toàn miễn phí tiền điện suốt quá trình vận hành",
        "Tấm pin hấp thụ nhiệt năng tốt nhất sạc đầy nhanh",
        "Kháng nước chuẩn IP67 không sợ mưa to ngập úng",
        "Pin Lithium cao cấp dung lượng thực chiếu sáng thâu đêm"
      ],
      pricing: [
        { item: "Đèn pha Solar LED Jidian 100W chính hãng", price: "Từ 650.000đ", unit: "bộ" },
        { item: "Đèn pha Solar LED Jidian 200W chính hãng", price: "Từ 750.000đ", unit: "bộ" },
        { item: "Đèn pha Solar LED Blue Carbon 300W cao cấp", price: "Từ 1.150.000đ", unit: "bộ" },
        { item: "Đèn pha Solar LED Blue Carbon 500W cao cấp", price: "Từ 1.650.000đ", unit: "bộ" },
        { item: "Công thợ thi công gá lắp gối sườn tấm pin tận nhà hcm", price: "Từ 150.000đ", unit: "bộ" }
      ],
      benefits: [
        "Giao hàng nhanh lắp đặt trong ngày tại các quận huyện hcm",
        "Mặt bằng thi công sạch sẽ thẩm mỹ, bảo trì trọn đời",
        "Sản phẩm bảo hành chính hãng uy tín 2 năm một đổi một"
      ],
      faq: [
        { question: "Đèn pha Solar lắp trên sân thượng, ban công đón nắng thế nào?", answer: "Tấm pin năng lượng mặt trời bắt buộc phải lắp đặt ngoài trời, góc nghiêng đón nắng trực diện khoảng 10-15 độ và không bị cây xanh hay mái nhà bên cạnh che khuất. Thợ của chúng tôi sẽ căn chỉnh góc treo hoàn hảo nhất." }
      ]
    },
    {
      id: "sol2",
      slug: "lap-den-duong-nang-luong-mat-troi",
      order: 2,
      title: "Lắp Đèn Đường Năng Lượng Mặt Trời TPHCM",
      shortDescription: "Thi công lắp đặt đèn đường năng lượng mặt trời cho dự án, đường nội bộ, chung cư, nhà xưởng kho bãi tại TP.HCM.",
      fullDescription: `
        <h1>Lắp Đặt Đèn Đường Năng Lượng Mặt Trời Tại TPHCM - Giải Pháp Chiếu Sáng Công Cộng Tiết Kiệm Tối Đa</h1>
        <p>Chiếu sáng đường nội khu chung cư, lối đi nội bộ công ty, khuôn viên nhà xưởng kho bãi lớn hay ngõ hẻm công cộng tại Thành phố Hồ Chí Minh là vô cùng cấp thiết nhằm đảm bảo an toàn giao thông và phòng chống tệ nạn xã hội. Đèn đường năng lượng mặt trời chiếc lá, đèn bàn chải liền thể chính là giải pháp kinh tế nhất giúp cắt giảm hoàn toàn tiền điện và chi phí đi dây điện rườm rà dưới lòng đường.</p>
        
        <h2>Tại Sao Nên Đầu Tư Đèn Đường Năng Lượng Mặt Trời?</h2>
        <ul>
          <li><strong>Không lo đục phá đào đường:</strong> Do hoạt động hoàn toàn độc lập tự sạc tự sáng, bạn chỉ cần gá đèn trực tiếp lên cột thép hoặc vách sườn nhà xưởng, không cần đào bới rải cáp ngầm tốn kém, phức tạp.</li>
          <li><strong>Cảm biến radar chuyển động:</strong> Đèn đường thông minh tự động sáng rực khi có người qua lại và sáng dịu 30% khi vắng vẻ để dự trữ nguồn điện cho những ngày mưa dài bão liên miên của Sài Gòn.</li>
          <li><strong>Hợp kim nhôm siêu bền bỉ:</strong> Kháng mài mòn, chống rỉ sét hoàn toàn dưới thời tiết ẩm nóng đặc thù miền Nam Việt Nam.</li>
        </ul>

        <h2>Dịch Vụ Thi Công Trọn Gói Uy Tín Từ Hoàng Tuấn MPE:</h2>
        <p>Chúng tôi chuyên nhận tư vấn thiết kế, cung cấp thiết bị đèn đường Solar chiếc lá 100W-300W, đèn bàn chải, đèn UFO tròn chiếu tỏa 360 độ và trực tiếp thi công đào hố, chôn cột bê tông dựng trụ gá đèn đường cho các dự án khu dân cư, ngõ hẻm hẻm phố, khuôn viên nhà xưởng tại TPHCM giá tốt nhất.</p>
      `,
      icon: "Sun",
      category: "solar",
      features: [
        "Sử dụng chip LED siêu sáng rọi xa, rải góc rộng dải đường",
        "Tấm pin Mono sạc cực nhanh dù trời ít nắng nhiều mây",
        "Tích hợp cảm biến rada nhạy phát hiện người qua lại",
        "Trụ sấy thép sơn tĩnh điện chịu sức gió giật mạnh"
      ],
      pricing: [
        { item: "Đèn đường chiếc lá Solar 100W", price: "Từ 850.000đ", unit: "bộ" },
        { item: "Đèn đường chiếc lá Solar 200W", price: "Từ 1.050.000đ", unit: "bộ" },
        { item: "Đèn đường chiếc lá Solar 300W", price: "Từ 1.150.000đ", unit: "bộ" },
        { item: "Đèn đường bàn chải liền thể UFO 400W", price: "Từ 1.350.000đ", unit: "bộ" },
        { item: "Trụ thép gắn đèn đường sấy tĩnh điện cao 3m", price: "Từ 450.000đ", unit: "trụ" },
        { item: "Công thợ chôn móng bê tông dựng trụ gá đèn hcm", price: "Từ 250.000đ", unit: "trụ" }
      ],
      benefits: [
        "Hỗ trợ thủ tục đăng ký kiểm định độ sáng, chất lượng dự án",
        "Thời gian thi công chuẩn xác tiến độ cam kết",
        "Bảo hành chính hãng 2 năm bảo trì kỹ thuật trọn đời"
      ]
    }
  ]
};
