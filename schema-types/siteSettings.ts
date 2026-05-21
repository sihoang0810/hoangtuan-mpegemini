import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Global Controls (Cấu hình hệ thống)',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Main title', type: 'string' }),
    defineField({ name: 'tagline', title: 'Slogan descriptor', type: 'string' }),
    defineField({ name: 'logo', title: 'Brand logo image URL', type: 'string' }),
    defineField({ name: 'favicon', title: 'Header tab favicon', type: 'string' }),
    defineField({ name: 'mainHotline', title: 'Contact Phone Number', type: 'string' }),
    defineField({ name: 'mainZalo', title: 'Zalo Link', type: 'string' }),
    defineField({ name: 'headerNotice', title: 'Global header highlight text', type: 'string' })
  ]
});
