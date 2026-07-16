import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Bài viết / Cẩm nang (Post)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề bài viết',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn tĩnh (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Tóm tắt ngắn (Excerpt)',
      type: 'text',
      description: 'Mô tả tóm tắt nội dung hiển thị ngoài danh sách tin tức.',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Ảnh bìa bài viết (Featured Image)',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Ngày xuất bản',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Tác giả bài viết',
      type: 'string',
      initialValue: 'Kỹ sư Hoàng Tuấn',
    }),
    defineField({
      name: 'content',
      title: 'Nội dung bài viết (Rich Text / Portable Text)',
      type: 'array',
      description: 'Nội dung chi tiết của cẩm nang.',
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
      name: 'tags',
      title: 'Thẻ (Tags)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Nhập các từ khóa liên quan (ví dụ: Sửa điện, Dò nước...)',
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
      description: 'Bài viết này sẽ xuất hiện trên trang tin tức của chi nhánh nào.',
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
      subtitle: 'author',
      media: 'mainImage'
    }
  }
});
