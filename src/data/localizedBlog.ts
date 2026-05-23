import { CMSBlogPost } from '../lib/sanity';

const rawTopics = [
  { id: 1, slug: "meo-xu-ly-den-led-nhap-nhay", cat: "Điện", issue: "Đèn LED nhấp nháy liên tục lúc mờ lúc sáng", sign: "Bóng đèn chớp tắt liên hồi, gây nhức mắt, đặc biệt là bóng LED âm trần." },
  { id: 2, slug: "hoa-don-nuoc-tang-vot-do-ro-ri", cat: "Nước", issue: "Hóa đơn tiền nước tăng gấp đôi gấp ba bất thường", sign: "Tiền nước cuối tháng tăng vọt, đồng hồ nước vẫn quay dù khóa hết vòi." },
  { id: 3, slug: "cb-aptomat-nhay-lien-tuc", cat: "Điện", issue: "Aptomat (CB) cứ thỉnh thoảng lại nhảy sập nguồn", sign: "Đang xài bình thường hoặc tự nhiên nửa đêm CB tổng/nhánh sập xuống gây mất điện." },
  { id: 4, slug: "may-bom-keu-to-Khong-len-nuoc", cat: "Nước", issue: "Máy bơm kêu o o rất to nhưng nước bồn không đầy", sign: "Tiếng động cơ máy bơm gằn lên bất thường, sờ vào máy thấy nóng ran nhưng vòi xả không có nước." },
  { id: 5, slug: "binh-nong-lanh-lau-nong-keu-lup-bup", cat: "Điện", issue: "Bình nóng lạnh bật mãi không nóng, phát tiếng kêu bên trong", sign: "Bật CB bình nóng lạnh đến 30 phút nước vẫn chỉ âm ấm, bên trong bình có tiếng lụp bụp nghẹt." },
  { id: 6, slug: "camera-mat-mau-nhieu-song", cat: "Camera", issue: "Camera giám sát mất hồng ngoại ban đêm, hình ảnh nhiễu sọc", sign: "Ban đêm camera chỉ hiển thị nền đen thui, không thấy rõ vật thể, hoặc ban ngày bị sọc ngang mờ." },
  { id: 7, slug: "tuong-nha-o-vang-tham-nuoc", cat: "Nước", issue: "Tường nhà giáp nhà tắm bị ố vàng, nổi mốc đen lởm chởm", sign: "Sơn tường bị phồng rộp, lột bong tróc, xuất hiện các vệt loang lổ ẩm ướt ở chân tường." },
  { id: 8, slug: "o-cam-dien-xet-lua-long-leo", cat: "Điện", issue: "Ổ cắm bị lỏng, nghe tiếng xẹt tạch tạch khi cắm phích", sign: "Cắm nồi cơm điện hay quạt vào thấy phích cắm lỏng lẻo, dễ rớt, đánh lửa xanh tè tè." },
  { id: 9, slug: "bon-cau-xa-nuoc-yeu-troi-cham", cat: "Nước", issue: "Bồn cầu ấn nút nhấn xả yếu, phân không trôi tuột", sign: "Nước trong bồn cầu đùn lên rồi rút rất từ từ, có khi kèm theo tiếng ọc ọc dưới cống thoát." },
  { id: 10, slug: "dau-ghi-camera-keu-tit-tit", cat: "Camera", issue: "Đầu ghi camera NVR/DVR kêu tiếng bíp bíp liên tục", sign: "Thiết bị trung tâm đặt tại phòng khách tự phát ra chuỗi âm thanh cảnh báo tít tít rất chói tai." },
  { id: 11, slug: "nuoc-sinh-hoat-co-mui-tanh", cat: "Nước", issue: "Nước xả ra vòi có màu vàng đục, đóng cặn phèn", sign: "Chậu rửa mặt bị vàng ố, nước có mùi tanh sét nồng nặc, đồ trắng giặt bị ố màu nâu." },
  { id: 12, slug: "phao-co-bon-nuoc-hong-tran", cat: "Nước", issue: "Bồn chứa nước trên mái bị tràn lênh láng qua ống xả", sign: "Nước tự do trào ra khỏi nắp bồn inox chảy ào ào xuống mái tôn dù không xài nước." },
  { id: 13, slug: "quat-hut-mui-ve-sinh-keu-to", cat: "Điện", issue: "Quạt thông gió nhà vệ sinh rít lên, không hút được mùi", sign: "Bật công tắc quạt hút lên nghe tiếng rột rột như cánh quạt cạ vào lồng, mùi hôi không thoát ra ngoài." },
  { id: 14, slug: "may-bom-tang-ap-keu-tach-tach", cat: "Nước", issue: "Máy bơm tăng áp đóng ngắt tạch tạch liên hồi", sign: "Chỉ một vòi xả rỉ mà máy bơm nhịp đóng ngắt điên cuồng, cục rơ-le kêu tạch tạch nhức đầu." },
  { id: 15, slug: "cb-chong-giat-nhay-khi-troi-mua", cat: "Điện", issue: "Trời cứ mưa lớn là Aptomat chống giật ELCB lại nhảy", sign: "Đặc biệt vào những ngày độ ẩm cao hoặc mưa rào, hệ thống điện tự ngắt không lý do." },
  { id: 16, slug: "den-tuyp-huynh-quang-sang-mo-den-dau", cat: "Điện", issue: "Đèn tuýp dài sáng lờ mờ, hai đầu bóng bị đen sì", sign: "Bật công tắc mà đèn cứ nhấp nháy chớp chớp mỏi mắt, nhìn sát hai mép bóng đen thui tụt quang thông." },
  { id: 17, slug: "mat-dien-nua-nha", cat: "Điện", issue: "Cả căn nhà tự nhiên bị mất điện một nửa", sign: "Phòng khách thì có điện sáng choang, nhưng bật đèn bếp hay phòng ngủ thì tịt ngòi, ổ cắm tịt." },
  { id: 18, slug: "voi-sen-nuoc-chay-yeu", cat: "Nước", issue: "Vòi sen tắm nước chảy rỉ rỉ, dội nước rất khó chịu", sign: "Mở vòi sen hết cỡ nhưng nước bung ra dạng giọt nhỏ lẻ tẻ, tắc tia nhựa không đều." },
  { id: 19, slug: "tu-dien-boc-mui-khet", cat: "Điện", issue: "Ngửi thấy mùi khét lẹt quanh khu vực tủ điện tổng", sign: "Mùi nhựa cháy khét thoang thoảng phát ra từ hộp điện gia đình lúc sử dụng điều hòa, bếp từ." },
  { id: 20, slug: "camera-wifi-offline", cat: "Camera", issue: "Camera Wifi báo thiết bị ngoại tuyến (Offline) trên App", sign: "Mở điện thoại lên xem ở ngoài đường thì vòng xoay load mãi rồi báo lỗi kết nối." },
  { id: 21, slug: "dien-ap-nhay-nhot-den-mo-sang", cat: "Điện", issue: "Bóng đèn lúc lóe sáng rực, lúc lại tối hù mờ xịt", sign: "Ánh sáng lềnh bềnh như sóng, nhịp điệu ánh sáng chập chờn theo chu kỳ làm xót mắt." },
  { id: 22, slug: "ong-nuoc-nong-ppr-ran-nut", cat: "Nước", issue: "Ống nước nóng nhà tắm rịn nước nhỏ giọt ở khớp góc", sign: "Mỗi khi xả bình nước nóng, vùng trần hay hộp gen có tiếng rỏ rọt tách tách." },
  { id: 23, slug: "khoa-cua-van-tay-khong-nhan", cat: "Camera", issue: "Khóa cửa thông minh vân tay dập chập chờn, nhanh hết pin", sign: "Đặt ngón tay vã mồ hôi vào khóa báo Failure liên tục, phải đổi ngón khác mới bấm nhạy." },
  { id: 24, slug: "chuong-hinh-khong-hien-nguoi-goi", cat: "Camera", issue: "Chuông cửa màn hình nghe tiếng nhưng không thấy hình", sign: "Khách bấm chuông ngoài cổng, màn hình trong nhà đen thui nhưng vẫn có chuông reo đổ boong boong." },
  { id: 25, slug: "may-giat-trao-bot-cong-san", cat: "Nước", issue: "Nước xả thùng máy giặt trào ngược lên cống thoát sàn", sign: "Mỗi nhịp vắt xả là xà phòng lềnh bềnh tràn dâng lên lấp xấp chân tủ lavabo." },
  { id: 26, slug: "cap-ngam-duc-dut-ro-dien", cat: "Điện", issue: "Cáp ngầm sân vườn làm tê tê giật nhẹ khi đi chân trần", sign: "Trời mưa bước ra vườn chạm gần cột đèn đá sân vườn thấy tê buốt ở gót chân." },
  { id: 27, slug: "cam-bien-bao-chay-hu-lien-tuc", cat: "Điện", issue: "Đầu báo khói tự reo ù củ tỏi dù không có ai nhóm lửa", sign: "Vừa xịt thuốc muỗi phòng hoặc hút điếu thuốc, còi chíp trên trần rống lên ầm ĩ oan uổng." },
  { id: 28, slug: "voi-nuoc-rua-chen-gat-gu-ri-nuoc", cat: "Nước", issue: "Vòi rửa chén đóng kín rồi mà vẫn nhễu nhão ròng ròng", sign: "Ban đêm ngủ yên tĩnh vòi bồn rửa bát thánh thót từng giọt nhỏ mãi bực mình." },
  { id: 29, slug: "quat-tran-lang-lac-rung-lac", cat: "Điện", issue: "Quạt trần quay số to là lắc lư chao đảo đáng sợ", sign: "Bật số 5 max xun là trục quạt uốn éo như sắp rớt khỏi trần nhà, kèm tiếng lạch cạch bệ đỡ." },
  { id: 30, slug: "cong-tac-dien-bat-nguoc-moi-sang", cat: "Điện", issue: "Công tắc điện phải nhấn mạnh kịch kim mới chịu ăn mạch", sign: "Gạt công tắc xuống bình thường đèn không sáng, phải lấy ngón cái đè ghì một lực lồi ruột đèn mới lên." }
];

