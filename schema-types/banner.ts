import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'banner',
  title: 'Alert Banner (Thông báo chạy đầu trang)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Admin title identifier', type: 'string' }),
    defineField({ name: 'text', title: 'Alert Message text', type: 'string' }),
    defineField({ name: 'linkText', title: 'Action Link text', type: 'string' }),
    defineField({ name: 'linkUrl', title: 'Action target link', type: 'string' }),
    defineField({ name: 'isActive', title: 'Currently active', type: 'boolean' })
  ]
});
