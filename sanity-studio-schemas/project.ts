import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Dự án thực tế (Project)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên dự án',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn tĩnh (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả ngắn',
      type: 'text',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'content',
      title: 'Nội dung chi tiết (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'location',
      title: 'Địa điểm thi công (Quận, TP)',
      type: 'string',
    }),
    defineField({
      name: 'completionDate',
      title: 'Ngày hoàn thành',
      type: 'date',
    }),
    defineField({
      name: 'mainImage',
      title: 'Ảnh đại diện dự án',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Thư viện ảnh',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'category',
      title: 'Danh mục dự án',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Thẻ (Tags)',
      type: 'array',
      of: [{ type: 'string' }],
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
      title: 'title',
      subtitle: 'location',
      media: 'mainImage'
    }
  }
});
