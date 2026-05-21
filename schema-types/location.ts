import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'location',
  title: 'Location (Địa điểm)',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'Location ID (e.g., baoloc)', type: 'string' }),
    defineField({ name: 'name', title: 'Location Name (Tên)', type: 'string' }),
    defineField({ name: 'hotline', title: 'Hotline', type: 'string' }),
    defineField({ name: 'description', title: 'Description (Mô tả)', type: 'text' }),
    defineField({ name: 'image', title: 'Image (Hình ảnh)', type: 'string' })
  ]
});
