import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product (Sản phẩm)',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'Product ID (e.g., p1)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'name', title: 'Product Name (Tên)', type: 'string' }),
    defineField({ name: 'category', title: 'Category ID (e.g., electrical)', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'price', title: 'Price (Giá, e.g., 85.000đ)', type: 'string' }),
    defineField({ name: 'image', title: 'Image URL', type: 'string' }),
    defineField({ name: 'features', title: 'Key features', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'specs',
      title: 'Specifications (Thông số kỹ thuật)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'specItem',
          title: 'Spec Item',
          fields: [
            defineField({ name: 'key', title: 'Spec Key (e.g., Thương hiệu)', type: 'string' }),
            defineField({ name: 'value', title: 'Spec Value (e.g., MPE)', type: 'string' })
          ]
        }
      ]
    })
  ]
});
