import { defineType, defineField } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Dịch vụ thi công (Service)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên Dịch Vụ',
      type: 'string',
      description: 'Ví dụ: Dò tìm rò rỉ nước ngầm siêu âm, Sửa chữa tủ điện chập...',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn tĩnh (Slug)',
      type: 'slug',
      description: 'Nhấp "Generate" để tự động tạo đường dẫn thân thiện (ví dụ: do-tim-ro-ri-nuoc-sieu-am).',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Giá thi công tham khảo',
      type: 'string',
      description: 'Ví dụ: Chỉ từ 150.000đ hoặc Liên hệ báo giá',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Mô tả tóm tắt (Short Description)',
      type: 'text',
      description: 'Hiển thị trên thẻ danh mục dịch vụ ngoài trang chủ.',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Ảnh đại diện dịch vụ (Thumbnail Image)',
      type: 'image',
      description: 'Hình ảnh đại diện cho dịch vụ.',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Mã biểu tượng (Icon Name)',
      type: 'string',
      description: 'Nhập mã biểu tượng Lucide (ví dụ: Droplet, Zap, Wrench, Shield, Compass).',
    }),
    defineField({
      name: 'content',
      title: 'Nội dung chi tiết (Rich Text / Portable Text)',
      type: 'array',
      description: 'Chi tiết kỹ thuật, quy trình thực hiện, cam kết được soạn thảo bằng văn bản phong phú.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Bình thường', value: 'normal' },
            { title: 'Tiêu đề lớn (H2)', value: 'h2' },
            { title: 'Tiêu đề phụ (H3)', value: 'h3' },
            { title: 'Trích dẫn', value: 'blockquote' }
          ],
          lists: [
            { title: 'Danh sách chấm', value: 'bullet' },
            { title: 'Danh sách số', value: 'number' }
          ]
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Mô tả hình ảnh (Alt Text)',
              description: 'Tốt cho SEO và khả năng tiếp cận.',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'locations',
      title: 'Áp dụng cho Chi Nhánh',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hồ Chí Minh', value: 'ho-chi-minh' },
          { title: 'Bảo Lộc', value: 'bao-loc' }
        ]
      },
      description: 'Dịch vụ này được cung cấp ở những khu vực nào.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Thứ tự ưu tiên hiển thị',
      type: 'number',
      description: 'Số nhỏ hơn sẽ hiển thị trước (ví dụ: 1, 2, 3...).',
      initialValue: 10,
    }),
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Tiêu đề SEO)',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (Mô tả SEO)',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'mainImage'
    }
  }
});