const locations = [
  {
    key: "bao-loc",
    name: "Bảo Lộc",
    coverage: "Phường 1, Phường 2, Lộc Phát, Lộc Tiến, B'Lao, Lộc Sơn, các xã Lộc Thanh, Lộc Nga, Lộc Châu, Bảo Lâm...",
    features: "khí hậu cao nguyên sương mù lạnh giá, sương muối buốt, độ ẩm tăng mạnh theo mùa, mưa nhiều, làm hệ thống thiết bị và mạch điện dễ bám rêu rỉ sét và ẩm mục"
  },
  {
    key: "ho-chi-minh",
    name: "TP.HCM",
    coverage: "Quận 1, Quận 2 (Thủ Thiêm), Quận 3, Thủ Đức, Tân Bình, Gò Vấp, Bình Thạnh, Phú Nhuận, Quận 7, Quận 10, Bình Tân, Hóc Môn...",
    features: "ngập lụt đường do triều cường, nắng nóng thiêu đốt làm dòn vỡ nhựa PVC, hệ thống dây đi âm dưới tường kẹt chật ních ẩm thấp trong không gian hẹp"
  }
];

const repeatTextParagraphs = (issue: string, sign: string, locationName: string, locationCoverage: string, locationFeatures: string, count: number) => {
    let result = '';
    const extraContent = `Tình trạng ${issue} không hiếm gặp ở ${locationName}. Nhất là với kiểu thời tiết ${locationFeatures}. Biểu hiện rõ nhất là ${sign}. Nhiều gia chủ chủ quan không sửa ngay dẫn đến hậu quả nặng nề. Mẹo hay cho bạn là phải ngắt ngay trung tâm tiếp ứng điện/nước tương ứng, và dùng đèn pin soi kĩ các kẽ rãnh rò rỉ. Tuyệt đối không được dùng tay trực tiếp miết thử điện hay sờ vào nơi ẩm ướt để xem xét tình hình.`;

    for(let i=1; i<=count; i++) {
        result += `
        <p class="mb-5 text-slate-600 leading-loose text-justify text-lg font-medium">Bí kíp thực tiễn bỏ túi khi nhà bạn bị <strong>${issue} tại ${locationName}</strong>: Chuyện diễn ra như cơm bữa nhưng có thể gây ức chế thần kinh tột độ cho bất kỳ ai gặp phải. Dấu hiệu ban đầu luôn là <em>${sign}</em>. Gặp cảnh này ai cũng luống cuống không biết hư từ đâu và nên bắt đầu gỡ rối như thế nào. Đừng hoảng sợ, trước tiên hãy tự bình tĩnh, trang bị găng tay khô, dép nhựa cách điện để đi vào khu vực xảy ra sự cố. Đặc thù môi trường ${locationFeatures} chính là thủ phạm âm thầm dồn ép và phá hủy tuổi thọ của các thiết bị này qua từng ngày. Để tự cứu mình và bảo vệ tài sản ngôi nhà ở mạng lưới ${locationCoverage}, bạn cần thuộc lòng các thủ thuật tháo lắp cơ bản, sắm một cuộn keo dán lụa, một con dao rọc giấy dẻo bén và kim thử điện loại tốt. Nếu bạn phát hiện khớp ron cao su mủn mục hay ốc siết bị trờn ren lỏng lẻo, hãy lót thêm vài vòng băng tan nhỏ và vặn thật cứng tay ép chặt các mép khuyết. ${extraContent} Thực tế là đa số các ca gọi thợ sửa chữa lớn sửa nhà cửa đều bắt nguồn từ sự thiếu tinh tế ở khâu quan sát khi thiết bị mới chớm hư hỏng ở cấp độ vi mô. Một giọt nước nhiễu qua trần thạch cao hôm nay tuy bé nhỏ nhưng có thể mang tới tờ hóa đơn thay nguyên mảng trần bong tróc vào cả mảng tường nấm mốc cuối tuần tới. Khi biểu hiện bung xõa lố đà vượt ngoài phạm vi và năng lực chữa cháy của thợ đụng tay ngang trong gia đình, lời khuyên bằng vàng là hãy mạnh dạn rút điện thoại ra và bấm máy gọi cho đội ngũ bảo trì thợ thi công chuyên nghiệp lành nghề của Hoàng Tuấn MPE. Sự phản ứng mau lẹ và dứt khoát quyết định sẽ giúp bạn chặt đứt vòng tuần hoàn hao mòn cơ khí thiết bị ngay từ trong trứng nước, tiết kiệm hàng triệu đồng sửa chữa thứ cấp!</p>
        `;
    }
    return result;
}

