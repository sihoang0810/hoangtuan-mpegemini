import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'gallery',
  title: 'Gallery Item (Thư viện ảnh)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Visual title', type: 'string' }),
    defineField({ name: 'image', title: 'Image URL', type: 'string' }),
    defineField({ name: 'category', title: 'Category (e.g., electrical, plumbing)', type: 'string' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' })
  ]
});
