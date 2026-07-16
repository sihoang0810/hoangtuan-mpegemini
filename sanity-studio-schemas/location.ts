import { defineType, defineField } from 'sanity';

export const location = defineType({
  name: 'location',
  title: 'Chi Nhánh (Location)',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Mã chi nhánh',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Tên Chi Nhánh',
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
      name: 'hotline',
      title: 'Hotline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Mô tả chi nhánh',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Hình ảnh chi nhánh',
      type: 'string',
    }),
  ],
});
