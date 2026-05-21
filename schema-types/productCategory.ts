import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'productCategory',
  title: 'Product Category (Danh mục sản phẩm)',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'Category ID (e.g., electrical, plumbing)', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'icon', title: 'Icon (Lucide name)', type: 'string' })
  ]
});
