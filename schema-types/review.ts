import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Review System Node (Phản hồi thực tế)',
  type: 'document',
  fields: [
    defineField({ name: 'customerName', title: 'Customer', type: 'string' }),
    defineField({ name: 'comment', title: 'Comment', type: 'text' }),
    defineField({ name: 'score', title: 'Score (1-5)', type: 'number' }),
    defineField({ name: 'date', title: 'Date (e.g. 2026-05-20)', type: 'string' }),
    defineField({ name: 'verifiedPurchase', title: 'Verified Purchase (Mất điện / đã sửa)', type: 'boolean' })
  ]
});
