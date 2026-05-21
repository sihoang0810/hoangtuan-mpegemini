import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pricing',
  title: 'Pricing Card (Thẻ báo giá)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Service / Item name', type: 'string' }),
    defineField({ name: 'price', title: 'Price string', type: 'string' }),
    defineField({ name: 'unit', title: 'Unit (cái/phòng/lần)', type: 'string' }),
    defineField({ name: 'category', title: 'Category Group (e.g., electrical)', type: 'string' }),
    defineField({ name: 'features', title: 'Included item details', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'badge', title: 'Featured Badge (e.g., Phổ biến nhất)', type: 'string' }),
    defineField({ name: 'orderNo', title: 'Order code sorting number', type: 'number' })
  ]
});
