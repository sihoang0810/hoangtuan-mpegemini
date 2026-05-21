import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post (Bài viết)',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'Post ID', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt (Mô tả ngắn)', type: 'string' }),
    defineField({ name: 'content', title: 'Content (Nội dung HTML/Markdown)', type: 'text' }),
    defineField({ name: 'category', title: 'Category Title (e.g., Điện, Nước)', type: 'string' }),
    defineField({ name: 'date', title: 'Date (Ngày, e.g., 2026-05-15)', type: 'string' }),
    defineField({
      name: 'author',
      title: 'Author Details',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Author Name', type: 'string' }),
        defineField({ name: 'role', title: 'Author Role', type: 'string' }),
        defineField({ name: 'avatar', title: 'Avatar Image URL', type: 'string' })
      ]
    }),
    defineField({ name: 'image', title: 'Featured Image URL', type: 'string' }),
    defineField({ name: 'readTime', title: 'Read Time (Thời gian đọc)', type: 'string' }),
    defineField({ name: 'tags', title: 'Tags (Thẻ)', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'faq',
      title: 'Article FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' })
          ]
        }
      ]
    })
  ]
});
