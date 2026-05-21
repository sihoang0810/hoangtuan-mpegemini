import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage Content (Trang chủ)',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' }),
    defineField({ name: 'heroOverlayText', title: 'Hero Overlay Text', type: 'string' }),
    defineField({ name: 'heroVideoUrl', title: 'Hero Video URL', type: 'url' }),
    defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'CTA Button Link', type: 'string' }),
    defineField({
      name: 'features',
      title: 'Key Features (Tính năng cốt lõi / Tại sao chọn)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          title: 'Feature Item',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon (Lucide name, e.g., Clock, MapPin, DollarSign, ShieldCheck)', type: 'string' })
          ]
        }
      ]
    }),
    defineField({
      name: 'stats',
      title: 'Company Stats (Số liệu thống kê)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'statItem',
          title: 'Stat Item',
          fields: [
            defineField({ name: 'value', title: 'Value (e.g., 1000+)', type: 'string' }),
            defineField({ name: 'label', title: 'Label (e.g., Khách hàng)', type: 'string' })
          ]
        }
      ]
    }),
    defineField({ name: 'aboutHeading', title: 'About Section Heading', type: 'string' }),
    defineField({ name: 'aboutContent', title: 'About Section Content', type: 'text' }),
    defineField({ name: 'aboutImage', title: 'About Section Image URL', type: 'string' }),
    defineField({ name: 'benefitHeading', title: 'Benefit Section Heading', type: 'string' }),
    defineField({ name: 'benefits', title: 'Benefits List', type: 'array', of: [{ type: 'string' }] })
  ]
});
