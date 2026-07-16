import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Vật tư & Thiết bị (Product)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên Sản Phẩm / Vật Tư',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn tĩnh (Slug)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Giá bán / Giá thay thế tham khảo',
      type: 'string',
      description: 'Ví dụ: 120.000đ hoặc Liên hệ nhận báo giá',
    }),
    defineField({
      name: 'id',
      title: 'Mã Sản Phẩm (ID)',
      type: 'string',
      description: 'Ví dụ: AT10-9W-D90',
    }),
    defineField({
      name: 'description',
      title: 'Mô tả chi tiết / HTML giới thiệu',
      type: 'text',
      description: 'Nội dung chi tiết sản phẩm bằng HTML hoặc văn bản thường.',
    }),
    defineField({
      name: 'features',
      title: 'Đặc điểm nổi bật (Features)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Đường dẫn ảnh trực tiếp (Image URL)',
      type: 'string',
      description: 'Link ảnh Unsplash hoặc CDN của sản phẩm.',
    }),
    defineField({
      name: 'location',
      title: 'Chi nhánh (Reference)',
      type: 'reference',
      to: [{ type: 'location' }],
    }),
    defineField({
      name: 'productCategoryRef',
      title: 'Danh mục sản phẩm (Reference)',
      type: 'reference',
      to: [{ type: 'productCategory' }],
    }),
    defineField({
      name: 'specs',
      title: 'Thông số kỹ thuật / Mô tả ngắn',
      type: 'text',
      description: 'Ví dụ: Thương hiệu MPE, chống cháy nổ, bảo hành 2 năm...',
    }),
    defineField({
      name: 'content',
      title: 'Nội dung chi tiết (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'productImage',
      title: 'Ảnh chụp sản phẩm (Product Image)',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      to: [{ type: 'category' }],
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
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      initialValue: 0,
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
      title: 'name',
      subtitle: 'price',
      media: 'productImage'
    }
  }
});
