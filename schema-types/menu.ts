import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'menu',
  title: 'Navigation Menu (Thanh menu)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Menu Title', type: 'string' }),
    defineField({ name: 'path', title: 'Navigation path', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon (Lucide string)', type: 'string' }),
    defineField({ name: 'orderNo', title: 'Menu display sorting order', type: 'number' }),
    defineField({
      name: 'subItems',
      title: 'Sub-Items (Menu phụ)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'subMenuItem',
          title: 'Sub-Menu Item',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'path', title: 'Path', type: 'string' })
          ]
        }
      ]
    })
  ]
});
