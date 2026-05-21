import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service (Dịch vụ)',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'Service ID (e.g., e1, p2)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'string' }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'text' }),
    defineField({ name: 'icon', title: 'Icon (Lucide name)', type: 'string' }),
    defineField({ name: 'category', title: 'Category ID (e.g., electrical)', type: 'string' }),
    defineField({ name: 'features', title: 'Features list', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'pricing',
      title: 'Pricing items (Bảng giá dịch vụ)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pricingItem',
          title: 'Pricing Item',
          fields: [
            defineField({ name: 'item', title: 'Item name', type: 'string' }),
            defineField({ name: 'price', title: 'Price (e.g., Từ 150.000đ)', type: 'string' }),
            defineField({ name: 'unit', title: 'Unit (e.g., cái, lần, mét)', type: 'string' })
          ]
        }
      ]
    }),
    defineField({ name: 'image', title: 'Image URL', type: 'string' }),
    defineField({ name: 'benefits', title: 'Benefits (Ưu điểm)', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'faq',
      title: 'Service specific FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' })
          ]
        }
      ]
    })
  ]
});
