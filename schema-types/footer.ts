import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer config (Thông tin chân trang)',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'shortAbout', title: 'Short intro text', type: 'text' }),
    defineField({ name: 'address', title: 'Physical office address', type: 'string' }),
    defineField({ name: 'phone', title: 'Office phone', type: 'string' }),
    defineField({ name: 'email', title: 'Inquiry email ID', type: 'string' }),
    defineField({ name: 'workingHours', title: 'Working timetable', type: 'string' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Connections',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'string' }),
        defineField({ name: 'youtube', title: 'Youtube URL', type: 'string' }),
        defineField({ name: 'zalo', title: 'Zalo link', type: 'string' })
      ]
    }),
    defineField({ name: 'copyrightText', title: 'Copyright notification string', type: 'string' })
  ]
});
