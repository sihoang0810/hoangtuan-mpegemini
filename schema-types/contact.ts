import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact form setup (Khung liên hệ)',
  type: 'document',
  fields: [
    defineField({ name: 'pageTitle', title: 'Contact header label', type: 'string' }),
    defineField({ name: 'pageSubtitle', title: 'Contact description text', type: 'text' }),
    defineField({
      name: 'contactFields',
      title: 'Contact channels',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contactFieldItem',
          title: 'Contact Field Item',
          fields: [
            defineField({ name: 'icon', title: 'Lucide icon name', type: 'string' }),
            defineField({ name: 'label', title: 'Channel Name', type: 'string' }),
            defineField({ name: 'val', title: 'Display line', type: 'string' }),
            defineField({ name: 'desc', title: 'Small prompt explanation', type: 'string' })
          ]
        }
      ]
    }),
    defineField({ name: 'mapEmbedUrl', title: 'Google Map embedding iframe URL', type: 'text' })
  ]
});
