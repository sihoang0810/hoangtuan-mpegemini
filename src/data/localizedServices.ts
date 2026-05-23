import { CMSService } from '../lib/sanity';

export const LOCALIZED_SERVICES: { [key: string]: CMSService[] } = {
  'bao-loc': [
    {
      id: "e1",
      slug: "sua-dien",
      title: "Thợ Sửa Điện Bảo Lộc Đêm 24/7",
      shortDescription: "Khắc phục nhanh hư hỏng cơ điện gia đình, chập nổ tủ điện, hỏng bóng led ở Bảo Lộc Lâm Đồng.",
      fullDescription: `
        <h1>Thợ Sửa Điện Bảo Lộc Khẩn Cấp - Bảo Vệ Gia Đình Bạn Từ Xứ Trà Lâm Đồng</h1>
        <p>Hệ thống điện nhà bạn gặp sự cố lúc nửa đêm giữa tiết trời sương mù Bảo Lộc khiến việc sinh hoạt và kinh doanh bị ngưng trệ? Bạn lo ngại những đơn vị thợ không uy tín báo khống giá sửa? Đội thợ điện Bảo Lộc của Hoàng Tuấn MPE chính là giải pháp an toàn tuyệt đối cho bạn.</p>
        
        <h2>Các sự cố điện thường gặp tại khu vực TP. Bảo Lộc</h2>
        <ul>
          <li><strong>Mất điện toàn phần đột ngột:</strong> Xảy ra ngẫu nhiên khi quá tải tải tưới vườn trà hoặc độ ẩm dầm dột tủ sấy.</li>
          <li><strong>Mối tiếp xúc ổ cắm bị chảy nhựa:</strong> Do thợ đi dây lỏng lẻo hoặc sử dụng ổ cắm kém phẩm chất.</li>
          <li><strong>Lỗi bóng đèn sân vườn sương sương:</strong> Nước sương xâm nhập đui đèn pha sương dột rò rỉ điện.</li>
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
      features: ["Thợ địa bàn Bảo Lộc túc trực", "Tư vấn báo giá 0 ĐỒNG tận sân vườn", "Linh kiện Panasonic chính gốc 100%"],
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
      shortDescription: "Thay thế, nâng cấp Aptomat / CB Panasonic Schneider chống giật nhảy dập máy tưới dốc đồi Bảo Lộc.",
      fullDescription: `
        <h1>Lắp Đặt & Sửa Thay Thế CB Chống Giật Tại Bảo Lộc Lâm Đồng Chính Hãng</h1>
        <p>Aptomat nhà bạn nhảy két két dột mồ hôi sương mù Lâm Đồng hay do sử dụng lò nướng, máy nước nóng quá tải? Chúng tôi lắp đặt CB chính hiệu Panasonic, dòng nhạy cao phản hồi tắt sau 0.01 giây khi có dòng rò điện sục nước.</p>
      `,
      icon: "Settings",
      category: "electrical",
      features: ["Aptomat Panasonic nhập gốc bảo hành chính hãng", "Tải công suất tưới đồi Bảo Lộc bền bỉ", "Thay an toàn đúng quy chuẩn cơ điện"],
      pricing: [
        { item: "Thay CB đơn Panasonic chính hãg", price: "Từ 80.000đ", unit: "bộ" },
        { item: "Căn chỉnh lắp đạt CB chống giật rò dòng", price: "Từ 180.000đ", unit: "con" }
      ]
    },
    {
      id: "e4",
      slug: "lap-dat-dien",
      title: "Lắp Đặt Điện Sập Tường Trang Trí Bảo Lộc",
      shortDescription: "Thi công luồn dập dây cơ điện nhà phố, rải led trang trí quán cafe đèo dốc Bảo Lộc.",
      fullDescription: `
        <h1>Thi Công Mạng Điện & Bóng Led Nghệ Thuật Cho Shop, Homestay Tại Bảo Lộc</h1>
        <p>Chúng tôi nhận lắp đặt điện sập tường, bóng âm thạch cao, led tạo khối lãng mạn cho các homestay dốc sương gió mát rượi, cửa tiệm trà dốc đèo Bảo Lộc đạt tính nghệ thuật cao không dơ tường.</p>
      `,
      icon: "Lightbulb",
      category: "electrical",
      features: ["Rải led uốn dây mượt lãng mạn nghệ thuật", "Thiết kế tiết kiệm hao phí điện năng", "Thi công dọn dẹp sạch thạch cao"],
      pricing: [
        { item: "Kéo dây nguồn điện luồn ống nẹp PVC", price: "Từ 75.000đ", unit: "mét" },
        { item: "Lắp đèn chùm quạt trần quán trà đồi dốc", price: "Từ 250.000đ", unit: "bộ" }
      ]
    },
    {
      id: "e5",
      slug: "do-duong-dien-am-tuong",
      title: "Dò Tìm Vẽ Mạch Điện Âm Tường Bảo Lộc",
      shortDescription: "Phác họa vị trí rải nguồn điện ngầm trong bê tông phục vụ khoan đục nhà cửa an tâm ở Bảo Lộc.",
      fullDescription: `
        <h1>Dò Tìm Đường Điện Âm Tường Chuyên Nghiệp Bảo Lộc - Tránh Rủi Ro Khoan Trúng</h1>
        <p>Mỗi khi cơi nới dốc gác xây bậc, việc khoan đụng trúng dây nguồn điện sống cực nguy hiểm tính mạng và chập nổ hệ thống lớn. Thợ cơ điện Lâm Đồng rà lập bản đồ nguồn điện âm tường chi tiết cam kết chính xác tuyệt đối.</p>
      `,
      icon: "Search",
      category: "electrical",
      features: ["Xác định chính xác dải dây nguồn", "An tâm sửa xây nhà dốc dốc Lâm Đồng", "Chỉ điểm dây mát dây nóng rõ ràng"],
      pricing: [
        { item: "Dò tìm dựng bản đồ mạch ranh tường", price: "Từ 300.000đ", unit: "phòng" }
      ]
    },
    {
      id: "p1",
      slug: "sua-nuoc",
      title: "Dịch Vụ Sửa Nước Sân Vườn Đồi Dốc Bảo Lộc",
      shortDescription: "Sửa bục vỡ ống cấp thoát sương, vòi hoa sen gãy, bồn cầu rỉ tràn nước xi-phông tại Bảo Lộc.",
      fullDescription: `
        <h1>Thợ Sửa Nước Bảo Lộc - Khóa Van Bục Tiết Kiệm Từng Giọt Nước Sạch Lâm Đồng</h1>
        <p>Áp suất nước ngầm địa đồi cao thường phá hủy gioăng cao su, nứt dột gãy vòi nước bồn tiểu vệ sinh mốc ẩm dột chân nhà tại Bảo Lộc. Thợ sửa ống nước dốc đèo của Hoàng Tuấn MPE mang phụ tùng xử lý nhanh, giá rẻ.</p>
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
      id: "p2",
      slug: "sua-ro-ri-nuoc",
      title: "Sửa Rò Rỉ Nước Ngầm Sân Vườn Bảo Lộc",
      shortDescription: "Định vị và vá vết nứt gãy sập ống nước nhựa PPR dốc đồi đất đá dột nát Lâm Đồng.",
      fullDescription: `
        <h1>Sửa Rò Rỉ Nước Ngầm Tại Bảo Lộc - Bảo Vệ Nền Móng Căn Nhà An Toàn</h1>
        <p>Địa chấn rạn nứt đất sụt trượt vỉa đất dốc đèo Bảo Lộc liên tục xô lệch ống cấp nước PPR sinh rò rỉ âm đất dột móng. Thợ Hoàng Tuấn hàn nhiệt ống PPR, xử lý chống thấm dột nền móng chuẩn chỉnh bảo vệ đất vườn nhà.</p>
      `,
      icon: "Droplet",
      category: "plumbing",
      features: ["Hàn dán ống chịu lực nhiệt độ cao", "Trả lại đất nén vững chãi chân ranh", "Phát hiện chặn hóa đơn nước tiền triệu"],
      pricing: [
        { item: "Khắc phục bục ống nước cất lộ thiên", price: "Từ 150.000đ", unit: "điểm" },
        { item: "Gia cố dán keo ống chịu tải PPR dột ngầm", price: "Khảo sát cụ thể", unit: "điểm" }
      ]
    },
    {
      id: "p3",
      slug: "lap-may-bom",
      title: "Lắp & Sửa Máy Bơm Nước Giếng Đồi Bảo Lộc",
      shortDescription: "Lắp đặt máy bơm đẩy bình chứa tầm dốc đèo, cân đẩy áp mạnh cho homestay quán cà phê Bảo Lộc.",
      fullDescription: `
        <h1>Dịch Vụ Lắp Đặt Sửa Máy Bơm Nước Đẩy Cao Ở Bảo Lộc Khỏe Sóng Xoáy</h1>
        <p>Địa hình Bảo Lộc chênh tải dốc đèo khiến dòng nước đẩy cực yếu không cấp đủ bồn vệ sinh homestay sương mờ. Thợ nước lắp bơm tăng áp tự động điện tử vận hành siêu êm rít đẩy nước vượt dốc nhẹ nhàng.</p>
      `,
      icon: "Wrench",
      category: "plumbing",
      features: ["Bơm tăng áp thông minh chống ồn ào", "Máy bơm Panasonic nhập khẩu bền bỉ", "Mồi bảo dưỡng giếng đào mượt áp khỏe"],
      pricing: [
        { item: "Thi công lắp ráp máy bơm tăng áp mới", price: "Từ 300.000đ", unit: "bộ" },
        { item: "Sửa mồi dòng van hút luồn lò xo giếng", price: "Từ 200.000đ", unit: "con" }
      ]
    },
    {
      id: "p4",
      slug: "sua-ong-nuoc-am",
      title: "Sửa Ống Nước Âm Vách Thạch Cao Bảo Lộc",
      shortDescription: "Gia công bọc vành chịu lực ống nhiệt vách nhà tắm, ngăn nước sương thấm tường nốt dột sũng nước.",
      fullDescription: `
        <h1>Thợ Chuyên Sửa Ống Nước Đi Âm Vách Thạch Cao Bê Tông Chất Lượng Bảo Lộc</h1>
        <p>Vách bê tông ẩm ộc dột nách dốc đồi Bảo Lộc dễ làm mục hoặc bục gãy ren các chỗ nối tê chữ T trong hệ thống phân nước nhà. Hoàng Tuấn nén keo silicon, hàn ống nhiệt PPR chịu lực mướt mượt móng vững lâu dài.</p>
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
      shortDescription: "Lắp đặt ráp bồn vệ sinh, lavabo hoa văn dốc đồi, sen cây tắm ấm nóng chính hiệu cho bà con Bảo Lộc.",
      fullDescription: `
        <h1>Thợ Thiết Kế Thi Công Ráp Thiết Bị Vệ Sinh Nước Sạch Homestay Bảo Lộc</h1>
        <p>Gắn bồn rửa bồn tắm vòi tắm thư giãn nghỉ ngơi giữa lòng đồi Bảo Lộc. Công ty lắp đặt thiết bị vệ sinh nhập khẩu chiết khấu cho khách hàng, gia cố không rêu mốc bảo hành uy tín tận dốc nhà bạn.</p>
      `,
      icon: "Settings",
      category: "plumbing",
      features: ["Lắp thẩm mỹ cực cao kín tuyệt đối gián bọ", "Phù hợp phong thủy gia chủ Lâm Đồng", "Tặng kèm khóa phụ lọc cặn giếng đào"],
      pricing: [
        { item: "Lắp bồn cầu sứ / chậu treo Lavabo", price: "Từ 250.000đ", unit: "bộ" },
        { item: "Lắp đặt bình nóng lạnh đồi dốc dốc", price: "Từ 300.000đ", unit: "máy" }
      ]
    },
    {
      id: "c1",
      slug: "lap-camera",
      title: "Lắp Đặt Hệ Thống Camera Bảo Lộc Trọn Gói",
      shortDescription: "Giải pháp lắp đặt camera an ninh Bảo Lộc giám sát sương mù đồi trà dốc dốc rõ như ban ngày 24/24.",
      fullDescription: `
        <h1>Lắp Đặt Camera Bảo Lộc - Bảo Vệ Biệt Thự Sân Vườn Quán Cafe Bản Địa Chu Đáo</h1>
        <p>Lâm Đồng mưa dầm sương dốc che lấp tầm nhìn biệt thự hay nhà xưởng. Hoàng Tuấn thiết lập cấu hình mắt camera chống nước IP67 Ezviz góc rộng 360 xoay chuyển theo dáng người gửi còi báo động trực tiếp điện thoại.</p>
      `,
      icon: "Video",
      category: "camera",
      features: ["Mắt hồng ngoại rọi thấu sương tuyết sương mù", "Bộ nhớ lưu trữ an ninh mã hóa dữ liệu cao", "Cài app xem từ xa mượt không trễ dòng"],
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
        <p>Bụi bặm trà nương sương ẩm dốc đồi dễ làm hư phích nguồn dẹt tiếp điện hoặc sập modem wifi. Chúng tôi thay dây bọc dẻo cách điện, khôi phục sóng định cấu hình hệ thống camera gia đình Bảo Lộc khôi phục an ninh.</p>
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
      shortDescription: "Lắp đặt camera wifi không cần đục lỗ kéo cáp lòng vòng phô nhà đồi dốc Bảo Lộc.",
      fullDescription: `
        <h1>Lắp Camera Gia Đình Tại Bảo Lộc - Trò Chuyện Con Nhỏ Giám Sát Cổng Rào</h1>
        <p>Tăng cường bảo hộ gia đình với camera wifi đàm thoại 2 chiều ấm giọng, rà soát xe cộ dốc đồi. Thương hiệu Ezviz Imou phân phối sỉ lẻ giá cực rẻ lắp đặt lấy ngay tại Lâm Đồng bảo hành điện tử chính hiệu.</p>
      `,
      icon: "Video",
      category: "camera",
      features: ["Nhận diện người chuyển động bằng AI", "Đàm thoại hai chiều ấm áp thanh âm", "Thẩm mỹ tinh tế treo vách nhỏ gọn"],
      pricing: [
        { item: "Camera wifi Ezviz cao cấp chính hãg", price: "Từ 850.000đ", unit: "mắt" }
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
      id: "d1",
      slug: "do-ro-ri-nuoc",
      title: "Dò Tìm Rò Rỉ Nước Siêu Âm Bảo Lộc",
      shortDescription: "Siêu âm tìm ống nước vỡ ngầm dột thối đất đồi dốc Lâm Đồng chính xác từng vạch cát.",
      fullDescription: `
        <h1>Dò Tìm Rò Rỉ Nước Sạch Tại Bảo Lộc Bằng Sóng Siêu Âm Công Nghệ Đức</h1>
        <p>Hóa đơn cấp nước sạch tăng phi mã sụt lún sạt trượt góc nền là thảm họa ngầm rò nước Bảo Lộc. Hoàng Tuấn rà rà mặt xi măng dùng thiết bị phát sóng đo biên độ âm nứt ống nước rách rò, định điểm rách chính xác tuyệt nhiên không đập phá.</p>
      `,
      icon: "Search",
      category: "detection",
      features: ["Thiết bị PQWT Đức siêu âm nhạy xuyên nền", "Bảo vệ móng sân vườn đất dốc Lộc Phát", "Hạn chế đập tối đa giữ nguyên móng xây"],
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
        <p>Xưởng chế biến chè nương, lò sấy dốc dốc Lâm Đồng có hệ thống ống phòng cháy chữa cháy âm đất dễ bị ăn mòn rỉ tràn gây sụt áp liên tục. Chúng tôi rà siêu cảm biến định danh khuyết tật rạn vỡ ống dột ngầm loáng cái sửa xong.</p>
      `,
      icon: "Search",
      category: "detection",
      features: ["Thiết bị Đức rọi sâu 2 mét dưới gạch đá", "Rà điểm nứt cực khít tránh rủi ro sạt đất", "Phát hành văn bản đo đạc đúng chuẩn"],
      pricing: [
        { item: "Rà ống cứu hỏa nhà xưởng Bảo Lộc", price: "Báo giá khảo sát", unit: "lần" }
      ]
    },
    {
      id: "d3",
      slug: "do-duong-nuoc-am",
      title: "Vẽ Sơ Đồ Hệ Thống Cấp Nước Ngầm Bảo Lộc",
      shortDescription: "Vẽ bản vẽ cấp thoát nước giếng khoan đồi dốc giúp gia chủ Bảo Lộc sửa móng nhà.",
      fullDescription: `
        <h1>Dịch Vụ Dò Dựng Lập Sơ Đồ Ống Nước Âm Đất Dốc Đồi Bảo Lộc</h1>
        <p>Tránh tối đa đục lầm khoan rách ống PPR chịu áp cao khi cất nhà xây thêm bờ kè dốc rào tại Lâm Đồng. Đội thợ dò đường ống nước đo dòng chảy cảm nhiệt vẽ phác hoàn chỉnh toàn hệ thoát van giếng đào nhà gia chủ.</p>
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
      id: "p3",
      slug: "lap-may-bom",
      title: "Lắp Máy Bơm Nước Tăng Áp Êm TPHCM",
      shortDescription: "Lắp máy bơm đẩy cao bồn nước chung cư mini, tăng áp vòi sen sủi bọt Sài Gòn.",
      fullDescription: `
        <h1>Tư Vấn Thiết Kế Lắp Ráp Máy Bơm Cấp Nước Đô Thị Khỏe Áp Khỏe Lực TP.HCM</h1>
        <p>Căn hộ cao lửng quận 7 hoặc nhà trọ gò vấp áp suất nước rỉ rỉ không đủ chạy máy giặt chảy bồn tắm cực ức chế Sài Gòn. Ráp máy bơm tăng áp điện tử Panasonic không phát tiếng dế kêu sủi bọt nước dạt dào êm ru đêm tối Sài Gòn.</p>
      `,
      icon: "Wrench",
      category: "plumbing",
      features: ["Bơm tăng áp điện tử êm ái xả dạt dào", "Nhập khẩu chính gốc bảo trì tận nhà", "Bảo dưỡng rơ-le phao giếng giếng tổng rít"],
      pricing: [
        { item: "Ráp tủ điều bơm tăng áp tự động điện tử", price: "Từ 300.000đ", unit: "máy" },
        { item: "Bảo dưỡng sửa chập phao điện cơ bồn tphcm", price: "Từ 200.000đ", unit: "bộ" }
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
      title: "Lắp Camera An Ninh TPHCM Góc Rộng Trọn Bộ",
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
        { item: "Hộp camera wifi Ezviz Imou rành chính hãng hcm", price: "Từ 850.000đ", unit: "mắt" }
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
      id: "d1",
      slug: "do-ro-ri-nuoc",
      title: "Dò Tìm Rò Rỉ Nước Siêu Âm TP.HCM",
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
    }
  ]
};
