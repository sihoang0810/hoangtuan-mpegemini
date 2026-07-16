import { defineType, defineField } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Danh mục (Category)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên danh mục',
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
      title: 'Mô tả',
      type: 'text',
    }),
    defineField({
      name: 'type',
      title: 'Loại danh mục (Dùng cho loại nội dung nào)',
      type: 'string',
      options: {
        list: [
          { title: 'Bài viết (Post)', value: 'post' },
          { title: 'Sản phẩm (Product)', value: 'product' },
          { title: 'Dịch vụ (Service)', value: 'service' },
          { title: 'Dự án (Project)', value: 'project' }
        ]
      },
      validation: Rule => Rule.required(),
    }),
  ]
});