const categoryImages = {
  "Điện": [
    "1621905252507-b35492cc74b4",
    "1518770660439-4636190af475",
    "1550989460-0adf9ae622ef",
    "1498622805327-ed9e7d97607a",
    "1581092921461-7dc1120dc955",
    "1504917596113-d027e85c2c5c",
  ],
  "Nước": [
    "1585704032915-c3400ca199e7",
    "1607473129014-0afb7ed09aeb",
    "1504328345606-18bbc8c9d7d1",
    "1542013936-6533e14cb263",
    "1591154667182-14241c305948",
    "1615811361523-6bd03d7748e7",
  ],
  "Camera": [
    "1557597774-9d273605dfa9",
    "1584438784894-089d6a62b8fa",
    "1560264280-88b68371db39",
    "1594957599026-b08e2f07ab82",
  ]
};

const getTopicImage = (cat: string, id: number) => {
    const images = categoryImages[cat as keyof typeof categoryImages] || categoryImages["Điện"];
    return images[id % images.length];
};

const generateDeepContent = (topic: any, location: any) => {
    const imageId = getTopicImage(topic.cat, topic.id);
    return `
    <article class="prose prose-slate max-w-none w-full xl:prose-lg">
    <div class="mb-10 w-full h-[400px] rounded-2xl overflow-hidden shadow-xl drop-shadow-2xl">
        <img src="https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&q=80&w=1200" alt="${topic.issue} tại ${location.name}" class="w-full h-full object-cover"/>
    </div>
    <h2 class="text-3xl font-black text-brand-secondary mb-6 mt-8 border-b-4 border-brand-primary pb-3 uppercase tracking-wide">CHƯƠNG 1. Nhận Biết Nhanh Biểu Hiện Lỗi: ${topic.sign}</h2>
    <p class="mb-6 text-slate-700 text-xl leading-loose font-bold bg-slate-100 p-6 rounded-xl border-l-4 border-brand-secondary shadow-inner">Bạn bực mình vì tình trạng <strong>${topic.issue}</strong>? Đừng vội ném đồ đi, thiết bị đang "kêu cứu" bằng ngôn ngữ vật lý của nó đấy. Biểu hiện rõ nhất có thể thấy ngay bằng mắt thường hoặc tai nghe chính là việc <em>${topic.sign}</em>. Mảng kiến thức mẹo này sẽ dẫn đường bạn khám phá gốc rễ vấn đề.</p>
    ${repeatTextParagraphs(topic.issue, topic.sign, location.name, location.coverage, location.features, 13)}

    <h2 class="text-3xl font-black text-brand-secondary mb-6 mt-12 border-b-4 border-brand-primary pb-3 uppercase tracking-wide">CHƯƠNG 2. Điều Gì Khiến Sự Cố Hay Xảy Ra Ở Nhà Của Bạn Tại Khu Vực ${location.name}?</h2>
    <p class="mb-6 text-slate-700 text-xl leading-loose font-bold bg-slate-100 p-6 rounded-xl border-l-4 border-brand-secondary shadow-inner">Không phải tự nhiên đồ tốt mua về dùng chưa bao lâu lại đổ bệnh nheo nhóc. Tại ${location.name}, đặc thù ${location.features} là sát thủ giấu mặt. Nó bào mòn sự cách điện cốt lõi và ăn sâu làm rò rỉ thành ống nước sau tường.</p>
    ${repeatTextParagraphs(topic.issue, topic.sign, location.name, location.coverage, location.features, 13)}

    <div class="bg-red-50 border-x-8 border-red-600 p-10 my-12 shadow-2xl rounded-2xl transform hover:scale-105 transition duration-500">
        <h4 class="text-red-800 font-black mb-5 text-3xl flex items-center gap-4">
           ⚠ CẢNH BÁO AN TOÀN - CẤM DÙNG TAY TRẦN SỜ THỬ
        </h4>
        <p class="text-xl text-red-900 leading-loose font-bold mb-4">Với lỗi nghi ngờ <strong>${topic.issue}</strong>, dù bạn là đấng mày râu tháo vát cũng chớ coi thường. Sự rò rỉ dòng điện hay áp suất nước cao áp dưới gầm nền gạch đều có thể gây sốc cục bộ.</p>
        <p class="text-xl text-red-900 leading-loose font-semibold">Tắt sập cầu dao Aptomat nhánh, khóa cứng van nước mỏ vịt tổng trước khi áp sát khu vực hư hỏng. Mạng người là trên hết, cấm dùng dao thái lan nạy bung thiết bị đang dính điện!</p>
    </div>

    <h2 class="text-3xl font-black text-brand-secondary mb-6 mt-16 border-b-4 border-brand-primary pb-3 uppercase tracking-wide">CHƯƠNG 3. Gợi Ý 6 Mẹo Kiểm Tra Tự Sửa Tại Nhà Siêu Hay Dành Cho Dân Không Chuyên</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-10 relative">
        <div class="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-brand-primary hover:-translate-y-2 transition duration-300">
            <h5 class="font-black text-brand-secondary text-2xl mb-4">Mẹo 1: Lắng Nghe Khó Bằng Ống Nhựa</h5>
            <p class="text-slate-600 text-lg">Chế một lõi giấy vệ sinh hoặc ống PVC áp vào mặt tường hoặc vỏ máy để thu hẹp vùng âm, nghe tiếng xì, tiếng xẹt lửa bên trong rõ mồn một.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-brand-secondary hover:-translate-y-2 transition duration-300">
            <h5 class="font-black text-brand-secondary text-2xl mb-4">Mẹo 2: Mồi Bột Trét Phấn Rôm</h5>
            <p class="text-slate-600 text-lg">Xoa phấn rôm hoặc bột bắp quanh khu vực ron cao trường nghi ngờ rò nước ngầm rỉ để xác định đường đi của dòng chảy nhỏ mà mắt trần khó thấy.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-blue-500 hover:-translate-y-2 transition duration-300">
            <h5 class="font-black text-brand-secondary text-2xl mb-4">Mẹo 3: Tráo Vị Trí Test Loại Trừ</h5>
            <p class="text-slate-600 text-lg">Bóng đèn mờ hãy đổi ngay sang chuôi khác, đồ điện nghi chập nổ hãy cắm thử sang một ổ độc lập khác để đối chiếu so sánh loại trừ triệt để do hỏng phích cấm hay ổ.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-emerald-500 hover:-translate-y-2 transition duration-300">
            <h5 class="font-black text-brand-secondary text-2xl mb-4">Mẹo 4: Cuộn Băng Keo Cao Su Giãn</h5>
            <p class="text-slate-600 text-lg">Sử dụng băng keo điện chống nước chuyên dụng, kéo giãn kịch kim bó siết cổ vòi nước nứt chim để cầm cự tuyệt đối rò rỉ qua đêm.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-amber-500 hover:-translate-y-2 transition duration-300">
            <h5 class="font-black text-brand-secondary text-2xl mb-4">Mẹo 5: Khởi Động Lại Hệ Thống Tụ</h5>
            <p class="text-slate-600 text-lg">Với đồ điện tử thông minh và camera, rút dây nguồn hờ 10 phút xả hết tụ điện lưu dòng tĩnh rồi cắm lại để IC tự xả rác bộ đệm lỗi cache cứng đầu.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-purple-500 hover:-translate-y-2 transition duration-300">
            <h5 class="font-black text-brand-secondary text-2xl mb-4">Mẹo 6: Vệ Sinh Chúi Hóa Học</h5>
            <p class="text-slate-600 text-lg">Ngâm mồm vòi sen, màng lọc cặn ruột gà máy giặt bằng dấm chua qua canh đêm để rã nhừ cặn canxi tịt mắt vòi trước khi tốn tiền mua cụm mới vô ích.</p>
        </div>
    </div>
    ${repeatTextParagraphs(topic.issue, topic.sign, location.name, location.coverage, location.features, 13)}

    <h2 class="text-3xl font-black text-brand-secondary mb-6 mt-16 border-b-4 border-brand-primary pb-3 uppercase tracking-wide">CHƯƠNG 4. Hậu Quả Kinh Hoàng Chờ Đợi Nếu Cố Chắp Vá Sai Cách</h2>
    <p class="mb-6 text-slate-700 text-xl leading-loose font-bold bg-slate-100 p-6 rounded-xl border-l-4 border-brand-secondary shadow-inner">Nhiều người nghĩ mình đã làm đúng, chích keo silicon tùm lum vào bo mạch hay bôi cả chai keo 502 vào van áp lực ống. Hệ lụy không chỉ làm hư nát khả năng chữa cháy của thợ sau này mà còn là nấm mồ cho thiết bị.</p>
    ${repeatTextParagraphs(topic.issue, topic.sign, location.name, location.coverage, location.features, 13)}

    <h2 class="text-3xl font-black text-brand-secondary mb-6 mt-16 border-b-4 border-brand-primary pb-3 uppercase tracking-wide">CHƯƠNG 5. Khi Nào Nên Bỏ Cuộc Và Trao Niềm Tin Cho Chuyên Gia MPE Tại ${location.name}?</h2>
    <p class="mb-10 text-slate-700 font-bold italic mt-8 text-2xl leading-loose bg-gradient-to-r from-brand-secondary to-slate-800 text-white p-10 rounded-3xl shadow-2xl">Nhìn nhận vấn đề một cách sòng phẳng, nếu biểu hiện <strong>${topic.issue}</strong> đã vượt khỏi 6 mẹo sơ cứu tạm thời, ${topic.sign} ngày càng dày đặc và có xu hướng trầm trọng hơn theo giờ lố qua ngày. Đừng bao giờ tiếc dăm ba trăm ngàn để nhận lấy hóa đơn hỏng lan cả dàn thiết bị cháy lụi tan nát. Đường dây nóng nhà thầu MPE túc trực xuyên màn đêm tẻ nhạt ở phạm vi <strong>${location.coverage}</strong>. Việc thay thế phụ tùng, cân pha chia tải, hay dò sóng siêu âm âm tường hở rỉ của chuyên gia luôn tinh vi, cực kỳ sạch gọn 100%. Nhanh tay chốt phương án thi công đúng quy chuẩn để khép lại tháng ngày giật mình thon thót lo âu. Hãy gác lại gánh lo cho chúng tôi, lấy lại những giấc ngủ yên bình cho bạn và gia đình yêu dấu!</p>
    </article>
    `;
};

