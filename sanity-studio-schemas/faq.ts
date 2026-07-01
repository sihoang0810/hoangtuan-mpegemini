import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'Câu hỏi thường gặp (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Câu hỏi',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Câu trả lời',
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
      title: 'question'
    }
  }
});
