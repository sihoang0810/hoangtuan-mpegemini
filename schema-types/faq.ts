import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ (Câu hỏi thường gặp)',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string' }),
    defineField({ name: 'answer', title: 'Answer', type: 'text' }),
    defineField({ name: 'category', title: 'Category (Optional)', type: 'string' })
  ]
});
