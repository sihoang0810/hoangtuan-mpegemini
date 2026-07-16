import { defineType, defineField } from 'sanity';

export const banner = defineType({
  name: 'banner',
  title: 'Banner quảng cáo / Thông báo (Banner)',
  type: 'document',
  fields: [
    defineField({
      name: 'internalName',
      title: 'Tên banner (Quản lý nội bộ)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Tiêu đề hiển thị trên banner',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Tiêu đề phụ / Mô tả ngắn',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Hình ảnh Banner (Desktop)',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Hình ảnh Banner (Mobile - Tùy chọn)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link',
      title: 'Đường dẫn khi click vào banner',
      type: 'string',
    }),
    defineField({
      name: 'position',
      title: 'Vị trí hiển thị (Gợi ý cho Frontend)',
      type: 'string',
      options: {
        list: [
          { title: 'Trang chủ - Banner chính (Hero)', value: 'home-hero' },
          { title: 'Trang chủ - Giữa trang', value: 'home-middle' },
          { title: 'Sidebar / Cột bên', value: 'sidebar' },
          { title: 'Popup / Modal', value: 'popup' }
        ]
      }
    }),
    defineField({
      name: 'locations',
      title: 'Hiển thị cho Chi Nhánh',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hồ Chí Minh', value: 'ho-chi-minh' },
          { title: 'Bảo Lộc', value: 'bao-loc' }
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Đang hoạt động',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Thứ tự ưu tiên',
      type: 'number',
      initialValue: 0,
    })
  ],
  preview: {
    select: {
      title: 'internalName',
      subtitle: 'position',
      media: 'image'
    }
  }
});
