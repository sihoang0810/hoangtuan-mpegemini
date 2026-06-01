import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  homeHref?: string; // ✅ THÊM
}

export default function Breadcrumbs({ items, homeHref = '/' }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm font-bold text-slate-500 overflow-x-auto whitespace-nowrap pb-1 no-scrollbar">
      <Link to={homeHref} className="hover:text-brand-primary transition-colors flex items-center gap-1">
        <Home size={14} />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-slate-300" />
          {item.href && !item.active ? (
            <Link to={item.href} className="hover:text-brand-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className={item.active ? 'text-brand-primary' : ''}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
