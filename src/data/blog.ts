import { Zap, Droplet, Video, Search, Clock, User } from 'lucide-react';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  image: string;
  readTime: string;
  tags: string[];
  faq?: { question: string; answer: string }[];
}

export const BLOG_CATEGORIES = [
  { id: 'all', title: 'Tất cả' },
  { id: 'electrical', title: 'Điện', icon: Zap },
  { id: 'plumbing', title: 'Nước', icon: Droplet },
  { id: 'camera', title: 'Camera', icon: Video },
  { id: 'detection', title: 'Dò Tìm', icon: Search },
];

export const BLOG_POSTS: BlogPost[] = [
  // ĐIỆN
  {
    id: 'b1',
    slug: 'nguyen-nhan-chap-dien-thuong-gap',
    title: '5 Nguyên nhân chập điện thường gặp và cách phòng tránh hiệu quả',
    excerpt: 'Chập điện là một trong những mối nguy hiểm hàng đầu dẫn đến hỏa hoạn trong gia đình. Tìm hiểu nguyên nhân và giải pháp phòng ngừa.',
    category: 'Điện',
    date: '15/05/2024',
    author: { name: 'Kỹ sư Tuấn', role: 'Chuyên gia điện dân dụng' },
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    readTime: '6 phút',
    tags: ['chập điện', 'an toàn điện', 'sửa điện'],
    content: `
      <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Nguyên nhân chập điện"/>
      <h2>Tại sao chập điện lại xảy ra?</h2>
      <p>Chập điện (ngắn mạch) xảy ra khi hai dây dẫn điện có điện thế khác nhau tiếp xúc trực tiếp với nhau mà không qua linh kiện tiêu thụ điện.</p>
      
      <h3>1. Hệ thống dây dẫn quá tải</h3>
      <p>Việc sử dụng quá nhiều thiết bị công suất lớn (máy lạnh, lò vi sóng, bếp điện) trên cùng một đường dây nhỏ sẽ làm dây nóng chảy lớp vỏ cách điện.</p>

      <h3>2. Mối nối lỏng lẻo</h3>
      <p>Các điểm nối dây điện sau một thời gian bị oxy hóa hoặc thợ lắp đặt không kỹ sẽ sinh nhiệt tại điểm tiếp xúc, dẫn đến nóng chảy và chập cháy.</p>

      <h3>3. Thiết bị điện kém chất lượng</h3>
      <p>Sử dụng ổ cắm, công tắc hoặc dây dẫn không rõ nguồn gốc, không chịu được tải trọng thực tế là nguyên nhân cực kỳ phổ biến.</p>

      <h3>4. Tác động của môi trường và côn trùng</h3>
      <p>Chuột cắn dây điện, hoặc độ ẩm cao làm mục lớp vỏ bảo vệ dây điện âm tường.</p>

      <div class="bg-slate-50 p-6 rounded-2xl border-l-4 border-brand-primary my-8">
        <strong>Lời khuyên từ chuyên gia:</strong> Nên kiểm tra hệ thống điện định kỳ 6 tháng/lần và lắp đặt Aptomat chống giật để bảo vệ gia đình.
      </div>
    `
  },
  {
    id: 'b2',
    slug: 'cach-xu-ly-aptomat-bi-nhay',
    title: 'Cách xử lý khi Aptomat bị nhảy liên tục - Tuyệt đối không được xem thường',
    excerpt: 'Aptomat nhảy là dấu hiệu hệ thống điện đang gặp vấn đề. Đừng cố bật lại nhiều lần nếu chưa tìm ra nguyên nhân.',
    category: 'Điện',
    date: '12/05/2024',
    author: { name: 'Hoàng Tuấn', role: 'Kỹ thuật viên trưởng' },
    image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80&w=800',
    readTime: '5 phút',
    tags: ['aptomat', 'nhảy CB', 'sửa điện'],
    content: `
      <img src="https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Aptomat bị nhảy liên tục"/>
      <h2>Nguyên nhân và cách xử lý Aptomat bị nhảy liên tục</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  {
    id: 'b3',
    slug: 'dau-hieu-dien-am-tuong-bi-hong',
    title: 'Dấu hiệu nhận biết hệ thống điện âm tường bị hỏng hoặc rò rỉ',
    excerpt: 'Làm thế nào để biết dây điện âm tường gặp sự cố mà không cần đục tường? Hãy chú ý 4 dấu hiệu quan trọng sau.',
    category: 'Điện',
    date: '10/05/2024',
    author: { name: 'Kỹ sư Tuấn', role: 'Chuyên gia điện' },
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800',
    readTime: '7 phút',
    tags: ['điện âm tường', 'rò điện', 'dò điện'],
    content: `
      <img src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Dấu hiệu điện âm tường bị hỏng"/>
      <h2>Dấu hiệu hệ thống điện âm tường có vấn đề</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  
  // NƯỚC
  {
    id: 'b4',
    slug: 'dau-hieu-ro-ri-nuoc-am-tuong',
    title: '4 Dấu hiệu rò rỉ nước âm tường khiến hóa đơn tiền nước tăng vọt',
    excerpt: 'Nhà bạn không dùng nhiều nhưng hóa đơn tiền nước vẫn cao? Rất có thể ống nước âm tường đã bị vỡ.',
    category: 'Nước',
    date: '20/05/2024',
    author: { name: 'Minh Hoàng', role: 'Kỹ thuật viên nước' },
    image: 'https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800',
    readTime: '4 phút',
    tags: ['rò rỉ nước', 'tiết kiệm nước', 'sửa nước'],
    content: `
      <img src="https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Dấu hiệu rò rỉ nước âm tường"/>
      <h2>Cách nhận biết rò rỉ nước âm tường kịp thời</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  {
    id: 'b5',
    slug: 'cach-kiem-tra-duong-nuoc-bi-ro',
    title: 'Hướng dẫn tự kiểm tra đường nước bị rò rỉ tại nhà cực kỳ đơn giản',
    excerpt: 'Chỉ với chiếc đồng hồ nước và 30 phút quan sát, bạn có thể xác định hệ thống nước có đang bị rò rỉ hay không.',
    category: 'Nước',
    date: '18/05/2024',
    author: { name: 'Kỹ thuật viên Tuấn', role: 'Chuyên gia nước' },
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800',
    readTime: '5 phút',
    tags: ['đồng hồ nước', 'rò rỉ nước'],
    content: `
      <img src="https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Kiểm tra đường nước rò rỉ"/>
      <h2>Hướng dẫn tự kiểm tra đường nước rò rỉ tại nhà</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  
  // CAMERA
  {
    id: 'b6',
    slug: 'nen-lap-camera-wifi-hay-dau-ghi',
    title: 'Nên lắp Camera Wifi hay Camera đầu ghi? Phân tích ưu và nhược điểm',
    excerpt: 'Lựa chọn camera phù hợp cho gia đình là bài toán khó. Hãy cùng Hoàng Tuấn MPE tìm ra giải pháp tối ưu nhất.',
    category: 'Camera',
    date: '22/05/2024',
    author: { name: 'Hoàng Tuấn', role: 'Chuyên gia an ninh' },
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
    readTime: '8 phút',
    tags: ['camera wifi', 'camera đầu ghi', 'an ninh'],
    content: `
      <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Lắp camera wifi hay đầu ghi"/>
      <h2>Nên lắp Camera Wifi hay Camera đầu ghi?</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  {
    id: 'b7',
    slug: 'vi-tri-lap-camera-hieu-qua',
    title: '5 Vị trí lắp đặt camera trong nhà hiệu quả nhất để quan sát và bảo vệ',
    excerpt: 'Lắp camera ở đâu để không có điểm mù? Cách bố trí camera đảm bảo an ninh tối đa cho ngôi nhà của bạn.',
    category: 'Camera',
    date: '21/05/2024',
    author: { name: 'Tuấn Camera', role: 'Kỹ thuật viên an ninh' },
    image: 'https://images.unsplash.com/photo-1521233013499-4d1193363e79?auto=format&fit=crop&q=80&w=800',
    readTime: '6 phút',
    tags: ['lắp camera', 'vị trí camera'],
    content: `
      <img src="https://images.unsplash.com/photo-1521233013499-4d1193363e79?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Vị trí lắp đặt camera"/>
      <h2>Các vị trí lắp đặt camera quan sát hiệu quả nhất</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  
  // SIÊU ÂM
  {
    id: 'b8',
    slug: 'do-ro-ri-nuoc-am-tuong-la-gi',
    title: 'Dò rò rỉ nước âm tường là gì? Tại sao cần gọi thợ chuyên nghiệp?',
    excerpt: 'Tìm hiểu về công nghệ dò tìm rò rỉ nước hiện đại không cần đục phá, giúp bảo vệ kết cấu ngôi nhà của bạn.',
    category: 'Dò Tìm',
    date: '25/05/2024',
    author: { name: 'Kỹ sư Hoàng', role: 'Chuyên gia siêu âm' },
    image: 'https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800',
    readTime: '7 phút',
    tags: ['siêu âm nước', 'dò rò rỉ'],
    content: `
      <img src="https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Dò rò rỉ nước âm tường là gì"/>
      <h2>Tìm hiểu công nghệ dò rò rỉ nước âm tường</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  {
    id: 'b9',
    slug: 'thiet-bi-do-ro-ri-nuoc-hien-dai',
    title: 'Những thiết bị siêu âm dò rò rỉ nước hiện đại nhất đang được tin dùng',
    excerpt: 'Khám phá các loại máy móc hiện đại giúp Hoàng Tuấn MPE tìm ra các điểm rò rỉ nước khó nhất một cách dễ dàng.',
    category: 'Dò Tìm',
    date: '24/05/2024',
    author: { name: 'Hoàng Tuấn', role: 'Kỹ thuật viên' },
    image: 'https://images.unsplash.com/photo-1581092921461-7dc1120dc955?auto=format&fit=crop&q=80&w=800',
    readTime: '6 phút',
    tags: ['máy dò rỉ', 'thiết bị hiện đại'],
    content: `
      <img src="https://images.unsplash.com/photo-1581092921461-7dc1120dc955?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Thiết bị siêu âm hiện đại"/>
      <h2>Khám phá thiết bị dò siêu âm hiện đại</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  {
    id: 'b10',
    slug: 'khi-nao-nen-thay-day-dien',
    title: 'Khi nào nên thay mới toàn bộ hệ thống dây dẫn điện trong nhà?',
    excerpt: 'Dây điện cũng có tuổi thọ nhất định. Việc sử dụng dây điện quá cũ tiềm ẩn nhiều nguy cơ cháy nổ khôn lường.',
    category: 'Điện',
    date: '08/05/2024',
    author: { name: 'Hoàng Tuấn', role: 'Kỹ sư điện' },
    image: 'https://images.unsplash.com/photo-1558230352-78d91c78494b?auto=format&fit=crop&q=80&w=800',
    readTime: '6 phút',
    tags: ['thay dây điện', 'an toàn điện'],
    content: `
      <img src="https://images.unsplash.com/photo-1558230352-78d91c78494b?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Thay dây điện"/>
      <h2>Khi nào nên thay mới toàn bộ hệ thống dây dẫn điện?</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  {
    id: 'b11',
    slug: 'may-bom-nuoc-yeu-nguyen-nhan',
    title: 'Máy bơm nước chạy nhưng nước lên yếu hoặc không lên? Đây là lý do.',
    excerpt: 'Tìm hiểu 6 nguyên nhân phổ biến khiến máy bơm gia đình gặp sự cố và cách tự khắc phục tại nhà.',
    category: 'Nước',
    date: '05/05/2024',
    author: { name: 'Minh Hoàng', role: 'Kỹ thuật viên' },
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=800',
    readTime: '5 phút',
    tags: ['máy bơm', 'sửa nước'],
    content: `
      <img src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Máy bơm yêú"/>
      <h2>Nguyên nhân máy bơm nước lên yếu</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  {
    id: 'b12',
    slug: 'camera-gia-dinh-loai-nao-tot',
    title: 'Review Top 5 Camera gia đình tốt nhất 2024 - Bền, Đẹp, Giá Rẻ',
    excerpt: 'Hoàng Tuấn MPE đánh giá chi tiết các mẫu camera Ezviz, Imou, Hikvision đang làm mưa làm gió trên thị trường.',
    category: 'Camera',
    date: '01/05/2024',
    author: { name: 'Tuấn Camera', role: 'Chuyên gia' },
    image: 'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&q=80&w=800',
    readTime: '10 phút',
    tags: ['review camera', 'camera gia đình'],
    content: `
      <img src="https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Các loại camera tốt"/>
      <h2>Review Top 5 Camera gia đình tốt nhất 2024</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  },
  {
    id: 'b13',
    slug: 'co-can-duc-tuong-khi-do-ro-ri',
    title: 'Dò rò rỉ nước có cần đục tường không? Sự thật về công nghệ siêu âm.',
    excerpt: 'Nhiều khách hàng lo lắng việc tìm rò rỉ sẽ làm nát nhà. Hãy xem quy trình dò tìm không đục phá của chúng tôi.',
    category: 'Dò Tìm',
    date: '28/04/2024',
    author: { name: 'Kỹ sư Hoàng', role: 'Chuyên gia siêu âm' },
    image: 'https://images.unsplash.com/photo-1591154667182-14241c305948?auto=format&fit=crop&q=80&w=800',
    readTime: '5 phút',
    tags: ['siêu âm rò rỉ', 'hạn chế đục phá'],
    content: `
      <img src="https://images.unsplash.com/photo-1591154667182-14241c305948?auto=format&fit=crop&q=80&w=800" class="w-full h-[400px] object-cover rounded-xl mb-6 shadow-md" alt="Dò rò rỉ có cần đục không"/>
      <h2>Dò rò rỉ nước có cần đục tường không?</h2>
      <p class="leading-relaxed text-lg mb-6">Nội dung chi tiết đang được cập nhật...</p>
    `
  }
];
