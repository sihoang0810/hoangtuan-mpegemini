import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, MapPin, Plus, Minus } from 'lucide-react';
import { CMSProject, getProjects, getProjectsSync, client } from '../lib/sanity';
import OptimizedImage from './OptimizedImage';
import { useLocation } from '../context/LocationContext';

interface ProjectsProps {
  cmsData?: {
    heading?: string;
    subtitle?: string;
    projects?: CMSProject[];
  };
}

const DEFAULT_PROJECTS: CMSProject[] = [
  {
    id: '1',
    slug: 'sua-dien-biet-thu-dalat',
    title: 'Thi công hệ thống điện thông minh Biệt thự Đà Lạt',
    description: 'Dự án cải tạo toàn bộ hệ thống điện cũ sang hệ thống Smarthome MPE hiện đại cho biệt thự cổ tại Đà Lạt. Chúng tôi đã xử lý hơn 500m dây dẫn âm tường chằng chịt, thay thế bằng tủ điện thông minh điều khiển qua điện thoại. Nội dung dự án bao gồm việc khảo sát kỹ lưỡng các vị trí rò rỉ điện tiềm ẩn, lắp đặt hệ thống đèn LED cảm biến chuyển động tại hành lang và sân vườn, giúp tiết kiệm 30% điện năng hàng tháng cho gia chủ.',
    image: '/images/cua-cuon-thong-minh.png',
    category: 'Điện thông minh',
    location: 'Đà Lạt, Lâm Đồng',
    completionDate: '20/05/2026'
  },
  {
    id: '2',
    slug: 'do-tim-ro-ri-nhatrang',
    title: 'Dò tìm rò rỉ nước ngầm căn hộ cao cấp',
    description: 'Sử dụng công nghệ siêu âm tiên tiến nhất để xác định vị trí rò rỉ nước tại đường ống âm sàn của căn hộ tầng 15. Trước đó khách hàng đã gọi nhiều đơn vị nhưng không tìm ra vị trí chính xác dẫn đến phải đục phá diện rộng. Với thiết bị rà quét chuyên dụng của Hoàng Tuấn MPE, chúng tôi đã định vị chính xác điểm vỡ chỉ trong 45 phút, giúp giảm thiểu chi phí sửa chữa và khôi phục hiện trạng ban đầu cho khách hàng một cách nhanh chóng nhất.',
    image: '/images/sieuam.png',
    category: 'Siêu âm dò tìm',
    location: 'Quận 1, TP.HCM',
    completionDate: '12/04/2026'
  },
  {
    id: '5',
    slug: 'lap-dat-camera-vuon-ray',
    title: 'Lắp đặt Camera an ninh thông minh giám sát vườn sầu riêng & rẫy cà phê',
    description: 'Triển khai giải pháp camera Wifi sử dụng năng lượng mặt trời độc lập và camera SIM 4G ngoài trời tự sạc 24/24. Giúp chủ vườn sầu riêng và rẫy cà phê Bảo Lộc bảo vệ tài sản, ngăn ngừa nạn mất trộm nông sản vào mùa thu hoạch cao điểm. Hệ thống tích hợp còi hú báo động, đèn Spotlight ban đêm và công nghệ AI nhận dạng xâm nhập gửi cảnh báo trực tiếp về điện thoại bất chấp địa hình đồi núi dốc đứng không có sẵn điện lưới hay mạng internet dây.',
    image: '/images/imou-ngoai-troi.jpg',
    category: 'Camera & An ninh',
    location: 'Đại Lào, Bảo Lộc, Lâm Đồng',
    completionDate: '20/05/2026'
  },
  {
    id: '4',
    slug: 'bao-tri-dien-nuoc-khach-san',
    title: 'Bảo trì hệ thống điện nước Khách sạn 4 sao',
    description: 'Hợp đồng bảo trì định kỳ cho chuỗi khách sạn lớn, kiểm tra toàn bộ hệ thống bơm áp lực, máy nước nóng trung tâm và hệ thống chiếu sáng sảnh chính. Chúng tôi tiến hành đo kiểm các thông số an toàn điện, vệ sinh các đầu nối và thay thế các thiết bị có dấu hiệu xuống cấp. Việc bảo trì định kỳ giúp khách sạn hoạt động ổn định, tránh các sự cố bất ngờ làm gián đoạn trải nghiệm của khách lưu trú.',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7edd?auto=format&fit=crop&q=80&w=800',
    category: 'Bảo trì trọn gói',
    location: 'Quận 3, TP.HCM',
    completionDate: '15/02/2026'
  },
  {
    id: '3',
    slug: 'lap-dat-camera-xuong-may',
    title: 'Lắp đặt hệ thống Camera giám sát 4K Xưởng may công nghiệp',
    description: 'Triển khai hệ thống 32 Camera IP Hikvision độ phân giải 4K cho toàn bộ khu vực xưởng may công nghiệp rộng 2000m2. Hệ thống camera được tích hợp công nghệ AI nhận diện khuôn mặt và cảnh báo xâm nhập ban đêm. Toàn bộ dây tín hiệu được đi trong ống cứng bảo vệ, đảm bảo tính thẩm mỹ và độ bền cao trong môi trường sản xuất. Đội ngũ kỹ thuật viên đã hoàn thành dự án vượt tiến độ 2 ngày so với kế hoạch ban đầu.',
    image: 'https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800',
    category: 'Camera & An ninh',
    location: 'Bảo Lộc, Lâm Đồng',
    completionDate: '05/03/2026'
  }
];

