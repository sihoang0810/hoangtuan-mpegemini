import React from 'react';
import PageSEO from '../components/PageSEO';
import { ShieldCheck, FileText, Calendar, MapPin, Scale, HelpCircle } from 'lucide-react';

export default function TermsOfService() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="pt-20 md:pt-28 min-h-screen pb-20 md:pb-0 bg-slate-50 text-slate-800">
      <PageSEO pageType="general" />
      
      {/* Page Header */}
      <div className="bg-white border-b border-slate-100 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 text-brand-primary font-bold text-sm uppercase tracking-widest mb-4">
            <FileText size={18} />
            <span>Điều khoản pháp lý</span>
          </div>
          <h1 className="font-extrabold text-brand-secondary tracking-tight mb-4">
            Điều Khoản Dịch Vụ
          </h1>
          <p className="text-slate-500 font-medium text-base md:text-lg">
            Áp dụng cho mọi hoạt động sửa chữa, cung cấp thiết bị và thi công cơ điện nước tại khu vực Bảo Lộc (Lâm Đồng) và TP. Hồ Chí Minh.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              Cập nhật lần cuối: 24/05/2026
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} />
              Phiên bản: 2.1 (Hoàng Tuấn MPE)
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white shadow-xl rounded-3xl p-6 md:p-12 prose prose-slate max-w-none">
          
          {/* Note regarding business type */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-2xl mb-10">
            <h3 className="text-amber-800 font-bold text-lg mb-2 flex items-center gap-2">
              <Scale size={20} className="shrink-0" />
              Lưu Ý Về Tư Cách Pháp Nhân & Mô Hình Dịch Vụ
            </h3>
            <p className="text-amber-900 text-sm leading-relaxed m-0">
              Quý khách hàng xin lưu ý: <strong>Hoàng Tuấn MPE</strong> vận hành dưới mô hình <strong>dịch vụ sửa chữa kỹ thuật gia đình phối hợp đội ngũ thợ cơ điện tự do có tay nghề cao</strong>, hoàn toàn không phải là một công ty cổ phần hay tổng công ty tập đoàn lớn. Chúng tôi hoạt động tinh gọn, tối ưu chi phí nhằm mang lại mức giá bình dân trực tiếp cho bà con hoặc chủ quản homestay, nhà dân, cửa tiệm. Tuy vậy, quy trình bảo hành, cam kết an toàn kỹ thuật và xuất hóa đơn thu chi bán lẻ luôn được bảo đảm chuẩn xác theo thỏa thuận dân sự.
            </p>
          </div>

          <div className="space-y-10 text-slate-600 leading-relaxed text-justify">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">1</span>
                Quy Định Chung & Chấp Thuận Điều Khoản
              </h2>
              <div className="space-y-3 font-medium">
                <p>
                  Bằng việc liên hệ đặt lịch, yêu cầu khảo sát, mua sắm sản phẩm chiếu sáng, cáp điện, ống nước MPE hoặc ký nhận bàn giao thiết bị từ đội ngũ <strong>Hoàng Tuấn MPE</strong>, quý khách đương nhiên thừa nhận đã đọc, hiểu thấu đáo và nhất trí cam kết tuân thủ toàn bộ các nội dung thuộc điều khoản dịch vụ này.
                </p>
                <p>
                  Chúng tôi bảo lưu quyền thay đổi, điều chỉnh, bổ sung nội dung văn bản này để phù hợp với thực tiễn pháp lý của địa phương Lâm Đồng lẫn TP.HCM mà không cần báo trước. Các cập nhật mới nhất sẽ tự động có hiệu lực ngay khi xuất bản trên trang điện tử (website) chính thức của Hoàng Tuấn MPE.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">2</span>
                Phạm Vi Dịch Vụ & Địa Bàn Triển Khai Đặc Thù
              </h2>
              <p className="mb-4">
                Hoàng Tuấn MPE chuyên cung ứng thợ lành nghề thực hiện thao tác xử lý sự cố thực địa bao gồm:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 col-span-2">
                <li>Sửa chữa hệ thống điện hộ gia đình, biệt thự, homestay, nhà nghỉ và quán ăn lẻ.</li>
                <li>Khắc phục triệt để sự cố chập cháy rò điện âm tường, mất pha, cân pha điện 3 pha sản xuất quy mô nhỏ.</li>
                <li>Siêu âm rò rỉ nước, dò tìm vị trí bể ngầm rò nước phức tạp bằng máy thu âm chuyên dụng siêu nhạy tần số cao.</li>
                <li>Lắp đặt, căn chỉnh trục máy bơm đẩy cao đồi dốc, bơm tăng áp tuần hoàn nhiệt, phục hồi giếng khoan.</li>
                <li>Lắp đặt giám sát qua camera an ninh, thiết bị đóng cắt bảo vệ giật dòng rò từ thương hiệu MPE uy tín.</li>
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                    <MapPin size={16} className="text-blue-600" />
                    Khu vực 1: TP. Bảo Lộc & lân cận
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-0">
                    Địa hình đồi dốc dốc đá như B'Lao Sire, Lộc Châu, Lộc Sơn, Lộc Phát có rủi ro đường trơn mượt mùa mưa lũ. Thời gian có mặt có thể trễ hơn 15 - 30 phút do khoảng cách giao cắt sông suối dốc đèo. Gia chủ cần thông báo chính xác vị trí trên bản đồ vệ tinh.
                  </p>
                </div>
                <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                  <h4 className="font-bold text-emerald-950 mb-2 flex items-center gap-1.5">
                    <MapPin size={16} className="text-emerald-700" />
                    Khu vực 2: TP. Hồ Chí Minh
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-0">
                    Phạm vi phục vụ tập trung tại các quận ven như Thủ Đức, Quận 9, Quận 12, Gò Vấp đến các vùng trung tâm. Thời gian điều phối thợ phụ thuộc lớn vào sự tắc nghẽn giao thông đô thị và ngập nước triều cường cục bộ đường Tô Ngọc Vân hoặc xa lộ tầm cao.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">3</span>
                Nguyên Tắc Báo Giá Minh Bạch & Chi Phí Cơ Bản
              </h2>
              <div className="space-y-3">
                <p>
                  Để gìn giữ danh tiếng "Hoàng Tuấn MPE", chúng tôi luôn cam kết thực hiện đúng nguyên lý: <strong>Không phát sinh mờ ám - Đồng ý giá mới thọc tay sửa</strong>.
                </p>
                <div className="bg-slate-100 p-5 rounded-2xl space-y-2 text-sm text-slate-600 font-medium">
                  <p>• <strong>Phí di chuyển & khảo sát ban đầu:</strong> Miễn phí hoàn toàn nếu quý khách đồng ý triển khai phương án khắc phục sửa điện nước từ thợ của chúng tôi.</p>
                  <p>• <strong>Trường hợp từ chối sửa sau khảo sát:</strong> Phụ phí di chuyển xăng xe hỗ trợ dao động từ 50.000đ - 150.000đ tùy khoảng cách địa hình quá xa đèo dốc hoặc kẹt đường đô thị giờ cao điểm.</p>
                  <p>• <strong>Linh kiện chính hãng:</strong> Thợ điện nước Hoàng Tuấn MPE tuyệt đối sử dụng đúng chuẩn vật tư MPE (áp-tô-mát, đèn LED, dây cáp, ổ cắm) hoặc thương hiệu khác theo đúng thỏa thuận hợp đồng nguyên văn. Báo giá vật tư tách bạch rõ ràng với đơn giá nhân công kỹ thuật.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">4</span>
                Nghĩa Vụ An Toàn Công Trình & Tài Sản Khách Hàng
              </h2>
              <p>
                Dịch vụ cơ điện nước mang tính rủi ro cao trực tiếp tác động đến cấu trúc hộ gia đình hay cơ sở vật chất kinh doanh nghỉ dưỡng. Hoàng Tuấn MPE xác định bổn phận hai chiều nghiêm cẩn gồm:
              </p>
              <div className="space-y-4 mt-3">
                <div className="border border-slate-200/80 rounded-2xl p-4 md:p-6">
                  <h5 className="font-bold text-brand-secondary mb-2">A. Trách nhiệm từ phía Hoàng Tuấn MPE:</h5>
                  <ul className="list-disc pl-6 space-y-1.5 text-sm">
                    <li>Thợ thi công bắt buộc ngắt nguồn điện an toàn trước đấu nối, lắp cầu chì bảo vệ hành trình, không làm việc cẩu thả gây nguy cho người già trẻ nhỏ xung quanh khu sửa.</li>
                    <li>Sử dụng máy khoan chống rung âm, búa tạ búa đục có tấm lưới chắn rác bụi bảo vệ sàn gỗ cao cấp tại các biệt thự vườn dốc Bảo Lộc hay chung cư ở TP.HCM.</li>
                    <li>Dọn dẹp trả lại mặt bằng cơ bản sạch sẽ, gom dọn mẩu đồng vụn, ống PVC cháy sau khi hoàn thành quy trình đấu điện hoặc hàn nhiệt ống PPR chịu lực.</li>
                  </ul>
                </div>
                <div className="border border-slate-200/80 rounded-2xl p-4 md:p-6">
                  <h5 className="font-bold text-brand-secondary mb-2">B. Khách hàng nghĩa vụ phối hợp:</h5>
                  <ul className="list-disc pl-6 space-y-1.5 text-sm font-medium">
                    <li>Thông báo chính xác sơ đồ mạch ngầm hay ống nước lạnh/nóng đã thi công cũ (nếu có bản vẽ) để tránh khoan trúng đường ống khác. Cung cấp lối tiếp cận tủ điện tổng dễ phân vùng ngắt nguồn.</li>
                    <li>Cất giữ tài sản giá trị cá nhân cẩn thận. Thợ sửa chữa cơ điện chỉ tập trung chuyên môn tại nơi thi công sửa chữa, gia chủ nên bố trí ít nhất 1 người giám sát tại hiện trường để bảo toàn tính xác thực khi hư hỏng bổ sung phát sinh.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">5</span>
                Điều Khoản Bảo Hành Kỹ Thuật Độc Quyền
              </h2>
              <p>
                Không mập mờ chối bỏ bảo hành, Hoàng Tuấn MPE đặt điều kiện bảo hành chặt chẽ để khách hàng an tâm gieo trọn lòng tin kỹ thuật:
              </p>
              <div className="overflow-x-auto my-6 rounded-2xl border border-slate-200 w-full">
                <table className="w-full text-left border-collapse text-sm min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-100 text-brand-secondary font-bold">
                      <th className="p-4 border-b">Hạng mục khắc phục kỹ thuật</th>
                      <th className="p-4 border-b">Thời hạn bảo hành</th>
                      <th className="p-4 border-b">Điều kiện áp dụng thực tế</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-bold">Sửa rò rỉ rách vỡ đường ống âm tường (Siêu âm)</td>
                      <td className="p-4 text-emerald-600 font-bold">03 đến 12 tháng</td>
                      <td className="p-4">Chỉ bảo hành duy nhất tại khớp ống thợ cũ hàn lại hoặc ống vá. Không chịu trách nhiệm nếu đất sụt lún dốc đồi làm thắt ống ở vị trí khác.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-bold">Sửa chập nổ hệ thống dây điện âm trần</td>
                      <td className="p-4 text-emerald-600 font-bold">03 đến 06 tháng</td>
                      <td className="p-4">Chỉ áp dụng với khoanh vùng ổ cắm hoặc nhánh phòng được xử lý trực tiếp. Không bảo hành do sét đánh hoặc quá tải tải điện máy đào dốc cao.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-bold">Lắp đặt cụm máy bơm nước gia đình</td>
                      <td className="p-4 text-emerald-600 font-bold">06 đến 12 tháng</td>
                      <td className="p-4">Sửa lỗi cơ rơle rung lắc do kỹ thuật đấu nối sai khí động lực học. Từ chối nếu giếng cạn trơ bùn cát nghẹt cánh quạt hoặc cháy do tụt áp pha lưới điện tổng.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Sản phẩm đèn LED, ổ Aptomat nhãn hiệu MPE</td>
                      <td className="p-4 text-emerald-600 font-bold">12 đến 24 tháng</td>
                      <td className="p-4">Bảo hành đổi mới 1-đổi-1 theo tiêu chí kiểm chuẩn của thương hiệu MPE tại Việt Nam. Không trầy xước nứt mẻ do tác động lực người sử dụng.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-500 italic mt-2">
                * Lưu ý: Mọi lịch hẹn yêu cầu bảo hành kỹ thuật sẽ được thợ có trách nhiệm của Hoàng Tuấn MPE tiếp nhận xử lý sớm nhất trong vòng 24h đối với TP. Bảo Lộc và 36h tại các phường nội ngoại thành kẹt xe TP.HCM.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">6</span>
                Miễn Trừ Trách Nhiệm Dân Sự Pháp Lý
              </h2>
              <p>
                Hoàng Tuấn MPE được miễn trừ nghĩa vụ pháp lý bồi thường thiệt hại vật chất trong các kịch bản bất khả kháng khách quan sau đây:
              </p>
              <ul className="list-decimal pl-6 space-y-2 mb-4 text-sm font-medium">
                <li>Hệ thống ống dẫn nước bị phá hỏng do ảnh hưởng bởi dịch chuyển địa tầng sạt lở đồi, nền sụt đất móng của homestay tự xây sai kết cấu trên đất dốc vùng núi B'Lao Lâm Đồng.</li>
                <li>Thiết bị điện tử cháy hư do hiện tượng sét trực tiếp xuyên qua lưới điện biến áp chung của khu vực Bảo Lộc hay triều cường ngập tràn ổ cắm lắp sát chân tường sàn thấp dưới cao trình tại TP.HCM.</li>
                <li>Hộ gia đình tự ý đảo lộn hệ thống ổ đấu tắt sau khi thợ đã bàn tháo rời tủ hoặc sử dụng linh phụ kiện rẻ tiền trôi nổi không do Hoàng Tuấn MPE cung ứng dẫn tới phát hỏa cục bộ.</li>
                <li>Sự cố ngột nước, mất nước chung từ công ty xả nguồn cấp nước quận thành phố hoặc nhà máy thủy lợi xả đáy, khiến máy bơm hoạt động không nước dẫn đến chảy nát phích cơ cánh quạt.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-brand-secondary border-b pb-3 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-base">7</span>
                Cơ Chế Phản Hồi & Thỏa Thuận Giải Quyết Bất Đồng
              </h2>
              <p>
                Hoàng Tuấn MPE lấy chất lượng sự hài lòng thực tế của khách hàng làm uy tín sinh mạng nuôi sống thợ cơ điện lành nghề. Vì vậy khi nảy sinh mâu thuẫn về chất lượng tay nghề thợ hay bảng giá cuối cùng, chúng tôi cam kết quy trình xử lý công bằng:
              </p>
              <div className="bg-brand-primary/5 p-6 rounded-2xl space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0 text-sm mt-0.5">I</div>
                  <div>
                    <h5 className="font-bold text-brand-secondary mb-1">Gửi phản hồi trực tiếp:</h5>
                    <p className="text-sm text-slate-600 m-0">Quý khách gọi đến số tổng quản lý duy nhất: <strong>0389 011 315</strong> hoặc nhắn gửi đầy đủ bằng chứng đối chiếu (Video ngắn / hóa đơn thu tay thợ ký) sang Zalo của Hoàng Tuấn MPE.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0 text-sm mt-0.5">II</div>
                  <div>
                    <h5 className="font-bold text-brand-secondary mb-1">Khảo sát phúc tra độc lập:</h5>
                    <p className="text-sm text-slate-600 m-0">Đích thân thợ trưởng (hoặc Hoàng Tuấn) sẽ tới hiện trường hoặc cử nhóm thợ khác đến kiểm nghiệm xác thực kỹ thuật trong tối đa 48 giờ làm việc, đảm bảo thợ không vì tự bảo thủ mà đổ lỗi trái lẽ cho gia chủ.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0 text-sm mt-0.5">III</div>
                  <div>
                    <h5 className="font-bold text-brand-secondary mb-1">Phương án bồi hoàn thiệt hại:</h5>
                    <p className="text-sm text-slate-600 m-0">Nếu chứng minh do thợ Hoàng Tuấn lắp ráp sai khớp, cắm chập dây nguội lửa gây cháy rơle thiết bị, Hoàng Tuấn MPE sẵn sàng chịu chi phí đền bù hoặc sửa chữa phục hồi miễn phí 100% không chối quanh co.</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
            <span>© {currentYear} Hoàng Tuấn MPE. Tài liệu điều khoản kỹ thuật lưu hành nội bộ và công cộng.</span>
            <div className="flex gap-4">
              <a href="#top" className="text-brand-primary hover:underline">Về đầu trang</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
