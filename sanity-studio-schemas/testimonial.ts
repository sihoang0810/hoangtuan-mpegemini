import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Đánh giá khách hàng (Testimonial)',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Tên Khách Hàng',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'customerRole',
      title: 'Vai trò / Địa điểm',
      type: 'string',
      description: 'Ví dụ: Anh Nam - Gò Vấp, HCM hoặc Chị Thảo - Bảo Lộc',
    }),
    defineField({
      name: 'avatar',
      title: 'Ảnh đại diện Khách Hàng (Avatar)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: 'Số sao đánh giá (Rating Stars)',
      type: 'number',
      initialValue: 5,
      validation: Rule => Rule.min(1).max(5),
    }),
    defineField({
      name: 'content',
      title: 'Ý kiến phản hồi (Review Content)',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'locations',
      title: 'Hiển thị cho Chi Nhánh',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hồ Chí Minh', value: 'ho-chi-minh' },
          { title: 'Bảo Lộc', value: 'bao-loc' }
        ]
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      initialValue: 0,
    })
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'customerRole',
      media: 'avatar'
    }
  }
});