const ProjectItem = ({ project, index }: { project: CMSProject; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="py-10 md:py-16 lg:py-20 border-b border-slate-100 last:border-b-0 last:pb-0 first:pt-0"
    >
      <style>{`
        @media (min-width: 768px) {
          .project-row-even {
            display: flex !important;
            flex-direction: row !important;
          }
          .project-row-odd {
            display: flex !important;
            flex-direction: row-reverse !important;
          }
        }
      `}</style>
      <div className={`flex flex-col project-row-${isEven ? 'even' : 'odd'} gap-6 lg:gap-10 md:gap-16 lg:gap-24 items-start md:items-center`}>
        
        {/* Ảnh */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <div className="relative aspect-[4/3] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group">
            <OptimizedImage
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute top-6 left-6">
              <span className="bg-brand-primary text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                {project.category}
              </span>
            </div>
          </div>
        </div>

        {/* Nội dung */}
        <div className="w-full md:w-1/2 space-y-6 pt-2">
          <div className="flex flex-wrap gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
              <MapPin size={14} className="text-brand-primary" />
              {project.location}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
              <Calendar size={14} className="text-brand-primary" />
              {project.completionDate}
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-brand-secondary leading-snug text-balance tracking-tight">
            {project.title}
          </h3>

          <div>
            <p className={`text-slate-600 leading-relaxed text-[15px] ${!isExpanded ? 'line-clamp-4' : ''}`}>
              {project.description}
            </p>

            {project.description.length > 180 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 flex items-center gap-2 text-brand-primary font-semibold text-sm hover:text-brand-secondary transition-colors"
              >
                {isExpanded ? 'Thu gọn ▲' : 'Xem chi tiết thi công ▼'}
              </button>
            )}
          </div>

          <a
            href={`/du-an/${project.slug}`}
            className="inline-flex items-center gap-2 px-3.5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-brand-secondary hover:border-brand-primary hover:text-brand-primary transition-all"
          >
            Chi tiết dự án <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects({ cmsData }: ProjectsProps) {
  const { locationSlug } = useLocation();
  const [projects, setProjects] = useState<CMSProject[]>(() => {
    if (cmsData?.projects && cmsData.projects.length > 0) return cmsData.projects;
    return getProjectsSync(locationSlug);
  });

  useEffect(() => {
    let active = true;

    // Fetch async content from Sanity with caching
    getProjects(locationSlug).then((data) => {
      if (active && data && data.length > 0) {
        setProjects(data);
      }
    });

    // Real-time subscription to auto-update live website immediately when Sanity is changed
    const subscription = client
      .listen(`*[_type == "project"]`)
      .subscribe((update) => {
        if (active) {
          getProjects(locationSlug).then(data => {
            if (active && data) setProjects(data);
          });
        }
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [locationSlug]);

  const displayProjects = projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const heading = cmsData?.heading || "Dự Án Tiêu Biểu";
  const subtitle = cmsData?.subtitle || "Hoàng Tuấn MPE tự hào mang đến những giải pháp thi công bền vững, thẩm mỹ và an toàn cho mọi công trình.";

  return (
    <section className="py-10 md:py-12 lg:py-14 bg-slate-50 overflow-hidden" id="section-projects">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[11px] font-black tracking-[0.2em] text-brand-primary uppercase"
          >
            Công trình thực tế
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-secondary tracking-tight"
            style={{ paddingTop: '24px' }}
          >
            {heading}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-slate-500 text-base md:text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        <div>
          {displayProjects.slice(0, 4).map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <Link 
            to="/du-an"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-secondary text-white font-black text-xs uppercase tracking-[0.2em] rounded-3xl hover:bg-brand-primary transition-all shadow-xl shadow-brand-secondary/20 group"
          >
            XEM TẤT CẢ DỰ ÁN <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
