import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'serviceCategory',
  title: 'Service Category (Danh mục dịch vụ)',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'Category ID (e.g., electrical, plumbing)', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'icon', title: 'Icon (Lucide Icon Name)', type: 'string' }),
    defineField({ name: 'color', title: 'Accent Color (e.g., blue, red, green)', type: 'string' })
  ]
});
