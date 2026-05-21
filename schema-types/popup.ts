import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'popup',
  title: 'Ad Popup Modal (Hộp thoại quảng cáo)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Ad Title text', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Alert Subtitle', type: 'string' }),
    defineField({ name: 'image', title: 'Promo image asset URL', type: 'string' }),
    defineField({ name: 'ctaText', title: 'Sign-up/Call CTA', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'Action destination link', type: 'string' }),
    defineField({ name: 'delaySeconds', title: 'Intro overlay trigger timer', type: 'number' }),
    defineField({ name: 'isActive', title: 'Active status', type: 'boolean' })
  ]
});
