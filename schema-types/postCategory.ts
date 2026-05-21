import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'postCategory',
  title: 'Post Category (Danh mục bài viết)',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'Category ID (e.g., electrical)', type: 'string' }),
    defineField({ name: 'title', title: 'Title (e.g., Điện, Nước)', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon (Lucide name)', type: 'string' })
  ]
});