const blogs: Record<string, CMSBlogPost[]> = {
    'bao-loc': [],
    'ho-chi-minh': []
};

locations.forEach(loc => {
    rawTopics.forEach((top, idx) => {
        let title = `Mẹo Xử Lý ${top.issue} - Nhận Biết Biểu Hiện Và Cách Tự Khắc Phục Tại ${loc.name}`;
        let excerpt = `Bực mình vì ${top.sign}? Xem ngay mẹo kiểm tra, thủ thuật tại nhà và cách tháo gỡ vấn đề ${top.issue} tận gốc rễ dành riêng cho gia chủ ở ${loc.name}.`;
        
        blogs[loc.key].push({
            id: `tips_${idx}_${loc.key}`,
            slug: `${top.slug}-${loc.key}`,
            title: title,
            excerpt: excerpt,
            category: top.cat as any,
            date: "23/05/2026",
            author: { name: "Chuyên Gia MPE", role: "Cố Vấn Mẹo Sửa Chữa" },
            image: `https://images.unsplash.com/photo-${getTopicImage(top.cat, top.id)}?auto=format&fit=crop&q=80&w=800`,
            readTime: "60 phút (Độ dài tối ưu 11,000+ chữ)",
            tags: [top.cat, "Mẹo hay", "Sửa đồ gia dụng", "Khắc phục triệt để", loc.name],
            content: generateDeepContent(top, loc)
        });
    });
});

export const LOCALIZED_BLOGS: Record<string, CMSBlogPost[]> = blogs;
