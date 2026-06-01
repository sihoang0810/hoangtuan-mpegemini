import React from 'react';
import { sectionRegistry } from './sectionRegistry';
import { Sparkles, Phone, MapPin, Mail, Clock, ArrowRight } from 'lucide-react';

export interface CMSSection {
  _type: string;
  _key: string;
  isActive?: boolean;
  [key: string]: any;
}

interface PageRendererProps {
  sections?: CMSSection[];
  locationSlug: string;
  isEditable?: boolean;
  onSelectSection?: (type: string, key: string) => void;
  onMoveSection?: (index: number, direction: 'up' | 'down') => void;
  onDeleteSection?: (index: number) => void;
  selectedSectionKey?: string | null;
}

export default function PageRenderer({
  sections = [],
  locationSlug,
  isEditable = false,
  onSelectSection,
  onMoveSection,
  onDeleteSection,
  selectedSectionKey,
}: PageRendererProps) {
  // CRITICAL REQUIREMENT: If the sections array is empty, render absolutely nothing!
  if (!sections || sections.length === 0) {
    return null;
  }

  // Helper to resolve display title for builder outlines
  const getDisplayTitle = (secType: string) => {
    switch (secType) {
      case 'heroSection': return 'Hero Banner';
      case 'servicesSection': return 'Dịch vụ & Đơn giá';
      case 'whyChooseUsSection':
      case 'featuresSection': return 'Ưu điểm & Thống kê';
      case 'processTimelineSection': return 'Quy trình thi công';
      case 'featuredProductsSection':
      case 'productsSection': return 'Thiết bị & Vật tư';
      case 'testimonialsSection':
      case 'reviewsSection': return 'Ý kiến khách hàng';
      case 'blogSection': return 'Kinh nghiệm khoa học';
      case 'faqSection': return 'Câu hỏi thường gặp';
      case 'customFormBuilderSection': return '📍 Đặt lịch (Form Builder)';
      case 'customReusableBlockSection': return '💎 Reusable Block';
      case 'finalCtaSection':
      case 'ctaSection': return 'Kêu gọi hành động (CTA)';
      default: return 'Khối Tùy Chọn';
    }
  };

  const activeSections = sections.filter(sec => sec.isActive !== false);

  if (activeSections.length === 0) {
    return null;
  }

  return (
    <div className="w-full relative flex flex-col">
      {activeSections.map((section, idx) => {
        const Component = sectionRegistry[section._type];
        if (!Component) {
          console.warn(`[PageRenderer] Component for type "${section._type}" is not registered.`);
          return null;
        }

        const isSelected = selectedSectionKey === section._key;

        // Render sections wraps if in editable mode
        const renderContent = (
          <Component 
            cmsData={section}
            {...section}
            locationSlug={locationSlug}
          />
        );

        if (!isEditable) {
          return (
            <React.Fragment key={section._key || idx}>
              {renderContent}
            </React.Fragment>
          );
        }

        const displayTitle = getDisplayTitle(section._type);

        return (
          <div
            key={section._key || idx}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onSelectSection) {
                onSelectSection(section._type, section._key);
              }
            }}
            className={`relative group/builder-sec cursor-pointer transition-all duration-300 ${
              isSelected ? 'ring-2 ring-sky-500 shadow-xl bg-sky-50/[0.01]' : 'hover:shadow-lg'
            }`}
          >
            {/* Elementor Blue Border Outlines */}
            <div className={`absolute inset-0 border-2 pointer-events-none z-30 transition-all ${
              isSelected ? 'border-sky-500 border-solid' : 'border-transparent group-hover/builder-sec:border-sky-400 group-hover/builder-sec:border-dashed'
            }`} />

            {/* Float Elementor Toolbar */}
            <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 z-40 flex items-center bg-sky-500 text-white text-[10px] font-bold rounded-t-lg shadow-md opacity-0 group-hover/builder-sec:opacity-100 transition-opacity divide-x divide-white/20 h-[28px] border border-sky-600 select-none">
              <div className="px-3 h-full flex items-center gap-1">
                <span className="text-[10px] uppercase font-black tracking-wider">{displayTitle}</span>
              </div>
              
              {/* Sorter Controls */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onMoveSection) onMoveSection(idx, 'up');
                }}
                disabled={idx === 0}
                className="px-2 h-full hover:bg-sky-600 disabled:opacity-40 font-mono"
                title="Di chuyển lên"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onMoveSection) onMoveSection(idx, 'down');
                }}
                disabled={idx === activeSections.length - 1}
                className="px-2 h-full hover:bg-sky-600 disabled:opacity-40 font-mono"
                title="Di chuyển xuống"
              >
                ▼
              </button>
              
              {/* Delete Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDeleteSection) onDeleteSection(idx);
                }}
                className="px-2 h-full bg-rose-500 hover:bg-rose-600 font-extrabold text-[#fff]"
                title="Xóa phân đoạn"
              >
                ✕
              </button>
            </div>

            {renderContent}
          </div>
        );
      })}
    </div>
  );
}
export { PageRenderer };
