// @ts-nocheck
import { defineType, defineField } from 'sanity';

/**
 * Schema này được thiết kế để thay đổi duy nhất dòng chữ tiêu đề Hero (h1) ở mục đầu tiên của trang chủ.
 * CSS Selector: div#root > ... > section > div > h1
 * Trường dữ liệu map trong code: `heroTitle` thuộc tài liệu `homepage`
 */
export default defineType({
  name: 'homepage',
  title: 'Cấu hình Trang chủ (Homepage)',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Tiêu đề chính (Hero Title)',
      type: 'string',
      description: 'Dòng chữ tiêu đề lớn xuất hiện ngay đầu trang (vd: CẦN THỢ ĐIỆN NƯỚC BẢO LỘC?)',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
