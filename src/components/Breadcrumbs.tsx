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
  return null;
}
