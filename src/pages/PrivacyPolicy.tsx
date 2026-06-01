import React from 'react';
import PageSEO from '../components/PageSEO';
import { ShieldAlert, Fingerprint, Lock, EyeOff, Server, UserCheck, Calendar } from 'lucide-react';

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-slate-50 text-slate-800">
      <PageSEO pageType="general" />
      
      {/* Page Header */}
      <div className="bg-white border-b border-slate-100 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 text-brand-primary font-bold text-sm uppercase tracking-widest mb-4">
            <Lock size={18} />
            <span>Quyền riêng tư tối cao</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-secondary tracking-tight mb-4">
            Chính Sách Bảo Mật
          </h1>
          <p className="text-slate-500 font-medium text-base md:text-lg">
            Cam kết tôn trọng quyền riêng tư, bảo mật thông tin liên lạc và dữ liệu thực tế tại thực địa của bà con khách hàng Việt Nam.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              Cập nhật lần cuối: 24/05/2026
            </span>
            <span className="flex items-center gap-1.5">
              <Fingerprint size={14} />
              ID Bảo mật: PP-HTMPE-2026
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white shadow-xl rounded-3xl p-6 md:p-12 prose prose-slate max-w-none">
          
          {/* Note section */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-2xl mb-10">
            <h3 className="text-emerald-900 font-bold text-lg mb-2 flex items-center gap-2">
              <UserCheck size={20} className="shrink-0" />
              Cam Kết "Ba Không" Bảo Vệ Khách Hàng
            </h3>
            <p className="text-emerald-950 text-sm leading-relaxed m-0 font-medium">
              Hoàng Tuấn MPE hoạt động với tôn chỉ bảo mật gia đình tuyệt đối: 
              <strong> KHÔNG</strong> chia sẻ thông tin số điện thoại định danh, 
              <strong> KHÔNG</strong> bán dữ liệu địa chỉ cho các đơn vị bất động sản quảng cáo mạng, và 
              <strong> KHÔNG</strong> tự ý đăng tải video quay cận cảnh nội thất sinh hoạt phòng ốc nhà dân khi chưa được gia chủ gật đầu đồng ý.
            </p>
          </div>

          <div className="space-y-10 text-slate-600 leading-relaxed text-justify w-full">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">1</span>
                Những Thông Tin Hoàng Tuấn MPE Thu Thập
              </h2>
              <p>
                Để thực hiện công tác chẩn đoán lỗi cơ điện từ xa và cử thợ đến đúng địa chỉ căn hộ, homestay trong hẻm sâu hoặc sườn dốc đồi, chúng tôi tiến hành ghi nhận một số thông tin cơ bản bao gồm:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Thông tin liên lạc cơ bản:</strong> Họ và tên tự xưng của khách hàng, số điện thoại liên lạc chính (để thợ tiện gọi xác nhận hành trình di chuyển), địa chỉ nơi cần thi công sửa chữa (nhà vườn, dự án nông trại nghỉ dưỡng ở Bảo Lộc, căn hộ chung cư hay nhà phố quận huyện HCM).</li>
                <li><strong>Hình ảnh / Video thực trạng lỗi:</strong> Các tệp hình ảnh, ghi âm tiếng rít bục vỡ của rơle máy bơm, video siêu âm tiếng xì xào của ống rò nước ngầm, hoặc ảnh chụp mã lỗi hiển thị trên aptomat MPE do gia chủ gửi qua Zalo hoặc biểu mẫu đặt chỗ trên website.</li>
                <li><strong>Dữ liệu định vị GPS (Không bắt buộc):</strong> Chia sẻ định vị bản đồ thông qua Zalo để thợ Hoàng Tuấn tìm tuyến đường ngắn nhất vượt tránh nẻo đèo dốc sạt lở hoặc các cung đường một chiều đông đúc kẹt xe tại Sài Gòn.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">2</span>
                Mục Đích Sử Dụng Dữ Liệu
              </h2>
              <p className="mb-4">
                Dữ liệu thu thập hoàn toàn không dùng cho hoạt động thương mại hóa thông tin, mà phục vụ sát mặt các nghiệp vụ dân sự dưới đây:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                  <h4 className="font-bold text-slate-800 mb-2">Thực thi lịch hẹn sửa đổi</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-0">
                    Phân bổ thợ gần nhất để tiết kiệm thời gian chờ đợi của bạn. Liên hệ xác nhận giờ hẹn thợ gõ cửa bảo vệ quyền lợi an tâm, không gây đột xuất phiền toái.
                  </p>
                </div>
                <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                  <h4 className="font-bold text-slate-800 mb-2">Truy xuất nguồn gốc bảo hành</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-0">
                    Đối chiếu lịch sử thay lắp thiết bị (Ví dụ: thay Aptomat chống giật MPE ngày nào, lắp ráp đường ống siêu âm vào tháng nào) để đối soát bảo hành đổi mới không cần bận tâm mất hóa đơn giấy.
                  </p>
                </div>
                <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                  <h4 className="font-bold text-slate-800 mb-2">Nâng cao an toàn nghề nghiệp</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-0">
                    Ghi nhớ lỗi mỏ kỹ thuật của khu vực (lưới điện sụt thế tại Lộc Châu lúc chiều muộn, hay triều cường nhấn ngập hầm cáp điện tại Thủ Đức) từ đó chuẩn bị máy móc dụng cụ ứng biến phù hợp.
                  </p>
                </div>
                <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                  <h4 className="font-bold text-slate-800 mb-2">Chia sẻ kinh nghiệm nghề (Tự nguyện)</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-0">
                    Chúng tôi có thể ghi lại một số hình ảnh xử lý rò rỉ nước ngầm thành công bằng máy siêu âm hiện đại để đăng blog hướng dẫn cộng đồng. Hoàng Tuấn cam kết sẽ làm mờ hoàn toàn khuôn mặt của khách hàng và bảng số nhà nhạy cảm.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">3</span>
                Lưu Trữ Và Bảo Vệ An Toàn Thông Tin Số
              </h2>
              <p>
                Vì không vận hành hệ thống máy chủ dữ liệu khổng lồ đầy kẽ hở mạng dễ bị hacker tấn công, Hoàng Tuấn MPE lưu trữ thông tin theo tôn chỉ tối giản hóa lưu giữ vật lý:
              </p>
              <div className="space-y-4 text-sm mt-3">
                <div className="flex gap-3 items-start border-l-2 border-brand-primary pl-4">
                  <span className="font-bold text-brand-secondary">Lưu trữ đầu Zalo/SĐT:</span>
                  <p className="m-0 text-slate-600">Những liên lạc cũ nằm bảo mật trên hệ thống máy trạm cá nhân mã hóa của riêng quản lý Hoàng Tuấn để tra cứu bảo hành. Thiết bị được cài mật khẩu khóa sinh trắc học vân tay tuyệt đối.</p>
                </div>
                <div className="flex gap-3 items-start border-l-2 border-brand-primary pl-4">
                  <span className="font-bold text-brand-secondary">Bản vẽ thiết kế & thi công:</span>
                  <p className="m-0 text-slate-600">Với các dự án nông trại nghỉ dưỡng hoặc tòa homestay quy mô vừa, bản vẽ hạ tầng điện nước bàn giao lưu dưới dạng file PDF mã hóa ngoại tuyến, chỉ thợ kỹ thuật trưởng phụ trách công trình được phép truy cập.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">4</span>
                Sử Dụng Cookies Trên Website Trải Nghiệm Khách Hàng
              </h2>
              <p>
                Trang web của Hoàng Tuấn MPE chỉ tận dụng cookies tối giản từ trình duyệt Google Chrome, Safari hoặc Cốc Cốc của khách hàng để thực hiện những tính năng cơ bản phi cá nhân hóa:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ghi nhớ khu vực bạn đã chọn (nhằm lưu session không buộc người dùng phải chọn lại "Bảo Lộc" hay "TP.HCM" mỗi khi tải lại trang dịch vụ).</li>
                <li>Hỗ trợ đo lường lượng truy cập tổng quan nặc danh (Google Analytics) giúp chúng tôi hiểu nội dung tư vấn kỹ thuật cơ điện nào được bà con quan tâm nhất để gia tăng chất lượng chia sẻ.</li>
              </ul>
              <p className="mt-2 text-sm italic">
                * Quý khách có toàn quyền khước từ hoặc xóa sạch tệp cookies này bất cứ lúc nào trong bảng tùy chỉnh cài đặt bảo mật trực tiếp của ứng dụng duyệt web.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">5</span>
                Quyền Hạn Của Quý Khách Hàng Với Thông Tin Cá Nhân
              </h2>
              <p>
                Tuy không phải là một tập đoàn công nghệ lớn, Hoàng Tuấn MPE luôn tuyệt đối tôn trọng các quyền dân sự về dữ liệu của quý khách. Bạn có toàn quyền yêu cầu:
              </p>
              <div className="bg-slate-100 p-6 rounded-2xl space-y-3 text-sm">
                <p>• <strong>Quyền tra cứu sửa đổi:</strong> Gọi trực tiếp yêu cầu cập nhật lại địa chỉ nhà mới, số điện thoại người đại diện mới hoặc đề nghị thợ ghi chú riêng cho khu chung cư dốc có quy định kiểm soát thi công nghiêm khắc.</p>
                <p>• <strong>Quyền xóa sạch dữ liệu liên hệ:</strong> Bạn có quyền đề nghị Hoàng Tuấn xóa vĩnh viễn cuộc thoại, lịch sử trao đổi hình ảnh, số điện thoại cá nhân khỏi thư mục khách hàng cũ nếu đã kết thúc bảo hành và không còn nhu cầu tương tác kỹ thuật sau này.</p>
                <p>• <strong>Quyền yêu cầu gỡ ảnh thực tế:</strong> Nếu vô tình phát hiện ra hình ảnh khu vườn hoặc bức tường bị rò âm của gia đình xuất hiện trên các bài viết chia sẻ kinh nghiệm kỹ thuật của Hoàng Tuấn MPE, hãy nhắn Zalo, chúng tôi cam kết gỡ bài đăng hoặc xóa ảnh tuyệt đối ngay lập tức ròng rã trong vòng 10 phút nhận thông tin.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">6</span>
                Ủy Quyền Chia Sẻ Do Yêu Cầu Pháp Lý Trực Diện
              </h2>
              <p>
                Hoàng Tuấn MPE chỉ thực hiện việc chia sẻ hay cung cấp thông tin liên hệ, địa chỉ khảo sát của khách hàng sang bên thứ ba trong trường hợp cực kỳ hãn hữu và mang tính cưỡng chế pháp lý bao gồm:
              </p>
              <ul className="list-decimal pl-6 space-y-2 mb-4 text-sm font-medium">
                <li>Nhận văn bản yêu cầu chính thức từ cơ quan kiểm soát kỹ thuật phòng cháy chữa cháy hoặc Cơ quan Điều tra Thẩm quyền địa phương (Lâm Đồng / TP.HCM) liên quan đến sự cố hỏa hoạn chập mạch nghiêm trọng hoặc ranh giới tranh chấp đất đai rò rỉ dẫn tới sập tường nhà hàng xóm bên cạnh.</li>
                <li>Phục vụ quá trình giám định bồi thường rủi ro của Công ty Bảo hiểm Tài sản được sự ủy nhiệm đại diện từ chính phía chủ nhà.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">7</span>
                Thông Tin Liên Hệ Tiếp Nhận Khiếu Nại Bảo Mật
              </h2>
              <p>
                Mọi ý kiến đóng góp, thắc mắc hay khiếu nại về hành vi rò rỉ thông tin liên lạc của thợ trực thuộc Hoàng Tuấn MPE hoặc yêu cầu chỉnh sửa hình ảnh dự án thực tế, xin vui lòng gửi trực tiếp về cho ban quản lý Hoàng Tuấn để xử lý tận tâm:
              </p>
              <div className="bg-brand-primary/5 p-6 rounded-2xl text-slate-700">
                <p className="font-bold text-brand-secondary mb-1">ĐƯỜNG DÂY NÓNG CHĂM SÓC KHÁCH HÀNG HOÀNG TUẤN MPE:</p>
                <ul className="list-none pl-0 space-y-1.5 font-medium">
                  <li>• Điện thoại tiếp nhận: <a href="tel:0389011315" className="text-brand-primary font-bold hover:underline">0389 011 315</a> (Hoạt động cả chủ nhật và ngày lễ)</li>
                  <li>• Thư điện tử: <a href="mailto:hoangtuanmpe@gmail.com" className="text-brand-primary font-bold hover:underline">hoangtuanmpe@gmail.com</a></li>
                  <li>• Văn phòng Bảo Lộc: 279 B'Lao Sire, Phường 3, Bảo Lộc, Lâm Đồng</li>
                  <li>• Văn phòng TP.HCM: 528/17 Tô Ngọc Vân, Phường Tam Bình, Thủ Đức, TP. Hồ Chí Minh</li>
                </ul>
              </div>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
            <span>© {currentYear} Hoàng Tuấn MPE. Tài liệu bảo vệ quyền riêng tư người tiêu dùng dịch vụ kỹ thuật.</span>
            <div className="flex gap-4">
              <a href="#top" className="text-brand-primary hover:underline">Về đầu trang</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
