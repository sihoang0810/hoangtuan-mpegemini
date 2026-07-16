import { defineType, defineField } from 'sanity';

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Danh mục Sản phẩm (Product Category)',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Mã danh mục',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Tên Danh Mục',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Biểu tượng (Icon)',
      type: 'string',
    }),
  ],
});
