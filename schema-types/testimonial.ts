import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial (Đánh giá khách hàng)',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Customer Name', type: 'string' }),
    defineField({ name: 'role', title: 'Location / Role (e.g., Quận 1, TP.HCM)', type: 'string' }),
    defineField({ name: 'review', title: 'Review Text', type: 'text' }),
    defineField({ name: 'rating', title: 'Rating Stars (1-5)', type: 'number' }),
    defineField({ name: 'avatar', title: 'Avatar Image URL', type: 'string' })
  ]
});
