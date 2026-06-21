import React, { useRef, useEffect } from 'react';

interface InlineEditProps {
  value: string;
  isEditable?: boolean;
  onSave: (newValue: string) => void;
  multiline?: boolean;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  style?: React.CSSProperties;
}

export default function InlineEdit({
  value,
  isEditable = false,
  onSave,
  className = '',
  element = 'span',
  style
}: InlineEditProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  // Sync internal text with incoming value, avoiding updates while the user is actively editing (has focus)
  useEffect(() => {
    if (elementRef.current && document.activeElement !== elementRef.current) {
      elementRef.current.innerHTML = value.replace(/\n/g, '<br />');
    }
  }, [value]);

  if (!isEditable) {
    const Tag = element;
    return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br />') }} />;
  }

  const handleBlur = () => {
    if (elementRef.current) {
      const newValue = elementRef.current.innerText || '';
      if (newValue !== value) {
        onSave(newValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // For headers, badges, and general spans, Enter should trigger blur/save instead of newlines
      if (element !== 'p' && element !== 'div') {
        e.preventDefault();
        elementRef.current?.blur();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (elementRef.current) {
        elementRef.current.innerHTML = value.replace(/\n/g, '<br />');
        elementRef.current.blur();
      }
    }
  };

  const Tag = element;

  return (
    <Tag
      ref={elementRef as any}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className} inline-block relative cursor-text outline-none transition-all duration-200 focus:outline-[#ea580c] focus:outline-dashed focus:outline-2 focus:bg-[#ea580c]/5 hover:outline-[#ea580c]/30 hover:outline-dashed hover:outline-1 px-1 rounded-md`}
      style={{ minWidth: '1rem', ...style }}
      title="Nhấn chuột vào đây để chỉnh sửa văn bản trực tiếp"
    />
  );
}
